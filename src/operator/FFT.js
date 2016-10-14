import BaseLfo from '../core/BaseLfo';
import initWindow from '../utils/windows';
import parameters from 'parameters';

// https://code.soundsoftware.ac.uk/projects/js-dsp-test/repository/entry/fft/nayuki-obj/fft.js
/*
 * Free FFT and convolution (JavaScript)
 *
 * Copyright (c) 2014 Project Nayuki
 * http://www.nayuki.io/page/free-small-fft-in-multiple-languages
 *
 * (MIT License)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 *
 * Slightly restructured by Chris Cannam, cannam@all-day-breakfast.com
 *
 * @private
 */
/*
 * Construct an object for calculating the discrete Fourier transform (DFT) of
 * size n, where n is a power of 2.
 *
 * @private
 */
function FFTNayuki(n) {

  this.n = n;
  this.levels = -1;

  for (var i = 0; i < 32; i++) {
    if (1 << i == n) {
      this.levels = i;  // Equal to log2(n)
    }
  }

  if (this.levels == -1) {
    throw "Length is not a power of 2";
  }

  this.cosTable = new Array(n / 2);
  this.sinTable = new Array(n / 2);

  for (var i = 0; i < n / 2; i++) {
    this.cosTable[i] = Math.cos(2 * Math.PI * i / n);
    this.sinTable[i] = Math.sin(2 * Math.PI * i / n);
  }

  /*
   * Computes the discrete Fourier transform (DFT) of the given complex vector,
   * storing the result back into the vector.
   * The vector's length must be equal to the size n that was passed to the
   * object constructor, and this must be a power of 2. Uses the Cooley-Tukey
   * decimation-in-time radix-2 algorithm.
   *
   * @private
   */
  this.forward = function(real, imag) {
    var n = this.n;

    // Bit-reversed addressing permutation
    for (var i = 0; i < n; i++) {
      var j = reverseBits(i, this.levels);

      if (j > i) {
        var temp = real[i];
        real[i] = real[j];
        real[j] = temp;
        temp = imag[i];
        imag[i] = imag[j];
        imag[j] = temp;
      }
    }

    // Cooley-Tukey decimation-in-time radix-2 FFT
    for (var size = 2; size <= n; size *= 2) {
      var halfsize = size / 2;
      var tablestep = n / size;

      for (var i = 0; i < n; i += size) {
        for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
          var tpre =  real[j+halfsize] * this.cosTable[k] +
                      imag[j+halfsize] * this.sinTable[k];
          var tpim = -real[j+halfsize] * this.sinTable[k] +
                      imag[j+halfsize] * this.cosTable[k];
          real[j + halfsize] = real[j] - tpre;
          imag[j + halfsize] = imag[j] - tpim;
          real[j] += tpre;
          imag[j] += tpim;
        }
      }
    }

    // Returns the integer whose value is the reverse of the lowest 'bits'
    // bits of the integer 'x'.
    function reverseBits(x, bits) {
      var y = 0;

      for (var i = 0; i < bits; i++) {
        y = (y << 1) | (x & 1);
        x >>>= 1;
      }

      return y;
    }
  }

  /*
   * Computes the inverse discrete Fourier transform (IDFT) of the given complex
   * vector, storing the result back into the vector.
   * The vector's length must be equal to the size n that was passed to the
   * object constructor, and this must be a power of 2. This is a wrapper
   * function. This transform does not perform scaling, so the inverse is not
   * a true inverse.
   *
   * @private
   */
  this.inverse = function(real, imag) {
    forward(imag, real);
  }
}




const sqrt = Math.sqrt;

const isPowerOfTwo = function(number) {
  while ((number % 2 === 0) && number > 1)
    number = number / 2;

  return number === 1;
}

const definitions = {
  size: {
    type: 'integer',
    default: 1024,
    metas: { kind: 'static' },
  },
  window: {
    type: 'enum',
    list: ['none', 'hann', 'hanning', 'hamming', 'blackman', 'blackmanharris', 'sine', 'rectangle'],
    default: 'none',
    metas: { kind: 'static' },
  },
  mode: {
    type: 'enum',
    list: ['magnitude', 'power'], // add complex output
    default: 'magnitude',
  },
  norm: {
    type: 'enum',
    default: 'auto',
    list: ['auto', 'none', 'linear', 'power'],
  },
}

/**
 * Perfom a Fast Fourier Transform on the incomming signal.
 * This node is based on the [FFT implementation by Nayuki](https://code.soundsoftware.ac.uk/projects/js-dsp-test/repository/entry/fft/nayuki-obj/fft.js)
 *
 * @memberof module:operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.size=1024] - Size of the fft, should be a power of
 *  2. If the the frame size of the incomming signal is lower than this value,
 *  it is zero padded to match the fft size.
 * @param {String} [options.window='none'] - Name of the window applied on the
 *  incomming signal. Available windows are: 'none', 'hann', 'hanning',
 *  'hamming', 'blackman', 'blackmanharris', 'sine', 'rectangle'.
 * @param {String} [options.mode='magnitude'] - Type of the output (`magnitude`
 *  or `power`)
 * @param {String} [options.norm='auto'] - Type of normalization applied on the
 *  output. Possible values are 'auto', 'none', 'linear', 'power'. When set to
 *  `auto`, a `linear` normalization is applied on the magnitude spectrum, while
 *  a `power` normalizetion is applied on the power spectrum.
 *
 * @example
 * // assuming an `audioBuffer` exists
 * const source = new AudioInBuffer({ audioBuffer });
 *
 * const slicer = new Slicer({
 *   frameSize: 256,
 * });
 *
 * const fft = new FFT({
 *   mode: 'power',
 *   window: 'hann',
 *   norm: 'power',
 *   size: 256,
 * });
 *
 * source.connect(slicer);
 * slicer.connect(fft);
 * source.start();
 *
 * // > outputs 129 bins containing the values of the power spectrum (including
 * // > DC and Nyuist frequencies).
 *
 * @todo - check if 'rectangle' and 'none' windows are not redondant.
 * @todo - check default values for all params.
 */
class FFT extends BaseLfo {
  constructor(options) {
    super();

    this.params = parameters(definitions, options);

    this.windowSize = null;
    this.normalizeCoefs = null;
    this.window = null;
    this.real = null;
    this.imag = null;
    this.fft = null;

    if (!isPowerOfTwo(this.params.get('size')))
      throw new Error('fftSize must be a power of two');
  }

  /** @private */
  processStreamParams(prevStreamParams) {
    this.prepareStreamParams(prevStreamParams);
    // set the output frame size
    const inFrameSize = prevStreamParams.frameSize;
    const fftSize = this.params.get('size');
    const mode = this.params.get('mode');
    const norm = this.params.get('norm');
    let windowName = this.params.get('window');
    // window `none` and `rectangle` are aliases
    if (windowName === 'none')
      windowName = 'rectangle';

    this.streamParams.frameSize = fftSize / 2 + 1;
    this.streamParams.frameType = 'vector';
    this.streamParams.description = [];
    // size of the window to apply on the input frame
    this.windowSize = (inFrameSize < fftSize) ? inFrameSize : fftSize;

    // references to populate in the window functions (cf. `initWindow`)
    this.normalizeCoefs = { linear: 0, power: 0 };
    this.window = new Float32Array(this.windowSize);

    initWindow(
      windowName,         // name of the window
      this.window,        // buffer populated with the window signal
      this.windowSize,    // size of the window
      this.normalizeCoefs // object populated with the normalization coefs
    );

    const { linear, power } = this.normalizeCoefs;

    switch (norm) {
      case 'none':
        this.windowNorm = 1;
        break;

      case 'linear':
        this.windowNorm = linear;
        break;

      case 'power':
        this.windowNorm = power;
        break;

      case 'auto':
        if (mode === 'magnitude')
          this.windowNorm = linear;
        else if (mode === 'power')
          this.windowNorm = power;
        break;
    }

    this.real = new Float32Array(fftSize);
    this.imag = new Float32Array(fftSize);
    this.fft = new FFTNayuki(fftSize);

    this.propagateStreamParams();
  }

  /**
   * @todo - doc
   */
  inputSignal(signal) {
    const mode = this.params.get('mode');
    const windowSize = this.windowSize;
    const frameSize = this.streamParams.frameSize;
    const fftSize = this.params.get('size');
    const outData = this.frame.data;

    // apply window on the input signal and reset imag buffer
    for (let i = 0; i < windowSize; i++) {
      this.real[i] = signal[i] * this.window[i] * this.windowNorm;
      this.imag[i] = 0;
    }

    // if real is bigger than input signal, fill with zeros
    for (let i = windowSize; i < fftSize; i++) {
      this.real[i] = 0;
      this.imag[i] = 0;
    }

    this.fft.forward(this.real, this.imag);

    if (mode === 'magnitude') {
      const norm = 1 / fftSize;

      // DC index
      const realDc = this.real[0];
      const imagDc = this.imag[0];
      outData[0] = sqrt(realDc * realDc + imagDc * imagDc) * norm;

      // Nquyst index
      const realNy = this.real[fftSize / 2];
      const imagNy = this.imag[fftSize / 2];
      outData[fftSize / 2] = sqrt(realNy * realNy + imagNy * imagNy) * norm;

      // power spectrum
      for (let i = 1, j = fftSize - 1; i < fftSize / 2; i++, j--) {
        const real = 0.5 * (this.real[i] + this.real[j]);
        const imag = 0.5 * (this.imag[i] - this.imag[j]);

        outData[i] = 2 * sqrt(real * real + imag * imag) * norm;
      }

    } else if (mode === 'power') {
      const norm = 1 / (fftSize * fftSize);

      // DC index
      const realDc = this.real[0];
      const imagDc = this.imag[0];
      outData[0] = (realDc * realDc + imagDc * imagDc) * norm;

      // Nquyst index
      const realNy = this.real[fftSize / 2];
      const imagNy = this.imag[fftSize / 2];
      outData[fftSize / 2] = (realNy * realNy + imagNy * imagNy) * norm;

      // power spectrum
      for (let i = 1, j = fftSize - 1; i < fftSize / 2; i++, j--) {
        const real = 0.5 * (this.real[i] + this.real[j]);
        const imag = 0.5 * (this.imag[i] - this.imag[j]);

        outData[i] = 4 * (real * real + imag * imag) * norm;
      }
    }

    return outData;
  }

  /** @private */
  processSignal(frame) {
    this.inputSignal(frame.data);
  }
}

export default FFT;