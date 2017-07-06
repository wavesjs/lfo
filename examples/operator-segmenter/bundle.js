(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _client = require('waves-lfo/client');

var lfo = _interopRequireWildcard(_client);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

var frameSize = Math.floor(0.020 * audioContext.sampleRate);
var hopSize = Math.floor(0.005 * audioContext.sampleRate);

navigator.mediaDevices.getUserMedia({ audio: true }).then(init).catch(function (err) {
  return console.error(err.stack);
});

function init(stream) {
  var source = audioContext.createMediaStreamSource(stream);

  var audioInNode = new lfo.source.AudioInNode({
    sourceNode: source,
    audioContext: audioContext
  });

  var slicer = new lfo.operator.Slicer({
    frameSize: frameSize,
    hopSize: hopSize,
    centeredTimeTags: true
  });

  var power = new lfo.operator.Rms({
    power: true
  });

  var segmenter = new lfo.operator.Segmenter({
    logInput: true,
    filterOrder: 5,
    threshold: 4,
    offThreshold: -Infinity,
    minInter: 0.100,
    maxDuration: 0.020
  });

  var waveformDisplay = new lfo.sink.WaveformDisplay({
    canvas: '#waveform'
  });

  var markerDisplay = new lfo.sink.MarkerDisplay({
    canvas: '#markers'
  });

  new lfo.utils.DisplaySync(waveformDisplay, markerDisplay);

  audioInNode.connect(slicer);
  audioInNode.connect(waveformDisplay);
  slicer.connect(power);
  power.connect(segmenter);
  segmenter.connect(markerDisplay);

  audioInNode.start();
}

},{"waves-lfo/client":124}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":21}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/log10"), __esModule: true };
},{"core-js/library/fn/math/log10":22}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/is-finite"), __esModule: true };
},{"core-js/library/fn/number/is-finite":23}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":24}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":25}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":26}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":27}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":28}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":29}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":30}],12:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":31}],13:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":32}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],15:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":7}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":7}],17:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = require("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
},{"../core-js/object/get-own-property-descriptor":8,"../core-js/object/get-prototype-of":9}],18:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":6,"../core-js/object/set-prototype-of":10,"../helpers/typeof":20}],19:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":20}],20:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":12,"../core-js/symbol/iterator":13}],21:[function(require,module,exports){
var core  = require('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":40}],22:[function(require,module,exports){
require('../../modules/es6.math.log10');
module.exports = require('../../modules/_core').Math.log10;
},{"../../modules/_core":40,"../../modules/es6.math.log10":106}],23:[function(require,module,exports){
require('../../modules/es6.number.is-finite');
module.exports = require('../../modules/_core').Number.isFinite;
},{"../../modules/_core":40,"../../modules/es6.number.is-finite":107}],24:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":40,"../../modules/es6.object.assign":108}],25:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":40,"../../modules/es6.object.create":109}],26:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":40,"../../modules/es6.object.define-property":110}],27:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":40,"../../modules/es6.object.get-own-property-descriptor":111}],28:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":40,"../../modules/es6.object.get-prototype-of":112}],29:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":40,"../../modules/es6.object.set-prototype-of":113}],30:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":40,"../modules/es6.object.to-string":114,"../modules/es6.promise":115,"../modules/es6.string.iterator":116,"../modules/web.dom.iterable":120}],31:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":40,"../../modules/es6.object.to-string":114,"../../modules/es6.symbol":117,"../../modules/es7.symbol.async-iterator":118,"../../modules/es7.symbol.observable":119}],32:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":102,"../../modules/es6.string.iterator":116,"../../modules/web.dom.iterable":120}],33:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],34:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],35:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],36:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":59}],37:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":94,"./_to-iobject":96,"./_to-length":97}],38:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":39,"./_wks":103}],39:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],40:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],41:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":33}],42:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],43:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":48}],44:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":50,"./_is-object":59}],45:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],46:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":77,"./_object-keys":80,"./_object-pie":81}],47:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":40,"./_ctx":41,"./_global":50,"./_hide":52}],48:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],49:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":36,"./_ctx":41,"./_is-array-iter":57,"./_iter-call":60,"./_to-length":97,"./core.get-iterator-method":104}],50:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],51:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],52:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":43,"./_object-dp":72,"./_property-desc":83}],53:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":50}],54:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":43,"./_dom-create":44,"./_fails":48}],55:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],56:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":39}],57:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":65,"./_wks":103}],58:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":39}],59:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],60:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":36}],61:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":52,"./_object-create":71,"./_property-desc":83,"./_set-to-string-tag":88,"./_wks":103}],62:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":47,"./_has":51,"./_hide":52,"./_iter-create":61,"./_iterators":65,"./_library":67,"./_object-gpo":78,"./_redefine":85,"./_set-to-string-tag":88,"./_wks":103}],63:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":103}],64:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],65:[function(require,module,exports){
module.exports = {};
},{}],66:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":80,"./_to-iobject":96}],67:[function(require,module,exports){
module.exports = true;
},{}],68:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":48,"./_has":51,"./_is-object":59,"./_object-dp":72,"./_uid":100}],69:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":39,"./_global":50,"./_task":93}],70:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":48,"./_iobject":56,"./_object-gops":77,"./_object-keys":80,"./_object-pie":81,"./_to-object":98}],71:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":36,"./_dom-create":44,"./_enum-bug-keys":45,"./_html":53,"./_object-dps":73,"./_shared-key":89}],72:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":36,"./_descriptors":43,"./_ie8-dom-define":54,"./_to-primitive":99}],73:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":36,"./_descriptors":43,"./_object-dp":72,"./_object-keys":80}],74:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":43,"./_has":51,"./_ie8-dom-define":54,"./_object-pie":81,"./_property-desc":83,"./_to-iobject":96,"./_to-primitive":99}],75:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":76,"./_to-iobject":96}],76:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":45,"./_object-keys-internal":79}],77:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],78:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":51,"./_shared-key":89,"./_to-object":98}],79:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":37,"./_has":51,"./_shared-key":89,"./_to-iobject":96}],80:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":45,"./_object-keys-internal":79}],81:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],82:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":40,"./_export":47,"./_fails":48}],83:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],84:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":52}],85:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":52}],86:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":36,"./_ctx":41,"./_is-object":59,"./_object-gopd":74}],87:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , core        = require('./_core')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":40,"./_descriptors":43,"./_global":50,"./_object-dp":72,"./_wks":103}],88:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":51,"./_object-dp":72,"./_wks":103}],89:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":90,"./_uid":100}],90:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":50}],91:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":33,"./_an-object":36,"./_wks":103}],92:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":42,"./_to-integer":95}],93:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":39,"./_ctx":41,"./_dom-create":44,"./_global":50,"./_html":53,"./_invoke":55}],94:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":95}],95:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],96:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":42,"./_iobject":56}],97:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":95}],98:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":42}],99:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":59}],100:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],101:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":40,"./_global":50,"./_library":67,"./_object-dp":72,"./_wks-ext":102}],102:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":103}],103:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":50,"./_shared":90,"./_uid":100}],104:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":38,"./_core":40,"./_iterators":65,"./_wks":103}],105:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":34,"./_iter-define":62,"./_iter-step":64,"./_iterators":65,"./_to-iobject":96}],106:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":47}],107:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":47,"./_global":50}],108:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":47,"./_object-assign":70}],109:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":47,"./_object-create":71}],110:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":43,"./_export":47,"./_object-dp":72}],111:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":74,"./_object-sap":82,"./_to-iobject":96}],112:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":78,"./_object-sap":82,"./_to-object":98}],113:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":47,"./_set-proto":86}],114:[function(require,module,exports){

},{}],115:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":33,"./_an-instance":35,"./_classof":38,"./_core":40,"./_ctx":41,"./_export":47,"./_for-of":49,"./_global":50,"./_is-object":59,"./_iter-detect":63,"./_library":67,"./_microtask":69,"./_redefine-all":84,"./_set-species":87,"./_set-to-string-tag":88,"./_species-constructor":91,"./_task":93,"./_wks":103}],116:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":62,"./_string-at":92}],117:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":36,"./_descriptors":43,"./_enum-keys":46,"./_export":47,"./_fails":48,"./_global":50,"./_has":51,"./_hide":52,"./_is-array":58,"./_keyof":66,"./_library":67,"./_meta":68,"./_object-create":71,"./_object-dp":72,"./_object-gopd":74,"./_object-gopn":76,"./_object-gopn-ext":75,"./_object-gops":77,"./_object-keys":80,"./_object-pie":81,"./_property-desc":83,"./_redefine":85,"./_set-to-string-tag":88,"./_shared":90,"./_to-iobject":96,"./_to-primitive":99,"./_uid":100,"./_wks":103,"./_wks-define":101,"./_wks-ext":102}],118:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":101}],119:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":101}],120:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":50,"./_hide":52,"./_iterators":65,"./_wks":103,"./es6.array.iterator":105}],121:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],122:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var min = Math.min;
var max = Math.max;

function clip(value) {
  var lower = arguments.length <= 1 || arguments[1] === undefined ? -Infinity : arguments[1];
  var upper = arguments.length <= 2 || arguments[2] === undefined ? +Infinity : arguments[2];

  return max(lower, min(upper, value));
}

/**
 * Dictionnary of the available types. Each key correspond to the type of the
 * implemented param while the corresponding object value should the
 * {@link `paramDefinition`} of the defined type.
 *
 * typedef {Object} paramTemplates
 * @type {Object<String, paramTemplate>}
 */

/**
 * Definition of a parameter. The definition should at least contain the entries
 * `type` and `default`. Every parameter can also accept optionnal configuration
 * entries `constant` and `metas`.
 * Available definitions are:
 * - {@link booleanDefinition}
 * - {@link integerDefinition}
 * - {@link floatDefinition}
 * - {@link stringDefinition}
 * - {@link enumDefinition}
 *
 * typedef {Object} paramDefinition
 * @property {String} type - Type of the parameter.
 * @property {Mixed} default - Default value of the parameter if no
 *  initialization value is provided.
 * @property {Boolean} [constant=false] - Define if the parameter can be change
 *  after its initialization.
 * @property {Object} [metas=null] - Any user defined data associated to the
 *  parameter that couls be usefull in the application.
 */

exports.default = {
  /**
   * @typedef {Object} booleanDefinition
   * @property {String} [type='boolean'] - Define a boolean parameter.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  boolean: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'boolean') throw new Error('Invalid value for boolean param "' + name + '": ' + value);

      return value;
    }
  },

  /**
   * @typedef {Object} integerDefinition
   * @property {String} [type='integer'] - Define a boolean parameter.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Boolean} [min=-Infinity] - Minimum value of the parameter.
   * @property {Boolean} [max=+Infinity] - Maximum value of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  integer: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (!(typeof value === 'number' && Math.floor(value) === value)) throw new Error('Invalid value for integer param "' + name + '": ' + value);

      return clip(value, definition.min, definition.max);
    }
  },

  /**
   * @typedef {Object} floatDefinition
   * @property {String} [type='float'] - Define a boolean parameter.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Boolean} [min=-Infinity] - Minimum value of the parameter.
   * @property {Boolean} [max=+Infinity] - Maximum value of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  float: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'number' || value !== value) // reject NaN
        throw new Error('Invalid value for float param "' + name + '": ' + value);

      return clip(value, definition.min, definition.max);
    }
  },

  /**
   * @typedef {Object} stringDefinition
   * @property {String} [type='string'] - Define a boolean parameter.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  string: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'string') throw new Error('Invalid value for string param "' + name + '": ' + value);

      return value;
    }
  },

  /**
   * @typedef {Object} enumDefinition
   * @property {String} [type='enum'] - Define a boolean parameter.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Array} list - Possible values of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  enum: {
    definitionTemplate: ['default', 'list'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (definition.list.indexOf(value) === -1) throw new Error('Invalid value for enum param "' + name + '": ' + value);

      return value;
    }
  },

  /**
   * @typedef {Object} anyDefinition
   * @property {String} [type='enum'] - Define a parameter of any type.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  any: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      // no check as it can have any type...
      return value;
    }
  }
};

},{}],123:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _paramTemplates = require('./paramTemplates');

var _paramTemplates2 = _interopRequireDefault(_paramTemplates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Generic class for typed parameters.
 *
 * @param {String} name - Name of the parameter.
 * @param {Array} definitionTemplate - List of mandatory keys in the param
 *  definition.
 * @param {Function} typeCheckFunction - Function to be used in order to check
 *  the value against the param definition.
 * @param {Object} definition - Definition of the parameter.
 * @param {Mixed} value - Value of the parameter.
 * @private
 */
var Param = function () {
  function Param(name, definitionTemplate, typeCheckFunction, definition, value) {
    _classCallCheck(this, Param);

    definitionTemplate.forEach(function (key) {
      if (definition.hasOwnProperty(key) === false) throw new Error('Invalid definition for param "' + name + '", ' + key + ' is not defined');
    });

    this.name = name;
    this.type = definition.type;
    this.definition = definition;

    if (this.definition.nullable === true && value === null) this.value = null;else this.value = typeCheckFunction(value, definition, name);
    this._typeCheckFunction = typeCheckFunction;
  }

  /**
   * Returns the current value.
   * @return {Mixed}
   */


  _createClass(Param, [{
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }

    /**
     * Update the current value.
     * @param {Mixed} value - New value of the parameter.
     * @return {Boolean} - `true` if the param has been updated, false otherwise
     *  (e.g. if the parameter already had this value).
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (this.definition.constant === true) throw new Error('Invalid assignement to constant param "' + this.name + '"');

      if (!(this.definition.nullable === true && value === null)) value = this._typeCheckFunction(value, this.definition, this.name);

      if (this.value !== value) {
        this.value = value;
        return true;
      }

      return false;
    }
  }]);

  return Param;
}();

/**
 * Bag of parameters. Main interface of the library
 */


var ParameterBag = function () {
  function ParameterBag(params, definitions) {
    _classCallCheck(this, ParameterBag);

    /**
     * List of parameters.
     *
     * @type {Object<String, Param>}
     * @name _params
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._params = params;

    /**
     * List of definitions with init values.
     *
     * @type {Object<String, paramDefinition>}
     * @name _definitions
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._definitions = definitions;

    /**
     * List of global listeners.
     *
     * @type {Set}
     * @name _globalListeners
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._globalListeners = new Set();

    /**
     * List of params listeners.
     *
     * @type {Object<String, Set>}
     * @name _paramsListeners
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._paramsListeners = {};

    // initialize empty Set for each param
    for (var name in params) {
      this._paramsListeners[name] = new Set();
    }
  }

  /**
   * Return the given definitions along with the initialization values.
   *
   * @return {Object}
   */


  _createClass(ParameterBag, [{
    key: 'getDefinitions',
    value: function getDefinitions() {
      var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (name !== null) return this._definitions[name];else return this._definitions;
    }

    /**
     * Return the value of the given parameter.
     *
     * @param {String} name - Name of the parameter.
     * @return {Mixed} - Value of the parameter.
     */

  }, {
    key: 'get',
    value: function get(name) {
      if (!this._params[name]) throw new Error('Cannot read property value of undefined parameter "' + name + '"');

      return this._params[name].value;
    }

    /**
     * Set the value of a parameter. If the value of the parameter is updated
     * (aka if previous value is different from new value) all registered
     * callbacks are registered.
     *
     * @param {String} name - Name of the parameter.
     * @param {Mixed} value - Value of the parameter.
     * @return {Mixed} - New value of the parameter.
     */

  }, {
    key: 'set',
    value: function set(name, value) {
      var param = this._params[name];
      var updated = param.setValue(value);
      value = param.getValue();

      if (updated) {
        var metas = param.definition.metas;
        // trigger global listeners
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._globalListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var listener = _step.value;

            listener(name, value, metas);
          } // trigger param listeners
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this._paramsListeners[name][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _listener = _step2.value;

            _listener(value, metas);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return value;
    }

    /**
     * Define if the `name` parameter exists or not.
     *
     * @param {String} name - Name of the parameter.
     * @return {Boolean}
     */

  }, {
    key: 'has',
    value: function has(name) {
      return this._params[name] ? true : false;
    }

    /**
     * Reset a parameter to its init value. Reset all parameters if no argument.
     *
     * @param {String} [name=null] - Name of the parameter to reset.
     */

  }, {
    key: 'reset',
    value: function reset() {
      var _this = this;

      var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (name !== null) this.set(name, param.definition.initValue);else Object.keys(this._params).forEach(function (name) {
        return _this.reset(name);
      });
    }

    /**
     * @callback ParameterBag~listenerCallback
     * @param {String} name - Parameter name.
     * @param {Mixed} value - Updated value of the parameter.
     * @param {Object} [meta=] - Given meta data of the parameter.
     */

    /**
     * Add listener to all param updates.
     *
     * @param {ParameterBag~listenerCallack} callback - Listener to register.
     */

  }, {
    key: 'addListener',
    value: function addListener(callback) {
      this._globalListeners.add(callback);
    }

    /**
     * Remove listener from all param changes.
     *
     * @param {ParameterBag~listenerCallack} callback - Listener to remove. If
     *  `null` remove all listeners.
     */

  }, {
    key: 'removeListener',
    value: function removeListener() {
      var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (callback === null) this._globalListeners.clear();else this._globalListeners.delete(callback);
    }

    /**
     * @callback ParameterBag~paramListenerCallack
     * @param {Mixed} value - Updated value of the parameter.
     * @param {Object} [meta=] - Given meta data of the parameter.
     */

    /**
     * Add listener to a given param updates.
     *
     * @param {String} name - Parameter name.
     * @param {ParameterBag~paramListenerCallack} callback - Function to apply
     *  when the value of the parameter changes.
     */

  }, {
    key: 'addParamListener',
    value: function addParamListener(name, callback) {
      this._paramsListeners[name].add(callback);
    }

    /**
     * Remove listener from a given param updates.
     *
     * @param {String} name - Parameter name.
     * @param {ParameterBag~paramListenerCallack} callback - Listener to remove.
     *  If `null` remove all listeners.
     */

  }, {
    key: 'removeParamListener',
    value: function removeParamListener(name) {
      var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (callback === null) this._paramsListeners[name].clear();else this._paramsListeners[name].delete(callback);
    }
  }]);

  return ParameterBag;
}();

/**
 * Factory for the `ParameterBag` class.
 *
 * @param {Object<String, paramDefinition>} definitions - Object describing the
 *  parameters.
 * @param {Object<String, Mixed>} values - Initialization values for the
 *  parameters.
 * @return {ParameterBag}
 */


function parameters(definitions) {
  var values = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var params = {};

  for (var name in values) {
    if (definitions.hasOwnProperty(name) === false) throw new Error('Unknown param "' + name + '"');
  }

  for (var _name in definitions) {
    if (params.hasOwnProperty(_name) === true) throw new Error('Parameter "' + _name + '" already defined');

    var definition = definitions[_name];

    if (!_paramTemplates2.default[definition.type]) throw new Error('Unknown param type "' + definition.type + '"');

    var _paramTemplates$defin = _paramTemplates2.default[definition.type];
    var definitionTemplate = _paramTemplates$defin.definitionTemplate;
    var typeCheckFunction = _paramTemplates$defin.typeCheckFunction;


    var value = void 0;

    if (values.hasOwnProperty(_name) === true) value = values[_name];else value = definition.default;

    // store init value in definition
    definition.initValue = value;

    if (!typeCheckFunction || !definitionTemplate) throw new Error('Invalid param type definition "' + definition.type + '"');

    params[_name] = new Param(_name, definitionTemplate, typeCheckFunction, definition, value);
  }

  return new ParameterBag(params, definitions);
}

/**
 * Register a new type for the `parameters` factory.
 * @param {String} typeName - Value that will be available as the `type` of a
 *  param definition.
 * @param {parameterDefinition} parameterDefinition - Object describing the
 *  parameter.
 */
parameters.defineType = function (typeName, parameterDefinition) {
  _paramTemplates2.default[typeName] = parameterDefinition;
};

exports.default = parameters;

},{"./paramTemplates":122}],124:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sink = exports.source = exports.utils = exports.operator = exports.core = exports.version = undefined;

var _namespace = require('../common/operator/_namespace');

Object.defineProperty(exports, 'operator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace).default;
  }
});

var _namespace2 = require('./utils/_namespace');

Object.defineProperty(exports, 'utils', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace2).default;
  }
});

var _namespace3 = require('./source/_namespace');

Object.defineProperty(exports, 'source', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace3).default;
  }
});

var _namespace4 = require('./sink/_namespace');

Object.defineProperty(exports, 'sink', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace4).default;
  }
});

var _core2 = require('../core');

var _core = _interopRequireWildcard(_core2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = exports.version = '1.1.1';

var core = exports.core = _core;

},{"../common/operator/_namespace":158,"../core":168,"./sink/_namespace":134,"./source/_namespace":138,"./utils/_namespace":140}],125:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commonDefinitions = {
  min: {
    type: 'float',
    default: -1,
    metas: { kind: 'dynamic' }
  },
  max: {
    type: 'float',
    default: 1,
    metas: { kind: 'dynamic' }
  },
  width: {
    type: 'integer',
    default: 300,
    metas: { kind: 'dynamic' }
  },
  height: {
    type: 'integer',
    default: 150,
    metas: { kind: 'dynamic' }
  },
  container: {
    type: 'any',
    default: null,
    constant: true
  },
  canvas: {
    type: 'any',
    default: null,
    constant: true
  }
};

var hasDurationDefinitions = {
  duration: {
    type: 'float',
    min: 0,
    max: +Infinity,
    default: 1,
    metas: { kind: 'dynamic' }
  },
  referenceTime: {
    type: 'float',
    default: 0,
    constant: true
  }
};

/**
 * Base class to extend in order to create graphic sinks.
 *
 * <span class="warning">_This class should be considered abstract and only
 * be used to be extended._</span>
 *
 * @todo - fix float rounding errors (produce decays in sync draws)
 *
 * @memberof module:client.sink
 *
 * @param {Object} options - Override default parameters.
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
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
 *  the canvas. This parameter only exists for operators that display several
 *  consecutive frames on the canvas. _dynamic parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class. This parameter only exists
 *  for operators that display several consecutive frames on the canvas.
 */

var BaseDisplay = function (_BaseLfo) {
  (0, _inherits3.default)(BaseDisplay, _BaseLfo);

  function BaseDisplay(defs) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var hasDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    (0, _classCallCheck3.default)(this, BaseDisplay);

    var commonDefs = void 0;

    if (hasDuration) commonDefs = (0, _assign2.default)({}, commonDefinitions, hasDurationDefinitions);else commonDefs = commonDefinitions;

    var definitions = (0, _assign2.default)({}, commonDefs, defs);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BaseDisplay.__proto__ || (0, _getPrototypeOf2.default)(BaseDisplay)).call(this, definitions, options));

    if (_this.params.get('canvas') === null && _this.params.get('container') === null) throw new Error('Invalid parameter: `canvas` or `container` not defined');

    var canvasParam = _this.params.get('canvas');
    var containerParam = _this.params.get('container');

    // prepare canvas
    if (canvasParam) {
      if (typeof canvasParam === 'string') _this.canvas = document.querySelector(canvasParam);else _this.canvas = canvasParam;
    } else if (containerParam) {
      var container = void 0;

      if (typeof containerParam === 'string') container = document.querySelector(containerParam);else container = containerParam;

      _this.canvas = document.createElement('canvas');
      container.appendChild(_this.canvas);
    }

    _this.ctx = _this.canvas.getContext('2d');
    _this.cachedCanvas = document.createElement('canvas');
    _this.cachedCtx = _this.cachedCanvas.getContext('2d');

    _this.previousFrame = null;
    _this.currentTime = hasDuration ? _this.params.get('referenceTime') : null;

    /**
     * Instance of the `DisplaySync` used to synchronize the different displays
     * @private
     */
    _this.displaySync = false;

    _this._stack = [];
    _this._rafId = null;

    _this.renderStack = _this.renderStack.bind(_this);
    _this.shiftError = 0;

    // initialize canvas size and y scale transfert function
    _this._resize();
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(BaseDisplay, [{
    key: '_resize',
    value: function _resize() {
      var width = this.params.get('width');
      var height = this.params.get('height');

      var ctx = this.ctx;
      var cachedCtx = this.cachedCtx;

      var dPR = window.devicePixelRatio || 1;
      var bPR = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;

      this.pixelRatio = dPR / bPR;

      var lastWidth = this.canvasWidth;
      var lastHeight = this.canvasHeight;
      this.canvasWidth = width * this.pixelRatio;
      this.canvasHeight = height * this.pixelRatio;

      cachedCtx.canvas.width = this.canvasWidth;
      cachedCtx.canvas.height = this.canvasHeight;

      // copy current image from ctx (resize)
      if (lastWidth && lastHeight) {
        cachedCtx.drawImage(ctx.canvas, 0, 0, lastWidth, lastHeight, 0, 0, this.canvasWidth, this.canvasHeight);
      }

      ctx.canvas.width = this.canvasWidth;
      ctx.canvas.height = this.canvasHeight;
      ctx.canvas.style.width = width + 'px';
      ctx.canvas.style.height = height + 'px';

      // update scale
      this._setYScale();
    }

    /**
     * Create the transfert function used to map values to pixel in the y axis
     * @private
     */

  }, {
    key: '_setYScale',
    value: function _setYScale() {
      var min = this.params.get('min');
      var max = this.params.get('max');
      var height = this.canvasHeight;

      var a = (0 - height) / (max - min);
      var b = height - a * min;

      this.getYPosition = function (x) {
        return a * x + b;
      };
    }

    /**
     * Returns the width in pixel a `vector` frame needs to be drawn.
     * @private
     */

  }, {
    key: 'getMinimumFrameWidth',
    value: function getMinimumFrameWidth() {
      return 1; // need one pixel to draw the line
    }

    /**
     * Callback function executed when a parameter is updated.
     *
     * @param {String} name - Parameter name.
     * @param {Mixed} value - Parameter value.
     * @param {Object} metas - Metadatas of the parameter.
     * @private
     */

  }, {
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      (0, _get3.default)(BaseDisplay.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseDisplay.prototype), 'onParamUpdate', this).call(this, name, value, metas);

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

    /** @private */

  }, {
    key: 'propagateStreamParams',
    value: function propagateStreamParams() {
      (0, _get3.default)(BaseDisplay.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseDisplay.prototype), 'propagateStreamParams', this).call(this);
    }

    /** @private */

  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(BaseDisplay.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseDisplay.prototype), 'resetStream', this).call(this);

      var width = this.canvasWidth;
      var height = this.canvasHeight;

      this.ctx.clearRect(0, 0, width, height);
      this.cachedCtx.clearRect(0, 0, width, height);
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      this.currentTime = null;
      (0, _get3.default)(BaseDisplay.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseDisplay.prototype), 'finalizeStream', this).call(this, endTime);

      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    /**
     * Add the current frame to the frames to draw. Should not be overriden.
     * @private
     */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      var frameSize = this.streamParams.frameSize;
      var copy = new Float32Array(frameSize);
      var data = frame.data;

      // copy values of the input frame as they might be updated
      // in reference before being consumed in the draw function
      for (var i = 0; i < frameSize; i++) {
        copy[i] = data[i];
      }this._stack.push({
        time: frame.time,
        data: copy,
        metadata: frame.metadata
      });

      if (this._rafId === null) this._rafId = requestAnimationFrame(this.renderStack);
    }

    /**
     * Render the accumulated frames. Method called in `requestAnimationFrame`.
     * @private
     */

  }, {
    key: 'renderStack',
    value: function renderStack() {
      if (this.params.has('duration')) {
        // render all frame since last `renderStack` call
        for (var i = 0, l = this._stack.length; i < l; i++) {
          this.scrollModeDraw(this._stack[i]);
        }
      } else {
        // only render last received frame if any
        if (this._stack.length > 0) {
          var frame = this._stack[this._stack.length - 1];
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.processFunction(frame);
        }
      }

      // reinit stack for next call
      this._stack.length = 0;
      this._rafId = requestAnimationFrame(this.renderStack);
    }

    /**
     * Draw data from right to left with scrolling
     * @private
     * @todo - check possibility of maintaining all values from one place to
     *         minimize float error tracking.
     */

  }, {
    key: 'scrollModeDraw',
    value: function scrollModeDraw(frame) {
      var frameType = this.streamParams.frameType;
      var frameRate = this.streamParams.frameRate;
      var frameSize = this.streamParams.frameSize;
      var sourceSampleRate = this.streamParams.sourceSampleRate;

      var canvasDuration = this.params.get('duration');
      var ctx = this.ctx;
      var canvasWidth = this.canvasWidth;
      var canvasHeight = this.canvasHeight;

      var previousFrame = this.previousFrame;

      // current time at the left of the canvas
      var currentTime = this.currentTime !== null ? this.currentTime : frame.time;
      var frameStartTime = frame.time;
      var lastFrameTime = previousFrame ? previousFrame.time : 0;
      var lastFrameDuration = this.lastFrameDuration ? this.lastFrameDuration : 0;

      var frameDuration = void 0;

      if (frameType === 'scalar' || frameType === 'vector') {
        var pixelDuration = canvasDuration / canvasWidth;
        frameDuration = this.getMinimumFrameWidth() * pixelDuration;
      } else if (this.streamParams.frameType === 'signal') {
        frameDuration = frameSize / sourceSampleRate;
      }

      var frameEndTime = frameStartTime + frameDuration;
      // define if we need to shift the canvas
      var shiftTime = frameEndTime - currentTime;

      // if the canvas is not synced, should never go to `else`
      if (shiftTime > 0) {
        // shift the canvas of shiftTime in pixels
        var fShift = shiftTime / canvasDuration * canvasWidth - this.shiftError;
        var iShift = Math.floor(fShift + 0.5);
        this.shiftError = fShift - iShift;

        var _currentTime = frameStartTime + frameDuration;
        this.shiftCanvas(iShift, _currentTime);

        // if siblings, share the information
        if (this.displaySync) this.displaySync.shiftSiblings(iShift, _currentTime, this);
      }

      // width of the frame in pixels
      var fFrameWidth = frameDuration / canvasDuration * canvasWidth;
      var frameWidth = Math.floor(fFrameWidth + 0.5);

      // define position of the head in the canvas
      var canvasStartTime = this.currentTime - canvasDuration;
      var startTimeRatio = (frameStartTime - canvasStartTime) / canvasDuration;
      var startTimePosition = startTimeRatio * canvasWidth;

      // number of pixels since last frame
      var pixelsSinceLastFrame = this.lastFrameWidth;

      if ((frameType === 'scalar' || frameType === 'vector') && previousFrame) {
        var frameInterval = frame.time - previousFrame.time;
        pixelsSinceLastFrame = frameInterval / canvasDuration * canvasWidth;
      }

      // draw current frame
      ctx.save();
      ctx.translate(startTimePosition, 0);
      this.processFunction(frame, frameWidth, pixelsSinceLastFrame);
      ctx.restore();

      // save current canvas state into cached canvas
      this.cachedCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      this.cachedCtx.drawImage(this.canvas, 0, 0, canvasWidth, canvasHeight);

      // update lastFrameDuration, lastFrameWidth
      this.lastFrameDuration = frameDuration;
      this.lastFrameWidth = frameWidth;
      this.previousFrame = frame;
    }

    /**
     * Shift canvas, also called from `DisplaySync`
     * @private
     */

  }, {
    key: 'shiftCanvas',
    value: function shiftCanvas(iShift, time) {
      var ctx = this.ctx;
      var cache = this.cachedCanvas;
      var cachedCtx = this.cachedCtx;
      var width = this.canvasWidth;
      var height = this.canvasHeight;
      var croppedWidth = width - iShift;
      this.currentTime = time;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(cache, iShift, 0, croppedWidth, height, 0, 0, croppedWidth, height);
      // save current canvas state into cached canvas
      cachedCtx.clearRect(0, 0, width, height);
      cachedCtx.drawImage(this.canvas, 0, 0, width, height);
    }

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

  }]);
  return BaseDisplay;
}(_BaseLfo3.default);

exports.default = BaseDisplay;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/assign":5,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/get":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],126:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _displayUtils = require('../utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  radius: {
    type: 'float',
    min: 0,
    default: 0,
    metas: { kind: 'dynamic' }
  },
  line: {
    type: 'boolean',
    default: true,
    metas: { kind: 'dynamic' }
  },
  colors: {
    type: 'any',
    default: null
  }

  /**
   * Breakpoint Function, display a stream of type `vector`.
   *
   * @memberof module:client.sink
   *
   * @param {Object} options - Override default parameters.
   * @param {String} [options.colors=null] - Array of colors for each index of the
   *  vector. _dynamic parameter_
   * @param {String} [options.radius=0] - Radius of the dot at each value.
   *  _dynamic parameter_
   * @param {String} [options.line=true] - Display a line between each consecutive
   *  values of the vector. _dynamic parameter_
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
   * @param {Number} [options.duration=1] - Duration (in seconds) represented in
   *  the canvas. _dynamic parameter_
   * @param {Number} [options.referenceTime=null] - Optionnal reference time the
   *  display should considerer as the origin. Is only usefull when synchronizing
   *  several display using the `DisplaySync` class.
   *
   * @example
   * import * as lfo from 'waves-lfo/client';
   *
   * const eventIn = new lfo.source.EventIn({
   *   frameSize: 2,
   *   frameRate: 0.1,
   *   frameType: 'vector'
   * });
   *
   * const bpf = new lfo.sink.BpfDisplay({
   *   canvas: '#bpf',
   *   duration: 10,
   * });
   *
   * eventIn.connect(bpf);
   * eventIn.start();
   *
   * let time = 0;
   * const dt = 0.1;
   *
   * (function generateData() {
   *   eventIn.process(time, [Math.random() * 2 - 1, Math.random() * 2 - 1]);
   *   time += dt;
   *
   *   setTimeout(generateData, dt * 1000);
   * }());
   */
};
var BpfDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(BpfDisplay, _BaseDisplay);

  function BpfDisplay(options) {
    (0, _classCallCheck3.default)(this, BpfDisplay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BpfDisplay.__proto__ || (0, _getPrototypeOf2.default)(BpfDisplay)).call(this, definitions, options));

    _this.prevFrame = null;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(BpfDisplay, [{
    key: 'getMinimumFrameWidth',
    value: function getMinimumFrameWidth() {
      return this.params.get('radius');
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      if (this.params.get('colors') === null) this.params.set('colors', (0, _displayUtils.getColors)('bpf', this.streamParams.frameSize));

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame, frameWidth, pixelsSinceLastFrame) {
      var colors = this.params.get('colors');
      var radius = this.params.get('radius');
      var drawLine = this.params.get('line');
      var frameSize = this.streamParams.frameSize;
      var ctx = this.ctx;
      var data = frame.data;
      var prevData = this.prevFrame ? this.prevFrame.data : null;

      ctx.save();

      for (var i = 0, l = frameSize; i < l; i++) {
        var posY = this.getYPosition(data[i]);
        var color = colors[i];

        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        if (prevData && drawLine) {
          var lastPosY = this.getYPosition(prevData[i]);
          ctx.beginPath();
          ctx.moveTo(-pixelsSinceLastFrame, lastPosY);
          ctx.lineTo(0, posY);
          ctx.stroke();
          ctx.closePath();
        }

        if (radius > 0) {
          ctx.beginPath();
          ctx.arc(0, posY, radius, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.closePath();
        }
      }

      ctx.restore();

      this.prevFrame = frame;
    }
  }]);
  return BpfDisplay;
}(_BaseDisplay3.default);

exports.default = BpfDisplay;

},{"../utils/display-utils":141,"./BaseDisplay":125,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],127:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _displayUtils = require('../utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  threshold: {
    type: 'float',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  },
  thresholdIndex: {
    type: 'integer',
    default: 0,
    metas: { kind: 'dynamic' }
  },
  color: {
    type: 'string',
    default: (0, _displayUtils.getColors)('marker'),
    nullable: true,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Display a marker according to a `vector` input frame.
 *
 * @memberof module:client.sink
 *
 * @param {Object} options - Override default parameters.
 * @param {String} options.color - Color of the marker.
 * @param {Number} [options.thresholdIndex=0] - Index of the incomming frame
 *  data to compare against the threshold. _Should be used in conjonction with
 *  `threshold`_.
 * @param {Number} [options.threshold=null] - Minimum value the incomming value
 *  must have to trigger the display of a marker. If null each incomming event
 *  triggers a marker. _Should be used in conjonction with `thresholdIndex`_.
 * @param {Number} [options.width=300] - Width of the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.height=150] - Height of the canvas.
 *  _dynamic parameter_
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas. _constant parameter_
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw. _constant parameter_
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
 *  the canvas. This parameter only exists for operators that display several
 *  consecutive frames on the canvas. _dynamic parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class. This parameter only exists
 *  for operators that display several consecutive frames on the canvas.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameType: 'scalar',
 * });
 *
 * const marker = new lfo.sink.MarkerDisplay({
 *   canvas: '#marker',
 *   threshold: 0.5,
 * });
 *
 * eventIn.connect(marker);
 * eventIn.start();
 *
 * let time = 0;
 * const period = 1;
 *
 * (function generateData() {
 *   eventIn.process(time, Math.random());
 *
 *   time += period;
 *   setTimeout(generateData, period * 1000);
 * }());
 */

var MarkerDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(MarkerDisplay, _BaseDisplay);

  function MarkerDisplay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MarkerDisplay);
    return (0, _possibleConstructorReturn3.default)(this, (MarkerDisplay.__proto__ || (0, _getPrototypeOf2.default)(MarkerDisplay)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(MarkerDisplay, [{
    key: 'processVector',
    value: function processVector(frame, frameWidth, pixelsSinceLastFrame) {
      var color = this.params.get('color');
      var threshold = this.params.get('threshold');
      var thresholdIndex = this.params.get('thresholdIndex');
      var ctx = this.ctx;
      var height = ctx.height;
      var value = frame.data[thresholdIndex];

      if (threshold === null || value >= threshold) {
        var yMin = this.getYPosition(this.params.get('min'));
        var yMax = this.getYPosition(this.params.get('max'));

        if (yMin > yMax) {
          var v = yMax;
          yMax = yMin;
          yMin = v;
        }

        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(0, yMin, 1, yMax);
        ctx.restore();
      }
    }
  }]);
  return MarkerDisplay;
}(_BaseDisplay3.default);

exports.default = MarkerDisplay;

},{"../utils/display-utils":141,"./BaseDisplay":125,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],128:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _displayUtils = require('../utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floor = Math.floor;
var ceil = Math.ceil;

function downSample(data, targetLength) {
  var length = data.length;
  var hop = length / targetLength;
  var target = new Float32Array(targetLength);
  var counter = 0;

  for (var i = 0; i < targetLength; i++) {
    var index = floor(counter);
    var phase = counter - index;
    var prev = data[index];
    var next = data[index + 1];

    target[i] = (next - prev) * phase + prev;
    counter += hop;
  }

  return target;
}

var definitions = {
  color: {
    type: 'string',
    default: (0, _displayUtils.getColors)('signal'),
    nullable: true
  }
};

/**
 * Display a stream of type `signal` on a canvas.
 *
 * @param {Object} options - Override default parameters.
 * @param {String} [options.color='#00e600'] - Color of the signal.
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
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
 *  the canvas. This parameter only exists for operators that display several
 *  consecutive frames on the canvas. _dynamic parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class. This parameter only exists
 *  for operators that display several consecutive frames on the canvas.
 *
 * @memberof module:client.sink
 *
 * @example
 * const eventIn = new lfo.source.EventIn({
 *   frameType: 'signal',
 *   sampleRate: 8,
 *   frameSize: 4,
 * });
 *
 * const signalDisplay = new lfo.sink.SignalDisplay({
 *   canvas: '#signal-canvas',
 * });
 *
 * eventIn.connect(signalDisplay);
 * eventIn.start();
 *
 * // push triangle signal in the graph
 * eventIn.process(0, [0, 0.5, 1, 0.5]);
 * eventIn.process(0.5, [0, -0.5, -1, -0.5]);
 * // ...
 */

var SignalDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(SignalDisplay, _BaseDisplay);

  function SignalDisplay(options) {
    (0, _classCallCheck3.default)(this, SignalDisplay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SignalDisplay.__proto__ || (0, _getPrototypeOf2.default)(SignalDisplay)).call(this, definitions, options, true));

    _this.lastPosY = null;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(SignalDisplay, [{
    key: 'processSignal',
    value: function processSignal(frame, frameWidth, pixelsSinceLastFrame) {
      var color = this.params.get('color');
      var frameSize = this.streamParams.frameSize;
      var ctx = this.ctx;
      var data = frame.data;

      if (frameWidth < frameSize) data = downSample(data, frameWidth);

      var length = data.length;
      var hopX = frameWidth / length;
      var posX = 0;
      var lastY = this.lastPosY;

      ctx.strokeStyle = color;
      ctx.beginPath();

      for (var i = 0; i < data.length; i++) {
        var posY = this.getYPosition(data[i]);

        if (lastY === null) {
          ctx.moveTo(posX, posY);
        } else {
          if (i === 0) ctx.moveTo(-hopX, lastY);

          ctx.lineTo(posX, posY);
        }

        posX += hopX;
        lastY = posY;
      }

      ctx.stroke();
      ctx.closePath();

      this.lastPosY = lastY;
    }
  }]);
  return SignalDisplay;
}(_BaseDisplay3.default);

exports.default = SignalDisplay;

},{"../utils/display-utils":141,"./BaseDisplay":125,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],129:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

var _wsUtils = require('../../common/utils/wsUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parameters = {
  port: {
    type: 'integer',
    default: 8000,
    nullable: true,
    constant: true
  },
  url: {
    type: 'string',
    default: null,
    nullable: true,
    constant: true
  }

  /**
   * Send an lfo frame as a socket message to a `node.source.SocketReceive`
   * instance.
   *
   * <p class="warning">Experimental</p>
   *
   * @memberof module:client.sink
   *
   * @example
   * const eventIn = new lfo.source.EventIn({
   *   frameType: 'vector',
   *   frameSize: 2,
   *   frameRate: 1,
   * });
   *
   * const socketSend = new lfo.sink.SocketSend({
   *   port: 3000
   * });
   *
   * eventIn.connect(socketSend);
   *
   * eventIn.init().then(() => {
   *   eventIn.start();
   *
   *   let time = 0;
   *
   *   (function createFrame() {
   *     eventIn.process(time, [Math.random(), Math.random()], { test: true });
   *     time += 1;
   *
   *     setTimeout(createFrame, 1000);
   *   }());
   * });
   */
};
var SocketSend = function (_BaseLfo) {
  (0, _inherits3.default)(SocketSend, _BaseLfo);

  function SocketSend() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, SocketSend);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SocketSend.__proto__ || (0, _getPrototypeOf2.default)(SocketSend)).call(this, parameters, options));

    var protocol = window.location.protocol.replace(/^http/, 'ws');
    var address = _this.params.get('url') || window.location.hostname;
    var port = _this.params.get('port') || ''; // everything falsy becomes ''
    var socketAddress = protocol + '//' + address + ':' + port;

    _this.socket = new WebSocket(socketAddress);
    _this.socket.binaryType = 'arraybuffer';

    _this.openedPromise = new _promise2.default(function (resolve, reject) {
      _this.socket.onopen = resolve;
    });

    _this.socket.onerror = function (err) {
      return console.error(err.stack);
    };
    return _this;
  }

  (0, _createClass3.default)(SocketSend, [{
    key: 'initModule',
    value: function initModule() {
      var _this2 = this;

      // send a INIT_MODULE_REQ and wait for INIT_MODULE_ACK
      // no need to get children promises as we are in a leef
      return this.openedPromise.then(function () {
        return new _promise2.default(function (resolve, reject) {
          _this2.socket.onmessage = function (e) {
            var opcode = _wsUtils.decoders.opcode(e.data);

            if (opcode === _wsUtils.opcodes.INIT_MODULE_ACK) resolve();
          };

          var buffer = _wsUtils.encoders.initModuleReq();
          _this2.socket.send(buffer);
        });
      });
    }
  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      (0, _get3.default)(SocketSend.prototype.__proto__ || (0, _getPrototypeOf2.default)(SocketSend.prototype), 'processStreamParams', this).call(this, prevStreamParams);

      var buffer = _wsUtils.encoders.streamParams(this.streamParams);
      this.socket.send(buffer);
    }
  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(SocketSend.prototype.__proto__ || (0, _getPrototypeOf2.default)(SocketSend.prototype), 'resetStream', this).call(this);

      var buffer = _wsUtils.encoders.resetStream();
      this.socket.send(buffer);
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      (0, _get3.default)(SocketSend.prototype.__proto__ || (0, _getPrototypeOf2.default)(SocketSend.prototype), 'finalizeStream', this).call(this, endTime);

      var buffer = _wsUtils.encoders.finalizeStream(endTime);
      this.socket.send(buffer);
    }

    // process any type
    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar() {}
    /** @private */

  }, {
    key: 'processVector',
    value: function processVector() {}
    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal() {}
  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      var frameSize = this.streamParams.frameSize;
      this.frame.time = frame.time;
      this.frame.data.set(frame.data, 0);
      this.frame.metadata = frame.metadata;

      var buffer = _wsUtils.encoders.processFrame(this.frame, frameSize);
      this.socket.send(buffer);
    }
  }]);
  return SocketSend;
}(_BaseLfo3.default);

exports.default = SocketSend;

},{"../../common/utils/wsUtils":165,"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/core-js/promise":11,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/get":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],130:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require('babel-runtime/core-js/math/log10');

var _log2 = _interopRequireDefault(_log);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _Fft = require('../../common/operator/Fft');

var _Fft2 = _interopRequireDefault(_Fft);

var _displayUtils = require('../utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  scale: {
    type: 'float',
    default: 1,
    metas: { kind: 'dynamic' }
  },
  color: {
    type: 'string',
    default: (0, _displayUtils.getColors)('spectrum'),
    nullable: true,
    metas: { kind: 'dynamic' }
  },
  min: {
    type: 'float',
    default: -80,
    metas: { kind: 'dynamic' }
  },
  max: {
    type: 'float',
    default: 6,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Display the spectrum of the incomming `signal` input.
 *
 * @memberof module:client.sink
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.scale=1] - Scale display of the spectrogram.
 * @param {String} [options.color=null] - Color of the spectrogram.
 * @param {Number} [options.min=-80] - Minimum displayed value (in dB).
 * @param {Number} [options.max=6] - Maximum displayed value (in dB).
 * @param {Number} [options.width=300] - Width of the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.height=150] - Height of the canvas.
 *  _dynamic parameter_
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas. _constant parameter_
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw. _constant parameter_
 *
 * @todo - expose more `fft` config options
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const source = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     audioContext: audioContext,
 *     sourceNode: source,
 *   });
 *
 *   const spectrum = new lfo.sink.SpectrumDisplay({
 *     canvas: '#spectrum',
 *   });
 *
 *   audioInNode.connect(spectrum);
 *   audioInNode.start();
 * }
 */

var SpectrumDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(SpectrumDisplay, _BaseDisplay);

  function SpectrumDisplay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, SpectrumDisplay);
    return (0, _possibleConstructorReturn3.default)(this, (SpectrumDisplay.__proto__ || (0, _getPrototypeOf2.default)(SpectrumDisplay)).call(this, definitions, options, false));
  }

  /** @private */


  (0, _createClass3.default)(SpectrumDisplay, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.fft = new _Fft2.default({
        size: this.streamParams.frameSize,
        window: 'hann',
        norm: 'linear'
      });

      this.fft.initStream(this.streamParams);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      var bins = this.fft.inputSignal(frame.data);
      var nbrBins = bins.length;

      var width = this.canvasWidth;
      var height = this.canvasHeight;
      var scale = this.params.get('scale');

      var binWidth = width / nbrBins;
      var ctx = this.ctx;

      ctx.fillStyle = this.params.get('color');

      // error handling needs review...
      var error = 0;

      for (var i = 0; i < nbrBins; i++) {
        var x1Float = i * binWidth + error;
        var x1Int = Math.round(x1Float);
        var x2Float = x1Float + (binWidth - error);
        var x2Int = Math.round(x2Float);

        error = x2Int - x2Float;

        if (x1Int !== x2Int) {
          var _width = x2Int - x1Int;
          var db = 20 * (0, _log2.default)(bins[i]);
          var y = this.getYPosition(db * scale);
          ctx.fillRect(x1Int, y, _width, height - y);
        } else {
          error -= binWidth;
        }
      }
    }
  }]);
  return SpectrumDisplay;
}(_BaseDisplay3.default);

exports.default = SpectrumDisplay;

},{"../../common/operator/Fft":144,"../utils/display-utils":141,"./BaseDisplay":125,"babel-runtime/core-js/math/log10":3,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],131:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _displayUtils = require('../utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  color: {
    type: 'string',
    default: (0, _displayUtils.getColors)('trace'),
    metas: { kind: 'dynamic' }
  },
  colorScheme: {
    type: 'enum',
    default: 'none',
    list: ['none', 'hue', 'opacity']
  }
};

/**
 * Display a range value around a mean value (for example mean
 * and standart deviation).
 *
 * This sink can handle input of type `vector` of frameSize >= 2.
 *
 * @param {Object} options - Override default parameters.
 * @param {String} [options.color='orange'] - Color.
 * @param {String} [options.colorScheme='none'] - If a third value is available
 *  in the input, can be used to control the opacity or the hue. If input frame
 *  size is 2, this param is automatically set to `none`
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
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
 *  the canvas. _dynamic parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class.
 *
 * @memberof module:client.sink
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const AudioContext = (window.AudioContext || window.webkitAudioContext);
 * const audioContext = new AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const source = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     sourceNode: source,
 *     audioContext: audioContext,
 *   });
 *
 *   // not sure it make sens but...
 *   const meanStddev = new lfo.operator.MeanStddev();
 *
 *   const traceDisplay = new lfo.sink.TraceDisplay({
 *     canvas: '#trace',
 *   });
 *
 *   const logger = new lfo.sink.Logger({ data: true });
 *
 *   audioInNode.connect(meanStddev);
 *   meanStddev.connect(traceDisplay);
 *
 *   audioInNode.start();
 * }
 */

var TraceDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(TraceDisplay, _BaseDisplay);

  function TraceDisplay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, TraceDisplay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TraceDisplay.__proto__ || (0, _getPrototypeOf2.default)(TraceDisplay)).call(this, definitions, options));

    _this.prevFrame = null;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(TraceDisplay, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      if (this.streamParams.frameSize === 2) this.params.set('colorScheme', 'none');

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame, frameWidth, pixelsSinceLastFrame) {
      var colorScheme = this.params.get('colorScheme');
      var ctx = this.ctx;
      var prevData = this.prevFrame ? this.prevFrame.data : null;
      var data = frame.data;

      var halfRange = data[1] / 2;
      var mean = this.getYPosition(data[0]);
      var min = this.getYPosition(data[0] - halfRange);
      var max = this.getYPosition(data[0] + halfRange);

      var prevHalfRange = void 0;
      var prevMean = void 0;
      var prevMin = void 0;
      var prevMax = void 0;

      if (prevData !== null) {
        prevHalfRange = prevData[1] / 2;
        prevMean = this.getYPosition(prevData[0]);
        prevMin = this.getYPosition(prevData[0] - prevHalfRange);
        prevMax = this.getYPosition(prevData[0] + prevHalfRange);
      }

      var color = this.params.get('color');
      var gradient = void 0;
      var rgb = void 0;

      switch (colorScheme) {
        case 'none':
          rgb = (0, _displayUtils.hexToRGB)(color);
          ctx.fillStyle = 'rgba(' + rgb.join(',') + ', 0.7)';
          ctx.strokeStyle = color;
          break;
        case 'hue':
          gradient = ctx.createLinearGradient(-pixelsSinceLastFrame, 0, 0, 0);

          if (prevData) gradient.addColorStop(0, 'hsl(' + (0, _displayUtils.getHue)(prevData[2]) + ', 100%, 50%)');else gradient.addColorStop(0, 'hsl(' + (0, _displayUtils.getHue)(data[2]) + ', 100%, 50%)');

          gradient.addColorStop(1, 'hsl(' + (0, _displayUtils.getHue)(data[2]) + ', 100%, 50%)');
          ctx.fillStyle = gradient;
          break;
        case 'opacity':
          rgb = (0, _displayUtils.hexToRGB)(this.params.get('color'));
          gradient = ctx.createLinearGradient(-pixelsSinceLastFrame, 0, 0, 0);

          if (prevData) gradient.addColorStop(0, 'rgba(' + rgb.join(',') + ', ' + prevData[2] + ')');else gradient.addColorStop(0, 'rgba(' + rgb.join(',') + ', ' + data[2] + ')');

          gradient.addColorStop(1, 'rgba(' + rgb.join(',') + ', ' + data[2] + ')');
          ctx.fillStyle = gradient;
          break;
      }

      ctx.save();
      // draw range
      ctx.beginPath();
      ctx.moveTo(0, mean);
      ctx.lineTo(0, max);

      if (prevData !== null) {
        ctx.lineTo(-pixelsSinceLastFrame, prevMax);
        ctx.lineTo(-pixelsSinceLastFrame, prevMin);
      }

      ctx.lineTo(0, min);
      ctx.closePath();

      ctx.fill();

      // draw mean
      if (colorScheme === 'none' && prevMean) {
        ctx.beginPath();
        ctx.moveTo(-pixelsSinceLastFrame, prevMean);
        ctx.lineTo(0, mean);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();

      this.prevFrame = frame;
    }
  }]);
  return TraceDisplay;
}(_BaseDisplay3.default);

;

exports.default = TraceDisplay;

},{"../utils/display-utils":141,"./BaseDisplay":125,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],132:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _log = require('babel-runtime/core-js/math/log10');

var _log2 = _interopRequireDefault(_log);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _Rms = require('../../common/operator/Rms');

var _Rms2 = _interopRequireDefault(_Rms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log10 = _log2.default;

var definitions = {
  offset: {
    type: 'float',
    default: -14,
    metas: { kind: 'dyanmic' }
  },
  min: {
    type: 'float',
    default: -80,
    metas: { kind: 'dynamic' }
  },
  max: {
    type: 'float',
    default: 6,
    metas: { kind: 'dynamic' }
  },
  width: {
    type: 'integer',
    default: 6,
    metas: { kind: 'dynamic' }
  }

  /**
   * Simple VU-Meter to used on a `signal` stream.
   *
   * @memberof module:client.sink
   *
   * @param {Object} options - Override defaults parameters.
   * @param {Number} [options.offset=-14] - dB offset applied to the signal.
   * @param {Number} [options.min=-80] - Minimum displayed value (in dB).
   * @param {Number} [options.max=6] - Maximum displayed value (in dB).
   * @param {Number} [options.width=6] - Width of the display (in pixels).
   * @param {Number} [options.height=150] - Height of the canvas.
   * @param {Element|CSSSelector} [options.container=null] - Container element
   *  in which to insert the canvas.
   * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
   *  in which to draw.
   *
   * @example
   * import * as lfo from 'waves-lfo/client';
   *
   * const audioContext = new window.AudioContext();
   *
   * navigator.mediaDevices
   *   .getUserMedia({ audio: true })
   *   .then(init)
   *   .catch((err) => console.error(err.stack));
   *
   * function init(stream) {
   *   const source = audioContext.createMediaStreamSource(stream);
   *
   *   const audioInNode = new lfo.source.AudioInNode({
   *     audioContext: audioContext,
   *     sourceNode: source,
   *   });
   *
   *   const vuMeter = new lfo.sink.VuMeterDisplay({
   *     canvas: '#vu-meter',
   *   });
   *
   *   audioInNode.connect(vuMeter);
   *   audioInNode.start();
   * }
   */
};
var VuMeterDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(VuMeterDisplay, _BaseDisplay);

  function VuMeterDisplay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, VuMeterDisplay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (VuMeterDisplay.__proto__ || (0, _getPrototypeOf2.default)(VuMeterDisplay)).call(this, definitions, options, false));

    _this.rmsOperator = new _Rms2.default();

    _this.lastDB = 0;
    _this.peak = {
      value: 0,
      time: 0
    };

    _this.peakLifetime = 1; // sec
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(VuMeterDisplay, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.rmsOperator.initStream(this.streamParams);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      var now = new Date().getTime() / 1000; // sec
      var offset = this.params.get('offset'); // offset zero of the vu meter
      var height = this.canvasHeight;
      var width = this.canvasWidth;
      var ctx = this.ctx;

      var lastDB = this.lastDB;
      var peak = this.peak;

      var red = '#ff2121';
      var yellow = '#ffff1f';
      var green = '#00ff00';

      // handle current db value
      var rms = this.rmsOperator.inputSignal(frame.data);
      var dB = 20 * log10(rms) - offset;

      // slow release (could probably be improved)
      if (lastDB > dB) dB = lastDB - 6;

      // handle peak
      if (dB > peak.value || now - peak.time > this.peakLifetime) {
        peak.value = dB;
        peak.time = now;
      }

      var y0 = this.getYPosition(0);
      var y = this.getYPosition(dB);
      var yPeak = this.getYPosition(peak.value);

      ctx.save();

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      var gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, green);
      gradient.addColorStop((height - y0) / height, yellow);
      gradient.addColorStop(1, red);

      // dB
      ctx.fillStyle = gradient;
      ctx.fillRect(0, y, width, height - y);

      // 0 dB marker
      ctx.fillStyle = '#dcdcdc';
      ctx.fillRect(0, y0, width, 2);

      // peak
      ctx.fillStyle = gradient;
      ctx.fillRect(0, yPeak, width, 2);

      ctx.restore();

      this.lastDB = dB;
    }
  }]);
  return VuMeterDisplay;
}(_BaseDisplay3.default);

exports.default = VuMeterDisplay;

},{"../../common/operator/Rms":153,"./BaseDisplay":125,"babel-runtime/core-js/math/log10":3,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],133:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _MinMax = require('../../common/operator/MinMax');

var _MinMax2 = _interopRequireDefault(_MinMax);

var _Rms = require('../../common/operator/Rms');

var _Rms2 = _interopRequireDefault(_Rms);

var _displayUtils = require('../utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  colors: {
    type: 'any',
    default: (0, _displayUtils.getColors)('waveform'),
    metas: { kind: 'dyanmic' }
  },
  rms: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dyanmic' }
  }
};

/**
 * Display a waveform (along with optionnal Rms) of a given `signal` input in
 * a canvas.
 *
 * @param {Object} options - Override default parameters.
 * @param {Array<String>} [options.colors=['waveform', 'rms']] - Array
 *  containing the color codes for the waveform (index 0) and rms (index 1).
 *  _dynamic parameter_
 * @param {Boolean} [options.rms=false] - Set to `true` to display the rms.
 *  _dynamic parameter_
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
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
 * @memberof module:client.sink
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new window.AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const audioIn = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     audioContext: audioContext,
 *     sourceNode: audioIn,
 *     frameSize: 512,
 *   });
 *
 *   const waveformDisplay = new lfo.sink.WaveformDisplay({
 *     canvas: '#waveform',
 *     duration: 3.5,
 *     rms: true,
 *   });
 *
 *   audioInNode.connect(waveformDisplay);
 *   audioInNode.start();
 * });
 */

var WaveformDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(WaveformDisplay, _BaseDisplay);

  function WaveformDisplay(options) {
    (0, _classCallCheck3.default)(this, WaveformDisplay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WaveformDisplay.__proto__ || (0, _getPrototypeOf2.default)(WaveformDisplay)).call(this, definitions, options, true));

    _this.minMaxOperator = new _MinMax2.default();
    _this.rmsOperator = new _Rms2.default();
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(WaveformDisplay, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.minMaxOperator.initStream(this.streamParams);
      this.rmsOperator.initStream(this.streamParams);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame, frameWidth, pixelsSinceLastFrame) {
      // drop frames that cannot be displayed
      if (frameWidth < 1) return;

      var colors = this.params.get('colors');
      var showRms = this.params.get('rms');
      var ctx = this.ctx;
      var data = frame.data;
      var iSamplesPerPixels = Math.floor(data.length / frameWidth);

      for (var index = 0; index < frameWidth; index++) {
        var start = index * iSamplesPerPixels;
        var end = index === frameWidth - 1 ? undefined : start + iSamplesPerPixels;
        var slice = data.subarray(start, end);

        var minMax = this.minMaxOperator.inputSignal(slice);
        var minY = this.getYPosition(minMax[0]);
        var maxY = this.getYPosition(minMax[1]);

        ctx.strokeStyle = colors[0];
        ctx.beginPath();
        ctx.moveTo(index, minY);
        ctx.lineTo(index, maxY);
        ctx.closePath();
        ctx.stroke();

        if (showRms) {
          var rms = this.rmsOperator.inputSignal(slice);
          var rmsMaxY = this.getYPosition(rms);
          var rmsMinY = this.getYPosition(-rms);

          ctx.strokeStyle = colors[1];
          ctx.beginPath();
          ctx.moveTo(index, rmsMinY);
          ctx.lineTo(index, rmsMaxY);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }]);
  return WaveformDisplay;
}(_BaseDisplay3.default);

exports.default = WaveformDisplay;

},{"../../common/operator/MinMax":149,"../../common/operator/Rms":153,"../utils/display-utils":141,"./BaseDisplay":125,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],134:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Bridge = require('../../common/sink/Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

var _Logger = require('../../common/sink/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _DataRecorder = require('../../common/sink/DataRecorder');

var _DataRecorder2 = _interopRequireDefault(_DataRecorder);

var _SignalRecorder = require('../../common/sink/SignalRecorder');

var _SignalRecorder2 = _interopRequireDefault(_SignalRecorder);

var _BaseDisplay = require('./BaseDisplay');

var _BaseDisplay2 = _interopRequireDefault(_BaseDisplay);

var _BpfDisplay = require('./BpfDisplay');

var _BpfDisplay2 = _interopRequireDefault(_BpfDisplay);

var _MarkerDisplay = require('./MarkerDisplay');

var _MarkerDisplay2 = _interopRequireDefault(_MarkerDisplay);

var _SignalDisplay = require('./SignalDisplay');

var _SignalDisplay2 = _interopRequireDefault(_SignalDisplay);

var _SocketSend = require('./SocketSend');

var _SocketSend2 = _interopRequireDefault(_SocketSend);

var _SpectrumDisplay = require('./SpectrumDisplay');

var _SpectrumDisplay2 = _interopRequireDefault(_SpectrumDisplay);

var _TraceDisplay = require('./TraceDisplay');

var _TraceDisplay2 = _interopRequireDefault(_TraceDisplay);

var _VuMeterDisplay = require('./VuMeterDisplay');

var _VuMeterDisplay2 = _interopRequireDefault(_VuMeterDisplay);

var _WaveformDisplay = require('./WaveformDisplay');

var _WaveformDisplay2 = _interopRequireDefault(_WaveformDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Bridge: _Bridge2.default,
  Logger: _Logger2.default,
  DataRecorder: _DataRecorder2.default,
  SignalRecorder: _SignalRecorder2.default,

  BaseDisplay: _BaseDisplay2.default,
  BpfDisplay: _BpfDisplay2.default,
  MarkerDisplay: _MarkerDisplay2.default,
  SignalDisplay: _SignalDisplay2.default,
  SocketSend: _SocketSend2.default,
  SpectrumDisplay: _SpectrumDisplay2.default,
  TraceDisplay: _TraceDisplay2.default,
  VuMeterDisplay: _VuMeterDisplay2.default,
  WaveformDisplay: _WaveformDisplay2.default
};

// client only
// common

},{"../../common/sink/Bridge":159,"../../common/sink/DataRecorder":160,"../../common/sink/Logger":161,"../../common/sink/SignalRecorder":162,"./BaseDisplay":125,"./BpfDisplay":126,"./MarkerDisplay":127,"./SignalDisplay":128,"./SocketSend":129,"./SpectrumDisplay":130,"./TraceDisplay":131,"./VuMeterDisplay":132,"./WaveformDisplay":133}],135:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _definitions;

var _BaseLfo = require('../../core/BaseLfo');

var _BaseLfo2 = _interopRequireDefault(_BaseLfo);

var _SourceMixin2 = require('../../core/SourceMixin');

var _SourceMixin3 = _interopRequireDefault(_SourceMixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = (_definitions = {
  audioBuffer: {
    type: 'any',
    default: null,
    constant: true
  },
  frameSize: {
    type: 'integer',
    default: 512,
    constant: true
  },
  channel: {
    type: 'integer',
    default: 0,
    constant: true
  },
  progressCallback: {
    type: 'any',
    default: null,
    nullable: true,
    constant: true
  }
}, (0, _defineProperty3.default)(_definitions, 'progressCallback', {
  type: 'any',
  default: null,
  nullable: true,
  constant: true
}), (0, _defineProperty3.default)(_definitions, 'async', {
  type: 'boolean',
  default: false
}), _definitions);

var noop = function noop() {};

/**
 * Slice an `AudioBuffer` into signal blocks and propagate the resulting frames
 * through the graph.
 *
 * @param {Object} options - Override parameter' default values.
 * @param {AudioBuffer} [options.audioBuffer] - Audio buffer to process.
 * @param {Number} [options.frameSize=512] - Size of the output blocks.
 * @param {Number} [options.channel=0] - Number of the channel to process.
 * @param {Number} [options.progressCallback=null] - Callback to be excuted on each
 *  frame output, receive as argument the current progress ratio.
 *
 * @memberof module:client.source
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioInBuffer = new lfo.source.AudioInBuffer({
 *   audioBuffer: audioBuffer,
 *   frameSize: 512,
 * });
 *
 * const waveform = new lfo.sink.Waveform({
 *   canvas: '#waveform',
 *   duration: 1,
 *   color: 'steelblue',
 *   rms: true,
 * });
 *
 * audioInBuffer.connect(waveform);
 * audioInBuffer.start();
 */

var AudioInBuffer = function (_SourceMixin) {
  (0, _inherits3.default)(AudioInBuffer, _SourceMixin);

  function AudioInBuffer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, AudioInBuffer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioInBuffer.__proto__ || (0, _getPrototypeOf2.default)(AudioInBuffer)).call(this, definitions, options));

    var audioBuffer = _this.params.get('audioBuffer');

    if (!audioBuffer) throw new Error('Invalid "audioBuffer" parameter');

    _this.endTime = 0;
    return _this;
  }

  /**
   * Propagate the `streamParams` in the graph and start propagating frames.
   * When called, the slicing of the given `audioBuffer` starts immediately and
   * each resulting frame is propagated in graph.
   *
   * @see {@link module:common.core.BaseLfo#processStreamParams}
   * @see {@link module:common.core.BaseLfo#resetStream}
   * @see {@link module:client.source.AudioInBuffer#stop}
   */


  (0, _createClass3.default)(AudioInBuffer, [{
    key: 'start',
    value: function start() {
      if (this.initialized === false) {
        if (this.initPromise === null) // init has not yet been called
          this.initPromise = this.init();

        this.initPromise.then(this.start);
        return;
      }

      var channel = this.params.get('channel');
      var audioBuffer = this.params.get('audioBuffer');
      var buffer = audioBuffer.getChannelData(channel);
      this.endTime = 0;
      this.started = true;

      this.processFrame(buffer);
    }

    /**
     * Finalize the stream and stop the whole graph. When called, the slicing of
     * the `audioBuffer` stops immediately.
     *
     * @see {@link module:common.core.BaseLfo#finalizeStream}
     * @see {@link module:client.source.AudioInBuffer#start}
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.finalizeStream(this.endTime);
      this.started = false;
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams() {
      var audioBuffer = this.params.get('audioBuffer');
      var frameSize = this.params.get('frameSize');
      var sourceSampleRate = audioBuffer.sampleRate;
      var frameRate = sourceSampleRate / frameSize;

      this.streamParams.frameSize = frameSize;
      this.streamParams.frameRate = frameRate;
      this.streamParams.frameType = 'signal';
      this.streamParams.sourceSampleRate = sourceSampleRate;
      this.streamParams.sourceSampleCount = frameSize;

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(buffer) {
      var async = this.params.get('async');
      var sampleRate = this.streamParams.sourceSampleRate;
      var frameSize = this.streamParams.frameSize;
      var progressCallback = this.params.get('progressCallback') || noop;
      var length = buffer.length;
      var nbrFrames = Math.ceil(buffer.length / frameSize);
      var data = this.frame.data;
      var that = this;
      var i = 0;

      function slice() {
        var offset = i * frameSize;
        var nbrCopy = Math.min(length - offset, frameSize);

        for (var j = 0; j < frameSize; j++) {
          data[j] = j < nbrCopy ? buffer[offset + j] : 0;
        }that.frame.time = offset / sampleRate;
        that.endTime = that.frame.time + nbrCopy / sampleRate;
        that.propagateFrame();

        i += 1;
        progressCallback(i / nbrFrames);

        if (i < nbrFrames) {
          if (async) setTimeout(slice, 0);else slice();
        } else {
          that.finalizeStream(that.endTime);
        }
      };

      // allow the following to do the expected thing:
      // audioIn.connect(recorder);
      // audioIn.start();
      // recorder.start();
      setTimeout(slice, 0);
    }
  }]);
  return AudioInBuffer;
}((0, _SourceMixin3.default)(_BaseLfo2.default));

exports.default = AudioInBuffer;

},{"../../core/BaseLfo":166,"../../core/SourceMixin":167,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/defineProperty":16,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],136:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo = require('../../core/BaseLfo');

var _BaseLfo2 = _interopRequireDefault(_BaseLfo);

var _SourceMixin2 = require('../../core/SourceMixin');

var _SourceMixin3 = _interopRequireDefault(_SourceMixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioContext = window.AudioContext || window.webkitAudioContext;

var definitions = {
  frameSize: {
    type: 'integer',
    default: 512,
    constant: true
  },
  channel: {
    type: 'integer',
    default: 0,
    constant: true
  },
  sourceNode: {
    type: 'any',
    default: null,
    constant: true
  },
  audioContext: {
    type: 'any',
    default: null,
    constant: true
  }
};

/**
 * Use a `WebAudio` node as a source for the graph.
 *
 * @param {Object} options - Override parameter' default values.
 * @param {AudioNode} [options.sourceNode=null] - Audio node to process
 *  (mandatory).
 * @param {AudioContext} [options.audioContext=null] - Audio context used to
 *  create the audio node (mandatory).
 * @param {Number} [options.frameSize=512] - Size of the output blocks, define
 *  the `frameSize` in the `streamParams`.
 * @param {Number} [options.channel=0] - Number of the channel to process.
 *
 * @memberof module:client.source
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new AudioContext();
 * const sine = audioContext.createOscillator();
 * sine.frequency.value = 2;
 *
 * const audioInNode = new lfo.source.AudioInNode({
 *   audioContext: audioContext,
 *   sourceNode: sine,
 * });
 *
 * const signalDisplay = new lfo.sink.SignalDisplay({
 *   canvas: '#signal',
 *   duration: 1,
 * });
 *
 * audioInNode.connect(signalDisplay);
 *
 * // start the sine oscillator node and the lfo graph
 * sine.start();
 * audioInNode.start();
 */

var AudioInNode = function (_SourceMixin) {
  (0, _inherits3.default)(AudioInNode, _SourceMixin);

  function AudioInNode() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, AudioInNode);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioInNode.__proto__ || (0, _getPrototypeOf2.default)(AudioInNode)).call(this, definitions, options));

    var audioContext = _this.params.get('audioContext');
    var sourceNode = _this.params.get('sourceNode');

    if (!audioContext || !(audioContext instanceof AudioContext)) throw new Error('Invalid `audioContext` parameter');

    if (!sourceNode || !(sourceNode instanceof AudioNode)) throw new Error('Invalid `sourceNode` parameter');

    _this.sourceNode = sourceNode;
    _this._channel = _this.params.get('channel');
    _this._blockDuration = null;

    _this.processFrame = _this.processFrame.bind(_this);
    return _this;
  }

  /**
   * Propagate the `streamParams` in the graph and start to propagate signal
   * blocks produced by the audio node into the graph.
   *
   * @see {@link module:common.core.BaseLfo#processStreamParams}
   * @see {@link module:common.core.BaseLfo#resetStream}
   * @see {@link module:client.source.AudioInNode#stop}
   */


  (0, _createClass3.default)(AudioInNode, [{
    key: 'start',
    value: function start() {
      if (this.initialized === false) {
        if (this.initPromise === null) // init has not yet been called
          this.initPromise = this.init();

        this.initPromise.then(this.start);
        return;
      }

      var audioContext = this.params.get('audioContext');
      var frameSize = this.params.get('frameSize');

      this.frame.time = 0;
      // @note: recreate each time because of a firefox weird behavior
      this.scriptProcessor = audioContext.createScriptProcessor(frameSize, 1, 1);
      this.scriptProcessor.onaudioprocess = this.processFrame;

      this.started = true;
      this.sourceNode.connect(this.scriptProcessor);
      this.scriptProcessor.connect(audioContext.destination);
    }

    /**
     * Finalize the stream and stop the whole graph.
     *
     * @see {@link module:common.core.BaseLfo#finalizeStream}
     * @see {@link module:client.source.AudioInNode#start}
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.finalizeStream(this.frame.time);
      this.started = false;
      this.sourceNode.disconnect();
      this.scriptProcessor.disconnect();
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams() {
      var audioContext = this.params.get('audioContext');
      var frameSize = this.params.get('frameSize');
      var sampleRate = audioContext.sampleRate;

      this.streamParams.frameSize = frameSize;
      this.streamParams.frameRate = sampleRate / frameSize;
      this.streamParams.frameType = 'signal';
      this.streamParams.sourceSampleRate = sampleRate;
      this.streamParams.sourceSampleCount = frameSize;

      this._blockDuration = frameSize / sampleRate;

      this.propagateStreamParams();
    }

    /**
     * Basically the `scriptProcessor.onaudioprocess` callback
     * @private
     */

  }, {
    key: 'processFrame',
    value: function processFrame(e) {
      if (this.started === false) return;

      this.frame.data = e.inputBuffer.getChannelData(this._channel);
      this.propagateFrame();

      this.frame.time += this._blockDuration;
    }
  }]);
  return AudioInNode;
}((0, _SourceMixin3.default)(_BaseLfo2.default));

exports.default = AudioInNode;

},{"../../core/BaseLfo":166,"../../core/SourceMixin":167,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],137:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

var _wsUtils = require('../../common/utils/wsUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parameters = {
  port: {
    type: 'integer',
    default: 8000,
    nullable: true,
    constant: true
  },
  url: {
    type: 'string',
    default: null,
    nullable: true,
    constant: true
  }

  /**
   * Receive an lfo frame as a socket message from a `node.sink.SocketSend`
   * instance.
   *
   * <p class="warning">Experimental</p>
   *
   * @memberof module:client.source
   *
   * @todo - handle init / start properly.
   */
};
var SocketReceive = function (_BaseLfo) {
  (0, _inherits3.default)(SocketReceive, _BaseLfo);

  function SocketReceive() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, SocketReceive);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SocketReceive.__proto__ || (0, _getPrototypeOf2.default)(SocketReceive)).call(this, parameters, options));

    var protocol = window.location.protocol.replace(/^http/, 'ws');
    var address = _this.params.get('url') || window.location.hostname;
    var port = _this.params.get('port') || ''; // everything falsy becomes ''
    var socketAddress = protocol + '//' + address + ':' + port;

    _this._dispatch = _this._dispatch.bind(_this);

    _this.socket = new WebSocket(socketAddress);
    _this.socket.binaryType = 'arraybuffer';

    _this.openedPromise = new _promise2.default(function (resolve, reject) {
      _this.socket.onopen = resolve;
    });

    _this.socket.onmessage = _this._dispatch;
    _this.socket.onerror = function (err) {
      return console.error(err.stack);
    };
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(SocketReceive, [{
    key: 'initModule',
    value: function initModule() {
      var _this2 = this;

      var promises = this.nextModules.map(function (mod) {
        return mod.initModule();
      });
      promises.push(this.openedPromise);
      // wait for children promises and send INIT_MODULE_ACK
      _promise2.default.all(promises).then(function () {
        var buffer = _wsUtils.encoders.initModuleAck();
        _this2.socket.send(buffer);
      });
    }

    // process any type
    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar() {}
    /** @private */

  }, {
    key: 'processVector',
    value: function processVector() {}
    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal() {}

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();
      this.frame = frame;
      this.propagateFrame();
    }

    /**
     * Decode and dispatch incomming frame according to opcode
     * @private
     */

  }, {
    key: '_dispatch',
    value: function _dispatch(e) {
      var arrayBuffer = e.data;
      var opcode = _wsUtils.decoders.opcode(arrayBuffer);

      switch (opcode) {
        case _wsUtils.opcodes.INIT_MODULE_REQ:
          this.initModule();
          break;
        case _wsUtils.opcodes.PROCESS_STREAM_PARAMS:
          var prevStreamParams = _wsUtils.decoders.streamParams(arrayBuffer);
          this.processStreamParams(prevStreamParams);
          break;
        case _wsUtils.opcodes.RESET_STREAM:
          this.resetStream();
          break;
        case _wsUtils.opcodes.FINALIZE_STREAM:
          var endTime = _wsUtils.decoders.finalizeStream(arrayBuffer);
          this.finalizeStream(endTime);
          break;
        case _wsUtils.opcodes.PROCESS_FRAME:
          var frameSize = this.streamParams.frameSize;
          var frame = _wsUtils.decoders.processFrame(arrayBuffer, frameSize);
          this.processFrame(frame);
          break;
      }
    }
  }]);
  return SocketReceive;
}(_BaseLfo3.default);

exports.default = SocketReceive;

},{"../../common/utils/wsUtils":165,"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/core-js/promise":11,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],138:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EventIn = require('../../common/source/EventIn');

var _EventIn2 = _interopRequireDefault(_EventIn);

var _AudioInBuffer = require('./AudioInBuffer');

var _AudioInBuffer2 = _interopRequireDefault(_AudioInBuffer);

var _AudioInNode = require('./AudioInNode');

var _AudioInNode2 = _interopRequireDefault(_AudioInNode);

var _SocketReceive = require('./SocketReceive');

var _SocketReceive2 = _interopRequireDefault(_SocketReceive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// common
exports.default = {
  EventIn: _EventIn2.default,

  AudioInBuffer: _AudioInBuffer2.default,
  AudioInNode: _AudioInNode2.default,
  SocketReceive: _SocketReceive2.default
};
// client only

},{"../../common/source/EventIn":163,"./AudioInBuffer":135,"./AudioInNode":136,"./SocketReceive":137}],139:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Synchronize several display sinks to a common time.
 *
 * @param {...BaseDisplay} views - List of the display to synchronize.
 *
 * @memberof module:client.utils
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn1 = new lfo.source.EventIn({
 *   frameType: 'scalar',
 *   frameSize: 1,
 * });
 *
 * const bpf1 = new lfo.sink.BpfDisplay({
 *   canvas: '#bpf-1',
 *   duration: 2,
 *   startTime: 0,
 *   min: 0,
 *   colors: ['steelblue'],
 * });
 *
 * eventIn1.connect(bpf1);
 *
 * const eventIn2 = new lfo.source.EventIn({
 *   frameType: 'scalar',
 *   frameSize: 1,
 * });
 *
 * const bpf2 = new lfo.sink.BpfDisplay({
 *   canvas: '#bpf-2',
 *   duration: 2,
 *   startTime: 7,
 *   min: 0,
 *   colors: ['orange'],
 * });
 *
 * const displaySync = new lfo.utils.DisplaySync(bpf1, bpf2);
 *
 * eventIn2.connect(bpf2);
 *
 * eventIn1.start();
 * eventIn2.start();
 *
 * let time = 0;
 * const period = 0.4;
 * const offset = 7.2;
 *
 * (function generateData() {
 *   const v = Math.random();
 *
 *   eventIn1.process(time, v);
 *   eventIn2.process(time + offset, v);
 *
 *   time += period;
 *
 *   setTimeout(generateData, period * 1000);
 * }());
 */
var DisplaySync = function () {
  function DisplaySync() {
    (0, _classCallCheck3.default)(this, DisplaySync);

    this.views = [];

    this.add.apply(this, arguments);
  }

  /** @private */


  (0, _createClass3.default)(DisplaySync, [{
    key: "add",
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, views = Array(_len), _key = 0; _key < _len; _key++) {
        views[_key] = arguments[_key];
      }

      views.forEach(function (view) {
        return _this.install(view);
      });
    }

    /** @private */

  }, {
    key: "install",
    value: function install(view) {
      this.views.push(view);

      view.displaySync = this;
    }

    /** @private */

  }, {
    key: "shiftSiblings",
    value: function shiftSiblings(iShift, time, view) {
      this.views.forEach(function (display) {
        if (display !== view) display.shiftCanvas(iShift, time);
      });
    }
  }]);
  return DisplaySync;
}();

exports.default = DisplaySync;

},{"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15}],140:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DisplaySync = require('./DisplaySync');

var _DisplaySync2 = _interopRequireDefault(_DisplaySync);

var _windows = require('../../common/utils/windows');

var _windows2 = _interopRequireDefault(_windows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  DisplaySync: _DisplaySync2.default,
  initWindows: _windows2.default
};

},{"../../common/utils/windows":164,"./DisplaySync":139}],141:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var colors = ['#4682B4', '#ffa500', '#00e600', '#ff0000', '#800080', '#224153'];

var getColors = exports.getColors = function getColors(type, nbr) {
  switch (type) {
    case 'signal':
      return colors[0]; // steelblue
      break;
    case 'bpf':
      if (nbr <= colors.length) {
        return colors.slice(0, nbr);
      } else {
        var _colors = colors.slice(0);
        while (_colors.length < nbr) {
          _colors.push(getRandomColor());
        }return _colors;
      }
      break;
    case 'waveform':
      return [colors[0], colors[5]]; // steelblue / darkblue
      break;
    case 'marker':
      return colors[3]; // red
      break;
    case 'spectrum':
      return colors[2]; // green
      break;
    case 'trace':
      return colors[1]; // orange
      break;
  }
};

// http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
var getRandomColor = exports.getRandomColor = function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// scale from domain [0, 1] to range [270, 0] to consume in
// hsl(x, 100%, 50%) color scheme
var getHue = exports.getHue = function getHue(x) {
  var domainMin = 0;
  var domainMax = 1;
  var rangeMin = 270;
  var rangeMax = 0;

  return (rangeMax - rangeMin) * (x - domainMin) / (domainMax - domainMin) + rangeMin;
};

var hexToRGB = exports.hexToRGB = function hexToRGB(hex) {
  hex = hex.substring(1, 7);
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
};

},{}],142:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var pow = Math.pow;
var _2PI = Math.PI * 2;

// plot (from http://www.earlevel.com/scripts/widgets/20131013/biquads2.js)
// var len = 512;
// var magPlot = [];
// for (var idx = 0; idx < len; idx++) {
//   var w;
//   if (plotType == "linear")
//     w = idx / (len - 1) * Math.PI;  // 0 to pi, linear scale
//   else
//     w = Math.exp(Math.log(1 / 0.001) * idx / (len - 1)) * 0.001 * Math.PI;  // 0.001 to 1, times pi, log scale

//   var phi = Math.pow(Math.sin(w/2), 2);
//   var y = Math.log(Math.pow(a0+a1+a2, 2) - 4*(a0*a1 + 4*a0*a2 + a1*a2)*phi + 16*a0*a2*phi*phi) - Math.log(Math.pow(1+b1+b2, 2) - 4*(b1 + 4*b2 + b1*b2)*phi + 16*b2*phi*phi);
//   y = y * 10 / Math.LN10
//   if (y == -Infinity)
//     y = -200;

//   if (plotType == "linear")
//     magPlot.push([idx / (len - 1) * Fs / 2, y]);
//   else
//     magPlot.push([idx / (len - 1) / 2, y]);

//   if (idx == 0)
//     minVal = maxVal = y;
//   else if (y < minVal)
//     minVal = y;
//   else if (y > maxVal)
//     maxVal = y;
// }

var definitions = {
  type: {
    type: 'enum',
    default: 'lowpass',
    list: ['lowpass', 'highpass', 'bandpass_constant_skirt', 'bandpass', 'bandpass_constant_peak', 'notch', 'allpass', 'peaking', 'lowshelf', 'highshelf'],
    metas: { kind: 'dyanmic' }
  },
  f0: {
    type: 'float',
    default: 1,
    metas: { kind: 'dyanmic' }
  },
  gain: {
    type: 'float',
    default: 1,
    min: 0,
    metas: { kind: 'dyanmic' }
  },
  q: {
    type: 'float',
    default: 1,
    min: 0.001, // PIPO_BIQUAD_MIN_Q
    // max: 1,
    metas: { kind: 'dyanmic' }
  }
  // bandwidth: {
  //   type: 'float',
  //   default: null,
  //   nullable: true,
  //   metas: { kind: 'dyanmic' },
  // },


  /**
   * Biquad filter (Direct form I). If input is of type `vector` the filter is
   * applied on each dimension i parallel.
   *
   * Based on the ["Cookbook formulae for audio EQ biquad filter coefficients"](http://www.musicdsp.org/files/Audio-EQ-Cookbook.txt)
   * by Robert Bristow-Johnson.
   *
   * @memberof module:common.operator
   *
   * @param {Object} options - Override default values.
   * @param {String} [options.type='lowpass'] - Type of the filter. Available
   *  filters: 'lowpass', 'highpass', 'bandpass_constant_skirt', 'bandpass_constant_peak'
   *  (alias 'bandpass'), 'notch', 'allpass', 'peaking', 'lowshelf', 'highshelf'.
   * @param {Number} [options.f0=1] - Cutoff or center frequency of the filter
   *  according to its type.
   * @param {Number} [options.gain=1] - Gain of the filter (in dB).
   * @param {Number} [options.q=1] - Quality factor of the filter.
   *
   * @example
   * import * as lfo from 'waves-lfo/client';
   *
   * const audioInBuffer = new lfo.source.AudioInBuffer({
   *   audioBuffer: buffer,
   * });
   *
   * const biquad = new lfo.operator.Biquad({
   *   type: 'lowpass',
   *   f0: 2000,
   *   gain: 3,
   *   q: 12,
   * });
   *
   * const spectrumDisplay = new lfo.sink.SpectrumDisplay({
   *   canvas: '#spectrum',
   * });
   *
   * audioInBuffer.connect(biquad);
   * biquad.connect(spectrumDisplay);
   *
   * audioInBuffer.start();
   */
};
var Biquad = function (_BaseLfo) {
  (0, _inherits3.default)(Biquad, _BaseLfo);

  function Biquad() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Biquad);
    return (0, _possibleConstructorReturn3.default)(this, (Biquad.__proto__ || (0, _getPrototypeOf2.default)(Biquad)).call(this, definitions, options));
  }

  (0, _createClass3.default)(Biquad, [{
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      this._calculateCoefs();
    }
  }, {
    key: '_calculateCoefs',
    value: function _calculateCoefs() {
      var sampleRate = this.streamParams.sourceSampleRate;
      var frameType = this.streamParams.frameType;
      var frameSize = this.streamParams.frameSize;

      var type = this.params.get('type');
      var f0 = this.params.get('f0');
      var gain = this.params.get('gain');
      var q = this.params.get('q');
      // const bandwidth = this.params.get('bandwidth');
      var bandwidth = null;

      var b0 = 0,
          b1 = 0,
          b2 = 0,
          a0 = 0,
          a1 = 0,
          a2 = 0;

      var A = pow(10, gain / 40);
      var w0 = _2PI * f0 / sampleRate;
      var cosW0 = cos(w0);
      var sinW0 = sin(w0);
      var alpha = void 0; // depend of the filter type
      var _2RootAAlpha = void 0; // intermediate value for lowshelf and highshelf

      switch (type) {
        // H(s) = 1 / (s^2 + s/Q + 1)
        case 'lowpass':
          alpha = sinW0 / (2 * q);
          b0 = (1 - cosW0) / 2;
          b1 = 1 - cosW0;
          b2 = b0;
          a0 = 1 + alpha;
          a1 = -2 * cosW0;
          a2 = 1 - alpha;
          break;
        // H(s) = s^2 / (s^2 + s/Q + 1)
        case 'highpass':
          alpha = sinW0 / (2 * q);
          b0 = (1 + cosW0) / 2;
          b1 = -(1 + cosW0);
          b2 = b0;
          a0 = 1 + alpha;
          a1 = -2 * cosW0;
          a2 = 1 - alpha;
          break;
        // H(s) = s / (s^2 + s/Q + 1)  (constant skirt gain, peak gain = Q)
        case 'bandpass_constant_skirt':
          if (bandwidth) {
            // sin(w0)*sinh( ln(2)/2 * BW * w0/sin(w0) )           (case: BW)
          } else {
            alpha = sinW0 / (2 * q);
          }

          b0 = sinW0 / 2;
          b1 = 0;
          b2 = -b0;
          a0 = 1 + alpha;
          a1 = -2 * cosW0;
          a2 = 1 - alpha;
          break;
        // H(s) = (s/Q) / (s^2 + s/Q + 1)      (constant 0 dB peak gain)
        case 'bandpass': // looks like what is gnerally considered as a bandpass
        case 'bandpass_constant_peak':
          if (bandwidth) {
            // sin(w0)*sinh( ln(2)/2 * BW * w0/sin(w0) )           (case: BW)
          } else {
            alpha = sinW0 / (2 * q);
          }

          b0 = alpha;
          b1 = 0;
          b2 = -alpha;
          a0 = 1 + alpha;
          a1 = -2 * cosW0;
          a2 = 1 - alpha;
          break;
        // H(s) = (s^2 + 1) / (s^2 + s/Q + 1)
        case 'notch':
          alpha = sinW0 / (2 * q);
          b0 = 1;
          b1 = -2 * cosW0;
          b2 = 1;
          a0 = 1 + alpha;
          a1 = b1;
          a2 = 1 - alpha;
          break;
        // H(s) = (s^2 - s/Q + 1) / (s^2 + s/Q + 1)
        case 'allpass':
          alpha = sinW0 / (2 * q);
          b0 = 1 - alpha;
          b1 = -2 * cosW0;
          b2 = 1 + alpha;
          a0 = b2;
          a1 = b1;
          a2 = b0;
          break;
        // H(s) = (s^2 + s*(A/Q) + 1) / (s^2 + s/(A*Q) + 1)
        case 'peaking':
          if (bandwidth) {
            // sin(w0)*sinh( ln(2)/2 * BW * w0/sin(w0) )           (case: BW)
          } else {
            alpha = sinW0 / (2 * q);
          }

          b0 = 1 + alpha * A;
          b1 = -2 * cosW0;
          b2 = 1 - alpha * A;
          a0 = 1 + alpha / A;
          a1 = b1;
          a2 = 1 - alpha / A;
          break;
        // H(s) = A * (s^2 + (sqrt(A)/Q)*s + A)/(A*s^2 + (sqrt(A)/Q)*s + 1)
        case 'lowshelf':
          alpha = sinW0 / (2 * q);
          _2RootAAlpha = 2 * sqrt(A) * alpha;

          b0 = A * (A + 1 - (A - 1) * cosW0 + _2RootAAlpha);
          b1 = 2 * A * (A - 1 - (A + 1) * cosW0);
          b2 = A * (A + 1 - (A - 1) * cosW0 - _2RootAAlpha);
          a0 = A + 1 + (A - 1) * cosW0 + _2RootAAlpha;
          a1 = -2 * (A - 1 + (A + 1) * cosW0);
          a2 = A + 1 + (A - 1) * cosW0 - _2RootAAlpha;
          break;
        // H(s) = A * (A*s^2 + (sqrt(A)/Q)*s + 1)/(s^2 + (sqrt(A)/Q)*s + A)
        case 'highshelf':
          alpha = sinW0 / (2 * q);
          _2RootAAlpha = 2 * sqrt(A) * alpha;

          b0 = A * (A + 1 + (A - 1) * cosW0 + _2RootAAlpha);
          b1 = -2 * A * (A - 1 + (A + 1) * cosW0);
          b2 = A * (A + 1 + (A - 1) * cosW0 - _2RootAAlpha);
          a0 = A + 1 - (A - 1) * cosW0 + _2RootAAlpha;
          a1 = 2 * (A - 1 - (A + 1) * cosW0);
          a2 = A + 1 - (A - 1) * cosW0 - _2RootAAlpha;

          break;
      }

      this.coefs = {
        b0: b0 / a0,
        b1: b1 / a0,
        b2: b2 / a0,
        a1: a1 / a0,
        a2: a2 / a0
      };

      // reset state
      if (frameType === 'signal') {
        this.state = { x1: 0, x2: 0, y1: 0, y2: 0 };
      } else {
        this.state = {
          x1: new Float32Array(frameSize),
          x2: new Float32Array(frameSize),
          y1: new Float32Array(frameSize),
          y2: new Float32Array(frameSize)
        };
      }
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      // if no `sampleRate` or `sampleRate` is 0 we shall halt!
      var sampleRate = this.streamParams.sourceSampleRate;

      if (!sampleRate || sampleRate <= 0) throw new Error('Invalid sampleRate value (0) for biquad');

      this._calculateCoefs();
      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      var frameSize = this.streamParams.frameSize;
      var outData = this.frame.data;
      var inData = frame.data;
      var state = this.state;
      var coefs = this.coefs;

      for (var i = 0; i < frameSize; i++) {
        var x = inData[i];
        var y = coefs.b0 * x + coefs.b1 * state.x1[i] + coefs.b2 * state.x2[i] - coefs.a1 * state.y1[i] - coefs.a2 * state.y2[i];

        outData[i] = y;

        // update states
        state.x2[i] = state.x1[i];
        state.x1[i] = x;
        state.y2[i] = state.y1[i];
        state.y1[i] = y;
      }
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      var frameSize = this.streamParams.frameSize;
      var outData = this.frame.data;
      var inData = frame.data;
      var state = this.state;
      var coefs = this.coefs;

      for (var i = 0; i < frameSize; i++) {
        var x = inData[i];
        var y = coefs.b0 * x + coefs.b1 * state.x1 + coefs.b2 * state.x2 - coefs.a1 * state.y1 - coefs.a2 * state.y2;

        outData[i] = y;

        // update states
        state.x2 = state.x1;
        state.x1 = x;
        state.y2 = state.y1;
        state.y1 = y;
      }
    }
  }]);
  return Biquad;
}(_BaseLfo3.default);

exports.default = Biquad;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],143:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqrt = Math.sqrt;
var cos = Math.cos;
var PI = Math.PI;

// Dct Type 2 - orthogonal matrix scaling
function getDctWeights(order, N) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'htk';

  var weights = new Float32Array(N * order);
  var piOverN = PI / N;
  var scale0 = 1 / sqrt(2);
  var scale = sqrt(2 / N);

  for (var k = 0; k < order; k++) {
    var s = k === 0 ? scale0 * scale : scale;
    // const s = scale; // rta doesn't apply k=0 scaling

    for (var n = 0; n < N; n++) {
      weights[k * N + n] = s * cos(k * (n + 0.5) * piOverN);
    }
  }

  return weights;
}

var definitions = {
  order: {
    type: 'integer',
    default: 12,
    metas: { kind: 'static' }
  }
};

/**
 * Compute the Discrete Cosine Transform of an input `signal` or `vector`.
 * (HTK style weighting).
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.order=12] - Number of computed bins.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * // assuming some audio buffer
 * const source = new AudioInBuffer({
 *   audioBuffer: audioBuffer,
 *   useWorker: false,
 * });
 *
 * const slicer = new Slicer({
 *   frameSize: 512,
 *   hopSize: 512,
 * });
 *
 * const dct = new Dct({
 *   order: 12,
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * source.connect(slicer);
 * slicer.connect(dct);
 * dct.connect(logger);
 *
 * source.start();
 */

var Dct = function (_BaseLfo) {
  (0, _inherits3.default)(Dct, _BaseLfo);

  function Dct() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Dct);
    return (0, _possibleConstructorReturn3.default)(this, (Dct.__proto__ || (0, _getPrototypeOf2.default)(Dct)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Dct, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var order = this.params.get('order');
      var inFrameSize = prevStreamParams.frameSize;

      this.streamParams.frameSize = order;
      this.streamParams.frameType = 'vector';
      this.streamParams.description = [];

      this.weightMatrix = getDctWeights(order, inFrameSize);

      this.propagateStreamParams();
    }

    /**
     * Use the `Dct` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array} values - Input values.
     * @return {Array} - Dct of the input array.
     *
     * @example
     * const dct = new lfo.operator.Dct({ order: 12 });
     * // mandatory for use in standalone mode
     * dct.initStream({ frameSize: 512, frameType: 'signal' });
     * dct.inputSignal(data);
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(values) {
      var order = this.params.get('order');
      var frameSize = values.length;
      var outFrame = this.frame.data;
      var weights = this.weightMatrix;

      for (var k = 0; k < order; k++) {
        var offset = k * frameSize;
        outFrame[k] = 0;

        for (var n = 0; n < frameSize; n++) {
          outFrame[k] += values[n] * weights[offset + n];
        }
      }

      return outFrame;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return Dct;
}(_BaseLfo3.default);

exports.default = Dct;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],144:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

var _windows = require('../utils/windows');

var _windows2 = _interopRequireDefault(_windows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://code.soundsoftware.ac.uk/projects/js-dsp-test/repository/entry/fft/nayuki-obj/fft.js
/*
 * Free Fft and convolution (JavaScript)
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
function FftNayuki(n) {

  this.n = n;
  this.levels = -1;

  for (var i = 0; i < 32; i++) {
    if (1 << i == n) {
      this.levels = i; // Equal to log2(n)
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
  this.forward = function (real, imag) {
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

    // Cooley-Tukey decimation-in-time radix-2 Fft
    for (var size = 2; size <= n; size *= 2) {
      var halfsize = size / 2;
      var tablestep = n / size;

      for (var i = 0; i < n; i += size) {
        for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
          var tpre = real[j + halfsize] * this.cosTable[k] + imag[j + halfsize] * this.sinTable[k];
          var tpim = -real[j + halfsize] * this.sinTable[k] + imag[j + halfsize] * this.cosTable[k];
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
        y = y << 1 | x & 1;
        x >>>= 1;
      }

      return y;
    }
  };

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
  this.inverse = function (real, imag) {
    forward(imag, real);
  };
}

var sqrt = Math.sqrt;

var isPowerOfTwo = function isPowerOfTwo(number) {
  while (number % 2 === 0 && number > 1) {
    number = number / 2;
  }return number === 1;
};

var definitions = {
  size: {
    type: 'integer',
    default: 1024,
    metas: { kind: 'static' }
  },
  window: {
    type: 'enum',
    list: ['none', 'hann', 'hanning', 'hamming', 'blackman', 'blackmanharris', 'sine', 'rectangle'],
    default: 'none',
    metas: { kind: 'static' }
  },
  mode: {
    type: 'enum',
    list: ['magnitude', 'power'], // add complex output
    default: 'magnitude'
  },
  norm: {
    type: 'enum',
    default: 'auto',
    list: ['auto', 'none', 'linear', 'power']
  }

  /**
   * Compute the Fast Fourier Transform of an incomming `signal`.
   *
   * Fft implementation by [Nayuki](https://code.soundsoftware.ac.uk/projects/js-dsp-test/repository/entry/fft/nayuki-obj/fft.js).
   *
   * _support `standalone` usage_
   *
   * @memberof module:common.operator
   *
   * @param {Object} options - Override default parameters.
   * @param {Number} [options.size=1024] - Size of the fft, should be a power of 2.
   *  If the frame size of the incomming signal is lower than this value,
   *  it is zero padded to match the fft size.
   * @param {String} [options.window='none'] - Name of the window applied on the
   *  incomming signal. Available windows are: 'none', 'hann', 'hanning',
   *  'hamming', 'blackman', 'blackmanharris', 'sine', 'rectangle'.
   * @param {String} [options.mode='magnitude'] - Type of the output (`magnitude`
   *  or `power`)
   * @param {String} [options.norm='auto'] - Type of normalization applied on the
   *  output. Possible values are 'auto', 'none', 'linear', 'power'. When set to
   *  `auto`, a `linear` normalization is applied on the magnitude spectrum, while
   *  a `power` normalization is applied on the power spectrum.
   *
   * @example
   * import * as lfo from 'waves-lfo/client';
   *
   * // assuming an `audioBuffer` exists
   * const source = new lfo.source.AudioInBuffer({ audioBuffer });
   *
   * const slicer = new lfo.operator.Slicer({
   *   frameSize: 256,
   * });
   *
   * const fft = new lfo.operator.Fft({
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
};
var Fft = function (_BaseLfo) {
  (0, _inherits3.default)(Fft, _BaseLfo);

  function Fft() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Fft);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Fft.__proto__ || (0, _getPrototypeOf2.default)(Fft)).call(this, definitions, options));

    _this.windowSize = null;
    _this.normalizeCoefs = null;
    _this.window = null;
    _this.real = null;
    _this.imag = null;
    _this.fft = null;

    if (!isPowerOfTwo(_this.params.get('size'))) throw new Error('fftSize must be a power of two');
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(Fft, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);
      // set the output frame size
      var inFrameSize = prevStreamParams.frameSize;
      var fftSize = this.params.get('size');
      var mode = this.params.get('mode');
      var norm = this.params.get('norm');
      var windowName = this.params.get('window');
      // window `none` and `rectangle` are aliases
      if (windowName === 'none') windowName = 'rectangle';

      this.streamParams.frameSize = fftSize / 2 + 1;
      this.streamParams.frameType = 'vector';
      this.streamParams.description = [];
      // size of the window to apply on the input frame
      this.windowSize = inFrameSize < fftSize ? inFrameSize : fftSize;

      // references to populate in the window functions (cf. `initWindow`)
      this.normalizeCoefs = { linear: 0, power: 0 };
      this.window = new Float32Array(this.windowSize);

      (0, _windows2.default)(windowName, // name of the window
      this.window, // buffer populated with the window signal
      this.windowSize, // size of the window
      this.normalizeCoefs // object populated with the normalization coefs
      );

      var _normalizeCoefs = this.normalizeCoefs,
          linear = _normalizeCoefs.linear,
          power = _normalizeCoefs.power;


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
          if (mode === 'magnitude') this.windowNorm = linear;else if (mode === 'power') this.windowNorm = power;
          break;
      }

      this.real = new Float32Array(fftSize);
      this.imag = new Float32Array(fftSize);
      this.fft = new FftNayuki(fftSize);

      this.propagateStreamParams();
    }

    /**
     * Use the `Fft` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array} signal - Input values.
     * @return {Array} - Fft of the input signal.
     *
     * @example
     * const fft = new lfo.operator.Fft({ size: 512, window: 'hann' });
     * // mandatory for use in standalone mode
     * fft.initStream({ frameSize: 256, frameType: 'signal' });
     * fft.inputSignal(signal);
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(signal) {
      var mode = this.params.get('mode');
      var windowSize = this.windowSize;
      var frameSize = this.streamParams.frameSize;
      var fftSize = this.params.get('size');
      var outData = this.frame.data;

      // apply window on the input signal and reset imag buffer
      for (var i = 0; i < windowSize; i++) {
        this.real[i] = signal[i] * this.window[i] * this.windowNorm;
        this.imag[i] = 0;
      }

      // if real is bigger than input signal, fill with zeros
      for (var _i = windowSize; _i < fftSize; _i++) {
        this.real[_i] = 0;
        this.imag[_i] = 0;
      }

      this.fft.forward(this.real, this.imag);

      if (mode === 'magnitude') {
        var norm = 1 / fftSize;

        // DC index
        var realDc = this.real[0];
        var imagDc = this.imag[0];
        outData[0] = sqrt(realDc * realDc + imagDc * imagDc) * norm;

        // Nquyst index
        var realNy = this.real[fftSize / 2];
        var imagNy = this.imag[fftSize / 2];
        outData[fftSize / 2] = sqrt(realNy * realNy + imagNy * imagNy) * norm;

        // power spectrum
        for (var _i2 = 1, j = fftSize - 1; _i2 < fftSize / 2; _i2++, j--) {
          var real = 0.5 * (this.real[_i2] + this.real[j]);
          var imag = 0.5 * (this.imag[_i2] - this.imag[j]);

          outData[_i2] = 2 * sqrt(real * real + imag * imag) * norm;
        }
      } else if (mode === 'power') {
        var _norm = 1 / (fftSize * fftSize);

        // DC index
        var _realDc = this.real[0];
        var _imagDc = this.imag[0];
        outData[0] = (_realDc * _realDc + _imagDc * _imagDc) * _norm;

        // Nquyst index
        var _realNy = this.real[fftSize / 2];
        var _imagNy = this.imag[fftSize / 2];
        outData[fftSize / 2] = (_realNy * _realNy + _imagNy * _imagNy) * _norm;

        // power spectrum
        for (var _i3 = 1, _j = fftSize - 1; _i3 < fftSize / 2; _i3++, _j--) {
          var _real = 0.5 * (this.real[_i3] + this.real[_j]);
          var _imag = 0.5 * (this.imag[_i3] - this.imag[_j]);

          outData[_i3] = 4 * (_real * _real + _imag * _imag) * _norm;
        }
      }

      return outData;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return Fft;
}(_BaseLfo3.default);

exports.default = Fft;

},{"../../core/BaseLfo":166,"../utils/windows":164,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],145:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqrt = Math.sqrt;

var definitions = {
  normalize: {
    type: 'boolean',
    default: true,
    metas: { kind: 'dynamic' }
  },
  power: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  }

  /**
   * Compute the magnitude of a `vector` input.
   *
   * _support `standalone` usage_
   *
   * @param {Object} options - Override default parameters.
   * @param {Boolean} [options.normalize=true] - Normalize output according to
   *  the vector size.
   * @param {Boolean} [options.power=false] - If true, returns the squared
   *  magnitude (power).
   *
   * @memberof module:common.operator
   *
   * @example
   * import * as lfo from 'waves-lfo/common';
   *
   * const eventIn = new lfo.source.EventIn({ frameSize: 2, frameType: 'vector' });
   * const magnitude = new lfo.operator.Magnitude();
   * const logger = new lfo.sink.Logger({ outFrame: true });
   *
   * eventIn.connect(magnitude);
   * magnitude.connect(logger);
   * eventIn.start();
   *
   * eventIn.process(null, [1, 1]);
   * > [1]
   * eventIn.process(null, [2, 2]);
   * > [2.82842712475]
   * eventIn.process(null, [3, 3]);
   * > [4.24264068712]
   */
};
var Magnitude = function (_BaseLfo) {
  (0, _inherits3.default)(Magnitude, _BaseLfo);

  function Magnitude() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Magnitude);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Magnitude.__proto__ || (0, _getPrototypeOf2.default)(Magnitude)).call(this, definitions, options));

    _this._normalize = _this.params.get('normalize');
    _this._power = _this.params.get('power');
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(Magnitude, [{
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      (0, _get3.default)(Magnitude.prototype.__proto__ || (0, _getPrototypeOf2.default)(Magnitude.prototype), 'onParamUpdate', this).call(this, name, value, metas);

      switch (name) {
        case 'normalize':
          this._normalize = value;
          break;
        case 'power':
          this._power = value;
          break;
      }
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);
      this.streamParams.frameSize = 1;
      this.streamParams.frameType = 'scalar';
      this.streamParams.description = ['magnitude'];
      this.propagateStreamParams();
    }

    /**
     * Use the `Magnitude` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array|Float32Array} values - Values to process.
     * @return {Number} - Magnitude value.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const magnitude = new lfo.operator.Magnitude({ power: true });
     * magnitude.initStream({ frameType: 'vector', frameSize: 3 });
     * magnitude.inputVector([3, 3]);
     * > 4.24264068712
     */

  }, {
    key: 'inputVector',
    value: function inputVector(values) {
      var length = values.length;
      var sum = 0;

      for (var i = 0; i < length; i++) {
        sum += values[i] * values[i];
      }var mag = sum;

      if (this._normalize) mag /= length;

      if (!this._power) mag = sqrt(mag);

      return mag;
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      this.frame.data[0] = this.inputVector(frame.data);
    }
  }]);
  return Magnitude;
}(_BaseLfo3.default);

exports.default = Magnitude;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/get":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],146:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqrt = Math.sqrt;

/**
 * Compute mean and standard deviation of a given `signal`.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const source = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     sourceNode: source,
 *     audioContext: audioContext,
 *   });
 *
 *   const meanStddev = new lfo.operator.MeanStddev();
 *
 *   const traceDisplay = new lfo.sink.TraceDisplay({
 *     canvas: '#trace',
 *   });
 *
 *   audioInNode.connect(meanStddev);
 *   meanStddev.connect(traceDisplay);
 *   audioInNode.start();
 * }
 */

var MeanStddev = function (_BaseLfo) {
  (0, _inherits3.default)(MeanStddev, _BaseLfo);

  function MeanStddev() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MeanStddev);

    // no options available, just throw an error if some param try to be set.
    return (0, _possibleConstructorReturn3.default)(this, (MeanStddev.__proto__ || (0, _getPrototypeOf2.default)(MeanStddev)).call(this, {}, options));
  }

  /** @private */


  (0, _createClass3.default)(MeanStddev, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.streamParams.frameType = 'vector';
      this.streamParams.frameSize = 2;
      this.streamParams.description = ['mean', 'stddev'];

      this.propagateStreamParams();
    }

    /**
     * Use the `MeanStddev` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array|Float32Array} values - Values to process.
     * @return {Array} - Mean and standart deviation of the input values.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const meanStddev = new lfo.operator.MeanStddev();
     * meanStddev.initStream({ frameType: 'vector', frameSize: 1024 });
     * meanStddev.inputVector(someSineSignal);
     * > [0, 0.7071]
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(values) {
      var outData = this.frame.data;
      var length = values.length;

      var mean = 0;
      var m2 = 0;

      // compute mean and variance with Welford algorithm
      // https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
      for (var i = 0; i < length; i++) {
        var x = values[i];
        var delta = x - mean;
        mean += delta / (i + 1);
        m2 += delta * (x - mean);
      }

      var variance = m2 / (length - 1);
      var stddev = sqrt(variance);

      outData[0] = mean;
      outData[1] = stddev;

      return outData;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return MeanStddev;
}(_BaseLfo3.default);

exports.default = MeanStddev;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],147:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _log = require('babel-runtime/core-js/math/log10');

var _log2 = _interopRequireDefault(_log);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var min = Math.min;
var max = Math.max;
var pow = Math.pow;
var log10 = _log2.default;

function hertzToMelHtk(freqHz) {
  return 2595 * (0, _log2.default)(1 + freqHz / 700);
}

function melToHertzHtk(freqMel) {
  return 700 * (Math.pow(10, freqMel / 2595) - 1);
}

/**
 * Returns a description of the weights to apply on the fft bins for each
 * Mel band filter.
 * @note - adapted from imtr-tools/rta
 *
 * @param {Number} nbrBins - Number of fft bins.
 * @param {Number} nbrFilter - Number of mel filters.
 * @param {Number} sampleRate - Sample Rate of the signal.
 * @param {Number} minFreq - Minimum Frequency to be considerered.
 * @param {Number} maxFreq - Maximum frequency to consider.
 * @return {Array<Object>} - Description of the weights to apply on the bins for
 *  each mel filter. Each description has the following structure:
 *  { startIndex: binIndex, centerFreq: binCenterFrequency, weights: [] }
 *
 * @private
 */
function getMelBandWeights(nbrBins, nbrBands, sampleRate, minFreq, maxFreq) {
  var type = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'htk';


  var hertzToMel = null;
  var melToHertz = null;
  var minMel = void 0;
  var maxMel = void 0;

  if (type === 'htk') {
    hertzToMel = hertzToMelHtk;
    melToHertz = melToHertzHtk;
    minMel = hertzToMel(minFreq);
    maxMel = hertzToMel(maxFreq);
  } else {
    throw new Error('Invalid mel band type: "' + type + '"');
  }

  var melBandDescriptions = new Array(nbrBands);
  // center frequencies of Fft bins
  var fftFreqs = new Float32Array(nbrBins);
  // center frequencies of mel bands - uniformly spaced in mel domain between
  // limits, there are 2 more frequencies than the actual number of filters in
  // order to calculate the slopes
  var filterFreqs = new Float32Array(nbrBands + 2);

  var fftSize = (nbrBins - 1) * 2;
  // compute bins center frequencies
  for (var i = 0; i < nbrBins; i++) {
    fftFreqs[i] = sampleRate * i / fftSize;
  }for (var _i = 0; _i < nbrBands + 2; _i++) {
    filterFreqs[_i] = melToHertz(minMel + _i / (nbrBands + 1) * (maxMel - minMel));
  } // loop throught filters
  for (var _i2 = 0; _i2 < nbrBands; _i2++) {
    var minWeightIndexDefined = 0;

    var description = {
      startIndex: null,
      centerFreq: null,
      weights: []

      // define contribution of each bin for the filter at index (i + 1)
      // do not process the last spectrum component (Nyquist)
    };for (var j = 0; j < nbrBins - 1; j++) {
      var posSlopeContrib = (fftFreqs[j] - filterFreqs[_i2]) / (filterFreqs[_i2 + 1] - filterFreqs[_i2]);

      var negSlopeContrib = (filterFreqs[_i2 + 2] - fftFreqs[j]) / (filterFreqs[_i2 + 2] - filterFreqs[_i2 + 1]);
      // lowerSlope and upper slope intersect at zero and with each other
      var contribution = max(0, min(posSlopeContrib, negSlopeContrib));

      if (contribution > 0) {
        if (description.startIndex === null) {
          description.startIndex = j;
          description.centerFreq = filterFreqs[_i2 + 1];
        }

        description.weights.push(contribution);
      }
    }

    // empty filter
    if (description.startIndex === null) {
      description.startIndex = 0;
      description.centerFreq = 0;
    }

    // @todo - do some scaling for Slaney-style mel
    melBandDescriptions[_i2] = description;
  }

  return melBandDescriptions;
}

var definitions = {
  log: {
    type: 'boolean',
    default: false,
    metas: { kind: 'static' }
  },
  nbrBands: {
    type: 'integer',
    default: 24,
    metas: { kind: 'static' }
  },
  minFreq: {
    type: 'float',
    default: 0,
    metas: { kind: 'static' }
  },
  maxFreq: {
    type: 'float',
    default: null,
    nullable: true,
    metas: { kind: 'static' }
  },
  power: {
    type: 'integer',
    default: 1,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Compute the mel bands spectrum from a given spectrum (`vector` type).
 * _Implement the `htk` mel band style._
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Boolean} [options.log=false] - Apply a logarithmic scale on the output.
 * @param {Number} [options.nbrBands=24] - Number of filters defining the mel
 *  bands.
 * @param {Number} [options.minFreq=0] - Minimum frequency to consider.
 * @param {Number} [options.maxFreq=null] - Maximum frequency to consider.
 *  If `null`, is set to Nyquist frequency.
 * @param {Number} [options.power=1] - Apply a power scaling on each mel band.
 *
 * @todo - implement Slaney style mel bands
 *
 * @example
 * import lfo from 'waves-lfo/node'
 *
 * // read a file from path (node only source)
 * const audioInFile = new lfo.source.AudioInFile({
 *   filename: 'path/to/file',
 *   frameSize: 512,
 * });
 *
 * const slicer = new lfo.operator.Slicer({
 *   frameSize: 256,
 *   hopSize: 256,
 * });
 *
 * const fft = new lfo.operator.Fft({
 *   size: 1024,
 *   window: 'hann',
 *   mode: 'power',
 *   norm: 'power',
 * });
 *
 * const mel = new lfo.operator.Mel({
 *   log: true,
 *   nbrBands: 24,
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * audioInFile.connect(slicer);
 * slicer.connect(fft);
 * fft.connect(mel);
 * mel.connect(logger);
 *
 * audioInFile.start();
 */

var Mel = function (_BaseLfo) {
  (0, _inherits3.default)(Mel, _BaseLfo);

  function Mel() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Mel);
    return (0, _possibleConstructorReturn3.default)(this, (Mel.__proto__ || (0, _getPrototypeOf2.default)(Mel)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Mel, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var nbrBins = prevStreamParams.frameSize;
      var nbrBands = this.params.get('nbrBands');
      var sampleRate = this.streamParams.sourceSampleRate;
      var minFreq = this.params.get('minFreq');
      var maxFreq = this.params.get('maxFreq');

      //
      this.streamParams.frameSize = nbrBands;
      this.streamParams.frameType = 'vector';
      this.streamParams.description = [];

      if (maxFreq === null) maxFreq = this.streamParams.sourceSampleRate / 2;

      this.melBandDescriptions = getMelBandWeights(nbrBins, nbrBands, sampleRate, minFreq, maxFreq);

      this.propagateStreamParams();
    }

    /**
     * Use the `Mel` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array} spectrum - Fft bins.
     * @return {Array} - Mel bands.
     *
     * @example
     * const mel = new lfo.operator.Mel({ nbrBands: 24 });
     * // mandatory for use in standalone mode
     * mel.initStream({ frameSize: 256, frameType: 'vector', sourceSampleRate: 44100 });
     * mel.inputVector(fftBins);
     */

  }, {
    key: 'inputVector',
    value: function inputVector(bins) {

      var power = this.params.get('power');
      var log = this.params.get('log');
      var melBands = this.frame.data;
      var nbrBands = this.streamParams.frameSize;
      var scale = 1;

      var minLogValue = 1e-48;
      var minLog = -480;

      if (log) scale *= nbrBands;

      for (var i = 0; i < nbrBands; i++) {
        var _melBandDescriptions$ = this.melBandDescriptions[i],
            startIndex = _melBandDescriptions$.startIndex,
            weights = _melBandDescriptions$.weights;

        var value = 0;

        for (var j = 0; j < weights.length; j++) {
          value += weights[j] * bins[startIndex + j];
        } // apply same logic as in PiPoBands
        if (scale !== 1) value *= scale;

        if (log) {
          if (value > minLogValue) value = 10 * log10(value);else value = minLog;
        }

        if (power !== 1) value = pow(value, power);

        melBands[i] = value;
      }

      return melBands;
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      this.inputVector(frame.data);
    }
  }]);
  return Mel;
}(_BaseLfo3.default);

exports.default = Mel;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/math/log10":3,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],148:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

var _Fft = require('./Fft');

var _Fft2 = _interopRequireDefault(_Fft);

var _Mel = require('./Mel');

var _Mel2 = _interopRequireDefault(_Mel);

var _Dct = require('./Dct');

var _Dct2 = _interopRequireDefault(_Dct);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  nbrBands: {
    type: 'integer',
    default: 24,
    meta: { kind: 'static' }
  },
  nbrCoefs: {
    type: 'integer',
    default: 12,
    meta: { kind: 'static' }
  },
  minFreq: {
    type: 'float',
    default: 0,
    meta: { kind: 'static' }
  },
  maxFreq: {
    type: 'float',
    default: null,
    nullable: true,
    meta: { kind: 'static' }
  }
};

/**
 * Compute the Mfcc of the incomming `signal`. Is basically a wrapper around
 * [`Fft`]{@link module:common.operator.Fft}, [`Mel`]{@link module:common.operator.Mel}
 * and [`Dct`]{@link module:common.operator.Dct}.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {nbrBands} [options.nbrBands=24] - Number of Mel bands.
 * @param {nbrCoefs} [options.nbrCoefs=12] - Number of output coefs.
 *
 * @see {@link module:common.operator.Fft}
 * @see {@link module:common.operator.Mel}
 * @see {@link module:common.operator.Dct}
 *
 * @example
 * import lfo from 'waves-lfo/node'
 *
 * const audioInFile = new lfo.source.AudioInFile({
 *   filename: 'path/to/file',
 *   frameSize: 512,
 * });
 *
 * const slicer = new lfo.operator.Slicer({
 *   frameSize: 256,
 * });
 *
 * const mfcc = new lfo.operator.Mfcc({
 *   nbrBands: 24,
 *   nbrCoefs: 12,
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * audioInFile.connect(slicer);
 * slicer.connect(mfcc);
 * mfcc.connect(logger);
 *
 * audioInFile.start();
 */

var Mfcc = function (_BaseLfo) {
  (0, _inherits3.default)(Mfcc, _BaseLfo);

  function Mfcc(options) {
    (0, _classCallCheck3.default)(this, Mfcc);
    return (0, _possibleConstructorReturn3.default)(this, (Mfcc.__proto__ || (0, _getPrototypeOf2.default)(Mfcc)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Mfcc, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var nbrBands = this.params.get('nbrBands');
      var nbrCoefs = this.params.get('nbrCoefs');
      var minFreq = this.params.get('minFreq');
      var maxFreq = this.params.get('maxFreq');
      var inputFrameSize = prevStreamParams.frameSize;
      var inputFrameRate = prevStreamParams.frameRate;
      var inputSampleRate = prevStreamParams.sourceSampleRate;
      var nbrBins = inputFrameSize / 2 + 1;

      this.streamParams.frameSize = nbrCoefs;
      this.streamParams.frameType = 'vector';
      this.streamParams.description = [];

      this.fft = new _Fft2.default({
        window: 'hann',
        mode: 'power',
        norm: 'power',
        size: inputFrameSize
      });

      this.mel = new _Mel2.default({
        nbrBands: nbrBands,
        log: true,
        power: 1,
        minFreq: minFreq,
        maxFreq: maxFreq
      });

      this.dct = new _Dct2.default({
        order: nbrCoefs
      });

      // init streams
      this.fft.initStream({
        frameType: 'signal',
        frameSize: inputFrameSize,
        frameRate: inputFrameRate,
        sourceSampleRate: inputSampleRate
      });

      this.mel.initStream({
        frameType: 'vector',
        frameSize: nbrBins,
        frameRate: inputFrameRate,
        sourceSampleRate: inputSampleRate
      });

      this.dct.initStream({
        frameType: 'vector',
        frameSize: nbrBands,
        frameRate: inputFrameRate,
        sourceSampleRate: inputSampleRate
      });

      this.propagateStreamParams();
    }

    /**
     * Use the `Mfcc` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array} data - Signal chunk to analyse.
     * @return {Array} - Mfcc coefficients.
     *
     * @example
     * const mfcc = new lfo.operator.Mfcc();
     * // mandatory for use in standalone mode
     * mfcc.initStream({ frameSize: 256, frameType: 'vector' });
     * mfcc.inputSignal(signal);
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(data) {
      var output = this.frame.data;
      var nbrCoefs = this.params.get('nbrCoefs');

      var bins = this.fft.inputSignal(data);
      var melBands = this.mel.inputVector(bins);
      // console.log(melBands);
      var coefs = this.dct.inputSignal(melBands);

      for (var i = 0; i < nbrCoefs; i++) {
        output[i] = coefs[i];
      }return output;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return Mfcc;
}(_BaseLfo3.default);

exports.default = Mfcc;

},{"../../core/BaseLfo":166,"./Dct":143,"./Fft":144,"./Mel":147,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],149:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find minimun and maximum values of a given `signal`.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @example
 * import * as lfo from 'waves-lfo/common';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameSize: 512,
 *   frameType: 'signal',
 *   sampleRate: 0,
 * });
 *
 * const minMax = new lfo.operator.MinMax();
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * eventIn.connect(minMax);
 * minMax.connect(logger);
 * eventIn.start()
 *
 * // create a frame
 * const signal = new Float32Array(512);
 * for (let i = 0; i < 512; i++)
 *   signal[i] = i + 1;
 *
 * eventIn.process(null, signal);
 * > [1, 512];
 */
var MinMax = function (_BaseLfo) {
  (0, _inherits3.default)(MinMax, _BaseLfo);

  function MinMax() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MinMax);

    // throw errors if options are given
    return (0, _possibleConstructorReturn3.default)(this, (MinMax.__proto__ || (0, _getPrototypeOf2.default)(MinMax)).call(this, {}, options));
  }

  /** @private */


  (0, _createClass3.default)(MinMax, [{
    key: 'processStreamParams',
    value: function processStreamParams() {
      var prevStreamParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.prepareStreamParams(prevStreamParams);

      this.streamParams.frameType = 'vector';
      this.streamParams.frameSize = 2;
      this.streamParams.description = ['min', 'max'];

      this.propagateStreamParams();
    }

    /**
     * Use the `MinMax` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Float32Array|Array} data - Input signal.
     * @return {Array} - Min and max values.
     *
     * @example
     * const minMax = new MinMax();
     * minMax.initStream({ frameType: 'signal', frameSize: 10 });
     *
     * minMax.inputSignal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
     * > [0, 5]
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(data) {
      var outData = this.frame.data;
      var min = +Infinity;
      var max = -Infinity;

      for (var i = 0, l = data.length; i < l; i++) {
        var value = data[i];
        if (value < min) min = value;
        if (value > max) max = value;
      }

      outData[0] = min;
      outData[1] = max;

      return outData;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return MinMax;
}(_BaseLfo3.default);

exports.default = MinMax;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],150:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  order: {
    type: 'integer',
    min: 1,
    max: 1e9,
    default: 10,
    metas: { kind: 'dynamic' }
  },
  fill: {
    type: 'float',
    min: -Infinity,
    max: +Infinity,
    default: 0,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Compute a moving average operation on the incomming frames (`scalar` or
 * `vector` type). If the input is of type vector, the moving average is
 * computed for each dimension in parallel. If the source sample rate is defined
 * frame time is shifted to the middle of the window defined by the order.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.order=10] - Number of successive values on which
 *  the average is computed.
 * @param {Number} [options.fill=0] - Value to fill the ring buffer with before
 *  the first input frame.
 *
 * @todo - Implement `processSignal` ?
 *
 * @example
 * import * as lfo from 'waves-lfo/common';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameSize: 2,
 *   frameType: 'vector'
 * });
 *
 * const movingAverage = new lfo.operator.MovingAverage({
 *   order: 5,
 *   fill: 0
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * eventIn.connect(movingAverage);
 * movingAverage.connect(logger);
 *
 * eventIn.start();
 *
 * eventIn.process(null, [1, 1]);
 * > [0.2, 0.2]
 * eventIn.process(null, [1, 1]);
 * > [0.4, 0.4]
 * eventIn.process(null, [1, 1]);
 * > [0.6, 0.6]
 * eventIn.process(null, [1, 1]);
 * > [0.8, 0.8]
 * eventIn.process(null, [1, 1]);
 * > [1, 1]
 */

var MovingAverage = function (_BaseLfo) {
  (0, _inherits3.default)(MovingAverage, _BaseLfo);

  function MovingAverage() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MovingAverage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MovingAverage.__proto__ || (0, _getPrototypeOf2.default)(MovingAverage)).call(this, definitions, options));

    _this.sum = null;
    _this.ringBuffer = null;
    _this.ringIndex = 0;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(MovingAverage, [{
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      (0, _get3.default)(MovingAverage.prototype.__proto__ || (0, _getPrototypeOf2.default)(MovingAverage.prototype), 'onParamUpdate', this).call(this, name, value, metas);

      // @todo - should be done lazily in process
      switch (name) {
        case 'order':
          this.processStreamParams();
          this.resetStream();
          break;
        case 'fill':
          this.resetStream();
          break;
      }
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var frameSize = this.streamParams.frameSize;
      var order = this.params.get('order');

      this.ringBuffer = new Float32Array(order * frameSize);

      if (frameSize > 1) this.sum = new Float32Array(frameSize);else this.sum = 0;

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(MovingAverage.prototype.__proto__ || (0, _getPrototypeOf2.default)(MovingAverage.prototype), 'resetStream', this).call(this);

      var order = this.params.get('order');
      var fill = this.params.get('fill');
      var ringBuffer = this.ringBuffer;
      var ringLength = ringBuffer.length;

      for (var i = 0; i < ringLength; i++) {
        ringBuffer[i] = fill;
      }var fillSum = order * fill;
      var frameSize = this.streamParams.frameSize;

      if (frameSize > 1) {
        for (var _i = 0; _i < frameSize; _i++) {
          this.sum[_i] = fillSum;
        }
      } else {
        this.sum = fillSum;
      }

      this.ringIndex = 0;
    }

    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar(value) {
      this.frame.data[0] = this.inputScalar(frame.data[0]);
    }

    /**
     * Use the `MovingAverage` operator in `standalone` mode (i.e. outside of a
     * graph) with a `scalar` input.
     *
     * @param {Number} value - Value to feed the moving average with.
     * @return {Number} - Average value.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const movingAverage = new lfo.operator.MovingAverage({ order: 5 });
     * movingAverage.initStream({ frameSize: 1, frameType: 'scalar' });
     *
     * movingAverage.inputScalar(1);
     * > 0.2
     * movingAverage.inputScalar(1);
     * > 0.4
     * movingAverage.inputScalar(1);
     * > 0.6
     */

  }, {
    key: 'inputScalar',
    value: function inputScalar(value) {
      var order = this.params.get('order');
      var ringIndex = this.ringIndex;
      var ringBuffer = this.ringBuffer;
      var sum = this.sum;

      sum -= ringBuffer[ringIndex];
      sum += value;

      this.sum = sum;
      this.ringBuffer[ringIndex] = value;
      this.ringIndex = (ringIndex + 1) % order;

      return sum / order;
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      this.inputVector(frame.data);
    }

    /**
     * Use the `MovingAverage` operator in `standalone` mode (i.e. outside of a
     * graph) with a `vector` input.
     *
     * @param {Array} values - Values to feed the moving average with.
     * @return {Float32Array} - Average value for each dimension.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const movingAverage = new lfo.operator.MovingAverage({ order: 5 });
     * movingAverage.initStream({ frameSize: 2, frameType: 'scalar' });
     *
     * movingAverage.inputArray([1, 1]);
     * > [0.2, 0.2]
     * movingAverage.inputArray([1, 1]);
     * > [0.4, 0.4]
     * movingAverage.inputArray([1, 1]);
     * > [0.6, 0.6]
     */

  }, {
    key: 'inputVector',
    value: function inputVector(values) {
      var order = this.params.get('order');
      var outFrame = this.frame.data;
      var frameSize = this.streamParams.frameSize;
      var ringIndex = this.ringIndex;
      var ringOffset = ringIndex * frameSize;
      var ringBuffer = this.ringBuffer;
      var sum = this.sum;
      var scale = 1 / order;

      for (var i = 0; i < frameSize; i++) {
        var ringBufferIndex = ringOffset + i;
        var value = values[i];
        var localSum = sum[i];

        localSum -= ringBuffer[ringBufferIndex];
        localSum += value;

        this.sum[i] = localSum;
        outFrame[i] = localSum * scale;
        ringBuffer[ringBufferIndex] = value;
      }

      this.ringIndex = (ringIndex + 1) % order;

      return outFrame;
    }

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();
      this.processFunction(frame);

      var order = this.params.get('order');
      var time = frame.time;
      // shift time to take account of the added latency
      if (this.streamParams.sourceSampleRate) time -= 0.5 * (order - 1) / this.streamParams.sourceSampleRate;

      this.frame.time = time;
      this.frame.metadata = frame.metadata;

      this.propagateFrame();
    }
  }]);
  return MovingAverage;
}(_BaseLfo3.default);

exports.default = MovingAverage;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/get":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],151:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  order: {
    type: 'integer',
    min: 1,
    max: 1e9,
    default: 9,
    metas: { kind: 'dynamic' }
  },
  fill: {
    type: 'float',
    min: -Infinity,
    max: +Infinity,
    default: 0,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Compute a moving median operation on the incomming frames (`scalar` or
 * `vector` type). If the input is of type vector, the moving median is
 * computed for each dimension in parallel. If the source sample rate is defined
 * frame time is shifted to the middle of the window defined by the order.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.order=9] - Number of successive values in which
 *  the median is searched. This value must be odd. _dynamic parameter_
 * @param {Number} [options.fill=0] - Value to fill the ring buffer with before
 *  the first input frame. _dynamic parameter_
 *
 * @todo - Implement `processSignal`
 *
 * @example
 * import * as lfo from 'waves-lfo/common';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameSize: 2,
 *   frameType: 'vector',
 * });
 *
 * const movingMedian = new lfo.operator.MovingMedian({
 *   order: 5,
 *   fill: 0,
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * eventIn.connect(movingMedian);
 * movingMedian.connect(logger);
 *
 * eventIn.start();
 *
 * eventIn.processFrame(null, [1, 1]);
 * > [0, 0]
 * eventIn.processFrame(null, [2, 2]);
 * > [0, 0]
 * eventIn.processFrame(null, [3, 3]);
 * > [1, 1]
 * eventIn.processFrame(null, [4, 4]);
 * > [2, 2]
 * eventIn.processFrame(null, [5, 5]);
 * > [3, 3]
 */

var MovingMedian = function (_BaseLfo) {
  (0, _inherits3.default)(MovingMedian, _BaseLfo);

  function MovingMedian() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MovingMedian);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MovingMedian.__proto__ || (0, _getPrototypeOf2.default)(MovingMedian)).call(this, definitions, options));

    _this.ringBuffer = null;
    _this.sorter = null;
    _this.ringIndex = 0;

    _this._ensureOddOrder();
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(MovingMedian, [{
    key: '_ensureOddOrder',
    value: function _ensureOddOrder() {
      if (this.params.get('order') % 2 === 0) throw new Error('Invalid value ' + order + ' for param "order" - should be odd');
    }

    /** @private */

  }, {
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      (0, _get3.default)(MovingMedian.prototype.__proto__ || (0, _getPrototypeOf2.default)(MovingMedian.prototype), 'onParamUpdate', this).call(this, name, value, metas);

      switch (name) {
        case 'order':
          this._ensureOddOrder();
          this.processStreamParams();
          this.resetStream();
          break;
        case 'fill':
          this.resetStream();
          break;
      }
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);
      // outType is similar to input type

      var frameSize = this.streamParams.frameSize;
      var order = this.params.get('order');

      this.ringBuffer = new Float32Array(frameSize * order);
      this.sortBuffer = new Float32Array(frameSize * order);

      this.minIndices = new Uint32Array(frameSize);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(MovingMedian.prototype.__proto__ || (0, _getPrototypeOf2.default)(MovingMedian.prototype), 'resetStream', this).call(this);

      var fill = this.params.get('fill');
      var ringBuffer = this.ringBuffer;
      var ringLength = ringBuffer.length;

      for (var i = 0; i < ringLength; i++) {
        this.ringBuffer[i] = fill;
      }this.ringIndex = 0;
    }

    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar(frame) {
      this.frame.data[0] = this.inputScalar(frame.data[0]);
    }

    /**
     * Allows for the use of a `MovingMedian` outside a graph (e.g. inside
     * another node), in this case `processStreamParams` and `resetStream`
     * should be called manually on the node.
     *
     * @param {Number} value - Value to feed the moving median with.
     * @return {Number} - Median value.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const movingMedian = new MovingMedian({ order: 5 });
     * movingMedian.initStream({ frameSize: 1, frameType: 'scalar' });
     *
     * movingMedian.inputScalar(1);
     * > 0
     * movingMedian.inputScalar(2);
     * > 0
     * movingMedian.inputScalar(3);
     * > 1
     * movingMedian.inputScalar(4);
     * > 2
     */

  }, {
    key: 'inputScalar',
    value: function inputScalar(value) {
      var ringIndex = this.ringIndex;
      var ringBuffer = this.ringBuffer;
      var sortBuffer = this.sortBuffer;
      var order = this.params.get('order');
      var medianIndex = (order - 1) / 2;
      var startIndex = 0;

      ringBuffer[ringIndex] = value;

      for (var i = 0; i <= medianIndex; i++) {
        var min = +Infinity;
        var minIndex = null;

        for (var j = startIndex; j < order; j++) {
          if (i === 0) sortBuffer[j] = ringBuffer[j];

          if (sortBuffer[j] < min) {
            min = sortBuffer[j];
            minIndex = j;
          }
        }

        // swap minIndex and startIndex
        var cache = sortBuffer[startIndex];
        sortBuffer[startIndex] = sortBuffer[minIndex];
        sortBuffer[minIndex] = cache;

        startIndex += 1;
      }

      var median = sortBuffer[medianIndex];
      this.ringIndex = (ringIndex + 1) % order;

      return median;
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      this.inputVector(frame.data);
    }

    /**
     * Allows for the use of a `MovingMedian` outside a graph (e.g. inside
     * another node), in this case `processStreamParams` and `resetStream`
     * should be called manually on the node.
     *
     * @param {Array} values - Values to feed the moving median with.
     * @return {Float32Array} - Median values for each dimension.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const movingMedian = new MovingMedian({ order: 3, fill: 0 });
     * movingMedian.initStream({ frameSize: 3, frameType: 'vector' });
     *
     * movingMedian.inputArray([1, 1]);
     * > [0, 0]
     * movingMedian.inputArray([2, 2]);
     * > [1, 1]
     * movingMedian.inputArray([3, 3]);
     * > [2, 2]
     */

  }, {
    key: 'inputVector',
    value: function inputVector(values) {
      var order = this.params.get('order');
      var ringBuffer = this.ringBuffer;
      var ringIndex = this.ringIndex;
      var sortBuffer = this.sortBuffer;
      var outFrame = this.frame.data;
      var minIndices = this.minIndices;
      var frameSize = this.streamParams.frameSize;
      var medianIndex = Math.floor(order / 2);
      var startIndex = 0;

      for (var i = 0; i <= medianIndex; i++) {

        for (var j = 0; j < frameSize; j++) {
          outFrame[j] = +Infinity;
          minIndices[j] = 0;

          for (var k = startIndex; k < order; k++) {
            var index = k * frameSize + j;

            // update ring buffer corresponding to current
            if (k === ringIndex && i === 0) ringBuffer[index] = values[j];

            // copy value in sort buffer on first pass
            if (i === 0) sortBuffer[index] = ringBuffer[index];

            // find minium in the remaining array
            if (sortBuffer[index] < outFrame[j]) {
              outFrame[j] = sortBuffer[index];
              minIndices[j] = index;
            }
          }

          // swap minimum and curent index
          var swapIndex = startIndex * frameSize + j;
          var v = sortBuffer[swapIndex];
          sortBuffer[swapIndex] = sortBuffer[minIndices[j]];
          sortBuffer[minIndices[j]] = v;

          // store this minimum value as current result
          outFrame[j] = sortBuffer[swapIndex];
        }

        startIndex += 1;
      }

      this.ringIndex = (ringIndex + 1) % order;

      return this.frame.data;
    }

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.preprocessFrame();
      this.processFunction(frame);

      var order = this.params.get('order');
      var time = frame.time;
      // shift time to take account of the added latency
      if (this.streamParams.sourceSampleRate) time -= 0.5 * (order - 1) / this.streamParams.sourceSampleRate;

      this.frame.time = time;
      this.frame.metadata = frame.metadata;

      this.propagateFrame(time, this.outFrame, metadata);
    }
  }]);
  return MovingMedian;
}(_BaseLfo3.default);

exports.default = MovingMedian;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/get":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],152:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  state: {
    type: 'enum',
    default: 'on',
    list: ['on', 'off'],
    metas: { kind: 'dynamic' }
  }
};

/**
 * The OnOff operator allows to stop the propagation of the stream in a
 * subgraph. When "on", frames are propagated, when "off" the propagation is
 * stopped.
 *
 * The `streamParams` propagation is never bypassed so the subsequent subgraph
 * is always ready for incomming frames.
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {String} [options.state='on'] - Default state.
 *
 * @example
 * import * as lfo from 'waves-lfo/common';
 *
 * const frames = [
 *   { time: 0, data: [1, 2] },
 *   { time: 1, data: [3, 4] },
 *   { time: 2, data: [5, 6] },
 * ];
 *
 * const eventIn = new EventIn({
 *   frameSize: 2,
 *   frameRate: 0,
 *   frameType: 'vector',
 * });
 *
 * const onOff = new OnOff();
 *
 * const logger = new Logger({ data: true });
 *
 * eventIn.connect(onOff);
 * onOff.connect(logger);
 *
 * eventIn.start();
 *
 * eventIn.processFrame(frames[0]);
 * > [0, 1]
 *
 * // bypass subgraph
 * onOff.setState('off');
 * eventIn.processFrame(frames[1]);
 *
 * // re-open subgraph
 * onOff.setState('on');
 * eventIn.processFrame(frames[2]);
 * > [5, 6]
 */

var OnOff = function (_BaseLfo) {
  (0, _inherits3.default)(OnOff, _BaseLfo);

  function OnOff() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, OnOff);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OnOff.__proto__ || (0, _getPrototypeOf2.default)(OnOff)).call(this, definitions, options));

    _this.state = _this.params.get('state');
    return _this;
  }

  /**
   * Set the state of the `OnOff`.
   *
   * @param {String} state - New state of the operator (`on` or `off`)
   */


  (0, _createClass3.default)(OnOff, [{
    key: 'setState',
    value: function setState(state) {
      if (definitions.state.list.indexOf(state) === -1) throw new Error('Invalid switch state value "' + state + '" [valid values: "on"/"off"]');

      this.state = state;
    }

    // define all possible stream API
    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar() {}
    /** @private */

  }, {
    key: 'processVector',
    value: function processVector() {}
    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal() {}

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      if (this.state === 'on') {
        this.prepareFrame();

        this.frame.time = frame.time;
        this.frame.metadata = frame.metadata;
        this.frame.data = frame.data;

        this.propagateFrame();
      }
    }
  }]);
  return OnOff;
}(_BaseLfo3.default);

exports.default = OnOff;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],153:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqrt = Math.sqrt;

var definitions = {
  power: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Compute the Root Mean Square of a `signal`.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Boolean} [options.power=false] - If `true` remove the "R" of the
 *  "Rms" and return the squared result (i.e. power).
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * // assuming some `AudioBuffer`
 * const audioInBuffer = new lfo.source.AudioInBuffer({
 *   audioBuffer: audioBuffer,
 *   frameSize: 512,
 * });
 *
 * const rms = new lfo.operator.Rms();
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * audioInBuffer.connect(rms);
 * rms.connect(logger);
 *
 * audioInBuffer.start();
 */

var Rms = function (_BaseLfo) {
  (0, _inherits3.default)(Rms, _BaseLfo);

  function Rms() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Rms);
    return (0, _possibleConstructorReturn3.default)(this, (Rms.__proto__ || (0, _getPrototypeOf2.default)(Rms)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Rms, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.streamParams.frameSize = 1;
      this.streamParams.frameType = 'scalar';
      this.streamParams.description = ['rms'];

      this.propagateStreamParams();
    }

    /**
     * Allows for the use of a `Rms` outside a graph (e.g. inside
     * another node). Return the rms of the given signal block.
     *
     * @param {Number} signal - Signal block to be computed.
     * @return {Number} - rms of the input signal.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const rms = new lfo.operator.Rms();
     * rms.initStream({ frameType: 'signal', frameSize: 1000 });
     *
     * const results = rms.inputSignal([...values]);
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(signal) {
      var power = this.params.get('power');
      var length = signal.length;
      var rms = 0;

      for (var i = 0; i < length; i++) {
        rms += signal[i] * signal[i];
      }rms = rms / length;

      if (!power) rms = sqrt(rms);

      return rms;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.frame.data[0] = this.inputSignal(frame.data);
    }
  }]);
  return Rms;
}(_BaseLfo3.default);

exports.default = Rms;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],154:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

var _MovingAverage = require('./MovingAverage');

var _MovingAverage2 = _interopRequireDefault(_MovingAverage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var min = Math.min;
var max = Math.max;

var definitions = {
  logInput: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dyanmic' }
  },
  minInput: {
    type: 'float',
    default: 0.000000000001,
    metas: { kind: 'dyanmic' }
  },
  filterOrder: {
    type: 'integer',
    default: 5,
    metas: { kind: 'dyanmic' }
  },
  threshold: {
    type: 'float',
    default: 3,
    metas: { kind: 'dyanmic' }
  },
  offThreshold: {
    type: 'float',
    default: -Infinity,
    metas: { kind: 'dyanmic' }
  },
  minInter: {
    type: 'float',
    default: 0.050,
    metas: { kind: 'dyanmic' }
  },
  maxDuration: {
    type: 'float',
    default: Infinity,
    metas: { kind: 'dyanmic' }
  }

  /**
   * Create segments based on attacks.
   *
   * @memberof module:common.operator
   *
   * @param {Object} options - Override default parameters.
   * @param {Boolean} [options.logInput=false] - Apply log on the input.
   * @param {Number} [options.minInput=0.000000000001] - Minimum value to use as
   *  input.
   * @param {Number} [options.filterOrder=5] - Order of the internally used moving
   *  average.
   * @param {Number} [options.threshold=3] - Threshold that triggers a segment
   *  start.
   * @param {Number} [options.offThreshold=-Infinity] - Threshold that triggers
   *  a segment end.
   * @param {Number} [options.minInter=0.050] - Minimum delay between two semgents.
   * @param {Number} [options.maxDuration=Infinity] - Maximum duration of a segment.
   *
   * @example
   * import * as lfo from 'waves-lfo/client';
   *
   * // assuming a stream from the microphone
   * const source = audioContext.createMediaStreamSource(stream);
   *
   * const audioInNode = new lfo.source.AudioInNode({
   *   sourceNode: source,
   *   audioContext: audioContext,
   * });
   *
   * const slicer = new lfo.operator.Slicer({
   *   frameSize: frameSize,
   *   hopSize: hopSize,
   *   centeredTimeTags: true
   * });
   *
   * const power = new lfo.operator.RMS({
   *   power: true,
   * });
   *
   * const segmenter = new lfo.operator.Segmenter({
   *   logInput: true,
   *   filterOrder: 5,
   *   threshold: 3,
   *   offThreshold: -Infinity,
   *   minInter: 0.050,
   *   maxDuration: 0.050,
   * });
   *
   * const logger = new lfo.sink.Logger({ time: true });
   *
   * audioInNode.connect(slicer);
   * slicer.connect(power);
   * power.connect(segmenter);
   * segmenter.connect(logger);
   *
   * audioInNode.start();
   */
};
var Segmenter = function (_BaseLfo) {
  (0, _inherits3.default)(Segmenter, _BaseLfo);

  function Segmenter(options) {
    (0, _classCallCheck3.default)(this, Segmenter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Segmenter.__proto__ || (0, _getPrototypeOf2.default)(Segmenter)).call(this, definitions, options));

    _this.insideSegment = false;
    _this.onsetTime = -Infinity;

    // stats
    _this.min = Infinity;
    _this.max = -Infinity;
    _this.sum = 0;
    _this.sumOfSquares = 0;
    _this.count = 0;

    var minInput = _this.params.get('minInput');
    var fill = minInput;

    if (_this.params.get('logInput') && minInput > 0) fill = Math.log(minInput);

    _this.movingAverage = new _MovingAverage2.default({
      order: _this.params.get('filterOrder'),
      fill: fill
    });

    _this.lastMvavrg = fill;
    return _this;
  }

  (0, _createClass3.default)(Segmenter, [{
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      (0, _get3.default)(Segmenter.prototype.__proto__ || (0, _getPrototypeOf2.default)(Segmenter.prototype), 'onParamUpdate', this).call(this, name, value, metas);

      if (name === 'filterOrder') this.movingAverage.params.set('order', value);
    }
  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.streamParams.frameType = 'vector';
      this.streamParams.frameSize = 5;
      this.streamParams.frameRate = 0;
      this.streamParams.description = ['duration', 'min', 'max', 'mean', 'stddev'];

      this.movingAverage.initStream(prevStreamParams);

      this.propagateStreamParams();
    }
  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(Segmenter.prototype.__proto__ || (0, _getPrototypeOf2.default)(Segmenter.prototype), 'resetStream', this).call(this);
      this.movingAverage.resetStream();
      this.resetSegment();
    }
  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      if (this.insideSegment) this.outputSegment(endTime);

      (0, _get3.default)(Segmenter.prototype.__proto__ || (0, _getPrototypeOf2.default)(Segmenter.prototype), 'finalizeStream', this).call(this, endTime);
    }
  }, {
    key: 'resetSegment',
    value: function resetSegment() {
      this.insideSegment = false;
      this.onsetTime = -Infinity;
      // stats
      this.min = Infinity;
      this.max = -Infinity;
      this.sum = 0;
      this.sumOfSquares = 0;
      this.count = 0;
    }
  }, {
    key: 'outputSegment',
    value: function outputSegment(endTime) {
      var outData = this.frame.data;
      outData[0] = endTime - this.onsetTime;
      outData[1] = this.min;
      outData[2] = this.max;

      var norm = 1 / this.count;
      var mean = this.sum * norm;
      var meanOfSquare = this.sumOfSquares * norm;
      var squareOfmean = mean * mean;

      outData[3] = mean;
      outData[4] = 0;

      if (meanOfSquare > squareOfmean) outData[4] = Math.sqrt(meanOfSquare - squareOfmean);

      this.frame.time = this.onsetTime;

      this.propagateFrame();
    }
  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      var logInput = this.params.get('logInput');
      var minInput = this.params.get('minInput');
      var threshold = this.params.get('threshold');
      var minInter = this.params.get('minInter');
      var maxDuration = this.params.get('maxDuration');
      var offThreshold = this.params.get('offThreshold');
      var rawValue = frame.data[0];
      var time = frame.time;
      var value = Math.max(rawValue, minInput);

      if (logInput) value = Math.log(value);

      var diff = value - this.lastMvavrg;
      this.lastMvavrg = this.movingAverage.inputScalar(value);

      // update frame metadata
      this.frame.metadata = frame.metadata;

      if (diff > threshold && time - this.onsetTime > minInter) {
        if (this.insideSegment) this.outputSegment(time);

        // start segment
        this.insideSegment = true;
        this.onsetTime = time;
        this.max = -Infinity;
      }

      if (this.insideSegment) {
        this.min = min(this.min, rawValue);
        this.max = max(this.max, rawValue);
        this.sum += rawValue;
        this.sumOfSquares += rawValue * rawValue;
        this.count++;

        if (time - this.onsetTime >= maxDuration || value <= offThreshold) {
          this.outputSegment(time);
          this.insideSegment = false;
        }
      }
    }
  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();
      this.processFunction(frame);
      // do not propagate here as the frameRate is now zero
    }
  }]);
  return Segmenter;
}(_BaseLfo3.default);

exports.default = Segmenter;

},{"../../core/BaseLfo":166,"./MovingAverage":150,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/get":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],155:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  index: {
    type: 'integer',
    default: 0,
    metas: { kind: 'static' }
  },
  indices: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'static' }
  }
};

/**
 * Select one or several indices from a `vector` input. If only one index is
 * selected, the output will be of type `scalar`, otherwise the output will
 * be a vector containing the selected indices.
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default values.
 * @param {Number} options.index - Index to select from the input frame.
 * @param {Array<Number>} options.indices - Indices to select from the input
 *  frame, if defined, take precedance over `option.index`.
 *
 * @example
 * import * as lfo from 'waves-lfo/common';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameType: 'vector',
 *   frameSize: 3,
 * });
 *
 * const select = new lfo.operator.Select({
 *   index: 1,
 * });
 *
 * eventIn.start();
 * eventIn.process(0, [0, 1, 2]);
 * > 1
 * eventIn.process(0, [3, 4, 5]);
 * > 4
 */

var Select = function (_BaseLfo) {
  (0, _inherits3.default)(Select, _BaseLfo);

  function Select() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Select);
    return (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Select, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      var _this2 = this;

      this.prepareStreamParams(prevStreamParams);

      var index = this.params.get('index');
      var indices = this.params.get('indices');

      var max = indices !== null ? Math.max.apply(null, indices) : index;

      if (max >= prevStreamParams.frameSize) throw new Error('Invalid select index "' + max + '"');

      this.streamParams.frameType = indices !== null ? 'vector' : 'scalar';
      this.streamParams.frameSize = indices !== null ? indices.length : 1;

      this.select = indices !== null ? indices : [index];

      // steal description() from parent
      if (prevStreamParams.description) {
        this.select.forEach(function (val, index) {
          _this2.streamParams.description[index] = prevStreamParams.description[val];
        });
      }

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      var data = frame.data;
      var outData = this.frame.data;
      var select = this.select;

      for (var i = 0; i < select.length; i++) {
        outData[i] = data[select[i]];
      }
    }
  }]);
  return Select;
}(_BaseLfo3.default);

exports.default = Select;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],156:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  frameSize: {
    type: 'integer',
    default: 512,
    metas: { kind: 'static' }
  },
  hopSize: { // should be nullable
    type: 'integer',
    default: null,
    nullable: true,
    metas: { kind: 'static' }
  },
  centeredTimeTags: {
    type: 'boolean',
    default: false
  }

  /**
   * Change the `frameSize` and `hopSize` of a `signal` input according to
   * the given options.
   * This operator updates the stream parameters according to its configuration.
   *
   * @memberof module:common.operator
   *
   * @param {Object} options - Override default parameters.
   * @param {Number} [options.frameSize=512] - Frame size of the output signal.
   * @param {Number} [options.hopSize=null] - Number of samples between two
   *  consecutive frames. If null, `hopSize` is set to `frameSize`.
   * @param {Boolean} [options.centeredTimeTags] - Move the time tag to the middle
   *  of the frame.
   *
   * @example
   * import * as lfo from 'waves-lfo/common';
   *
   * const eventIn = new lfo.source.EventIn({
   *   frameType: 'signal',
   *   frameSize: 10,
   *   sampleRate: 2,
   * });
   *
   * const slicer = new lfo.operator.Slicer({
   *   frameSize: 4,
   *   hopSize: 2
   * });
   *
   * const logger = new lfo.sink.Logger({ time: true, data: true });
   *
   * eventIn.connect(slicer);
   * slicer.connect(logger);
   * eventIn.start();
   *
   * eventIn.process(0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
   * > { time: 0, data: [0, 1, 2, 3] }
   * > { time: 1, data: [2, 3, 4, 5] }
   * > { time: 2, data: [4, 5, 6, 7] }
   * > { time: 3, data: [6, 7, 8, 9] }
   */
};
var Slicer = function (_BaseLfo) {
  (0, _inherits3.default)(Slicer, _BaseLfo);

  function Slicer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Slicer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Slicer.__proto__ || (0, _getPrototypeOf2.default)(Slicer)).call(this, definitions, options));

    var hopSize = _this.params.get('hopSize');
    var frameSize = _this.params.get('frameSize');

    if (!hopSize) _this.params.set('hopSize', frameSize);

    _this.params.addListener(_this.onParamUpdate.bind(_this));

    _this.frameIndex = 0;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(Slicer, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var hopSize = this.params.get('hopSize');
      var frameSize = this.params.get('frameSize');

      this.streamParams.frameSize = frameSize;
      this.streamParams.frameRate = prevStreamParams.sourceSampleRate / hopSize;

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(Slicer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Slicer.prototype), 'resetStream', this).call(this);
      this.frameIndex = 0;
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      if (this.frameIndex > 0) {
        var frameRate = this.streamParams.frameRate;
        var frameSize = this.streamParams.frameSize;
        var data = this.frame.data;
        // set the time of the last frame
        this.frame.time += 1 / frameRate;

        for (var i = this.frameIndex; i < frameSize; i++) {
          data[i] = 0;
        }this.propagateFrame();
      }

      (0, _get3.default)(Slicer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Slicer.prototype), 'finalizeStream', this).call(this, endTime);
    }

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();
      this.processFunction(frame);
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      var time = frame.time;
      var block = frame.data;
      var metadata = frame.metadata;

      var centeredTimeTags = this.params.get('centeredTimeTags');
      var hopSize = this.params.get('hopSize');
      var outFrame = this.frame.data;
      var frameSize = this.streamParams.frameSize;
      var sampleRate = this.streamParams.sourceSampleRate;
      var samplePeriod = 1 / sampleRate;
      var blockSize = block.length;

      var frameIndex = this.frameIndex;
      var blockIndex = 0;

      while (blockIndex < blockSize) {
        var numSkip = 0;

        // skip block samples for negative frameIndex (frameSize < hopSize)
        if (frameIndex < 0) {
          numSkip = -frameIndex;
          frameIndex = 0; // reset `frameIndex`
        }

        if (numSkip < blockSize) {
          blockIndex += numSkip; // skip block segment
          // can copy all the rest of the incoming block
          var numCopy = blockSize - blockIndex;
          // connot copy more than what fits into the frame
          var maxCopy = frameSize - frameIndex;

          if (numCopy >= maxCopy) numCopy = maxCopy;

          // copy block segment into frame
          var copy = block.subarray(blockIndex, blockIndex + numCopy);
          outFrame.set(copy, frameIndex);
          // advance block and frame index
          blockIndex += numCopy;
          frameIndex += numCopy;

          // send frame when completed
          if (frameIndex === frameSize) {
            // define time tag for the outFrame according to configuration
            if (centeredTimeTags) this.frame.time = time + (blockIndex - frameSize / 2) * samplePeriod;else this.frame.time = time + (blockIndex - frameSize) * samplePeriod;

            this.frame.metadata = metadata;
            // forward to next nodes
            this.propagateFrame();

            // shift frame left
            if (hopSize < frameSize) outFrame.set(outFrame.subarray(hopSize, frameSize), 0);

            frameIndex -= hopSize; // hop forward
          }
        } else {
          // skip entire block
          var blockRest = blockSize - blockIndex;
          frameIndex += blockRest;
          blockIndex += blockRest;
        }
      }

      this.frameIndex = frameIndex;
    }
  }]);
  return Slicer;
}(_BaseLfo3.default);

exports.default = Slicer;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/get":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],157:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ceil = Math.ceil;

/**
 * paper: http://recherche.ircam.fr/equipes/pcm/cheveign/pss/2002_JASA_YIN.pdf
 * implementation based on https://github.com/ashokfernandez/Yin-Pitch-Tracking
 * @private
 */

var definitions = {
  threshold: {
    type: 'float',
    default: 0.1, // default from paper
    metas: { kind: 'static' }
  },
  downSamplingExp: { // downsampling factor
    type: 'integer',
    default: 2,
    min: 0,
    max: 3,
    metas: { kind: 'static' }
  },
  minFreq: { //
    type: 'float',
    default: 60, // mean 735 samples
    min: 0,
    metas: { kind: 'static' }
  }

  /**
   * Yin fundamental frequency estimator, based on algorithm described in
   * [YIN, a fundamental frequency estimator for speech and music](http://recherche.ircam.fr/equipes/pcm/cheveign/pss/2002_JASA_YIN.pdf)
   * by Cheveigne and Kawahara.
   * On each frame, this operator propagate a vector containing the following
   * values: `frequency`, `probability`.
   *
   * For good results the input frame size should be large (1024 or 2048).
   *
   * _support `standalone` usage_
   *
   * @note - In node for a frame of 2048 samples, average computation time is:
   *         0.00016742283339993389 second.
   *
   * @memberof module:common.operator
   *
   * @param {Object} options - Override default parameters.
   * @param {Number} [options.threshold=0.1] - Absolute threshold to test the
   *  normalized difference (see paper for more informations).
   * @param {Number} [options.downSamplingExp=2] - Down sample the input frame by
   *  a factor of 2 at the power of `downSamplingExp` (min=0 and max=3) for
   *  performance improvements.
   * @param {Number} [options.minFreq=60] - Minimum frequency the operator can
   *  search for. This parameter defines the size of the autocorrelation performed
   *  on the signal, the input frame size should be around 2 time this size for
   *  good results (i.e. `inputFrameSize ≈ 2 * (samplingRate / minFreq)`).
   *
   * @example
   * import * as lfo from 'waves-lfo/client';
   *
   * // assuming some AudioBuffer
   * const source = new lfo.source.AudioInBuffer({
   *   audioBuffer: audioBuffer,
   * });
   *
   * const slicer = new lfo.operator.Slicer({
   *   frameSize: 2048,
   * });
   *
   * const yin = new lfo.operator.Yin();
   * const logger = new lfo.sink.Logger({ data: true });
   *
   * source.connect(slicer);
   * slicer.connect(yin);
   * yin.connect(logger);
   *
   * source.start();
   */
};
var Yin = function (_BaseLfo) {
  (0, _inherits3.default)(Yin, _BaseLfo);

  function Yin(options) {
    (0, _classCallCheck3.default)(this, Yin);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Yin.__proto__ || (0, _getPrototypeOf2.default)(Yin)).call(this, definitions, options));

    _this.probability = 0;
    _this.pitch = -1;

    _this.test = 0;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(Yin, [{
    key: '_downsample',
    value: function _downsample(input, size, output, downSamplingExp) {
      var outputSize = size >> downSamplingExp;
      var i = void 0,
          j = void 0;

      switch (downSamplingExp) {
        case 0:
          // no down sampling
          for (i = 0; i < size; i++) {
            output[i] = input[i];
          }break;
        case 1:
          for (i = 0, j = 0; i < outputSize; i++, j += 2) {
            output[i] = 0.5 * (input[j] + input[j + 1]);
          }break;
        case 2:
          for (i = 0, j = 0; i < outputSize; i++, j += 4) {
            output[i] = 0.25 * (input[j] + input[j + 1] + input[j + 2] + input[j + 3]);
          }break;
        case 3:
          for (i = 0, j = 0; i < outputSize; i++, j += 8) {
            output[i] = 0.125 * (input[j] + input[j + 1] + input[j + 2] + input[j + 3] + input[j + 4] + input[j + 5] + input[j + 6] + input[j + 7]);
          }break;
      }

      return outputSize;
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.streamParams.frameType = 'vector';
      this.streamParams.frameSize = 2;
      this.streamParams.description = ['frequency', 'confidence'];

      this.inputFrameSize = prevStreamParams.frameSize;
      // handle params
      var sourceSampleRate = this.streamParams.sourceSampleRate;
      var downSamplingExp = this.params.get('downSamplingExp');
      var downFactor = 1 << downSamplingExp; // 2^n
      var downSR = sourceSampleRate / downFactor;
      var downFrameSize = this.inputFrameSize / downFactor; // n_tick_down // 1 / 2^n

      var minFreq = this.params.get('minFreq');
      // limit min freq, cf. paper IV. sensitivity to parameters
      var minFreqNbrSamples = downSR / minFreq;
      // const bufferSize = prevStreamParams.frameSize;
      this.halfBufferSize = downFrameSize / 2;

      // minimum error to not crash but not enought to have results
      if (minFreqNbrSamples > this.halfBufferSize) throw new Error('Invalid input frame size, too small for given "minFreq"');

      this.downSamplingExp = downSamplingExp;
      this.downSamplingRate = downSR;
      this.downFrameSize = downFrameSize;
      this.buffer = new Float32Array(downFrameSize);
      // autocorrelation buffer
      this.yinBuffer = new Float32Array(this.halfBufferSize);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: '_downsample',
    value: function _downsample(input, size, output, downSamplingExp) {
      var outputSize = size >> downSamplingExp;
      var i = void 0,
          j = void 0;

      switch (downSamplingExp) {
        case 0:
          // no down sampling
          for (i = 0; i < size; i++) {
            output[i] = input[i];
          }break;
        case 1:
          for (i = 0, j = 0; i < outputSize; i++, j += 2) {
            output[i] = 0.5 * (input[j] + input[j + 1]);
          }break;
        case 2:
          for (i = 0, j = 0; i < outputSize; i++, j += 4) {
            output[i] = 0.25 * (input[j] + input[j + 1] + input[j + 2] + input[j + 3]);
          }break;
        case 3:
          for (i = 0, j = 0; i < outputSize; i++, j += 8) {
            output[i] = 0.125 * (input[j] + input[j + 1] + input[j + 2] + input[j + 3] + input[j + 4] + input[j + 5] + input[j + 6] + input[j + 7]);
          }break;
      }

      return outputSize;
    }

    /**
     * Step 1, 2 and 3 - Squared difference of the shifted signal with itself.
     * cumulative mean normalized difference.
     *
     * @private
     */

  }, {
    key: '_normalizedDifference',
    value: function _normalizedDifference(buffer) {
      var halfBufferSize = this.halfBufferSize;
      var yinBuffer = this.yinBuffer;
      var sum = 0;

      // difference for different shift values (tau)
      for (var tau = 0; tau < halfBufferSize; tau++) {
        var squaredDifference = 0; // reset buffer

        // take difference of the signal with a shifted version of itself then
        // sqaure the result
        for (var i = 0; i < halfBufferSize; i++) {
          var delta = buffer[i] - buffer[i + tau];
          squaredDifference += delta * delta;
        }

        // step 3 - normalize yinBuffer
        if (tau > 0) {
          sum += squaredDifference;
          yinBuffer[tau] = squaredDifference * (tau / sum);
        }
      }

      yinBuffer[0] = 1;
    }

    /**
     * Step 4 - find first best tau that is under the thresold.
     *
     * @private
     */

  }, {
    key: '_absoluteThreshold',
    value: function _absoluteThreshold() {
      var threshold = this.params.get('threshold');
      var yinBuffer = this.yinBuffer;
      var halfBufferSize = this.halfBufferSize;
      var tau = void 0;

      for (tau = 1; tau < halfBufferSize; tau++) {
        if (yinBuffer[tau] < threshold) {
          // keep increasing tau if next value is better
          while (tau + 1 < halfBufferSize && yinBuffer[tau + 1] < yinBuffer[tau]) {
            tau += 1;
          } // best tau found , yinBuffer[tau] can be seen as an estimation of
          // aperiodicity then: periodicity = 1 - aperiodicity
          this.probability = 1 - yinBuffer[tau];
          break;
        }
      }

      // return -1 if not match found
      return tau === halfBufferSize ? -1 : tau;
    }

    /**
     * Step 5 - Find a better fractionnal approximate of tau.
     * this can probably be simplified...
     *
     * @private
     */

  }, {
    key: '_parabolicInterpolation',
    value: function _parabolicInterpolation(tauEstimate) {
      var halfBufferSize = this.halfBufferSize;
      var yinBuffer = this.yinBuffer;
      var betterTau = void 0;
      // @note - tauEstimate cannot be zero as the loop start at 1 in step 4
      var x0 = tauEstimate - 1;
      var x2 = tauEstimate < halfBufferSize - 1 ? tauEstimate + 1 : tauEstimate;

      // if `tauEstimate` is last index, we can't interpolate
      if (x2 === tauEstimate) {
        betterTau = tauEstimate;
      } else {
        var s0 = yinBuffer[x0];
        var s1 = yinBuffer[tauEstimate];
        var s2 = yinBuffer[x2];

        // @note - don't fully understand this formula neither...
        betterTau = tauEstimate + (s2 - s0) / (2 * (2 * s1 - s2 - s0));
      }

      return betterTau;
    }

    /**
     * Use the `Yin` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array|Float32Array} input - The signal fragment to process.
     * @return {Array} - Array containing the `frequency`, `energy`, `periodicity`
     *  and `AC1`
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const yin = new lfo.operator.Yin();
     * yin.initStream({
     *   frameSize: 2048,
     *   frameType: 'signal',
     *   sourceSampleRate: 44100
     * });
     *
     * const results = yin.inputSignal(signal);
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(input) {
      this.pitch = -1;
      this.probability = 0;

      var buffer = this.buffer;
      var inputFrameSize = this.inputFrameSize;
      var downSamplingExp = this.downSamplingExp;
      var sampleRate = this.downSamplingRate;
      var outData = this.frame.data;
      var tauEstimate = -1;

      // subsampling
      this._downsample(input, inputFrameSize, buffer, downSamplingExp);
      // step 1, 2, 3 - normalized squared difference of the signal with a
      // shifted version of itself
      this._normalizedDifference(buffer);
      // step 4 - find first best tau estimate that is over the threshold
      tauEstimate = this._absoluteThreshold();

      if (tauEstimate !== -1) {
        // step 5 - so far tau is an integer shift of the signal, check if
        // there is a better fractionnal value around
        tauEstimate = this._parabolicInterpolation(tauEstimate);
        this.pitch = sampleRate / tauEstimate;
      }

      outData[0] = this.pitch;
      outData[1] = this.probability;

      return outData;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return Yin;
}(_BaseLfo3.default);

exports.default = Yin;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],158:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Biquad = require('./Biquad');

var _Biquad2 = _interopRequireDefault(_Biquad);

var _Dct = require('./Dct');

var _Dct2 = _interopRequireDefault(_Dct);

var _Fft = require('./Fft');

var _Fft2 = _interopRequireDefault(_Fft);

var _Magnitude = require('./Magnitude');

var _Magnitude2 = _interopRequireDefault(_Magnitude);

var _MeanStddev = require('./MeanStddev');

var _MeanStddev2 = _interopRequireDefault(_MeanStddev);

var _Mel = require('./Mel');

var _Mel2 = _interopRequireDefault(_Mel);

var _Mfcc = require('./Mfcc');

var _Mfcc2 = _interopRequireDefault(_Mfcc);

var _MinMax = require('./MinMax');

var _MinMax2 = _interopRequireDefault(_MinMax);

var _MovingAverage = require('./MovingAverage');

var _MovingAverage2 = _interopRequireDefault(_MovingAverage);

var _MovingMedian = require('./MovingMedian');

var _MovingMedian2 = _interopRequireDefault(_MovingMedian);

var _OnOff = require('./OnOff');

var _OnOff2 = _interopRequireDefault(_OnOff);

var _Rms = require('./Rms');

var _Rms2 = _interopRequireDefault(_Rms);

var _Segmenter = require('./Segmenter');

var _Segmenter2 = _interopRequireDefault(_Segmenter);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Slicer = require('./Slicer');

var _Slicer2 = _interopRequireDefault(_Slicer);

var _Yin = require('./Yin');

var _Yin2 = _interopRequireDefault(_Yin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Biquad: _Biquad2.default,
  Dct: _Dct2.default,
  Fft: _Fft2.default,
  Magnitude: _Magnitude2.default,
  MeanStddev: _MeanStddev2.default,
  Mel: _Mel2.default,
  Mfcc: _Mfcc2.default,
  MinMax: _MinMax2.default,
  MovingAverage: _MovingAverage2.default,
  MovingMedian: _MovingMedian2.default,
  OnOff: _OnOff2.default,
  Rms: _Rms2.default,
  Segmenter: _Segmenter2.default,
  Select: _Select2.default,
  Slicer: _Slicer2.default,
  Yin: _Yin2.default
};

},{"./Biquad":142,"./Dct":143,"./Fft":144,"./Magnitude":145,"./MeanStddev":146,"./Mel":147,"./Mfcc":148,"./MinMax":149,"./MovingAverage":150,"./MovingMedian":151,"./OnOff":152,"./Rms":153,"./Segmenter":154,"./Select":155,"./Slicer":156,"./Yin":157}],159:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  processStreamParams: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  },
  processFrame: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  },
  finalizeStream: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Create a bridge between the graph and application logic. Handle `push`
 * and `pull` paradigms.
 *
 * This sink can handle any type of input (`signal`, `vector`, `scalar`)
 *
 * @memberof module:common.sink
 *
 * @param {Object} options - Override default parameters.
 * @param {Function} [options.processFrame=null] - Callback executed on each
 *  `processFrame` call.
 * @param {Function} [options.finalizeStream=null] - Callback executed on each
 *  `finalizeStream` call.
 *
 * @see {@link module:common.core.BaseLfo#processFrame}
 * @see {@link module:common.core.BaseLfo#processStreamParams}
 *
 * @example
 * import * as lfo from 'waves-lfo/common';
 *
 * const frames = [
 *  { time: 0, data: [0, 1] },
 *  { time: 1, data: [1, 2] },
 * ];
 *
 * const eventIn = new EventIn({
 *   frameType: 'vector',
 *   frameSize: 2,
 *   frameRate: 1,
 * });
 *
 * const bridge = new Bridge({
 *   processFrame: (frame) => console.log(frame),
 * });
 *
 * eventIn.connect(bridge);
 * eventIn.start();
 *
 * // callback executed on each frame
 * eventIn.processFrame(frame[0]);
 * > { time: 0, data: [0, 1] }
 * eventIn.processFrame(frame[1]);
 * > { time: 1, data: [1, 2] }
 *
 * // pull current frame when needed
 * console.log(bridge.frame);
 * > { time: 1, data: [1, 2] }
 */

var Bridge = function (_BaseLfo) {
  (0, _inherits3.default)(Bridge, _BaseLfo);

  function Bridge() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Bridge);
    return (0, _possibleConstructorReturn3.default)(this, (Bridge.__proto__ || (0, _getPrototypeOf2.default)(Bridge)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Bridge, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var processStreamParamsCallback = this.params.get('processStreamParams');

      if (processStreamParamsCallback !== null) processStreamParamsCallback(this.streamParams);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      var finalizeStreamCallback = this.params.get('finalizeStream');

      if (finalizeStreamCallback !== null) finalizeStreamCallback(endTime);
    }

    // process any type
    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar() {}
    /** @private */

  }, {
    key: 'processVector',
    value: function processVector() {}
    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal() {}

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();

      var processFrameCallback = this.params.get('processFrame');
      var output = this.frame;
      output.data = new Float32Array(this.streamParams.frameSize);
      // pull interface (we copy data since we don't know what could
      // be done outside the graph)
      for (var i = 0; i < this.streamParams.frameSize; i++) {
        output.data[i] = frame.data[i];
      }output.time = frame.time;
      output.metadata = frame.metadata;

      // `push` interface
      if (processFrameCallback !== null) processFrameCallback(output);
    }
  }]);
  return Bridge;
}(_BaseLfo3.default);

exports.default = Bridge;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],160:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  separateArrays: {
    type: 'boolean',
    default: false,
    constant: true
  },
  callback: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Record input frames from a graph. This sink can handle `signal`, `vector`
 * or `scalar` inputs.
 *
 * When the recording is stopped (either by calling `stop` on the node or when
 * the stream is finalized), the callback given as parameter is executed with
 * the recorder data as argument.
 *
 *
 * @param {Object} options - Override default parameters.
 * @param {Boolean} [options.separateArrays=false] - Format of the retrieved
 *  values:
 *  - when `false`, format is [{ time, data }, { time, data }, ...]
 *  - when `true`, format is { time: [...], data: [...] }
 * @param {Function} [options.callback] - Callback to execute when a new record
 *  is ended. This can happen when: `stop` is called on the recorder, or `stop`
 *  is called on the source.
 *
 * @todo - Add auto record param.
 *
 * @memberof module:common.sink
 *
 * @example
 * import * as lfo from 'waves-lfo/common';
 *
 * const eventIn = new lfo.source.EventIn({
 *  frameType: 'vector',
 *  frameSize: 2,
 *  frameRate: 0,
 * });
 *
 * const recorder = new lfo.sink.DataRecorder({
 *   callback: (data) => console.log(data),
 * });
 *
 * eventIn.connect(recorder);
 * eventIn.start();
 * recorder.start();
 *
 * eventIn.process(0, [0, 1]);
 * eventIn.process(1, [1, 2]);
 *
 * recorder.stop();
 * > [{ time: 0, data: [0, 1] }, { time: 1, data: [1, 2] }];
 */

var DataRecorder = function (_BaseLfo) {
  (0, _inherits3.default)(DataRecorder, _BaseLfo);

  function DataRecorder() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, DataRecorder);

    /**
     * Define if the node is currently recording.
     *
     * @type {Boolean}
     * @name isRecording
     * @instance
     * @memberof module:sink.SignalRecorder
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (DataRecorder.__proto__ || (0, _getPrototypeOf2.default)(DataRecorder)).call(this, definitions, options));

    _this.isRecording = false;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(DataRecorder, [{
    key: '_initStore',
    value: function _initStore() {
      var separateArrays = this.params.get('separateArrays');

      if (separateArrays) this._store = { time: [], data: [] };else this._store = [];
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);
      this._initStore();
      this.propagateStreamParams();
    }

    /**
     * Start recording.
     *
     * @see {@link module:client.sink.DataRecorder#stop}
     */

  }, {
    key: 'start',
    value: function start() {
      this.isRecording = true;
    }

    /**
     * Stop recording and execute the callback defined in parameters.
     *
     * @see {@link module:client.sink.DataRecorder#start}
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (this.isRecording) {
        this.isRecording = false;
        var callback = this.params.get('callback');

        if (callback !== null) callback(this._store);

        this._initStore();
      }
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream() {
      this.stop();
    }

    // handle any input types
    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar(frame) {}
    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {}
    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {}
  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      if (this.isRecording) {
        this.prepareFrame(frame);

        var separateArrays = this.params.get('separateArrays');
        var entry = {
          time: frame.time,
          data: new Float32Array(frame.data)
        };

        if (!separateArrays) {
          this._store.push(entry);
        } else {
          this._store.time.push(entry.time);
          this._store.data.push(entry.data);
        }
      }
    }
  }]);
  return DataRecorder;
}(_BaseLfo3.default);

exports.default = DataRecorder;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],161:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  time: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  },
  data: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  },
  metadata: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  },
  streamParams: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  },
  frameIndex: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  }

  /**
   * Log `frame.time`, `frame.data`, `frame.metadata` and/or
   * `streamAttributes` of any node in the console.
   *
   * This sink can handle any type if input (`signal`, `vector`, `scalar`)
   *
   * @param {Object} options - Override parameters default values.
   * @param {Boolean} [options.time=false] - Log incomming `frame.time` if `true`.
   * @param {Boolean} [options.data=false] - Log incomming `frame.data` if `true`.
   * @param {Boolean} [options.metadata=false] - Log incomming `frame.metadata`
   *  if `true`.
   * @param {Boolean} [options.streamParams=false] - Log `streamParams` of the
   *  previous node when graph is started.
   * @param {Boolean} [options.frameIndex=false] - Log index of the incomming
   *  `frame`.
   *
   * @memberof module:common.sink
   *
   * @example
   * import * as lfo from 'waves-lfo/common';
   *
   * const logger = new lfo.sink.Logger({ data: true });
   * whateverOperator.connect(logger);
   */
};
var Logger = function (_BaseLfo) {
  (0, _inherits3.default)(Logger, _BaseLfo);

  function Logger(options) {
    (0, _classCallCheck3.default)(this, Logger);
    return (0, _possibleConstructorReturn3.default)(this, (Logger.__proto__ || (0, _getPrototypeOf2.default)(Logger)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Logger, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      if (this.params.get('streamParams') === true) console.log(prevStreamParams);

      this.frameIndex = 0;
    }

    /** @private */

  }, {
    key: 'processFunction',
    value: function processFunction(frame) {
      if (this.params.get('frameIndex') === true) console.log(this.frameIndex++);

      if (this.params.get('time') === true) console.log(frame.time);

      if (this.params.get('data') === true) console.log(frame.data);

      if (this.params.get('metadata') === true) console.log(frame.metadata);
    }
  }]);
  return Logger;
}(_BaseLfo3.default);

exports.default = Logger;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],162:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  duration: {
    type: 'float',
    default: 10,
    min: 0,
    metas: { kind: 'static' }
  },
  callback: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  },
  ignoreLeadingZeros: {
    type: 'boolean',
    default: true,
    metas: { kind: 'static' }
  },
  retrieveAudioBuffer: {
    type: 'boolean',
    default: false,
    constant: true
  },
  audioContext: {
    type: 'any',
    default: null,
    nullable: true
  }
};

/**
 * Record an `signal` input stream of arbitrary duration and retrieve it
 * when done.
 *
 * When recording is stopped (either when the `stop` method is called, the
 * defined duration has been recorded, or the source of the graph finalized
 * the stream), the callback given as parameter is executed  with the
 * `AudioBuffer` or `Float32Array` containing the recorded signal as argument.
 *
 * @todo - add option to return only the Float32Array and not an audio buffer
 *  (node compliant) `retrieveAudioBuffer: false`
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.duration=10] - Maximum duration of the recording.
 * @param {Number} [options.callback] - Callback to execute when a new record is
 *  ended. This can happen: `stop` is called on the recorder, `stop` is called
 *  on the source or when the buffer is full according to the given `duration`.
 * @param {Object} [options.ignoreLeadingZeros=true] - Start the effective
 *  recording on the first non-zero value.
 * @param {Boolean} [options.retrieveAudioBuffer=false] - Define if an `AudioBuffer`
 *  should be retrieved or only the raw Float32Array of data.
 *  (works only in browser)
 * @param {AudioContext} [options.audioContext=null] - If
 *  `retrieveAudioBuffer` is set to `true`, audio context to be used
 *  in order to create the final audio buffer.
 *  (works only in browser)
 *
 * @memberof module:common.sink
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const source = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     sourceNode: source,
 *     audioContext: audioContext,
 *   });
 *
 *   const signalRecorder = new lfo.sink.SignalRecorder({
 *     duration: 6,
 *     retrieveAudioBuffer: true,
 *     audioContext: audioContext,
 *     callback: (buffer) => {
 *       const bufferSource = audioContext.createBufferSource();
 *       bufferSource.buffer = buffer;
 *       bufferSource.connect(audioContext.destination);
 *       bufferSource.start();
 *     }
 *   });
 *
 *   audioInNode.connect(signalRecorder);
 *   audioInNode.start();
 *   signalRecorder.start();
 * });
 */

var SignalRecorder = function (_BaseLfo) {
  (0, _inherits3.default)(SignalRecorder, _BaseLfo);

  function SignalRecorder() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, SignalRecorder);

    /**
     * Define is the node is currently recording or not.
     *
     * @type {Boolean}
     * @name isRecording
     * @instance
     * @memberof module:client.sink.SignalRecorder
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (SignalRecorder.__proto__ || (0, _getPrototypeOf2.default)(SignalRecorder)).call(this, definitions, options));

    _this.isRecording = false;

    var retrieveAudioBuffer = _this.params.get('retrieveAudioBuffer');
    var audioContext = _this.params.get('audioContext');
    // needed to retrieve an AudioBuffer
    if (retrieveAudioBuffer && audioContext === null) throw new Error('Invalid parameter "audioContext": an AudioContext must be provided when `retrieveAudioBuffer` is set to `true`');

    _this._audioContext = audioContext;
    _this._ignoreZeros = false;
    _this._isInfiniteBuffer = false;
    _this._stack = [];
    _this._buffer = null;
    _this._bufferLength = null;
    _this._currentIndex = null;
    return _this;
  }

  (0, _createClass3.default)(SignalRecorder, [{
    key: '_initBuffer',
    value: function _initBuffer() {
      this._buffer = new Float32Array(this._bufferLength);
      this._stack.length = 0;
      this._currentIndex = 0;
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var duration = this.params.get('duration');
      var sampleRate = this.streamParams.sourceSampleRate;

      if (isFinite(duration)) {
        this._isInfiniteBuffer = false;
        this._bufferLength = sampleRate * duration;
      } else {
        this._isInfiniteBuffer = true;
        this._bufferLength = sampleRate * 10;
      }

      this._initBuffer();
      this.propagateStreamParams();
    }

    /**
     * Start recording.
     */

  }, {
    key: 'start',
    value: function start() {
      this.isRecording = true;
      this._ignoreZeros = this.params.get('ignoreLeadingZeros');
    }

    /**
     * Stop recording and execute the callback defined in parameters.
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (this.isRecording) {
        // ignore next incomming frame
        this.isRecording = false;

        var retrieveAudioBuffer = this.params.get('retrieveAudioBuffer');
        var callback = this.params.get('callback');
        var currentIndex = this._currentIndex;
        var buffer = this._buffer;
        var output = void 0;

        if (!this._isInfiniteBuffer) {
          output = new Float32Array(currentIndex);
          output.set(buffer.subarray(0, currentIndex), 0);
        } else {
          var bufferLength = this._bufferLength;
          var stack = this._stack;

          output = new Float32Array(stack.length * bufferLength + currentIndex);

          // copy all stacked buffers
          for (var i = 0; i < stack.length; i++) {
            var stackedBuffer = stack[i];
            output.set(stackedBuffer, bufferLength * i);
          };
          // copy data contained in current buffer
          output.set(buffer.subarray(0, currentIndex), stack.length * bufferLength);
        }

        if (retrieveAudioBuffer && this._audioContext) {
          var length = output.length;
          var sampleRate = this.streamParams.sourceSampleRate;
          var audioBuffer = this._audioContext.createBuffer(1, length, sampleRate);
          var channelData = audioBuffer.getChannelData(0);
          channelData.set(output, 0);

          callback(audioBuffer);
        } else {
          callback(output);
        }

        // reinit buffer, stack, and currentIndex
        this._initBuffer();
      }
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      this.stop();
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      if (!this.isRecording) return;

      var block = null;
      var input = frame.data;
      var bufferLength = this._bufferLength;
      var buffer = this._buffer;

      if (this._ignoreZeros === false) {
        block = new Float32Array(input);
      } else if (input[input.length - 1] !== 0) {
        // find first index where value !== 0
        var i = void 0;

        for (i = 0; i < input.length; i++) {
          if (input[i] !== 0) break;
        } // copy non zero segment
        block = new Float32Array(input.subarray(i));
        // don't repeat this logic once a non-zero value has been found
        this._ignoreZeros = false;
      }

      if (block !== null) {
        var availableSpace = bufferLength - this._currentIndex;
        var currentBlock = void 0;

        if (availableSpace < block.length) currentBlock = block.subarray(0, availableSpace);else currentBlock = block;

        buffer.set(currentBlock, this._currentIndex);
        this._currentIndex += currentBlock.length;

        if (this._isInfiniteBuffer && this._currentIndex === bufferLength) {
          this._stack.push(buffer);

          currentBlock = block.subarray(availableSpace);
          this._buffer = new Float32Array(bufferLength);
          this._buffer.set(currentBlock, 0);
          this._currentIndex = currentBlock.length;
        }

        //  stop if the buffer is finite and full
        if (!this._isInfiniteBuffer && this._currentIndex === bufferLength) this.stop();
      }
    }
  }]);
  return SignalRecorder;
}(_BaseLfo3.default);

exports.default = SignalRecorder;

},{"../../core/BaseLfo":166,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],163:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFinite = require('babel-runtime/core-js/number/is-finite');

var _isFinite2 = _interopRequireDefault(_isFinite);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo = require('../../core/BaseLfo');

var _BaseLfo2 = _interopRequireDefault(_BaseLfo);

var _SourceMixin2 = require('../../core/SourceMixin');

var _SourceMixin3 = _interopRequireDefault(_SourceMixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser
var isNode = new Function('try { return this === global; } catch(e) { return false }');

/**
 * Create a function that returns time in seconds according to the current
 * environnement (node or browser).
 * If running in node the time rely on `process.hrtime`, while if in the browser
 * it is provided by the `currentTime` of an `AudioContext`, this context can
 * optionnaly be provided to keep time consistency between several `EventIn`
 * nodes.
 *
 * @param {AudioContext} [audioContext=null] - Optionnal audio context.
 * @return {Function}
 * @private
 */
function getTimeFunction() {
  var audioContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (isNode()) {
    return function () {
      var t = process.hrtime();
      return t[0] + t[1] * 1e-9;
    };
  } else {
    // @todo - replace with `performance.now`
    if (audioContext === null || !audioContext instanceof AudioContext) {
      var _AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new _AudioContext();
    }

    return function () {
      return audioContext.currentTime;
    };
  }
}

var definitions = {
  absoluteTime: {
    type: 'boolean',
    default: false,
    constant: true
  },
  audioContext: {
    type: 'any',
    default: null,
    constant: true,
    nullable: true
  },
  frameType: {
    type: 'enum',
    list: ['signal', 'vector', 'scalar'],
    default: 'signal',
    constant: true
  },
  frameSize: {
    type: 'integer',
    default: 1,
    min: 1,
    max: +Infinity, // not recommended...
    metas: { kind: 'static' }
  },
  sampleRate: {
    type: 'float',
    default: null,
    min: 0,
    max: +Infinity, // same here
    nullable: true,
    metas: { kind: 'static' }
  },
  frameRate: {
    type: 'float',
    default: null,
    min: 0,
    max: +Infinity, // same here
    nullable: true,
    metas: { kind: 'static' }
  },
  description: {
    type: 'any',
    default: null,
    constant: true
  }
};

/**
 * The `EventIn` operator allows to manually create a stream of data or to feed
 * a stream from another source (e.g. sensors) into a processing graph.
 *
 * @param {Object} options - Override parameters' default values.
 * @param {String} [options.frameType='signal'] - Type of the input - allowed
 * values: `signal`,  `vector` or `scalar`.
 * @param {Number} [options.frameSize=1] - Size of the output frame.
 * @param {Number} [options.sampleRate=null] - Sample rate of the source stream,
 *  if of type `signal`.
 * @param {Number} [options.frameRate=null] - Rate of the source stream, if of
 *  type `vector`.
 * @param {Array|String} [options.description] - Optionnal description
 *  describing the dimensions of the output frame
 * @param {Boolean} [options.absoluteTime=false] - Define if time should be used
 *  as forwarded as given in the process method, or relatively to the time of
 *  the first `process` call after start.
 *
 * @memberof module:common.source
 *
 * @todo - Add a `logicalTime` parameter to tag frame according to frame rate.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameType: 'vector',
 *   frameSize: 3,
 *   frameRate: 1 / 50,
 *   description: ['alpha', 'beta', 'gamma'],
 * });
 *
 * // connect source to operators and sink(s)
 *
 * // initialize and start the graph
 * eventIn.start();
 *
 * // feed `deviceorientation` data into the graph
 * window.addEventListener('deviceorientation', (e) => {
 *   const frame = {
 *     time: window.performace.now() / 1000,
 *     data: [e.alpha, e.beta, e.gamma],
 *   };
 *
 *   eventIn.processFrame(frame);
 * }, false);
 */

var EventIn = function (_SourceMixin) {
  (0, _inherits3.default)(EventIn, _SourceMixin);

  function EventIn() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, EventIn);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EventIn.__proto__ || (0, _getPrototypeOf2.default)(EventIn)).call(this, definitions, options));

    var audioContext = _this.params.get('audioContext');
    _this._getTime = getTimeFunction(audioContext);
    _this._startTime = null;
    _this._systemTime = null;
    _this._absoluteTime = _this.params.get('absoluteTime');
    return _this;
  }

  /**
   * Propagate the `streamParams` in the graph and allow to push frames into
   * the graph. Any call to `process` or `processFrame` before `start` will be
   * ignored.
   *
   * @see {@link module:common.core.BaseLfo#processStreamParams}
   * @see {@link module:common.core.BaseLfo#resetStream}
   * @see {@link module:common.source.EventIn#stop}
   */


  (0, _createClass3.default)(EventIn, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.initialized === false) {
        if (this.initPromise === null) // init has not yet been called
          this.initPromise = this.init();

        this.initPromise.then(function () {
          return _this2.start(startTime);
        });
        return;
      }

      this._startTime = startTime;
      this._systemTime = null; // value set in the first `process` call

      this.started = true;
    }

    /**
     * Finalize the stream and stop the whole graph. Any call to `process` or
     * `processFrame` after `stop` will be ignored.
     *
     * @see {@link module:common.core.BaseLfo#finalizeStream}
     * @see {@link module:common.source.EventIn#start}
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (this.started && this._startTime !== null) {
        var currentTime = this._getTime();
        var endTime = this.frame.time + (currentTime - this._systemTime);

        this.finalizeStream(endTime);
        this.started = false;
      }
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams() {
      var frameSize = this.params.get('frameSize');
      var frameType = this.params.get('frameType');
      var sampleRate = this.params.get('sampleRate');
      var frameRate = this.params.get('frameRate');
      var description = this.params.get('description');
      // init operator's stream params
      this.streamParams.frameSize = frameType === 'scalar' ? 1 : frameSize;
      this.streamParams.frameType = frameType;
      this.streamParams.description = description;

      if (frameType === 'signal') {
        if (sampleRate === null) throw new Error('Undefined "sampleRate" for "signal" stream');

        this.streamParams.sourceSampleRate = sampleRate;
        this.streamParams.frameRate = sampleRate / frameSize;
        this.streamParams.sourceSampleCount = frameSize;
      } else if (frameType === 'vector' || frameType === 'scalar') {
        if (frameRate === null) throw new Error('Undefined "frameRate" for "vector" stream');

        this.streamParams.frameRate = frameRate;
        this.streamParams.sourceSampleRate = frameRate;
        this.streamParams.sourceSampleCount = 1;
      }

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processFunction',
    value: function processFunction(frame) {
      var currentTime = this._getTime();
      var inData = frame.data.length ? frame.data : [frame.data];
      var outData = this.frame.data;
      // if no time provided, use system time
      var time = (0, _isFinite2.default)(frame.time) ? frame.time : currentTime;

      if (this._startTime === null) this._startTime = time;

      if (this._absoluteTime === false) time = time - this._startTime;

      for (var i = 0, l = this.streamParams.frameSize; i < l; i++) {
        outData[i] = inData[i];
      }this.frame.time = time;
      this.frame.metadata = frame.metadata;
      // store current time to compute `endTime` on stop
      this._systemTime = currentTime;
    }

    /**
     * Alternative interface to propagate a frame in the graph. Pack `time`,
     * `data` and `metadata` in a frame object.
     *
     * @param {Number} time - Frame time.
     * @param {Float32Array|Array} data - Frame data.
     * @param {Object} metadata - Optionnal frame metadata.
     *
     * @example
     * eventIn.process(1, [0, 1, 2]);
     * // is equivalent to
     * eventIn.processFrame({ time: 1, data: [0, 1, 2] });
     */

  }, {
    key: 'process',
    value: function process(time, data) {
      var metadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this.processFrame({ time: time, data: data, metadata: metadata });
    }

    /**
     * Propagate a frame object in the graph.
     *
     * @param {Object} frame - Input frame.
     * @param {Number} frame.time - Frame time.
     * @param {Float32Array|Array} frame.data - Frame data.
     * @param {Object} [frame.metadata=undefined] - Optionnal frame metadata.
     *
     * @example
     * eventIn.processFrame({ time: 1, data: [0, 1, 2] });
     */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      if (!this.started) return;

      this.prepareFrame();
      this.processFunction(frame);
      this.propagateFrame();
    }
  }]);
  return EventIn;
}((0, _SourceMixin3.default)(_BaseLfo2.default));

exports.default = EventIn;

}).call(this,require('_process'))

},{"../../core/BaseLfo":166,"../../core/SourceMixin":167,"_process":121,"babel-runtime/core-js/number/is-finite":4,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],164:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// shortcuts / helpers
var PI = Math.PI;
var cos = Math.cos;
var sin = Math.sin;
var sqrt = Math.sqrt;

// window creation functions
function initHannWindow(buffer, size, normCoefs) {
  var linSum = 0;
  var powSum = 0;
  var step = 2 * PI / size;

  for (var i = 0; i < size; i++) {
    var phi = i * step;
    var value = 0.5 - 0.5 * cos(phi);

    buffer[i] = value;

    linSum += value;
    powSum += value * value;
  }

  normCoefs.linear = size / linSum;
  normCoefs.power = sqrt(size / powSum);
}

function initHammingWindow(buffer, size, normCoefs) {
  var linSum = 0;
  var powSum = 0;
  var step = 2 * PI / size;

  for (var i = 0; i < size; i++) {
    var phi = i * step;
    var value = 0.54 - 0.46 * cos(phi);

    buffer[i] = value;

    linSum += value;
    powSum += value * value;
  }

  normCoefs.linear = size / linSum;
  normCoefs.power = sqrt(size / powSum);
}

function initBlackmanWindow(buffer, size, normCoefs) {
  var linSum = 0;
  var powSum = 0;
  var step = 2 * PI / size;

  for (var i = 0; i < size; i++) {
    var phi = i * step;
    var value = 0.42 - 0.5 * cos(phi) + 0.08 * cos(2 * phi);

    buffer[i] = value;

    linSum += value;
    powSum += value * value;
  }

  normCoefs.linear = size / linSum;
  normCoefs.power = sqrt(size / powSum);
}

function initBlackmanHarrisWindow(buffer, size, normCoefs) {
  var linSum = 0;
  var powSum = 0;
  var a0 = 0.35875;
  var a1 = 0.48829;
  var a2 = 0.14128;
  var a3 = 0.01168;
  var step = 2 * PI / size;

  for (var i = 0; i < size; i++) {
    var phi = i * step;
    var value = a0 - a1 * cos(phi) + a2 * cos(2 * phi);-a3 * cos(3 * phi);

    buffer[i] = value;

    linSum += value;
    powSum += value * value;
  }

  normCoefs.linear = size / linSum;
  normCoefs.power = sqrt(size / powSum);
}

function initSineWindow(buffer, size, normCoefs) {
  var linSum = 0;
  var powSum = 0;
  var step = PI / size;

  for (var i = 0; i < size; i++) {
    var phi = i * step;
    var value = sin(phi);

    buffer[i] = value;

    linSum += value;
    powSum += value * value;
  }

  normCoefs.linear = size / linSum;
  normCoefs.power = sqrt(size / powSum);
}

function initRectangleWindow(buffer, size, normCoefs) {
  for (var i = 0; i < size; i++) {
    buffer[i] = 1;
  } // @todo - check if these are proper values
  normCoefs.linear = 1;
  normCoefs.power = 1;
}

/**
 * Create a buffer with window signal.
 *
 * @memberof module:common.utils
 *
 * @param {String} name - Name of the window.
 * @param {Float32Array} buffer - Buffer to be populated with the window signal.
 * @param {Number} size - Size of the buffer.
 * @param {Object} normCoefs - Object to be populated with the normailzation
 *  coefficients.
 */
function initWindow(name, buffer, size, normCoefs) {
  name = name.toLowerCase();

  switch (name) {
    case 'hann':
    case 'hanning':
      initHannWindow(buffer, size, normCoefs);
      break;
    case 'hamming':
      initHammingWindow(buffer, size, normCoefs);
      break;
    case 'blackman':
      initBlackmanWindow(buffer, size, normCoefs);
      break;
    case 'blackmanharris':
      initBlackmanHarrisWindow(buffer, size, normCoefs);
      break;
    case 'sine':
      initSineWindow(buffer, size, normCoefs);
      break;
    case 'rectangle':
      initRectangleWindow(buffer, size, normCoefs);
      break;
  }
}

exports.default = initWindow;

},{}],165:[function(require,module,exports){
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

var opcodes = exports.opcodes = {
  INIT_MODULE_REQ: 10,
  INIT_MODULE_ACK: 11,
  PROCESS_STREAM_PARAMS: 12,
  RESET_STREAM: 13,
  FINALIZE_STREAM: 14,
  PROCESS_FRAME: 15

  //
};var encoders = exports.encoders = {
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

},{"babel-runtime/core-js/json/stringify":2}],166:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _parameters = require('parameters');

var _parameters2 = _interopRequireDefault(_parameters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var id = 0;

/**
 * Base `lfo` class to be extended in order to create new nodes.
 *
 * Nodes are divided in 3 categories:
 * - **`source`** are responsible for acquering a signal and its properties
 *   (frameRate, frameSize, etc.)
 * - **`sink`** are endpoints of the graph, such nodes can be recorders,
 *   visualizers, etc.
 * - **`operator`** are used to make computation on the input signal and
 *   forward the results below in the graph.
 *
 * In most cases the methods to override / extend are:
 * - the **`constructor`** to define the parameters of the new lfo node.
 * - the **`processStreamParams`** method to define how the node modify the
 *   stream attributes (e.g. by changing the frame size)
 * - the **`process{FrameType}`** method to define the operations that the
 *   node apply on the stream. The type of input a node can handle is defined
 *   by its implemented interface, if it implements `processSignal`, a stream
 *   of type `signal` can be processed, `processVector` to handle
 *   an input of type `vector`.
 *
 * <span class="warning">_This class should be considered abstract and only
 * be used as a base class to extend._</span>
 *
 * #### overview of the interface
 *
 * **initModule**
 *
 * Returns a Promise that resolves when the module is initialized. Is
 * especially important for modules that rely on asynchronous underlying APIs.
 *
 * **processStreamParams(prevStreamParams)**
 *
 * `base` class (default implementation)
 * - call `prepareStreamParams`
 * - call `propagateStreamParams`
 *
 * `child` class
 * - override some of the inherited `streamParams`
 * - creates the any related logic buffers
 * - call `propagateStreamParams`
 *
 * _should not call `super.processStreamParams`_
 *
 * **prepareStreamParams()**
 *
 * - assign prevStreamParams to this.streamParams
 * - check if the class implements the correct `processInput` method
 *
 * _shouldn't be extended, only consumed in `processStreamParams`_
 *
 * **propagateStreamParams()**
 *
 * - creates the `frameData` buffer
 * - propagate `streamParams` to children
 *
 * _shouldn't be extended, only consumed in `processStreamParams`_
 *
 * **processFrame()**
 *
 * `base` class (default implementation)
 * - call `prepareFrame`
 * - assign frameTime and frameMetadata to identity
 * - call the proper function according to inputType
 * - call `propagateFrame`
 *
 * `child` class
 * - call `prepareFrame`
 * - do whatever you want with incomming frame
 * - call `propagateFrame`
 *
 * _should not call `super.processFrame`_
 *
 * **prepareFrame()**
 *
 * - if `reinit` and trigger `processStreamParams` if needed
 *
 * _shouldn't be extended, only consumed in `processFrame`_
 *
 * **propagateFrame()**
 *
 * - propagate frame to children
 *
 * _shouldn't be extended, only consumed in `processFrame`_
 *
 * @memberof module:core
 */

var BaseLfo = function () {
  function BaseLfo() {
    var definitions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, BaseLfo);

    this.cid = id++;

    /**
     * Parameter bag containing parameter instances.
     *
     * @type {Object}
     * @name params
     * @instance
     * @memberof module:common.core.BaseLfo
     */
    this.params = (0, _parameters2.default)(definitions, options);
    // listen for param updates
    this.params.addListener(this.onParamUpdate.bind(this));

    /**
     * Description of the stream output of the node.
     * Set to `null` when the node is destroyed.
     *
     * @type {Object}
     * @property {Number} frameSize - Frame size at the output of the node.
     * @property {Number} frameRate - Frame rate at the output of the node.
     * @property {String} frameType - Frame type at the output of the node,
     *  possible values are `signal`, `vector` or `scalar`.
     * @property {Array|String} description - If type is `vector`, describe
     *  the dimension(s) of output stream.
     * @property {Number} sourceSampleRate - Sample rate of the source of the
     *  graph. _The value should be defined by sources and never modified_.
     * @property {Number} sourceSampleCount - Number of consecutive discrete
     *  time values contained in the data frame output by the source.
     *  _The value should be defined by sources and never modified_.
     *
     * @name streamParams
     * @instance
     * @memberof module:common.core.BaseLfo
     */
    this.streamParams = {
      frameType: null,
      frameSize: 1,
      frameRate: 0,
      description: null,
      sourceSampleRate: 0,
      sourceSampleCount: null
    };

    /**
     * Current frame. This object and its data are updated at each incomming
     * frame without reallocating memory.
     *
     * @type {Object}
     * @name frame
     * @property {Number} time - Time of the current frame.
     * @property {Float32Array} data - Data of the current frame.
     * @property {Object} metadata - Metadata associted to the current frame.
     * @instance
     * @memberof module:common.core.BaseLfo
     */
    this.frame = {
      time: 0,
      data: null,
      metadata: {}
    };

    /**
     * List of nodes connected to the ouput of the node (lower in the graph).
     * At each frame, the node forward its `frame` to to all its `nextModules`.
     *
     * @type {Array<BaseLfo>}
     * @name nextModules
     * @instance
     * @memberof module:common.core.BaseLfo
     * @see {@link module:common.core.BaseLfo#connect}
     * @see {@link module:common.core.BaseLfo#disconnect}
     */
    this.nextModules = [];

    /**
     * The node from which the node receive the frames (upper in the graph).
     *
     * @type {BaseLfo}
     * @name prevModule
     * @instance
     * @memberof module:common.core.BaseLfo
     * @see {@link module:common.core.BaseLfo#connect}
     * @see {@link module:common.core.BaseLfo#disconnect}
     */
    this.prevModule = null;

    /**
     * Is set to true when a static parameter is updated. On the next input
     * frame all the subgraph streamParams starting from this node will be
     * updated.
     *
     * @type {Boolean}
     * @name _reinit
     * @instance
     * @memberof module:common.core.BaseLfo
     * @private
     */
    this._reinit = false;
  }

  /**
   * Returns an object describing each available parameter of the node.
   *
   * @return {Object}
   */


  (0, _createClass3.default)(BaseLfo, [{
    key: 'getParamsDescription',
    value: function getParamsDescription() {
      return this.params.getDefinitions();
    }

    /**
     * Reset all parameters to their initial value (as defined on instantication)
     *
     * @see {@link module:common.core.BaseLfo#streamParams}
     */

  }, {
    key: 'resetParams',
    value: function resetParams() {
      this.params.reset();
    }

    /**
     * Function called when a param is updated. By default set the `_reinit`
     * flag to `true` if the param is `static` one. This method should be
     * extended to handle particular logic bound to a specific parameter.
     *
     * @param {String} name - Name of the parameter.
     * @param {Mixed} value - Value of the parameter.
     * @param {Object} metas - Metadata associated to the parameter.
     */

  }, {
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value) {
      var metas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (metas.kind === 'static') this._reinit = true;
    }

    /**
     * Connect the current node (`prevModule`) to another node (`nextOp`).
     * A given node can be connected to several operators and propagate frames
     * to each of them.
     *
     * @param {BaseLfo} next - Next operator in the graph.
     * @see {@link module:common.core.BaseLfo#processFrame}
     * @see {@link module:common.core.BaseLfo#disconnect}
     */

  }, {
    key: 'connect',
    value: function connect(next) {
      var _this = this;

      if (!(next instanceof BaseLfo)) throw new Error('Invalid connection: child node is not an instance of `BaseLfo`');

      if (this.streamParams === null || next.streamParams === null) throw new Error('Invalid connection: cannot connect a dead node');

      if (this.streamParams.frameType !== null) {
        // graph has already been started
        // next.processStreamParams(this.streamParams);
        next.initModule().then(function () {
          next.processStreamParams(_this.streamParams);
          // we can forward frame from now
          _this.nextModules.push(next);
          next.prevModule = _this;
        });
      } else {
        this.nextModules.push(next);
        next.prevModule = this;
      }
    }

    /**
     * Remove the given operator from its previous operators' `nextModules`.
     *
     * @param {BaseLfo} [next=null] - The operator to disconnect from the current
     *  operator. If `null` disconnect all the next operators.
     */

  }, {
    key: 'disconnect',
    value: function disconnect() {
      var _this2 = this;

      var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (next === null) {
        this.nextModules.forEach(function (next) {
          return _this2.disconnect(next);
        });
      } else {
        var index = this.nextModules.indexOf(this);
        this.nextModules.splice(index, 1);
        next.prevModule = null;
      }
    }

    /**
     * Destroy all the nodes in the sub-graph starting from the current node.
     * When detroyed, the `streamParams` of the node are set to `null`, the
     * operator is then considered as `dead` and cannot be reconnected.
     *
     * @see {@link module:common.core.BaseLfo#connect}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      // destroy all chidren
      var index = this.nextModules.length;

      while (index--) {
        this.nextModules[index].destroy();
      } // disconnect itself from the previous operator
      if (this.prevModule) this.prevModule.disconnect(this);

      // mark the object as dead
      this.streamParams = null;
    }

    /**
     * Return a `Promise` that resolve when the module is ready to be consumed.
     * Some modules relies on asynchronous APIs at initialization and thus could
     * be not ready to be consumed when the graph starts.
     * A module should be consider as initialized when all next modules (children)
     * are themselves initialized. The event bubbles up from sinks to sources.
     * When all its next operators are ready, a source can consider the whole graph
     * as ready and then start to produce frames.
     * The default implementation resolves when all next operators are resolved
     * themselves.
     * An operator relying on external async API must override this method to
     * resolve only when its dependecy is ready.
     *
     * @return Promise
     * @todo - Handle dynamic connections
     */

  }, {
    key: 'initModule',
    value: function initModule() {
      var nextPromises = this.nextModules.map(function (module) {
        return module.initModule();
      });

      return _promise2.default.all(nextPromises);
    }

    /**
     * Helper to initialize the stream in standalone mode.
     *
     * @param {Object} [streamParams={}] - Parameters of the stream.
     *
     * @see {@link module:common.core.BaseLfo#processStreamParams}
     * @see {@link module:common.core.BaseLfo#resetStream}
     */

  }, {
    key: 'initStream',
    value: function initStream() {
      var streamParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.processStreamParams(streamParams);
      this.resetStream();
    }

    /**
     * Reset the `frame.data` buffer by setting all its values to 0.
     * A source operator should call `processStreamParams` and `resetStream` when
     * started, each of these method propagate through the graph automaticaly.
     *
     * @see {@link module:common.core.BaseLfo#processStreamParams}
     */

  }, {
    key: 'resetStream',
    value: function resetStream() {
      // buttom up
      for (var i = 0, l = this.nextModules.length; i < l; i++) {
        this.nextModules[i].resetStream();
      } // no buffer for `scalar` type or sink node
      // @note - this should be reviewed
      if (this.streamParams.frameType !== 'scalar' && this.frame.data !== null) {
        var frameSize = this.streamParams.frameSize;
        var data = this.frame.data;

        for (var _i = 0; _i < frameSize; _i++) {
          data[_i] = 0;
        }
      }
    }

    /**
     * Finalize the stream. A source node should call this method when stopped,
     * `finalizeStream` is automatically propagated throught the graph.
     *
     * @param {Number} endTime - Logical time at which the graph is stopped.
     */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      for (var i = 0, l = this.nextModules.length; i < l; i++) {
        this.nextModules[i].finalizeStream(endTime);
      }
    }

    /**
     * Initialize or update the operator's `streamParams` according to the
     * previous operators `streamParams` values.
     *
     * When implementing a new operator this method should:
     * 1. call `this.prepareStreamParams` with the given `prevStreamParams`
     * 2. optionnally change values to `this.streamParams` according to the
     *    logic performed by the operator.
     * 3. optionnally allocate memory for ring buffers, etc.
     * 4. call `this.propagateStreamParams` to trigger the method on the next
     *    operators in the graph.
     *
     * @param {Object} prevStreamParams - `streamParams` of the previous operator.
     *
     * @see {@link module:common.core.BaseLfo#prepareStreamParams}
     * @see {@link module:common.core.BaseLfo#propagateStreamParams}
     */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams() {
      var prevStreamParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.prepareStreamParams(prevStreamParams);
      this.propagateStreamParams();
    }

    /**
     * Common logic to do at the beginning of the `processStreamParam`, must be
     * called at the beginning of any `processStreamParam` implementation.
     *
     * The method mainly check if the current node implement the interface to
     * handle the type of frame propagated by it's parent:
     * - to handle a `vector` frame type, the class must implement `processVector`
     * - to handle a `signal` frame type, the class must implement `processSignal`
     * - in case of a 'scalar' frame type, the class can implement any of the
     * following by order of preference: `processScalar`, `processVector`,
     * `processSignal`.
     *
     * @param {Object} prevStreamParams - `streamParams` of the previous operator.
     *
     * @see {@link module:common.core.BaseLfo#processStreamParams}
     * @see {@link module:common.core.BaseLfo#propagateStreamParams}
     */

  }, {
    key: 'prepareStreamParams',
    value: function prepareStreamParams() {
      var prevStreamParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _assign2.default)(this.streamParams, prevStreamParams);
      var prevFrameType = prevStreamParams.frameType;

      switch (prevFrameType) {
        case 'scalar':
          if (this.processScalar) this.processFunction = this.processScalar;else if (this.processVector) this.processFunction = this.processVector;else if (this.processSignal) this.processFunction = this.processSignal;else throw new Error(this.constructor.name + ' - no "process" function found');
          break;
        case 'vector':
          if (!('processVector' in this)) throw new Error(this.constructor.name + ' - "processVector" is not defined');

          this.processFunction = this.processVector;
          break;
        case 'signal':
          if (!('processSignal' in this)) throw new Error(this.constructor.name + ' - "processSignal" is not defined');

          this.processFunction = this.processSignal;
          break;
        default:
          // defaults to processFunction
          break;
      }
    }

    /**
     * Create the `this.frame.data` buffer and forward the operator's `streamParam`
     * to all its next operators, must be called at the end of any
     * `processStreamParams` implementation.
     *
     * @see {@link module:common.core.BaseLfo#processStreamParams}
     * @see {@link module:common.core.BaseLfo#prepareStreamParams}
     */

  }, {
    key: 'propagateStreamParams',
    value: function propagateStreamParams() {
      this.frame.data = new Float32Array(this.streamParams.frameSize);

      for (var i = 0, l = this.nextModules.length; i < l; i++) {
        this.nextModules[i].processStreamParams(this.streamParams);
      }
    }

    /**
     * Define the particular logic the operator applies to the stream.
     * According to the frame type of the previous node, the method calls one
     * of the following method `processVector`, `processSignal` or `processScalar`
     *
     * @param {Object} frame - Frame (time, data, and metadata) as given by the
     *  previous operator. The incomming frame should never be modified by
     *  the operator.
     *
     * @see {@link module:common.core.BaseLfo#prepareFrame}
     * @see {@link module:common.core.BaseLfo#propagateFrame}
     * @see {@link module:common.core.BaseLfo#processStreamParams}
     */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();

      // frameTime and frameMetadata defaults to identity
      this.frame.time = frame.time;
      this.frame.metadata = frame.metadata;

      this.processFunction(frame);
      this.propagateFrame();
    }

    /**
     * Pointer to the method called in `processFrame` according to the
     * frame type of the previous operator. Is dynamically assigned in
     * `prepareStreamParams`.
     *
     * @see {@link module:common.core.BaseLfo#prepareStreamParams}
     * @see {@link module:common.core.BaseLfo#processFrame}
     */

  }, {
    key: 'processFunction',
    value: function processFunction(frame) {
      this.frame = frame;
    }

    /**
     * Common logic to perform at the beginning of the `processFrame`.
     *
     * @see {@link module:common.core.BaseLfo#processFrame}
     */

  }, {
    key: 'prepareFrame',
    value: function prepareFrame() {
      if (this._reinit === true) {
        var streamParams = this.prevModule !== null ? this.prevModule.streamParams : {};
        this.initStream(streamParams);
        this._reinit = false;
      }
    }

    /**
     * Forward the current `frame` to the next operators, is called at the end of
     * `processFrame`.
     *
     * @see {@link module:common.core.BaseLfo#processFrame}
     */

  }, {
    key: 'propagateFrame',
    value: function propagateFrame() {
      for (var i = 0, l = this.nextModules.length; i < l; i++) {
        this.nextModules[i].processFrame(this.frame);
      }
    }
  }]);
  return BaseLfo;
}();

exports.default = BaseLfo;

},{"babel-runtime/core-js/object/assign":5,"babel-runtime/core-js/promise":11,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"parameters":123}],167:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Interface added to `LfoCore to implement source
 *
 * Source have some responsability on graph as they mostly control its whole
 * lifecycle. They must implement the start and stop method in order to
 * make sure the graph is initialized and set `started` to true.
 * A source should never accept and propagate incomming frames until `started`
 * is set to `true`.
 *
 * @name SourceMixin
 * @memberof module:core
 * @mixin
 *
 * @example
 * class MySource extends SourceMixin(BaseLfo) {}
 */
var SourceMixin = function SourceMixin(superclass) {
  return function (_superclass) {
    (0, _inherits3.default)(_class, _superclass);

    function _class() {
      var _ref;

      (0, _classCallCheck3.default)(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call.apply(_ref, [this].concat(args)));

      _this.initialized = false;
      _this.initPromise = null;
      _this.started = false;

      _this.start = _this.start.bind(_this);
      _this.stop = _this.stop.bind(_this);
      return _this;
    }

    /**
     * Initialize the graph by calling `initModule`. When the returned `Promise`
     * fulfills, the graph can be considered as initialized and `start` can be
     * called safely. If `start` is called whithout explicit `init`, `init` is
     * made internally, actual start of the graph is then not garanteed to be
     * synchronous.
     *
     * @memberof module:core.SourceMixin
     * @instance
     * @name init
     *
     * @return Promise
     *
     * @example
     * // safe initialization and start
     * source.init().then(() => source.start())
     * // safe initialization and start
     * source.start();
     */


    (0, _createClass3.default)(_class, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.initPromise = this.initModule().then(function () {
          // when graph is started
          _this2.initStream(); // this is synchronous
          _this2.initialized = true;
          return _promise2.default.resolve(true);
        });

        return this.initPromise;
      }

      /**
       * Interface method to implement that starts the graph.
       *
       * The method main purpose is to make sure take verify initialization step and
       * set `started` to `true` when done.
       * Should behave synchronously when called inside `init().then()` and async
       * if called without init step.
       *
       * @memberof module:core.SourceMixin
       * @instance
       * @name start
       *
       * @example
       * // basic `start` implementation
       * start() {
       *   if (this.initialized === false) {
       *     if (this.initPromise === null) // init has not yet been called
       *       this.initPromise = this.init();
       *
       *     this.initPromise.then(this.start);
       *     return;
       *   }
       *
       *   this.started = true;
       * }
       */

    }, {
      key: "start",
      value: function start() {}

      /**
       * Interface method to implement that stops the graph.
       *
       * @memberof module:core.SourceMixin
       * @instance
       * @name stop
       *
       * @example
       * // basic `stop` implementation
       * stop() {
       *   this.started = false;
       * }
       */

    }, {
      key: "stop",
      value: function stop() {}

      /**
       * The implementation should never allow incomming frames
       * if `this.started` is not `true`.
       *
       * @memberof module:core.SourceMixin
       * @instance
       * @name processFrame
       *
       * @param {Object} frame
       *
       * @example
       * // basic `processFrame` implementation
       * processFrame(frame) {
       *   if (this.started === true) {
       *     this.prepareFrame();
       *     this.processFunction(frame);
       *     this.propagateFrame();
       *   }
       * }
       */

    }, {
      key: "processFrame",
      value: function processFrame(frame) {}
    }]);
    return _class;
  }(superclass);
};

exports.default = SourceMixin;

},{"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/core-js/promise":11,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":19}],168:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseLfo = require('./BaseLfo');

Object.defineProperty(exports, 'BaseLfo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BaseLfo).default;
  }
});

var _SourceMixin = require('./SourceMixin');

Object.defineProperty(exports, 'SourceMixin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SourceMixin).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = exports.version = '1.1.1';

},{"./BaseLfo":166,"./SourceMixin":167}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWF0aC9sb2cxMC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbnVtYmVyL2lzLWZpbml0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZ2V0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cxMC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLWZpbml0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW5kZXguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hdGgubG9nMTAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm51bWJlci5pcy1maW5pdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcGFyYW1ldGVycy9kaXN0L3BhcmFtVGVtcGxhdGVzLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFtZXRlcnMvZGlzdC9wYXJhbWV0ZXJzLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jbGllbnQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NsaWVudC9zaW5rL0Jhc2VEaXNwbGF5LmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jbGllbnQvc2luay9CcGZEaXNwbGF5LmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jbGllbnQvc2luay9NYXJrZXJEaXNwbGF5LmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jbGllbnQvc2luay9TaWduYWxEaXNwbGF5LmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jbGllbnQvc2luay9Tb2NrZXRTZW5kLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jbGllbnQvc2luay9TcGVjdHJ1bURpc3BsYXkuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NsaWVudC9zaW5rL1RyYWNlRGlzcGxheS5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY2xpZW50L3NpbmsvVnVNZXRlckRpc3BsYXkuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NsaWVudC9zaW5rL1dhdmVmb3JtRGlzcGxheS5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY2xpZW50L3NpbmsvX25hbWVzcGFjZS5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY2xpZW50L3NvdXJjZS9BdWRpb0luQnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jbGllbnQvc291cmNlL0F1ZGlvSW5Ob2RlLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jbGllbnQvc291cmNlL1NvY2tldFJlY2VpdmUuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NsaWVudC9zb3VyY2UvX25hbWVzcGFjZS5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY2xpZW50L3V0aWxzL0Rpc3BsYXlTeW5jLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jbGllbnQvdXRpbHMvX25hbWVzcGFjZS5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY2xpZW50L3V0aWxzL2Rpc3BsYXktdXRpbHMuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NvbW1vbi9vcGVyYXRvci9CaXF1YWQuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NvbW1vbi9vcGVyYXRvci9EY3QuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NvbW1vbi9vcGVyYXRvci9GZnQuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NvbW1vbi9vcGVyYXRvci9NYWduaXR1ZGUuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NvbW1vbi9vcGVyYXRvci9NZWFuU3RkZGV2LmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jb21tb24vb3BlcmF0b3IvTWVsLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jb21tb24vb3BlcmF0b3IvTWZjYy5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY29tbW9uL29wZXJhdG9yL01pbk1heC5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY29tbW9uL29wZXJhdG9yL01vdmluZ0F2ZXJhZ2UuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NvbW1vbi9vcGVyYXRvci9Nb3ZpbmdNZWRpYW4uanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NvbW1vbi9vcGVyYXRvci9Pbk9mZi5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY29tbW9uL29wZXJhdG9yL1Jtcy5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY29tbW9uL29wZXJhdG9yL1NlZ21lbnRlci5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY29tbW9uL29wZXJhdG9yL1NlbGVjdC5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY29tbW9uL29wZXJhdG9yL1NsaWNlci5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY29tbW9uL29wZXJhdG9yL1lpbi5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY29tbW9uL29wZXJhdG9yL19uYW1lc3BhY2UuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NvbW1vbi9zaW5rL0JyaWRnZS5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY29tbW9uL3NpbmsvRGF0YVJlY29yZGVyLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jb21tb24vc2luay9Mb2dnZXIuanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NvbW1vbi9zaW5rL1NpZ25hbFJlY29yZGVyLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jb21tb24vc291cmNlL0V2ZW50SW4uanMiLCJub2RlX21vZHVsZXMvd2F2ZXMtbGZvL2NvbW1vbi91dGlscy93aW5kb3dzLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jb21tb24vdXRpbHMvd3NVdGlscy5qcyIsIm5vZGVfbW9kdWxlcy93YXZlcy1sZm8vY29yZS9CYXNlTGZvLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jb3JlL1NvdXJjZU1peGluLmpzIiwibm9kZV9tb2R1bGVzL3dhdmVzLWxmby9jb3JlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7SUFBWSxHOzs7O0FBRVosSUFBTSxlQUFnQixPQUFPLFlBQVAsSUFBdUIsT0FBTyxrQkFBcEQ7QUFDQSxJQUFNLGVBQWUsSUFBSSxZQUFKLEVBQXJCOztBQUVBLElBQU0sWUFBWSxLQUFLLEtBQUwsQ0FBVyxRQUFRLGFBQWEsVUFBaEMsQ0FBbEI7QUFDQSxJQUFNLFVBQVUsS0FBSyxLQUFMLENBQVcsUUFBUSxhQUFhLFVBQWhDLENBQWhCOztBQUVBLFVBQVUsWUFBVixDQUNHLFlBREgsQ0FDZ0IsRUFBRSxPQUFPLElBQVQsRUFEaEIsRUFFRyxJQUZILENBRVEsSUFGUixFQUdHLEtBSEgsQ0FHUyxVQUFDLEdBQUQ7QUFBQSxTQUFTLFFBQVEsS0FBUixDQUFjLElBQUksS0FBbEIsQ0FBVDtBQUFBLENBSFQ7O0FBS0EsU0FBUyxJQUFULENBQWMsTUFBZCxFQUFzQjtBQUNwQixNQUFNLFNBQVMsYUFBYSx1QkFBYixDQUFxQyxNQUFyQyxDQUFmOztBQUVBLE1BQU0sY0FBYyxJQUFJLElBQUksTUFBSixDQUFXLFdBQWYsQ0FBMkI7QUFDN0MsZ0JBQVksTUFEaUM7QUFFN0Msa0JBQWM7QUFGK0IsR0FBM0IsQ0FBcEI7O0FBS0EsTUFBTSxTQUFTLElBQUksSUFBSSxRQUFKLENBQWEsTUFBakIsQ0FBd0I7QUFDckMsZUFBVyxTQUQwQjtBQUVyQyxhQUFTLE9BRjRCO0FBR3JDLHNCQUFrQjtBQUhtQixHQUF4QixDQUFmOztBQU1BLE1BQU0sUUFBUSxJQUFJLElBQUksUUFBSixDQUFhLEdBQWpCLENBQXFCO0FBQ2pDLFdBQU87QUFEMEIsR0FBckIsQ0FBZDs7QUFJQSxNQUFNLFlBQVksSUFBSSxJQUFJLFFBQUosQ0FBYSxTQUFqQixDQUEyQjtBQUMzQyxjQUFVLElBRGlDO0FBRTNDLGlCQUFhLENBRjhCO0FBRzNDLGVBQVcsQ0FIZ0M7QUFJM0Msa0JBQWMsQ0FBQyxRQUo0QjtBQUszQyxjQUFVLEtBTGlDO0FBTTNDLGlCQUFhO0FBTjhCLEdBQTNCLENBQWxCOztBQVNBLE1BQU0sa0JBQWtCLElBQUksSUFBSSxJQUFKLENBQVMsZUFBYixDQUE2QjtBQUNuRCxZQUFRO0FBRDJDLEdBQTdCLENBQXhCOztBQUlBLE1BQU0sZ0JBQWdCLElBQUksSUFBSSxJQUFKLENBQVMsYUFBYixDQUEyQjtBQUMvQyxZQUFRO0FBRHVDLEdBQTNCLENBQXRCOztBQUlBLE1BQUksSUFBSSxLQUFKLENBQVUsV0FBZCxDQUEwQixlQUExQixFQUEyQyxhQUEzQzs7QUFFQSxjQUFZLE9BQVosQ0FBb0IsTUFBcEI7QUFDQSxjQUFZLE9BQVosQ0FBb0IsZUFBcEI7QUFDQSxTQUFPLE9BQVAsQ0FBZSxLQUFmO0FBQ0EsUUFBTSxPQUFOLENBQWMsU0FBZDtBQUNBLFlBQVUsT0FBVixDQUFrQixhQUFsQjs7QUFFQSxjQUFZLEtBQVo7QUFDRDs7O0FDekREOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTs7QUNGQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxT0E7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwTEEsSUFBTSxNQUFNLEtBQUssR0FBakI7QUFD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bGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG5cbmNvbnN0IEF1ZGlvQ29udGV4dCA9ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8wqB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KTtcbmNvbnN0IGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuY29uc3QgZnJhbWVTaXplID0gTWF0aC5mbG9vcigwLjAyMCAqIGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlKTtcbmNvbnN0IGhvcFNpemUgPSBNYXRoLmZsb29yKDAuMDA1ICogYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUpO1xuXG5uYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gIC5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KVxuICAudGhlbihpbml0KVxuICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIuc3RhY2spKTtcblxuZnVuY3Rpb24gaW5pdChzdHJlYW0pIHtcbiAgY29uc3Qgc291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG5cbiAgY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gICAgc291cmNlTm9kZTogc291cmNlLFxuICAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICB9KTtcblxuICBjb25zdCBzbGljZXIgPSBuZXcgbGZvLm9wZXJhdG9yLlNsaWNlcih7XG4gICAgZnJhbWVTaXplOiBmcmFtZVNpemUsXG4gICAgaG9wU2l6ZTogaG9wU2l6ZSxcbiAgICBjZW50ZXJlZFRpbWVUYWdzOiB0cnVlXG4gIH0pO1xuXG4gIGNvbnN0IHBvd2VyID0gbmV3IGxmby5vcGVyYXRvci5SbXMoe1xuICAgIHBvd2VyOiB0cnVlLFxuICB9KTtcblxuICBjb25zdCBzZWdtZW50ZXIgPSBuZXcgbGZvLm9wZXJhdG9yLlNlZ21lbnRlcih7XG4gICAgbG9nSW5wdXQ6IHRydWUsXG4gICAgZmlsdGVyT3JkZXI6IDUsXG4gICAgdGhyZXNob2xkOiA0LFxuICAgIG9mZlRocmVzaG9sZDogLUluZmluaXR5LFxuICAgIG1pbkludGVyOiAwLjEwMCxcbiAgICBtYXhEdXJhdGlvbjogMC4wMjAsXG4gIH0pO1xuXG4gIGNvbnN0IHdhdmVmb3JtRGlzcGxheSA9IG5ldyBsZm8uc2luay5XYXZlZm9ybURpc3BsYXkoe1xuICAgIGNhbnZhczogJyN3YXZlZm9ybScsXG4gIH0pO1xuXG4gIGNvbnN0IG1hcmtlckRpc3BsYXkgPSBuZXcgbGZvLnNpbmsuTWFya2VyRGlzcGxheSh7XG4gICAgY2FudmFzOiAnI21hcmtlcnMnLFxuICB9KTtcblxuICBuZXcgbGZvLnV0aWxzLkRpc3BsYXlTeW5jKHdhdmVmb3JtRGlzcGxheSwgbWFya2VyRGlzcGxheSk7XG5cbiAgYXVkaW9Jbk5vZGUuY29ubmVjdChzbGljZXIpO1xuICBhdWRpb0luTm9kZS5jb25uZWN0KHdhdmVmb3JtRGlzcGxheSk7XG4gIHNsaWNlci5jb25uZWN0KHBvd2VyKTtcbiAgcG93ZXIuY29ubmVjdChzZWdtZW50ZXIpO1xuICBzZWdtZW50ZXIuY29ubmVjdChtYXJrZXJEaXNwbGF5KTtcblxuICBhdWRpb0luTm9kZS5zdGFydCgpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMTBcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLWZpbml0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9nZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldFByb3RvdHlwZU9mKTtcblxudmFyIF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIpO1xuXG52YXIgX2dldE93blByb3BlcnR5RGVzY3JpcHRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgZGVzYyA9ICgwLCBfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yMi5kZWZhdWx0KShvYmplY3QsIHByb3BlcnR5KTtcblxuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHBhcmVudCA9ICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKG9iamVjdCk7XG5cbiAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHtcbiAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7XG5cbiAgICBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59OyIsInZhciBjb3JlICA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKVxuICAsICRKU09OID0gY29yZS5KU09OIHx8IChjb3JlLkpTT04gPSB7c3RyaW5naWZ5OiBKU09OLnN0cmluZ2lmeX0pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiAkSlNPTi5zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3VtZW50cyk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm1hdGgubG9nMTAnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk1hdGgubG9nMTA7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYubnVtYmVyLmlzLWZpbml0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuTnVtYmVyLmlzRmluaXRlOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICByZXR1cm4gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpe1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59OyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgcmVzdWx0ICAgICA9IGdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSBwSUUuZlxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpXG4gICwgQlJFQUsgICAgICAgPSB7fVxuICAsIFJFVFVSTiAgICAgID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUil7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59OyIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07IiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59OyIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHt9OyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7IiwidmFyIE1FVEEgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKVxuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBoYXMgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgc2V0RGVzYyAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaWQgICAgICAgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24oaXQpe1xuICBzZXREZXNjKGl0LCBNRVRBLCB7dmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9fSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZighaXNPYmplY3QoaXQpKXJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKXNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiAgICAgIE1FVEEsXG4gIE5FRUQ6ICAgICBmYWxzZSxcbiAgZmFzdEtleTogIGZhc3RLZXksXG4gIGdldFdlYWs6ICBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldFxuICAsIE9ic2VydmVyICA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXG4gICwgcHJvY2VzcyAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBQcm9taXNlICAgPSBnbG9iYWwuUHJvbWlzZVxuICAsIGlzTm9kZSAgICA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZShoZWFkKXtcbiAgICAgIGZuICAgPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICBpZihoZWFkKW5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmKHBhcmVudClwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmKGlzTm9kZSl7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxuICB9IGVsc2UgaWYoT2JzZXJ2ZXIpe1xuICAgIHZhciB0b2dnbGUgPSB0cnVlXG4gICAgICAsIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpe1xuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGZuKXtcbiAgICB2YXIgdGFzayA9IHtmbjogZm4sIG5leHQ6IHVuZGVmaW5lZH07XG4gICAgaWYobGFzdClsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmKCFoZWFkKXtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgJGFzc2lnbiAgPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGFMZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mXG4gICAgLCBpc0VudW0gICAgID0gcElFLmY7XG4gIHdoaWxlKGFMZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjsiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07IiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBnT1BOICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCB0b1N0cmluZyAgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG4iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59OyIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7IiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7IiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjLCBzYWZlKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXtcbiAgICBpZihzYWZlICYmIHRhcmdldFtrZXldKXRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7IiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59OyIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgU1BFQ0lFUyAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywgRCl7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3IsIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwidmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07IiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59OyIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpOyIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlOyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7IiwiLy8gMjAuMi4yLjIxIE1hdGgubG9nMTAoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgbG9nMTA6IGZ1bmN0aW9uIGxvZzEwKHgpe1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4xMDtcbiAgfVxufSk7IiwiLy8gMjAuMS4yLjIgTnVtYmVyLmlzRmluaXRlKG51bWJlcilcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIF9pc0Zpbml0ZSA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmlzRmluaXRlO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNGaW5pdGU6IGZ1bmN0aW9uIGlzRmluaXRlKGl0KXtcbiAgICByZXR1cm4gdHlwZW9mIGl0ID09ICdudW1iZXInICYmIF9pc0Zpbml0ZShpdCk7XG4gIH1cbn0pOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jylcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyl9KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTsiLCIvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG52YXIgdG9JT2JqZWN0ICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmY7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0lPYmplY3QoaXQpLCBrZXkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldH0pOyIsIiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2xhc3NvZiAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgJGV4cG9ydCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpc09iamVjdCAgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGFuSW5zdGFuY2UgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBmb3JPZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAsIHRhc2sgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBtaWNyb3Rhc2sgICAgICAgICAgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpXG4gICwgUFJPTUlTRSAgICAgICAgICAgID0gJ1Byb21pc2UnXG4gICwgVHlwZUVycm9yICAgICAgICAgID0gZ2xvYmFsLlR5cGVFcnJvclxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgJFByb21pc2UgICAgICAgICAgID0gZ2xvYmFsW1BST01JU0VdXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBpc05vZGUgICAgICAgICAgICAgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGVtcHR5ICAgICAgICAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBJbnRlcm5hbCwgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24oKXtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSAgICAgPSAkUHJvbWlzZS5yZXNvbHZlKDEpXG4gICAgICAsIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbihleGVjKXsgZXhlYyhlbXB0eSwgZW1wdHkpOyB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgc2FtZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24oYSwgYil7XG4gIC8vIHdpdGggbGlicmFyeSB3cmFwcGVyIHNwZWNpYWwgY2FzZVxuICByZXR1cm4gYSA9PT0gYiB8fCBhID09PSAkUHJvbWlzZSAmJiBiID09PSBXcmFwcGVyO1xufTtcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICByZXR1cm4gc2FtZUNvbnN0cnVjdG9yKCRQcm9taXNlLCBDKVxuICAgID8gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgOiBuZXcgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbnZhciBQcm9taXNlQ2FwYWJpbGl0eSA9IEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbigkJHJlc29sdmUsICQkcmVqZWN0KXtcbiAgICBpZihyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ICA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCAgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn07XG52YXIgcGVyZm9ybSA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIGV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4ge2Vycm9yOiBlfTtcbiAgfVxufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbihwcm9taXNlLCBpc1JlamVjdCl7XG4gIGlmKHByb21pc2UuX24pcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBvayAgICA9IHByb21pc2UuX3MgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0aW9uKXtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWxcbiAgICAgICAgLCByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZVxuICAgICAgICAsIHJlamVjdCAgPSByZWFjdGlvbi5yZWplY3RcbiAgICAgICAgLCBkb21haW4gID0gcmVhY3Rpb24uZG9tYWluXG4gICAgICAgICwgcmVzdWx0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoaGFuZGxlcil7XG4gICAgICAgICAgaWYoIW9rKXtcbiAgICAgICAgICAgIGlmKHByb21pc2UuX2ggPT0gMilvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihoYW5kbGVyID09PSB0cnVlKXJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYoZG9tYWluKWRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKXtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpe1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3ZcbiAgICAgICwgYWJydXB0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UpKXtcbiAgICAgIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoaXNOb2RlKXtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pe1xuICAgICAgICAgIGhhbmRsZXIoe3Byb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWV9KTtcbiAgICAgICAgfSBlbHNlIGlmKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3Ipe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZihhYnJ1cHQpdGhyb3cgYWJydXB0LmVycm9yO1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgaWYocHJvbWlzZS5faCA9PSAxKXJldHVybiBmYWxzZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jXG4gICAgLCBpICAgICA9IDBcbiAgICAsIHJlYWN0aW9uO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdGlvbiA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3Rpb24uZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3Rpb24ucHJvbWlzZSkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmKGlzTm9kZSl7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpe1xuICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92fSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZihwcm9taXNlLl9kKXJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZighcHJvbWlzZS5fYSlwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYocHJvbWlzZSA9PT0gdmFsdWUpdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoKGUpe1xuICAgICRyZWplY3QuY2FsbCh7X3c6IHByb21pc2UsIF9kOiBmYWxzZX0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZighVVNFX05BVElWRSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpe1xuICAgICAgdmFyIHJlYWN0aW9uICAgID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayAgICAgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgICA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX2EpdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX3Mpbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHByb21pc2UgID0gbmV3IEludGVybmFsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCAgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtQcm9taXNlOiAkUHJvbWlzZX0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpXG4gICAgICAsICQkcmVqZWN0ICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIC8vIGluc3RhbmNlb2YgaW5zdGVhZCBvZiBpbnRlcm5hbCBzbG90IGNoZWNrIGJlY2F1c2Ugd2Ugc2hvdWxkIGZpeCBpdCB3aXRob3V0IHJlcGxhY2VtZW50IG5hdGl2ZSBQcm9taXNlIGNvcmVcbiAgICBpZih4IGluc3RhbmNlb2YgJFByb21pc2UgJiYgc2FtZUNvbnN0cnVjdG9yKHguY29uc3RydWN0b3IsIHRoaXMpKXJldHVybiB4O1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZXNvbHZlICA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICAkJHJlc29sdmUoeCk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpe1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICAgICAgPSB0aGlzXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZXNvbHZlICAgID0gY2FwYWJpbGl0eS5yZXNvbHZlXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgdmFyIHZhbHVlcyAgICA9IFtdXG4gICAgICAgICwgaW5kZXggICAgID0gMFxuICAgICAgICAsIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICB2YXIgJGluZGV4ICAgICAgICA9IGluZGV4KytcbiAgICAgICAgICAsIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICBpZihhbHJlYWR5Q2FsbGVkKXJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkICA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYoYWJydXB0KXJlamVjdChhYnJ1cHQuZXJyb3IpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgREVTQ1JJUFRPUlMgICAgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIE1FVEEgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWVxuICAsICRmYWlscyAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCB1aWQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgd2tzICAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgd2tzRGVmaW5lICAgICAgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2tleW9mJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgX2NyZWF0ZSAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBnT1BORXh0ICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpXG4gICwgJEdPUEQgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgJERQICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsICRrZXlzICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUEQgICAgICAgICAgID0gJEdPUEQuZlxuICAsIGRQICAgICAgICAgICAgID0gJERQLmZcbiAgLCBnT1BOICAgICAgICAgICA9IGdPUE5FeHQuZlxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsICRKU09OICAgICAgICAgID0gZ2xvYmFsLkpTT05cbiAgLCBfc3RyaW5naWZ5ICAgICA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeVxuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBISURERU4gICAgICAgICA9IHdrcygnX2hpZGRlbicpXG4gICwgVE9fUFJJTUlUSVZFICAgPSB3a3MoJ3RvUHJpbWl0aXZlJylcbiAgLCBpc0VudW0gICAgICAgICA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIE9QU3ltYm9scyAgICAgID0gc2hhcmVkKCdvcC1zeW1ib2xzJylcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdFtQUk9UT1RZUEVdXG4gICwgVVNFX05BVElWRSAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgUU9iamVjdCAgICAgICAgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIGRQKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvKSRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSlcbiAgICAsIGkgICAgPSAwXG4gICAgLCBsID0ga2V5cy5sZW5ndGhcbiAgICAsIGtleTtcbiAgd2hpbGUobCA+IGkpJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIGl0ICA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ09QTih0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBJU19PUCAgPSBpdCA9PT0gT2JqZWN0UHJvdG9cbiAgICAsIG5hbWVzICA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIVVTRV9OQVRJVkUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZih0aGlzID09PSBPYmplY3RQcm90bykkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKXNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0fSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mICA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKXtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24obmFtZSl7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfVxufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbmZvcih2YXIgc3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzKHN5bWJvbHNbaSsrXSk7XG5cbmZvcih2YXIgc3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3NEZWZpbmUoc3ltYm9sc1tpKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICBpZihpc1N5bWJvbChrZXkpKXJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgICB0aHJvdyBUeXBlRXJyb3Ioa2V5ICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbigpe1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7YTogU30pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgdmFyIGFyZ3MgPSBbaXRdXG4gICAgICAsIGkgICAgPSAxXG4gICAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYodHlwZW9mIHJlcGxhY2VyID09ICdmdW5jdGlvbicpJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZighaXNTeW1ib2wodmFsdWUpKXJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7IiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdhc3luY0l0ZXJhdG9yJyk7IiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgSXRlcmF0b3JzICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSloaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJjb25zdCBtaW4gPSBNYXRoLm1pbjtcbmNvbnN0IG1heCA9IE1hdGgubWF4O1xuXG5mdW5jdGlvbiBjbGlwKHZhbHVlLCBsb3dlciA9IC1JbmZpbml0eSwgdXBwZXIgPSArSW5maW5pdHkpIHtcbiAgcmV0dXJuIG1heChsb3dlciwgbWluKHVwcGVyLCB2YWx1ZSkpXG59XG5cbi8qKlxuICogRGljdGlvbm5hcnkgb2YgdGhlIGF2YWlsYWJsZSB0eXBlcy4gRWFjaCBrZXkgY29ycmVzcG9uZCB0byB0aGUgdHlwZSBvZiB0aGVcbiAqIGltcGxlbWVudGVkIHBhcmFtIHdoaWxlIHRoZSBjb3JyZXNwb25kaW5nIG9iamVjdCB2YWx1ZSBzaG91bGQgdGhlXG4gKiB7QGxpbmsgYHBhcmFtRGVmaW5pdGlvbmB9IG9mIHRoZSBkZWZpbmVkIHR5cGUuXG4gKlxuICogdHlwZWRlZiB7T2JqZWN0fSBwYXJhbVRlbXBsYXRlc1xuICogQHR5cGUge09iamVjdDxTdHJpbmcsIHBhcmFtVGVtcGxhdGU+fVxuICovXG5cbi8qKlxuICogRGVmaW5pdGlvbiBvZiBhIHBhcmFtZXRlci4gVGhlIGRlZmluaXRpb24gc2hvdWxkIGF0IGxlYXN0IGNvbnRhaW4gdGhlIGVudHJpZXNcbiAqIGB0eXBlYCBhbmQgYGRlZmF1bHRgLiBFdmVyeSBwYXJhbWV0ZXIgY2FuIGFsc28gYWNjZXB0IG9wdGlvbm5hbCBjb25maWd1cmF0aW9uXG4gKiBlbnRyaWVzIGBjb25zdGFudGAgYW5kIGBtZXRhc2AuXG4gKiBBdmFpbGFibGUgZGVmaW5pdGlvbnMgYXJlOlxuICogLSB7QGxpbmsgYm9vbGVhbkRlZmluaXRpb259XG4gKiAtIHtAbGluayBpbnRlZ2VyRGVmaW5pdGlvbn1cbiAqIC0ge0BsaW5rIGZsb2F0RGVmaW5pdGlvbn1cbiAqIC0ge0BsaW5rIHN0cmluZ0RlZmluaXRpb259XG4gKiAtIHtAbGluayBlbnVtRGVmaW5pdGlvbn1cbiAqXG4gKiB0eXBlZGVmIHtPYmplY3R9IHBhcmFtRGVmaW5pdGlvblxuICogQHByb3BlcnR5IHtTdHJpbmd9IHR5cGUgLSBUeXBlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gKiBAcHJvcGVydHkge01peGVkfSBkZWZhdWx0IC0gRGVmYXVsdCB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyIGlmIG5vXG4gKiAgaW5pdGlhbGl6YXRpb24gdmFsdWUgaXMgcHJvdmlkZWQuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtjb25zdGFudD1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIHBhcmFtZXRlciBjYW4gYmUgY2hhbmdlXG4gKiAgYWZ0ZXIgaXRzIGluaXRpYWxpemF0aW9uLlxuICogQHByb3BlcnR5IHtPYmplY3R9IFttZXRhcz1udWxsXSAtIEFueSB1c2VyIGRlZmluZWQgZGF0YSBhc3NvY2lhdGVkIHRvIHRoZVxuICogIHBhcmFtZXRlciB0aGF0IGNvdWxzIGJlIHVzZWZ1bGwgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IGJvb2xlYW5EZWZpbml0aW9uXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbdHlwZT0nYm9vbGVhbiddIC0gRGVmaW5lIGEgYm9vbGVhbiBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVmYXVsdCAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbY29uc3RhbnQ9ZmFsc2VdIC0gRGVmaW5lIGlmIHRoZSBwYXJhbWV0ZXIgaXMgY29uc3RhbnQuXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBbbWV0YXM9e31dIC0gT3B0aW9ubmFsIG1ldGFkYXRhIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBib29sZWFuOiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmFsdWUgZm9yIGJvb2xlYW4gcGFyYW0gXCIke25hbWV9XCI6ICR7dmFsdWV9YCk7XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IGludGVnZXJEZWZpbml0aW9uXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbdHlwZT0naW50ZWdlciddIC0gRGVmaW5lIGEgYm9vbGVhbiBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVmYXVsdCAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbbWluPS1JbmZpbml0eV0gLSBNaW5pbXVtIHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW21heD0rSW5maW5pdHldIC0gTWF4aW11bSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IFtjb25zdGFudD1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIHBhcmFtZXRlciBpcyBjb25zdGFudC5cbiAgICogQHByb3BlcnR5IHtPYmplY3R9IFttZXRhcz17fV0gLSBPcHRpb25uYWwgbWV0YWRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG4gIGludGVnZXI6IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAoISh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSBmb3IgaW50ZWdlciBwYXJhbSBcIiR7bmFtZX1cIjogJHt2YWx1ZX1gKTtcblxuICAgICAgcmV0dXJuIGNsaXAodmFsdWUsIGRlZmluaXRpb24ubWluLCBkZWZpbml0aW9uLm1heCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBmbG9hdERlZmluaXRpb25cbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFt0eXBlPSdmbG9hdCddIC0gRGVmaW5lIGEgYm9vbGVhbiBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVmYXVsdCAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbbWluPS1JbmZpbml0eV0gLSBNaW5pbXVtIHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW21heD0rSW5maW5pdHldIC0gTWF4aW11bSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IFtjb25zdGFudD1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIHBhcmFtZXRlciBpcyBjb25zdGFudC5cbiAgICogQHByb3BlcnR5IHtPYmplY3R9IFttZXRhcz17fV0gLSBPcHRpb25uYWwgbWV0YWRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG4gIGZsb2F0OiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHzCoHZhbHVlICE9PSB2YWx1ZSkgLy8gcmVqZWN0IE5hTlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmFsdWUgZm9yIGZsb2F0IHBhcmFtIFwiJHtuYW1lfVwiOiAke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gY2xpcCh2YWx1ZSwgZGVmaW5pdGlvbi5taW4sIGRlZmluaXRpb24ubWF4KTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IHN0cmluZ0RlZmluaXRpb25cbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFt0eXBlPSdzdHJpbmcnXSAtIERlZmluZSBhIGJvb2xlYW4gcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlZmF1bHQgLSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnN0YW50PWZhbHNlXSAtIERlZmluZSBpZiB0aGUgcGFyYW1ldGVyIGlzIGNvbnN0YW50LlxuICAgKiBAcHJvcGVydHkge09iamVjdH0gW21ldGFzPXt9XSAtIE9wdGlvbm5hbCBtZXRhZGF0YSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgc3RyaW5nOiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSBmb3Igc3RyaW5nIHBhcmFtIFwiJHtuYW1lfVwiOiAke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBlbnVtRGVmaW5pdGlvblxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gW3R5cGU9J2VudW0nXSAtIERlZmluZSBhIGJvb2xlYW4gcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlZmF1bHQgLSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGxpc3QgLSBQb3NzaWJsZSB2YWx1ZXMgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbY29uc3RhbnQ9ZmFsc2VdIC0gRGVmaW5lIGlmIHRoZSBwYXJhbWV0ZXIgaXMgY29uc3RhbnQuXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBbbWV0YXM9e31dIC0gT3B0aW9ubmFsIG1ldGFkYXRhIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBlbnVtOiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnLCAnbGlzdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAoZGVmaW5pdGlvbi5saXN0LmluZGV4T2YodmFsdWUpID09PSAtMSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZhbHVlIGZvciBlbnVtIHBhcmFtIFwiJHtuYW1lfVwiOiAke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBhbnlEZWZpbml0aW9uXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbdHlwZT0nZW51bSddIC0gRGVmaW5lIGEgcGFyYW1ldGVyIG9mIGFueSB0eXBlLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlZmF1bHQgLSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnN0YW50PWZhbHNlXSAtIERlZmluZSBpZiB0aGUgcGFyYW1ldGVyIGlzIGNvbnN0YW50LlxuICAgKiBAcHJvcGVydHkge09iamVjdH0gW21ldGFzPXt9XSAtIE9wdGlvbm5hbCBtZXRhZGF0YSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgYW55OiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgLy8gbm8gY2hlY2sgYXMgaXQgY2FuIGhhdmUgYW55IHR5cGUuLi5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBwYXJhbVRlbXBsYXRlcyBmcm9tICcuL3BhcmFtVGVtcGxhdGVzJztcblxuLyoqXG4gKiBHZW5lcmljIGNsYXNzIGZvciB0eXBlZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtBcnJheX0gZGVmaW5pdGlvblRlbXBsYXRlIC0gTGlzdCBvZiBtYW5kYXRvcnkga2V5cyBpbiB0aGUgcGFyYW1cbiAqICBkZWZpbml0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHlwZUNoZWNrRnVuY3Rpb24gLSBGdW5jdGlvbiB0byBiZSB1c2VkIGluIG9yZGVyIHRvIGNoZWNrXG4gKiAgdGhlIHZhbHVlIGFnYWluc3QgdGhlIHBhcmFtIGRlZmluaXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmaW5pdGlvbiAtIERlZmluaXRpb24gb2YgdGhlIHBhcmFtZXRlci5cbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gVmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIFBhcmFtIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGVmaW5pdGlvblRlbXBsYXRlLCB0eXBlQ2hlY2tGdW5jdGlvbiwgZGVmaW5pdGlvbiwgdmFsdWUpIHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGUuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChkZWZpbml0aW9uLmhhc093blByb3BlcnR5KGtleSkgPT09IGZhbHNlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZGVmaW5pdGlvbiBmb3IgcGFyYW0gXCIke25hbWV9XCIsICR7a2V5fSBpcyBub3QgZGVmaW5lZGApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnR5cGUgPSBkZWZpbml0aW9uLnR5cGU7XG4gICAgdGhpcy5kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblxuICAgIGlmICh0aGlzLmRlZmluaXRpb24ubnVsbGFibGUgPT09IHRydWUgJiYgdmFsdWUgPT09IG51bGwpXG4gICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICBlbHNlXG4gICAgICB0aGlzLnZhbHVlID0gdHlwZUNoZWNrRnVuY3Rpb24odmFsdWUsIGRlZmluaXRpb24sIG5hbWUpO1xuICAgIHRoaXMuX3R5cGVDaGVja0Z1bmN0aW9uID0gdHlwZUNoZWNrRnVuY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICogQHJldHVybiB7TWl4ZWR9XG4gICAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gTmV3IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IC0gYHRydWVgIGlmIHRoZSBwYXJhbSBoYXMgYmVlbiB1cGRhdGVkLCBmYWxzZSBvdGhlcndpc2VcbiAgICogIChlLmcuIGlmIHRoZSBwYXJhbWV0ZXIgYWxyZWFkeSBoYWQgdGhpcyB2YWx1ZSkuXG4gICAqL1xuICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmRlZmluaXRpb24uY29uc3RhbnQgPT09IHRydWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXNzaWduZW1lbnQgdG8gY29uc3RhbnQgcGFyYW0gXCIke3RoaXMubmFtZX1cImApO1xuXG4gICAgaWYgKCEodGhpcy5kZWZpbml0aW9uLm51bGxhYmxlID09PSB0cnVlICYmIHZhbHVlID09PSBudWxsKSlcbiAgICAgIHZhbHVlID0gdGhpcy5fdHlwZUNoZWNrRnVuY3Rpb24odmFsdWUsIHRoaXMuZGVmaW5pdGlvbiwgdGhpcy5uYW1lKTtcblxuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cblxuLyoqXG4gKiBCYWcgb2YgcGFyYW1ldGVycy4gTWFpbiBpbnRlcmZhY2Ugb2YgdGhlIGxpYnJhcnlcbiAqL1xuY2xhc3MgUGFyYW1ldGVyQmFnIHtcbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZpbml0aW9ucykge1xuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgcGFyYW1ldGVycy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3Q8U3RyaW5nLCBQYXJhbT59XG4gICAgICogQG5hbWUgX3BhcmFtc1xuICAgICAqIEBtZW1iZXJvZiBQYXJhbWV0ZXJCYWdcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgZGVmaW5pdGlvbnMgd2l0aCBpbml0IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3Q8U3RyaW5nLCBwYXJhbURlZmluaXRpb24+fVxuICAgICAqIEBuYW1lIF9kZWZpbml0aW9uc1xuICAgICAqIEBtZW1iZXJvZiBQYXJhbWV0ZXJCYWdcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX2RlZmluaXRpb25zID0gZGVmaW5pdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGdsb2JhbCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7U2V0fVxuICAgICAqIEBuYW1lIF9nbG9iYWxMaXN0ZW5lcnNcbiAgICAgKiBAbWVtYmVyb2YgUGFyYW1ldGVyQmFnXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9nbG9iYWxMaXN0ZW5lcnMgPSBuZXcgU2V0KCk7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHBhcmFtcyBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0PFN0cmluZywgU2V0Pn1cbiAgICAgKiBAbmFtZSBfcGFyYW1zTGlzdGVuZXJzXG4gICAgICogQG1lbWJlcm9mIFBhcmFtZXRlckJhZ1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fcGFyYW1zTGlzdGVuZXJzID0ge307XG5cbiAgICAvLyBpbml0aWFsaXplIGVtcHR5IFNldCBmb3IgZWFjaCBwYXJhbVxuICAgIGZvciAobGV0IG5hbWUgaW4gcGFyYW1zKVxuICAgICAgdGhpcy5fcGFyYW1zTGlzdGVuZXJzW25hbWVdID0gbmV3IFNldCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZ2l2ZW4gZGVmaW5pdGlvbnMgYWxvbmcgd2l0aCB0aGUgaW5pdGlhbGl6YXRpb24gdmFsdWVzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXREZWZpbml0aW9ucyhuYW1lID0gbnVsbCkge1xuICAgIGlmIChuYW1lICE9PSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb25zW25hbWVdO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcmV0dXJuIHtNaXhlZH0gLSBWYWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgZ2V0KG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuX3BhcmFtc1tuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHJlYWQgcHJvcGVydHkgdmFsdWUgb2YgdW5kZWZpbmVkIHBhcmFtZXRlciBcIiR7bmFtZX1cImApO1xuXG4gICAgcmV0dXJuIHRoaXMuX3BhcmFtc1tuYW1lXS52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHZhbHVlIG9mIGEgcGFyYW1ldGVyLiBJZiB0aGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlciBpcyB1cGRhdGVkXG4gICAqIChha2EgaWYgcHJldmlvdXMgdmFsdWUgaXMgZGlmZmVyZW50IGZyb20gbmV3IHZhbHVlKSBhbGwgcmVnaXN0ZXJlZFxuICAgKiBjYWxsYmFja3MgYXJlIHJlZ2lzdGVyZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIFZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEByZXR1cm4ge01peGVkfSAtIE5ldyB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgc2V0KG5hbWUsIHZhbHVlKSB7XG4gICAgY29uc3QgcGFyYW0gPSB0aGlzLl9wYXJhbXNbbmFtZV07XG4gICAgY29uc3QgdXBkYXRlZCA9IHBhcmFtLnNldFZhbHVlKHZhbHVlKTtcbiAgICB2YWx1ZSA9IHBhcmFtLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodXBkYXRlZCkge1xuICAgICAgY29uc3QgbWV0YXMgPSBwYXJhbS5kZWZpbml0aW9uLm1ldGFzO1xuICAgICAgLy8gdHJpZ2dlciBnbG9iYWwgbGlzdGVuZXJzXG4gICAgICBmb3IgKGxldCBsaXN0ZW5lciBvZiB0aGlzLl9nbG9iYWxMaXN0ZW5lcnMpXG4gICAgICAgIGxpc3RlbmVyKG5hbWUsIHZhbHVlLCBtZXRhcyk7XG5cbiAgICAgIC8vIHRyaWdnZXIgcGFyYW0gbGlzdGVuZXJzXG4gICAgICBmb3IgKGxldCBsaXN0ZW5lciBvZiB0aGlzLl9wYXJhbXNMaXN0ZW5lcnNbbmFtZV0pXG4gICAgICAgIGxpc3RlbmVyKHZhbHVlLCBtZXRhcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZSBpZiB0aGUgYG5hbWVgIHBhcmFtZXRlciBleGlzdHMgb3Igbm90LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGhhcyhuYW1lKSB7XG4gICAgcmV0dXJuICh0aGlzLl9wYXJhbXNbbmFtZV0pID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGEgcGFyYW1ldGVyIHRvIGl0cyBpbml0IHZhbHVlLiBSZXNldCBhbGwgcGFyYW1ldGVycyBpZiBubyBhcmd1bWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lPW51bGxdIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyIHRvIHJlc2V0LlxuICAgKi9cbiAgcmVzZXQobmFtZSA9IG51bGwpIHtcbiAgICBpZiAobmFtZSAhPT0gbnVsbClcbiAgICAgIHRoaXMuc2V0KG5hbWUsIHBhcmFtLmRlZmluaXRpb24uaW5pdFZhbHVlKTtcbiAgICBlbHNlXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl9wYXJhbXMpLmZvckVhY2goKG5hbWUpID0+IHRoaXMucmVzZXQobmFtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBjYWxsYmFjayBQYXJhbWV0ZXJCYWd+bGlzdGVuZXJDYWxsYmFja1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFBhcmFtZXRlciBuYW1lLlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIFVwZGF0ZWQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtPYmplY3R9IFttZXRhPV0gLSBHaXZlbiBtZXRhIGRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG5cbiAgLyoqXG4gICAqIEFkZCBsaXN0ZW5lciB0byBhbGwgcGFyYW0gdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJCYWd+bGlzdGVuZXJDYWxsYWNrfSBjYWxsYmFjayAtIExpc3RlbmVyIHRvIHJlZ2lzdGVyLlxuICAgKi9cbiAgYWRkTGlzdGVuZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLl9nbG9iYWxMaXN0ZW5lcnMuYWRkKGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbGlzdGVuZXIgZnJvbSBhbGwgcGFyYW0gY2hhbmdlcy5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJCYWd+bGlzdGVuZXJDYWxsYWNrfSBjYWxsYmFjayAtIExpc3RlbmVyIHRvIHJlbW92ZS4gSWZcbiAgICogIGBudWxsYCByZW1vdmUgYWxsIGxpc3RlbmVycy5cbiAgICovXG4gIHJlbW92ZUxpc3RlbmVyKGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmIChjYWxsYmFjayA9PT0gbnVsbClcbiAgICAgIHRoaXMuX2dsb2JhbExpc3RlbmVycy5jbGVhcigpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuX2dsb2JhbExpc3RlbmVycy5kZWxldGUoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIEBjYWxsYmFjayBQYXJhbWV0ZXJCYWd+cGFyYW1MaXN0ZW5lckNhbGxhY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSBVcGRhdGVkIHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbbWV0YT1dIC0gR2l2ZW4gbWV0YSBkYXRhIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBBZGQgbGlzdGVuZXIgdG8gYSBnaXZlbiBwYXJhbSB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFBhcmFtZXRlciBuYW1lLlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlckJhZ35wYXJhbUxpc3RlbmVyQ2FsbGFja30gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBhcHBseVxuICAgKiAgd2hlbiB0aGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlciBjaGFuZ2VzLlxuICAgKi9cbiAgYWRkUGFyYW1MaXN0ZW5lcihuYW1lLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX3BhcmFtc0xpc3RlbmVyc1tuYW1lXS5hZGQoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBsaXN0ZW5lciBmcm9tIGEgZ2l2ZW4gcGFyYW0gdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBQYXJhbWV0ZXIgbmFtZS5cbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJCYWd+cGFyYW1MaXN0ZW5lckNhbGxhY2t9IGNhbGxiYWNrIC0gTGlzdGVuZXIgdG8gcmVtb3ZlLlxuICAgKiAgSWYgYG51bGxgIHJlbW92ZSBhbGwgbGlzdGVuZXJzLlxuICAgKi9cbiAgcmVtb3ZlUGFyYW1MaXN0ZW5lcihuYW1lLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoY2FsbGJhY2sgPT09IG51bGwpXG4gICAgICB0aGlzLl9wYXJhbXNMaXN0ZW5lcnNbbmFtZV0uY2xlYXIoKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLl9wYXJhbXNMaXN0ZW5lcnNbbmFtZV0uZGVsZXRlKGNhbGxiYWNrKTtcbiAgfVxufVxuXG4vKipcbiAqIEZhY3RvcnkgZm9yIHRoZSBgUGFyYW1ldGVyQmFnYCBjbGFzcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxTdHJpbmcsIHBhcmFtRGVmaW5pdGlvbj59IGRlZmluaXRpb25zIC0gT2JqZWN0IGRlc2NyaWJpbmcgdGhlXG4gKiAgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0PFN0cmluZywgTWl4ZWQ+fSB2YWx1ZXMgLSBJbml0aWFsaXphdGlvbiB2YWx1ZXMgZm9yIHRoZVxuICogIHBhcmFtZXRlcnMuXG4gKiBAcmV0dXJuIHtQYXJhbWV0ZXJCYWd9XG4gKi9cbmZ1bmN0aW9uIHBhcmFtZXRlcnMoZGVmaW5pdGlvbnMsIHZhbHVlcyA9IHt9KSB7XG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xuXG4gIGZvciAobGV0IG5hbWUgaW4gdmFsdWVzKSB7XG4gICAgaWYgKGRlZmluaXRpb25zLmhhc093blByb3BlcnR5KG5hbWUpID09PSBmYWxzZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwYXJhbSBcIiR7bmFtZX1cImApO1xuICB9XG5cbiAgZm9yIChsZXQgbmFtZSBpbiBkZWZpbml0aW9ucykge1xuICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkobmFtZSkgPT09IHRydWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcIiR7bmFtZX1cIiBhbHJlYWR5IGRlZmluZWRgKTtcblxuICAgIGNvbnN0IGRlZmluaXRpb24gPSBkZWZpbml0aW9uc1tuYW1lXTtcblxuICAgIGlmICghcGFyYW1UZW1wbGF0ZXNbZGVmaW5pdGlvbi50eXBlXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwYXJhbSB0eXBlIFwiJHtkZWZpbml0aW9uLnR5cGV9XCJgKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGRlZmluaXRpb25UZW1wbGF0ZSxcbiAgICAgIHR5cGVDaGVja0Z1bmN0aW9uXG4gICAgfSA9IHBhcmFtVGVtcGxhdGVzW2RlZmluaXRpb24udHlwZV07XG5cbiAgICBsZXQgdmFsdWU7XG5cbiAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KG5hbWUpID09PSB0cnVlKVxuICAgICAgdmFsdWUgPSB2YWx1ZXNbbmFtZV07XG4gICAgZWxzZVxuICAgICAgdmFsdWUgPSBkZWZpbml0aW9uLmRlZmF1bHQ7XG5cbiAgICAvLyBzdG9yZSBpbml0IHZhbHVlIGluIGRlZmluaXRpb25cbiAgICBkZWZpbml0aW9uLmluaXRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKCF0eXBlQ2hlY2tGdW5jdGlvbiB8fMKgIWRlZmluaXRpb25UZW1wbGF0ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwYXJhbSB0eXBlIGRlZmluaXRpb24gXCIke2RlZmluaXRpb24udHlwZX1cImApO1xuXG4gICAgcGFyYW1zW25hbWVdID0gbmV3IFBhcmFtKG5hbWUsIGRlZmluaXRpb25UZW1wbGF0ZSwgdHlwZUNoZWNrRnVuY3Rpb24sIGRlZmluaXRpb24sIHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUGFyYW1ldGVyQmFnKHBhcmFtcywgZGVmaW5pdGlvbnMpO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVyIGEgbmV3IHR5cGUgZm9yIHRoZSBgcGFyYW1ldGVyc2AgZmFjdG9yeS5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlTmFtZSAtIFZhbHVlIHRoYXQgd2lsbCBiZSBhdmFpbGFibGUgYXMgdGhlIGB0eXBlYCBvZiBhXG4gKiAgcGFyYW0gZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSB7cGFyYW1ldGVyRGVmaW5pdGlvbn0gcGFyYW1ldGVyRGVmaW5pdGlvbiAtIE9iamVjdCBkZXNjcmliaW5nIHRoZVxuICogIHBhcmFtZXRlci5cbiAqL1xucGFyYW1ldGVycy5kZWZpbmVUeXBlID0gZnVuY3Rpb24odHlwZU5hbWUsIHBhcmFtZXRlckRlZmluaXRpb24pIHtcbiAgcGFyYW1UZW1wbGF0ZXNbdHlwZU5hbWVdID0gcGFyYW1ldGVyRGVmaW5pdGlvbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycztcbiIsImV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJyV2ZXJzaW9uJSc7XG5cbmltcG9ydCAqIGFzIF9jb3JlIGZyb20gJy4uL2NvcmUnO1xuZXhwb3J0IGNvbnN0IGNvcmUgPSBfY29yZTtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBvcGVyYXRvciB9IGZyb20gJy4uL2NvbW1vbi9vcGVyYXRvci9fbmFtZXNwYWNlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXRpbHMgfSBmcm9tICcuL3V0aWxzL19uYW1lc3BhY2UnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzb3VyY2UgfSBmcm9tICcuL3NvdXJjZS9fbmFtZXNwYWNlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc2luayB9IGZyb20gJy4vc2luay9fbmFtZXNwYWNlJztcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IGNvbW1vbkRlZmluaXRpb25zID0ge1xuICBtaW46IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IC0xLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBtYXg6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IDEsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIHdpZHRoOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDMwMCxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgaGVpZ2h0OiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDE1MCxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgY29udGFpbmVyOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgY2FudmFzOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbn07XG5cbmNvbnN0IGhhc0R1cmF0aW9uRGVmaW5pdGlvbnMgPSB7XG4gIGR1cmF0aW9uOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBtaW46IDAsXG4gICAgbWF4OiArSW5maW5pdHksXG4gICAgZGVmYXVsdDogMSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgcmVmZXJlbmNlVGltZToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMCxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbn07XG5cbi8qKlxuICogQmFzZSBjbGFzcyB0byBleHRlbmQgaW4gb3JkZXIgdG8gY3JlYXRlIGdyYXBoaWMgc2lua3MuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJ3YXJuaW5nXCI+X1RoaXMgY2xhc3Mgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYWJzdHJhY3QgYW5kIG9ubHlcbiAqIGJlIHVzZWQgdG8gYmUgZXh0ZW5kZWQuXzwvc3Bhbj5cbiAqXG4gKiBAdG9kbyAtIGZpeCBmbG9hdCByb3VuZGluZyBlcnJvcnMgKHByb2R1Y2UgZGVjYXlzIGluIHN5bmMgZHJhd3MpXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2lua1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tMV0gLSBNaW5pbXVtIHZhbHVlIHJlcHJlc2VudGVkIGluIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MV0gLSBEdXJhdGlvbiAoaW4gc2Vjb25kcykgcmVwcmVzZW50ZWQgaW5cbiAqICB0aGUgY2FudmFzLiBUaGlzIHBhcmFtZXRlciBvbmx5IGV4aXN0cyBmb3Igb3BlcmF0b3JzIHRoYXQgZGlzcGxheSBzZXZlcmFsXG4gKiAgY29uc2VjdXRpdmUgZnJhbWVzIG9uIHRoZSBjYW52YXMuIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yZWZlcmVuY2VUaW1lPW51bGxdIC0gT3B0aW9ubmFsIHJlZmVyZW5jZSB0aW1lIHRoZVxuICogIGRpc3BsYXkgc2hvdWxkIGNvbnNpZGVyZXIgYXMgdGhlIG9yaWdpbi4gSXMgb25seSB1c2VmdWxsIHdoZW4gc3luY2hyb25pemluZ1xuICogIHNldmVyYWwgZGlzcGxheSB1c2luZyB0aGUgYERpc3BsYXlTeW5jYCBjbGFzcy4gVGhpcyBwYXJhbWV0ZXIgb25seSBleGlzdHNcbiAqICBmb3Igb3BlcmF0b3JzIHRoYXQgZGlzcGxheSBzZXZlcmFsIGNvbnNlY3V0aXZlIGZyYW1lcyBvbiB0aGUgY2FudmFzLlxuICovXG5jbGFzcyBCYXNlRGlzcGxheSBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihkZWZzLCBvcHRpb25zID0ge30sIGhhc0R1cmF0aW9uID0gdHJ1ZSkge1xuICAgIGxldCBjb21tb25EZWZzO1xuXG4gICAgaWYgKGhhc0R1cmF0aW9uKVxuICAgICAgY29tbW9uRGVmcyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vbkRlZmluaXRpb25zLCBoYXNEdXJhdGlvbkRlZmluaXRpb25zKTtcbiAgICBlbHNlXG4gICAgICBjb21tb25EZWZzID0gY29tbW9uRGVmaW5pdGlvbnNcblxuICAgIGNvbnN0IGRlZmluaXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uRGVmcywgZGVmcyk7XG5cbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCdjYW52YXMnKSA9PT0gbnVsbCAmJiB0aGlzLnBhcmFtcy5nZXQoJ2NvbnRhaW5lcicpID09PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBhcmFtZXRlcjogYGNhbnZhc2Agb3IgYGNvbnRhaW5lcmAgbm90IGRlZmluZWQnKTtcblxuICAgIGNvbnN0IGNhbnZhc1BhcmFtID0gdGhpcy5wYXJhbXMuZ2V0KCdjYW52YXMnKTtcbiAgICBjb25zdCBjb250YWluZXJQYXJhbSA9IHRoaXMucGFyYW1zLmdldCgnY29udGFpbmVyJyk7XG5cbiAgICAvLyBwcmVwYXJlIGNhbnZhc1xuICAgIGlmIChjYW52YXNQYXJhbSkge1xuICAgICAgaWYgKHR5cGVvZiBjYW52YXNQYXJhbSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjYW52YXNQYXJhbSk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzUGFyYW07XG4gICAgfSBlbHNlIGlmIChjb250YWluZXJQYXJhbSkge1xuICAgICAgbGV0IGNvbnRhaW5lcjtcblxuICAgICAgaWYgKHR5cGVvZiBjb250YWluZXJQYXJhbSA9PT0gJ3N0cmluZycpXG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyUGFyYW0pO1xuICAgICAgZWxzZVxuICAgICAgICBjb250YWluZXIgPSBjb250YWluZXJQYXJhbTtcblxuICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgfVxuXG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuY2FjaGVkQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5jYWNoZWRDdHggPSB0aGlzLmNhY2hlZENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgdGhpcy5wcmV2aW91c0ZyYW1lID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gaGFzRHVyYXRpb24gPyB0aGlzLnBhcmFtcy5nZXQoJ3JlZmVyZW5jZVRpbWUnKSA6IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBJbnN0YW5jZSBvZiB0aGUgYERpc3BsYXlTeW5jYCB1c2VkIHRvIHN5bmNocm9uaXplIHRoZSBkaWZmZXJlbnQgZGlzcGxheXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuZGlzcGxheVN5bmMgPSBmYWxzZTtcblxuICAgIHRoaXMuX3N0YWNrID0gW107XG4gICAgdGhpcy5fcmFmSWQgPSBudWxsO1xuXG4gICAgdGhpcy5yZW5kZXJTdGFjayA9IHRoaXMucmVuZGVyU3RhY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLnNoaWZ0RXJyb3IgPSAwO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBjYW52YXMgc2l6ZSBhbmQgeSBzY2FsZSB0cmFuc2ZlcnQgZnVuY3Rpb25cbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfcmVzaXplKCkge1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5wYXJhbXMuZ2V0KCd3aWR0aCcpO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMucGFyYW1zLmdldCgnaGVpZ2h0Jyk7XG5cbiAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcbiAgICBjb25zdCBjYWNoZWRDdHggPSB0aGlzLmNhY2hlZEN0eDtcblxuICAgIGNvbnN0IGRQUiA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gICAgY29uc3QgYlBSID0gY3R4LndlYmtpdEJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgIGN0eC5tb3pCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICBjdHgubXNCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICBjdHgub0JhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgIGN0eC5iYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICB0aGlzLnBpeGVsUmF0aW8gPSBkUFIgLyBiUFI7XG5cbiAgICBjb25zdCBsYXN0V2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoO1xuICAgIGNvbnN0IGxhc3RIZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICB0aGlzLmNhbnZhc1dpZHRoID0gd2lkdGggKiB0aGlzLnBpeGVsUmF0aW87XG4gICAgdGhpcy5jYW52YXNIZWlnaHQgPSBoZWlnaHQgKiB0aGlzLnBpeGVsUmF0aW87XG5cbiAgICBjYWNoZWRDdHguY2FudmFzLndpZHRoID0gdGhpcy5jYW52YXNXaWR0aDtcbiAgICBjYWNoZWRDdHguY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzSGVpZ2h0O1xuXG4gICAgLy8gY29weSBjdXJyZW50IGltYWdlIGZyb20gY3R4IChyZXNpemUpXG4gICAgaWYgKGxhc3RXaWR0aCAmJiBsYXN0SGVpZ2h0KSB7XG4gICAgICBjYWNoZWRDdHguZHJhd0ltYWdlKGN0eC5jYW52YXMsXG4gICAgICAgIDAsIDAsIGxhc3RXaWR0aCwgbGFzdEhlaWdodCxcbiAgICAgICAgMCwgMCwgdGhpcy5jYW52YXNXaWR0aCwgdGhpcy5jYW52YXNIZWlnaHRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY3R4LmNhbnZhcy53aWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY3R4LmNhbnZhcy5oZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICBjdHguY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgIGN0eC5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcblxuICAgIC8vIHVwZGF0ZSBzY2FsZVxuICAgIHRoaXMuX3NldFlTY2FsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgdHJhbnNmZXJ0IGZ1bmN0aW9uIHVzZWQgdG8gbWFwIHZhbHVlcyB0byBwaXhlbCBpbiB0aGUgeSBheGlzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0WVNjYWxlKCkge1xuICAgIGNvbnN0IG1pbiA9IHRoaXMucGFyYW1zLmdldCgnbWluJyk7XG4gICAgY29uc3QgbWF4ID0gdGhpcy5wYXJhbXMuZ2V0KCdtYXgnKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcblxuICAgIGNvbnN0IGEgPSAoMCAtIGhlaWdodCkgLyAobWF4IC0gbWluKTtcbiAgICBjb25zdCBiID0gaGVpZ2h0IC0gKGEgKiBtaW4pO1xuXG4gICAgdGhpcy5nZXRZUG9zaXRpb24gPSAoeCkgPT4gYSAqIHggKyBiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpZHRoIGluIHBpeGVsIGEgYHZlY3RvcmAgZnJhbWUgbmVlZHMgdG8gYmUgZHJhd24uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRNaW5pbXVtRnJhbWVXaWR0aCgpIHtcbiAgICByZXR1cm4gMTsgLy8gbmVlZCBvbmUgcGl4ZWwgdG8gZHJhdyB0aGUgbGluZVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9uIGV4ZWN1dGVkIHdoZW4gYSBwYXJhbWV0ZXIgaXMgdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBQYXJhbWV0ZXIgbmFtZS5cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSBQYXJhbWV0ZXIgdmFsdWUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtZXRhcyAtIE1ldGFkYXRhcyBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgb25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpIHtcbiAgICBzdXBlci5vblBhcmFtVXBkYXRlKG5hbWUsIHZhbHVlLCBtZXRhcyk7XG5cbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ21pbic6XG4gICAgICBjYXNlICdtYXgnOlxuICAgICAgICAvLyBAdG9kbyAtIG1ha2Ugc3VyZSB0aGF0IG1pbiBhbmQgbWF4IGFyZSBkaWZmZXJlbnRcbiAgICAgICAgdGhpcy5fc2V0WVNjYWxlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnd2lkdGgnOlxuICAgICAgY2FzZSAnaGVpZ2h0JzpcbiAgICAgICAgdGhpcy5fcmVzaXplKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpIHtcbiAgICBzdXBlci5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZXNldFN0cmVhbSgpIHtcbiAgICBzdXBlci5yZXNldFN0cmVhbSgpO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzSGVpZ2h0O1xuXG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuY2FjaGVkQ3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBmaW5hbGl6ZVN0cmVhbShlbmRUaW1lKSB7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IG51bGw7XG4gICAgc3VwZXIuZmluYWxpemVTdHJlYW0oZW5kVGltZSk7XG5cbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yYWZJZCk7XG4gICAgdGhpcy5fcmFmSWQgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgY3VycmVudCBmcmFtZSB0byB0aGUgZnJhbWVzIHRvIGRyYXcuIFNob3VsZCBub3QgYmUgb3ZlcnJpZGVuLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSk7XG4gICAgY29uc3QgZGF0YSA9IGZyYW1lLmRhdGE7XG5cbiAgICAvLyBjb3B5IHZhbHVlcyBvZiB0aGUgaW5wdXQgZnJhbWUgYXMgdGhleSBtaWdodCBiZSB1cGRhdGVkXG4gICAgLy8gaW4gcmVmZXJlbmNlIGJlZm9yZSBiZWluZyBjb25zdW1lZCBpbiB0aGUgZHJhdyBmdW5jdGlvblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVTaXplOyBpKyspXG4gICAgICBjb3B5W2ldID0gZGF0YVtpXTtcblxuICAgIHRoaXMuX3N0YWNrLnB1c2goe1xuICAgICAgdGltZTogZnJhbWUudGltZSxcbiAgICAgIGRhdGE6IGNvcHksXG4gICAgICBtZXRhZGF0YTogZnJhbWUubWV0YWRhdGEsXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fcmFmSWQgPT09IG51bGwpXG4gICAgICB0aGlzLl9yYWZJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlclN0YWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGFjY3VtdWxhdGVkIGZyYW1lcy4gTWV0aG9kIGNhbGxlZCBpbiBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlbmRlclN0YWNrKCkge1xuICAgIGlmICh0aGlzLnBhcmFtcy5oYXMoJ2R1cmF0aW9uJykpIHtcbiAgICAgIC8vIHJlbmRlciBhbGwgZnJhbWUgc2luY2UgbGFzdCBgcmVuZGVyU3RhY2tgIGNhbGxcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5fc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICB0aGlzLnNjcm9sbE1vZGVEcmF3KHRoaXMuX3N0YWNrW2ldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb25seSByZW5kZXIgbGFzdCByZWNlaXZlZCBmcmFtZSBpZiBhbnlcbiAgICAgIGlmICh0aGlzLl9zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5fc3RhY2tbdGhpcy5fc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1dpZHRoLCB0aGlzLmNhbnZhc0hlaWdodCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZWluaXQgc3RhY2sgZm9yIG5leHQgY2FsbFxuICAgIHRoaXMuX3N0YWNrLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fcmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXJTdGFjayk7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBkYXRhIGZyb20gcmlnaHQgdG8gbGVmdCB3aXRoIHNjcm9sbGluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAdG9kbyAtIGNoZWNrIHBvc3NpYmlsaXR5IG9mIG1haW50YWluaW5nIGFsbCB2YWx1ZXMgZnJvbSBvbmUgcGxhY2UgdG9cbiAgICogICAgICAgICBtaW5pbWl6ZSBmbG9hdCBlcnJvciB0cmFja2luZy5cbiAgICovXG4gIHNjcm9sbE1vZGVEcmF3KGZyYW1lKSB7XG4gICAgY29uc3QgZnJhbWVUeXBlID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlO1xuICAgIGNvbnN0IGZyYW1lUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3Qgc291cmNlU2FtcGxlUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG5cbiAgICBjb25zdCBjYW52YXNEdXJhdGlvbiA9IHRoaXMucGFyYW1zLmdldCgnZHVyYXRpb24nKTtcbiAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcbiAgICBjb25zdCBjYW52YXNXaWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY29uc3QgY2FudmFzSGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG5cbiAgICBjb25zdCBwcmV2aW91c0ZyYW1lID0gdGhpcy5wcmV2aW91c0ZyYW1lO1xuXG4gICAgLy8gY3VycmVudCB0aW1lIGF0IHRoZSBsZWZ0IG9mIHRoZSBjYW52YXNcbiAgICBjb25zdCBjdXJyZW50VGltZSA9ICh0aGlzLmN1cnJlbnRUaW1lICE9PSBudWxsKSA/IHRoaXMuY3VycmVudFRpbWUgOiBmcmFtZS50aW1lO1xuICAgIGNvbnN0IGZyYW1lU3RhcnRUaW1lID0gZnJhbWUudGltZTtcbiAgICBjb25zdCBsYXN0RnJhbWVUaW1lID0gcHJldmlvdXNGcmFtZSA/IHByZXZpb3VzRnJhbWUudGltZSA6IDA7XG4gICAgY29uc3QgbGFzdEZyYW1lRHVyYXRpb24gPSB0aGlzLmxhc3RGcmFtZUR1cmF0aW9uID8gdGhpcy5sYXN0RnJhbWVEdXJhdGlvbiA6IDA7XG5cbiAgICBsZXQgZnJhbWVEdXJhdGlvbjtcblxuICAgIGlmIChmcmFtZVR5cGUgPT09ICdzY2FsYXInIHx8IGZyYW1lVHlwZSA9PT0gJ3ZlY3RvcicpIHtcbiAgICAgIGNvbnN0IHBpeGVsRHVyYXRpb24gPSBjYW52YXNEdXJhdGlvbiAvIGNhbnZhc1dpZHRoO1xuICAgICAgZnJhbWVEdXJhdGlvbiA9IHRoaXMuZ2V0TWluaW11bUZyYW1lV2lkdGgoKSAqIHBpeGVsRHVyYXRpb247XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPT09ICdzaWduYWwnKSB7XG4gICAgICBmcmFtZUR1cmF0aW9uID0gZnJhbWVTaXplIC8gc291cmNlU2FtcGxlUmF0ZTtcbiAgICB9XG5cbiAgICBjb25zdCBmcmFtZUVuZFRpbWUgPSBmcmFtZVN0YXJ0VGltZSArIGZyYW1lRHVyYXRpb247XG4gICAgLy8gZGVmaW5lIGlmIHdlIG5lZWQgdG8gc2hpZnQgdGhlIGNhbnZhc1xuICAgIGNvbnN0IHNoaWZ0VGltZSA9IGZyYW1lRW5kVGltZSAtIGN1cnJlbnRUaW1lO1xuXG4gICAgLy8gaWYgdGhlIGNhbnZhcyBpcyBub3Qgc3luY2VkLCBzaG91bGQgbmV2ZXIgZ28gdG8gYGVsc2VgXG4gICAgaWYgKHNoaWZ0VGltZSA+IDApIHtcbiAgICAgIC8vIHNoaWZ0IHRoZSBjYW52YXMgb2Ygc2hpZnRUaW1lIGluIHBpeGVsc1xuICAgICAgY29uc3QgZlNoaWZ0ID0gKHNoaWZ0VGltZSAvIGNhbnZhc0R1cmF0aW9uKSAqIGNhbnZhc1dpZHRoIC0gdGhpcy5zaGlmdEVycm9yO1xuICAgICAgY29uc3QgaVNoaWZ0ID0gTWF0aC5mbG9vcihmU2hpZnQgKyAwLjUpO1xuICAgICAgdGhpcy5zaGlmdEVycm9yID0gZlNoaWZ0IC0gaVNoaWZ0O1xuXG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IGZyYW1lU3RhcnRUaW1lICsgZnJhbWVEdXJhdGlvbjtcbiAgICAgIHRoaXMuc2hpZnRDYW52YXMoaVNoaWZ0LCBjdXJyZW50VGltZSk7XG5cbiAgICAgIC8vIGlmIHNpYmxpbmdzLCBzaGFyZSB0aGUgaW5mb3JtYXRpb25cbiAgICAgIGlmICh0aGlzLmRpc3BsYXlTeW5jKVxuICAgICAgICB0aGlzLmRpc3BsYXlTeW5jLnNoaWZ0U2libGluZ3MoaVNoaWZ0LCBjdXJyZW50VGltZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gd2lkdGggb2YgdGhlIGZyYW1lIGluIHBpeGVsc1xuICAgIGNvbnN0IGZGcmFtZVdpZHRoID0gKGZyYW1lRHVyYXRpb24gLyBjYW52YXNEdXJhdGlvbikgKiBjYW52YXNXaWR0aDtcbiAgICBjb25zdCBmcmFtZVdpZHRoID0gTWF0aC5mbG9vcihmRnJhbWVXaWR0aCArIDAuNSk7XG5cbiAgICAvLyBkZWZpbmUgcG9zaXRpb24gb2YgdGhlIGhlYWQgaW4gdGhlIGNhbnZhc1xuICAgIGNvbnN0IGNhbnZhc1N0YXJ0VGltZSA9IHRoaXMuY3VycmVudFRpbWUgLSBjYW52YXNEdXJhdGlvbjtcbiAgICBjb25zdCBzdGFydFRpbWVSYXRpbyA9IChmcmFtZVN0YXJ0VGltZSAtIGNhbnZhc1N0YXJ0VGltZSkgLyBjYW52YXNEdXJhdGlvbjtcbiAgICBjb25zdCBzdGFydFRpbWVQb3NpdGlvbiA9IHN0YXJ0VGltZVJhdGlvICogY2FudmFzV2lkdGg7XG5cbiAgICAvLyBudW1iZXIgb2YgcGl4ZWxzIHNpbmNlIGxhc3QgZnJhbWVcbiAgICBsZXQgcGl4ZWxzU2luY2VMYXN0RnJhbWUgPSB0aGlzLmxhc3RGcmFtZVdpZHRoO1xuXG4gICAgaWYgKChmcmFtZVR5cGUgPT09ICdzY2FsYXInIHx8IGZyYW1lVHlwZSA9PT0gJ3ZlY3RvcicpICYmIHByZXZpb3VzRnJhbWUpIHtcbiAgICAgIGNvbnN0IGZyYW1lSW50ZXJ2YWwgPSBmcmFtZS50aW1lIC0gcHJldmlvdXNGcmFtZS50aW1lO1xuICAgICAgcGl4ZWxzU2luY2VMYXN0RnJhbWUgPSAoZnJhbWVJbnRlcnZhbCAvIGNhbnZhc0R1cmF0aW9uKSAqIGNhbnZhc1dpZHRoO1xuICAgIH1cblxuICAgIC8vIGRyYXcgY3VycmVudCBmcmFtZVxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnRyYW5zbGF0ZShzdGFydFRpbWVQb3NpdGlvbiwgMCk7XG4gICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24oZnJhbWUsIGZyYW1lV2lkdGgsIHBpeGVsc1NpbmNlTGFzdEZyYW1lKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgLy8gc2F2ZSBjdXJyZW50IGNhbnZhcyBzdGF0ZSBpbnRvIGNhY2hlZCBjYW52YXNcbiAgICB0aGlzLmNhY2hlZEN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCk7XG4gICAgdGhpcy5jYWNoZWRDdHguZHJhd0ltYWdlKHRoaXMuY2FudmFzLCAwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcblxuICAgIC8vIHVwZGF0ZSBsYXN0RnJhbWVEdXJhdGlvbiwgbGFzdEZyYW1lV2lkdGhcbiAgICB0aGlzLmxhc3RGcmFtZUR1cmF0aW9uID0gZnJhbWVEdXJhdGlvbjtcbiAgICB0aGlzLmxhc3RGcmFtZVdpZHRoID0gZnJhbWVXaWR0aDtcbiAgICB0aGlzLnByZXZpb3VzRnJhbWUgPSBmcmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCBjYW52YXMsIGFsc28gY2FsbGVkIGZyb20gYERpc3BsYXlTeW5jYFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2hpZnRDYW52YXMoaVNoaWZ0LCB0aW1lKSB7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgY29uc3QgY2FjaGUgPSB0aGlzLmNhY2hlZENhbnZhcztcbiAgICBjb25zdCBjYWNoZWRDdHggPSB0aGlzLmNhY2hlZEN0eDtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgY29uc3QgY3JvcHBlZFdpZHRoID0gd2lkdGggLSBpU2hpZnQ7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IHRpbWU7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIGN0eC5kcmF3SW1hZ2UoY2FjaGUsIGlTaGlmdCwgMCwgY3JvcHBlZFdpZHRoLCBoZWlnaHQsIDAsIDAsIGNyb3BwZWRXaWR0aCwgaGVpZ2h0KTtcbiAgICAvLyBzYXZlIGN1cnJlbnQgY2FudmFzIHN0YXRlIGludG8gY2FjaGVkIGNhbnZhc1xuICAgIGNhY2hlZEN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgY2FjaGVkQ3R4LmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICAvLyBAdG9kbyAtIEZpeCB0cmlnZ2VyIG1vZGVcbiAgLy8gYWxsb3cgdG8gd2l0Y2ggZWFzaWx5IGJldHdlZW4gdGhlIDIgbW9kZXNcbiAgLy8gc2V0VHJpZ2dlcihib29sKSB7XG4gIC8vICAgdGhpcy5wYXJhbXMudHJpZ2dlciA9IGJvb2w7XG4gIC8vICAgLy8gY2xlYXIgY2FudmFzIGFuZCBjYWNoZVxuICAvLyAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLnBhcmFtcy53aWR0aCwgdGhpcy5wYXJhbXMuaGVpZ2h0KTtcbiAgLy8gICB0aGlzLmNhY2hlZEN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5wYXJhbXMud2lkdGgsIHRoaXMucGFyYW1zLmhlaWdodCk7XG4gIC8vICAgLy8gcmVzZXQgX2N1cnJlbnRYUG9zaXRpb25cbiAgLy8gICB0aGlzLl9jdXJyZW50WFBvc2l0aW9uID0gMDtcbiAgLy8gICB0aGlzLmxhc3RTaGlmdEVycm9yID0gMDtcbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBBbHRlcm5hdGl2ZSBkcmF3aW5nIG1vZGUuXG4gIC8vICAqIERyYXcgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBnbyBiYWNrIHRvIGxlZnQgd2hlbiA+IHdpZHRoXG4gIC8vICAqL1xuICAvLyB0cmlnZ2VyTW9kZURyYXcodGltZSwgZnJhbWUpIHtcbiAgLy8gICBjb25zdCB3aWR0aCAgPSB0aGlzLnBhcmFtcy53aWR0aDtcbiAgLy8gICBjb25zdCBoZWlnaHQgPSB0aGlzLnBhcmFtcy5oZWlnaHQ7XG4gIC8vICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLnBhcmFtcy5kdXJhdGlvbjtcbiAgLy8gICBjb25zdCBjdHggPSB0aGlzLmN0eDtcblxuICAvLyAgIGNvbnN0IGR0ID0gdGltZSAtIHRoaXMucHJldmlvdXNUaW1lO1xuICAvLyAgIGNvbnN0IGZTaGlmdCA9IChkdCAvIGR1cmF0aW9uKSAqIHdpZHRoIC0gdGhpcy5sYXN0U2hpZnRFcnJvcjsgLy8gcHhcbiAgLy8gICBjb25zdCBpU2hpZnQgPSBNYXRoLnJvdW5kKGZTaGlmdCk7XG4gIC8vICAgdGhpcy5sYXN0U2hpZnRFcnJvciA9IGlTaGlmdCAtIGZTaGlmdDtcblxuICAvLyAgIHRoaXMuY3VycmVudFhQb3NpdGlvbiArPSBpU2hpZnQ7XG5cbiAgLy8gICAvLyBkcmF3IHRoZSByaWdodCBwYXJ0XG4gIC8vICAgY3R4LnNhdmUoKTtcbiAgLy8gICBjdHgudHJhbnNsYXRlKHRoaXMuY3VycmVudFhQb3NpdGlvbiwgMCk7XG4gIC8vICAgY3R4LmNsZWFyUmVjdCgtaVNoaWZ0LCAwLCBpU2hpZnQsIGhlaWdodCk7XG4gIC8vICAgdGhpcy5kcmF3Q3VydmUoZnJhbWUsIGlTaGlmdCk7XG4gIC8vICAgY3R4LnJlc3RvcmUoKTtcblxuICAvLyAgIC8vIGdvIGJhY2sgdG8gdGhlIGxlZnQgb2YgdGhlIGNhbnZhcyBhbmQgcmVkcmF3IHRoZSBzYW1lIHRoaW5nXG4gIC8vICAgaWYgKHRoaXMuY3VycmVudFhQb3NpdGlvbiA+IHdpZHRoKSB7XG4gIC8vICAgICAvLyBnbyBiYWNrIHRvIHN0YXJ0XG4gIC8vICAgICB0aGlzLmN1cnJlbnRYUG9zaXRpb24gLT0gd2lkdGg7XG5cbiAgLy8gICAgIGN0eC5zYXZlKCk7XG4gIC8vICAgICBjdHgudHJhbnNsYXRlKHRoaXMuY3VycmVudFhQb3NpdGlvbiwgMCk7XG4gIC8vICAgICBjdHguY2xlYXJSZWN0KC1pU2hpZnQsIDAsIGlTaGlmdCwgaGVpZ2h0KTtcbiAgLy8gICAgIHRoaXMuZHJhd0N1cnZlKGZyYW1lLCB0aGlzLnByZXZpb3VzRnJhbWUsIGlTaGlmdCk7XG4gIC8vICAgICBjdHgucmVzdG9yZSgpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VEaXNwbGF5O1xuIiwiaW1wb3J0IEJhc2VEaXNwbGF5IGZyb20gJy4vQmFzZURpc3BsYXknO1xuaW1wb3J0IHsgZ2V0Q29sb3JzIH0gZnJvbSAnLi4vdXRpbHMvZGlzcGxheS11dGlscyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICByYWRpdXM6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIG1pbjogMCxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9XG4gIH0sXG4gIGxpbmU6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgY29sb3JzOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgfVxufVxuXG5cbi8qKlxuICogQnJlYWtwb2ludCBGdW5jdGlvbiwgZGlzcGxheSBhIHN0cmVhbSBvZiB0eXBlIGB2ZWN0b3JgLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5jb2xvcnM9bnVsbF0gLSBBcnJheSBvZiBjb2xvcnMgZm9yIGVhY2ggaW5kZXggb2YgdGhlXG4gKiAgdmVjdG9yLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucmFkaXVzPTBdIC0gUmFkaXVzIG9mIHRoZSBkb3QgYXQgZWFjaCB2YWx1ZS5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubGluZT10cnVlXSAtIERpc3BsYXkgYSBsaW5lIGJldHdlZW4gZWFjaCBjb25zZWN1dGl2ZVxuICogIHZhbHVlcyBvZiB0aGUgdmVjdG9yLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluPS0xXSAtIE1pbmltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4PTFdIC0gTWF4aW11bSB2YWx1ZSByZXByZXNlbnRlZCBpbiB0aGUgY2FudmFzLlxuICogIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53aWR0aD0zMDBdIC0gV2lkdGggb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGVpZ2h0PTE1MF0gLSBIZWlnaHQgb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSAtIENvbnRhaW5lciBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gaW5zZXJ0IHRoZSBjYW52YXMuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNhbnZhcz1udWxsXSAtIENhbnZhcyBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gZHJhdy4gX2NvbnN0YW50IHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xXSAtIER1cmF0aW9uIChpbiBzZWNvbmRzKSByZXByZXNlbnRlZCBpblxuICogIHRoZSBjYW52YXMuIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yZWZlcmVuY2VUaW1lPW51bGxdIC0gT3B0aW9ubmFsIHJlZmVyZW5jZSB0aW1lIHRoZVxuICogIGRpc3BsYXkgc2hvdWxkIGNvbnNpZGVyZXIgYXMgdGhlIG9yaWdpbi4gSXMgb25seSB1c2VmdWxsIHdoZW4gc3luY2hyb25pemluZ1xuICogIHNldmVyYWwgZGlzcGxheSB1c2luZyB0aGUgYERpc3BsYXlTeW5jYCBjbGFzcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4gPSBuZXcgbGZvLnNvdXJjZS5FdmVudEluKHtcbiAqICAgZnJhbWVTaXplOiAyLFxuICogICBmcmFtZVJhdGU6IDAuMSxcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJ1xuICogfSk7XG4gKlxuICogY29uc3QgYnBmID0gbmV3IGxmby5zaW5rLkJwZkRpc3BsYXkoe1xuICogICBjYW52YXM6ICcjYnBmJyxcbiAqICAgZHVyYXRpb246IDEwLFxuICogfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KGJwZik7XG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogbGV0IHRpbWUgPSAwO1xuICogY29uc3QgZHQgPSAwLjE7XG4gKlxuICogKGZ1bmN0aW9uIGdlbmVyYXRlRGF0YSgpIHtcbiAqICAgZXZlbnRJbi5wcm9jZXNzKHRpbWUsIFtNYXRoLnJhbmRvbSgpICogMiAtIDEsIE1hdGgucmFuZG9tKCkgKiAyIC0gMV0pO1xuICogICB0aW1lICs9IGR0O1xuICpcbiAqICAgc2V0VGltZW91dChnZW5lcmF0ZURhdGEsIGR0ICogMTAwMCk7XG4gKiB9KCkpO1xuICovXG5jbGFzcyBCcGZEaXNwbGF5IGV4dGVuZHMgQmFzZURpc3BsYXkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5wcmV2RnJhbWUgPSBudWxsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGdldE1pbmltdW1GcmFtZVdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmFtcy5nZXQoJ3JhZGl1cycpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ2NvbG9ycycpID09PSBudWxsKVxuICAgICAgdGhpcy5wYXJhbXMuc2V0KCdjb2xvcnMnLCBnZXRDb2xvcnMoJ2JwZicsIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSkpO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lLCBmcmFtZVdpZHRoLCBwaXhlbHNTaW5jZUxhc3RGcmFtZSkge1xuICAgIGNvbnN0IGNvbG9ycyA9IHRoaXMucGFyYW1zLmdldCgnY29sb3JzJyk7XG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5wYXJhbXMuZ2V0KCdyYWRpdXMnKTtcbiAgICBjb25zdCBkcmF3TGluZSA9IHRoaXMucGFyYW1zLmdldCgnbGluZScpO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcbiAgICBjb25zdCBkYXRhID0gZnJhbWUuZGF0YTtcbiAgICBjb25zdCBwcmV2RGF0YSA9IHRoaXMucHJldkZyYW1lID8gdGhpcy5wcmV2RnJhbWUuZGF0YSA6IG51bGw7XG5cbiAgICBjdHguc2F2ZSgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBmcmFtZVNpemU7IGkgPCBsOyBpKyspIHtcbiAgICAgIGNvbnN0IHBvc1kgPSB0aGlzLmdldFlQb3NpdGlvbihkYXRhW2ldKTtcbiAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW2ldO1xuXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcblxuICAgICAgaWYgKHByZXZEYXRhICYmIGRyYXdMaW5lKSB7XG4gICAgICAgIGNvbnN0IGxhc3RQb3NZID0gdGhpcy5nZXRZUG9zaXRpb24ocHJldkRhdGFbaV0pO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oLXBpeGVsc1NpbmNlTGFzdEZyYW1lLCBsYXN0UG9zWSk7XG4gICAgICAgIGN0eC5saW5lVG8oMCwgcG9zWSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmFkaXVzID4gMCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoMCwgcG9zWSwgcmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgdGhpcy5wcmV2RnJhbWUgPSBmcmFtZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCcGZEaXNwbGF5O1xuIiwiaW1wb3J0IEJhc2VEaXNwbGF5IGZyb20gJy4vQmFzZURpc3BsYXknO1xuaW1wb3J0IHsgZ2V0Q29sb3JzIH0gZnJvbSAnLi4vdXRpbHMvZGlzcGxheS11dGlscyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICB0aHJlc2hvbGQ6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIHRocmVzaG9sZEluZGV4OiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDAsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIGNvbG9yOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogZ2V0Q29sb3JzKCdtYXJrZXInKSxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfVxufTtcblxuLyoqXG4gKiBEaXNwbGF5IGEgbWFya2VyIGFjY29yZGluZyB0byBhIGB2ZWN0b3JgIGlucHV0IGZyYW1lLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmNvbG9yIC0gQ29sb3Igb2YgdGhlIG1hcmtlci5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGRJbmRleD0wXSAtIEluZGV4IG9mIHRoZSBpbmNvbW1pbmcgZnJhbWVcbiAqICBkYXRhIHRvIGNvbXBhcmUgYWdhaW5zdCB0aGUgdGhyZXNob2xkLiBfU2hvdWxkIGJlIHVzZWQgaW4gY29uam9uY3Rpb24gd2l0aFxuICogIGB0aHJlc2hvbGRgXy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGQ9bnVsbF0gLSBNaW5pbXVtIHZhbHVlIHRoZSBpbmNvbW1pbmcgdmFsdWVcbiAqICBtdXN0IGhhdmUgdG8gdHJpZ2dlciB0aGUgZGlzcGxheSBvZiBhIG1hcmtlci4gSWYgbnVsbCBlYWNoIGluY29tbWluZyBldmVudFxuICogIHRyaWdnZXJzIGEgbWFya2VyLiBfU2hvdWxkIGJlIHVzZWQgaW4gY29uam9uY3Rpb24gd2l0aCBgdGhyZXNob2xkSW5kZXhgXy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53aWR0aD0zMDBdIC0gV2lkdGggb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGVpZ2h0PTE1MF0gLSBIZWlnaHQgb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSAtIENvbnRhaW5lciBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gaW5zZXJ0IHRoZSBjYW52YXMuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNhbnZhcz1udWxsXSAtIENhbnZhcyBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gZHJhdy4gX2NvbnN0YW50IHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xXSAtIER1cmF0aW9uIChpbiBzZWNvbmRzKSByZXByZXNlbnRlZCBpblxuICogIHRoZSBjYW52YXMuIFRoaXMgcGFyYW1ldGVyIG9ubHkgZXhpc3RzIGZvciBvcGVyYXRvcnMgdGhhdCBkaXNwbGF5IHNldmVyYWxcbiAqICBjb25zZWN1dGl2ZSBmcmFtZXMgb24gdGhlIGNhbnZhcy4gX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnJlZmVyZW5jZVRpbWU9bnVsbF0gLSBPcHRpb25uYWwgcmVmZXJlbmNlIHRpbWUgdGhlXG4gKiAgZGlzcGxheSBzaG91bGQgY29uc2lkZXJlciBhcyB0aGUgb3JpZ2luLiBJcyBvbmx5IHVzZWZ1bGwgd2hlbiBzeW5jaHJvbml6aW5nXG4gKiAgc2V2ZXJhbCBkaXNwbGF5IHVzaW5nIHRoZSBgRGlzcGxheVN5bmNgIGNsYXNzLiBUaGlzIHBhcmFtZXRlciBvbmx5IGV4aXN0c1xuICogIGZvciBvcGVyYXRvcnMgdGhhdCBkaXNwbGF5IHNldmVyYWwgY29uc2VjdXRpdmUgZnJhbWVzIG9uIHRoZSBjYW52YXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3NjYWxhcicsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBtYXJrZXIgPSBuZXcgbGZvLnNpbmsuTWFya2VyRGlzcGxheSh7XG4gKiAgIGNhbnZhczogJyNtYXJrZXInLFxuICogICB0aHJlc2hvbGQ6IDAuNSxcbiAqIH0pO1xuICpcbiAqIGV2ZW50SW4uY29ubmVjdChtYXJrZXIpO1xuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIGxldCB0aW1lID0gMDtcbiAqIGNvbnN0IHBlcmlvZCA9IDE7XG4gKlxuICogKGZ1bmN0aW9uIGdlbmVyYXRlRGF0YSgpIHtcbiAqICAgZXZlbnRJbi5wcm9jZXNzKHRpbWUsIE1hdGgucmFuZG9tKCkpO1xuICpcbiAqICAgdGltZSArPSBwZXJpb2Q7XG4gKiAgIHNldFRpbWVvdXQoZ2VuZXJhdGVEYXRhLCBwZXJpb2QgKiAxMDAwKTtcbiAqIH0oKSk7XG4gKi9cbmNsYXNzIE1hcmtlckRpc3BsYXkgZXh0ZW5kcyBCYXNlRGlzcGxheSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lLCBmcmFtZVdpZHRoLCBwaXhlbHNTaW5jZUxhc3RGcmFtZSkge1xuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5wYXJhbXMuZ2V0KCdjb2xvcicpO1xuICAgIGNvbnN0IHRocmVzaG9sZCA9IHRoaXMucGFyYW1zLmdldCgndGhyZXNob2xkJyk7XG4gICAgY29uc3QgdGhyZXNob2xkSW5kZXggPSB0aGlzLnBhcmFtcy5nZXQoJ3RocmVzaG9sZEluZGV4Jyk7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgY29uc3QgaGVpZ2h0ID0gY3R4LmhlaWdodDtcbiAgICBjb25zdCB2YWx1ZSA9IGZyYW1lLmRhdGFbdGhyZXNob2xkSW5kZXhdO1xuXG4gICAgaWYgKHRocmVzaG9sZCA9PT0gbnVsbCB8fCB2YWx1ZSA+PSB0aHJlc2hvbGQpIHtcbiAgICAgIGxldCB5TWluID0gdGhpcy5nZXRZUG9zaXRpb24odGhpcy5wYXJhbXMuZ2V0KCdtaW4nKSk7XG4gICAgICBsZXQgeU1heCA9IHRoaXMuZ2V0WVBvc2l0aW9uKHRoaXMucGFyYW1zLmdldCgnbWF4JykpO1xuXG4gICAgICBpZiAoeU1pbiA+IHlNYXgpIHtcbiAgICAgICAgY29uc3QgdiA9IHlNYXg7XG4gICAgICAgIHlNYXggPSB5TWluO1xuICAgICAgICB5TWluID0gdjtcbiAgICAgIH1cblxuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgIGN0eC5maWxsUmVjdCgwLCB5TWluLCAxLCB5TWF4KTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hcmtlckRpc3BsYXk7XG4iLCJpbXBvcnQgQmFzZURpc3BsYXkgZnJvbSAnLi9CYXNlRGlzcGxheSc7XG5pbXBvcnQgeyBnZXRDb2xvcnMgfSBmcm9tICcuLi91dGlscy9kaXNwbGF5LXV0aWxzJztcblxuY29uc3QgZmxvb3IgPSBNYXRoLmZsb29yO1xuY29uc3QgY2VpbCA9IE1hdGguY2VpbDtcblxuZnVuY3Rpb24gZG93blNhbXBsZShkYXRhLCB0YXJnZXRMZW5ndGgpIHtcbiAgY29uc3QgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gIGNvbnN0IGhvcCA9IGxlbmd0aCAvIHRhcmdldExlbmd0aDtcbiAgY29uc3QgdGFyZ2V0ID0gbmV3IEZsb2F0MzJBcnJheSh0YXJnZXRMZW5ndGgpO1xuICBsZXQgY291bnRlciA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRMZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluZGV4ID0gZmxvb3IoY291bnRlcik7XG4gICAgY29uc3QgcGhhc2UgPSBjb3VudGVyIC0gaW5kZXg7XG4gICAgY29uc3QgcHJldiA9IGRhdGFbaW5kZXhdO1xuICAgIGNvbnN0IG5leHQgPSBkYXRhW2luZGV4ICsgMV07XG5cbiAgICB0YXJnZXRbaV0gPSAobmV4dCAtIHByZXYpICogcGhhc2UgKyBwcmV2O1xuICAgIGNvdW50ZXIgKz0gaG9wO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGNvbG9yOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogZ2V0Q29sb3JzKCdzaWduYWwnKSxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgfSxcbn07XG5cbi8qKlxuICogRGlzcGxheSBhIHN0cmVhbSBvZiB0eXBlIGBzaWduYWxgIG9uIGEgY2FudmFzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmNvbG9yPScjMDBlNjAwJ10gLSBDb2xvciBvZiB0aGUgc2lnbmFsLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tMV0gLSBNaW5pbXVtIHZhbHVlIHJlcHJlc2VudGVkIGluIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MV0gLSBEdXJhdGlvbiAoaW4gc2Vjb25kcykgcmVwcmVzZW50ZWQgaW5cbiAqICB0aGUgY2FudmFzLiBUaGlzIHBhcmFtZXRlciBvbmx5IGV4aXN0cyBmb3Igb3BlcmF0b3JzIHRoYXQgZGlzcGxheSBzZXZlcmFsXG4gKiAgY29uc2VjdXRpdmUgZnJhbWVzIG9uIHRoZSBjYW52YXMuIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yZWZlcmVuY2VUaW1lPW51bGxdIC0gT3B0aW9ubmFsIHJlZmVyZW5jZSB0aW1lIHRoZVxuICogIGRpc3BsYXkgc2hvdWxkIGNvbnNpZGVyZXIgYXMgdGhlIG9yaWdpbi4gSXMgb25seSB1c2VmdWxsIHdoZW4gc3luY2hyb25pemluZ1xuICogIHNldmVyYWwgZGlzcGxheSB1c2luZyB0aGUgYERpc3BsYXlTeW5jYCBjbGFzcy4gVGhpcyBwYXJhbWV0ZXIgb25seSBleGlzdHNcbiAqICBmb3Igb3BlcmF0b3JzIHRoYXQgZGlzcGxheSBzZXZlcmFsIGNvbnNlY3V0aXZlIGZyYW1lcyBvbiB0aGUgY2FudmFzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmtcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgZXZlbnRJbiA9IG5ldyBsZm8uc291cmNlLkV2ZW50SW4oe1xuICogICBmcmFtZVR5cGU6ICdzaWduYWwnLFxuICogICBzYW1wbGVSYXRlOiA4LFxuICogICBmcmFtZVNpemU6IDQsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBzaWduYWxEaXNwbGF5ID0gbmV3IGxmby5zaW5rLlNpZ25hbERpc3BsYXkoe1xuICogICBjYW52YXM6ICcjc2lnbmFsLWNhbnZhcycsXG4gKiB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3Qoc2lnbmFsRGlzcGxheSk7XG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogLy8gcHVzaCB0cmlhbmdsZSBzaWduYWwgaW4gdGhlIGdyYXBoXG4gKiBldmVudEluLnByb2Nlc3MoMCwgWzAsIDAuNSwgMSwgMC41XSk7XG4gKiBldmVudEluLnByb2Nlc3MoMC41LCBbMCwgLTAuNSwgLTEsIC0wLjVdKTtcbiAqIC8vIC4uLlxuICovXG5jbGFzcyBTaWduYWxEaXNwbGF5IGV4dGVuZHMgQmFzZURpc3BsYXkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMsIHRydWUpO1xuXG4gICAgdGhpcy5sYXN0UG9zWSA9IG51bGw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSwgZnJhbWVXaWR0aCwgcGl4ZWxzU2luY2VMYXN0RnJhbWUpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMucGFyYW1zLmdldCgnY29sb3InKTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgbGV0IGRhdGEgPSBmcmFtZS5kYXRhO1xuXG4gICAgaWYgKGZyYW1lV2lkdGggPCBmcmFtZVNpemUpXG4gICAgICBkYXRhID0gZG93blNhbXBsZShkYXRhLCBmcmFtZVdpZHRoKTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgIGNvbnN0IGhvcFggPSBmcmFtZVdpZHRoIC8gbGVuZ3RoO1xuICAgIGxldCBwb3NYID0gMDtcbiAgICBsZXQgbGFzdFkgPSB0aGlzLmxhc3RQb3NZO1xuXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwb3NZID0gdGhpcy5nZXRZUG9zaXRpb24oZGF0YVtpXSk7XG5cbiAgICAgIGlmIChsYXN0WSA9PT0gbnVsbCkge1xuICAgICAgICBjdHgubW92ZVRvKHBvc1gsIHBvc1kpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgICAgY3R4Lm1vdmVUbygtaG9wWCwgbGFzdFkpO1xuXG4gICAgICAgIGN0eC5saW5lVG8ocG9zWCwgcG9zWSk7XG4gICAgICB9XG5cbiAgICAgIHBvc1ggKz0gaG9wWDtcbiAgICAgIGxhc3RZID0gcG9zWTtcbiAgICB9XG5cbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgdGhpcy5sYXN0UG9zWSA9IGxhc3RZO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hbERpc3BsYXk7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuaW1wb3J0IHsgb3Bjb2RlcywgZW5jb2RlcnMsIGRlY29kZXJzIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzL3dzVXRpbHMnO1xuXG5jb25zdCBwYXJhbWV0ZXJzID0ge1xuICBwb3J0OiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDgwMDAsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIHVybDoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH1cbn1cblxuLyoqXG4gKiBTZW5kIGFuIGxmbyBmcmFtZSBhcyBhIHNvY2tldCBtZXNzYWdlIHRvIGEgYG5vZGUuc291cmNlLlNvY2tldFJlY2VpdmVgXG4gKiBpbnN0YW5jZS5cbiAqXG4gKiA8cCBjbGFzcz1cIndhcm5pbmdcIj5FeHBlcmltZW50YWw8L3A+XG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2lua1xuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3ZlY3RvcicsXG4gKiAgIGZyYW1lU2l6ZTogMixcbiAqICAgZnJhbWVSYXRlOiAxLFxuICogfSk7XG4gKlxuICogY29uc3Qgc29ja2V0U2VuZCA9IG5ldyBsZm8uc2luay5Tb2NrZXRTZW5kKHtcbiAqICAgcG9ydDogMzAwMFxuICogfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KHNvY2tldFNlbmQpO1xuICpcbiAqIGV2ZW50SW4uaW5pdCgpLnRoZW4oKCkgPT4ge1xuICogICBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogICBsZXQgdGltZSA9IDA7XG4gKlxuICogICAoZnVuY3Rpb24gY3JlYXRlRnJhbWUoKSB7XG4gKiAgICAgZXZlbnRJbi5wcm9jZXNzKHRpbWUsIFtNYXRoLnJhbmRvbSgpLCBNYXRoLnJhbmRvbSgpXSwgeyB0ZXN0OiB0cnVlIH0pO1xuICogICAgIHRpbWUgKz0gMTtcbiAqXG4gKiAgICAgc2V0VGltZW91dChjcmVhdGVGcmFtZSwgMTAwMCk7XG4gKiAgIH0oKSk7XG4gKiB9KTtcbiAqL1xuY2xhc3MgU29ja2V0U2VuZCBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbWV0ZXJzLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHByb3RvY29sID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XG4gICAgY29uc3QgYWRkcmVzcyA9IHRoaXMucGFyYW1zLmdldCgndXJsJykgfHzCoHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBjb25zdCBwb3J0ID0gdGhpcy5wYXJhbXMuZ2V0KCdwb3J0JykgfHwgJyc7IC8vIGV2ZXJ5dGhpbmcgZmFsc3kgYmVjb21lcyAnJ1xuICAgIGNvbnN0IHNvY2tldEFkZHJlc3MgPSBgJHtwcm90b2NvbH0vLyR7YWRkcmVzc306JHtwb3J0fWA7XG5cbiAgICB0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQoc29ja2V0QWRkcmVzcyk7XG4gICAgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG5cbiAgICB0aGlzLm9wZW5lZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnNvY2tldC5vbm9wZW4gPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zb2NrZXQub25lcnJvciA9IChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgfVxuXG4gIGluaXRNb2R1bGUoKSB7XG4gICAgLy8gc2VuZCBhIElOSVRfTU9EVUxFX1JFUSBhbmQgd2FpdCBmb3IgSU5JVF9NT0RVTEVfQUNLXG4gICAgLy8gbm8gbmVlZCB0byBnZXQgY2hpbGRyZW4gcHJvbWlzZXMgYXMgd2UgYXJlIGluIGEgbGVlZlxuICAgIHJldHVybiB0aGlzLm9wZW5lZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLnNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9wY29kZSA9IGRlY29kZXJzLm9wY29kZShlLmRhdGEpO1xuXG4gICAgICAgICAgaWYgKG9wY29kZSA9PT0gb3Bjb2Rlcy5JTklUX01PRFVMRV9BQ0spXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBidWZmZXIgPSBlbmNvZGVycy5pbml0TW9kdWxlUmVxKCk7XG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQoYnVmZmVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgc3VwZXIucHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IGJ1ZmZlciA9IGVuY29kZXJzLnN0cmVhbVBhcmFtcyh0aGlzLnN0cmVhbVBhcmFtcyk7XG4gICAgdGhpcy5zb2NrZXQuc2VuZChidWZmZXIpO1xuICB9XG5cbiAgcmVzZXRTdHJlYW0oKSB7XG4gICAgc3VwZXIucmVzZXRTdHJlYW0oKTtcblxuICAgIGNvbnN0IGJ1ZmZlciA9IGVuY29kZXJzLnJlc2V0U3RyZWFtKCk7XG4gICAgdGhpcy5zb2NrZXQuc2VuZChidWZmZXIpO1xuICB9XG5cbiAgICAvKiogQHByaXZhdGUgKi9cbiAgZmluYWxpemVTdHJlYW0oZW5kVGltZSkge1xuICAgIHN1cGVyLmZpbmFsaXplU3RyZWFtKGVuZFRpbWUpO1xuXG4gICAgY29uc3QgYnVmZmVyID0gZW5jb2RlcnMuZmluYWxpemVTdHJlYW0oZW5kVGltZSk7XG4gICAgdGhpcy5zb2NrZXQuc2VuZChidWZmZXIpO1xuICB9XG5cbiAgLy8gcHJvY2VzcyBhbnkgdHlwZVxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NjYWxhcigpIHt9XG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKCkge31cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoKSB7fVxuXG4gIHByb2Nlc3NGcmFtZShmcmFtZSkge1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICB0aGlzLmZyYW1lLnRpbWUgPSBmcmFtZS50aW1lO1xuICAgIHRoaXMuZnJhbWUuZGF0YS5zZXQoZnJhbWUuZGF0YSwgMCk7XG4gICAgdGhpcy5mcmFtZS5tZXRhZGF0YSA9IGZyYW1lLm1ldGFkYXRhO1xuXG4gICAgY29uc3QgYnVmZmVyID0gZW5jb2RlcnMucHJvY2Vzc0ZyYW1lKHRoaXMuZnJhbWUsIGZyYW1lU2l6ZSk7XG4gICAgdGhpcy5zb2NrZXQuc2VuZChidWZmZXIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNvY2tldFNlbmQ7XG4iLCJpbXBvcnQgQmFzZURpc3BsYXkgZnJvbSAnLi9CYXNlRGlzcGxheSc7XG5pbXBvcnQgRmZ0IGZyb20gJy4uLy4uL2NvbW1vbi9vcGVyYXRvci9GZnQnO1xuaW1wb3J0IHsgZ2V0Q29sb3JzIH0gZnJvbSAnLi4vdXRpbHMvZGlzcGxheS11dGlscyc7XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHNjYWxlOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBjb2xvcjoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6IGdldENvbG9ycygnc3BlY3RydW0nKSxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgbWluOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAtODAsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIG1heDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogNixcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfVxufTtcblxuXG4vKipcbiAqIERpc3BsYXkgdGhlIHNwZWN0cnVtIG9mIHRoZSBpbmNvbW1pbmcgYHNpZ25hbGAgaW5wdXQuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2lua1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNjYWxlPTFdIC0gU2NhbGUgZGlzcGxheSBvZiB0aGUgc3BlY3Ryb2dyYW0uXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuY29sb3I9bnVsbF0gLSBDb2xvciBvZiB0aGUgc3BlY3Ryb2dyYW0uXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluPS04MF0gLSBNaW5pbXVtIGRpc3BsYXllZCB2YWx1ZSAoaW4gZEIpLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD02XSAtIE1heGltdW0gZGlzcGxheWVkIHZhbHVlIChpbiBkQikuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKlxuICogQHRvZG8gLSBleHBvc2UgbW9yZSBgZmZ0YCBjb25maWcgb3B0aW9uc1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICpcbiAqIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAqICAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gKiAgIC50aGVuKGluaXQpXG4gKiAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyci5zdGFjaykpO1xuICpcbiAqIGZ1bmN0aW9uIGluaXQoc3RyZWFtKSB7XG4gKiAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xuICpcbiAqICAgY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gKiAgICAgYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQsXG4gKiAgICAgc291cmNlTm9kZTogc291cmNlLFxuICogICB9KTtcbiAqXG4gKiAgIGNvbnN0IHNwZWN0cnVtID0gbmV3IGxmby5zaW5rLlNwZWN0cnVtRGlzcGxheSh7XG4gKiAgICAgY2FudmFzOiAnI3NwZWN0cnVtJyxcbiAqICAgfSk7XG4gKlxuICogICBhdWRpb0luTm9kZS5jb25uZWN0KHNwZWN0cnVtKTtcbiAqICAgYXVkaW9Jbk5vZGUuc3RhcnQoKTtcbiAqIH1cbiAqL1xuY2xhc3MgU3BlY3RydW1EaXNwbGF5IGV4dGVuZHMgQmFzZURpc3BsYXkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucywgZmFsc2UpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIHRoaXMuZmZ0ID0gbmV3IEZmdCh7XG4gICAgICBzaXplOiB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUsXG4gICAgICB3aW5kb3c6ICdoYW5uJyxcbiAgICAgIG5vcm06ICdsaW5lYXInLFxuICAgIH0pO1xuXG4gICAgdGhpcy5mZnQuaW5pdFN0cmVhbSh0aGlzLnN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUpIHtcbiAgICBjb25zdCBiaW5zID0gdGhpcy5mZnQuaW5wdXRTaWduYWwoZnJhbWUuZGF0YSk7XG4gICAgY29uc3QgbmJyQmlucyA9IGJpbnMubGVuZ3RoO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzSGVpZ2h0O1xuICAgIGNvbnN0IHNjYWxlID0gdGhpcy5wYXJhbXMuZ2V0KCdzY2FsZScpO1xuXG4gICAgY29uc3QgYmluV2lkdGggPSB3aWR0aCAvIG5ickJpbnM7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5wYXJhbXMuZ2V0KCdjb2xvcicpO1xuXG4gICAgLy8gZXJyb3IgaGFuZGxpbmcgbmVlZHMgcmV2aWV3Li4uXG4gICAgbGV0IGVycm9yID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQmluczsgaSsrKSB7XG4gICAgICBjb25zdCB4MUZsb2F0ID0gaSAqIGJpbldpZHRoICsgZXJyb3I7XG4gICAgICBjb25zdCB4MUludCA9IE1hdGgucm91bmQoeDFGbG9hdCk7XG4gICAgICBjb25zdCB4MkZsb2F0ID0geDFGbG9hdCArIChiaW5XaWR0aCAtIGVycm9yKTtcbiAgICAgIGNvbnN0IHgySW50ID0gTWF0aC5yb3VuZCh4MkZsb2F0KTtcblxuICAgICAgZXJyb3IgPSB4MkludCAtIHgyRmxvYXQ7XG5cbiAgICAgIGlmICh4MUludCAhPT0geDJJbnQpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB4MkludCAtIHgxSW50O1xuICAgICAgICBjb25zdCBkYiA9IDIwICogTWF0aC5sb2cxMChiaW5zW2ldKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0WVBvc2l0aW9uKGRiICogc2NhbGUpO1xuICAgICAgICBjdHguZmlsbFJlY3QoeDFJbnQsIHksIHdpZHRoLCBoZWlnaHQgLSB5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yIC09IGJpbldpZHRoO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGVjdHJ1bURpc3BsYXk7XG4iLCJpbXBvcnQgQmFzZURpc3BsYXkgZnJvbSAnLi9CYXNlRGlzcGxheSc7XG5pbXBvcnQgeyBnZXRDb2xvcnMsIGdldEh1ZSwgaGV4VG9SR0IgfSBmcm9tICcuLi91dGlscy9kaXNwbGF5LXV0aWxzJztcblxuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgY29sb3I6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiBnZXRDb2xvcnMoJ3RyYWNlJyksXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIGNvbG9yU2NoZW1lOiB7XG4gICAgdHlwZTogJ2VudW0nLFxuICAgIGRlZmF1bHQ6ICdub25lJyxcbiAgICBsaXN0OiBbJ25vbmUnLCAnaHVlJywgJ29wYWNpdHknXSxcbiAgfSxcbn07XG5cbi8qKlxuICogRGlzcGxheSBhIHJhbmdlIHZhbHVlIGFyb3VuZCBhIG1lYW4gdmFsdWUgKGZvciBleGFtcGxlIG1lYW5cbiAqIGFuZCBzdGFuZGFydCBkZXZpYXRpb24pLlxuICpcbiAqIFRoaXMgc2luayBjYW4gaGFuZGxlIGlucHV0IG9mIHR5cGUgYHZlY3RvcmAgb2YgZnJhbWVTaXplID49IDIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuY29sb3I9J29yYW5nZSddIC0gQ29sb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuY29sb3JTY2hlbWU9J25vbmUnXSAtIElmIGEgdGhpcmQgdmFsdWUgaXMgYXZhaWxhYmxlXG4gKiAgaW4gdGhlIGlucHV0LCBjYW4gYmUgdXNlZCB0byBjb250cm9sIHRoZSBvcGFjaXR5IG9yIHRoZSBodWUuIElmIGlucHV0IGZyYW1lXG4gKiAgc2l6ZSBpcyAyLCB0aGlzIHBhcmFtIGlzIGF1dG9tYXRpY2FsbHkgc2V0IHRvIGBub25lYFxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tMV0gLSBNaW5pbXVtIHZhbHVlIHJlcHJlc2VudGVkIGluIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MV0gLSBEdXJhdGlvbiAoaW4gc2Vjb25kcykgcmVwcmVzZW50ZWQgaW5cbiAqICB0aGUgY2FudmFzLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucmVmZXJlbmNlVGltZT1udWxsXSAtIE9wdGlvbm5hbCByZWZlcmVuY2UgdGltZSB0aGVcbiAqICBkaXNwbGF5IHNob3VsZCBjb25zaWRlcmVyIGFzIHRoZSBvcmlnaW4uIElzIG9ubHkgdXNlZnVsbCB3aGVuIHN5bmNocm9uaXppbmdcbiAqICBzZXZlcmFsIGRpc3BsYXkgdXNpbmcgdGhlIGBEaXNwbGF5U3luY2AgY2xhc3MuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2lua1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgQXVkaW9Db250ZXh0ID0gKHdpbmRvdy5BdWRpb0NvbnRleHQgfHzCoHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpO1xuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICpcbiAqIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAqICAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gKiAgIC50aGVuKGluaXQpXG4gKiAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyci5zdGFjaykpO1xuICpcbiAqIGZ1bmN0aW9uIGluaXQoc3RyZWFtKSB7XG4gKiAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xuICpcbiAqICAgY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gKiAgICAgc291cmNlTm9kZTogc291cmNlLFxuICogICAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICB9KTtcbiAqXG4gKiAgIC8vIG5vdCBzdXJlIGl0IG1ha2Ugc2VucyBidXQuLi5cbiAqICAgY29uc3QgbWVhblN0ZGRldiA9IG5ldyBsZm8ub3BlcmF0b3IuTWVhblN0ZGRldigpO1xuICpcbiAqICAgY29uc3QgdHJhY2VEaXNwbGF5ID0gbmV3IGxmby5zaW5rLlRyYWNlRGlzcGxheSh7XG4gKiAgICAgY2FudmFzOiAnI3RyYWNlJyxcbiAqICAgfSk7XG4gKlxuICogICBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiAgIGF1ZGlvSW5Ob2RlLmNvbm5lY3QobWVhblN0ZGRldik7XG4gKiAgIG1lYW5TdGRkZXYuY29ubmVjdCh0cmFjZURpc3BsYXkpO1xuICpcbiAqICAgYXVkaW9Jbk5vZGUuc3RhcnQoKTtcbiAqIH1cbiAqL1xuY2xhc3MgVHJhY2VEaXNwbGF5IGV4dGVuZHMgQmFzZURpc3BsYXkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnByZXZGcmFtZSA9IG51bGw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgaWYgKHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9PT0gMilcbiAgICAgIHRoaXMucGFyYW1zLnNldCgnY29sb3JTY2hlbWUnLCAnbm9uZScpO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lLCBmcmFtZVdpZHRoLCBwaXhlbHNTaW5jZUxhc3RGcmFtZSkge1xuICAgIGNvbnN0IGNvbG9yU2NoZW1lID0gdGhpcy5wYXJhbXMuZ2V0KCdjb2xvclNjaGVtZScpO1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xuICAgIGNvbnN0IHByZXZEYXRhID0gdGhpcy5wcmV2RnJhbWUgPyB0aGlzLnByZXZGcmFtZS5kYXRhIDogbnVsbDtcbiAgICBjb25zdCBkYXRhID0gZnJhbWUuZGF0YTtcblxuICAgIGNvbnN0IGhhbGZSYW5nZSA9IGRhdGFbMV0gLyAyO1xuICAgIGNvbnN0IG1lYW4gPSB0aGlzLmdldFlQb3NpdGlvbihkYXRhWzBdKTtcbiAgICBjb25zdCBtaW4gPSB0aGlzLmdldFlQb3NpdGlvbihkYXRhWzBdIC0gaGFsZlJhbmdlKTtcbiAgICBjb25zdCBtYXggPSB0aGlzLmdldFlQb3NpdGlvbihkYXRhWzBdICsgaGFsZlJhbmdlKTtcblxuICAgIGxldCBwcmV2SGFsZlJhbmdlO1xuICAgIGxldCBwcmV2TWVhbjtcbiAgICBsZXQgcHJldk1pbjtcbiAgICBsZXQgcHJldk1heDtcblxuICAgIGlmIChwcmV2RGF0YSAhPT0gbnVsbCkge1xuICAgICAgcHJldkhhbGZSYW5nZSA9IHByZXZEYXRhWzFdIC8gMjtcbiAgICAgIHByZXZNZWFuID0gdGhpcy5nZXRZUG9zaXRpb24ocHJldkRhdGFbMF0pO1xuICAgICAgcHJldk1pbiA9IHRoaXMuZ2V0WVBvc2l0aW9uKHByZXZEYXRhWzBdIC0gcHJldkhhbGZSYW5nZSk7XG4gICAgICBwcmV2TWF4ID0gdGhpcy5nZXRZUG9zaXRpb24ocHJldkRhdGFbMF0gKyBwcmV2SGFsZlJhbmdlKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2xvciA9IHRoaXMucGFyYW1zLmdldCgnY29sb3InKTtcbiAgICBsZXQgZ3JhZGllbnQ7XG4gICAgbGV0IHJnYjtcblxuICAgIHN3aXRjaCAoY29sb3JTY2hlbWUpIHtcbiAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICByZ2IgPSBoZXhUb1JHQihjb2xvcik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBgcmdiYSgke3JnYi5qb2luKCcsJyl9LCAwLjcpYDtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2h1ZSc6XG4gICAgICAgIGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC1waXhlbHNTaW5jZUxhc3RGcmFtZSwgMCwgMCwgMCk7XG5cbiAgICAgICAgaWYgKHByZXZEYXRhKVxuICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBgaHNsKCR7Z2V0SHVlKHByZXZEYXRhWzJdKX0sIDEwMCUsIDUwJSlgKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBgaHNsKCR7Z2V0SHVlKGRhdGFbMl0pfSwgMTAwJSwgNTAlKWApO1xuXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBgaHNsKCR7Z2V0SHVlKGRhdGFbMl0pfSwgMTAwJSwgNTAlKWApO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29wYWNpdHknOlxuICAgICAgICByZ2IgPSBoZXhUb1JHQih0aGlzLnBhcmFtcy5nZXQoJ2NvbG9yJykpO1xuICAgICAgICBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgtcGl4ZWxzU2luY2VMYXN0RnJhbWUsIDAsIDAsIDApO1xuXG4gICAgICAgIGlmIChwcmV2RGF0YSlcbiAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgYHJnYmEoJHtyZ2Iuam9pbignLCcpfSwgJHtwcmV2RGF0YVsyXX0pYCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgYHJnYmEoJHtyZ2Iuam9pbignLCcpfSwgJHtkYXRhWzJdfSlgKTtcblxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgYHJnYmEoJHtyZ2Iuam9pbignLCcpfSwgJHtkYXRhWzJdfSlgKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY3R4LnNhdmUoKTtcbiAgICAvLyBkcmF3IHJhbmdlXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMCwgbWVhbik7XG4gICAgY3R4LmxpbmVUbygwLCBtYXgpO1xuXG4gICAgaWYgKHByZXZEYXRhICE9PSBudWxsKSB7XG4gICAgICBjdHgubGluZVRvKC1waXhlbHNTaW5jZUxhc3RGcmFtZSwgcHJldk1heCk7XG4gICAgICBjdHgubGluZVRvKC1waXhlbHNTaW5jZUxhc3RGcmFtZSwgcHJldk1pbik7XG4gICAgfVxuXG4gICAgY3R4LmxpbmVUbygwLCBtaW4pO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgIGN0eC5maWxsKCk7XG5cbiAgICAvLyBkcmF3IG1lYW5cbiAgICBpZiAoY29sb3JTY2hlbWUgPT09ICdub25lJyAmJiBwcmV2TWVhbikge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygtcGl4ZWxzU2luY2VMYXN0RnJhbWUsIHByZXZNZWFuKTtcbiAgICAgIGN0eC5saW5lVG8oMCwgbWVhbik7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG5cbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgdGhpcy5wcmV2RnJhbWUgPSBmcmFtZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVHJhY2VEaXNwbGF5O1xuIiwiaW1wb3J0IEJhc2VEaXNwbGF5IGZyb20gJy4vQmFzZURpc3BsYXknO1xuaW1wb3J0IFJtcyBmcm9tICcuLi8uLi9jb21tb24vb3BlcmF0b3IvUm1zJztcblxuY29uc3QgbG9nMTAgPSBNYXRoLmxvZzEwO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgb2Zmc2V0OiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAtMTQsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIG1pbjoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogLTgwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBtYXg6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IDYsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIHdpZHRoOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDYsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH1cbn1cblxuLyoqXG4gKiBTaW1wbGUgVlUtTWV0ZXIgdG8gdXNlZCBvbiBhIGBzaWduYWxgIHN0cmVhbS5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNsaWVudC5zaW5rXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0cyBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm9mZnNldD0tMTRdIC0gZEIgb2Zmc2V0IGFwcGxpZWQgdG8gdGhlIHNpZ25hbC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW49LTgwXSAtIE1pbmltdW0gZGlzcGxheWVkIHZhbHVlIChpbiBkQikuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4PTZdIC0gTWF4aW11bSBkaXNwbGF5ZWQgdmFsdWUgKGluIGRCKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53aWR0aD02XSAtIFdpZHRoIG9mIHRoZSBkaXNwbGF5IChpbiBwaXhlbHMpLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSAtIENvbnRhaW5lciBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gaW5zZXJ0IHRoZSBjYW52YXMuXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNhbnZhcz1udWxsXSAtIENhbnZhcyBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gZHJhdy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGF1ZGlvQ29udGV4dCA9IG5ldyB3aW5kb3cuQXVkaW9Db250ZXh0KCk7XG4gKlxuICogbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICogICAuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSlcbiAqICAgLnRoZW4oaW5pdClcbiAqICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKSk7XG4gKlxuICogZnVuY3Rpb24gaW5pdChzdHJlYW0pIHtcbiAqICAgY29uc3Qgc291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gKlxuICogICBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAqICAgICBhdWRpb0NvbnRleHQ6IGF1ZGlvQ29udGV4dCxcbiAqICAgICBzb3VyY2VOb2RlOiBzb3VyY2UsXG4gKiAgIH0pO1xuICpcbiAqICAgY29uc3QgdnVNZXRlciA9IG5ldyBsZm8uc2luay5WdU1ldGVyRGlzcGxheSh7XG4gKiAgICAgY2FudmFzOiAnI3Z1LW1ldGVyJyxcbiAqICAgfSk7XG4gKlxuICogICBhdWRpb0luTm9kZS5jb25uZWN0KHZ1TWV0ZXIpO1xuICogICBhdWRpb0luTm9kZS5zdGFydCgpO1xuICogfVxuICovXG5jbGFzcyBWdU1ldGVyRGlzcGxheSBleHRlbmRzIEJhc2VEaXNwbGF5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMsIGZhbHNlKTtcblxuICAgIHRoaXMucm1zT3BlcmF0b3IgPSBuZXcgUm1zKCk7XG5cbiAgICB0aGlzLmxhc3REQiA9IDA7XG4gICAgdGhpcy5wZWFrID0ge1xuICAgICAgdmFsdWU6IDAsXG4gICAgICB0aW1lOiAwLFxuICAgIH1cblxuICAgIHRoaXMucGVha0xpZmV0aW1lID0gMTsgLy8gc2VjXG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5ybXNPcGVyYXRvci5pbml0U3RyZWFtKHRoaXMuc3RyZWFtUGFyYW1zKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMDsgLy8gc2VjXG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5wYXJhbXMuZ2V0KCdvZmZzZXQnKTsgLy8gb2Zmc2V0IHplcm8gb2YgdGhlIHZ1IG1ldGVyXG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoO1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xuXG4gICAgY29uc3QgbGFzdERCID0gdGhpcy5sYXN0REI7XG4gICAgY29uc3QgcGVhayA9IHRoaXMucGVhaztcblxuICAgIGNvbnN0IHJlZCA9ICcjZmYyMTIxJztcbiAgICBjb25zdCB5ZWxsb3cgPSAnI2ZmZmYxZic7XG4gICAgY29uc3QgZ3JlZW4gPSAnIzAwZmYwMCc7XG5cbiAgICAvLyBoYW5kbGUgY3VycmVudCBkYiB2YWx1ZVxuICAgIGNvbnN0IHJtcyA9IHRoaXMucm1zT3BlcmF0b3IuaW5wdXRTaWduYWwoZnJhbWUuZGF0YSk7XG4gICAgbGV0IGRCID0gMjAgKiBsb2cxMChybXMpIC0gb2Zmc2V0O1xuXG4gICAgLy8gc2xvdyByZWxlYXNlIChjb3VsZCBwcm9iYWJseSBiZSBpbXByb3ZlZClcbiAgICBpZiAobGFzdERCID4gZEIpXG4gICAgICBkQiA9IGxhc3REQiAtIDY7XG5cbiAgICAvLyBoYW5kbGUgcGVha1xuICAgIGlmIChkQiA+IHBlYWsudmFsdWUgfHzCoChub3cgLSBwZWFrLnRpbWUpID4gdGhpcy5wZWFrTGlmZXRpbWUpIHtcbiAgICAgIHBlYWsudmFsdWUgPSBkQjtcbiAgICAgIHBlYWsudGltZSA9IG5vdztcbiAgICB9XG5cbiAgICBjb25zdCB5MCA9IHRoaXMuZ2V0WVBvc2l0aW9uKDApO1xuICAgIGNvbnN0IHkgPSB0aGlzLmdldFlQb3NpdGlvbihkQik7XG4gICAgY29uc3QgeVBlYWsgPSB0aGlzLmdldFlQb3NpdGlvbihwZWFrLnZhbHVlKTtcblxuICAgIGN0eC5zYXZlKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIGNvbnN0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIGhlaWdodCwgMCwgMCk7XG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIGdyZWVuKTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoKGhlaWdodCAtIHkwKSAvIGhlaWdodCwgeWVsbG93KTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgcmVkKTtcblxuICAgIC8vIGRCXG4gICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgIGN0eC5maWxsUmVjdCgwLCB5LCB3aWR0aCwgaGVpZ2h0IC0geSk7XG5cbiAgICAvLyAwIGRCIG1hcmtlclxuICAgIGN0eC5maWxsU3R5bGUgPSAnI2RjZGNkYyc7XG4gICAgY3R4LmZpbGxSZWN0KDAsIHkwLCB3aWR0aCwgMik7XG5cbiAgICAvLyBwZWFrXG4gICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgIGN0eC5maWxsUmVjdCgwLCB5UGVhaywgd2lkdGgsIDIpO1xuXG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIHRoaXMubGFzdERCID0gZEI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVnVNZXRlckRpc3BsYXk7XG4iLCJpbXBvcnQgQmFzZURpc3BsYXkgZnJvbSAnLi9CYXNlRGlzcGxheSc7XG5pbXBvcnQgTWluTWF4IGZyb20gJy4uLy4uL2NvbW1vbi9vcGVyYXRvci9NaW5NYXgnO1xuaW1wb3J0IFJtcyBmcm9tICcuLi8uLi9jb21tb24vb3BlcmF0b3IvUm1zJztcbmltcG9ydCB7IGdldENvbG9ycyB9IGZyb20gJy4uL3V0aWxzL2Rpc3BsYXktdXRpbHMnO1xuXG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBjb2xvcnM6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBnZXRDb2xvcnMoJ3dhdmVmb3JtJyksXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIHJtczoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfVxufTtcblxuLyoqXG4gKiBEaXNwbGF5IGEgd2F2ZWZvcm0gKGFsb25nIHdpdGggb3B0aW9ubmFsIFJtcykgb2YgYSBnaXZlbiBgc2lnbmFsYCBpbnB1dCBpblxuICogYSBjYW52YXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IFtvcHRpb25zLmNvbG9ycz1bJ3dhdmVmb3JtJywgJ3JtcyddXSAtIEFycmF5XG4gKiAgY29udGFpbmluZyB0aGUgY29sb3IgY29kZXMgZm9yIHRoZSB3YXZlZm9ybSAoaW5kZXggMCkgYW5kIHJtcyAoaW5kZXggMSkuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ybXM9ZmFsc2VdIC0gU2V0IHRvIGB0cnVlYCB0byBkaXNwbGF5IHRoZSBybXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTFdIC0gRHVyYXRpb24gKGluIHNlY29uZHMpIHJlcHJlc2VudGVkIGluXG4gKiAgdGhlIGNhbnZhcy4gX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tMV0gLSBNaW5pbXVtIHZhbHVlIHJlcHJlc2VudGVkIGluIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucmVmZXJlbmNlVGltZT1udWxsXSAtIE9wdGlvbm5hbCByZWZlcmVuY2UgdGltZSB0aGVcbiAqICBkaXNwbGF5IHNob3VsZCBjb25zaWRlcmVyIGFzIHRoZSBvcmlnaW4uIElzIG9ubHkgdXNlZnVsbCB3aGVuIHN5bmNocm9uaXppbmdcbiAqICBzZXZlcmFsIGRpc3BsYXkgdXNpbmcgdGhlIGBEaXNwbGF5U3luY2AgY2xhc3MuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2lua1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IHdpbmRvdy5BdWRpb0NvbnRleHQoKTtcbiAqXG4gKiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gKiAgIC5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KVxuICogICAudGhlbihpbml0KVxuICogICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIuc3RhY2spKTtcbiAqXG4gKiBmdW5jdGlvbiBpbml0KHN0cmVhbSkge1xuICogICBjb25zdCBhdWRpb0luID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gKlxuICogICBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAqICAgICBhdWRpb0NvbnRleHQ6IGF1ZGlvQ29udGV4dCxcbiAqICAgICBzb3VyY2VOb2RlOiBhdWRpb0luLFxuICogICAgIGZyYW1lU2l6ZTogNTEyLFxuICogICB9KTtcbiAqXG4gKiAgIGNvbnN0IHdhdmVmb3JtRGlzcGxheSA9IG5ldyBsZm8uc2luay5XYXZlZm9ybURpc3BsYXkoe1xuICogICAgIGNhbnZhczogJyN3YXZlZm9ybScsXG4gKiAgICAgZHVyYXRpb246IDMuNSxcbiAqICAgICBybXM6IHRydWUsXG4gKiAgIH0pO1xuICpcbiAqICAgYXVkaW9Jbk5vZGUuY29ubmVjdCh3YXZlZm9ybURpc3BsYXkpO1xuICogICBhdWRpb0luTm9kZS5zdGFydCgpO1xuICogfSk7XG4gKi9cbmNsYXNzIFdhdmVmb3JtRGlzcGxheSBleHRlbmRzIEJhc2VEaXNwbGF5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zLCB0cnVlKTtcblxuICAgIHRoaXMubWluTWF4T3BlcmF0b3IgPSBuZXcgTWluTWF4KCk7XG4gICAgdGhpcy5ybXNPcGVyYXRvciA9IG5ldyBSbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLm1pbk1heE9wZXJhdG9yLmluaXRTdHJlYW0odGhpcy5zdHJlYW1QYXJhbXMpO1xuICAgIHRoaXMucm1zT3BlcmF0b3IuaW5pdFN0cmVhbSh0aGlzLnN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUsIGZyYW1lV2lkdGgsIHBpeGVsc1NpbmNlTGFzdEZyYW1lKSB7XG4gICAgLy8gZHJvcCBmcmFtZXMgdGhhdCBjYW5ub3QgYmUgZGlzcGxheWVkXG4gICAgaWYgKGZyYW1lV2lkdGggPCAxKSByZXR1cm47XG5cbiAgICBjb25zdCBjb2xvcnMgPSB0aGlzLnBhcmFtcy5nZXQoJ2NvbG9ycycpO1xuICAgIGNvbnN0IHNob3dSbXMgPSB0aGlzLnBhcmFtcy5nZXQoJ3JtcycpO1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xuICAgIGNvbnN0IGRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIGNvbnN0IGlTYW1wbGVzUGVyUGl4ZWxzID0gTWF0aC5mbG9vcihkYXRhLmxlbmd0aCAvIGZyYW1lV2lkdGgpO1xuXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZyYW1lV2lkdGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBpU2FtcGxlc1BlclBpeGVscztcbiAgICAgIGNvbnN0IGVuZCA9IGluZGV4ID09PSBmcmFtZVdpZHRoIC0gMSA/IHVuZGVmaW5lZCA6IHN0YXJ0ICsgaVNhbXBsZXNQZXJQaXhlbHM7XG4gICAgICBjb25zdCBzbGljZSA9IGRhdGEuc3ViYXJyYXkoc3RhcnQsIGVuZCk7XG5cbiAgICAgIGNvbnN0IG1pbk1heCA9IHRoaXMubWluTWF4T3BlcmF0b3IuaW5wdXRTaWduYWwoc2xpY2UpO1xuICAgICAgY29uc3QgbWluWSA9IHRoaXMuZ2V0WVBvc2l0aW9uKG1pbk1heFswXSk7XG4gICAgICBjb25zdCBtYXhZID0gdGhpcy5nZXRZUG9zaXRpb24obWluTWF4WzFdKTtcblxuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3JzWzBdO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhpbmRleCwgbWluWSk7XG4gICAgICBjdHgubGluZVRvKGluZGV4LCBtYXhZKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgaWYgKHNob3dSbXMpIHtcbiAgICAgICAgY29uc3Qgcm1zID0gdGhpcy5ybXNPcGVyYXRvci5pbnB1dFNpZ25hbChzbGljZSk7XG4gICAgICAgIGNvbnN0IHJtc01heFkgPSB0aGlzLmdldFlQb3NpdGlvbihybXMpO1xuICAgICAgICBjb25zdCBybXNNaW5ZID0gdGhpcy5nZXRZUG9zaXRpb24oLXJtcyk7XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3JzWzFdO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oaW5kZXgsIHJtc01pblkpO1xuICAgICAgICBjdHgubGluZVRvKGluZGV4LCBybXNNYXhZKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhdmVmb3JtRGlzcGxheTtcbiIsIi8vIGNvbW1vblxuaW1wb3J0IEJyaWRnZSBmcm9tICcuLi8uLi9jb21tb24vc2luay9CcmlkZ2UnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuLi8uLi9jb21tb24vc2luay9Mb2dnZXInO1xuaW1wb3J0IERhdGFSZWNvcmRlciBmcm9tICcuLi8uLi9jb21tb24vc2luay9EYXRhUmVjb3JkZXInO1xuaW1wb3J0IFNpZ25hbFJlY29yZGVyIGZyb20gJy4uLy4uL2NvbW1vbi9zaW5rL1NpZ25hbFJlY29yZGVyJztcblxuLy8gY2xpZW50IG9ubHlcbmltcG9ydCBCYXNlRGlzcGxheSBmcm9tICcuL0Jhc2VEaXNwbGF5JztcbmltcG9ydCBCcGZEaXNwbGF5IGZyb20gJy4vQnBmRGlzcGxheSc7XG5pbXBvcnQgTWFya2VyRGlzcGxheSBmcm9tICcuL01hcmtlckRpc3BsYXknO1xuaW1wb3J0IFNpZ25hbERpc3BsYXkgZnJvbSAnLi9TaWduYWxEaXNwbGF5JztcbmltcG9ydCBTb2NrZXRTZW5kIGZyb20gJy4vU29ja2V0U2VuZCc7XG5pbXBvcnQgU3BlY3RydW1EaXNwbGF5IGZyb20gJy4vU3BlY3RydW1EaXNwbGF5JztcbmltcG9ydCBUcmFjZURpc3BsYXkgZnJvbSAnLi9UcmFjZURpc3BsYXknO1xuaW1wb3J0IFZ1TWV0ZXJEaXNwbGF5IGZyb20gJy4vVnVNZXRlckRpc3BsYXknO1xuaW1wb3J0IFdhdmVmb3JtRGlzcGxheSBmcm9tICcuL1dhdmVmb3JtRGlzcGxheSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQnJpZGdlLFxuICBMb2dnZXIsXG4gIERhdGFSZWNvcmRlcixcbiAgU2lnbmFsUmVjb3JkZXIsXG5cbiAgQmFzZURpc3BsYXksXG4gIEJwZkRpc3BsYXksXG4gIE1hcmtlckRpc3BsYXksXG4gIFNpZ25hbERpc3BsYXksXG4gIFNvY2tldFNlbmQsXG4gIFNwZWN0cnVtRGlzcGxheSxcbiAgVHJhY2VEaXNwbGF5LFxuICBWdU1ldGVyRGlzcGxheSxcbiAgV2F2ZWZvcm1EaXNwbGF5LFxufTtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5pbXBvcnQgU291cmNlTWl4aW4gZnJvbSAnLi4vLi4vY29yZS9Tb3VyY2VNaXhpbic7XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGF1ZGlvQnVmZmVyOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgZnJhbWVTaXplOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDUxMixcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgY2hhbm5lbDoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAwLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBwcm9ncmVzc0NhbGxiYWNrOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgcHJvZ3Jlc3NDYWxsYmFjazoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIGFzeW5jOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICB9LFxufTtcblxuY29uc3Qgbm9vcCA9IGZ1bmN0aW9uKCkge307XG5cbi8qKlxuICogU2xpY2UgYW4gYEF1ZGlvQnVmZmVyYCBpbnRvIHNpZ25hbCBibG9ja3MgYW5kIHByb3BhZ2F0ZSB0aGUgcmVzdWx0aW5nIGZyYW1lc1xuICogdGhyb3VnaCB0aGUgZ3JhcGguXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBwYXJhbWV0ZXInIGRlZmF1bHQgdmFsdWVzLlxuICogQHBhcmFtIHtBdWRpb0J1ZmZlcn0gW29wdGlvbnMuYXVkaW9CdWZmZXJdIC0gQXVkaW8gYnVmZmVyIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZnJhbWVTaXplPTUxMl0gLSBTaXplIG9mIHRoZSBvdXRwdXQgYmxvY2tzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmNoYW5uZWw9MF0gLSBOdW1iZXIgb2YgdGhlIGNoYW5uZWwgdG8gcHJvY2Vzcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5wcm9ncmVzc0NhbGxiYWNrPW51bGxdIC0gQ2FsbGJhY2sgdG8gYmUgZXhjdXRlZCBvbiBlYWNoXG4gKiAgZnJhbWUgb3V0cHV0LCByZWNlaXZlIGFzIGFyZ3VtZW50IHRoZSBjdXJyZW50IHByb2dyZXNzIHJhdGlvLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNvdXJjZVxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9JbkJ1ZmZlciA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5CdWZmZXIoe1xuICogICBhdWRpb0J1ZmZlcjogYXVkaW9CdWZmZXIsXG4gKiAgIGZyYW1lU2l6ZTogNTEyLFxuICogfSk7XG4gKlxuICogY29uc3Qgd2F2ZWZvcm0gPSBuZXcgbGZvLnNpbmsuV2F2ZWZvcm0oe1xuICogICBjYW52YXM6ICcjd2F2ZWZvcm0nLFxuICogICBkdXJhdGlvbjogMSxcbiAqICAgY29sb3I6ICdzdGVlbGJsdWUnLFxuICogICBybXM6IHRydWUsXG4gKiB9KTtcbiAqXG4gKiBhdWRpb0luQnVmZmVyLmNvbm5lY3Qod2F2ZWZvcm0pO1xuICogYXVkaW9JbkJ1ZmZlci5zdGFydCgpO1xuICovXG5jbGFzcyBBdWRpb0luQnVmZmVyIGV4dGVuZHMgU291cmNlTWl4aW4oQmFzZUxmbykge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBhdWRpb0J1ZmZlciA9IHRoaXMucGFyYW1zLmdldCgnYXVkaW9CdWZmZXInKTtcblxuICAgIGlmICghYXVkaW9CdWZmZXIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJhdWRpb0J1ZmZlclwiIHBhcmFtZXRlcicpO1xuXG4gICAgdGhpcy5lbmRUaW1lID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9wYWdhdGUgdGhlIGBzdHJlYW1QYXJhbXNgIGluIHRoZSBncmFwaCBhbmQgc3RhcnQgcHJvcGFnYXRpbmcgZnJhbWVzLlxuICAgKiBXaGVuIGNhbGxlZCwgdGhlIHNsaWNpbmcgb2YgdGhlIGdpdmVuIGBhdWRpb0J1ZmZlcmAgc3RhcnRzIGltbWVkaWF0ZWx5IGFuZFxuICAgKiBlYWNoIHJlc3VsdGluZyBmcmFtZSBpcyBwcm9wYWdhdGVkIGluIGdyYXBoLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzU3RyZWFtUGFyYW1zfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNyZXNldFN0cmVhbX1cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNsaWVudC5zb3VyY2UuQXVkaW9JbkJ1ZmZlciNzdG9wfVxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQgPT09IGZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5pbml0UHJvbWlzZSA9PT0gbnVsbCkgLy8gaW5pdCBoYXMgbm90IHlldCBiZWVuIGNhbGxlZFxuICAgICAgICB0aGlzLmluaXRQcm9taXNlID0gdGhpcy5pbml0KCk7XG5cbiAgICAgIHRoaXMuaW5pdFByb21pc2UudGhlbih0aGlzLnN0YXJ0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFubmVsID0gdGhpcy5wYXJhbXMuZ2V0KCdjaGFubmVsJyk7XG4gICAgY29uc3QgYXVkaW9CdWZmZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ2F1ZGlvQnVmZmVyJyk7XG4gICAgY29uc3QgYnVmZmVyID0gYXVkaW9CdWZmZXIuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbCk7XG4gICAgdGhpcy5lbmRUaW1lID0gMDtcbiAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5wcm9jZXNzRnJhbWUoYnVmZmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5hbGl6ZSB0aGUgc3RyZWFtIGFuZCBzdG9wIHRoZSB3aG9sZSBncmFwaC4gV2hlbiBjYWxsZWQsIHRoZSBzbGljaW5nIG9mXG4gICAqIHRoZSBgYXVkaW9CdWZmZXJgIHN0b3BzIGltbWVkaWF0ZWx5LlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNmaW5hbGl6ZVN0cmVhbX1cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNsaWVudC5zb3VyY2UuQXVkaW9JbkJ1ZmZlciNzdGFydH1cbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5maW5hbGl6ZVN0cmVhbSh0aGlzLmVuZFRpbWUpO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMoKSB7XG4gICAgY29uc3QgYXVkaW9CdWZmZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ2F1ZGlvQnVmZmVyJyk7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdmcmFtZVNpemUnKTtcbiAgICBjb25zdCBzb3VyY2VTYW1wbGVSYXRlID0gYXVkaW9CdWZmZXIuc2FtcGxlUmF0ZTtcbiAgICBjb25zdCBmcmFtZVJhdGUgPSBzb3VyY2VTYW1wbGVSYXRlIC8gZnJhbWVTaXplO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gZnJhbWVTaXplO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZSA9IGZyYW1lUmF0ZTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAnc2lnbmFsJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlID0gc291cmNlU2FtcGxlUmF0ZTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVDb3VudCA9IGZyYW1lU2l6ZTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc0ZyYW1lKGJ1ZmZlcikge1xuICAgIGNvbnN0IGFzeW5jID0gdGhpcy5wYXJhbXMuZ2V0KCdhc3luYycpO1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBwcm9ncmVzc0NhbGxiYWNrID0gdGhpcy5wYXJhbXMuZ2V0KCdwcm9ncmVzc0NhbGxiYWNrJykgfHzCoG5vb3A7XG4gICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcbiAgICBjb25zdCBuYnJGcmFtZXMgPSBNYXRoLmNlaWwoYnVmZmVyLmxlbmd0aCAvIGZyYW1lU2l6ZSk7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBsZXQgaSA9IDA7XG5cbiAgICBmdW5jdGlvbiBzbGljZSgpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IGkgKiBmcmFtZVNpemU7XG4gICAgICBjb25zdCBuYnJDb3B5ID0gTWF0aC5taW4obGVuZ3RoIC0gb2Zmc2V0LCBmcmFtZVNpemUpO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZyYW1lU2l6ZTsgaisrKVxuICAgICAgICBkYXRhW2pdID0gaiA8IG5ickNvcHkgPyBidWZmZXJbb2Zmc2V0ICsgal0gOiAwO1xuXG4gICAgICB0aGF0LmZyYW1lLnRpbWUgPSBvZmZzZXQgLyBzYW1wbGVSYXRlO1xuICAgICAgdGhhdC5lbmRUaW1lID0gdGhhdC5mcmFtZS50aW1lICsgbmJyQ29weSAvIHNhbXBsZVJhdGU7XG4gICAgICB0aGF0LnByb3BhZ2F0ZUZyYW1lKCk7XG5cbiAgICAgIGkgKz0gMTtcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2soaSAvIG5ickZyYW1lcyk7XG5cbiAgICAgIGlmIChpIDwgbmJyRnJhbWVzKSB7XG4gICAgICAgIGlmIChhc3luYylcbiAgICAgICAgICBzZXRUaW1lb3V0KHNsaWNlLCAwKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHNsaWNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmZpbmFsaXplU3RyZWFtKHRoYXQuZW5kVGltZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGFsbG93IHRoZSBmb2xsb3dpbmcgdG8gZG8gdGhlIGV4cGVjdGVkIHRoaW5nOlxuICAgIC8vIGF1ZGlvSW4uY29ubmVjdChyZWNvcmRlcik7XG4gICAgLy8gYXVkaW9Jbi5zdGFydCgpO1xuICAgIC8vIHJlY29yZGVyLnN0YXJ0KCk7XG4gICAgc2V0VGltZW91dChzbGljZSwgMCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9JbkJ1ZmZlcjtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5pbXBvcnQgU291cmNlTWl4aW4gZnJvbSAnLi4vLi4vY29yZS9Tb3VyY2VNaXhpbic7XG5cbmNvbnN0IEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHzCoHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBmcmFtZVNpemU6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogNTEyLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBjaGFubmVsOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDAsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIHNvdXJjZU5vZGU6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBhdWRpb0NvbnRleHQ6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxufTtcblxuLyoqXG4gKiBVc2UgYSBgV2ViQXVkaW9gIG5vZGUgYXMgYSBzb3VyY2UgZm9yIHRoZSBncmFwaC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIHBhcmFtZXRlcicgZGVmYXVsdCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0F1ZGlvTm9kZX0gW29wdGlvbnMuc291cmNlTm9kZT1udWxsXSAtIEF1ZGlvIG5vZGUgdG8gcHJvY2Vzc1xuICogIChtYW5kYXRvcnkpLlxuICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IFtvcHRpb25zLmF1ZGlvQ29udGV4dD1udWxsXSAtIEF1ZGlvIGNvbnRleHQgdXNlZCB0b1xuICogIGNyZWF0ZSB0aGUgYXVkaW8gbm9kZSAobWFuZGF0b3J5KS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5mcmFtZVNpemU9NTEyXSAtIFNpemUgb2YgdGhlIG91dHB1dCBibG9ja3MsIGRlZmluZVxuICogIHRoZSBgZnJhbWVTaXplYCBpbiB0aGUgYHN0cmVhbVBhcmFtc2AuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY2hhbm5lbD0wXSAtIE51bWJlciBvZiB0aGUgY2hhbm5lbCB0byBwcm9jZXNzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNvdXJjZVxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICogY29uc3Qgc2luZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gKiBzaW5lLmZyZXF1ZW5jeS52YWx1ZSA9IDI7XG4gKlxuICogY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gKiAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICBzb3VyY2VOb2RlOiBzaW5lLFxuICogfSk7XG4gKlxuICogY29uc3Qgc2lnbmFsRGlzcGxheSA9IG5ldyBsZm8uc2luay5TaWduYWxEaXNwbGF5KHtcbiAqICAgY2FudmFzOiAnI3NpZ25hbCcsXG4gKiAgIGR1cmF0aW9uOiAxLFxuICogfSk7XG4gKlxuICogYXVkaW9Jbk5vZGUuY29ubmVjdChzaWduYWxEaXNwbGF5KTtcbiAqXG4gKiAvLyBzdGFydCB0aGUgc2luZSBvc2NpbGxhdG9yIG5vZGUgYW5kIHRoZSBsZm8gZ3JhcGhcbiAqIHNpbmUuc3RhcnQoKTtcbiAqIGF1ZGlvSW5Ob2RlLnN0YXJ0KCk7XG4gKi9cbmNsYXNzIEF1ZGlvSW5Ob2RlIGV4dGVuZHMgU291cmNlTWl4aW4oQmFzZUxmbykge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBhdWRpb0NvbnRleHQgPSB0aGlzLnBhcmFtcy5nZXQoJ2F1ZGlvQ29udGV4dCcpO1xuICAgIGNvbnN0IHNvdXJjZU5vZGUgPSB0aGlzLnBhcmFtcy5nZXQoJ3NvdXJjZU5vZGUnKTtcblxuICAgIGlmICghYXVkaW9Db250ZXh0IHx8ICEoYXVkaW9Db250ZXh0IGluc3RhbmNlb2YgQXVkaW9Db250ZXh0KSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBgYXVkaW9Db250ZXh0YCBwYXJhbWV0ZXInKTtcblxuICAgIGlmICghc291cmNlTm9kZSB8fCAhKHNvdXJjZU5vZGUgaW5zdGFuY2VvZiBBdWRpb05vZGUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGBzb3VyY2VOb2RlYCBwYXJhbWV0ZXInKTtcblxuICAgIHRoaXMuc291cmNlTm9kZSA9IHNvdXJjZU5vZGU7XG4gICAgdGhpcy5fY2hhbm5lbCA9IHRoaXMucGFyYW1zLmdldCgnY2hhbm5lbCcpO1xuICAgIHRoaXMuX2Jsb2NrRHVyYXRpb24gPSBudWxsO1xuXG4gICAgdGhpcy5wcm9jZXNzRnJhbWUgPSB0aGlzLnByb2Nlc3NGcmFtZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3BhZ2F0ZSB0aGUgYHN0cmVhbVBhcmFtc2AgaW4gdGhlIGdyYXBoIGFuZCBzdGFydCB0byBwcm9wYWdhdGUgc2lnbmFsXG4gICAqIGJsb2NrcyBwcm9kdWNlZCBieSB0aGUgYXVkaW8gbm9kZSBpbnRvIHRoZSBncmFwaC5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcmVzZXRTdHJlYW19XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjbGllbnQuc291cmNlLkF1ZGlvSW5Ob2RlI3N0b3B9XG4gICAqL1xuICBzdGFydCgpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCA9PT0gZmFsc2UpIHtcbiAgICAgIGlmICh0aGlzLmluaXRQcm9taXNlID09PSBudWxsKSAvLyBpbml0IGhhcyBub3QgeWV0IGJlZW4gY2FsbGVkXG4gICAgICAgIHRoaXMuaW5pdFByb21pc2UgPSB0aGlzLmluaXQoKTtcblxuICAgICAgdGhpcy5pbml0UHJvbWlzZS50aGVuKHRoaXMuc3RhcnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGF1ZGlvQ29udGV4dCA9IHRoaXMucGFyYW1zLmdldCgnYXVkaW9Db250ZXh0Jyk7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdmcmFtZVNpemUnKTtcblxuICAgIHRoaXMuZnJhbWUudGltZSA9IDA7XG4gICAgLy8gQG5vdGU6IHJlY3JlYXRlIGVhY2ggdGltZSBiZWNhdXNlIG9mIGEgZmlyZWZveCB3ZWlyZCBiZWhhdmlvclxuICAgIHRoaXMuc2NyaXB0UHJvY2Vzc29yID0gYXVkaW9Db250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcihmcmFtZVNpemUsIDEsIDEpO1xuICAgIHRoaXMuc2NyaXB0UHJvY2Vzc29yLm9uYXVkaW9wcm9jZXNzID0gdGhpcy5wcm9jZXNzRnJhbWU7XG5cbiAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc291cmNlTm9kZS5jb25uZWN0KHRoaXMuc2NyaXB0UHJvY2Vzc29yKTtcbiAgICB0aGlzLnNjcmlwdFByb2Nlc3Nvci5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogRmluYWxpemUgdGhlIHN0cmVhbSBhbmQgc3RvcCB0aGUgd2hvbGUgZ3JhcGguXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2ZpbmFsaXplU3RyZWFtfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y2xpZW50LnNvdXJjZS5BdWRpb0luTm9kZSNzdGFydH1cbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5maW5hbGl6ZVN0cmVhbSh0aGlzLmZyYW1lLnRpbWUpO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgIHRoaXMuc291cmNlTm9kZS5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5zY3JpcHRQcm9jZXNzb3IuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMoKSB7XG4gICAgY29uc3QgYXVkaW9Db250ZXh0ID0gdGhpcy5wYXJhbXMuZ2V0KCdhdWRpb0NvbnRleHQnKTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZyYW1lU2l6ZScpO1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSBhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZTtcblxuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IGZyYW1lU2l6ZTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVJhdGUgPSBzYW1wbGVSYXRlIC8gZnJhbWVTaXplO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICdzaWduYWwnO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGUgPSBzYW1wbGVSYXRlO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZUNvdW50ID0gZnJhbWVTaXplO1xuXG4gICAgdGhpcy5fYmxvY2tEdXJhdGlvbiA9IGZyYW1lU2l6ZSAvIHNhbXBsZVJhdGU7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJhc2ljYWxseSB0aGUgYHNjcmlwdFByb2Nlc3Nvci5vbmF1ZGlvcHJvY2Vzc2AgY2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByb2Nlc3NGcmFtZShlKSB7XG4gICAgaWYgKHRoaXMuc3RhcnRlZCA9PT0gZmFsc2UpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLmZyYW1lLmRhdGEgPSBlLmlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKHRoaXMuX2NoYW5uZWwpO1xuICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcblxuICAgIHRoaXMuZnJhbWUudGltZSArPSB0aGlzLl9ibG9ja0R1cmF0aW9uO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvSW5Ob2RlO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcbmltcG9ydCB7IG9wY29kZXMsIGVuY29kZXJzLCBkZWNvZGVycyB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscy93c1V0aWxzJztcblxuY29uc3QgcGFyYW1ldGVycyA9IHtcbiAgcG9ydDoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiA4MDAwLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICB1cmw6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9XG59XG5cbi8qKlxuICogUmVjZWl2ZSBhbiBsZm8gZnJhbWUgYXMgYSBzb2NrZXQgbWVzc2FnZSBmcm9tIGEgYG5vZGUuc2luay5Tb2NrZXRTZW5kYFxuICogaW5zdGFuY2UuXG4gKlxuICogPHAgY2xhc3M9XCJ3YXJuaW5nXCI+RXhwZXJpbWVudGFsPC9wPlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNvdXJjZVxuICpcbiAqIEB0b2RvIC0gaGFuZGxlIGluaXQgLyBzdGFydCBwcm9wZXJseS5cbiAqL1xuY2xhc3MgU29ja2V0UmVjZWl2ZSBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbWV0ZXJzLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHByb3RvY29sID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XG4gICAgY29uc3QgYWRkcmVzcyA9IHRoaXMucGFyYW1zLmdldCgndXJsJykgfHzCoHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBjb25zdCBwb3J0ID0gdGhpcy5wYXJhbXMuZ2V0KCdwb3J0JykgfHwgJyc7IC8vIGV2ZXJ5dGhpbmcgZmFsc3kgYmVjb21lcyAnJ1xuICAgIGNvbnN0IHNvY2tldEFkZHJlc3MgPSBgJHtwcm90b2NvbH0vLyR7YWRkcmVzc306JHtwb3J0fWA7XG5cbiAgICB0aGlzLl9kaXNwYXRjaCA9IHRoaXMuX2Rpc3BhdGNoLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQoc29ja2V0QWRkcmVzcyk7XG4gICAgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG5cbiAgICB0aGlzLm9wZW5lZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnNvY2tldC5vbm9wZW4gPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zb2NrZXQub25tZXNzYWdlID0gdGhpcy5fZGlzcGF0Y2g7XG4gICAgdGhpcy5zb2NrZXQub25lcnJvciA9IChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBpbml0TW9kdWxlKCkge1xuICAgIGNvbnN0IHByb21pc2VzID0gdGhpcy5uZXh0TW9kdWxlcy5tYXAoKG1vZCkgPT4gbW9kLmluaXRNb2R1bGUoKSk7XG4gICAgcHJvbWlzZXMucHVzaCh0aGlzLm9wZW5lZFByb21pc2UpO1xuICAgIC8vIHdhaXQgZm9yIGNoaWxkcmVuIHByb21pc2VzIGFuZCBzZW5kIElOSVRfTU9EVUxFX0FDS1xuICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGVuY29kZXJzLmluaXRNb2R1bGVBY2soKTtcbiAgICAgIHRoaXMuc29ja2V0LnNlbmQoYnVmZmVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHByb2Nlc3MgYW55IHR5cGVcbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTY2FsYXIoKSB7fVxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcigpIHt9XG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKCkge31cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgdGhpcy5wcmVwYXJlRnJhbWUoKTtcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XG4gICAgdGhpcy5wcm9wYWdhdGVGcmFtZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlY29kZSBhbmQgZGlzcGF0Y2ggaW5jb21taW5nIGZyYW1lIGFjY29yZGluZyB0byBvcGNvZGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9kaXNwYXRjaChlKSB7XG4gICAgY29uc3QgYXJyYXlCdWZmZXIgPSBlLmRhdGE7XG4gICAgY29uc3Qgb3Bjb2RlID0gZGVjb2RlcnMub3Bjb2RlKGFycmF5QnVmZmVyKTtcblxuICAgIHN3aXRjaCAob3Bjb2RlKSB7XG4gICAgICBjYXNlIG9wY29kZXMuSU5JVF9NT0RVTEVfUkVROlxuICAgICAgICB0aGlzLmluaXRNb2R1bGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG9wY29kZXMuUFJPQ0VTU19TVFJFQU1fUEFSQU1TOlxuICAgICAgICBjb25zdCBwcmV2U3RyZWFtUGFyYW1zID0gZGVjb2RlcnMuc3RyZWFtUGFyYW1zKGFycmF5QnVmZmVyKTtcbiAgICAgICAgdGhpcy5wcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugb3Bjb2Rlcy5SRVNFVF9TVFJFQU06XG4gICAgICAgIHRoaXMucmVzZXRTdHJlYW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG9wY29kZXMuRklOQUxJWkVfU1RSRUFNOlxuICAgICAgICBjb25zdCBlbmRUaW1lID0gZGVjb2RlcnMuZmluYWxpemVTdHJlYW0oYXJyYXlCdWZmZXIpO1xuICAgICAgICB0aGlzLmZpbmFsaXplU3RyZWFtKGVuZFRpbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugb3Bjb2Rlcy5QUk9DRVNTX0ZSQU1FOlxuICAgICAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gZGVjb2RlcnMucHJvY2Vzc0ZyYW1lKGFycmF5QnVmZmVyLCBmcmFtZVNpemUpO1xuICAgICAgICB0aGlzLnByb2Nlc3NGcmFtZShmcmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTb2NrZXRSZWNlaXZlO1xuIiwiLy8gY29tbW9uXG5pbXBvcnQgRXZlbnRJbiBmcm9tICcuLi8uLi9jb21tb24vc291cmNlL0V2ZW50SW4nO1xuLy8gY2xpZW50IG9ubHlcbmltcG9ydCBBdWRpb0luQnVmZmVyIGZyb20gJy4vQXVkaW9JbkJ1ZmZlcic7XG5pbXBvcnQgQXVkaW9Jbk5vZGUgZnJvbSAnLi9BdWRpb0luTm9kZSc7XG5pbXBvcnQgU29ja2V0UmVjZWl2ZSBmcm9tICcuL1NvY2tldFJlY2VpdmUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEV2ZW50SW4sXG5cbiAgQXVkaW9JbkJ1ZmZlcixcbiAgQXVkaW9Jbk5vZGUsXG4gIFNvY2tldFJlY2VpdmUsXG59O1xuIiwiLyoqXG4gKiBTeW5jaHJvbml6ZSBzZXZlcmFsIGRpc3BsYXkgc2lua3MgdG8gYSBjb21tb24gdGltZS5cbiAqXG4gKiBAcGFyYW0gey4uLkJhc2VEaXNwbGF5fSB2aWV3cyAtIExpc3Qgb2YgdGhlIGRpc3BsYXkgdG8gc3luY2hyb25pemUuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQudXRpbHNcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4xID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3NjYWxhcicsXG4gKiAgIGZyYW1lU2l6ZTogMSxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGJwZjEgPSBuZXcgbGZvLnNpbmsuQnBmRGlzcGxheSh7XG4gKiAgIGNhbnZhczogJyNicGYtMScsXG4gKiAgIGR1cmF0aW9uOiAyLFxuICogICBzdGFydFRpbWU6IDAsXG4gKiAgIG1pbjogMCxcbiAqICAgY29sb3JzOiBbJ3N0ZWVsYmx1ZSddLFxuICogfSk7XG4gKlxuICogZXZlbnRJbjEuY29ubmVjdChicGYxKTtcbiAqXG4gKiBjb25zdCBldmVudEluMiA9IG5ldyBsZm8uc291cmNlLkV2ZW50SW4oe1xuICogICBmcmFtZVR5cGU6ICdzY2FsYXInLFxuICogICBmcmFtZVNpemU6IDEsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBicGYyID0gbmV3IGxmby5zaW5rLkJwZkRpc3BsYXkoe1xuICogICBjYW52YXM6ICcjYnBmLTInLFxuICogICBkdXJhdGlvbjogMixcbiAqICAgc3RhcnRUaW1lOiA3LFxuICogICBtaW46IDAsXG4gKiAgIGNvbG9yczogWydvcmFuZ2UnXSxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGRpc3BsYXlTeW5jID0gbmV3IGxmby51dGlscy5EaXNwbGF5U3luYyhicGYxLCBicGYyKTtcbiAqXG4gKiBldmVudEluMi5jb25uZWN0KGJwZjIpO1xuICpcbiAqIGV2ZW50SW4xLnN0YXJ0KCk7XG4gKiBldmVudEluMi5zdGFydCgpO1xuICpcbiAqIGxldCB0aW1lID0gMDtcbiAqIGNvbnN0IHBlcmlvZCA9IDAuNDtcbiAqIGNvbnN0IG9mZnNldCA9IDcuMjtcbiAqXG4gKiAoZnVuY3Rpb24gZ2VuZXJhdGVEYXRhKCkge1xuICogICBjb25zdCB2ID0gTWF0aC5yYW5kb20oKTtcbiAqXG4gKiAgIGV2ZW50SW4xLnByb2Nlc3ModGltZSwgdik7XG4gKiAgIGV2ZW50SW4yLnByb2Nlc3ModGltZSArIG9mZnNldCwgdik7XG4gKlxuICogICB0aW1lICs9IHBlcmlvZDtcbiAqXG4gKiAgIHNldFRpbWVvdXQoZ2VuZXJhdGVEYXRhLCBwZXJpb2QgKiAxMDAwKTtcbiAqIH0oKSk7XG4gKi9cbmNsYXNzIERpc3BsYXlTeW5jIHtcbiAgY29uc3RydWN0b3IoLi4udmlld3MpIHtcbiAgICB0aGlzLnZpZXdzID0gW107XG5cbiAgICB0aGlzLmFkZCguLi52aWV3cyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYWRkKC4uLnZpZXdzKSB7XG4gICAgdmlld3MuZm9yRWFjaCh2aWV3ID0+IHRoaXMuaW5zdGFsbCh2aWV3KSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgaW5zdGFsbCh2aWV3KSB7XG4gICAgdGhpcy52aWV3cy5wdXNoKHZpZXcpO1xuXG4gICAgdmlldy5kaXNwbGF5U3luYyA9IHRoaXM7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgc2hpZnRTaWJsaW5ncyhpU2hpZnQsIHRpbWUsIHZpZXcpIHtcbiAgICB0aGlzLnZpZXdzLmZvckVhY2goZnVuY3Rpb24oZGlzcGxheSkge1xuICAgICAgaWYgKGRpc3BsYXkgIT09IHZpZXcpXG4gICAgICAgIGRpc3BsYXkuc2hpZnRDYW52YXMoaVNoaWZ0LCB0aW1lKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXNwbGF5U3luYztcbiIsImltcG9ydCBEaXNwbGF5U3luYyBmcm9tICcuL0Rpc3BsYXlTeW5jJztcbmltcG9ydCBpbml0V2luZG93cyBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMvd2luZG93cyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgRGlzcGxheVN5bmMsXG4gIGluaXRXaW5kb3dzLFxufTtcbiIsImNvbnN0IGNvbG9ycyA9IFsnIzQ2ODJCNCcsICcjZmZhNTAwJywgJyMwMGU2MDAnLCAnI2ZmMDAwMCcsICcjODAwMDgwJywgJyMyMjQxNTMnXTtcblxuZXhwb3J0IGNvbnN0IGdldENvbG9ycyA9IGZ1bmN0aW9uKHR5cGUsIG5icikge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdzaWduYWwnOlxuICAgICAgcmV0dXJuIGNvbG9yc1swXTsgLy8gc3RlZWxibHVlXG4gICAgICBicmVhaztcbiAgICBjYXNlICdicGYnOlxuICAgICAgaWYgKG5iciA8PSBjb2xvcnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBjb2xvcnMuc2xpY2UoMCwgbmJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IF9jb2xvcnMgPSBjb2xvcnMuc2xpY2UoMCk7XG4gICAgICAgIHdoaWxlIChfY29sb3JzLmxlbmd0aCA8IG5icilcbiAgICAgICAgICBfY29sb3JzLnB1c2goZ2V0UmFuZG9tQ29sb3IoKSk7XG5cbiAgICAgICAgcmV0dXJuIF9jb2xvcnM7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICd3YXZlZm9ybSc6XG4gICAgICByZXR1cm4gW2NvbG9yc1swXSwgY29sb3JzWzVdXTsgLy8gc3RlZWxibHVlIC8gZGFya2JsdWVcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ21hcmtlcic6XG4gICAgICByZXR1cm4gY29sb3JzWzNdOyAvLyByZWRcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NwZWN0cnVtJzpcbiAgICAgIHJldHVybiBjb2xvcnNbMl07IC8vIGdyZWVuXG4gICAgICBicmVhaztcbiAgICBjYXNlICd0cmFjZSc6XG4gICAgICByZXR1cm4gY29sb3JzWzFdOyAvLyBvcmFuZ2VcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0ODQ1MDYvcmFuZG9tLWNvbG9yLWdlbmVyYXRvci1pbi1qYXZhc2NyaXB0XG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tQ29sb3IgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxldHRlcnMgPSAnMDEyMzQ1Njc4OUFCQ0RFRicuc3BsaXQoJycpO1xuICB2YXIgY29sb3IgPSAnIyc7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrICkge1xuICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcbiAgfVxuICByZXR1cm4gY29sb3I7XG59O1xuXG4vLyBzY2FsZSBmcm9tIGRvbWFpbiBbMCwgMV0gdG8gcmFuZ2UgWzI3MCwgMF0gdG8gY29uc3VtZSBpblxuLy8gaHNsKHgsIDEwMCUsIDUwJSkgY29sb3Igc2NoZW1lXG5leHBvcnQgY29uc3QgZ2V0SHVlID0gZnVuY3Rpb24oeCkge1xuICB2YXIgZG9tYWluTWluID0gMDtcbiAgdmFyIGRvbWFpbk1heCA9IDE7XG4gIHZhciByYW5nZU1pbiA9IDI3MDtcbiAgdmFyIHJhbmdlTWF4ID0gMDtcblxuICByZXR1cm4gKCgocmFuZ2VNYXggLSByYW5nZU1pbikgKiAoeCAtIGRvbWFpbk1pbikpIC8gKGRvbWFpbk1heCAtIGRvbWFpbk1pbikpICsgcmFuZ2VNaW47XG59O1xuXG5leHBvcnQgY29uc3QgaGV4VG9SR0IgPSBmdW5jdGlvbihoZXgpIHtcbiAgaGV4ID0gaGV4LnN1YnN0cmluZygxLCA3KTtcbiAgdmFyIHIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gIHZhciBnID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpO1xuICB2YXIgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KTtcbiAgcmV0dXJuIFtyLCBnLCBiXTtcbn07XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBzaW4gPSBNYXRoLnNpbjtcbmNvbnN0IGNvcyA9IE1hdGguY29zO1xuY29uc3Qgc3FydCA9IE1hdGguc3FydDtcbmNvbnN0IHBvdyA9IE1hdGgucG93O1xuY29uc3QgXzJQSSA9IE1hdGguUEkgKiAyO1xuXG4vLyBwbG90IChmcm9tIGh0dHA6Ly93d3cuZWFybGV2ZWwuY29tL3NjcmlwdHMvd2lkZ2V0cy8yMDEzMTAxMy9iaXF1YWRzMi5qcylcbi8vIHZhciBsZW4gPSA1MTI7XG4vLyB2YXIgbWFnUGxvdCA9IFtdO1xuLy8gZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbGVuOyBpZHgrKykge1xuLy8gICB2YXIgdztcbi8vICAgaWYgKHBsb3RUeXBlID09IFwibGluZWFyXCIpXG4vLyAgICAgdyA9IGlkeCAvIChsZW4gLSAxKSAqIE1hdGguUEk7ICAvLyAwIHRvIHBpLCBsaW5lYXIgc2NhbGVcbi8vICAgZWxzZVxuLy8gICAgIHcgPSBNYXRoLmV4cChNYXRoLmxvZygxIC8gMC4wMDEpICogaWR4IC8gKGxlbiAtIDEpKSAqIDAuMDAxICogTWF0aC5QSTsgIC8vIDAuMDAxIHRvIDEsIHRpbWVzIHBpLCBsb2cgc2NhbGVcblxuLy8gICB2YXIgcGhpID0gTWF0aC5wb3coTWF0aC5zaW4ody8yKSwgMik7XG4vLyAgIHZhciB5ID0gTWF0aC5sb2coTWF0aC5wb3coYTArYTErYTIsIDIpIC0gNCooYTAqYTEgKyA0KmEwKmEyICsgYTEqYTIpKnBoaSArIDE2KmEwKmEyKnBoaSpwaGkpIC0gTWF0aC5sb2coTWF0aC5wb3coMStiMStiMiwgMikgLSA0KihiMSArIDQqYjIgKyBiMSpiMikqcGhpICsgMTYqYjIqcGhpKnBoaSk7XG4vLyAgIHkgPSB5ICogMTAgLyBNYXRoLkxOMTBcbi8vICAgaWYgKHkgPT0gLUluZmluaXR5KVxuLy8gICAgIHkgPSAtMjAwO1xuXG4vLyAgIGlmIChwbG90VHlwZSA9PSBcImxpbmVhclwiKVxuLy8gICAgIG1hZ1Bsb3QucHVzaChbaWR4IC8gKGxlbiAtIDEpICogRnMgLyAyLCB5XSk7XG4vLyAgIGVsc2Vcbi8vICAgICBtYWdQbG90LnB1c2goW2lkeCAvIChsZW4gLSAxKSAvIDIsIHldKTtcblxuLy8gICBpZiAoaWR4ID09IDApXG4vLyAgICAgbWluVmFsID0gbWF4VmFsID0geTtcbi8vICAgZWxzZSBpZiAoeSA8IG1pblZhbClcbi8vICAgICBtaW5WYWwgPSB5O1xuLy8gICBlbHNlIGlmICh5ID4gbWF4VmFsKVxuLy8gICAgIG1heFZhbCA9IHk7XG4vLyB9XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICB0eXBlOiB7XG4gICAgdHlwZTogJ2VudW0nLFxuICAgIGRlZmF1bHQ6ICdsb3dwYXNzJyxcbiAgICBsaXN0OiBbXG4gICAgICAnbG93cGFzcycsXG4gICAgICAnaGlnaHBhc3MnLFxuICAgICAgJ2JhbmRwYXNzX2NvbnN0YW50X3NraXJ0JyxcbiAgICAgICdiYW5kcGFzcycsXG4gICAgICAnYmFuZHBhc3NfY29uc3RhbnRfcGVhaycsXG4gICAgICAnbm90Y2gnLFxuICAgICAgJ2FsbHBhc3MnLFxuICAgICAgJ3BlYWtpbmcnLFxuICAgICAgJ2xvd3NoZWxmJyxcbiAgICAgICdoaWdoc2hlbGYnLFxuICAgIF0sXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIGYwOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICB9LFxuICBnYWluOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1pbjogMCxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgcToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMSxcbiAgICBtaW46IDAuMDAxLCAvLyBQSVBPX0JJUVVBRF9NSU5fUVxuICAgIC8vIG1heDogMSxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgLy8gYmFuZHdpZHRoOiB7XG4gIC8vICAgdHlwZTogJ2Zsb2F0JyxcbiAgLy8gICBkZWZhdWx0OiBudWxsLFxuICAvLyAgIG51bGxhYmxlOiB0cnVlLFxuICAvLyAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICAvLyB9LFxufVxuXG5cbi8qKlxuICogQmlxdWFkIGZpbHRlciAoRGlyZWN0IGZvcm0gSSkuIElmIGlucHV0IGlzIG9mIHR5cGUgYHZlY3RvcmAgdGhlIGZpbHRlciBpc1xuICogYXBwbGllZCBvbiBlYWNoIGRpbWVuc2lvbiBpIHBhcmFsbGVsLlxuICpcbiAqIEJhc2VkIG9uIHRoZSBbXCJDb29rYm9vayBmb3JtdWxhZSBmb3IgYXVkaW8gRVEgYmlxdWFkIGZpbHRlciBjb2VmZmljaWVudHNcIl0oaHR0cDovL3d3dy5tdXNpY2RzcC5vcmcvZmlsZXMvQXVkaW8tRVEtQ29va2Jvb2sudHh0KVxuICogYnkgUm9iZXJ0IEJyaXN0b3ctSm9obnNvbi5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZXMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudHlwZT0nbG93cGFzcyddIC0gVHlwZSBvZiB0aGUgZmlsdGVyLiBBdmFpbGFibGVcbiAqICBmaWx0ZXJzOiAnbG93cGFzcycsICdoaWdocGFzcycsICdiYW5kcGFzc19jb25zdGFudF9za2lydCcsICdiYW5kcGFzc19jb25zdGFudF9wZWFrJ1xuICogIChhbGlhcyAnYmFuZHBhc3MnKSwgJ25vdGNoJywgJ2FsbHBhc3MnLCAncGVha2luZycsICdsb3dzaGVsZicsICdoaWdoc2hlbGYnLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmYwPTFdIC0gQ3V0b2ZmIG9yIGNlbnRlciBmcmVxdWVuY3kgb2YgdGhlIGZpbHRlclxuICogIGFjY29yZGluZyB0byBpdHMgdHlwZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5nYWluPTFdIC0gR2FpbiBvZiB0aGUgZmlsdGVyIChpbiBkQikuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucT0xXSAtIFF1YWxpdHkgZmFjdG9yIG9mIHRoZSBmaWx0ZXIuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBhdWRpb0luQnVmZmVyID0gbmV3IGxmby5zb3VyY2UuQXVkaW9JbkJ1ZmZlcih7XG4gKiAgIGF1ZGlvQnVmZmVyOiBidWZmZXIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBiaXF1YWQgPSBuZXcgbGZvLm9wZXJhdG9yLkJpcXVhZCh7XG4gKiAgIHR5cGU6ICdsb3dwYXNzJyxcbiAqICAgZjA6IDIwMDAsXG4gKiAgIGdhaW46IDMsXG4gKiAgIHE6IDEyLFxuICogfSk7XG4gKlxuICogY29uc3Qgc3BlY3RydW1EaXNwbGF5ID0gbmV3IGxmby5zaW5rLlNwZWN0cnVtRGlzcGxheSh7XG4gKiAgIGNhbnZhczogJyNzcGVjdHJ1bScsXG4gKiB9KTtcbiAqXG4gKiBhdWRpb0luQnVmZmVyLmNvbm5lY3QoYmlxdWFkKTtcbiAqIGJpcXVhZC5jb25uZWN0KHNwZWN0cnVtRGlzcGxheSk7XG4gKlxuICogYXVkaW9JbkJ1ZmZlci5zdGFydCgpO1xuICovXG5jbGFzcyBCaXF1YWQgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgb25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpIHtcbiAgICB0aGlzLl9jYWxjdWxhdGVDb2VmcygpO1xuICB9XG5cbiAgX2NhbGN1bGF0ZUNvZWZzKCkge1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlO1xuICAgIGNvbnN0IGZyYW1lVHlwZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG5cbiAgICBjb25zdCB0eXBlID0gdGhpcy5wYXJhbXMuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3QgZjAgPSB0aGlzLnBhcmFtcy5nZXQoJ2YwJyk7XG4gICAgY29uc3QgZ2FpbiA9IHRoaXMucGFyYW1zLmdldCgnZ2FpbicpO1xuICAgIGNvbnN0IHEgPSB0aGlzLnBhcmFtcy5nZXQoJ3EnKTtcbiAgICAvLyBjb25zdCBiYW5kd2lkdGggPSB0aGlzLnBhcmFtcy5nZXQoJ2JhbmR3aWR0aCcpO1xuICAgIGNvbnN0IGJhbmR3aWR0aCA9IG51bGw7XG5cbiAgICBsZXQgYjAgPSAwLCBiMSA9IDAsIGIyID0gMCwgYTAgPSAwLCBhMSA9IDAsIGEyID0gMDtcblxuICAgIGNvbnN0IEEgPSBwb3coMTAsIGdhaW4gLyA0MCk7XG4gICAgY29uc3QgdzAgPSBfMlBJICogZjAgLyBzYW1wbGVSYXRlO1xuICAgIGNvbnN0IGNvc1cwID0gY29zKHcwKTtcbiAgICBjb25zdCBzaW5XMCA9IHNpbih3MCk7XG4gICAgbGV0IGFscGhhOyAvLyBkZXBlbmQgb2YgdGhlIGZpbHRlciB0eXBlXG4gICAgbGV0IF8yUm9vdEFBbHBoYTsgLy8gaW50ZXJtZWRpYXRlIHZhbHVlIGZvciBsb3dzaGVsZiBhbmQgaGlnaHNoZWxmXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIC8vIEgocykgPSAxIC8gKHNeMiArIHMvUSArIDEpXG4gICAgICBjYXNlICdsb3dwYXNzJzpcbiAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIGIwID0gKDEgLSBjb3NXMCkgLyAyO1xuICAgICAgICBiMSA9IDEgLSBjb3NXMDtcbiAgICAgICAgYjIgPSBiMDtcbiAgICAgICAgYTAgPSAxICsgYWxwaGE7XG4gICAgICAgIGExID0gLTIgKiBjb3NXMDtcbiAgICAgICAgYTIgPSAxIC1hbHBoYTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBIKHMpID0gc14yIC8gKHNeMiArIHMvUSArIDEpXG4gICAgICBjYXNlICdoaWdocGFzcyc6XG4gICAgICAgIGFscGhhID0gc2luVzAgLyAoMiAqIHEpO1xuICAgICAgICBiMCA9ICgxICsgY29zVzApIC8gMjtcbiAgICAgICAgYjEgPSAtICgxICsgY29zVzApXG4gICAgICAgIGIyID0gYjA7XG4gICAgICAgIGEwID0gMSArIGFscGhhO1xuICAgICAgICBhMSA9IC0yICogY29zVzA7XG4gICAgICAgIGEyID0gMSAtIGFscGhhO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIEgocykgPSBzIC8gKHNeMiArIHMvUSArIDEpICAoY29uc3RhbnQgc2tpcnQgZ2FpbiwgcGVhayBnYWluID0gUSlcbiAgICAgIGNhc2UgJ2JhbmRwYXNzX2NvbnN0YW50X3NraXJ0JzpcbiAgICAgICAgaWYgKGJhbmR3aWR0aCkge1xuICAgICAgICAgIC8vIHNpbih3MCkqc2luaCggbG4oMikvMiAqIEJXICogdzAvc2luKHcwKSApICAgICAgICAgICAoY2FzZTogQlcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIH1cblxuICAgICAgICBiMCA9IHNpblcwIC8gMjtcbiAgICAgICAgYjEgPSAwO1xuICAgICAgICBiMiA9IC1iMDtcbiAgICAgICAgYTAgPSAxICsgYWxwaGE7XG4gICAgICAgIGExID0gLTIgKiBjb3NXMDtcbiAgICAgICAgYTIgPSAxIC0gYWxwaGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gSChzKSA9IChzL1EpIC8gKHNeMiArIHMvUSArIDEpICAgICAgKGNvbnN0YW50IDAgZEIgcGVhayBnYWluKVxuICAgICAgY2FzZSAnYmFuZHBhc3MnOiAvLyBsb29rcyBsaWtlIHdoYXQgaXMgZ25lcmFsbHkgY29uc2lkZXJlZCBhcyBhIGJhbmRwYXNzXG4gICAgICBjYXNlICdiYW5kcGFzc19jb25zdGFudF9wZWFrJzpcbiAgICAgICAgaWYgKGJhbmR3aWR0aCkge1xuICAgICAgICAgIC8vIHNpbih3MCkqc2luaCggbG4oMikvMiAqIEJXICogdzAvc2luKHcwKSApICAgICAgICAgICAoY2FzZTogQlcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIH1cblxuICAgICAgICBiMCA9IGFscGhhO1xuICAgICAgICBiMSA9IDA7XG4gICAgICAgIGIyID0gLWFscGhhO1xuICAgICAgICBhMCA9IDEgKyBhbHBoYTtcbiAgICAgICAgYTEgPSAtMiAqIGNvc1cwO1xuICAgICAgICBhMiA9IDEgLSBhbHBoYTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBIKHMpID0gKHNeMiArIDEpIC8gKHNeMiArIHMvUSArIDEpXG4gICAgICBjYXNlICdub3RjaCc6XG4gICAgICAgIGFscGhhID0gc2luVzAgLyAoMiAqIHEpO1xuICAgICAgICBiMCA9IDE7XG4gICAgICAgIGIxID0gLTIgKiBjb3NXMDtcbiAgICAgICAgYjIgPSAxO1xuICAgICAgICBhMCA9IDEgKyBhbHBoYTtcbiAgICAgICAgYTEgPSBiMTtcbiAgICAgICAgYTIgPSAxIC0gYWxwaGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gSChzKSA9IChzXjIgLSBzL1EgKyAxKSAvIChzXjIgKyBzL1EgKyAxKVxuICAgICAgY2FzZSAnYWxscGFzcyc6XG4gICAgICAgIGFscGhhID0gc2luVzAgLyAoMiAqIHEpO1xuICAgICAgICBiMCA9IDEgLSBhbHBoYTtcbiAgICAgICAgYjEgPSAtMiAqIGNvc1cwO1xuICAgICAgICBiMiA9IDEgKyBhbHBoYTtcbiAgICAgICAgYTAgPSBiMjtcbiAgICAgICAgYTEgPSBiMTtcbiAgICAgICAgYTIgPSBiMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBIKHMpID0gKHNeMiArIHMqKEEvUSkgKyAxKSAvIChzXjIgKyBzLyhBKlEpICsgMSlcbiAgICAgIGNhc2UgJ3BlYWtpbmcnOlxuICAgICAgICBpZiAoYmFuZHdpZHRoKSB7XG4gICAgICAgICAgLy8gc2luKHcwKSpzaW5oKCBsbigyKS8yICogQlcgKiB3MC9zaW4odzApICkgICAgICAgICAgIChjYXNlOiBCVylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbHBoYSA9IHNpblcwIC8gKDIgKiBxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGIwID0gMSArIGFscGhhICogQTtcbiAgICAgICAgYjEgPSAtMiAqIGNvc1cwO1xuICAgICAgICBiMiA9IDEgLSBhbHBoYSAqIEE7XG4gICAgICAgIGEwID0gMSArIGFscGhhIC8gQTtcbiAgICAgICAgYTEgPSBiMTtcbiAgICAgICAgYTIgPSAxIC0gYWxwaGEgLyBBO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIEgocykgPSBBICogKHNeMiArIChzcXJ0KEEpL1EpKnMgKyBBKS8oQSpzXjIgKyAoc3FydChBKS9RKSpzICsgMSlcbiAgICAgIGNhc2UgJ2xvd3NoZWxmJzpcbiAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIF8yUm9vdEFBbHBoYSA9IDIgKiBzcXJ0KEEpICogYWxwaGE7XG5cbiAgICAgICAgYjAgPSAgICAgQSAqICgoQSArIDEpIC0gKEEgLSAxKSAqIGNvc1cwICsgXzJSb290QUFscGhhKTtcbiAgICAgICAgYjEgPSAyICogQSAqICgoQSAtIDEpIC0gKEEgKyAxKSAqIGNvc1cwKTtcbiAgICAgICAgYjIgPSAgICAgQSAqICgoQSArIDEpIC0gKEEgLSAxKSAqIGNvc1cwIC0gXzJSb290QUFscGhhKTtcbiAgICAgICAgYTAgPSAgICAgICAgICAoQSArIDEpICsgKEEgLSAxKSAqIGNvc1cwICsgXzJSb290QUFscGhhO1xuICAgICAgICBhMSA9ICAgIC0yICogKChBIC0gMSkgKyAoQSArIDEpICogY29zVzApO1xuICAgICAgICBhMiA9ICAgICAgICAgIChBICsgMSkgKyAoQSAtIDEpICogY29zVzAgLSBfMlJvb3RBQWxwaGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gSChzKSA9IEEgKiAoQSpzXjIgKyAoc3FydChBKS9RKSpzICsgMSkvKHNeMiArIChzcXJ0KEEpL1EpKnMgKyBBKVxuICAgICAgY2FzZSAnaGlnaHNoZWxmJzpcbiAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIF8yUm9vdEFBbHBoYSA9IDIgKiBzcXJ0KEEpICogYWxwaGE7XG5cbiAgICAgICAgYjAgPSAgICAgIEEgKiAoKEEgKyAxKSArIChBIC0gMSkgKiBjb3NXMCArIF8yUm9vdEFBbHBoYSk7XG4gICAgICAgIGIxID0gLTIgKiBBICogKChBIC0gMSkgKyAoQSArIDEpICogY29zVzApO1xuICAgICAgICBiMiA9ICAgICAgQSAqICgoQSArIDEpICsgKEEgLSAxKSAqIGNvc1cwIC0gXzJSb290QUFscGhhKTtcbiAgICAgICAgYTAgPSAgICAgICAgICAgKEEgKyAxKSAtIChBIC0gMSkgKiBjb3NXMCArIF8yUm9vdEFBbHBoYTtcbiAgICAgICAgYTEgPSAgICAgIDIgKiAoKEEgLSAxKSAtIChBICsgMSkgKiBjb3NXMCk7XG4gICAgICAgIGEyID0gICAgICAgICAgIChBICsgMSkgLSAoQSAtIDEpICogY29zVzAgLSBfMlJvb3RBQWxwaGE7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5jb2VmcyA9IHtcbiAgICAgIGIwOiBiMCAvIGEwLFxuICAgICAgYjE6IGIxIC8gYTAsXG4gICAgICBiMjogYjIgLyBhMCxcbiAgICAgIGExOiBhMSAvIGEwLFxuICAgICAgYTI6IGEyIC8gYTAsXG4gICAgfTtcblxuICAgIC8vIHJlc2V0IHN0YXRlXG4gICAgaWYgKGZyYW1lVHlwZSA9PT0gJ3NpZ25hbCcpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSB7IHgxOiAwLCB4MjogMCwgeTE6IDAsIHkyOiAwIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIHgxOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICAgIHgyOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICAgIHkxOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICAgIHkyOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICAvLyBpZiBubyBgc2FtcGxlUmF0ZWAgb3IgYHNhbXBsZVJhdGVgIGlzIDAgd2Ugc2hhbGwgaGFsdCFcbiAgICBjb25zdCBzYW1wbGVSYXRlID0gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZTtcblxuICAgIGlmICghc2FtcGxlUmF0ZSB8fCBzYW1wbGVSYXRlIDw9IDApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc2FtcGxlUmF0ZSB2YWx1ZSAoMCkgZm9yIGJpcXVhZCcpO1xuXG4gICAgdGhpcy5fY2FsY3VsYXRlQ29lZnMoKTtcbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUpIHtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3Qgb3V0RGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCBpbkRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBjb2VmcyA9IHRoaXMuY29lZnM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lU2l6ZTsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gaW5EYXRhW2ldO1xuICAgICAgY29uc3QgeSA9IGNvZWZzLmIwICogeFxuICAgICAgICAgICAgICArIGNvZWZzLmIxICogc3RhdGUueDFbaV0gKyBjb2Vmcy5iMiAqIHN0YXRlLngyW2ldXG4gICAgICAgICAgICAgIC0gY29lZnMuYTEgKiBzdGF0ZS55MVtpXSAtIGNvZWZzLmEyICogc3RhdGUueTJbaV07XG5cbiAgICAgIG91dERhdGFbaV0gPSB5O1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGVzXG4gICAgICBzdGF0ZS54MltpXSA9IHN0YXRlLngxW2ldO1xuICAgICAgc3RhdGUueDFbaV0gPSB4O1xuICAgICAgc3RhdGUueTJbaV0gPSBzdGF0ZS55MVtpXTtcbiAgICAgIHN0YXRlLnkxW2ldID0geTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBvdXREYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IGluRGF0YSA9IGZyYW1lLmRhdGE7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNvZWZzID0gdGhpcy5jb2VmcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVTaXplOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSBpbkRhdGFbaV07XG4gICAgICBjb25zdCB5ID0gY29lZnMuYjAgKiB4XG4gICAgICAgICAgICAgICsgY29lZnMuYjEgKiBzdGF0ZS54MSArIGNvZWZzLmIyICogc3RhdGUueDJcbiAgICAgICAgICAgICAgLSBjb2Vmcy5hMSAqIHN0YXRlLnkxIC0gY29lZnMuYTIgKiBzdGF0ZS55MjtcblxuICAgICAgb3V0RGF0YVtpXSA9IHk7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZXNcbiAgICAgIHN0YXRlLngyID0gc3RhdGUueDE7XG4gICAgICBzdGF0ZS54MSA9IHg7XG4gICAgICBzdGF0ZS55MiA9IHN0YXRlLnkxO1xuICAgICAgc3RhdGUueTEgPSB5O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCaXF1YWQ7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBzcXJ0ID0gTWF0aC5zcXJ0O1xuY29uc3QgY29zID0gTWF0aC5jb3M7XG5jb25zdCBQSSA9IE1hdGguUEk7XG5cbi8vIERjdCBUeXBlIDIgLSBvcnRob2dvbmFsIG1hdHJpeCBzY2FsaW5nXG5mdW5jdGlvbiBnZXREY3RXZWlnaHRzKG9yZGVyLCBOLCB0eXBlID0gJ2h0aycpIHtcbiAgY29uc3Qgd2VpZ2h0cyA9IG5ldyBGbG9hdDMyQXJyYXkoTiAqIG9yZGVyKTtcbiAgY29uc3QgcGlPdmVyTiA9IFBJIC8gTjtcbiAgY29uc3Qgc2NhbGUwID0gMSAvIHNxcnQoMik7XG4gIGNvbnN0IHNjYWxlID0gc3FydCgyIC8gTik7XG5cbiAgZm9yIChsZXQgayA9IDA7IGsgPCBvcmRlcjsgaysrKSB7XG4gICAgY29uc3QgcyA9IChrID09PSAwKSA/IChzY2FsZTAgKiBzY2FsZSkgOiBzY2FsZTtcbiAgICAvLyBjb25zdCBzID0gc2NhbGU7IC8vIHJ0YSBkb2Vzbid0IGFwcGx5IGs9MCBzY2FsaW5nXG5cbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IE47IG4rKylcbiAgICAgIHdlaWdodHNbayAqIE4gKyBuXSA9IHMgKiBjb3MoayAqIChuICsgMC41KSAqIHBpT3Zlck4pO1xuICB9XG5cbiAgcmV0dXJuIHdlaWdodHM7XG59XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAxMixcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBDb21wdXRlIHRoZSBEaXNjcmV0ZSBDb3NpbmUgVHJhbnNmb3JtIG9mIGFuIGlucHV0IGBzaWduYWxgIG9yIGB2ZWN0b3JgLlxuICogKEhUSyBzdHlsZSB3ZWlnaHRpbmcpLlxuICpcbiAqIF9zdXBwb3J0IGBzdGFuZGFsb25lYCB1c2FnZV9cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm9yZGVyPTEyXSAtIE51bWJlciBvZiBjb21wdXRlZCBiaW5zLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogLy8gYXNzdW1pbmcgc29tZSBhdWRpbyBidWZmZXJcbiAqIGNvbnN0IHNvdXJjZSA9IG5ldyBBdWRpb0luQnVmZmVyKHtcbiAqICAgYXVkaW9CdWZmZXI6IGF1ZGlvQnVmZmVyLFxuICogICB1c2VXb3JrZXI6IGZhbHNlLFxuICogfSk7XG4gKlxuICogY29uc3Qgc2xpY2VyID0gbmV3IFNsaWNlcih7XG4gKiAgIGZyYW1lU2l6ZTogNTEyLFxuICogICBob3BTaXplOiA1MTIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBkY3QgPSBuZXcgRGN0KHtcbiAqICAgb3JkZXI6IDEyLFxuICogfSk7XG4gKlxuICogY29uc3QgbG9nZ2VyID0gbmV3IGxmby5zaW5rLkxvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogc291cmNlLmNvbm5lY3Qoc2xpY2VyKTtcbiAqIHNsaWNlci5jb25uZWN0KGRjdCk7XG4gKiBkY3QuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIHNvdXJjZS5zdGFydCgpO1xuICovXG5jbGFzcyBEY3QgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGNvbnN0IGluRnJhbWVTaXplID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBvcmRlcjtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFtdO1xuXG4gICAgdGhpcy53ZWlnaHRNYXRyaXggPSBnZXREY3RXZWlnaHRzKG9yZGVyLCBpbkZyYW1lU2l6ZSk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYERjdGAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIC0gSW5wdXQgdmFsdWVzLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBEY3Qgb2YgdGhlIGlucHV0IGFycmF5LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBkY3QgPSBuZXcgbGZvLm9wZXJhdG9yLkRjdCh7IG9yZGVyOiAxMiB9KTtcbiAgICogLy8gbWFuZGF0b3J5IGZvciB1c2UgaW4gc3RhbmRhbG9uZSBtb2RlXG4gICAqIGRjdC5pbml0U3RyZWFtKHsgZnJhbWVTaXplOiA1MTIsIGZyYW1lVHlwZTogJ3NpZ25hbCcgfSk7XG4gICAqIGRjdC5pbnB1dFNpZ25hbChkYXRhKTtcbiAgICovXG4gIGlucHV0U2lnbmFsKHZhbHVlcykge1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHZhbHVlcy5sZW5ndGg7XG4gICAgY29uc3Qgb3V0RnJhbWUgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgY29uc3Qgd2VpZ2h0cyA9IHRoaXMud2VpZ2h0TWF0cml4O1xuXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBvcmRlcjsgaysrKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBrICogZnJhbWVTaXplO1xuICAgICAgb3V0RnJhbWVba10gPSAwO1xuXG4gICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGZyYW1lU2l6ZTsgbisrKVxuICAgICAgICBvdXRGcmFtZVtrXSArPSB2YWx1ZXNbbl0gKiB3ZWlnaHRzW29mZnNldCArIG5dO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRGcmFtZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEY3Q7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuaW1wb3J0IGluaXRXaW5kb3cgZnJvbSAnLi4vdXRpbHMvd2luZG93cyc7XG5cbi8vIGh0dHBzOi8vY29kZS5zb3VuZHNvZnR3YXJlLmFjLnVrL3Byb2plY3RzL2pzLWRzcC10ZXN0L3JlcG9zaXRvcnkvZW50cnkvZmZ0L25heXVraS1vYmovZmZ0LmpzXG4vKlxuICogRnJlZSBGZnQgYW5kIGNvbnZvbHV0aW9uIChKYXZhU2NyaXB0KVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQcm9qZWN0IE5heXVraVxuICogaHR0cDovL3d3dy5uYXl1a2kuaW8vcGFnZS9mcmVlLXNtYWxsLWZmdC1pbi1tdWx0aXBsZS1sYW5ndWFnZXNcbiAqXG4gKiAoTUlUIExpY2Vuc2UpXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4gKiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4gKiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4gKiB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuICogdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiAtIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiAgIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogLSBUaGUgU29mdHdhcmUgaXMgcHJvdmlkZWQgXCJhcyBpc1wiLCB3aXRob3V0IHdhcnJhbnR5IG9mIGFueSBraW5kLCBleHByZXNzIG9yXG4gKiAgIGltcGxpZWQsIGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG8gdGhlIHdhcnJhbnRpZXMgb2YgbWVyY2hhbnRhYmlsaXR5LFxuICogICBmaXRuZXNzIGZvciBhIHBhcnRpY3VsYXIgcHVycG9zZSBhbmQgbm9uaW5mcmluZ2VtZW50LiBJbiBubyBldmVudCBzaGFsbCB0aGVcbiAqICAgYXV0aG9ycyBvciBjb3B5cmlnaHQgaG9sZGVycyBiZSBsaWFibGUgZm9yIGFueSBjbGFpbSwgZGFtYWdlcyBvciBvdGhlclxuICogICBsaWFiaWxpdHksIHdoZXRoZXIgaW4gYW4gYWN0aW9uIG9mIGNvbnRyYWN0LCB0b3J0IG9yIG90aGVyd2lzZSwgYXJpc2luZyBmcm9tLFxuICogICBvdXQgb2Ygb3IgaW4gY29ubmVjdGlvbiB3aXRoIHRoZSBTb2Z0d2FyZSBvciB0aGUgdXNlIG9yIG90aGVyIGRlYWxpbmdzIGluIHRoZVxuICogICBTb2Z0d2FyZS5cbiAqXG4gKiBTbGlnaHRseSByZXN0cnVjdHVyZWQgYnkgQ2hyaXMgQ2FubmFtLCBjYW5uYW1AYWxsLWRheS1icmVha2Zhc3QuY29tXG4gKlxuICogQHByaXZhdGVcbiAqL1xuLypcbiAqIENvbnN0cnVjdCBhbiBvYmplY3QgZm9yIGNhbGN1bGF0aW5nIHRoZSBkaXNjcmV0ZSBGb3VyaWVyIHRyYW5zZm9ybSAoREZUKSBvZlxuICogc2l6ZSBuLCB3aGVyZSBuIGlzIGEgcG93ZXIgb2YgMi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBGZnROYXl1a2kobikge1xuXG4gIHRoaXMubiA9IG47XG4gIHRoaXMubGV2ZWxzID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgaWYgKDEgPDwgaSA9PSBuKSB7XG4gICAgICB0aGlzLmxldmVscyA9IGk7ICAvLyBFcXVhbCB0byBsb2cyKG4pXG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMubGV2ZWxzID09IC0xKSB7XG4gICAgdGhyb3cgXCJMZW5ndGggaXMgbm90IGEgcG93ZXIgb2YgMlwiO1xuICB9XG5cbiAgdGhpcy5jb3NUYWJsZSA9IG5ldyBBcnJheShuIC8gMik7XG4gIHRoaXMuc2luVGFibGUgPSBuZXcgQXJyYXkobiAvIDIpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbiAvIDI7IGkrKykge1xuICAgIHRoaXMuY29zVGFibGVbaV0gPSBNYXRoLmNvcygyICogTWF0aC5QSSAqIGkgLyBuKTtcbiAgICB0aGlzLnNpblRhYmxlW2ldID0gTWF0aC5zaW4oMiAqIE1hdGguUEkgKiBpIC8gbik7XG4gIH1cblxuICAvKlxuICAgKiBDb21wdXRlcyB0aGUgZGlzY3JldGUgRm91cmllciB0cmFuc2Zvcm0gKERGVCkgb2YgdGhlIGdpdmVuIGNvbXBsZXggdmVjdG9yLFxuICAgKiBzdG9yaW5nIHRoZSByZXN1bHQgYmFjayBpbnRvIHRoZSB2ZWN0b3IuXG4gICAqIFRoZSB2ZWN0b3IncyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgc2l6ZSBuIHRoYXQgd2FzIHBhc3NlZCB0byB0aGVcbiAgICogb2JqZWN0IGNvbnN0cnVjdG9yLCBhbmQgdGhpcyBtdXN0IGJlIGEgcG93ZXIgb2YgMi4gVXNlcyB0aGUgQ29vbGV5LVR1a2V5XG4gICAqIGRlY2ltYXRpb24taW4tdGltZSByYWRpeC0yIGFsZ29yaXRobS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuZm9yd2FyZCA9IGZ1bmN0aW9uKHJlYWwsIGltYWcpIHtcbiAgICB2YXIgbiA9IHRoaXMubjtcblxuICAgIC8vIEJpdC1yZXZlcnNlZCBhZGRyZXNzaW5nIHBlcm11dGF0aW9uXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIHZhciBqID0gcmV2ZXJzZUJpdHMoaSwgdGhpcy5sZXZlbHMpO1xuXG4gICAgICBpZiAoaiA+IGkpIHtcbiAgICAgICAgdmFyIHRlbXAgPSByZWFsW2ldO1xuICAgICAgICByZWFsW2ldID0gcmVhbFtqXTtcbiAgICAgICAgcmVhbFtqXSA9IHRlbXA7XG4gICAgICAgIHRlbXAgPSBpbWFnW2ldO1xuICAgICAgICBpbWFnW2ldID0gaW1hZ1tqXTtcbiAgICAgICAgaW1hZ1tqXSA9IHRlbXA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29vbGV5LVR1a2V5IGRlY2ltYXRpb24taW4tdGltZSByYWRpeC0yIEZmdFxuICAgIGZvciAodmFyIHNpemUgPSAyOyBzaXplIDw9IG47IHNpemUgKj0gMikge1xuICAgICAgdmFyIGhhbGZzaXplID0gc2l6ZSAvIDI7XG4gICAgICB2YXIgdGFibGVzdGVwID0gbiAvIHNpemU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSArPSBzaXplKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBpLCBrID0gMDsgaiA8IGkgKyBoYWxmc2l6ZTsgaisrLCBrICs9IHRhYmxlc3RlcCkge1xuICAgICAgICAgIHZhciB0cHJlID0gIHJlYWxbaitoYWxmc2l6ZV0gKiB0aGlzLmNvc1RhYmxlW2tdICtcbiAgICAgICAgICAgICAgICAgICAgICBpbWFnW2oraGFsZnNpemVdICogdGhpcy5zaW5UYWJsZVtrXTtcbiAgICAgICAgICB2YXIgdHBpbSA9IC1yZWFsW2oraGFsZnNpemVdICogdGhpcy5zaW5UYWJsZVtrXSArXG4gICAgICAgICAgICAgICAgICAgICAgaW1hZ1tqK2hhbGZzaXplXSAqIHRoaXMuY29zVGFibGVba107XG4gICAgICAgICAgcmVhbFtqICsgaGFsZnNpemVdID0gcmVhbFtqXSAtIHRwcmU7XG4gICAgICAgICAgaW1hZ1tqICsgaGFsZnNpemVdID0gaW1hZ1tqXSAtIHRwaW07XG4gICAgICAgICAgcmVhbFtqXSArPSB0cHJlO1xuICAgICAgICAgIGltYWdbal0gKz0gdHBpbTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybnMgdGhlIGludGVnZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHJldmVyc2Ugb2YgdGhlIGxvd2VzdCAnYml0cydcbiAgICAvLyBiaXRzIG9mIHRoZSBpbnRlZ2VyICd4Jy5cbiAgICBmdW5jdGlvbiByZXZlcnNlQml0cyh4LCBiaXRzKSB7XG4gICAgICB2YXIgeSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYml0czsgaSsrKSB7XG4gICAgICAgIHkgPSAoeSA8PCAxKSB8ICh4ICYgMSk7XG4gICAgICAgIHggPj4+PSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBDb21wdXRlcyB0aGUgaW52ZXJzZSBkaXNjcmV0ZSBGb3VyaWVyIHRyYW5zZm9ybSAoSURGVCkgb2YgdGhlIGdpdmVuIGNvbXBsZXhcbiAgICogdmVjdG9yLCBzdG9yaW5nIHRoZSByZXN1bHQgYmFjayBpbnRvIHRoZSB2ZWN0b3IuXG4gICAqIFRoZSB2ZWN0b3IncyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgc2l6ZSBuIHRoYXQgd2FzIHBhc3NlZCB0byB0aGVcbiAgICogb2JqZWN0IGNvbnN0cnVjdG9yLCBhbmQgdGhpcyBtdXN0IGJlIGEgcG93ZXIgb2YgMi4gVGhpcyBpcyBhIHdyYXBwZXJcbiAgICogZnVuY3Rpb24uIFRoaXMgdHJhbnNmb3JtIGRvZXMgbm90IHBlcmZvcm0gc2NhbGluZywgc28gdGhlIGludmVyc2UgaXMgbm90XG4gICAqIGEgdHJ1ZSBpbnZlcnNlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbnZlcnNlID0gZnVuY3Rpb24ocmVhbCwgaW1hZykge1xuICAgIGZvcndhcmQoaW1hZywgcmVhbCk7XG4gIH1cbn1cblxuXG5jb25zdCBzcXJ0ID0gTWF0aC5zcXJ0O1xuXG5jb25zdCBpc1Bvd2VyT2ZUd28gPSBmdW5jdGlvbihudW1iZXIpIHtcbiAgd2hpbGUgKChudW1iZXIgJSAyID09PSAwKSAmJiBudW1iZXIgPiAxKVxuICAgIG51bWJlciA9IG51bWJlciAvIDI7XG5cbiAgcmV0dXJuIG51bWJlciA9PT0gMTtcbn1cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHNpemU6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMTAyNCxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICB3aW5kb3c6IHtcbiAgICB0eXBlOiAnZW51bScsXG4gICAgbGlzdDogWydub25lJywgJ2hhbm4nLCAnaGFubmluZycsICdoYW1taW5nJywgJ2JsYWNrbWFuJywgJ2JsYWNrbWFuaGFycmlzJywgJ3NpbmUnLCAncmVjdGFuZ2xlJ10sXG4gICAgZGVmYXVsdDogJ25vbmUnLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIG1vZGU6IHtcbiAgICB0eXBlOiAnZW51bScsXG4gICAgbGlzdDogWydtYWduaXR1ZGUnLCAncG93ZXInXSwgLy8gYWRkIGNvbXBsZXggb3V0cHV0XG4gICAgZGVmYXVsdDogJ21hZ25pdHVkZScsXG4gIH0sXG4gIG5vcm06IHtcbiAgICB0eXBlOiAnZW51bScsXG4gICAgZGVmYXVsdDogJ2F1dG8nLFxuICAgIGxpc3Q6IFsnYXV0bycsICdub25lJywgJ2xpbmVhcicsICdwb3dlciddLFxuICB9LFxufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIEZhc3QgRm91cmllciBUcmFuc2Zvcm0gb2YgYW4gaW5jb21taW5nIGBzaWduYWxgLlxuICpcbiAqIEZmdCBpbXBsZW1lbnRhdGlvbiBieSBbTmF5dWtpXShodHRwczovL2NvZGUuc291bmRzb2Z0d2FyZS5hYy51ay9wcm9qZWN0cy9qcy1kc3AtdGVzdC9yZXBvc2l0b3J5L2VudHJ5L2ZmdC9uYXl1a2ktb2JqL2ZmdC5qcykuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2l6ZT0xMDI0XSAtIFNpemUgb2YgdGhlIGZmdCwgc2hvdWxkIGJlIGEgcG93ZXIgb2YgMi5cbiAqICBJZiB0aGUgZnJhbWUgc2l6ZSBvZiB0aGUgaW5jb21taW5nIHNpZ25hbCBpcyBsb3dlciB0aGFuIHRoaXMgdmFsdWUsXG4gKiAgaXQgaXMgemVybyBwYWRkZWQgdG8gbWF0Y2ggdGhlIGZmdCBzaXplLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLndpbmRvdz0nbm9uZSddIC0gTmFtZSBvZiB0aGUgd2luZG93IGFwcGxpZWQgb24gdGhlXG4gKiAgaW5jb21taW5nIHNpZ25hbC4gQXZhaWxhYmxlIHdpbmRvd3MgYXJlOiAnbm9uZScsICdoYW5uJywgJ2hhbm5pbmcnLFxuICogICdoYW1taW5nJywgJ2JsYWNrbWFuJywgJ2JsYWNrbWFuaGFycmlzJywgJ3NpbmUnLCAncmVjdGFuZ2xlJy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RlPSdtYWduaXR1ZGUnXSAtIFR5cGUgb2YgdGhlIG91dHB1dCAoYG1hZ25pdHVkZWBcbiAqICBvciBgcG93ZXJgKVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm5vcm09J2F1dG8nXSAtIFR5cGUgb2Ygbm9ybWFsaXphdGlvbiBhcHBsaWVkIG9uIHRoZVxuICogIG91dHB1dC4gUG9zc2libGUgdmFsdWVzIGFyZSAnYXV0bycsICdub25lJywgJ2xpbmVhcicsICdwb3dlcicuIFdoZW4gc2V0IHRvXG4gKiAgYGF1dG9gLCBhIGBsaW5lYXJgIG5vcm1hbGl6YXRpb24gaXMgYXBwbGllZCBvbiB0aGUgbWFnbml0dWRlIHNwZWN0cnVtLCB3aGlsZVxuICogIGEgYHBvd2VyYCBub3JtYWxpemF0aW9uIGlzIGFwcGxpZWQgb24gdGhlIHBvd2VyIHNwZWN0cnVtLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogLy8gYXNzdW1pbmcgYW4gYGF1ZGlvQnVmZmVyYCBleGlzdHNcbiAqIGNvbnN0IHNvdXJjZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5CdWZmZXIoeyBhdWRpb0J1ZmZlciB9KTtcbiAqXG4gKiBjb25zdCBzbGljZXIgPSBuZXcgbGZvLm9wZXJhdG9yLlNsaWNlcih7XG4gKiAgIGZyYW1lU2l6ZTogMjU2LFxuICogfSk7XG4gKlxuICogY29uc3QgZmZ0ID0gbmV3IGxmby5vcGVyYXRvci5GZnQoe1xuICogICBtb2RlOiAncG93ZXInLFxuICogICB3aW5kb3c6ICdoYW5uJyxcbiAqICAgbm9ybTogJ3Bvd2VyJyxcbiAqICAgc2l6ZTogMjU2LFxuICogfSk7XG4gKlxuICogc291cmNlLmNvbm5lY3Qoc2xpY2VyKTtcbiAqIHNsaWNlci5jb25uZWN0KGZmdCk7XG4gKiBzb3VyY2Uuc3RhcnQoKTtcbiAqXG4gKiAvLyA+IG91dHB1dHMgMTI5IGJpbnMgY29udGFpbmluZyB0aGUgdmFsdWVzIG9mIHRoZSBwb3dlciBzcGVjdHJ1bSAoaW5jbHVkaW5nXG4gKiAvLyA+IERDIGFuZCBOeXVpc3QgZnJlcXVlbmNpZXMpLlxuICpcbiAqIEB0b2RvIC0gY2hlY2sgaWYgJ3JlY3RhbmdsZScgYW5kICdub25lJyB3aW5kb3dzIGFyZSBub3QgcmVkb25kYW50LlxuICogQHRvZG8gLSBjaGVjayBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHBhcmFtcy5cbiAqL1xuY2xhc3MgRmZ0IGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMud2luZG93U2l6ZSA9IG51bGw7XG4gICAgdGhpcy5ub3JtYWxpemVDb2VmcyA9IG51bGw7XG4gICAgdGhpcy53aW5kb3cgPSBudWxsO1xuICAgIHRoaXMucmVhbCA9IG51bGw7XG4gICAgdGhpcy5pbWFnID0gbnVsbDtcbiAgICB0aGlzLmZmdCA9IG51bGw7XG5cbiAgICBpZiAoIWlzUG93ZXJPZlR3byh0aGlzLnBhcmFtcy5nZXQoJ3NpemUnKSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZmdFNpemUgbXVzdCBiZSBhIHBvd2VyIG9mIHR3bycpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICAvLyBzZXQgdGhlIG91dHB1dCBmcmFtZSBzaXplXG4gICAgY29uc3QgaW5GcmFtZVNpemUgPSBwcmV2U3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBmZnRTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdzaXplJyk7XG4gICAgY29uc3QgbW9kZSA9IHRoaXMucGFyYW1zLmdldCgnbW9kZScpO1xuICAgIGNvbnN0IG5vcm0gPSB0aGlzLnBhcmFtcy5nZXQoJ25vcm0nKTtcbiAgICBsZXQgd2luZG93TmFtZSA9IHRoaXMucGFyYW1zLmdldCgnd2luZG93Jyk7XG4gICAgLy8gd2luZG93IGBub25lYCBhbmQgYHJlY3RhbmdsZWAgYXJlIGFsaWFzZXNcbiAgICBpZiAod2luZG93TmFtZSA9PT0gJ25vbmUnKVxuICAgICAgd2luZG93TmFtZSA9ICdyZWN0YW5nbGUnO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gZmZ0U2l6ZSAvIDIgKyAxO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICd2ZWN0b3InO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uID0gW107XG4gICAgLy8gc2l6ZSBvZiB0aGUgd2luZG93IHRvIGFwcGx5IG9uIHRoZSBpbnB1dCBmcmFtZVxuICAgIHRoaXMud2luZG93U2l6ZSA9IChpbkZyYW1lU2l6ZSA8IGZmdFNpemUpID8gaW5GcmFtZVNpemUgOiBmZnRTaXplO1xuXG4gICAgLy8gcmVmZXJlbmNlcyB0byBwb3B1bGF0ZSBpbiB0aGUgd2luZG93IGZ1bmN0aW9ucyAoY2YuIGBpbml0V2luZG93YClcbiAgICB0aGlzLm5vcm1hbGl6ZUNvZWZzID0geyBsaW5lYXI6IDAsIHBvd2VyOiAwIH07XG4gICAgdGhpcy53aW5kb3cgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMud2luZG93U2l6ZSk7XG5cbiAgICBpbml0V2luZG93KFxuICAgICAgd2luZG93TmFtZSwgICAgICAgICAvLyBuYW1lIG9mIHRoZSB3aW5kb3dcbiAgICAgIHRoaXMud2luZG93LCAgICAgICAgLy8gYnVmZmVyIHBvcHVsYXRlZCB3aXRoIHRoZSB3aW5kb3cgc2lnbmFsXG4gICAgICB0aGlzLndpbmRvd1NpemUsICAgIC8vIHNpemUgb2YgdGhlIHdpbmRvd1xuICAgICAgdGhpcy5ub3JtYWxpemVDb2VmcyAvLyBvYmplY3QgcG9wdWxhdGVkIHdpdGggdGhlIG5vcm1hbGl6YXRpb24gY29lZnNcbiAgICApO1xuXG4gICAgY29uc3QgeyBsaW5lYXIsIHBvd2VyIH0gPSB0aGlzLm5vcm1hbGl6ZUNvZWZzO1xuXG4gICAgc3dpdGNoIChub3JtKSB7XG4gICAgICBjYXNlICdub25lJzpcbiAgICAgICAgdGhpcy53aW5kb3dOb3JtID0gMTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2xpbmVhcic6XG4gICAgICAgIHRoaXMud2luZG93Tm9ybSA9IGxpbmVhcjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3Bvd2VyJzpcbiAgICAgICAgdGhpcy53aW5kb3dOb3JtID0gcG93ZXI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdhdXRvJzpcbiAgICAgICAgaWYgKG1vZGUgPT09ICdtYWduaXR1ZGUnKVxuICAgICAgICAgIHRoaXMud2luZG93Tm9ybSA9IGxpbmVhcjtcbiAgICAgICAgZWxzZSBpZiAobW9kZSA9PT0gJ3Bvd2VyJylcbiAgICAgICAgICB0aGlzLndpbmRvd05vcm0gPSBwb3dlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5yZWFsID0gbmV3IEZsb2F0MzJBcnJheShmZnRTaXplKTtcbiAgICB0aGlzLmltYWcgPSBuZXcgRmxvYXQzMkFycmF5KGZmdFNpemUpO1xuICAgIHRoaXMuZmZ0ID0gbmV3IEZmdE5heXVraShmZnRTaXplKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoZSBgRmZ0YCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGEgZ3JhcGgpLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBzaWduYWwgLSBJbnB1dCB2YWx1ZXMuXG4gICAqIEByZXR1cm4ge0FycmF5fSAtIEZmdCBvZiB0aGUgaW5wdXQgc2lnbmFsLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBmZnQgPSBuZXcgbGZvLm9wZXJhdG9yLkZmdCh7IHNpemU6IDUxMiwgd2luZG93OiAnaGFubicgfSk7XG4gICAqIC8vIG1hbmRhdG9yeSBmb3IgdXNlIGluIHN0YW5kYWxvbmUgbW9kZVxuICAgKiBmZnQuaW5pdFN0cmVhbSh7IGZyYW1lU2l6ZTogMjU2LCBmcmFtZVR5cGU6ICdzaWduYWwnIH0pO1xuICAgKiBmZnQuaW5wdXRTaWduYWwoc2lnbmFsKTtcbiAgICovXG4gIGlucHV0U2lnbmFsKHNpZ25hbCkge1xuICAgIGNvbnN0IG1vZGUgPSB0aGlzLnBhcmFtcy5nZXQoJ21vZGUnKTtcbiAgICBjb25zdCB3aW5kb3dTaXplID0gdGhpcy53aW5kb3dTaXplO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBmZnRTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdzaXplJyk7XG4gICAgY29uc3Qgb3V0RGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcblxuICAgIC8vIGFwcGx5IHdpbmRvdyBvbiB0aGUgaW5wdXQgc2lnbmFsIGFuZCByZXNldCBpbWFnIGJ1ZmZlclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2luZG93U2l6ZTsgaSsrKSB7XG4gICAgICB0aGlzLnJlYWxbaV0gPSBzaWduYWxbaV0gKiB0aGlzLndpbmRvd1tpXSAqIHRoaXMud2luZG93Tm9ybTtcbiAgICAgIHRoaXMuaW1hZ1tpXSA9IDA7XG4gICAgfVxuXG4gICAgLy8gaWYgcmVhbCBpcyBiaWdnZXIgdGhhbiBpbnB1dCBzaWduYWwsIGZpbGwgd2l0aCB6ZXJvc1xuICAgIGZvciAobGV0IGkgPSB3aW5kb3dTaXplOyBpIDwgZmZ0U2l6ZTsgaSsrKSB7XG4gICAgICB0aGlzLnJlYWxbaV0gPSAwO1xuICAgICAgdGhpcy5pbWFnW2ldID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLmZmdC5mb3J3YXJkKHRoaXMucmVhbCwgdGhpcy5pbWFnKTtcblxuICAgIGlmIChtb2RlID09PSAnbWFnbml0dWRlJykge1xuICAgICAgY29uc3Qgbm9ybSA9IDEgLyBmZnRTaXplO1xuXG4gICAgICAvLyBEQyBpbmRleFxuICAgICAgY29uc3QgcmVhbERjID0gdGhpcy5yZWFsWzBdO1xuICAgICAgY29uc3QgaW1hZ0RjID0gdGhpcy5pbWFnWzBdO1xuICAgICAgb3V0RGF0YVswXSA9IHNxcnQocmVhbERjICogcmVhbERjICsgaW1hZ0RjICogaW1hZ0RjKSAqIG5vcm07XG5cbiAgICAgIC8vIE5xdXlzdCBpbmRleFxuICAgICAgY29uc3QgcmVhbE55ID0gdGhpcy5yZWFsW2ZmdFNpemUgLyAyXTtcbiAgICAgIGNvbnN0IGltYWdOeSA9IHRoaXMuaW1hZ1tmZnRTaXplIC8gMl07XG4gICAgICBvdXREYXRhW2ZmdFNpemUgLyAyXSA9IHNxcnQocmVhbE55ICogcmVhbE55ICsgaW1hZ055ICogaW1hZ055KSAqIG5vcm07XG5cbiAgICAgIC8vIHBvd2VyIHNwZWN0cnVtXG4gICAgICBmb3IgKGxldCBpID0gMSwgaiA9IGZmdFNpemUgLSAxOyBpIDwgZmZ0U2l6ZSAvIDI7IGkrKywgai0tKSB7XG4gICAgICAgIGNvbnN0IHJlYWwgPSAwLjUgKiAodGhpcy5yZWFsW2ldICsgdGhpcy5yZWFsW2pdKTtcbiAgICAgICAgY29uc3QgaW1hZyA9IDAuNSAqICh0aGlzLmltYWdbaV0gLSB0aGlzLmltYWdbal0pO1xuXG4gICAgICAgIG91dERhdGFbaV0gPSAyICogc3FydChyZWFsICogcmVhbCArIGltYWcgKiBpbWFnKSAqIG5vcm07XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdwb3dlcicpIHtcbiAgICAgIGNvbnN0IG5vcm0gPSAxIC8gKGZmdFNpemUgKiBmZnRTaXplKTtcblxuICAgICAgLy8gREMgaW5kZXhcbiAgICAgIGNvbnN0IHJlYWxEYyA9IHRoaXMucmVhbFswXTtcbiAgICAgIGNvbnN0IGltYWdEYyA9IHRoaXMuaW1hZ1swXTtcbiAgICAgIG91dERhdGFbMF0gPSAocmVhbERjICogcmVhbERjICsgaW1hZ0RjICogaW1hZ0RjKSAqIG5vcm07XG5cbiAgICAgIC8vIE5xdXlzdCBpbmRleFxuICAgICAgY29uc3QgcmVhbE55ID0gdGhpcy5yZWFsW2ZmdFNpemUgLyAyXTtcbiAgICAgIGNvbnN0IGltYWdOeSA9IHRoaXMuaW1hZ1tmZnRTaXplIC8gMl07XG4gICAgICBvdXREYXRhW2ZmdFNpemUgLyAyXSA9IChyZWFsTnkgKiByZWFsTnkgKyBpbWFnTnkgKiBpbWFnTnkpICogbm9ybTtcblxuICAgICAgLy8gcG93ZXIgc3BlY3RydW1cbiAgICAgIGZvciAobGV0IGkgPSAxLCBqID0gZmZ0U2l6ZSAtIDE7IGkgPCBmZnRTaXplIC8gMjsgaSsrLCBqLS0pIHtcbiAgICAgICAgY29uc3QgcmVhbCA9IDAuNSAqICh0aGlzLnJlYWxbaV0gKyB0aGlzLnJlYWxbal0pO1xuICAgICAgICBjb25zdCBpbWFnID0gMC41ICogKHRoaXMuaW1hZ1tpXSAtIHRoaXMuaW1hZ1tqXSk7XG5cbiAgICAgICAgb3V0RGF0YVtpXSA9IDQgKiAocmVhbCAqIHJlYWwgKyBpbWFnICogaW1hZykgKiBub3JtO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXREYXRhO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUpIHtcbiAgICB0aGlzLmlucHV0U2lnbmFsKGZyYW1lLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZmdDtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IHNxcnQgPSBNYXRoLnNxcnQ7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBub3JtYWxpemU6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgcG93ZXI6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH1cbn1cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBtYWduaXR1ZGUgb2YgYSBgdmVjdG9yYCBpbnB1dC5cbiAqXG4gKiBfc3VwcG9ydCBgc3RhbmRhbG9uZWAgdXNhZ2VfXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm5vcm1hbGl6ZT10cnVlXSAtIE5vcm1hbGl6ZSBvdXRwdXQgYWNjb3JkaW5nIHRvXG4gKiAgdGhlIHZlY3RvciBzaXplLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5wb3dlcj1mYWxzZV0gLSBJZiB0cnVlLCByZXR1cm5zIHRoZSBzcXVhcmVkXG4gKiAgbWFnbml0dWRlIChwb3dlcikuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jb21tb24nO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4gPSBuZXcgbGZvLnNvdXJjZS5FdmVudEluKHsgZnJhbWVTaXplOiAyLCBmcmFtZVR5cGU6ICd2ZWN0b3InIH0pO1xuICogY29uc3QgbWFnbml0dWRlID0gbmV3IGxmby5vcGVyYXRvci5NYWduaXR1ZGUoKTtcbiAqIGNvbnN0IGxvZ2dlciA9IG5ldyBsZm8uc2luay5Mb2dnZXIoeyBvdXRGcmFtZTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QobWFnbml0dWRlKTtcbiAqIG1hZ25pdHVkZS5jb25uZWN0KGxvZ2dlcik7XG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIFsxLCAxXSk7XG4gKiA+IFsxXVxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIFsyLCAyXSk7XG4gKiA+IFsyLjgyODQyNzEyNDc1XVxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIFszLCAzXSk7XG4gKiA+IFs0LjI0MjY0MDY4NzEyXVxuICovXG5jbGFzcyBNYWduaXR1ZGUgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fbm9ybWFsaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdub3JtYWxpemUnKTtcbiAgICB0aGlzLl9wb3dlciA9IHRoaXMucGFyYW1zLmdldCgncG93ZXInKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBvblBhcmFtVXBkYXRlKG5hbWUsIHZhbHVlLCBtZXRhcykge1xuICAgIHN1cGVyLm9uUGFyYW1VcGRhdGUobmFtZSwgdmFsdWUsIG1ldGFzKTtcblxuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSAnbm9ybWFsaXplJzpcbiAgICAgICAgdGhpcy5fbm9ybWFsaXplID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncG93ZXInOlxuICAgICAgICB0aGlzLl9wb3dlciA9IHZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IDE7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlID0gJ3NjYWxhcic7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZGVzY3JpcHRpb24gPSBbJ21hZ25pdHVkZSddO1xuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoZSBgTWFnbml0dWRlYCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGEgZ3JhcGgpLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fEZsb2F0MzJBcnJheX0gdmFsdWVzIC0gVmFsdWVzIHRvIHByb2Nlc3MuXG4gICAqIEByZXR1cm4ge051bWJlcn0gLSBNYWduaXR1ZGUgdmFsdWUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAgICpcbiAgICogY29uc3QgbWFnbml0dWRlID0gbmV3IGxmby5vcGVyYXRvci5NYWduaXR1ZGUoeyBwb3dlcjogdHJ1ZSB9KTtcbiAgICogbWFnbml0dWRlLmluaXRTdHJlYW0oeyBmcmFtZVR5cGU6ICd2ZWN0b3InLCBmcmFtZVNpemU6IDMgfSk7XG4gICAqIG1hZ25pdHVkZS5pbnB1dFZlY3RvcihbMywgM10pO1xuICAgKiA+IDQuMjQyNjQwNjg3MTJcbiAgICovXG4gIGlucHV0VmVjdG9yKHZhbHVlcykge1xuICAgIGNvbnN0IGxlbmd0aCA9IHZhbHVlcy5sZW5ndGg7XG4gICAgbGV0IHN1bSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgICAgc3VtICs9ICh2YWx1ZXNbaV0gKiB2YWx1ZXNbaV0pO1xuXG4gICAgbGV0IG1hZyA9IHN1bTtcblxuICAgIGlmICh0aGlzLl9ub3JtYWxpemUpXG4gICAgICBtYWcgLz0gbGVuZ3RoO1xuXG4gICAgaWYgKCF0aGlzLl9wb3dlcilcbiAgICAgIG1hZyA9IHNxcnQobWFnKTtcblxuICAgIHJldHVybiBtYWc7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcihmcmFtZSkge1xuICAgIHRoaXMuZnJhbWUuZGF0YVswXSA9IHRoaXMuaW5wdXRWZWN0b3IoZnJhbWUuZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFnbml0dWRlO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3Qgc3FydCA9IE1hdGguc3FydDtcblxuLyoqXG4gKiBDb21wdXRlIG1lYW4gYW5kIHN0YW5kYXJkIGRldmlhdGlvbiBvZiBhIGdpdmVuIGBzaWduYWxgLlxuICpcbiAqIF9zdXBwb3J0IGBzdGFuZGFsb25lYCB1c2FnZV9cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICpcbiAqIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAqICAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gKiAgIC50aGVuKGluaXQpXG4gKiAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyci5zdGFjaykpO1xuICpcbiAqIGZ1bmN0aW9uIGluaXQoc3RyZWFtKSB7XG4gKiAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xuICpcbiAqICAgY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gKiAgICAgc291cmNlTm9kZTogc291cmNlLFxuICogICAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICB9KTtcbiAqXG4gKiAgIGNvbnN0IG1lYW5TdGRkZXYgPSBuZXcgbGZvLm9wZXJhdG9yLk1lYW5TdGRkZXYoKTtcbiAqXG4gKiAgIGNvbnN0IHRyYWNlRGlzcGxheSA9IG5ldyBsZm8uc2luay5UcmFjZURpc3BsYXkoe1xuICogICAgIGNhbnZhczogJyN0cmFjZScsXG4gKiAgIH0pO1xuICpcbiAqICAgYXVkaW9Jbk5vZGUuY29ubmVjdChtZWFuU3RkZGV2KTtcbiAqICAgbWVhblN0ZGRldi5jb25uZWN0KHRyYWNlRGlzcGxheSk7XG4gKiAgIGF1ZGlvSW5Ob2RlLnN0YXJ0KCk7XG4gKiB9XG4gKi9cbmNsYXNzIE1lYW5TdGRkZXYgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gbm8gb3B0aW9ucyBhdmFpbGFibGUsIGp1c3QgdGhyb3cgYW4gZXJyb3IgaWYgc29tZSBwYXJhbSB0cnkgdG8gYmUgc2V0LlxuICAgIHN1cGVyKHt9LCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSAyO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uID0gWydtZWFuJywgJ3N0ZGRldiddO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBNZWFuU3RkZGV2YCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGEgZ3JhcGgpLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fEZsb2F0MzJBcnJheX0gdmFsdWVzIC0gVmFsdWVzIHRvIHByb2Nlc3MuXG4gICAqIEByZXR1cm4ge0FycmF5fSAtIE1lYW4gYW5kIHN0YW5kYXJ0IGRldmlhdGlvbiBvZiB0aGUgaW5wdXQgdmFsdWVzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gICAqXG4gICAqIGNvbnN0IG1lYW5TdGRkZXYgPSBuZXcgbGZvLm9wZXJhdG9yLk1lYW5TdGRkZXYoKTtcbiAgICogbWVhblN0ZGRldi5pbml0U3RyZWFtKHsgZnJhbWVUeXBlOiAndmVjdG9yJywgZnJhbWVTaXplOiAxMDI0IH0pO1xuICAgKiBtZWFuU3RkZGV2LmlucHV0VmVjdG9yKHNvbWVTaW5lU2lnbmFsKTtcbiAgICogPiBbMCwgMC43MDcxXVxuICAgKi9cbiAgaW5wdXRTaWduYWwodmFsdWVzKSB7XG4gICAgY29uc3Qgb3V0RGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoO1xuXG4gICAgbGV0IG1lYW4gPSAwO1xuICAgIGxldCBtMiA9IDA7XG5cbiAgICAvLyBjb21wdXRlIG1lYW4gYW5kIHZhcmlhbmNlIHdpdGggV2VsZm9yZCBhbGdvcml0aG1cbiAgICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BbGdvcml0aG1zX2Zvcl9jYWxjdWxhdGluZ192YXJpYW5jZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSB2YWx1ZXNbaV07XG4gICAgICBjb25zdCBkZWx0YSA9IHggLSBtZWFuO1xuICAgICAgbWVhbiArPSBkZWx0YSAvIChpICsgMSk7XG4gICAgICBtMiArPSBkZWx0YSAqICh4IC0gbWVhbik7XG4gICAgfVxuXG4gICAgY29uc3QgdmFyaWFuY2UgPSBtMiAvIChsZW5ndGggLSAxKTtcbiAgICBjb25zdCBzdGRkZXYgPSBzcXJ0KHZhcmlhbmNlKTtcblxuICAgIG91dERhdGFbMF0gPSBtZWFuO1xuICAgIG91dERhdGFbMV0gPSBzdGRkZXY7XG5cbiAgICByZXR1cm4gb3V0RGF0YTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZWFuU3RkZGV2O1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgbWluID0gTWF0aC5taW47XG5jb25zdCBtYXggPSBNYXRoLm1heDtcbmNvbnN0IHBvdyA9IE1hdGgucG93O1xuY29uc3QgbG9nMTAgPSBNYXRoLmxvZzEwO1xuXG5mdW5jdGlvbiBoZXJ0elRvTWVsSHRrKGZyZXFIeikge1xuICByZXR1cm4gMjU5NSAqIE1hdGgubG9nMTAoMSArIChmcmVxSHogLyA3MDApKTtcbn1cblxuZnVuY3Rpb24gbWVsVG9IZXJ0ekh0ayhmcmVxTWVsKSB7XG4gIHJldHVybiA3MDAgKiAoTWF0aC5wb3coMTAsIGZyZXFNZWwgLyAyNTk1KSAtIDEpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBkZXNjcmlwdGlvbiBvZiB0aGUgd2VpZ2h0cyB0byBhcHBseSBvbiB0aGUgZmZ0IGJpbnMgZm9yIGVhY2hcbiAqIE1lbCBiYW5kIGZpbHRlci5cbiAqIEBub3RlIC0gYWRhcHRlZCBmcm9tIGltdHItdG9vbHMvcnRhXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5ickJpbnMgLSBOdW1iZXIgb2YgZmZ0IGJpbnMuXG4gKiBAcGFyYW0ge051bWJlcn0gbmJyRmlsdGVyIC0gTnVtYmVyIG9mIG1lbCBmaWx0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IHNhbXBsZVJhdGUgLSBTYW1wbGUgUmF0ZSBvZiB0aGUgc2lnbmFsLlxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbkZyZXEgLSBNaW5pbXVtIEZyZXF1ZW5jeSB0byBiZSBjb25zaWRlcmVyZWQuXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4RnJlcSAtIE1heGltdW0gZnJlcXVlbmN5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7QXJyYXk8T2JqZWN0Pn0gLSBEZXNjcmlwdGlvbiBvZiB0aGUgd2VpZ2h0cyB0byBhcHBseSBvbiB0aGUgYmlucyBmb3JcbiAqICBlYWNoIG1lbCBmaWx0ZXIuIEVhY2ggZGVzY3JpcHRpb24gaGFzIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlOlxuICogIHsgc3RhcnRJbmRleDogYmluSW5kZXgsIGNlbnRlckZyZXE6IGJpbkNlbnRlckZyZXF1ZW5jeSwgd2VpZ2h0czogW10gfVxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldE1lbEJhbmRXZWlnaHRzKG5ickJpbnMsIG5ickJhbmRzLCBzYW1wbGVSYXRlLCBtaW5GcmVxLCBtYXhGcmVxLCB0eXBlID0gJ2h0aycpIHtcblxuICBsZXQgaGVydHpUb01lbCA9IG51bGw7XG4gIGxldCBtZWxUb0hlcnR6ID0gbnVsbDtcbiAgbGV0IG1pbk1lbDtcbiAgbGV0IG1heE1lbDtcblxuICBpZiAodHlwZSA9PT0gJ2h0aycpIHtcbiAgICBoZXJ0elRvTWVsID0gaGVydHpUb01lbEh0aztcbiAgICBtZWxUb0hlcnR6ID0gbWVsVG9IZXJ0ekh0aztcbiAgICBtaW5NZWwgPSBoZXJ0elRvTWVsKG1pbkZyZXEpO1xuICAgIG1heE1lbCA9IGhlcnR6VG9NZWwobWF4RnJlcSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG1lbCBiYW5kIHR5cGU6IFwiJHt0eXBlfVwiYCk7XG4gIH1cblxuICBjb25zdCBtZWxCYW5kRGVzY3JpcHRpb25zID0gbmV3IEFycmF5KG5ickJhbmRzKTtcbiAgLy8gY2VudGVyIGZyZXF1ZW5jaWVzIG9mIEZmdCBiaW5zXG4gIGNvbnN0IGZmdEZyZXFzID0gbmV3IEZsb2F0MzJBcnJheShuYnJCaW5zKTtcbiAgLy8gY2VudGVyIGZyZXF1ZW5jaWVzIG9mIG1lbCBiYW5kcyAtIHVuaWZvcm1seSBzcGFjZWQgaW4gbWVsIGRvbWFpbiBiZXR3ZWVuXG4gIC8vIGxpbWl0cywgdGhlcmUgYXJlIDIgbW9yZSBmcmVxdWVuY2llcyB0aGFuIHRoZSBhY3R1YWwgbnVtYmVyIG9mIGZpbHRlcnMgaW5cbiAgLy8gb3JkZXIgdG8gY2FsY3VsYXRlIHRoZSBzbG9wZXNcbiAgY29uc3QgZmlsdGVyRnJlcXMgPSBuZXcgRmxvYXQzMkFycmF5KG5ickJhbmRzICsgMik7XG5cbiAgY29uc3QgZmZ0U2l6ZSA9IChuYnJCaW5zIC0gMSkgKiAyO1xuICAvLyBjb21wdXRlIGJpbnMgY2VudGVyIGZyZXF1ZW5jaWVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQmluczsgaSsrKVxuICAgIGZmdEZyZXFzW2ldID0gc2FtcGxlUmF0ZSAqIGkgLyBmZnRTaXplO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQmFuZHMgKyAyOyBpKyspXG4gICAgZmlsdGVyRnJlcXNbaV0gPSBtZWxUb0hlcnR6KG1pbk1lbCArIGkgLyAobmJyQmFuZHMgKyAxKSAqIChtYXhNZWwgLSBtaW5NZWwpKTtcblxuICAvLyBsb29wIHRocm91Z2h0IGZpbHRlcnNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYnJCYW5kczsgaSsrKSB7XG4gICAgbGV0IG1pbldlaWdodEluZGV4RGVmaW5lZCA9IDA7XG5cbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHtcbiAgICAgIHN0YXJ0SW5kZXg6IG51bGwsXG4gICAgICBjZW50ZXJGcmVxOiBudWxsLFxuICAgICAgd2VpZ2h0czogW10sXG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIGNvbnRyaWJ1dGlvbiBvZiBlYWNoIGJpbiBmb3IgdGhlIGZpbHRlciBhdCBpbmRleCAoaSArIDEpXG4gICAgLy8gZG8gbm90IHByb2Nlc3MgdGhlIGxhc3Qgc3BlY3RydW0gY29tcG9uZW50IChOeXF1aXN0KVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbmJyQmlucyAtIDE7IGorKykge1xuICAgICAgY29uc3QgcG9zU2xvcGVDb250cmliID0gKGZmdEZyZXFzW2pdIC0gZmlsdGVyRnJlcXNbaV0pIC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmaWx0ZXJGcmVxc1tpKzFdIC0gZmlsdGVyRnJlcXNbaV0pO1xuXG4gICAgICBjb25zdCBuZWdTbG9wZUNvbnRyaWIgPSAoZmlsdGVyRnJlcXNbaSsyXSAtIGZmdEZyZXFzW2pdKSAvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZmlsdGVyRnJlcXNbaSsyXSAtIGZpbHRlckZyZXFzW2krMV0pO1xuICAgICAgLy8gbG93ZXJTbG9wZSBhbmQgdXBwZXIgc2xvcGUgaW50ZXJzZWN0IGF0IHplcm8gYW5kIHdpdGggZWFjaCBvdGhlclxuICAgICAgY29uc3QgY29udHJpYnV0aW9uID0gbWF4KDAsIG1pbihwb3NTbG9wZUNvbnRyaWIsIG5lZ1Nsb3BlQ29udHJpYikpO1xuXG4gICAgICBpZiAoY29udHJpYnV0aW9uID4gMCkge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb24uc3RhcnRJbmRleCA9PT0gbnVsbCkge1xuICAgICAgICAgIGRlc2NyaXB0aW9uLnN0YXJ0SW5kZXggPSBqO1xuICAgICAgICAgIGRlc2NyaXB0aW9uLmNlbnRlckZyZXEgPSBmaWx0ZXJGcmVxc1tpKzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzY3JpcHRpb24ud2VpZ2h0cy5wdXNoKGNvbnRyaWJ1dGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZW1wdHkgZmlsdGVyXG4gICAgaWYgKGRlc2NyaXB0aW9uLnN0YXJ0SW5kZXggPT09IG51bGwpIHtcbiAgICAgIGRlc2NyaXB0aW9uLnN0YXJ0SW5kZXggPSAwO1xuICAgICAgZGVzY3JpcHRpb24uY2VudGVyRnJlcSA9IDA7XG4gICAgfVxuXG4gICAgLy8gQHRvZG8gLSBkbyBzb21lIHNjYWxpbmcgZm9yIFNsYW5leS1zdHlsZSBtZWxcbiAgICBtZWxCYW5kRGVzY3JpcHRpb25zW2ldID0gZGVzY3JpcHRpb247XG4gIH1cblxuICByZXR1cm4gbWVsQmFuZERlc2NyaXB0aW9ucztcbn1cblxuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgbG9nOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIG5ickJhbmRzOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDI0LFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIG1pbkZyZXE6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IDAsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgbWF4RnJlcToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBwb3dlcjoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxufTtcblxuXG4vKipcbiAqIENvbXB1dGUgdGhlIG1lbCBiYW5kcyBzcGVjdHJ1bSBmcm9tIGEgZ2l2ZW4gc3BlY3RydW0gKGB2ZWN0b3JgIHR5cGUpLlxuICogX0ltcGxlbWVudCB0aGUgYGh0a2AgbWVsIGJhbmQgc3R5bGUuX1xuICpcbiAqIF9zdXBwb3J0IGBzdGFuZGFsb25lYCB1c2FnZV9cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5sb2c9ZmFsc2VdIC0gQXBwbHkgYSBsb2dhcml0aG1pYyBzY2FsZSBvbiB0aGUgb3V0cHV0LlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm5ickJhbmRzPTI0XSAtIE51bWJlciBvZiBmaWx0ZXJzIGRlZmluaW5nIHRoZSBtZWxcbiAqICBiYW5kcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW5GcmVxPTBdIC0gTWluaW11bSBmcmVxdWVuY3kgdG8gY29uc2lkZXIuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4RnJlcT1udWxsXSAtIE1heGltdW0gZnJlcXVlbmN5IHRvIGNvbnNpZGVyLlxuICogIElmIGBudWxsYCwgaXMgc2V0IHRvIE55cXVpc3QgZnJlcXVlbmN5LlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnBvd2VyPTFdIC0gQXBwbHkgYSBwb3dlciBzY2FsaW5nIG9uIGVhY2ggbWVsIGJhbmQuXG4gKlxuICogQHRvZG8gLSBpbXBsZW1lbnQgU2xhbmV5IHN0eWxlIG1lbCBiYW5kc1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgbGZvIGZyb20gJ3dhdmVzLWxmby9ub2RlJ1xuICpcbiAqIC8vIHJlYWQgYSBmaWxlIGZyb20gcGF0aCAobm9kZSBvbmx5IHNvdXJjZSlcbiAqIGNvbnN0IGF1ZGlvSW5GaWxlID0gbmV3IGxmby5zb3VyY2UuQXVkaW9JbkZpbGUoe1xuICogICBmaWxlbmFtZTogJ3BhdGgvdG8vZmlsZScsXG4gKiAgIGZyYW1lU2l6ZTogNTEyLFxuICogfSk7XG4gKlxuICogY29uc3Qgc2xpY2VyID0gbmV3IGxmby5vcGVyYXRvci5TbGljZXIoe1xuICogICBmcmFtZVNpemU6IDI1NixcbiAqICAgaG9wU2l6ZTogMjU2LFxuICogfSk7XG4gKlxuICogY29uc3QgZmZ0ID0gbmV3IGxmby5vcGVyYXRvci5GZnQoe1xuICogICBzaXplOiAxMDI0LFxuICogICB3aW5kb3c6ICdoYW5uJyxcbiAqICAgbW9kZTogJ3Bvd2VyJyxcbiAqICAgbm9ybTogJ3Bvd2VyJyxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IG1lbCA9IG5ldyBsZm8ub3BlcmF0b3IuTWVsKHtcbiAqICAgbG9nOiB0cnVlLFxuICogICBuYnJCYW5kczogMjQsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBhdWRpb0luRmlsZS5jb25uZWN0KHNsaWNlcik7XG4gKiBzbGljZXIuY29ubmVjdChmZnQpO1xuICogZmZ0LmNvbm5lY3QobWVsKTtcbiAqIG1lbC5jb25uZWN0KGxvZ2dlcik7XG4gKlxuICogYXVkaW9JbkZpbGUuc3RhcnQoKTtcbiAqL1xuY2xhc3MgTWVsIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICBjb25zdCBuYnJCaW5zID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgbmJyQmFuZHMgPSB0aGlzLnBhcmFtcy5nZXQoJ25ickJhbmRzJyk7XG4gICAgY29uc3Qgc2FtcGxlUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG4gICAgY29uc3QgbWluRnJlcSA9IHRoaXMucGFyYW1zLmdldCgnbWluRnJlcScpO1xuICAgIGxldCBtYXhGcmVxID0gdGhpcy5wYXJhbXMuZ2V0KCdtYXhGcmVxJyk7XG5cbiAgICAvL1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IG5ickJhbmRzO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICd2ZWN0b3InO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uID0gW107XG5cbiAgICBpZiAobWF4RnJlcSA9PT0gbnVsbClcbiAgICAgIG1heEZyZXEgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlIC8gMjtcblxuICAgIHRoaXMubWVsQmFuZERlc2NyaXB0aW9ucyA9IGdldE1lbEJhbmRXZWlnaHRzKG5ickJpbnMsIG5ickJhbmRzLCBzYW1wbGVSYXRlLCBtaW5GcmVxLCBtYXhGcmVxKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoZSBgTWVsYCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGEgZ3JhcGgpLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBzcGVjdHJ1bSAtIEZmdCBiaW5zLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBNZWwgYmFuZHMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG1lbCA9IG5ldyBsZm8ub3BlcmF0b3IuTWVsKHsgbmJyQmFuZHM6IDI0IH0pO1xuICAgKiAvLyBtYW5kYXRvcnkgZm9yIHVzZSBpbiBzdGFuZGFsb25lIG1vZGVcbiAgICogbWVsLmluaXRTdHJlYW0oeyBmcmFtZVNpemU6IDI1NiwgZnJhbWVUeXBlOiAndmVjdG9yJywgc291cmNlU2FtcGxlUmF0ZTogNDQxMDAgfSk7XG4gICAqIG1lbC5pbnB1dFZlY3RvcihmZnRCaW5zKTtcbiAgICovXG4gIGlucHV0VmVjdG9yKGJpbnMpIHtcblxuICAgIGNvbnN0IHBvd2VyID0gdGhpcy5wYXJhbXMuZ2V0KCdwb3dlcicpO1xuICAgIGNvbnN0IGxvZyA9IHRoaXMucGFyYW1zLmdldCgnbG9nJyk7XG4gICAgY29uc3QgbWVsQmFuZHMgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgY29uc3QgbmJyQmFuZHMgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgbGV0IHNjYWxlID0gMTtcblxuICAgIGNvbnN0IG1pbkxvZ1ZhbHVlID0gMWUtNDg7XG4gICAgY29uc3QgbWluTG9nID0gLTQ4MDtcblxuICAgIGlmIChsb2cpXG4gICAgICBzY2FsZSAqPSBuYnJCYW5kcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQmFuZHM7IGkrKykge1xuICAgICAgY29uc3QgeyBzdGFydEluZGV4LCB3ZWlnaHRzIH0gPSB0aGlzLm1lbEJhbmREZXNjcmlwdGlvbnNbaV07XG4gICAgICBsZXQgdmFsdWUgPSAwO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdlaWdodHMubGVuZ3RoOyBqKyspXG4gICAgICAgIHZhbHVlICs9IHdlaWdodHNbal0gKiBiaW5zW3N0YXJ0SW5kZXggKyBqXTtcblxuICAgICAgLy8gYXBwbHkgc2FtZSBsb2dpYyBhcyBpbiBQaVBvQmFuZHNcbiAgICAgIGlmIChzY2FsZSAhPT0gMSlcbiAgICAgICAgdmFsdWUgKj0gc2NhbGU7XG5cbiAgICAgIGlmIChsb2cpIHtcbiAgICAgICAgaWYgKHZhbHVlID4gbWluTG9nVmFsdWUpXG4gICAgICAgICAgdmFsdWUgPSAxMCAqIGxvZzEwKHZhbHVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHZhbHVlID0gbWluTG9nO1xuICAgICAgfVxuXG4gICAgICBpZiAocG93ZXIgIT09IDEpXG4gICAgICAgIHZhbHVlID0gcG93KHZhbHVlLCBwb3dlcik7XG5cbiAgICAgIG1lbEJhbmRzW2ldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbEJhbmRzO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUpIHtcbiAgICB0aGlzLmlucHV0VmVjdG9yKGZyYW1lLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lbDtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5pbXBvcnQgRmZ0IGZyb20gJy4vRmZ0JztcbmltcG9ydCBNZWwgZnJvbSAnLi9NZWwnO1xuaW1wb3J0IERjdCBmcm9tICcuL0RjdCc7XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIG5ickJhbmRzOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDI0LFxuICAgIG1ldGE6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgbmJyQ29lZnM6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMTIsXG4gICAgbWV0YTogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBtaW5GcmVxOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGE6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgbWF4RnJlcToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBNZmNjIG9mIHRoZSBpbmNvbW1pbmcgYHNpZ25hbGAuIElzIGJhc2ljYWxseSBhIHdyYXBwZXIgYXJvdW5kXG4gKiBbYEZmdGBde0BsaW5rIG1vZHVsZTpjb21tb24ub3BlcmF0b3IuRmZ0fSwgW2BNZWxgXXtAbGluayBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yLk1lbH1cbiAqIGFuZCBbYERjdGBde0BsaW5rIG1vZHVsZTpjb21tb24ub3BlcmF0b3IuRGN0fS5cbiAqXG4gKiBfc3VwcG9ydCBgc3RhbmRhbG9uZWAgdXNhZ2VfXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7bmJyQmFuZHN9IFtvcHRpb25zLm5ickJhbmRzPTI0XSAtIE51bWJlciBvZiBNZWwgYmFuZHMuXG4gKiBAcGFyYW0ge25ickNvZWZzfSBbb3B0aW9ucy5uYnJDb2Vmcz0xMl0gLSBOdW1iZXIgb2Ygb3V0cHV0IGNvZWZzLlxuICpcbiAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24ub3BlcmF0b3IuRmZ0fVxuICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5vcGVyYXRvci5NZWx9XG4gKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yLkRjdH1cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IGxmbyBmcm9tICd3YXZlcy1sZm8vbm9kZSdcbiAqXG4gKiBjb25zdCBhdWRpb0luRmlsZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5GaWxlKHtcbiAqICAgZmlsZW5hbWU6ICdwYXRoL3RvL2ZpbGUnLFxuICogICBmcmFtZVNpemU6IDUxMixcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNsaWNlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiAyNTYsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBtZmNjID0gbmV3IGxmby5vcGVyYXRvci5NZmNjKHtcbiAqICAgbmJyQmFuZHM6IDI0LFxuICogICBuYnJDb2VmczogMTIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBhdWRpb0luRmlsZS5jb25uZWN0KHNsaWNlcik7XG4gKiBzbGljZXIuY29ubmVjdChtZmNjKTtcbiAqIG1mY2MuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIGF1ZGlvSW5GaWxlLnN0YXJ0KCk7XG4gKi9cbmNsYXNzIE1mY2MgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICBjb25zdCBuYnJCYW5kcyA9IHRoaXMucGFyYW1zLmdldCgnbmJyQmFuZHMnKTtcbiAgICBjb25zdCBuYnJDb2VmcyA9IHRoaXMucGFyYW1zLmdldCgnbmJyQ29lZnMnKTtcbiAgICBjb25zdCBtaW5GcmVxID0gdGhpcy5wYXJhbXMuZ2V0KCdtaW5GcmVxJyk7XG4gICAgY29uc3QgbWF4RnJlcSA9IHRoaXMucGFyYW1zLmdldCgnbWF4RnJlcScpO1xuICAgIGNvbnN0IGlucHV0RnJhbWVTaXplID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgaW5wdXRGcmFtZVJhdGUgPSBwcmV2U3RyZWFtUGFyYW1zLmZyYW1lUmF0ZTtcbiAgICBjb25zdCBpbnB1dFNhbXBsZVJhdGUgPSBwcmV2U3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG4gICAgY29uc3QgbmJyQmlucyA9IGlucHV0RnJhbWVTaXplIC8gMiArIDE7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBuYnJDb2VmcztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFtdO1xuXG4gICAgdGhpcy5mZnQgPSBuZXcgRmZ0KHtcbiAgICAgIHdpbmRvdzogJ2hhbm4nLFxuICAgICAgbW9kZTogJ3Bvd2VyJyxcbiAgICAgIG5vcm06ICdwb3dlcicsXG4gICAgICBzaXplOiBpbnB1dEZyYW1lU2l6ZSxcbiAgICB9KTtcblxuICAgIHRoaXMubWVsID0gbmV3IE1lbCh7XG4gICAgICBuYnJCYW5kczogbmJyQmFuZHMsXG4gICAgICBsb2c6IHRydWUsXG4gICAgICBwb3dlcjogMSxcbiAgICAgIG1pbkZyZXE6IG1pbkZyZXEsXG4gICAgICBtYXhGcmVxOiBtYXhGcmVxLFxuICAgIH0pO1xuXG4gICAgdGhpcy5kY3QgPSBuZXcgRGN0KHtcbiAgICAgIG9yZGVyOiBuYnJDb2VmcyxcbiAgICB9KTtcblxuICAgIC8vIGluaXQgc3RyZWFtc1xuICAgIHRoaXMuZmZ0LmluaXRTdHJlYW0oe1xuICAgICAgZnJhbWVUeXBlOiAnc2lnbmFsJyxcbiAgICAgIGZyYW1lU2l6ZTogaW5wdXRGcmFtZVNpemUsXG4gICAgICBmcmFtZVJhdGU6IGlucHV0RnJhbWVSYXRlLFxuICAgICAgc291cmNlU2FtcGxlUmF0ZTogaW5wdXRTYW1wbGVSYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZWwuaW5pdFN0cmVhbSh7XG4gICAgICBmcmFtZVR5cGU6ICd2ZWN0b3InLFxuICAgICAgZnJhbWVTaXplOiBuYnJCaW5zLFxuICAgICAgZnJhbWVSYXRlOiBpbnB1dEZyYW1lUmF0ZSxcbiAgICAgIHNvdXJjZVNhbXBsZVJhdGU6IGlucHV0U2FtcGxlUmF0ZSxcbiAgICB9KTtcblxuICAgIHRoaXMuZGN0LmluaXRTdHJlYW0oe1xuICAgICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAgICAgIGZyYW1lU2l6ZTogbmJyQmFuZHMsXG4gICAgICBmcmFtZVJhdGU6IGlucHV0RnJhbWVSYXRlLFxuICAgICAgc291cmNlU2FtcGxlUmF0ZTogaW5wdXRTYW1wbGVSYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBNZmNjYCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGEgZ3JhcGgpLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gU2lnbmFsIGNodW5rIHRvIGFuYWx5c2UuXG4gICAqIEByZXR1cm4ge0FycmF5fSAtIE1mY2MgY29lZmZpY2llbnRzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBtZmNjID0gbmV3IGxmby5vcGVyYXRvci5NZmNjKCk7XG4gICAqIC8vIG1hbmRhdG9yeSBmb3IgdXNlIGluIHN0YW5kYWxvbmUgbW9kZVxuICAgKiBtZmNjLmluaXRTdHJlYW0oeyBmcmFtZVNpemU6IDI1NiwgZnJhbWVUeXBlOiAndmVjdG9yJyB9KTtcbiAgICogbWZjYy5pbnB1dFNpZ25hbChzaWduYWwpO1xuICAgKi9cbiAgaW5wdXRTaWduYWwoZGF0YSkge1xuICAgIGNvbnN0IG91dHB1dCA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCBuYnJDb2VmcyA9IHRoaXMucGFyYW1zLmdldCgnbmJyQ29lZnMnKTtcblxuICAgIGNvbnN0IGJpbnMgPSB0aGlzLmZmdC5pbnB1dFNpZ25hbChkYXRhKTtcbiAgICBjb25zdCBtZWxCYW5kcyA9IHRoaXMubWVsLmlucHV0VmVjdG9yKGJpbnMpO1xuICAgIC8vIGNvbnNvbGUubG9nKG1lbEJhbmRzKTtcbiAgICBjb25zdCBjb2VmcyA9IHRoaXMuZGN0LmlucHV0U2lnbmFsKG1lbEJhbmRzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQ29lZnM7IGkrKylcbiAgICAgIG91dHB1dFtpXSA9IGNvZWZzW2ldO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZmNjO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuLyoqXG4gKiBGaW5kIG1pbmltdW4gYW5kIG1heGltdW0gdmFsdWVzIG9mIGEgZ2l2ZW4gYHNpZ25hbGAuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY29tbW9uJztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lU2l6ZTogNTEyLFxuICogICBmcmFtZVR5cGU6ICdzaWduYWwnLFxuICogICBzYW1wbGVSYXRlOiAwLFxuICogfSk7XG4gKlxuICogY29uc3QgbWluTWF4ID0gbmV3IGxmby5vcGVyYXRvci5NaW5NYXgoKTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QobWluTWF4KTtcbiAqIG1pbk1heC5jb25uZWN0KGxvZ2dlcik7XG4gKiBldmVudEluLnN0YXJ0KClcbiAqXG4gKiAvLyBjcmVhdGUgYSBmcmFtZVxuICogY29uc3Qgc2lnbmFsID0gbmV3IEZsb2F0MzJBcnJheSg1MTIpO1xuICogZm9yIChsZXQgaSA9IDA7IGkgPCA1MTI7IGkrKylcbiAqICAgc2lnbmFsW2ldID0gaSArIDE7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIHNpZ25hbCk7XG4gKiA+IFsxLCA1MTJdO1xuICovXG5jbGFzcyBNaW5NYXggZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gdGhyb3cgZXJyb3JzIGlmIG9wdGlvbnMgYXJlIGdpdmVuXG4gICAgc3VwZXIoe30sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlID0gJ3ZlY3Rvcic7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gMjtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFsnbWluJywgJ21heCddO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBNaW5NYXhgIG9wZXJhdG9yIGluIGBzdGFuZGFsb25lYCBtb2RlIChpLmUuIG91dHNpZGUgb2YgYSBncmFwaCkuXG4gICAqXG4gICAqIEBwYXJhbSB7RmxvYXQzMkFycmF5fEFycmF5fSBkYXRhIC0gSW5wdXQgc2lnbmFsLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBNaW4gYW5kIG1heCB2YWx1ZXMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG1pbk1heCA9IG5ldyBNaW5NYXgoKTtcbiAgICogbWluTWF4LmluaXRTdHJlYW0oeyBmcmFtZVR5cGU6ICdzaWduYWwnLCBmcmFtZVNpemU6IDEwIH0pO1xuICAgKlxuICAgKiBtaW5NYXguaW5wdXRTaWduYWwoWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldKTtcbiAgICogPiBbMCwgNV1cbiAgICovXG4gIGlucHV0U2lnbmFsKGRhdGEpIHtcbiAgICBjb25zdCBvdXREYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGxldCBtaW4gPSArSW5maW5pdHk7XG4gICAgbGV0IG1heCA9IC1JbmZpbml0eTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtpXTtcbiAgICAgIGlmICh2YWx1ZSA8IG1pbikgbWluID0gdmFsdWU7XG4gICAgICBpZiAodmFsdWUgPiBtYXgpIG1heCA9IHZhbHVlO1xuICAgIH1cblxuICAgIG91dERhdGFbMF0gPSBtaW47XG4gICAgb3V0RGF0YVsxXSA9IG1heDtcblxuICAgIHJldHVybiBvdXREYXRhO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUpIHtcbiAgICB0aGlzLmlucHV0U2lnbmFsKGZyYW1lLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1pbk1heDtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBtaW46IDEsXG4gICAgbWF4OiAxZTksXG4gICAgZGVmYXVsdDogMTAsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH1cbiAgfSxcbiAgZmlsbDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgbWluOiAtSW5maW5pdHksXG4gICAgbWF4OiArSW5maW5pdHksXG4gICAgZGVmYXVsdDogMCxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cbi8qKlxuICogQ29tcHV0ZSBhIG1vdmluZyBhdmVyYWdlIG9wZXJhdGlvbiBvbiB0aGUgaW5jb21taW5nIGZyYW1lcyAoYHNjYWxhcmAgb3JcbiAqIGB2ZWN0b3JgIHR5cGUpLiBJZiB0aGUgaW5wdXQgaXMgb2YgdHlwZSB2ZWN0b3IsIHRoZSBtb3ZpbmcgYXZlcmFnZSBpc1xuICogY29tcHV0ZWQgZm9yIGVhY2ggZGltZW5zaW9uIGluIHBhcmFsbGVsLiBJZiB0aGUgc291cmNlIHNhbXBsZSByYXRlIGlzIGRlZmluZWRcbiAqIGZyYW1lIHRpbWUgaXMgc2hpZnRlZCB0byB0aGUgbWlkZGxlIG9mIHRoZSB3aW5kb3cgZGVmaW5lZCBieSB0aGUgb3JkZXIuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMub3JkZXI9MTBdIC0gTnVtYmVyIG9mIHN1Y2Nlc3NpdmUgdmFsdWVzIG9uIHdoaWNoXG4gKiAgdGhlIGF2ZXJhZ2UgaXMgY29tcHV0ZWQuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZmlsbD0wXSAtIFZhbHVlIHRvIGZpbGwgdGhlIHJpbmcgYnVmZmVyIHdpdGggYmVmb3JlXG4gKiAgdGhlIGZpcnN0IGlucHV0IGZyYW1lLlxuICpcbiAqIEB0b2RvIC0gSW1wbGVtZW50IGBwcm9jZXNzU2lnbmFsYCA/XG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY29tbW9uJztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lU2l6ZTogMixcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJ1xuICogfSk7XG4gKlxuICogY29uc3QgbW92aW5nQXZlcmFnZSA9IG5ldyBsZm8ub3BlcmF0b3IuTW92aW5nQXZlcmFnZSh7XG4gKiAgIG9yZGVyOiA1LFxuICogICBmaWxsOiAwXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QobW92aW5nQXZlcmFnZSk7XG4gKiBtb3ZpbmdBdmVyYWdlLmNvbm5lY3QobG9nZ2VyKTtcbiAqXG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIFsxLCAxXSk7XG4gKiA+IFswLjIsIDAuMl1cbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMSwgMV0pO1xuICogPiBbMC40LCAwLjRdXG4gKiBldmVudEluLnByb2Nlc3MobnVsbCwgWzEsIDFdKTtcbiAqID4gWzAuNiwgMC42XVxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIFsxLCAxXSk7XG4gKiA+IFswLjgsIDAuOF1cbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMSwgMV0pO1xuICogPiBbMSwgMV1cbiAqL1xuY2xhc3MgTW92aW5nQXZlcmFnZSBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnN1bSA9IG51bGw7XG4gICAgdGhpcy5yaW5nQnVmZmVyID0gbnVsbDtcbiAgICB0aGlzLnJpbmdJbmRleCA9IDA7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgb25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpIHtcbiAgICBzdXBlci5vblBhcmFtVXBkYXRlKG5hbWUsIHZhbHVlLCBtZXRhcyk7XG5cbiAgICAvLyBAdG9kbyAtIHNob3VsZCBiZSBkb25lIGxhemlseSBpbiBwcm9jZXNzXG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdvcmRlcic6XG4gICAgICAgIHRoaXMucHJvY2Vzc1N0cmVhbVBhcmFtcygpO1xuICAgICAgICB0aGlzLnJlc2V0U3RyZWFtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlsbCc6XG4gICAgICAgIHRoaXMucmVzZXRTdHJlYW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcblxuICAgIHRoaXMucmluZ0J1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkob3JkZXIgKiBmcmFtZVNpemUpO1xuXG4gICAgaWYgKGZyYW1lU2l6ZSA+IDEpXG4gICAgICB0aGlzLnN1bSA9IG5ldyBGbG9hdDMyQXJyYXkoZnJhbWVTaXplKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnN1bSA9IDA7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlc2V0U3RyZWFtKCkge1xuICAgIHN1cGVyLnJlc2V0U3RyZWFtKCk7XG5cbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcbiAgICBjb25zdCBmaWxsID0gdGhpcy5wYXJhbXMuZ2V0KCdmaWxsJyk7XG4gICAgY29uc3QgcmluZ0J1ZmZlciA9IHRoaXMucmluZ0J1ZmZlcjtcbiAgICBjb25zdCByaW5nTGVuZ3RoID0gcmluZ0J1ZmZlci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJpbmdMZW5ndGg7IGkrKylcbiAgICAgIHJpbmdCdWZmZXJbaV0gPSBmaWxsO1xuXG4gICAgY29uc3QgZmlsbFN1bSA9IG9yZGVyICogZmlsbDtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG5cbiAgICBpZiAoZnJhbWVTaXplID4gMSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZVNpemU7IGkrKylcbiAgICAgICAgdGhpcy5zdW1baV0gPSBmaWxsU3VtO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1bSA9IGZpbGxTdW07XG4gICAgfVxuXG4gICAgdGhpcy5yaW5nSW5kZXggPSAwO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTY2FsYXIodmFsdWUpIHtcbiAgICB0aGlzLmZyYW1lLmRhdGFbMF0gPSB0aGlzLmlucHV0U2NhbGFyKGZyYW1lLmRhdGFbMF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYE1vdmluZ0F2ZXJhZ2VgIG9wZXJhdG9yIGluIGBzdGFuZGFsb25lYCBtb2RlIChpLmUuIG91dHNpZGUgb2YgYVxuICAgKiBncmFwaCkgd2l0aCBhIGBzY2FsYXJgIGlucHV0LlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBWYWx1ZSB0byBmZWVkIHRoZSBtb3ZpbmcgYXZlcmFnZSB3aXRoLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gQXZlcmFnZSB2YWx1ZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtb3ZpbmdBdmVyYWdlID0gbmV3IGxmby5vcGVyYXRvci5Nb3ZpbmdBdmVyYWdlKHsgb3JkZXI6IDUgfSk7XG4gICAqIG1vdmluZ0F2ZXJhZ2UuaW5pdFN0cmVhbSh7IGZyYW1lU2l6ZTogMSwgZnJhbWVUeXBlOiAnc2NhbGFyJyB9KTtcbiAgICpcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwLjJcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwLjRcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwLjZcbiAgICovXG4gIGlucHV0U2NhbGFyKHZhbHVlKSB7XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ29yZGVyJyk7XG4gICAgY29uc3QgcmluZ0luZGV4ID0gdGhpcy5yaW5nSW5kZXg7XG4gICAgY29uc3QgcmluZ0J1ZmZlciA9IHRoaXMucmluZ0J1ZmZlcjtcbiAgICBsZXQgc3VtID0gdGhpcy5zdW07XG5cbiAgICBzdW0gLT0gcmluZ0J1ZmZlcltyaW5nSW5kZXhdO1xuICAgIHN1bSArPSB2YWx1ZTtcblxuICAgIHRoaXMuc3VtID0gc3VtO1xuICAgIHRoaXMucmluZ0J1ZmZlcltyaW5nSW5kZXhdID0gdmFsdWU7XG4gICAgdGhpcy5yaW5nSW5kZXggPSAocmluZ0luZGV4ICsgMSkgJSBvcmRlcjtcblxuICAgIHJldHVybiBzdW0gLyBvcmRlcjtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFZlY3RvcihmcmFtZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBNb3ZpbmdBdmVyYWdlYCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGFcbiAgICogZ3JhcGgpIHdpdGggYSBgdmVjdG9yYCBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIC0gVmFsdWVzIHRvIGZlZWQgdGhlIG1vdmluZyBhdmVyYWdlIHdpdGguXG4gICAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gLSBBdmVyYWdlIHZhbHVlIGZvciBlYWNoIGRpbWVuc2lvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtb3ZpbmdBdmVyYWdlID0gbmV3IGxmby5vcGVyYXRvci5Nb3ZpbmdBdmVyYWdlKHsgb3JkZXI6IDUgfSk7XG4gICAqIG1vdmluZ0F2ZXJhZ2UuaW5pdFN0cmVhbSh7IGZyYW1lU2l6ZTogMiwgZnJhbWVUeXBlOiAnc2NhbGFyJyB9KTtcbiAgICpcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dEFycmF5KFsxLCAxXSk7XG4gICAqID4gWzAuMiwgMC4yXVxuICAgKiBtb3ZpbmdBdmVyYWdlLmlucHV0QXJyYXkoWzEsIDFdKTtcbiAgICogPiBbMC40LCAwLjRdXG4gICAqIG1vdmluZ0F2ZXJhZ2UuaW5wdXRBcnJheShbMSwgMV0pO1xuICAgKiA+IFswLjYsIDAuNl1cbiAgICovXG4gIGlucHV0VmVjdG9yKHZhbHVlcykge1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGNvbnN0IG91dEZyYW1lID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCByaW5nSW5kZXggPSB0aGlzLnJpbmdJbmRleDtcbiAgICBjb25zdCByaW5nT2Zmc2V0ID0gcmluZ0luZGV4ICogZnJhbWVTaXplO1xuICAgIGNvbnN0IHJpbmdCdWZmZXIgPSB0aGlzLnJpbmdCdWZmZXI7XG4gICAgY29uc3Qgc3VtID0gdGhpcy5zdW07XG4gICAgY29uc3Qgc2NhbGUgPSAxIC8gb3JkZXI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lU2l6ZTsgaSsrKSB7XG4gICAgICBjb25zdCByaW5nQnVmZmVySW5kZXggPSByaW5nT2Zmc2V0ICsgaTtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgbGV0IGxvY2FsU3VtID0gc3VtW2ldO1xuXG4gICAgICBsb2NhbFN1bSAtPSByaW5nQnVmZmVyW3JpbmdCdWZmZXJJbmRleF07XG4gICAgICBsb2NhbFN1bSArPSB2YWx1ZTtcblxuICAgICAgdGhpcy5zdW1baV0gPSBsb2NhbFN1bTtcbiAgICAgIG91dEZyYW1lW2ldID0gbG9jYWxTdW0gKiBzY2FsZTtcbiAgICAgIHJpbmdCdWZmZXJbcmluZ0J1ZmZlckluZGV4XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMucmluZ0luZGV4ID0gKHJpbmdJbmRleCArIDEpICUgb3JkZXI7XG5cbiAgICByZXR1cm4gb3V0RnJhbWU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgdGhpcy5wcmVwYXJlRnJhbWUoKTtcbiAgICB0aGlzLnByb2Nlc3NGdW5jdGlvbihmcmFtZSk7XG5cbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcbiAgICBsZXQgdGltZSA9IGZyYW1lLnRpbWU7XG4gICAgLy8gc2hpZnQgdGltZSB0byB0YWtlIGFjY291bnQgb2YgdGhlIGFkZGVkIGxhdGVuY3lcbiAgICBpZiAodGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSlcbiAgICAgIHRpbWUgLT0gKDAuNSAqIChvcmRlciAtIDEpIC8gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSk7XG5cbiAgICB0aGlzLmZyYW1lLnRpbWUgPSB0aW1lO1xuICAgIHRoaXMuZnJhbWUubWV0YWRhdGEgPSBmcmFtZS5tZXRhZGF0YTtcblxuICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb3ZpbmdBdmVyYWdlO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIG9yZGVyOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIG1pbjogMSxcbiAgICBtYXg6IDFlOSxcbiAgICBkZWZhdWx0OiA5LFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBmaWxsOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBtaW46IC1JbmZpbml0eSxcbiAgICBtYXg6ICtJbmZpbml0eSxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBDb21wdXRlIGEgbW92aW5nIG1lZGlhbiBvcGVyYXRpb24gb24gdGhlIGluY29tbWluZyBmcmFtZXMgKGBzY2FsYXJgIG9yXG4gKiBgdmVjdG9yYCB0eXBlKS4gSWYgdGhlIGlucHV0IGlzIG9mIHR5cGUgdmVjdG9yLCB0aGUgbW92aW5nIG1lZGlhbiBpc1xuICogY29tcHV0ZWQgZm9yIGVhY2ggZGltZW5zaW9uIGluIHBhcmFsbGVsLiBJZiB0aGUgc291cmNlIHNhbXBsZSByYXRlIGlzIGRlZmluZWRcbiAqIGZyYW1lIHRpbWUgaXMgc2hpZnRlZCB0byB0aGUgbWlkZGxlIG9mIHRoZSB3aW5kb3cgZGVmaW5lZCBieSB0aGUgb3JkZXIuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMub3JkZXI9OV0gLSBOdW1iZXIgb2Ygc3VjY2Vzc2l2ZSB2YWx1ZXMgaW4gd2hpY2hcbiAqICB0aGUgbWVkaWFuIGlzIHNlYXJjaGVkLiBUaGlzIHZhbHVlIG11c3QgYmUgb2RkLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZmlsbD0wXSAtIFZhbHVlIHRvIGZpbGwgdGhlIHJpbmcgYnVmZmVyIHdpdGggYmVmb3JlXG4gKiAgdGhlIGZpcnN0IGlucHV0IGZyYW1lLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKlxuICogQHRvZG8gLSBJbXBsZW1lbnQgYHByb2Nlc3NTaWduYWxgXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY29tbW9uJztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lU2l6ZTogMixcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IG1vdmluZ01lZGlhbiA9IG5ldyBsZm8ub3BlcmF0b3IuTW92aW5nTWVkaWFuKHtcbiAqICAgb3JkZXI6IDUsXG4gKiAgIGZpbGw6IDAsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QobW92aW5nTWVkaWFuKTtcbiAqIG1vdmluZ01lZGlhbi5jb25uZWN0KGxvZ2dlcik7XG4gKlxuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKG51bGwsIFsxLCAxXSk7XG4gKiA+IFswLCAwXVxuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUobnVsbCwgWzIsIDJdKTtcbiAqID4gWzAsIDBdXG4gKiBldmVudEluLnByb2Nlc3NGcmFtZShudWxsLCBbMywgM10pO1xuICogPiBbMSwgMV1cbiAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKG51bGwsIFs0LCA0XSk7XG4gKiA+IFsyLCAyXVxuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUobnVsbCwgWzUsIDVdKTtcbiAqID4gWzMsIDNdXG4gKi9cbmNsYXNzIE1vdmluZ01lZGlhbiBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnJpbmdCdWZmZXIgPSBudWxsO1xuICAgIHRoaXMuc29ydGVyID0gbnVsbDtcbiAgICB0aGlzLnJpbmdJbmRleCA9IDA7XG5cbiAgICB0aGlzLl9lbnN1cmVPZGRPcmRlcigpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9lbnN1cmVPZGRPcmRlcigpIHtcbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpICUgMiA9PT0gMClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSAke29yZGVyfSBmb3IgcGFyYW0gXCJvcmRlclwiIC0gc2hvdWxkIGJlIG9kZGApO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIG9uUGFyYW1VcGRhdGUobmFtZSwgdmFsdWUsIG1ldGFzKSB7XG4gICAgc3VwZXIub25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpO1xuXG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdvcmRlcic6XG4gICAgICAgIHRoaXMuX2Vuc3VyZU9kZE9yZGVyKCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc1N0cmVhbVBhcmFtcygpO1xuICAgICAgICB0aGlzLnJlc2V0U3RyZWFtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlsbCc6XG4gICAgICAgIHRoaXMucmVzZXRTdHJlYW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICAvLyBvdXRUeXBlIGlzIHNpbWlsYXIgdG8gaW5wdXQgdHlwZVxuXG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuXG4gICAgdGhpcy5yaW5nQnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShmcmFtZVNpemUgKiBvcmRlcik7XG4gICAgdGhpcy5zb3J0QnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShmcmFtZVNpemUgKiBvcmRlcik7XG5cbiAgICB0aGlzLm1pbkluZGljZXMgPSBuZXcgVWludDMyQXJyYXkoZnJhbWVTaXplKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVzZXRTdHJlYW0oKSB7XG4gICAgc3VwZXIucmVzZXRTdHJlYW0oKTtcblxuICAgIGNvbnN0IGZpbGwgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZpbGwnKTtcbiAgICBjb25zdCByaW5nQnVmZmVyID0gdGhpcy5yaW5nQnVmZmVyO1xuICAgIGNvbnN0IHJpbmdMZW5ndGggPSByaW5nQnVmZmVyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmluZ0xlbmd0aDsgaSsrKVxuICAgICAgdGhpcy5yaW5nQnVmZmVyW2ldID0gZmlsbDtcblxuICAgIHRoaXMucmluZ0luZGV4ID0gMDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2NhbGFyKGZyYW1lKSB7XG4gICAgdGhpcy5mcmFtZS5kYXRhWzBdID0gdGhpcy5pbnB1dFNjYWxhcihmcmFtZS5kYXRhWzBdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgZm9yIHRoZSB1c2Ugb2YgYSBgTW92aW5nTWVkaWFuYCBvdXRzaWRlIGEgZ3JhcGggKGUuZy4gaW5zaWRlXG4gICAqIGFub3RoZXIgbm9kZSksIGluIHRoaXMgY2FzZSBgcHJvY2Vzc1N0cmVhbVBhcmFtc2AgYW5kIGByZXNldFN0cmVhbWBcbiAgICogc2hvdWxkIGJlIGNhbGxlZCBtYW51YWxseSBvbiB0aGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVmFsdWUgdG8gZmVlZCB0aGUgbW92aW5nIG1lZGlhbiB3aXRoLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gTWVkaWFuIHZhbHVlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gICAqXG4gICAqIGNvbnN0IG1vdmluZ01lZGlhbiA9IG5ldyBNb3ZpbmdNZWRpYW4oeyBvcmRlcjogNSB9KTtcbiAgICogbW92aW5nTWVkaWFuLmluaXRTdHJlYW0oeyBmcmFtZVNpemU6IDEsIGZyYW1lVHlwZTogJ3NjYWxhcicgfSk7XG4gICAqXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcigyKTtcbiAgICogPiAwXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcigzKTtcbiAgICogPiAxXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcig0KTtcbiAgICogPiAyXG4gICAqL1xuICBpbnB1dFNjYWxhcih2YWx1ZSkge1xuICAgIGNvbnN0IHJpbmdJbmRleCA9IHRoaXMucmluZ0luZGV4O1xuICAgIGNvbnN0IHJpbmdCdWZmZXIgPSB0aGlzLnJpbmdCdWZmZXI7XG4gICAgY29uc3Qgc29ydEJ1ZmZlciA9IHRoaXMuc29ydEJ1ZmZlcjtcbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcbiAgICBjb25zdCBtZWRpYW5JbmRleCA9IChvcmRlciAtIDEpIC8gMjtcbiAgICBsZXQgc3RhcnRJbmRleCA9IDA7XG5cbiAgICByaW5nQnVmZmVyW3JpbmdJbmRleF0gPSB2YWx1ZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG1lZGlhbkluZGV4OyBpKyspIHtcbiAgICAgIGxldCBtaW4gPSArSW5maW5pdHk7XG4gICAgICBsZXQgbWluSW5kZXggPSBudWxsO1xuXG4gICAgICBmb3IgKGxldCBqID0gc3RhcnRJbmRleDsgaiA8IG9yZGVyOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgICAgc29ydEJ1ZmZlcltqXSA9IHJpbmdCdWZmZXJbal07XG5cbiAgICAgICAgaWYgKHNvcnRCdWZmZXJbal0gPCBtaW4pIHtcbiAgICAgICAgICBtaW4gPSBzb3J0QnVmZmVyW2pdO1xuICAgICAgICAgIG1pbkluZGV4ID0gajtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzd2FwIG1pbkluZGV4IGFuZCBzdGFydEluZGV4XG4gICAgICBjb25zdCBjYWNoZSA9IHNvcnRCdWZmZXJbc3RhcnRJbmRleF07XG4gICAgICBzb3J0QnVmZmVyW3N0YXJ0SW5kZXhdID0gc29ydEJ1ZmZlclttaW5JbmRleF07XG4gICAgICBzb3J0QnVmZmVyW21pbkluZGV4XSA9IGNhY2hlO1xuXG4gICAgICBzdGFydEluZGV4ICs9IDE7XG4gICAgfVxuXG4gICAgY29uc3QgbWVkaWFuID0gc29ydEJ1ZmZlclttZWRpYW5JbmRleF07XG4gICAgdGhpcy5yaW5nSW5kZXggPSAocmluZ0luZGV4ICsgMSkgJSBvcmRlcjtcblxuICAgIHJldHVybiBtZWRpYW47XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcihmcmFtZSkge1xuICAgIHRoaXMuaW5wdXRWZWN0b3IoZnJhbWUuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciB0aGUgdXNlIG9mIGEgYE1vdmluZ01lZGlhbmAgb3V0c2lkZSBhIGdyYXBoIChlLmcuIGluc2lkZVxuICAgKiBhbm90aGVyIG5vZGUpLCBpbiB0aGlzIGNhc2UgYHByb2Nlc3NTdHJlYW1QYXJhbXNgIGFuZCBgcmVzZXRTdHJlYW1gXG4gICAqIHNob3VsZCBiZSBjYWxsZWQgbWFudWFsbHkgb24gdGhlIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyAtIFZhbHVlcyB0byBmZWVkIHRoZSBtb3ZpbmcgbWVkaWFuIHdpdGguXG4gICAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gLSBNZWRpYW4gdmFsdWVzIGZvciBlYWNoIGRpbWVuc2lvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtb3ZpbmdNZWRpYW4gPSBuZXcgTW92aW5nTWVkaWFuKHsgb3JkZXI6IDMsIGZpbGw6IDAgfSk7XG4gICAqIG1vdmluZ01lZGlhbi5pbml0U3RyZWFtKHsgZnJhbWVTaXplOiAzLCBmcmFtZVR5cGU6ICd2ZWN0b3InIH0pO1xuICAgKlxuICAgKiBtb3ZpbmdNZWRpYW4uaW5wdXRBcnJheShbMSwgMV0pO1xuICAgKiA+IFswLCAwXVxuICAgKiBtb3ZpbmdNZWRpYW4uaW5wdXRBcnJheShbMiwgMl0pO1xuICAgKiA+IFsxLCAxXVxuICAgKiBtb3ZpbmdNZWRpYW4uaW5wdXRBcnJheShbMywgM10pO1xuICAgKiA+IFsyLCAyXVxuICAgKi9cbiAgaW5wdXRWZWN0b3IodmFsdWVzKSB7XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ29yZGVyJyk7XG4gICAgY29uc3QgcmluZ0J1ZmZlciA9IHRoaXMucmluZ0J1ZmZlcjtcbiAgICBjb25zdCByaW5nSW5kZXggPSB0aGlzLnJpbmdJbmRleDtcbiAgICBjb25zdCBzb3J0QnVmZmVyID0gdGhpcy5zb3J0QnVmZmVyO1xuICAgIGNvbnN0IG91dEZyYW1lID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IG1pbkluZGljZXMgPSB0aGlzLm1pbkluZGljZXM7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IG1lZGlhbkluZGV4ID0gTWF0aC5mbG9vcihvcmRlciAvIDIpO1xuICAgIGxldCBzdGFydEluZGV4ID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG1lZGlhbkluZGV4OyBpKyspIHtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmcmFtZVNpemU7IGorKykge1xuICAgICAgICBvdXRGcmFtZVtqXSA9ICtJbmZpbml0eTtcbiAgICAgICAgbWluSW5kaWNlc1tqXSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgayA9IHN0YXJ0SW5kZXg7IGsgPCBvcmRlcjsgaysrKSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBrICogZnJhbWVTaXplICsgajtcblxuICAgICAgICAgIC8vIHVwZGF0ZSByaW5nIGJ1ZmZlciBjb3JyZXNwb25kaW5nIHRvIGN1cnJlbnRcbiAgICAgICAgICBpZiAoayA9PT0gcmluZ0luZGV4ICYmIGkgPT09IDApXG4gICAgICAgICAgICByaW5nQnVmZmVyW2luZGV4XSA9IHZhbHVlc1tqXTtcblxuICAgICAgICAgIC8vIGNvcHkgdmFsdWUgaW4gc29ydCBidWZmZXIgb24gZmlyc3QgcGFzc1xuICAgICAgICAgIGlmIChpID09PSAwKcKgXG4gICAgICAgICAgICBzb3J0QnVmZmVyW2luZGV4XSA9IHJpbmdCdWZmZXJbaW5kZXhdO1xuXG4gICAgICAgICAgLy8gZmluZCBtaW5pdW0gaW4gdGhlIHJlbWFpbmluZyBhcnJheVxuICAgICAgICAgIGlmIChzb3J0QnVmZmVyW2luZGV4XSA8IG91dEZyYW1lW2pdKSB7XG4gICAgICAgICAgICBvdXRGcmFtZVtqXSA9IHNvcnRCdWZmZXJbaW5kZXhdO1xuICAgICAgICAgICAgbWluSW5kaWNlc1tqXSA9IGluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN3YXAgbWluaW11bSBhbmQgY3VyZW50IGluZGV4XG4gICAgICAgIGNvbnN0IHN3YXBJbmRleCA9IHN0YXJ0SW5kZXggKiBmcmFtZVNpemUgKyBqO1xuICAgICAgICBjb25zdCB2ID0gc29ydEJ1ZmZlcltzd2FwSW5kZXhdO1xuICAgICAgICBzb3J0QnVmZmVyW3N3YXBJbmRleF0gPSBzb3J0QnVmZmVyW21pbkluZGljZXNbal1dO1xuICAgICAgICBzb3J0QnVmZmVyW21pbkluZGljZXNbal1dID0gdjtcblxuICAgICAgICAvLyBzdG9yZSB0aGlzIG1pbmltdW0gdmFsdWUgYXMgY3VycmVudCByZXN1bHRcbiAgICAgICAgb3V0RnJhbWVbal0gPSBzb3J0QnVmZmVyW3N3YXBJbmRleF07XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0SW5kZXggKz0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnJpbmdJbmRleCA9IChyaW5nSW5kZXggKyAxKSAlIG9yZGVyO1xuXG4gICAgcmV0dXJuIHRoaXMuZnJhbWUuZGF0YTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICB0aGlzLnByZXByb2Nlc3NGcmFtZSgpO1xuICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcblxuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGxldCB0aW1lID0gZnJhbWUudGltZTtcbiAgICAvLyBzaGlmdCB0aW1lIHRvIHRha2UgYWNjb3VudCBvZiB0aGUgYWRkZWQgbGF0ZW5jeVxuICAgIGlmICh0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlKVxuICAgICAgdGltZSAtPSAoMC41ICogKG9yZGVyIC0gMSkgLyB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlKTtcblxuICAgIHRoaXMuZnJhbWUudGltZSA9IHRpbWU7XG4gICAgdGhpcy5mcmFtZS5tZXRhZGF0YSA9IGZyYW1lLm1ldGFkYXRhO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVGcmFtZSh0aW1lLCB0aGlzLm91dEZyYW1lLCBtZXRhZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW92aW5nTWVkaWFuO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHN0YXRlOiB7XG4gICAgdHlwZTogJ2VudW0nLFxuICAgIGRlZmF1bHQ6ICdvbicsXG4gICAgbGlzdDogWydvbicsICdvZmYnXSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cbi8qKlxuICogVGhlIE9uT2ZmIG9wZXJhdG9yIGFsbG93cyB0byBzdG9wIHRoZSBwcm9wYWdhdGlvbiBvZiB0aGUgc3RyZWFtIGluIGFcbiAqIHN1YmdyYXBoLiBXaGVuIFwib25cIiwgZnJhbWVzIGFyZSBwcm9wYWdhdGVkLCB3aGVuIFwib2ZmXCIgdGhlIHByb3BhZ2F0aW9uIGlzXG4gKiBzdG9wcGVkLlxuICpcbiAqIFRoZSBgc3RyZWFtUGFyYW1zYCBwcm9wYWdhdGlvbiBpcyBuZXZlciBieXBhc3NlZCBzbyB0aGUgc3Vic2VxdWVudCBzdWJncmFwaFxuICogaXMgYWx3YXlzIHJlYWR5IGZvciBpbmNvbW1pbmcgZnJhbWVzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc3RhdGU9J29uJ10gLSBEZWZhdWx0IHN0YXRlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NvbW1vbic7XG4gKlxuICogY29uc3QgZnJhbWVzID0gW1xuICogICB7IHRpbWU6IDAsIGRhdGE6IFsxLCAyXSB9LFxuICogICB7IHRpbWU6IDEsIGRhdGE6IFszLCA0XSB9LFxuICogICB7IHRpbWU6IDIsIGRhdGE6IFs1LCA2XSB9LFxuICogXTtcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IEV2ZW50SW4oe1xuICogICBmcmFtZVNpemU6IDIsXG4gKiAgIGZyYW1lUmF0ZTogMCxcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IG9uT2ZmID0gbmV3IE9uT2ZmKCk7XG4gKlxuICogY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KG9uT2ZmKTtcbiAqIG9uT2ZmLmNvbm5lY3QobG9nZ2VyKTtcbiAqXG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUoZnJhbWVzWzBdKTtcbiAqID4gWzAsIDFdXG4gKlxuICogLy8gYnlwYXNzIHN1YmdyYXBoXG4gKiBvbk9mZi5zZXRTdGF0ZSgnb2ZmJyk7XG4gKiBldmVudEluLnByb2Nlc3NGcmFtZShmcmFtZXNbMV0pO1xuICpcbiAqIC8vIHJlLW9wZW4gc3ViZ3JhcGhcbiAqIG9uT2ZmLnNldFN0YXRlKCdvbicpO1xuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUoZnJhbWVzWzJdKTtcbiAqID4gWzUsIDZdXG4gKi9cbmNsYXNzIE9uT2ZmIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnBhcmFtcy5nZXQoJ3N0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzdGF0ZSBvZiB0aGUgYE9uT2ZmYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0YXRlIC0gTmV3IHN0YXRlIG9mIHRoZSBvcGVyYXRvciAoYG9uYCBvciBgb2ZmYClcbiAgICovXG4gIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKGRlZmluaXRpb25zLnN0YXRlLmxpc3QuaW5kZXhPZihzdGF0ZSkgPT09IC0xKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN3aXRjaCBzdGF0ZSB2YWx1ZSBcIiR7c3RhdGV9XCIgW3ZhbGlkIHZhbHVlczogXCJvblwiL1wib2ZmXCJdYCk7XG5cbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICAvLyBkZWZpbmUgYWxsIHBvc3NpYmxlIHN0cmVhbSBBUElcbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTY2FsYXIoKSB7fVxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcigpIHt9XG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKCkge31cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdvbicpIHtcbiAgICAgIHRoaXMucHJlcGFyZUZyYW1lKCk7XG5cbiAgICAgIHRoaXMuZnJhbWUudGltZSA9IGZyYW1lLnRpbWU7XG4gICAgICB0aGlzLmZyYW1lLm1ldGFkYXRhID0gZnJhbWUubWV0YWRhdGE7XG4gICAgICB0aGlzLmZyYW1lLmRhdGEgPSBmcmFtZS5kYXRhO1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZUZyYW1lKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9uT2ZmO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3Qgc3FydCA9IE1hdGguc3FydDtcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHBvd2VyOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBDb21wdXRlIHRoZSBSb290IE1lYW4gU3F1YXJlIG9mIGEgYHNpZ25hbGAuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnBvd2VyPWZhbHNlXSAtIElmIGB0cnVlYCByZW1vdmUgdGhlIFwiUlwiIG9mIHRoZVxuICogIFwiUm1zXCIgYW5kIHJldHVybiB0aGUgc3F1YXJlZCByZXN1bHQgKGkuZS4gcG93ZXIpLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogLy8gYXNzdW1pbmcgc29tZSBgQXVkaW9CdWZmZXJgXG4gKiBjb25zdCBhdWRpb0luQnVmZmVyID0gbmV3IGxmby5zb3VyY2UuQXVkaW9JbkJ1ZmZlcih7XG4gKiAgIGF1ZGlvQnVmZmVyOiBhdWRpb0J1ZmZlcixcbiAqICAgZnJhbWVTaXplOiA1MTIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBybXMgPSBuZXcgbGZvLm9wZXJhdG9yLlJtcygpO1xuICogY29uc3QgbG9nZ2VyID0gbmV3IGxmby5zaW5rLkxvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogYXVkaW9JbkJ1ZmZlci5jb25uZWN0KHJtcyk7XG4gKiBybXMuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIGF1ZGlvSW5CdWZmZXIuc3RhcnQoKTtcbiAqL1xuY2xhc3MgUm1zIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSAxO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICdzY2FsYXInO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uID0gWydybXMnXTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciB0aGUgdXNlIG9mIGEgYFJtc2Agb3V0c2lkZSBhIGdyYXBoIChlLmcuIGluc2lkZVxuICAgKiBhbm90aGVyIG5vZGUpLiBSZXR1cm4gdGhlIHJtcyBvZiB0aGUgZ2l2ZW4gc2lnbmFsIGJsb2NrLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc2lnbmFsIC0gU2lnbmFsIGJsb2NrIHRvIGJlIGNvbXB1dGVkLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gcm1zIG9mIHRoZSBpbnB1dCBzaWduYWwuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAgICpcbiAgICogY29uc3Qgcm1zID0gbmV3IGxmby5vcGVyYXRvci5SbXMoKTtcbiAgICogcm1zLmluaXRTdHJlYW0oeyBmcmFtZVR5cGU6ICdzaWduYWwnLCBmcmFtZVNpemU6IDEwMDAgfSk7XG4gICAqXG4gICAqIGNvbnN0IHJlc3VsdHMgPSBybXMuaW5wdXRTaWduYWwoWy4uLnZhbHVlc10pO1xuICAgKi9cbiAgaW5wdXRTaWduYWwoc2lnbmFsKSB7XG4gICAgY29uc3QgcG93ZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ3Bvd2VyJyk7XG4gICAgY29uc3QgbGVuZ3RoID0gc2lnbmFsLmxlbmd0aDtcbiAgICBsZXQgcm1zID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgICBybXMgKz0gKHNpZ25hbFtpXSAqIHNpZ25hbFtpXSk7XG5cbiAgICBybXMgPSBybXMgLyBsZW5ndGg7XG5cbiAgICBpZiAoIXBvd2VyKVxuICAgICAgcm1zID0gc3FydChybXMpO1xuXG4gICAgcmV0dXJuIHJtcztcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5mcmFtZS5kYXRhWzBdID0gdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSbXM7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuaW1wb3J0IE1vdmluZ0F2ZXJhZ2UgZnJvbSAnLi9Nb3ZpbmdBdmVyYWdlJztcblxuY29uc3QgbWluID0gTWF0aC5taW47XG5jb25zdCBtYXggPSBNYXRoLm1heDtcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGxvZ0lucHV0OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICB9LFxuICBtaW5JbnB1dDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMC4wMDAwMDAwMDAwMDEsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIGZpbHRlck9yZGVyOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIHRocmVzaG9sZDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMyxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgb2ZmVGhyZXNob2xkOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAtSW5maW5pdHksXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIG1pbkludGVyOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLjA1MCxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgbWF4RHVyYXRpb246IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IEluZmluaXR5LFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICB9LFxufVxuXG4vKipcbiAqIENyZWF0ZSBzZWdtZW50cyBiYXNlZCBvbiBhdHRhY2tzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmxvZ0lucHV0PWZhbHNlXSAtIEFwcGx5IGxvZyBvbiB0aGUgaW5wdXQuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluSW5wdXQ9MC4wMDAwMDAwMDAwMDFdIC0gTWluaW11bSB2YWx1ZSB0byB1c2UgYXNcbiAqICBpbnB1dC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5maWx0ZXJPcmRlcj01XSAtIE9yZGVyIG9mIHRoZSBpbnRlcm5hbGx5IHVzZWQgbW92aW5nXG4gKiAgYXZlcmFnZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGQ9M10gLSBUaHJlc2hvbGQgdGhhdCB0cmlnZ2VycyBhIHNlZ21lbnRcbiAqICBzdGFydC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5vZmZUaHJlc2hvbGQ9LUluZmluaXR5XSAtIFRocmVzaG9sZCB0aGF0IHRyaWdnZXJzXG4gKiAgYSBzZWdtZW50IGVuZC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW5JbnRlcj0wLjA1MF0gLSBNaW5pbXVtIGRlbGF5IGJldHdlZW4gdHdvIHNlbWdlbnRzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heER1cmF0aW9uPUluZmluaXR5XSAtIE1heGltdW0gZHVyYXRpb24gb2YgYSBzZWdtZW50LlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogLy8gYXNzdW1pbmcgYSBzdHJlYW0gZnJvbSB0aGUgbWljcm9waG9uZVxuICogY29uc3Qgc291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gKlxuICogY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gKiAgIHNvdXJjZU5vZGU6IHNvdXJjZSxcbiAqICAgYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBzbGljZXIgPSBuZXcgbGZvLm9wZXJhdG9yLlNsaWNlcih7XG4gKiAgIGZyYW1lU2l6ZTogZnJhbWVTaXplLFxuICogICBob3BTaXplOiBob3BTaXplLFxuICogICBjZW50ZXJlZFRpbWVUYWdzOiB0cnVlXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBwb3dlciA9IG5ldyBsZm8ub3BlcmF0b3IuUk1TKHtcbiAqICAgcG93ZXI6IHRydWUsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBzZWdtZW50ZXIgPSBuZXcgbGZvLm9wZXJhdG9yLlNlZ21lbnRlcih7XG4gKiAgIGxvZ0lucHV0OiB0cnVlLFxuICogICBmaWx0ZXJPcmRlcjogNSxcbiAqICAgdGhyZXNob2xkOiAzLFxuICogICBvZmZUaHJlc2hvbGQ6IC1JbmZpbml0eSxcbiAqICAgbWluSW50ZXI6IDAuMDUwLFxuICogICBtYXhEdXJhdGlvbjogMC4wNTAsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgdGltZTogdHJ1ZSB9KTtcbiAqXG4gKiBhdWRpb0luTm9kZS5jb25uZWN0KHNsaWNlcik7XG4gKiBzbGljZXIuY29ubmVjdChwb3dlcik7XG4gKiBwb3dlci5jb25uZWN0KHNlZ21lbnRlcik7XG4gKiBzZWdtZW50ZXIuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIGF1ZGlvSW5Ob2RlLnN0YXJ0KCk7XG4gKi9cbmNsYXNzIFNlZ21lbnRlciBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5pbnNpZGVTZWdtZW50ID0gZmFsc2U7XG4gICAgdGhpcy5vbnNldFRpbWUgPSAtSW5maW5pdHk7XG5cbiAgICAvLyBzdGF0c1xuICAgIHRoaXMubWluID0gSW5maW5pdHk7XG4gICAgdGhpcy5tYXggPSAtSW5maW5pdHk7XG4gICAgdGhpcy5zdW0gPSAwO1xuICAgIHRoaXMuc3VtT2ZTcXVhcmVzID0gMDtcbiAgICB0aGlzLmNvdW50ID0gMDtcblxuICAgIGNvbnN0IG1pbklucHV0ID0gdGhpcy5wYXJhbXMuZ2V0KCdtaW5JbnB1dCcpO1xuICAgIGxldCBmaWxsID0gbWluSW5wdXQ7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCdsb2dJbnB1dCcpICYmIG1pbklucHV0ID4gMClcbiAgICAgIGZpbGwgPSBNYXRoLmxvZyhtaW5JbnB1dCk7XG5cbiAgICB0aGlzLm1vdmluZ0F2ZXJhZ2UgPSBuZXcgTW92aW5nQXZlcmFnZSh7XG4gICAgICBvcmRlcjogdGhpcy5wYXJhbXMuZ2V0KCdmaWx0ZXJPcmRlcicpLFxuICAgICAgZmlsbDogZmlsbCxcbiAgICB9KTtcblxuICAgIHRoaXMubGFzdE12YXZyZyA9IGZpbGw7XG4gIH1cblxuICBvblBhcmFtVXBkYXRlKG5hbWUsIHZhbHVlLCBtZXRhcykge1xuICAgIHN1cGVyLm9uUGFyYW1VcGRhdGUobmFtZSwgdmFsdWUsIG1ldGFzKTtcblxuICAgIGlmIChuYW1lID09PSAnZmlsdGVyT3JkZXInKVxuICAgICAgdGhpcy5tb3ZpbmdBdmVyYWdlLnBhcmFtcy5zZXQoJ29yZGVyJywgdmFsdWUpO1xuICB9XG5cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlID0gJ3ZlY3Rvcic7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gNTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVJhdGUgPSAwO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uID0gWydkdXJhdGlvbicsICdtaW4nLCAnbWF4JywgJ21lYW4nLCAnc3RkZGV2J107XG5cblxuICAgIHRoaXMubW92aW5nQXZlcmFnZS5pbml0U3RyZWFtKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIHJlc2V0U3RyZWFtKCkge1xuICAgIHN1cGVyLnJlc2V0U3RyZWFtKCk7XG4gICAgdGhpcy5tb3ZpbmdBdmVyYWdlLnJlc2V0U3RyZWFtKCk7XG4gICAgdGhpcy5yZXNldFNlZ21lbnQoKTtcbiAgfVxuXG4gIGZpbmFsaXplU3RyZWFtKGVuZFRpbWUpIHtcbiAgICBpZiAodGhpcy5pbnNpZGVTZWdtZW50KVxuICAgICAgdGhpcy5vdXRwdXRTZWdtZW50KGVuZFRpbWUpO1xuXG4gICAgc3VwZXIuZmluYWxpemVTdHJlYW0oZW5kVGltZSk7XG4gIH1cblxuICByZXNldFNlZ21lbnQoKSB7XG4gICAgdGhpcy5pbnNpZGVTZWdtZW50ID0gZmFsc2U7XG4gICAgdGhpcy5vbnNldFRpbWUgPSAtSW5maW5pdHk7XG4gICAgLy8gc3RhdHNcbiAgICB0aGlzLm1pbiA9IEluZmluaXR5O1xuICAgIHRoaXMubWF4ID0gLUluZmluaXR5O1xuICAgIHRoaXMuc3VtID0gMDtcbiAgICB0aGlzLnN1bU9mU3F1YXJlcyA9IDA7XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gIH1cblxuICBvdXRwdXRTZWdtZW50KGVuZFRpbWUpIHtcbiAgICBjb25zdCBvdXREYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIG91dERhdGFbMF0gPSBlbmRUaW1lIC0gdGhpcy5vbnNldFRpbWU7XG4gICAgb3V0RGF0YVsxXSA9IHRoaXMubWluO1xuICAgIG91dERhdGFbMl0gPSB0aGlzLm1heDtcblxuICAgIGNvbnN0IG5vcm0gPSAxIC8gdGhpcy5jb3VudDtcbiAgICBjb25zdCBtZWFuID0gdGhpcy5zdW0gKiBub3JtO1xuICAgIGNvbnN0IG1lYW5PZlNxdWFyZSA9IHRoaXMuc3VtT2ZTcXVhcmVzICogbm9ybTtcbiAgICBjb25zdCBzcXVhcmVPZm1lYW4gPSBtZWFuICogbWVhbjtcblxuICAgIG91dERhdGFbM10gPSBtZWFuO1xuICAgIG91dERhdGFbNF0gPSAwO1xuXG4gICAgaWYgKG1lYW5PZlNxdWFyZSA+IHNxdWFyZU9mbWVhbilcbiAgICAgIG91dERhdGFbNF0gPSBNYXRoLnNxcnQobWVhbk9mU3F1YXJlIC0gc3F1YXJlT2ZtZWFuKTtcblxuICAgIHRoaXMuZnJhbWUudGltZSA9IHRoaXMub25zZXRUaW1lO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVGcmFtZSgpO1xuICB9XG5cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIGNvbnN0IGxvZ0lucHV0ID0gdGhpcy5wYXJhbXMuZ2V0KCdsb2dJbnB1dCcpO1xuICAgIGNvbnN0IG1pbklucHV0ID0gdGhpcy5wYXJhbXMuZ2V0KCdtaW5JbnB1dCcpO1xuICAgIGNvbnN0IHRocmVzaG9sZCA9IHRoaXMucGFyYW1zLmdldCgndGhyZXNob2xkJyk7XG4gICAgY29uc3QgbWluSW50ZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ21pbkludGVyJyk7XG4gICAgY29uc3QgbWF4RHVyYXRpb24gPSB0aGlzLnBhcmFtcy5nZXQoJ21heER1cmF0aW9uJyk7XG4gICAgY29uc3Qgb2ZmVGhyZXNob2xkID0gdGhpcy5wYXJhbXMuZ2V0KCdvZmZUaHJlc2hvbGQnKTtcbiAgICBjb25zdCByYXdWYWx1ZSA9IGZyYW1lLmRhdGFbMF07XG4gICAgY29uc3QgdGltZSA9IGZyYW1lLnRpbWU7XG4gICAgbGV0IHZhbHVlID0gTWF0aC5tYXgocmF3VmFsdWUsIG1pbklucHV0KTtcblxuICAgIGlmIChsb2dJbnB1dClcbiAgICAgIHZhbHVlID0gTWF0aC5sb2codmFsdWUpO1xuXG4gICAgY29uc3QgZGlmZiA9IHZhbHVlIC0gdGhpcy5sYXN0TXZhdnJnO1xuICAgIHRoaXMubGFzdE12YXZyZyA9IHRoaXMubW92aW5nQXZlcmFnZS5pbnB1dFNjYWxhcih2YWx1ZSk7XG5cbiAgICAvLyB1cGRhdGUgZnJhbWUgbWV0YWRhdGFcbiAgICB0aGlzLmZyYW1lLm1ldGFkYXRhID0gZnJhbWUubWV0YWRhdGE7XG5cbiAgICBpZiAoZGlmZiA+IHRocmVzaG9sZCAmJiB0aW1lIC0gdGhpcy5vbnNldFRpbWUgPiBtaW5JbnRlcikge1xuICAgICAgaWYgKHRoaXMuaW5zaWRlU2VnbWVudClcbiAgICAgICAgdGhpcy5vdXRwdXRTZWdtZW50KHRpbWUpO1xuXG4gICAgICAvLyBzdGFydCBzZWdtZW50XG4gICAgICB0aGlzLmluc2lkZVNlZ21lbnQgPSB0cnVlO1xuICAgICAgdGhpcy5vbnNldFRpbWUgPSB0aW1lO1xuICAgICAgdGhpcy5tYXggPSAtSW5maW5pdHk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5zaWRlU2VnbWVudCkge1xuICAgICAgdGhpcy5taW4gPSBtaW4odGhpcy5taW4sIHJhd1ZhbHVlKTtcbiAgICAgIHRoaXMubWF4ID0gbWF4KHRoaXMubWF4LCByYXdWYWx1ZSk7XG4gICAgICB0aGlzLnN1bSArPSByYXdWYWx1ZTtcbiAgICAgIHRoaXMuc3VtT2ZTcXVhcmVzICs9IHJhd1ZhbHVlICogcmF3VmFsdWU7XG4gICAgICB0aGlzLmNvdW50Kys7XG5cbiAgICAgIGlmICh0aW1lIC0gdGhpcy5vbnNldFRpbWUgPj0gbWF4RHVyYXRpb24gfHwgdmFsdWUgPD0gb2ZmVGhyZXNob2xkKSB7XG4gICAgICAgIHRoaXMub3V0cHV0U2VnbWVudCh0aW1lKTtcbiAgICAgICAgdGhpcy5pbnNpZGVTZWdtZW50ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgdGhpcy5wcmVwYXJlRnJhbWUoKTtcbiAgICB0aGlzLnByb2Nlc3NGdW5jdGlvbihmcmFtZSk7XG4gICAgLy8gZG8gbm90IHByb3BhZ2F0ZSBoZXJlIGFzIHRoZSBmcmFtZVJhdGUgaXMgbm93IHplcm9cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWdtZW50ZXI7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgaW5kZXg6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMCxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBpbmRpY2VzOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9XG59O1xuXG4vKipcbiAqIFNlbGVjdCBvbmUgb3Igc2V2ZXJhbCBpbmRpY2VzIGZyb20gYSBgdmVjdG9yYCBpbnB1dC4gSWYgb25seSBvbmUgaW5kZXggaXNcbiAqIHNlbGVjdGVkLCB0aGUgb3V0cHV0IHdpbGwgYmUgb2YgdHlwZSBgc2NhbGFyYCwgb3RoZXJ3aXNlIHRoZSBvdXRwdXQgd2lsbFxuICogYmUgYSB2ZWN0b3IgY29udGFpbmluZyB0aGUgc2VsZWN0ZWQgaW5kaWNlcy5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZXMuXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5pbmRleCAtIEluZGV4IHRvIHNlbGVjdCBmcm9tIHRoZSBpbnB1dCBmcmFtZS5cbiAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gb3B0aW9ucy5pbmRpY2VzIC0gSW5kaWNlcyB0byBzZWxlY3QgZnJvbSB0aGUgaW5wdXRcbiAqICBmcmFtZSwgaWYgZGVmaW5lZCwgdGFrZSBwcmVjZWRhbmNlIG92ZXIgYG9wdGlvbi5pbmRleGAuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY29tbW9uJztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3ZlY3RvcicsXG4gKiAgIGZyYW1lU2l6ZTogMyxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNlbGVjdCA9IG5ldyBsZm8ub3BlcmF0b3IuU2VsZWN0KHtcbiAqICAgaW5kZXg6IDEsXG4gKiB9KTtcbiAqXG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKiBldmVudEluLnByb2Nlc3MoMCwgWzAsIDEsIDJdKTtcbiAqID4gMVxuICogZXZlbnRJbi5wcm9jZXNzKDAsIFszLCA0LCA1XSk7XG4gKiA+IDRcbiAqL1xuY2xhc3MgU2VsZWN0IGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMucGFyYW1zLmdldCgnaW5kZXgnKTtcbiAgICBjb25zdCBpbmRpY2VzID0gdGhpcy5wYXJhbXMuZ2V0KCdpbmRpY2VzJyk7XG5cbiAgICBsZXQgbWF4ID0gKGluZGljZXMgIT09IG51bGwpID8gIE1hdGgubWF4LmFwcGx5KG51bGwsIGluZGljZXMpIDogaW5kZXg7XG5cbiAgICBpZiAobWF4ID49IHByZXZTdHJlYW1QYXJhbXMuZnJhbWVTaXplKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNlbGVjdCBpbmRleCBcIiR7bWF4fVwiYCk7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAoaW5kaWNlcyAhPT0gbnVsbCkgPyAndmVjdG9yJyA6ICdzY2FsYXInO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IChpbmRpY2VzICE9PSBudWxsKSA/IGluZGljZXMubGVuZ3RoIDogMTtcblxuICAgIHRoaXMuc2VsZWN0ID0gKGluZGljZXMgIT09IG51bGwpID8gaW5kaWNlcyA6IFtpbmRleF07XG5cbiAgICAvLyBzdGVhbCBkZXNjcmlwdGlvbigpIGZyb20gcGFyZW50XG4gICAgaWYgKHByZXZTdHJlYW1QYXJhbXMuZGVzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc2VsZWN0LmZvckVhY2goKHZhbCwgaW5kZXgpID0+IHtcbiAgICAgICAgdGhpcy5zdHJlYW1QYXJhbXMuZGVzY3JpcHRpb25baW5kZXhdID0gcHJldlN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvblt2YWxdO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lKSB7XG4gICAgY29uc3QgZGF0YSA9IGZyYW1lLmRhdGE7XG4gICAgY29uc3Qgb3V0RGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCBzZWxlY3QgPSB0aGlzLnNlbGVjdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lmxlbmd0aDsgaSsrKVxuICAgICAgb3V0RGF0YVtpXSA9IGRhdGFbc2VsZWN0W2ldXTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Q7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgZnJhbWVTaXplOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDUxMixcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBob3BTaXplOiB7IC8vIHNob3VsZCBiZSBudWxsYWJsZVxuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIGNlbnRlcmVkVGltZVRhZ3M6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gIH1cbn1cblxuLyoqXG4gKiBDaGFuZ2UgdGhlIGBmcmFtZVNpemVgIGFuZCBgaG9wU2l6ZWAgb2YgYSBgc2lnbmFsYCBpbnB1dCBhY2NvcmRpbmcgdG9cbiAqIHRoZSBnaXZlbiBvcHRpb25zLlxuICogVGhpcyBvcGVyYXRvciB1cGRhdGVzIHRoZSBzdHJlYW0gcGFyYW1ldGVycyBhY2NvcmRpbmcgdG8gaXRzIGNvbmZpZ3VyYXRpb24uXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5mcmFtZVNpemU9NTEyXSAtIEZyYW1lIHNpemUgb2YgdGhlIG91dHB1dCBzaWduYWwuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaG9wU2l6ZT1udWxsXSAtIE51bWJlciBvZiBzYW1wbGVzIGJldHdlZW4gdHdvXG4gKiAgY29uc2VjdXRpdmUgZnJhbWVzLiBJZiBudWxsLCBgaG9wU2l6ZWAgaXMgc2V0IHRvIGBmcmFtZVNpemVgLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jZW50ZXJlZFRpbWVUYWdzXSAtIE1vdmUgdGhlIHRpbWUgdGFnIHRvIHRoZSBtaWRkbGVcbiAqICBvZiB0aGUgZnJhbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY29tbW9uJztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3NpZ25hbCcsXG4gKiAgIGZyYW1lU2l6ZTogMTAsXG4gKiAgIHNhbXBsZVJhdGU6IDIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBzbGljZXIgPSBuZXcgbGZvLm9wZXJhdG9yLlNsaWNlcih7XG4gKiAgIGZyYW1lU2l6ZTogNCxcbiAqICAgaG9wU2l6ZTogMlxuICogfSk7XG4gKlxuICogY29uc3QgbG9nZ2VyID0gbmV3IGxmby5zaW5rLkxvZ2dlcih7IHRpbWU6IHRydWUsIGRhdGE6IHRydWUgfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KHNsaWNlcik7XG4gKiBzbGljZXIuY29ubmVjdChsb2dnZXIpO1xuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIGV2ZW50SW4ucHJvY2VzcygwLCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV0pO1xuICogPiB7IHRpbWU6IDAsIGRhdGE6IFswLCAxLCAyLCAzXSB9XG4gKiA+IHsgdGltZTogMSwgZGF0YTogWzIsIDMsIDQsIDVdIH1cbiAqID4geyB0aW1lOiAyLCBkYXRhOiBbNCwgNSwgNiwgN10gfVxuICogPiB7IHRpbWU6IDMsIGRhdGE6IFs2LCA3LCA4LCA5XSB9XG4gKi9cbmNsYXNzIFNsaWNlciBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBob3BTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdob3BTaXplJyk7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdmcmFtZVNpemUnKTtcblxuICAgIGlmICghaG9wU2l6ZSlcbiAgICAgIHRoaXMucGFyYW1zLnNldCgnaG9wU2l6ZScsIGZyYW1lU2l6ZSk7XG5cbiAgICB0aGlzLnBhcmFtcy5hZGRMaXN0ZW5lcih0aGlzLm9uUGFyYW1VcGRhdGUuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmZyYW1lSW5kZXggPSAwO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IGhvcFNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2hvcFNpemUnKTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZyYW1lU2l6ZScpO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gZnJhbWVTaXplO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZSA9IHByZXZTdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSAvIGhvcFNpemU7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlc2V0U3RyZWFtKCkge1xuICAgIHN1cGVyLnJlc2V0U3RyZWFtKCk7XG4gICAgdGhpcy5mcmFtZUluZGV4ID0gMDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBmaW5hbGl6ZVN0cmVhbShlbmRUaW1lKSB7XG4gICAgaWYgKHRoaXMuZnJhbWVJbmRleCA+IDApIHtcbiAgICAgIGNvbnN0IGZyYW1lUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZTtcbiAgICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgICAvLyBzZXQgdGhlIHRpbWUgb2YgdGhlIGxhc3QgZnJhbWVcbiAgICAgIHRoaXMuZnJhbWUudGltZSArPSAoMSAvIGZyYW1lUmF0ZSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLmZyYW1lSW5kZXg7IGkgPCBmcmFtZVNpemU7IGkrKylcbiAgICAgICAgZGF0YVtpXSA9IDA7XG5cbiAgICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcbiAgICB9XG5cbiAgICBzdXBlci5maW5hbGl6ZVN0cmVhbShlbmRUaW1lKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICB0aGlzLnByZXBhcmVGcmFtZSgpO1xuICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgY29uc3QgdGltZSA9IGZyYW1lLnRpbWU7XG4gICAgY29uc3QgYmxvY2sgPSBmcmFtZS5kYXRhO1xuICAgIGNvbnN0IG1ldGFkYXRhID0gZnJhbWUubWV0YWRhdGE7XG5cbiAgICBjb25zdCBjZW50ZXJlZFRpbWVUYWdzID0gdGhpcy5wYXJhbXMuZ2V0KCdjZW50ZXJlZFRpbWVUYWdzJyk7XG4gICAgY29uc3QgaG9wU2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnaG9wU2l6ZScpO1xuICAgIGNvbnN0IG91dEZyYW1lID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBzYW1wbGVSYXRlID0gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZTtcbiAgICBjb25zdCBzYW1wbGVQZXJpb2QgPSAxIC8gc2FtcGxlUmF0ZTtcbiAgICBjb25zdCBibG9ja1NpemUgPSBibG9jay5sZW5ndGg7XG5cbiAgICBsZXQgZnJhbWVJbmRleCA9IHRoaXMuZnJhbWVJbmRleDtcbiAgICBsZXQgYmxvY2tJbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoYmxvY2tJbmRleCA8IGJsb2NrU2l6ZSkge1xuICAgICAgbGV0IG51bVNraXAgPSAwO1xuXG4gICAgICAvLyBza2lwIGJsb2NrIHNhbXBsZXMgZm9yIG5lZ2F0aXZlIGZyYW1lSW5kZXggKGZyYW1lU2l6ZSA8IGhvcFNpemUpXG4gICAgICBpZiAoZnJhbWVJbmRleCA8IDApIHtcbiAgICAgICAgbnVtU2tpcCA9IC1mcmFtZUluZGV4O1xuICAgICAgICBmcmFtZUluZGV4ID0gMDsgLy8gcmVzZXQgYGZyYW1lSW5kZXhgXG4gICAgICB9XG5cbiAgICAgIGlmIChudW1Ta2lwIDwgYmxvY2tTaXplKSB7XG4gICAgICAgIGJsb2NrSW5kZXggKz0gbnVtU2tpcDsgLy8gc2tpcCBibG9jayBzZWdtZW50XG4gICAgICAgIC8vIGNhbiBjb3B5IGFsbCB0aGUgcmVzdCBvZiB0aGUgaW5jb21pbmcgYmxvY2tcbiAgICAgICAgbGV0IG51bUNvcHkgPSBibG9ja1NpemUgLSBibG9ja0luZGV4O1xuICAgICAgICAvLyBjb25ub3QgY29weSBtb3JlIHRoYW4gd2hhdCBmaXRzIGludG8gdGhlIGZyYW1lXG4gICAgICAgIGNvbnN0IG1heENvcHkgPSBmcmFtZVNpemUgLSBmcmFtZUluZGV4O1xuXG4gICAgICAgIGlmIChudW1Db3B5ID49IG1heENvcHkpXG4gICAgICAgICAgbnVtQ29weSA9IG1heENvcHk7XG5cbiAgICAgICAgLy8gY29weSBibG9jayBzZWdtZW50IGludG8gZnJhbWVcbiAgICAgICAgY29uc3QgY29weSA9IGJsb2NrLnN1YmFycmF5KGJsb2NrSW5kZXgsIGJsb2NrSW5kZXggKyBudW1Db3B5KTtcbiAgICAgICAgb3V0RnJhbWUuc2V0KGNvcHksIGZyYW1lSW5kZXgpO1xuICAgICAgICAvLyBhZHZhbmNlIGJsb2NrIGFuZCBmcmFtZSBpbmRleFxuICAgICAgICBibG9ja0luZGV4ICs9IG51bUNvcHk7XG4gICAgICAgIGZyYW1lSW5kZXggKz0gbnVtQ29weTtcblxuICAgICAgICAvLyBzZW5kIGZyYW1lIHdoZW4gY29tcGxldGVkXG4gICAgICAgIGlmIChmcmFtZUluZGV4ID09PSBmcmFtZVNpemUpIHtcbiAgICAgICAgICAvLyBkZWZpbmUgdGltZSB0YWcgZm9yIHRoZSBvdXRGcmFtZSBhY2NvcmRpbmcgdG8gY29uZmlndXJhdGlvblxuICAgICAgICAgIGlmIChjZW50ZXJlZFRpbWVUYWdzKVxuICAgICAgICAgICAgdGhpcy5mcmFtZS50aW1lID0gdGltZSArIChibG9ja0luZGV4IC0gZnJhbWVTaXplIC8gMikgKiBzYW1wbGVQZXJpb2Q7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5mcmFtZS50aW1lID0gdGltZSArIChibG9ja0luZGV4IC0gZnJhbWVTaXplKSAqIHNhbXBsZVBlcmlvZDtcblxuICAgICAgICAgIHRoaXMuZnJhbWUubWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgICAvLyBmb3J3YXJkIHRvIG5leHQgbm9kZXNcbiAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUZyYW1lKCk7XG5cbiAgICAgICAgICAvLyBzaGlmdCBmcmFtZSBsZWZ0XG4gICAgICAgICAgaWYgKGhvcFNpemUgPCBmcmFtZVNpemUpXG4gICAgICAgICAgICBvdXRGcmFtZS5zZXQob3V0RnJhbWUuc3ViYXJyYXkoaG9wU2l6ZSwgZnJhbWVTaXplKSwgMCk7XG5cbiAgICAgICAgICBmcmFtZUluZGV4IC09IGhvcFNpemU7IC8vIGhvcCBmb3J3YXJkXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHNraXAgZW50aXJlIGJsb2NrXG4gICAgICAgIGNvbnN0IGJsb2NrUmVzdCA9IGJsb2NrU2l6ZSAtIGJsb2NrSW5kZXg7XG4gICAgICAgIGZyYW1lSW5kZXggKz0gYmxvY2tSZXN0O1xuICAgICAgICBibG9ja0luZGV4ICs9IGJsb2NrUmVzdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZyYW1lSW5kZXggPSBmcmFtZUluZGV4O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNsaWNlcjtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IGNlaWwgPSBNYXRoLmNlaWw7XG5cbi8qKlxuICogcGFwZXI6IGh0dHA6Ly9yZWNoZXJjaGUuaXJjYW0uZnIvZXF1aXBlcy9wY20vY2hldmVpZ24vcHNzLzIwMDJfSkFTQV9ZSU4ucGRmXG4gKiBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vYXNob2tmZXJuYW5kZXovWWluLVBpdGNoLVRyYWNraW5nXG4gKiBAcHJpdmF0ZVxuICovXG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICB0aHJlc2hvbGQ6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IDAuMSwgLy8gZGVmYXVsdCBmcm9tIHBhcGVyXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgZG93blNhbXBsaW5nRXhwOiB7IC8vIGRvd25zYW1wbGluZyBmYWN0b3JcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMixcbiAgICBtaW46IDAsXG4gICAgbWF4OiAzLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIG1pbkZyZXE6IHsgLy9cbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IDYwLCAvLyBtZWFuIDczNSBzYW1wbGVzXG4gICAgbWluOiAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG59XG5cbi8qKlxuICogWWluIGZ1bmRhbWVudGFsIGZyZXF1ZW5jeSBlc3RpbWF0b3IsIGJhc2VkIG9uIGFsZ29yaXRobSBkZXNjcmliZWQgaW5cbiAqIFtZSU4sIGEgZnVuZGFtZW50YWwgZnJlcXVlbmN5IGVzdGltYXRvciBmb3Igc3BlZWNoIGFuZCBtdXNpY10oaHR0cDovL3JlY2hlcmNoZS5pcmNhbS5mci9lcXVpcGVzL3BjbS9jaGV2ZWlnbi9wc3MvMjAwMl9KQVNBX1lJTi5wZGYpXG4gKiBieSBDaGV2ZWlnbmUgYW5kIEthd2FoYXJhLlxuICogT24gZWFjaCBmcmFtZSwgdGhpcyBvcGVyYXRvciBwcm9wYWdhdGUgYSB2ZWN0b3IgY29udGFpbmluZyB0aGUgZm9sbG93aW5nXG4gKiB2YWx1ZXM6IGBmcmVxdWVuY3lgLCBgcHJvYmFiaWxpdHlgLlxuICpcbiAqIEZvciBnb29kIHJlc3VsdHMgdGhlIGlucHV0IGZyYW1lIHNpemUgc2hvdWxkIGJlIGxhcmdlICgxMDI0IG9yIDIwNDgpLlxuICpcbiAqIF9zdXBwb3J0IGBzdGFuZGFsb25lYCB1c2FnZV9cbiAqXG4gKiBAbm90ZSAtIEluIG5vZGUgZm9yIGEgZnJhbWUgb2YgMjA0OCBzYW1wbGVzLCBhdmVyYWdlIGNvbXB1dGF0aW9uIHRpbWUgaXM6XG4gKiAgICAgICAgIDAuMDAwMTY3NDIyODMzMzk5OTMzODkgc2Vjb25kLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGhyZXNob2xkPTAuMV0gLSBBYnNvbHV0ZSB0aHJlc2hvbGQgdG8gdGVzdCB0aGVcbiAqICBub3JtYWxpemVkIGRpZmZlcmVuY2UgKHNlZSBwYXBlciBmb3IgbW9yZSBpbmZvcm1hdGlvbnMpLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmRvd25TYW1wbGluZ0V4cD0yXSAtIERvd24gc2FtcGxlIHRoZSBpbnB1dCBmcmFtZSBieVxuICogIGEgZmFjdG9yIG9mIDIgYXQgdGhlIHBvd2VyIG9mIGBkb3duU2FtcGxpbmdFeHBgIChtaW49MCBhbmQgbWF4PTMpIGZvclxuICogIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50cy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW5GcmVxPTYwXSAtIE1pbmltdW0gZnJlcXVlbmN5IHRoZSBvcGVyYXRvciBjYW5cbiAqICBzZWFyY2ggZm9yLiBUaGlzIHBhcmFtZXRlciBkZWZpbmVzIHRoZSBzaXplIG9mIHRoZSBhdXRvY29ycmVsYXRpb24gcGVyZm9ybWVkXG4gKiAgb24gdGhlIHNpZ25hbCwgdGhlIGlucHV0IGZyYW1lIHNpemUgc2hvdWxkIGJlIGFyb3VuZCAyIHRpbWUgdGhpcyBzaXplIGZvclxuICogIGdvb2QgcmVzdWx0cyAoaS5lLiBgaW5wdXRGcmFtZVNpemUg4omIIDIgKiAoc2FtcGxpbmdSYXRlIC8gbWluRnJlcSlgKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIC8vIGFzc3VtaW5nIHNvbWUgQXVkaW9CdWZmZXJcbiAqIGNvbnN0IHNvdXJjZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5CdWZmZXIoe1xuICogICBhdWRpb0J1ZmZlcjogYXVkaW9CdWZmZXIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBzbGljZXIgPSBuZXcgbGZvLm9wZXJhdG9yLlNsaWNlcih7XG4gKiAgIGZyYW1lU2l6ZTogMjA0OCxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHlpbiA9IG5ldyBsZm8ub3BlcmF0b3IuWWluKCk7XG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBzb3VyY2UuY29ubmVjdChzbGljZXIpO1xuICogc2xpY2VyLmNvbm5lY3QoeWluKTtcbiAqIHlpbi5jb25uZWN0KGxvZ2dlcik7XG4gKlxuICogc291cmNlLnN0YXJ0KCk7XG4gKi9cbmNsYXNzIFlpbiBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5wcm9iYWJpbGl0eSA9IDA7XG4gICAgdGhpcy5waXRjaCA9IC0xO1xuXG4gICAgdGhpcy50ZXN0ID0gMDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfZG93bnNhbXBsZShpbnB1dCwgc2l6ZSwgb3V0cHV0LCBkb3duU2FtcGxpbmdFeHApIHtcbiAgICBjb25zdCBvdXRwdXRTaXplID0gc2l6ZSA+PiBkb3duU2FtcGxpbmdFeHA7XG4gICAgbGV0IGksIGo7XG5cbiAgICBzd2l0Y2ggKGRvd25TYW1wbGluZ0V4cCkge1xuICAgICAgY2FzZSAwOiAvLyBubyBkb3duIHNhbXBsaW5nXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzaXplOyBpKyspXG4gICAgICAgICAgb3V0cHV0W2ldID0gaW5wdXRbaV07XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGZvciAoaSA9IDAsIGogPSAwOyBpIDwgb3V0cHV0U2l6ZTsgaSsrLCBqICs9IDIpXG4gICAgICAgICAgb3V0cHV0W2ldID0gMC41ICogKGlucHV0W2pdICsgaW5wdXRbaiArIDFdKTtcblxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IG91dHB1dFNpemU7IGkrKywgaiArPSA0KVxuICAgICAgICAgIG91dHB1dFtpXSA9IDAuMjUgKiAoaW5wdXRbal0gKyBpbnB1dFtqICsgMV0gKyBpbnB1dFtqICsgMl0gKyBpbnB1dFtqICsgM10pO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IG91dHB1dFNpemU7IGkrKywgaiArPSA4KVxuICAgICAgICAgIG91dHB1dFtpXSA9IDAuMTI1ICogKGlucHV0W2pdICsgaW5wdXRbaiArIDFdICsgaW5wdXRbaiArIDJdICsgaW5wdXRbaiArIDNdICsgaW5wdXRbaiArIDRdICsgaW5wdXRbaiArIDVdICsgaW5wdXRbaiArIDZdICsgaW5wdXRbaiArIDddKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0U2l6ZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSAyO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uID0gWydmcmVxdWVuY3knLCAnY29uZmlkZW5jZSddO1xuXG4gICAgdGhpcy5pbnB1dEZyYW1lU2l6ZSA9IHByZXZTdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIC8vIGhhbmRsZSBwYXJhbXNcbiAgICBjb25zdCBzb3VyY2VTYW1wbGVSYXRlID0gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZTtcbiAgICBjb25zdCBkb3duU2FtcGxpbmdFeHAgPSB0aGlzLnBhcmFtcy5nZXQoJ2Rvd25TYW1wbGluZ0V4cCcpO1xuICAgIGNvbnN0IGRvd25GYWN0b3IgPSAxIDw8IGRvd25TYW1wbGluZ0V4cDsgLy8gMl5uXG4gICAgY29uc3QgZG93blNSID0gc291cmNlU2FtcGxlUmF0ZSAvIGRvd25GYWN0b3I7XG4gICAgY29uc3QgZG93bkZyYW1lU2l6ZSA9IHRoaXMuaW5wdXRGcmFtZVNpemUgLyBkb3duRmFjdG9yOyAvLyBuX3RpY2tfZG93biAvLyAxIC8gMl5uXG5cbiAgICBjb25zdCBtaW5GcmVxID0gdGhpcy5wYXJhbXMuZ2V0KCdtaW5GcmVxJyk7XG4gICAgLy8gbGltaXQgbWluIGZyZXEsIGNmLiBwYXBlciBJVi4gc2Vuc2l0aXZpdHkgdG8gcGFyYW1ldGVyc1xuICAgIGNvbnN0IG1pbkZyZXFOYnJTYW1wbGVzID0gZG93blNSIC8gbWluRnJlcTtcbiAgICAvLyBjb25zdCBidWZmZXJTaXplID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgdGhpcy5oYWxmQnVmZmVyU2l6ZSA9IGRvd25GcmFtZVNpemUgLyAyO1xuXG4gICAgLy8gbWluaW11bSBlcnJvciB0byBub3QgY3Jhc2ggYnV0IG5vdCBlbm91Z2h0IHRvIGhhdmUgcmVzdWx0c1xuICAgIGlmIChtaW5GcmVxTmJyU2FtcGxlcyA+IHRoaXMuaGFsZkJ1ZmZlclNpemUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW5wdXQgZnJhbWUgc2l6ZSwgdG9vIHNtYWxsIGZvciBnaXZlbiBcIm1pbkZyZXFcIicpO1xuXG4gICAgdGhpcy5kb3duU2FtcGxpbmdFeHAgPSBkb3duU2FtcGxpbmdFeHA7XG4gICAgdGhpcy5kb3duU2FtcGxpbmdSYXRlID0gZG93blNSO1xuICAgIHRoaXMuZG93bkZyYW1lU2l6ZSA9IGRvd25GcmFtZVNpemU7XG4gICAgdGhpcy5idWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGRvd25GcmFtZVNpemUpO1xuICAgIC8vIGF1dG9jb3JyZWxhdGlvbiBidWZmZXJcbiAgICB0aGlzLnlpbkJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5oYWxmQnVmZmVyU2l6ZSk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9kb3duc2FtcGxlKGlucHV0LCBzaXplLCBvdXRwdXQsIGRvd25TYW1wbGluZ0V4cCkge1xuICAgIGNvbnN0IG91dHB1dFNpemUgPSBzaXplID4+IGRvd25TYW1wbGluZ0V4cDtcbiAgICBsZXQgaSwgajtcblxuICAgIHN3aXRjaCAoZG93blNhbXBsaW5nRXhwKSB7XG4gICAgICBjYXNlIDA6IC8vIG5vIGRvd24gc2FtcGxpbmdcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHNpemU7IGkrKylcbiAgICAgICAgICBvdXRwdXRbaV0gPSBpbnB1dFtpXTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBvdXRwdXRTaXplOyBpKyssIGogKz0gMilcbiAgICAgICAgICBvdXRwdXRbaV0gPSAwLjUgKiAoaW5wdXRbal0gKyBpbnB1dFtqICsgMV0pO1xuXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDI6XG4gICAgICAgIGZvciAoaSA9IDAsIGogPSAwOyBpIDwgb3V0cHV0U2l6ZTsgaSsrLCBqICs9IDQpXG4gICAgICAgICAgb3V0cHV0W2ldID0gMC4yNSAqIChpbnB1dFtqXSArIGlucHV0W2ogKyAxXSArIGlucHV0W2ogKyAyXSArIGlucHV0W2ogKyAzXSk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGZvciAoaSA9IDAsIGogPSAwOyBpIDwgb3V0cHV0U2l6ZTsgaSsrLCBqICs9IDgpXG4gICAgICAgICAgb3V0cHV0W2ldID0gMC4xMjUgKiAoaW5wdXRbal0gKyBpbnB1dFtqICsgMV0gKyBpbnB1dFtqICsgMl0gKyBpbnB1dFtqICsgM10gKyBpbnB1dFtqICsgNF0gKyBpbnB1dFtqICsgNV0gKyBpbnB1dFtqICsgNl0gKyBpbnB1dFtqICsgN10pO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRTaXplO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0ZXAgMSwgMiBhbmQgMyAtIFNxdWFyZWQgZGlmZmVyZW5jZSBvZiB0aGUgc2hpZnRlZCBzaWduYWwgd2l0aCBpdHNlbGYuXG4gICAqIGN1bXVsYXRpdmUgbWVhbiBub3JtYWxpemVkIGRpZmZlcmVuY2UuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbm9ybWFsaXplZERpZmZlcmVuY2UoYnVmZmVyKSB7XG4gICAgY29uc3QgaGFsZkJ1ZmZlclNpemUgPSB0aGlzLmhhbGZCdWZmZXJTaXplO1xuICAgIGNvbnN0IHlpbkJ1ZmZlciA9IHRoaXMueWluQnVmZmVyO1xuICAgIGxldCBzdW0gPSAwO1xuXG4gICAgLy8gZGlmZmVyZW5jZSBmb3IgZGlmZmVyZW50IHNoaWZ0IHZhbHVlcyAodGF1KVxuICAgIGZvciAobGV0IHRhdSA9IDA7IHRhdSA8IGhhbGZCdWZmZXJTaXplOyB0YXUrKykge1xuICAgICAgbGV0IHNxdWFyZWREaWZmZXJlbmNlID0gMDsgLy8gcmVzZXQgYnVmZmVyXG5cbiAgICAgIC8vIHRha2UgZGlmZmVyZW5jZSBvZiB0aGUgc2lnbmFsIHdpdGggYSBzaGlmdGVkIHZlcnNpb24gb2YgaXRzZWxmIHRoZW5cbiAgICAgIC8vIHNxYXVyZSB0aGUgcmVzdWx0XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhhbGZCdWZmZXJTaXplOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBidWZmZXJbaV0gLSBidWZmZXJbaSArIHRhdV07XG4gICAgICAgIHNxdWFyZWREaWZmZXJlbmNlICs9IGRlbHRhICogZGVsdGE7XG4gICAgICB9XG5cbiAgICAgIC8vIHN0ZXAgMyAtIG5vcm1hbGl6ZSB5aW5CdWZmZXJcbiAgICAgIGlmICh0YXUgPiAwKSB7XG4gICAgICAgIHN1bSArPSBzcXVhcmVkRGlmZmVyZW5jZTtcbiAgICAgICAgeWluQnVmZmVyW3RhdV0gPSBzcXVhcmVkRGlmZmVyZW5jZSAqICh0YXUgLyBzdW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHlpbkJ1ZmZlclswXSA9IDE7XG4gIH1cblxuICAvKipcbiAgICogU3RlcCA0IC0gZmluZCBmaXJzdCBiZXN0IHRhdSB0aGF0IGlzIHVuZGVyIHRoZSB0aHJlc29sZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hYnNvbHV0ZVRocmVzaG9sZCgpIHtcbiAgICBjb25zdCB0aHJlc2hvbGQgPSB0aGlzLnBhcmFtcy5nZXQoJ3RocmVzaG9sZCcpO1xuICAgIGNvbnN0IHlpbkJ1ZmZlciA9IHRoaXMueWluQnVmZmVyO1xuICAgIGNvbnN0IGhhbGZCdWZmZXJTaXplID0gdGhpcy5oYWxmQnVmZmVyU2l6ZTtcbiAgICBsZXQgdGF1O1xuXG4gICAgZm9yICh0YXUgPSAxOyB0YXUgPCBoYWxmQnVmZmVyU2l6ZTsgdGF1KyspIHtcbiAgICAgIGlmICh5aW5CdWZmZXJbdGF1XSA8IHRocmVzaG9sZCkge1xuICAgICAgICAvLyBrZWVwIGluY3JlYXNpbmcgdGF1IGlmIG5leHQgdmFsdWUgaXMgYmV0dGVyXG4gICAgICAgIHdoaWxlICh0YXUgKyAxIDwgaGFsZkJ1ZmZlclNpemUgJiYgeWluQnVmZmVyW3RhdSArIDFdIDwgeWluQnVmZmVyW3RhdV0pXG4gICAgICAgICAgdGF1ICs9IDE7XG5cbiAgICAgICAgLy8gYmVzdCB0YXUgZm91bmQgLCB5aW5CdWZmZXJbdGF1XSBjYW4gYmUgc2VlbiBhcyBhbiBlc3RpbWF0aW9uIG9mXG4gICAgICAgIC8vIGFwZXJpb2RpY2l0eSB0aGVuOiBwZXJpb2RpY2l0eSA9IDEgLSBhcGVyaW9kaWNpdHlcbiAgICAgICAgdGhpcy5wcm9iYWJpbGl0eSA9IDEgLSB5aW5CdWZmZXJbdGF1XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIC0xIGlmIG5vdCBtYXRjaCBmb3VuZFxuICAgIHJldHVybiAodGF1ID09PSBoYWxmQnVmZmVyU2l6ZSkgPyAtMSA6IHRhdTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGVwIDUgLSBGaW5kIGEgYmV0dGVyIGZyYWN0aW9ubmFsIGFwcHJveGltYXRlIG9mIHRhdS5cbiAgICogdGhpcyBjYW4gcHJvYmFibHkgYmUgc2ltcGxpZmllZC4uLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3BhcmFib2xpY0ludGVycG9sYXRpb24odGF1RXN0aW1hdGUpIHtcbiAgICBjb25zdCBoYWxmQnVmZmVyU2l6ZSA9IHRoaXMuaGFsZkJ1ZmZlclNpemU7XG4gICAgY29uc3QgeWluQnVmZmVyID0gdGhpcy55aW5CdWZmZXI7XG4gICAgbGV0IGJldHRlclRhdTtcbiAgICAvLyBAbm90ZSAtIHRhdUVzdGltYXRlIGNhbm5vdCBiZSB6ZXJvIGFzIHRoZSBsb29wIHN0YXJ0IGF0IDEgaW4gc3RlcCA0XG4gICAgY29uc3QgeDAgPSB0YXVFc3RpbWF0ZSAtIDE7XG4gICAgY29uc3QgeDIgPSAodGF1RXN0aW1hdGUgPCBoYWxmQnVmZmVyU2l6ZSAtIDEpID8gdGF1RXN0aW1hdGUgKyAxIDogdGF1RXN0aW1hdGU7XG5cbiAgICAvLyBpZiBgdGF1RXN0aW1hdGVgIGlzIGxhc3QgaW5kZXgsIHdlIGNhbid0IGludGVycG9sYXRlXG4gICAgaWYgKHgyID09PSB0YXVFc3RpbWF0ZSkge1xuICAgICAgICBiZXR0ZXJUYXUgPSB0YXVFc3RpbWF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgczAgPSB5aW5CdWZmZXJbeDBdO1xuICAgICAgY29uc3QgczEgPSB5aW5CdWZmZXJbdGF1RXN0aW1hdGVdO1xuICAgICAgY29uc3QgczIgPSB5aW5CdWZmZXJbeDJdO1xuXG4gICAgICAvLyBAbm90ZSAtIGRvbid0IGZ1bGx5IHVuZGVyc3RhbmQgdGhpcyBmb3JtdWxhIG5laXRoZXIuLi5cbiAgICAgIGJldHRlclRhdSA9IHRhdUVzdGltYXRlICsgKHMyIC0gczApIC8gKDIgKiAoMiAqIHMxIC0gczIgLSBzMCkpO1xuICAgIH1cblxuICAgIHJldHVybiBiZXR0ZXJUYXU7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoZSBgWWluYCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGEgZ3JhcGgpLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fEZsb2F0MzJBcnJheX0gaW5wdXQgLSBUaGUgc2lnbmFsIGZyYWdtZW50IHRvIHByb2Nlc3MuXG4gICAqIEByZXR1cm4ge0FycmF5fSAtIEFycmF5IGNvbnRhaW5pbmcgdGhlIGBmcmVxdWVuY3lgLCBgZW5lcmd5YCwgYHBlcmlvZGljaXR5YFxuICAgKiAgYW5kIGBBQzFgXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAgICpcbiAgICogY29uc3QgeWluID0gbmV3IGxmby5vcGVyYXRvci5ZaW4oKTtcbiAgICogeWluLmluaXRTdHJlYW0oe1xuICAgKiAgIGZyYW1lU2l6ZTogMjA0OCxcbiAgICogICBmcmFtZVR5cGU6ICdzaWduYWwnLFxuICAgKiAgIHNvdXJjZVNhbXBsZVJhdGU6IDQ0MTAwXG4gICAqIH0pO1xuICAgKlxuICAgKiBjb25zdCByZXN1bHRzID0geWluLmlucHV0U2lnbmFsKHNpZ25hbCk7XG4gICAqL1xuICBpbnB1dFNpZ25hbChpbnB1dCkge1xuICAgIHRoaXMucGl0Y2ggPSAtMTtcbiAgICB0aGlzLnByb2JhYmlsaXR5ID0gMDtcblxuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIGNvbnN0IGlucHV0RnJhbWVTaXplID0gdGhpcy5pbnB1dEZyYW1lU2l6ZTtcbiAgICBjb25zdCBkb3duU2FtcGxpbmdFeHAgPSB0aGlzLmRvd25TYW1wbGluZ0V4cDtcbiAgICBjb25zdCBzYW1wbGVSYXRlID0gdGhpcy5kb3duU2FtcGxpbmdSYXRlO1xuICAgIGNvbnN0IG91dERhdGEgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgbGV0IHRhdUVzdGltYXRlID0gLTE7XG5cbiAgICAvLyBzdWJzYW1wbGluZ1xuICAgIHRoaXMuX2Rvd25zYW1wbGUoaW5wdXQsIGlucHV0RnJhbWVTaXplLCBidWZmZXIsIGRvd25TYW1wbGluZ0V4cCk7XG4gICAgLy8gc3RlcCAxLCAyLCAzIC0gbm9ybWFsaXplZCBzcXVhcmVkIGRpZmZlcmVuY2Ugb2YgdGhlIHNpZ25hbCB3aXRoIGFcbiAgICAvLyBzaGlmdGVkIHZlcnNpb24gb2YgaXRzZWxmXG4gICAgdGhpcy5fbm9ybWFsaXplZERpZmZlcmVuY2UoYnVmZmVyKTtcbiAgICAvLyBzdGVwIDQgLSBmaW5kIGZpcnN0IGJlc3QgdGF1IGVzdGltYXRlIHRoYXQgaXMgb3ZlciB0aGUgdGhyZXNob2xkXG4gICAgdGF1RXN0aW1hdGUgPSB0aGlzLl9hYnNvbHV0ZVRocmVzaG9sZCgpO1xuXG4gICAgaWYgKHRhdUVzdGltYXRlICE9PSAtMSkge1xuICAgICAgLy8gc3RlcCA1IC0gc28gZmFyIHRhdSBpcyBhbiBpbnRlZ2VyIHNoaWZ0IG9mIHRoZSBzaWduYWwsIGNoZWNrIGlmXG4gICAgICAvLyB0aGVyZSBpcyBhIGJldHRlciBmcmFjdGlvbm5hbCB2YWx1ZSBhcm91bmRcbiAgICAgIHRhdUVzdGltYXRlID0gdGhpcy5fcGFyYWJvbGljSW50ZXJwb2xhdGlvbih0YXVFc3RpbWF0ZSk7XG4gICAgICB0aGlzLnBpdGNoID0gc2FtcGxlUmF0ZSAvIHRhdUVzdGltYXRlO1xuICAgIH1cblxuICAgIG91dERhdGFbMF0gPSB0aGlzLnBpdGNoO1xuICAgIG91dERhdGFbMV0gPSB0aGlzLnByb2JhYmlsaXR5O1xuXG4gICAgcmV0dXJuIG91dERhdGE7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIHRoaXMuaW5wdXRTaWduYWwoZnJhbWUuZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWWluO1xuIiwiaW1wb3J0IEJpcXVhZCBmcm9tICcuL0JpcXVhZCc7XG5pbXBvcnQgRGN0IGZyb20gJy4vRGN0JztcbmltcG9ydCBGZnQgZnJvbSAnLi9GZnQnO1xuaW1wb3J0IE1hZ25pdHVkZSBmcm9tICcuL01hZ25pdHVkZSc7XG5pbXBvcnQgTWVhblN0ZGRldiBmcm9tICcuL01lYW5TdGRkZXYnO1xuaW1wb3J0IE1lbCBmcm9tICcuL01lbCc7XG5pbXBvcnQgTWZjYyBmcm9tICcuL01mY2MnO1xuaW1wb3J0IE1pbk1heCBmcm9tICcuL01pbk1heCc7XG5pbXBvcnQgTW92aW5nQXZlcmFnZSBmcm9tICcuL01vdmluZ0F2ZXJhZ2UnO1xuaW1wb3J0IE1vdmluZ01lZGlhbiBmcm9tICcuL01vdmluZ01lZGlhbic7XG5pbXBvcnQgT25PZmYgZnJvbSAnLi9Pbk9mZic7XG5pbXBvcnQgUm1zIGZyb20gJy4vUm1zJztcbmltcG9ydCBTZWdtZW50ZXIgZnJvbSAnLi9TZWdtZW50ZXInO1xuaW1wb3J0IFNlbGVjdCBmcm9tICcuL1NlbGVjdCc7XG5pbXBvcnQgU2xpY2VyIGZyb20gJy4vU2xpY2VyJztcbmltcG9ydCBZaW4gZnJvbSAnLi9ZaW4nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEJpcXVhZCxcbiAgRGN0LFxuICBGZnQsXG4gIE1hZ25pdHVkZSxcbiAgTWVhblN0ZGRldixcbiAgTWVsLFxuICBNZmNjLFxuICBNaW5NYXgsXG4gIE1vdmluZ0F2ZXJhZ2UsXG4gIE1vdmluZ01lZGlhbixcbiAgT25PZmYsXG4gIFJtcyxcbiAgU2VnbWVudGVyLFxuICBTZWxlY3QsXG4gIFNsaWNlcixcbiAgWWluLFxufTtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgcHJvY2Vzc0ZyYW1lOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgZmluYWxpemVTdHJlYW06IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBicmlkZ2UgYmV0d2VlbiB0aGUgZ3JhcGggYW5kIGFwcGxpY2F0aW9uIGxvZ2ljLiBIYW5kbGUgYHB1c2hgXG4gKiBhbmQgYHB1bGxgIHBhcmFkaWdtcy5cbiAqXG4gKiBUaGlzIHNpbmsgY2FuIGhhbmRsZSBhbnkgdHlwZSBvZiBpbnB1dCAoYHNpZ25hbGAsIGB2ZWN0b3JgLCBgc2NhbGFyYClcbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5zaW5rXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5wcm9jZXNzRnJhbWU9bnVsbF0gLSBDYWxsYmFjayBleGVjdXRlZCBvbiBlYWNoXG4gKiAgYHByb2Nlc3NGcmFtZWAgY2FsbC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmZpbmFsaXplU3RyZWFtPW51bGxdIC0gQ2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaFxuICogIGBmaW5hbGl6ZVN0cmVhbWAgY2FsbC5cbiAqXG4gKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzRnJhbWV9XG4gKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzU3RyZWFtUGFyYW1zfVxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NvbW1vbic7XG4gKlxuICogY29uc3QgZnJhbWVzID0gW1xuICogIHsgdGltZTogMCwgZGF0YTogWzAsIDFdIH0sXG4gKiAgeyB0aW1lOiAxLCBkYXRhOiBbMSwgMl0gfSxcbiAqIF07XG4gKlxuICogY29uc3QgZXZlbnRJbiA9IG5ldyBFdmVudEluKHtcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAqICAgZnJhbWVTaXplOiAyLFxuICogICBmcmFtZVJhdGU6IDEsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBicmlkZ2UgPSBuZXcgQnJpZGdlKHtcbiAqICAgcHJvY2Vzc0ZyYW1lOiAoZnJhbWUpID0+IGNvbnNvbGUubG9nKGZyYW1lKSxcbiAqIH0pO1xuICpcbiAqIGV2ZW50SW4uY29ubmVjdChicmlkZ2UpO1xuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIC8vIGNhbGxiYWNrIGV4ZWN1dGVkIG9uIGVhY2ggZnJhbWVcbiAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKGZyYW1lWzBdKTtcbiAqID4geyB0aW1lOiAwLCBkYXRhOiBbMCwgMV0gfVxuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUoZnJhbWVbMV0pO1xuICogPiB7IHRpbWU6IDEsIGRhdGE6IFsxLCAyXSB9XG4gKlxuICogLy8gcHVsbCBjdXJyZW50IGZyYW1lIHdoZW4gbmVlZGVkXG4gKiBjb25zb2xlLmxvZyhicmlkZ2UuZnJhbWUpO1xuICogPiB7IHRpbWU6IDEsIGRhdGE6IFsxLCAyXSB9XG4gKi9cbmNsYXNzIEJyaWRnZSBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgY29uc3QgcHJvY2Vzc1N0cmVhbVBhcmFtc0NhbGxiYWNrID0gdGhpcy5wYXJhbXMuZ2V0KCdwcm9jZXNzU3RyZWFtUGFyYW1zJyk7XG5cbiAgICBpZiAocHJvY2Vzc1N0cmVhbVBhcmFtc0NhbGxiYWNrICE9PSBudWxsKVxuICAgICAgcHJvY2Vzc1N0cmVhbVBhcmFtc0NhbGxiYWNrKHRoaXMuc3RyZWFtUGFyYW1zKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZmluYWxpemVTdHJlYW0oZW5kVGltZSkge1xuICAgIGNvbnN0IGZpbmFsaXplU3RyZWFtQ2FsbGJhY2sgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZpbmFsaXplU3RyZWFtJyk7XG5cbiAgICBpZiAoZmluYWxpemVTdHJlYW1DYWxsYmFjayAhPT0gbnVsbClcbiAgICAgIGZpbmFsaXplU3RyZWFtQ2FsbGJhY2soZW5kVGltZSk7XG4gIH1cblxuICAvLyBwcm9jZXNzIGFueSB0eXBlXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2NhbGFyKCkge31cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoKSB7fVxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbCgpIHt9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NGcmFtZShmcmFtZSkge1xuICAgIHRoaXMucHJlcGFyZUZyYW1lKCk7XG5cbiAgICBjb25zdCBwcm9jZXNzRnJhbWVDYWxsYmFjayA9IHRoaXMucGFyYW1zLmdldCgncHJvY2Vzc0ZyYW1lJyk7XG4gICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5mcmFtZTtcbiAgICBvdXRwdXQuZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplKTtcbiAgICAvLyBwdWxsIGludGVyZmFjZSAod2UgY29weSBkYXRhIHNpbmNlIHdlIGRvbid0IGtub3cgd2hhdCBjb3VsZFxuICAgIC8vIGJlIGRvbmUgb3V0c2lkZSB0aGUgZ3JhcGgpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7IGkrKylcbiAgICAgIG91dHB1dC5kYXRhW2ldID0gZnJhbWUuZGF0YVtpXTtcblxuICAgIG91dHB1dC50aW1lID0gZnJhbWUudGltZTtcbiAgICBvdXRwdXQubWV0YWRhdGEgPSBmcmFtZS5tZXRhZGF0YTtcblxuICAgIC8vIGBwdXNoYCBpbnRlcmZhY2VcbiAgICBpZiAocHJvY2Vzc0ZyYW1lQ2FsbGJhY2sgIT09IG51bGwpXG4gICAgICBwcm9jZXNzRnJhbWVDYWxsYmFjayhvdXRwdXQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJyaWRnZTtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHNlcGFyYXRlQXJyYXlzOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBjYWxsYmFjazoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG59O1xuXG4vKipcbiAqIFJlY29yZCBpbnB1dCBmcmFtZXMgZnJvbSBhIGdyYXBoLiBUaGlzIHNpbmsgY2FuIGhhbmRsZSBgc2lnbmFsYCwgYHZlY3RvcmBcbiAqIG9yIGBzY2FsYXJgIGlucHV0cy5cbiAqXG4gKiBXaGVuIHRoZSByZWNvcmRpbmcgaXMgc3RvcHBlZCAoZWl0aGVyIGJ5IGNhbGxpbmcgYHN0b3BgIG9uIHRoZSBub2RlIG9yIHdoZW5cbiAqIHRoZSBzdHJlYW0gaXMgZmluYWxpemVkKSwgdGhlIGNhbGxiYWNrIGdpdmVuIGFzIHBhcmFtZXRlciBpcyBleGVjdXRlZCB3aXRoXG4gKiB0aGUgcmVjb3JkZXIgZGF0YSBhcyBhcmd1bWVudC5cbiAqXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNlcGFyYXRlQXJyYXlzPWZhbHNlXSAtIEZvcm1hdCBvZiB0aGUgcmV0cmlldmVkXG4gKiAgdmFsdWVzOlxuICogIC0gd2hlbiBgZmFsc2VgLCBmb3JtYXQgaXMgW3sgdGltZSwgZGF0YSB9LCB7IHRpbWUsIGRhdGEgfSwgLi4uXVxuICogIC0gd2hlbiBgdHJ1ZWAsIGZvcm1hdCBpcyB7IHRpbWU6IFsuLi5dLCBkYXRhOiBbLi4uXSB9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFja10gLSBDYWxsYmFjayB0byBleGVjdXRlIHdoZW4gYSBuZXcgcmVjb3JkXG4gKiAgaXMgZW5kZWQuIFRoaXMgY2FuIGhhcHBlbiB3aGVuOiBgc3RvcGAgaXMgY2FsbGVkIG9uIHRoZSByZWNvcmRlciwgb3IgYHN0b3BgXG4gKiAgaXMgY2FsbGVkIG9uIHRoZSBzb3VyY2UuXG4gKlxuICogQHRvZG8gLSBBZGQgYXV0byByZWNvcmQgcGFyYW0uXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uc2lua1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NvbW1vbic7XG4gKlxuICogY29uc3QgZXZlbnRJbiA9IG5ldyBsZm8uc291cmNlLkV2ZW50SW4oe1xuICogIGZyYW1lVHlwZTogJ3ZlY3RvcicsXG4gKiAgZnJhbWVTaXplOiAyLFxuICogIGZyYW1lUmF0ZTogMCxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHJlY29yZGVyID0gbmV3IGxmby5zaW5rLkRhdGFSZWNvcmRlcih7XG4gKiAgIGNhbGxiYWNrOiAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YSksXG4gKiB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QocmVjb3JkZXIpO1xuICogZXZlbnRJbi5zdGFydCgpO1xuICogcmVjb3JkZXIuc3RhcnQoKTtcbiAqXG4gKiBldmVudEluLnByb2Nlc3MoMCwgWzAsIDFdKTtcbiAqIGV2ZW50SW4ucHJvY2VzcygxLCBbMSwgMl0pO1xuICpcbiAqIHJlY29yZGVyLnN0b3AoKTtcbiAqID4gW3sgdGltZTogMCwgZGF0YTogWzAsIDFdIH0sIHsgdGltZTogMSwgZGF0YTogWzEsIDJdIH1dO1xuICovXG5jbGFzcyBEYXRhUmVjb3JkZXIgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lIGlmIHRoZSBub2RlIGlzIGN1cnJlbnRseSByZWNvcmRpbmcuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAbmFtZSBpc1JlY29yZGluZ1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6c2luay5TaWduYWxSZWNvcmRlclxuICAgICAqL1xuICAgIHRoaXMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfaW5pdFN0b3JlKCkge1xuICAgIGNvbnN0IHNlcGFyYXRlQXJyYXlzID0gdGhpcy5wYXJhbXMuZ2V0KCdzZXBhcmF0ZUFycmF5cycpO1xuXG4gICAgaWYgKHNlcGFyYXRlQXJyYXlzKVxuICAgICAgdGhpcy5fc3RvcmUgPSB7IHRpbWU6IFtdLCBkYXRhOiBbXSB9O1xuICAgIGVsc2VcbiAgICAgIHRoaXMuX3N0b3JlID0gW107XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuICAgIHRoaXMuX2luaXRTdG9yZSgpO1xuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgcmVjb3JkaW5nLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y2xpZW50LnNpbmsuRGF0YVJlY29yZGVyI3N0b3B9XG4gICAqL1xuICBzdGFydCgpIHtcbiAgICB0aGlzLmlzUmVjb3JkaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIHJlY29yZGluZyBhbmQgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgZGVmaW5lZCBpbiBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y2xpZW50LnNpbmsuRGF0YVJlY29yZGVyI3N0YXJ0fVxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5pc1JlY29yZGluZykge1xuICAgICAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLnBhcmFtcy5nZXQoJ2NhbGxiYWNrJyk7XG5cbiAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbClcbiAgICAgICAgY2FsbGJhY2sodGhpcy5fc3RvcmUpO1xuXG4gICAgICB0aGlzLl9pbml0U3RvcmUoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZmluYWxpemVTdHJlYW0oKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gIH1cblxuICAvLyBoYW5kbGUgYW55IGlucHV0IHR5cGVzXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2NhbGFyKGZyYW1lKSB7fVxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge31cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUpIHt9XG5cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgaWYgKHRoaXMuaXNSZWNvcmRpbmcpIHtcbiAgICAgIHRoaXMucHJlcGFyZUZyYW1lKGZyYW1lKTtcblxuICAgICAgY29uc3Qgc2VwYXJhdGVBcnJheXMgPSB0aGlzLnBhcmFtcy5nZXQoJ3NlcGFyYXRlQXJyYXlzJyk7XG4gICAgICBjb25zdCBlbnRyeSA9IHtcbiAgICAgICAgdGltZTogZnJhbWUudGltZSxcbiAgICAgICAgZGF0YTogbmV3IEZsb2F0MzJBcnJheShmcmFtZS5kYXRhKSxcbiAgICAgIH07XG5cbiAgICAgIGlmICghc2VwYXJhdGVBcnJheXMpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUucHVzaChlbnRyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdG9yZS50aW1lLnB1c2goZW50cnkudGltZSk7XG4gICAgICAgIHRoaXMuX3N0b3JlLmRhdGEucHVzaChlbnRyeS5kYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YVJlY29yZGVyO1xuXG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgdGltZToge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9XG4gIH0sXG4gIG1ldGFkYXRhOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9XG4gIH0sXG4gIHN0cmVhbVBhcmFtczoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfVxuICB9LFxuICBmcmFtZUluZGV4OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9XG4gIH0sXG59XG5cbi8qKlxuICogTG9nIGBmcmFtZS50aW1lYCwgYGZyYW1lLmRhdGFgLCBgZnJhbWUubWV0YWRhdGFgIGFuZC9vclxuICogYHN0cmVhbUF0dHJpYnV0ZXNgIG9mIGFueSBub2RlIGluIHRoZSBjb25zb2xlLlxuICpcbiAqIFRoaXMgc2luayBjYW4gaGFuZGxlIGFueSB0eXBlIGlmIGlucHV0IChgc2lnbmFsYCwgYHZlY3RvcmAsIGBzY2FsYXJgKVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgcGFyYW1ldGVycyBkZWZhdWx0IHZhbHVlcy5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudGltZT1mYWxzZV0gLSBMb2cgaW5jb21taW5nIGBmcmFtZS50aW1lYCBpZiBgdHJ1ZWAuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRhdGE9ZmFsc2VdIC0gTG9nIGluY29tbWluZyBgZnJhbWUuZGF0YWAgaWYgYHRydWVgLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tZXRhZGF0YT1mYWxzZV0gLSBMb2cgaW5jb21taW5nIGBmcmFtZS5tZXRhZGF0YWBcbiAqICBpZiBgdHJ1ZWAuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnN0cmVhbVBhcmFtcz1mYWxzZV0gLSBMb2cgYHN0cmVhbVBhcmFtc2Agb2YgdGhlXG4gKiAgcHJldmlvdXMgbm9kZSB3aGVuIGdyYXBoIGlzIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmZyYW1lSW5kZXg9ZmFsc2VdIC0gTG9nIGluZGV4IG9mIHRoZSBpbmNvbW1pbmdcbiAqICBgZnJhbWVgLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLnNpbmtcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jb21tb24nO1xuICpcbiAqIGNvbnN0IGxvZ2dlciA9IG5ldyBsZm8uc2luay5Mb2dnZXIoeyBkYXRhOiB0cnVlIH0pO1xuICogd2hhdGV2ZXJPcGVyYXRvci5jb25uZWN0KGxvZ2dlcik7XG4gKi9cbmNsYXNzIExvZ2dlciBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ3N0cmVhbVBhcmFtcycpID09PSB0cnVlKVxuICAgICAgY29uc29sZS5sb2cocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLmZyYW1lSW5kZXggPSAwO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NGdW5jdGlvbihmcmFtZSkge1xuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ2ZyYW1lSW5kZXgnKSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZnJhbWVJbmRleCsrKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ3RpbWUnKSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnNvbGUubG9nKGZyYW1lLnRpbWUpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmdldCgnZGF0YScpID09PSB0cnVlKVxuICAgICAgY29uc29sZS5sb2coZnJhbWUuZGF0YSk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCdtZXRhZGF0YScpID09PSB0cnVlKVxuICAgICAgY29uc29sZS5sb2coZnJhbWUubWV0YWRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dlcjtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBkdXJhdGlvbjoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMTAsXG4gICAgbWluOiAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIGNhbGxiYWNrOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgaWdub3JlTGVhZGluZ1plcm9zOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgcmV0cmlldmVBdWRpb0J1ZmZlcjoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgYXVkaW9Db250ZXh0OiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgfSxcbn07XG5cbi8qKlxuICogUmVjb3JkIGFuIGBzaWduYWxgIGlucHV0IHN0cmVhbSBvZiBhcmJpdHJhcnkgZHVyYXRpb24gYW5kIHJldHJpZXZlIGl0XG4gKiB3aGVuIGRvbmUuXG4gKlxuICogV2hlbiByZWNvcmRpbmcgaXMgc3RvcHBlZCAoZWl0aGVyIHdoZW4gdGhlIGBzdG9wYCBtZXRob2QgaXMgY2FsbGVkLCB0aGVcbiAqIGRlZmluZWQgZHVyYXRpb24gaGFzIGJlZW4gcmVjb3JkZWQsIG9yIHRoZSBzb3VyY2Ugb2YgdGhlIGdyYXBoIGZpbmFsaXplZFxuICogdGhlIHN0cmVhbSksIHRoZSBjYWxsYmFjayBnaXZlbiBhcyBwYXJhbWV0ZXIgaXMgZXhlY3V0ZWQgIHdpdGggdGhlXG4gKiBgQXVkaW9CdWZmZXJgIG9yIGBGbG9hdDMyQXJyYXlgIGNvbnRhaW5pbmcgdGhlIHJlY29yZGVkIHNpZ25hbCBhcyBhcmd1bWVudC5cbiAqXG4gKiBAdG9kbyAtIGFkZCBvcHRpb24gdG8gcmV0dXJuIG9ubHkgdGhlIEZsb2F0MzJBcnJheSBhbmQgbm90IGFuIGF1ZGlvIGJ1ZmZlclxuICogIChub2RlIGNvbXBsaWFudCkgYHJldHJpZXZlQXVkaW9CdWZmZXI6IGZhbHNlYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTEwXSAtIE1heGltdW0gZHVyYXRpb24gb2YgdGhlIHJlY29yZGluZy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jYWxsYmFja10gLSBDYWxsYmFjayB0byBleGVjdXRlIHdoZW4gYSBuZXcgcmVjb3JkIGlzXG4gKiAgZW5kZWQuIFRoaXMgY2FuIGhhcHBlbjogYHN0b3BgIGlzIGNhbGxlZCBvbiB0aGUgcmVjb3JkZXIsIGBzdG9wYCBpcyBjYWxsZWRcbiAqICBvbiB0aGUgc291cmNlIG9yIHdoZW4gdGhlIGJ1ZmZlciBpcyBmdWxsIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gYGR1cmF0aW9uYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5pZ25vcmVMZWFkaW5nWmVyb3M9dHJ1ZV0gLSBTdGFydCB0aGUgZWZmZWN0aXZlXG4gKiAgcmVjb3JkaW5nIG9uIHRoZSBmaXJzdCBub24temVybyB2YWx1ZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMucmV0cmlldmVBdWRpb0J1ZmZlcj1mYWxzZV0gLSBEZWZpbmUgaWYgYW4gYEF1ZGlvQnVmZmVyYFxuICogIHNob3VsZCBiZSByZXRyaWV2ZWQgb3Igb25seSB0aGUgcmF3IEZsb2F0MzJBcnJheSBvZiBkYXRhLlxuICogICh3b3JrcyBvbmx5IGluIGJyb3dzZXIpXG4gKiBAcGFyYW0ge0F1ZGlvQ29udGV4dH0gW29wdGlvbnMuYXVkaW9Db250ZXh0PW51bGxdIC0gSWZcbiAqICBgcmV0cmlldmVBdWRpb0J1ZmZlcmAgaXMgc2V0IHRvIGB0cnVlYCwgYXVkaW8gY29udGV4dCB0byBiZSB1c2VkXG4gKiAgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSBmaW5hbCBhdWRpbyBidWZmZXIuXG4gKiAgKHdvcmtzIG9ubHkgaW4gYnJvd3NlcilcbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5zaW5rXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gKlxuICogbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICogICAuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSlcbiAqICAgLnRoZW4oaW5pdClcbiAqICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKSk7XG4gKlxuICogZnVuY3Rpb24gaW5pdChzdHJlYW0pIHtcbiAqICAgY29uc3Qgc291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gKlxuICogICBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAqICAgICBzb3VyY2VOb2RlOiBzb3VyY2UsXG4gKiAgICAgYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQsXG4gKiAgIH0pO1xuICpcbiAqICAgY29uc3Qgc2lnbmFsUmVjb3JkZXIgPSBuZXcgbGZvLnNpbmsuU2lnbmFsUmVjb3JkZXIoe1xuICogICAgIGR1cmF0aW9uOiA2LFxuICogICAgIHJldHJpZXZlQXVkaW9CdWZmZXI6IHRydWUsXG4gKiAgICAgYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQsXG4gKiAgICAgY2FsbGJhY2s6IChidWZmZXIpID0+IHtcbiAqICAgICAgIGNvbnN0IGJ1ZmZlclNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAqICAgICAgIGJ1ZmZlclNvdXJjZS5idWZmZXIgPSBidWZmZXI7XG4gKiAgICAgICBidWZmZXJTb3VyY2UuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICogICAgICAgYnVmZmVyU291cmNlLnN0YXJ0KCk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiAgIGF1ZGlvSW5Ob2RlLmNvbm5lY3Qoc2lnbmFsUmVjb3JkZXIpO1xuICogICBhdWRpb0luTm9kZS5zdGFydCgpO1xuICogICBzaWduYWxSZWNvcmRlci5zdGFydCgpO1xuICogfSk7XG4gKi9cbmNsYXNzIFNpZ25hbFJlY29yZGVyIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIC8qKlxuICAgICAqIERlZmluZSBpcyB0aGUgbm9kZSBpcyBjdXJyZW50bHkgcmVjb3JkaW5nIG9yIG5vdC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBuYW1lIGlzUmVjb3JkaW5nXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2luay5TaWduYWxSZWNvcmRlclxuICAgICAqL1xuICAgIHRoaXMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJldHJpZXZlQXVkaW9CdWZmZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ3JldHJpZXZlQXVkaW9CdWZmZXInKTtcbiAgICBsZXQgYXVkaW9Db250ZXh0ID0gdGhpcy5wYXJhbXMuZ2V0KCdhdWRpb0NvbnRleHQnKTtcbiAgICAvLyBuZWVkZWQgdG8gcmV0cmlldmUgYW4gQXVkaW9CdWZmZXJcbiAgICBpZiAocmV0cmlldmVBdWRpb0J1ZmZlciAmJiBhdWRpb0NvbnRleHQgPT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGFyYW1ldGVyIFwiYXVkaW9Db250ZXh0XCI6IGFuIEF1ZGlvQ29udGV4dCBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gYHJldHJpZXZlQXVkaW9CdWZmZXJgIGlzIHNldCB0byBgdHJ1ZWAnKVxuXG4gICAgdGhpcy5fYXVkaW9Db250ZXh0ID0gYXVkaW9Db250ZXh0O1xuICAgIHRoaXMuX2lnbm9yZVplcm9zID0gZmFsc2U7XG4gICAgdGhpcy5faXNJbmZpbml0ZUJ1ZmZlciA9IGZhbHNlO1xuICAgIHRoaXMuX3N0YWNrID0gW107XG4gICAgdGhpcy5fYnVmZmVyID0gbnVsbDtcbiAgICB0aGlzLl9idWZmZXJMZW5ndGggPSBudWxsO1xuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IG51bGw7XG4gIH1cblxuICBfaW5pdEJ1ZmZlcigpIHtcbiAgICB0aGlzLl9idWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuX2J1ZmZlckxlbmd0aCk7XG4gICAgdGhpcy5fc3RhY2subGVuZ3RoID0gMDtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSAwO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5wYXJhbXMuZ2V0KCdkdXJhdGlvbicpO1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlO1xuXG4gICAgaWYgKGlzRmluaXRlKGR1cmF0aW9uKSkge1xuICAgICAgdGhpcy5faXNJbmZpbml0ZUJ1ZmZlciA9IGZhbHNlO1xuICAgICAgdGhpcy5fYnVmZmVyTGVuZ3RoID0gc2FtcGxlUmF0ZSAqIGR1cmF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pc0luZmluaXRlQnVmZmVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2J1ZmZlckxlbmd0aCA9IHNhbXBsZVJhdGUgKiAxMDtcbiAgICB9XG5cbiAgICB0aGlzLl9pbml0QnVmZmVyKCk7XG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCByZWNvcmRpbmcuXG4gICAqL1xuICBzdGFydCgpIHtcbiAgICB0aGlzLmlzUmVjb3JkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9pZ25vcmVaZXJvcyA9IHRoaXMucGFyYW1zLmdldCgnaWdub3JlTGVhZGluZ1plcm9zJyk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCByZWNvcmRpbmcgYW5kIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGRlZmluZWQgaW4gcGFyYW1ldGVycy5cbiAgICovXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuaXNSZWNvcmRpbmcpIHtcbiAgICAgIC8vIGlnbm9yZSBuZXh0IGluY29tbWluZyBmcmFtZVxuICAgICAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xuXG4gICAgICBjb25zdCByZXRyaWV2ZUF1ZGlvQnVmZmVyID0gdGhpcy5wYXJhbXMuZ2V0KCdyZXRyaWV2ZUF1ZGlvQnVmZmVyJyk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMucGFyYW1zLmdldCgnY2FsbGJhY2snKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlcjtcbiAgICAgIGxldCBvdXRwdXQ7XG5cbiAgICAgIGlmICghdGhpcy5faXNJbmZpbml0ZUJ1ZmZlcikge1xuICAgICAgICBvdXRwdXQgPSBuZXcgRmxvYXQzMkFycmF5KGN1cnJlbnRJbmRleCk7XG4gICAgICAgIG91dHB1dC5zZXQoYnVmZmVyLnN1YmFycmF5KDAsIGN1cnJlbnRJbmRleCksIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYnVmZmVyTGVuZ3RoID0gdGhpcy5fYnVmZmVyTGVuZ3RoO1xuICAgICAgICBjb25zdCBzdGFjayA9IHRoaXMuX3N0YWNrO1xuXG4gICAgICAgIG91dHB1dCA9IG5ldyBGbG9hdDMyQXJyYXkoc3RhY2subGVuZ3RoICogYnVmZmVyTGVuZ3RoICsgY3VycmVudEluZGV4KTtcblxuICAgICAgICAvLyBjb3B5IGFsbCBzdGFja2VkIGJ1ZmZlcnNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHN0YWNrZWRCdWZmZXIgPSBzdGFja1tpXTtcbiAgICAgICAgICBvdXRwdXQuc2V0KHN0YWNrZWRCdWZmZXIsIGJ1ZmZlckxlbmd0aCAqIGkpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBjb3B5IGRhdGEgY29udGFpbmVkIGluIGN1cnJlbnQgYnVmZmVyXG4gICAgICAgIG91dHB1dC5zZXQoYnVmZmVyLnN1YmFycmF5KDAsIGN1cnJlbnRJbmRleCksIHN0YWNrLmxlbmd0aCAqIGJ1ZmZlckxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXRyaWV2ZUF1ZGlvQnVmZmVyICYmIHRoaXMuX2F1ZGlvQ29udGV4dCkge1xuICAgICAgICBjb25zdCBsZW5ndGggPSBvdXRwdXQubGVuZ3RoO1xuICAgICAgICBjb25zdCBzYW1wbGVSYXRlID0gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZTtcbiAgICAgICAgY29uc3QgYXVkaW9CdWZmZXIgPSB0aGlzLl9hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKDEsIGxlbmd0aCwgc2FtcGxlUmF0ZSk7XG4gICAgICAgIGNvbnN0IGNoYW5uZWxEYXRhID0gYXVkaW9CdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gICAgICAgIGNoYW5uZWxEYXRhLnNldChvdXRwdXQsIDApO1xuXG4gICAgICAgIGNhbGxiYWNrKGF1ZGlvQnVmZmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKG91dHB1dCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlaW5pdCBidWZmZXIsIHN0YWNrLCBhbmQgY3VycmVudEluZGV4XG4gICAgICB0aGlzLl9pbml0QnVmZmVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGZpbmFsaXplU3RyZWFtKGVuZFRpbWUpIHtcbiAgICB0aGlzLnN0b3AoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgaWYgKCF0aGlzLmlzUmVjb3JkaW5nKVxuICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IGJsb2NrID0gbnVsbDtcbiAgICBjb25zdCBpbnB1dCA9IGZyYW1lLmRhdGE7XG4gICAgY29uc3QgYnVmZmVyTGVuZ3RoID0gdGhpcy5fYnVmZmVyTGVuZ3RoO1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2J1ZmZlcjtcblxuICAgIGlmICh0aGlzLl9pZ25vcmVaZXJvcyA9PT0gZmFsc2UpIHtcbiAgICAgIGJsb2NrID0gbmV3IEZsb2F0MzJBcnJheShpbnB1dCk7XG4gICAgfSBlbHNlIGlmIChpbnB1dFtpbnB1dC5sZW5ndGggLSAxXSAhPT0gMCkge1xuICAgICAgLy8gZmluZCBmaXJzdCBpbmRleCB3aGVyZSB2YWx1ZSAhPT0gMFxuICAgICAgbGV0IGk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKylcbiAgICAgICAgaWYgKGlucHV0W2ldICE9PSAwKSBicmVhaztcblxuICAgICAgLy8gY29weSBub24gemVybyBzZWdtZW50XG4gICAgICBibG9jayA9IG5ldyBGbG9hdDMyQXJyYXkoaW5wdXQuc3ViYXJyYXkoaSkpO1xuICAgICAgLy8gZG9uJ3QgcmVwZWF0IHRoaXMgbG9naWMgb25jZSBhIG5vbi16ZXJvIHZhbHVlIGhhcyBiZWVuIGZvdW5kXG4gICAgICB0aGlzLl9pZ25vcmVaZXJvcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChibG9jayAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgYXZhaWxhYmxlU3BhY2UgPSBidWZmZXJMZW5ndGggLSB0aGlzLl9jdXJyZW50SW5kZXg7XG4gICAgICBsZXQgY3VycmVudEJsb2NrO1xuXG4gICAgICBpZiAoYXZhaWxhYmxlU3BhY2UgPCBibG9jay5sZW5ndGgpXG4gICAgICAgIGN1cnJlbnRCbG9jayA9IGJsb2NrLnN1YmFycmF5KDAsIGF2YWlsYWJsZVNwYWNlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgY3VycmVudEJsb2NrID0gYmxvY2s7XG5cbiAgICAgIGJ1ZmZlci5zZXQoY3VycmVudEJsb2NrLCB0aGlzLl9jdXJyZW50SW5kZXgpO1xuICAgICAgdGhpcy5fY3VycmVudEluZGV4ICs9IGN1cnJlbnRCbG9jay5sZW5ndGg7XG5cbiAgICAgIGlmICh0aGlzLl9pc0luZmluaXRlQnVmZmVyICYmIHRoaXMuX2N1cnJlbnRJbmRleCA9PT0gYnVmZmVyTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3N0YWNrLnB1c2goYnVmZmVyKTtcblxuICAgICAgICBjdXJyZW50QmxvY2sgPSBibG9jay5zdWJhcnJheShhdmFpbGFibGVTcGFjZSk7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkoYnVmZmVyTGVuZ3RoKTtcbiAgICAgICAgdGhpcy5fYnVmZmVyLnNldChjdXJyZW50QmxvY2ssIDApO1xuICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBjdXJyZW50QmxvY2subGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICAvLyAgc3RvcCBpZiB0aGUgYnVmZmVyIGlzIGZpbml0ZSBhbmQgZnVsbFxuICAgICAgaWYgKCF0aGlzLl9pc0luZmluaXRlQnVmZmVyICYmIHRoaXMuX2N1cnJlbnRJbmRleCA9PT0gYnVmZmVyTGVuZ3RoKVxuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2lnbmFsUmVjb3JkZXI7XG5cbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5pbXBvcnQgU291cmNlTWl4aW4gZnJvbSAnLi4vLi4vY29yZS9Tb3VyY2VNaXhpbic7XG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTc1NzU3OTAvZW52aXJvbm1lbnQtZGV0ZWN0aW9uLW5vZGUtanMtb3ItYnJvd3NlclxuY29uc3QgaXNOb2RlID0gbmV3IEZ1bmN0aW9uKCd0cnkgeyByZXR1cm4gdGhpcyA9PT0gZ2xvYmFsOyB9IGNhdGNoKGUpIHsgcmV0dXJuIGZhbHNlIH0nKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGltZSBpbiBzZWNvbmRzIGFjY29yZGluZyB0byB0aGUgY3VycmVudFxuICogZW52aXJvbm5lbWVudCAobm9kZSBvciBicm93c2VyKS5cbiAqIElmIHJ1bm5pbmcgaW4gbm9kZSB0aGUgdGltZSByZWx5IG9uIGBwcm9jZXNzLmhydGltZWAsIHdoaWxlIGlmIGluIHRoZSBicm93c2VyXG4gKiBpdCBpcyBwcm92aWRlZCBieSB0aGUgYGN1cnJlbnRUaW1lYCBvZiBhbiBgQXVkaW9Db250ZXh0YCwgdGhpcyBjb250ZXh0IGNhblxuICogb3B0aW9ubmFseSBiZSBwcm92aWRlZCB0byBrZWVwIHRpbWUgY29uc2lzdGVuY3kgYmV0d2VlbiBzZXZlcmFsIGBFdmVudEluYFxuICogbm9kZXMuXG4gKlxuICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IFthdWRpb0NvbnRleHQ9bnVsbF0gLSBPcHRpb25uYWwgYXVkaW8gY29udGV4dC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0VGltZUZ1bmN0aW9uKGF1ZGlvQ29udGV4dCA9IG51bGwpIHtcbiAgaWYgKGlzTm9kZSgpKSB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IHQgPSBwcm9jZXNzLmhydGltZSgpO1xuICAgICAgcmV0dXJuIHRbMF0gKyB0WzFdICogMWUtOTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gQHRvZG8gLSByZXBsYWNlIHdpdGggYHBlcmZvcm1hbmNlLm5vd2BcbiAgICBpZiAoYXVkaW9Db250ZXh0ID09PSBudWxsIHx8wqAoIWF1ZGlvQ29udGV4dCBpbnN0YW5jZW9mIEF1ZGlvQ29udGV4dCkpIHtcbiAgICAgIGNvbnN0IEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHzCoHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZTtcbiAgfVxufVxuXG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBhYnNvbHV0ZVRpbWU6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIGF1ZGlvQ29udGV4dDoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gIH0sXG4gIGZyYW1lVHlwZToge1xuICAgIHR5cGU6ICdlbnVtJyxcbiAgICBsaXN0OiBbJ3NpZ25hbCcsICd2ZWN0b3InLCAnc2NhbGFyJ10sXG4gICAgZGVmYXVsdDogJ3NpZ25hbCcsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIGZyYW1lU2l6ZToge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1pbjogMSxcbiAgICBtYXg6ICtJbmZpbml0eSwgLy8gbm90IHJlY29tbWVuZGVkLi4uXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgc2FtcGxlUmF0ZToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBtaW46IDAsXG4gICAgbWF4OiArSW5maW5pdHksIC8vIHNhbWUgaGVyZVxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIGZyYW1lUmF0ZToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBtaW46IDAsXG4gICAgbWF4OiArSW5maW5pdHksIC8vIHNhbWUgaGVyZVxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIGRlc2NyaXB0aW9uOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgYEV2ZW50SW5gIG9wZXJhdG9yIGFsbG93cyB0byBtYW51YWxseSBjcmVhdGUgYSBzdHJlYW0gb2YgZGF0YSBvciB0byBmZWVkXG4gKiBhIHN0cmVhbSBmcm9tIGFub3RoZXIgc291cmNlIChlLmcuIHNlbnNvcnMpIGludG8gYSBwcm9jZXNzaW5nIGdyYXBoLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgcGFyYW1ldGVycycgZGVmYXVsdCB2YWx1ZXMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuZnJhbWVUeXBlPSdzaWduYWwnXSAtIFR5cGUgb2YgdGhlIGlucHV0IC0gYWxsb3dlZFxuICogdmFsdWVzOiBgc2lnbmFsYCwgIGB2ZWN0b3JgIG9yIGBzY2FsYXJgLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmZyYW1lU2l6ZT0xXSAtIFNpemUgb2YgdGhlIG91dHB1dCBmcmFtZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zYW1wbGVSYXRlPW51bGxdIC0gU2FtcGxlIHJhdGUgb2YgdGhlIHNvdXJjZSBzdHJlYW0sXG4gKiAgaWYgb2YgdHlwZSBgc2lnbmFsYC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5mcmFtZVJhdGU9bnVsbF0gLSBSYXRlIG9mIHRoZSBzb3VyY2Ugc3RyZWFtLCBpZiBvZlxuICogIHR5cGUgYHZlY3RvcmAuXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gW29wdGlvbnMuZGVzY3JpcHRpb25dIC0gT3B0aW9ubmFsIGRlc2NyaXB0aW9uXG4gKiAgZGVzY3JpYmluZyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgb3V0cHV0IGZyYW1lXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFic29sdXRlVGltZT1mYWxzZV0gLSBEZWZpbmUgaWYgdGltZSBzaG91bGQgYmUgdXNlZFxuICogIGFzIGZvcndhcmRlZCBhcyBnaXZlbiBpbiB0aGUgcHJvY2VzcyBtZXRob2QsIG9yIHJlbGF0aXZlbHkgdG8gdGhlIHRpbWUgb2ZcbiAqICB0aGUgZmlyc3QgYHByb2Nlc3NgIGNhbGwgYWZ0ZXIgc3RhcnQuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uc291cmNlXG4gKlxuICogQHRvZG8gLSBBZGQgYSBgbG9naWNhbFRpbWVgIHBhcmFtZXRlciB0byB0YWcgZnJhbWUgYWNjb3JkaW5nIHRvIGZyYW1lIHJhdGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3ZlY3RvcicsXG4gKiAgIGZyYW1lU2l6ZTogMyxcbiAqICAgZnJhbWVSYXRlOiAxIC8gNTAsXG4gKiAgIGRlc2NyaXB0aW9uOiBbJ2FscGhhJywgJ2JldGEnLCAnZ2FtbWEnXSxcbiAqIH0pO1xuICpcbiAqIC8vIGNvbm5lY3Qgc291cmNlIHRvIG9wZXJhdG9ycyBhbmQgc2luayhzKVxuICpcbiAqIC8vIGluaXRpYWxpemUgYW5kIHN0YXJ0IHRoZSBncmFwaFxuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIC8vIGZlZWQgYGRldmljZW9yaWVudGF0aW9uYCBkYXRhIGludG8gdGhlIGdyYXBoXG4gKiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCAoZSkgPT4ge1xuICogICBjb25zdCBmcmFtZSA9IHtcbiAqICAgICB0aW1lOiB3aW5kb3cucGVyZm9ybWFjZS5ub3coKSAvIDEwMDAsXG4gKiAgICAgZGF0YTogW2UuYWxwaGEsIGUuYmV0YSwgZS5nYW1tYV0sXG4gKiAgIH07XG4gKlxuICogICBldmVudEluLnByb2Nlc3NGcmFtZShmcmFtZSk7XG4gKiB9LCBmYWxzZSk7XG4gKi9cbmNsYXNzIEV2ZW50SW4gZXh0ZW5kcyBTb3VyY2VNaXhpbihCYXNlTGZvKSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IGF1ZGlvQ29udGV4dCA9IHRoaXMucGFyYW1zLmdldCgnYXVkaW9Db250ZXh0Jyk7XG4gICAgdGhpcy5fZ2V0VGltZSA9IGdldFRpbWVGdW5jdGlvbihhdWRpb0NvbnRleHQpO1xuICAgIHRoaXMuX3N0YXJ0VGltZSA9IG51bGw7XG4gICAgdGhpcy5fc3lzdGVtVGltZSA9IG51bGw7XG4gICAgdGhpcy5fYWJzb2x1dGVUaW1lID0gdGhpcy5wYXJhbXMuZ2V0KCdhYnNvbHV0ZVRpbWUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9wYWdhdGUgdGhlIGBzdHJlYW1QYXJhbXNgIGluIHRoZSBncmFwaCBhbmQgYWxsb3cgdG8gcHVzaCBmcmFtZXMgaW50b1xuICAgKiB0aGUgZ3JhcGguIEFueSBjYWxsIHRvIGBwcm9jZXNzYCBvciBgcHJvY2Vzc0ZyYW1lYCBiZWZvcmUgYHN0YXJ0YCB3aWxsIGJlXG4gICAqIGlnbm9yZWQuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NTdHJlYW1QYXJhbXN9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Jlc2V0U3RyZWFtfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLnNvdXJjZS5FdmVudEluI3N0b3B9XG4gICAqL1xuICBzdGFydChzdGFydFRpbWUgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQgPT09IGZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5pbml0UHJvbWlzZSA9PT0gbnVsbCkgLy8gaW5pdCBoYXMgbm90IHlldCBiZWVuIGNhbGxlZFxuICAgICAgICB0aGlzLmluaXRQcm9taXNlID0gdGhpcy5pbml0KCk7XG5cbiAgICAgIHRoaXMuaW5pdFByb21pc2UudGhlbigoKSA9PiB0aGlzLnN0YXJ0KHN0YXJ0VGltZSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3N0YXJ0VGltZSA9IHN0YXJ0VGltZTtcbiAgICB0aGlzLl9zeXN0ZW1UaW1lID0gbnVsbDsgLy8gdmFsdWUgc2V0IGluIHRoZSBmaXJzdCBgcHJvY2Vzc2AgY2FsbFxuXG4gICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5hbGl6ZSB0aGUgc3RyZWFtIGFuZCBzdG9wIHRoZSB3aG9sZSBncmFwaC4gQW55IGNhbGwgdG8gYHByb2Nlc3NgIG9yXG4gICAqIGBwcm9jZXNzRnJhbWVgIGFmdGVyIGBzdG9wYCB3aWxsIGJlIGlnbm9yZWQuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2ZpbmFsaXplU3RyZWFtfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLnNvdXJjZS5FdmVudEluI3N0YXJ0fVxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5zdGFydGVkICYmIHRoaXMuX3N0YXJ0VGltZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSB0aGlzLl9nZXRUaW1lKCk7XG4gICAgICBjb25zdCBlbmRUaW1lID0gdGhpcy5mcmFtZS50aW1lICsgKGN1cnJlbnRUaW1lIC0gdGhpcy5fc3lzdGVtVGltZSk7XG5cbiAgICAgIHRoaXMuZmluYWxpemVTdHJlYW0oZW5kVGltZSk7XG4gICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcygpIHtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZyYW1lU2l6ZScpO1xuICAgIGNvbnN0IGZyYW1lVHlwZSA9IHRoaXMucGFyYW1zLmdldCgnZnJhbWVUeXBlJyk7XG4gICAgY29uc3Qgc2FtcGxlUmF0ZSA9IHRoaXMucGFyYW1zLmdldCgnc2FtcGxlUmF0ZScpO1xuICAgIGNvbnN0IGZyYW1lUmF0ZSA9IHRoaXMucGFyYW1zLmdldCgnZnJhbWVSYXRlJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB0aGlzLnBhcmFtcy5nZXQoJ2Rlc2NyaXB0aW9uJyk7XG4gICAgLy8gaW5pdCBvcGVyYXRvcidzIHN0cmVhbSBwYXJhbXNcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBmcmFtZVR5cGUgPT09ICdzY2FsYXInID8gMSA6IGZyYW1lU2l6ZTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSBmcmFtZVR5cGU7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcblxuICAgIGlmIChmcmFtZVR5cGUgPT09ICdzaWduYWwnKSB7XG4gICAgICBpZiAoc2FtcGxlUmF0ZSA9PT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmRlZmluZWQgXCJzYW1wbGVSYXRlXCIgZm9yIFwic2lnbmFsXCIgc3RyZWFtJyk7XG5cbiAgICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGUgPSBzYW1wbGVSYXRlO1xuICAgICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVSYXRlID0gc2FtcGxlUmF0ZSAvIGZyYW1lU2l6ZTtcbiAgICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZUNvdW50ID0gZnJhbWVTaXplO1xuXG4gICAgfSBlbHNlIGlmIChmcmFtZVR5cGUgPT09ICd2ZWN0b3InIHx8IGZyYW1lVHlwZSA9PT0gJ3NjYWxhcicpIHtcbiAgICAgIGlmIChmcmFtZVJhdGUgPT09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5kZWZpbmVkIFwiZnJhbWVSYXRlXCIgZm9yIFwidmVjdG9yXCIgc3RyZWFtJyk7XG5cbiAgICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZSA9IGZyYW1lUmF0ZTtcbiAgICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGUgPSBmcmFtZVJhdGU7XG4gICAgICB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVDb3VudCA9IDE7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzRnVuY3Rpb24oZnJhbWUpIHtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IHRoaXMuX2dldFRpbWUoKTtcbiAgICBjb25zdCBpbkRhdGEgPSBmcmFtZS5kYXRhLmxlbmd0aCA/IGZyYW1lLmRhdGEgOiBbZnJhbWUuZGF0YV07XG4gICAgY29uc3Qgb3V0RGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICAvLyBpZiBubyB0aW1lIHByb3ZpZGVkLCB1c2Ugc3lzdGVtIHRpbWVcbiAgICBsZXQgdGltZSA9IE51bWJlci5pc0Zpbml0ZShmcmFtZS50aW1lKSA/IGZyYW1lLnRpbWUgOiBjdXJyZW50VGltZTtcblxuICAgIGlmICh0aGlzLl9zdGFydFRpbWUgPT09IG51bGwpXG4gICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuX2Fic29sdXRlVGltZSA9PT0gZmFsc2UpXG4gICAgICB0aW1lID0gdGltZSAtIHRoaXMuX3N0YXJ0VGltZTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplOyBpIDwgbDsgaSsrKVxuICAgICAgb3V0RGF0YVtpXSA9IGluRGF0YVtpXTtcblxuICAgIHRoaXMuZnJhbWUudGltZSA9IHRpbWU7XG4gICAgdGhpcy5mcmFtZS5tZXRhZGF0YSA9IGZyYW1lLm1ldGFkYXRhO1xuICAgIC8vIHN0b3JlIGN1cnJlbnQgdGltZSB0byBjb21wdXRlIGBlbmRUaW1lYCBvbiBzdG9wXG4gICAgdGhpcy5fc3lzdGVtVGltZSA9IGN1cnJlbnRUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsdGVybmF0aXZlIGludGVyZmFjZSB0byBwcm9wYWdhdGUgYSBmcmFtZSBpbiB0aGUgZ3JhcGguIFBhY2sgYHRpbWVgLFxuICAgKiBgZGF0YWAgYW5kIGBtZXRhZGF0YWAgaW4gYSBmcmFtZSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIC0gRnJhbWUgdGltZS5cbiAgICogQHBhcmFtIHtGbG9hdDMyQXJyYXl8QXJyYXl9IGRhdGEgLSBGcmFtZSBkYXRhLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbWV0YWRhdGEgLSBPcHRpb25uYWwgZnJhbWUgbWV0YWRhdGEuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGV2ZW50SW4ucHJvY2VzcygxLCBbMCwgMSwgMl0pO1xuICAgKiAvLyBpcyBlcXVpdmFsZW50IHRvXG4gICAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKHsgdGltZTogMSwgZGF0YTogWzAsIDEsIDJdIH0pO1xuICAgKi9cbiAgcHJvY2Vzcyh0aW1lLCBkYXRhLCBtZXRhZGF0YSA9IG51bGwpIHtcbiAgICB0aGlzLnByb2Nlc3NGcmFtZSh7IHRpbWUsIGRhdGEsIG1ldGFkYXRhIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3BhZ2F0ZSBhIGZyYW1lIG9iamVjdCBpbiB0aGUgZ3JhcGguXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmcmFtZSAtIElucHV0IGZyYW1lLlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnJhbWUudGltZSAtIEZyYW1lIHRpbWUuXG4gICAqIEBwYXJhbSB7RmxvYXQzMkFycmF5fEFycmF5fSBmcmFtZS5kYXRhIC0gRnJhbWUgZGF0YS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtmcmFtZS5tZXRhZGF0YT11bmRlZmluZWRdIC0gT3B0aW9ubmFsIGZyYW1lIG1ldGFkYXRhLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBldmVudEluLnByb2Nlc3NGcmFtZSh7IHRpbWU6IDEsIGRhdGE6IFswLCAxLCAyXSB9KTtcbiAgICovXG4gIHByb2Nlc3NGcmFtZShmcmFtZSkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSByZXR1cm47XG5cbiAgICB0aGlzLnByZXBhcmVGcmFtZSgpO1xuICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUZyYW1lKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRJbjtcbiIsIlxuLy8gc2hvcnRjdXRzIC8gaGVscGVyc1xuY29uc3QgUEkgICA9IE1hdGguUEk7XG5jb25zdCBjb3MgID0gTWF0aC5jb3M7XG5jb25zdCBzaW4gID0gTWF0aC5zaW47XG5jb25zdCBzcXJ0ID0gTWF0aC5zcXJ0O1xuXG4vLyB3aW5kb3cgY3JlYXRpb24gZnVuY3Rpb25zXG5mdW5jdGlvbiBpbml0SGFubldpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcykge1xuICBsZXQgbGluU3VtID0gMDtcbiAgbGV0IHBvd1N1bSA9IDA7XG4gIGNvbnN0IHN0ZXAgPSAyICogUEkgLyBzaXplO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgY29uc3QgcGhpID0gaSAqIHN0ZXA7XG4gICAgY29uc3QgdmFsdWUgPSAwLjUgLSAwLjUgKiBjb3MocGhpKTtcblxuICAgIGJ1ZmZlcltpXSA9IHZhbHVlO1xuXG4gICAgbGluU3VtICs9IHZhbHVlO1xuICAgIHBvd1N1bSArPSB2YWx1ZSAqIHZhbHVlO1xuICB9XG5cbiAgbm9ybUNvZWZzLmxpbmVhciA9IHNpemUgLyBsaW5TdW07XG4gIG5vcm1Db2Vmcy5wb3dlciA9IHNxcnQoc2l6ZSAvIHBvd1N1bSk7XG59XG5cbmZ1bmN0aW9uIGluaXRIYW1taW5nV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKSB7XG4gIGxldCBsaW5TdW0gPSAwO1xuICBsZXQgcG93U3VtID0gMDtcbiAgY29uc3Qgc3RlcCA9IDIgKiBQSSAvIHNpemU7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBjb25zdCBwaGkgPSBpICogc3RlcDtcbiAgICBjb25zdCB2YWx1ZSA9IDAuNTQgLSAwLjQ2ICogY29zKHBoaSk7XG5cbiAgICBidWZmZXJbaV0gPSB2YWx1ZTtcblxuICAgIGxpblN1bSArPSB2YWx1ZTtcbiAgICBwb3dTdW0gKz0gdmFsdWUgKiB2YWx1ZTtcbiAgfVxuXG4gIG5vcm1Db2Vmcy5saW5lYXIgPSBzaXplIC8gbGluU3VtO1xuICBub3JtQ29lZnMucG93ZXIgPSBzcXJ0KHNpemUgLyBwb3dTdW0pO1xufVxuXG5mdW5jdGlvbiBpbml0QmxhY2ttYW5XaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpIHtcbiAgbGV0IGxpblN1bSA9IDA7XG4gIGxldCBwb3dTdW0gPSAwO1xuICBjb25zdCBzdGVwID0gMiAqIFBJIC8gc2l6ZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGNvbnN0IHBoaSA9IGkgKiBzdGVwO1xuICAgIGNvbnN0IHZhbHVlID0gMC40MiAtIDAuNSAqIGNvcyhwaGkpICsgMC4wOCAqIGNvcygyICogcGhpKTtcblxuICAgIGJ1ZmZlcltpXSA9IHZhbHVlO1xuXG4gICAgbGluU3VtICs9IHZhbHVlO1xuICAgIHBvd1N1bSArPSB2YWx1ZSAqIHZhbHVlO1xuICB9XG5cbiAgbm9ybUNvZWZzLmxpbmVhciA9IHNpemUgLyBsaW5TdW07XG4gIG5vcm1Db2Vmcy5wb3dlciA9IHNxcnQoc2l6ZSAvIHBvd1N1bSk7XG59XG5cbmZ1bmN0aW9uIGluaXRCbGFja21hbkhhcnJpc1dpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcykge1xuICBsZXQgbGluU3VtID0gMDtcbiAgbGV0IHBvd1N1bSA9IDA7XG4gIGNvbnN0IGEwID0gMC4zNTg3NTtcbiAgY29uc3QgYTEgPSAwLjQ4ODI5O1xuICBjb25zdCBhMiA9IDAuMTQxMjg7XG4gIGNvbnN0IGEzID0gMC4wMTE2ODtcbiAgY29uc3Qgc3RlcCA9IDIgKiBQSSAvIHNpemU7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBjb25zdCBwaGkgPSBpICogc3RlcDtcbiAgICBjb25zdCB2YWx1ZSA9IGEwIC0gYTEgKiBjb3MocGhpKSArIGEyICogY29zKDIgKiBwaGkpOyAtIGEzICogY29zKDMgKiBwaGkpO1xuXG4gICAgYnVmZmVyW2ldID0gdmFsdWU7XG5cbiAgICBsaW5TdW0gKz0gdmFsdWU7XG4gICAgcG93U3VtICs9IHZhbHVlICogdmFsdWU7XG4gIH1cblxuICBub3JtQ29lZnMubGluZWFyID0gc2l6ZSAvIGxpblN1bTtcbiAgbm9ybUNvZWZzLnBvd2VyID0gc3FydChzaXplIC8gcG93U3VtKTtcbn1cblxuZnVuY3Rpb24gaW5pdFNpbmVXaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpIHtcbiAgbGV0IGxpblN1bSA9IDA7XG4gIGxldCBwb3dTdW0gPSAwO1xuICBjb25zdCBzdGVwID0gUEkgLyBzaXplO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgY29uc3QgcGhpID0gaSAqIHN0ZXA7XG4gICAgY29uc3QgdmFsdWUgPSBzaW4ocGhpKTtcblxuICAgIGJ1ZmZlcltpXSA9IHZhbHVlO1xuXG4gICAgbGluU3VtICs9IHZhbHVlO1xuICAgIHBvd1N1bSArPSB2YWx1ZSAqIHZhbHVlO1xuICB9XG5cbiAgbm9ybUNvZWZzLmxpbmVhciA9IHNpemUgLyBsaW5TdW07XG4gIG5vcm1Db2Vmcy5wb3dlciA9IHNxcnQoc2l6ZSAvIHBvd1N1bSk7XG59XG5cbmZ1bmN0aW9uIGluaXRSZWN0YW5nbGVXaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspXG4gICAgYnVmZmVyW2ldID0gMTtcblxuICAvLyBAdG9kbyAtIGNoZWNrIGlmIHRoZXNlIGFyZSBwcm9wZXIgdmFsdWVzXG4gIG5vcm1Db2Vmcy5saW5lYXIgPSAxO1xuICBub3JtQ29lZnMucG93ZXIgPSAxO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGJ1ZmZlciB3aXRoIHdpbmRvdyBzaWduYWwuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24udXRpbHNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIHdpbmRvdy5cbiAqIEBwYXJhbSB7RmxvYXQzMkFycmF5fSBidWZmZXIgLSBCdWZmZXIgdG8gYmUgcG9wdWxhdGVkIHdpdGggdGhlIHdpbmRvdyBzaWduYWwuXG4gKiBAcGFyYW0ge051bWJlcn0gc2l6ZSAtIFNpemUgb2YgdGhlIGJ1ZmZlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBub3JtQ29lZnMgLSBPYmplY3QgdG8gYmUgcG9wdWxhdGVkIHdpdGggdGhlIG5vcm1haWx6YXRpb25cbiAqICBjb2VmZmljaWVudHMuXG4gKi9cbmZ1bmN0aW9uIGluaXRXaW5kb3cobmFtZSwgYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpIHtcbiAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlICdoYW5uJzpcbiAgICBjYXNlICdoYW5uaW5nJzpcbiAgICAgIGluaXRIYW5uV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2hhbW1pbmcnOlxuICAgICAgaW5pdEhhbW1pbmdXaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmxhY2ttYW4nOlxuICAgICAgaW5pdEJsYWNrbWFuV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JsYWNrbWFuaGFycmlzJzpcbiAgICAgIGluaXRCbGFja21hbkhhcnJpc1dpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzaW5lJzpcbiAgICAgIGluaXRTaW5lV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlY3RhbmdsZSc6XG4gICAgICBpbml0UmVjdGFuZ2xlV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRXaW5kb3c7XG5cblxuIiwiLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzg2MDkyODkvY29udmVydC1hLWJpbmFyeS1ub2RlanMtYnVmZmVyLXRvLWphdmFzY3JpcHQtYXJyYXlidWZmZXJcbi8vIGNvbnZlcnRzIGEgbm9kZWpzIEJ1ZmZlciB0byBBcnJheUJ1ZmZlclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlclRvQXJyYXlCdWZmZXIoYnVmZmVyKSB7XG4vLyAgIGNvbnN0IGFiID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlci5sZW5ndGgpO1xuLy8gICBjb25zdCB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuXG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyLmxlbmd0aDsgKytpKVxuLy8gICAgIHZpZXdbaV0gPSBidWZmZXJbaV07XG5cbi8vICAgcmV0dXJuIGFiO1xuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gYXJyYXlCdWZmZXJUb0J1ZmZlcihhcnJheUJ1ZmZlcikge1xuLy8gICBjb25zdCBidWZmZXIgPSBuZXcgQnVmZmVyKGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuLy8gICBjb25zdCB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuXG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyLmxlbmd0aDsgKytpKVxuLy8gICAgIGJ1ZmZlcltpXSA9IHZpZXdbaV07XG5cbi8vICAgcmV0dXJuIGJ1ZmZlcjtcbi8vIH1cblxuLy8gaHR0cDovL3VwZGF0ZXMuaHRtbDVyb2Nrcy5jb20vMjAxMi8wNi9Ib3ctdG8tY29udmVydC1BcnJheUJ1ZmZlci10by1hbmQtZnJvbS1TdHJpbmdcbmZ1bmN0aW9uIFVpbnQxNkFycmF5Mmpzb24oYXJyKSB7XG4gIGNvbnN0IHN0ciA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgYXJyKTtcbiAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyLnJlcGxhY2UoL1xcdTAwMDAvZywgJycpKVxufVxuXG5mdW5jdGlvbiBqc29uMlVpbnQxNkFycmF5KGpzb24pIHtcbiAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG4gIGNvbnN0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoICogMik7IC8vIDIgYnl0ZXMgZm9yIGVhY2ggY2hhclxuICBjb25zdCBidWZmZXJWaWV3ID0gbmV3IFVpbnQxNkFycmF5KGJ1ZmZlcik7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgIGJ1ZmZlclZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcblxuICByZXR1cm4gYnVmZmVyVmlldztcbn1cblxuXG5leHBvcnQgY29uc3Qgb3Bjb2RlcyA9IHtcbiAgSU5JVF9NT0RVTEVfUkVROiAxMCxcbiAgSU5JVF9NT0RVTEVfQUNLOiAxMSxcbiAgUFJPQ0VTU19TVFJFQU1fUEFSQU1TOiAxMixcbiAgUkVTRVRfU1RSRUFNOiAxMyxcbiAgRklOQUxJWkVfU1RSRUFNOiAxNCxcbiAgUFJPQ0VTU19GUkFNRTogMTVcbn1cblxuLy9cbmV4cG9ydCBjb25zdCBlbmNvZGVycyA9IHtcbiAgb3Bjb2RlKG5hbWUpIHtcbiAgICBjb25zdCBvcGNvZGUgPSBvcGNvZGVzW25hbWVdO1xuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBVaW50MTZBcnJheSgxKTtcbiAgICBidWZmZXJbMF0gPSBvcGNvZGU7XG5cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9LFxuICAvLyBgb3Bjb2RlYCAgICAyIGJ5dGVzIChVaW50MTYpIHxcbiAgaW5pdE1vZHVsZVJlcTogZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGVuY29kZXJzLm9wY29kZSgnSU5JVF9NT0RVTEVfUkVRJyk7XG4gICAgcmV0dXJuIHBheWxvYWQuYnVmZmVyO1xuICB9LFxuICAvLyBgb3Bjb2RlYCAgICAyIGJ5dGVzIChVaW50MTYpIHxcbiAgaW5pdE1vZHVsZUFjazogZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGVuY29kZXJzLm9wY29kZSgnSU5JVF9NT0RVTEVfQUNLJyk7XG4gICAgcmV0dXJuIHBheWxvYWQuYnVmZmVyO1xuICB9LFxuICAvLyBgb3Bjb2RlYCAgICAyIGJ5dGVzIChVaW50MTYpIHxcbiAgLy8gYHN0cmVhbVBhcmFtc2AgIG4gYnl0ZXMgKFVpbnQxNilcbiAgc3RyZWFtUGFyYW1zOiBmdW5jdGlvbihzdHJlYW1QYXJhbXMpIHtcbiAgICBjb25zdCBvcGNvZGUgPSBlbmNvZGVycy5vcGNvZGUoJ1BST0NFU1NfU1RSRUFNX1BBUkFNUycpO1xuICAgIGNvbnN0IHN0cmVhbVBhcmFtc0J1ZmZlciA9IGpzb24yVWludDE2QXJyYXkoc3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSBuZXcgVWludDE2QXJyYXkoMSArIHN0cmVhbVBhcmFtc0J1ZmZlci5sZW5ndGgpO1xuICAgIHBheWxvYWQuc2V0KG9wY29kZSwgMCk7XG4gICAgcGF5bG9hZC5zZXQoc3RyZWFtUGFyYW1zQnVmZmVyLCAxKTtcblxuICAgIHJldHVybiBwYXlsb2FkLmJ1ZmZlcjtcbiAgfSxcbiAgLy8gYG9wY29kZWAgICAgMiBieXRlcyAoVWludDE2KSB8XG4gIHJlc2V0U3RyZWFtOiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBwYXlsb2FkID0gZW5jb2RlcnMub3Bjb2RlKCdSRVNFVF9TVFJFQU0nKTtcbiAgICByZXR1cm4gcGF5bG9hZC5idWZmZXI7XG4gIH0sXG4gIC8vIGBvcGNvZGVgICAgIDIgYnl0ZXMgKFVpbnQxNikgfFxuICAvLyBgZW5kVGltZWAgICA4IGJ5dGVzIChGbG9hdDY0KVxuICBmaW5hbGl6ZVN0cmVhbTogZnVuY3Rpb24oZW5kVGltZSkge1xuICAgIGNvbnN0IG9wY29kZSA9IGVuY29kZXJzLm9wY29kZSgnUkVTRVRfU1RSRUFNJyk7XG5cbiAgICBjb25zdCBlbmRUaW1lQnVmZmVyID0gbmV3IEZsb2F0NjRBcnJheSgxKTtcbiAgICBlbmRUaW1lQnVmZmVyWzBdID0gZW5kVGltZTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSBuZXcgVWludDE2QXJyYXkoMSArIDQpO1xuICAgIHBheWxvYWQuc2V0KG9wY29kZSwgMCk7XG4gICAgcGF5bG9hZC5zZXQobmV3IFVpbnQxNkFycmF5KGVuZFRpbWVCdWZmZXIuYnVmZmVyKSwgMSk7XG5cbiAgICByZXR1cm4gcGF5bG9hZC5idWZmZXI7XG4gIH0sXG4gIC8vIGBvcGNvZGVgICAgIDIgYnl0ZXMgKFVpbnQxNikgfFxuICAvLyBgdGltZWAgICAgICA4IGJ5dGVzIChGbG9hdDY0KSB8XG4gIC8vIGBkYXRhYCAgICAgIGZyYW1lU2l6ZSAqIDQgKEZsb2F0MzIpIHxcbiAgLy8gYG1ldGFkYXRhYCAgbiBieXRlcyAoVWludDE2KVxuICBwcm9jZXNzRnJhbWU6IGZ1bmN0aW9uKGZyYW1lLCBmcmFtZVNpemUpIHtcbiAgICBjb25zdCBvcGNvZGUgPSBlbmNvZGVycy5vcGNvZGUoJ1BST0NFU1NfRlJBTUUnKTtcblxuICAgIGNvbnN0IHRpbWUgPSBuZXcgRmxvYXQ2NEFycmF5KDEpO1xuICAgIHRpbWVbMF0gPSBmcmFtZS50aW1lO1xuXG4gICAgY29uc3QgZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoZnJhbWVTaXplKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lU2l6ZTsgaSsrKVxuICAgICAgZGF0YVtpXSA9IGZyYW1lLmRhdGFbaV07XG5cbiAgICBjb25zdCBtZXRhZGF0YSA9IGpzb24yVWludDE2QXJyYXkoZnJhbWUubWV0YWRhdGEpO1xuXG4gICAgY29uc3QgbGVuZ3RoID0gMSArIDQgKyAoMiAqIGZyYW1lU2l6ZSkgKyBtZXRhZGF0YS5sZW5ndGg7XG4gICAgY29uc3QgcGF5bG9hZCA9IG5ldyBVaW50MTZBcnJheShsZW5ndGgpO1xuICAgIHBheWxvYWQuc2V0KG9wY29kZSwgMCk7XG4gICAgcGF5bG9hZC5zZXQobmV3IFVpbnQxNkFycmF5KHRpbWUuYnVmZmVyKSwgMSk7XG4gICAgcGF5bG9hZC5zZXQobmV3IFVpbnQxNkFycmF5KGRhdGEuYnVmZmVyKSwgMSArIDQpO1xuICAgIHBheWxvYWQuc2V0KG1ldGFkYXRhLCAxICsgNCArICgyICogZnJhbWVTaXplKSk7XG5cbiAgICByZXR1cm4gcGF5bG9hZC5idWZmZXI7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRlY29kZXJzID0ge1xuICBvcGNvZGUoYXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQxNkFycmF5KGFycmF5QnVmZmVyKVswXTtcbiAgfSxcbiAgLy8gYG9wY29kZWAgICAgMiBieXRlcyAoVWludDE2KSB8XG4gIC8vIGBzdHJlYW1QYXJhbXNgICBuIGJ5dGVzIChVaW50MTYpXG4gIHN0cmVhbVBhcmFtcyhhcnJheUJ1ZmZlcikge1xuICAgIGNvbnN0IHBheWxvYWQgPSBuZXcgVWludDE2QXJyYXkoYXJyYXlCdWZmZXIuc2xpY2UoMikpO1xuICAgIGNvbnN0IHByZXZTdHJlYW1QYXJhbXMgPSBVaW50MTZBcnJheTJqc29uKHBheWxvYWQpO1xuICAgIHJldHVybiBwcmV2U3RyZWFtUGFyYW1zO1xuICB9LFxuICAvLyBgb3Bjb2RlYCAgICAyIGJ5dGVzIChVaW50MTYpIHxcbiAgLy8gYGVuZFRpbWVgICAgOCBieXRlcyAoRmxvYXQ2NClcbiAgZmluYWxpemVTdHJlYW0oYXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gbmV3IEZsb2F0NjRBcnJheShhcnJheUJ1ZmZlci5zbGljZSgyKSlbMF07XG4gIH0sXG4gIC8vIGBvcGNvZGVgICAgIDIgYnl0ZXMgKFVpbnQxNikgfFxuICAvLyBgdGltZWAgICAgICA4IGJ5dGVzIChGbG9hdDY0KSB8XG4gIC8vIGBkYXRhYCAgICAgIGZyYW1lU2l6ZSAqIDQgKEZsb2F0MzIpIHxcbiAgLy8gYG1ldGFkYXRhYCAgbiBieXRlcyAoVWludDE2KVxuICBwcm9jZXNzRnJhbWUoYXJyYXlCdWZmZXIsIGZyYW1lU2l6ZSkge1xuICAgICAgLy8gMSAqIDggYnl0ZXNcbiAgICAgIGNvbnN0IHRpbWVTdGFydCA9IDI7XG4gICAgICBjb25zdCB0aW1lRW5kID0gdGltZVN0YXJ0ICsgODtcbiAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRmxvYXQ2NEFycmF5KGFycmF5QnVmZmVyLnNsaWNlKHRpbWVTdGFydCwgdGltZUVuZCkpWzBdO1xuICAgICAgLy8gZnJhbWVTaXplICogNCBieXRlc1xuICAgICAgY29uc3QgZGF0YVN0YXJ0ID0gdGltZUVuZDtcbiAgICAgIGNvbnN0IGRhdGFFbmQgPSBkYXRhU3RhcnQgKyA0ICogZnJhbWVTaXplO1xuICAgICAgY29uc3QgZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoYXJyYXlCdWZmZXIuc2xpY2UoZGF0YVN0YXJ0LCBkYXRhRW5kKSk7XG4gICAgICAvLyByZXN0IG9mIHBheWxvYWRcbiAgICAgIGNvbnN0IG1ldGFTdGFydCA9IGRhdGFFbmQ7XG4gICAgICBjb25zdCBtZXRhQnVmZmVyID0gbmV3IFVpbnQxNkFycmF5KGFycmF5QnVmZmVyLnNsaWNlKG1ldGFTdGFydCkpO1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSBVaW50MTZBcnJheTJqc29uKG1ldGFCdWZmZXIpO1xuXG4gICAgICByZXR1cm4geyB0aW1lLCBkYXRhLCBtZXRhZGF0YSB9O1xuICB9XG59XG4iLCJpbXBvcnQgcGFyYW1ldGVycyBmcm9tICdwYXJhbWV0ZXJzJztcblxubGV0IGlkID0gMDtcblxuLyoqXG4gKiBCYXNlIGBsZm9gIGNsYXNzIHRvIGJlIGV4dGVuZGVkIGluIG9yZGVyIHRvIGNyZWF0ZSBuZXcgbm9kZXMuXG4gKlxuICogTm9kZXMgYXJlIGRpdmlkZWQgaW4gMyBjYXRlZ29yaWVzOlxuICogLSAqKmBzb3VyY2VgKiogYXJlIHJlc3BvbnNpYmxlIGZvciBhY3F1ZXJpbmcgYSBzaWduYWwgYW5kIGl0cyBwcm9wZXJ0aWVzXG4gKiAgIChmcmFtZVJhdGUsIGZyYW1lU2l6ZSwgZXRjLilcbiAqIC0gKipgc2lua2AqKiBhcmUgZW5kcG9pbnRzIG9mIHRoZSBncmFwaCwgc3VjaCBub2RlcyBjYW4gYmUgcmVjb3JkZXJzLFxuICogICB2aXN1YWxpemVycywgZXRjLlxuICogLSAqKmBvcGVyYXRvcmAqKiBhcmUgdXNlZCB0byBtYWtlIGNvbXB1dGF0aW9uIG9uIHRoZSBpbnB1dCBzaWduYWwgYW5kXG4gKiAgIGZvcndhcmQgdGhlIHJlc3VsdHMgYmVsb3cgaW4gdGhlIGdyYXBoLlxuICpcbiAqIEluIG1vc3QgY2FzZXMgdGhlIG1ldGhvZHMgdG8gb3ZlcnJpZGUgLyBleHRlbmQgYXJlOlxuICogLSB0aGUgKipgY29uc3RydWN0b3JgKiogdG8gZGVmaW5lIHRoZSBwYXJhbWV0ZXJzIG9mIHRoZSBuZXcgbGZvIG5vZGUuXG4gKiAtIHRoZSAqKmBwcm9jZXNzU3RyZWFtUGFyYW1zYCoqIG1ldGhvZCB0byBkZWZpbmUgaG93IHRoZSBub2RlIG1vZGlmeSB0aGVcbiAqICAgc3RyZWFtIGF0dHJpYnV0ZXMgKGUuZy4gYnkgY2hhbmdpbmcgdGhlIGZyYW1lIHNpemUpXG4gKiAtIHRoZSAqKmBwcm9jZXNze0ZyYW1lVHlwZX1gKiogbWV0aG9kIHRvIGRlZmluZSB0aGUgb3BlcmF0aW9ucyB0aGF0IHRoZVxuICogICBub2RlIGFwcGx5IG9uIHRoZSBzdHJlYW0uIFRoZSB0eXBlIG9mIGlucHV0IGEgbm9kZSBjYW4gaGFuZGxlIGlzIGRlZmluZWRcbiAqICAgYnkgaXRzIGltcGxlbWVudGVkIGludGVyZmFjZSwgaWYgaXQgaW1wbGVtZW50cyBgcHJvY2Vzc1NpZ25hbGAsIGEgc3RyZWFtXG4gKiAgIG9mIHR5cGUgYHNpZ25hbGAgY2FuIGJlIHByb2Nlc3NlZCwgYHByb2Nlc3NWZWN0b3JgIHRvIGhhbmRsZVxuICogICBhbiBpbnB1dCBvZiB0eXBlIGB2ZWN0b3JgLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwid2FybmluZ1wiPl9UaGlzIGNsYXNzIHNob3VsZCBiZSBjb25zaWRlcmVkIGFic3RyYWN0IGFuZCBvbmx5XG4gKiBiZSB1c2VkIGFzIGEgYmFzZSBjbGFzcyB0byBleHRlbmQuXzwvc3Bhbj5cbiAqXG4gKiAjIyMjIG92ZXJ2aWV3IG9mIHRoZSBpbnRlcmZhY2VcbiAqXG4gKiAqKmluaXRNb2R1bGUqKlxuICpcbiAqIFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbW9kdWxlIGlzIGluaXRpYWxpemVkLiBJc1xuICogZXNwZWNpYWxseSBpbXBvcnRhbnQgZm9yIG1vZHVsZXMgdGhhdCByZWx5IG9uIGFzeW5jaHJvbm91cyB1bmRlcmx5aW5nIEFQSXMuXG4gKlxuICogKipwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpKipcbiAqXG4gKiBgYmFzZWAgY2xhc3MgKGRlZmF1bHQgaW1wbGVtZW50YXRpb24pXG4gKiAtIGNhbGwgYHByZXBhcmVTdHJlYW1QYXJhbXNgXG4gKiAtIGNhbGwgYHByb3BhZ2F0ZVN0cmVhbVBhcmFtc2BcbiAqXG4gKiBgY2hpbGRgIGNsYXNzXG4gKiAtIG92ZXJyaWRlIHNvbWUgb2YgdGhlIGluaGVyaXRlZCBgc3RyZWFtUGFyYW1zYFxuICogLSBjcmVhdGVzIHRoZSBhbnkgcmVsYXRlZCBsb2dpYyBidWZmZXJzXG4gKiAtIGNhbGwgYHByb3BhZ2F0ZVN0cmVhbVBhcmFtc2BcbiAqXG4gKiBfc2hvdWxkIG5vdCBjYWxsIGBzdXBlci5wcm9jZXNzU3RyZWFtUGFyYW1zYF9cbiAqXG4gKiAqKnByZXBhcmVTdHJlYW1QYXJhbXMoKSoqXG4gKlxuICogLSBhc3NpZ24gcHJldlN0cmVhbVBhcmFtcyB0byB0aGlzLnN0cmVhbVBhcmFtc1xuICogLSBjaGVjayBpZiB0aGUgY2xhc3MgaW1wbGVtZW50cyB0aGUgY29ycmVjdCBgcHJvY2Vzc0lucHV0YCBtZXRob2RcbiAqXG4gKiBfc2hvdWxkbid0IGJlIGV4dGVuZGVkLCBvbmx5IGNvbnN1bWVkIGluIGBwcm9jZXNzU3RyZWFtUGFyYW1zYF9cbiAqXG4gKiAqKnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpKipcbiAqXG4gKiAtIGNyZWF0ZXMgdGhlIGBmcmFtZURhdGFgIGJ1ZmZlclxuICogLSBwcm9wYWdhdGUgYHN0cmVhbVBhcmFtc2AgdG8gY2hpbGRyZW5cbiAqXG4gKiBfc2hvdWxkbid0IGJlIGV4dGVuZGVkLCBvbmx5IGNvbnN1bWVkIGluIGBwcm9jZXNzU3RyZWFtUGFyYW1zYF9cbiAqXG4gKiAqKnByb2Nlc3NGcmFtZSgpKipcbiAqXG4gKiBgYmFzZWAgY2xhc3MgKGRlZmF1bHQgaW1wbGVtZW50YXRpb24pXG4gKiAtIGNhbGwgYHByZXBhcmVGcmFtZWBcbiAqIC0gYXNzaWduIGZyYW1lVGltZSBhbmQgZnJhbWVNZXRhZGF0YSB0byBpZGVudGl0eVxuICogLSBjYWxsIHRoZSBwcm9wZXIgZnVuY3Rpb24gYWNjb3JkaW5nIHRvIGlucHV0VHlwZVxuICogLSBjYWxsIGBwcm9wYWdhdGVGcmFtZWBcbiAqXG4gKiBgY2hpbGRgIGNsYXNzXG4gKiAtIGNhbGwgYHByZXBhcmVGcmFtZWBcbiAqIC0gZG8gd2hhdGV2ZXIgeW91IHdhbnQgd2l0aCBpbmNvbW1pbmcgZnJhbWVcbiAqIC0gY2FsbCBgcHJvcGFnYXRlRnJhbWVgXG4gKlxuICogX3Nob3VsZCBub3QgY2FsbCBgc3VwZXIucHJvY2Vzc0ZyYW1lYF9cbiAqXG4gKiAqKnByZXBhcmVGcmFtZSgpKipcbiAqXG4gKiAtIGlmIGByZWluaXRgIGFuZCB0cmlnZ2VyIGBwcm9jZXNzU3RyZWFtUGFyYW1zYCBpZiBuZWVkZWRcbiAqXG4gKiBfc2hvdWxkbid0IGJlIGV4dGVuZGVkLCBvbmx5IGNvbnN1bWVkIGluIGBwcm9jZXNzRnJhbWVgX1xuICpcbiAqICoqcHJvcGFnYXRlRnJhbWUoKSoqXG4gKlxuICogLSBwcm9wYWdhdGUgZnJhbWUgdG8gY2hpbGRyZW5cbiAqXG4gKiBfc2hvdWxkbid0IGJlIGV4dGVuZGVkLCBvbmx5IGNvbnN1bWVkIGluIGBwcm9jZXNzRnJhbWVgX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3IoZGVmaW5pdGlvbnMgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jaWQgPSBpZCsrO1xuXG4gICAgLyoqXG4gICAgICogUGFyYW1ldGVyIGJhZyBjb250YWluaW5nIHBhcmFtZXRlciBpbnN0YW5jZXMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqIEBuYW1lIHBhcmFtc1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmb1xuICAgICAqL1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1ldGVycyhkZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gICAgLy8gbGlzdGVuIGZvciBwYXJhbSB1cGRhdGVzXG4gICAgdGhpcy5wYXJhbXMuYWRkTGlzdGVuZXIodGhpcy5vblBhcmFtVXBkYXRlLmJpbmQodGhpcykpO1xuXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb24gb2YgdGhlIHN0cmVhbSBvdXRwdXQgb2YgdGhlIG5vZGUuXG4gICAgICogU2V0IHRvIGBudWxsYCB3aGVuIHRoZSBub2RlIGlzIGRlc3Ryb3llZC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZyYW1lU2l6ZSAtIEZyYW1lIHNpemUgYXQgdGhlIG91dHB1dCBvZiB0aGUgbm9kZS5cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZnJhbWVSYXRlIC0gRnJhbWUgcmF0ZSBhdCB0aGUgb3V0cHV0IG9mIHRoZSBub2RlLlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBmcmFtZVR5cGUgLSBGcmFtZSB0eXBlIGF0IHRoZSBvdXRwdXQgb2YgdGhlIG5vZGUsXG4gICAgICogIHBvc3NpYmxlIHZhbHVlcyBhcmUgYHNpZ25hbGAsIGB2ZWN0b3JgIG9yIGBzY2FsYXJgLlxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl8U3RyaW5nfSBkZXNjcmlwdGlvbiAtIElmIHR5cGUgaXMgYHZlY3RvcmAsIGRlc2NyaWJlXG4gICAgICogIHRoZSBkaW1lbnNpb24ocykgb2Ygb3V0cHV0IHN0cmVhbS5cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc291cmNlU2FtcGxlUmF0ZSAtIFNhbXBsZSByYXRlIG9mIHRoZSBzb3VyY2Ugb2YgdGhlXG4gICAgICogIGdyYXBoLiBfVGhlIHZhbHVlIHNob3VsZCBiZSBkZWZpbmVkIGJ5IHNvdXJjZXMgYW5kIG5ldmVyIG1vZGlmaWVkXy5cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc291cmNlU2FtcGxlQ291bnQgLSBOdW1iZXIgb2YgY29uc2VjdXRpdmUgZGlzY3JldGVcbiAgICAgKiAgdGltZSB2YWx1ZXMgY29udGFpbmVkIGluIHRoZSBkYXRhIGZyYW1lIG91dHB1dCBieSB0aGUgc291cmNlLlxuICAgICAqICBfVGhlIHZhbHVlIHNob3VsZCBiZSBkZWZpbmVkIGJ5IHNvdXJjZXMgYW5kIG5ldmVyIG1vZGlmaWVkXy5cbiAgICAgKlxuICAgICAqIEBuYW1lIHN0cmVhbVBhcmFtc1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmb1xuICAgICAqL1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zID0ge1xuICAgICAgZnJhbWVUeXBlOiBudWxsLFxuICAgICAgZnJhbWVTaXplOiAxLFxuICAgICAgZnJhbWVSYXRlOiAwLFxuICAgICAgZGVzY3JpcHRpb246IG51bGwsXG4gICAgICBzb3VyY2VTYW1wbGVSYXRlOiAwLFxuICAgICAgc291cmNlU2FtcGxlQ291bnQ6IG51bGwsXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgZnJhbWUuIFRoaXMgb2JqZWN0IGFuZCBpdHMgZGF0YSBhcmUgdXBkYXRlZCBhdCBlYWNoIGluY29tbWluZ1xuICAgICAqIGZyYW1lIHdpdGhvdXQgcmVhbGxvY2F0aW5nIG1lbW9yeS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICogQG5hbWUgZnJhbWVcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSAtIFRpbWUgb2YgdGhlIGN1cnJlbnQgZnJhbWUuXG4gICAgICogQHByb3BlcnR5IHtGbG9hdDMyQXJyYXl9IGRhdGEgLSBEYXRhIG9mIHRoZSBjdXJyZW50IGZyYW1lLlxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBtZXRhZGF0YSAtIE1ldGFkYXRhIGFzc29jaXRlZCB0byB0aGUgY3VycmVudCBmcmFtZS5cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm9cbiAgICAgKi9cbiAgICB0aGlzLmZyYW1lID0ge1xuICAgICAgdGltZTogMCxcbiAgICAgIGRhdGE6IG51bGwsXG4gICAgICBtZXRhZGF0YToge30sXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2Ygbm9kZXMgY29ubmVjdGVkIHRvIHRoZSBvdXB1dCBvZiB0aGUgbm9kZSAobG93ZXIgaW4gdGhlIGdyYXBoKS5cbiAgICAgKiBBdCBlYWNoIGZyYW1lLCB0aGUgbm9kZSBmb3J3YXJkIGl0cyBgZnJhbWVgIHRvIHRvIGFsbCBpdHMgYG5leHRNb2R1bGVzYC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtBcnJheTxCYXNlTGZvPn1cbiAgICAgKiBAbmFtZSBuZXh0TW9kdWxlc1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmb1xuICAgICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2Nvbm5lY3R9XG4gICAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jZGlzY29ubmVjdH1cbiAgICAgKi9cbiAgICB0aGlzLm5leHRNb2R1bGVzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbm9kZSBmcm9tIHdoaWNoIHRoZSBub2RlIHJlY2VpdmUgdGhlIGZyYW1lcyAodXBwZXIgaW4gdGhlIGdyYXBoKS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtCYXNlTGZvfVxuICAgICAqIEBuYW1lIHByZXZNb2R1bGVcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm9cbiAgICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNjb25uZWN0fVxuICAgICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2Rpc2Nvbm5lY3R9XG4gICAgICovXG4gICAgdGhpcy5wcmV2TW9kdWxlID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIElzIHNldCB0byB0cnVlIHdoZW4gYSBzdGF0aWMgcGFyYW1ldGVyIGlzIHVwZGF0ZWQuIE9uIHRoZSBuZXh0IGlucHV0XG4gICAgICogZnJhbWUgYWxsIHRoZSBzdWJncmFwaCBzdHJlYW1QYXJhbXMgc3RhcnRpbmcgZnJvbSB0aGlzIG5vZGUgd2lsbCBiZVxuICAgICAqIHVwZGF0ZWQuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAbmFtZSBfcmVpbml0XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9yZWluaXQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCBkZXNjcmliaW5nIGVhY2ggYXZhaWxhYmxlIHBhcmFtZXRlciBvZiB0aGUgbm9kZS5cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0UGFyYW1zRGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zLmdldERlZmluaXRpb25zKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgYWxsIHBhcmFtZXRlcnMgdG8gdGhlaXIgaW5pdGlhbCB2YWx1ZSAoYXMgZGVmaW5lZCBvbiBpbnN0YW50aWNhdGlvbilcbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jc3RyZWFtUGFyYW1zfVxuICAgKi9cbiAgcmVzZXRQYXJhbXMoKSB7XG4gICAgdGhpcy5wYXJhbXMucmVzZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiBhIHBhcmFtIGlzIHVwZGF0ZWQuIEJ5IGRlZmF1bHQgc2V0IHRoZSBgX3JlaW5pdGBcbiAgICogZmxhZyB0byBgdHJ1ZWAgaWYgdGhlIHBhcmFtIGlzIGBzdGF0aWNgIG9uZS4gVGhpcyBtZXRob2Qgc2hvdWxkIGJlXG4gICAqIGV4dGVuZGVkIHRvIGhhbmRsZSBwYXJ0aWN1bGFyIGxvZ2ljIGJvdW5kIHRvIGEgc3BlY2lmaWMgcGFyYW1ldGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSBWYWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbWV0YXMgLSBNZXRhZGF0YSBhc3NvY2lhdGVkIHRvIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBvblBhcmFtVXBkYXRlKG5hbWUsIHZhbHVlLCBtZXRhcyA9IHt9KSB7XG4gICAgaWYgKG1ldGFzLmtpbmQgPT09ICdzdGF0aWMnKVxuICAgICAgdGhpcy5fcmVpbml0ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0IHRoZSBjdXJyZW50IG5vZGUgKGBwcmV2TW9kdWxlYCkgdG8gYW5vdGhlciBub2RlIChgbmV4dE9wYCkuXG4gICAqIEEgZ2l2ZW4gbm9kZSBjYW4gYmUgY29ubmVjdGVkIHRvIHNldmVyYWwgb3BlcmF0b3JzIGFuZCBwcm9wYWdhdGUgZnJhbWVzXG4gICAqIHRvIGVhY2ggb2YgdGhlbS5cbiAgICpcbiAgICogQHBhcmFtIHtCYXNlTGZvfSBuZXh0IC0gTmV4dCBvcGVyYXRvciBpbiB0aGUgZ3JhcGguXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NGcmFtZX1cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jZGlzY29ubmVjdH1cbiAgICovXG4gIGNvbm5lY3QobmV4dCkge1xuICAgIGlmICghKG5leHQgaW5zdGFuY2VvZiBCYXNlTGZvKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb25uZWN0aW9uOiBjaGlsZCBub2RlIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBgQmFzZUxmb2AnKTtcblxuICAgIGlmICh0aGlzLnN0cmVhbVBhcmFtcyA9PT0gbnVsbCB8fG5leHQuc3RyZWFtUGFyYW1zID09PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbm5lY3Rpb246IGNhbm5vdCBjb25uZWN0IGEgZGVhZCBub2RlJyk7XG5cbiAgICBpZiAodGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlICE9PSBudWxsKSB7IC8vIGdyYXBoIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZFxuICAgICAgLy8gbmV4dC5wcm9jZXNzU3RyZWFtUGFyYW1zKHRoaXMuc3RyZWFtUGFyYW1zKTtcbiAgICAgIG5leHQuaW5pdE1vZHVsZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBuZXh0LnByb2Nlc3NTdHJlYW1QYXJhbXModGhpcy5zdHJlYW1QYXJhbXMpO1xuICAgICAgICAvLyB3ZSBjYW4gZm9yd2FyZCBmcmFtZSBmcm9tIG5vd1xuICAgICAgICB0aGlzLm5leHRNb2R1bGVzLnB1c2gobmV4dCk7XG4gICAgICAgIG5leHQucHJldk1vZHVsZSA9IHRoaXM7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uZXh0TW9kdWxlcy5wdXNoKG5leHQpO1xuICAgICAgbmV4dC5wcmV2TW9kdWxlID0gdGhpcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBnaXZlbiBvcGVyYXRvciBmcm9tIGl0cyBwcmV2aW91cyBvcGVyYXRvcnMnIGBuZXh0TW9kdWxlc2AuXG4gICAqXG4gICAqIEBwYXJhbSB7QmFzZUxmb30gW25leHQ9bnVsbF0gLSBUaGUgb3BlcmF0b3IgdG8gZGlzY29ubmVjdCBmcm9tIHRoZSBjdXJyZW50XG4gICAqICBvcGVyYXRvci4gSWYgYG51bGxgIGRpc2Nvbm5lY3QgYWxsIHRoZSBuZXh0IG9wZXJhdG9ycy5cbiAgICovXG4gIGRpc2Nvbm5lY3QobmV4dCA9IG51bGwpIHtcbiAgICBpZiAobmV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5uZXh0TW9kdWxlcy5mb3JFYWNoKChuZXh0KSA9PiB0aGlzLmRpc2Nvbm5lY3QobmV4dCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMubmV4dE1vZHVsZXMuaW5kZXhPZih0aGlzKTtcbiAgICAgIHRoaXMubmV4dE1vZHVsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIG5leHQucHJldk1vZHVsZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYWxsIHRoZSBub2RlcyBpbiB0aGUgc3ViLWdyYXBoIHN0YXJ0aW5nIGZyb20gdGhlIGN1cnJlbnQgbm9kZS5cbiAgICogV2hlbiBkZXRyb3llZCwgdGhlIGBzdHJlYW1QYXJhbXNgIG9mIHRoZSBub2RlIGFyZSBzZXQgdG8gYG51bGxgLCB0aGVcbiAgICogb3BlcmF0b3IgaXMgdGhlbiBjb25zaWRlcmVkIGFzIGBkZWFkYCBhbmQgY2Fubm90IGJlIHJlY29ubmVjdGVkLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNjb25uZWN0fVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBkZXN0cm95IGFsbCBjaGlkcmVuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5uZXh0TW9kdWxlcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaW5kZXgtLSlcbiAgICAgIHRoaXMubmV4dE1vZHVsZXNbaW5kZXhdLmRlc3Ryb3koKTtcblxuICAgIC8vIGRpc2Nvbm5lY3QgaXRzZWxmIGZyb20gdGhlIHByZXZpb3VzIG9wZXJhdG9yXG4gICAgaWYgKHRoaXMucHJldk1vZHVsZSlcbiAgICAgIHRoaXMucHJldk1vZHVsZS5kaXNjb25uZWN0KHRoaXMpO1xuXG4gICAgLy8gbWFyayB0aGUgb2JqZWN0IGFzIGRlYWRcbiAgICB0aGlzLnN0cmVhbVBhcmFtcyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZSB3aGVuIHRoZSBtb2R1bGUgaXMgcmVhZHkgdG8gYmUgY29uc3VtZWQuXG4gICAqIFNvbWUgbW9kdWxlcyByZWxpZXMgb24gYXN5bmNocm9ub3VzIEFQSXMgYXQgaW5pdGlhbGl6YXRpb24gYW5kIHRodXMgY291bGRcbiAgICogYmUgbm90IHJlYWR5IHRvIGJlIGNvbnN1bWVkIHdoZW4gdGhlIGdyYXBoIHN0YXJ0cy5cbiAgICogQSBtb2R1bGUgc2hvdWxkIGJlIGNvbnNpZGVyIGFzIGluaXRpYWxpemVkIHdoZW4gYWxsIG5leHQgbW9kdWxlcyAoY2hpbGRyZW4pXG4gICAqIGFyZSB0aGVtc2VsdmVzIGluaXRpYWxpemVkLiBUaGUgZXZlbnQgYnViYmxlcyB1cCBmcm9tIHNpbmtzIHRvIHNvdXJjZXMuXG4gICAqIFdoZW4gYWxsIGl0cyBuZXh0IG9wZXJhdG9ycyBhcmUgcmVhZHksIGEgc291cmNlIGNhbiBjb25zaWRlciB0aGUgd2hvbGUgZ3JhcGhcbiAgICogYXMgcmVhZHkgYW5kIHRoZW4gc3RhcnQgdG8gcHJvZHVjZSBmcmFtZXMuXG4gICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHJlc29sdmVzIHdoZW4gYWxsIG5leHQgb3BlcmF0b3JzIGFyZSByZXNvbHZlZFxuICAgKiB0aGVtc2VsdmVzLlxuICAgKiBBbiBvcGVyYXRvciByZWx5aW5nIG9uIGV4dGVybmFsIGFzeW5jIEFQSSBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvXG4gICAqIHJlc29sdmUgb25seSB3aGVuIGl0cyBkZXBlbmRlY3kgaXMgcmVhZHkuXG4gICAqXG4gICAqIEByZXR1cm4gUHJvbWlzZVxuICAgKiBAdG9kbyAtIEhhbmRsZSBkeW5hbWljIGNvbm5lY3Rpb25zXG4gICAqL1xuICBpbml0TW9kdWxlKCkge1xuICAgIGNvbnN0IG5leHRQcm9taXNlcyA9IHRoaXMubmV4dE1vZHVsZXMubWFwKChtb2R1bGUpID0+IHtcbiAgICAgIHJldHVybiBtb2R1bGUuaW5pdE1vZHVsZSgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKG5leHRQcm9taXNlcyk7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIHRvIGluaXRpYWxpemUgdGhlIHN0cmVhbSBpbiBzdGFuZGFsb25lIG1vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc3RyZWFtUGFyYW1zPXt9XSAtIFBhcmFtZXRlcnMgb2YgdGhlIHN0cmVhbS5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcmVzZXRTdHJlYW19XG4gICAqL1xuICBpbml0U3RyZWFtKHN0cmVhbVBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wcm9jZXNzU3RyZWFtUGFyYW1zKHN0cmVhbVBhcmFtcyk7XG4gICAgdGhpcy5yZXNldFN0cmVhbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBgZnJhbWUuZGF0YWAgYnVmZmVyIGJ5IHNldHRpbmcgYWxsIGl0cyB2YWx1ZXMgdG8gMC5cbiAgICogQSBzb3VyY2Ugb3BlcmF0b3Igc2hvdWxkIGNhbGwgYHByb2Nlc3NTdHJlYW1QYXJhbXNgIGFuZCBgcmVzZXRTdHJlYW1gIHdoZW5cbiAgICogc3RhcnRlZCwgZWFjaCBvZiB0aGVzZSBtZXRob2QgcHJvcGFnYXRlIHRocm91Z2ggdGhlIGdyYXBoIGF1dG9tYXRpY2FseS5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAgICovXG4gIHJlc2V0U3RyZWFtKCkge1xuICAgIC8vIGJ1dHRvbSB1cFxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5uZXh0TW9kdWxlcy5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgICB0aGlzLm5leHRNb2R1bGVzW2ldLnJlc2V0U3RyZWFtKCk7XG5cbiAgICAvLyBubyBidWZmZXIgZm9yIGBzY2FsYXJgIHR5cGUgb3Igc2luayBub2RlXG4gICAgLy8gQG5vdGUgLSB0aGlzIHNob3VsZCBiZSByZXZpZXdlZFxuICAgIGlmICh0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgIT09ICdzY2FsYXInICYmIHRoaXMuZnJhbWUuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZVNpemU7IGkrKylcbiAgICAgICAgZGF0YVtpXSA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmFsaXplIHRoZSBzdHJlYW0uIEEgc291cmNlIG5vZGUgc2hvdWxkIGNhbGwgdGhpcyBtZXRob2Qgd2hlbiBzdG9wcGVkLFxuICAgKiBgZmluYWxpemVTdHJlYW1gIGlzIGF1dG9tYXRpY2FsbHkgcHJvcGFnYXRlZCB0aHJvdWdodCB0aGUgZ3JhcGguXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbmRUaW1lIC0gTG9naWNhbCB0aW1lIGF0IHdoaWNoIHRoZSBncmFwaCBpcyBzdG9wcGVkLlxuICAgKi9cbiAgZmluYWxpemVTdHJlYW0oZW5kVGltZSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5uZXh0TW9kdWxlcy5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgICB0aGlzLm5leHRNb2R1bGVzW2ldLmZpbmFsaXplU3RyZWFtKGVuZFRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgb3IgdXBkYXRlIHRoZSBvcGVyYXRvcidzIGBzdHJlYW1QYXJhbXNgIGFjY29yZGluZyB0byB0aGVcbiAgICogcHJldmlvdXMgb3BlcmF0b3JzIGBzdHJlYW1QYXJhbXNgIHZhbHVlcy5cbiAgICpcbiAgICogV2hlbiBpbXBsZW1lbnRpbmcgYSBuZXcgb3BlcmF0b3IgdGhpcyBtZXRob2Qgc2hvdWxkOlxuICAgKiAxLiBjYWxsIGB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXNgIHdpdGggdGhlIGdpdmVuIGBwcmV2U3RyZWFtUGFyYW1zYFxuICAgKiAyLiBvcHRpb25uYWxseSBjaGFuZ2UgdmFsdWVzIHRvIGB0aGlzLnN0cmVhbVBhcmFtc2AgYWNjb3JkaW5nIHRvIHRoZVxuICAgKiAgICBsb2dpYyBwZXJmb3JtZWQgYnkgdGhlIG9wZXJhdG9yLlxuICAgKiAzLiBvcHRpb25uYWxseSBhbGxvY2F0ZSBtZW1vcnkgZm9yIHJpbmcgYnVmZmVycywgZXRjLlxuICAgKiA0LiBjYWxsIGB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtc2AgdG8gdHJpZ2dlciB0aGUgbWV0aG9kIG9uIHRoZSBuZXh0XG4gICAqICAgIG9wZXJhdG9ycyBpbiB0aGUgZ3JhcGguXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcmV2U3RyZWFtUGFyYW1zIC0gYHN0cmVhbVBhcmFtc2Agb2YgdGhlIHByZXZpb3VzIG9wZXJhdG9yLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcmVwYXJlU3RyZWFtUGFyYW1zfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9wYWdhdGVTdHJlYW1QYXJhbXN9XG4gICAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbW1vbiBsb2dpYyB0byBkbyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBgcHJvY2Vzc1N0cmVhbVBhcmFtYCwgbXVzdCBiZVxuICAgKiBjYWxsZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBhbnkgYHByb2Nlc3NTdHJlYW1QYXJhbWAgaW1wbGVtZW50YXRpb24uXG4gICAqXG4gICAqIFRoZSBtZXRob2QgbWFpbmx5IGNoZWNrIGlmIHRoZSBjdXJyZW50IG5vZGUgaW1wbGVtZW50IHRoZSBpbnRlcmZhY2UgdG9cbiAgICogaGFuZGxlIHRoZSB0eXBlIG9mIGZyYW1lIHByb3BhZ2F0ZWQgYnkgaXQncyBwYXJlbnQ6XG4gICAqIC0gdG8gaGFuZGxlIGEgYHZlY3RvcmAgZnJhbWUgdHlwZSwgdGhlIGNsYXNzIG11c3QgaW1wbGVtZW50IGBwcm9jZXNzVmVjdG9yYFxuICAgKiAtIHRvIGhhbmRsZSBhIGBzaWduYWxgIGZyYW1lIHR5cGUsIHRoZSBjbGFzcyBtdXN0IGltcGxlbWVudCBgcHJvY2Vzc1NpZ25hbGBcbiAgICogLSBpbiBjYXNlIG9mIGEgJ3NjYWxhcicgZnJhbWUgdHlwZSwgdGhlIGNsYXNzIGNhbiBpbXBsZW1lbnQgYW55IG9mIHRoZVxuICAgKiBmb2xsb3dpbmcgYnkgb3JkZXIgb2YgcHJlZmVyZW5jZTogYHByb2Nlc3NTY2FsYXJgLCBgcHJvY2Vzc1ZlY3RvcmAsXG4gICAqIGBwcm9jZXNzU2lnbmFsYC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByZXZTdHJlYW1QYXJhbXMgLSBgc3RyZWFtUGFyYW1zYCBvZiB0aGUgcHJldmlvdXMgb3BlcmF0b3IuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NTdHJlYW1QYXJhbXN9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb3BhZ2F0ZVN0cmVhbVBhcmFtc31cbiAgICovXG4gIHByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0cmVhbVBhcmFtcywgcHJldlN0cmVhbVBhcmFtcyk7XG4gICAgY29uc3QgcHJldkZyYW1lVHlwZSA9IHByZXZTdHJlYW1QYXJhbXMuZnJhbWVUeXBlO1xuXG4gICAgc3dpdGNoIChwcmV2RnJhbWVUeXBlKSB7XG4gICAgICBjYXNlICdzY2FsYXInOlxuICAgICAgICBpZiAodGhpcy5wcm9jZXNzU2NhbGFyKVxuICAgICAgICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uID0gdGhpcy5wcm9jZXNzU2NhbGFyO1xuICAgICAgICBlbHNlIGlmICh0aGlzLnByb2Nlc3NWZWN0b3IpXG4gICAgICAgICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24gPSB0aGlzLnByb2Nlc3NWZWN0b3I7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucHJvY2Vzc1NpZ25hbClcbiAgICAgICAgICB0aGlzLnByb2Nlc3NGdW5jdGlvbiA9IHRoaXMucHJvY2Vzc1NpZ25hbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IC0gbm8gXCJwcm9jZXNzXCIgZnVuY3Rpb24gZm91bmRgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2ZWN0b3InOlxuICAgICAgICBpZiAoISgncHJvY2Vzc1ZlY3RvcicgaW4gdGhpcykpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gLSBcInByb2Nlc3NWZWN0b3JcIiBpcyBub3QgZGVmaW5lZGApO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uID0gdGhpcy5wcm9jZXNzVmVjdG9yO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NpZ25hbCc6XG4gICAgICAgIGlmICghKCdwcm9jZXNzU2lnbmFsJyBpbiB0aGlzKSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSAtIFwicHJvY2Vzc1NpZ25hbFwiIGlzIG5vdCBkZWZpbmVkYCk7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24gPSB0aGlzLnByb2Nlc3NTaWduYWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gZGVmYXVsdHMgdG8gcHJvY2Vzc0Z1bmN0aW9uXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIGB0aGlzLmZyYW1lLmRhdGFgIGJ1ZmZlciBhbmQgZm9yd2FyZCB0aGUgb3BlcmF0b3IncyBgc3RyZWFtUGFyYW1gXG4gICAqIHRvIGFsbCBpdHMgbmV4dCBvcGVyYXRvcnMsIG11c3QgYmUgY2FsbGVkIGF0IHRoZSBlbmQgb2YgYW55XG4gICAqIGBwcm9jZXNzU3RyZWFtUGFyYW1zYCBpbXBsZW1lbnRhdGlvbi5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJlcGFyZVN0cmVhbVBhcmFtc31cbiAgICovXG4gIHByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpIHtcbiAgICB0aGlzLmZyYW1lLmRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubmV4dE1vZHVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgdGhpcy5uZXh0TW9kdWxlc1tpXS5wcm9jZXNzU3RyZWFtUGFyYW1zKHRoaXMuc3RyZWFtUGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgdGhlIHBhcnRpY3VsYXIgbG9naWMgdGhlIG9wZXJhdG9yIGFwcGxpZXMgdG8gdGhlIHN0cmVhbS5cbiAgICogQWNjb3JkaW5nIHRvIHRoZSBmcmFtZSB0eXBlIG9mIHRoZSBwcmV2aW91cyBub2RlLCB0aGUgbWV0aG9kIGNhbGxzIG9uZVxuICAgKiBvZiB0aGUgZm9sbG93aW5nIG1ldGhvZCBgcHJvY2Vzc1ZlY3RvcmAsIGBwcm9jZXNzU2lnbmFsYCBvciBgcHJvY2Vzc1NjYWxhcmBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGZyYW1lIC0gRnJhbWUgKHRpbWUsIGRhdGEsIGFuZCBtZXRhZGF0YSkgYXMgZ2l2ZW4gYnkgdGhlXG4gICAqICBwcmV2aW91cyBvcGVyYXRvci4gVGhlIGluY29tbWluZyBmcmFtZSBzaG91bGQgbmV2ZXIgYmUgbW9kaWZpZWQgYnlcbiAgICogIHRoZSBvcGVyYXRvci5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJlcGFyZUZyYW1lfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9wYWdhdGVGcmFtZX1cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAgICovXG4gIHByb2Nlc3NGcmFtZShmcmFtZSkge1xuICAgIHRoaXMucHJlcGFyZUZyYW1lKCk7XG5cbiAgICAvLyBmcmFtZVRpbWUgYW5kIGZyYW1lTWV0YWRhdGEgZGVmYXVsdHMgdG8gaWRlbnRpdHlcbiAgICB0aGlzLmZyYW1lLnRpbWUgPSBmcmFtZS50aW1lO1xuICAgIHRoaXMuZnJhbWUubWV0YWRhdGEgPSBmcmFtZS5tZXRhZGF0YTtcblxuICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUZyYW1lKCk7XG4gIH1cblxuICAvKipcbiAgICogUG9pbnRlciB0byB0aGUgbWV0aG9kIGNhbGxlZCBpbiBgcHJvY2Vzc0ZyYW1lYCBhY2NvcmRpbmcgdG8gdGhlXG4gICAqIGZyYW1lIHR5cGUgb2YgdGhlIHByZXZpb3VzIG9wZXJhdG9yLiBJcyBkeW5hbWljYWxseSBhc3NpZ25lZCBpblxuICAgKiBgcHJlcGFyZVN0cmVhbVBhcmFtc2AuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3ByZXBhcmVTdHJlYW1QYXJhbXN9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NGcmFtZX1cbiAgICovXG4gIHByb2Nlc3NGdW5jdGlvbihmcmFtZSkge1xuICAgIHRoaXMuZnJhbWUgPSBmcmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21tb24gbG9naWMgdG8gcGVyZm9ybSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBgcHJvY2Vzc0ZyYW1lYC5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc0ZyYW1lfVxuICAgKi9cbiAgcHJlcGFyZUZyYW1lKCkge1xuICAgIGlmICh0aGlzLl9yZWluaXQgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHN0cmVhbVBhcmFtcyA9IHRoaXMucHJldk1vZHVsZSAhPT0gbnVsbCA/IHRoaXMucHJldk1vZHVsZS5zdHJlYW1QYXJhbXMgOiB7fTtcbiAgICAgIHRoaXMuaW5pdFN0cmVhbShzdHJlYW1QYXJhbXMpO1xuICAgICAgdGhpcy5fcmVpbml0ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcndhcmQgdGhlIGN1cnJlbnQgYGZyYW1lYCB0byB0aGUgbmV4dCBvcGVyYXRvcnMsIGlzIGNhbGxlZCBhdCB0aGUgZW5kIG9mXG4gICAqIGBwcm9jZXNzRnJhbWVgLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzRnJhbWV9XG4gICAqL1xuICBwcm9wYWdhdGVGcmFtZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubmV4dE1vZHVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgdGhpcy5uZXh0TW9kdWxlc1tpXS5wcm9jZXNzRnJhbWUodGhpcy5mcmFtZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUxmbztcbiIsIlxuLyoqXG4gKiBJbnRlcmZhY2UgYWRkZWQgdG8gYExmb0NvcmUgdG8gaW1wbGVtZW50IHNvdXJjZVxuICpcbiAqIFNvdXJjZSBoYXZlIHNvbWUgcmVzcG9uc2FiaWxpdHkgb24gZ3JhcGggYXMgdGhleSBtb3N0bHkgY29udHJvbCBpdHMgd2hvbGVcbiAqIGxpZmVjeWNsZS4gVGhleSBtdXN0IGltcGxlbWVudCB0aGUgc3RhcnQgYW5kIHN0b3AgbWV0aG9kIGluIG9yZGVyIHRvXG4gKiBtYWtlIHN1cmUgdGhlIGdyYXBoIGlzIGluaXRpYWxpemVkIGFuZCBzZXQgYHN0YXJ0ZWRgIHRvIHRydWUuXG4gKiBBIHNvdXJjZSBzaG91bGQgbmV2ZXIgYWNjZXB0IGFuZCBwcm9wYWdhdGUgaW5jb21taW5nIGZyYW1lcyB1bnRpbCBgc3RhcnRlZGBcbiAqIGlzIHNldCB0byBgdHJ1ZWAuXG4gKlxuICogQG5hbWUgU291cmNlTWl4aW5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICogQG1peGluXG4gKlxuICogQGV4YW1wbGVcbiAqIGNsYXNzIE15U291cmNlIGV4dGVuZHMgU291cmNlTWl4aW4oQmFzZUxmbykge31cbiAqL1xuIGNvbnN0IFNvdXJjZU1peGluID0gKHN1cGVyY2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgc3VwZXJjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmluaXRQcm9taXNlID0gbnVsbDtcbiAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuc3RhcnQgPSB0aGlzLnN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdG9wID0gdGhpcy5zdG9wLmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgZ3JhcGggYnkgY2FsbGluZyBgaW5pdE1vZHVsZWAuIFdoZW4gdGhlIHJldHVybmVkIGBQcm9taXNlYFxuICAgKiBmdWxmaWxscywgdGhlIGdyYXBoIGNhbiBiZSBjb25zaWRlcmVkIGFzIGluaXRpYWxpemVkIGFuZCBgc3RhcnRgIGNhbiBiZVxuICAgKiBjYWxsZWQgc2FmZWx5LiBJZiBgc3RhcnRgIGlzIGNhbGxlZCB3aGl0aG91dCBleHBsaWNpdCBgaW5pdGAsIGBpbml0YCBpc1xuICAgKiBtYWRlIGludGVybmFsbHksIGFjdHVhbCBzdGFydCBvZiB0aGUgZ3JhcGggaXMgdGhlbiBub3QgZ2FyYW50ZWVkIHRvIGJlXG4gICAqIHN5bmNocm9ub3VzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuU291cmNlTWl4aW5cbiAgICogQGluc3RhbmNlXG4gICAqIEBuYW1lIGluaXRcbiAgICpcbiAgICogQHJldHVybiBQcm9taXNlXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIHNhZmUgaW5pdGlhbGl6YXRpb24gYW5kIHN0YXJ0XG4gICAqIHNvdXJjZS5pbml0KCkudGhlbigoKSA9PiBzb3VyY2Uuc3RhcnQoKSlcbiAgICogLy8gc2FmZSBpbml0aWFsaXphdGlvbiBhbmQgc3RhcnRcbiAgICogc291cmNlLnN0YXJ0KCk7XG4gICAqL1xuICBpbml0KCkge1xuICAgIHRoaXMuaW5pdFByb21pc2UgPSB0aGlzLmluaXRNb2R1bGUoKS50aGVuKCgpID0+IHsgLy8gd2hlbiBncmFwaCBpcyBzdGFydGVkXG4gICAgICB0aGlzLmluaXRTdHJlYW0oKTsgLy8gdGhpcyBpcyBzeW5jaHJvbm91c1xuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuaW5pdFByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIG1ldGhvZCB0byBpbXBsZW1lbnQgdGhhdCBzdGFydHMgdGhlIGdyYXBoLlxuICAgKlxuICAgKiBUaGUgbWV0aG9kIG1haW4gcHVycG9zZSBpcyB0byBtYWtlIHN1cmUgdGFrZSB2ZXJpZnkgaW5pdGlhbGl6YXRpb24gc3RlcCBhbmRcbiAgICogc2V0IGBzdGFydGVkYCB0byBgdHJ1ZWAgd2hlbiBkb25lLlxuICAgKiBTaG91bGQgYmVoYXZlIHN5bmNocm9ub3VzbHkgd2hlbiBjYWxsZWQgaW5zaWRlIGBpbml0KCkudGhlbigpYCBhbmQgYXN5bmNcbiAgICogaWYgY2FsbGVkIHdpdGhvdXQgaW5pdCBzdGVwLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuU291cmNlTWl4aW5cbiAgICogQGluc3RhbmNlXG4gICAqIEBuYW1lIHN0YXJ0XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIGJhc2ljIGBzdGFydGAgaW1wbGVtZW50YXRpb25cbiAgICogc3RhcnQoKSB7XG4gICAqICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQgPT09IGZhbHNlKSB7XG4gICAqICAgICBpZiAodGhpcy5pbml0UHJvbWlzZSA9PT0gbnVsbCkgLy8gaW5pdCBoYXMgbm90IHlldCBiZWVuIGNhbGxlZFxuICAgKiAgICAgICB0aGlzLmluaXRQcm9taXNlID0gdGhpcy5pbml0KCk7XG4gICAqXG4gICAqICAgICB0aGlzLmluaXRQcm9taXNlLnRoZW4odGhpcy5zdGFydCk7XG4gICAqICAgICByZXR1cm47XG4gICAqICAgfVxuICAgKlxuICAgKiAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAqIH1cbiAgICovXG4gIHN0YXJ0KCkge31cblxuICAvKipcbiAgICogSW50ZXJmYWNlIG1ldGhvZCB0byBpbXBsZW1lbnQgdGhhdCBzdG9wcyB0aGUgZ3JhcGguXG4gICAqXG4gICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZS5Tb3VyY2VNaXhpblxuICAgKiBAaW5zdGFuY2VcbiAgICogQG5hbWUgc3RvcFxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBiYXNpYyBgc3RvcGAgaW1wbGVtZW50YXRpb25cbiAgICogc3RvcCgpIHtcbiAgICogICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICogfVxuICAgKi9cbiAgc3RvcCgpIHt9XG5cbiAgLyoqXG4gICAqIFRoZSBpbXBsZW1lbnRhdGlvbiBzaG91bGQgbmV2ZXIgYWxsb3cgaW5jb21taW5nIGZyYW1lc1xuICAgKiBpZiBgdGhpcy5zdGFydGVkYCBpcyBub3QgYHRydWVgLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuU291cmNlTWl4aW5cbiAgICogQGluc3RhbmNlXG4gICAqIEBuYW1lIHByb2Nlc3NGcmFtZVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZnJhbWVcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gYmFzaWMgYHByb2Nlc3NGcmFtZWAgaW1wbGVtZW50YXRpb25cbiAgICogcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAqICAgaWYgKHRoaXMuc3RhcnRlZCA9PT0gdHJ1ZSkge1xuICAgKiAgICAgdGhpcy5wcmVwYXJlRnJhbWUoKTtcbiAgICogICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcbiAgICogICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcbiAgICogICB9XG4gICAqIH1cbiAgICovXG4gIHByb2Nlc3NGcmFtZShmcmFtZSkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291cmNlTWl4aW47XG4iLCJleHBvcnQgY29uc3QgdmVyc2lvbiA9ICcldmVyc2lvbiUnO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJhc2VMZm8gfSBmcm9tICcuL0Jhc2VMZm8nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTb3VyY2VNaXhpbiB9IGZyb20gJy4vU291cmNlTWl4aW4nO1xuIl19
