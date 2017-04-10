'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decoders = exports.encoders = exports.opcodes = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//http://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer
// converts a nodejs Buffer to ArrayBuffer
// export function bufferToArrayBuffer(buffer) {
//   const ab = new ArrayBuffer(buffer.length);
//   const view = new Uint8Array(ab);

//   for (let i = 0; i < buffer.length; ++i)
//     view[i] = buffer[i];

//   return ab;
// }

// export function arrayBufferToBuffer(arrayBuffer) {
//   const buffer = new Buffer(arrayBuffer.byteLength);
//   const view = new Uint8Array(arrayBuffer);

//   for (let i = 0; i < buffer.length; ++i)
//     buffer[i] = view[i];

//   return buffer;
// }

var opcodes = exports.opcodes = {
  INIT_MODULE_REQ: 10,
  INIT_MODULE_ACK: 11,
  PROCESS_STREAM_PARAMS: 12,
  RESET_STREAM: 13,
  FINALIZE_STREAM: 14,
  PROCESS_FRAME: 15
};

// http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
function Uint16Array2json(arr) {
  var str = String.fromCharCode.apply(null, arr);
  return JSON.parse(str.replace(/\u0000/g, ''));
}

function json2Uint16Array(json) {
  var str = (0, _stringify2.default)(json);
  var buffer = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufferView = new Uint16Array(buffer);

  for (var i = 0, l = str.length; i < l; i++) {
    bufferView[i] = str.charCodeAt(i);
  }return bufferView;
}

//
var encoders = exports.encoders = {
  opcode: function opcode(name) {
    var opcode = opcodes[name];
    var buffer = new Uint16Array(1);
    buffer[0] = opcode;

    return buffer;
  },

  // `opcode`    2 bytes (Uint16) |
  initModuleReq: function initModuleReq() {
    var payload = encoders.opcode('INIT_MODULE_REQ');
    return payload.buffer;
  },
  // `opcode`    2 bytes (Uint16) |
  initModuleAck: function initModuleAck() {
    var payload = encoders.opcode('INIT_MODULE_ACK');
    return payload.buffer;
  },
  // `opcode`    2 bytes (Uint16) |
  // `streamParams`  n bytes (Uint16)
  streamParams: function streamParams(_streamParams) {
    var opcode = encoders.opcode('PROCESS_STREAM_PARAMS');
    var streamParamsBuffer = json2Uint16Array(_streamParams);

    var payload = new Uint16Array(1 + streamParamsBuffer.length);
    payload.set(opcode, 0);
    payload.set(streamParamsBuffer, 1);

    return payload.buffer;
  },
  // `opcode`    2 bytes (Uint16) |
  resetStream: function resetStream() {
    var payload = encoders.opcode('RESET_STREAM');
    return payload.buffer;
  },
  // `opcode`    2 bytes (Uint16) |
  // `endTime`   8 bytes (Float64)
  finalizeStream: function finalizeStream(endTime) {
    var opcode = encoders.opcode('RESET_STREAM');

    var endTimeBuffer = new Float64Array(1);
    endTimeBuffer[0] = endTime;

    var payload = new Uint16Array(1 + 4);
    payload.set(opcode, 0);
    payload.set(new Uint16Array(endTimeBuffer.buffer), 1);

    return payload.buffer;
  },
  // `opcode`    2 bytes (Uint16) |
  // `time`      8 bytes (Float64) |
  // `data`      frameSize * 4 (Float32) |
  // `metadata`  n bytes (Uint16)
  processFrame: function processFrame(frame, frameSize) {
    var opcode = encoders.opcode('PROCESS_FRAME');

    var time = new Float64Array(1);
    time[0] = frame.time;

    var data = new Float32Array(frameSize);
    for (var i = 0; i < frameSize; i++) {
      data[i] = frame.data[i];
    }var metadata = json2Uint16Array(frame.metadata);

    var length = 1 + 4 + 2 * frameSize + metadata.length;
    var payload = new Uint16Array(length);
    payload.set(opcode, 0);
    payload.set(new Uint16Array(time.buffer), 1);
    payload.set(new Uint16Array(data.buffer), 1 + 4);
    payload.set(metadata, 1 + 4 + 2 * frameSize);

    return payload.buffer;
  }
};

var decoders = exports.decoders = {
  opcode: function opcode(arrayBuffer) {
    return new Uint16Array(arrayBuffer)[0];
  },

  // `opcode`    2 bytes (Uint16) |
  // `streamParams`  n bytes (Uint16)
  streamParams: function streamParams(arrayBuffer) {
    var payload = new Uint16Array(arrayBuffer.slice(2));
    var prevStreamParams = Uint16Array2json(payload);
    return prevStreamParams;
  },

  // `opcode`    2 bytes (Uint16) |
  // `endTime`   8 bytes (Float64)
  finalizeStream: function finalizeStream(arrayBuffer) {
    return new Float64Array(arrayBuffer.slice(2))[0];
  },

  // `opcode`    2 bytes (Uint16) |
  // `time`      8 bytes (Float64) |
  // `data`      frameSize * 4 (Float32) |
  // `metadata`  n bytes (Uint16)
  processFrame: function processFrame(arrayBuffer, frameSize) {
    // 1 * 8 bytes
    var timeStart = 2;
    var timeEnd = timeStart + 8;
    var time = new Float64Array(arrayBuffer.slice(timeStart, timeEnd))[0];
    // frameSize * 4 bytes
    var dataStart = timeEnd;
    var dataEnd = dataStart + 4 * frameSize;
    var data = new Float32Array(arrayBuffer.slice(dataStart, dataEnd));
    // rest of payload
    var metaStart = dataEnd;
    var metaBuffer = new Uint16Array(arrayBuffer.slice(metaStart));
    var metadata = Uint16Array2json(metaBuffer);

    return { time: time, data: data, metadata: metadata };
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndzVXRpbHMuanMiXSwibmFtZXMiOlsib3Bjb2RlcyIsIklOSVRfTU9EVUxFX1JFUSIsIklOSVRfTU9EVUxFX0FDSyIsIlBST0NFU1NfU1RSRUFNX1BBUkFNUyIsIlJFU0VUX1NUUkVBTSIsIkZJTkFMSVpFX1NUUkVBTSIsIlBST0NFU1NfRlJBTUUiLCJVaW50MTZBcnJheTJqc29uIiwiYXJyIiwic3RyIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYXBwbHkiLCJKU09OIiwicGFyc2UiLCJyZXBsYWNlIiwianNvbjJVaW50MTZBcnJheSIsImpzb24iLCJidWZmZXIiLCJBcnJheUJ1ZmZlciIsImxlbmd0aCIsImJ1ZmZlclZpZXciLCJVaW50MTZBcnJheSIsImkiLCJsIiwiY2hhckNvZGVBdCIsImVuY29kZXJzIiwib3Bjb2RlIiwibmFtZSIsImluaXRNb2R1bGVSZXEiLCJwYXlsb2FkIiwiaW5pdE1vZHVsZUFjayIsInN0cmVhbVBhcmFtcyIsInN0cmVhbVBhcmFtc0J1ZmZlciIsInNldCIsInJlc2V0U3RyZWFtIiwiZmluYWxpemVTdHJlYW0iLCJlbmRUaW1lIiwiZW5kVGltZUJ1ZmZlciIsIkZsb2F0NjRBcnJheSIsInByb2Nlc3NGcmFtZSIsImZyYW1lIiwiZnJhbWVTaXplIiwidGltZSIsImRhdGEiLCJGbG9hdDMyQXJyYXkiLCJtZXRhZGF0YSIsImRlY29kZXJzIiwiYXJyYXlCdWZmZXIiLCJzbGljZSIsInByZXZTdHJlYW1QYXJhbXMiLCJ0aW1lU3RhcnQiLCJ0aW1lRW5kIiwiZGF0YVN0YXJ0IiwiZGF0YUVuZCIsIm1ldGFTdGFydCIsIm1ldGFCdWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVPLElBQU1BLDRCQUFVO0FBQ3JCQyxtQkFBaUIsRUFESTtBQUVyQkMsbUJBQWlC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cUIsQ0FBakIiLCJmaWxlIjoid3NVdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NjA5Mjg5L2NvbnZlcnQtYS1iaW5hcnktbm9kZWpzLWJ1ZmZlci10by1qYXZhc2NyaXB0LWFycmF5YnVmZmVyXG4vLyBjb252ZXJ0cyBhIG5vZGVqcyBCdWZmZXIgdG8gQXJyYXlCdWZmZXJcbi8vIGV4cG9ydCBmdW5jdGlvbiBidWZmZXJUb0FycmF5QnVmZmVyKGJ1ZmZlcikge1xuLy8gICBjb25zdCBhYiA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXIubGVuZ3RoKTtcbi8vICAgY29uc3QgdmlldyA9IG5ldyBVaW50OEFycmF5KGFiKTtcblxuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlci5sZW5ndGg7ICsraSlcbi8vICAgICB2aWV3W2ldID0gYnVmZmVyW2ldO1xuXG4vLyAgIHJldHVybiBhYjtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGFycmF5QnVmZmVyVG9CdWZmZXIoYXJyYXlCdWZmZXIpIHtcbi8vICAgY29uc3QgYnVmZmVyID0gbmV3IEJ1ZmZlcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbi8vICAgY29uc3QgdmlldyA9IG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKTtcblxuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlci5sZW5ndGg7ICsraSlcbi8vICAgICBidWZmZXJbaV0gPSB2aWV3W2ldO1xuXG4vLyAgIHJldHVybiBidWZmZXI7XG4vLyB9XG5cbmV4cG9ydCBjb25zdCBvcGNvZGVzID0ge1xuICBJTklUX01PRFVMRV9SRVE6IDEwLFxuICBJTklUX01PRFVMRV9BQ0s6IDExLFxuICBQUk9DRVNTX1NUUkVBTV9QQVJBTVM6IDEyLFxuICBSRVNFVF9TVFJFQU06IDEzLFxuICBGSU5BTElaRV9TVFJFQU06IDE0LFxuICBQUk9DRVNTX0ZSQU1FOiAxNVxufVxuXG4vLyBodHRwOi8vdXBkYXRlcy5odG1sNXJvY2tzLmNvbS8yMDEyLzA2L0hvdy10by1jb252ZXJ0LUFycmF5QnVmZmVyLXRvLWFuZC1mcm9tLVN0cmluZ1xuZnVuY3Rpb24gVWludDE2QXJyYXkyanNvbihhcnIpIHtcbiAgY29uc3Qgc3RyID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBhcnIpO1xuICByZXR1cm4gSlNPTi5wYXJzZShzdHIucmVwbGFjZSgvXFx1MDAwMC9nLCAnJykpXG59XG5cbmZ1bmN0aW9uIGpzb24yVWludDE2QXJyYXkoanNvbikge1xuICBjb25zdCBzdHIgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcbiAgY29uc3QgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHN0ci5sZW5ndGggKiAyKTsgLy8gMiBieXRlcyBmb3IgZWFjaCBjaGFyXG4gIGNvbnN0IGJ1ZmZlclZpZXcgPSBuZXcgVWludDE2QXJyYXkoYnVmZmVyKTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IHN0ci5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgYnVmZmVyVmlld1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuXG4gIHJldHVybiBidWZmZXJWaWV3O1xufVxuXG4vL1xuZXhwb3J0IGNvbnN0IGVuY29kZXJzID0ge1xuICBvcGNvZGUobmFtZSkge1xuICAgIGNvbnN0IG9wY29kZSA9IG9wY29kZXNbbmFtZV07XG4gICAgY29uc3QgYnVmZmVyID0gbmV3IFVpbnQxNkFycmF5KDEpO1xuICAgIGJ1ZmZlclswXSA9IG9wY29kZTtcblxuICAgIHJldHVybiBidWZmZXI7XG4gIH0sXG4gIC8vIGBvcGNvZGVgICAgIDIgYnl0ZXMgKFVpbnQxNikgfFxuICBpbml0TW9kdWxlUmVxOiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBwYXlsb2FkID0gZW5jb2RlcnMub3Bjb2RlKCdJTklUX01PRFVMRV9SRVEnKTtcbiAgICByZXR1cm4gcGF5bG9hZC5idWZmZXI7XG4gIH0sXG4gIC8vIGBvcGNvZGVgICAgIDIgYnl0ZXMgKFVpbnQxNikgfFxuICBpbml0TW9kdWxlQWNrOiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBwYXlsb2FkID0gZW5jb2RlcnMub3Bjb2RlKCdJTklUX01PRFVMRV9BQ0snKTtcbiAgICByZXR1cm4gcGF5bG9hZC5idWZmZXI7XG4gIH0sXG4gIC8vIGBvcGNvZGVgICAgIDIgYnl0ZXMgKFVpbnQxNikgfFxuICAvLyBgc3RyZWFtUGFyYW1zYCAgbiBieXRlcyAoVWludDE2KVxuICBzdHJlYW1QYXJhbXM6IGZ1bmN0aW9uKHN0cmVhbVBhcmFtcykge1xuICAgIGNvbnN0IG9wY29kZSA9IGVuY29kZXJzLm9wY29kZSgnUFJPQ0VTU19TVFJFQU1fUEFSQU1TJyk7XG4gICAgY29uc3Qgc3RyZWFtUGFyYW1zQnVmZmVyID0ganNvbjJVaW50MTZBcnJheShzdHJlYW1QYXJhbXMpO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IG5ldyBVaW50MTZBcnJheSgxICsgc3RyZWFtUGFyYW1zQnVmZmVyLmxlbmd0aCk7XG4gICAgcGF5bG9hZC5zZXQob3Bjb2RlLCAwKTtcbiAgICBwYXlsb2FkLnNldChzdHJlYW1QYXJhbXNCdWZmZXIsIDEpO1xuXG4gICAgcmV0dXJuIHBheWxvYWQuYnVmZmVyO1xuICB9LFxuICAvLyBgb3Bjb2RlYCAgICAyIGJ5dGVzIChVaW50MTYpIHxcbiAgcmVzZXRTdHJlYW06IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBlbmNvZGVycy5vcGNvZGUoJ1JFU0VUX1NUUkVBTScpO1xuICAgIHJldHVybiBwYXlsb2FkLmJ1ZmZlcjtcbiAgfSxcbiAgLy8gYG9wY29kZWAgICAgMiBieXRlcyAoVWludDE2KSB8XG4gIC8vIGBlbmRUaW1lYCAgIDggYnl0ZXMgKEZsb2F0NjQpXG4gIGZpbmFsaXplU3RyZWFtOiBmdW5jdGlvbihlbmRUaW1lKSB7XG4gICAgY29uc3Qgb3Bjb2RlID0gZW5jb2RlcnMub3Bjb2RlKCdSRVNFVF9TVFJFQU0nKTtcblxuICAgIGNvbnN0IGVuZFRpbWVCdWZmZXIgPSBuZXcgRmxvYXQ2NEFycmF5KDEpO1xuICAgIGVuZFRpbWVCdWZmZXJbMF0gPSBlbmRUaW1lO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IG5ldyBVaW50MTZBcnJheSgxICsgNCk7XG4gICAgcGF5bG9hZC5zZXQob3Bjb2RlLCAwKTtcbiAgICBwYXlsb2FkLnNldChuZXcgVWludDE2QXJyYXkoZW5kVGltZUJ1ZmZlci5idWZmZXIpLCAxKTtcblxuICAgIHJldHVybiBwYXlsb2FkLmJ1ZmZlcjtcbiAgfSxcbiAgLy8gYG9wY29kZWAgICAgMiBieXRlcyAoVWludDE2KSB8XG4gIC8vIGB0aW1lYCAgICAgIDggYnl0ZXMgKEZsb2F0NjQpIHxcbiAgLy8gYGRhdGFgICAgICAgZnJhbWVTaXplICogNCAoRmxvYXQzMikgfFxuICAvLyBgbWV0YWRhdGFgICBuIGJ5dGVzIChVaW50MTYpXG4gIHByb2Nlc3NGcmFtZTogZnVuY3Rpb24oZnJhbWUsIGZyYW1lU2l6ZSkge1xuICAgIGNvbnN0IG9wY29kZSA9IGVuY29kZXJzLm9wY29kZSgnUFJPQ0VTU19GUkFNRScpO1xuXG4gICAgY29uc3QgdGltZSA9IG5ldyBGbG9hdDY0QXJyYXkoMSk7XG4gICAgdGltZVswXSA9IGZyYW1lLnRpbWU7XG5cbiAgICBjb25zdCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShmcmFtZVNpemUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVTaXplOyBpKyspXG4gICAgICBkYXRhW2ldID0gZnJhbWUuZGF0YVtpXTtcblxuICAgIGNvbnN0IG1ldGFkYXRhID0ganNvbjJVaW50MTZBcnJheShmcmFtZS5tZXRhZGF0YSk7XG5cbiAgICBjb25zdCBsZW5ndGggPSAxICsgNCArICgyICogZnJhbWVTaXplKSArIG1ldGFkYXRhLmxlbmd0aDtcbiAgICBjb25zdCBwYXlsb2FkID0gbmV3IFVpbnQxNkFycmF5KGxlbmd0aCk7XG4gICAgcGF5bG9hZC5zZXQob3Bjb2RlLCAwKTtcbiAgICBwYXlsb2FkLnNldChuZXcgVWludDE2QXJyYXkodGltZS5idWZmZXIpLCAxKTtcbiAgICBwYXlsb2FkLnNldChuZXcgVWludDE2QXJyYXkoZGF0YS5idWZmZXIpLCAxICsgNCk7XG4gICAgcGF5bG9hZC5zZXQobWV0YWRhdGEsIDEgKyA0ICsgKDIgKiBmcmFtZVNpemUpKTtcblxuICAgIHJldHVybiBwYXlsb2FkLmJ1ZmZlcjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVjb2RlcnMgPSB7XG4gIG9wY29kZShhcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBuZXcgVWludDE2QXJyYXkoYXJyYXlCdWZmZXIpWzBdO1xuICB9LFxuICAvLyBgb3Bjb2RlYCAgICAyIGJ5dGVzIChVaW50MTYpIHxcbiAgLy8gYHN0cmVhbVBhcmFtc2AgIG4gYnl0ZXMgKFVpbnQxNilcbiAgc3RyZWFtUGFyYW1zKGFycmF5QnVmZmVyKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IG5ldyBVaW50MTZBcnJheShhcnJheUJ1ZmZlci5zbGljZSgyKSk7XG4gICAgY29uc3QgcHJldlN0cmVhbVBhcmFtcyA9IFVpbnQxNkFycmF5Mmpzb24ocGF5bG9hZCk7XG4gICAgcmV0dXJuIHByZXZTdHJlYW1QYXJhbXM7XG4gIH0sXG4gIC8vIGBvcGNvZGVgICAgIDIgYnl0ZXMgKFVpbnQxNikgfFxuICAvLyBgZW5kVGltZWAgICA4IGJ5dGVzIChGbG9hdDY0KVxuICBmaW5hbGl6ZVN0cmVhbShhcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBuZXcgRmxvYXQ2NEFycmF5KGFycmF5QnVmZmVyLnNsaWNlKDIpKVswXTtcbiAgfSxcbiAgLy8gYG9wY29kZWAgICAgMiBieXRlcyAoVWludDE2KSB8XG4gIC8vIGB0aW1lYCAgICAgIDggYnl0ZXMgKEZsb2F0NjQpIHxcbiAgLy8gYGRhdGFgICAgICAgZnJhbWVTaXplICogNCAoRmxvYXQzMikgfFxuICAvLyBgbWV0YWRhdGFgICBuIGJ5dGVzIChVaW50MTYpXG4gIHByb2Nlc3NGcmFtZShhcnJheUJ1ZmZlciwgZnJhbWVTaXplKSB7XG4gICAgICAvLyAxICogOCBieXRlc1xuICAgICAgY29uc3QgdGltZVN0YXJ0ID0gMjtcbiAgICAgIGNvbnN0IHRpbWVFbmQgPSB0aW1lU3RhcnQgKyA4O1xuICAgICAgY29uc3QgdGltZSA9IG5ldyBGbG9hdDY0QXJyYXkoYXJyYXlCdWZmZXIuc2xpY2UodGltZVN0YXJ0LCB0aW1lRW5kKSlbMF07XG4gICAgICAvLyBmcmFtZVNpemUgKiA0IGJ5dGVzXG4gICAgICBjb25zdCBkYXRhU3RhcnQgPSB0aW1lRW5kO1xuICAgICAgY29uc3QgZGF0YUVuZCA9IGRhdGFTdGFydCArIDQgKiBmcmFtZVNpemU7XG4gICAgICBjb25zdCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShhcnJheUJ1ZmZlci5zbGljZShkYXRhU3RhcnQsIGRhdGFFbmQpKTtcbiAgICAgIC8vIHJlc3Qgb2YgcGF5bG9hZFxuICAgICAgY29uc3QgbWV0YVN0YXJ0ID0gZGF0YUVuZDtcbiAgICAgIGNvbnN0IG1ldGFCdWZmZXIgPSBuZXcgVWludDE2QXJyYXkoYXJyYXlCdWZmZXIuc2xpY2UobWV0YVN0YXJ0KSk7XG4gICAgICBjb25zdCBtZXRhZGF0YSA9IFVpbnQxNkFycmF5Mmpzb24obWV0YUJ1ZmZlcik7XG5cbiAgICAgIHJldHVybiB7IHRpbWUsIGRhdGEsIG1ldGFkYXRhIH07XG4gIH1cbn1cbiJdfQ==