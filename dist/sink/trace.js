'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var BaseDraw = require('./base-draw');

var _require = require('../utils/draw-utils');

var getRandomColor = _require.getRandomColor;
var getHue = _require.getHue;
var hexToRGB = _require.hexToRGB;

var Trace = (function (_BaseDraw) {
  _inherits(Trace, _BaseDraw);

  function Trace(options) {
    _classCallCheck(this, Trace);

    var defaults = {
      colorScheme: 'none' // color, opacity
    };

    _get(Object.getPrototypeOf(Trace.prototype), 'constructor', this).call(this, options, defaults);
  }

  _createClass(Trace, [{
    key: 'initialize',
    value: function initialize() {
      _get(Object.getPrototypeOf(Trace.prototype), 'initialize', this).call(this);

      if (!this.params.color) {
        this.params.color = getRandomColor();
      }
    }
  }, {
    key: 'process',
    value: function process(time, frame) {
      this.scrollModeDraw(time, frame);
      _get(Object.getPrototypeOf(Trace.prototype), 'process', this).call(this, time, frame);
    }
  }, {
    key: 'drawCurve',
    value: function drawCurve(frame, prevFrame, iShift) {
      var ctx = this.ctx;
      var color;

      var halfRange = frame[1] / 2;
      var mean = this.getYPosition(frame[0]);
      var min = this.getYPosition(frame[0] - halfRange);
      var max = this.getYPosition(frame[0] + halfRange);

      if (prevFrame) {
        var prevHalfRange = prevFrame[1] / 2;
        var prevMin = this.getYPosition(prevFrame[0] - prevHalfRange);
        var prevMax = this.getYPosition(prevFrame[0] + prevHalfRange);
      }

      switch (this.params.colorScheme) {
        case 'none':
          ctx.fillStyle = this.params.color;
          break;
        case 'hue':
          var gradient = ctx.createLinearGradient(-iShift, 0, 0, 0);

          if (prevFrame) {
            gradient.addColorStop(0, 'hsl(' + getHue(prevFrame[2]) + ', 100%, 50%)');
          } else {
            gradient.addColorStop(0, 'hsl(' + getHue(frame[2]) + ', 100%, 50%)');
          }

          gradient.addColorStop(1, 'hsl(' + getHue(frame[2]) + ', 100%, 50%)');
          ctx.fillStyle = gradient;
          break;
        case 'opacity':
          var rgb = hexToRGB(this.params.color);
          var gradient = ctx.createLinearGradient(-iShift, 0, 0, 0);

          if (prevFrame) {
            gradient.addColorStop(0, 'rgba(' + rgb.join(',') + ',' + prevFrame[2] + ')');
          } else {
            gradient.addColorStop(0, 'rgba(' + rgb.join(',') + ',' + frame[2] + ')');
          }

          gradient.addColorStop(1, 'rgba(' + rgb.join(',') + ',' + frame[2] + ')');
          ctx.fillStyle = gradient;
          break;
      }

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, mean);
      ctx.lineTo(0, max);

      if (prevFrame) {
        ctx.lineTo(-iShift, prevMax);
        ctx.lineTo(-iShift, prevMin);
      }

      ctx.lineTo(0, min);
      ctx.closePath();

      ctx.fill();
      ctx.restore();
    }
  }]);

  return Trace;
})(BaseDraw);

;

module.exports = Trace;
//# sourceMappingURL=data:application/json;base64,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QUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEIsU0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7O0FBRW5CLFVBQUksU0FBUyxFQUFFO0FBQ2IsV0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM3QixXQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQzlCOztBQUVELFNBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLFNBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFaEIsU0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1gsU0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2Y7OztTQWxGRyxLQUFLO0dBQVMsUUFBUTs7QUFtRjNCLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiZXM2L3NpbmsvdHJhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBCYXNlRHJhdyA9IHJlcXVpcmUoJy4vYmFzZS1kcmF3Jyk7XG52YXIgeyBnZXRSYW5kb21Db2xvciwgZ2V0SHVlLCBoZXhUb1JHQiB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvZHJhdy11dGlscycpO1xuXG5jbGFzcyBUcmFjZSBleHRlbmRzIEJhc2VEcmF3IHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgY29sb3JTY2hlbWU6ICdub25lJyAvLyBjb2xvciwgb3BhY2l0eVxuICAgIH07XG5cbiAgICBzdXBlcihvcHRpb25zLCBkZWZhdWx0cyk7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHN1cGVyLmluaXRpYWxpemUoKTtcblxuICAgIGlmICghdGhpcy5wYXJhbXMuY29sb3IpIHsgdGhpcy5wYXJhbXMuY29sb3IgPSBnZXRSYW5kb21Db2xvcigpOyB9XG4gIH1cblxuICBwcm9jZXNzKHRpbWUsIGZyYW1lKSB7XG4gICAgdGhpcy5zY3JvbGxNb2RlRHJhdyh0aW1lLCBmcmFtZSk7XG4gICAgc3VwZXIucHJvY2Vzcyh0aW1lLCBmcmFtZSk7XG4gIH1cblxuICBkcmF3Q3VydmUoZnJhbWUsIHByZXZGcmFtZSwgaVNoaWZ0KSB7XG4gICAgdmFyIGN0eCA9IHRoaXMuY3R4O1xuICAgIHZhciBjb2xvcjtcblxuICAgIHZhciBoYWxmUmFuZ2UgPSBmcmFtZVsxXSAvIDI7XG4gICAgdmFyIG1lYW4gPSB0aGlzLmdldFlQb3NpdGlvbihmcmFtZVswXSk7XG4gICAgdmFyIG1pbiA9IHRoaXMuZ2V0WVBvc2l0aW9uKGZyYW1lWzBdIC0gaGFsZlJhbmdlKTtcbiAgICB2YXIgbWF4ID0gdGhpcy5nZXRZUG9zaXRpb24oZnJhbWVbMF0gKyBoYWxmUmFuZ2UpO1xuXG4gICAgaWYgKHByZXZGcmFtZSkge1xuICAgICAgdmFyIHByZXZIYWxmUmFuZ2UgPSBwcmV2RnJhbWVbMV0gLyAyO1xuICAgICAgdmFyIHByZXZNaW4gPSB0aGlzLmdldFlQb3NpdGlvbihwcmV2RnJhbWVbMF0gLSBwcmV2SGFsZlJhbmdlKTtcbiAgICAgIHZhciBwcmV2TWF4ID0gdGhpcy5nZXRZUG9zaXRpb24ocHJldkZyYW1lWzBdICsgcHJldkhhbGZSYW5nZSk7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLnBhcmFtcy5jb2xvclNjaGVtZSkge1xuICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5jb2xvcjtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaHVlJzpcbiAgICAgICAgdmFyIGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC1pU2hpZnQsIDAsIDAsIDApO1xuXG4gICAgICAgIGlmIChwcmV2RnJhbWUpIHtcbiAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJ2hzbCgnICsgZ2V0SHVlKHByZXZGcmFtZVsyXSkgKyAnLCAxMDAlLCA1MCUpJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsICdoc2woJyArIGdldEh1ZShmcmFtZVsyXSkgKyAnLCAxMDAlLCA1MCUpJyk7XG4gICAgICAgIH1cblxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgJ2hzbCgnICsgZ2V0SHVlKGZyYW1lWzJdKSArICcsIDEwMCUsIDUwJSknKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgdmFyIHJnYiA9IGhleFRvUkdCKHRoaXMucGFyYW1zLmNvbG9yKTtcbiAgICAgICAgdmFyIGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC1pU2hpZnQsIDAsIDAsIDApO1xuXG4gICAgICAgIGlmIChwcmV2RnJhbWUpIHtcbiAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoJyArIHJnYi5qb2luKCcsJykgKyAnLCcgKyBwcmV2RnJhbWVbMl0gKyAnKScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAncmdiYSgnICsgcmdiLmpvaW4oJywnKSArICcsJyArIGZyYW1lWzJdICsgJyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAncmdiYSgnICsgcmdiLmpvaW4oJywnKSArICcsJyArIGZyYW1lWzJdICsgJyknKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygwLCBtZWFuKTtcbiAgICBjdHgubGluZVRvKDAsIG1heCk7XG5cbiAgICBpZiAocHJldkZyYW1lKSB7XG4gICAgICBjdHgubGluZVRvKC1pU2hpZnQsIHByZXZNYXgpO1xuICAgICAgY3R4LmxpbmVUbygtaVNoaWZ0LCBwcmV2TWluKTtcbiAgICB9XG5cbiAgICBjdHgubGluZVRvKDAsIG1pbik7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNlO1xuIl19