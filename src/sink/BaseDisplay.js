import BaseLfo from '../core/BaseLfo';
import parameters from 'parameters';


const commonDefinitions = {
  duration: {
    type: 'float',
    min: 0,
    max: +Infinity,
    default: 1,
    metas: { kind: 'dynamic' },
  },
  min: {
    type: 'float',
    default: -1,
    metas: { kind: 'dynamic' },
  },
  max: {
    type: 'float',
    default: 1,
    metas: { kind: 'dynamic' },
  },
  width: {
    type: 'integer',
    default: 300,
    metas: { kind: 'dynamic' },
  },
  height: {
    type: 'integer',
    default: 150,
    metas: { kind: 'dynamic' },
  },
  container: {
    type: 'any',
    default: null,
    constant: true,
  },
  canvas: {
    type: 'any',
    default: null,
    constant: true,
  },
  referenceTime: {
    type: 'float',
    default: 0,
    constant: true,
  }
}

/**
 * Base class to extend in order to create graphical sinks.
 *
 * @todo - propagate float rounding errors
 *
 * @memberof module:sink
 * @param {Object} options - Override default parameters.
 * @param {Number} options.duration - Duration (in seconds) represented in
 *  the canvas. _dynamic parameter_
 * @param {Number} [options.min=-1] - Minimum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.max=1] - Maximum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.width=300] - Width of the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.height=150] - Height of the canvas.
 *  _dynamic parameter_
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas. _constant parameter_
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw. _constant parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class.
 *
 * @see {@link module:utils.DisplaySync}
 */
class BaseDisplay extends BaseLfo {
  constructor(defs, options) {
    super();

    const definitions = Object.assign({}, commonDefinitions, defs);
    this.params = parameters(definitions, options);
    this.params.addListener(this.onParamUpdate.bind(this));

    if (this.params.get('canvas') === null && this.params.get('container') === null)
      throw new Error('Invalid parameter: `canvas` or `container` not defined');

    const canvasParam = this.params.get('canvas');
    const containerParam = this.params.get('container');
    // prepare canvas
    if (canvasParam) {
      if (typeof canvasParam === 'string')
        this.canvas = document.querySelector(canvasParam);
      else
        this.canvas = canvasParam;
    } else if (containerParam) {
      let container;

      if (typeof containerParam === 'string')
        container = document.querySelector(containerParam);
      else
        container = containerParam;

      this.canvas = document.createElement('canvas');
      container.appendChild(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d');
    this.cachedCanvas = document.createElement('canvas');
    this.cachedCtx = this.cachedCanvas.getContext('2d');

    this.previousFrame = null;
    // this.lastShiftError = 0;
    // this.currentPartialShift = 0;

    this.currentTime = this.params.get('referenceTime');

    /**
     * Instance of the `DisplaySync` used to synchronize the different displays
     * @private
     */
    this.displaySync = false;

    //
    this._stack;
    this._rafId;

    this.renderStack = this.renderStack.bind(this);

    this.shiftError = 0;
    this.frameWidthError = 0;

    this._resize();
  }


  /**
   * Create the transfert function used to map values to pixel in the y axis
   * @private
   */
  _setYScale() {
    const min = this.params.get('min');
    const max = this.params.get('max');
    const height = this.canvasHeight;

    const a = (0 - height) / (max - min);
    const b = height - (a * min);

    this.getYPosition = (x) => a * x + b;
  }

  /** @private */
  _resize() {
    const width = this.params.get('width');
    const height = this.params.get('height');

    const ctx = this.ctx;
    const cachedCtx = this.cachedCtx;

    const dPR = window.devicePixelRatio || 1;
    const bPR = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;

    this.pixelRatio = dPR / bPR;

    const lastWidth = this.canvasWidth;
    const lastHeight = this.canvasHeight;
    this.canvasWidth = width * this.pixelRatio;
    this.canvasHeight = height * this.pixelRatio;

    cachedCtx.canvas.width = this.canvasWidth;
    cachedCtx.canvas.height = this.canvasHeight;

    // copy current image from ctx (resize)
    if (lastWidth && lastHeight) {
      cachedCtx.drawImage(ctx.canvas,
        0, 0, lastWidth, lastHeight,
        0, 0, this.canvasWidth, this.canvasHeight
      );
    }

    ctx.canvas.width = this.canvasWidth;
    ctx.canvas.height = this.canvasHeight;
    ctx.canvas.style.width = `${width}px`;
    ctx.canvas.style.height = `${height}px`;

    // update scale
    this._setYScale();
  }

  /**
   * Returns the width in pixel a `vector` frame needs to be drawn.
   * @private
   */
  getMinimumFrameWidth() {
    return 1; // need one pixel to draw the line
  }

  /** @private */
  onParamUpdate(name, value, metas) {
    super.onParamUpdate(name, value, metas);

    switch (name) {
      case 'min':
      case 'max':
        // @todo - make sure that min and max are different
        this._setYScale();
        break;
      case 'width':
      case 'height':
        this._resize();
    }
  }

  processStreamParams(prevStreamParams) {
    this.prepareStreamParams(prevStreamParams);

    this._stack = [];
    this._rafId = requestAnimationFrame(this.renderStack);
  }

  resetStream() {
    super.resetStream();

    const width = this.canvasWidth;
    const height = this.canvasHeight;

    this.ctx.clearRect(0, 0, width, height);
    this.cachedCtx.clearRect(0, 0, width, height);
  }

  finalizeStream(endTime) {
    super.finalizeStream(endTime);
    cancelAnimationFrame(this._rafId);
  }

  /**
   * Add the current frame to the frames to draw. Should not be overriden.
   * @inheritdoc
   */
  processFrame(frame) {
    const frameSize = this.streamParams.frameSize;
    const copy = new Float32Array(frameSize);
    const data = frame.data;

    // copy values of the input frame as they might be updated
    // in reference before being consumed in the draw function
    for (let i = 0; i < frameSize; i++)
      copy[i] = data[i];

    this._stack.push({
      time: frame.time,
      data: copy,
      metadata: frame.metadata,
    });
  }

  renderStack() {
    for (let i = 0, l = this._stack.length; i < l; i++)
      this.executeDraw(this._stack[i]);

    // reinit stack for next call
    this._stack.length = 0;
    this._rafId = requestAnimationFrame(this.renderStack);
  }

  executeDraw(frame) {
    this.scrollModeDraw(frame);
  }

  scrollModeDraw(frame) {
    const frameType = this.streamParams.frameType;
    const frameRate = this.streamParams.frameRate;
    const frameSize = this.streamParams.frameSize;
    const sourceSampleRate = this.streamParams.sourceSampleRate;

    const canvasDuration = this.params.get('duration');
    const ctx = this.ctx;
    const canvasWidth = this.canvasWidth;
    const canvasHeight = this.canvasHeight;

    const previousFrame = this.previousFrame;

    const currentTime = this.currentTime; // current time at the left of the canvas
    const frameStartTime = frame.time;
    const lastFrameTime = previousFrame ? previousFrame.time : 0;
    const lastFrameDuration = this.lastFrameDuration ? this.lastFrameDuration : 0;

    let frameDuration;

    if (frameType === 'scalar' || frameType === 'vector') {
      const pixelDuration = canvasDuration / canvasWidth;
      frameDuration = this.getMinimumFrameWidth() * pixelDuration;
    } else if (this.streamParams.frameType === 'signal') {
      frameDuration = frameSize / sourceSampleRate;
    }

    const frameEndTime = frameStartTime + frameDuration;
    // define if we need to shift the canvas
    const shiftTime = frameEndTime - currentTime;

    // if (frameType === 'scalar')
    //   console.log(shiftTime);

    // if the canvas is not synced, should never go to `else`
    if (shiftTime > 0) {
      // shift the canvas of shiftTime in pixels
      const fShift = (shiftTime / canvasDuration) * canvasWidth - this.shiftError;
      const iShift = Math.floor(fShift + 0.5);
      this.shiftError = fShift - iShift;

      const currentTime = frameStartTime + frameDuration;
      this.shiftCanvas(iShift, currentTime);

      // @todo - propagate to siblings (nbr of pixels and `frameEnd` (new currentTime))
      if (this.displaySync)
        this.displaySync.shiftSiblings(iShift, currentTime, this);
    } else {
      // @todo - all the frame can be drawn inside the currently displayed canvas
    }

    // @todo - check possibility of maintaining these values only from shift
    //  to maintain error tracking at only one place ?

    // width of the frame in pixels
    const fFrameWidth = (frameDuration / canvasDuration) * canvasWidth;
    const frameWidth = Math.floor(fFrameWidth + 0.5);

    // define position of the head in the canvas
    const canvasStartTime = this.currentTime - canvasDuration;
    const startTimeRatio = (frameStartTime - canvasStartTime) / canvasDuration;
    const startTimePosition = startTimeRatio * canvasWidth;

    // number of pixels since last frame
    let pixelsSinceLastFrame = this.lastFrameWidth;

    if ((frameType === 'scalar' || frameType === 'vector') && previousFrame) {
      const frameInterval = frame.time - previousFrame.time;
      pixelsSinceLastFrame = (frameInterval / canvasDuration) * canvasWidth;
    }

    // draw current frame
    ctx.save();
    ctx.translate(startTimePosition, 0);
    this.processFunction(frame, frameWidth, pixelsSinceLastFrame);
    ctx.restore();

    // copy canvas into cached canvas
    this.cachedCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.cachedCtx.drawImage(this.canvas, 0, 0, this.canvasWidth, this.canvasHeight);

    // update lastFrameDuration, lastFrameWidth
    this.lastFrameDuration = frameDuration;
    this.lastFrameWidth = frameWidth;
    this.previousFrame = frame;
  }

  shiftCanvas(iShift, time) {
    const ctx = this.ctx;
    const cache = this.cachedCanvas;
    const width = this.canvasWidth;
    const height = this.canvasHeight;

    ctx.clearRect(0, 0, width, height);
    const croppedWidth = width - iShift;

    this.currentTime = time;

    ctx.drawImage(this.cachedCanvas, iShift, 0, croppedWidth, height, 0, 0, croppedWidth, height);

    this.cachedCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.cachedCtx.drawImage(this.canvas, 0, 0, this.canvasWidth, this.canvasHeight);
  }

  // /**
  //  * Default draw mode. Draw from right to left, pushing old content as new
  //  * content arrive.
  //  *
  //  * @param {Object} frame
  //  */
  // scrollModeDraw(frame) {
  //   const frameType = this.streamParams.frameType;
  //   const frameRate = this.streamParams.frameRate;
  //   const frameSize = this.streamParams.frameSize;
  //   const sourceSampleRate = this.streamParams.sourceSampleRate;

  //   const canvasDuration = this.params.get('duration');
  //   const ctx = this.ctx;
  //   const canvasWidth = this.canvasWidth;
  //   const canvasHeight = this.canvasHeight;

  //   // shift canvas according to first frame time and reference time
  //   if (!this.previousFrame) {
  //     // return;
  //     // // `lastTime` is set to `referenceTime`
  //     // const firstHopDuration = frame.time - this.lastTime;
  //     // // no shift error so far...
  //     // const fShift = (firstHopDuration / canvasDuration) * canvasWidth;
  //     // const iShift = Math.floor(fShift + 0.5);
  //     // const error = iShift - fShift;

  //     // this.shiftCanvas(iShift);
  //     // this.lastShiftError = error;
  //     // this.lastTime = frame.time;
  //   }

  //   // duration of the frame
  //   let frameDisplayDuration = 0;

  //   if (
  //     this.streamParams.frameType === 'scalar' ||
  //     this.streamParams.frameType === 'vector'
  //   ) {
  //     const frameWidth = this.getMinimumFrameWidth();
  //     const pixelDuration = canvasDuration / canvasWidth;
  //     frameDisplayDuration = pixelDuration * frameWidth;

  //     if (this.previousFrame)
  //       frameDisplayDuration += frame.time - this.lastTime;

  //     console.log(frame.time, this.lastTime);

  //   } else if (this.streamParams.frameType === 'signal') {
  //     // don't deal with hopsizes for now
  //     frameDisplayDuration = frameSize / sourceSampleRate;
  //   }

  //   const fShift = (frameDisplayDuration / canvasDuration) * canvasWidth - this.lastShiftError;
  //   const iShift = Math.floor(fShift + 0.5);
  //   this.lastShiftError = iShift - fShift;

  //   console.log(this.constructor.name + '.iShift', iShift);
  //   console.log(this.constructor.name + '.currentPartialShift', this.currentPartialShift);

  //   const shift = iShift - this.currentPartialShift;

  //   console.log(this.constructor.name + '.shift', shift);

  //   this.lastTime += frameDisplayDuration;
  //   this.previousFrame = frame;

  //   if (shift > 0) {
  //     this.shiftCanvas(shift, this.lastTime);

  //     if (this.displaySync)
  //       this.displaySync.shiftSiblings(shift, this.lastTime, this);

  //     // remove the added partial shift for the crop
  //     this.currentPartialShift -= shift;
  //   }

  //   // console.log(this.constructor.name + '.currentPartialShift', this.currentPartialShift);


  //   if (shift < 0) {
  //     this.writeHead += shift;
  //     this.currentPartialShift += shift;
  //   }



  //   // console.log(this.constructor.name + '.writeHead', writeHead);
  //   // translate to the current frame and draw a new polygon
  //   ctx.save();
  //   ctx.translate(this.writeHead, 0);
  //   console.log(this.constructor.name + '.writeHead', this.writeHead);

  //   this.processFunction(frame, this.previousFrame, iShift);

  //   ctx.restore();

  //   // save current state into buffering canvas
  //   this.cachedCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  //   this.cachedCtx.drawImage(this.canvas, 0, 0, canvasWidth, canvasHeight);
  // }

  // shiftCanvas(shift, time) {
  //   const ctx = this.ctx;
  //   const width = this.canvasWidth;
  //   const height = this.canvasHeight;

  //   // if (fromSibling)
  //   this.currentPartialShift += shift;

  //   if (time > this.lastTime)
  //     this.lastTime = time;

  //   ctx.clearRect(0, 0, width, height);
  //   ctx.save();

  //   const croppedWidth = width - this.currentPartialShift;

  //   ctx.drawImage(this.cachedCanvas,
  //     this.currentPartialShift, 0, croppedWidth, height,
  //     0, 0, croppedWidth, height
  //   );

  //   ctx.restore();
  // }

  /**
   * Interface method to implement in order to define how to draw the shape
   * between the previous and the current frame, assuming the canvas context
   * is centered on the current frame.
   *
   * @param {Object} frame - Current frame.
   * @param {Object} prevFrame - Previous frame.
   * @param {Number} iShift - Number of pixels between the last and the current
   *  frame.
   */


  // @todo - Fix trigger mode
  // allow to witch easily between the 2 modes
  // setTrigger(bool) {
  //   this.params.trigger = bool;
  //   // clear canvas and cache
  //   this.ctx.clearRect(0, 0, this.params.width, this.params.height);
  //   this.cachedCtx.clearRect(0, 0, this.params.width, this.params.height);
  //   // reset _currentXPosition
  //   this._currentXPosition = 0;
  //   this.lastShiftError = 0;
  // }

  // executeDraw(frame) {
  //   // if (this.params.trigger)
  //   //   this.triggerModeDraw(time, frame);
  //   // else
  //   this.scrollModeDraw(frame);
  // }

  // /**
  //  * Alternative drawing mode.
  //  * Draw from left to right, go back to left when > width
  //  */
  // triggerModeDraw(time, frame) {
  //   const width  = this.params.width;
  //   const height = this.params.height;
  //   const duration = this.params.duration;
  //   const ctx = this.ctx;

  //   const dt = time - this.previousTime;
  //   const fShift = (dt / duration) * width - this.lastShiftError; // px
  //   const iShift = Math.round(fShift);
  //   this.lastShiftError = iShift - fShift;

  //   this.currentXPosition += iShift;

  //   // draw the right part
  //   ctx.save();
  //   ctx.translate(this.currentXPosition, 0);
  //   ctx.clearRect(-iShift, 0, iShift, height);
  //   this.drawCurve(frame, iShift);
  //   ctx.restore();

  //   // go back to the left of the canvas and redraw the same thing
  //   if (this.currentXPosition > width) {
  //     // go back to start
  //     this.currentXPosition -= width;

  //     ctx.save();
  //     ctx.translate(this.currentXPosition, 0);
  //     ctx.clearRect(-iShift, 0, iShift, height);
  //     this.drawCurve(frame, this.previousFrame, iShift);
  //     ctx.restore();
  //   }
  // }

}

export default BaseDisplay;
