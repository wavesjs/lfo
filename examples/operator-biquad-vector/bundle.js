(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var min = Math.min;
var max = Math.max;

function clip(value) {
  var lower = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -Infinity;
  var upper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : +Infinity;

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

},{}],2:[function(require,module,exports){
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
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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

      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var params = {};

  for (var name in values) {
    if (definitions.hasOwnProperty(name) === false) throw new Error('Unknown param "' + name + '"');
  }

  for (var _name in definitions) {
    if (params.hasOwnProperty(_name) === true) throw new Error('Parameter "' + _name + '" already defined');

    var definition = definitions[_name];

    if (!_paramTemplates2.default[definition.type]) throw new Error('Unknown param type "' + definition.type + '"');

    var _paramTemplates$defin = _paramTemplates2.default[definition.type],
        definitionTemplate = _paramTemplates$defin.definitionTemplate,
        typeCheckFunction = _paramTemplates$defin.typeCheckFunction;


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

},{"./paramTemplates":1}],3:[function(require,module,exports){
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

var version = exports.version = '1.0.0';

var core = exports.core = _core;

},{"../common/operator/_namespace":35,"../core":43,"./sink/_namespace":12,"./source/_namespace":15,"./utils/_namespace":17}],4:[function(require,module,exports){
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

    //
    _this._stack;
    _this._rafId;

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

      this._stack = [];
      this._rafId = requestAnimationFrame(this.renderStack);
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/assign":48,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],5:[function(require,module,exports){
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
};

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

},{"../utils/display-utils":18,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],6:[function(require,module,exports){
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

},{"../utils/display-utils":18,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],7:[function(require,module,exports){
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

},{"../utils/display-utils":18,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],8:[function(require,module,exports){
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

},{"../../common/operator/Fft":21,"../utils/display-utils":18,"./BaseDisplay":4,"babel-runtime/core-js/math/log10":46,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],9:[function(require,module,exports){
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

},{"../utils/display-utils":18,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],10:[function(require,module,exports){
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
};

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

},{"../../common/operator/Rms":30,"./BaseDisplay":4,"babel-runtime/core-js/math/log10":46,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],11:[function(require,module,exports){
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

},{"../../common/operator/MinMax":26,"../../common/operator/Rms":30,"../utils/display-utils":18,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],12:[function(require,module,exports){
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

var _SpectrumDisplay = require('./SpectrumDisplay');

var _SpectrumDisplay2 = _interopRequireDefault(_SpectrumDisplay);

var _TraceDisplay = require('./TraceDisplay');

var _TraceDisplay2 = _interopRequireDefault(_TraceDisplay);

var _VuMeterDisplay = require('./VuMeterDisplay');

var _VuMeterDisplay2 = _interopRequireDefault(_VuMeterDisplay);

var _WaveformDisplay = require('./WaveformDisplay');

var _WaveformDisplay2 = _interopRequireDefault(_WaveformDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// client only
// common
exports.default = {
  Bridge: _Bridge2.default,
  Logger: _Logger2.default,
  DataRecorder: _DataRecorder2.default,
  SignalRecorder: _SignalRecorder2.default,

  BaseDisplay: _BaseDisplay2.default,
  BpfDisplay: _BpfDisplay2.default,
  MarkerDisplay: _MarkerDisplay2.default,
  SignalDisplay: _SignalDisplay2.default,
  SpectrumDisplay: _SpectrumDisplay2.default,
  TraceDisplay: _TraceDisplay2.default,
  VuMeterDisplay: _VuMeterDisplay2.default,
  WaveformDisplay: _WaveformDisplay2.default
};

},{"../../common/sink/Bridge":36,"../../common/sink/DataRecorder":37,"../../common/sink/Logger":38,"../../common/sink/SignalRecorder":39,"./BaseDisplay":4,"./BpfDisplay":5,"./MarkerDisplay":6,"./SignalDisplay":7,"./SpectrumDisplay":8,"./TraceDisplay":9,"./VuMeterDisplay":10,"./WaveformDisplay":11}],13:[function(require,module,exports){
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

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = (0, _defineProperty3.default)({
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
}, 'progressCallback', {
  type: 'any',
  default: null,
  nullable: true,
  constant: true
});

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
 * @todo - Allow to pass raw buffer and sampleRate (simplified use server-side)
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

var AudioInBuffer = function (_BaseLfo) {
  (0, _inherits3.default)(AudioInBuffer, _BaseLfo);

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
      this.initStream();

      var channel = this.params.get('channel');
      var audioBuffer = this.params.get('audioBuffer');
      var buffer = audioBuffer.getChannelData(channel);
      this.endTime = 0;

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
      var sampleRate = this.streamParams.sourceSampleRate;
      var frameSize = this.streamParams.frameSize;
      var progressCallback = this.params.get('progressCallback') || noop;
      var length = buffer.length;
      var nbrFrames = Math.ceil(buffer.length / frameSize);
      var data = this.frame.data;
      var that = this;
      var i = 0;

      (function slice() {
        var offset = i * frameSize;
        var nbrCopy = Math.min(length - offset, frameSize);

        for (var j = 0; j < frameSize; j++) {
          data[j] = j < nbrCopy ? buffer[offset + j] : 0;
        }that.frame.time = offset / sampleRate;
        that.endTime = that.frame.time + nbrCopy / sampleRate;
        that.propagateFrame();

        i += 1;
        progressCallback(i / nbrFrames);

        if (i < nbrFrames) setTimeout(slice, 0);else that.finalizeStream(that.endTime);
      })();
    }
  }]);
  return AudioInBuffer;
}(_BaseLfo3.default);

exports.default = AudioInBuffer;

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/defineProperty":58,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],14:[function(require,module,exports){
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

var AudioInNode = function (_BaseLfo) {
  (0, _inherits3.default)(AudioInNode, _BaseLfo);

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
      this.initStream();

      var audioContext = this.params.get('audioContext');
      this.frame.time = 0;

      var frameSize = this.params.get('frameSize');

      // @note: recreate each time because of a firefox weird behavior
      this.scriptProcessor = audioContext.createScriptProcessor(frameSize, 1, 1);
      this.scriptProcessor.onaudioprocess = this.processFrame;

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
      this.frame.data = e.inputBuffer.getChannelData(this._channel);
      this.propagateFrame();

      this.frame.time += this._blockDuration;
    }
  }]);
  return AudioInNode;
}(_BaseLfo3.default);

exports.default = AudioInNode;

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],15:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// client only
exports.default = {
  EventIn: _EventIn2.default,

  AudioInBuffer: _AudioInBuffer2.default,
  AudioInNode: _AudioInNode2.default
}; // common

},{"../../common/source/EventIn":40,"./AudioInBuffer":13,"./AudioInNode":14}],16:[function(require,module,exports){
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

},{"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57}],17:[function(require,module,exports){
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

},{"../../common/utils/windows":41,"./DisplaySync":16}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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
};

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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],20:[function(require,module,exports){
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],21:[function(require,module,exports){
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
};

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
 * @param {Number} [options.size=1024] - Size of the fft, should be a power of
 *  2. If the frame size of the incomming signal is lower than this value,
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
 * const fft = new Fft({
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

},{"../../core/BaseLfo":42,"../utils/windows":41,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],22:[function(require,module,exports){
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
};

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
 * import * as lfo from 'waves-lfo/client';
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],23:[function(require,module,exports){
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],24:[function(require,module,exports){
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
    };

    // define contribution of each bin for the filter at index (i + 1)
    // do not process the last spectrum component (Nyquist)
    for (var j = 0; j < nbrBins - 1; j++) {
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
     * mel.initStream({ frameSize: 256, frameType: 'vector' });
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/math/log10":46,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],25:[function(require,module,exports){
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

},{"../../core/BaseLfo":42,"./Dct":20,"./Fft":21,"./Mel":24,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],26:[function(require,module,exports){
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
 * import * as lfo from 'waves-lfo/client';
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],27:[function(require,module,exports){
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
 * import * as lfo from 'waves-lfo/client';
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],28:[function(require,module,exports){
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
 * import * as lfo from 'waves-lfo/client';
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],29:[function(require,module,exports){
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
 * import * as lfo from 'waves-lfo/client';
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],30:[function(require,module,exports){
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],31:[function(require,module,exports){
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
};

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

},{"../../core/BaseLfo":42,"./MovingAverage":27,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],32:[function(require,module,exports){
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
 * import * as lfo from 'waves-lfo/client';
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],33:[function(require,module,exports){
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
};

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
 * import * as lfo from 'waves-lfo/client';
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],34:[function(require,module,exports){
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
};

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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],35:[function(require,module,exports){
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

},{"./Biquad":19,"./Dct":20,"./Fft":21,"./Magnitude":22,"./MeanStddev":23,"./Mel":24,"./Mfcc":25,"./MinMax":26,"./MovingAverage":27,"./MovingMedian":28,"./OnOff":29,"./Rms":30,"./Segmenter":31,"./Select":32,"./Slicer":33,"./Yin":34}],36:[function(require,module,exports){
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
 * import * as lfo from 'waves-lfo/client';
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],37:[function(require,module,exports){
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
 * import * as lfo from 'waves-lfo/client';
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],38:[function(require,module,exports){
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
};

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
 * import * as lfo from 'waves-lfo/client';
 *
 * const logger = new lfo.sink.Logger({ data: true });
 * whateverOperator.connect(logger);
 */

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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],39:[function(require,module,exports){
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

},{"../../core/BaseLfo":42,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],40:[function(require,module,exports){
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

var _BaseLfo2 = require('../../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

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
 *     time: new Date().getTime(),
 *     data: [e.alpha, e.beta, e.gamma],
 *   };
 *
 *   eventIn.processFrame(frame);
 * }, false);
 */

var EventIn = function (_BaseLfo) {
  (0, _inherits3.default)(EventIn, _BaseLfo);

  function EventIn() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, EventIn);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EventIn.__proto__ || (0, _getPrototypeOf2.default)(EventIn)).call(this, definitions, options));

    var audioContext = _this.params.get('audioContext');
    _this._getTime = getTimeFunction(audioContext);
    _this._isStarted = false;
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
      var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.initStream();

      this._startTime = startTime;
      this._isStarted = true;
      // values set in the first `process` call
      this._systemTime = null;
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
      if (this._isStarted && this._startTime !== null) {
        var currentTime = this._getTime();
        var endTime = this.frame.time + (currentTime - this._systemTime);

        this.finalizeStream(endTime);
        this._isStarted = false;
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
      if (!this._isStarted) return;

      this.prepareFrame();
      this.processFunction(frame);
      this.propagateFrame();
    }
  }]);
  return EventIn;
}(_BaseLfo3.default);

exports.default = EventIn;

}).call(this,require('_process'))

},{"../../core/BaseLfo":42,"_process":45,"babel-runtime/core-js/number/is-finite":47,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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
 *   node apply on the stream. The type of input a node can handle is define
 *   by its implemented interface, if it implements `processSignal` a stream
 *   with `frameType === 'signal'` can be processed, `processVector` to handle
 *   an input of type `vector`.
 *
 * <span class="warning">_This class should be considered abstract and only
 * be used to be extended._</span>
 *
 *
 * // overview of the behavior of a node
 *
 * **processStreamParams(prevStreamParams)**
 *
 * `base` class (default implementation)
 * - call `preprocessStreamParams`
 * - call `propagateStreamParams`
 *
 * `child` class
 * - call `preprocessStreamParams`
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
 * - call `preprocessFrame`
 * - assign frameTime and frameMetadata to identity
 * - call the proper function according to inputType
 * - call `propagateFrame`
 *
 * `child` class
 * - call `preprocessFrame`
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
     * At each frame, the node forward its `frame` to to all its `nextOps`.
     *
     * @type {Array<BaseLfo>}
     * @name nextOps
     * @instance
     * @memberof module:common.core.BaseLfo
     * @see {@link module:common.core.BaseLfo#connect}
     * @see {@link module:common.core.BaseLfo#disconnect}
     */
    this.nextOps = [];

    /**
     * The node from which the node receive the frames (upper in the graph).
     *
     * @type {BaseLfo}
     * @name prevOp
     * @instance
     * @memberof module:common.core.BaseLfo
     * @see {@link module:common.core.BaseLfo#connect}
     * @see {@link module:common.core.BaseLfo#disconnect}
     */
    this.prevOp = null;

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
     * Connect the current node (`prevOp`) to another node (`nextOp`).
     * A given node can be connected to several operators and propagate the
     * stream to each of them.
     *
     * @param {BaseLfo} next - Next operator in the graph.
     * @see {@link module:common.core.BaseLfo#processFrame}
     * @see {@link module:common.core.BaseLfo#disconnect}
     */

  }, {
    key: 'connect',
    value: function connect(next) {
      if (!(next instanceof BaseLfo)) throw new Error('Invalid connection: child node is not an instance of `BaseLfo`');

      if (this.streamParams === null || next.streamParams === null) throw new Error('Invalid connection: cannot connect a dead node');

      this.nextOps.push(next);
      next.prevOp = this;

      if (this.streamParams.frameType !== null) // graph has already been started
        next.processStreamParams(this.streamParams);
    }

    /**
     * Remove the given operator from its previous operators' `nextOps`.
     *
     * @param {BaseLfo} [next=null] - The operator to disconnect from the current
     *  operator. If `null` disconnect all the next operators.
     */

  }, {
    key: 'disconnect',
    value: function disconnect() {
      var _this = this;

      var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (next === null) {
        this.nextOps.forEach(function (next) {
          return _this.disconnect(next);
        });
      } else {
        var index = this.nextOps.indexOf(this);
        this.nextOps.splice(index, 1);
        next.prevOp = null;
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
      var index = this.nextOps.length;

      while (index--) {
        this.nextOps[index].destroy();
      } // disconnect itself from the previous operator
      if (this.prevOp) this.prevOp.disconnect(this);

      // mark the object as dead
      this.streamParams = null;
    }

    /**
     * Helper to initialize the stream in standalone mode.
     *
     * @param {Object} [streamParams={}] - Stream parameters to be used.
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
      for (var i = 0, l = this.nextOps.length; i < l; i++) {
        this.nextOps[i].resetStream();
      } // no buffer for `scalar` type or sink node
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
      for (var i = 0, l = this.nextOps.length; i < l; i++) {
        this.nextOps[i].finalizeStream(endTime);
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

      for (var i = 0, l = this.nextOps.length; i < l; i++) {
        this.nextOps[i].processStreamParams(this.streamParams);
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
        var streamParams = this.prevOp !== null ? this.prevOp.streamParams : {};
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
      for (var i = 0, l = this.nextOps.length; i < l; i++) {
        this.nextOps[i].processFrame(this.frame);
      }
    }
  }]);
  return BaseLfo;
}();

exports.default = BaseLfo;

},{"babel-runtime/core-js/object/assign":48,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"parameters":2}],43:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = exports.version = '1.0.0';

},{"./BaseLfo":42}],44:[function(require,module,exports){
'use strict';

var _client = require('waves-lfo/client');

var lfo = _interopRequireWildcard(_client);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var eventIn = new lfo.source.EventIn({
  frameType: 'vector',
  frameSize: 3,
  frameRate: 20
});

var bpfRaw = new lfo.sink.BpfDisplay({
  canvas: '#sensors-raw',
  min: -10,
  max: 10,
  duration: 10
});

var biquad = new lfo.operator.Biquad({
  type: 'lowpass',
  f0: 0.5
});

var bpfFiltered = new lfo.sink.BpfDisplay({
  canvas: '#sensors-filtered',
  min: -10,
  max: 10,
  duration: 10
});

eventIn.connect(bpfRaw);
eventIn.connect(biquad);
biquad.connect(bpfFiltered);
eventIn.start();

window.addEventListener('devicemotion', function (e) {
  var _e$accelerationInclud = e.accelerationIncludingGravity,
      x = _e$accelerationInclud.x,
      y = _e$accelerationInclud.y,
      z = _e$accelerationInclud.z;

  eventIn.process(null, [x, y, z]);
}, false);

},{"waves-lfo/client":3}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/log10"), __esModule: true };
},{"core-js/library/fn/math/log10":63}],47:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/is-finite"), __esModule: true };
},{"core-js/library/fn/number/is-finite":64}],48:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":65}],49:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":66}],50:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":67}],51:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":68}],52:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":69}],53:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":70}],54:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":71}],55:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":72}],56:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],57:[function(require,module,exports){
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
},{"../core-js/object/define-property":50}],58:[function(require,module,exports){
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
},{"../core-js/object/define-property":50}],59:[function(require,module,exports){
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
},{"../core-js/object/get-own-property-descriptor":51,"../core-js/object/get-prototype-of":52}],60:[function(require,module,exports){
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
},{"../core-js/object/create":49,"../core-js/object/set-prototype-of":53,"../helpers/typeof":62}],61:[function(require,module,exports){
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
},{"../helpers/typeof":62}],62:[function(require,module,exports){
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
},{"../core-js/symbol":54,"../core-js/symbol/iterator":55}],63:[function(require,module,exports){
require('../../modules/es6.math.log10');
module.exports = require('../../modules/_core').Math.log10;
},{"../../modules/_core":78,"../../modules/es6.math.log10":133}],64:[function(require,module,exports){
require('../../modules/es6.number.is-finite');
module.exports = require('../../modules/_core').Number.isFinite;
},{"../../modules/_core":78,"../../modules/es6.number.is-finite":134}],65:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":78,"../../modules/es6.object.assign":135}],66:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":78,"../../modules/es6.object.create":136}],67:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":78,"../../modules/es6.object.define-property":137}],68:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":78,"../../modules/es6.object.get-own-property-descriptor":138}],69:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":78,"../../modules/es6.object.get-prototype-of":139}],70:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":78,"../../modules/es6.object.set-prototype-of":140}],71:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":78,"../../modules/es6.object.to-string":141,"../../modules/es6.symbol":143,"../../modules/es7.symbol.async-iterator":144,"../../modules/es7.symbol.observable":145}],72:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":130,"../../modules/es6.string.iterator":142,"../../modules/web.dom.iterable":146}],73:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],74:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],75:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":94}],76:[function(require,module,exports){
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
},{"./_to-index":122,"./_to-iobject":124,"./_to-length":125}],77:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],78:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],79:[function(require,module,exports){
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
},{"./_a-function":73}],80:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],81:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":86}],82:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":87,"./_is-object":94}],83:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],84:[function(require,module,exports){
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
},{"./_object-gops":109,"./_object-keys":112,"./_object-pie":113}],85:[function(require,module,exports){
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
},{"./_core":78,"./_ctx":79,"./_global":87,"./_hide":89}],86:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],87:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],88:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],89:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":81,"./_object-dp":104,"./_property-desc":115}],90:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":87}],91:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":81,"./_dom-create":82,"./_fails":86}],92:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":77}],93:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":77}],94:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],95:[function(require,module,exports){
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
},{"./_hide":89,"./_object-create":103,"./_property-desc":115,"./_set-to-string-tag":118,"./_wks":131}],96:[function(require,module,exports){
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
},{"./_export":85,"./_has":88,"./_hide":89,"./_iter-create":95,"./_iterators":98,"./_library":100,"./_object-gpo":110,"./_redefine":116,"./_set-to-string-tag":118,"./_wks":131}],97:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],98:[function(require,module,exports){
module.exports = {};
},{}],99:[function(require,module,exports){
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
},{"./_object-keys":112,"./_to-iobject":124}],100:[function(require,module,exports){
module.exports = true;
},{}],101:[function(require,module,exports){
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
},{"./_fails":86,"./_has":88,"./_is-object":94,"./_object-dp":104,"./_uid":128}],102:[function(require,module,exports){
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
},{"./_fails":86,"./_iobject":92,"./_object-gops":109,"./_object-keys":112,"./_object-pie":113,"./_to-object":126}],103:[function(require,module,exports){
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

},{"./_an-object":75,"./_dom-create":82,"./_enum-bug-keys":83,"./_html":90,"./_object-dps":105,"./_shared-key":119}],104:[function(require,module,exports){
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
},{"./_an-object":75,"./_descriptors":81,"./_ie8-dom-define":91,"./_to-primitive":127}],105:[function(require,module,exports){
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
},{"./_an-object":75,"./_descriptors":81,"./_object-dp":104,"./_object-keys":112}],106:[function(require,module,exports){
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
},{"./_descriptors":81,"./_has":88,"./_ie8-dom-define":91,"./_object-pie":113,"./_property-desc":115,"./_to-iobject":124,"./_to-primitive":127}],107:[function(require,module,exports){
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

},{"./_object-gopn":108,"./_to-iobject":124}],108:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":83,"./_object-keys-internal":111}],109:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],110:[function(require,module,exports){
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
},{"./_has":88,"./_shared-key":119,"./_to-object":126}],111:[function(require,module,exports){
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
},{"./_array-includes":76,"./_has":88,"./_shared-key":119,"./_to-iobject":124}],112:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":83,"./_object-keys-internal":111}],113:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],114:[function(require,module,exports){
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
},{"./_core":78,"./_export":85,"./_fails":86}],115:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],116:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":89}],117:[function(require,module,exports){
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
},{"./_an-object":75,"./_ctx":79,"./_is-object":94,"./_object-gopd":106}],118:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":88,"./_object-dp":104,"./_wks":131}],119:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":120,"./_uid":128}],120:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":87}],121:[function(require,module,exports){
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
},{"./_defined":80,"./_to-integer":123}],122:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":123}],123:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],124:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":80,"./_iobject":92}],125:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":123}],126:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":80}],127:[function(require,module,exports){
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
},{"./_is-object":94}],128:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],129:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":78,"./_global":87,"./_library":100,"./_object-dp":104,"./_wks-ext":130}],130:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":131}],131:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":87,"./_shared":120,"./_uid":128}],132:[function(require,module,exports){
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
},{"./_add-to-unscopables":74,"./_iter-define":96,"./_iter-step":97,"./_iterators":98,"./_to-iobject":124}],133:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":85}],134:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":85,"./_global":87}],135:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":85,"./_object-assign":102}],136:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":85,"./_object-create":103}],137:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":81,"./_export":85,"./_object-dp":104}],138:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":106,"./_object-sap":114,"./_to-iobject":124}],139:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":110,"./_object-sap":114,"./_to-object":126}],140:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":85,"./_set-proto":117}],141:[function(require,module,exports){

},{}],142:[function(require,module,exports){
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
},{"./_iter-define":96,"./_string-at":121}],143:[function(require,module,exports){
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
},{"./_an-object":75,"./_descriptors":81,"./_enum-keys":84,"./_export":85,"./_fails":86,"./_global":87,"./_has":88,"./_hide":89,"./_is-array":93,"./_keyof":99,"./_library":100,"./_meta":101,"./_object-create":103,"./_object-dp":104,"./_object-gopd":106,"./_object-gopn":108,"./_object-gopn-ext":107,"./_object-gops":109,"./_object-keys":112,"./_object-pie":113,"./_property-desc":115,"./_redefine":116,"./_set-to-string-tag":118,"./_shared":120,"./_to-iobject":124,"./_to-primitive":127,"./_uid":128,"./_wks":131,"./_wks-define":129,"./_wks-ext":130}],144:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":129}],145:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":129}],146:[function(require,module,exports){
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
},{"./_global":87,"./_hide":89,"./_iterators":98,"./_wks":131,"./es6.array.iterator":132}]},{},[44])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi8uLi8uLi8uLi9pcmNhbS1qc3Rvb2xzL2xpYi9wYXJhbWV0ZXJzL2Rpc3QvcGFyYW1UZW1wbGF0ZXMuanMiLCIuLi8uLi8uLi8uLi8uLi9pcmNhbS1qc3Rvb2xzL2xpYi9wYXJhbWV0ZXJzL2Rpc3QvcGFyYW1ldGVycy5qcyIsIi4uLy4uL2NsaWVudC9pbmRleC5qcyIsIi4uLy4uL2NsaWVudC9zaW5rL0Jhc2VEaXNwbGF5LmpzIiwiLi4vLi4vY2xpZW50L3NpbmsvQnBmRGlzcGxheS5qcyIsIi4uLy4uL2NsaWVudC9zaW5rL01hcmtlckRpc3BsYXkuanMiLCIuLi8uLi9jbGllbnQvc2luay9TaWduYWxEaXNwbGF5LmpzIiwiLi4vLi4vY2xpZW50L3NpbmsvU3BlY3RydW1EaXNwbGF5LmpzIiwiLi4vLi4vY2xpZW50L3NpbmsvVHJhY2VEaXNwbGF5LmpzIiwiLi4vLi4vY2xpZW50L3NpbmsvVnVNZXRlckRpc3BsYXkuanMiLCIuLi8uLi9jbGllbnQvc2luay9XYXZlZm9ybURpc3BsYXkuanMiLCIuLi8uLi9jbGllbnQvc2luay9fbmFtZXNwYWNlLmpzIiwiLi4vLi4vY2xpZW50L3NvdXJjZS9BdWRpb0luQnVmZmVyLmpzIiwiLi4vLi4vY2xpZW50L3NvdXJjZS9BdWRpb0luTm9kZS5qcyIsIi4uLy4uL2NsaWVudC9zb3VyY2UvX25hbWVzcGFjZS5qcyIsIi4uLy4uL2NsaWVudC91dGlscy9EaXNwbGF5U3luYy5qcyIsIi4uLy4uL2NsaWVudC91dGlscy9fbmFtZXNwYWNlLmpzIiwiLi4vLi4vY2xpZW50L3V0aWxzL2Rpc3BsYXktdXRpbHMuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvQmlxdWFkLmpzIiwiLi4vLi4vY29tbW9uL29wZXJhdG9yL0RjdC5qcyIsIi4uLy4uL2NvbW1vbi9vcGVyYXRvci9GZnQuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvTWFnbml0dWRlLmpzIiwiLi4vLi4vY29tbW9uL29wZXJhdG9yL01lYW5TdGRkZXYuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvTWVsLmpzIiwiLi4vLi4vY29tbW9uL29wZXJhdG9yL01mY2MuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvTWluTWF4LmpzIiwiLi4vLi4vY29tbW9uL29wZXJhdG9yL01vdmluZ0F2ZXJhZ2UuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvTW92aW5nTWVkaWFuLmpzIiwiLi4vLi4vY29tbW9uL29wZXJhdG9yL09uT2ZmLmpzIiwiLi4vLi4vY29tbW9uL29wZXJhdG9yL1Jtcy5qcyIsIi4uLy4uL2NvbW1vbi9vcGVyYXRvci9TZWdtZW50ZXIuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvU2VsZWN0LmpzIiwiLi4vLi4vY29tbW9uL29wZXJhdG9yL1NsaWNlci5qcyIsIi4uLy4uL2NvbW1vbi9vcGVyYXRvci9ZaW4uanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvX25hbWVzcGFjZS5qcyIsIi4uLy4uL2NvbW1vbi9zaW5rL0JyaWRnZS5qcyIsIi4uLy4uL2NvbW1vbi9zaW5rL0RhdGFSZWNvcmRlci5qcyIsIi4uLy4uL2NvbW1vbi9zaW5rL0xvZ2dlci5qcyIsIi4uLy4uL2NvbW1vbi9zaW5rL1NpZ25hbFJlY29yZGVyLmpzIiwiLi4vLi4vY29tbW9uL3NvdXJjZS9FdmVudEluLmpzIiwiLi4vLi4vY29tbW9uL3V0aWxzL3dpbmRvd3MuanMiLCIuLi8uLi9jb3JlL0Jhc2VMZm8uanMiLCIuLi8uLi9jb3JlL2luZGV4LmpzIiwiZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL21hdGgvbG9nMTAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL251bWJlci9pcy1maW5pdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2dldC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cxMC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLWZpbml0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXRoLmxvZzEwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5udW1iZXIuaXMtZmluaXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBLElBQU0sTUFBTSxLQUFLLEdBQWpCO0FBQ0EsSUFBTSxNQUFNLEtBQUssR0FBakI7O0FBRUEsU0FBUyxJQUFULENBQWMsS0FBZCxFQUEyRDtBQUFBLE1BQXRDLEtBQXNDLHVFQUE5QixDQUFDLFFBQTZCO0FBQUEsTUFBbkIsS0FBbUIsdUVBQVgsQ0FBQyxRQUFVOztBQUN6RCxTQUFPLElBQUksS0FBSixFQUFXLElBQUksS0FBSixFQUFXLEtBQVgsQ0FBWCxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBcUJlO0FBQ2I7Ozs7Ozs7QUFPQSxXQUFTO0FBQ1Asd0JBQW9CLENBQUMsU0FBRCxDQURiO0FBRVAscUJBRk8sNkJBRVcsS0FGWCxFQUVrQixVQUZsQixFQUU4QixJQUY5QixFQUVvQztBQUN6QyxVQUFJLE9BQU8sS0FBUCxLQUFpQixTQUFyQixFQUNFLE1BQU0sSUFBSSxLQUFKLHVDQUE4QyxJQUE5QyxXQUF3RCxLQUF4RCxDQUFOOztBQUVGLGFBQU8sS0FBUDtBQUNEO0FBUE0sR0FSSTs7QUFrQmI7Ozs7Ozs7OztBQVNBLFdBQVM7QUFDUCx3QkFBb0IsQ0FBQyxTQUFELENBRGI7QUFFUCxxQkFGTyw2QkFFVyxLQUZYLEVBRWtCLFVBRmxCLEVBRThCLElBRjlCLEVBRW9DO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcExBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU9BOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IG1pbiA9IE1hdGgubWluO1xuY29uc3QgbWF4ID0gTWF0aC5tYXg7XG5cbmZ1bmN0aW9uIGNsaXAodmFsdWUsIGxvd2VyID0gLUluZmluaXR5LCB1cHBlciA9ICtJbmZpbml0eSkge1xuICByZXR1cm4gbWF4KGxvd2VyLCBtaW4odXBwZXIsIHZhbHVlKSlcbn1cblxuLyoqXG4gKiBEaWN0aW9ubmFyeSBvZiB0aGUgYXZhaWxhYmxlIHR5cGVzLiBFYWNoIGtleSBjb3JyZXNwb25kIHRvIHRoZSB0eXBlIG9mIHRoZVxuICogaW1wbGVtZW50ZWQgcGFyYW0gd2hpbGUgdGhlIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHZhbHVlIHNob3VsZCB0aGVcbiAqIHtAbGluayBgcGFyYW1EZWZpbml0aW9uYH0gb2YgdGhlIGRlZmluZWQgdHlwZS5cbiAqXG4gKiB0eXBlZGVmIHtPYmplY3R9IHBhcmFtVGVtcGxhdGVzXG4gKiBAdHlwZSB7T2JqZWN0PFN0cmluZywgcGFyYW1UZW1wbGF0ZT59XG4gKi9cblxuLyoqXG4gKiBEZWZpbml0aW9uIG9mIGEgcGFyYW1ldGVyLiBUaGUgZGVmaW5pdGlvbiBzaG91bGQgYXQgbGVhc3QgY29udGFpbiB0aGUgZW50cmllc1xuICogYHR5cGVgIGFuZCBgZGVmYXVsdGAuIEV2ZXJ5IHBhcmFtZXRlciBjYW4gYWxzbyBhY2NlcHQgb3B0aW9ubmFsIGNvbmZpZ3VyYXRpb25cbiAqIGVudHJpZXMgYGNvbnN0YW50YCBhbmQgYG1ldGFzYC5cbiAqIEF2YWlsYWJsZSBkZWZpbml0aW9ucyBhcmU6XG4gKiAtIHtAbGluayBib29sZWFuRGVmaW5pdGlvbn1cbiAqIC0ge0BsaW5rIGludGVnZXJEZWZpbml0aW9ufVxuICogLSB7QGxpbmsgZmxvYXREZWZpbml0aW9ufVxuICogLSB7QGxpbmsgc3RyaW5nRGVmaW5pdGlvbn1cbiAqIC0ge0BsaW5rIGVudW1EZWZpbml0aW9ufVxuICpcbiAqIHR5cGVkZWYge09iamVjdH0gcGFyYW1EZWZpbml0aW9uXG4gKiBAcHJvcGVydHkge1N0cmluZ30gdHlwZSAtIFR5cGUgb2YgdGhlIHBhcmFtZXRlci5cbiAqIEBwcm9wZXJ0eSB7TWl4ZWR9IGRlZmF1bHQgLSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIgaWYgbm9cbiAqICBpbml0aWFsaXphdGlvbiB2YWx1ZSBpcyBwcm92aWRlZC5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnN0YW50PWZhbHNlXSAtIERlZmluZSBpZiB0aGUgcGFyYW1ldGVyIGNhbiBiZSBjaGFuZ2VcbiAqICBhZnRlciBpdHMgaW5pdGlhbGl6YXRpb24uXG4gKiBAcHJvcGVydHkge09iamVjdH0gW21ldGFzPW51bGxdIC0gQW55IHVzZXIgZGVmaW5lZCBkYXRhIGFzc29jaWF0ZWQgdG8gdGhlXG4gKiAgcGFyYW1ldGVyIHRoYXQgY291bHMgYmUgdXNlZnVsbCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogQHR5cGVkZWYge09iamVjdH0gYm9vbGVhbkRlZmluaXRpb25cbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFt0eXBlPSdib29sZWFuJ10gLSBEZWZpbmUgYSBib29sZWFuIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBkZWZhdWx0IC0gRGVmYXVsdCB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IFtjb25zdGFudD1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIHBhcmFtZXRlciBpcyBjb25zdGFudC5cbiAgICogQHByb3BlcnR5IHtPYmplY3R9IFttZXRhcz17fV0gLSBPcHRpb25uYWwgbWV0YWRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG4gIGJvb2xlYW46IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSBmb3IgYm9vbGVhbiBwYXJhbSBcIiR7bmFtZX1cIjogJHt2YWx1ZX1gKTtcblxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQHR5cGVkZWYge09iamVjdH0gaW50ZWdlckRlZmluaXRpb25cbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFt0eXBlPSdpbnRlZ2VyJ10gLSBEZWZpbmUgYSBib29sZWFuIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBkZWZhdWx0IC0gRGVmYXVsdCB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IFttaW49LUluZmluaXR5XSAtIE1pbmltdW0gdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbbWF4PStJbmZpbml0eV0gLSBNYXhpbXVtIHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnN0YW50PWZhbHNlXSAtIERlZmluZSBpZiB0aGUgcGFyYW1ldGVyIGlzIGNvbnN0YW50LlxuICAgKiBAcHJvcGVydHkge09iamVjdH0gW21ldGFzPXt9XSAtIE9wdGlvbm5hbCBtZXRhZGF0YSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgaW50ZWdlcjoge1xuICAgIGRlZmluaXRpb25UZW1wbGF0ZTogWydkZWZhdWx0J10sXG4gICAgdHlwZUNoZWNrRnVuY3Rpb24odmFsdWUsIGRlZmluaXRpb24sIG5hbWUpIHtcbiAgICAgIGlmICghKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZhbHVlIGZvciBpbnRlZ2VyIHBhcmFtIFwiJHtuYW1lfVwiOiAke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gY2xpcCh2YWx1ZSwgZGVmaW5pdGlvbi5taW4sIGRlZmluaXRpb24ubWF4KTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IGZsb2F0RGVmaW5pdGlvblxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gW3R5cGU9J2Zsb2F0J10gLSBEZWZpbmUgYSBib29sZWFuIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBkZWZhdWx0IC0gRGVmYXVsdCB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IFttaW49LUluZmluaXR5XSAtIE1pbmltdW0gdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbbWF4PStJbmZpbml0eV0gLSBNYXhpbXVtIHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnN0YW50PWZhbHNlXSAtIERlZmluZSBpZiB0aGUgcGFyYW1ldGVyIGlzIGNvbnN0YW50LlxuICAgKiBAcHJvcGVydHkge09iamVjdH0gW21ldGFzPXt9XSAtIE9wdGlvbm5hbCBtZXRhZGF0YSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgZmxvYXQ6IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fMKgdmFsdWUgIT09IHZhbHVlKSAvLyByZWplY3QgTmFOXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSBmb3IgZmxvYXQgcGFyYW0gXCIke25hbWV9XCI6ICR7dmFsdWV9YCk7XG5cbiAgICAgIHJldHVybiBjbGlwKHZhbHVlLCBkZWZpbml0aW9uLm1pbiwgZGVmaW5pdGlvbi5tYXgpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQHR5cGVkZWYge09iamVjdH0gc3RyaW5nRGVmaW5pdGlvblxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gW3R5cGU9J3N0cmluZyddIC0gRGVmaW5lIGEgYm9vbGVhbiBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVmYXVsdCAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbY29uc3RhbnQ9ZmFsc2VdIC0gRGVmaW5lIGlmIHRoZSBwYXJhbWV0ZXIgaXMgY29uc3RhbnQuXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBbbWV0YXM9e31dIC0gT3B0aW9ubmFsIG1ldGFkYXRhIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBzdHJpbmc6IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZhbHVlIGZvciBzdHJpbmcgcGFyYW0gXCIke25hbWV9XCI6ICR7dmFsdWV9YCk7XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IGVudW1EZWZpbml0aW9uXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbdHlwZT0nZW51bSddIC0gRGVmaW5lIGEgYm9vbGVhbiBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVmYXVsdCAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gbGlzdCAtIFBvc3NpYmxlIHZhbHVlcyBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IFtjb25zdGFudD1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIHBhcmFtZXRlciBpcyBjb25zdGFudC5cbiAgICogQHByb3BlcnR5IHtPYmplY3R9IFttZXRhcz17fV0gLSBPcHRpb25uYWwgbWV0YWRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG4gIGVudW06IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCcsICdsaXN0J10sXG4gICAgdHlwZUNoZWNrRnVuY3Rpb24odmFsdWUsIGRlZmluaXRpb24sIG5hbWUpIHtcbiAgICAgIGlmIChkZWZpbml0aW9uLmxpc3QuaW5kZXhPZih2YWx1ZSkgPT09IC0xKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmFsdWUgZm9yIGVudW0gcGFyYW0gXCIke25hbWV9XCI6ICR7dmFsdWV9YCk7XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IGFueURlZmluaXRpb25cbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFt0eXBlPSdlbnVtJ10gLSBEZWZpbmUgYSBwYXJhbWV0ZXIgb2YgYW55IHR5cGUuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVmYXVsdCAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbY29uc3RhbnQ9ZmFsc2VdIC0gRGVmaW5lIGlmIHRoZSBwYXJhbWV0ZXIgaXMgY29uc3RhbnQuXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBbbWV0YXM9e31dIC0gT3B0aW9ubmFsIG1ldGFkYXRhIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBhbnk6IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICAvLyBubyBjaGVjayBhcyBpdCBjYW4gaGF2ZSBhbnkgdHlwZS4uLlxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHBhcmFtVGVtcGxhdGVzIGZyb20gJy4vcGFyYW1UZW1wbGF0ZXMnO1xuXG4vKipcbiAqIEdlbmVyaWMgY2xhc3MgZm9yIHR5cGVkIHBhcmFtZXRlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOYW1lIG9mIHRoZSBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBkZWZpbml0aW9uVGVtcGxhdGUgLSBMaXN0IG9mIG1hbmRhdG9yeSBrZXlzIGluIHRoZSBwYXJhbVxuICogIGRlZmluaXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0eXBlQ2hlY2tGdW5jdGlvbiAtIEZ1bmN0aW9uIHRvIGJlIHVzZWQgaW4gb3JkZXIgdG8gY2hlY2tcbiAqICB0aGUgdmFsdWUgYWdhaW5zdCB0aGUgcGFyYW0gZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZpbml0aW9uIC0gRGVmaW5pdGlvbiBvZiB0aGUgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSBWYWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgUGFyYW0ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkZWZpbml0aW9uVGVtcGxhdGUsIHR5cGVDaGVja0Z1bmN0aW9uLCBkZWZpbml0aW9uLCB2YWx1ZSkge1xuICAgIGRlZmluaXRpb25UZW1wbGF0ZS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKGRlZmluaXRpb24uaGFzT3duUHJvcGVydHkoa2V5KSA9PT0gZmFsc2UpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBkZWZpbml0aW9uIGZvciBwYXJhbSBcIiR7bmFtZX1cIiwgJHtrZXl9IGlzIG5vdCBkZWZpbmVkYCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudHlwZSA9IGRlZmluaXRpb24udHlwZTtcbiAgICB0aGlzLmRlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuXG4gICAgaWYgKHRoaXMuZGVmaW5pdGlvbi5udWxsYWJsZSA9PT0gdHJ1ZSAmJiB2YWx1ZSA9PT0gbnVsbClcbiAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgIGVsc2VcbiAgICAgIHRoaXMudmFsdWUgPSB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSk7XG4gICAgdGhpcy5fdHlwZUNoZWNrRnVuY3Rpb24gPSB0eXBlQ2hlY2tGdW5jdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgKiBAcmV0dXJuIHtNaXhlZH1cbiAgICovXG4gIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSBOZXcgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gLSBgdHJ1ZWAgaWYgdGhlIHBhcmFtIGhhcyBiZWVuIHVwZGF0ZWQsIGZhbHNlIG90aGVyd2lzZVxuICAgKiAgKGUuZy4gaWYgdGhlIHBhcmFtZXRlciBhbHJlYWR5IGhhZCB0aGlzIHZhbHVlKS5cbiAgICovXG4gIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZGVmaW5pdGlvbi5jb25zdGFudCA9PT0gdHJ1ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhc3NpZ25lbWVudCB0byBjb25zdGFudCBwYXJhbSBcIiR7dGhpcy5uYW1lfVwiYCk7XG5cbiAgICBpZiAoISh0aGlzLmRlZmluaXRpb24ubnVsbGFibGUgPT09IHRydWUgJiYgdmFsdWUgPT09IG51bGwpKVxuICAgICAgdmFsdWUgPSB0aGlzLl90eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgdGhpcy5kZWZpbml0aW9uLCB0aGlzLm5hbWUpO1xuXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuXG4vKipcbiAqIEJhZyBvZiBwYXJhbWV0ZXJzLiBNYWluIGludGVyZmFjZSBvZiB0aGUgbGlicmFyeVxuICovXG5jbGFzcyBQYXJhbWV0ZXJCYWcge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMsIGRlZmluaXRpb25zKSB7XG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBwYXJhbWV0ZXJzLlxuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdDxTdHJpbmcsIFBhcmFtPn1cbiAgICAgKiBAbmFtZSBfcGFyYW1zXG4gICAgICogQG1lbWJlcm9mIFBhcmFtZXRlckJhZ1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBkZWZpbml0aW9ucyB3aXRoIGluaXQgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdDxTdHJpbmcsIHBhcmFtRGVmaW5pdGlvbj59XG4gICAgICogQG5hbWUgX2RlZmluaXRpb25zXG4gICAgICogQG1lbWJlcm9mIFBhcmFtZXRlckJhZ1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fZGVmaW5pdGlvbnMgPSBkZWZpbml0aW9ucztcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgZ2xvYmFsIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtTZXR9XG4gICAgICogQG5hbWUgX2dsb2JhbExpc3RlbmVyc1xuICAgICAqIEBtZW1iZXJvZiBQYXJhbWV0ZXJCYWdcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX2dsb2JhbExpc3RlbmVycyA9IG5ldyBTZXQoKTtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgcGFyYW1zIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3Q8U3RyaW5nLCBTZXQ+fVxuICAgICAqIEBuYW1lIF9wYXJhbXNMaXN0ZW5lcnNcbiAgICAgKiBAbWVtYmVyb2YgUGFyYW1ldGVyQmFnXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9wYXJhbXNMaXN0ZW5lcnMgPSB7fTtcblxuICAgIC8vIGluaXRpYWxpemUgZW1wdHkgU2V0IGZvciBlYWNoIHBhcmFtXG4gICAgZm9yIChsZXQgbmFtZSBpbiBwYXJhbXMpXG4gICAgICB0aGlzLl9wYXJhbXNMaXN0ZW5lcnNbbmFtZV0gPSBuZXcgU2V0KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBnaXZlbiBkZWZpbml0aW9ucyBhbG9uZyB3aXRoIHRoZSBpbml0aWFsaXphdGlvbiB2YWx1ZXMuXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldERlZmluaXRpb25zKG5hbWUgPSBudWxsKSB7XG4gICAgaWYgKG5hbWUgIT09IG51bGwpXG4gICAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbnNbbmFtZV07XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIHBhcmFtZXRlci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOYW1lIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEByZXR1cm4ge01peGVkfSAtIFZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBnZXQobmFtZSkge1xuICAgIGlmICghdGhpcy5fcGFyYW1zW25hbWVdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVhZCBwcm9wZXJ0eSB2YWx1ZSBvZiB1bmRlZmluZWQgcGFyYW1ldGVyIFwiJHtuYW1lfVwiYCk7XG5cbiAgICByZXR1cm4gdGhpcy5fcGFyYW1zW25hbWVdLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdmFsdWUgb2YgYSBwYXJhbWV0ZXIuIElmIHRoZSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyIGlzIHVwZGF0ZWRcbiAgICogKGFrYSBpZiBwcmV2aW91cyB2YWx1ZSBpcyBkaWZmZXJlbnQgZnJvbSBuZXcgdmFsdWUpIGFsbCByZWdpc3RlcmVkXG4gICAqIGNhbGxiYWNrcyBhcmUgcmVnaXN0ZXJlZC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOYW1lIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gVmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHJldHVybiB7TWl4ZWR9IC0gTmV3IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBzZXQobmFtZSwgdmFsdWUpIHtcbiAgICBjb25zdCBwYXJhbSA9IHRoaXMuX3BhcmFtc1tuYW1lXTtcbiAgICBjb25zdCB1cGRhdGVkID0gcGFyYW0uc2V0VmFsdWUodmFsdWUpO1xuICAgIHZhbHVlID0gcGFyYW0uZ2V0VmFsdWUoKTtcblxuICAgIGlmICh1cGRhdGVkKSB7XG4gICAgICBjb25zdCBtZXRhcyA9IHBhcmFtLmRlZmluaXRpb24ubWV0YXM7XG4gICAgICAvLyB0cmlnZ2VyIGdsb2JhbCBsaXN0ZW5lcnNcbiAgICAgIGZvciAobGV0IGxpc3RlbmVyIG9mIHRoaXMuX2dsb2JhbExpc3RlbmVycylcbiAgICAgICAgbGlzdGVuZXIobmFtZSwgdmFsdWUsIG1ldGFzKTtcblxuICAgICAgLy8gdHJpZ2dlciBwYXJhbSBsaXN0ZW5lcnNcbiAgICAgIGZvciAobGV0IGxpc3RlbmVyIG9mIHRoaXMuX3BhcmFtc0xpc3RlbmVyc1tuYW1lXSlcbiAgICAgICAgbGlzdGVuZXIodmFsdWUsIG1ldGFzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lIGlmIHRoZSBgbmFtZWAgcGFyYW1ldGVyIGV4aXN0cyBvciBub3QuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaGFzKG5hbWUpIHtcbiAgICByZXR1cm4gKHRoaXMuX3BhcmFtc1tuYW1lXSkgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgYSBwYXJhbWV0ZXIgdG8gaXRzIGluaXQgdmFsdWUuIFJlc2V0IGFsbCBwYXJhbWV0ZXJzIGlmIG5vIGFyZ3VtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWU9bnVsbF0gLSBOYW1lIG9mIHRoZSBwYXJhbWV0ZXIgdG8gcmVzZXQuXG4gICAqL1xuICByZXNldChuYW1lID0gbnVsbCkge1xuICAgIGlmIChuYW1lICE9PSBudWxsKVxuICAgICAgdGhpcy5zZXQobmFtZSwgcGFyYW0uZGVmaW5pdGlvbi5pbml0VmFsdWUpO1xuICAgIGVsc2VcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX3BhcmFtcykuZm9yRWFjaCgobmFtZSkgPT4gdGhpcy5yZXNldChuYW1lKSk7XG4gIH1cblxuICAvKipcbiAgICogQGNhbGxiYWNrIFBhcmFtZXRlckJhZ35saXN0ZW5lckNhbGxiYWNrXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gUGFyYW1ldGVyIG5hbWUuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gVXBkYXRlZCB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW21ldGE9XSAtIEdpdmVuIG1ldGEgZGF0YSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cblxuICAvKipcbiAgICogQWRkIGxpc3RlbmVyIHRvIGFsbCBwYXJhbSB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlckJhZ35saXN0ZW5lckNhbGxhY2t9IGNhbGxiYWNrIC0gTGlzdGVuZXIgdG8gcmVnaXN0ZXIuXG4gICAqL1xuICBhZGRMaXN0ZW5lcihjYWxsYmFjaykge1xuICAgIHRoaXMuX2dsb2JhbExpc3RlbmVycy5hZGQoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBsaXN0ZW5lciBmcm9tIGFsbCBwYXJhbSBjaGFuZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlckJhZ35saXN0ZW5lckNhbGxhY2t9IGNhbGxiYWNrIC0gTGlzdGVuZXIgdG8gcmVtb3ZlLiBJZlxuICAgKiAgYG51bGxgIHJlbW92ZSBhbGwgbGlzdGVuZXJzLlxuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXIoY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKGNhbGxiYWNrID09PSBudWxsKVxuICAgICAgdGhpcy5fZ2xvYmFsTGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5fZ2xvYmFsTGlzdGVuZXJzLmRlbGV0ZShjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogQGNhbGxiYWNrIFBhcmFtZXRlckJhZ35wYXJhbUxpc3RlbmVyQ2FsbGFja1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIFVwZGF0ZWQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtPYmplY3R9IFttZXRhPV0gLSBHaXZlbiBtZXRhIGRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG5cbiAgLyoqXG4gICAqIEFkZCBsaXN0ZW5lciB0byBhIGdpdmVuIHBhcmFtIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gUGFyYW1ldGVyIG5hbWUuXG4gICAqIEBwYXJhbSB7UGFyYW1ldGVyQmFnfnBhcmFtTGlzdGVuZXJDYWxsYWNrfSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGFwcGx5XG4gICAqICB3aGVuIHRoZSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyIGNoYW5nZXMuXG4gICAqL1xuICBhZGRQYXJhbUxpc3RlbmVyKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fcGFyYW1zTGlzdGVuZXJzW25hbWVdLmFkZChjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGxpc3RlbmVyIGZyb20gYSBnaXZlbiBwYXJhbSB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFBhcmFtZXRlciBuYW1lLlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlckJhZ35wYXJhbUxpc3RlbmVyQ2FsbGFja30gY2FsbGJhY2sgLSBMaXN0ZW5lciB0byByZW1vdmUuXG4gICAqICBJZiBgbnVsbGAgcmVtb3ZlIGFsbCBsaXN0ZW5lcnMuXG4gICAqL1xuICByZW1vdmVQYXJhbUxpc3RlbmVyKG5hbWUsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmIChjYWxsYmFjayA9PT0gbnVsbClcbiAgICAgIHRoaXMuX3BhcmFtc0xpc3RlbmVyc1tuYW1lXS5jbGVhcigpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuX3BhcmFtc0xpc3RlbmVyc1tuYW1lXS5kZWxldGUoY2FsbGJhY2spO1xuICB9XG59XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgdGhlIGBQYXJhbWV0ZXJCYWdgIGNsYXNzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PFN0cmluZywgcGFyYW1EZWZpbml0aW9uPn0gZGVmaW5pdGlvbnMgLSBPYmplY3QgZGVzY3JpYmluZyB0aGVcbiAqICBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3Q8U3RyaW5nLCBNaXhlZD59IHZhbHVlcyAtIEluaXRpYWxpemF0aW9uIHZhbHVlcyBmb3IgdGhlXG4gKiAgcGFyYW1ldGVycy5cbiAqIEByZXR1cm4ge1BhcmFtZXRlckJhZ31cbiAqL1xuZnVuY3Rpb24gcGFyYW1ldGVycyhkZWZpbml0aW9ucywgdmFsdWVzID0ge30pIHtcbiAgY29uc3QgcGFyYW1zID0ge307XG5cbiAgZm9yIChsZXQgbmFtZSBpbiB2YWx1ZXMpIHtcbiAgICBpZiAoZGVmaW5pdGlvbnMuaGFzT3duUHJvcGVydHkobmFtZSkgPT09IGZhbHNlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBhcmFtIFwiJHtuYW1lfVwiYCk7XG4gIH1cblxuICBmb3IgKGxldCBuYW1lIGluIGRlZmluaXRpb25zKSB7XG4gICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA9PT0gdHJ1ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiJHtuYW1lfVwiIGFscmVhZHkgZGVmaW5lZGApO1xuXG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IGRlZmluaXRpb25zW25hbWVdO1xuXG4gICAgaWYgKCFwYXJhbVRlbXBsYXRlc1tkZWZpbml0aW9uLnR5cGVdKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBhcmFtIHR5cGUgXCIke2RlZmluaXRpb24udHlwZX1cImApO1xuXG4gICAgY29uc3Qge1xuICAgICAgZGVmaW5pdGlvblRlbXBsYXRlLFxuICAgICAgdHlwZUNoZWNrRnVuY3Rpb25cbiAgICB9ID0gcGFyYW1UZW1wbGF0ZXNbZGVmaW5pdGlvbi50eXBlXTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkobmFtZSkgPT09IHRydWUpXG4gICAgICB2YWx1ZSA9IHZhbHVlc1tuYW1lXTtcbiAgICBlbHNlXG4gICAgICB2YWx1ZSA9IGRlZmluaXRpb24uZGVmYXVsdDtcblxuICAgIC8vIHN0b3JlIGluaXQgdmFsdWUgaW4gZGVmaW5pdGlvblxuICAgIGRlZmluaXRpb24uaW5pdFZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAoIXR5cGVDaGVja0Z1bmN0aW9uIHx8wqAhZGVmaW5pdGlvblRlbXBsYXRlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBhcmFtIHR5cGUgZGVmaW5pdGlvbiBcIiR7ZGVmaW5pdGlvbi50eXBlfVwiYCk7XG5cbiAgICBwYXJhbXNbbmFtZV0gPSBuZXcgUGFyYW0obmFtZSwgZGVmaW5pdGlvblRlbXBsYXRlLCB0eXBlQ2hlY2tGdW5jdGlvbiwgZGVmaW5pdGlvbiwgdmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQYXJhbWV0ZXJCYWcocGFyYW1zLCBkZWZpbml0aW9ucyk7XG59XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBuZXcgdHlwZSBmb3IgdGhlIGBwYXJhbWV0ZXJzYCBmYWN0b3J5LlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVOYW1lIC0gVmFsdWUgdGhhdCB3aWxsIGJlIGF2YWlsYWJsZSBhcyB0aGUgYHR5cGVgIG9mIGFcbiAqICBwYXJhbSBkZWZpbml0aW9uLlxuICogQHBhcmFtIHtwYXJhbWV0ZXJEZWZpbml0aW9ufSBwYXJhbWV0ZXJEZWZpbml0aW9uIC0gT2JqZWN0IGRlc2NyaWJpbmcgdGhlXG4gKiAgcGFyYW1ldGVyLlxuICovXG5wYXJhbWV0ZXJzLmRlZmluZVR5cGUgPSBmdW5jdGlvbih0eXBlTmFtZSwgcGFyYW1ldGVyRGVmaW5pdGlvbikge1xuICBwYXJhbVRlbXBsYXRlc1t0eXBlTmFtZV0gPSBwYXJhbWV0ZXJEZWZpbml0aW9uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwYXJhbWV0ZXJzO1xuIiwiZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnJXZlcnNpb24lJztcblxuaW1wb3J0ICogYXMgX2NvcmUgZnJvbSAnLi4vY29yZSc7XG5leHBvcnQgY29uc3QgY29yZSA9IF9jb3JlO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBvcGVyYXRvciB9IGZyb20gJy4uL2NvbW1vbi9vcGVyYXRvci9fbmFtZXNwYWNlJztcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyB1dGlscyB9IGZyb20gJy4vdXRpbHMvX25hbWVzcGFjZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHNvdXJjZSB9IGZyb20gJy4vc291cmNlL19uYW1lc3BhY2UnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzaW5rIH0gZnJvbSAnLi9zaW5rL19uYW1lc3BhY2UnO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgY29tbW9uRGVmaW5pdGlvbnMgPSB7XG4gIG1pbjoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogLTEsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIG1heDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgd2lkdGg6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMzAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBoZWlnaHQ6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMTUwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBjb250YWluZXI6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBjYW52YXM6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxufTtcblxuY29uc3QgaGFzRHVyYXRpb25EZWZpbml0aW9ucyA9IHtcbiAgZHVyYXRpb246IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIG1pbjogMCxcbiAgICBtYXg6ICtJbmZpbml0eSxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICByZWZlcmVuY2VUaW1lOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxufTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGV4dGVuZCBpbiBvcmRlciB0byBjcmVhdGUgZ3JhcGhpYyBzaW5rcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cIndhcm5pbmdcIj5fVGhpcyBjbGFzcyBzaG91bGQgYmUgY29uc2lkZXJlZCBhYnN0cmFjdCBhbmQgb25seVxuICogYmUgdXNlZCB0byBiZSBleHRlbmRlZC5fPC9zcGFuPlxuICpcbiAqIEB0b2RvIC0gZml4IGZsb2F0IHJvdW5kaW5nIGVycm9ycyAocHJvZHVjZSBkZWNheXMgaW4gc3luYyBkcmF3cylcbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNsaWVudC5zaW5rXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluPS0xXSAtIE1pbmltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4PTFdIC0gTWF4aW11bSB2YWx1ZSByZXByZXNlbnRlZCBpbiB0aGUgY2FudmFzLlxuICogIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53aWR0aD0zMDBdIC0gV2lkdGggb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGVpZ2h0PTE1MF0gLSBIZWlnaHQgb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSAtIENvbnRhaW5lciBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gaW5zZXJ0IHRoZSBjYW52YXMuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNhbnZhcz1udWxsXSAtIENhbnZhcyBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gZHJhdy4gX2NvbnN0YW50IHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xXSAtIER1cmF0aW9uIChpbiBzZWNvbmRzKSByZXByZXNlbnRlZCBpblxuICogIHRoZSBjYW52YXMuIFRoaXMgcGFyYW1ldGVyIG9ubHkgZXhpc3RzIGZvciBvcGVyYXRvcnMgdGhhdCBkaXNwbGF5IHNldmVyYWxcbiAqICBjb25zZWN1dGl2ZSBmcmFtZXMgb24gdGhlIGNhbnZhcy4gX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnJlZmVyZW5jZVRpbWU9bnVsbF0gLSBPcHRpb25uYWwgcmVmZXJlbmNlIHRpbWUgdGhlXG4gKiAgZGlzcGxheSBzaG91bGQgY29uc2lkZXJlciBhcyB0aGUgb3JpZ2luLiBJcyBvbmx5IHVzZWZ1bGwgd2hlbiBzeW5jaHJvbml6aW5nXG4gKiAgc2V2ZXJhbCBkaXNwbGF5IHVzaW5nIHRoZSBgRGlzcGxheVN5bmNgIGNsYXNzLiBUaGlzIHBhcmFtZXRlciBvbmx5IGV4aXN0c1xuICogIGZvciBvcGVyYXRvcnMgdGhhdCBkaXNwbGF5IHNldmVyYWwgY29uc2VjdXRpdmUgZnJhbWVzIG9uIHRoZSBjYW52YXMuXG4gKi9cbmNsYXNzIEJhc2VEaXNwbGF5IGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKGRlZnMsIG9wdGlvbnMgPSB7fSwgaGFzRHVyYXRpb24gPSB0cnVlKSB7XG4gICAgbGV0IGNvbW1vbkRlZnM7XG5cbiAgICBpZiAoaGFzRHVyYXRpb24pXG4gICAgICBjb21tb25EZWZzID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uRGVmaW5pdGlvbnMsIGhhc0R1cmF0aW9uRGVmaW5pdGlvbnMpO1xuICAgIGVsc2VcbiAgICAgIGNvbW1vbkRlZnMgPSBjb21tb25EZWZpbml0aW9uc1xuXG4gICAgY29uc3QgZGVmaW5pdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25EZWZzLCBkZWZzKTtcblxuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ2NhbnZhcycpID09PSBudWxsICYmIHRoaXMucGFyYW1zLmdldCgnY29udGFpbmVyJykgPT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGFyYW1ldGVyOiBgY2FudmFzYCBvciBgY29udGFpbmVyYCBub3QgZGVmaW5lZCcpO1xuXG4gICAgY29uc3QgY2FudmFzUGFyYW0gPSB0aGlzLnBhcmFtcy5nZXQoJ2NhbnZhcycpO1xuICAgIGNvbnN0IGNvbnRhaW5lclBhcmFtID0gdGhpcy5wYXJhbXMuZ2V0KCdjb250YWluZXInKTtcblxuICAgIC8vIHByZXBhcmUgY2FudmFzXG4gICAgaWYgKGNhbnZhc1BhcmFtKSB7XG4gICAgICBpZiAodHlwZW9mIGNhbnZhc1BhcmFtID09PSAnc3RyaW5nJylcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNhbnZhc1BhcmFtKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXNQYXJhbTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lclBhcmFtKSB7XG4gICAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGNvbnRhaW5lclBhcmFtID09PSAnc3RyaW5nJylcbiAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJQYXJhbSk7XG4gICAgICBlbHNlXG4gICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lclBhcmFtO1xuXG4gICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgICB9XG5cbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5jYWNoZWRDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLmNhY2hlZEN0eCA9IHRoaXMuY2FjaGVkQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICB0aGlzLnByZXZpb3VzRnJhbWUgPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSBoYXNEdXJhdGlvbiA/IHRoaXMucGFyYW1zLmdldCgncmVmZXJlbmNlVGltZScpIDogbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEluc3RhbmNlIG9mIHRoZSBgRGlzcGxheVN5bmNgIHVzZWQgdG8gc3luY2hyb25pemUgdGhlIGRpZmZlcmVudCBkaXNwbGF5c1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5kaXNwbGF5U3luYyA9IGZhbHNlO1xuXG4gICAgLy9cbiAgICB0aGlzLl9zdGFjaztcbiAgICB0aGlzLl9yYWZJZDtcblxuICAgIHRoaXMucmVuZGVyU3RhY2sgPSB0aGlzLnJlbmRlclN0YWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaGlmdEVycm9yID0gMDtcblxuICAgIC8vIGluaXRpYWxpemUgY2FudmFzIHNpemUgYW5kIHkgc2NhbGUgdHJhbnNmZXJ0IGZ1bmN0aW9uXG4gICAgdGhpcy5fcmVzaXplKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX3Jlc2l6ZSgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMucGFyYW1zLmdldCgnd2lkdGgnKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnBhcmFtcy5nZXQoJ2hlaWdodCcpO1xuXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgY29uc3QgY2FjaGVkQ3R4ID0gdGhpcy5jYWNoZWRDdHg7XG5cbiAgICBjb25zdCBkUFIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNvbnN0IGJQUiA9IGN0eC53ZWJraXRCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICBjdHgubW96QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4Lm1zQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4Lm9CYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICBjdHguYmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgdGhpcy5waXhlbFJhdGlvID0gZFBSIC8gYlBSO1xuXG4gICAgY29uc3QgbGFzdFdpZHRoID0gdGhpcy5jYW52YXNXaWR0aDtcbiAgICBjb25zdCBsYXN0SGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgdGhpcy5jYW52YXNXaWR0aCA9IHdpZHRoICogdGhpcy5waXhlbFJhdGlvO1xuICAgIHRoaXMuY2FudmFzSGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5waXhlbFJhdGlvO1xuXG4gICAgY2FjaGVkQ3R4LmNhbnZhcy53aWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY2FjaGVkQ3R4LmNhbnZhcy5oZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcblxuICAgIC8vIGNvcHkgY3VycmVudCBpbWFnZSBmcm9tIGN0eCAocmVzaXplKVxuICAgIGlmIChsYXN0V2lkdGggJiYgbGFzdEhlaWdodCkge1xuICAgICAgY2FjaGVkQ3R4LmRyYXdJbWFnZShjdHguY2FudmFzLFxuICAgICAgICAwLCAwLCBsYXN0V2lkdGgsIGxhc3RIZWlnaHQsXG4gICAgICAgIDAsIDAsIHRoaXMuY2FudmFzV2lkdGgsIHRoaXMuY2FudmFzSGVpZ2h0XG4gICAgICApO1xuICAgIH1cblxuICAgIGN0eC5jYW52YXMud2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoO1xuICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgY3R4LmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICBjdHguY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG5cbiAgICAvLyB1cGRhdGUgc2NhbGVcbiAgICB0aGlzLl9zZXRZU2NhbGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIHRyYW5zZmVydCBmdW5jdGlvbiB1c2VkIHRvIG1hcCB2YWx1ZXMgdG8gcGl4ZWwgaW4gdGhlIHkgYXhpc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NldFlTY2FsZSgpIHtcbiAgICBjb25zdCBtaW4gPSB0aGlzLnBhcmFtcy5nZXQoJ21pbicpO1xuICAgIGNvbnN0IG1heCA9IHRoaXMucGFyYW1zLmdldCgnbWF4Jyk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG5cbiAgICBjb25zdCBhID0gKDAgLSBoZWlnaHQpIC8gKG1heCAtIG1pbik7XG4gICAgY29uc3QgYiA9IGhlaWdodCAtIChhICogbWluKTtcblxuICAgIHRoaXMuZ2V0WVBvc2l0aW9uID0gKHgpID0+IGEgKiB4ICsgYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWR0aCBpbiBwaXhlbCBhIGB2ZWN0b3JgIGZyYW1lIG5lZWRzIHRvIGJlIGRyYXduLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TWluaW11bUZyYW1lV2lkdGgoKSB7XG4gICAgcmV0dXJuIDE7IC8vIG5lZWQgb25lIHBpeGVsIHRvIGRyYXcgdGhlIGxpbmVcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvbiBleGVjdXRlZCB3aGVuIGEgcGFyYW1ldGVyIGlzIHVwZGF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gUGFyYW1ldGVyIG5hbWUuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gUGFyYW1ldGVyIHZhbHVlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbWV0YXMgLSBNZXRhZGF0YXMgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIG9uUGFyYW1VcGRhdGUobmFtZSwgdmFsdWUsIG1ldGFzKSB7XG4gICAgc3VwZXIub25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpO1xuXG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdtaW4nOlxuICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgLy8gQHRvZG8gLSBtYWtlIHN1cmUgdGhhdCBtaW4gYW5kIG1heCBhcmUgZGlmZmVyZW50XG4gICAgICAgIHRoaXMuX3NldFlTY2FsZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dpZHRoJzpcbiAgICAgIGNhc2UgJ2hlaWdodCc6XG4gICAgICAgIHRoaXMuX3Jlc2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9wYWdhdGVTdHJlYW1QYXJhbXMoKSB7XG4gICAgc3VwZXIucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG5cbiAgICB0aGlzLl9zdGFjayA9IFtdO1xuICAgIHRoaXMuX3JhZklkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyU3RhY2spO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlc2V0U3RyZWFtKCkge1xuICAgIHN1cGVyLnJlc2V0U3RyZWFtKCk7XG5cbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG5cbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5jYWNoZWRDdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGZpbmFsaXplU3RyZWFtKGVuZFRpbWUpIHtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gbnVsbDtcbiAgICBzdXBlci5maW5hbGl6ZVN0cmVhbShlbmRUaW1lKTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yYWZJZCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSBjdXJyZW50IGZyYW1lIHRvIHRoZSBmcmFtZXMgdG8gZHJhdy4gU2hvdWxkIG5vdCBiZSBvdmVycmlkZW4uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgY29weSA9IG5ldyBGbG9hdDMyQXJyYXkoZnJhbWVTaXplKTtcbiAgICBjb25zdCBkYXRhID0gZnJhbWUuZGF0YTtcblxuICAgIC8vIGNvcHkgdmFsdWVzIG9mIHRoZSBpbnB1dCBmcmFtZSBhcyB0aGV5IG1pZ2h0IGJlIHVwZGF0ZWRcbiAgICAvLyBpbiByZWZlcmVuY2UgYmVmb3JlIGJlaW5nIGNvbnN1bWVkIGluIHRoZSBkcmF3IGZ1bmN0aW9uXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZVNpemU7IGkrKylcbiAgICAgIGNvcHlbaV0gPSBkYXRhW2ldO1xuXG4gICAgdGhpcy5fc3RhY2sucHVzaCh7XG4gICAgICB0aW1lOiBmcmFtZS50aW1lLFxuICAgICAgZGF0YTogY29weSxcbiAgICAgIG1ldGFkYXRhOiBmcmFtZS5tZXRhZGF0YSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGFjY3VtdWxhdGVkIGZyYW1lcy4gTWV0aG9kIGNhbGxlZCBpbiBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlbmRlclN0YWNrKCkge1xuICAgIGlmICh0aGlzLnBhcmFtcy5oYXMoJ2R1cmF0aW9uJykpIHtcbiAgICAgIC8vIHJlbmRlciBhbGwgZnJhbWUgc2luY2UgbGFzdCBgcmVuZGVyU3RhY2tgIGNhbGxcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5fc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICB0aGlzLnNjcm9sbE1vZGVEcmF3KHRoaXMuX3N0YWNrW2ldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb25seSByZW5kZXIgbGFzdCByZWNlaXZlZCBmcmFtZSBpZiBhbnlcbiAgICAgIGlmICh0aGlzLl9zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5fc3RhY2tbdGhpcy5fc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1dpZHRoLCB0aGlzLmNhbnZhc0hlaWdodCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZWluaXQgc3RhY2sgZm9yIG5leHQgY2FsbFxuICAgIHRoaXMuX3N0YWNrLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fcmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXJTdGFjayk7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBkYXRhIGZyb20gcmlnaHQgdG8gbGVmdCB3aXRoIHNjcm9sbGluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAdG9kbyAtIGNoZWNrIHBvc3NpYmlsaXR5IG9mIG1haW50YWluaW5nIGFsbCB2YWx1ZXMgZnJvbSBvbmUgcGxhY2UgdG9cbiAgICogICAgICAgICBtaW5pbWl6ZSBmbG9hdCBlcnJvciB0cmFja2luZy5cbiAgICovXG4gIHNjcm9sbE1vZGVEcmF3KGZyYW1lKSB7XG4gICAgY29uc3QgZnJhbWVUeXBlID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlO1xuICAgIGNvbnN0IGZyYW1lUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3Qgc291cmNlU2FtcGxlUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG5cbiAgICBjb25zdCBjYW52YXNEdXJhdGlvbiA9IHRoaXMucGFyYW1zLmdldCgnZHVyYXRpb24nKTtcbiAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcbiAgICBjb25zdCBjYW52YXNXaWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY29uc3QgY2FudmFzSGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG5cbiAgICBjb25zdCBwcmV2aW91c0ZyYW1lID0gdGhpcy5wcmV2aW91c0ZyYW1lO1xuXG4gICAgLy8gY3VycmVudCB0aW1lIGF0IHRoZSBsZWZ0IG9mIHRoZSBjYW52YXNcbiAgICBjb25zdCBjdXJyZW50VGltZSA9ICh0aGlzLmN1cnJlbnRUaW1lICE9PSBudWxsKSA/IHRoaXMuY3VycmVudFRpbWUgOiBmcmFtZS50aW1lO1xuICAgIGNvbnN0IGZyYW1lU3RhcnRUaW1lID0gZnJhbWUudGltZTtcbiAgICBjb25zdCBsYXN0RnJhbWVUaW1lID0gcHJldmlvdXNGcmFtZSA/IHByZXZpb3VzRnJhbWUudGltZSA6IDA7XG4gICAgY29uc3QgbGFzdEZyYW1lRHVyYXRpb24gPSB0aGlzLmxhc3RGcmFtZUR1cmF0aW9uID8gdGhpcy5sYXN0RnJhbWVEdXJhdGlvbiA6IDA7XG5cbiAgICBsZXQgZnJhbWVEdXJhdGlvbjtcblxuICAgIGlmIChmcmFtZVR5cGUgPT09ICdzY2FsYXInIHx8IGZyYW1lVHlwZSA9PT0gJ3ZlY3RvcicpIHtcbiAgICAgIGNvbnN0IHBpeGVsRHVyYXRpb24gPSBjYW52YXNEdXJhdGlvbiAvIGNhbnZhc1dpZHRoO1xuICAgICAgZnJhbWVEdXJhdGlvbiA9IHRoaXMuZ2V0TWluaW11bUZyYW1lV2lkdGgoKSAqIHBpeGVsRHVyYXRpb247XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPT09ICdzaWduYWwnKSB7XG4gICAgICBmcmFtZUR1cmF0aW9uID0gZnJhbWVTaXplIC8gc291cmNlU2FtcGxlUmF0ZTtcbiAgICB9XG5cbiAgICBjb25zdCBmcmFtZUVuZFRpbWUgPSBmcmFtZVN0YXJ0VGltZSArIGZyYW1lRHVyYXRpb247XG4gICAgLy8gZGVmaW5lIGlmIHdlIG5lZWQgdG8gc2hpZnQgdGhlIGNhbnZhc1xuICAgIGNvbnN0IHNoaWZ0VGltZSA9IGZyYW1lRW5kVGltZSAtIGN1cnJlbnRUaW1lO1xuXG4gICAgLy8gaWYgdGhlIGNhbnZhcyBpcyBub3Qgc3luY2VkLCBzaG91bGQgbmV2ZXIgZ28gdG8gYGVsc2VgXG4gICAgaWYgKHNoaWZ0VGltZSA+IDApIHtcbiAgICAgIC8vIHNoaWZ0IHRoZSBjYW52YXMgb2Ygc2hpZnRUaW1lIGluIHBpeGVsc1xuICAgICAgY29uc3QgZlNoaWZ0ID0gKHNoaWZ0VGltZSAvIGNhbnZhc0R1cmF0aW9uKSAqIGNhbnZhc1dpZHRoIC0gdGhpcy5zaGlmdEVycm9yO1xuICAgICAgY29uc3QgaVNoaWZ0ID0gTWF0aC5mbG9vcihmU2hpZnQgKyAwLjUpO1xuICAgICAgdGhpcy5zaGlmdEVycm9yID0gZlNoaWZ0IC0gaVNoaWZ0O1xuXG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IGZyYW1lU3RhcnRUaW1lICsgZnJhbWVEdXJhdGlvbjtcbiAgICAgIHRoaXMuc2hpZnRDYW52YXMoaVNoaWZ0LCBjdXJyZW50VGltZSk7XG5cbiAgICAgIC8vIGlmIHNpYmxpbmdzLCBzaGFyZSB0aGUgaW5mb3JtYXRpb25cbiAgICAgIGlmICh0aGlzLmRpc3BsYXlTeW5jKVxuICAgICAgICB0aGlzLmRpc3BsYXlTeW5jLnNoaWZ0U2libGluZ3MoaVNoaWZ0LCBjdXJyZW50VGltZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gd2lkdGggb2YgdGhlIGZyYW1lIGluIHBpeGVsc1xuICAgIGNvbnN0IGZGcmFtZVdpZHRoID0gKGZyYW1lRHVyYXRpb24gLyBjYW52YXNEdXJhdGlvbikgKiBjYW52YXNXaWR0aDtcbiAgICBjb25zdCBmcmFtZVdpZHRoID0gTWF0aC5mbG9vcihmRnJhbWVXaWR0aCArIDAuNSk7XG5cbiAgICAvLyBkZWZpbmUgcG9zaXRpb24gb2YgdGhlIGhlYWQgaW4gdGhlIGNhbnZhc1xuICAgIGNvbnN0IGNhbnZhc1N0YXJ0VGltZSA9IHRoaXMuY3VycmVudFRpbWUgLSBjYW52YXNEdXJhdGlvbjtcbiAgICBjb25zdCBzdGFydFRpbWVSYXRpbyA9IChmcmFtZVN0YXJ0VGltZSAtIGNhbnZhc1N0YXJ0VGltZSkgLyBjYW52YXNEdXJhdGlvbjtcbiAgICBjb25zdCBzdGFydFRpbWVQb3NpdGlvbiA9IHN0YXJ0VGltZVJhdGlvICogY2FudmFzV2lkdGg7XG5cbiAgICAvLyBudW1iZXIgb2YgcGl4ZWxzIHNpbmNlIGxhc3QgZnJhbWVcbiAgICBsZXQgcGl4ZWxzU2luY2VMYXN0RnJhbWUgPSB0aGlzLmxhc3RGcmFtZVdpZHRoO1xuXG4gICAgaWYgKChmcmFtZVR5cGUgPT09ICdzY2FsYXInIHx8IGZyYW1lVHlwZSA9PT0gJ3ZlY3RvcicpICYmIHByZXZpb3VzRnJhbWUpIHtcbiAgICAgIGNvbnN0IGZyYW1lSW50ZXJ2YWwgPSBmcmFtZS50aW1lIC0gcHJldmlvdXNGcmFtZS50aW1lO1xuICAgICAgcGl4ZWxzU2luY2VMYXN0RnJhbWUgPSAoZnJhbWVJbnRlcnZhbCAvIGNhbnZhc0R1cmF0aW9uKSAqIGNhbnZhc1dpZHRoO1xuICAgIH1cblxuICAgIC8vIGRyYXcgY3VycmVudCBmcmFtZVxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnRyYW5zbGF0ZShzdGFydFRpbWVQb3NpdGlvbiwgMCk7XG4gICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24oZnJhbWUsIGZyYW1lV2lkdGgsIHBpeGVsc1NpbmNlTGFzdEZyYW1lKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgLy8gc2F2ZSBjdXJyZW50IGNhbnZhcyBzdGF0ZSBpbnRvIGNhY2hlZCBjYW52YXNcbiAgICB0aGlzLmNhY2hlZEN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCk7XG4gICAgdGhpcy5jYWNoZWRDdHguZHJhd0ltYWdlKHRoaXMuY2FudmFzLCAwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcblxuICAgIC8vIHVwZGF0ZSBsYXN0RnJhbWVEdXJhdGlvbiwgbGFzdEZyYW1lV2lkdGhcbiAgICB0aGlzLmxhc3RGcmFtZUR1cmF0aW9uID0gZnJhbWVEdXJhdGlvbjtcbiAgICB0aGlzLmxhc3RGcmFtZVdpZHRoID0gZnJhbWVXaWR0aDtcbiAgICB0aGlzLnByZXZpb3VzRnJhbWUgPSBmcmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCBjYW52YXMsIGFsc28gY2FsbGVkIGZyb20gYERpc3BsYXlTeW5jYFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2hpZnRDYW52YXMoaVNoaWZ0LCB0aW1lKSB7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgY29uc3QgY2FjaGUgPSB0aGlzLmNhY2hlZENhbnZhcztcbiAgICBjb25zdCBjYWNoZWRDdHggPSB0aGlzLmNhY2hlZEN0eDtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgY29uc3QgY3JvcHBlZFdpZHRoID0gd2lkdGggLSBpU2hpZnQ7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IHRpbWU7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIGN0eC5kcmF3SW1hZ2UoY2FjaGUsIGlTaGlmdCwgMCwgY3JvcHBlZFdpZHRoLCBoZWlnaHQsIDAsIDAsIGNyb3BwZWRXaWR0aCwgaGVpZ2h0KTtcbiAgICAvLyBzYXZlIGN1cnJlbnQgY2FudmFzIHN0YXRlIGludG8gY2FjaGVkIGNhbnZhc1xuICAgIGNhY2hlZEN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgY2FjaGVkQ3R4LmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICAvLyBAdG9kbyAtIEZpeCB0cmlnZ2VyIG1vZGVcbiAgLy8gYWxsb3cgdG8gd2l0Y2ggZWFzaWx5IGJldHdlZW4gdGhlIDIgbW9kZXNcbiAgLy8gc2V0VHJpZ2dlcihib29sKSB7XG4gIC8vICAgdGhpcy5wYXJhbXMudHJpZ2dlciA9IGJvb2w7XG4gIC8vICAgLy8gY2xlYXIgY2FudmFzIGFuZCBjYWNoZVxuICAvLyAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLnBhcmFtcy53aWR0aCwgdGhpcy5wYXJhbXMuaGVpZ2h0KTtcbiAgLy8gICB0aGlzLmNhY2hlZEN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5wYXJhbXMud2lkdGgsIHRoaXMucGFyYW1zLmhlaWdodCk7XG4gIC8vICAgLy8gcmVzZXQgX2N1cnJlbnRYUG9zaXRpb25cbiAgLy8gICB0aGlzLl9jdXJyZW50WFBvc2l0aW9uID0gMDtcbiAgLy8gICB0aGlzLmxhc3RTaGlmdEVycm9yID0gMDtcbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBBbHRlcm5hdGl2ZSBkcmF3aW5nIG1vZGUuXG4gIC8vICAqIERyYXcgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBnbyBiYWNrIHRvIGxlZnQgd2hlbiA+IHdpZHRoXG4gIC8vICAqL1xuICAvLyB0cmlnZ2VyTW9kZURyYXcodGltZSwgZnJhbWUpIHtcbiAgLy8gICBjb25zdCB3aWR0aCAgPSB0aGlzLnBhcmFtcy53aWR0aDtcbiAgLy8gICBjb25zdCBoZWlnaHQgPSB0aGlzLnBhcmFtcy5oZWlnaHQ7XG4gIC8vICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLnBhcmFtcy5kdXJhdGlvbjtcbiAgLy8gICBjb25zdCBjdHggPSB0aGlzLmN0eDtcblxuICAvLyAgIGNvbnN0IGR0ID0gdGltZSAtIHRoaXMucHJldmlvdXNUaW1lO1xuICAvLyAgIGNvbnN0IGZTaGlmdCA9IChkdCAvIGR1cmF0aW9uKSAqIHdpZHRoIC0gdGhpcy5sYXN0U2hpZnRFcnJvcjsgLy8gcHhcbiAgLy8gICBjb25zdCBpU2hpZnQgPSBNYXRoLnJvdW5kKGZTaGlmdCk7XG4gIC8vICAgdGhpcy5sYXN0U2hpZnRFcnJvciA9IGlTaGlmdCAtIGZTaGlmdDtcblxuICAvLyAgIHRoaXMuY3VycmVudFhQb3NpdGlvbiArPSBpU2hpZnQ7XG5cbiAgLy8gICAvLyBkcmF3IHRoZSByaWdodCBwYXJ0XG4gIC8vICAgY3R4LnNhdmUoKTtcbiAgLy8gICBjdHgudHJhbnNsYXRlKHRoaXMuY3VycmVudFhQb3NpdGlvbiwgMCk7XG4gIC8vICAgY3R4LmNsZWFyUmVjdCgtaVNoaWZ0LCAwLCBpU2hpZnQsIGhlaWdodCk7XG4gIC8vICAgdGhpcy5kcmF3Q3VydmUoZnJhbWUsIGlTaGlmdCk7XG4gIC8vICAgY3R4LnJlc3RvcmUoKTtcblxuICAvLyAgIC8vIGdvIGJhY2sgdG8gdGhlIGxlZnQgb2YgdGhlIGNhbnZhcyBhbmQgcmVkcmF3IHRoZSBzYW1lIHRoaW5nXG4gIC8vICAgaWYgKHRoaXMuY3VycmVudFhQb3NpdGlvbiA+IHdpZHRoKSB7XG4gIC8vICAgICAvLyBnbyBiYWNrIHRvIHN0YXJ0XG4gIC8vICAgICB0aGlzLmN1cnJlbnRYUG9zaXRpb24gLT0gd2lkdGg7XG5cbiAgLy8gICAgIGN0eC5zYXZlKCk7XG4gIC8vICAgICBjdHgudHJhbnNsYXRlKHRoaXMuY3VycmVudFhQb3NpdGlvbiwgMCk7XG4gIC8vICAgICBjdHguY2xlYXJSZWN0KC1pU2hpZnQsIDAsIGlTaGlmdCwgaGVpZ2h0KTtcbiAgLy8gICAgIHRoaXMuZHJhd0N1cnZlKGZyYW1lLCB0aGlzLnByZXZpb3VzRnJhbWUsIGlTaGlmdCk7XG4gIC8vICAgICBjdHgucmVzdG9yZSgpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VEaXNwbGF5O1xuIiwiaW1wb3J0IEJhc2VEaXNwbGF5IGZyb20gJy4vQmFzZURpc3BsYXknO1xuaW1wb3J0IHsgZ2V0Q29sb3JzIH0gZnJvbSAnLi4vdXRpbHMvZGlzcGxheS11dGlscyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICByYWRpdXM6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIG1pbjogMCxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9XG4gIH0sXG4gIGxpbmU6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgY29sb3JzOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgfVxufVxuXG5cbi8qKlxuICogQnJlYWtwb2ludCBGdW5jdGlvbiwgZGlzcGxheSBhIHN0cmVhbSBvZiB0eXBlIGB2ZWN0b3JgLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5jb2xvcnM9bnVsbF0gLSBBcnJheSBvZiBjb2xvcnMgZm9yIGVhY2ggaW5kZXggb2YgdGhlXG4gKiAgdmVjdG9yLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucmFkaXVzPTBdIC0gUmFkaXVzIG9mIHRoZSBkb3QgYXQgZWFjaCB2YWx1ZS5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubGluZT10cnVlXSAtIERpc3BsYXkgYSBsaW5lIGJldHdlZW4gZWFjaCBjb25zZWN1dGl2ZVxuICogIHZhbHVlcyBvZiB0aGUgdmVjdG9yLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluPS0xXSAtIE1pbmltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4PTFdIC0gTWF4aW11bSB2YWx1ZSByZXByZXNlbnRlZCBpbiB0aGUgY2FudmFzLlxuICogIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53aWR0aD0zMDBdIC0gV2lkdGggb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGVpZ2h0PTE1MF0gLSBIZWlnaHQgb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSAtIENvbnRhaW5lciBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gaW5zZXJ0IHRoZSBjYW52YXMuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNhbnZhcz1udWxsXSAtIENhbnZhcyBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gZHJhdy4gX2NvbnN0YW50IHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xXSAtIER1cmF0aW9uIChpbiBzZWNvbmRzKSByZXByZXNlbnRlZCBpblxuICogIHRoZSBjYW52YXMuIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yZWZlcmVuY2VUaW1lPW51bGxdIC0gT3B0aW9ubmFsIHJlZmVyZW5jZSB0aW1lIHRoZVxuICogIGRpc3BsYXkgc2hvdWxkIGNvbnNpZGVyZXIgYXMgdGhlIG9yaWdpbi4gSXMgb25seSB1c2VmdWxsIHdoZW4gc3luY2hyb25pemluZ1xuICogIHNldmVyYWwgZGlzcGxheSB1c2luZyB0aGUgYERpc3BsYXlTeW5jYCBjbGFzcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4gPSBuZXcgbGZvLnNvdXJjZS5FdmVudEluKHtcbiAqICAgZnJhbWVTaXplOiAyLFxuICogICBmcmFtZVJhdGU6IDAuMSxcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJ1xuICogfSk7XG4gKlxuICogY29uc3QgYnBmID0gbmV3IGxmby5zaW5rLkJwZkRpc3BsYXkoe1xuICogICBjYW52YXM6ICcjYnBmJyxcbiAqICAgZHVyYXRpb246IDEwLFxuICogfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KGJwZik7XG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogbGV0IHRpbWUgPSAwO1xuICogY29uc3QgZHQgPSAwLjE7XG4gKlxuICogKGZ1bmN0aW9uIGdlbmVyYXRlRGF0YSgpIHtcbiAqICAgZXZlbnRJbi5wcm9jZXNzKHRpbWUsIFtNYXRoLnJhbmRvbSgpICogMiAtIDEsIE1hdGgucmFuZG9tKCkgKiAyIC0gMV0pO1xuICogICB0aW1lICs9IGR0O1xuICpcbiAqICAgc2V0VGltZW91dChnZW5lcmF0ZURhdGEsIGR0ICogMTAwMCk7XG4gKiB9KCkpO1xuICovXG5jbGFzcyBCcGZEaXNwbGF5IGV4dGVuZHMgQmFzZURpc3BsYXkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5wcmV2RnJhbWUgPSBudWxsO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGdldE1pbmltdW1GcmFtZVdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmFtcy5nZXQoJ3JhZGl1cycpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ2NvbG9ycycpID09PSBudWxsKVxuICAgICAgdGhpcy5wYXJhbXMuc2V0KCdjb2xvcnMnLCBnZXRDb2xvcnMoJ2JwZicsIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSkpO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lLCBmcmFtZVdpZHRoLCBwaXhlbHNTaW5jZUxhc3RGcmFtZSkge1xuICAgIGNvbnN0IGNvbG9ycyA9IHRoaXMucGFyYW1zLmdldCgnY29sb3JzJyk7XG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5wYXJhbXMuZ2V0KCdyYWRpdXMnKTtcbiAgICBjb25zdCBkcmF3TGluZSA9IHRoaXMucGFyYW1zLmdldCgnbGluZScpO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcbiAgICBjb25zdCBkYXRhID0gZnJhbWUuZGF0YTtcbiAgICBjb25zdCBwcmV2RGF0YSA9IHRoaXMucHJldkZyYW1lID8gdGhpcy5wcmV2RnJhbWUuZGF0YSA6IG51bGw7XG5cbiAgICBjdHguc2F2ZSgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBmcmFtZVNpemU7IGkgPCBsOyBpKyspIHtcbiAgICAgIGNvbnN0IHBvc1kgPSB0aGlzLmdldFlQb3NpdGlvbihkYXRhW2ldKTtcbiAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW2ldO1xuXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcblxuICAgICAgaWYgKHByZXZEYXRhICYmIGRyYXdMaW5lKSB7XG4gICAgICAgIGNvbnN0IGxhc3RQb3NZID0gdGhpcy5nZXRZUG9zaXRpb24ocHJldkRhdGFbaV0pO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oLXBpeGVsc1NpbmNlTGFzdEZyYW1lLCBsYXN0UG9zWSk7XG4gICAgICAgIGN0eC5saW5lVG8oMCwgcG9zWSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmFkaXVzID4gMCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoMCwgcG9zWSwgcmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgdGhpcy5wcmV2RnJhbWUgPSBmcmFtZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCcGZEaXNwbGF5O1xuIiwiaW1wb3J0IEJhc2VEaXNwbGF5IGZyb20gJy4vQmFzZURpc3BsYXknO1xuaW1wb3J0IHsgZ2V0Q29sb3JzIH0gZnJvbSAnLi4vdXRpbHMvZGlzcGxheS11dGlscyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICB0aHJlc2hvbGQ6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIHRocmVzaG9sZEluZGV4OiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDAsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIGNvbG9yOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogZ2V0Q29sb3JzKCdtYXJrZXInKSxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfVxufTtcblxuLyoqXG4gKiBEaXNwbGF5IGEgbWFya2VyIGFjY29yZGluZyB0byBhIGB2ZWN0b3JgIGlucHV0IGZyYW1lLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmNvbG9yIC0gQ29sb3Igb2YgdGhlIG1hcmtlci5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGRJbmRleD0wXSAtIEluZGV4IG9mIHRoZSBpbmNvbW1pbmcgZnJhbWVcbiAqICBkYXRhIHRvIGNvbXBhcmUgYWdhaW5zdCB0aGUgdGhyZXNob2xkLiBfU2hvdWxkIGJlIHVzZWQgaW4gY29uam9uY3Rpb24gd2l0aFxuICogIGB0aHJlc2hvbGRgXy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGQ9bnVsbF0gLSBNaW5pbXVtIHZhbHVlIHRoZSBpbmNvbW1pbmcgdmFsdWVcbiAqICBtdXN0IGhhdmUgdG8gdHJpZ2dlciB0aGUgZGlzcGxheSBvZiBhIG1hcmtlci4gSWYgbnVsbCBlYWNoIGluY29tbWluZyBldmVudFxuICogIHRyaWdnZXJzIGEgbWFya2VyLiBfU2hvdWxkIGJlIHVzZWQgaW4gY29uam9uY3Rpb24gd2l0aCBgdGhyZXNob2xkSW5kZXhgXy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53aWR0aD0zMDBdIC0gV2lkdGggb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGVpZ2h0PTE1MF0gLSBIZWlnaHQgb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSAtIENvbnRhaW5lciBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gaW5zZXJ0IHRoZSBjYW52YXMuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNhbnZhcz1udWxsXSAtIENhbnZhcyBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gZHJhdy4gX2NvbnN0YW50IHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xXSAtIER1cmF0aW9uIChpbiBzZWNvbmRzKSByZXByZXNlbnRlZCBpblxuICogIHRoZSBjYW52YXMuIFRoaXMgcGFyYW1ldGVyIG9ubHkgZXhpc3RzIGZvciBvcGVyYXRvcnMgdGhhdCBkaXNwbGF5IHNldmVyYWxcbiAqICBjb25zZWN1dGl2ZSBmcmFtZXMgb24gdGhlIGNhbnZhcy4gX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnJlZmVyZW5jZVRpbWU9bnVsbF0gLSBPcHRpb25uYWwgcmVmZXJlbmNlIHRpbWUgdGhlXG4gKiAgZGlzcGxheSBzaG91bGQgY29uc2lkZXJlciBhcyB0aGUgb3JpZ2luLiBJcyBvbmx5IHVzZWZ1bGwgd2hlbiBzeW5jaHJvbml6aW5nXG4gKiAgc2V2ZXJhbCBkaXNwbGF5IHVzaW5nIHRoZSBgRGlzcGxheVN5bmNgIGNsYXNzLiBUaGlzIHBhcmFtZXRlciBvbmx5IGV4aXN0c1xuICogIGZvciBvcGVyYXRvcnMgdGhhdCBkaXNwbGF5IHNldmVyYWwgY29uc2VjdXRpdmUgZnJhbWVzIG9uIHRoZSBjYW52YXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3NjYWxhcicsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBtYXJrZXIgPSBuZXcgbGZvLnNpbmsuTWFya2VyRGlzcGxheSh7XG4gKiAgIGNhbnZhczogJyNtYXJrZXInLFxuICogICB0aHJlc2hvbGQ6IDAuNSxcbiAqIH0pO1xuICpcbiAqIGV2ZW50SW4uY29ubmVjdChtYXJrZXIpO1xuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIGxldCB0aW1lID0gMDtcbiAqIGNvbnN0IHBlcmlvZCA9IDE7XG4gKlxuICogKGZ1bmN0aW9uIGdlbmVyYXRlRGF0YSgpIHtcbiAqICAgZXZlbnRJbi5wcm9jZXNzKHRpbWUsIE1hdGgucmFuZG9tKCkpO1xuICpcbiAqICAgdGltZSArPSBwZXJpb2Q7XG4gKiAgIHNldFRpbWVvdXQoZ2VuZXJhdGVEYXRhLCBwZXJpb2QgKiAxMDAwKTtcbiAqIH0oKSk7XG4gKi9cbmNsYXNzIE1hcmtlckRpc3BsYXkgZXh0ZW5kcyBCYXNlRGlzcGxheSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lLCBmcmFtZVdpZHRoLCBwaXhlbHNTaW5jZUxhc3RGcmFtZSkge1xuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5wYXJhbXMuZ2V0KCdjb2xvcicpO1xuICAgIGNvbnN0IHRocmVzaG9sZCA9IHRoaXMucGFyYW1zLmdldCgndGhyZXNob2xkJyk7XG4gICAgY29uc3QgdGhyZXNob2xkSW5kZXggPSB0aGlzLnBhcmFtcy5nZXQoJ3RocmVzaG9sZEluZGV4Jyk7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgY29uc3QgaGVpZ2h0ID0gY3R4LmhlaWdodDtcbiAgICBjb25zdCB2YWx1ZSA9IGZyYW1lLmRhdGFbdGhyZXNob2xkSW5kZXhdO1xuXG4gICAgaWYgKHRocmVzaG9sZCA9PT0gbnVsbCB8fCB2YWx1ZSA+PSB0aHJlc2hvbGQpIHtcbiAgICAgIGxldCB5TWluID0gdGhpcy5nZXRZUG9zaXRpb24odGhpcy5wYXJhbXMuZ2V0KCdtaW4nKSk7XG4gICAgICBsZXQgeU1heCA9IHRoaXMuZ2V0WVBvc2l0aW9uKHRoaXMucGFyYW1zLmdldCgnbWF4JykpO1xuXG4gICAgICBpZiAoeU1pbiA+IHlNYXgpIHtcbiAgICAgICAgY29uc3QgdiA9IHlNYXg7XG4gICAgICAgIHlNYXggPSB5TWluO1xuICAgICAgICB5TWluID0gdjtcbiAgICAgIH1cblxuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgIGN0eC5maWxsUmVjdCgwLCB5TWluLCAxLCB5TWF4KTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hcmtlckRpc3BsYXk7XG4iLCJpbXBvcnQgQmFzZURpc3BsYXkgZnJvbSAnLi9CYXNlRGlzcGxheSc7XG5pbXBvcnQgeyBnZXRDb2xvcnMgfSBmcm9tICcuLi91dGlscy9kaXNwbGF5LXV0aWxzJztcblxuY29uc3QgZmxvb3IgPSBNYXRoLmZsb29yO1xuY29uc3QgY2VpbCA9IE1hdGguY2VpbDtcblxuZnVuY3Rpb24gZG93blNhbXBsZShkYXRhLCB0YXJnZXRMZW5ndGgpIHtcbiAgY29uc3QgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gIGNvbnN0IGhvcCA9IGxlbmd0aCAvIHRhcmdldExlbmd0aDtcbiAgY29uc3QgdGFyZ2V0ID0gbmV3IEZsb2F0MzJBcnJheSh0YXJnZXRMZW5ndGgpO1xuICBsZXQgY291bnRlciA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRMZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluZGV4ID0gZmxvb3IoY291bnRlcik7XG4gICAgY29uc3QgcGhhc2UgPSBjb3VudGVyIC0gaW5kZXg7XG4gICAgY29uc3QgcHJldiA9IGRhdGFbaW5kZXhdO1xuICAgIGNvbnN0IG5leHQgPSBkYXRhW2luZGV4ICsgMV07XG5cbiAgICB0YXJnZXRbaV0gPSAobmV4dCAtIHByZXYpICogcGhhc2UgKyBwcmV2O1xuICAgIGNvdW50ZXIgKz0gaG9wO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGNvbG9yOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogZ2V0Q29sb3JzKCdzaWduYWwnKSxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgfSxcbn07XG5cbi8qKlxuICogRGlzcGxheSBhIHN0cmVhbSBvZiB0eXBlIGBzaWduYWxgIG9uIGEgY2FudmFzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmNvbG9yPScjMDBlNjAwJ10gLSBDb2xvciBvZiB0aGUgc2lnbmFsLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tMV0gLSBNaW5pbXVtIHZhbHVlIHJlcHJlc2VudGVkIGluIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MV0gLSBEdXJhdGlvbiAoaW4gc2Vjb25kcykgcmVwcmVzZW50ZWQgaW5cbiAqICB0aGUgY2FudmFzLiBUaGlzIHBhcmFtZXRlciBvbmx5IGV4aXN0cyBmb3Igb3BlcmF0b3JzIHRoYXQgZGlzcGxheSBzZXZlcmFsXG4gKiAgY29uc2VjdXRpdmUgZnJhbWVzIG9uIHRoZSBjYW52YXMuIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yZWZlcmVuY2VUaW1lPW51bGxdIC0gT3B0aW9ubmFsIHJlZmVyZW5jZSB0aW1lIHRoZVxuICogIGRpc3BsYXkgc2hvdWxkIGNvbnNpZGVyZXIgYXMgdGhlIG9yaWdpbi4gSXMgb25seSB1c2VmdWxsIHdoZW4gc3luY2hyb25pemluZ1xuICogIHNldmVyYWwgZGlzcGxheSB1c2luZyB0aGUgYERpc3BsYXlTeW5jYCBjbGFzcy4gVGhpcyBwYXJhbWV0ZXIgb25seSBleGlzdHNcbiAqICBmb3Igb3BlcmF0b3JzIHRoYXQgZGlzcGxheSBzZXZlcmFsIGNvbnNlY3V0aXZlIGZyYW1lcyBvbiB0aGUgY2FudmFzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmtcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgZXZlbnRJbiA9IG5ldyBsZm8uc291cmNlLkV2ZW50SW4oe1xuICogICBmcmFtZVR5cGU6ICdzaWduYWwnLFxuICogICBzYW1wbGVSYXRlOiA4LFxuICogICBmcmFtZVNpemU6IDQsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBzaWduYWxEaXNwbGF5ID0gbmV3IGxmby5zaW5rLlNpZ25hbERpc3BsYXkoe1xuICogICBjYW52YXM6ICcjc2lnbmFsLWNhbnZhcycsXG4gKiB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3Qoc2lnbmFsRGlzcGxheSk7XG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogLy8gcHVzaCB0cmlhbmdsZSBzaWduYWwgaW4gdGhlIGdyYXBoXG4gKiBldmVudEluLnByb2Nlc3MoMCwgWzAsIDAuNSwgMSwgMC41XSk7XG4gKiBldmVudEluLnByb2Nlc3MoMC41LCBbMCwgLTAuNSwgLTEsIC0wLjVdKTtcbiAqIC8vIC4uLlxuICovXG5jbGFzcyBTaWduYWxEaXNwbGF5IGV4dGVuZHMgQmFzZURpc3BsYXkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMsIHRydWUpO1xuXG4gICAgdGhpcy5sYXN0UG9zWSA9IG51bGw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSwgZnJhbWVXaWR0aCwgcGl4ZWxzU2luY2VMYXN0RnJhbWUpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMucGFyYW1zLmdldCgnY29sb3InKTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgbGV0IGRhdGEgPSBmcmFtZS5kYXRhO1xuXG4gICAgaWYgKGZyYW1lV2lkdGggPCBmcmFtZVNpemUpXG4gICAgICBkYXRhID0gZG93blNhbXBsZShkYXRhLCBmcmFtZVdpZHRoKTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgIGNvbnN0IGhvcFggPSBmcmFtZVdpZHRoIC8gbGVuZ3RoO1xuICAgIGxldCBwb3NYID0gMDtcbiAgICBsZXQgbGFzdFkgPSB0aGlzLmxhc3RQb3NZO1xuXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwb3NZID0gdGhpcy5nZXRZUG9zaXRpb24oZGF0YVtpXSk7XG5cbiAgICAgIGlmIChsYXN0WSA9PT0gbnVsbCkge1xuICAgICAgICBjdHgubW92ZVRvKHBvc1gsIHBvc1kpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgICAgY3R4Lm1vdmVUbygtaG9wWCwgbGFzdFkpO1xuXG4gICAgICAgIGN0eC5saW5lVG8ocG9zWCwgcG9zWSk7XG4gICAgICB9XG5cbiAgICAgIHBvc1ggKz0gaG9wWDtcbiAgICAgIGxhc3RZID0gcG9zWTtcbiAgICB9XG5cbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgdGhpcy5sYXN0UG9zWSA9IGxhc3RZO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hbERpc3BsYXk7XG4iLCJpbXBvcnQgQmFzZURpc3BsYXkgZnJvbSAnLi9CYXNlRGlzcGxheSc7XG5pbXBvcnQgRmZ0IGZyb20gJy4uLy4uL2NvbW1vbi9vcGVyYXRvci9GZnQnO1xuaW1wb3J0IHsgZ2V0Q29sb3JzIH0gZnJvbSAnLi4vdXRpbHMvZGlzcGxheS11dGlscyc7XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHNjYWxlOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBjb2xvcjoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6IGdldENvbG9ycygnc3BlY3RydW0nKSxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgbWluOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAtODAsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIG1heDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogNixcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfVxufTtcblxuXG4vKipcbiAqIERpc3BsYXkgdGhlIHNwZWN0cnVtIG9mIHRoZSBpbmNvbW1pbmcgYHNpZ25hbGAgaW5wdXQuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2lua1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNjYWxlPTFdIC0gU2NhbGUgZGlzcGxheSBvZiB0aGUgc3BlY3Ryb2dyYW0uXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuY29sb3I9bnVsbF0gLSBDb2xvciBvZiB0aGUgc3BlY3Ryb2dyYW0uXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluPS04MF0gLSBNaW5pbXVtIGRpc3BsYXllZCB2YWx1ZSAoaW4gZEIpLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD02XSAtIE1heGltdW0gZGlzcGxheWVkIHZhbHVlIChpbiBkQikuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKlxuICogQHRvZG8gLSBleHBvc2UgbW9yZSBgZmZ0YCBjb25maWcgb3B0aW9uc1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICpcbiAqIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAqICAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gKiAgIC50aGVuKGluaXQpXG4gKiAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyci5zdGFjaykpO1xuICpcbiAqIGZ1bmN0aW9uIGluaXQoc3RyZWFtKSB7XG4gKiAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xuICpcbiAqICAgY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gKiAgICAgYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQsXG4gKiAgICAgc291cmNlTm9kZTogc291cmNlLFxuICogICB9KTtcbiAqXG4gKiAgIGNvbnN0IHNwZWN0cnVtID0gbmV3IGxmby5zaW5rLlNwZWN0cnVtRGlzcGxheSh7XG4gKiAgICAgY2FudmFzOiAnI3NwZWN0cnVtJyxcbiAqICAgfSk7XG4gKlxuICogICBhdWRpb0luTm9kZS5jb25uZWN0KHNwZWN0cnVtKTtcbiAqICAgYXVkaW9Jbk5vZGUuc3RhcnQoKTtcbiAqIH1cbiAqL1xuY2xhc3MgU3BlY3RydW1EaXNwbGF5IGV4dGVuZHMgQmFzZURpc3BsYXkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucywgZmFsc2UpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIHRoaXMuZmZ0ID0gbmV3IEZmdCh7XG4gICAgICBzaXplOiB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUsXG4gICAgICB3aW5kb3c6ICdoYW5uJyxcbiAgICAgIG5vcm06ICdsaW5lYXInLFxuICAgIH0pO1xuXG4gICAgdGhpcy5mZnQuaW5pdFN0cmVhbSh0aGlzLnN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUpIHtcbiAgICBjb25zdCBiaW5zID0gdGhpcy5mZnQuaW5wdXRTaWduYWwoZnJhbWUuZGF0YSk7XG4gICAgY29uc3QgbmJyQmlucyA9IGJpbnMubGVuZ3RoO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzSGVpZ2h0O1xuICAgIGNvbnN0IHNjYWxlID0gdGhpcy5wYXJhbXMuZ2V0KCdzY2FsZScpO1xuXG4gICAgY29uc3QgYmluV2lkdGggPSB3aWR0aCAvIG5ickJpbnM7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5wYXJhbXMuZ2V0KCdjb2xvcicpO1xuXG4gICAgLy8gZXJyb3IgaGFuZGxpbmcgbmVlZHMgcmV2aWV3Li4uXG4gICAgbGV0IGVycm9yID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQmluczsgaSsrKSB7XG4gICAgICBjb25zdCB4MUZsb2F0ID0gaSAqIGJpbldpZHRoICsgZXJyb3I7XG4gICAgICBjb25zdCB4MUludCA9IE1hdGgucm91bmQoeDFGbG9hdCk7XG4gICAgICBjb25zdCB4MkZsb2F0ID0geDFGbG9hdCArIChiaW5XaWR0aCAtIGVycm9yKTtcbiAgICAgIGNvbnN0IHgySW50ID0gTWF0aC5yb3VuZCh4MkZsb2F0KTtcblxuICAgICAgZXJyb3IgPSB4MkludCAtIHgyRmxvYXQ7XG5cbiAgICAgIGlmICh4MUludCAhPT0geDJJbnQpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB4MkludCAtIHgxSW50O1xuICAgICAgICBjb25zdCBkYiA9IDIwICogTWF0aC5sb2cxMChiaW5zW2ldKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0WVBvc2l0aW9uKGRiICogc2NhbGUpO1xuICAgICAgICBjdHguZmlsbFJlY3QoeDFJbnQsIHksIHdpZHRoLCBoZWlnaHQgLSB5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yIC09IGJpbldpZHRoO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGVjdHJ1bURpc3BsYXk7XG4iLCJpbXBvcnQgQmFzZURpc3BsYXkgZnJvbSAnLi9CYXNlRGlzcGxheSc7XG5pbXBvcnQgeyBnZXRDb2xvcnMsIGdldEh1ZSwgaGV4VG9SR0IgfSBmcm9tICcuLi91dGlscy9kaXNwbGF5LXV0aWxzJztcblxuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgY29sb3I6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiBnZXRDb2xvcnMoJ3RyYWNlJyksXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIGNvbG9yU2NoZW1lOiB7XG4gICAgdHlwZTogJ2VudW0nLFxuICAgIGRlZmF1bHQ6ICdub25lJyxcbiAgICBsaXN0OiBbJ25vbmUnLCAnaHVlJywgJ29wYWNpdHknXSxcbiAgfSxcbn07XG5cbi8qKlxuICogRGlzcGxheSBhIHJhbmdlIHZhbHVlIGFyb3VuZCBhIG1lYW4gdmFsdWUgKGZvciBleGFtcGxlIG1lYW5cbiAqIGFuZCBzdGFuZGFydCBkZXZpYXRpb24pLlxuICpcbiAqIFRoaXMgc2luayBjYW4gaGFuZGxlIGlucHV0IG9mIHR5cGUgYHZlY3RvcmAgb2YgZnJhbWVTaXplID49IDIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuY29sb3I9J29yYW5nZSddIC0gQ29sb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuY29sb3JTY2hlbWU9J25vbmUnXSAtIElmIGEgdGhpcmQgdmFsdWUgaXMgYXZhaWxhYmxlXG4gKiAgaW4gdGhlIGlucHV0LCBjYW4gYmUgdXNlZCB0byBjb250cm9sIHRoZSBvcGFjaXR5IG9yIHRoZSBodWUuIElmIGlucHV0IGZyYW1lXG4gKiAgc2l6ZSBpcyAyLCB0aGlzIHBhcmFtIGlzIGF1dG9tYXRpY2FsbHkgc2V0IHRvIGBub25lYFxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tMV0gLSBNaW5pbXVtIHZhbHVlIHJlcHJlc2VudGVkIGluIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MV0gLSBEdXJhdGlvbiAoaW4gc2Vjb25kcykgcmVwcmVzZW50ZWQgaW5cbiAqICB0aGUgY2FudmFzLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucmVmZXJlbmNlVGltZT1udWxsXSAtIE9wdGlvbm5hbCByZWZlcmVuY2UgdGltZSB0aGVcbiAqICBkaXNwbGF5IHNob3VsZCBjb25zaWRlcmVyIGFzIHRoZSBvcmlnaW4uIElzIG9ubHkgdXNlZnVsbCB3aGVuIHN5bmNocm9uaXppbmdcbiAqICBzZXZlcmFsIGRpc3BsYXkgdXNpbmcgdGhlIGBEaXNwbGF5U3luY2AgY2xhc3MuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2lua1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgQXVkaW9Db250ZXh0ID0gKHdpbmRvdy5BdWRpb0NvbnRleHQgfHzCoHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpO1xuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICpcbiAqIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAqICAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gKiAgIC50aGVuKGluaXQpXG4gKiAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyci5zdGFjaykpO1xuICpcbiAqIGZ1bmN0aW9uIGluaXQoc3RyZWFtKSB7XG4gKiAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xuICpcbiAqICAgY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gKiAgICAgc291cmNlTm9kZTogc291cmNlLFxuICogICAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICB9KTtcbiAqXG4gKiAgIC8vIG5vdCBzdXJlIGl0IG1ha2Ugc2VucyBidXQuLi5cbiAqICAgY29uc3QgbWVhblN0ZGRldiA9IG5ldyBsZm8ub3BlcmF0b3IuTWVhblN0ZGRldigpO1xuICpcbiAqICAgY29uc3QgdHJhY2VEaXNwbGF5ID0gbmV3IGxmby5zaW5rLlRyYWNlRGlzcGxheSh7XG4gKiAgICAgY2FudmFzOiAnI3RyYWNlJyxcbiAqICAgfSk7XG4gKlxuICogICBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiAgIGF1ZGlvSW5Ob2RlLmNvbm5lY3QobWVhblN0ZGRldik7XG4gKiAgIG1lYW5TdGRkZXYuY29ubmVjdCh0cmFjZURpc3BsYXkpO1xuICpcbiAqICAgYXVkaW9Jbk5vZGUuc3RhcnQoKTtcbiAqIH1cbiAqL1xuY2xhc3MgVHJhY2VEaXNwbGF5IGV4dGVuZHMgQmFzZURpc3BsYXkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnByZXZGcmFtZSA9IG51bGw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgaWYgKHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9PT0gMilcbiAgICAgIHRoaXMucGFyYW1zLnNldCgnY29sb3JTY2hlbWUnLCAnbm9uZScpO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lLCBmcmFtZVdpZHRoLCBwaXhlbHNTaW5jZUxhc3RGcmFtZSkge1xuICAgIGNvbnN0IGNvbG9yU2NoZW1lID0gdGhpcy5wYXJhbXMuZ2V0KCdjb2xvclNjaGVtZScpO1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xuICAgIGNvbnN0IHByZXZEYXRhID0gdGhpcy5wcmV2RnJhbWUgPyB0aGlzLnByZXZGcmFtZS5kYXRhIDogbnVsbDtcbiAgICBjb25zdCBkYXRhID0gZnJhbWUuZGF0YTtcblxuICAgIGNvbnN0IGhhbGZSYW5nZSA9IGRhdGFbMV0gLyAyO1xuICAgIGNvbnN0IG1lYW4gPSB0aGlzLmdldFlQb3NpdGlvbihkYXRhWzBdKTtcbiAgICBjb25zdCBtaW4gPSB0aGlzLmdldFlQb3NpdGlvbihkYXRhWzBdIC0gaGFsZlJhbmdlKTtcbiAgICBjb25zdCBtYXggPSB0aGlzLmdldFlQb3NpdGlvbihkYXRhWzBdICsgaGFsZlJhbmdlKTtcblxuICAgIGxldCBwcmV2SGFsZlJhbmdlO1xuICAgIGxldCBwcmV2TWVhbjtcbiAgICBsZXQgcHJldk1pbjtcbiAgICBsZXQgcHJldk1heDtcblxuICAgIGlmIChwcmV2RGF0YSAhPT0gbnVsbCkge1xuICAgICAgcHJldkhhbGZSYW5nZSA9IHByZXZEYXRhWzFdIC8gMjtcbiAgICAgIHByZXZNZWFuID0gdGhpcy5nZXRZUG9zaXRpb24ocHJldkRhdGFbMF0pO1xuICAgICAgcHJldk1pbiA9IHRoaXMuZ2V0WVBvc2l0aW9uKHByZXZEYXRhWzBdIC0gcHJldkhhbGZSYW5nZSk7XG4gICAgICBwcmV2TWF4ID0gdGhpcy5nZXRZUG9zaXRpb24ocHJldkRhdGFbMF0gKyBwcmV2SGFsZlJhbmdlKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2xvciA9IHRoaXMucGFyYW1zLmdldCgnY29sb3InKTtcbiAgICBsZXQgZ3JhZGllbnQ7XG4gICAgbGV0IHJnYjtcblxuICAgIHN3aXRjaCAoY29sb3JTY2hlbWUpIHtcbiAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICByZ2IgPSBoZXhUb1JHQihjb2xvcik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBgcmdiYSgke3JnYi5qb2luKCcsJyl9LCAwLjcpYDtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2h1ZSc6XG4gICAgICAgIGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC1waXhlbHNTaW5jZUxhc3RGcmFtZSwgMCwgMCwgMCk7XG5cbiAgICAgICAgaWYgKHByZXZEYXRhKVxuICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBgaHNsKCR7Z2V0SHVlKHByZXZEYXRhWzJdKX0sIDEwMCUsIDUwJSlgKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBgaHNsKCR7Z2V0SHVlKGRhdGFbMl0pfSwgMTAwJSwgNTAlKWApO1xuXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBgaHNsKCR7Z2V0SHVlKGRhdGFbMl0pfSwgMTAwJSwgNTAlKWApO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29wYWNpdHknOlxuICAgICAgICByZ2IgPSBoZXhUb1JHQih0aGlzLnBhcmFtcy5nZXQoJ2NvbG9yJykpO1xuICAgICAgICBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgtcGl4ZWxzU2luY2VMYXN0RnJhbWUsIDAsIDAsIDApO1xuXG4gICAgICAgIGlmIChwcmV2RGF0YSlcbiAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgYHJnYmEoJHtyZ2Iuam9pbignLCcpfSwgJHtwcmV2RGF0YVsyXX0pYCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgYHJnYmEoJHtyZ2Iuam9pbignLCcpfSwgJHtkYXRhWzJdfSlgKTtcblxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgYHJnYmEoJHtyZ2Iuam9pbignLCcpfSwgJHtkYXRhWzJdfSlgKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY3R4LnNhdmUoKTtcbiAgICAvLyBkcmF3IHJhbmdlXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMCwgbWVhbik7XG4gICAgY3R4LmxpbmVUbygwLCBtYXgpO1xuXG4gICAgaWYgKHByZXZEYXRhICE9PSBudWxsKSB7XG4gICAgICBjdHgubGluZVRvKC1waXhlbHNTaW5jZUxhc3RGcmFtZSwgcHJldk1heCk7XG4gICAgICBjdHgubGluZVRvKC1waXhlbHNTaW5jZUxhc3RGcmFtZSwgcHJldk1pbik7XG4gICAgfVxuXG4gICAgY3R4LmxpbmVUbygwLCBtaW4pO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgIGN0eC5maWxsKCk7XG5cbiAgICAvLyBkcmF3IG1lYW5cbiAgICBpZiAoY29sb3JTY2hlbWUgPT09ICdub25lJyAmJiBwcmV2TWVhbikge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygtcGl4ZWxzU2luY2VMYXN0RnJhbWUsIHByZXZNZWFuKTtcbiAgICAgIGN0eC5saW5lVG8oMCwgbWVhbik7XG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG5cbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgdGhpcy5wcmV2RnJhbWUgPSBmcmFtZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVHJhY2VEaXNwbGF5O1xuIiwiaW1wb3J0IEJhc2VEaXNwbGF5IGZyb20gJy4vQmFzZURpc3BsYXknO1xuaW1wb3J0IFJtcyBmcm9tICcuLi8uLi9jb21tb24vb3BlcmF0b3IvUm1zJztcblxuY29uc3QgbG9nMTAgPSBNYXRoLmxvZzEwO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgb2Zmc2V0OiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAtMTQsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIG1pbjoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogLTgwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBtYXg6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IDYsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIHdpZHRoOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDYsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH1cbn1cblxuLyoqXG4gKiBTaW1wbGUgVlUtTWV0ZXIgdG8gdXNlZCBvbiBhIGBzaWduYWxgIHN0cmVhbS5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNsaWVudC5zaW5rXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0cyBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm9mZnNldD0tMTRdIC0gZEIgb2Zmc2V0IGFwcGxpZWQgdG8gdGhlIHNpZ25hbC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW49LTgwXSAtIE1pbmltdW0gZGlzcGxheWVkIHZhbHVlIChpbiBkQikuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4PTZdIC0gTWF4aW11bSBkaXNwbGF5ZWQgdmFsdWUgKGluIGRCKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53aWR0aD02XSAtIFdpZHRoIG9mIHRoZSBkaXNwbGF5IChpbiBwaXhlbHMpLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSAtIENvbnRhaW5lciBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gaW5zZXJ0IHRoZSBjYW52YXMuXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNhbnZhcz1udWxsXSAtIENhbnZhcyBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gZHJhdy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGF1ZGlvQ29udGV4dCA9IG5ldyB3aW5kb3cuQXVkaW9Db250ZXh0KCk7XG4gKlxuICogbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICogICAuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSlcbiAqICAgLnRoZW4oaW5pdClcbiAqICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKSk7XG4gKlxuICogZnVuY3Rpb24gaW5pdChzdHJlYW0pIHtcbiAqICAgY29uc3Qgc291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gKlxuICogICBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAqICAgICBhdWRpb0NvbnRleHQ6IGF1ZGlvQ29udGV4dCxcbiAqICAgICBzb3VyY2VOb2RlOiBzb3VyY2UsXG4gKiAgIH0pO1xuICpcbiAqICAgY29uc3QgdnVNZXRlciA9IG5ldyBsZm8uc2luay5WdU1ldGVyRGlzcGxheSh7XG4gKiAgICAgY2FudmFzOiAnI3Z1LW1ldGVyJyxcbiAqICAgfSk7XG4gKlxuICogICBhdWRpb0luTm9kZS5jb25uZWN0KHZ1TWV0ZXIpO1xuICogICBhdWRpb0luTm9kZS5zdGFydCgpO1xuICogfVxuICovXG5jbGFzcyBWdU1ldGVyRGlzcGxheSBleHRlbmRzIEJhc2VEaXNwbGF5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMsIGZhbHNlKTtcblxuICAgIHRoaXMucm1zT3BlcmF0b3IgPSBuZXcgUm1zKCk7XG5cbiAgICB0aGlzLmxhc3REQiA9IDA7XG4gICAgdGhpcy5wZWFrID0ge1xuICAgICAgdmFsdWU6IDAsXG4gICAgICB0aW1lOiAwLFxuICAgIH1cblxuICAgIHRoaXMucGVha0xpZmV0aW1lID0gMTsgLy8gc2VjXG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5ybXNPcGVyYXRvci5pbml0U3RyZWFtKHRoaXMuc3RyZWFtUGFyYW1zKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMDsgLy8gc2VjXG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5wYXJhbXMuZ2V0KCdvZmZzZXQnKTsgLy8gb2Zmc2V0IHplcm8gb2YgdGhlIHZ1IG1ldGVyXG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoO1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xuXG4gICAgY29uc3QgbGFzdERCID0gdGhpcy5sYXN0REI7XG4gICAgY29uc3QgcGVhayA9IHRoaXMucGVhaztcblxuICAgIGNvbnN0IHJlZCA9ICcjZmYyMTIxJztcbiAgICBjb25zdCB5ZWxsb3cgPSAnI2ZmZmYxZic7XG4gICAgY29uc3QgZ3JlZW4gPSAnIzAwZmYwMCc7XG5cbiAgICAvLyBoYW5kbGUgY3VycmVudCBkYiB2YWx1ZVxuICAgIGNvbnN0IHJtcyA9IHRoaXMucm1zT3BlcmF0b3IuaW5wdXRTaWduYWwoZnJhbWUuZGF0YSk7XG4gICAgbGV0IGRCID0gMjAgKiBsb2cxMChybXMpIC0gb2Zmc2V0O1xuXG4gICAgLy8gc2xvdyByZWxlYXNlIChjb3VsZCBwcm9iYWJseSBiZSBpbXByb3ZlZClcbiAgICBpZiAobGFzdERCID4gZEIpXG4gICAgICBkQiA9IGxhc3REQiAtIDY7XG5cbiAgICAvLyBoYW5kbGUgcGVha1xuICAgIGlmIChkQiA+IHBlYWsudmFsdWUgfHzCoChub3cgLSBwZWFrLnRpbWUpID4gdGhpcy5wZWFrTGlmZXRpbWUpIHtcbiAgICAgIHBlYWsudmFsdWUgPSBkQjtcbiAgICAgIHBlYWsudGltZSA9IG5vdztcbiAgICB9XG5cbiAgICBjb25zdCB5MCA9IHRoaXMuZ2V0WVBvc2l0aW9uKDApO1xuICAgIGNvbnN0IHkgPSB0aGlzLmdldFlQb3NpdGlvbihkQik7XG4gICAgY29uc3QgeVBlYWsgPSB0aGlzLmdldFlQb3NpdGlvbihwZWFrLnZhbHVlKTtcblxuICAgIGN0eC5zYXZlKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIGNvbnN0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIGhlaWdodCwgMCwgMCk7XG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIGdyZWVuKTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoKGhlaWdodCAtIHkwKSAvIGhlaWdodCwgeWVsbG93KTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgcmVkKTtcblxuICAgIC8vIGRCXG4gICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgIGN0eC5maWxsUmVjdCgwLCB5LCB3aWR0aCwgaGVpZ2h0IC0geSk7XG5cbiAgICAvLyAwIGRCIG1hcmtlclxuICAgIGN0eC5maWxsU3R5bGUgPSAnI2RjZGNkYyc7XG4gICAgY3R4LmZpbGxSZWN0KDAsIHkwLCB3aWR0aCwgMik7XG5cbiAgICAvLyBwZWFrXG4gICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgIGN0eC5maWxsUmVjdCgwLCB5UGVhaywgd2lkdGgsIDIpO1xuXG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIHRoaXMubGFzdERCID0gZEI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVnVNZXRlckRpc3BsYXk7XG4iLCJpbXBvcnQgQmFzZURpc3BsYXkgZnJvbSAnLi9CYXNlRGlzcGxheSc7XG5pbXBvcnQgTWluTWF4IGZyb20gJy4uLy4uL2NvbW1vbi9vcGVyYXRvci9NaW5NYXgnO1xuaW1wb3J0IFJtcyBmcm9tICcuLi8uLi9jb21tb24vb3BlcmF0b3IvUm1zJztcbmltcG9ydCB7IGdldENvbG9ycyB9IGZyb20gJy4uL3V0aWxzL2Rpc3BsYXktdXRpbHMnO1xuXG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBjb2xvcnM6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBnZXRDb2xvcnMoJ3dhdmVmb3JtJyksXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIHJtczoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfVxufTtcblxuLyoqXG4gKiBEaXNwbGF5IGEgd2F2ZWZvcm0gKGFsb25nIHdpdGggb3B0aW9ubmFsIFJtcykgb2YgYSBnaXZlbiBgc2lnbmFsYCBpbnB1dCBpblxuICogYSBjYW52YXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IFtvcHRpb25zLmNvbG9ycz1bJ3dhdmVmb3JtJywgJ3JtcyddXSAtIEFycmF5XG4gKiAgY29udGFpbmluZyB0aGUgY29sb3IgY29kZXMgZm9yIHRoZSB3YXZlZm9ybSAoaW5kZXggMCkgYW5kIHJtcyAoaW5kZXggMSkuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ybXM9ZmFsc2VdIC0gU2V0IHRvIGB0cnVlYCB0byBkaXNwbGF5IHRoZSBybXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTFdIC0gRHVyYXRpb24gKGluIHNlY29uZHMpIHJlcHJlc2VudGVkIGluXG4gKiAgdGhlIGNhbnZhcy4gX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tMV0gLSBNaW5pbXVtIHZhbHVlIHJlcHJlc2VudGVkIGluIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucmVmZXJlbmNlVGltZT1udWxsXSAtIE9wdGlvbm5hbCByZWZlcmVuY2UgdGltZSB0aGVcbiAqICBkaXNwbGF5IHNob3VsZCBjb25zaWRlcmVyIGFzIHRoZSBvcmlnaW4uIElzIG9ubHkgdXNlZnVsbCB3aGVuIHN5bmNocm9uaXppbmdcbiAqICBzZXZlcmFsIGRpc3BsYXkgdXNpbmcgdGhlIGBEaXNwbGF5U3luY2AgY2xhc3MuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2lua1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IHdpbmRvdy5BdWRpb0NvbnRleHQoKTtcbiAqXG4gKiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gKiAgIC5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KVxuICogICAudGhlbihpbml0KVxuICogICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIuc3RhY2spKTtcbiAqXG4gKiBmdW5jdGlvbiBpbml0KHN0cmVhbSkge1xuICogICBjb25zdCBhdWRpb0luID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gKlxuICogICBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAqICAgICBhdWRpb0NvbnRleHQ6IGF1ZGlvQ29udGV4dCxcbiAqICAgICBzb3VyY2VOb2RlOiBhdWRpb0luLFxuICogICAgIGZyYW1lU2l6ZTogNTEyLFxuICogICB9KTtcbiAqXG4gKiAgIGNvbnN0IHdhdmVmb3JtRGlzcGxheSA9IG5ldyBsZm8uc2luay5XYXZlZm9ybURpc3BsYXkoe1xuICogICAgIGNhbnZhczogJyN3YXZlZm9ybScsXG4gKiAgICAgZHVyYXRpb246IDMuNSxcbiAqICAgICBybXM6IHRydWUsXG4gKiAgIH0pO1xuICpcbiAqICAgYXVkaW9Jbk5vZGUuY29ubmVjdCh3YXZlZm9ybURpc3BsYXkpO1xuICogICBhdWRpb0luTm9kZS5zdGFydCgpO1xuICogfSk7XG4gKi9cbmNsYXNzIFdhdmVmb3JtRGlzcGxheSBleHRlbmRzIEJhc2VEaXNwbGF5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zLCB0cnVlKTtcblxuICAgIHRoaXMubWluTWF4T3BlcmF0b3IgPSBuZXcgTWluTWF4KCk7XG4gICAgdGhpcy5ybXNPcGVyYXRvciA9IG5ldyBSbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLm1pbk1heE9wZXJhdG9yLmluaXRTdHJlYW0odGhpcy5zdHJlYW1QYXJhbXMpO1xuICAgIHRoaXMucm1zT3BlcmF0b3IuaW5pdFN0cmVhbSh0aGlzLnN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUsIGZyYW1lV2lkdGgsIHBpeGVsc1NpbmNlTGFzdEZyYW1lKSB7XG4gICAgLy8gZHJvcCBmcmFtZXMgdGhhdCBjYW5ub3QgYmUgZGlzcGxheWVkXG4gICAgaWYgKGZyYW1lV2lkdGggPCAxKSByZXR1cm47XG5cbiAgICBjb25zdCBjb2xvcnMgPSB0aGlzLnBhcmFtcy5nZXQoJ2NvbG9ycycpO1xuICAgIGNvbnN0IHNob3dSbXMgPSB0aGlzLnBhcmFtcy5nZXQoJ3JtcycpO1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xuICAgIGNvbnN0IGRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIGNvbnN0IGlTYW1wbGVzUGVyUGl4ZWxzID0gTWF0aC5mbG9vcihkYXRhLmxlbmd0aCAvIGZyYW1lV2lkdGgpO1xuXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZyYW1lV2lkdGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBpU2FtcGxlc1BlclBpeGVscztcbiAgICAgIGNvbnN0IGVuZCA9IGluZGV4ID09PSBmcmFtZVdpZHRoIC0gMSA/IHVuZGVmaW5lZCA6IHN0YXJ0ICsgaVNhbXBsZXNQZXJQaXhlbHM7XG4gICAgICBjb25zdCBzbGljZSA9IGRhdGEuc3ViYXJyYXkoc3RhcnQsIGVuZCk7XG5cbiAgICAgIGNvbnN0IG1pbk1heCA9IHRoaXMubWluTWF4T3BlcmF0b3IuaW5wdXRTaWduYWwoc2xpY2UpO1xuICAgICAgY29uc3QgbWluWSA9IHRoaXMuZ2V0WVBvc2l0aW9uKG1pbk1heFswXSk7XG4gICAgICBjb25zdCBtYXhZID0gdGhpcy5nZXRZUG9zaXRpb24obWluTWF4WzFdKTtcblxuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3JzWzBdO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhpbmRleCwgbWluWSk7XG4gICAgICBjdHgubGluZVRvKGluZGV4LCBtYXhZKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgaWYgKHNob3dSbXMpIHtcbiAgICAgICAgY29uc3Qgcm1zID0gdGhpcy5ybXNPcGVyYXRvci5pbnB1dFNpZ25hbChzbGljZSk7XG4gICAgICAgIGNvbnN0IHJtc01heFkgPSB0aGlzLmdldFlQb3NpdGlvbihybXMpO1xuICAgICAgICBjb25zdCBybXNNaW5ZID0gdGhpcy5nZXRZUG9zaXRpb24oLXJtcyk7XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3JzWzFdO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oaW5kZXgsIHJtc01pblkpO1xuICAgICAgICBjdHgubGluZVRvKGluZGV4LCBybXNNYXhZKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhdmVmb3JtRGlzcGxheTtcbiIsIi8vIGNvbW1vblxuaW1wb3J0IEJyaWRnZSBmcm9tICcuLi8uLi9jb21tb24vc2luay9CcmlkZ2UnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuLi8uLi9jb21tb24vc2luay9Mb2dnZXInO1xuaW1wb3J0IERhdGFSZWNvcmRlciBmcm9tICcuLi8uLi9jb21tb24vc2luay9EYXRhUmVjb3JkZXInO1xuaW1wb3J0IFNpZ25hbFJlY29yZGVyIGZyb20gJy4uLy4uL2NvbW1vbi9zaW5rL1NpZ25hbFJlY29yZGVyJztcblxuLy8gY2xpZW50IG9ubHlcbmltcG9ydCBCYXNlRGlzcGxheSBmcm9tICcuL0Jhc2VEaXNwbGF5JztcbmltcG9ydCBCcGZEaXNwbGF5IGZyb20gJy4vQnBmRGlzcGxheSc7XG5pbXBvcnQgTWFya2VyRGlzcGxheSBmcm9tICcuL01hcmtlckRpc3BsYXknO1xuaW1wb3J0IFNpZ25hbERpc3BsYXkgZnJvbSAnLi9TaWduYWxEaXNwbGF5JztcbmltcG9ydCBTcGVjdHJ1bURpc3BsYXkgZnJvbSAnLi9TcGVjdHJ1bURpc3BsYXknO1xuaW1wb3J0IFRyYWNlRGlzcGxheSBmcm9tICcuL1RyYWNlRGlzcGxheSc7XG5pbXBvcnQgVnVNZXRlckRpc3BsYXkgZnJvbSAnLi9WdU1ldGVyRGlzcGxheSc7XG5pbXBvcnQgV2F2ZWZvcm1EaXNwbGF5IGZyb20gJy4vV2F2ZWZvcm1EaXNwbGF5JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBCcmlkZ2UsXG4gIExvZ2dlcixcbiAgRGF0YVJlY29yZGVyLFxuICBTaWduYWxSZWNvcmRlcixcblxuICBCYXNlRGlzcGxheSxcbiAgQnBmRGlzcGxheSxcbiAgTWFya2VyRGlzcGxheSxcbiAgU2lnbmFsRGlzcGxheSxcbiAgU3BlY3RydW1EaXNwbGF5LFxuICBUcmFjZURpc3BsYXksXG4gIFZ1TWV0ZXJEaXNwbGF5LFxuICBXYXZlZm9ybURpc3BsYXksXG59O1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgYXVkaW9CdWZmZXI6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBmcmFtZVNpemU6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogNTEyLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBjaGFubmVsOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDAsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIHByb2dyZXNzQ2FsbGJhY2s6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBwcm9ncmVzc0NhbGxiYWNrOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbn07XG5cbmNvbnN0IG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuXG4vKipcbiAqIFNsaWNlIGFuIGBBdWRpb0J1ZmZlcmAgaW50byBzaWduYWwgYmxvY2tzIGFuZCBwcm9wYWdhdGUgdGhlIHJlc3VsdGluZyBmcmFtZXNcbiAqIHRocm91Z2ggdGhlIGdyYXBoLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgcGFyYW1ldGVyJyBkZWZhdWx0IHZhbHVlcy5cbiAqIEBwYXJhbSB7QXVkaW9CdWZmZXJ9IFtvcHRpb25zLmF1ZGlvQnVmZmVyXSAtIEF1ZGlvIGJ1ZmZlciB0byBwcm9jZXNzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmZyYW1lU2l6ZT01MTJdIC0gU2l6ZSBvZiB0aGUgb3V0cHV0IGJsb2Nrcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jaGFubmVsPTBdIC0gTnVtYmVyIG9mIHRoZSBjaGFubmVsIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucHJvZ3Jlc3NDYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4Y3V0ZWQgb24gZWFjaFxuICogIGZyYW1lIG91dHB1dCwgcmVjZWl2ZSBhcyBhcmd1bWVudCB0aGUgY3VycmVudCBwcm9ncmVzcyByYXRpby5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNsaWVudC5zb3VyY2VcbiAqXG4gKiBAdG9kbyAtIEFsbG93IHRvIHBhc3MgcmF3IGJ1ZmZlciBhbmQgc2FtcGxlUmF0ZSAoc2ltcGxpZmllZCB1c2Ugc2VydmVyLXNpZGUpXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBhdWRpb0luQnVmZmVyID0gbmV3IGxmby5zb3VyY2UuQXVkaW9JbkJ1ZmZlcih7XG4gKiAgIGF1ZGlvQnVmZmVyOiBhdWRpb0J1ZmZlcixcbiAqICAgZnJhbWVTaXplOiA1MTIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCB3YXZlZm9ybSA9IG5ldyBsZm8uc2luay5XYXZlZm9ybSh7XG4gKiAgIGNhbnZhczogJyN3YXZlZm9ybScsXG4gKiAgIGR1cmF0aW9uOiAxLFxuICogICBjb2xvcjogJ3N0ZWVsYmx1ZScsXG4gKiAgIHJtczogdHJ1ZSxcbiAqIH0pO1xuICpcbiAqIGF1ZGlvSW5CdWZmZXIuY29ubmVjdCh3YXZlZm9ybSk7XG4gKiBhdWRpb0luQnVmZmVyLnN0YXJ0KCk7XG4gKi9cbmNsYXNzIEF1ZGlvSW5CdWZmZXIgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgYXVkaW9CdWZmZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ2F1ZGlvQnVmZmVyJyk7XG5cbiAgICBpZiAoIWF1ZGlvQnVmZmVyKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwiYXVkaW9CdWZmZXJcIiBwYXJhbWV0ZXInKTtcblxuICAgIHRoaXMuZW5kVGltZSA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUHJvcGFnYXRlIHRoZSBgc3RyZWFtUGFyYW1zYCBpbiB0aGUgZ3JhcGggYW5kIHN0YXJ0IHByb3BhZ2F0aW5nIGZyYW1lcy5cbiAgICogV2hlbiBjYWxsZWQsIHRoZSBzbGljaW5nIG9mIHRoZSBnaXZlbiBgYXVkaW9CdWZmZXJgIHN0YXJ0cyBpbW1lZGlhdGVseSBhbmRcbiAgICogZWFjaCByZXN1bHRpbmcgZnJhbWUgaXMgcHJvcGFnYXRlZCBpbiBncmFwaC5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcmVzZXRTdHJlYW19XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjbGllbnQuc291cmNlLkF1ZGlvSW5CdWZmZXIjc3RvcH1cbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuaW5pdFN0cmVhbSgpO1xuXG4gICAgY29uc3QgY2hhbm5lbCA9IHRoaXMucGFyYW1zLmdldCgnY2hhbm5lbCcpO1xuICAgIGNvbnN0IGF1ZGlvQnVmZmVyID0gdGhpcy5wYXJhbXMuZ2V0KCdhdWRpb0J1ZmZlcicpO1xuICAgIGNvbnN0IGJ1ZmZlciA9IGF1ZGlvQnVmZmVyLmdldENoYW5uZWxEYXRhKGNoYW5uZWwpO1xuICAgIHRoaXMuZW5kVGltZSA9IDA7XG5cbiAgICB0aGlzLnByb2Nlc3NGcmFtZShidWZmZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmFsaXplIHRoZSBzdHJlYW0gYW5kIHN0b3AgdGhlIHdob2xlIGdyYXBoLiBXaGVuIGNhbGxlZCwgdGhlIHNsaWNpbmcgb2ZcbiAgICogdGhlIGBhdWRpb0J1ZmZlcmAgc3RvcHMgaW1tZWRpYXRlbHkuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2ZpbmFsaXplU3RyZWFtfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y2xpZW50LnNvdXJjZS5BdWRpb0luQnVmZmVyI3N0YXJ0fVxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmZpbmFsaXplU3RyZWFtKHRoaXMuZW5kVGltZSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcygpIHtcbiAgICBjb25zdCBhdWRpb0J1ZmZlciA9IHRoaXMucGFyYW1zLmdldCgnYXVkaW9CdWZmZXInKTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZyYW1lU2l6ZScpO1xuICAgIGNvbnN0IHNvdXJjZVNhbXBsZVJhdGUgPSBhdWRpb0J1ZmZlci5zYW1wbGVSYXRlO1xuICAgIGNvbnN0IGZyYW1lUmF0ZSA9IHNvdXJjZVNhbXBsZVJhdGUgLyBmcmFtZVNpemU7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBmcmFtZVNpemU7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVSYXRlID0gZnJhbWVSYXRlO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICdzaWduYWwnO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGUgPSBzb3VyY2VTYW1wbGVSYXRlO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZUNvdW50ID0gZnJhbWVTaXplO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzRnJhbWUoYnVmZmVyKSB7XG4gICAgY29uc3Qgc2FtcGxlUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IHByb2dyZXNzQ2FsbGJhY2sgPSB0aGlzLnBhcmFtcy5nZXQoJ3Byb2dyZXNzQ2FsbGJhY2snKSB8fMKgbm9vcDtcbiAgICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xuICAgIGNvbnN0IG5ickZyYW1lcyA9IE1hdGguY2VpbChidWZmZXIubGVuZ3RoIC8gZnJhbWVTaXplKTtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGxldCBpID0gMDtcblxuICAgIChmdW5jdGlvbiBzbGljZSgpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IGkgKiBmcmFtZVNpemU7XG4gICAgICBjb25zdCBuYnJDb3B5ID0gTWF0aC5taW4obGVuZ3RoIC0gb2Zmc2V0LCBmcmFtZVNpemUpO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZyYW1lU2l6ZTsgaisrKVxuICAgICAgICBkYXRhW2pdID0gaiA8IG5ickNvcHkgPyBidWZmZXJbb2Zmc2V0ICsgal0gOiAwO1xuXG4gICAgICB0aGF0LmZyYW1lLnRpbWUgPSBvZmZzZXQgLyBzYW1wbGVSYXRlO1xuICAgICAgdGhhdC5lbmRUaW1lID0gdGhhdC5mcmFtZS50aW1lICsgbmJyQ29weSAvIHNhbXBsZVJhdGU7XG4gICAgICB0aGF0LnByb3BhZ2F0ZUZyYW1lKCk7XG5cbiAgICAgIGkgKz0gMTtcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2soaSAvIG5ickZyYW1lcyk7XG5cbiAgICAgIGlmIChpIDwgbmJyRnJhbWVzKVxuICAgICAgICBzZXRUaW1lb3V0KHNsaWNlLCAwKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhhdC5maW5hbGl6ZVN0cmVhbSh0aGF0LmVuZFRpbWUpO1xuICAgIH0oKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9JbkJ1ZmZlcjtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHzCoHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBmcmFtZVNpemU6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogNTEyLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBjaGFubmVsOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDAsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIHNvdXJjZU5vZGU6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBhdWRpb0NvbnRleHQ6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxufTtcblxuLyoqXG4gKiBVc2UgYSBgV2ViQXVkaW9gIG5vZGUgYXMgYSBzb3VyY2UgZm9yIHRoZSBncmFwaC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIHBhcmFtZXRlcicgZGVmYXVsdCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0F1ZGlvTm9kZX0gW29wdGlvbnMuc291cmNlTm9kZT1udWxsXSAtIEF1ZGlvIG5vZGUgdG8gcHJvY2Vzc1xuICogIChtYW5kYXRvcnkpLlxuICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IFtvcHRpb25zLmF1ZGlvQ29udGV4dD1udWxsXSAtIEF1ZGlvIGNvbnRleHQgdXNlZCB0b1xuICogIGNyZWF0ZSB0aGUgYXVkaW8gbm9kZSAobWFuZGF0b3J5KS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5mcmFtZVNpemU9NTEyXSAtIFNpemUgb2YgdGhlIG91dHB1dCBibG9ja3MsIGRlZmluZVxuICogIHRoZSBgZnJhbWVTaXplYCBpbiB0aGUgYHN0cmVhbVBhcmFtc2AuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY2hhbm5lbD0wXSAtIE51bWJlciBvZiB0aGUgY2hhbm5lbCB0byBwcm9jZXNzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNvdXJjZVxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICogY29uc3Qgc2luZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gKiBzaW5lLmZyZXF1ZW5jeS52YWx1ZSA9IDI7XG4gKlxuICogY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gKiAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICBzb3VyY2VOb2RlOiBzaW5lLFxuICogfSk7XG4gKlxuICogY29uc3Qgc2lnbmFsRGlzcGxheSA9IG5ldyBsZm8uc2luay5TaWduYWxEaXNwbGF5KHtcbiAqICAgY2FudmFzOiAnI3NpZ25hbCcsXG4gKiAgIGR1cmF0aW9uOiAxLFxuICogfSk7XG4gKlxuICogYXVkaW9Jbk5vZGUuY29ubmVjdChzaWduYWxEaXNwbGF5KTtcbiAqXG4gKiAvLyBzdGFydCB0aGUgc2luZSBvc2NpbGxhdG9yIG5vZGUgYW5kIHRoZSBsZm8gZ3JhcGhcbiAqIHNpbmUuc3RhcnQoKTtcbiAqIGF1ZGlvSW5Ob2RlLnN0YXJ0KCk7XG4gKi9cbmNsYXNzIEF1ZGlvSW5Ob2RlIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IGF1ZGlvQ29udGV4dCA9IHRoaXMucGFyYW1zLmdldCgnYXVkaW9Db250ZXh0Jyk7XG4gICAgY29uc3Qgc291cmNlTm9kZSA9IHRoaXMucGFyYW1zLmdldCgnc291cmNlTm9kZScpO1xuXG4gICAgaWYgKCFhdWRpb0NvbnRleHQgfHwgIShhdWRpb0NvbnRleHQgaW5zdGFuY2VvZiBBdWRpb0NvbnRleHQpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGBhdWRpb0NvbnRleHRgIHBhcmFtZXRlcicpO1xuXG4gICAgaWYgKCFzb3VyY2VOb2RlIHx8ICEoc291cmNlTm9kZSBpbnN0YW5jZW9mIEF1ZGlvTm9kZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYHNvdXJjZU5vZGVgIHBhcmFtZXRlcicpO1xuXG4gICAgdGhpcy5zb3VyY2VOb2RlID0gc291cmNlTm9kZTtcbiAgICB0aGlzLl9jaGFubmVsID0gdGhpcy5wYXJhbXMuZ2V0KCdjaGFubmVsJyk7XG4gICAgdGhpcy5fYmxvY2tEdXJhdGlvbiA9IG51bGw7XG5cbiAgICB0aGlzLnByb2Nlc3NGcmFtZSA9IHRoaXMucHJvY2Vzc0ZyYW1lLmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUHJvcGFnYXRlIHRoZSBgc3RyZWFtUGFyYW1zYCBpbiB0aGUgZ3JhcGggYW5kIHN0YXJ0IHRvIHByb3BhZ2F0ZSBzaWduYWxcbiAgICogYmxvY2tzIHByb2R1Y2VkIGJ5IHRoZSBhdWRpbyBub2RlIGludG8gdGhlIGdyYXBoLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzU3RyZWFtUGFyYW1zfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNyZXNldFN0cmVhbX1cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNsaWVudC5zb3VyY2UuQXVkaW9Jbk5vZGUjc3RvcH1cbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuaW5pdFN0cmVhbSgpO1xuXG4gICAgY29uc3QgYXVkaW9Db250ZXh0ID0gdGhpcy5wYXJhbXMuZ2V0KCdhdWRpb0NvbnRleHQnKTtcbiAgICB0aGlzLmZyYW1lLnRpbWUgPSAwO1xuXG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdmcmFtZVNpemUnKTtcblxuICAgIC8vIEBub3RlOiByZWNyZWF0ZSBlYWNoIHRpbWUgYmVjYXVzZSBvZiBhIGZpcmVmb3ggd2VpcmQgYmVoYXZpb3JcbiAgICB0aGlzLnNjcmlwdFByb2Nlc3NvciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoZnJhbWVTaXplLCAxLCAxKTtcbiAgICB0aGlzLnNjcmlwdFByb2Nlc3Nvci5vbmF1ZGlvcHJvY2VzcyA9IHRoaXMucHJvY2Vzc0ZyYW1lO1xuXG4gICAgdGhpcy5zb3VyY2VOb2RlLmNvbm5lY3QodGhpcy5zY3JpcHRQcm9jZXNzb3IpO1xuICAgIHRoaXMuc2NyaXB0UHJvY2Vzc29yLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5hbGl6ZSB0aGUgc3RyZWFtIGFuZCBzdG9wIHRoZSB3aG9sZSBncmFwaC5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jZmluYWxpemVTdHJlYW19XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjbGllbnQuc291cmNlLkF1ZGlvSW5Ob2RlI3N0YXJ0fVxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmZpbmFsaXplU3RyZWFtKHRoaXMuZnJhbWUudGltZSk7XG5cblxuICAgIHRoaXMuc291cmNlTm9kZS5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5zY3JpcHRQcm9jZXNzb3IuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMoKSB7XG4gICAgY29uc3QgYXVkaW9Db250ZXh0ID0gdGhpcy5wYXJhbXMuZ2V0KCdhdWRpb0NvbnRleHQnKTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZyYW1lU2l6ZScpO1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSBhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZTtcblxuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IGZyYW1lU2l6ZTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVJhdGUgPSBzYW1wbGVSYXRlIC8gZnJhbWVTaXplO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICdzaWduYWwnO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGUgPSBzYW1wbGVSYXRlO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZUNvdW50ID0gZnJhbWVTaXplO1xuXG4gICAgdGhpcy5fYmxvY2tEdXJhdGlvbiA9IGZyYW1lU2l6ZSAvIHNhbXBsZVJhdGU7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJhc2ljYWxseSB0aGUgYHNjcmlwdFByb2Nlc3Nvci5vbmF1ZGlvcHJvY2Vzc2AgY2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByb2Nlc3NGcmFtZShlKSB7XG4gICAgdGhpcy5mcmFtZS5kYXRhID0gZS5pbnB1dEJ1ZmZlci5nZXRDaGFubmVsRGF0YSh0aGlzLl9jaGFubmVsKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUZyYW1lKCk7XG5cbiAgICB0aGlzLmZyYW1lLnRpbWUgKz0gdGhpcy5fYmxvY2tEdXJhdGlvbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdWRpb0luTm9kZTtcbiIsIi8vIGNvbW1vblxuaW1wb3J0IEV2ZW50SW4gZnJvbSAnLi4vLi4vY29tbW9uL3NvdXJjZS9FdmVudEluJztcbi8vIGNsaWVudCBvbmx5XG5pbXBvcnQgQXVkaW9JbkJ1ZmZlciBmcm9tICcuL0F1ZGlvSW5CdWZmZXInO1xuaW1wb3J0IEF1ZGlvSW5Ob2RlIGZyb20gJy4vQXVkaW9Jbk5vZGUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEV2ZW50SW4sXG5cbiAgQXVkaW9JbkJ1ZmZlcixcbiAgQXVkaW9Jbk5vZGUsXG59O1xuIiwiLyoqXG4gKiBTeW5jaHJvbml6ZSBzZXZlcmFsIGRpc3BsYXkgc2lua3MgdG8gYSBjb21tb24gdGltZS5cbiAqXG4gKiBAcGFyYW0gey4uLkJhc2VEaXNwbGF5fSB2aWV3cyAtIExpc3Qgb2YgdGhlIGRpc3BsYXkgdG8gc3luY2hyb25pemUuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQudXRpbHNcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4xID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3NjYWxhcicsXG4gKiAgIGZyYW1lU2l6ZTogMSxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGJwZjEgPSBuZXcgbGZvLnNpbmsuQnBmRGlzcGxheSh7XG4gKiAgIGNhbnZhczogJyNicGYtMScsXG4gKiAgIGR1cmF0aW9uOiAyLFxuICogICBzdGFydFRpbWU6IDAsXG4gKiAgIG1pbjogMCxcbiAqICAgY29sb3JzOiBbJ3N0ZWVsYmx1ZSddLFxuICogfSk7XG4gKlxuICogZXZlbnRJbjEuY29ubmVjdChicGYxKTtcbiAqXG4gKiBjb25zdCBldmVudEluMiA9IG5ldyBsZm8uc291cmNlLkV2ZW50SW4oe1xuICogICBmcmFtZVR5cGU6ICdzY2FsYXInLFxuICogICBmcmFtZVNpemU6IDEsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBicGYyID0gbmV3IGxmby5zaW5rLkJwZkRpc3BsYXkoe1xuICogICBjYW52YXM6ICcjYnBmLTInLFxuICogICBkdXJhdGlvbjogMixcbiAqICAgc3RhcnRUaW1lOiA3LFxuICogICBtaW46IDAsXG4gKiAgIGNvbG9yczogWydvcmFuZ2UnXSxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGRpc3BsYXlTeW5jID0gbmV3IGxmby51dGlscy5EaXNwbGF5U3luYyhicGYxLCBicGYyKTtcbiAqXG4gKiBldmVudEluMi5jb25uZWN0KGJwZjIpO1xuICpcbiAqIGV2ZW50SW4xLnN0YXJ0KCk7XG4gKiBldmVudEluMi5zdGFydCgpO1xuICpcbiAqIGxldCB0aW1lID0gMDtcbiAqIGNvbnN0IHBlcmlvZCA9IDAuNDtcbiAqIGNvbnN0IG9mZnNldCA9IDcuMjtcbiAqXG4gKiAoZnVuY3Rpb24gZ2VuZXJhdGVEYXRhKCkge1xuICogICBjb25zdCB2ID0gTWF0aC5yYW5kb20oKTtcbiAqXG4gKiAgIGV2ZW50SW4xLnByb2Nlc3ModGltZSwgdik7XG4gKiAgIGV2ZW50SW4yLnByb2Nlc3ModGltZSArIG9mZnNldCwgdik7XG4gKlxuICogICB0aW1lICs9IHBlcmlvZDtcbiAqXG4gKiAgIHNldFRpbWVvdXQoZ2VuZXJhdGVEYXRhLCBwZXJpb2QgKiAxMDAwKTtcbiAqIH0oKSk7XG4gKi9cbmNsYXNzIERpc3BsYXlTeW5jIHtcbiAgY29uc3RydWN0b3IoLi4udmlld3MpIHtcbiAgICB0aGlzLnZpZXdzID0gW107XG5cbiAgICB0aGlzLmFkZCguLi52aWV3cyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYWRkKC4uLnZpZXdzKSB7XG4gICAgdmlld3MuZm9yRWFjaCh2aWV3ID0+IHRoaXMuaW5zdGFsbCh2aWV3KSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgaW5zdGFsbCh2aWV3KSB7XG4gICAgdGhpcy52aWV3cy5wdXNoKHZpZXcpO1xuXG4gICAgdmlldy5kaXNwbGF5U3luYyA9IHRoaXM7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgc2hpZnRTaWJsaW5ncyhpU2hpZnQsIHRpbWUsIHZpZXcpIHtcbiAgICB0aGlzLnZpZXdzLmZvckVhY2goZnVuY3Rpb24oZGlzcGxheSkge1xuICAgICAgaWYgKGRpc3BsYXkgIT09IHZpZXcpXG4gICAgICAgIGRpc3BsYXkuc2hpZnRDYW52YXMoaVNoaWZ0LCB0aW1lKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXNwbGF5U3luYztcbiIsImltcG9ydCBEaXNwbGF5U3luYyBmcm9tICcuL0Rpc3BsYXlTeW5jJztcbmltcG9ydCBpbml0V2luZG93cyBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMvd2luZG93cyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgRGlzcGxheVN5bmMsXG4gIGluaXRXaW5kb3dzLFxufTtcbiIsImNvbnN0IGNvbG9ycyA9IFsnIzQ2ODJCNCcsICcjZmZhNTAwJywgJyMwMGU2MDAnLCAnI2ZmMDAwMCcsICcjODAwMDgwJywgJyMyMjQxNTMnXTtcblxuZXhwb3J0IGNvbnN0IGdldENvbG9ycyA9IGZ1bmN0aW9uKHR5cGUsIG5icikge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdzaWduYWwnOlxuICAgICAgcmV0dXJuIGNvbG9yc1swXTsgLy8gc3RlZWxibHVlXG4gICAgICBicmVhaztcbiAgICBjYXNlICdicGYnOlxuICAgICAgaWYgKG5iciA8PSBjb2xvcnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBjb2xvcnMuc2xpY2UoMCwgbmJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IF9jb2xvcnMgPSBjb2xvcnMuc2xpY2UoMCk7XG4gICAgICAgIHdoaWxlIChfY29sb3JzLmxlbmd0aCA8IG5icilcbiAgICAgICAgICBfY29sb3JzLnB1c2goZ2V0UmFuZG9tQ29sb3IoKSk7XG5cbiAgICAgICAgcmV0dXJuIF9jb2xvcnM7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICd3YXZlZm9ybSc6XG4gICAgICByZXR1cm4gW2NvbG9yc1swXSwgY29sb3JzWzVdXTsgLy8gc3RlZWxibHVlIC8gZGFya2JsdWVcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ21hcmtlcic6XG4gICAgICByZXR1cm4gY29sb3JzWzNdOyAvLyByZWRcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NwZWN0cnVtJzpcbiAgICAgIHJldHVybiBjb2xvcnNbMl07IC8vIGdyZWVuXG4gICAgICBicmVhaztcbiAgICBjYXNlICd0cmFjZSc6XG4gICAgICByZXR1cm4gY29sb3JzWzFdOyAvLyBvcmFuZ2VcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0ODQ1MDYvcmFuZG9tLWNvbG9yLWdlbmVyYXRvci1pbi1qYXZhc2NyaXB0XG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tQ29sb3IgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxldHRlcnMgPSAnMDEyMzQ1Njc4OUFCQ0RFRicuc3BsaXQoJycpO1xuICB2YXIgY29sb3IgPSAnIyc7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrICkge1xuICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcbiAgfVxuICByZXR1cm4gY29sb3I7XG59O1xuXG4vLyBzY2FsZSBmcm9tIGRvbWFpbiBbMCwgMV0gdG8gcmFuZ2UgWzI3MCwgMF0gdG8gY29uc3VtZSBpblxuLy8gaHNsKHgsIDEwMCUsIDUwJSkgY29sb3Igc2NoZW1lXG5leHBvcnQgY29uc3QgZ2V0SHVlID0gZnVuY3Rpb24oeCkge1xuICB2YXIgZG9tYWluTWluID0gMDtcbiAgdmFyIGRvbWFpbk1heCA9IDE7XG4gIHZhciByYW5nZU1pbiA9IDI3MDtcbiAgdmFyIHJhbmdlTWF4ID0gMDtcblxuICByZXR1cm4gKCgocmFuZ2VNYXggLSByYW5nZU1pbikgKiAoeCAtIGRvbWFpbk1pbikpIC8gKGRvbWFpbk1heCAtIGRvbWFpbk1pbikpICsgcmFuZ2VNaW47XG59O1xuXG5leHBvcnQgY29uc3QgaGV4VG9SR0IgPSBmdW5jdGlvbihoZXgpIHtcbiAgaGV4ID0gaGV4LnN1YnN0cmluZygxLCA3KTtcbiAgdmFyIHIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gIHZhciBnID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpO1xuICB2YXIgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KTtcbiAgcmV0dXJuIFtyLCBnLCBiXTtcbn07XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBzaW4gPSBNYXRoLnNpbjtcbmNvbnN0IGNvcyA9IE1hdGguY29zO1xuY29uc3Qgc3FydCA9IE1hdGguc3FydDtcbmNvbnN0IHBvdyA9IE1hdGgucG93O1xuY29uc3QgXzJQSSA9IE1hdGguUEkgKiAyO1xuXG4vLyBwbG90IChmcm9tIGh0dHA6Ly93d3cuZWFybGV2ZWwuY29tL3NjcmlwdHMvd2lkZ2V0cy8yMDEzMTAxMy9iaXF1YWRzMi5qcylcbi8vIHZhciBsZW4gPSA1MTI7XG4vLyB2YXIgbWFnUGxvdCA9IFtdO1xuLy8gZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbGVuOyBpZHgrKykge1xuLy8gICB2YXIgdztcbi8vICAgaWYgKHBsb3RUeXBlID09IFwibGluZWFyXCIpXG4vLyAgICAgdyA9IGlkeCAvIChsZW4gLSAxKSAqIE1hdGguUEk7ICAvLyAwIHRvIHBpLCBsaW5lYXIgc2NhbGVcbi8vICAgZWxzZVxuLy8gICAgIHcgPSBNYXRoLmV4cChNYXRoLmxvZygxIC8gMC4wMDEpICogaWR4IC8gKGxlbiAtIDEpKSAqIDAuMDAxICogTWF0aC5QSTsgIC8vIDAuMDAxIHRvIDEsIHRpbWVzIHBpLCBsb2cgc2NhbGVcblxuLy8gICB2YXIgcGhpID0gTWF0aC5wb3coTWF0aC5zaW4ody8yKSwgMik7XG4vLyAgIHZhciB5ID0gTWF0aC5sb2coTWF0aC5wb3coYTArYTErYTIsIDIpIC0gNCooYTAqYTEgKyA0KmEwKmEyICsgYTEqYTIpKnBoaSArIDE2KmEwKmEyKnBoaSpwaGkpIC0gTWF0aC5sb2coTWF0aC5wb3coMStiMStiMiwgMikgLSA0KihiMSArIDQqYjIgKyBiMSpiMikqcGhpICsgMTYqYjIqcGhpKnBoaSk7XG4vLyAgIHkgPSB5ICogMTAgLyBNYXRoLkxOMTBcbi8vICAgaWYgKHkgPT0gLUluZmluaXR5KVxuLy8gICAgIHkgPSAtMjAwO1xuXG4vLyAgIGlmIChwbG90VHlwZSA9PSBcImxpbmVhclwiKVxuLy8gICAgIG1hZ1Bsb3QucHVzaChbaWR4IC8gKGxlbiAtIDEpICogRnMgLyAyLCB5XSk7XG4vLyAgIGVsc2Vcbi8vICAgICBtYWdQbG90LnB1c2goW2lkeCAvIChsZW4gLSAxKSAvIDIsIHldKTtcblxuLy8gICBpZiAoaWR4ID09IDApXG4vLyAgICAgbWluVmFsID0gbWF4VmFsID0geTtcbi8vICAgZWxzZSBpZiAoeSA8IG1pblZhbClcbi8vICAgICBtaW5WYWwgPSB5O1xuLy8gICBlbHNlIGlmICh5ID4gbWF4VmFsKVxuLy8gICAgIG1heFZhbCA9IHk7XG4vLyB9XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICB0eXBlOiB7XG4gICAgdHlwZTogJ2VudW0nLFxuICAgIGRlZmF1bHQ6ICdsb3dwYXNzJyxcbiAgICBsaXN0OiBbXG4gICAgICAnbG93cGFzcycsXG4gICAgICAnaGlnaHBhc3MnLFxuICAgICAgJ2JhbmRwYXNzX2NvbnN0YW50X3NraXJ0JyxcbiAgICAgICdiYW5kcGFzcycsXG4gICAgICAnYmFuZHBhc3NfY29uc3RhbnRfcGVhaycsXG4gICAgICAnbm90Y2gnLFxuICAgICAgJ2FsbHBhc3MnLFxuICAgICAgJ3BlYWtpbmcnLFxuICAgICAgJ2xvd3NoZWxmJyxcbiAgICAgICdoaWdoc2hlbGYnLFxuICAgIF0sXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIGYwOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICB9LFxuICBnYWluOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1pbjogMCxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgcToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMSxcbiAgICBtaW46IDAuMDAxLCAvLyBQSVBPX0JJUVVBRF9NSU5fUVxuICAgIC8vIG1heDogMSxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgLy8gYmFuZHdpZHRoOiB7XG4gIC8vICAgdHlwZTogJ2Zsb2F0JyxcbiAgLy8gICBkZWZhdWx0OiBudWxsLFxuICAvLyAgIG51bGxhYmxlOiB0cnVlLFxuICAvLyAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICAvLyB9LFxufVxuXG5cbi8qKlxuICogQmlxdWFkIGZpbHRlciAoRGlyZWN0IGZvcm0gSSkuIElmIGlucHV0IGlzIG9mIHR5cGUgYHZlY3RvcmAgdGhlIGZpbHRlciBpc1xuICogYXBwbGllZCBvbiBlYWNoIGRpbWVuc2lvbiBpIHBhcmFsbGVsLlxuICpcbiAqIEJhc2VkIG9uIHRoZSBbXCJDb29rYm9vayBmb3JtdWxhZSBmb3IgYXVkaW8gRVEgYmlxdWFkIGZpbHRlciBjb2VmZmljaWVudHNcIl0oaHR0cDovL3d3dy5tdXNpY2RzcC5vcmcvZmlsZXMvQXVkaW8tRVEtQ29va2Jvb2sudHh0KVxuICogYnkgUm9iZXJ0IEJyaXN0b3ctSm9obnNvbi5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZXMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudHlwZT0nbG93cGFzcyddIC0gVHlwZSBvZiB0aGUgZmlsdGVyLiBBdmFpbGFibGVcbiAqICBmaWx0ZXJzOiAnbG93cGFzcycsICdoaWdocGFzcycsICdiYW5kcGFzc19jb25zdGFudF9za2lydCcsICdiYW5kcGFzc19jb25zdGFudF9wZWFrJ1xuICogIChhbGlhcyAnYmFuZHBhc3MnKSwgJ25vdGNoJywgJ2FsbHBhc3MnLCAncGVha2luZycsICdsb3dzaGVsZicsICdoaWdoc2hlbGYnLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmYwPTFdIC0gQ3V0b2ZmIG9yIGNlbnRlciBmcmVxdWVuY3kgb2YgdGhlIGZpbHRlclxuICogIGFjY29yZGluZyB0byBpdHMgdHlwZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5nYWluPTFdIC0gR2FpbiBvZiB0aGUgZmlsdGVyIChpbiBkQikuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucT0xXSAtIFF1YWxpdHkgZmFjdG9yIG9mIHRoZSBmaWx0ZXIuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBhdWRpb0luQnVmZmVyID0gbmV3IGxmby5zb3VyY2UuQXVkaW9JbkJ1ZmZlcih7XG4gKiAgIGF1ZGlvQnVmZmVyOiBidWZmZXIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBiaXF1YWQgPSBuZXcgbGZvLm9wZXJhdG9yLkJpcXVhZCh7XG4gKiAgIHR5cGU6ICdsb3dwYXNzJyxcbiAqICAgZjA6IDIwMDAsXG4gKiAgIGdhaW46IDMsXG4gKiAgIHE6IDEyLFxuICogfSk7XG4gKlxuICogY29uc3Qgc3BlY3RydW1EaXNwbGF5ID0gbmV3IGxmby5zaW5rLlNwZWN0cnVtRGlzcGxheSh7XG4gKiAgIGNhbnZhczogJyNzcGVjdHJ1bScsXG4gKiB9KTtcbiAqXG4gKiBhdWRpb0luQnVmZmVyLmNvbm5lY3QoYmlxdWFkKTtcbiAqIGJpcXVhZC5jb25uZWN0KHNwZWN0cnVtRGlzcGxheSk7XG4gKlxuICogYXVkaW9JbkJ1ZmZlci5zdGFydCgpO1xuICovXG5jbGFzcyBCaXF1YWQgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgb25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpIHtcbiAgICB0aGlzLl9jYWxjdWxhdGVDb2VmcygpO1xuICB9XG5cbiAgX2NhbGN1bGF0ZUNvZWZzKCkge1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlO1xuICAgIGNvbnN0IGZyYW1lVHlwZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG5cbiAgICBjb25zdCB0eXBlID0gdGhpcy5wYXJhbXMuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3QgZjAgPSB0aGlzLnBhcmFtcy5nZXQoJ2YwJyk7XG4gICAgY29uc3QgZ2FpbiA9IHRoaXMucGFyYW1zLmdldCgnZ2FpbicpO1xuICAgIGNvbnN0IHEgPSB0aGlzLnBhcmFtcy5nZXQoJ3EnKTtcbiAgICAvLyBjb25zdCBiYW5kd2lkdGggPSB0aGlzLnBhcmFtcy5nZXQoJ2JhbmR3aWR0aCcpO1xuICAgIGNvbnN0IGJhbmR3aWR0aCA9IG51bGw7XG5cbiAgICBsZXQgYjAgPSAwLCBiMSA9IDAsIGIyID0gMCwgYTAgPSAwLCBhMSA9IDAsIGEyID0gMDtcblxuICAgIGNvbnN0IEEgPSBwb3coMTAsIGdhaW4gLyA0MCk7XG4gICAgY29uc3QgdzAgPSBfMlBJICogZjAgLyBzYW1wbGVSYXRlO1xuICAgIGNvbnN0IGNvc1cwID0gY29zKHcwKTtcbiAgICBjb25zdCBzaW5XMCA9IHNpbih3MCk7XG4gICAgbGV0IGFscGhhOyAvLyBkZXBlbmQgb2YgdGhlIGZpbHRlciB0eXBlXG4gICAgbGV0IF8yUm9vdEFBbHBoYTsgLy8gaW50ZXJtZWRpYXRlIHZhbHVlIGZvciBsb3dzaGVsZiBhbmQgaGlnaHNoZWxmXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIC8vIEgocykgPSAxIC8gKHNeMiArIHMvUSArIDEpXG4gICAgICBjYXNlICdsb3dwYXNzJzpcbiAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIGIwID0gKDEgLSBjb3NXMCkgLyAyO1xuICAgICAgICBiMSA9IDEgLSBjb3NXMDtcbiAgICAgICAgYjIgPSBiMDtcbiAgICAgICAgYTAgPSAxICsgYWxwaGE7XG4gICAgICAgIGExID0gLTIgKiBjb3NXMDtcbiAgICAgICAgYTIgPSAxIC1hbHBoYTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBIKHMpID0gc14yIC8gKHNeMiArIHMvUSArIDEpXG4gICAgICBjYXNlICdoaWdocGFzcyc6XG4gICAgICAgIGFscGhhID0gc2luVzAgLyAoMiAqIHEpO1xuICAgICAgICBiMCA9ICgxICsgY29zVzApIC8gMjtcbiAgICAgICAgYjEgPSAtICgxICsgY29zVzApXG4gICAgICAgIGIyID0gYjA7XG4gICAgICAgIGEwID0gMSArIGFscGhhO1xuICAgICAgICBhMSA9IC0yICogY29zVzA7XG4gICAgICAgIGEyID0gMSAtIGFscGhhO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIEgocykgPSBzIC8gKHNeMiArIHMvUSArIDEpICAoY29uc3RhbnQgc2tpcnQgZ2FpbiwgcGVhayBnYWluID0gUSlcbiAgICAgIGNhc2UgJ2JhbmRwYXNzX2NvbnN0YW50X3NraXJ0JzpcbiAgICAgICAgaWYgKGJhbmR3aWR0aCkge1xuICAgICAgICAgIC8vIHNpbih3MCkqc2luaCggbG4oMikvMiAqIEJXICogdzAvc2luKHcwKSApICAgICAgICAgICAoY2FzZTogQlcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIH1cblxuICAgICAgICBiMCA9IHNpblcwIC8gMjtcbiAgICAgICAgYjEgPSAwO1xuICAgICAgICBiMiA9IC1iMDtcbiAgICAgICAgYTAgPSAxICsgYWxwaGE7XG4gICAgICAgIGExID0gLTIgKiBjb3NXMDtcbiAgICAgICAgYTIgPSAxIC0gYWxwaGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gSChzKSA9IChzL1EpIC8gKHNeMiArIHMvUSArIDEpICAgICAgKGNvbnN0YW50IDAgZEIgcGVhayBnYWluKVxuICAgICAgY2FzZSAnYmFuZHBhc3MnOiAvLyBsb29rcyBsaWtlIHdoYXQgaXMgZ25lcmFsbHkgY29uc2lkZXJlZCBhcyBhIGJhbmRwYXNzXG4gICAgICBjYXNlICdiYW5kcGFzc19jb25zdGFudF9wZWFrJzpcbiAgICAgICAgaWYgKGJhbmR3aWR0aCkge1xuICAgICAgICAgIC8vIHNpbih3MCkqc2luaCggbG4oMikvMiAqIEJXICogdzAvc2luKHcwKSApICAgICAgICAgICAoY2FzZTogQlcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIH1cblxuICAgICAgICBiMCA9IGFscGhhO1xuICAgICAgICBiMSA9IDA7XG4gICAgICAgIGIyID0gLWFscGhhO1xuICAgICAgICBhMCA9IDEgKyBhbHBoYTtcbiAgICAgICAgYTEgPSAtMiAqIGNvc1cwO1xuICAgICAgICBhMiA9IDEgLSBhbHBoYTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBIKHMpID0gKHNeMiArIDEpIC8gKHNeMiArIHMvUSArIDEpXG4gICAgICBjYXNlICdub3RjaCc6XG4gICAgICAgIGFscGhhID0gc2luVzAgLyAoMiAqIHEpO1xuICAgICAgICBiMCA9IDE7XG4gICAgICAgIGIxID0gLTIgKiBjb3NXMDtcbiAgICAgICAgYjIgPSAxO1xuICAgICAgICBhMCA9IDEgKyBhbHBoYTtcbiAgICAgICAgYTEgPSBiMTtcbiAgICAgICAgYTIgPSAxIC0gYWxwaGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gSChzKSA9IChzXjIgLSBzL1EgKyAxKSAvIChzXjIgKyBzL1EgKyAxKVxuICAgICAgY2FzZSAnYWxscGFzcyc6XG4gICAgICAgIGFscGhhID0gc2luVzAgLyAoMiAqIHEpO1xuICAgICAgICBiMCA9IDEgLSBhbHBoYTtcbiAgICAgICAgYjEgPSAtMiAqIGNvc1cwO1xuICAgICAgICBiMiA9IDEgKyBhbHBoYTtcbiAgICAgICAgYTAgPSBiMjtcbiAgICAgICAgYTEgPSBiMTtcbiAgICAgICAgYTIgPSBiMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBIKHMpID0gKHNeMiArIHMqKEEvUSkgKyAxKSAvIChzXjIgKyBzLyhBKlEpICsgMSlcbiAgICAgIGNhc2UgJ3BlYWtpbmcnOlxuICAgICAgICBpZiAoYmFuZHdpZHRoKSB7XG4gICAgICAgICAgLy8gc2luKHcwKSpzaW5oKCBsbigyKS8yICogQlcgKiB3MC9zaW4odzApICkgICAgICAgICAgIChjYXNlOiBCVylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbHBoYSA9IHNpblcwIC8gKDIgKiBxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGIwID0gMSArIGFscGhhICogQTtcbiAgICAgICAgYjEgPSAtMiAqIGNvc1cwO1xuICAgICAgICBiMiA9IDEgLSBhbHBoYSAqIEE7XG4gICAgICAgIGEwID0gMSArIGFscGhhIC8gQTtcbiAgICAgICAgYTEgPSBiMTtcbiAgICAgICAgYTIgPSAxIC0gYWxwaGEgLyBBO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIEgocykgPSBBICogKHNeMiArIChzcXJ0KEEpL1EpKnMgKyBBKS8oQSpzXjIgKyAoc3FydChBKS9RKSpzICsgMSlcbiAgICAgIGNhc2UgJ2xvd3NoZWxmJzpcbiAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIF8yUm9vdEFBbHBoYSA9IDIgKiBzcXJ0KEEpICogYWxwaGE7XG5cbiAgICAgICAgYjAgPSAgICAgQSAqICgoQSArIDEpIC0gKEEgLSAxKSAqIGNvc1cwICsgXzJSb290QUFscGhhKTtcbiAgICAgICAgYjEgPSAyICogQSAqICgoQSAtIDEpIC0gKEEgKyAxKSAqIGNvc1cwKTtcbiAgICAgICAgYjIgPSAgICAgQSAqICgoQSArIDEpIC0gKEEgLSAxKSAqIGNvc1cwIC0gXzJSb290QUFscGhhKTtcbiAgICAgICAgYTAgPSAgICAgICAgICAoQSArIDEpICsgKEEgLSAxKSAqIGNvc1cwICsgXzJSb290QUFscGhhO1xuICAgICAgICBhMSA9ICAgIC0yICogKChBIC0gMSkgKyAoQSArIDEpICogY29zVzApO1xuICAgICAgICBhMiA9ICAgICAgICAgIChBICsgMSkgKyAoQSAtIDEpICogY29zVzAgLSBfMlJvb3RBQWxwaGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gSChzKSA9IEEgKiAoQSpzXjIgKyAoc3FydChBKS9RKSpzICsgMSkvKHNeMiArIChzcXJ0KEEpL1EpKnMgKyBBKVxuICAgICAgY2FzZSAnaGlnaHNoZWxmJzpcbiAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIF8yUm9vdEFBbHBoYSA9IDIgKiBzcXJ0KEEpICogYWxwaGE7XG5cbiAgICAgICAgYjAgPSAgICAgIEEgKiAoKEEgKyAxKSArIChBIC0gMSkgKiBjb3NXMCArIF8yUm9vdEFBbHBoYSk7XG4gICAgICAgIGIxID0gLTIgKiBBICogKChBIC0gMSkgKyAoQSArIDEpICogY29zVzApO1xuICAgICAgICBiMiA9ICAgICAgQSAqICgoQSArIDEpICsgKEEgLSAxKSAqIGNvc1cwIC0gXzJSb290QUFscGhhKTtcbiAgICAgICAgYTAgPSAgICAgICAgICAgKEEgKyAxKSAtIChBIC0gMSkgKiBjb3NXMCArIF8yUm9vdEFBbHBoYTtcbiAgICAgICAgYTEgPSAgICAgIDIgKiAoKEEgLSAxKSAtIChBICsgMSkgKiBjb3NXMCk7XG4gICAgICAgIGEyID0gICAgICAgICAgIChBICsgMSkgLSAoQSAtIDEpICogY29zVzAgLSBfMlJvb3RBQWxwaGE7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5jb2VmcyA9IHtcbiAgICAgIGIwOiBiMCAvIGEwLFxuICAgICAgYjE6IGIxIC8gYTAsXG4gICAgICBiMjogYjIgLyBhMCxcbiAgICAgIGExOiBhMSAvIGEwLFxuICAgICAgYTI6IGEyIC8gYTAsXG4gICAgfTtcblxuICAgIC8vIHJlc2V0IHN0YXRlXG4gICAgaWYgKGZyYW1lVHlwZSA9PT0gJ3NpZ25hbCcpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSB7IHgxOiAwLCB4MjogMCwgeTE6IDAsIHkyOiAwIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIHgxOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICAgIHgyOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICAgIHkxOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICAgIHkyOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICAvLyBpZiBubyBgc2FtcGxlUmF0ZWAgb3IgYHNhbXBsZVJhdGVgIGlzIDAgd2Ugc2hhbGwgaGFsdCFcbiAgICBjb25zdCBzYW1wbGVSYXRlID0gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZTtcblxuICAgIGlmICghc2FtcGxlUmF0ZSB8fCBzYW1wbGVSYXRlIDw9IDApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc2FtcGxlUmF0ZSB2YWx1ZSAoMCkgZm9yIGJpcXVhZCcpO1xuXG4gICAgdGhpcy5fY2FsY3VsYXRlQ29lZnMoKTtcbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUpIHtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3Qgb3V0RGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCBpbkRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBjb2VmcyA9IHRoaXMuY29lZnM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lU2l6ZTsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gaW5EYXRhW2ldO1xuICAgICAgY29uc3QgeSA9IGNvZWZzLmIwICogeFxuICAgICAgICAgICAgICArIGNvZWZzLmIxICogc3RhdGUueDFbaV0gKyBjb2Vmcy5iMiAqIHN0YXRlLngyW2ldXG4gICAgICAgICAgICAgIC0gY29lZnMuYTEgKiBzdGF0ZS55MVtpXSAtIGNvZWZzLmEyICogc3RhdGUueTJbaV07XG5cbiAgICAgIG91dERhdGFbaV0gPSB5O1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGVzXG4gICAgICBzdGF0ZS54MltpXSA9IHN0YXRlLngxW2ldO1xuICAgICAgc3RhdGUueDFbaV0gPSB4O1xuICAgICAgc3RhdGUueTJbaV0gPSBzdGF0ZS55MVtpXTtcbiAgICAgIHN0YXRlLnkxW2ldID0geTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBvdXREYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IGluRGF0YSA9IGZyYW1lLmRhdGE7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNvZWZzID0gdGhpcy5jb2VmcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVTaXplOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSBpbkRhdGFbaV07XG4gICAgICBjb25zdCB5ID0gY29lZnMuYjAgKiB4XG4gICAgICAgICAgICAgICsgY29lZnMuYjEgKiBzdGF0ZS54MSArIGNvZWZzLmIyICogc3RhdGUueDJcbiAgICAgICAgICAgICAgLSBjb2Vmcy5hMSAqIHN0YXRlLnkxIC0gY29lZnMuYTIgKiBzdGF0ZS55MjtcblxuICAgICAgb3V0RGF0YVtpXSA9IHk7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZXNcbiAgICAgIHN0YXRlLngyID0gc3RhdGUueDE7XG4gICAgICBzdGF0ZS54MSA9IHg7XG4gICAgICBzdGF0ZS55MiA9IHN0YXRlLnkxO1xuICAgICAgc3RhdGUueTEgPSB5O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCaXF1YWQ7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBzcXJ0ID0gTWF0aC5zcXJ0O1xuY29uc3QgY29zID0gTWF0aC5jb3M7XG5jb25zdCBQSSA9IE1hdGguUEk7XG5cbi8vIERjdCBUeXBlIDIgLSBvcnRob2dvbmFsIG1hdHJpeCBzY2FsaW5nXG5mdW5jdGlvbiBnZXREY3RXZWlnaHRzKG9yZGVyLCBOLCB0eXBlID0gJ2h0aycpIHtcbiAgY29uc3Qgd2VpZ2h0cyA9IG5ldyBGbG9hdDMyQXJyYXkoTiAqIG9yZGVyKTtcbiAgY29uc3QgcGlPdmVyTiA9IFBJIC8gTjtcbiAgY29uc3Qgc2NhbGUwID0gMSAvIHNxcnQoMik7XG4gIGNvbnN0IHNjYWxlID0gc3FydCgyIC8gTik7XG5cbiAgZm9yIChsZXQgayA9IDA7IGsgPCBvcmRlcjsgaysrKSB7XG4gICAgY29uc3QgcyA9IChrID09PSAwKSA/IChzY2FsZTAgKiBzY2FsZSkgOiBzY2FsZTtcbiAgICAvLyBjb25zdCBzID0gc2NhbGU7IC8vIHJ0YSBkb2Vzbid0IGFwcGx5IGs9MCBzY2FsaW5nXG5cbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IE47IG4rKylcbiAgICAgIHdlaWdodHNbayAqIE4gKyBuXSA9IHMgKiBjb3MoayAqIChuICsgMC41KSAqIHBpT3Zlck4pO1xuICB9XG5cbiAgcmV0dXJuIHdlaWdodHM7XG59XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAxMixcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBDb21wdXRlIHRoZSBEaXNjcmV0ZSBDb3NpbmUgVHJhbnNmb3JtIG9mIGFuIGlucHV0IGBzaWduYWxgIG9yIGB2ZWN0b3JgLlxuICogKEhUSyBzdHlsZSB3ZWlnaHRpbmcpLlxuICpcbiAqIF9zdXBwb3J0IGBzdGFuZGFsb25lYCB1c2FnZV9cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm9yZGVyPTEyXSAtIE51bWJlciBvZiBjb21wdXRlZCBiaW5zLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogLy8gYXNzdW1pbmcgc29tZSBhdWRpbyBidWZmZXJcbiAqIGNvbnN0IHNvdXJjZSA9IG5ldyBBdWRpb0luQnVmZmVyKHtcbiAqICAgYXVkaW9CdWZmZXI6IGF1ZGlvQnVmZmVyLFxuICogICB1c2VXb3JrZXI6IGZhbHNlLFxuICogfSk7XG4gKlxuICogY29uc3Qgc2xpY2VyID0gbmV3IFNsaWNlcih7XG4gKiAgIGZyYW1lU2l6ZTogNTEyLFxuICogICBob3BTaXplOiA1MTIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBkY3QgPSBuZXcgRGN0KHtcbiAqICAgb3JkZXI6IDEyLFxuICogfSk7XG4gKlxuICogY29uc3QgbG9nZ2VyID0gbmV3IGxmby5zaW5rLkxvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogc291cmNlLmNvbm5lY3Qoc2xpY2VyKTtcbiAqIHNsaWNlci5jb25uZWN0KGRjdCk7XG4gKiBkY3QuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIHNvdXJjZS5zdGFydCgpO1xuICovXG5jbGFzcyBEY3QgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGNvbnN0IGluRnJhbWVTaXplID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBvcmRlcjtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFtdO1xuXG4gICAgdGhpcy53ZWlnaHRNYXRyaXggPSBnZXREY3RXZWlnaHRzKG9yZGVyLCBpbkZyYW1lU2l6ZSk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYERjdGAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIC0gSW5wdXQgdmFsdWVzLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBEY3Qgb2YgdGhlIGlucHV0IGFycmF5LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBkY3QgPSBuZXcgbGZvLm9wZXJhdG9yLkRjdCh7IG9yZGVyOiAxMiB9KTtcbiAgICogLy8gbWFuZGF0b3J5IGZvciB1c2UgaW4gc3RhbmRhbG9uZSBtb2RlXG4gICAqIGRjdC5pbml0U3RyZWFtKHsgZnJhbWVTaXplOiA1MTIsIGZyYW1lVHlwZTogJ3NpZ25hbCcgfSk7XG4gICAqIGRjdC5pbnB1dFNpZ25hbChkYXRhKTtcbiAgICovXG4gIGlucHV0U2lnbmFsKHZhbHVlcykge1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHZhbHVlcy5sZW5ndGg7XG4gICAgY29uc3Qgb3V0RnJhbWUgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgY29uc3Qgd2VpZ2h0cyA9IHRoaXMud2VpZ2h0TWF0cml4O1xuXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBvcmRlcjsgaysrKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBrICogZnJhbWVTaXplO1xuICAgICAgb3V0RnJhbWVba10gPSAwO1xuXG4gICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGZyYW1lU2l6ZTsgbisrKVxuICAgICAgICBvdXRGcmFtZVtrXSArPSB2YWx1ZXNbbl0gKiB3ZWlnaHRzW29mZnNldCArIG5dO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRGcmFtZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEY3Q7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuaW1wb3J0IGluaXRXaW5kb3cgZnJvbSAnLi4vdXRpbHMvd2luZG93cyc7XG5cbi8vIGh0dHBzOi8vY29kZS5zb3VuZHNvZnR3YXJlLmFjLnVrL3Byb2plY3RzL2pzLWRzcC10ZXN0L3JlcG9zaXRvcnkvZW50cnkvZmZ0L25heXVraS1vYmovZmZ0LmpzXG4vKlxuICogRnJlZSBGZnQgYW5kIGNvbnZvbHV0aW9uIChKYXZhU2NyaXB0KVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQcm9qZWN0IE5heXVraVxuICogaHR0cDovL3d3dy5uYXl1a2kuaW8vcGFnZS9mcmVlLXNtYWxsLWZmdC1pbi1tdWx0aXBsZS1sYW5ndWFnZXNcbiAqXG4gKiAoTUlUIExpY2Vuc2UpXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4gKiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4gKiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4gKiB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuICogdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiAtIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiAgIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogLSBUaGUgU29mdHdhcmUgaXMgcHJvdmlkZWQgXCJhcyBpc1wiLCB3aXRob3V0IHdhcnJhbnR5IG9mIGFueSBraW5kLCBleHByZXNzIG9yXG4gKiAgIGltcGxpZWQsIGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG8gdGhlIHdhcnJhbnRpZXMgb2YgbWVyY2hhbnRhYmlsaXR5LFxuICogICBmaXRuZXNzIGZvciBhIHBhcnRpY3VsYXIgcHVycG9zZSBhbmQgbm9uaW5mcmluZ2VtZW50LiBJbiBubyBldmVudCBzaGFsbCB0aGVcbiAqICAgYXV0aG9ycyBvciBjb3B5cmlnaHQgaG9sZGVycyBiZSBsaWFibGUgZm9yIGFueSBjbGFpbSwgZGFtYWdlcyBvciBvdGhlclxuICogICBsaWFiaWxpdHksIHdoZXRoZXIgaW4gYW4gYWN0aW9uIG9mIGNvbnRyYWN0LCB0b3J0IG9yIG90aGVyd2lzZSwgYXJpc2luZyBmcm9tLFxuICogICBvdXQgb2Ygb3IgaW4gY29ubmVjdGlvbiB3aXRoIHRoZSBTb2Z0d2FyZSBvciB0aGUgdXNlIG9yIG90aGVyIGRlYWxpbmdzIGluIHRoZVxuICogICBTb2Z0d2FyZS5cbiAqXG4gKiBTbGlnaHRseSByZXN0cnVjdHVyZWQgYnkgQ2hyaXMgQ2FubmFtLCBjYW5uYW1AYWxsLWRheS1icmVha2Zhc3QuY29tXG4gKlxuICogQHByaXZhdGVcbiAqL1xuLypcbiAqIENvbnN0cnVjdCBhbiBvYmplY3QgZm9yIGNhbGN1bGF0aW5nIHRoZSBkaXNjcmV0ZSBGb3VyaWVyIHRyYW5zZm9ybSAoREZUKSBvZlxuICogc2l6ZSBuLCB3aGVyZSBuIGlzIGEgcG93ZXIgb2YgMi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBGZnROYXl1a2kobikge1xuXG4gIHRoaXMubiA9IG47XG4gIHRoaXMubGV2ZWxzID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgaWYgKDEgPDwgaSA9PSBuKSB7XG4gICAgICB0aGlzLmxldmVscyA9IGk7ICAvLyBFcXVhbCB0byBsb2cyKG4pXG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMubGV2ZWxzID09IC0xKSB7XG4gICAgdGhyb3cgXCJMZW5ndGggaXMgbm90IGEgcG93ZXIgb2YgMlwiO1xuICB9XG5cbiAgdGhpcy5jb3NUYWJsZSA9IG5ldyBBcnJheShuIC8gMik7XG4gIHRoaXMuc2luVGFibGUgPSBuZXcgQXJyYXkobiAvIDIpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbiAvIDI7IGkrKykge1xuICAgIHRoaXMuY29zVGFibGVbaV0gPSBNYXRoLmNvcygyICogTWF0aC5QSSAqIGkgLyBuKTtcbiAgICB0aGlzLnNpblRhYmxlW2ldID0gTWF0aC5zaW4oMiAqIE1hdGguUEkgKiBpIC8gbik7XG4gIH1cblxuICAvKlxuICAgKiBDb21wdXRlcyB0aGUgZGlzY3JldGUgRm91cmllciB0cmFuc2Zvcm0gKERGVCkgb2YgdGhlIGdpdmVuIGNvbXBsZXggdmVjdG9yLFxuICAgKiBzdG9yaW5nIHRoZSByZXN1bHQgYmFjayBpbnRvIHRoZSB2ZWN0b3IuXG4gICAqIFRoZSB2ZWN0b3IncyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgc2l6ZSBuIHRoYXQgd2FzIHBhc3NlZCB0byB0aGVcbiAgICogb2JqZWN0IGNvbnN0cnVjdG9yLCBhbmQgdGhpcyBtdXN0IGJlIGEgcG93ZXIgb2YgMi4gVXNlcyB0aGUgQ29vbGV5LVR1a2V5XG4gICAqIGRlY2ltYXRpb24taW4tdGltZSByYWRpeC0yIGFsZ29yaXRobS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuZm9yd2FyZCA9IGZ1bmN0aW9uKHJlYWwsIGltYWcpIHtcbiAgICB2YXIgbiA9IHRoaXMubjtcblxuICAgIC8vIEJpdC1yZXZlcnNlZCBhZGRyZXNzaW5nIHBlcm11dGF0aW9uXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIHZhciBqID0gcmV2ZXJzZUJpdHMoaSwgdGhpcy5sZXZlbHMpO1xuXG4gICAgICBpZiAoaiA+IGkpIHtcbiAgICAgICAgdmFyIHRlbXAgPSByZWFsW2ldO1xuICAgICAgICByZWFsW2ldID0gcmVhbFtqXTtcbiAgICAgICAgcmVhbFtqXSA9IHRlbXA7XG4gICAgICAgIHRlbXAgPSBpbWFnW2ldO1xuICAgICAgICBpbWFnW2ldID0gaW1hZ1tqXTtcbiAgICAgICAgaW1hZ1tqXSA9IHRlbXA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29vbGV5LVR1a2V5IGRlY2ltYXRpb24taW4tdGltZSByYWRpeC0yIEZmdFxuICAgIGZvciAodmFyIHNpemUgPSAyOyBzaXplIDw9IG47IHNpemUgKj0gMikge1xuICAgICAgdmFyIGhhbGZzaXplID0gc2l6ZSAvIDI7XG4gICAgICB2YXIgdGFibGVzdGVwID0gbiAvIHNpemU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSArPSBzaXplKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBpLCBrID0gMDsgaiA8IGkgKyBoYWxmc2l6ZTsgaisrLCBrICs9IHRhYmxlc3RlcCkge1xuICAgICAgICAgIHZhciB0cHJlID0gIHJlYWxbaitoYWxmc2l6ZV0gKiB0aGlzLmNvc1RhYmxlW2tdICtcbiAgICAgICAgICAgICAgICAgICAgICBpbWFnW2oraGFsZnNpemVdICogdGhpcy5zaW5UYWJsZVtrXTtcbiAgICAgICAgICB2YXIgdHBpbSA9IC1yZWFsW2oraGFsZnNpemVdICogdGhpcy5zaW5UYWJsZVtrXSArXG4gICAgICAgICAgICAgICAgICAgICAgaW1hZ1tqK2hhbGZzaXplXSAqIHRoaXMuY29zVGFibGVba107XG4gICAgICAgICAgcmVhbFtqICsgaGFsZnNpemVdID0gcmVhbFtqXSAtIHRwcmU7XG4gICAgICAgICAgaW1hZ1tqICsgaGFsZnNpemVdID0gaW1hZ1tqXSAtIHRwaW07XG4gICAgICAgICAgcmVhbFtqXSArPSB0cHJlO1xuICAgICAgICAgIGltYWdbal0gKz0gdHBpbTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybnMgdGhlIGludGVnZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHJldmVyc2Ugb2YgdGhlIGxvd2VzdCAnYml0cydcbiAgICAvLyBiaXRzIG9mIHRoZSBpbnRlZ2VyICd4Jy5cbiAgICBmdW5jdGlvbiByZXZlcnNlQml0cyh4LCBiaXRzKSB7XG4gICAgICB2YXIgeSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYml0czsgaSsrKSB7XG4gICAgICAgIHkgPSAoeSA8PCAxKSB8ICh4ICYgMSk7XG4gICAgICAgIHggPj4+PSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBDb21wdXRlcyB0aGUgaW52ZXJzZSBkaXNjcmV0ZSBGb3VyaWVyIHRyYW5zZm9ybSAoSURGVCkgb2YgdGhlIGdpdmVuIGNvbXBsZXhcbiAgICogdmVjdG9yLCBzdG9yaW5nIHRoZSByZXN1bHQgYmFjayBpbnRvIHRoZSB2ZWN0b3IuXG4gICAqIFRoZSB2ZWN0b3IncyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgc2l6ZSBuIHRoYXQgd2FzIHBhc3NlZCB0byB0aGVcbiAgICogb2JqZWN0IGNvbnN0cnVjdG9yLCBhbmQgdGhpcyBtdXN0IGJlIGEgcG93ZXIgb2YgMi4gVGhpcyBpcyBhIHdyYXBwZXJcbiAgICogZnVuY3Rpb24uIFRoaXMgdHJhbnNmb3JtIGRvZXMgbm90IHBlcmZvcm0gc2NhbGluZywgc28gdGhlIGludmVyc2UgaXMgbm90XG4gICAqIGEgdHJ1ZSBpbnZlcnNlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbnZlcnNlID0gZnVuY3Rpb24ocmVhbCwgaW1hZykge1xuICAgIGZvcndhcmQoaW1hZywgcmVhbCk7XG4gIH1cbn1cblxuXG5jb25zdCBzcXJ0ID0gTWF0aC5zcXJ0O1xuXG5jb25zdCBpc1Bvd2VyT2ZUd28gPSBmdW5jdGlvbihudW1iZXIpIHtcbiAgd2hpbGUgKChudW1iZXIgJSAyID09PSAwKSAmJiBudW1iZXIgPiAxKVxuICAgIG51bWJlciA9IG51bWJlciAvIDI7XG5cbiAgcmV0dXJuIG51bWJlciA9PT0gMTtcbn1cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHNpemU6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMTAyNCxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICB3aW5kb3c6IHtcbiAgICB0eXBlOiAnZW51bScsXG4gICAgbGlzdDogWydub25lJywgJ2hhbm4nLCAnaGFubmluZycsICdoYW1taW5nJywgJ2JsYWNrbWFuJywgJ2JsYWNrbWFuaGFycmlzJywgJ3NpbmUnLCAncmVjdGFuZ2xlJ10sXG4gICAgZGVmYXVsdDogJ25vbmUnLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIG1vZGU6IHtcbiAgICB0eXBlOiAnZW51bScsXG4gICAgbGlzdDogWydtYWduaXR1ZGUnLCAncG93ZXInXSwgLy8gYWRkIGNvbXBsZXggb3V0cHV0XG4gICAgZGVmYXVsdDogJ21hZ25pdHVkZScsXG4gIH0sXG4gIG5vcm06IHtcbiAgICB0eXBlOiAnZW51bScsXG4gICAgZGVmYXVsdDogJ2F1dG8nLFxuICAgIGxpc3Q6IFsnYXV0bycsICdub25lJywgJ2xpbmVhcicsICdwb3dlciddLFxuICB9LFxufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIEZhc3QgRm91cmllciBUcmFuc2Zvcm0gb2YgYW4gaW5jb21taW5nIGBzaWduYWxgLlxuICpcbiAqIEZmdCBpbXBsZW1lbnRhdGlvbiBieSBbTmF5dWtpXShodHRwczovL2NvZGUuc291bmRzb2Z0d2FyZS5hYy51ay9wcm9qZWN0cy9qcy1kc3AtdGVzdC9yZXBvc2l0b3J5L2VudHJ5L2ZmdC9uYXl1a2ktb2JqL2ZmdC5qcykuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2l6ZT0xMDI0XSAtIFNpemUgb2YgdGhlIGZmdCwgc2hvdWxkIGJlIGEgcG93ZXIgb2ZcbiAqICAyLiBJZiB0aGUgZnJhbWUgc2l6ZSBvZiB0aGUgaW5jb21taW5nIHNpZ25hbCBpcyBsb3dlciB0aGFuIHRoaXMgdmFsdWUsXG4gKiAgaXQgaXMgemVybyBwYWRkZWQgdG8gbWF0Y2ggdGhlIGZmdCBzaXplLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLndpbmRvdz0nbm9uZSddIC0gTmFtZSBvZiB0aGUgd2luZG93IGFwcGxpZWQgb24gdGhlXG4gKiAgaW5jb21taW5nIHNpZ25hbC4gQXZhaWxhYmxlIHdpbmRvd3MgYXJlOiAnbm9uZScsICdoYW5uJywgJ2hhbm5pbmcnLFxuICogICdoYW1taW5nJywgJ2JsYWNrbWFuJywgJ2JsYWNrbWFuaGFycmlzJywgJ3NpbmUnLCAncmVjdGFuZ2xlJy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RlPSdtYWduaXR1ZGUnXSAtIFR5cGUgb2YgdGhlIG91dHB1dCAoYG1hZ25pdHVkZWBcbiAqICBvciBgcG93ZXJgKVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm5vcm09J2F1dG8nXSAtIFR5cGUgb2Ygbm9ybWFsaXphdGlvbiBhcHBsaWVkIG9uIHRoZVxuICogIG91dHB1dC4gUG9zc2libGUgdmFsdWVzIGFyZSAnYXV0bycsICdub25lJywgJ2xpbmVhcicsICdwb3dlcicuIFdoZW4gc2V0IHRvXG4gKiAgYGF1dG9gLCBhIGBsaW5lYXJgIG5vcm1hbGl6YXRpb24gaXMgYXBwbGllZCBvbiB0aGUgbWFnbml0dWRlIHNwZWN0cnVtLCB3aGlsZVxuICogIGEgYHBvd2VyYCBub3JtYWxpemV0aW9uIGlzIGFwcGxpZWQgb24gdGhlIHBvd2VyIHNwZWN0cnVtLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBhc3N1bWluZyBhbiBgYXVkaW9CdWZmZXJgIGV4aXN0c1xuICogY29uc3Qgc291cmNlID0gbmV3IEF1ZGlvSW5CdWZmZXIoeyBhdWRpb0J1ZmZlciB9KTtcbiAqXG4gKiBjb25zdCBzbGljZXIgPSBuZXcgU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiAyNTYsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBmZnQgPSBuZXcgRmZ0KHtcbiAqICAgbW9kZTogJ3Bvd2VyJyxcbiAqICAgd2luZG93OiAnaGFubicsXG4gKiAgIG5vcm06ICdwb3dlcicsXG4gKiAgIHNpemU6IDI1NixcbiAqIH0pO1xuICpcbiAqIHNvdXJjZS5jb25uZWN0KHNsaWNlcik7XG4gKiBzbGljZXIuY29ubmVjdChmZnQpO1xuICogc291cmNlLnN0YXJ0KCk7XG4gKlxuICogLy8gPiBvdXRwdXRzIDEyOSBiaW5zIGNvbnRhaW5pbmcgdGhlIHZhbHVlcyBvZiB0aGUgcG93ZXIgc3BlY3RydW0gKGluY2x1ZGluZ1xuICogLy8gPiBEQyBhbmQgTnl1aXN0IGZyZXF1ZW5jaWVzKS5cbiAqXG4gKiBAdG9kbyAtIGNoZWNrIGlmICdyZWN0YW5nbGUnIGFuZCAnbm9uZScgd2luZG93cyBhcmUgbm90IHJlZG9uZGFudC5cbiAqIEB0b2RvIC0gY2hlY2sgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCBwYXJhbXMuXG4gKi9cbmNsYXNzIEZmdCBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLndpbmRvd1NpemUgPSBudWxsO1xuICAgIHRoaXMubm9ybWFsaXplQ29lZnMgPSBudWxsO1xuICAgIHRoaXMud2luZG93ID0gbnVsbDtcbiAgICB0aGlzLnJlYWwgPSBudWxsO1xuICAgIHRoaXMuaW1hZyA9IG51bGw7XG4gICAgdGhpcy5mZnQgPSBudWxsO1xuXG4gICAgaWYgKCFpc1Bvd2VyT2ZUd28odGhpcy5wYXJhbXMuZ2V0KCdzaXplJykpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmZnRTaXplIG11c3QgYmUgYSBwb3dlciBvZiB0d28nKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG4gICAgLy8gc2V0IHRoZSBvdXRwdXQgZnJhbWUgc2l6ZVxuICAgIGNvbnN0IGluRnJhbWVTaXplID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgZmZ0U2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnc2l6ZScpO1xuICAgIGNvbnN0IG1vZGUgPSB0aGlzLnBhcmFtcy5nZXQoJ21vZGUnKTtcbiAgICBjb25zdCBub3JtID0gdGhpcy5wYXJhbXMuZ2V0KCdub3JtJyk7XG4gICAgbGV0IHdpbmRvd05hbWUgPSB0aGlzLnBhcmFtcy5nZXQoJ3dpbmRvdycpO1xuICAgIC8vIHdpbmRvdyBgbm9uZWAgYW5kIGByZWN0YW5nbGVgIGFyZSBhbGlhc2VzXG4gICAgaWYgKHdpbmRvd05hbWUgPT09ICdub25lJylcbiAgICAgIHdpbmRvd05hbWUgPSAncmVjdGFuZ2xlJztcblxuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IGZmdFNpemUgLyAyICsgMTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFtdO1xuICAgIC8vIHNpemUgb2YgdGhlIHdpbmRvdyB0byBhcHBseSBvbiB0aGUgaW5wdXQgZnJhbWVcbiAgICB0aGlzLndpbmRvd1NpemUgPSAoaW5GcmFtZVNpemUgPCBmZnRTaXplKSA/IGluRnJhbWVTaXplIDogZmZ0U2l6ZTtcblxuICAgIC8vIHJlZmVyZW5jZXMgdG8gcG9wdWxhdGUgaW4gdGhlIHdpbmRvdyBmdW5jdGlvbnMgKGNmLiBgaW5pdFdpbmRvd2ApXG4gICAgdGhpcy5ub3JtYWxpemVDb2VmcyA9IHsgbGluZWFyOiAwLCBwb3dlcjogMCB9O1xuICAgIHRoaXMud2luZG93ID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLndpbmRvd1NpemUpO1xuXG4gICAgaW5pdFdpbmRvdyhcbiAgICAgIHdpbmRvd05hbWUsICAgICAgICAgLy8gbmFtZSBvZiB0aGUgd2luZG93XG4gICAgICB0aGlzLndpbmRvdywgICAgICAgIC8vIGJ1ZmZlciBwb3B1bGF0ZWQgd2l0aCB0aGUgd2luZG93IHNpZ25hbFxuICAgICAgdGhpcy53aW5kb3dTaXplLCAgICAvLyBzaXplIG9mIHRoZSB3aW5kb3dcbiAgICAgIHRoaXMubm9ybWFsaXplQ29lZnMgLy8gb2JqZWN0IHBvcHVsYXRlZCB3aXRoIHRoZSBub3JtYWxpemF0aW9uIGNvZWZzXG4gICAgKTtcblxuICAgIGNvbnN0IHsgbGluZWFyLCBwb3dlciB9ID0gdGhpcy5ub3JtYWxpemVDb2VmcztcblxuICAgIHN3aXRjaCAobm9ybSkge1xuICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgIHRoaXMud2luZG93Tm9ybSA9IDE7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdsaW5lYXInOlxuICAgICAgICB0aGlzLndpbmRvd05vcm0gPSBsaW5lYXI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdwb3dlcic6XG4gICAgICAgIHRoaXMud2luZG93Tm9ybSA9IHBvd2VyO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYXV0byc6XG4gICAgICAgIGlmIChtb2RlID09PSAnbWFnbml0dWRlJylcbiAgICAgICAgICB0aGlzLndpbmRvd05vcm0gPSBsaW5lYXI7XG4gICAgICAgIGVsc2UgaWYgKG1vZGUgPT09ICdwb3dlcicpXG4gICAgICAgICAgdGhpcy53aW5kb3dOb3JtID0gcG93ZXI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMucmVhbCA9IG5ldyBGbG9hdDMyQXJyYXkoZmZ0U2l6ZSk7XG4gICAgdGhpcy5pbWFnID0gbmV3IEZsb2F0MzJBcnJheShmZnRTaXplKTtcbiAgICB0aGlzLmZmdCA9IG5ldyBGZnROYXl1a2koZmZ0U2l6ZSk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYEZmdGAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gc2lnbmFsIC0gSW5wdXQgdmFsdWVzLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBGZnQgb2YgdGhlIGlucHV0IHNpZ25hbC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgZmZ0ID0gbmV3IGxmby5vcGVyYXRvci5GZnQoeyBzaXplOiA1MTIsIHdpbmRvdzogJ2hhbm4nIH0pO1xuICAgKiAvLyBtYW5kYXRvcnkgZm9yIHVzZSBpbiBzdGFuZGFsb25lIG1vZGVcbiAgICogZmZ0LmluaXRTdHJlYW0oeyBmcmFtZVNpemU6IDI1NiwgZnJhbWVUeXBlOiAnc2lnbmFsJyB9KTtcbiAgICogZmZ0LmlucHV0U2lnbmFsKHNpZ25hbCk7XG4gICAqL1xuICBpbnB1dFNpZ25hbChzaWduYWwpIHtcbiAgICBjb25zdCBtb2RlID0gdGhpcy5wYXJhbXMuZ2V0KCdtb2RlJyk7XG4gICAgY29uc3Qgd2luZG93U2l6ZSA9IHRoaXMud2luZG93U2l6ZTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgZmZ0U2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnc2l6ZScpO1xuICAgIGNvbnN0IG91dERhdGEgPSB0aGlzLmZyYW1lLmRhdGE7XG5cbiAgICAvLyBhcHBseSB3aW5kb3cgb24gdGhlIGlucHV0IHNpZ25hbCBhbmQgcmVzZXQgaW1hZyBidWZmZXJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbmRvd1NpemU7IGkrKykge1xuICAgICAgdGhpcy5yZWFsW2ldID0gc2lnbmFsW2ldICogdGhpcy53aW5kb3dbaV0gKiB0aGlzLndpbmRvd05vcm07XG4gICAgICB0aGlzLmltYWdbaV0gPSAwO1xuICAgIH1cblxuICAgIC8vIGlmIHJlYWwgaXMgYmlnZ2VyIHRoYW4gaW5wdXQgc2lnbmFsLCBmaWxsIHdpdGggemVyb3NcbiAgICBmb3IgKGxldCBpID0gd2luZG93U2l6ZTsgaSA8IGZmdFNpemU7IGkrKykge1xuICAgICAgdGhpcy5yZWFsW2ldID0gMDtcbiAgICAgIHRoaXMuaW1hZ1tpXSA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5mZnQuZm9yd2FyZCh0aGlzLnJlYWwsIHRoaXMuaW1hZyk7XG5cbiAgICBpZiAobW9kZSA9PT0gJ21hZ25pdHVkZScpIHtcbiAgICAgIGNvbnN0IG5vcm0gPSAxIC8gZmZ0U2l6ZTtcblxuICAgICAgLy8gREMgaW5kZXhcbiAgICAgIGNvbnN0IHJlYWxEYyA9IHRoaXMucmVhbFswXTtcbiAgICAgIGNvbnN0IGltYWdEYyA9IHRoaXMuaW1hZ1swXTtcbiAgICAgIG91dERhdGFbMF0gPSBzcXJ0KHJlYWxEYyAqIHJlYWxEYyArIGltYWdEYyAqIGltYWdEYykgKiBub3JtO1xuXG4gICAgICAvLyBOcXV5c3QgaW5kZXhcbiAgICAgIGNvbnN0IHJlYWxOeSA9IHRoaXMucmVhbFtmZnRTaXplIC8gMl07XG4gICAgICBjb25zdCBpbWFnTnkgPSB0aGlzLmltYWdbZmZ0U2l6ZSAvIDJdO1xuICAgICAgb3V0RGF0YVtmZnRTaXplIC8gMl0gPSBzcXJ0KHJlYWxOeSAqIHJlYWxOeSArIGltYWdOeSAqIGltYWdOeSkgKiBub3JtO1xuXG4gICAgICAvLyBwb3dlciBzcGVjdHJ1bVxuICAgICAgZm9yIChsZXQgaSA9IDEsIGogPSBmZnRTaXplIC0gMTsgaSA8IGZmdFNpemUgLyAyOyBpKyssIGotLSkge1xuICAgICAgICBjb25zdCByZWFsID0gMC41ICogKHRoaXMucmVhbFtpXSArIHRoaXMucmVhbFtqXSk7XG4gICAgICAgIGNvbnN0IGltYWcgPSAwLjUgKiAodGhpcy5pbWFnW2ldIC0gdGhpcy5pbWFnW2pdKTtcblxuICAgICAgICBvdXREYXRhW2ldID0gMiAqIHNxcnQocmVhbCAqIHJlYWwgKyBpbWFnICogaW1hZykgKiBub3JtO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAncG93ZXInKSB7XG4gICAgICBjb25zdCBub3JtID0gMSAvIChmZnRTaXplICogZmZ0U2l6ZSk7XG5cbiAgICAgIC8vIERDIGluZGV4XG4gICAgICBjb25zdCByZWFsRGMgPSB0aGlzLnJlYWxbMF07XG4gICAgICBjb25zdCBpbWFnRGMgPSB0aGlzLmltYWdbMF07XG4gICAgICBvdXREYXRhWzBdID0gKHJlYWxEYyAqIHJlYWxEYyArIGltYWdEYyAqIGltYWdEYykgKiBub3JtO1xuXG4gICAgICAvLyBOcXV5c3QgaW5kZXhcbiAgICAgIGNvbnN0IHJlYWxOeSA9IHRoaXMucmVhbFtmZnRTaXplIC8gMl07XG4gICAgICBjb25zdCBpbWFnTnkgPSB0aGlzLmltYWdbZmZ0U2l6ZSAvIDJdO1xuICAgICAgb3V0RGF0YVtmZnRTaXplIC8gMl0gPSAocmVhbE55ICogcmVhbE55ICsgaW1hZ055ICogaW1hZ055KSAqIG5vcm07XG5cbiAgICAgIC8vIHBvd2VyIHNwZWN0cnVtXG4gICAgICBmb3IgKGxldCBpID0gMSwgaiA9IGZmdFNpemUgLSAxOyBpIDwgZmZ0U2l6ZSAvIDI7IGkrKywgai0tKSB7XG4gICAgICAgIGNvbnN0IHJlYWwgPSAwLjUgKiAodGhpcy5yZWFsW2ldICsgdGhpcy5yZWFsW2pdKTtcbiAgICAgICAgY29uc3QgaW1hZyA9IDAuNSAqICh0aGlzLmltYWdbaV0gLSB0aGlzLmltYWdbal0pO1xuXG4gICAgICAgIG91dERhdGFbaV0gPSA0ICogKHJlYWwgKiByZWFsICsgaW1hZyAqIGltYWcpICogbm9ybTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0RGF0YTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGZnQ7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBzcXJ0ID0gTWF0aC5zcXJ0O1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgbm9ybWFsaXplOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIHBvd2VyOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9XG59XG5cbi8qKlxuICogQ29tcHV0ZSB0aGUgbWFnbml0dWRlIG9mIGEgYHZlY3RvcmAgaW5wdXQuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ub3JtYWxpemU9dHJ1ZV0gLSBOb3JtYWxpemUgb3V0cHV0IGFjY29yZGluZyB0b1xuICogIHRoZSB2ZWN0b3Igc2l6ZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMucG93ZXI9ZmFsc2VdIC0gSWYgdHJ1ZSwgcmV0dXJucyB0aGUgc3F1YXJlZFxuICogIG1hZ25pdHVkZSAocG93ZXIpLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7IGZyYW1lU2l6ZTogMiwgZnJhbWVUeXBlOiAndmVjdG9yJyB9KTtcbiAqIGNvbnN0IG1hZ25pdHVkZSA9IG5ldyBsZm8ub3BlcmF0b3IuTWFnbml0dWRlKCk7XG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgb3V0RnJhbWU6IHRydWUgfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KG1hZ25pdHVkZSk7XG4gKiBtYWduaXR1ZGUuY29ubmVjdChsb2dnZXIpO1xuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMSwgMV0pO1xuICogPiBbMV1cbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMiwgMl0pO1xuICogPiBbMi44Mjg0MjcxMjQ3NV1cbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMywgM10pO1xuICogPiBbNC4yNDI2NDA2ODcxMl1cbiAqL1xuY2xhc3MgTWFnbml0dWRlIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMuX25vcm1hbGl6ZSA9IHRoaXMucGFyYW1zLmdldCgnbm9ybWFsaXplJyk7XG4gICAgdGhpcy5fcG93ZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ3Bvd2VyJyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgb25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpIHtcbiAgICBzdXBlci5vblBhcmFtVXBkYXRlKG5hbWUsIHZhbHVlLCBtZXRhcyk7XG5cbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ25vcm1hbGl6ZSc6XG4gICAgICAgIHRoaXMuX25vcm1hbGl6ZSA9IHZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Bvd2VyJzpcbiAgICAgICAgdGhpcy5fcG93ZXIgPSB2YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSAxO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICdzY2FsYXInO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uID0gWydtYWduaXR1ZGUnXTtcbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYE1hZ25pdHVkZWAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheXxGbG9hdDMyQXJyYXl9IHZhbHVlcyAtIFZhbHVlcyB0byBwcm9jZXNzLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gTWFnbml0dWRlIHZhbHVlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gICAqXG4gICAqIGNvbnN0IG1hZ25pdHVkZSA9IG5ldyBsZm8ub3BlcmF0b3IuTWFnbml0dWRlKHsgcG93ZXI6IHRydWUgfSk7XG4gICAqIG1hZ25pdHVkZS5pbml0U3RyZWFtKHsgZnJhbWVUeXBlOiAndmVjdG9yJywgZnJhbWVTaXplOiAzIH0pO1xuICAgKiBtYWduaXR1ZGUuaW5wdXRWZWN0b3IoWzMsIDNdKTtcbiAgICogPiA0LjI0MjY0MDY4NzEyXG4gICAqL1xuICBpbnB1dFZlY3Rvcih2YWx1ZXMpIHtcbiAgICBjb25zdCBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoO1xuICAgIGxldCBzdW0gPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKylcbiAgICAgIHN1bSArPSAodmFsdWVzW2ldICogdmFsdWVzW2ldKTtcblxuICAgIGxldCBtYWcgPSBzdW07XG5cbiAgICBpZiAodGhpcy5fbm9ybWFsaXplKVxuICAgICAgbWFnIC89IGxlbmd0aDtcblxuICAgIGlmICghdGhpcy5fcG93ZXIpXG4gICAgICBtYWcgPSBzcXJ0KG1hZyk7XG5cbiAgICByZXR1cm4gbWFnO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUpIHtcbiAgICB0aGlzLmZyYW1lLmRhdGFbMF0gPSB0aGlzLmlucHV0VmVjdG9yKGZyYW1lLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hZ25pdHVkZTtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IHNxcnQgPSBNYXRoLnNxcnQ7XG5cbi8qKlxuICogQ29tcHV0ZSBtZWFuIGFuZCBzdGFuZGFyZCBkZXZpYXRpb24gb2YgYSBnaXZlbiBgc2lnbmFsYC5cbiAqXG4gKiBfc3VwcG9ydCBgc3RhbmRhbG9uZWAgdXNhZ2VfXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAqXG4gKiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gKiAgIC5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KVxuICogICAudGhlbihpbml0KVxuICogICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIuc3RhY2spKTtcbiAqXG4gKiBmdW5jdGlvbiBpbml0KHN0cmVhbSkge1xuICogICBjb25zdCBzb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcbiAqXG4gKiAgIGNvbnN0IGF1ZGlvSW5Ob2RlID0gbmV3IGxmby5zb3VyY2UuQXVkaW9Jbk5vZGUoe1xuICogICAgIHNvdXJjZU5vZGU6IHNvdXJjZSxcbiAqICAgICBhdWRpb0NvbnRleHQ6IGF1ZGlvQ29udGV4dCxcbiAqICAgfSk7XG4gKlxuICogICBjb25zdCBtZWFuU3RkZGV2ID0gbmV3IGxmby5vcGVyYXRvci5NZWFuU3RkZGV2KCk7XG4gKlxuICogICBjb25zdCB0cmFjZURpc3BsYXkgPSBuZXcgbGZvLnNpbmsuVHJhY2VEaXNwbGF5KHtcbiAqICAgICBjYW52YXM6ICcjdHJhY2UnLFxuICogICB9KTtcbiAqXG4gKiAgIGF1ZGlvSW5Ob2RlLmNvbm5lY3QobWVhblN0ZGRldik7XG4gKiAgIG1lYW5TdGRkZXYuY29ubmVjdCh0cmFjZURpc3BsYXkpO1xuICogICBhdWRpb0luTm9kZS5zdGFydCgpO1xuICogfVxuICovXG5jbGFzcyBNZWFuU3RkZGV2IGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIC8vIG5vIG9wdGlvbnMgYXZhaWxhYmxlLCBqdXN0IHRocm93IGFuIGVycm9yIGlmIHNvbWUgcGFyYW0gdHJ5IHRvIGJlIHNldC5cbiAgICBzdXBlcih7fSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlID0gJ3ZlY3Rvcic7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gMjtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFsnbWVhbicsICdzdGRkZXYnXTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoZSBgTWVhblN0ZGRldmAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheXxGbG9hdDMyQXJyYXl9IHZhbHVlcyAtIFZhbHVlcyB0byBwcm9jZXNzLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBNZWFuIGFuZCBzdGFuZGFydCBkZXZpYXRpb24gb2YgdGhlIGlucHV0IHZhbHVlcy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtZWFuU3RkZGV2ID0gbmV3IGxmby5vcGVyYXRvci5NZWFuU3RkZGV2KCk7XG4gICAqIG1lYW5TdGRkZXYuaW5pdFN0cmVhbSh7IGZyYW1lVHlwZTogJ3ZlY3RvcicsIGZyYW1lU2l6ZTogMTAyNCB9KTtcbiAgICogbWVhblN0ZGRldi5pbnB1dFZlY3Rvcihzb21lU2luZVNpZ25hbCk7XG4gICAqID4gWzAsIDAuNzA3MV1cbiAgICovXG4gIGlucHV0U2lnbmFsKHZhbHVlcykge1xuICAgIGNvbnN0IG91dERhdGEgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgY29uc3QgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aDtcblxuICAgIGxldCBtZWFuID0gMDtcbiAgICBsZXQgbTIgPSAwO1xuXG4gICAgLy8gY29tcHV0ZSBtZWFuIGFuZCB2YXJpYW5jZSB3aXRoIFdlbGZvcmQgYWxnb3JpdGhtXG4gICAgLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQWxnb3JpdGhtc19mb3JfY2FsY3VsYXRpbmdfdmFyaWFuY2VcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gdmFsdWVzW2ldO1xuICAgICAgY29uc3QgZGVsdGEgPSB4IC0gbWVhbjtcbiAgICAgIG1lYW4gKz0gZGVsdGEgLyAoaSArIDEpO1xuICAgICAgbTIgKz0gZGVsdGEgKiAoeCAtIG1lYW4pO1xuICAgIH1cblxuICAgIGNvbnN0IHZhcmlhbmNlID0gbTIgLyAobGVuZ3RoIC0gMSk7XG4gICAgY29uc3Qgc3RkZGV2ID0gc3FydCh2YXJpYW5jZSk7XG5cbiAgICBvdXREYXRhWzBdID0gbWVhbjtcbiAgICBvdXREYXRhWzFdID0gc3RkZGV2O1xuXG4gICAgcmV0dXJuIG91dERhdGE7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIHRoaXMuaW5wdXRTaWduYWwoZnJhbWUuZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVhblN0ZGRldjtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IG1pbiA9IE1hdGgubWluO1xuY29uc3QgbWF4ID0gTWF0aC5tYXg7XG5jb25zdCBwb3cgPSBNYXRoLnBvdztcbmNvbnN0IGxvZzEwID0gTWF0aC5sb2cxMDtcblxuZnVuY3Rpb24gaGVydHpUb01lbEh0ayhmcmVxSHopIHtcbiAgcmV0dXJuIDI1OTUgKiBNYXRoLmxvZzEwKDEgKyAoZnJlcUh6IC8gNzAwKSk7XG59XG5cbmZ1bmN0aW9uIG1lbFRvSGVydHpIdGsoZnJlcU1lbCkge1xuICByZXR1cm4gNzAwICogKE1hdGgucG93KDEwLCBmcmVxTWVsIC8gMjU5NSkgLSAxKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZGVzY3JpcHRpb24gb2YgdGhlIHdlaWdodHMgdG8gYXBwbHkgb24gdGhlIGZmdCBiaW5zIGZvciBlYWNoXG4gKiBNZWwgYmFuZCBmaWx0ZXIuXG4gKiBAbm90ZSAtIGFkYXB0ZWQgZnJvbSBpbXRyLXRvb2xzL3J0YVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuYnJCaW5zIC0gTnVtYmVyIG9mIGZmdCBiaW5zLlxuICogQHBhcmFtIHtOdW1iZXJ9IG5ickZpbHRlciAtIE51bWJlciBvZiBtZWwgZmlsdGVycy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBzYW1wbGVSYXRlIC0gU2FtcGxlIFJhdGUgb2YgdGhlIHNpZ25hbC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBtaW5GcmVxIC0gTWluaW11bSBGcmVxdWVuY3kgdG8gYmUgY29uc2lkZXJlcmVkLlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heEZyZXEgLSBNYXhpbXVtIGZyZXF1ZW5jeSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5PE9iamVjdD59IC0gRGVzY3JpcHRpb24gb2YgdGhlIHdlaWdodHMgdG8gYXBwbHkgb24gdGhlIGJpbnMgZm9yXG4gKiAgZWFjaCBtZWwgZmlsdGVyLiBFYWNoIGRlc2NyaXB0aW9uIGhhcyB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZTpcbiAqICB7IHN0YXJ0SW5kZXg6IGJpbkluZGV4LCBjZW50ZXJGcmVxOiBiaW5DZW50ZXJGcmVxdWVuY3ksIHdlaWdodHM6IFtdIH1cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRNZWxCYW5kV2VpZ2h0cyhuYnJCaW5zLCBuYnJCYW5kcywgc2FtcGxlUmF0ZSwgbWluRnJlcSwgbWF4RnJlcSwgdHlwZSA9ICdodGsnKSB7XG5cbiAgbGV0IGhlcnR6VG9NZWwgPSBudWxsO1xuICBsZXQgbWVsVG9IZXJ0eiA9IG51bGw7XG4gIGxldCBtaW5NZWw7XG4gIGxldCBtYXhNZWw7XG5cbiAgaWYgKHR5cGUgPT09ICdodGsnKSB7XG4gICAgaGVydHpUb01lbCA9IGhlcnR6VG9NZWxIdGs7XG4gICAgbWVsVG9IZXJ0eiA9IG1lbFRvSGVydHpIdGs7XG4gICAgbWluTWVsID0gaGVydHpUb01lbChtaW5GcmVxKTtcbiAgICBtYXhNZWwgPSBoZXJ0elRvTWVsKG1heEZyZXEpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBtZWwgYmFuZCB0eXBlOiBcIiR7dHlwZX1cImApO1xuICB9XG5cbiAgY29uc3QgbWVsQmFuZERlc2NyaXB0aW9ucyA9IG5ldyBBcnJheShuYnJCYW5kcyk7XG4gIC8vIGNlbnRlciBmcmVxdWVuY2llcyBvZiBGZnQgYmluc1xuICBjb25zdCBmZnRGcmVxcyA9IG5ldyBGbG9hdDMyQXJyYXkobmJyQmlucyk7XG4gIC8vIGNlbnRlciBmcmVxdWVuY2llcyBvZiBtZWwgYmFuZHMgLSB1bmlmb3JtbHkgc3BhY2VkIGluIG1lbCBkb21haW4gYmV0d2VlblxuICAvLyBsaW1pdHMsIHRoZXJlIGFyZSAyIG1vcmUgZnJlcXVlbmNpZXMgdGhhbiB0aGUgYWN0dWFsIG51bWJlciBvZiBmaWx0ZXJzIGluXG4gIC8vIG9yZGVyIHRvIGNhbGN1bGF0ZSB0aGUgc2xvcGVzXG4gIGNvbnN0IGZpbHRlckZyZXFzID0gbmV3IEZsb2F0MzJBcnJheShuYnJCYW5kcyArIDIpO1xuXG4gIGNvbnN0IGZmdFNpemUgPSAobmJyQmlucyAtIDEpICogMjtcbiAgLy8gY29tcHV0ZSBiaW5zIGNlbnRlciBmcmVxdWVuY2llc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ickJpbnM7IGkrKylcbiAgICBmZnRGcmVxc1tpXSA9IHNhbXBsZVJhdGUgKiBpIC8gZmZ0U2l6ZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ickJhbmRzICsgMjsgaSsrKVxuICAgIGZpbHRlckZyZXFzW2ldID0gbWVsVG9IZXJ0eihtaW5NZWwgKyBpIC8gKG5ickJhbmRzICsgMSkgKiAobWF4TWVsIC0gbWluTWVsKSk7XG5cbiAgLy8gbG9vcCB0aHJvdWdodCBmaWx0ZXJzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQmFuZHM7IGkrKykge1xuICAgIGxldCBtaW5XZWlnaHRJbmRleERlZmluZWQgPSAwO1xuXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB7XG4gICAgICBzdGFydEluZGV4OiBudWxsLFxuICAgICAgY2VudGVyRnJlcTogbnVsbCxcbiAgICAgIHdlaWdodHM6IFtdLFxuICAgIH1cblxuICAgIC8vIGRlZmluZSBjb250cmlidXRpb24gb2YgZWFjaCBiaW4gZm9yIHRoZSBmaWx0ZXIgYXQgaW5kZXggKGkgKyAxKVxuICAgIC8vIGRvIG5vdCBwcm9jZXNzIHRoZSBsYXN0IHNwZWN0cnVtIGNvbXBvbmVudCAoTnlxdWlzdClcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5ickJpbnMgLSAxOyBqKyspIHtcbiAgICAgIGNvbnN0IHBvc1Nsb3BlQ29udHJpYiA9IChmZnRGcmVxc1tqXSAtIGZpbHRlckZyZXFzW2ldKSAvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZmlsdGVyRnJlcXNbaSsxXSAtIGZpbHRlckZyZXFzW2ldKTtcblxuICAgICAgY29uc3QgbmVnU2xvcGVDb250cmliID0gKGZpbHRlckZyZXFzW2krMl0gLSBmZnRGcmVxc1tqXSkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZpbHRlckZyZXFzW2krMl0gLSBmaWx0ZXJGcmVxc1tpKzFdKTtcbiAgICAgIC8vIGxvd2VyU2xvcGUgYW5kIHVwcGVyIHNsb3BlIGludGVyc2VjdCBhdCB6ZXJvIGFuZCB3aXRoIGVhY2ggb3RoZXJcbiAgICAgIGNvbnN0IGNvbnRyaWJ1dGlvbiA9IG1heCgwLCBtaW4ocG9zU2xvcGVDb250cmliLCBuZWdTbG9wZUNvbnRyaWIpKTtcblxuICAgICAgaWYgKGNvbnRyaWJ1dGlvbiA+IDApIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uLnN0YXJ0SW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICBkZXNjcmlwdGlvbi5zdGFydEluZGV4ID0gajtcbiAgICAgICAgICBkZXNjcmlwdGlvbi5jZW50ZXJGcmVxID0gZmlsdGVyRnJlcXNbaSsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2NyaXB0aW9uLndlaWdodHMucHVzaChjb250cmlidXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGVtcHR5IGZpbHRlclxuICAgIGlmIChkZXNjcmlwdGlvbi5zdGFydEluZGV4ID09PSBudWxsKSB7XG4gICAgICBkZXNjcmlwdGlvbi5zdGFydEluZGV4ID0gMDtcbiAgICAgIGRlc2NyaXB0aW9uLmNlbnRlckZyZXEgPSAwO1xuICAgIH1cblxuICAgIC8vIEB0b2RvIC0gZG8gc29tZSBzY2FsaW5nIGZvciBTbGFuZXktc3R5bGUgbWVsXG4gICAgbWVsQmFuZERlc2NyaXB0aW9uc1tpXSA9IGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgcmV0dXJuIG1lbEJhbmREZXNjcmlwdGlvbnM7XG59XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGxvZzoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBuYnJCYW5kczoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAyNCxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBtaW5GcmVxOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIG1heEZyZXE6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgcG93ZXI6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBtZWwgYmFuZHMgc3BlY3RydW0gZnJvbSBhIGdpdmVuIHNwZWN0cnVtIChgdmVjdG9yYCB0eXBlKS5cbiAqIF9JbXBsZW1lbnQgdGhlIGBodGtgIG1lbCBiYW5kIHN0eWxlLl9cbiAqXG4gKiBfc3VwcG9ydCBgc3RhbmRhbG9uZWAgdXNhZ2VfXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubG9nPWZhbHNlXSAtIEFwcGx5IGEgbG9nYXJpdGhtaWMgc2NhbGUgb24gdGhlIG91dHB1dC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5uYnJCYW5kcz0yNF0gLSBOdW1iZXIgb2YgZmlsdGVycyBkZWZpbmluZyB0aGUgbWVsXG4gKiAgYmFuZHMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluRnJlcT0wXSAtIE1pbmltdW0gZnJlcXVlbmN5IHRvIGNvbnNpZGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heEZyZXE9bnVsbF0gLSBNYXhpbXVtIGZyZXF1ZW5jeSB0byBjb25zaWRlci5cbiAqICBJZiBgbnVsbGAsIGlzIHNldCB0byBOeXF1aXN0IGZyZXF1ZW5jeS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5wb3dlcj0xXSAtIEFwcGx5IGEgcG93ZXIgc2NhbGluZyBvbiBlYWNoIG1lbCBiYW5kLlxuICpcbiAqIEB0b2RvIC0gaW1wbGVtZW50IFNsYW5leSBzdHlsZSBtZWwgYmFuZHNcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IGxmbyBmcm9tICd3YXZlcy1sZm8vbm9kZSdcbiAqXG4gKiAvLyByZWFkIGEgZmlsZSBmcm9tIHBhdGggKG5vZGUgb25seSBzb3VyY2UpXG4gKiBjb25zdCBhdWRpb0luRmlsZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5GaWxlKHtcbiAqICAgZmlsZW5hbWU6ICdwYXRoL3RvL2ZpbGUnLFxuICogICBmcmFtZVNpemU6IDUxMixcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNsaWNlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiAyNTYsXG4gKiAgIGhvcFNpemU6IDI1NixcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGZmdCA9IG5ldyBsZm8ub3BlcmF0b3IuRmZ0KHtcbiAqICAgc2l6ZTogMTAyNCxcbiAqICAgd2luZG93OiAnaGFubicsXG4gKiAgIG1vZGU6ICdwb3dlcicsXG4gKiAgIG5vcm06ICdwb3dlcicsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBtZWwgPSBuZXcgbGZvLm9wZXJhdG9yLk1lbCh7XG4gKiAgIGxvZzogdHJ1ZSxcbiAqICAgbmJyQmFuZHM6IDI0LFxuICogfSk7XG4gKlxuICogY29uc3QgbG9nZ2VyID0gbmV3IGxmby5zaW5rLkxvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogYXVkaW9JbkZpbGUuY29ubmVjdChzbGljZXIpO1xuICogc2xpY2VyLmNvbm5lY3QoZmZ0KTtcbiAqIGZmdC5jb25uZWN0KG1lbCk7XG4gKiBtZWwuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIGF1ZGlvSW5GaWxlLnN0YXJ0KCk7XG4gKi9cbmNsYXNzIE1lbCBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgY29uc3QgbmJyQmlucyA9IHByZXZTdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IG5ickJhbmRzID0gdGhpcy5wYXJhbXMuZ2V0KCduYnJCYW5kcycpO1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlO1xuICAgIGNvbnN0IG1pbkZyZXEgPSB0aGlzLnBhcmFtcy5nZXQoJ21pbkZyZXEnKTtcbiAgICBsZXQgbWF4RnJlcSA9IHRoaXMucGFyYW1zLmdldCgnbWF4RnJlcScpO1xuXG4gICAgLy9cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBuYnJCYW5kcztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFtdO1xuXG4gICAgaWYgKG1heEZyZXEgPT09IG51bGwpXG4gICAgICBtYXhGcmVxID0gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSAvIDI7XG5cbiAgICB0aGlzLm1lbEJhbmREZXNjcmlwdGlvbnMgPSBnZXRNZWxCYW5kV2VpZ2h0cyhuYnJCaW5zLCBuYnJCYW5kcywgc2FtcGxlUmF0ZSwgbWluRnJlcSwgbWF4RnJlcSk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYE1lbGAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gc3BlY3RydW0gLSBGZnQgYmlucy5cbiAgICogQHJldHVybiB7QXJyYXl9IC0gTWVsIGJhbmRzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBtZWwgPSBuZXcgbGZvLm9wZXJhdG9yLk1lbCh7IG5ickJhbmRzOiAyNCB9KTtcbiAgICogLy8gbWFuZGF0b3J5IGZvciB1c2UgaW4gc3RhbmRhbG9uZSBtb2RlXG4gICAqIG1lbC5pbml0U3RyZWFtKHsgZnJhbWVTaXplOiAyNTYsIGZyYW1lVHlwZTogJ3ZlY3RvcicgfSk7XG4gICAqIG1lbC5pbnB1dFZlY3RvcihmZnRCaW5zKTtcbiAgICovXG4gIGlucHV0VmVjdG9yKGJpbnMpIHtcblxuICAgIGNvbnN0IHBvd2VyID0gdGhpcy5wYXJhbXMuZ2V0KCdwb3dlcicpO1xuICAgIGNvbnN0IGxvZyA9IHRoaXMucGFyYW1zLmdldCgnbG9nJyk7XG4gICAgY29uc3QgbWVsQmFuZHMgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgY29uc3QgbmJyQmFuZHMgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgbGV0IHNjYWxlID0gMTtcblxuICAgIGNvbnN0IG1pbkxvZ1ZhbHVlID0gMWUtNDg7XG4gICAgY29uc3QgbWluTG9nID0gLTQ4MDtcblxuICAgIGlmIChsb2cpXG4gICAgICBzY2FsZSAqPSBuYnJCYW5kcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQmFuZHM7IGkrKykge1xuICAgICAgY29uc3QgeyBzdGFydEluZGV4LCB3ZWlnaHRzIH0gPSB0aGlzLm1lbEJhbmREZXNjcmlwdGlvbnNbaV07XG4gICAgICBsZXQgdmFsdWUgPSAwO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdlaWdodHMubGVuZ3RoOyBqKyspXG4gICAgICAgIHZhbHVlICs9IHdlaWdodHNbal0gKiBiaW5zW3N0YXJ0SW5kZXggKyBqXTtcblxuICAgICAgLy8gYXBwbHkgc2FtZSBsb2dpYyBhcyBpbiBQaVBvQmFuZHNcbiAgICAgIGlmIChzY2FsZSAhPT0gMSlcbiAgICAgICAgdmFsdWUgKj0gc2NhbGU7XG5cbiAgICAgIGlmIChsb2cpIHtcbiAgICAgICAgaWYgKHZhbHVlID4gbWluTG9nVmFsdWUpXG4gICAgICAgICAgdmFsdWUgPSAxMCAqIGxvZzEwKHZhbHVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHZhbHVlID0gbWluTG9nO1xuICAgICAgfVxuXG4gICAgICBpZiAocG93ZXIgIT09IDEpXG4gICAgICAgIHZhbHVlID0gcG93KHZhbHVlLCBwb3dlcik7XG5cbiAgICAgIG1lbEJhbmRzW2ldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbEJhbmRzO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUpIHtcbiAgICB0aGlzLmlucHV0VmVjdG9yKGZyYW1lLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lbDtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5pbXBvcnQgRmZ0IGZyb20gJy4vRmZ0JztcbmltcG9ydCBNZWwgZnJvbSAnLi9NZWwnO1xuaW1wb3J0IERjdCBmcm9tICcuL0RjdCc7XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIG5ickJhbmRzOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDI0LFxuICAgIG1ldGE6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgbmJyQ29lZnM6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMTIsXG4gICAgbWV0YTogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBtaW5GcmVxOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGE6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgbWF4RnJlcToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBNZmNjIG9mIHRoZSBpbmNvbW1pbmcgYHNpZ25hbGAuIElzIGJhc2ljYWxseSBhIHdyYXBwZXIgYXJvdW5kXG4gKiBbYEZmdGBde0BsaW5rIG1vZHVsZTpjb21tb24ub3BlcmF0b3IuRmZ0fSwgW2BNZWxgXXtAbGluayBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yLk1lbH1cbiAqIGFuZCBbYERjdGBde0BsaW5rIG1vZHVsZTpjb21tb24ub3BlcmF0b3IuRGN0fS5cbiAqXG4gKiBfc3VwcG9ydCBgc3RhbmRhbG9uZWAgdXNhZ2VfXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7bmJyQmFuZHN9IFtvcHRpb25zLm5ickJhbmRzPTI0XSAtIE51bWJlciBvZiBNZWwgYmFuZHMuXG4gKiBAcGFyYW0ge25ickNvZWZzfSBbb3B0aW9ucy5uYnJDb2Vmcz0xMl0gLSBOdW1iZXIgb2Ygb3V0cHV0IGNvZWZzLlxuICpcbiAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24ub3BlcmF0b3IuRmZ0fVxuICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5vcGVyYXRvci5NZWx9XG4gKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yLkRjdH1cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IGxmbyBmcm9tICd3YXZlcy1sZm8vbm9kZSdcbiAqXG4gKiBjb25zdCBhdWRpb0luRmlsZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5GaWxlKHtcbiAqICAgZmlsZW5hbWU6ICdwYXRoL3RvL2ZpbGUnLFxuICogICBmcmFtZVNpemU6IDUxMixcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNsaWNlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiAyNTYsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBtZmNjID0gbmV3IGxmby5vcGVyYXRvci5NZmNjKHtcbiAqICAgbmJyQmFuZHM6IDI0LFxuICogICBuYnJDb2VmczogMTIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBhdWRpb0luRmlsZS5jb25uZWN0KHNsaWNlcik7XG4gKiBzbGljZXIuY29ubmVjdChtZmNjKTtcbiAqIG1mY2MuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIGF1ZGlvSW5GaWxlLnN0YXJ0KCk7XG4gKi9cbmNsYXNzIE1mY2MgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICBjb25zdCBuYnJCYW5kcyA9IHRoaXMucGFyYW1zLmdldCgnbmJyQmFuZHMnKTtcbiAgICBjb25zdCBuYnJDb2VmcyA9IHRoaXMucGFyYW1zLmdldCgnbmJyQ29lZnMnKTtcbiAgICBjb25zdCBtaW5GcmVxID0gdGhpcy5wYXJhbXMuZ2V0KCdtaW5GcmVxJyk7XG4gICAgY29uc3QgbWF4RnJlcSA9IHRoaXMucGFyYW1zLmdldCgnbWF4RnJlcScpO1xuICAgIGNvbnN0IGlucHV0RnJhbWVTaXplID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgaW5wdXRGcmFtZVJhdGUgPSBwcmV2U3RyZWFtUGFyYW1zLmZyYW1lUmF0ZTtcbiAgICBjb25zdCBpbnB1dFNhbXBsZVJhdGUgPSBwcmV2U3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG4gICAgY29uc3QgbmJyQmlucyA9IGlucHV0RnJhbWVTaXplIC8gMiArIDE7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBuYnJDb2VmcztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFtdO1xuXG4gICAgdGhpcy5mZnQgPSBuZXcgRmZ0KHtcbiAgICAgIHdpbmRvdzogJ2hhbm4nLFxuICAgICAgbW9kZTogJ3Bvd2VyJyxcbiAgICAgIG5vcm06ICdwb3dlcicsXG4gICAgICBzaXplOiBpbnB1dEZyYW1lU2l6ZSxcbiAgICB9KTtcblxuICAgIHRoaXMubWVsID0gbmV3IE1lbCh7XG4gICAgICBuYnJCYW5kczogbmJyQmFuZHMsXG4gICAgICBsb2c6IHRydWUsXG4gICAgICBwb3dlcjogMSxcbiAgICAgIG1pbkZyZXE6IG1pbkZyZXEsXG4gICAgICBtYXhGcmVxOiBtYXhGcmVxLFxuICAgIH0pO1xuXG4gICAgdGhpcy5kY3QgPSBuZXcgRGN0KHtcbiAgICAgIG9yZGVyOiBuYnJDb2VmcyxcbiAgICB9KTtcblxuICAgIC8vIGluaXQgc3RyZWFtc1xuICAgIHRoaXMuZmZ0LmluaXRTdHJlYW0oe1xuICAgICAgZnJhbWVUeXBlOiAnc2lnbmFsJyxcbiAgICAgIGZyYW1lU2l6ZTogaW5wdXRGcmFtZVNpemUsXG4gICAgICBmcmFtZVJhdGU6IGlucHV0RnJhbWVSYXRlLFxuICAgICAgc291cmNlU2FtcGxlUmF0ZTogaW5wdXRTYW1wbGVSYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZWwuaW5pdFN0cmVhbSh7XG4gICAgICBmcmFtZVR5cGU6ICd2ZWN0b3InLFxuICAgICAgZnJhbWVTaXplOiBuYnJCaW5zLFxuICAgICAgZnJhbWVSYXRlOiBpbnB1dEZyYW1lUmF0ZSxcbiAgICAgIHNvdXJjZVNhbXBsZVJhdGU6IGlucHV0U2FtcGxlUmF0ZSxcbiAgICB9KTtcblxuICAgIHRoaXMuZGN0LmluaXRTdHJlYW0oe1xuICAgICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAgICAgIGZyYW1lU2l6ZTogbmJyQmFuZHMsXG4gICAgICBmcmFtZVJhdGU6IGlucHV0RnJhbWVSYXRlLFxuICAgICAgc291cmNlU2FtcGxlUmF0ZTogaW5wdXRTYW1wbGVSYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBNZmNjYCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGEgZ3JhcGgpLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gU2lnbmFsIGNodW5rIHRvIGFuYWx5c2UuXG4gICAqIEByZXR1cm4ge0FycmF5fSAtIE1mY2MgY29lZmZpY2llbnRzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBtZmNjID0gbmV3IGxmby5vcGVyYXRvci5NZmNjKCk7XG4gICAqIC8vIG1hbmRhdG9yeSBmb3IgdXNlIGluIHN0YW5kYWxvbmUgbW9kZVxuICAgKiBtZmNjLmluaXRTdHJlYW0oeyBmcmFtZVNpemU6IDI1NiwgZnJhbWVUeXBlOiAndmVjdG9yJyB9KTtcbiAgICogbWZjYy5pbnB1dFNpZ25hbChzaWduYWwpO1xuICAgKi9cbiAgaW5wdXRTaWduYWwoZGF0YSkge1xuICAgIGNvbnN0IG91dHB1dCA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCBuYnJDb2VmcyA9IHRoaXMucGFyYW1zLmdldCgnbmJyQ29lZnMnKTtcblxuICAgIGNvbnN0IGJpbnMgPSB0aGlzLmZmdC5pbnB1dFNpZ25hbChkYXRhKTtcbiAgICBjb25zdCBtZWxCYW5kcyA9IHRoaXMubWVsLmlucHV0VmVjdG9yKGJpbnMpO1xuICAgIC8vIGNvbnNvbGUubG9nKG1lbEJhbmRzKTtcbiAgICBjb25zdCBjb2VmcyA9IHRoaXMuZGN0LmlucHV0U2lnbmFsKG1lbEJhbmRzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQ29lZnM7IGkrKylcbiAgICAgIG91dHB1dFtpXSA9IGNvZWZzW2ldO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZmNjO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuLyoqXG4gKiBGaW5kIG1pbmltdW4gYW5kIG1heGltdW0gdmFsdWVzIG9mIGEgZ2l2ZW4gYHNpZ25hbGAuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lU2l6ZTogNTEyLFxuICogICBmcmFtZVR5cGU6ICdzaWduYWwnLFxuICogICBzYW1wbGVSYXRlOiAwLFxuICogfSk7XG4gKlxuICogY29uc3QgbWluTWF4ID0gbmV3IGxmby5vcGVyYXRvci5NaW5NYXgoKTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QobWluTWF4KTtcbiAqIG1pbk1heC5jb25uZWN0KGxvZ2dlcik7XG4gKiBldmVudEluLnN0YXJ0KClcbiAqXG4gKiAvLyBjcmVhdGUgYSBmcmFtZVxuICogY29uc3Qgc2lnbmFsID0gbmV3IEZsb2F0MzJBcnJheSg1MTIpO1xuICogZm9yIChsZXQgaSA9IDA7IGkgPCA1MTI7IGkrKylcbiAqICAgc2lnbmFsW2ldID0gaSArIDE7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIHNpZ25hbCk7XG4gKiA+IFsxLCA1MTJdO1xuICovXG5jbGFzcyBNaW5NYXggZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gdGhyb3cgZXJyb3JzIGlmIG9wdGlvbnMgYXJlIGdpdmVuXG4gICAgc3VwZXIoe30sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlID0gJ3ZlY3Rvcic7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gMjtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFsnbWluJywgJ21heCddO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBNaW5NYXhgIG9wZXJhdG9yIGluIGBzdGFuZGFsb25lYCBtb2RlIChpLmUuIG91dHNpZGUgb2YgYSBncmFwaCkuXG4gICAqXG4gICAqIEBwYXJhbSB7RmxvYXQzMkFycmF5fEFycmF5fSBkYXRhIC0gSW5wdXQgc2lnbmFsLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBNaW4gYW5kIG1heCB2YWx1ZXMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG1pbk1heCA9IG5ldyBNaW5NYXgoKTtcbiAgICogbWluTWF4LmluaXRTdHJlYW0oeyBmcmFtZVR5cGU6ICdzaWduYWwnLCBmcmFtZVNpemU6IDEwIH0pO1xuICAgKlxuICAgKiBtaW5NYXguaW5wdXRTaWduYWwoWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldKTtcbiAgICogPiBbMCwgNV1cbiAgICovXG4gIGlucHV0U2lnbmFsKGRhdGEpIHtcbiAgICBjb25zdCBvdXREYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGxldCBtaW4gPSArSW5maW5pdHk7XG4gICAgbGV0IG1heCA9IC1JbmZpbml0eTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtpXTtcbiAgICAgIGlmICh2YWx1ZSA8IG1pbikgbWluID0gdmFsdWU7XG4gICAgICBpZiAodmFsdWUgPiBtYXgpIG1heCA9IHZhbHVlO1xuICAgIH1cblxuICAgIG91dERhdGFbMF0gPSBtaW47XG4gICAgb3V0RGF0YVsxXSA9IG1heDtcblxuICAgIHJldHVybiBvdXREYXRhO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUpIHtcbiAgICB0aGlzLmlucHV0U2lnbmFsKGZyYW1lLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1pbk1heDtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBtaW46IDEsXG4gICAgbWF4OiAxZTksXG4gICAgZGVmYXVsdDogMTAsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH1cbiAgfSxcbiAgZmlsbDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgbWluOiAtSW5maW5pdHksXG4gICAgbWF4OiArSW5maW5pdHksXG4gICAgZGVmYXVsdDogMCxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cbi8qKlxuICogQ29tcHV0ZSBhIG1vdmluZyBhdmVyYWdlIG9wZXJhdGlvbiBvbiB0aGUgaW5jb21taW5nIGZyYW1lcyAoYHNjYWxhcmAgb3JcbiAqIGB2ZWN0b3JgIHR5cGUpLiBJZiB0aGUgaW5wdXQgaXMgb2YgdHlwZSB2ZWN0b3IsIHRoZSBtb3ZpbmcgYXZlcmFnZSBpc1xuICogY29tcHV0ZWQgZm9yIGVhY2ggZGltZW5zaW9uIGluIHBhcmFsbGVsLiBJZiB0aGUgc291cmNlIHNhbXBsZSByYXRlIGlzIGRlZmluZWRcbiAqIGZyYW1lIHRpbWUgaXMgc2hpZnRlZCB0byB0aGUgbWlkZGxlIG9mIHRoZSB3aW5kb3cgZGVmaW5lZCBieSB0aGUgb3JkZXIuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMub3JkZXI9MTBdIC0gTnVtYmVyIG9mIHN1Y2Nlc3NpdmUgdmFsdWVzIG9uIHdoaWNoXG4gKiAgdGhlIGF2ZXJhZ2UgaXMgY29tcHV0ZWQuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZmlsbD0wXSAtIFZhbHVlIHRvIGZpbGwgdGhlIHJpbmcgYnVmZmVyIHdpdGggYmVmb3JlXG4gKiAgdGhlIGZpcnN0IGlucHV0IGZyYW1lLlxuICpcbiAqIEB0b2RvIC0gSW1wbGVtZW50IGBwcm9jZXNzU2lnbmFsYCA/XG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lU2l6ZTogMixcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJ1xuICogfSk7XG4gKlxuICogY29uc3QgbW92aW5nQXZlcmFnZSA9IG5ldyBsZm8ub3BlcmF0b3IuTW92aW5nQXZlcmFnZSh7XG4gKiAgIG9yZGVyOiA1LFxuICogICBmaWxsOiAwXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QobW92aW5nQXZlcmFnZSk7XG4gKiBtb3ZpbmdBdmVyYWdlLmNvbm5lY3QobG9nZ2VyKTtcbiAqXG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIFsxLCAxXSk7XG4gKiA+IFswLjIsIDAuMl1cbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMSwgMV0pO1xuICogPiBbMC40LCAwLjRdXG4gKiBldmVudEluLnByb2Nlc3MobnVsbCwgWzEsIDFdKTtcbiAqID4gWzAuNiwgMC42XVxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIFsxLCAxXSk7XG4gKiA+IFswLjgsIDAuOF1cbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMSwgMV0pO1xuICogPiBbMSwgMV1cbiAqL1xuY2xhc3MgTW92aW5nQXZlcmFnZSBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnN1bSA9IG51bGw7XG4gICAgdGhpcy5yaW5nQnVmZmVyID0gbnVsbDtcbiAgICB0aGlzLnJpbmdJbmRleCA9IDA7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgb25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpIHtcbiAgICBzdXBlci5vblBhcmFtVXBkYXRlKG5hbWUsIHZhbHVlLCBtZXRhcyk7XG5cbiAgICAvLyBAdG9kbyAtIHNob3VsZCBiZSBkb25lIGxhemlseSBpbiBwcm9jZXNzXG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdvcmRlcic6XG4gICAgICAgIHRoaXMucHJvY2Vzc1N0cmVhbVBhcmFtcygpO1xuICAgICAgICB0aGlzLnJlc2V0U3RyZWFtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlsbCc6XG4gICAgICAgIHRoaXMucmVzZXRTdHJlYW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcblxuICAgIHRoaXMucmluZ0J1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkob3JkZXIgKiBmcmFtZVNpemUpO1xuXG4gICAgaWYgKGZyYW1lU2l6ZSA+IDEpXG4gICAgICB0aGlzLnN1bSA9IG5ldyBGbG9hdDMyQXJyYXkoZnJhbWVTaXplKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnN1bSA9IDA7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlc2V0U3RyZWFtKCkge1xuICAgIHN1cGVyLnJlc2V0U3RyZWFtKCk7XG5cbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcbiAgICBjb25zdCBmaWxsID0gdGhpcy5wYXJhbXMuZ2V0KCdmaWxsJyk7XG4gICAgY29uc3QgcmluZ0J1ZmZlciA9IHRoaXMucmluZ0J1ZmZlcjtcbiAgICBjb25zdCByaW5nTGVuZ3RoID0gcmluZ0J1ZmZlci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJpbmdMZW5ndGg7IGkrKylcbiAgICAgIHJpbmdCdWZmZXJbaV0gPSBmaWxsO1xuXG4gICAgY29uc3QgZmlsbFN1bSA9IG9yZGVyICogZmlsbDtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG5cbiAgICBpZiAoZnJhbWVTaXplID4gMSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZVNpemU7IGkrKylcbiAgICAgICAgdGhpcy5zdW1baV0gPSBmaWxsU3VtO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1bSA9IGZpbGxTdW07XG4gICAgfVxuXG4gICAgdGhpcy5yaW5nSW5kZXggPSAwO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTY2FsYXIodmFsdWUpIHtcbiAgICB0aGlzLmZyYW1lLmRhdGFbMF0gPSB0aGlzLmlucHV0U2NhbGFyKGZyYW1lLmRhdGFbMF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYE1vdmluZ0F2ZXJhZ2VgIG9wZXJhdG9yIGluIGBzdGFuZGFsb25lYCBtb2RlIChpLmUuIG91dHNpZGUgb2YgYVxuICAgKiBncmFwaCkgd2l0aCBhIGBzY2FsYXJgIGlucHV0LlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBWYWx1ZSB0byBmZWVkIHRoZSBtb3ZpbmcgYXZlcmFnZSB3aXRoLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gQXZlcmFnZSB2YWx1ZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtb3ZpbmdBdmVyYWdlID0gbmV3IGxmby5vcGVyYXRvci5Nb3ZpbmdBdmVyYWdlKHsgb3JkZXI6IDUgfSk7XG4gICAqIG1vdmluZ0F2ZXJhZ2UuaW5pdFN0cmVhbSh7IGZyYW1lU2l6ZTogMSwgZnJhbWVUeXBlOiAnc2NhbGFyJyB9KTtcbiAgICpcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwLjJcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwLjRcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwLjZcbiAgICovXG4gIGlucHV0U2NhbGFyKHZhbHVlKSB7XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ29yZGVyJyk7XG4gICAgY29uc3QgcmluZ0luZGV4ID0gdGhpcy5yaW5nSW5kZXg7XG4gICAgY29uc3QgcmluZ0J1ZmZlciA9IHRoaXMucmluZ0J1ZmZlcjtcbiAgICBsZXQgc3VtID0gdGhpcy5zdW07XG5cbiAgICBzdW0gLT0gcmluZ0J1ZmZlcltyaW5nSW5kZXhdO1xuICAgIHN1bSArPSB2YWx1ZTtcblxuICAgIHRoaXMuc3VtID0gc3VtO1xuICAgIHRoaXMucmluZ0J1ZmZlcltyaW5nSW5kZXhdID0gdmFsdWU7XG4gICAgdGhpcy5yaW5nSW5kZXggPSAocmluZ0luZGV4ICsgMSkgJSBvcmRlcjtcblxuICAgIHJldHVybiBzdW0gLyBvcmRlcjtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFZlY3RvcihmcmFtZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBNb3ZpbmdBdmVyYWdlYCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGFcbiAgICogZ3JhcGgpIHdpdGggYSBgdmVjdG9yYCBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIC0gVmFsdWVzIHRvIGZlZWQgdGhlIG1vdmluZyBhdmVyYWdlIHdpdGguXG4gICAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gLSBBdmVyYWdlIHZhbHVlIGZvciBlYWNoIGRpbWVuc2lvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtb3ZpbmdBdmVyYWdlID0gbmV3IGxmby5vcGVyYXRvci5Nb3ZpbmdBdmVyYWdlKHsgb3JkZXI6IDUgfSk7XG4gICAqIG1vdmluZ0F2ZXJhZ2UuaW5pdFN0cmVhbSh7IGZyYW1lU2l6ZTogMiwgZnJhbWVUeXBlOiAnc2NhbGFyJyB9KTtcbiAgICpcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dEFycmF5KFsxLCAxXSk7XG4gICAqID4gWzAuMiwgMC4yXVxuICAgKiBtb3ZpbmdBdmVyYWdlLmlucHV0QXJyYXkoWzEsIDFdKTtcbiAgICogPiBbMC40LCAwLjRdXG4gICAqIG1vdmluZ0F2ZXJhZ2UuaW5wdXRBcnJheShbMSwgMV0pO1xuICAgKiA+IFswLjYsIDAuNl1cbiAgICovXG4gIGlucHV0VmVjdG9yKHZhbHVlcykge1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGNvbnN0IG91dEZyYW1lID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCByaW5nSW5kZXggPSB0aGlzLnJpbmdJbmRleDtcbiAgICBjb25zdCByaW5nT2Zmc2V0ID0gcmluZ0luZGV4ICogZnJhbWVTaXplO1xuICAgIGNvbnN0IHJpbmdCdWZmZXIgPSB0aGlzLnJpbmdCdWZmZXI7XG4gICAgY29uc3Qgc3VtID0gdGhpcy5zdW07XG4gICAgY29uc3Qgc2NhbGUgPSAxIC8gb3JkZXI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lU2l6ZTsgaSsrKSB7XG4gICAgICBjb25zdCByaW5nQnVmZmVySW5kZXggPSByaW5nT2Zmc2V0ICsgaTtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgbGV0IGxvY2FsU3VtID0gc3VtW2ldO1xuXG4gICAgICBsb2NhbFN1bSAtPSByaW5nQnVmZmVyW3JpbmdCdWZmZXJJbmRleF07XG4gICAgICBsb2NhbFN1bSArPSB2YWx1ZTtcblxuICAgICAgdGhpcy5zdW1baV0gPSBsb2NhbFN1bTtcbiAgICAgIG91dEZyYW1lW2ldID0gbG9jYWxTdW0gKiBzY2FsZTtcbiAgICAgIHJpbmdCdWZmZXJbcmluZ0J1ZmZlckluZGV4XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMucmluZ0luZGV4ID0gKHJpbmdJbmRleCArIDEpICUgb3JkZXI7XG5cbiAgICByZXR1cm4gb3V0RnJhbWU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgdGhpcy5wcmVwYXJlRnJhbWUoKTtcbiAgICB0aGlzLnByb2Nlc3NGdW5jdGlvbihmcmFtZSk7XG5cbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcbiAgICBsZXQgdGltZSA9IGZyYW1lLnRpbWU7XG4gICAgLy8gc2hpZnQgdGltZSB0byB0YWtlIGFjY291bnQgb2YgdGhlIGFkZGVkIGxhdGVuY3lcbiAgICBpZiAodGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSlcbiAgICAgIHRpbWUgLT0gKDAuNSAqIChvcmRlciAtIDEpIC8gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSk7XG5cbiAgICB0aGlzLmZyYW1lLnRpbWUgPSB0aW1lO1xuICAgIHRoaXMuZnJhbWUubWV0YWRhdGEgPSBmcmFtZS5tZXRhZGF0YTtcblxuICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb3ZpbmdBdmVyYWdlO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIG9yZGVyOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIG1pbjogMSxcbiAgICBtYXg6IDFlOSxcbiAgICBkZWZhdWx0OiA5LFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBmaWxsOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBtaW46IC1JbmZpbml0eSxcbiAgICBtYXg6ICtJbmZpbml0eSxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBDb21wdXRlIGEgbW92aW5nIG1lZGlhbiBvcGVyYXRpb24gb24gdGhlIGluY29tbWluZyBmcmFtZXMgKGBzY2FsYXJgIG9yXG4gKiBgdmVjdG9yYCB0eXBlKS4gSWYgdGhlIGlucHV0IGlzIG9mIHR5cGUgdmVjdG9yLCB0aGUgbW92aW5nIG1lZGlhbiBpc1xuICogY29tcHV0ZWQgZm9yIGVhY2ggZGltZW5zaW9uIGluIHBhcmFsbGVsLiBJZiB0aGUgc291cmNlIHNhbXBsZSByYXRlIGlzIGRlZmluZWRcbiAqIGZyYW1lIHRpbWUgaXMgc2hpZnRlZCB0byB0aGUgbWlkZGxlIG9mIHRoZSB3aW5kb3cgZGVmaW5lZCBieSB0aGUgb3JkZXIuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMub3JkZXI9OV0gLSBOdW1iZXIgb2Ygc3VjY2Vzc2l2ZSB2YWx1ZXMgaW4gd2hpY2hcbiAqICB0aGUgbWVkaWFuIGlzIHNlYXJjaGVkLiBUaGlzIHZhbHVlIG11c3QgYmUgb2RkLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZmlsbD0wXSAtIFZhbHVlIHRvIGZpbGwgdGhlIHJpbmcgYnVmZmVyIHdpdGggYmVmb3JlXG4gKiAgdGhlIGZpcnN0IGlucHV0IGZyYW1lLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKlxuICogQHRvZG8gLSBJbXBsZW1lbnQgYHByb2Nlc3NTaWduYWxgXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lU2l6ZTogMixcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IG1vdmluZ01lZGlhbiA9IG5ldyBsZm8ub3BlcmF0b3IuTW92aW5nTWVkaWFuKHtcbiAqICAgb3JkZXI6IDUsXG4gKiAgIGZpbGw6IDAsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QobW92aW5nTWVkaWFuKTtcbiAqIG1vdmluZ01lZGlhbi5jb25uZWN0KGxvZ2dlcik7XG4gKlxuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKG51bGwsIFsxLCAxXSk7XG4gKiA+IFswLCAwXVxuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUobnVsbCwgWzIsIDJdKTtcbiAqID4gWzAsIDBdXG4gKiBldmVudEluLnByb2Nlc3NGcmFtZShudWxsLCBbMywgM10pO1xuICogPiBbMSwgMV1cbiAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKG51bGwsIFs0LCA0XSk7XG4gKiA+IFsyLCAyXVxuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUobnVsbCwgWzUsIDVdKTtcbiAqID4gWzMsIDNdXG4gKi9cbmNsYXNzIE1vdmluZ01lZGlhbiBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnJpbmdCdWZmZXIgPSBudWxsO1xuICAgIHRoaXMuc29ydGVyID0gbnVsbDtcbiAgICB0aGlzLnJpbmdJbmRleCA9IDA7XG5cbiAgICB0aGlzLl9lbnN1cmVPZGRPcmRlcigpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9lbnN1cmVPZGRPcmRlcigpIHtcbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpICUgMiA9PT0gMClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSAke29yZGVyfSBmb3IgcGFyYW0gXCJvcmRlclwiIC0gc2hvdWxkIGJlIG9kZGApO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIG9uUGFyYW1VcGRhdGUobmFtZSwgdmFsdWUsIG1ldGFzKSB7XG4gICAgc3VwZXIub25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpO1xuXG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdvcmRlcic6XG4gICAgICAgIHRoaXMuX2Vuc3VyZU9kZE9yZGVyKCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc1N0cmVhbVBhcmFtcygpO1xuICAgICAgICB0aGlzLnJlc2V0U3RyZWFtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlsbCc6XG4gICAgICAgIHRoaXMucmVzZXRTdHJlYW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICAvLyBvdXRUeXBlIGlzIHNpbWlsYXIgdG8gaW5wdXQgdHlwZVxuXG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuXG4gICAgdGhpcy5yaW5nQnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShmcmFtZVNpemUgKiBvcmRlcik7XG4gICAgdGhpcy5zb3J0QnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShmcmFtZVNpemUgKiBvcmRlcik7XG5cbiAgICB0aGlzLm1pbkluZGljZXMgPSBuZXcgVWludDMyQXJyYXkoZnJhbWVTaXplKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVzZXRTdHJlYW0oKSB7XG4gICAgc3VwZXIucmVzZXRTdHJlYW0oKTtcblxuICAgIGNvbnN0IGZpbGwgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZpbGwnKTtcbiAgICBjb25zdCByaW5nQnVmZmVyID0gdGhpcy5yaW5nQnVmZmVyO1xuICAgIGNvbnN0IHJpbmdMZW5ndGggPSByaW5nQnVmZmVyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmluZ0xlbmd0aDsgaSsrKVxuICAgICAgdGhpcy5yaW5nQnVmZmVyW2ldID0gZmlsbDtcblxuICAgIHRoaXMucmluZ0luZGV4ID0gMDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2NhbGFyKGZyYW1lKSB7XG4gICAgdGhpcy5mcmFtZS5kYXRhWzBdID0gdGhpcy5pbnB1dFNjYWxhcihmcmFtZS5kYXRhWzBdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgZm9yIHRoZSB1c2Ugb2YgYSBgTW92aW5nTWVkaWFuYCBvdXRzaWRlIGEgZ3JhcGggKGUuZy4gaW5zaWRlXG4gICAqIGFub3RoZXIgbm9kZSksIGluIHRoaXMgY2FzZSBgcHJvY2Vzc1N0cmVhbVBhcmFtc2AgYW5kIGByZXNldFN0cmVhbWBcbiAgICogc2hvdWxkIGJlIGNhbGxlZCBtYW51YWxseSBvbiB0aGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVmFsdWUgdG8gZmVlZCB0aGUgbW92aW5nIG1lZGlhbiB3aXRoLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gTWVkaWFuIHZhbHVlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gICAqXG4gICAqIGNvbnN0IG1vdmluZ01lZGlhbiA9IG5ldyBNb3ZpbmdNZWRpYW4oeyBvcmRlcjogNSB9KTtcbiAgICogbW92aW5nTWVkaWFuLmluaXRTdHJlYW0oeyBmcmFtZVNpemU6IDEsIGZyYW1lVHlwZTogJ3NjYWxhcicgfSk7XG4gICAqXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcigyKTtcbiAgICogPiAwXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcigzKTtcbiAgICogPiAxXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcig0KTtcbiAgICogPiAyXG4gICAqL1xuICBpbnB1dFNjYWxhcih2YWx1ZSkge1xuICAgIGNvbnN0IHJpbmdJbmRleCA9IHRoaXMucmluZ0luZGV4O1xuICAgIGNvbnN0IHJpbmdCdWZmZXIgPSB0aGlzLnJpbmdCdWZmZXI7XG4gICAgY29uc3Qgc29ydEJ1ZmZlciA9IHRoaXMuc29ydEJ1ZmZlcjtcbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcbiAgICBjb25zdCBtZWRpYW5JbmRleCA9IChvcmRlciAtIDEpIC8gMjtcbiAgICBsZXQgc3RhcnRJbmRleCA9IDA7XG5cbiAgICByaW5nQnVmZmVyW3JpbmdJbmRleF0gPSB2YWx1ZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG1lZGlhbkluZGV4OyBpKyspIHtcbiAgICAgIGxldCBtaW4gPSArSW5maW5pdHk7XG4gICAgICBsZXQgbWluSW5kZXggPSBudWxsO1xuXG4gICAgICBmb3IgKGxldCBqID0gc3RhcnRJbmRleDsgaiA8IG9yZGVyOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgICAgc29ydEJ1ZmZlcltqXSA9IHJpbmdCdWZmZXJbal07XG5cbiAgICAgICAgaWYgKHNvcnRCdWZmZXJbal0gPCBtaW4pIHtcbiAgICAgICAgICBtaW4gPSBzb3J0QnVmZmVyW2pdO1xuICAgICAgICAgIG1pbkluZGV4ID0gajtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzd2FwIG1pbkluZGV4IGFuZCBzdGFydEluZGV4XG4gICAgICBjb25zdCBjYWNoZSA9IHNvcnRCdWZmZXJbc3RhcnRJbmRleF07XG4gICAgICBzb3J0QnVmZmVyW3N0YXJ0SW5kZXhdID0gc29ydEJ1ZmZlclttaW5JbmRleF07XG4gICAgICBzb3J0QnVmZmVyW21pbkluZGV4XSA9IGNhY2hlO1xuXG4gICAgICBzdGFydEluZGV4ICs9IDE7XG4gICAgfVxuXG4gICAgY29uc3QgbWVkaWFuID0gc29ydEJ1ZmZlclttZWRpYW5JbmRleF07XG4gICAgdGhpcy5yaW5nSW5kZXggPSAocmluZ0luZGV4ICsgMSkgJSBvcmRlcjtcblxuICAgIHJldHVybiBtZWRpYW47XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcihmcmFtZSkge1xuICAgIHRoaXMuaW5wdXRWZWN0b3IoZnJhbWUuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciB0aGUgdXNlIG9mIGEgYE1vdmluZ01lZGlhbmAgb3V0c2lkZSBhIGdyYXBoIChlLmcuIGluc2lkZVxuICAgKiBhbm90aGVyIG5vZGUpLCBpbiB0aGlzIGNhc2UgYHByb2Nlc3NTdHJlYW1QYXJhbXNgIGFuZCBgcmVzZXRTdHJlYW1gXG4gICAqIHNob3VsZCBiZSBjYWxsZWQgbWFudWFsbHkgb24gdGhlIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyAtIFZhbHVlcyB0byBmZWVkIHRoZSBtb3ZpbmcgbWVkaWFuIHdpdGguXG4gICAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gLSBNZWRpYW4gdmFsdWVzIGZvciBlYWNoIGRpbWVuc2lvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtb3ZpbmdNZWRpYW4gPSBuZXcgTW92aW5nTWVkaWFuKHsgb3JkZXI6IDMsIGZpbGw6IDAgfSk7XG4gICAqIG1vdmluZ01lZGlhbi5pbml0U3RyZWFtKHsgZnJhbWVTaXplOiAzLCBmcmFtZVR5cGU6ICd2ZWN0b3InIH0pO1xuICAgKlxuICAgKiBtb3ZpbmdNZWRpYW4uaW5wdXRBcnJheShbMSwgMV0pO1xuICAgKiA+IFswLCAwXVxuICAgKiBtb3ZpbmdNZWRpYW4uaW5wdXRBcnJheShbMiwgMl0pO1xuICAgKiA+IFsxLCAxXVxuICAgKiBtb3ZpbmdNZWRpYW4uaW5wdXRBcnJheShbMywgM10pO1xuICAgKiA+IFsyLCAyXVxuICAgKi9cbiAgaW5wdXRWZWN0b3IodmFsdWVzKSB7XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ29yZGVyJyk7XG4gICAgY29uc3QgcmluZ0J1ZmZlciA9IHRoaXMucmluZ0J1ZmZlcjtcbiAgICBjb25zdCByaW5nSW5kZXggPSB0aGlzLnJpbmdJbmRleDtcbiAgICBjb25zdCBzb3J0QnVmZmVyID0gdGhpcy5zb3J0QnVmZmVyO1xuICAgIGNvbnN0IG91dEZyYW1lID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IG1pbkluZGljZXMgPSB0aGlzLm1pbkluZGljZXM7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IG1lZGlhbkluZGV4ID0gTWF0aC5mbG9vcihvcmRlciAvIDIpO1xuICAgIGxldCBzdGFydEluZGV4ID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG1lZGlhbkluZGV4OyBpKyspIHtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmcmFtZVNpemU7IGorKykge1xuICAgICAgICBvdXRGcmFtZVtqXSA9ICtJbmZpbml0eTtcbiAgICAgICAgbWluSW5kaWNlc1tqXSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgayA9IHN0YXJ0SW5kZXg7IGsgPCBvcmRlcjsgaysrKSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBrICogZnJhbWVTaXplICsgajtcblxuICAgICAgICAgIC8vIHVwZGF0ZSByaW5nIGJ1ZmZlciBjb3JyZXNwb25kaW5nIHRvIGN1cnJlbnRcbiAgICAgICAgICBpZiAoayA9PT0gcmluZ0luZGV4ICYmIGkgPT09IDApXG4gICAgICAgICAgICByaW5nQnVmZmVyW2luZGV4XSA9IHZhbHVlc1tqXTtcblxuICAgICAgICAgIC8vIGNvcHkgdmFsdWUgaW4gc29ydCBidWZmZXIgb24gZmlyc3QgcGFzc1xuICAgICAgICAgIGlmIChpID09PSAwKcKgXG4gICAgICAgICAgICBzb3J0QnVmZmVyW2luZGV4XSA9IHJpbmdCdWZmZXJbaW5kZXhdO1xuXG4gICAgICAgICAgLy8gZmluZCBtaW5pdW0gaW4gdGhlIHJlbWFpbmluZyBhcnJheVxuICAgICAgICAgIGlmIChzb3J0QnVmZmVyW2luZGV4XSA8IG91dEZyYW1lW2pdKSB7XG4gICAgICAgICAgICBvdXRGcmFtZVtqXSA9IHNvcnRCdWZmZXJbaW5kZXhdO1xuICAgICAgICAgICAgbWluSW5kaWNlc1tqXSA9IGluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN3YXAgbWluaW11bSBhbmQgY3VyZW50IGluZGV4XG4gICAgICAgIGNvbnN0IHN3YXBJbmRleCA9IHN0YXJ0SW5kZXggKiBmcmFtZVNpemUgKyBqO1xuICAgICAgICBjb25zdCB2ID0gc29ydEJ1ZmZlcltzd2FwSW5kZXhdO1xuICAgICAgICBzb3J0QnVmZmVyW3N3YXBJbmRleF0gPSBzb3J0QnVmZmVyW21pbkluZGljZXNbal1dO1xuICAgICAgICBzb3J0QnVmZmVyW21pbkluZGljZXNbal1dID0gdjtcblxuICAgICAgICAvLyBzdG9yZSB0aGlzIG1pbmltdW0gdmFsdWUgYXMgY3VycmVudCByZXN1bHRcbiAgICAgICAgb3V0RnJhbWVbal0gPSBzb3J0QnVmZmVyW3N3YXBJbmRleF07XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0SW5kZXggKz0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnJpbmdJbmRleCA9IChyaW5nSW5kZXggKyAxKSAlIG9yZGVyO1xuXG4gICAgcmV0dXJuIHRoaXMuZnJhbWUuZGF0YTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICB0aGlzLnByZXByb2Nlc3NGcmFtZSgpO1xuICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcblxuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGxldCB0aW1lID0gZnJhbWUudGltZTtcbiAgICAvLyBzaGlmdCB0aW1lIHRvIHRha2UgYWNjb3VudCBvZiB0aGUgYWRkZWQgbGF0ZW5jeVxuICAgIGlmICh0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlKVxuICAgICAgdGltZSAtPSAoMC41ICogKG9yZGVyIC0gMSkgLyB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlKTtcblxuICAgIHRoaXMuZnJhbWUudGltZSA9IHRpbWU7XG4gICAgdGhpcy5mcmFtZS5tZXRhZGF0YSA9IGZyYW1lLm1ldGFkYXRhO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVGcmFtZSh0aW1lLCB0aGlzLm91dEZyYW1lLCBtZXRhZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW92aW5nTWVkaWFuO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHN0YXRlOiB7XG4gICAgdHlwZTogJ2VudW0nLFxuICAgIGRlZmF1bHQ6ICdvbicsXG4gICAgbGlzdDogWydvbicsICdvZmYnXSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cbi8qKlxuICogVGhlIE9uT2ZmIG9wZXJhdG9yIGFsbG93cyB0byBzdG9wIHRoZSBwcm9wYWdhdGlvbiBvZiB0aGUgc3RyZWFtIGluIGFcbiAqIHN1YmdyYXBoLiBXaGVuIFwib25cIiwgZnJhbWVzIGFyZSBwcm9wYWdhdGVkLCB3aGVuIFwib2ZmXCIgdGhlIHByb3BhZ2F0aW9uIGlzXG4gKiBzdG9wcGVkLlxuICpcbiAqIFRoZSBgc3RyZWFtUGFyYW1zYCBwcm9wYWdhdGlvbiBpcyBuZXZlciBieXBhc3NlZCBzbyB0aGUgc3Vic2VxdWVudCBzdWJncmFwaFxuICogaXMgYWx3YXlzIHJlYWR5IGZvciBpbmNvbW1pbmcgZnJhbWVzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc3RhdGU9J29uJ10gLSBEZWZhdWx0IHN0YXRlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgZnJhbWVzID0gW1xuICogICB7IHRpbWU6IDAsIGRhdGE6IFsxLCAyXSB9LFxuICogICB7IHRpbWU6IDEsIGRhdGE6IFszLCA0XSB9LFxuICogICB7IHRpbWU6IDIsIGRhdGE6IFs1LCA2XSB9LFxuICogXTtcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IEV2ZW50SW4oe1xuICogICBmcmFtZVNpemU6IDIsXG4gKiAgIGZyYW1lUmF0ZTogMCxcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IG9uT2ZmID0gbmV3IE9uT2ZmKCk7XG4gKlxuICogY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KG9uT2ZmKTtcbiAqIG9uT2ZmLmNvbm5lY3QobG9nZ2VyKTtcbiAqXG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUoZnJhbWVzWzBdKTtcbiAqID4gWzAsIDFdXG4gKlxuICogLy8gYnlwYXNzIHN1YmdyYXBoXG4gKiBvbk9mZi5zZXRTdGF0ZSgnb2ZmJyk7XG4gKiBldmVudEluLnByb2Nlc3NGcmFtZShmcmFtZXNbMV0pO1xuICpcbiAqIC8vIHJlLW9wZW4gc3ViZ3JhcGhcbiAqIG9uT2ZmLnNldFN0YXRlKCdvbicpO1xuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUoZnJhbWVzWzJdKTtcbiAqID4gWzUsIDZdXG4gKi9cbmNsYXNzIE9uT2ZmIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnBhcmFtcy5nZXQoJ3N0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzdGF0ZSBvZiB0aGUgYE9uT2ZmYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0YXRlIC0gTmV3IHN0YXRlIG9mIHRoZSBvcGVyYXRvciAoYG9uYCBvciBgb2ZmYClcbiAgICovXG4gIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKGRlZmluaXRpb25zLnN0YXRlLmxpc3QuaW5kZXhPZihzdGF0ZSkgPT09IC0xKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN3aXRjaCBzdGF0ZSB2YWx1ZSBcIiR7c3RhdGV9XCIgW3ZhbGlkIHZhbHVlczogXCJvblwiL1wib2ZmXCJdYCk7XG5cbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICAvLyBkZWZpbmUgYWxsIHBvc3NpYmxlIHN0cmVhbSBBUElcbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTY2FsYXIoKSB7fVxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcigpIHt9XG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKCkge31cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdvbicpIHtcbiAgICAgIHRoaXMucHJlcGFyZUZyYW1lKCk7XG5cbiAgICAgIHRoaXMuZnJhbWUudGltZSA9IGZyYW1lLnRpbWU7XG4gICAgICB0aGlzLmZyYW1lLm1ldGFkYXRhID0gZnJhbWUubWV0YWRhdGE7XG4gICAgICB0aGlzLmZyYW1lLmRhdGEgPSBmcmFtZS5kYXRhO1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZUZyYW1lKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9uT2ZmO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3Qgc3FydCA9IE1hdGguc3FydDtcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHBvd2VyOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBDb21wdXRlIHRoZSBSb290IE1lYW4gU3F1YXJlIG9mIGEgYHNpZ25hbGAuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnBvd2VyPWZhbHNlXSAtIElmIGB0cnVlYCByZW1vdmUgdGhlIFwiUlwiIG9mIHRoZVxuICogIFwiUm1zXCIgYW5kIHJldHVybiB0aGUgc3F1YXJlZCByZXN1bHQgKGkuZS4gcG93ZXIpLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogLy8gYXNzdW1pbmcgc29tZSBgQXVkaW9CdWZmZXJgXG4gKiBjb25zdCBhdWRpb0luQnVmZmVyID0gbmV3IGxmby5zb3VyY2UuQXVkaW9JbkJ1ZmZlcih7XG4gKiAgIGF1ZGlvQnVmZmVyOiBhdWRpb0J1ZmZlcixcbiAqICAgZnJhbWVTaXplOiA1MTIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBybXMgPSBuZXcgbGZvLm9wZXJhdG9yLlJtcygpO1xuICogY29uc3QgbG9nZ2VyID0gbmV3IGxmby5zaW5rLkxvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogYXVkaW9JbkJ1ZmZlci5jb25uZWN0KHJtcyk7XG4gKiBybXMuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIGF1ZGlvSW5CdWZmZXIuc3RhcnQoKTtcbiAqL1xuY2xhc3MgUm1zIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSAxO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICdzY2FsYXInO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uID0gWydybXMnXTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciB0aGUgdXNlIG9mIGEgYFJtc2Agb3V0c2lkZSBhIGdyYXBoIChlLmcuIGluc2lkZVxuICAgKiBhbm90aGVyIG5vZGUpLiBSZXR1cm4gdGhlIHJtcyBvZiB0aGUgZ2l2ZW4gc2lnbmFsIGJsb2NrLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc2lnbmFsIC0gU2lnbmFsIGJsb2NrIHRvIGJlIGNvbXB1dGVkLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gcm1zIG9mIHRoZSBpbnB1dCBzaWduYWwuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAgICpcbiAgICogY29uc3Qgcm1zID0gbmV3IGxmby5vcGVyYXRvci5SbXMoKTtcbiAgICogcm1zLmluaXRTdHJlYW0oeyBmcmFtZVR5cGU6ICdzaWduYWwnLCBmcmFtZVNpemU6IDEwMDAgfSk7XG4gICAqXG4gICAqIGNvbnN0IHJlc3VsdHMgPSBybXMuaW5wdXRTaWduYWwoWy4uLnZhbHVlc10pO1xuICAgKi9cbiAgaW5wdXRTaWduYWwoc2lnbmFsKSB7XG4gICAgY29uc3QgcG93ZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ3Bvd2VyJyk7XG4gICAgY29uc3QgbGVuZ3RoID0gc2lnbmFsLmxlbmd0aDtcbiAgICBsZXQgcm1zID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgICBybXMgKz0gKHNpZ25hbFtpXSAqIHNpZ25hbFtpXSk7XG5cbiAgICBybXMgPSBybXMgLyBsZW5ndGg7XG5cbiAgICBpZiAoIXBvd2VyKVxuICAgICAgcm1zID0gc3FydChybXMpO1xuXG4gICAgcmV0dXJuIHJtcztcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5mcmFtZS5kYXRhWzBdID0gdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSbXM7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuaW1wb3J0IE1vdmluZ0F2ZXJhZ2UgZnJvbSAnLi9Nb3ZpbmdBdmVyYWdlJztcblxuY29uc3QgbWluID0gTWF0aC5taW47XG5jb25zdCBtYXggPSBNYXRoLm1heDtcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGxvZ0lucHV0OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICB9LFxuICBtaW5JbnB1dDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMC4wMDAwMDAwMDAwMDEsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIGZpbHRlck9yZGVyOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIHRocmVzaG9sZDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMyxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgb2ZmVGhyZXNob2xkOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAtSW5maW5pdHksXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIG1pbkludGVyOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLjA1MCxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgbWF4RHVyYXRpb246IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IEluZmluaXR5LFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICB9LFxufVxuXG4vKipcbiAqIENyZWF0ZSBzZWdtZW50cyBiYXNlZCBvbiBhdHRhY2tzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmxvZ0lucHV0PWZhbHNlXSAtIEFwcGx5IGxvZyBvbiB0aGUgaW5wdXQuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluSW5wdXQ9MC4wMDAwMDAwMDAwMDFdIC0gTWluaW11bSB2YWx1ZSB0byB1c2UgYXNcbiAqICBpbnB1dC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5maWx0ZXJPcmRlcj01XSAtIE9yZGVyIG9mIHRoZSBpbnRlcm5hbGx5IHVzZWQgbW92aW5nXG4gKiAgYXZlcmFnZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGQ9M10gLSBUaHJlc2hvbGQgdGhhdCB0cmlnZ2VycyBhIHNlZ21lbnRcbiAqICBzdGFydC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5vZmZUaHJlc2hvbGQ9LUluZmluaXR5XSAtIFRocmVzaG9sZCB0aGF0IHRyaWdnZXJzXG4gKiAgYSBzZWdtZW50IGVuZC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW5JbnRlcj0wLjA1MF0gLSBNaW5pbXVtIGRlbGF5IGJldHdlZW4gdHdvIHNlbWdlbnRzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heER1cmF0aW9uPUluZmluaXR5XSAtIE1heGltdW0gZHVyYXRpb24gb2YgYSBzZWdtZW50LlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBhc3N1bWluZyBhIHN0cmVhbSBmcm9tIHRoZSBtaWNyb3Bob25lXG4gKiBjb25zdCBzb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcbiAqXG4gKiBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAqICAgc291cmNlTm9kZTogc291cmNlLFxuICogICBhdWRpb0NvbnRleHQ6IGF1ZGlvQ29udGV4dCxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNsaWNlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiBmcmFtZVNpemUsXG4gKiAgIGhvcFNpemU6IGhvcFNpemUsXG4gKiAgIGNlbnRlcmVkVGltZVRhZ3M6IHRydWVcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHBvd2VyID0gbmV3IGxmby5vcGVyYXRvci5STVMoe1xuICogICBwb3dlcjogdHJ1ZSxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNlZ21lbnRlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2VnbWVudGVyKHtcbiAqICAgbG9nSW5wdXQ6IHRydWUsXG4gKiAgIGZpbHRlck9yZGVyOiA1LFxuICogICB0aHJlc2hvbGQ6IDMsXG4gKiAgIG9mZlRocmVzaG9sZDogLUluZmluaXR5LFxuICogICBtaW5JbnRlcjogMC4wNTAsXG4gKiAgIG1heER1cmF0aW9uOiAwLjA1MCxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGxvZ2dlciA9IG5ldyBsZm8uc2luay5Mb2dnZXIoeyB0aW1lOiB0cnVlIH0pO1xuICpcbiAqIGF1ZGlvSW5Ob2RlLmNvbm5lY3Qoc2xpY2VyKTtcbiAqIHNsaWNlci5jb25uZWN0KHBvd2VyKTtcbiAqIHBvd2VyLmNvbm5lY3Qoc2VnbWVudGVyKTtcbiAqIHNlZ21lbnRlci5jb25uZWN0KGxvZ2dlcik7XG4gKlxuICogYXVkaW9Jbk5vZGUuc3RhcnQoKTtcbiAqL1xuY2xhc3MgU2VnbWVudGVyIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmluc2lkZVNlZ21lbnQgPSBmYWxzZTtcbiAgICB0aGlzLm9uc2V0VGltZSA9IC1JbmZpbml0eTtcblxuICAgIC8vIHN0YXRzXG4gICAgdGhpcy5taW4gPSBJbmZpbml0eTtcbiAgICB0aGlzLm1heCA9IC1JbmZpbml0eTtcbiAgICB0aGlzLnN1bSA9IDA7XG4gICAgdGhpcy5zdW1PZlNxdWFyZXMgPSAwO1xuICAgIHRoaXMuY291bnQgPSAwO1xuXG4gICAgY29uc3QgbWluSW5wdXQgPSB0aGlzLnBhcmFtcy5nZXQoJ21pbklucHV0Jyk7XG4gICAgbGV0IGZpbGwgPSBtaW5JbnB1dDtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ2xvZ0lucHV0JykgJiYgbWluSW5wdXQgPiAwKVxuICAgICAgZmlsbCA9IE1hdGgubG9nKG1pbklucHV0KTtcblxuICAgIHRoaXMubW92aW5nQXZlcmFnZSA9IG5ldyBNb3ZpbmdBdmVyYWdlKHtcbiAgICAgIG9yZGVyOiB0aGlzLnBhcmFtcy5nZXQoJ2ZpbHRlck9yZGVyJyksXG4gICAgICBmaWxsOiBmaWxsLFxuICAgIH0pO1xuXG4gICAgdGhpcy5sYXN0TXZhdnJnID0gZmlsbDtcbiAgfVxuXG4gIG9uUGFyYW1VcGRhdGUobmFtZSwgdmFsdWUsIG1ldGFzKSB7XG4gICAgc3VwZXIub25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpO1xuXG4gICAgaWYgKG5hbWUgPT09ICdmaWx0ZXJPcmRlcicpXG4gICAgICB0aGlzLm1vdmluZ0F2ZXJhZ2UucGFyYW1zLnNldCgnb3JkZXInLCB2YWx1ZSk7XG4gIH1cblxuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSA1O1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZSA9IDA7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZGVzY3JpcHRpb24gPSBbJ2R1cmF0aW9uJywgJ21pbicsICdtYXgnLCAnbWVhbicsICdzdGRkZXYnXTtcblxuXG4gICAgdGhpcy5tb3ZpbmdBdmVyYWdlLmluaXRTdHJlYW0ocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgcmVzZXRTdHJlYW0oKSB7XG4gICAgc3VwZXIucmVzZXRTdHJlYW0oKTtcbiAgICB0aGlzLm1vdmluZ0F2ZXJhZ2UucmVzZXRTdHJlYW0oKTtcbiAgICB0aGlzLnJlc2V0U2VnbWVudCgpO1xuICB9XG5cbiAgZmluYWxpemVTdHJlYW0oZW5kVGltZSkge1xuICAgIGlmICh0aGlzLmluc2lkZVNlZ21lbnQpXG4gICAgICB0aGlzLm91dHB1dFNlZ21lbnQoZW5kVGltZSk7XG5cbiAgICBzdXBlci5maW5hbGl6ZVN0cmVhbShlbmRUaW1lKTtcbiAgfVxuXG4gIHJlc2V0U2VnbWVudCgpIHtcbiAgICB0aGlzLmluc2lkZVNlZ21lbnQgPSBmYWxzZTtcbiAgICB0aGlzLm9uc2V0VGltZSA9IC1JbmZpbml0eTtcbiAgICAvLyBzdGF0c1xuICAgIHRoaXMubWluID0gSW5maW5pdHk7XG4gICAgdGhpcy5tYXggPSAtSW5maW5pdHk7XG4gICAgdGhpcy5zdW0gPSAwO1xuICAgIHRoaXMuc3VtT2ZTcXVhcmVzID0gMDtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgfVxuXG4gIG91dHB1dFNlZ21lbnQoZW5kVGltZSkge1xuICAgIGNvbnN0IG91dERhdGEgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgb3V0RGF0YVswXSA9IGVuZFRpbWUgLSB0aGlzLm9uc2V0VGltZTtcbiAgICBvdXREYXRhWzFdID0gdGhpcy5taW47XG4gICAgb3V0RGF0YVsyXSA9IHRoaXMubWF4O1xuXG4gICAgY29uc3Qgbm9ybSA9IDEgLyB0aGlzLmNvdW50O1xuICAgIGNvbnN0IG1lYW4gPSB0aGlzLnN1bSAqIG5vcm07XG4gICAgY29uc3QgbWVhbk9mU3F1YXJlID0gdGhpcy5zdW1PZlNxdWFyZXMgKiBub3JtO1xuICAgIGNvbnN0IHNxdWFyZU9mbWVhbiA9IG1lYW4gKiBtZWFuO1xuXG4gICAgb3V0RGF0YVszXSA9IG1lYW47XG4gICAgb3V0RGF0YVs0XSA9IDA7XG5cbiAgICBpZiAobWVhbk9mU3F1YXJlID4gc3F1YXJlT2ZtZWFuKVxuICAgICAgb3V0RGF0YVs0XSA9IE1hdGguc3FydChtZWFuT2ZTcXVhcmUgLSBzcXVhcmVPZm1lYW4pO1xuXG4gICAgdGhpcy5mcmFtZS50aW1lID0gdGhpcy5vbnNldFRpbWU7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZUZyYW1lKCk7XG4gIH1cblxuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgY29uc3QgbG9nSW5wdXQgPSB0aGlzLnBhcmFtcy5nZXQoJ2xvZ0lucHV0Jyk7XG4gICAgY29uc3QgbWluSW5wdXQgPSB0aGlzLnBhcmFtcy5nZXQoJ21pbklucHV0Jyk7XG4gICAgY29uc3QgdGhyZXNob2xkID0gdGhpcy5wYXJhbXMuZ2V0KCd0aHJlc2hvbGQnKTtcbiAgICBjb25zdCBtaW5JbnRlciA9IHRoaXMucGFyYW1zLmdldCgnbWluSW50ZXInKTtcbiAgICBjb25zdCBtYXhEdXJhdGlvbiA9IHRoaXMucGFyYW1zLmdldCgnbWF4RHVyYXRpb24nKTtcbiAgICBjb25zdCBvZmZUaHJlc2hvbGQgPSB0aGlzLnBhcmFtcy5nZXQoJ29mZlRocmVzaG9sZCcpO1xuICAgIGNvbnN0IHJhd1ZhbHVlID0gZnJhbWUuZGF0YVswXTtcbiAgICBjb25zdCB0aW1lID0gZnJhbWUudGltZTtcbiAgICBsZXQgdmFsdWUgPSBNYXRoLm1heChyYXdWYWx1ZSwgbWluSW5wdXQpO1xuXG4gICAgaWYgKGxvZ0lucHV0KVxuICAgICAgdmFsdWUgPSBNYXRoLmxvZyh2YWx1ZSk7XG5cbiAgICBjb25zdCBkaWZmID0gdmFsdWUgLSB0aGlzLmxhc3RNdmF2cmc7XG4gICAgdGhpcy5sYXN0TXZhdnJnID0gdGhpcy5tb3ZpbmdBdmVyYWdlLmlucHV0U2NhbGFyKHZhbHVlKTtcblxuICAgIC8vIHVwZGF0ZSBmcmFtZSBtZXRhZGF0YVxuICAgIHRoaXMuZnJhbWUubWV0YWRhdGEgPSBmcmFtZS5tZXRhZGF0YTtcblxuICAgIGlmIChkaWZmID4gdGhyZXNob2xkICYmIHRpbWUgLSB0aGlzLm9uc2V0VGltZSA+IG1pbkludGVyKSB7XG4gICAgICBpZiAodGhpcy5pbnNpZGVTZWdtZW50KVxuICAgICAgICB0aGlzLm91dHB1dFNlZ21lbnQodGltZSk7XG5cbiAgICAgIC8vIHN0YXJ0IHNlZ21lbnRcbiAgICAgIHRoaXMuaW5zaWRlU2VnbWVudCA9IHRydWU7XG4gICAgICB0aGlzLm9uc2V0VGltZSA9IHRpbWU7XG4gICAgICB0aGlzLm1heCA9IC1JbmZpbml0eTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbnNpZGVTZWdtZW50KSB7XG4gICAgICB0aGlzLm1pbiA9IG1pbih0aGlzLm1pbiwgcmF3VmFsdWUpO1xuICAgICAgdGhpcy5tYXggPSBtYXgodGhpcy5tYXgsIHJhd1ZhbHVlKTtcbiAgICAgIHRoaXMuc3VtICs9IHJhd1ZhbHVlO1xuICAgICAgdGhpcy5zdW1PZlNxdWFyZXMgKz0gcmF3VmFsdWUgKiByYXdWYWx1ZTtcbiAgICAgIHRoaXMuY291bnQrKztcblxuICAgICAgaWYgKHRpbWUgLSB0aGlzLm9uc2V0VGltZSA+PSBtYXhEdXJhdGlvbiB8fCB2YWx1ZSA8PSBvZmZUaHJlc2hvbGQpIHtcbiAgICAgICAgdGhpcy5vdXRwdXRTZWdtZW50KHRpbWUpO1xuICAgICAgICB0aGlzLmluc2lkZVNlZ21lbnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICB0aGlzLnByZXBhcmVGcmFtZSgpO1xuICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcbiAgICAvLyBkbyBub3QgcHJvcGFnYXRlIGhlcmUgYXMgdGhlIGZyYW1lUmF0ZSBpcyBub3cgemVyb1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlZ21lbnRlcjtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBpbmRleDoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIGluZGljZXM6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH1cbn07XG5cbi8qKlxuICogU2VsZWN0IG9uZSBvciBzZXZlcmFsIGluZGljZXMgZnJvbSBhIGB2ZWN0b3JgIGlucHV0LiBJZiBvbmx5IG9uZSBpbmRleCBpc1xuICogc2VsZWN0ZWQsIHRoZSBvdXRwdXQgd2lsbCBiZSBvZiB0eXBlIGBzY2FsYXJgLCBvdGhlcndpc2UgdGhlIG91dHB1dCB3aWxsXG4gKiBiZSBhIHZlY3RvciBjb250YWluaW5nIHRoZSBzZWxlY3RlZCBpbmRpY2VzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHZhbHVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmluZGV4IC0gSW5kZXggdG8gc2VsZWN0IGZyb20gdGhlIGlucHV0IGZyYW1lLlxuICogQHBhcmFtIHtBcnJheTxOdW1iZXI+fSBvcHRpb25zLmluZGljZXMgLSBJbmRpY2VzIHRvIHNlbGVjdCBmcm9tIHRoZSBpbnB1dFxuICogIGZyYW1lLCBpZiBkZWZpbmVkLCB0YWtlIHByZWNlZGFuY2Ugb3ZlciBgb3B0aW9uLmluZGV4YC5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4gPSBuZXcgbGZvLnNvdXJjZS5FdmVudEluKHtcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAqICAgZnJhbWVTaXplOiAzLFxuICogfSk7XG4gKlxuICogY29uc3Qgc2VsZWN0ID0gbmV3IGxmby5vcGVyYXRvci5TZWxlY3Qoe1xuICogICBpbmRleDogMSxcbiAqIH0pO1xuICpcbiAqIGV2ZW50SW4uc3RhcnQoKTtcbiAqIGV2ZW50SW4ucHJvY2VzcygwLCBbMCwgMSwgMl0pO1xuICogPiAxXG4gKiBldmVudEluLnByb2Nlc3MoMCwgWzMsIDQsIDVdKTtcbiAqID4gNFxuICovXG5jbGFzcyBTZWxlY3QgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJhbXMuZ2V0KCdpbmRleCcpO1xuICAgIGNvbnN0IGluZGljZXMgPSB0aGlzLnBhcmFtcy5nZXQoJ2luZGljZXMnKTtcblxuICAgIGxldCBtYXggPSAoaW5kaWNlcyAhPT0gbnVsbCkgPyAgTWF0aC5tYXguYXBwbHkobnVsbCwgaW5kaWNlcykgOiBpbmRleDtcblxuICAgIGlmIChtYXggPj0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc2VsZWN0IGluZGV4IFwiJHttYXh9XCJgKTtcblxuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9IChpbmRpY2VzICE9PSBudWxsKSA/ICd2ZWN0b3InIDogJ3NjYWxhcic7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gKGluZGljZXMgIT09IG51bGwpID8gaW5kaWNlcy5sZW5ndGggOiAxO1xuXG4gICAgdGhpcy5zZWxlY3QgPSAoaW5kaWNlcyAhPT0gbnVsbCkgPyBpbmRpY2VzIDogW2luZGV4XTtcblxuICAgIC8vIHN0ZWFsIGRlc2NyaXB0aW9uKCkgZnJvbSBwYXJlbnRcbiAgICBpZiAocHJldlN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3QuZm9yRWFjaCgodmFsLCBpbmRleCkgPT4ge1xuICAgICAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbltpbmRleF0gPSBwcmV2U3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uW3ZhbF07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUpIHtcbiAgICBjb25zdCBkYXRhID0gZnJhbWUuZGF0YTtcbiAgICBjb25zdCBvdXREYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IHNlbGVjdCA9IHRoaXMuc2VsZWN0O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3QubGVuZ3RoOyBpKyspXG4gICAgICBvdXREYXRhW2ldID0gZGF0YVtzZWxlY3RbaV1dO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBmcmFtZVNpemU6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogNTEyLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIGhvcFNpemU6IHsgLy8gc2hvdWxkIGJlIG51bGxhYmxlXG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgY2VudGVyZWRUaW1lVGFnczoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgfVxufVxuXG4vKipcbiAqIENoYW5nZSB0aGUgYGZyYW1lU2l6ZWAgYW5kIGBob3BTaXplYCBvZiBhIGBzaWduYWxgIGlucHV0IGFjY29yZGluZyB0b1xuICogdGhlIGdpdmVuIG9wdGlvbnMuXG4gKiBUaGlzIG9wZXJhdG9yIHVwZGF0ZXMgdGhlIHN0cmVhbSBwYXJhbWV0ZXJzIGFjY29yZGluZyB0byBpdHMgY29uZmlndXJhdGlvbi5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmZyYW1lU2l6ZT01MTJdIC0gRnJhbWUgc2l6ZSBvZiB0aGUgb3V0cHV0IHNpZ25hbC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ob3BTaXplPW51bGxdIC0gTnVtYmVyIG9mIHNhbXBsZXMgYmV0d2VlbiB0d29cbiAqICBjb25zZWN1dGl2ZSBmcmFtZXMuIElmIG51bGwsIGBob3BTaXplYCBpcyBzZXQgdG8gYGZyYW1lU2l6ZWAuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNlbnRlcmVkVGltZVRhZ3NdIC0gTW92ZSB0aGUgdGltZSB0YWcgdG8gdGhlIG1pZGRsZVxuICogIG9mIHRoZSBmcmFtZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4gPSBuZXcgbGZvLnNvdXJjZS5FdmVudEluKHtcbiAqICAgZnJhbWVUeXBlOiAnc2lnbmFsJyxcbiAqICAgZnJhbWVTaXplOiAxMCxcbiAqICAgc2FtcGxlUmF0ZTogMixcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNsaWNlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiA0LFxuICogICBob3BTaXplOiAyXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgdGltZTogdHJ1ZSwgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3Qoc2xpY2VyKTtcbiAqIHNsaWNlci5jb25uZWN0KGxvZ2dlcik7XG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzKDAsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSk7XG4gKiA+IHsgdGltZTogMCwgZGF0YTogWzAsIDEsIDIsIDNdIH1cbiAqID4geyB0aW1lOiAxLCBkYXRhOiBbMiwgMywgNCwgNV0gfVxuICogPiB7IHRpbWU6IDIsIGRhdGE6IFs0LCA1LCA2LCA3XSB9XG4gKiA+IHsgdGltZTogMywgZGF0YTogWzYsIDcsIDgsIDldIH1cbiAqL1xuY2xhc3MgU2xpY2VyIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IGhvcFNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2hvcFNpemUnKTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZyYW1lU2l6ZScpO1xuXG4gICAgaWYgKCFob3BTaXplKVxuICAgICAgdGhpcy5wYXJhbXMuc2V0KCdob3BTaXplJywgZnJhbWVTaXplKTtcblxuICAgIHRoaXMucGFyYW1zLmFkZExpc3RlbmVyKHRoaXMub25QYXJhbVVwZGF0ZS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuZnJhbWVJbmRleCA9IDA7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgY29uc3QgaG9wU2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnaG9wU2l6ZScpO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnZnJhbWVTaXplJyk7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBmcmFtZVNpemU7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVSYXRlID0gcHJldlN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlIC8gaG9wU2l6ZTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVzZXRTdHJlYW0oKSB7XG4gICAgc3VwZXIucmVzZXRTdHJlYW0oKTtcbiAgICB0aGlzLmZyYW1lSW5kZXggPSAwO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGZpbmFsaXplU3RyZWFtKGVuZFRpbWUpIHtcbiAgICBpZiAodGhpcy5mcmFtZUluZGV4ID4gMCkge1xuICAgICAgY29uc3QgZnJhbWVSYXRlID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVSYXRlO1xuICAgICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICAgIC8vIHNldCB0aGUgdGltZSBvZiB0aGUgbGFzdCBmcmFtZVxuICAgICAgdGhpcy5mcmFtZS50aW1lICs9ICgxIC8gZnJhbWVSYXRlKTtcblxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuZnJhbWVJbmRleDsgaSA8IGZyYW1lU2l6ZTsgaSsrKVxuICAgICAgICBkYXRhW2ldID0gMDtcblxuICAgICAgdGhpcy5wcm9wYWdhdGVGcmFtZSgpO1xuICAgIH1cblxuICAgIHN1cGVyLmZpbmFsaXplU3RyZWFtKGVuZFRpbWUpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NGcmFtZShmcmFtZSkge1xuICAgIHRoaXMucHJlcGFyZUZyYW1lKCk7XG4gICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24oZnJhbWUpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUpIHtcbiAgICBjb25zdCB0aW1lID0gZnJhbWUudGltZTtcbiAgICBjb25zdCBibG9jayA9IGZyYW1lLmRhdGE7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBmcmFtZS5tZXRhZGF0YTtcblxuICAgIGNvbnN0IGNlbnRlcmVkVGltZVRhZ3MgPSB0aGlzLnBhcmFtcy5nZXQoJ2NlbnRlcmVkVGltZVRhZ3MnKTtcbiAgICBjb25zdCBob3BTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdob3BTaXplJyk7XG4gICAgY29uc3Qgb3V0RnJhbWUgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlO1xuICAgIGNvbnN0IHNhbXBsZVBlcmlvZCA9IDEgLyBzYW1wbGVSYXRlO1xuICAgIGNvbnN0IGJsb2NrU2l6ZSA9IGJsb2NrLmxlbmd0aDtcblxuICAgIGxldCBmcmFtZUluZGV4ID0gdGhpcy5mcmFtZUluZGV4O1xuICAgIGxldCBibG9ja0luZGV4ID0gMDtcblxuICAgIHdoaWxlIChibG9ja0luZGV4IDwgYmxvY2tTaXplKSB7XG4gICAgICBsZXQgbnVtU2tpcCA9IDA7XG5cbiAgICAgIC8vIHNraXAgYmxvY2sgc2FtcGxlcyBmb3IgbmVnYXRpdmUgZnJhbWVJbmRleCAoZnJhbWVTaXplIDwgaG9wU2l6ZSlcbiAgICAgIGlmIChmcmFtZUluZGV4IDwgMCkge1xuICAgICAgICBudW1Ta2lwID0gLWZyYW1lSW5kZXg7XG4gICAgICAgIGZyYW1lSW5kZXggPSAwOyAvLyByZXNldCBgZnJhbWVJbmRleGBcbiAgICAgIH1cblxuICAgICAgaWYgKG51bVNraXAgPCBibG9ja1NpemUpIHtcbiAgICAgICAgYmxvY2tJbmRleCArPSBudW1Ta2lwOyAvLyBza2lwIGJsb2NrIHNlZ21lbnRcbiAgICAgICAgLy8gY2FuIGNvcHkgYWxsIHRoZSByZXN0IG9mIHRoZSBpbmNvbWluZyBibG9ja1xuICAgICAgICBsZXQgbnVtQ29weSA9IGJsb2NrU2l6ZSAtIGJsb2NrSW5kZXg7XG4gICAgICAgIC8vIGNvbm5vdCBjb3B5IG1vcmUgdGhhbiB3aGF0IGZpdHMgaW50byB0aGUgZnJhbWVcbiAgICAgICAgY29uc3QgbWF4Q29weSA9IGZyYW1lU2l6ZSAtIGZyYW1lSW5kZXg7XG5cbiAgICAgICAgaWYgKG51bUNvcHkgPj0gbWF4Q29weSlcbiAgICAgICAgICBudW1Db3B5ID0gbWF4Q29weTtcblxuICAgICAgICAvLyBjb3B5IGJsb2NrIHNlZ21lbnQgaW50byBmcmFtZVxuICAgICAgICBjb25zdCBjb3B5ID0gYmxvY2suc3ViYXJyYXkoYmxvY2tJbmRleCwgYmxvY2tJbmRleCArIG51bUNvcHkpO1xuICAgICAgICBvdXRGcmFtZS5zZXQoY29weSwgZnJhbWVJbmRleCk7XG4gICAgICAgIC8vIGFkdmFuY2UgYmxvY2sgYW5kIGZyYW1lIGluZGV4XG4gICAgICAgIGJsb2NrSW5kZXggKz0gbnVtQ29weTtcbiAgICAgICAgZnJhbWVJbmRleCArPSBudW1Db3B5O1xuXG4gICAgICAgIC8vIHNlbmQgZnJhbWUgd2hlbiBjb21wbGV0ZWRcbiAgICAgICAgaWYgKGZyYW1lSW5kZXggPT09IGZyYW1lU2l6ZSkge1xuICAgICAgICAgIC8vIGRlZmluZSB0aW1lIHRhZyBmb3IgdGhlIG91dEZyYW1lIGFjY29yZGluZyB0byBjb25maWd1cmF0aW9uXG4gICAgICAgICAgaWYgKGNlbnRlcmVkVGltZVRhZ3MpXG4gICAgICAgICAgICB0aGlzLmZyYW1lLnRpbWUgPSB0aW1lICsgKGJsb2NrSW5kZXggLSBmcmFtZVNpemUgLyAyKSAqIHNhbXBsZVBlcmlvZDtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmZyYW1lLnRpbWUgPSB0aW1lICsgKGJsb2NrSW5kZXggLSBmcmFtZVNpemUpICogc2FtcGxlUGVyaW9kO1xuXG4gICAgICAgICAgdGhpcy5mcmFtZS5tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgICAgICAgIC8vIGZvcndhcmQgdG8gbmV4dCBub2Rlc1xuICAgICAgICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcblxuICAgICAgICAgIC8vIHNoaWZ0IGZyYW1lIGxlZnRcbiAgICAgICAgICBpZiAoaG9wU2l6ZSA8IGZyYW1lU2l6ZSlcbiAgICAgICAgICAgIG91dEZyYW1lLnNldChvdXRGcmFtZS5zdWJhcnJheShob3BTaXplLCBmcmFtZVNpemUpLCAwKTtcblxuICAgICAgICAgIGZyYW1lSW5kZXggLT0gaG9wU2l6ZTsgLy8gaG9wIGZvcndhcmRcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc2tpcCBlbnRpcmUgYmxvY2tcbiAgICAgICAgY29uc3QgYmxvY2tSZXN0ID0gYmxvY2tTaXplIC0gYmxvY2tJbmRleDtcbiAgICAgICAgZnJhbWVJbmRleCArPSBibG9ja1Jlc3Q7XG4gICAgICAgIGJsb2NrSW5kZXggKz0gYmxvY2tSZXN0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZnJhbWVJbmRleCA9IGZyYW1lSW5kZXg7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2xpY2VyO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgY2VpbCA9IE1hdGguY2VpbDtcblxuLyoqXG4gKiBwYXBlcjogaHR0cDovL3JlY2hlcmNoZS5pcmNhbS5mci9lcXVpcGVzL3BjbS9jaGV2ZWlnbi9wc3MvMjAwMl9KQVNBX1lJTi5wZGZcbiAqIGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9hc2hva2Zlcm5hbmRlei9ZaW4tUGl0Y2gtVHJhY2tpbmdcbiAqIEBwcml2YXRlXG4gKi9cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHRocmVzaG9sZDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMC4xLCAvLyBkZWZhdWx0IGZyb20gcGFwZXJcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBkb3duU2FtcGxpbmdFeHA6IHsgLy8gZG93bnNhbXBsaW5nIGZhY3RvclxuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAyLFxuICAgIG1pbjogMCxcbiAgICBtYXg6IDMsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgbWluRnJlcTogeyAvL1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogNjAsIC8vIG1lYW4gNzM1IHNhbXBsZXNcbiAgICBtaW46IDAsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbn1cblxuLyoqXG4gKiBZaW4gZnVuZGFtZW50YWwgZnJlcXVlbmN5IGVzdGltYXRvciwgYmFzZWQgb24gYWxnb3JpdGhtIGRlc2NyaWJlZCBpblxuICogW1lJTiwgYSBmdW5kYW1lbnRhbCBmcmVxdWVuY3kgZXN0aW1hdG9yIGZvciBzcGVlY2ggYW5kIG11c2ljXShodHRwOi8vcmVjaGVyY2hlLmlyY2FtLmZyL2VxdWlwZXMvcGNtL2NoZXZlaWduL3Bzcy8yMDAyX0pBU0FfWUlOLnBkZilcbiAqIGJ5IENoZXZlaWduZSBhbmQgS2F3YWhhcmEuXG4gKiBPbiBlYWNoIGZyYW1lLCB0aGlzIG9wZXJhdG9yIHByb3BhZ2F0ZSBhIHZlY3RvciBjb250YWluaW5nIHRoZSBmb2xsb3dpbmdcbiAqIHZhbHVlczogYGZyZXF1ZW5jeWAsIGBwcm9iYWJpbGl0eWAuXG4gKlxuICogRm9yIGdvb2QgcmVzdWx0cyB0aGUgaW5wdXQgZnJhbWUgc2l6ZSBzaG91bGQgYmUgbGFyZ2UgKDEwMjQgb3IgMjA0OCkuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBub3RlIC0gSW4gbm9kZSBmb3IgYSBmcmFtZSBvZiAyMDQ4IHNhbXBsZXMsIGF2ZXJhZ2UgY29tcHV0YXRpb24gdGltZSBpczpcbiAqICAgICAgICAgMC4wMDAxNjc0MjI4MzMzOTk5MzM4OSBzZWNvbmQuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGQ9MC4xXSAtIEFic29sdXRlIHRocmVzaG9sZCB0byB0ZXN0IHRoZVxuICogIG5vcm1hbGl6ZWQgZGlmZmVyZW5jZSAoc2VlIHBhcGVyIGZvciBtb3JlIGluZm9ybWF0aW9ucykuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZG93blNhbXBsaW5nRXhwPTJdIC0gRG93biBzYW1wbGUgdGhlIGlucHV0IGZyYW1lIGJ5XG4gKiAgYSBmYWN0b3Igb2YgMiBhdCB0aGUgcG93ZXIgb2YgYGRvd25TYW1wbGluZ0V4cGAgKG1pbj0wIGFuZCBtYXg9MykgZm9yXG4gKiAgcGVyZm9ybWFuY2UgaW1wcm92ZW1lbnRzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbkZyZXE9NjBdIC0gTWluaW11bSBmcmVxdWVuY3kgdGhlIG9wZXJhdG9yIGNhblxuICogIHNlYXJjaCBmb3IuIFRoaXMgcGFyYW1ldGVyIGRlZmluZXMgdGhlIHNpemUgb2YgdGhlIGF1dG9jb3JyZWxhdGlvbiBwZXJmb3JtZWRcbiAqICBvbiB0aGUgc2lnbmFsLCB0aGUgaW5wdXQgZnJhbWUgc2l6ZSBzaG91bGQgYmUgYXJvdW5kIDIgdGltZSB0aGlzIHNpemUgZm9yXG4gKiAgZ29vZCByZXN1bHRzIChpLmUuIGBpbnB1dEZyYW1lU2l6ZSDiiYggMiAqIChzYW1wbGluZ1JhdGUgLyBtaW5GcmVxKWApLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogLy8gYXNzdW1pbmcgc29tZSBBdWRpb0J1ZmZlclxuICogY29uc3Qgc291cmNlID0gbmV3IGxmby5zb3VyY2UuQXVkaW9JbkJ1ZmZlcih7XG4gKiAgIGF1ZGlvQnVmZmVyOiBhdWRpb0J1ZmZlcixcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNsaWNlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiAyMDQ4LFxuICogfSk7XG4gKlxuICogY29uc3QgeWluID0gbmV3IGxmby5vcGVyYXRvci5ZaW4oKTtcbiAqIGNvbnN0IGxvZ2dlciA9IG5ldyBsZm8uc2luay5Mb2dnZXIoeyBkYXRhOiB0cnVlIH0pO1xuICpcbiAqIHNvdXJjZS5jb25uZWN0KHNsaWNlcik7XG4gKiBzbGljZXIuY29ubmVjdCh5aW4pO1xuICogeWluLmNvbm5lY3QobG9nZ2VyKTtcbiAqXG4gKiBzb3VyY2Uuc3RhcnQoKTtcbiAqL1xuY2xhc3MgWWluIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnByb2JhYmlsaXR5ID0gMDtcbiAgICB0aGlzLnBpdGNoID0gLTE7XG5cbiAgICB0aGlzLnRlc3QgPSAwO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9kb3duc2FtcGxlKGlucHV0LCBzaXplLCBvdXRwdXQsIGRvd25TYW1wbGluZ0V4cCkge1xuICAgIGNvbnN0IG91dHB1dFNpemUgPSBzaXplID4+IGRvd25TYW1wbGluZ0V4cDtcbiAgICBsZXQgaSwgajtcblxuICAgIHN3aXRjaCAoZG93blNhbXBsaW5nRXhwKSB7XG4gICAgICBjYXNlIDA6IC8vIG5vIGRvd24gc2FtcGxpbmdcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHNpemU7IGkrKylcbiAgICAgICAgICBvdXRwdXRbaV0gPSBpbnB1dFtpXTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBvdXRwdXRTaXplOyBpKyssIGogKz0gMilcbiAgICAgICAgICBvdXRwdXRbaV0gPSAwLjUgKiAoaW5wdXRbal0gKyBpbnB1dFtqICsgMV0pO1xuXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDI6XG4gICAgICAgIGZvciAoaSA9IDAsIGogPSAwOyBpIDwgb3V0cHV0U2l6ZTsgaSsrLCBqICs9IDQpXG4gICAgICAgICAgb3V0cHV0W2ldID0gMC4yNSAqIChpbnB1dFtqXSArIGlucHV0W2ogKyAxXSArIGlucHV0W2ogKyAyXSArIGlucHV0W2ogKyAzXSk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGZvciAoaSA9IDAsIGogPSAwOyBpIDwgb3V0cHV0U2l6ZTsgaSsrLCBqICs9IDgpXG4gICAgICAgICAgb3V0cHV0W2ldID0gMC4xMjUgKiAoaW5wdXRbal0gKyBpbnB1dFtqICsgMV0gKyBpbnB1dFtqICsgMl0gKyBpbnB1dFtqICsgM10gKyBpbnB1dFtqICsgNF0gKyBpbnB1dFtqICsgNV0gKyBpbnB1dFtqICsgNl0gKyBpbnB1dFtqICsgN10pO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRTaXplO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICd2ZWN0b3InO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IDI7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZGVzY3JpcHRpb24gPSBbJ2ZyZXF1ZW5jeScsICdjb25maWRlbmNlJ107XG5cbiAgICB0aGlzLmlucHV0RnJhbWVTaXplID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgLy8gaGFuZGxlIHBhcmFtc1xuICAgIGNvbnN0IHNvdXJjZVNhbXBsZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlO1xuICAgIGNvbnN0IGRvd25TYW1wbGluZ0V4cCA9IHRoaXMucGFyYW1zLmdldCgnZG93blNhbXBsaW5nRXhwJyk7XG4gICAgY29uc3QgZG93bkZhY3RvciA9IDEgPDwgZG93blNhbXBsaW5nRXhwOyAvLyAyXm5cbiAgICBjb25zdCBkb3duU1IgPSBzb3VyY2VTYW1wbGVSYXRlIC8gZG93bkZhY3RvcjtcbiAgICBjb25zdCBkb3duRnJhbWVTaXplID0gdGhpcy5pbnB1dEZyYW1lU2l6ZSAvIGRvd25GYWN0b3I7IC8vIG5fdGlja19kb3duIC8vIDEgLyAyXm5cblxuICAgIGNvbnN0IG1pbkZyZXEgPSB0aGlzLnBhcmFtcy5nZXQoJ21pbkZyZXEnKTtcbiAgICAvLyBsaW1pdCBtaW4gZnJlcSwgY2YuIHBhcGVyIElWLiBzZW5zaXRpdml0eSB0byBwYXJhbWV0ZXJzXG4gICAgY29uc3QgbWluRnJlcU5iclNhbXBsZXMgPSBkb3duU1IgLyBtaW5GcmVxO1xuICAgIC8vIGNvbnN0IGJ1ZmZlclNpemUgPSBwcmV2U3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICB0aGlzLmhhbGZCdWZmZXJTaXplID0gZG93bkZyYW1lU2l6ZSAvIDI7XG5cbiAgICAvLyBtaW5pbXVtIGVycm9yIHRvIG5vdCBjcmFzaCBidXQgbm90IGVub3VnaHQgdG8gaGF2ZSByZXN1bHRzXG4gICAgaWYgKG1pbkZyZXFOYnJTYW1wbGVzID4gdGhpcy5oYWxmQnVmZmVyU2l6ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dCBmcmFtZSBzaXplLCB0b28gc21hbGwgZm9yIGdpdmVuIFwibWluRnJlcVwiJyk7XG5cbiAgICB0aGlzLmRvd25TYW1wbGluZ0V4cCA9IGRvd25TYW1wbGluZ0V4cDtcbiAgICB0aGlzLmRvd25TYW1wbGluZ1JhdGUgPSBkb3duU1I7XG4gICAgdGhpcy5kb3duRnJhbWVTaXplID0gZG93bkZyYW1lU2l6ZTtcbiAgICB0aGlzLmJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkoZG93bkZyYW1lU2l6ZSk7XG4gICAgLy8gYXV0b2NvcnJlbGF0aW9uIGJ1ZmZlclxuICAgIHRoaXMueWluQnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLmhhbGZCdWZmZXJTaXplKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX2Rvd25zYW1wbGUoaW5wdXQsIHNpemUsIG91dHB1dCwgZG93blNhbXBsaW5nRXhwKSB7XG4gICAgY29uc3Qgb3V0cHV0U2l6ZSA9IHNpemUgPj4gZG93blNhbXBsaW5nRXhwO1xuICAgIGxldCBpLCBqO1xuXG4gICAgc3dpdGNoIChkb3duU2FtcGxpbmdFeHApIHtcbiAgICAgIGNhc2UgMDogLy8gbm8gZG93biBzYW1wbGluZ1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2l6ZTsgaSsrKVxuICAgICAgICAgIG91dHB1dFtpXSA9IGlucHV0W2ldO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IG91dHB1dFNpemU7IGkrKywgaiArPSAyKVxuICAgICAgICAgIG91dHB1dFtpXSA9IDAuNSAqIChpbnB1dFtqXSArIGlucHV0W2ogKyAxXSk7XG5cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBvdXRwdXRTaXplOyBpKyssIGogKz0gNClcbiAgICAgICAgICBvdXRwdXRbaV0gPSAwLjI1ICogKGlucHV0W2pdICsgaW5wdXRbaiArIDFdICsgaW5wdXRbaiArIDJdICsgaW5wdXRbaiArIDNdKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBvdXRwdXRTaXplOyBpKyssIGogKz0gOClcbiAgICAgICAgICBvdXRwdXRbaV0gPSAwLjEyNSAqIChpbnB1dFtqXSArIGlucHV0W2ogKyAxXSArIGlucHV0W2ogKyAyXSArIGlucHV0W2ogKyAzXSArIGlucHV0W2ogKyA0XSArIGlucHV0W2ogKyA1XSArIGlucHV0W2ogKyA2XSArIGlucHV0W2ogKyA3XSk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFNpemU7XG4gIH1cblxuICAvKipcbiAgICogU3RlcCAxLCAyIGFuZCAzIC0gU3F1YXJlZCBkaWZmZXJlbmNlIG9mIHRoZSBzaGlmdGVkIHNpZ25hbCB3aXRoIGl0c2VsZi5cbiAgICogY3VtdWxhdGl2ZSBtZWFuIG5vcm1hbGl6ZWQgZGlmZmVyZW5jZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ub3JtYWxpemVkRGlmZmVyZW5jZShidWZmZXIpIHtcbiAgICBjb25zdCBoYWxmQnVmZmVyU2l6ZSA9IHRoaXMuaGFsZkJ1ZmZlclNpemU7XG4gICAgY29uc3QgeWluQnVmZmVyID0gdGhpcy55aW5CdWZmZXI7XG4gICAgbGV0IHN1bSA9IDA7XG5cbiAgICAvLyBkaWZmZXJlbmNlIGZvciBkaWZmZXJlbnQgc2hpZnQgdmFsdWVzICh0YXUpXG4gICAgZm9yIChsZXQgdGF1ID0gMDsgdGF1IDwgaGFsZkJ1ZmZlclNpemU7IHRhdSsrKSB7XG4gICAgICBsZXQgc3F1YXJlZERpZmZlcmVuY2UgPSAwOyAvLyByZXNldCBidWZmZXJcblxuICAgICAgLy8gdGFrZSBkaWZmZXJlbmNlIG9mIHRoZSBzaWduYWwgd2l0aCBhIHNoaWZ0ZWQgdmVyc2lvbiBvZiBpdHNlbGYgdGhlblxuICAgICAgLy8gc3FhdXJlIHRoZSByZXN1bHRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGFsZkJ1ZmZlclNpemU7IGkrKykge1xuICAgICAgICBjb25zdCBkZWx0YSA9IGJ1ZmZlcltpXSAtIGJ1ZmZlcltpICsgdGF1XTtcbiAgICAgICAgc3F1YXJlZERpZmZlcmVuY2UgKz0gZGVsdGEgKiBkZWx0YTtcbiAgICAgIH1cblxuICAgICAgLy8gc3RlcCAzIC0gbm9ybWFsaXplIHlpbkJ1ZmZlclxuICAgICAgaWYgKHRhdSA+IDApIHtcbiAgICAgICAgc3VtICs9IHNxdWFyZWREaWZmZXJlbmNlO1xuICAgICAgICB5aW5CdWZmZXJbdGF1XSA9IHNxdWFyZWREaWZmZXJlbmNlICogKHRhdSAvIHN1bSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgeWluQnVmZmVyWzBdID0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGVwIDQgLSBmaW5kIGZpcnN0IGJlc3QgdGF1IHRoYXQgaXMgdW5kZXIgdGhlIHRocmVzb2xkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2Fic29sdXRlVGhyZXNob2xkKCkge1xuICAgIGNvbnN0IHRocmVzaG9sZCA9IHRoaXMucGFyYW1zLmdldCgndGhyZXNob2xkJyk7XG4gICAgY29uc3QgeWluQnVmZmVyID0gdGhpcy55aW5CdWZmZXI7XG4gICAgY29uc3QgaGFsZkJ1ZmZlclNpemUgPSB0aGlzLmhhbGZCdWZmZXJTaXplO1xuICAgIGxldCB0YXU7XG5cbiAgICBmb3IgKHRhdSA9IDE7IHRhdSA8IGhhbGZCdWZmZXJTaXplOyB0YXUrKykge1xuICAgICAgaWYgKHlpbkJ1ZmZlclt0YXVdIDwgdGhyZXNob2xkKSB7XG4gICAgICAgIC8vIGtlZXAgaW5jcmVhc2luZyB0YXUgaWYgbmV4dCB2YWx1ZSBpcyBiZXR0ZXJcbiAgICAgICAgd2hpbGUgKHRhdSArIDEgPCBoYWxmQnVmZmVyU2l6ZSAmJiB5aW5CdWZmZXJbdGF1ICsgMV0gPCB5aW5CdWZmZXJbdGF1XSlcbiAgICAgICAgICB0YXUgKz0gMTtcblxuICAgICAgICAvLyBiZXN0IHRhdSBmb3VuZCAsIHlpbkJ1ZmZlclt0YXVdIGNhbiBiZSBzZWVuIGFzIGFuIGVzdGltYXRpb24gb2ZcbiAgICAgICAgLy8gYXBlcmlvZGljaXR5IHRoZW46IHBlcmlvZGljaXR5ID0gMSAtIGFwZXJpb2RpY2l0eVxuICAgICAgICB0aGlzLnByb2JhYmlsaXR5ID0gMSAtIHlpbkJ1ZmZlclt0YXVdO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm4gLTEgaWYgbm90IG1hdGNoIGZvdW5kXG4gICAgcmV0dXJuICh0YXUgPT09IGhhbGZCdWZmZXJTaXplKSA/IC0xIDogdGF1O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0ZXAgNSAtIEZpbmQgYSBiZXR0ZXIgZnJhY3Rpb25uYWwgYXBwcm94aW1hdGUgb2YgdGF1LlxuICAgKiB0aGlzIGNhbiBwcm9iYWJseSBiZSBzaW1wbGlmaWVkLi4uXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGFyYWJvbGljSW50ZXJwb2xhdGlvbih0YXVFc3RpbWF0ZSkge1xuICAgIGNvbnN0IGhhbGZCdWZmZXJTaXplID0gdGhpcy5oYWxmQnVmZmVyU2l6ZTtcbiAgICBjb25zdCB5aW5CdWZmZXIgPSB0aGlzLnlpbkJ1ZmZlcjtcbiAgICBsZXQgYmV0dGVyVGF1O1xuICAgIC8vIEBub3RlIC0gdGF1RXN0aW1hdGUgY2Fubm90IGJlIHplcm8gYXMgdGhlIGxvb3Agc3RhcnQgYXQgMSBpbiBzdGVwIDRcbiAgICBjb25zdCB4MCA9IHRhdUVzdGltYXRlIC0gMTtcbiAgICBjb25zdCB4MiA9ICh0YXVFc3RpbWF0ZSA8IGhhbGZCdWZmZXJTaXplIC0gMSkgPyB0YXVFc3RpbWF0ZSArIDEgOiB0YXVFc3RpbWF0ZTtcblxuICAgIC8vIGlmIGB0YXVFc3RpbWF0ZWAgaXMgbGFzdCBpbmRleCwgd2UgY2FuJ3QgaW50ZXJwb2xhdGVcbiAgICBpZiAoeDIgPT09IHRhdUVzdGltYXRlKSB7XG4gICAgICAgIGJldHRlclRhdSA9IHRhdUVzdGltYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzMCA9IHlpbkJ1ZmZlclt4MF07XG4gICAgICBjb25zdCBzMSA9IHlpbkJ1ZmZlclt0YXVFc3RpbWF0ZV07XG4gICAgICBjb25zdCBzMiA9IHlpbkJ1ZmZlclt4Ml07XG5cbiAgICAgIC8vIEBub3RlIC0gZG9uJ3QgZnVsbHkgdW5kZXJzdGFuZCB0aGlzIGZvcm11bGEgbmVpdGhlci4uLlxuICAgICAgYmV0dGVyVGF1ID0gdGF1RXN0aW1hdGUgKyAoczIgLSBzMCkgLyAoMiAqICgyICogczEgLSBzMiAtIHMwKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJldHRlclRhdTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBZaW5gIG9wZXJhdG9yIGluIGBzdGFuZGFsb25lYCBtb2RlIChpLmUuIG91dHNpZGUgb2YgYSBncmFwaCkuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl8RmxvYXQzMkFycmF5fSBpbnB1dCAtIFRoZSBzaWduYWwgZnJhZ21lbnQgdG8gcHJvY2Vzcy5cbiAgICogQHJldHVybiB7QXJyYXl9IC0gQXJyYXkgY29udGFpbmluZyB0aGUgYGZyZXF1ZW5jeWAsIGBlbmVyZ3lgLCBgcGVyaW9kaWNpdHlgXG4gICAqICBhbmQgYEFDMWBcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCB5aW4gPSBuZXcgbGZvLm9wZXJhdG9yLllpbigpO1xuICAgKiB5aW4uaW5pdFN0cmVhbSh7XG4gICAqICAgZnJhbWVTaXplOiAyMDQ4LFxuICAgKiAgIGZyYW1lVHlwZTogJ3NpZ25hbCcsXG4gICAqICAgc291cmNlU2FtcGxlUmF0ZTogNDQxMDBcbiAgICogfSk7XG4gICAqXG4gICAqIGNvbnN0IHJlc3VsdHMgPSB5aW4uaW5wdXRTaWduYWwoc2lnbmFsKTtcbiAgICovXG4gIGlucHV0U2lnbmFsKGlucHV0KSB7XG4gICAgdGhpcy5waXRjaCA9IC0xO1xuICAgIHRoaXMucHJvYmFiaWxpdHkgPSAwO1xuXG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgY29uc3QgaW5wdXRGcmFtZVNpemUgPSB0aGlzLmlucHV0RnJhbWVTaXplO1xuICAgIGNvbnN0IGRvd25TYW1wbGluZ0V4cCA9IHRoaXMuZG93blNhbXBsaW5nRXhwO1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSB0aGlzLmRvd25TYW1wbGluZ1JhdGU7XG4gICAgY29uc3Qgb3V0RGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBsZXQgdGF1RXN0aW1hdGUgPSAtMTtcblxuICAgIC8vIHN1YnNhbXBsaW5nXG4gICAgdGhpcy5fZG93bnNhbXBsZShpbnB1dCwgaW5wdXRGcmFtZVNpemUsIGJ1ZmZlciwgZG93blNhbXBsaW5nRXhwKTtcbiAgICAvLyBzdGVwIDEsIDIsIDMgLSBub3JtYWxpemVkIHNxdWFyZWQgZGlmZmVyZW5jZSBvZiB0aGUgc2lnbmFsIHdpdGggYVxuICAgIC8vIHNoaWZ0ZWQgdmVyc2lvbiBvZiBpdHNlbGZcbiAgICB0aGlzLl9ub3JtYWxpemVkRGlmZmVyZW5jZShidWZmZXIpO1xuICAgIC8vIHN0ZXAgNCAtIGZpbmQgZmlyc3QgYmVzdCB0YXUgZXN0aW1hdGUgdGhhdCBpcyBvdmVyIHRoZSB0aHJlc2hvbGRcbiAgICB0YXVFc3RpbWF0ZSA9IHRoaXMuX2Fic29sdXRlVGhyZXNob2xkKCk7XG5cbiAgICBpZiAodGF1RXN0aW1hdGUgIT09IC0xKSB7XG4gICAgICAvLyBzdGVwIDUgLSBzbyBmYXIgdGF1IGlzIGFuIGludGVnZXIgc2hpZnQgb2YgdGhlIHNpZ25hbCwgY2hlY2sgaWZcbiAgICAgIC8vIHRoZXJlIGlzIGEgYmV0dGVyIGZyYWN0aW9ubmFsIHZhbHVlIGFyb3VuZFxuICAgICAgdGF1RXN0aW1hdGUgPSB0aGlzLl9wYXJhYm9saWNJbnRlcnBvbGF0aW9uKHRhdUVzdGltYXRlKTtcbiAgICAgIHRoaXMucGl0Y2ggPSBzYW1wbGVSYXRlIC8gdGF1RXN0aW1hdGU7XG4gICAgfVxuXG4gICAgb3V0RGF0YVswXSA9IHRoaXMucGl0Y2g7XG4gICAgb3V0RGF0YVsxXSA9IHRoaXMucHJvYmFiaWxpdHk7XG5cbiAgICByZXR1cm4gb3V0RGF0YTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBZaW47XG4iLCJpbXBvcnQgQmlxdWFkIGZyb20gJy4vQmlxdWFkJztcbmltcG9ydCBEY3QgZnJvbSAnLi9EY3QnO1xuaW1wb3J0IEZmdCBmcm9tICcuL0ZmdCc7XG5pbXBvcnQgTWFnbml0dWRlIGZyb20gJy4vTWFnbml0dWRlJztcbmltcG9ydCBNZWFuU3RkZGV2IGZyb20gJy4vTWVhblN0ZGRldic7XG5pbXBvcnQgTWVsIGZyb20gJy4vTWVsJztcbmltcG9ydCBNZmNjIGZyb20gJy4vTWZjYyc7XG5pbXBvcnQgTWluTWF4IGZyb20gJy4vTWluTWF4JztcbmltcG9ydCBNb3ZpbmdBdmVyYWdlIGZyb20gJy4vTW92aW5nQXZlcmFnZSc7XG5pbXBvcnQgTW92aW5nTWVkaWFuIGZyb20gJy4vTW92aW5nTWVkaWFuJztcbmltcG9ydCBPbk9mZiBmcm9tICcuL09uT2ZmJztcbmltcG9ydCBSbXMgZnJvbSAnLi9SbXMnO1xuaW1wb3J0IFNlZ21lbnRlciBmcm9tICcuL1NlZ21lbnRlcic7XG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vU2VsZWN0JztcbmltcG9ydCBTbGljZXIgZnJvbSAnLi9TbGljZXInO1xuaW1wb3J0IFlpbiBmcm9tICcuL1lpbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQmlxdWFkLFxuICBEY3QsXG4gIEZmdCxcbiAgTWFnbml0dWRlLFxuICBNZWFuU3RkZGV2LFxuICBNZWwsXG4gIE1mY2MsXG4gIE1pbk1heCxcbiAgTW92aW5nQXZlcmFnZSxcbiAgTW92aW5nTWVkaWFuLFxuICBPbk9mZixcbiAgUm1zLFxuICBTZWdtZW50ZXIsXG4gIFNlbGVjdCxcbiAgU2xpY2VyLFxuICBZaW4sXG59O1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHByb2Nlc3NGcmFtZToge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIGZpbmFsaXplU3RyZWFtOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgYnJpZGdlIGJldHdlZW4gdGhlIGdyYXBoIGFuZCBhcHBsaWNhdGlvbiBsb2dpYy4gSGFuZGxlIGBwdXNoYFxuICogYW5kIGBwdWxsYCBwYXJhZGlnbXMuXG4gKlxuICogVGhpcyBzaW5rIGNhbiBoYW5kbGUgYW55IHR5cGUgb2YgaW5wdXQgKGBzaWduYWxgLCBgdmVjdG9yYCwgYHNjYWxhcmApXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uc2lua1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucHJvY2Vzc0ZyYW1lPW51bGxdIC0gQ2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaFxuICogIGBwcm9jZXNzRnJhbWVgIGNhbGwuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5maW5hbGl6ZVN0cmVhbT1udWxsXSAtIENhbGxiYWNrIGV4ZWN1dGVkIG9uIGVhY2hcbiAqICBgZmluYWxpemVTdHJlYW1gIGNhbGwuXG4gKlxuICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc0ZyYW1lfVxuICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGZyYW1lcyA9IFtcbiAqICB7IHRpbWU6IDAsIGRhdGE6IFswLCAxXSB9LFxuICogIHsgdGltZTogMSwgZGF0YTogWzEsIDJdIH0sXG4gKiBdO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4gPSBuZXcgRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3ZlY3RvcicsXG4gKiAgIGZyYW1lU2l6ZTogMixcbiAqICAgZnJhbWVSYXRlOiAxLFxuICogfSk7XG4gKlxuICogY29uc3QgYnJpZGdlID0gbmV3IEJyaWRnZSh7XG4gKiAgIHByb2Nlc3NGcmFtZTogKGZyYW1lKSA9PiBjb25zb2xlLmxvZyhmcmFtZSksXG4gKiB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QoYnJpZGdlKTtcbiAqIGV2ZW50SW4uc3RhcnQoKTtcbiAqXG4gKiAvLyBjYWxsYmFjayBleGVjdXRlZCBvbiBlYWNoIGZyYW1lXG4gKiBldmVudEluLnByb2Nlc3NGcmFtZShmcmFtZVswXSk7XG4gKiA+IHsgdGltZTogMCwgZGF0YTogWzAsIDFdIH1cbiAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKGZyYW1lWzFdKTtcbiAqID4geyB0aW1lOiAxLCBkYXRhOiBbMSwgMl0gfVxuICpcbiAqIC8vIHB1bGwgY3VycmVudCBmcmFtZSB3aGVuIG5lZWRlZFxuICogY29uc29sZS5sb2coYnJpZGdlLmZyYW1lKTtcbiAqID4geyB0aW1lOiAxLCBkYXRhOiBbMSwgMl0gfVxuICovXG5jbGFzcyBCcmlkZ2UgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGZpbmFsaXplU3RyZWFtKGVuZFRpbWUpIHtcbiAgICBjb25zdCBmaW5hbGl6ZVN0cmVhbUNhbGxiYWNrID0gdGhpcy5wYXJhbXMuZ2V0KCdmaW5hbGl6ZVN0cmVhbScpO1xuXG4gICAgaWYgKGZpbmFsaXplU3RyZWFtQ2FsbGJhY2sgIT09IG51bGwpXG4gICAgICBmaW5hbGl6ZVN0cmVhbUNhbGxiYWNrKGVuZFRpbWUpO1xuICB9XG5cbiAgLy8gcHJvY2VzcyBhbnkgdHlwZVxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NjYWxhcigpIHt9XG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKCkge31cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoKSB7fVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICB0aGlzLnByZXBhcmVGcmFtZSgpO1xuXG4gICAgY29uc3QgcHJvY2Vzc0ZyYW1lQ2FsbGJhY2sgPSB0aGlzLnBhcmFtcy5nZXQoJ3Byb2Nlc3NGcmFtZScpO1xuICAgIGNvbnN0IG91dHB1dCA9IHRoaXMuZnJhbWU7XG4gICAgb3V0cHV0LmRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSk7XG4gICAgLy8gcHVsbCBpbnRlcmZhY2UgKHdlIGNvcHkgZGF0YSBzaW5jZSB3ZSBkb24ndCBrbm93IHdoYXQgY291bGRcbiAgICAvLyBiZSBkb25lIG91dHNpZGUgdGhlIGdyYXBoKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplOyBpKyspXG4gICAgICBvdXRwdXQuZGF0YVtpXSA9IGZyYW1lLmRhdGFbaV07XG5cbiAgICBvdXRwdXQudGltZSA9IGZyYW1lLnRpbWU7XG4gICAgb3V0cHV0Lm1ldGFkYXRhID0gZnJhbWUubWV0YWRhdGE7XG5cbiAgICAvLyBgcHVzaGAgaW50ZXJmYWNlXG4gICAgaWYgKHByb2Nlc3NGcmFtZUNhbGxiYWNrICE9PSBudWxsKVxuICAgICAgcHJvY2Vzc0ZyYW1lQ2FsbGJhY2sob3V0cHV0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCcmlkZ2U7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBzZXBhcmF0ZUFycmF5czoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgY2FsbGJhY2s6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBSZWNvcmQgaW5wdXQgZnJhbWVzIGZyb20gYSBncmFwaC4gVGhpcyBzaW5rIGNhbiBoYW5kbGUgYHNpZ25hbGAsIGB2ZWN0b3JgXG4gKiBvciBgc2NhbGFyYCBpbnB1dHMuXG4gKlxuICogV2hlbiB0aGUgcmVjb3JkaW5nIGlzIHN0b3BwZWQgKGVpdGhlciBieSBjYWxsaW5nIGBzdG9wYCBvbiB0aGUgbm9kZSBvciB3aGVuXG4gKiB0aGUgc3RyZWFtIGlzIGZpbmFsaXplZCksIHRoZSBjYWxsYmFjayBnaXZlbiBhcyBwYXJhbWV0ZXIgaXMgZXhlY3V0ZWQgd2l0aFxuICogdGhlIHJlY29yZGVyIGRhdGEgYXMgYXJndW1lbnQuXG4gKlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zZXBhcmF0ZUFycmF5cz1mYWxzZV0gLSBGb3JtYXQgb2YgdGhlIHJldHJpZXZlZFxuICogIHZhbHVlczpcbiAqICAtIHdoZW4gYGZhbHNlYCwgZm9ybWF0IGlzIFt7IHRpbWUsIGRhdGEgfSwgeyB0aW1lLCBkYXRhIH0sIC4uLl1cbiAqICAtIHdoZW4gYHRydWVgLCBmb3JtYXQgaXMgeyB0aW1lOiBbLi4uXSwgZGF0YTogWy4uLl0gfVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2FsbGJhY2tdIC0gQ2FsbGJhY2sgdG8gZXhlY3V0ZSB3aGVuIGEgbmV3IHJlY29yZFxuICogIGlzIGVuZGVkLiBUaGlzIGNhbiBoYXBwZW4gd2hlbjogYHN0b3BgIGlzIGNhbGxlZCBvbiB0aGUgcmVjb3JkZXIsIG9yIGBzdG9wYFxuICogIGlzIGNhbGxlZCBvbiB0aGUgc291cmNlLlxuICpcbiAqIEB0b2RvIC0gQWRkIGF1dG8gcmVjb3JkIHBhcmFtLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLnNpbmtcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4gPSBuZXcgbGZvLnNvdXJjZS5FdmVudEluKHtcbiAqICBmcmFtZVR5cGU6ICd2ZWN0b3InLFxuICogIGZyYW1lU2l6ZTogMixcbiAqICBmcmFtZVJhdGU6IDAsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCByZWNvcmRlciA9IG5ldyBsZm8uc2luay5EYXRhUmVjb3JkZXIoe1xuICogICBjYWxsYmFjazogKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEpLFxuICogfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KHJlY29yZGVyKTtcbiAqIGV2ZW50SW4uc3RhcnQoKTtcbiAqIHJlY29yZGVyLnN0YXJ0KCk7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzKDAsIFswLCAxXSk7XG4gKiBldmVudEluLnByb2Nlc3MoMSwgWzEsIDJdKTtcbiAqXG4gKiByZWNvcmRlci5zdG9wKCk7XG4gKiA+IFt7IHRpbWU6IDAsIGRhdGE6IFswLCAxXSB9LCB7IHRpbWU6IDEsIGRhdGE6IFsxLCAyXSB9XTtcbiAqL1xuY2xhc3MgRGF0YVJlY29yZGVyIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIC8qKlxuICAgICAqIERlZmluZSBpZiB0aGUgbm9kZSBpcyBjdXJyZW50bHkgcmVjb3JkaW5nLlxuICAgICAqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQG5hbWUgaXNSZWNvcmRpbmdcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOnNpbmsuU2lnbmFsUmVjb3JkZXJcbiAgICAgKi9cbiAgICB0aGlzLmlzUmVjb3JkaW5nID0gZmFsc2U7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX2luaXRTdG9yZSgpIHtcbiAgICBjb25zdCBzZXBhcmF0ZUFycmF5cyA9IHRoaXMucGFyYW1zLmdldCgnc2VwYXJhdGVBcnJheXMnKTtcblxuICAgIGlmIChzZXBhcmF0ZUFycmF5cylcbiAgICAgIHRoaXMuX3N0b3JlID0geyB0aW1lOiBbXSwgZGF0YTogW10gfTtcbiAgICBlbHNlXG4gICAgICB0aGlzLl9zdG9yZSA9IFtdO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICB0aGlzLl9pbml0U3RvcmUoKTtcbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IHJlY29yZGluZy5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNsaWVudC5zaW5rLkRhdGFSZWNvcmRlciNzdG9wfVxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCByZWNvcmRpbmcgYW5kIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGRlZmluZWQgaW4gcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNsaWVudC5zaW5rLkRhdGFSZWNvcmRlciNzdGFydH1cbiAgICovXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuaXNSZWNvcmRpbmcpIHtcbiAgICAgIHRoaXMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5wYXJhbXMuZ2V0KCdjYWxsYmFjaycpO1xuXG4gICAgICBpZiAoY2FsbGJhY2sgIT09IG51bGwpXG4gICAgICAgIGNhbGxiYWNrKHRoaXMuX3N0b3JlKTtcblxuICAgICAgdGhpcy5faW5pdFN0b3JlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGZpbmFsaXplU3RyZWFtKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICB9XG5cbiAgLy8gaGFuZGxlIGFueSBpbnB1dCB0eXBlc1xuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NjYWxhcihmcmFtZSkge31cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUpIHt9XG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lKSB7fVxuXG4gIHByb2Nlc3NGcmFtZShmcmFtZSkge1xuICAgIGlmICh0aGlzLmlzUmVjb3JkaW5nKSB7XG4gICAgICB0aGlzLnByZXBhcmVGcmFtZShmcmFtZSk7XG5cbiAgICAgIGNvbnN0IHNlcGFyYXRlQXJyYXlzID0gdGhpcy5wYXJhbXMuZ2V0KCdzZXBhcmF0ZUFycmF5cycpO1xuICAgICAgY29uc3QgZW50cnkgPSB7XG4gICAgICAgIHRpbWU6IGZyYW1lLnRpbWUsXG4gICAgICAgIGRhdGE6IG5ldyBGbG9hdDMyQXJyYXkoZnJhbWUuZGF0YSksXG4gICAgICB9O1xuXG4gICAgICBpZiAoIXNlcGFyYXRlQXJyYXlzKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLnB1c2goZW50cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc3RvcmUudGltZS5wdXNoKGVudHJ5LnRpbWUpO1xuICAgICAgICB0aGlzLl9zdG9yZS5kYXRhLnB1c2goZW50cnkuZGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFSZWNvcmRlcjtcblxuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHRpbWU6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfVxuICB9LFxuICBtZXRhZGF0YToge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfVxuICB9LFxuICBzdHJlYW1QYXJhbXM6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH1cbiAgfSxcbiAgZnJhbWVJbmRleDoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfVxuICB9LFxufVxuXG4vKipcbiAqIExvZyBgZnJhbWUudGltZWAsIGBmcmFtZS5kYXRhYCwgYGZyYW1lLm1ldGFkYXRhYCBhbmQvb3JcbiAqIGBzdHJlYW1BdHRyaWJ1dGVzYCBvZiBhbnkgbm9kZSBpbiB0aGUgY29uc29sZS5cbiAqXG4gKiBUaGlzIHNpbmsgY2FuIGhhbmRsZSBhbnkgdHlwZSBpZiBpbnB1dCAoYHNpZ25hbGAsIGB2ZWN0b3JgLCBgc2NhbGFyYClcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIHBhcmFtZXRlcnMgZGVmYXVsdCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnRpbWU9ZmFsc2VdIC0gTG9nIGluY29tbWluZyBgZnJhbWUudGltZWAgaWYgYHRydWVgLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kYXRhPWZhbHNlXSAtIExvZyBpbmNvbW1pbmcgYGZyYW1lLmRhdGFgIGlmIGB0cnVlYC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWV0YWRhdGE9ZmFsc2VdIC0gTG9nIGluY29tbWluZyBgZnJhbWUubWV0YWRhdGFgXG4gKiAgaWYgYHRydWVgLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zdHJlYW1QYXJhbXM9ZmFsc2VdIC0gTG9nIGBzdHJlYW1QYXJhbXNgIG9mIHRoZVxuICogIHByZXZpb3VzIG5vZGUgd2hlbiBncmFwaCBpcyBzdGFydGVkLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5mcmFtZUluZGV4PWZhbHNlXSAtIExvZyBpbmRleCBvZiB0aGUgaW5jb21taW5nXG4gKiAgYGZyYW1lYC5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5zaW5rXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqIHdoYXRldmVyT3BlcmF0b3IuY29ubmVjdChsb2dnZXIpO1xuICovXG5jbGFzcyBMb2dnZXIgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCdzdHJlYW1QYXJhbXMnKSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnNvbGUubG9nKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5mcmFtZUluZGV4ID0gMDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzRnVuY3Rpb24oZnJhbWUpIHtcbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCdmcmFtZUluZGV4JykgPT09IHRydWUpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmZyYW1lSW5kZXgrKyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCd0aW1lJykgPT09IHRydWUpXG4gICAgICBjb25zb2xlLmxvZyhmcmFtZS50aW1lKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ2RhdGEnKSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnNvbGUubG9nKGZyYW1lLmRhdGEpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmdldCgnbWV0YWRhdGEnKSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnNvbGUubG9nKGZyYW1lLm1ldGFkYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgZHVyYXRpb246IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IDEwLFxuICAgIG1pbjogMCxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBjYWxsYmFjazoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIGlnbm9yZUxlYWRpbmdaZXJvczoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIHJldHJpZXZlQXVkaW9CdWZmZXI6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIGF1ZGlvQ29udGV4dDoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gIH0sXG59O1xuXG4vKipcbiAqIFJlY29yZCBhbiBgc2lnbmFsYCBpbnB1dCBzdHJlYW0gb2YgYXJiaXRyYXJ5IGR1cmF0aW9uIGFuZCByZXRyaWV2ZSBpdFxuICogd2hlbiBkb25lLlxuICpcbiAqIFdoZW4gcmVjb3JkaW5nIGlzIHN0b3BwZWQgKGVpdGhlciB3aGVuIHRoZSBgc3RvcGAgbWV0aG9kIGlzIGNhbGxlZCwgdGhlXG4gKiBkZWZpbmVkIGR1cmF0aW9uIGhhcyBiZWVuIHJlY29yZGVkLCBvciB0aGUgc291cmNlIG9mIHRoZSBncmFwaCBmaW5hbGl6ZWRcbiAqIHRoZSBzdHJlYW0pLCB0aGUgY2FsbGJhY2sgZ2l2ZW4gYXMgcGFyYW1ldGVyIGlzIGV4ZWN1dGVkICB3aXRoIHRoZVxuICogYEF1ZGlvQnVmZmVyYCBvciBgRmxvYXQzMkFycmF5YCBjb250YWluaW5nIHRoZSByZWNvcmRlZCBzaWduYWwgYXMgYXJndW1lbnQuXG4gKlxuICogQHRvZG8gLSBhZGQgb3B0aW9uIHRvIHJldHVybiBvbmx5IHRoZSBGbG9hdDMyQXJyYXkgYW5kIG5vdCBhbiBhdWRpbyBidWZmZXJcbiAqICAobm9kZSBjb21wbGlhbnQpIGByZXRyaWV2ZUF1ZGlvQnVmZmVyOiBmYWxzZWBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xMF0gLSBNYXhpbXVtIGR1cmF0aW9uIG9mIHRoZSByZWNvcmRpbmcuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY2FsbGJhY2tdIC0gQ2FsbGJhY2sgdG8gZXhlY3V0ZSB3aGVuIGEgbmV3IHJlY29yZCBpc1xuICogIGVuZGVkLiBUaGlzIGNhbiBoYXBwZW46IGBzdG9wYCBpcyBjYWxsZWQgb24gdGhlIHJlY29yZGVyLCBgc3RvcGAgaXMgY2FsbGVkXG4gKiAgb24gdGhlIHNvdXJjZSBvciB3aGVuIHRoZSBidWZmZXIgaXMgZnVsbCBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGBkdXJhdGlvbmAuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuaWdub3JlTGVhZGluZ1plcm9zPXRydWVdIC0gU3RhcnQgdGhlIGVmZmVjdGl2ZVxuICogIHJlY29yZGluZyBvbiB0aGUgZmlyc3Qgbm9uLXplcm8gdmFsdWUuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJldHJpZXZlQXVkaW9CdWZmZXI9ZmFsc2VdIC0gRGVmaW5lIGlmIGFuIGBBdWRpb0J1ZmZlcmBcbiAqICBzaG91bGQgYmUgcmV0cmlldmVkIG9yIG9ubHkgdGhlIHJhdyBGbG9hdDMyQXJyYXkgb2YgZGF0YS5cbiAqICAod29ya3Mgb25seSBpbiBicm93c2VyKVxuICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IFtvcHRpb25zLmF1ZGlvQ29udGV4dD1udWxsXSAtIElmXG4gKiAgYHJldHJpZXZlQXVkaW9CdWZmZXJgIGlzIHNldCB0byBgdHJ1ZWAsIGF1ZGlvIGNvbnRleHQgdG8gYmUgdXNlZFxuICogIGluIG9yZGVyIHRvIGNyZWF0ZSB0aGUgZmluYWwgYXVkaW8gYnVmZmVyLlxuICogICh3b3JrcyBvbmx5IGluIGJyb3dzZXIpXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uc2lua1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICpcbiAqIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAqICAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gKiAgIC50aGVuKGluaXQpXG4gKiAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyci5zdGFjaykpO1xuICpcbiAqIGZ1bmN0aW9uIGluaXQoc3RyZWFtKSB7XG4gKiAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xuICpcbiAqICAgY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gKiAgICAgc291cmNlTm9kZTogc291cmNlLFxuICogICAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICB9KTtcbiAqXG4gKiAgIGNvbnN0IHNpZ25hbFJlY29yZGVyID0gbmV3IGxmby5zaW5rLlNpZ25hbFJlY29yZGVyKHtcbiAqICAgICBkdXJhdGlvbjogNixcbiAqICAgICByZXRyaWV2ZUF1ZGlvQnVmZmVyOiB0cnVlLFxuICogICAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICAgIGNhbGxiYWNrOiAoYnVmZmVyKSA9PiB7XG4gKiAgICAgICBjb25zdCBidWZmZXJTb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gKiAgICAgICBidWZmZXJTb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xuICogICAgICAgYnVmZmVyU291cmNlLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAqICAgICAgIGJ1ZmZlclNvdXJjZS5zdGFydCgpO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogICBhdWRpb0luTm9kZS5jb25uZWN0KHNpZ25hbFJlY29yZGVyKTtcbiAqICAgYXVkaW9Jbk5vZGUuc3RhcnQoKTtcbiAqICAgc2lnbmFsUmVjb3JkZXIuc3RhcnQoKTtcbiAqIH0pO1xuICovXG5jbGFzcyBTaWduYWxSZWNvcmRlciBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmUgaXMgdGhlIG5vZGUgaXMgY3VycmVudGx5IHJlY29yZGluZyBvciBub3QuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAbmFtZSBpc1JlY29yZGluZ1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmsuU2lnbmFsUmVjb3JkZXJcbiAgICAgKi9cbiAgICB0aGlzLmlzUmVjb3JkaW5nID0gZmFsc2U7XG5cbiAgICBjb25zdCByZXRyaWV2ZUF1ZGlvQnVmZmVyID0gdGhpcy5wYXJhbXMuZ2V0KCdyZXRyaWV2ZUF1ZGlvQnVmZmVyJyk7XG4gICAgbGV0IGF1ZGlvQ29udGV4dCA9IHRoaXMucGFyYW1zLmdldCgnYXVkaW9Db250ZXh0Jyk7XG4gICAgLy8gbmVlZGVkIHRvIHJldHJpZXZlIGFuIEF1ZGlvQnVmZmVyXG4gICAgaWYgKHJldHJpZXZlQXVkaW9CdWZmZXIgJiYgYXVkaW9Db250ZXh0ID09PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBhcmFtZXRlciBcImF1ZGlvQ29udGV4dFwiOiBhbiBBdWRpb0NvbnRleHQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGByZXRyaWV2ZUF1ZGlvQnVmZmVyYCBpcyBzZXQgdG8gYHRydWVgJylcblxuICAgIHRoaXMuX2F1ZGlvQ29udGV4dCA9IGF1ZGlvQ29udGV4dDtcbiAgICB0aGlzLl9pZ25vcmVaZXJvcyA9IGZhbHNlO1xuICAgIHRoaXMuX2lzSW5maW5pdGVCdWZmZXIgPSBmYWxzZTtcbiAgICB0aGlzLl9zdGFjayA9IFtdO1xuICAgIHRoaXMuX2J1ZmZlciA9IG51bGw7XG4gICAgdGhpcy5fYnVmZmVyTGVuZ3RoID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBudWxsO1xuICB9XG5cbiAgX2luaXRCdWZmZXIoKSB7XG4gICAgdGhpcy5fYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLl9idWZmZXJMZW5ndGgpO1xuICAgIHRoaXMuX3N0YWNrLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gMDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMucGFyYW1zLmdldCgnZHVyYXRpb24nKTtcbiAgICBjb25zdCBzYW1wbGVSYXRlID0gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZTtcblxuICAgIGlmIChpc0Zpbml0ZShkdXJhdGlvbikpIHtcbiAgICAgIHRoaXMuX2lzSW5maW5pdGVCdWZmZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2J1ZmZlckxlbmd0aCA9IHNhbXBsZVJhdGUgKiBkdXJhdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNJbmZpbml0ZUJ1ZmZlciA9IHRydWU7XG4gICAgICB0aGlzLl9idWZmZXJMZW5ndGggPSBzYW1wbGVSYXRlICogMTA7XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdEJ1ZmZlcigpO1xuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgcmVjb3JkaW5nLlxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XG4gICAgdGhpcy5faWdub3JlWmVyb3MgPSB0aGlzLnBhcmFtcy5nZXQoJ2lnbm9yZUxlYWRpbmdaZXJvcycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgcmVjb3JkaW5nIGFuZCBleGVjdXRlIHRoZSBjYWxsYmFjayBkZWZpbmVkIGluIHBhcmFtZXRlcnMuXG4gICAqL1xuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLmlzUmVjb3JkaW5nKSB7XG4gICAgICAvLyBpZ25vcmUgbmV4dCBpbmNvbW1pbmcgZnJhbWVcbiAgICAgIHRoaXMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcblxuICAgICAgY29uc3QgcmV0cmlldmVBdWRpb0J1ZmZlciA9IHRoaXMucGFyYW1zLmdldCgncmV0cmlldmVBdWRpb0J1ZmZlcicpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLnBhcmFtcy5nZXQoJ2NhbGxiYWNrJyk7XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXg7XG4gICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXI7XG4gICAgICBsZXQgb3V0cHV0O1xuXG4gICAgICBpZiAoIXRoaXMuX2lzSW5maW5pdGVCdWZmZXIpIHtcbiAgICAgICAgb3V0cHV0ID0gbmV3IEZsb2F0MzJBcnJheShjdXJyZW50SW5kZXgpO1xuICAgICAgICBvdXRwdXQuc2V0KGJ1ZmZlci5zdWJhcnJheSgwLCBjdXJyZW50SW5kZXgpLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlckxlbmd0aCA9IHRoaXMuX2J1ZmZlckxlbmd0aDtcbiAgICAgICAgY29uc3Qgc3RhY2sgPSB0aGlzLl9zdGFjaztcblxuICAgICAgICBvdXRwdXQgPSBuZXcgRmxvYXQzMkFycmF5KHN0YWNrLmxlbmd0aCAqIGJ1ZmZlckxlbmd0aCArIGN1cnJlbnRJbmRleCk7XG5cbiAgICAgICAgLy8gY29weSBhbGwgc3RhY2tlZCBidWZmZXJzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBzdGFja2VkQnVmZmVyID0gc3RhY2tbaV07XG4gICAgICAgICAgb3V0cHV0LnNldChzdGFja2VkQnVmZmVyLCBidWZmZXJMZW5ndGggKiBpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gY29weSBkYXRhIGNvbnRhaW5lZCBpbiBjdXJyZW50IGJ1ZmZlclxuICAgICAgICBvdXRwdXQuc2V0KGJ1ZmZlci5zdWJhcnJheSgwLCBjdXJyZW50SW5kZXgpLCBzdGFjay5sZW5ndGggKiBidWZmZXJMZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmV0cmlldmVBdWRpb0J1ZmZlciAmJiB0aGlzLl9hdWRpb0NvbnRleHQpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcbiAgICAgICAgY29uc3Qgc2FtcGxlUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG4gICAgICAgIGNvbnN0IGF1ZGlvQnVmZmVyID0gdGhpcy5fYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcigxLCBsZW5ndGgsIHNhbXBsZVJhdGUpO1xuICAgICAgICBjb25zdCBjaGFubmVsRGF0YSA9IGF1ZGlvQnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xuICAgICAgICBjaGFubmVsRGF0YS5zZXQob3V0cHV0LCAwKTtcblxuICAgICAgICBjYWxsYmFjayhhdWRpb0J1ZmZlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhvdXRwdXQpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWluaXQgYnVmZmVyLCBzdGFjaywgYW5kIGN1cnJlbnRJbmRleFxuICAgICAgdGhpcy5faW5pdEJ1ZmZlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBmaW5hbGl6ZVN0cmVhbShlbmRUaW1lKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIGlmICghdGhpcy5pc1JlY29yZGluZylcbiAgICAgIHJldHVybjtcblxuICAgIGxldCBibG9jayA9IG51bGw7XG4gICAgY29uc3QgaW5wdXQgPSBmcmFtZS5kYXRhO1xuICAgIGNvbnN0IGJ1ZmZlckxlbmd0aCA9IHRoaXMuX2J1ZmZlckxlbmd0aDtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXI7XG5cbiAgICBpZiAodGhpcy5faWdub3JlWmVyb3MgPT09IGZhbHNlKSB7XG4gICAgICBibG9jayA9IG5ldyBGbG9hdDMyQXJyYXkoaW5wdXQpO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRbaW5wdXQubGVuZ3RoIC0gMV0gIT09IDApIHtcbiAgICAgIC8vIGZpbmQgZmlyc3QgaW5kZXggd2hlcmUgdmFsdWUgIT09IDBcbiAgICAgIGxldCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspXG4gICAgICAgIGlmIChpbnB1dFtpXSAhPT0gMCkgYnJlYWs7XG5cbiAgICAgIC8vIGNvcHkgbm9uIHplcm8gc2VnbWVudFxuICAgICAgYmxvY2sgPSBuZXcgRmxvYXQzMkFycmF5KGlucHV0LnN1YmFycmF5KGkpKTtcbiAgICAgIC8vIGRvbid0IHJlcGVhdCB0aGlzIGxvZ2ljIG9uY2UgYSBub24temVybyB2YWx1ZSBoYXMgYmVlbiBmb3VuZFxuICAgICAgdGhpcy5faWdub3JlWmVyb3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoYmxvY2sgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVNwYWNlID0gYnVmZmVyTGVuZ3RoIC0gdGhpcy5fY3VycmVudEluZGV4O1xuICAgICAgbGV0IGN1cnJlbnRCbG9jaztcblxuICAgICAgaWYgKGF2YWlsYWJsZVNwYWNlIDwgYmxvY2subGVuZ3RoKVxuICAgICAgICBjdXJyZW50QmxvY2sgPSBibG9jay5zdWJhcnJheSgwLCBhdmFpbGFibGVTcGFjZSk7XG4gICAgICBlbHNlXG4gICAgICAgIGN1cnJlbnRCbG9jayA9IGJsb2NrO1xuXG4gICAgICBidWZmZXIuc2V0KGN1cnJlbnRCbG9jaywgdGhpcy5fY3VycmVudEluZGV4KTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCArPSBjdXJyZW50QmxvY2subGVuZ3RoO1xuXG4gICAgICBpZiAodGhpcy5faXNJbmZpbml0ZUJ1ZmZlciAmJiB0aGlzLl9jdXJyZW50SW5kZXggPT09IGJ1ZmZlckxlbmd0aCkge1xuICAgICAgICB0aGlzLl9zdGFjay5wdXNoKGJ1ZmZlcik7XG5cbiAgICAgICAgY3VycmVudEJsb2NrID0gYmxvY2suc3ViYXJyYXkoYXZhaWxhYmxlU3BhY2UpO1xuICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlckxlbmd0aCk7XG4gICAgICAgIHRoaXMuX2J1ZmZlci5zZXQoY3VycmVudEJsb2NrLCAwKTtcbiAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID0gY3VycmVudEJsb2NrLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgLy8gIHN0b3AgaWYgdGhlIGJ1ZmZlciBpcyBmaW5pdGUgYW5kIGZ1bGxcbiAgICAgIGlmICghdGhpcy5faXNJbmZpbml0ZUJ1ZmZlciAmJiB0aGlzLl9jdXJyZW50SW5kZXggPT09IGJ1ZmZlckxlbmd0aClcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hbFJlY29yZGVyO1xuXG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMZm8nO1xuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE3NTc1NzkwL2Vudmlyb25tZW50LWRldGVjdGlvbi1ub2RlLWpzLW9yLWJyb3dzZXJcbmNvbnN0IGlzTm9kZSA9IG5ldyBGdW5jdGlvbigndHJ5IHsgcmV0dXJuIHRoaXMgPT09IGdsb2JhbDsgfSBjYXRjaChlKSB7IHJldHVybiBmYWxzZSB9Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRpbWUgaW4gc2Vjb25kcyBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnRcbiAqIGVudmlyb25uZW1lbnQgKG5vZGUgb3IgYnJvd3NlcikuXG4gKiBJZiBydW5uaW5nIGluIG5vZGUgdGhlIHRpbWUgcmVseSBvbiBgcHJvY2Vzcy5ocnRpbWVgLCB3aGlsZSBpZiBpbiB0aGUgYnJvd3NlclxuICogaXQgaXMgcHJvdmlkZWQgYnkgdGhlIGBjdXJyZW50VGltZWAgb2YgYW4gYEF1ZGlvQ29udGV4dGAsIHRoaXMgY29udGV4dCBjYW5cbiAqIG9wdGlvbm5hbHkgYmUgcHJvdmlkZWQgdG8ga2VlcCB0aW1lIGNvbnNpc3RlbmN5IGJldHdlZW4gc2V2ZXJhbCBgRXZlbnRJbmBcbiAqIG5vZGVzLlxuICpcbiAqIEBwYXJhbSB7QXVkaW9Db250ZXh0fSBbYXVkaW9Db250ZXh0PW51bGxdIC0gT3B0aW9ubmFsIGF1ZGlvIGNvbnRleHQuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFRpbWVGdW5jdGlvbihhdWRpb0NvbnRleHQgPSBudWxsKSB7XG4gIGlmIChpc05vZGUoKSkge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCB0ID0gcHJvY2Vzcy5ocnRpbWUoKTtcbiAgICAgIHJldHVybiB0WzBdICsgdFsxXSAqIDFlLTk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChhdWRpb0NvbnRleHQgPT09IG51bGwgfHzCoCghYXVkaW9Db250ZXh0IGluc3RhbmNlb2YgQXVkaW9Db250ZXh0KSkge1xuICAgICAgY29uc3QgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fMKgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgIGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lO1xuICB9XG59XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGFic29sdXRlVGltZToge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgYXVkaW9Db250ZXh0OiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgfSxcbiAgZnJhbWVUeXBlOiB7XG4gICAgdHlwZTogJ2VudW0nLFxuICAgIGxpc3Q6IFsnc2lnbmFsJywgJ3ZlY3RvcicsICdzY2FsYXInXSxcbiAgICBkZWZhdWx0OiAnc2lnbmFsJyxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgZnJhbWVTaXplOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDEsXG4gICAgbWluOiAxLFxuICAgIG1heDogK0luZmluaXR5LCAvLyBub3QgcmVjb21tZW5kZWQuLi5cbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBzYW1wbGVSYXRlOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIG1pbjogMCxcbiAgICBtYXg6ICtJbmZpbml0eSwgLy8gc2FtZSBoZXJlXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgZnJhbWVSYXRlOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIG1pbjogMCxcbiAgICBtYXg6ICtJbmZpbml0eSwgLy8gc2FtZSBoZXJlXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgZGVzY3JpcHRpb246IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9XG59O1xuXG4vKipcbiAqIFRoZSBgRXZlbnRJbmAgb3BlcmF0b3IgYWxsb3dzIHRvIG1hbnVhbGx5IGNyZWF0ZSBhIHN0cmVhbSBvZiBkYXRhIG9yIHRvIGZlZWRcbiAqIGEgc3RyZWFtIGZyb20gYW5vdGhlciBzb3VyY2UgKGUuZy4gc2Vuc29ycykgaW50byBhIHByb2Nlc3NpbmcgZ3JhcGguXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBwYXJhbWV0ZXJzJyBkZWZhdWx0IHZhbHVlcy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5mcmFtZVR5cGU9J3NpZ25hbCddIC0gVHlwZSBvZiB0aGUgaW5wdXQgLSBhbGxvd2VkXG4gKiB2YWx1ZXM6IGBzaWduYWxgLCAgYHZlY3RvcmAgb3IgYHNjYWxhcmAuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZnJhbWVTaXplPTFdIC0gU2l6ZSBvZiB0aGUgb3V0cHV0IGZyYW1lLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnNhbXBsZVJhdGU9bnVsbF0gLSBTYW1wbGUgcmF0ZSBvZiB0aGUgc291cmNlIHN0cmVhbSxcbiAqICBpZiBvZiB0eXBlIGBzaWduYWxgLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmZyYW1lUmF0ZT1udWxsXSAtIFJhdGUgb2YgdGhlIHNvdXJjZSBzdHJlYW0sIGlmIG9mXG4gKiAgdHlwZSBgdmVjdG9yYC5cbiAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBbb3B0aW9ucy5kZXNjcmlwdGlvbl0gLSBPcHRpb25uYWwgZGVzY3JpcHRpb25cbiAqICBkZXNjcmliaW5nIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBvdXRwdXQgZnJhbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWJzb2x1dGVUaW1lPWZhbHNlXSAtIERlZmluZSBpZiB0aW1lIHNob3VsZCBiZSB1c2VkXG4gKiAgYXMgZm9yd2FyZGVkIGFzIGdpdmVuIGluIHRoZSBwcm9jZXNzIG1ldGhvZCwgb3IgcmVsYXRpdmVseSB0byB0aGUgdGltZSBvZlxuICogIHRoZSBmaXJzdCBgcHJvY2Vzc2AgY2FsbCBhZnRlciBzdGFydC5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5zb3VyY2VcbiAqXG4gKiBAdG9kbyAtIEFkZCBhIGBsb2dpY2FsVGltZWAgcGFyYW1ldGVyIHRvIHRhZyBmcmFtZSBhY2NvcmRpbmcgdG8gZnJhbWUgcmF0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4gPSBuZXcgbGZvLnNvdXJjZS5FdmVudEluKHtcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAqICAgZnJhbWVTaXplOiAzLFxuICogICBmcmFtZVJhdGU6IDEgLyA1MCxcbiAqICAgZGVzY3JpcHRpb246IFsnYWxwaGEnLCAnYmV0YScsICdnYW1tYSddLFxuICogfSk7XG4gKlxuICogLy8gY29ubmVjdCBzb3VyY2UgdG8gb3BlcmF0b3JzIGFuZCBzaW5rKHMpXG4gKlxuICogLy8gaW5pdGlhbGl6ZSBhbmQgc3RhcnQgdGhlIGdyYXBoXG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogLy8gZmVlZCBgZGV2aWNlb3JpZW50YXRpb25gIGRhdGEgaW50byB0aGUgZ3JhcGhcbiAqIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIChlKSA9PiB7XG4gKiAgIGNvbnN0IGZyYW1lID0ge1xuICogICAgIHRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICogICAgIGRhdGE6IFtlLmFscGhhLCBlLmJldGEsIGUuZ2FtbWFdLFxuICogICB9O1xuICpcbiAqICAgZXZlbnRJbi5wcm9jZXNzRnJhbWUoZnJhbWUpO1xuICogfSwgZmFsc2UpO1xuICovXG5jbGFzcyBFdmVudEluIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IGF1ZGlvQ29udGV4dCA9IHRoaXMucGFyYW1zLmdldCgnYXVkaW9Db250ZXh0Jyk7XG4gICAgdGhpcy5fZ2V0VGltZSA9IGdldFRpbWVGdW5jdGlvbihhdWRpb0NvbnRleHQpO1xuICAgIHRoaXMuX2lzU3RhcnRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3N0YXJ0VGltZSA9IG51bGw7XG4gICAgdGhpcy5fc3lzdGVtVGltZSA9IG51bGw7XG4gICAgdGhpcy5fYWJzb2x1dGVUaW1lID0gdGhpcy5wYXJhbXMuZ2V0KCdhYnNvbHV0ZVRpbWUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9wYWdhdGUgdGhlIGBzdHJlYW1QYXJhbXNgIGluIHRoZSBncmFwaCBhbmQgYWxsb3cgdG8gcHVzaCBmcmFtZXMgaW50b1xuICAgKiB0aGUgZ3JhcGguIEFueSBjYWxsIHRvIGBwcm9jZXNzYCBvciBgcHJvY2Vzc0ZyYW1lYCBiZWZvcmUgYHN0YXJ0YCB3aWxsIGJlXG4gICAqIGlnbm9yZWQuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NTdHJlYW1QYXJhbXN9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Jlc2V0U3RyZWFtfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLnNvdXJjZS5FdmVudEluI3N0b3B9XG4gICAqL1xuICBzdGFydChzdGFydFRpbWUgPSBudWxsKSB7XG4gICAgdGhpcy5pbml0U3RyZWFtKCk7XG5cbiAgICB0aGlzLl9zdGFydFRpbWUgPSBzdGFydFRpbWU7XG4gICAgdGhpcy5faXNTdGFydGVkID0gdHJ1ZTtcbiAgICAvLyB2YWx1ZXMgc2V0IGluIHRoZSBmaXJzdCBgcHJvY2Vzc2AgY2FsbFxuICAgIHRoaXMuX3N5c3RlbVRpbWUgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmFsaXplIHRoZSBzdHJlYW0gYW5kIHN0b3AgdGhlIHdob2xlIGdyYXBoLiBBbnkgY2FsbCB0byBgcHJvY2Vzc2Agb3JcbiAgICogYHByb2Nlc3NGcmFtZWAgYWZ0ZXIgYHN0b3BgIHdpbGwgYmUgaWdub3JlZC5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jZmluYWxpemVTdHJlYW19XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uc291cmNlLkV2ZW50SW4jc3RhcnR9XG4gICAqL1xuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLl9pc1N0YXJ0ZWQgJiYgdGhpcy5fc3RhcnRUaW1lICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IHRoaXMuX2dldFRpbWUoKTtcbiAgICAgIGNvbnN0IGVuZFRpbWUgPSB0aGlzLmZyYW1lLnRpbWUgKyAoY3VycmVudFRpbWUgLSB0aGlzLl9zeXN0ZW1UaW1lKTtcblxuICAgICAgdGhpcy5maW5hbGl6ZVN0cmVhbShlbmRUaW1lKTtcbiAgICAgIHRoaXMuX2lzU3RhcnRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKCkge1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnZnJhbWVTaXplJyk7XG4gICAgY29uc3QgZnJhbWVUeXBlID0gdGhpcy5wYXJhbXMuZ2V0KCdmcmFtZVR5cGUnKTtcbiAgICBjb25zdCBzYW1wbGVSYXRlID0gdGhpcy5wYXJhbXMuZ2V0KCdzYW1wbGVSYXRlJyk7XG4gICAgY29uc3QgZnJhbWVSYXRlID0gdGhpcy5wYXJhbXMuZ2V0KCdmcmFtZVJhdGUnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHRoaXMucGFyYW1zLmdldCgnZGVzY3JpcHRpb24nKTtcbiAgICAvLyBpbml0IG9wZXJhdG9yJ3Mgc3RyZWFtIHBhcmFtc1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IGZyYW1lVHlwZSA9PT0gJ3NjYWxhcicgPyAxIDogZnJhbWVTaXplO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9IGZyYW1lVHlwZTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXG4gICAgaWYgKGZyYW1lVHlwZSA9PT0gJ3NpZ25hbCcpIHtcbiAgICAgIGlmIChzYW1wbGVSYXRlID09PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZGVmaW5lZCBcInNhbXBsZVJhdGVcIiBmb3IgXCJzaWduYWxcIiBzdHJlYW0nKTtcblxuICAgICAgdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSA9IHNhbXBsZVJhdGU7XG4gICAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVJhdGUgPSBzYW1wbGVSYXRlIC8gZnJhbWVTaXplO1xuICAgICAgdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlQ291bnQgPSBmcmFtZVNpemU7XG5cbiAgICB9IGVsc2UgaWYgKGZyYW1lVHlwZSA9PT0gJ3ZlY3RvcicgfHwgZnJhbWVUeXBlID09PSAnc2NhbGFyJykge1xuICAgICAgaWYgKGZyYW1lUmF0ZSA9PT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmRlZmluZWQgXCJmcmFtZVJhdGVcIiBmb3IgXCJ2ZWN0b3JcIiBzdHJlYW0nKTtcblxuICAgICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVSYXRlID0gZnJhbWVSYXRlO1xuICAgICAgdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSA9IGZyYW1lUmF0ZTtcbiAgICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZUNvdW50ID0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NGdW5jdGlvbihmcmFtZSkge1xuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy5fZ2V0VGltZSgpO1xuICAgIGNvbnN0IGluRGF0YSA9IGZyYW1lLmRhdGEubGVuZ3RoID8gZnJhbWUuZGF0YSA6IFtmcmFtZS5kYXRhXTtcbiAgICBjb25zdCBvdXREYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIC8vIGlmIG5vIHRpbWUgcHJvdmlkZWQsIHVzZSBzeXN0ZW0gdGltZVxuICAgIGxldCB0aW1lID0gTnVtYmVyLmlzRmluaXRlKGZyYW1lLnRpbWUpID8gZnJhbWUudGltZSA6IGN1cnJlbnRUaW1lO1xuXG4gICAgaWYgKHRoaXMuX3N0YXJ0VGltZSA9PT0gbnVsbClcbiAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRpbWU7XG5cbiAgICBpZiAodGhpcy5fYWJzb2x1dGVUaW1lID09PSBmYWxzZSlcbiAgICAgIHRpbWUgPSB0aW1lIC0gdGhpcy5fc3RhcnRUaW1lO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7IGkgPCBsOyBpKyspXG4gICAgICBvdXREYXRhW2ldID0gaW5EYXRhW2ldO1xuXG4gICAgdGhpcy5mcmFtZS50aW1lID0gdGltZTtcbiAgICB0aGlzLmZyYW1lLm1ldGFkYXRhID0gZnJhbWUubWV0YWRhdGE7XG4gICAgLy8gc3RvcmUgY3VycmVudCB0aW1lIHRvIGNvbXB1dGUgYGVuZFRpbWVgIG9uIHN0b3BcbiAgICB0aGlzLl9zeXN0ZW1UaW1lID0gY3VycmVudFRpbWU7XG4gIH1cblxuICAvKipcbiAgICogQWx0ZXJuYXRpdmUgaW50ZXJmYWNlIHRvIHByb3BhZ2F0ZSBhIGZyYW1lIGluIHRoZSBncmFwaC4gUGFjayBgdGltZWAsXG4gICAqIGBkYXRhYCBhbmQgYG1ldGFkYXRhYCBpbiBhIGZyYW1lIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWUgLSBGcmFtZSB0aW1lLlxuICAgKiBAcGFyYW0ge0Zsb2F0MzJBcnJheXxBcnJheX0gZGF0YSAtIEZyYW1lIGRhdGEuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtZXRhZGF0YSAtIE9wdGlvbm5hbCBmcmFtZSBtZXRhZGF0YS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogZXZlbnRJbi5wcm9jZXNzKDEsIFswLCAxLCAyXSk7XG4gICAqIC8vIGlzIGVxdWl2YWxlbnQgdG9cbiAgICogZXZlbnRJbi5wcm9jZXNzRnJhbWUoeyB0aW1lOiAxLCBkYXRhOiBbMCwgMSwgMl0gfSk7XG4gICAqL1xuICBwcm9jZXNzKHRpbWUsIGRhdGEsIG1ldGFkYXRhID0gbnVsbCkge1xuICAgIHRoaXMucHJvY2Vzc0ZyYW1lKHsgdGltZSwgZGF0YSwgbWV0YWRhdGEgfSk7XG4gIH1cblxuICAvKipcbiAgICogUHJvcGFnYXRlIGEgZnJhbWUgb2JqZWN0IGluIHRoZSBncmFwaC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGZyYW1lIC0gSW5wdXQgZnJhbWUuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmcmFtZS50aW1lIC0gRnJhbWUgdGltZS5cbiAgICogQHBhcmFtIHtGbG9hdDMyQXJyYXl8QXJyYXl9IGZyYW1lLmRhdGEgLSBGcmFtZSBkYXRhLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW2ZyYW1lLm1ldGFkYXRhPXVuZGVmaW5lZF0gLSBPcHRpb25uYWwgZnJhbWUgbWV0YWRhdGEuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKHsgdGltZTogMSwgZGF0YTogWzAsIDEsIDJdIH0pO1xuICAgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgaWYgKCF0aGlzLl9pc1N0YXJ0ZWQpIHJldHVybjtcblxuICAgIHRoaXMucHJlcGFyZUZyYW1lKCk7XG4gICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24oZnJhbWUpO1xuICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEluO1xuIiwiXG4vLyBzaG9ydGN1dHMgLyBoZWxwZXJzXG5jb25zdCBQSSAgID0gTWF0aC5QSTtcbmNvbnN0IGNvcyAgPSBNYXRoLmNvcztcbmNvbnN0IHNpbiAgPSBNYXRoLnNpbjtcbmNvbnN0IHNxcnQgPSBNYXRoLnNxcnQ7XG5cbi8vIHdpbmRvdyBjcmVhdGlvbiBmdW5jdGlvbnNcbmZ1bmN0aW9uIGluaXRIYW5uV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKSB7XG4gIGxldCBsaW5TdW0gPSAwO1xuICBsZXQgcG93U3VtID0gMDtcbiAgY29uc3Qgc3RlcCA9IDIgKiBQSSAvIHNpemU7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBjb25zdCBwaGkgPSBpICogc3RlcDtcbiAgICBjb25zdCB2YWx1ZSA9IDAuNSAtIDAuNSAqIGNvcyhwaGkpO1xuXG4gICAgYnVmZmVyW2ldID0gdmFsdWU7XG5cbiAgICBsaW5TdW0gKz0gdmFsdWU7XG4gICAgcG93U3VtICs9IHZhbHVlICogdmFsdWU7XG4gIH1cblxuICBub3JtQ29lZnMubGluZWFyID0gc2l6ZSAvIGxpblN1bTtcbiAgbm9ybUNvZWZzLnBvd2VyID0gc3FydChzaXplIC8gcG93U3VtKTtcbn1cblxuZnVuY3Rpb24gaW5pdEhhbW1pbmdXaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpIHtcbiAgbGV0IGxpblN1bSA9IDA7XG4gIGxldCBwb3dTdW0gPSAwO1xuICBjb25zdCBzdGVwID0gMiAqIFBJIC8gc2l6ZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGNvbnN0IHBoaSA9IGkgKiBzdGVwO1xuICAgIGNvbnN0IHZhbHVlID0gMC41NCAtIDAuNDYgKiBjb3MocGhpKTtcblxuICAgIGJ1ZmZlcltpXSA9IHZhbHVlO1xuXG4gICAgbGluU3VtICs9IHZhbHVlO1xuICAgIHBvd1N1bSArPSB2YWx1ZSAqIHZhbHVlO1xuICB9XG5cbiAgbm9ybUNvZWZzLmxpbmVhciA9IHNpemUgLyBsaW5TdW07XG4gIG5vcm1Db2Vmcy5wb3dlciA9IHNxcnQoc2l6ZSAvIHBvd1N1bSk7XG59XG5cbmZ1bmN0aW9uIGluaXRCbGFja21hbldpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcykge1xuICBsZXQgbGluU3VtID0gMDtcbiAgbGV0IHBvd1N1bSA9IDA7XG4gIGNvbnN0IHN0ZXAgPSAyICogUEkgLyBzaXplO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgY29uc3QgcGhpID0gaSAqIHN0ZXA7XG4gICAgY29uc3QgdmFsdWUgPSAwLjQyIC0gMC41ICogY29zKHBoaSkgKyAwLjA4ICogY29zKDIgKiBwaGkpO1xuXG4gICAgYnVmZmVyW2ldID0gdmFsdWU7XG5cbiAgICBsaW5TdW0gKz0gdmFsdWU7XG4gICAgcG93U3VtICs9IHZhbHVlICogdmFsdWU7XG4gIH1cblxuICBub3JtQ29lZnMubGluZWFyID0gc2l6ZSAvIGxpblN1bTtcbiAgbm9ybUNvZWZzLnBvd2VyID0gc3FydChzaXplIC8gcG93U3VtKTtcbn1cblxuZnVuY3Rpb24gaW5pdEJsYWNrbWFuSGFycmlzV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKSB7XG4gIGxldCBsaW5TdW0gPSAwO1xuICBsZXQgcG93U3VtID0gMDtcbiAgY29uc3QgYTAgPSAwLjM1ODc1O1xuICBjb25zdCBhMSA9IDAuNDg4Mjk7XG4gIGNvbnN0IGEyID0gMC4xNDEyODtcbiAgY29uc3QgYTMgPSAwLjAxMTY4O1xuICBjb25zdCBzdGVwID0gMiAqIFBJIC8gc2l6ZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGNvbnN0IHBoaSA9IGkgKiBzdGVwO1xuICAgIGNvbnN0IHZhbHVlID0gYTAgLSBhMSAqIGNvcyhwaGkpICsgYTIgKiBjb3MoMiAqIHBoaSk7IC0gYTMgKiBjb3MoMyAqIHBoaSk7XG5cbiAgICBidWZmZXJbaV0gPSB2YWx1ZTtcblxuICAgIGxpblN1bSArPSB2YWx1ZTtcbiAgICBwb3dTdW0gKz0gdmFsdWUgKiB2YWx1ZTtcbiAgfVxuXG4gIG5vcm1Db2Vmcy5saW5lYXIgPSBzaXplIC8gbGluU3VtO1xuICBub3JtQ29lZnMucG93ZXIgPSBzcXJ0KHNpemUgLyBwb3dTdW0pO1xufVxuXG5mdW5jdGlvbiBpbml0U2luZVdpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcykge1xuICBsZXQgbGluU3VtID0gMDtcbiAgbGV0IHBvd1N1bSA9IDA7XG4gIGNvbnN0IHN0ZXAgPSBQSSAvIHNpemU7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBjb25zdCBwaGkgPSBpICogc3RlcDtcbiAgICBjb25zdCB2YWx1ZSA9IHNpbihwaGkpO1xuXG4gICAgYnVmZmVyW2ldID0gdmFsdWU7XG5cbiAgICBsaW5TdW0gKz0gdmFsdWU7XG4gICAgcG93U3VtICs9IHZhbHVlICogdmFsdWU7XG4gIH1cblxuICBub3JtQ29lZnMubGluZWFyID0gc2l6ZSAvIGxpblN1bTtcbiAgbm9ybUNvZWZzLnBvd2VyID0gc3FydChzaXplIC8gcG93U3VtKTtcbn1cblxuZnVuY3Rpb24gaW5pdFJlY3RhbmdsZVdpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKylcbiAgICBidWZmZXJbaV0gPSAxO1xuXG4gIC8vIEB0b2RvIC0gY2hlY2sgaWYgdGhlc2UgYXJlIHByb3BlciB2YWx1ZXNcbiAgbm9ybUNvZWZzLmxpbmVhciA9IDE7XG4gIG5vcm1Db2Vmcy5wb3dlciA9IDE7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgYnVmZmVyIHdpdGggd2luZG93IHNpZ25hbC5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi51dGlsc1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgd2luZG93LlxuICogQHBhcmFtIHtGbG9hdDMyQXJyYXl9IGJ1ZmZlciAtIEJ1ZmZlciB0byBiZSBwb3B1bGF0ZWQgd2l0aCB0aGUgd2luZG93IHNpZ25hbC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBzaXplIC0gU2l6ZSBvZiB0aGUgYnVmZmVyLlxuICogQHBhcmFtIHtPYmplY3R9IG5vcm1Db2VmcyAtIE9iamVjdCB0byBiZSBwb3B1bGF0ZWQgd2l0aCB0aGUgbm9ybWFpbHphdGlvblxuICogIGNvZWZmaWNpZW50cy5cbiAqL1xuZnVuY3Rpb24gaW5pdFdpbmRvdyhuYW1lLCBidWZmZXIsIHNpemUsIG5vcm1Db2Vmcykge1xuICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ2hhbm4nOlxuICAgIGNhc2UgJ2hhbm5pbmcnOlxuICAgICAgaW5pdEhhbm5XaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaGFtbWluZyc6XG4gICAgICBpbml0SGFtbWluZ1dpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdibGFja21hbic6XG4gICAgICBpbml0QmxhY2ttYW5XaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmxhY2ttYW5oYXJyaXMnOlxuICAgICAgaW5pdEJsYWNrbWFuSGFycmlzV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NpbmUnOlxuICAgICAgaW5pdFNpbmVXaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmVjdGFuZ2xlJzpcbiAgICAgIGluaXRSZWN0YW5nbGVXaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdFdpbmRvdztcblxuXG4iLCJpbXBvcnQgcGFyYW1ldGVycyBmcm9tICdwYXJhbWV0ZXJzJztcblxubGV0IGlkID0gMDtcblxuLyoqXG4gKiBCYXNlIGBsZm9gIGNsYXNzIHRvIGJlIGV4dGVuZGVkIGluIG9yZGVyIHRvIGNyZWF0ZSBuZXcgbm9kZXMuXG4gKlxuICogTm9kZXMgYXJlIGRpdmlkZWQgaW4gMyBjYXRlZ29yaWVzOlxuICogLSAqKmBzb3VyY2VgKiogYXJlIHJlc3BvbnNpYmxlIGZvciBhY3F1ZXJpbmcgYSBzaWduYWwgYW5kIGl0cyBwcm9wZXJ0aWVzXG4gKiAgIChmcmFtZVJhdGUsIGZyYW1lU2l6ZSwgZXRjLilcbiAqIC0gKipgc2lua2AqKiBhcmUgZW5kcG9pbnRzIG9mIHRoZSBncmFwaCwgc3VjaCBub2RlcyBjYW4gYmUgcmVjb3JkZXJzLFxuICogICB2aXN1YWxpemVycywgZXRjLlxuICogLSAqKmBvcGVyYXRvcmAqKiBhcmUgdXNlZCB0byBtYWtlIGNvbXB1dGF0aW9uIG9uIHRoZSBpbnB1dCBzaWduYWwgYW5kXG4gKiAgIGZvcndhcmQgdGhlIHJlc3VsdHMgYmVsb3cgaW4gdGhlIGdyYXBoLlxuICpcbiAqIEluIG1vc3QgY2FzZXMgdGhlIG1ldGhvZHMgdG8gb3ZlcnJpZGUgLyBleHRlbmQgYXJlOlxuICogLSB0aGUgKipgY29uc3RydWN0b3JgKiogdG8gZGVmaW5lIHRoZSBwYXJhbWV0ZXJzIG9mIHRoZSBuZXcgbGZvIG5vZGUuXG4gKiAtIHRoZSAqKmBwcm9jZXNzU3RyZWFtUGFyYW1zYCoqIG1ldGhvZCB0byBkZWZpbmUgaG93IHRoZSBub2RlIG1vZGlmeSB0aGVcbiAqICAgc3RyZWFtIGF0dHJpYnV0ZXMgKGUuZy4gYnkgY2hhbmdpbmcgdGhlIGZyYW1lIHNpemUpXG4gKiAtIHRoZSAqKmBwcm9jZXNze0ZyYW1lVHlwZX1gKiogbWV0aG9kIHRvIGRlZmluZSB0aGUgb3BlcmF0aW9ucyB0aGF0IHRoZVxuICogICBub2RlIGFwcGx5IG9uIHRoZSBzdHJlYW0uIFRoZSB0eXBlIG9mIGlucHV0IGEgbm9kZSBjYW4gaGFuZGxlIGlzIGRlZmluZVxuICogICBieSBpdHMgaW1wbGVtZW50ZWQgaW50ZXJmYWNlLCBpZiBpdCBpbXBsZW1lbnRzIGBwcm9jZXNzU2lnbmFsYCBhIHN0cmVhbVxuICogICB3aXRoIGBmcmFtZVR5cGUgPT09ICdzaWduYWwnYCBjYW4gYmUgcHJvY2Vzc2VkLCBgcHJvY2Vzc1ZlY3RvcmAgdG8gaGFuZGxlXG4gKiAgIGFuIGlucHV0IG9mIHR5cGUgYHZlY3RvcmAuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJ3YXJuaW5nXCI+X1RoaXMgY2xhc3Mgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYWJzdHJhY3QgYW5kIG9ubHlcbiAqIGJlIHVzZWQgdG8gYmUgZXh0ZW5kZWQuXzwvc3Bhbj5cbiAqXG4gKlxuICogLy8gb3ZlcnZpZXcgb2YgdGhlIGJlaGF2aW9yIG9mIGEgbm9kZVxuICpcbiAqICoqcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSoqXG4gKlxuICogYGJhc2VgIGNsYXNzIChkZWZhdWx0IGltcGxlbWVudGF0aW9uKVxuICogLSBjYWxsIGBwcmVwcm9jZXNzU3RyZWFtUGFyYW1zYFxuICogLSBjYWxsIGBwcm9wYWdhdGVTdHJlYW1QYXJhbXNgXG4gKlxuICogYGNoaWxkYCBjbGFzc1xuICogLSBjYWxsIGBwcmVwcm9jZXNzU3RyZWFtUGFyYW1zYFxuICogLSBvdmVycmlkZSBzb21lIG9mIHRoZSBpbmhlcml0ZWQgYHN0cmVhbVBhcmFtc2BcbiAqIC0gY3JlYXRlcyB0aGUgYW55IHJlbGF0ZWQgbG9naWMgYnVmZmVyc1xuICogLSBjYWxsIGBwcm9wYWdhdGVTdHJlYW1QYXJhbXNgXG4gKlxuICogX3Nob3VsZCBub3QgY2FsbCBgc3VwZXIucHJvY2Vzc1N0cmVhbVBhcmFtc2BfXG4gKlxuICogKipwcmVwYXJlU3RyZWFtUGFyYW1zKCkqKlxuICpcbiAqIC0gYXNzaWduIHByZXZTdHJlYW1QYXJhbXMgdG8gdGhpcy5zdHJlYW1QYXJhbXNcbiAqIC0gY2hlY2sgaWYgdGhlIGNsYXNzIGltcGxlbWVudHMgdGhlIGNvcnJlY3QgYHByb2Nlc3NJbnB1dGAgbWV0aG9kXG4gKlxuICogX3Nob3VsZG4ndCBiZSBleHRlbmRlZCwgb25seSBjb25zdW1lZCBpbiBgcHJvY2Vzc1N0cmVhbVBhcmFtc2BfXG4gKlxuICogKipwcm9wYWdhdGVTdHJlYW1QYXJhbXMoKSoqXG4gKlxuICogLSBjcmVhdGVzIHRoZSBgZnJhbWVEYXRhYCBidWZmZXJcbiAqIC0gcHJvcGFnYXRlIGBzdHJlYW1QYXJhbXNgIHRvIGNoaWxkcmVuXG4gKlxuICogX3Nob3VsZG4ndCBiZSBleHRlbmRlZCwgb25seSBjb25zdW1lZCBpbiBgcHJvY2Vzc1N0cmVhbVBhcmFtc2BfXG4gKlxuICogKipwcm9jZXNzRnJhbWUoKSoqXG4gKlxuICogYGJhc2VgIGNsYXNzIChkZWZhdWx0IGltcGxlbWVudGF0aW9uKVxuICogLSBjYWxsIGBwcmVwcm9jZXNzRnJhbWVgXG4gKiAtIGFzc2lnbiBmcmFtZVRpbWUgYW5kIGZyYW1lTWV0YWRhdGEgdG8gaWRlbnRpdHlcbiAqIC0gY2FsbCB0aGUgcHJvcGVyIGZ1bmN0aW9uIGFjY29yZGluZyB0byBpbnB1dFR5cGVcbiAqIC0gY2FsbCBgcHJvcGFnYXRlRnJhbWVgXG4gKlxuICogYGNoaWxkYCBjbGFzc1xuICogLSBjYWxsIGBwcmVwcm9jZXNzRnJhbWVgXG4gKiAtIGRvIHdoYXRldmVyIHlvdSB3YW50IHdpdGggaW5jb21taW5nIGZyYW1lXG4gKiAtIGNhbGwgYHByb3BhZ2F0ZUZyYW1lYFxuICpcbiAqIF9zaG91bGQgbm90IGNhbGwgYHN1cGVyLnByb2Nlc3NGcmFtZWBfXG4gKlxuICogKipwcmVwYXJlRnJhbWUoKSoqXG4gKlxuICogLSBpZiBgcmVpbml0YCBhbmQgdHJpZ2dlciBgcHJvY2Vzc1N0cmVhbVBhcmFtc2AgaWYgbmVlZGVkXG4gKlxuICogX3Nob3VsZG4ndCBiZSBleHRlbmRlZCwgb25seSBjb25zdW1lZCBpbiBgcHJvY2Vzc0ZyYW1lYF9cbiAqXG4gKiAqKnByb3BhZ2F0ZUZyYW1lKCkqKlxuICpcbiAqIC0gcHJvcGFnYXRlIGZyYW1lIHRvIGNoaWxkcmVuXG4gKlxuICogX3Nob3VsZG4ndCBiZSBleHRlbmRlZCwgb25seSBjb25zdW1lZCBpbiBgcHJvY2Vzc0ZyYW1lYF9cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmVcbiAqL1xuY2xhc3MgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKGRlZmluaXRpb25zID0ge30sIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuY2lkID0gaWQrKztcblxuICAgIC8qKlxuICAgICAqIFBhcmFtZXRlciBiYWcgY29udGFpbmluZyBwYXJhbWV0ZXIgaW5zdGFuY2VzLlxuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKiBAbmFtZSBwYXJhbXNcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm9cbiAgICAgKi9cbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtZXRlcnMoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICAgIC8vIGxpc3RlbiBmb3IgcGFyYW0gdXBkYXRlc1xuICAgIHRoaXMucGFyYW1zLmFkZExpc3RlbmVyKHRoaXMub25QYXJhbVVwZGF0ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uIG9mIHRoZSBzdHJlYW0gb3V0cHV0IG9mIHRoZSBub2RlLlxuICAgICAqIFNldCB0byBgbnVsbGAgd2hlbiB0aGUgbm9kZSBpcyBkZXN0cm95ZWQuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmcmFtZVNpemUgLSBGcmFtZSBzaXplIGF0IHRoZSBvdXRwdXQgb2YgdGhlIG5vZGUuXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZyYW1lUmF0ZSAtIEZyYW1lIHJhdGUgYXQgdGhlIG91dHB1dCBvZiB0aGUgbm9kZS5cbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gZnJhbWVUeXBlIC0gRnJhbWUgdHlwZSBhdCB0aGUgb3V0cHV0IG9mIHRoZSBub2RlLFxuICAgICAqICBwb3NzaWJsZSB2YWx1ZXMgYXJlIGBzaWduYWxgLCBgdmVjdG9yYCBvciBgc2NhbGFyYC5cbiAgICAgKiBAcHJvcGVydHkge0FycmF5fFN0cmluZ30gZGVzY3JpcHRpb24gLSBJZiB0eXBlIGlzIGB2ZWN0b3JgLCBkZXNjcmliZVxuICAgICAqICB0aGUgZGltZW5zaW9uKHMpIG9mIG91dHB1dCBzdHJlYW0uXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHNvdXJjZVNhbXBsZVJhdGUgLSBTYW1wbGUgcmF0ZSBvZiB0aGUgc291cmNlIG9mIHRoZVxuICAgICAqICBncmFwaC4gX1RoZSB2YWx1ZSBzaG91bGQgYmUgZGVmaW5lZCBieSBzb3VyY2VzIGFuZCBuZXZlciBtb2RpZmllZF8uXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHNvdXJjZVNhbXBsZUNvdW50IC0gTnVtYmVyIG9mIGNvbnNlY3V0aXZlIGRpc2NyZXRlXG4gICAgICogIHRpbWUgdmFsdWVzIGNvbnRhaW5lZCBpbiB0aGUgZGF0YSBmcmFtZSBvdXRwdXQgYnkgdGhlIHNvdXJjZS5cbiAgICAgKiAgX1RoZSB2YWx1ZSBzaG91bGQgYmUgZGVmaW5lZCBieSBzb3VyY2VzIGFuZCBuZXZlciBtb2RpZmllZF8uXG4gICAgICpcbiAgICAgKiBAbmFtZSBzdHJlYW1QYXJhbXNcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm9cbiAgICAgKi9cbiAgICB0aGlzLnN0cmVhbVBhcmFtcyA9IHtcbiAgICAgIGZyYW1lVHlwZTogbnVsbCxcbiAgICAgIGZyYW1lU2l6ZTogMSxcbiAgICAgIGZyYW1lUmF0ZTogMCxcbiAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgc291cmNlU2FtcGxlUmF0ZTogMCxcbiAgICAgIHNvdXJjZVNhbXBsZUNvdW50OiBudWxsLFxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGZyYW1lLiBUaGlzIG9iamVjdCBhbmQgaXRzIGRhdGEgYXJlIHVwZGF0ZWQgYXQgZWFjaCBpbmNvbW1pbmdcbiAgICAgKiBmcmFtZSB3aXRob3V0IHJlYWxsb2NhdGluZyBtZW1vcnkuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqIEBuYW1lIGZyYW1lXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWUgLSBUaW1lIG9mIHRoZSBjdXJyZW50IGZyYW1lLlxuICAgICAqIEBwcm9wZXJ0eSB7RmxvYXQzMkFycmF5fSBkYXRhIC0gRGF0YSBvZiB0aGUgY3VycmVudCBmcmFtZS5cbiAgICAgKiBAcHJvcGVydHkge09iamVjdH0gbWV0YWRhdGEgLSBNZXRhZGF0YSBhc3NvY2l0ZWQgdG8gdGhlIGN1cnJlbnQgZnJhbWUuXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvXG4gICAgICovXG4gICAgdGhpcy5mcmFtZSA9IHtcbiAgICAgIHRpbWU6IDAsXG4gICAgICBkYXRhOiBudWxsLFxuICAgICAgbWV0YWRhdGE6IHt9LFxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIG5vZGVzIGNvbm5lY3RlZCB0byB0aGUgb3VwdXQgb2YgdGhlIG5vZGUgKGxvd2VyIGluIHRoZSBncmFwaCkuXG4gICAgICogQXQgZWFjaCBmcmFtZSwgdGhlIG5vZGUgZm9yd2FyZCBpdHMgYGZyYW1lYCB0byB0byBhbGwgaXRzIGBuZXh0T3BzYC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtBcnJheTxCYXNlTGZvPn1cbiAgICAgKiBAbmFtZSBuZXh0T3BzXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvXG4gICAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jY29ubmVjdH1cbiAgICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNkaXNjb25uZWN0fVxuICAgICAqL1xuICAgIHRoaXMubmV4dE9wcyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG5vZGUgZnJvbSB3aGljaCB0aGUgbm9kZSByZWNlaXZlIHRoZSBmcmFtZXMgKHVwcGVyIGluIHRoZSBncmFwaCkuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7QmFzZUxmb31cbiAgICAgKiBAbmFtZSBwcmV2T3BcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm9cbiAgICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNjb25uZWN0fVxuICAgICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2Rpc2Nvbm5lY3R9XG4gICAgICovXG4gICAgdGhpcy5wcmV2T3AgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogSXMgc2V0IHRvIHRydWUgd2hlbiBhIHN0YXRpYyBwYXJhbWV0ZXIgaXMgdXBkYXRlZC4gT24gdGhlIG5leHQgaW5wdXRcbiAgICAgKiBmcmFtZSBhbGwgdGhlIHN1YmdyYXBoIHN0cmVhbVBhcmFtcyBzdGFydGluZyBmcm9tIHRoaXMgbm9kZSB3aWxsIGJlXG4gICAgICogdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBuYW1lIF9yZWluaXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm9cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX3JlaW5pdCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IGRlc2NyaWJpbmcgZWFjaCBhdmFpbGFibGUgcGFyYW1ldGVyIG9mIHRoZSBub2RlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXRQYXJhbXNEZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMuZ2V0RGVmaW5pdGlvbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBhbGwgcGFyYW1ldGVycyB0byB0aGVpciBpbml0aWFsIHZhbHVlIChhcyBkZWZpbmVkIG9uIGluc3RhbnRpY2F0aW9uKVxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNzdHJlYW1QYXJhbXN9XG4gICAqL1xuICByZXNldFBhcmFtcygpIHtcbiAgICB0aGlzLnBhcmFtcy5yZXNldCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIGEgcGFyYW0gaXMgdXBkYXRlZC4gQnkgZGVmYXVsdCBzZXQgdGhlIGBfcmVpbml0YFxuICAgKiBmbGFnIHRvIGB0cnVlYCBpZiB0aGUgcGFyYW0gaXMgYHN0YXRpY2Agb25lLiBUaGlzIG1ldGhvZCBzaG91bGQgYmVcbiAgICogZXh0ZW5kZWQgdG8gaGFuZGxlIHBhcnRpY3VsYXIgbG9naWMgYm91bmQgdG8gYSBzcGVjaWZpYyBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIFZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtZXRhcyAtIE1ldGFkYXRhIGFzc29jaWF0ZWQgdG8gdGhlIHBhcmFtZXRlci5cbiAgICovXG4gIG9uUGFyYW1VcGRhdGUobmFtZSwgdmFsdWUsIG1ldGFzID0ge30pIHtcbiAgICBpZiAobWV0YXMua2luZCA9PT0gJ3N0YXRpYycpXG4gICAgICB0aGlzLl9yZWluaXQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3QgdGhlIGN1cnJlbnQgbm9kZSAoYHByZXZPcGApIHRvIGFub3RoZXIgbm9kZSAoYG5leHRPcGApLlxuICAgKiBBIGdpdmVuIG5vZGUgY2FuIGJlIGNvbm5lY3RlZCB0byBzZXZlcmFsIG9wZXJhdG9ycyBhbmQgcHJvcGFnYXRlIHRoZVxuICAgKiBzdHJlYW0gdG8gZWFjaCBvZiB0aGVtLlxuICAgKlxuICAgKiBAcGFyYW0ge0Jhc2VMZm99IG5leHQgLSBOZXh0IG9wZXJhdG9yIGluIHRoZSBncmFwaC5cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc0ZyYW1lfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNkaXNjb25uZWN0fVxuICAgKi9cbiAgY29ubmVjdChuZXh0KSB7XG4gICAgaWYgKCEobmV4dCBpbnN0YW5jZW9mIEJhc2VMZm8pKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbm5lY3Rpb246IGNoaWxkIG5vZGUgaXMgbm90IGFuIGluc3RhbmNlIG9mIGBCYXNlTGZvYCcpO1xuXG4gICAgaWYgKHRoaXMuc3RyZWFtUGFyYW1zID09PSBudWxsIHx8bmV4dC5zdHJlYW1QYXJhbXMgPT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29ubmVjdGlvbjogY2Fubm90IGNvbm5lY3QgYSBkZWFkIG5vZGUnKTtcblxuICAgIHRoaXMubmV4dE9wcy5wdXNoKG5leHQpO1xuICAgIG5leHQucHJldk9wID0gdGhpcztcblxuICAgIGlmICh0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgIT09IG51bGwpIC8vIGdyYXBoIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZFxuICAgICAgbmV4dC5wcm9jZXNzU3RyZWFtUGFyYW1zKHRoaXMuc3RyZWFtUGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIGdpdmVuIG9wZXJhdG9yIGZyb20gaXRzIHByZXZpb3VzIG9wZXJhdG9ycycgYG5leHRPcHNgLlxuICAgKlxuICAgKiBAcGFyYW0ge0Jhc2VMZm99IFtuZXh0PW51bGxdIC0gVGhlIG9wZXJhdG9yIHRvIGRpc2Nvbm5lY3QgZnJvbSB0aGUgY3VycmVudFxuICAgKiAgb3BlcmF0b3IuIElmIGBudWxsYCBkaXNjb25uZWN0IGFsbCB0aGUgbmV4dCBvcGVyYXRvcnMuXG4gICAqL1xuICBkaXNjb25uZWN0KG5leHQgPSBudWxsKSB7XG4gICAgaWYgKG5leHQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMubmV4dE9wcy5mb3JFYWNoKChuZXh0KSA9PiB0aGlzLmRpc2Nvbm5lY3QobmV4dCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMubmV4dE9wcy5pbmRleE9mKHRoaXMpO1xuICAgICAgdGhpcy5uZXh0T3BzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBuZXh0LnByZXZPcCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYWxsIHRoZSBub2RlcyBpbiB0aGUgc3ViLWdyYXBoIHN0YXJ0aW5nIGZyb20gdGhlIGN1cnJlbnQgbm9kZS5cbiAgICogV2hlbiBkZXRyb3llZCwgdGhlIGBzdHJlYW1QYXJhbXNgIG9mIHRoZSBub2RlIGFyZSBzZXQgdG8gYG51bGxgLCB0aGVcbiAgICogb3BlcmF0b3IgaXMgdGhlbiBjb25zaWRlcmVkIGFzIGBkZWFkYCBhbmQgY2Fubm90IGJlIHJlY29ubmVjdGVkLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNjb25uZWN0fVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBkZXN0cm95IGFsbCBjaGlkcmVuXG4gICAgbGV0IGluZGV4ID0gdGhpcy5uZXh0T3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpbmRleC0tKVxuICAgICAgdGhpcy5uZXh0T3BzW2luZGV4XS5kZXN0cm95KCk7XG5cbiAgICAvLyBkaXNjb25uZWN0IGl0c2VsZiBmcm9tIHRoZSBwcmV2aW91cyBvcGVyYXRvclxuICAgIGlmICh0aGlzLnByZXZPcClcbiAgICAgIHRoaXMucHJldk9wLmRpc2Nvbm5lY3QodGhpcyk7XG5cbiAgICAvLyBtYXJrIHRoZSBvYmplY3QgYXMgZGVhZFxuICAgIHRoaXMuc3RyZWFtUGFyYW1zID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgdG8gaW5pdGlhbGl6ZSB0aGUgc3RyZWFtIGluIHN0YW5kYWxvbmUgbW9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtzdHJlYW1QYXJhbXM9e31dIC0gU3RyZWFtIHBhcmFtZXRlcnMgdG8gYmUgdXNlZC5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcmVzZXRTdHJlYW19XG4gICAqL1xuICBpbml0U3RyZWFtKHN0cmVhbVBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wcm9jZXNzU3RyZWFtUGFyYW1zKHN0cmVhbVBhcmFtcyk7XG4gICAgdGhpcy5yZXNldFN0cmVhbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBgZnJhbWUuZGF0YWAgYnVmZmVyIGJ5IHNldHRpbmcgYWxsIGl0cyB2YWx1ZXMgdG8gMC5cbiAgICogQSBzb3VyY2Ugb3BlcmF0b3Igc2hvdWxkIGNhbGwgYHByb2Nlc3NTdHJlYW1QYXJhbXNgIGFuZCBgcmVzZXRTdHJlYW1gIHdoZW5cbiAgICogc3RhcnRlZCwgZWFjaCBvZiB0aGVzZSBtZXRob2QgcHJvcGFnYXRlIHRocm91Z2ggdGhlIGdyYXBoIGF1dG9tYXRpY2FseS5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAgICovXG4gIHJlc2V0U3RyZWFtKCkge1xuICAgIC8vIGJ1dHRvbSB1cFxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5uZXh0T3BzLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgIHRoaXMubmV4dE9wc1tpXS5yZXNldFN0cmVhbSgpO1xuXG4gICAgLy8gbm8gYnVmZmVyIGZvciBgc2NhbGFyYCB0eXBlIG9yIHNpbmsgbm9kZVxuICAgIGlmICh0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgIT09ICdzY2FsYXInICYmIHRoaXMuZnJhbWUuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZVNpemU7IGkrKylcbiAgICAgICAgZGF0YVtpXSA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmFsaXplIHRoZSBzdHJlYW0uIEEgc291cmNlIG5vZGUgc2hvdWxkIGNhbGwgdGhpcyBtZXRob2Qgd2hlbiBzdG9wcGVkLFxuICAgKiBgZmluYWxpemVTdHJlYW1gIGlzIGF1dG9tYXRpY2FsbHkgcHJvcGFnYXRlZCB0aHJvdWdodCB0aGUgZ3JhcGguXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbmRUaW1lIC0gTG9naWNhbCB0aW1lIGF0IHdoaWNoIHRoZSBncmFwaCBpcyBzdG9wcGVkLlxuICAgKi9cbiAgZmluYWxpemVTdHJlYW0oZW5kVGltZSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5uZXh0T3BzLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgIHRoaXMubmV4dE9wc1tpXS5maW5hbGl6ZVN0cmVhbShlbmRUaW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIG9yIHVwZGF0ZSB0aGUgb3BlcmF0b3IncyBgc3RyZWFtUGFyYW1zYCBhY2NvcmRpbmcgdG8gdGhlXG4gICAqIHByZXZpb3VzIG9wZXJhdG9ycyBgc3RyZWFtUGFyYW1zYCB2YWx1ZXMuXG4gICAqXG4gICAqIFdoZW4gaW1wbGVtZW50aW5nIGEgbmV3IG9wZXJhdG9yIHRoaXMgbWV0aG9kIHNob3VsZDpcbiAgICogMS4gY2FsbCBgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zYCB3aXRoIHRoZSBnaXZlbiBgcHJldlN0cmVhbVBhcmFtc2BcbiAgICogMi4gb3B0aW9ubmFsbHkgY2hhbmdlIHZhbHVlcyB0byBgdGhpcy5zdHJlYW1QYXJhbXNgIGFjY29yZGluZyB0byB0aGVcbiAgICogICAgbG9naWMgcGVyZm9ybWVkIGJ5IHRoZSBvcGVyYXRvci5cbiAgICogMy4gb3B0aW9ubmFsbHkgYWxsb2NhdGUgbWVtb3J5IGZvciByaW5nIGJ1ZmZlcnMsIGV0Yy5cbiAgICogNC4gY2FsbCBgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXNgIHRvIHRyaWdnZXIgdGhlIG1ldGhvZCBvbiB0aGUgbmV4dFxuICAgKiAgICBvcGVyYXRvcnMgaW4gdGhlIGdyYXBoLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJldlN0cmVhbVBhcmFtcyAtIGBzdHJlYW1QYXJhbXNgIG9mIHRoZSBwcmV2aW91cyBvcGVyYXRvci5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJlcGFyZVN0cmVhbVBhcmFtc31cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvcGFnYXRlU3RyZWFtUGFyYW1zfVxuICAgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21tb24gbG9naWMgdG8gZG8gYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYHByb2Nlc3NTdHJlYW1QYXJhbWAsIG11c3QgYmVcbiAgICogY2FsbGVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgYW55IGBwcm9jZXNzU3RyZWFtUGFyYW1gIGltcGxlbWVudGF0aW9uLlxuICAgKlxuICAgKiBUaGUgbWV0aG9kIG1haW5seSBjaGVjayBpZiB0aGUgY3VycmVudCBub2RlIGltcGxlbWVudCB0aGUgaW50ZXJmYWNlIHRvXG4gICAqIGhhbmRsZSB0aGUgdHlwZSBvZiBmcmFtZSBwcm9wYWdhdGVkIGJ5IGl0J3MgcGFyZW50OlxuICAgKiAtIHRvIGhhbmRsZSBhIGB2ZWN0b3JgIGZyYW1lIHR5cGUsIHRoZSBjbGFzcyBtdXN0IGltcGxlbWVudCBgcHJvY2Vzc1ZlY3RvcmBcbiAgICogLSB0byBoYW5kbGUgYSBgc2lnbmFsYCBmcmFtZSB0eXBlLCB0aGUgY2xhc3MgbXVzdCBpbXBsZW1lbnQgYHByb2Nlc3NTaWduYWxgXG4gICAqIC0gaW4gY2FzZSBvZiBhICdzY2FsYXInIGZyYW1lIHR5cGUsIHRoZSBjbGFzcyBjYW4gaW1wbGVtZW50IGFueSBvZiB0aGVcbiAgICogZm9sbG93aW5nIGJ5IG9yZGVyIG9mIHByZWZlcmVuY2U6IGBwcm9jZXNzU2NhbGFyYCwgYHByb2Nlc3NWZWN0b3JgLFxuICAgKiBgcHJvY2Vzc1NpZ25hbGAuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcmV2U3RyZWFtUGFyYW1zIC0gYHN0cmVhbVBhcmFtc2Agb2YgdGhlIHByZXZpb3VzIG9wZXJhdG9yLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzU3RyZWFtUGFyYW1zfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9wYWdhdGVTdHJlYW1QYXJhbXN9XG4gICAqL1xuICBwcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdHJlYW1QYXJhbXMsIHByZXZTdHJlYW1QYXJhbXMpO1xuICAgIGNvbnN0IHByZXZGcmFtZVR5cGUgPSBwcmV2U3RyZWFtUGFyYW1zLmZyYW1lVHlwZTtcblxuICAgIHN3aXRjaCAocHJldkZyYW1lVHlwZSkge1xuICAgICAgY2FzZSAnc2NhbGFyJzpcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc1NjYWxhcilcbiAgICAgICAgICB0aGlzLnByb2Nlc3NGdW5jdGlvbiA9IHRoaXMucHJvY2Vzc1NjYWxhcjtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9jZXNzVmVjdG9yKVxuICAgICAgICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uID0gdGhpcy5wcm9jZXNzVmVjdG9yO1xuICAgICAgICBlbHNlIGlmICh0aGlzLnByb2Nlc3NTaWduYWwpXG4gICAgICAgICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24gPSB0aGlzLnByb2Nlc3NTaWduYWw7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSAtIG5vIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGZvdW5kYCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmVjdG9yJzpcbiAgICAgICAgaWYgKCEoJ3Byb2Nlc3NWZWN0b3InIGluIHRoaXMpKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IC0gXCJwcm9jZXNzVmVjdG9yXCIgaXMgbm90IGRlZmluZWRgKTtcblxuICAgICAgICB0aGlzLnByb2Nlc3NGdW5jdGlvbiA9IHRoaXMucHJvY2Vzc1ZlY3RvcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzaWduYWwnOlxuICAgICAgICBpZiAoISgncHJvY2Vzc1NpZ25hbCcgaW4gdGhpcykpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gLSBcInByb2Nlc3NTaWduYWxcIiBpcyBub3QgZGVmaW5lZGApO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uID0gdGhpcy5wcm9jZXNzU2lnbmFsO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGRlZmF1bHRzIHRvIHByb2Nlc3NGdW5jdGlvblxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBgdGhpcy5mcmFtZS5kYXRhYCBidWZmZXIgYW5kIGZvcndhcmQgdGhlIG9wZXJhdG9yJ3MgYHN0cmVhbVBhcmFtYFxuICAgKiB0byBhbGwgaXRzIG5leHQgb3BlcmF0b3JzLCBtdXN0IGJlIGNhbGxlZCBhdCB0aGUgZW5kIG9mIGFueVxuICAgKiBgcHJvY2Vzc1N0cmVhbVBhcmFtc2AgaW1wbGVtZW50YXRpb24uXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NTdHJlYW1QYXJhbXN9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3ByZXBhcmVTdHJlYW1QYXJhbXN9XG4gICAqL1xuICBwcm9wYWdhdGVTdHJlYW1QYXJhbXMoKSB7XG4gICAgdGhpcy5mcmFtZS5kYXRhID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLm5leHRPcHMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgdGhpcy5uZXh0T3BzW2ldLnByb2Nlc3NTdHJlYW1QYXJhbXModGhpcy5zdHJlYW1QYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZSB0aGUgcGFydGljdWxhciBsb2dpYyB0aGUgb3BlcmF0b3IgYXBwbGllcyB0byB0aGUgc3RyZWFtLlxuICAgKiBBY2NvcmRpbmcgdG8gdGhlIGZyYW1lIHR5cGUgb2YgdGhlIHByZXZpb3VzIG5vZGUsIHRoZSBtZXRob2QgY2FsbHMgb25lXG4gICAqIG9mIHRoZSBmb2xsb3dpbmcgbWV0aG9kIGBwcm9jZXNzVmVjdG9yYCwgYHByb2Nlc3NTaWduYWxgIG9yIGBwcm9jZXNzU2NhbGFyYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZnJhbWUgLSBGcmFtZSAodGltZSwgZGF0YSwgYW5kIG1ldGFkYXRhKSBhcyBnaXZlbiBieSB0aGVcbiAgICogIHByZXZpb3VzIG9wZXJhdG9yLiBUaGUgaW5jb21taW5nIGZyYW1lIHNob3VsZCBuZXZlciBiZSBtb2RpZmllZCBieVxuICAgKiAgdGhlIG9wZXJhdG9yLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcmVwYXJlRnJhbWV9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb3BhZ2F0ZUZyYW1lfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzU3RyZWFtUGFyYW1zfVxuICAgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgdGhpcy5wcmVwYXJlRnJhbWUoKTtcblxuICAgIC8vIGZyYW1lVGltZSBhbmQgZnJhbWVNZXRhZGF0YSBkZWZhdWx0cyB0byBpZGVudGl0eVxuICAgIHRoaXMuZnJhbWUudGltZSA9IGZyYW1lLnRpbWU7XG4gICAgdGhpcy5mcmFtZS5tZXRhZGF0YSA9IGZyYW1lLm1ldGFkYXRhO1xuXG4gICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24oZnJhbWUpO1xuICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb2ludGVyIHRvIHRoZSBtZXRob2QgY2FsbGVkIGluIGBwcm9jZXNzRnJhbWVgIGFjY29yZGluZyB0byB0aGVcbiAgICogZnJhbWUgdHlwZSBvZiB0aGUgcHJldmlvdXMgb3BlcmF0b3IuIElzIGR5bmFtaWNhbGx5IGFzc2lnbmVkIGluXG4gICAqIGBwcmVwYXJlU3RyZWFtUGFyYW1zYC5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJlcGFyZVN0cmVhbVBhcmFtc31cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc0ZyYW1lfVxuICAgKi9cbiAgcHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKSB7XG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbW1vbiBsb2dpYyB0byBwZXJmb3JtIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGBwcm9jZXNzRnJhbWVgLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzRnJhbWV9XG4gICAqL1xuICBwcmVwYXJlRnJhbWUoKSB7XG4gICAgaWYgKHRoaXMuX3JlaW5pdCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgc3RyZWFtUGFyYW1zID0gdGhpcy5wcmV2T3AgIT09IG51bGwgPyB0aGlzLnByZXZPcC5zdHJlYW1QYXJhbXMgOiB7fTtcbiAgICAgIHRoaXMuaW5pdFN0cmVhbShzdHJlYW1QYXJhbXMpO1xuICAgICAgdGhpcy5fcmVpbml0ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcndhcmQgdGhlIGN1cnJlbnQgYGZyYW1lYCB0byB0aGUgbmV4dCBvcGVyYXRvcnMsIGlzIGNhbGxlZCBhdCB0aGUgZW5kIG9mXG4gICAqIGBwcm9jZXNzRnJhbWVgLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzRnJhbWV9XG4gICAqL1xuICBwcm9wYWdhdGVGcmFtZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubmV4dE9wcy5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgICB0aGlzLm5leHRPcHNbaV0ucHJvY2Vzc0ZyYW1lKHRoaXMuZnJhbWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VMZm87XG5cbiIsImV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJyV2ZXJzaW9uJSc7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgQmFzZUxmbyB9IGZyb20gJy4vQmFzZUxmbyc7XG4iLCJpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG5cbmNvbnN0IGV2ZW50SW4gPSBuZXcgbGZvLnNvdXJjZS5FdmVudEluKHtcbiAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAgZnJhbWVTaXplOiAzLFxuICBmcmFtZVJhdGU6IDIwLFxufSk7XG5cbmNvbnN0IGJwZlJhdyA9IG5ldyBsZm8uc2luay5CcGZEaXNwbGF5KHtcbiAgY2FudmFzOiAnI3NlbnNvcnMtcmF3JyxcbiAgbWluOiAtMTAsXG4gIG1heDogMTAsXG4gIGR1cmF0aW9uOiAxMCxcbn0pO1xuXG5jb25zdCBiaXF1YWQgPSBuZXcgbGZvLm9wZXJhdG9yLkJpcXVhZCh7XG4gIHR5cGU6ICdsb3dwYXNzJyxcbiAgZjA6IDAuNSxcbn0pO1xuXG5jb25zdCBicGZGaWx0ZXJlZCA9IG5ldyBsZm8uc2luay5CcGZEaXNwbGF5KHtcbiAgY2FudmFzOiAnI3NlbnNvcnMtZmlsdGVyZWQnLFxuICBtaW46IC0xMCxcbiAgbWF4OiAxMCxcbiAgZHVyYXRpb246IDEwLFxufSk7XG5cbmV2ZW50SW4uY29ubmVjdChicGZSYXcpO1xuZXZlbnRJbi5jb25uZWN0KGJpcXVhZCk7XG5iaXF1YWQuY29ubmVjdChicGZGaWx0ZXJlZCk7XG5ldmVudEluLnN0YXJ0KCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2Vtb3Rpb24nLCAoZSkgPT4ge1xuICBjb25zdCB7IHgsIHksIHogfSA9IGUuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eTtcbiAgZXZlbnRJbi5wcm9jZXNzKG51bGwsIFt4LCB5LCB6XSk7XG59LCBmYWxzZSk7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMTBcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLWZpbml0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRQcm90b3R5cGVPZik7XG5cbnZhciBfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvclwiKTtcblxudmFyIF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIGRlc2MgPSAoMCwgX2dldE93blByb3BlcnR5RGVzY3JpcHRvcjIuZGVmYXVsdCkob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShvYmplY3QpO1xuXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7XG4gICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGdldHRlciA9IGRlc2MuZ2V0O1xuXG4gICAgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKTtcblxudmFyIF9zZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoc3VwZXJDbGFzcykpKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9ICgwLCBfY3JlYXRlMi5kZWZhdWx0KShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0ID8gKDAsIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICgodHlwZW9mIGNhbGwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNhbGwpKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5tYXRoLmxvZzEwJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5NYXRoLmxvZzEwOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm51bWJlci5pcy1maW5pdGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk51bWJlci5pc0Zpbml0ZTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgcmV0dXJuICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmdldFByb3RvdHlwZU9mOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9OyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59OyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgcmVzdWx0ICAgICA9IGdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSBwSUUuZlxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlOyIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247IiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBwSUUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIGdPUEQgICAgICAgICAgID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCl7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTsiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTsiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzOyIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07IiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59OyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59OyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlOyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvcmUgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpOyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTsiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07IiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59OyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59OyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJ2YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwge3ZhbHVlOiB3a3NFeHQuZihuYW1lKX0pO1xufTsiLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTsiLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTsiLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpXG4gICwgc3RlcCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpOyIsIi8vIDIwLjIuMi4yMSBNYXRoLmxvZzEwKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGxvZzEwOiBmdW5jdGlvbiBsb2cxMCh4KXtcbiAgICByZXR1cm4gTWF0aC5sb2coeCkgLyBNYXRoLkxOMTA7XG4gIH1cbn0pOyIsIi8vIDIwLjEuMi4yIE51bWJlci5pc0Zpbml0ZShudW1iZXIpXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBfaXNGaW5pdGUgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5pc0Zpbml0ZTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7XG4gIGlzRmluaXRlOiBmdW5jdGlvbiBpc0Zpbml0ZShpdCl7XG4gICAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnbnVtYmVyJyAmJiBfaXNGaW5pdGUoaXQpO1xuICB9XG59KTsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyl9KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpfSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7IiwiLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxudmFyIHRvSU9iamVjdCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG9JT2JqZWN0KGl0KSwga2V5KTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKGl0KXtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTsiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXR9KTsiLCIiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIHdrc0RlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAka2V5cyAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpOyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn0iXX0=
