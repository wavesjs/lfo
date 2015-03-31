"use strict";

// http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
function Uint16Array2str(buf) {
  return String.fromCharCode.apply(null, buf);
}

function str2Uint16Array(str) {
  var buffer = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufferView = new Uint16Array(buffer);

  for (var i = 0, l = str.length; i < l; i++) {
    bufferView[i] = str.charCodeAt(i);
  }
  return bufferView;
}

//http://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer
// converts a nodejs Buffer to ArrayBuffer
module.exports.bufferToArrayBuffer = function (buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
};

module.exports.arrayBufferToBuffer = function (arrayBuffer) {
  var buffer = new Buffer(arrayBuffer.byteLength);
  var view = new Uint8Array(arrayBuffer);
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
};

// @TODO `encodeMessage` and `decodeMessage` could probably use DataView to parse the buffer

// concat the lfo stream, time and metaData into a single buffer
// the concatenation is done as follow :
//  * time          => 8 bytes
//  * frame.length  => 2 bytes
//  * frame         => 4 * frameLength bytes
//  * metaData      => rest of the message
// @return  ArrayBuffer of the created message
// @note    must create a new buffer each time because metaData length is not known
module.exports.encodeMessage = function (time, frame, metaData) {
  // should probably use use DataView instead
  // http://www.html5rocks.com/en/tutorials/webgl/typed_arrays/
  var time64 = new Float64Array(1);
  time64[0] = time;
  var time16 = new Uint16Array(time64.buffer);

  var length16 = new Uint16Array(1);
  length16[0] = frame.length;

  var frame16 = new Uint16Array(frame.buffer);

  var metaData16 = str2Uint16Array(JSON.stringify(metaData));

  var bufferLength = time16.length + length16.length + frame16.length + metaData16.length;

  var buffer = new Uint16Array(bufferLength);

  // buffer is the concatenation of time, frameLength, frame, metaData
  buffer.set(time16, 0);
  buffer.set(length16, time16.length);
  buffer.set(frame16, time16.length + length16.length);
  buffer.set(metaData16, time16.length + length16.length + frame16.length);

  return buffer.buffer;
};

// recreate the Lfo stream (time, frame, metaData) form a buffer
// created with `encodeMessage`
module.exports.decodeMessage = function (buffer) {
  // time is a float64Array of size 1 (8 bytes)
  var timeArray = new Float64Array(buffer.slice(0, 8));
  var time = timeArray[0];

  // frame length is encoded in 2 bytes
  var frameLengthArray = new Uint16Array(buffer.slice(8, 10));
  var frameLength = frameLengthArray[0];

  // frame is a float32Array (4 bytes) * frameLength
  var frameByteLength = 4 * frameLength;
  var frame = new Float32Array(buffer.slice(10, 10 + frameByteLength));

  // metaData is the rest of the buffer
  var metaDataArray = new Uint16Array(buffer.slice(10 + frameByteLength));
  // JSON.parse here crashes node because of this character : `\u0000` (null in unicode) ??
  var metaData = Uint16Array2str(metaDataArray);
  metaData = JSON.parse(metaData.replace(/\u0000/g, ""));

  return { time: time, frame: frame, metaData: metaData };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi91dGlscy9zb2NrZXQtdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFO0FBQzVCLFNBQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQzdDOztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRTtBQUM1QixNQUFJLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNDLE1BQUksVUFBVSxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV6QyxPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzFDLGNBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ25DO0FBQ0QsU0FBTyxVQUFVLENBQUM7Q0FDbkI7Ozs7QUFJRCxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLFVBQVMsTUFBTSxFQUFFO0FBQ3BELE1BQUksRUFBRSxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxNQUFJLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM5QixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtBQUN0QyxRQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3JCO0FBQ0QsU0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFBOztBQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMs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QUFFLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQzs7QUFFeEUsTUFBSSxRQUFRLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzlDLFVBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRXZELFNBQU8sRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsUUFBUSxFQUFSLFFBQVEsRUFBRSxDQUFDO0NBQ2xDLENBQUEiLCJmaWxlIjoiZXM2L3V0aWxzL3NvY2tldC11dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gaHR0cDovL3VwZGF0ZXMuaHRtbDVyb2Nrcy5jb20vMjAxMi8wNi9Ib3ctdG8tY29udmVydC1BcnJheUJ1ZmZlci10by1hbmQtZnJvbS1TdHJpbmdcbmZ1bmN0aW9uIFVpbnQxNkFycmF5MnN0cihidWYpIHtcbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgYnVmKTtcbn1cblxuZnVuY3Rpb24gc3RyMlVpbnQxNkFycmF5KHN0cikge1xuICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHN0ci5sZW5ndGgqMik7IC8vIDIgYnl0ZXMgZm9yIGVhY2ggY2hhclxuICB2YXIgYnVmZmVyVmlldyA9IG5ldyBVaW50MTZBcnJheShidWZmZXIpO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGJ1ZmZlclZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gYnVmZmVyVmlldztcbn1cblxuLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzg2MDkyODkvY29udmVydC1hLWJpbmFyeS1ub2RlanMtYnVmZmVyLXRvLWphdmFzY3JpcHQtYXJyYXlidWZmZXJcbi8vIGNvbnZlcnRzIGEgbm9kZWpzIEJ1ZmZlciB0byBBcnJheUJ1ZmZlclxubW9kdWxlLmV4cG9ydHMuYnVmZmVyVG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKGJ1ZmZlcikge1xuICB2YXIgYWIgPSBuZXcgQXJyYXlCdWZmZXIoYnVmZmVyLmxlbmd0aCk7XG4gIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1ZmZlci5sZW5ndGg7ICsraSkge1xuICAgIHZpZXdbaV0gPSBidWZmZXJbaV07XG4gIH1cbiAgcmV0dXJuIGFiO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5hcnJheUJ1ZmZlclRvQnVmZmVyID0gZnVuY3Rpb24oYXJyYXlCdWZmZXIpIHtcbiAgdmFyIGJ1ZmZlciA9IG5ldyBCdWZmZXIoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1ZmZlci5sZW5ndGg7ICsraSkge1xuICAgIGJ1ZmZlcltpXSA9IHZpZXdbaV07XG4gIH1cbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuLy8gQFRPRE8gYGVuY29kZU1lc3NhZ2VgIGFuZCBgZGVjb2RlTWVzc2FnZWAgY291bGQgcHJvYmFibHkgdXNlIERhdGFWaWV3IHRvIHBhcnNlIHRoZSBidWZmZXJcblxuLy8gY29uY2F0IHRoZSBsZm8gc3RyZWFtLCB0aW1lIGFuZCBtZXRhRGF0YSBpbnRvIGEgc2luZ2xlIGJ1ZmZlclxuLy8gdGhlIGNvbmNhdGVuYXRpb24gaXMgZG9uZSBhcyBmb2xsb3cgOlxuLy8gICogdGltZSAgICAgICAgICA9PiA4IGJ5dGVzXG4vLyAgKiBmcmFtZS5sZW5ndGggID0+IDIgYnl0ZXNcbi8vICAqIGZyYW1lICAgICAgICAgPT4gNCAqIGZyYW1lTGVuZ3RoIGJ5dGVzXG4vLyAgKiBtZXRhRGF0YSAgICAgID0+IHJlc3Qgb2YgdGhlIG1lc3NhZ2Vcbi8vIEByZXR1cm4gIEFycmF5QnVmZmVyIG9mIHRoZSBjcmVhdGVkIG1lc3NhZ2Vcbi8vIEBub3RlICAgIG11c3QgY3JlYXRlIGEgbmV3IGJ1ZmZlciBlYWNoIHRpbWUgYmVjYXVzZSBtZXRhRGF0YSBsZW5ndGggaXMgbm90IGtub3duXG5tb2R1bGUuZXhwb3J0cy5lbmNvZGVNZXNzYWdlID0gZnVuY3Rpb24odGltZSwgZnJhbWUsIG1ldGFEYXRhKSB7XG4gICAvLyBzaG91bGQgcHJvYmFibHkgdXNlIHVzZSBEYXRhVmlldyBpbnN0ZWFkXG4gIC8vIGh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vdHV0b3JpYWxzL3dlYmdsL3R5cGVkX2FycmF5cy9cbiAgdmFyIHRpbWU2NCA9IG5ldyBGbG9hdDY0QXJyYXkoMSk7XG4gIHRpbWU2NFswXSA9IHRpbWU7XG4gIHZhciB0aW1lMTYgPSBuZXcgVWludDE2QXJyYXkodGltZTY0LmJ1ZmZlcik7XG5cbiAgdmFyIGxlbmd0aDE2ID0gbmV3IFVpbnQxNkFycmF5KDEpO1xuICBsZW5ndGgxNlswXSA9IGZyYW1lLmxlbmd0aDtcblxuICB2YXIgZnJhbWUxNiA9IG5ldyBVaW50MTZBcnJheShmcmFtZS5idWZmZXIpO1xuXG4gIHZhciBtZXRhRGF0YTE2ID0gc3RyMlVpbnQxNkFycmF5KEpTT04uc3RyaW5naWZ5KG1ldGFEYXRhKSk7XG5cbiAgdmFyIGJ1ZmZlckxlbmd0aCA9IHRpbWUxNi5sZW5ndGggKyBsZW5ndGgxNi5sZW5ndGggKyBmcmFtZTE2Lmxlbmd0aCArIG1ldGFEYXRhMTYubGVuZ3RoO1xuXG4gIHZhciBidWZmZXIgPSBuZXcgVWludDE2QXJyYXkoYnVmZmVyTGVuZ3RoKTtcblxuICAvLyBidWZmZXIgaXMgdGhlIGNvbmNhdGVuYXRpb24gb2YgdGltZSwgZnJhbWVMZW5ndGgsIGZyYW1lLCBtZXRhRGF0YVxuICBidWZmZXIuc2V0KHRpbWUxNiwgMCk7XG4gIGJ1ZmZlci5zZXQobGVuZ3RoMTYsIHRpbWUxNi5sZW5ndGgpO1xuICBidWZmZXIuc2V0KGZyYW1lMTYsIHRpbWUxNi5sZW5ndGggKyBsZW5ndGgxNi5sZW5ndGgpO1xuICBidWZmZXIuc2V0KG1ldGFEYXRhMTYsIHRpbWUxNi5sZW5ndGggKyBsZW5ndGgxNi5sZW5ndGggKyBmcmFtZTE2Lmxlbmd0aCk7XG5cbiAgcmV0dXJuIGJ1ZmZlci5idWZmZXI7XG59XG5cbi8vIHJlY3JlYXRlIHRoZSBMZm8gc3RyZWFtICh0aW1lLCBmcmFtZSwgbWV0YURhdGEpIGZvcm0gYSBidWZmZXJcbi8vIGNyZWF0ZWQgd2l0aCBgZW5jb2RlTWVzc2FnZWBcbm1vZHVsZS5leHBvcnRzLmRlY29kZU1lc3NhZ2UgPSBmdW5jdGlvbihidWZmZXIpIHtcbiAgLy8gdGltZSBpcyBhIGZsb2F0NjRBcnJheSBvZiBzaXplIDEgKDggYnl0ZXMpXG4gIHZhciB0aW1lQXJyYXkgPSBuZXcgRmxvYXQ2NEFycmF5KGJ1ZmZlci5zbGljZSgwLCA4KSk7XG4gIHZhciB0aW1lID0gdGltZUFycmF5WzBdO1xuXG4gIC8vIGZyYW1lIGxlbmd0aCBpcyBlbmNvZGVkIGluIDIgYnl0ZXNcbiAgdmFyIGZyYW1lTGVuZ3RoQXJyYXkgPSBuZXcgVWludDE2QXJyYXkoYnVmZmVyLnNsaWNlKDgsIDEwKSk7XG4gIHZhciBmcmFtZUxlbmd0aCA9IGZyYW1lTGVuZ3RoQXJyYXlbMF07XG5cbiAgLy8gZnJhbWUgaXMgYSBmbG9hdDMyQXJyYXkgKDQgYnl0ZXMpICogZnJhbWVMZW5ndGhcbiAgdmFyIGZyYW1lQnl0ZUxlbmd0aCA9IDQgKiBmcmFtZUxlbmd0aDtcbiAgdmFyIGZyYW1lID0gbmV3IEZsb2F0MzJBcnJheShidWZmZXIuc2xpY2UoMTAsIDEwICsgZnJhbWVCeXRlTGVuZ3RoKSk7XG5cbiAgLy8gbWV0YURhdGEgaXMgdGhlIHJlc3Qgb2YgdGhlIGJ1ZmZlclxuICB2YXIgbWV0YURhdGFBcnJheSA9IG5ldyBVaW50MTZBcnJheShidWZmZXIuc2xpY2UoMTAgKyBmcmFtZUJ5dGVMZW5ndGgpKTtcbiAgLy8gSlNPTi5wYXJzZSBoZXJlIGNyYXNoZXMgbm9kZSBiZWNhdXNlIG9mIHRoaXMgY2hhcmFjdGVyIDogYFxcdTAwMDBgIChudWxsIGluIHVuaWNvZGUpID8/XG4gIHZhciBtZXRhRGF0YSA9IFVpbnQxNkFycmF5MnN0cihtZXRhRGF0YUFycmF5KTtcbiAgbWV0YURhdGEgPSBKU09OLnBhcnNlKG1ldGFEYXRhLnJlcGxhY2UoL1xcdTAwMDAvZywgJycpKTtcblxuICByZXR1cm4geyB0aW1lLCBmcmFtZSwgbWV0YURhdGEgfTtcbn1cblxuIl19