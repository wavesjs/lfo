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

},{"../common/operator/_namespace":37,"../core":47,"./sink/_namespace":13,"./source/_namespace":17,"./utils/_namespace":19}],4:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/assign":118,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/get":130,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],5:[function(require,module,exports){
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

},{"../utils/display-utils":20,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],6:[function(require,module,exports){
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

},{"../utils/display-utils":20,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],7:[function(require,module,exports){
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

},{"../utils/display-utils":20,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],8:[function(require,module,exports){
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
};

/**
 * Send an lfo frame as a socket message to a `node.source.SocketReceive`
 * instance.
 *
 * @experimental
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

},{"../../common/utils/wsUtils":44,"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/core-js/promise":124,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/get":130,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],9:[function(require,module,exports){
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

},{"../../common/operator/Fft":23,"../utils/display-utils":20,"./BaseDisplay":4,"babel-runtime/core-js/math/log10":116,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],10:[function(require,module,exports){
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

},{"../utils/display-utils":20,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],11:[function(require,module,exports){
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

},{"../../common/operator/Rms":32,"./BaseDisplay":4,"babel-runtime/core-js/math/log10":116,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],12:[function(require,module,exports){
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

},{"../../common/operator/MinMax":28,"../../common/operator/Rms":32,"../utils/display-utils":20,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],13:[function(require,module,exports){
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

},{"../../common/sink/Bridge":38,"../../common/sink/DataRecorder":39,"../../common/sink/Logger":40,"../../common/sink/SignalRecorder":41,"./BaseDisplay":4,"./BpfDisplay":5,"./MarkerDisplay":6,"./SignalDisplay":7,"./SocketSend":8,"./SpectrumDisplay":9,"./TraceDisplay":10,"./VuMeterDisplay":11,"./WaveformDisplay":12}],14:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"../../core/SourceMixin":46,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/defineProperty":129,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],15:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"../../core/SourceMixin":46,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],16:[function(require,module,exports){
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
};

/**
 * Receive an lfo frame as a socket message from a `node.sink.SocketSend`
 * instance.
 *
 * @experimental
 * @todo - handle init / start properly.
 */

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

},{"../../common/utils/wsUtils":44,"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/core-js/promise":124,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],17:[function(require,module,exports){
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

},{"../../common/source/EventIn":42,"./AudioInBuffer":14,"./AudioInNode":15,"./SocketReceive":16}],18:[function(require,module,exports){
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

},{"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128}],19:[function(require,module,exports){
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

},{"../../common/utils/windows":43,"./DisplaySync":18}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],22:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],23:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"../utils/windows":43,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],24:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/get":130,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],25:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],26:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/math/log10":116,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],27:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"./Dct":22,"./Fft":23,"./Mel":26,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],28:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],29:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/get":130,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],30:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/get":130,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],31:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],32:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],33:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"./MovingAverage":29,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/get":130,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],34:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],35:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/get":130,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],36:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],37:[function(require,module,exports){
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

},{"./Biquad":21,"./Dct":22,"./Fft":23,"./Magnitude":24,"./MeanStddev":25,"./Mel":26,"./Mfcc":27,"./MinMax":28,"./MovingAverage":29,"./MovingMedian":30,"./OnOff":31,"./Rms":32,"./Segmenter":33,"./Select":34,"./Slicer":35,"./Yin":36}],38:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],39:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],40:[function(require,module,exports){
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
 * import * as lfo from 'waves-lfo/common';
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],41:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],42:[function(require,module,exports){
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

},{"../../core/BaseLfo":45,"../../core/SourceMixin":46,"_process":106,"babel-runtime/core-js/number/is-finite":117,"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{"babel-runtime/core-js/json/stringify":115}],45:[function(require,module,exports){
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
     * Return a promise that resolve when the module is ready to be consumed.
     * Some modules have an async behavior at initialization and thus could
     * be not ready to be consumed when the graph starts.
     * A module should be consider as initialized when all next modules (children)
     * are themselves initialized. The event bubbles up from sinks to sources.
     * When all its next operators are ready, a source can consider the whole graph
     * as ready and then accept incoming.
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

},{"babel-runtime/core-js/object/assign":118,"babel-runtime/core-js/promise":124,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"parameters":2}],46:[function(require,module,exports){
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
       * @abstract
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
       * @abstract
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
       * @abstract
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

},{"babel-runtime/core-js/object/get-prototype-of":122,"babel-runtime/core-js/promise":124,"babel-runtime/helpers/classCallCheck":127,"babel-runtime/helpers/createClass":128,"babel-runtime/helpers/inherits":131,"babel-runtime/helpers/possibleConstructorReturn":132}],47:[function(require,module,exports){
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

var version = exports.version = '1.0.0';

},{"./BaseLfo":45,"./SourceMixin":46}],48:[function(require,module,exports){
'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _client = require('waves-lfo/client');

var lfo = _interopRequireWildcard(_client);

var _motionInput = require('motion-input');

var _motionInput2 = _interopRequireDefault(_motionInput);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $container = document.querySelector('#container');

// source part of the application (mobile)
function initSource(inputModule) {

  var eventIn = new lfo.source.EventIn({
    frameType: 'vector',
    frameSize: 3,
    frameRate: 1
  });

  var socketSend = new lfo.sink.SocketSend({
    port: 3000
  });

  var template = function template(frame) {
    return '\n      <p>time: ' + frame.time + '</p>\n      <ul>\n        <li>alpha: ' + frame.data[0] + '</li>\n        <li>beta: ' + frame.data[1] + '</li>\n        <li>gamma: ' + frame.data[2] + '</li>\n      </ul>\n    ';
  };

  var bridge = new lfo.sink.Bridge({
    processFrame: function processFrame(frame) {
      var html = template(frame);
      $container.innerHTML = html;
    }
  });

  eventIn.connect(socketSend);
  eventIn.connect(bridge);

  eventIn.init().then(function () {
    eventIn.start();

    inputModule.addListener(function (data) {
      var now = window.performance.now() / 1000;
      eventIn.process(now, data);
    });
  });
}

// sink part of the application (laptop)
function initSink() {
  // back from server
  var socketReceive = new lfo.source.SocketReceive({
    port: 8000
  });

  var bpfDisplay = new lfo.sink.BpfDisplay({
    width: 600,
    height: 400,
    container: $container,
    duration: 6,
    min: -180,
    max: 360
  });

  // const loggerReceive = new lfo.sink.Logger({
  //   data: true,
  //   time: true,
  // });

  // socketReceive.connect(loggerReceive);
  socketReceive.connect(bpfDisplay);
}

window.addEventListener('load', function () {
  var hash = window.location.hash;

  if (hash === '#source') {
    _motionInput2.default.init(['orientation']).then(function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 1),
          inputModule = _ref2[0];

      if (inputModule.isValid) initSource(inputModule);else alert('This client should be run on: a mobile device');
    });
  } else {
    initSink();
  }
});

},{"babel-runtime/helpers/slicedToArray":51,"motion-input":113,"waves-lfo/client":3}],49:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":52}],50:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":53}],51:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/get-iterator":49,"../core-js/is-iterable":50}],52:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":101,"../modules/es6.string.iterator":104,"../modules/web.dom.iterable":105}],53:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');
},{"../modules/core.is-iterable":102,"../modules/es6.string.iterator":104,"../modules/web.dom.iterable":105}],54:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],55:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],56:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":74}],57:[function(require,module,exports){
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
},{"./_to-index":92,"./_to-iobject":94,"./_to-length":95}],58:[function(require,module,exports){
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
},{"./_cof":59,"./_wks":99}],59:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],60:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],61:[function(require,module,exports){
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
},{"./_a-function":54}],62:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],63:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":67}],64:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":68,"./_is-object":74}],65:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],66:[function(require,module,exports){
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
},{"./_core":60,"./_ctx":61,"./_global":68,"./_hide":70}],67:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],68:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],69:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],70:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":63,"./_object-dp":81,"./_property-desc":86}],71:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":68}],72:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":63,"./_dom-create":64,"./_fails":67}],73:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":59}],74:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],75:[function(require,module,exports){
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
},{"./_hide":70,"./_object-create":80,"./_property-desc":86,"./_set-to-string-tag":88,"./_wks":99}],76:[function(require,module,exports){
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
},{"./_export":66,"./_has":69,"./_hide":70,"./_iter-create":75,"./_iterators":78,"./_library":79,"./_object-gpo":83,"./_redefine":87,"./_set-to-string-tag":88,"./_wks":99}],77:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],78:[function(require,module,exports){
module.exports = {};
},{}],79:[function(require,module,exports){
module.exports = true;
},{}],80:[function(require,module,exports){
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

},{"./_an-object":56,"./_dom-create":64,"./_enum-bug-keys":65,"./_html":71,"./_object-dps":82,"./_shared-key":89}],81:[function(require,module,exports){
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
},{"./_an-object":56,"./_descriptors":63,"./_ie8-dom-define":72,"./_to-primitive":97}],82:[function(require,module,exports){
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
},{"./_an-object":56,"./_descriptors":63,"./_object-dp":81,"./_object-keys":85}],83:[function(require,module,exports){
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
},{"./_has":69,"./_shared-key":89,"./_to-object":96}],84:[function(require,module,exports){
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
},{"./_array-includes":57,"./_has":69,"./_shared-key":89,"./_to-iobject":94}],85:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":65,"./_object-keys-internal":84}],86:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],87:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":70}],88:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":69,"./_object-dp":81,"./_wks":99}],89:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":90,"./_uid":98}],90:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":68}],91:[function(require,module,exports){
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
},{"./_defined":62,"./_to-integer":93}],92:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":93}],93:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],94:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":62,"./_iobject":73}],95:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":93}],96:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":62}],97:[function(require,module,exports){
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
},{"./_is-object":74}],98:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],99:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":68,"./_shared":90,"./_uid":98}],100:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":58,"./_core":60,"./_iterators":78,"./_wks":99}],101:[function(require,module,exports){
var anObject = require('./_an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./_an-object":56,"./_core":60,"./core.get-iterator-method":100}],102:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./_classof":58,"./_core":60,"./_iterators":78,"./_wks":99}],103:[function(require,module,exports){
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
},{"./_add-to-unscopables":55,"./_iter-define":76,"./_iter-step":77,"./_iterators":78,"./_to-iobject":94}],104:[function(require,module,exports){
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
},{"./_iter-define":76,"./_string-at":91}],105:[function(require,module,exports){
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
},{"./_global":68,"./_hide":70,"./_iterators":78,"./_wks":99,"./es6.array.iterator":103}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InputModule2 = require('./InputModule');

var _InputModule3 = _interopRequireDefault(_InputModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * `DOMEventSubmodule` class.
 * The `DOMEventSubmodule` class allows to instantiate modules that provide
 * unified values (such as `AccelerationIncludingGravity`, `Acceleration`,
 * `RotationRate`, `Orientation`, `OrientationAlt) from the `devicemotion`
 * or `deviceorientation` DOM events.
 *
 * @class DOMEventSubmodule
 * @extends InputModule
 */
var DOMEventSubmodule = function (_InputModule) {
  _inherits(DOMEventSubmodule, _InputModule);

  /**
   * Creates a `DOMEventSubmodule` module instance.
   *
   * @constructor
   * @param {DeviceMotionModule|DeviceOrientationModule} DOMEventModule - The parent DOM event module.
   * @param {string} eventType - The name of the submodule / event (*e.g.* 'acceleration' or 'orientationAlt').
   * @see DeviceMotionModule
   * @see DeviceOrientationModule
   */
  function DOMEventSubmodule(DOMEventModule, eventType) {
    _classCallCheck(this, DOMEventSubmodule);

    /**
     * The DOM event parent module from which this module gets the raw values.
     *
     * @this DOMEventSubmodule
     * @type {DeviceMotionModule|DeviceOrientationModule}
     * @constant
     */
    var _this = _possibleConstructorReturn(this, (DOMEventSubmodule.__proto__ || Object.getPrototypeOf(DOMEventSubmodule)).call(this, eventType));

    _this.DOMEventModule = DOMEventModule;

    /**
     * Raw values coming from the `devicemotion` event sent by this module.
     *
     * @this DOMEventSubmodule
     * @type {number[]}
     * @default [0, 0, 0]
     */
    _this.event = [0, 0, 0];

    /**
     * Compass heading reference (iOS devices only, `Orientation` and `OrientationAlt` submodules only).
     *
     * @this DOMEventSubmodule
     * @type {number}
     * @default null
     */
    _this._webkitCompassHeadingReference = null;
    return _this;
  }

  /**
   * Initializes of the module.
   *
   * @return {Promise}
   */


  _createClass(DOMEventSubmodule, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      // Indicate to the parent module that this event is required
      this.DOMEventModule.required[this.eventType] = true;

      // If the parent event has not been initialized yet, initialize it
      var DOMEventPromise = this.DOMEventModule.promise;
      if (!DOMEventPromise) DOMEventPromise = this.DOMEventModule.init();

      return DOMEventPromise.then(function (module) {
        return _this2;
      });
    }
  }]);

  return DOMEventSubmodule;
}(_InputModule3.default);

exports.default = DOMEventSubmodule;

},{"./InputModule":111}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _InputModule2 = require('./InputModule');

var _InputModule3 = _interopRequireDefault(_InputModule2);

var _DOMEventSubmodule = require('./DOMEventSubmodule');

var _DOMEventSubmodule2 = _interopRequireDefault(_DOMEventSubmodule);

var _MotionInput = require('./MotionInput');

var _MotionInput2 = _interopRequireDefault(_MotionInput);

var _platform = require('platform');

var _platform2 = _interopRequireDefault(_platform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Gets the current local time in seconds.
 * Uses `window.performance.now()` if available, and `Date.now()` otherwise.
 *
 * @return {number}
 */
function getLocalTime() {
  if (window.performance) return window.performance.now() / 1000;
  return Date.now() / 1000;
}

/**
 * `DeviceMotion` module singleton.
 * The `DeviceMotionModule` singleton provides the raw values
 * of the acceleration including gravity, acceleration, and rotation
 * rate provided by the `DeviceMotion` event.
 * It also instantiate the `AccelerationIncludingGravity`,
 * `Acceleration` and `RotationRate` submodules that unify those values
 * across platforms by making them compliant with {@link
 * http://www.w3.org/TR/orientation-event/|the W3C standard}.
 * When raw values are not provided by the sensors, this modules tries
 * to recalculate them from available values:
 * - `acceleration` is calculated from `accelerationIncludingGravity`
 *   with a high-pass filter;
 * - (coming soon — waiting for a bug on Chrome to be resolved)
 *   `rotationRate` is calculated from `orientation`.
 *
 * @class DeviceMotionModule
 * @extends InputModule
 */

var DeviceMotionModule = function (_InputModule) {
  _inherits(DeviceMotionModule, _InputModule);

  /**
   * Creates the `DeviceMotion` module instance.
   *
   * @constructor
   */
  function DeviceMotionModule() {
    _classCallCheck(this, DeviceMotionModule);

    /**
     * Raw values coming from the `devicemotion` event sent by this module.
     *
     * @this DeviceMotionModule
     * @type {number[]}
     * @default [null, null, null, null, null, null, null, null, null]
     */
    var _this = _possibleConstructorReturn(this, (DeviceMotionModule.__proto__ || Object.getPrototypeOf(DeviceMotionModule)).call(this, 'devicemotion'));

    _this.event = [null, null, null, null, null, null, null, null, null];

    /**
     * The `AccelerationIncludingGravity` module.
     * Provides unified values of the acceleration including gravity.
     *
     * @this DeviceMotionModule
     * @type {DOMEventSubmodule}
     */
    _this.accelerationIncludingGravity = new _DOMEventSubmodule2.default(_this, 'accelerationIncludingGravity');

    /**
     * The `Acceleration` submodule.
     * Provides unified values of the acceleration.
     * Estimates the acceleration values from `accelerationIncludingGravity`
     * raw values if the acceleration raw values are not available on the
     * device.
     *
     * @this DeviceMotionModule
     * @type {DOMEventSubmodule}
     */
    _this.acceleration = new _DOMEventSubmodule2.default(_this, 'acceleration');

    /**
     * The `RotationRate` submodule.
     * Provides unified values of the rotation rate.
     * (coming soon, waiting for a bug on Chrome to be resolved)
     * Estimates the rotation rate values from `orientation` values if
     * the rotation rate raw values are not available on the device.
     *
     * @this DeviceMotionModule
     * @type {DOMEventSubmodule}
     */
    _this.rotationRate = new _DOMEventSubmodule2.default(_this, 'rotationRate');

    /**
     * Required submodules / events.
     *
     * @this DeviceMotionModule
     * @type {object}
     * @property {bool} accelerationIncludingGravity - Indicates whether the `accelerationIncludingGravity` unified values are required or not (defaults to `false`).
     * @property {bool} acceleration - Indicates whether the `acceleration` unified values are required or not (defaults to `false`).
     * @property {bool} rotationRate - Indicates whether the `rotationRate` unified values are required or not (defaults to `false`).
     */
    _this.required = {
      accelerationIncludingGravity: false,
      acceleration: false,
      rotationRate: false
    };

    /**
     * Resolve function of the module's promise.
     *
     * @this DeviceMotionModule
     * @type {function}
     * @default null
     * @see DeviceMotionModule#init
     */
    _this._promiseResolve = null;

    /**
     * Unifying factor of the motion data values (`1` on Android, `-1` on iOS).
     *
     * @this DeviceMotionModule
     * @type {number}
     */
    _this._unifyMotionData = _platform2.default.os.family === 'iOS' ? -1 : 1;

    /**
     * Unifying factor of the period (`0.001` on Android, `1` on iOS).
     *
     * @this DeviceMotionModule
     * @type {number}
     */
    _this._unifyPeriod = _platform2.default.os.family === 'Android' ? 0.001 : 1;

    /**
     * Acceleration calculated from the `accelerationIncludingGravity` raw values.
     *
     * @this DeviceMotionModule
     * @type {number[]}
     * @default [0, 0, 0]
     */
    _this._calculatedAcceleration = [0, 0, 0];

    /**
     * Time constant (half-life) of the high-pass filter used to smooth the acceleration values calculated from the acceleration including gravity raw values (in seconds).
     *
     * @this DeviceMotionModule
     * @type {number}
     * @default 0.1
     * @constant
     */
    _this._calculatedAccelerationTimeConstant = 0.1;

    /**
     * Latest `accelerationIncludingGravity` raw value, used in the high-pass filter to calculate the acceleration (if the `acceleration` values are not provided by `'devicemotion'`).
     *
     * @this DeviceMotionModule
     * @type {number[]}
     * @default [0, 0, 0]
     */
    _this._lastAccelerationIncludingGravity = [0, 0, 0];

    /**
     * Rotation rate calculated from the orientation values.
     *
     * @this DeviceMotionModule
     * @type {number[]}
     * @default [0, 0, 0]
     */
    _this._calculatedRotationRate = [0, 0, 0];

    /**
     * Latest orientation value, used to calculate the rotation rate  (if the `rotationRate` values are not provided by `'devicemotion'`).
     *
     * @this DeviceMotionModule
     * @type {number[]}
     * @default [0, 0, 0]
     */
    _this._lastOrientation = [0, 0, 0];

    /**
     * Latest orientation timestamps, used to calculate the rotation rate (if the `rotationRate` values are not provided by `'devicemotion'`).
     *
     * @this DeviceMotionModule
     * @type {number[]}
     * @default [0, 0, 0]
     */
    _this._lastOrientationTimestamp = null;

    _this._processFunction = null;
    _this._process = _this._process.bind(_this);
    _this._devicemotionCheck = _this._devicemotionCheck.bind(_this);
    _this._devicemotionListener = _this._devicemotionListener.bind(_this);
    return _this;
  }

  /**
   * Decay factor of the high-pass filter used to calculate the acceleration from the `accelerationIncludingGravity` raw values.
   *
   * @type {number}
   * @readonly
   */


  _createClass(DeviceMotionModule, [{
    key: '_devicemotionCheck',


    /**
     * Sensor check on initialization of the module.
     * This method:
     * - checks whether the `accelerationIncludingGravity`, the `acceleration`,
     *   and the `rotationRate` values are valid or not;
     * - gets the period of the `'devicemotion'` event and sets the period of
     *   the `AccelerationIncludingGravity`, `Acceleration`, and `RotationRate`
     *   submodules;
     * - (in the case where acceleration raw values are not provided)
     *   indicates whether the acceleration can be calculated from the
     *   `accelerationIncludingGravity` unified values or not.
     *
     * @param {DeviceMotionEvent} e - The first `'devicemotion'` event caught.
     */
    value: function _devicemotionCheck(e) {
      this.isProvided = true;
      this.period = e.interval / 1000;

      // Sensor availability for the acceleration including gravity
      this.accelerationIncludingGravity.isProvided = e.accelerationIncludingGravity && typeof e.accelerationIncludingGravity.x === 'number' && typeof e.accelerationIncludingGravity.y === 'number' && typeof e.accelerationIncludingGravity.z === 'number';
      this.accelerationIncludingGravity.period = e.interval * this._unifyPeriod;

      // Sensor availability for the acceleration
      this.acceleration.isProvided = e.acceleration && typeof e.acceleration.x === 'number' && typeof e.acceleration.y === 'number' && typeof e.acceleration.z === 'number';
      this.acceleration.period = e.interval * this._unifyPeriod;

      // Sensor availability for the rotation rate
      this.rotationRate.isProvided = e.rotationRate && typeof e.rotationRate.alpha === 'number' && typeof e.rotationRate.beta === 'number' && typeof e.rotationRate.gamma === 'number';
      this.rotationRate.period = e.interval * this._unifyPeriod;

      // now that the sensors are chacked replace the process function with the
      // proper listener
      this._processFunction = this._devicemotionListener;

      // If acceleration is not provided by raw sensors, indicate whether it
      // can be calculated with `accelerationIncludingGravity` or not
      if (!this.acceleration.isProvided) this.acceleration.isCalculated = this.accelerationIncludingGravity.isProvided;

      // WARNING
      // The lines of code below are commented because of a bug of Chrome
      // on some Android devices, where 'devicemotion' events are not sent
      // or caught if the listener is set up after a 'deviceorientation'
      // listener. Here, the _tryOrientationFallback method would add a
      // 'deviceorientation' listener and block all subsequent 'devicemotion'
      // events on these devices. Comments will be removed once the bug of
      // Chrome is corrected.

      // if (this.required.rotationRate && !this.rotationRate.isProvided)
      //   this._tryOrientationFallback();
      // else
      this._promiseResolve(this);
    }

    /**
     * `'devicemotion'` event callback.
     * This method emits an event with the raw `'devicemotion'` values, and emits
     * events with the unified `accelerationIncludingGravity`, `acceleration`,
     * and / or `rotationRate` values if they are required.
     *
     * @param {DeviceMotionEvent} e - `'devicemotion'` event the values are calculated from.
     */

  }, {
    key: '_devicemotionListener',
    value: function _devicemotionListener(e) {
      // 'devicemotion' event (raw values)
      if (this.listeners.size > 0) this._emitDeviceMotionEvent(e);

      // 'acceleration' event (unified values)
      if (this.accelerationIncludingGravity.listeners.size > 0 && this.required.accelerationIncludingGravity && this.accelerationIncludingGravity.isValid) {
        this._emitAccelerationIncludingGravityEvent(e);
      }

      // 'accelerationIncludingGravity' event (unified values)
      // the fallback calculation of the acceleration happens in the
      //  `_emitAcceleration` method, so we check if this.acceleration.isValid
      if (this.acceleration.listeners.size > 0 && this.required.acceleration && this.acceleration.isValid) {
        this._emitAccelerationEvent(e);
      }

      // 'rotationRate' event (unified values)
      // the fallback calculation of the rotation rate does NOT happen in the
      // `_emitRotationRate` method, so we only check if this.rotationRate.isProvided
      if (this.rotationRate.listeners.size > 0 && this.required.rotationRate && this.rotationRate.isProvided) {
        this._emitRotationRateEvent(e);
      }
    }

    /**
     * Emits the `'devicemotion'` raw values.
     *
     * @param {DeviceMotionEvent} e - `'devicemotion'` event the values are calculated from.
     */

  }, {
    key: '_emitDeviceMotionEvent',
    value: function _emitDeviceMotionEvent(e) {
      var outEvent = this.event;

      if (e.accelerationIncludingGravity) {
        outEvent[0] = e.accelerationIncludingGravity.x;
        outEvent[1] = e.accelerationIncludingGravity.y;
        outEvent[2] = e.accelerationIncludingGravity.z;
      }

      if (e.acceleration) {
        outEvent[3] = e.acceleration.x;
        outEvent[4] = e.acceleration.y;
        outEvent[5] = e.acceleration.z;
      }

      if (e.rotationRate) {
        outEvent[6] = e.rotationRate.alpha;
        outEvent[7] = e.rotationRate.beta;
        outEvent[8] = e.rotationRate.gamma;
      }

      this.emit(outEvent);
    }

    /**
     * Emits the `accelerationIncludingGravity` unified values.
     *
     * @param {DeviceMotionEvent} e - `'devicemotion'` event the values are calculated from.
     */

  }, {
    key: '_emitAccelerationIncludingGravityEvent',
    value: function _emitAccelerationIncludingGravityEvent(e) {
      var outEvent = this.accelerationIncludingGravity.event;

      outEvent[0] = e.accelerationIncludingGravity.x * this._unifyMotionData;
      outEvent[1] = e.accelerationIncludingGravity.y * this._unifyMotionData;
      outEvent[2] = e.accelerationIncludingGravity.z * this._unifyMotionData;

      this.accelerationIncludingGravity.emit(outEvent);
    }

    /**
     * Emits the `acceleration` unified values.
     * When the `acceleration` raw values are not available, the method
     * also calculates the acceleration from the
     * `accelerationIncludingGravity` raw values.
     *
     * @param {DeviceMotionEvent} e - The `'devicemotion'` event.
     */

  }, {
    key: '_emitAccelerationEvent',
    value: function _emitAccelerationEvent(e) {
      var outEvent = this.acceleration.event;

      if (this.acceleration.isProvided) {
        // If raw acceleration values are provided
        outEvent[0] = e.acceleration.x * this._unifyMotionData;
        outEvent[1] = e.acceleration.y * this._unifyMotionData;
        outEvent[2] = e.acceleration.z * this._unifyMotionData;
      } else if (this.accelerationIncludingGravity.isValid) {
        // Otherwise, if accelerationIncludingGravity values are provided,
        // estimate the acceleration with a high-pass filter
        var accelerationIncludingGravity = [e.accelerationIncludingGravity.x * this._unifyMotionData, e.accelerationIncludingGravity.y * this._unifyMotionData, e.accelerationIncludingGravity.z * this._unifyMotionData];
        var k = this._calculatedAccelerationDecay;

        // High-pass filter to estimate the acceleration (without the gravity)
        this._calculatedAcceleration[0] = (1 + k) * 0.5 * (accelerationIncludingGravity[0] - this._lastAccelerationIncludingGravity[0]) + k * this._calculatedAcceleration[0];
        this._calculatedAcceleration[1] = (1 + k) * 0.5 * (accelerationIncludingGravity[1] - this._lastAccelerationIncludingGravity[1]) + k * this._calculatedAcceleration[1];
        this._calculatedAcceleration[2] = (1 + k) * 0.5 * (accelerationIncludingGravity[2] - this._lastAccelerationIncludingGravity[2]) + k * this._calculatedAcceleration[2];

        this._lastAccelerationIncludingGravity[0] = accelerationIncludingGravity[0];
        this._lastAccelerationIncludingGravity[1] = accelerationIncludingGravity[1];
        this._lastAccelerationIncludingGravity[2] = accelerationIncludingGravity[2];

        outEvent[0] = this._calculatedAcceleration[0];
        outEvent[1] = this._calculatedAcceleration[1];
        outEvent[2] = this._calculatedAcceleration[2];
      }

      this.acceleration.emit(outEvent);
    }

    /**
     * Emits the `rotationRate` unified values.
     *
     * @param {DeviceMotionEvent} e - `'devicemotion'` event the values are calculated from.
     */

  }, {
    key: '_emitRotationRateEvent',
    value: function _emitRotationRateEvent(e) {
      var outEvent = this.rotationRate.event;

      outEvent[0] = e.rotationRate.alpha;
      outEvent[1] = e.rotationRate.beta;
      outEvent[2] = e.rotationRate.gamma;

      // TODO(?): unify

      this.rotationRate.emit(outEvent);
    }

    /**
     * Calculates and emits the `rotationRate` unified values from the `orientation` values.
     *
     * @param {number[]} orientation - Latest `orientation` raw values.
     */

  }, {
    key: '_calculateRotationRateFromOrientation',
    value: function _calculateRotationRateFromOrientation(orientation) {
      var now = getLocalTime();
      var k = 0.8; // TODO: improve low pass filter (frames are not regular)
      var alphaIsValid = typeof orientation[0] === 'number';

      if (this._lastOrientationTimestamp) {
        var rAlpha = null;
        var rBeta = void 0;
        var rGamma = void 0;

        var alphaDiscontinuityFactor = 0;
        var betaDiscontinuityFactor = 0;
        var gammaDiscontinuityFactor = 0;

        var deltaT = now - this._lastOrientationTimestamp;

        if (alphaIsValid) {
          // alpha discontinuity (+360 -> 0 or 0 -> +360)
          if (this._lastOrientation[0] > 320 && orientation[0] < 40) alphaDiscontinuityFactor = 360;else if (this._lastOrientation[0] < 40 && orientation[0] > 320) alphaDiscontinuityFactor = -360;
        }

        // beta discontinuity (+180 -> -180 or -180 -> +180)
        if (this._lastOrientation[1] > 140 && orientation[1] < -140) betaDiscontinuityFactor = 360;else if (this._lastOrientation[1] < -140 && orientation[1] > 140) betaDiscontinuityFactor = -360;

        // gamma discontinuities (+180 -> -180 or -180 -> +180)
        if (this._lastOrientation[2] > 50 && orientation[2] < -50) gammaDiscontinuityFactor = 180;else if (this._lastOrientation[2] < -50 && orientation[2] > 50) gammaDiscontinuityFactor = -180;

        if (deltaT > 0) {
          // Low pass filter to smooth the data
          if (alphaIsValid) rAlpha = k * this._calculatedRotationRate[0] + (1 - k) * (orientation[0] - this._lastOrientation[0] + alphaDiscontinuityFactor) / deltaT;
          rBeta = k * this._calculatedRotationRate[1] + (1 - k) * (orientation[1] - this._lastOrientation[1] + betaDiscontinuityFactor) / deltaT;
          rGamma = k * this._calculatedRotationRate[2] + (1 - k) * (orientation[2] - this._lastOrientation[2] + gammaDiscontinuityFactor) / deltaT;

          this._calculatedRotationRate[0] = rAlpha;
          this._calculatedRotationRate[1] = rBeta;
          this._calculatedRotationRate[2] = rGamma;
        }

        // TODO: resample the emission rate to match the devicemotion rate
        this.rotationRate.emit(this._calculatedRotationRate);
      }

      this._lastOrientationTimestamp = now;
      this._lastOrientation[0] = orientation[0];
      this._lastOrientation[1] = orientation[1];
      this._lastOrientation[2] = orientation[2];
    }

    /**
     * Checks whether the rotation rate can be calculated from the `orientation` values or not.
     */

  }, {
    key: '_tryOrientationFallback',
    value: function _tryOrientationFallback() {
      var _this2 = this;

      _MotionInput2.default.requireModule('orientation').then(function (orientation) {
        if (orientation.isValid) {
          console.log("WARNING (motion-input): The 'devicemotion' event does not exists or does not provide rotation rate values in your browser, so the rotation rate of the device is estimated from the 'orientation', calculated from the 'deviceorientation' event. Since the compass might not be available, only `beta` and `gamma` angles may be provided (`alpha` would be null).");

          _this2.rotationRate.isCalculated = true;

          _MotionInput2.default.addListener('orientation', function (orientation) {
            _this2._calculateRotationRateFromOrientation(orientation);
          });
        }

        _this2._promiseResolve(_this2);
      });
    }
  }, {
    key: '_process',
    value: function _process(data) {
      this._processFunction(data);
    }

    /**
     * Initializes of the module.
     *
     * @return {promise}
     */

  }, {
    key: 'init',
    value: function init() {
      var _this3 = this;

      return _get(DeviceMotionModule.prototype.__proto__ || Object.getPrototypeOf(DeviceMotionModule.prototype), 'init', this).call(this, function (resolve) {
        _this3._promiseResolve = resolve;

        if (window.DeviceMotionEvent) {
          _this3._processFunction = _this3._devicemotionCheck;
          window.addEventListener('devicemotion', _this3._process);
        }

        // WARNING
        // The lines of code below are commented because of a bug of Chrome
        // on some Android devices, where 'devicemotion' events are not sent
        // or caught if the listener is set up after a 'deviceorientation'
        // listener. Here, the _tryOrientationFallback method would add a
        // 'deviceorientation' listener and block all subsequent 'devicemotion'
        // events on these devices. Comments will be removed once the bug of
        // Chrome is corrected.

        // else if (this.required.rotationRate)
        // this._tryOrientationFallback();

        else resolve(_this3);
      });
    }
  }, {
    key: '_calculatedAccelerationDecay',
    get: function get() {
      return Math.exp(-2 * Math.PI * this.accelerationIncludingGravity.period / this._calculatedAccelerationTimeConstant);
    }
  }]);

  return DeviceMotionModule;
}(_InputModule3.default);

exports.default = new DeviceMotionModule();

},{"./DOMEventSubmodule":107,"./InputModule":111,"./MotionInput":112,"platform":114}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DOMEventSubmodule = require('./DOMEventSubmodule');

var _DOMEventSubmodule2 = _interopRequireDefault(_DOMEventSubmodule);

var _InputModule2 = require('./InputModule');

var _InputModule3 = _interopRequireDefault(_InputModule2);

var _MotionInput = require('./MotionInput');

var _MotionInput2 = _interopRequireDefault(_MotionInput);

var _platform = require('platform');

var _platform2 = _interopRequireDefault(_platform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Converts degrees to radians.
 *
 * @param {number} deg - Angle in degrees.
 * @return {number}
 */
function degToRad(deg) {
  return deg * Math.PI / 180;
}

/**
 * Converts radians to degrees.
 *
 * @param {number} rad - Angle in radians.
 * @return {number}
 */
function radToDeg(rad) {
  return rad * 180 / Math.PI;
}

/**
 * Normalizes a 3 x 3 matrix.
 *
 * @param {number[]} m - Matrix to normalize, represented by an array of length 9.
 * @return {number[]}
 */
function normalize(m) {
  var det = m[0] * m[4] * m[8] + m[1] * m[5] * m[6] + m[2] * m[3] * m[7] - m[0] * m[5] * m[7] - m[1] * m[3] * m[8] - m[2] * m[4] * m[6];

  for (var i = 0; i < m.length; i++) {
    m[i] /= det;
  }return m;
}

/**
 * Converts a Euler angle `[alpha, beta, gamma]` to the W3C specification, where:
 * - `alpha` is in [0; +360[;
 * - `beta` is in [-180; +180[;
 * - `gamma` is in [-90; +90[.
 *
 * @param {number[]} eulerAngle - Euler angle to unify, represented by an array of length 3 (`[alpha, beta, gamma]`).
 * @see {@link http://www.w3.org/TR/orientation-event/}
 */
function unify(eulerAngle) {
  // Cf. W3C specification (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
  // and Euler angles Wikipedia page (http://en.wikipedia.org/wiki/Euler_angles).
  //
  // W3C convention: Tait–Bryan angles Z-X'-Y'', where:
  //   alpha is in [0; +360[,
  //   beta is in [-180; +180[,
  //   gamma is in [-90; +90[.

  var alphaIsValid = typeof eulerAngle[0] === 'number';

  var _alpha = alphaIsValid ? degToRad(eulerAngle[0]) : 0;
  var _beta = degToRad(eulerAngle[1]);
  var _gamma = degToRad(eulerAngle[2]);

  var cA = Math.cos(_alpha);
  var cB = Math.cos(_beta);
  var cG = Math.cos(_gamma);
  var sA = Math.sin(_alpha);
  var sB = Math.sin(_beta);
  var sG = Math.sin(_gamma);

  var alpha = void 0,
      beta = void 0,
      gamma = void 0;

  var m = [cA * cG - sA * sB * sG, -cB * sA, cA * sG + cG * sA * sB, cG * sA + cA * sB * sG, cA * cB, sA * sG - cA * cG * sB, -cB * sG, sB, cB * cG];
  normalize(m);

  // Since we want gamma in [-90; +90[, cG >= 0.
  if (m[8] > 0) {
    // Case 1: m[8] > 0 <=> cB > 0                 (and cG != 0)
    //                  <=> beta in ]-pi/2; +pi/2[ (and cG != 0)
    alpha = Math.atan2(-m[1], m[4]);
    beta = Math.asin(m[7]); // asin returns a number between -pi/2 and +pi/2 => OK
    gamma = Math.atan2(-m[6], m[8]);
  } else if (m[8] < 0) {
    // Case 2: m[8] < 0 <=> cB < 0                            (and cG != 0)
    //                  <=> beta in [-pi; -pi/2[ U ]+pi/2; +pi] (and cG != 0)

    // Since cB < 0 and cB is in m[1] and m[4], the point is flipped by 180 degrees.
    // Hence, we have to multiply both arguments of atan2 by -1 in order to revert
    // the point in its original position (=> another flip by 180 degrees).
    alpha = Math.atan2(m[1], -m[4]);
    beta = -Math.asin(m[7]);
    beta += beta >= 0 ? -Math.PI : Math.PI; // asin returns a number between -pi/2 and pi/2 => make sure beta in [-pi; -pi/2[ U ]+pi/2; +pi]
    gamma = Math.atan2(m[6], -m[8]); // same remark as for alpha, multiplication by -1
  } else {
    // Case 3: m[8] = 0 <=> cB = 0 or cG = 0
    if (m[6] > 0) {
      // Subcase 1: cG = 0 and cB > 0
      //            cG = 0 <=> sG = -1 <=> gamma = -pi/2 => m[6] = cB
      //            Hence, m[6] > 0 <=> cB > 0 <=> beta in ]-pi/2; +pi/2[
      alpha = Math.atan2(-m[1], m[4]);
      beta = Math.asin(m[7]); // asin returns a number between -pi/2 and +pi/2 => OK
      gamma = -Math.PI / 2;
    } else if (m[6] < 0) {
      // Subcase 2: cG = 0 and cB < 0
      //            cG = 0 <=> sG = -1 <=> gamma = -pi/2 => m[6] = cB
      //            Hence, m[6] < 0 <=> cB < 0 <=> beta in [-pi; -pi/2[ U ]+pi/2; +pi]
      alpha = Math.atan2(m[1], -m[4]); // same remark as for alpha in a case above
      beta = -Math.asin(m[7]);
      beta += beta >= 0 ? -Math.PI : Math.PI; // asin returns a number between -pi/2 and +pi/2 => make sure beta in [-pi; -pi/2[ U ]+pi/2; +pi]
      gamma = -Math.PI / 2;
    } else {
      // Subcase 3: cB = 0
      // In the case where cos(beta) = 0 (i.e. beta = -pi/2 or beta = pi/2),
      // we have the gimbal lock problem: in that configuration, only the angle
      // alpha + gamma (if beta = +pi/2) or alpha - gamma (if beta = -pi/2)
      // are uniquely defined: alpha and gamma can take an infinity of values.
      // For convenience, let's set gamma = 0 (and thus sin(gamma) = 0).
      // (As a consequence of the gimbal lock problem, there is a discontinuity
      // in alpha and gamma.)
      alpha = Math.atan2(m[3], m[0]);
      beta = m[7] > 0 ? Math.PI / 2 : -Math.PI / 2;
      gamma = 0;
    }
  }

  // atan2 returns a number between -pi and pi => make sure that alpha is in [0, 2*pi[.
  alpha += alpha < 0 ? 2 * Math.PI : 0;

  eulerAngle[0] = alphaIsValid ? radToDeg(alpha) : null;
  eulerAngle[1] = radToDeg(beta);
  eulerAngle[2] = radToDeg(gamma);
}

/**
 * Converts a Euler angle `[alpha, beta, gamma]` to a Euler angle where:
 * - `alpha` is in [0; +360[;
 * - `beta` is in [-90; +90[;
 * - `gamma` is in [-180; +180[.
 *
 * @param {number[]} eulerAngle - Euler angle to convert, represented by an array of length 3 (`[alpha, beta, gamma]`).
 */
function unifyAlt(eulerAngle) {
  // Convention here: Tait–Bryan angles Z-X'-Y'', where:
  //   alpha is in [0; +360[,
  //   beta is in [-90; +90[,
  //   gamma is in [-180; +180[.

  var alphaIsValid = typeof eulerAngle[0] === 'number';

  var _alpha = alphaIsValid ? degToRad(eulerAngle[0]) : 0;
  var _beta = degToRad(eulerAngle[1]);
  var _gamma = degToRad(eulerAngle[2]);

  var cA = Math.cos(_alpha);
  var cB = Math.cos(_beta);
  var cG = Math.cos(_gamma);
  var sA = Math.sin(_alpha);
  var sB = Math.sin(_beta);
  var sG = Math.sin(_gamma);

  var alpha = void 0,
      beta = void 0,
      gamma = void 0;

  var m = [cA * cG - sA * sB * sG, -cB * sA, cA * sG + cG * sA * sB, cG * sA + cA * sB * sG, cA * cB, sA * sG - cA * cG * sB, -cB * sG, sB, cB * cG];
  normalize(m);

  alpha = Math.atan2(-m[1], m[4]);
  alpha += alpha < 0 ? 2 * Math.PI : 0; // atan2 returns a number between -pi and +pi => make sure alpha is in [0, 2*pi[.
  beta = Math.asin(m[7]); // asin returns a number between -pi/2 and pi/2 => OK
  gamma = Math.atan2(-m[6], m[8]); // atan2 returns a number between -pi and +pi => OK

  eulerAngle[0] = alphaIsValid ? radToDeg(alpha) : null;
  eulerAngle[1] = radToDeg(beta);
  eulerAngle[2] = radToDeg(gamma);
}

/**
 * `DeviceOrientationModule` singleton.
 * The `DeviceOrientationModule` singleton provides the raw values
 * of the orientation provided by the `DeviceMotion` event.
 * It also instantiate the `Orientation` submodule that unifies those
 * values across platforms by making them compliant with {@link
 * http://www.w3.org/TR/orientation-event/|the W3C standard} (*i.e.*
 * the `alpha` angle between `0` and `360` degrees, the `beta` angle
 * between `-180` and `180` degrees, and `gamma` between `-90` and
 * `90` degrees), as well as the `OrientationAlt` submodules (with
 * the `alpha` angle between `0` and `360` degrees, the `beta` angle
 * between `-90` and `90` degrees, and `gamma` between `-180` and
 * `180` degrees).
 * When the `orientation` raw values are not provided by the sensors,
 * this modules tries to recalculate `beta` and `gamma` from the
 * `AccelerationIncludingGravity` module, if available (in that case,
 * the `alpha` angle is impossible to retrieve since the compass is
 * not available).
 *
 * @class DeviceMotionModule
 * @extends InputModule
 */

var DeviceOrientationModule = function (_InputModule) {
  _inherits(DeviceOrientationModule, _InputModule);

  /**
   * Creates the `DeviceOrientation` module instance.
   *
   * @constructor
   */
  function DeviceOrientationModule() {
    _classCallCheck(this, DeviceOrientationModule);

    /**
     * Raw values coming from the `deviceorientation` event sent by this module.
     *
     * @this DeviceOrientationModule
     * @type {number[]}
     * @default [null, null, null]
     */
    var _this = _possibleConstructorReturn(this, (DeviceOrientationModule.__proto__ || Object.getPrototypeOf(DeviceOrientationModule)).call(this, 'deviceorientation'));

    _this.event = [null, null, null];

    /**
     * The `Orientation` module.
     * Provides unified values of the orientation compliant with {@link
     * http://www.w3.org/TR/orientation-event/|the W3C standard}
     * (`alpha` in `[0, 360]`, beta in `[-180, +180]`, `gamma` in `[-90, +90]`).
     *
     * @this DeviceOrientationModule
     * @type {DOMEventSubmodule}
     */
    _this.orientation = new _DOMEventSubmodule2.default(_this, 'orientation');

    /**
     * The `OrientationAlt` module.
     * Provides alternative values of the orientation
     * (`alpha` in `[0, 360]`, beta in `[-90, +90]`, `gamma` in `[-180, +180]`).
     *
     * @this DeviceOrientationModule
     * @type {DOMEventSubmodule}
     */
    _this.orientationAlt = new _DOMEventSubmodule2.default(_this, 'orientationAlt');

    /**
     * Required submodules / events.
     *
     * @this DeviceOrientationModule
     * @type {object}
     * @property {bool} orientation - Indicates whether the `orientation` unified values are required or not (defaults to `false`).
     * @property {bool} orientationAlt - Indicates whether the `orientationAlt` values are required or not (defaults to `false`).
     */
    _this.required = {
      orientation: false,
      orientationAlt: false
    };

    /**
     * Resolve function of the module's promise.
     *
     * @this DeviceOrientationModule
     * @type {function}
     * @default null
     * @see DeviceOrientationModule#init
     */
    _this._promiseResolve = null;

    /**
     * Gravity vector calculated from the `accelerationIncludingGravity` unified values.
     *
     * @this DeviceOrientationModule
     * @type {number[]}
     * @default [0, 0, 0]
     */
    _this._estimatedGravity = [0, 0, 0];

    _this._processFunction = null;
    _this._process = _this._process.bind(_this);
    _this._deviceorientationCheck = _this._deviceorientationCheck.bind(_this);
    _this._deviceorientationListener = _this._deviceorientationListener.bind(_this);
    return _this;
  }

  /**
   * Sensor check on initialization of the module.
   * This method:
   * - checks whether the `orientation` values are valid or not;
   * - (in the case where orientation raw values are not provided)
   *   tries to calculate the orientation from the
   *   `accelerationIncludingGravity` unified values.
   *
   * @param {DeviceMotionEvent} e - First `'devicemotion'` event caught, on which the check is done.
   */


  _createClass(DeviceOrientationModule, [{
    key: '_deviceorientationCheck',
    value: function _deviceorientationCheck(e) {
      this.isProvided = true;

      // Sensor availability for the orientation and alternative orientation
      var rawValuesProvided = typeof e.alpha === 'number' && typeof e.beta === 'number' && typeof e.gamma === 'number';
      this.orientation.isProvided = rawValuesProvided;
      this.orientationAlt.isProvided = rawValuesProvided;

      // TODO(?): get pseudo-period

      // swap the process function to the
      this._processFunction = this._deviceorientationListener;

      // If orientation or alternative orientation are not provided by raw sensors but required,
      // try to calculate them with `accelerationIncludingGravity` unified values
      if (this.required.orientation && !this.orientation.isProvided || this.required.orientationAlt && !this.orientationAlt.isProvided) this._tryAccelerationIncludingGravityFallback();else this._promiseResolve(this);
    }

    /**
     * `'deviceorientation'` event callback.
     * This method emits an event with the raw `'deviceorientation'` values,
     * and emits events with the unified `orientation` and / or the
     * `orientationAlt` values if they are required.
     *
     * @param {DeviceOrientationEvent} e - `'deviceorientation'` event the values are calculated from.
     */

  }, {
    key: '_deviceorientationListener',
    value: function _deviceorientationListener(e) {
      // 'deviceorientation' event (raw values)
      var outEvent = this.event;

      outEvent[0] = e.alpha;
      outEvent[1] = e.beta;
      outEvent[2] = e.gamma;

      if (this.listeners.size > 0) this.emit(outEvent);

      // 'orientation' event (unified values)
      if (this.orientation.listeners.size > 0 && this.required.orientation && this.orientation.isProvided) {
        // On iOS, the `alpha` value is initialized at `0` on the first `deviceorientation` event
        // so we keep that reference in memory to calculate the North later on
        if (!this.orientation._webkitCompassHeadingReference && e.webkitCompassHeading && _platform2.default.os.family === 'iOS') this.orientation._webkitCompassHeadingReference = e.webkitCompassHeading;

        var _outEvent = this.orientation.event;

        _outEvent[0] = e.alpha;
        _outEvent[1] = e.beta;
        _outEvent[2] = e.gamma;

        // On iOS, replace the `alpha` value by the North value and unify the angles
        // (the default representation of the angles on iOS is not compliant with the W3C specification)
        if (this.orientation._webkitCompassHeadingReference && _platform2.default.os.family === 'iOS') {
          _outEvent[0] += 360 - this.orientation._webkitCompassHeadingReference;
          unify(_outEvent);
        }

        this.orientation.emit(_outEvent);
      }

      // 'orientationAlt' event
      if (this.orientationAlt.listeners.size > 0 && this.required.orientationAlt && this.orientationAlt.isProvided) {
        // On iOS, the `alpha` value is initialized at `0` on the first `deviceorientation` event
        // so we keep that reference in memory to calculate the North later on
        if (!this.orientationAlt._webkitCompassHeadingReference && e.webkitCompassHeading && _platform2.default.os.family === 'iOS') this.orientationAlt._webkitCompassHeadingReference = e.webkitCompassHeading;

        var _outEvent2 = this.orientationAlt.event;

        _outEvent2[0] = e.alpha;
        _outEvent2[1] = e.beta;
        _outEvent2[2] = e.gamma;

        // On iOS, replace the `alpha` value by the North value but do not convert the angles
        // (the default representation of the angles on iOS is compliant with the alternative representation)
        if (this.orientationAlt._webkitCompassHeadingReference && _platform2.default.os.family === 'iOS') {
          _outEvent2[0] -= this.orientationAlt._webkitCompassHeadingReference;
          _outEvent2[0] += _outEvent2[0] < 0 ? 360 : 0; // make sure `alpha` is in [0, +360[
        }

        // On Android, transform the angles to the alternative representation
        // (the default representation of the angles on Android is compliant with the W3C specification)
        if (_platform2.default.os.family === 'Android') unifyAlt(_outEvent2);

        this.orientationAlt.emit(_outEvent2);
      }
    }

    /**
     * Checks whether `beta` and `gamma` can be calculated from the `accelerationIncludingGravity` values or not.
     */

  }, {
    key: '_tryAccelerationIncludingGravityFallback',
    value: function _tryAccelerationIncludingGravityFallback() {
      var _this2 = this;

      _MotionInput2.default.requireModule('accelerationIncludingGravity').then(function (accelerationIncludingGravity) {
        if (accelerationIncludingGravity.isValid) {
          console.log("WARNING (motion-input): The 'deviceorientation' event does not exist or does not provide values in your browser, so the orientation of the device is estimated from DeviceMotion's 'accelerationIncludingGravity' event. Since the compass is not available, only the `beta` and `gamma` angles are provided (`alpha` is null).");

          if (_this2.required.orientation) {
            _this2.orientation.isCalculated = true;
            _this2.orientation.period = accelerationIncludingGravity.period;

            _MotionInput2.default.addListener('accelerationIncludingGravity', function (accelerationIncludingGravity) {
              _this2._calculateBetaAndGammaFromAccelerationIncludingGravity(accelerationIncludingGravity);
            });
          }

          if (_this2.required.orientationAlt) {
            _this2.orientationAlt.isCalculated = true;
            _this2.orientationAlt.period = accelerationIncludingGravity.period;

            _MotionInput2.default.addListener('accelerationIncludingGravity', function (accelerationIncludingGravity) {
              _this2._calculateBetaAndGammaFromAccelerationIncludingGravity(accelerationIncludingGravity, true);
            });
          }
        }

        _this2._promiseResolve(_this2);
      });
    }

    /**
     * Calculates and emits `beta` and `gamma` values as a fallback of the `orientation` and / or `orientationAlt` events, from the `accelerationIncludingGravity` unified values.
     *
     * @param {number[]} accelerationIncludingGravity - Latest `accelerationIncludingGravity raw values.
     * @param {bool} [alt=false] - Indicates whether we need the alternate representation of the angles or not.
     */

  }, {
    key: '_calculateBetaAndGammaFromAccelerationIncludingGravity',
    value: function _calculateBetaAndGammaFromAccelerationIncludingGravity(accelerationIncludingGravity) {
      var alt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var k = 0.8;

      // Low pass filter to estimate the gravity
      this._estimatedGravity[0] = k * this._estimatedGravity[0] + (1 - k) * accelerationIncludingGravity[0];
      this._estimatedGravity[1] = k * this._estimatedGravity[1] + (1 - k) * accelerationIncludingGravity[1];
      this._estimatedGravity[2] = k * this._estimatedGravity[2] + (1 - k) * accelerationIncludingGravity[2];

      var _gX = this._estimatedGravity[0];
      var _gY = this._estimatedGravity[1];
      var _gZ = this._estimatedGravity[2];

      var norm = Math.sqrt(_gX * _gX + _gY * _gY + _gZ * _gZ);

      _gX /= norm;
      _gY /= norm;
      _gZ /= norm;

      // Adopting the following conventions:
      // - each matrix operates by pre-multiplying column vectors,
      // - each matrix represents an active rotation,
      // - each matrix represents the composition of intrinsic rotations,
      // the rotation matrix representing the composition of a rotation
      // about the x-axis by an angle beta and a rotation about the y-axis
      // by an angle gamma is:
      //
      // [ cos(gamma)               ,  0          ,  sin(gamma)              ,
      //   sin(beta) * sin(gamma)   ,  cos(beta)  ,  -cos(gamma) * sin(beta) ,
      //   -cos(beta) * sin(gamma)  ,  sin(beta)  ,  cos(beta) * cos(gamma)  ].
      //
      // Hence, the projection of the normalized gravity g = [0, 0, 1]
      // in the device's reference frame corresponds to:
      //
      // gX = -cos(beta) * sin(gamma),
      // gY = sin(beta),
      // gZ = cos(beta) * cos(gamma),
      //
      // so beta = asin(gY) and gamma = atan2(-gX, gZ).

      // Beta & gamma equations (we approximate [gX, gY, gZ] by [_gX, _gY, _gZ])
      var beta = radToDeg(Math.asin(_gY)); // beta is in [-pi/2; pi/2[
      var gamma = radToDeg(Math.atan2(-_gX, _gZ)); // gamma is in [-pi; pi[

      if (alt) {
        // In that case, there is nothing to do since the calculations above gave the angle in the right ranges
        var outEvent = this.orientationAlt.event;
        outEvent[0] = null;
        outEvent[1] = beta;
        outEvent[2] = gamma;

        this.orientationAlt.emit(outEvent);
      } else {
        // Here we have to unify the angles to get the ranges compliant with the W3C specification
        var _outEvent3 = this.orientation.event;
        _outEvent3[0] = null;
        _outEvent3[1] = beta;
        _outEvent3[2] = gamma;
        unify(_outEvent3);

        this.orientation.emit(_outEvent3);
      }
    }
  }, {
    key: '_process',
    value: function _process(data) {
      this._processFunction(data);
    }

    /**
     * Initializes of the module.
     *
     * @return {Promise}
     */

  }, {
    key: 'init',
    value: function init() {
      var _this3 = this;

      return _get(DeviceOrientationModule.prototype.__proto__ || Object.getPrototypeOf(DeviceOrientationModule.prototype), 'init', this).call(this, function (resolve) {
        _this3._promiseResolve = resolve;

        if (window.DeviceOrientationEvent) {
          _this3._processFunction = _this3._deviceorientationCheck;
          window.addEventListener('deviceorientation', _this3._process, false);
        } else if (_this3.required.orientation) {
          _this3._tryAccelerationIncludingGravityFallback();
        } else {
          resolve(_this3);
        }
      });
    }
  }]);

  return DeviceOrientationModule;
}(_InputModule3.default);

exports.default = new DeviceOrientationModule();

},{"./DOMEventSubmodule":107,"./InputModule":111,"./MotionInput":112,"platform":114}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _InputModule2 = require('./InputModule');

var _InputModule3 = _interopRequireDefault(_InputModule2);

var _MotionInput = require('./MotionInput');

var _MotionInput2 = _interopRequireDefault(_MotionInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Energy module singleton.
 * The energy module singleton provides energy values (between 0 and 1)
 * based on the acceleration and the rotation rate of the device.
 * The period of the energy values is the same as the period of the
 * acceleration and the rotation rate values.
 *
 * @class EnergyModule
 * @extends InputModule
 */
var EnergyModule = function (_InputModule) {
  _inherits(EnergyModule, _InputModule);

  /**
   * Creates the energy module instance.
   *
   * @constructor
   */
  function EnergyModule() {
    _classCallCheck(this, EnergyModule);

    /**
     * Event containing the value of the energy, sent by the energy module.
     *
     * @this EnergyModule
     * @type {number}
     * @default 0
     */
    var _this = _possibleConstructorReturn(this, (EnergyModule.__proto__ || Object.getPrototypeOf(EnergyModule)).call(this, 'energy'));

    _this.event = 0;

    /**
     * The acceleration module, used in the calculation of the energy.
     *
     * @this EnergyModule
     * @type {DOMEventSubmodule}
     * @default null
     * @see DevicemotionModule
     */
    _this._accelerationModule = null;

    /**
     * Latest acceleration value sent by the acceleration module.
     *
     * @this EnergyModule
     * @type {number[]}
     * @default null
     */
    _this._accelerationValues = null;

    /**
     * Maximum value reached by the acceleration magnitude, clipped at `this._accelerationMagnitudeThreshold`.
     *
     * @this EnergyModule
     * @type {number}
     * @default 9.81
     */
    _this._accelerationMagnitudeCurrentMax = 1 * 9.81;

    /**
     * Clipping value of the acceleration magnitude.
     *
     * @this EnergyModule
     * @type {number}
     * @default 20
     * @constant
     */
    _this._accelerationMagnitudeThreshold = 4 * 9.81;

    /**
     * The rotation rate module, used in the calculation of the energy.
     *
     * @this EnergyModule
     * @type {DOMEventSubmodule}
     * @default null
     * @see DevicemotionModule
     */
    _this._rotationRateModule = null;

    /**
     * Latest rotation rate value sent by the rotation rate module.
     *
     * @this EnergyModule
     * @type {number[]}
     * @default null
     */
    _this._rotationRateValues = null;

    /**
     * Maximum value reached by the rotation rate magnitude, clipped at `this._rotationRateMagnitudeThreshold`.
     *
     * @this EnergyModule
     * @type {number}
     * @default 400
     */
    _this._rotationRateMagnitudeCurrentMax = 400;

    /**
     * Clipping value of the rotation rate magnitude.
     *
     * @this EnergyModule
     * @type {number}
     * @default 600
     * @constant
     */
    _this._rotationRateMagnitudeThreshold = 600;

    /**
     * Time constant (half-life) of the low-pass filter used to smooth the energy values (in seconds).
     *
     * @this EnergyModule
     * @type {number}
     * @default 0.1
     * @constant
     */
    _this._energyTimeConstant = 0.1;

    _this._onAcceleration = _this._onAcceleration.bind(_this);
    _this._onRotationRate = _this._onRotationRate.bind(_this);
    return _this;
  }

  /**
   * Decay factor of the low-pass filter used to smooth the energy values.
   *
   * @type {number}
   * @readonly
   */


  _createClass(EnergyModule, [{
    key: 'init',


    /**
     * Initializes of the module.
     *
     * @return {Promise}
     */
    value: function init() {
      var _this2 = this;

      return _get(EnergyModule.prototype.__proto__ || Object.getPrototypeOf(EnergyModule.prototype), 'init', this).call(this, function (resolve) {
        // The energy module requires the acceleration and the rotation rate modules
        Promise.all([_MotionInput2.default.requireModule('acceleration'), _MotionInput2.default.requireModule('rotationRate')]).then(function (modules) {
          var _modules = _slicedToArray(modules, 2),
              acceleration = _modules[0],
              rotationRate = _modules[1];

          _this2._accelerationModule = acceleration;
          _this2._rotationRateModule = rotationRate;
          _this2.isCalculated = _this2._accelerationModule.isValid || _this2._rotationRateModule.isValid;

          if (_this2._accelerationModule.isValid) _this2.period = _this2._accelerationModule.period;else if (_this2._rotationRateModule.isValid) _this2.period = _this2._rotationRateModule.period;

          resolve(_this2);
        });
      });
    }
  }, {
    key: 'addListener',
    value: function addListener(listener) {
      if (this.listeners.size === 0) {
        if (this._accelerationModule.isValid) this._accelerationModule.addListener(this._onAcceleration);
        if (this._rotationRateModule.isValid) this._rotationRateModule.addListener(this._onRotationRate);
      }

      _get(EnergyModule.prototype.__proto__ || Object.getPrototypeOf(EnergyModule.prototype), 'addListener', this).call(this, listener);
    }
  }, {
    key: 'removeListener',
    value: function removeListener(listener) {
      _get(EnergyModule.prototype.__proto__ || Object.getPrototypeOf(EnergyModule.prototype), 'removeListener', this).call(this, listener);

      if (this.listeners.size === 0) {
        if (this._accelerationModule.isValid) this._accelerationModule.removeListener(this._onAcceleration);
        if (this._rotationRateModule.isValid) this._rotationRateModule.removeListener(this._onRotationRate);
      }
    }

    /**
     * Acceleration values handler.
     *
     * @param {number[]} acceleration - Latest acceleration value.
     */

  }, {
    key: '_onAcceleration',
    value: function _onAcceleration(acceleration) {
      this._accelerationValues = acceleration;

      // If the rotation rate values are not available, we calculate the energy right away.
      if (!this._rotationRateModule.isValid) this._calculateEnergy();
    }

    /**
     * Rotation rate values handler.
     *
     * @param {number[]} rotationRate - Latest rotation rate value.
     */

  }, {
    key: '_onRotationRate',
    value: function _onRotationRate(rotationRate) {
      this._rotationRateValues = rotationRate;

      // We know that the acceleration and rotation rate values coming from the
      // same `devicemotion` event are sent in that order (acceleration > rotation rate)
      // so when the rotation rate is provided, we calculate the energy value of the
      // latest `devicemotion` event when we receive the rotation rate values.
      this._calculateEnergy();
    }

    /**
     * Energy calculation: emits an energy value between 0 and 1.
     *
     * This method checks if the acceleration modules is valid. If that is the case,
     * it calculates an estimation of the energy (between 0 and 1) based on the ratio
     * of the current acceleration magnitude and the maximum acceleration magnitude
     * reached so far (clipped at the `this._accelerationMagnitudeThreshold` value).
     * (We use this trick to get uniform behaviors among devices. If we calculated
     * the ratio based on a fixed value independent of what the device is capable of
     * providing, we could get inconsistent behaviors. For instance, the devices
     * whose accelerometers are limited at 2g would always provide very low values
     * compared to devices with accelerometers capable of measuring 4g accelerations.)
     * The same checks and calculations are made on the rotation rate module.
     * Finally, the energy value is the maximum between the energy value estimated
     * from the acceleration, and the one estimated from the rotation rate. It is
     * smoothed through a low-pass filter.
     */

  }, {
    key: '_calculateEnergy',
    value: function _calculateEnergy() {
      var accelerationEnergy = 0;
      var rotationRateEnergy = 0;

      // Check the acceleration module and calculate an estimation of the energy value from the latest acceleration value
      if (this._accelerationModule.isValid) {
        var aX = this._accelerationValues[0];
        var aY = this._accelerationValues[1];
        var aZ = this._accelerationValues[2];
        var accelerationMagnitude = Math.sqrt(aX * aX + aY * aY + aZ * aZ);

        // Store the maximum acceleration magnitude reached so far, clipped at `this._accelerationMagnitudeThreshold`
        if (this._accelerationMagnitudeCurrentMax < accelerationMagnitude) this._accelerationMagnitudeCurrentMax = Math.min(accelerationMagnitude, this._accelerationMagnitudeThreshold);
        // TODO(?): remove ouliers --- on some Android devices, the magnitude is very high on a few isolated datapoints,
        // which make the threshold very high as well => the energy remains around 0.5, even when you shake very hard.

        accelerationEnergy = Math.min(accelerationMagnitude / this._accelerationMagnitudeCurrentMax, 1);
      }

      // Check the rotation rate module and calculate an estimation of the energy value from the latest rotation rate value
      if (this._rotationRateModule.isValid) {
        var rA = this._rotationRateValues[0];
        var rB = this._rotationRateValues[1];
        var rG = this._rotationRateValues[2];
        var rotationRateMagnitude = Math.sqrt(rA * rA + rB * rB + rG * rG);

        // Store the maximum rotation rate magnitude reached so far, clipped at `this._rotationRateMagnitudeThreshold`
        if (this._rotationRateMagnitudeCurrentMax < rotationRateMagnitude) this._rotationRateMagnitudeCurrentMax = Math.min(rotationRateMagnitude, this._rotationRateMagnitudeThreshold);

        rotationRateEnergy = Math.min(rotationRateMagnitude / this._rotationRateMagnitudeCurrentMax, 1);
      }

      var energy = Math.max(accelerationEnergy, rotationRateEnergy);

      // Low-pass filter to smooth the energy values
      var k = this._energyDecay;
      this.event = k * this.event + (1 - k) * energy;

      // Emit the energy value
      this.emit(this.event);
    }
  }, {
    key: '_energyDecay',
    get: function get() {
      return Math.exp(-2 * Math.PI * this.period / this._energyTimeConstant);
    }
  }]);

  return EnergyModule;
}(_InputModule3.default);

exports.default = new EnergyModule();

},{"./InputModule":111,"./MotionInput":112}],111:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * `InputModule` class.
 * The `InputModule` class allows to instantiate modules that are part of the
 * motion input module, and that provide values (for instance, `deviceorientation`,
 * `acceleration`, `energy`).
 *
 * @class InputModule
 */
var InputModule = function () {

  /**
   * Creates an `InputModule` module instance.
   *
   * @constructor
   * @param {string} eventType - Name of the module / event (*e.g.* `deviceorientation, 'acceleration', 'energy').
   */
  function InputModule(eventType) {
    _classCallCheck(this, InputModule);

    /**
     * Event type of the module.
     *
     * @this InputModule
     * @type {string}
     * @constant
     */
    this.eventType = eventType;

    /**
     * Array of listeners attached to this module / event.
     *
     * @this InputModule
     * @type {Set<Function>}
     */
    this.listeners = new Set();

    /**
     * Event sent by this module.
     *
     * @this InputModule
     * @type {number|number[]}
     * @default null
     */
    this.event = null;

    /**
     * Module promise (resolved when the module is initialized).
     *
     * @this InputModule
     * @type {Promise}
     * @default null
     */
    this.promise = null;

    /**
     * Indicates if the module's event values are calculated from parent modules / events.
     *
     * @this InputModule
     * @type {bool}
     * @default false
     */
    this.isCalculated = false;

    /**
     * Indicates if the module's event values are provided by the device's sensors.
     * (*I.e.* indicates if the `'devicemotion'` or `'deviceorientation'` events provide the required raw values.)
     *
     * @this InputModule
     * @type {bool}
     * @default false
     */
    this.isProvided = false;

    /**
     * Period at which the module's events are sent (`undefined` if the events are not sent at regular intervals).
     *
     * @this InputModule
     * @type {number}
     * @default undefined
     */
    this.period = undefined;

    this.emit = this.emit.bind(this);
  }

  /**
   * Indicates whether the module can provide values or not.
   *
   * @type {bool}
   * @readonly
   */


  _createClass(InputModule, [{
    key: "init",


    /**
     * Initializes the module.
     *
     * @param {function} promiseFun - Promise function that takes the `resolve` and `reject` functions as arguments.
     * @return {Promise}
     */
    value: function init(promiseFun) {
      this.promise = new Promise(promiseFun);
      return this.promise;
    }

    /**
     * Adds a listener to the module.
     *
     * @param {function} listener - Listener to add.
     */

  }, {
    key: "addListener",
    value: function addListener(listener) {
      this.listeners.add(listener);
    }

    /**
     * Removes a listener from the module.
     *
     * @param {function} listener - Listener to remove.
     */

  }, {
    key: "removeListener",
    value: function removeListener(listener) {
      this.listeners.delete(listener);
    }

    /**
     * Propagates an event to all the module's listeners.
     *
     * @param {number|number[]} [event=this.event] - Event values to propagate to the module's listeners.
     */

  }, {
    key: "emit",
    value: function emit() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.event;

      this.listeners.forEach(function (listener) {
        return listener(event);
      });
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.isProvided || this.isCalculated;
    }
  }]);

  return InputModule;
}();

exports.default = InputModule;

},{}],112:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * `MotionInput` singleton.
 * The `MotionInput` singleton allows to initialize motion events
 * and to listen to them.
 *
 * @class MotionInput
 */
var MotionInput = function () {

  /**
   * Creates the `MotionInput` module instance.
   *
   * @constructor
   */
  function MotionInput() {
    _classCallCheck(this, MotionInput);

    /**
     * Pool of all available modules.
     *
     * @this MotionInput
     * @type {object}
     * @default {}
     */
    this.modules = {};
  }

  /**
   * Adds a module to the `MotionInput` module.
   *
   * @param {string} eventType - Name of the event type.
   * @param {InputModule} module - Module to add to the `MotionInput` module.
   */


  _createClass(MotionInput, [{
    key: "addModule",
    value: function addModule(eventType, module) {
      this.modules[eventType] = module;
    }

    /**
     * Gets a module.
     *
     * @param {string} eventType - Name of the event type (module) to retrieve.
     * @return {InputModule}
     */

  }, {
    key: "getModule",
    value: function getModule(eventType) {
      return this.modules[eventType];
    }

    /**
     * Requires a module.
     * If the module has been initialized already, returns its promise. Otherwise,
     * initializes the module.
     *
     * @param {string} eventType - Name of the event type (module) to require.
     * @return {Promise}
     */

  }, {
    key: "requireModule",
    value: function requireModule(eventType) {
      var module = this.getModule(eventType);

      if (module.promise) return module.promise;

      return module.init();
    }

    /**
     * Initializes the `MotionInput` module.
     *
     * @param {Array<String>} eventTypes - Array of the event types to initialize.
     * @return {Promise}
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      for (var _len = arguments.length, eventTypes = Array(_len), _key = 0; _key < _len; _key++) {
        eventTypes[_key] = arguments[_key];
      }

      if (Array.isArray(eventTypes[0])) eventTypes = eventTypes[0];

      var modulePromises = eventTypes.map(function (value) {
        var module = _this.getModule(value);
        return module.init();
      });

      return Promise.all(modulePromises);
    }

    /**
     * Adds a listener.
     *
     * @param {string} eventType - Name of the event type (module) to add a listener to.
     * @param {function} listener - Listener to add.
     */

  }, {
    key: "addListener",
    value: function addListener(eventType, listener) {
      var module = this.getModule(eventType);
      module.addListener(listener);
    }

    /**
     * Removes a listener.
     *
     * @param {string} eventType - Name of the event type (module) to add a listener to.
     * @param {function} listener - Listener to remove.
     */

  }, {
    key: "removeListener",
    value: function removeListener(eventType, listener) {
      var module = this.getModule(eventType);
      module.removeListener(listener);
    }
  }]);

  return MotionInput;
}();

exports.default = new MotionInput();

},{}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MotionInput = require('./MotionInput');

var _MotionInput2 = _interopRequireDefault(_MotionInput);

var _DeviceOrientationModule = require('./DeviceOrientationModule');

var _DeviceOrientationModule2 = _interopRequireDefault(_DeviceOrientationModule);

var _DeviceMotionModule = require('./DeviceMotionModule');

var _DeviceMotionModule2 = _interopRequireDefault(_DeviceMotionModule);

var _EnergyModule = require('./EnergyModule');

var _EnergyModule2 = _interopRequireDefault(_EnergyModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The motion input module can be used as follows
 *
 * @example
 * import motionInput from 'motion-input';
 * const requiredEvents = ;
 *
 * motionInput
 *  .init(['acceleration', 'orientation', 'energy'])
 *  .then(([acceleration, orientation, energy]) => {
 *    if (acceleration.isValid) {
 *      acceleration.addListener((data) => {
 *        console.log('acceleration', data);
 *        // do something with the acceleration values
 *      });
 *    }
 *
 *    // ...
 *  });
 */
_MotionInput2.default.addModule('devicemotion', _DeviceMotionModule2.default);
_MotionInput2.default.addModule('deviceorientation', _DeviceOrientationModule2.default);
_MotionInput2.default.addModule('accelerationIncludingGravity', _DeviceMotionModule2.default.accelerationIncludingGravity);
_MotionInput2.default.addModule('acceleration', _DeviceMotionModule2.default.acceleration);
_MotionInput2.default.addModule('rotationRate', _DeviceMotionModule2.default.rotationRate);
_MotionInput2.default.addModule('orientation', _DeviceOrientationModule2.default.orientation);
_MotionInput2.default.addModule('orientationAlt', _DeviceOrientationModule2.default.orientationAlt);
_MotionInput2.default.addModule('energy', _EnergyModule2.default);

exports.default = _MotionInput2.default;

},{"./DeviceMotionModule":108,"./DeviceOrientationModule":109,"./EnergyModule":110,"./MotionInput":112}],114:[function(require,module,exports){
(function (global){
/*!
 * Platform.js <https://mths.be/platform>
 * Copyright 2014-2016 Benjamin Tan <https://demoneaux.github.io/>
 * Copyright 2011-2013 John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <https://mths.be/mit>
 */
;(function() {
  'use strict';

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object. */
  var oldRoot = root;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Regular expression to detect Opera. */
  var reOpera = /\bOpera/;

  /** Possible global object. */
  var thisBinding = this;

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check for own properties of an object. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to resolve the internal `[[Class]]` of values. */
  var toString = objectProto.toString;

  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a string value.
   *
   * @private
   * @param {string} string The string to capitalize.
   * @returns {string} The capitalized string.
   */
  function capitalize(string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * A utility function to clean up the OS name.
   *
   * @private
   * @param {string} os The OS name to clean up.
   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
   * @param {string} [label] A label for the OS.
   */
  function cleanupOS(os, pattern, label) {
    // Platform tokens are defined at:
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    var data = {
      '10.0': '10',
      '6.4':  '10 Technical Preview',
      '6.3':  '8.1',
      '6.2':  '8',
      '6.1':  'Server 2008 R2 / 7',
      '6.0':  'Server 2008 / Vista',
      '5.2':  'Server 2003 / XP 64-bit',
      '5.1':  'XP',
      '5.01': '2000 SP1',
      '5.0':  '2000',
      '4.0':  'NT',
      '4.90': 'ME'
    };
    // Detect Windows version from platform tokens.
    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
        (data = data[/[\d.]+$/.exec(os)])) {
      os = 'Windows ' + data;
    }
    // Correct character case and cleanup string.
    os = String(os);

    if (pattern && label) {
      os = os.replace(RegExp(pattern, 'i'), label);
    }

    os = format(
      os.replace(/ ce$/i, ' CE')
        .replace(/\bhpw/i, 'web')
        .replace(/\bMacintosh\b/, 'Mac OS')
        .replace(/_PowerPC\b/i, ' OS')
        .replace(/\b(OS X) [^ \d]+/i, '$1')
        .replace(/\bMac (OS X)\b/, '$1')
        .replace(/\/(\d)/, ' $1')
        .replace(/_/g, '.')
        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
        .replace(/\bx86\.64\b/gi, 'x86_64')
        .replace(/\b(Windows Phone) OS\b/, '$1')
        .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
        .split(' on ')[0]
    );

    return os;
  }

  /**
   * An iteration utility for arrays and objects.
   *
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */
  function each(object, callback) {
    var index = -1,
        length = object ? object.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        callback(object[index], index, object);
      }
    } else {
      forOwn(object, callback);
    }
  }

  /**
   * Trim and conditionally capitalize string values.
   *
   * @private
   * @param {string} string The string to format.
   * @returns {string} The formatted string.
   */
  function format(string) {
    string = trim(string);
    return /^(?:webOS|i(?:OS|P))/.test(string)
      ? string
      : capitalize(string);
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   */
  function forOwn(object, callback) {
    for (var key in object) {
      if (hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }

  /**
   * Gets the internal `[[Class]]` of a value.
   *
   * @private
   * @param {*} value The value.
   * @returns {string} The `[[Class]]`.
   */
  function getClassOf(value) {
    return value == null
      ? capitalize(value)
      : toString.call(value).slice(8, -1);
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of "object", "function", or "unknown".
   *
   * @private
   * @param {*} object The owner of the property.
   * @param {string} property The property to check.
   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
   *
   * @private
   * @param {string} string The string to qualify.
   * @returns {string} The qualified string.
   */
  function qualify(string) {
    return String(string).replace(/([ -])(?!$)/g, '$1?');
  }

  /**
   * A bare-bones `Array#reduce` like utility function.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {*} The accumulated result.
   */
  function reduce(array, callback) {
    var accumulator = null;
    each(array, function(value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /**
   * Removes leading and trailing whitespace from a string.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} The trimmed string.
   */
  function trim(string) {
    return String(string).replace(/^ +| +$/g, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new platform object.
   *
   * @memberOf platform
   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
   *  context object.
   * @returns {Object} A platform object.
   */
  function parse(ua) {

    /** The environment context object. */
    var context = root;

    /** Used to flag when a custom context is provided. */
    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

    // Juggle arguments.
    if (isCustomContext) {
      context = ua;
      ua = null;
    }

    /** Browser navigator object. */
    var nav = context.navigator || {};

    /** Browser user agent string. */
    var userAgent = nav.userAgent || '';

    ua || (ua = userAgent);

    /** Used to flag when `thisBinding` is the [ModuleScope]. */
    var isModuleScope = isCustomContext || thisBinding == oldRoot;

    /** Used to detect if browser is like Chrome. */
    var likeChrome = isCustomContext
      ? !!nav.likeChrome
      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

    /** Internal `[[Class]]` value shortcuts. */
    var objectClass = 'Object',
        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
        enviroClass = isCustomContext ? objectClass : 'Environment',
        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

    /** Detect Java environments. */
    var java = /\bJava/.test(javaClass) && context.java;

    /** Detect Rhino. */
    var rhino = java && getClassOf(context.environment) == enviroClass;

    /** A character to represent alpha. */
    var alpha = java ? 'a' : '\u03b1';

    /** A character to represent beta. */
    var beta = java ? 'b' : '\u03b2';

    /** Browser document object. */
    var doc = context.document || {};

    /**
     * Detect Opera browser (Presto-based).
     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
     */
    var opera = context.operamini || context.opera;

    /** Opera `[[Class]]`. */
    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
      ? operaClass
      : (opera = null);

    /*------------------------------------------------------------------------*/

    /** Temporary variable used over the script's lifetime. */
    var data;

    /** The CPU architecture. */
    var arch = ua;

    /** Platform description array. */
    var description = [];

    /** Platform alpha/beta indicator. */
    var prerelease = null;

    /** A flag to indicate that environment features should be used to resolve the platform. */
    var useFeatures = ua == userAgent;

    /** The browser/environment version. */
    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

    /** A flag to indicate if the OS ends with "/ Version" */
    var isSpecialCasedOS;

    /* Detectable layout engines (order is important). */
    var layout = getLayout([
      { 'label': 'EdgeHTML', 'pattern': 'Edge' },
      'Trident',
      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
      'iCab',
      'Presto',
      'NetFront',
      'Tasman',
      'KHTML',
      'Gecko'
    ]);

    /* Detectable browser names (order is important). */
    var name = getName([
      'Adobe AIR',
      'Arora',
      'Avant Browser',
      'Breach',
      'Camino',
      'Electron',
      'Epiphany',
      'Fennec',
      'Flock',
      'Galeon',
      'GreenBrowser',
      'iCab',
      'Iceweasel',
      'K-Meleon',
      'Konqueror',
      'Lunascape',
      'Maxthon',
      { 'label': 'Microsoft Edge', 'pattern': 'Edge' },
      'Midori',
      'Nook Browser',
      'PaleMoon',
      'PhantomJS',
      'Raven',
      'Rekonq',
      'RockMelt',
      { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
      'SeaMonkey',
      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Sleipnir',
      'SlimBrowser',
      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
      'Sunrise',
      'Swiftfox',
      'Waterfox',
      'WebPositive',
      'Opera Mini',
      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
      'Opera',
      { 'label': 'Opera', 'pattern': 'OPR' },
      'Chrome',
      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
      { 'label': 'IE', 'pattern': 'IEMobile' },
      { 'label': 'IE', 'pattern': 'MSIE' },
      'Safari'
    ]);

    /* Detectable products (order is important). */
    var product = getProduct([
      { 'label': 'BlackBerry', 'pattern': 'BB10' },
      'BlackBerry',
      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
      { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },
      { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },
      { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },
      { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },
      { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },
      'Google TV',
      'Lumia',
      'iPad',
      'iPod',
      'iPhone',
      'Kindle',
      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Nexus',
      'Nook',
      'PlayBook',
      'PlayStation Vita',
      'PlayStation',
      'TouchPad',
      'Transformer',
      { 'label': 'Wii U', 'pattern': 'WiiU' },
      'Wii',
      'Xbox One',
      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
      'Xoom'
    ]);

    /* Detectable manufacturers. */
    var manufacturer = getManufacturer({
      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
      'Archos': {},
      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
      'Asus': { 'Transformer': 1 },
      'Barnes & Noble': { 'Nook': 1 },
      'BlackBerry': { 'PlayBook': 1 },
      'Google': { 'Google TV': 1, 'Nexus': 1 },
      'HP': { 'TouchPad': 1 },
      'HTC': {},
      'LG': {},
      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
      'Motorola': { 'Xoom': 1 },
      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
      'Nokia': { 'Lumia': 1 },
      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
      'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 }
    });

    /* Detectable operating systems (order is important). */
    var os = getOS([
      'Windows Phone',
      'Android',
      'CentOS',
      { 'label': 'Chrome OS', 'pattern': 'CrOS' },
      'Debian',
      'Fedora',
      'FreeBSD',
      'Gentoo',
      'Haiku',
      'Kubuntu',
      'Linux Mint',
      'OpenBSD',
      'Red Hat',
      'SuSE',
      'Ubuntu',
      'Xubuntu',
      'Cygwin',
      'Symbian OS',
      'hpwOS',
      'webOS ',
      'webOS',
      'Tablet OS',
      'Tizen',
      'Linux',
      'Mac OS X',
      'Macintosh',
      'Mac',
      'Windows 98;',
      'Windows '
    ]);

    /*------------------------------------------------------------------------*/

    /**
     * Picks the layout engine from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected layout engine.
     */
    function getLayout(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the manufacturer from an array of guesses.
     *
     * @private
     * @param {Array} guesses An object of guesses.
     * @returns {null|string} The detected manufacturer.
     */
    function getManufacturer(guesses) {
      return reduce(guesses, function(result, value, key) {
        // Lookup the manufacturer by product or scan the UA for the manufacturer.
        return result || (
          value[product] ||
          value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
        ) && key;
      });
    }

    /**
     * Picks the browser name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected browser name.
     */
    function getName(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the OS name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected OS name.
     */
    function getOS(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
            )) {
          result = cleanupOS(result, pattern, guess.label || guess);
        }
        return result;
      });
    }

    /**
     * Picks the product name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected product name.
     */
    function getProduct(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
            )) {
          // Split by forward slash and append product version if needed.
          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
            result[0] += ' ' + result[1];
          }
          // Correct character case and cleanup string.
          guess = guess.label || guess;
          result = format(result[0]
            .replace(RegExp(pattern, 'i'), guess)
            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
        }
        return result;
      });
    }

    /**
     * Resolves the version using an array of UA patterns.
     *
     * @private
     * @param {Array} patterns An array of UA patterns.
     * @returns {null|string} The detected version.
     */
    function getVersion(patterns) {
      return reduce(patterns, function(result, pattern) {
        return result || (RegExp(pattern +
          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
      });
    }

    /**
     * Returns `platform.description` when the platform object is coerced to a string.
     *
     * @name toString
     * @memberOf platform
     * @returns {string} Returns `platform.description` if available, else an empty string.
     */
    function toStringPlatform() {
      return this.description || '';
    }

    /*------------------------------------------------------------------------*/

    // Convert layout to an array so we can add extra details.
    layout && (layout = [layout]);

    // Detect product names that contain their manufacturer's name.
    if (manufacturer && !product) {
      product = getProduct([manufacturer]);
    }
    // Clean up Google TV.
    if ((data = /\bGoogle TV\b/.exec(product))) {
      product = data[0];
    }
    // Detect simulators.
    if (/\bSimulator\b/i.test(ua)) {
      product = (product ? product + ' ' : '') + 'Simulator';
    }
    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
      description.push('running in Turbo/Uncompressed mode');
    }
    // Detect IE Mobile 11.
    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
      data = parse(ua.replace(/like iPhone OS/, ''));
      manufacturer = data.manufacturer;
      product = data.product;
    }
    // Detect iOS.
    else if (/^iP/.test(product)) {
      name || (name = 'Safari');
      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
        ? ' ' + data[1].replace(/_/g, '.')
        : '');
    }
    // Detect Kubuntu.
    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
      os = 'Kubuntu';
    }
    // Detect Android browsers.
    else if ((manufacturer && manufacturer != 'Google' &&
        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
        (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
      name = 'Android Browser';
      os = /\bAndroid\b/.test(os) ? os : 'Android';
    }
    // Detect Silk desktop/accelerated modes.
    else if (name == 'Silk') {
      if (!/\bMobi/i.test(ua)) {
        os = 'Android';
        description.unshift('desktop mode');
      }
      if (/Accelerated *= *true/i.test(ua)) {
        description.unshift('accelerated');
      }
    }
    // Detect PaleMoon identifying as Firefox.
    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
      description.push('identifying as Firefox ' + data[1]);
    }
    // Detect Firefox OS and products running Firefox.
    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
      os || (os = 'Firefox OS');
      product || (product = data[1]);
    }
    // Detect false positives for Firefox/Safari.
    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
      // Escape the `/` for Firefox 1.
      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
        // Clear name of false positives.
        name = null;
      }
      // Reassign a generic name.
      if ((data = product || manufacturer || os) &&
          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
      }
    }
    // Add Chrome version to description for Electron.
    else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
      description.push('Chromium ' + data);
    }
    // Detect non-Opera (Presto-based) versions (order is important).
    if (!version) {
      version = getVersion([
        '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
        'Version',
        qualify(name),
        '(?:Firefox|Minefield|NetFront)'
      ]);
    }
    // Detect stubborn layout engines.
    if ((data =
          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
          layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
        )) {
      layout = [data];
    }
    // Detect Windows Phone 7 desktop mode.
    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
      name += ' Mobile';
      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
      description.unshift('desktop mode');
    }
    // Detect Windows Phone 8.x desktop mode.
    else if (/\bWPDesktop\b/i.test(ua)) {
      name = 'IE Mobile';
      os = 'Windows Phone 8.x';
      description.unshift('desktop mode');
      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
    }
    // Detect IE 11 identifying as other browsers.
    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
      if (name) {
        description.push('identifying as ' + name + (version ? ' ' + version : ''));
      }
      name = 'IE';
      version = data[1];
    }
    // Leverage environment features.
    if (useFeatures) {
      // Detect server-side environments.
      // Rhino has a global function while others have a global object.
      if (isHostType(context, 'global')) {
        if (java) {
          data = java.lang.System;
          arch = data.getProperty('os.arch');
          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
        }
        if (isModuleScope && isHostType(context, 'system') && (data = [context.system])[0]) {
          os || (os = data[0].os || null);
          try {
            data[1] = context.require('ringo/engine').version;
            version = data[1].join('.');
            name = 'RingoJS';
          } catch(e) {
            if (data[0].global.system == context.system) {
              name = 'Narwhal';
            }
          }
        }
        else if (
          typeof context.process == 'object' && !context.process.browser &&
          (data = context.process)
        ) {
          if (typeof data.versions == 'object') {
            if (typeof data.versions.electron == 'string') {
              description.push('Node ' + data.versions.node);
              name = 'Electron';
              version = data.versions.electron;
            } else if (typeof data.versions.nw == 'string') {
              description.push('Chromium ' + version, 'Node ' + data.versions.node);
              name = 'NW.js';
              version = data.versions.nw;
            }
          } else {
            name = 'Node.js';
            arch = data.arch;
            os = data.platform;
            version = /[\d.]+/.exec(data.version)
            version = version ? version[0] : 'unknown';
          }
        }
        else if (rhino) {
          name = 'Rhino';
        }
      }
      // Detect Adobe AIR.
      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
        name = 'Adobe AIR';
        os = data.flash.system.Capabilities.os;
      }
      // Detect PhantomJS.
      else if (getClassOf((data = context.phantom)) == phantomClass) {
        name = 'PhantomJS';
        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
      }
      // Detect IE compatibility modes.
      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
        // We're in compatibility mode when the Trident version + 4 doesn't
        // equal the document mode.
        version = [version, doc.documentMode];
        if ((data = +data[1] + 4) != version[1]) {
          description.push('IE ' + version[1] + ' mode');
          layout && (layout[1] = '');
          version[1] = data;
        }
        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
      }
      // Detect IE 11 masking as other browsers.
      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
        description.push('masking as ' + name + ' ' + version);
        name = 'IE';
        version = '11.0';
        layout = ['Trident'];
        os = 'Windows';
      }
      os = os && format(os);
    }
    // Detect prerelease phases.
    if (version && (data =
          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
          /\bMinefield\b/i.test(ua) && 'a'
        )) {
      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
      version = version.replace(RegExp(data + '\\+?$'), '') +
        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    }
    // Detect Firefox Mobile.
    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
      name = 'Firefox Mobile';
    }
    // Obscure Maxthon's unreliable version.
    else if (name == 'Maxthon' && version) {
      version = version.replace(/\.[\d.]+/, '.x');
    }
    // Detect Xbox 360 and Xbox One.
    else if (/\bXbox\b/i.test(product)) {
      if (product == 'Xbox 360') {
        os = null;
      }
      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
        description.unshift('mobile mode');
      }
    }
    // Add mobile postfix.
    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
        (os == 'Windows CE' || /Mobi/i.test(ua))) {
      name += ' Mobile';
    }
    // Detect IE platform preview.
    else if (name == 'IE' && useFeatures) {
      try {
        if (context.external === null) {
          description.unshift('platform preview');
        }
      } catch(e) {
        description.unshift('embedded');
      }
    }
    // Detect BlackBerry OS version.
    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
          version
        )) {
      data = [data, /BB10/.test(ua)];
      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
      version = null;
    }
    // Detect Opera identifying/masking itself as another browser.
    // http://www.opera.com/support/kb/view/843/
    else if (this != forOwn && product != 'Wii' && (
          (useFeatures && opera) ||
          (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
          (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
          (name == 'IE' && (
            (os && !/^Win/.test(os) && version > 5.5) ||
            /\bWindows XP\b/.test(os) && version > 8 ||
            version == 8 && !/\bTrident\b/.test(ua)
          ))
        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
      // When "identifying", the UA contains both Opera and the other browser's name.
      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
      if (reOpera.test(name)) {
        if (/\bIE\b/.test(data) && os == 'Mac OS') {
          os = null;
        }
        data = 'identify' + data;
      }
      // When "masking", the UA contains only the other browser's name.
      else {
        data = 'mask' + data;
        if (operaClass) {
          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
        } else {
          name = 'Opera';
        }
        if (/\bIE\b/.test(data)) {
          os = null;
        }
        if (!useFeatures) {
          version = null;
        }
      }
      layout = ['Presto'];
      description.push(data);
    }
    // Detect WebKit Nightly and approximate Chrome/Safari versions.
    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
      // Correct build number for numeric comparison.
      // (e.g. "532.5" becomes "532.05")
      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
      // Nightly builds are postfixed with a "+".
      if (name == 'Safari' && data[1].slice(-1) == '+') {
        name = 'WebKit Nightly';
        prerelease = 'alpha';
        version = data[1].slice(0, -1);
      }
      // Clear incorrect browser versions.
      else if (version == data[1] ||
          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
        version = null;
      }
      // Use the full Chrome version when available.
      data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
      // Detect Blink layout engine.
      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
        layout = ['Blink'];
      }
      // Detect JavaScriptCore.
      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
      if (!useFeatures || (!likeChrome && !data[1])) {
        layout && (layout[1] = 'like Safari');
        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
      } else {
        layout && (layout[1] = 'like Chrome');
        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
      }
      // Add the postfix of ".x" or "+" for approximate versions.
      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
      // Obscure version for some Safari 1-2 releases.
      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
        version = data;
      }
    }
    // Detect Opera desktop modes.
    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
      name += ' ';
      description.unshift('desktop mode');
      if (data == 'zvav') {
        name += 'Mini';
        version = null;
      } else {
        name += 'Mobile';
      }
      os = os.replace(RegExp(' *' + data + '$'), '');
    }
    // Detect Chrome desktop mode.
    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
      description.unshift('desktop mode');
      name = 'Chrome Mobile';
      version = null;

      if (/\bOS X\b/.test(os)) {
        manufacturer = 'Apple';
        os = 'iOS 4.3+';
      } else {
        os = null;
      }
    }
    // Strip incorrect OS versions.
    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
        ua.indexOf('/' + data + '-') > -1) {
      os = trim(os.replace(data, ''));
    }
    // Add layout engine.
    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
        /Browser|Lunascape|Maxthon/.test(name) ||
        name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(name) && layout[1])) {
      // Don't add layout details to description if they are falsey.
      (data = layout[layout.length - 1]) && description.push(data);
    }
    // Combine contextual information.
    if (description.length) {
      description = ['(' + description.join('; ') + ')'];
    }
    // Append manufacturer to description.
    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
      description.push('on ' + manufacturer);
    }
    // Append product to description.
    if (product) {
      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
    }
    // Parse the OS into an object.
    if (os) {
      data = / ([\d.+]+)$/.exec(os);
      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
      os = {
        'architecture': 32,
        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
        'version': data ? data[1] : null,
        'toString': function() {
          var version = this.version;
          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
        }
      };
    }
    // Add browser/OS architecture.
    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
      if (os) {
        os.architecture = 64;
        os.family = os.family.replace(RegExp(' *' + data), '');
      }
      if (
          name && (/\bWOW64\b/i.test(ua) ||
          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
      ) {
        description.unshift('32-bit');
      }
    }
    // Chrome 39 and above on OS X is always 64-bit.
    else if (
        os && /^OS X/.test(os.family) &&
        name == 'Chrome' && parseFloat(version) >= 39
    ) {
      os.architecture = 64;
    }

    ua || (ua = null);

    /*------------------------------------------------------------------------*/

    /**
     * The platform object.
     *
     * @name platform
     * @type Object
     */
    var platform = {};

    /**
     * The platform description.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.description = ua;

    /**
     * The name of the browser's layout engine.
     *
     * The list of common layout engines include:
     * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.layout = layout && layout[0];

    /**
     * The name of the product's manufacturer.
     *
     * The list of manufacturers include:
     * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
     * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
     * "Nokia", "Samsung" and "Sony"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.manufacturer = manufacturer;

    /**
     * The name of the browser/environment.
     *
     * The list of common browser names include:
     * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
     * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
     * "Opera Mini" and "Opera"
     *
     * Mobile versions of some browsers have "Mobile" appended to their name:
     * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.name = name;

    /**
     * The alpha/beta release indicator.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.prerelease = prerelease;

    /**
     * The name of the product hosting the browser.
     *
     * The list of common products include:
     *
     * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
     * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.product = product;

    /**
     * The browser's user agent string.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.ua = ua;

    /**
     * The browser/environment version.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.version = name && version;

    /**
     * The name of the operating system.
     *
     * @memberOf platform
     * @type Object
     */
    platform.os = os || {

      /**
       * The CPU architecture the OS is built for.
       *
       * @memberOf platform.os
       * @type number|null
       */
      'architecture': null,

      /**
       * The family of the OS.
       *
       * Common values include:
       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
       * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
       * "Android", "iOS" and "Windows Phone"
       *
       * @memberOf platform.os
       * @type string|null
       */
      'family': null,

      /**
       * The version of the OS.
       *
       * @memberOf platform.os
       * @type string|null
       */
      'version': null,

      /**
       * Returns the OS string.
       *
       * @memberOf platform.os
       * @returns {string} The OS string.
       */
      'toString': function() { return 'null'; }
    };

    platform.parse = parse;
    platform.toString = toStringPlatform;

    if (platform.version) {
      description.unshift(version);
    }
    if (platform.name) {
      description.unshift(name);
    }
    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
      description.push(product ? '(' + os + ')' : 'on ' + os);
    }
    if (description.length) {
      platform.description = description.join(' ');
    }
    return platform;
  }

  /*--------------------------------------------------------------------------*/

  // Export platform.
  var platform = parse();

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose platform on the global object to prevent errors when platform is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.platform = platform;

    // Define as an anonymous module so platform can be aliased through path mapping.
    define(function() {
      return platform;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for CommonJS support.
    forOwn(platform, function(value, key) {
      freeExports[key] = value;
    });
  }
  else {
    // Export to the global object.
    root.platform = platform;
  }
}.call(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],115:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":134}],116:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/log10"), __esModule: true };
},{"core-js/library/fn/math/log10":135}],117:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/is-finite"), __esModule: true };
},{"core-js/library/fn/number/is-finite":136}],118:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":137}],119:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":138}],120:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":139}],121:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":140}],122:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":141}],123:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":142}],124:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":143}],125:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":144}],126:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":145}],127:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],128:[function(require,module,exports){
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
},{"../core-js/object/define-property":120}],129:[function(require,module,exports){
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
},{"../core-js/object/define-property":120}],130:[function(require,module,exports){
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
},{"../core-js/object/get-own-property-descriptor":121,"../core-js/object/get-prototype-of":122}],131:[function(require,module,exports){
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
},{"../core-js/object/create":119,"../core-js/object/set-prototype-of":123,"../helpers/typeof":133}],132:[function(require,module,exports){
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
},{"../helpers/typeof":133}],133:[function(require,module,exports){
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
},{"../core-js/symbol":125,"../core-js/symbol/iterator":126}],134:[function(require,module,exports){
var core  = require('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":153}],135:[function(require,module,exports){
require('../../modules/es6.math.log10');
module.exports = require('../../modules/_core').Math.log10;
},{"../../modules/_core":153,"../../modules/es6.math.log10":219}],136:[function(require,module,exports){
require('../../modules/es6.number.is-finite');
module.exports = require('../../modules/_core').Number.isFinite;
},{"../../modules/_core":153,"../../modules/es6.number.is-finite":220}],137:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":153,"../../modules/es6.object.assign":221}],138:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":153,"../../modules/es6.object.create":222}],139:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":153,"../../modules/es6.object.define-property":223}],140:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":153,"../../modules/es6.object.get-own-property-descriptor":224}],141:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":153,"../../modules/es6.object.get-prototype-of":225}],142:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":153,"../../modules/es6.object.set-prototype-of":226}],143:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":153,"../modules/es6.object.to-string":227,"../modules/es6.promise":228,"../modules/es6.string.iterator":229,"../modules/web.dom.iterable":233}],144:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":153,"../../modules/es6.object.to-string":227,"../../modules/es6.symbol":230,"../../modules/es7.symbol.async-iterator":231,"../../modules/es7.symbol.observable":232}],145:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":215,"../../modules/es6.string.iterator":229,"../../modules/web.dom.iterable":233}],146:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54}],147:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"dup":55}],148:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],149:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"./_is-object":172,"dup":56}],150:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"./_to-index":207,"./_to-iobject":209,"./_to-length":210,"dup":57}],151:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"./_cof":152,"./_wks":216,"dup":58}],152:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"dup":59}],153:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"dup":60}],154:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"./_a-function":146,"dup":61}],155:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"dup":62}],156:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"./_fails":161,"dup":63}],157:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"./_global":163,"./_is-object":172,"dup":64}],158:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"dup":65}],159:[function(require,module,exports){
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
},{"./_object-gops":190,"./_object-keys":193,"./_object-pie":194}],160:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"./_core":153,"./_ctx":154,"./_global":163,"./_hide":165,"dup":66}],161:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"dup":67}],162:[function(require,module,exports){
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
},{"./_an-object":149,"./_ctx":154,"./_is-array-iter":170,"./_iter-call":173,"./_to-length":210,"./core.get-iterator-method":217}],163:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"dup":68}],164:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"dup":69}],165:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"./_descriptors":156,"./_object-dp":185,"./_property-desc":196,"dup":70}],166:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"./_global":163,"dup":71}],167:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"./_descriptors":156,"./_dom-create":157,"./_fails":161,"dup":72}],168:[function(require,module,exports){
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
},{}],169:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"./_cof":152,"dup":73}],170:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":178,"./_wks":216}],171:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":152}],172:[function(require,module,exports){
arguments[4][74][0].apply(exports,arguments)
},{"dup":74}],173:[function(require,module,exports){
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
},{"./_an-object":149}],174:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"./_hide":165,"./_object-create":184,"./_property-desc":196,"./_set-to-string-tag":201,"./_wks":216,"dup":75}],175:[function(require,module,exports){
arguments[4][76][0].apply(exports,arguments)
},{"./_export":160,"./_has":164,"./_hide":165,"./_iter-create":174,"./_iterators":178,"./_library":180,"./_object-gpo":191,"./_redefine":198,"./_set-to-string-tag":201,"./_wks":216,"dup":76}],176:[function(require,module,exports){
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
},{"./_wks":216}],177:[function(require,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"dup":77}],178:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"dup":78}],179:[function(require,module,exports){
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
},{"./_object-keys":193,"./_to-iobject":209}],180:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"dup":79}],181:[function(require,module,exports){
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
},{"./_fails":161,"./_has":164,"./_is-object":172,"./_object-dp":185,"./_uid":213}],182:[function(require,module,exports){
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
},{"./_cof":152,"./_global":163,"./_task":206}],183:[function(require,module,exports){
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
},{"./_fails":161,"./_iobject":169,"./_object-gops":190,"./_object-keys":193,"./_object-pie":194,"./_to-object":211}],184:[function(require,module,exports){
arguments[4][80][0].apply(exports,arguments)
},{"./_an-object":149,"./_dom-create":157,"./_enum-bug-keys":158,"./_html":166,"./_object-dps":186,"./_shared-key":202,"dup":80}],185:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"./_an-object":149,"./_descriptors":156,"./_ie8-dom-define":167,"./_to-primitive":212,"dup":81}],186:[function(require,module,exports){
arguments[4][82][0].apply(exports,arguments)
},{"./_an-object":149,"./_descriptors":156,"./_object-dp":185,"./_object-keys":193,"dup":82}],187:[function(require,module,exports){
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
},{"./_descriptors":156,"./_has":164,"./_ie8-dom-define":167,"./_object-pie":194,"./_property-desc":196,"./_to-iobject":209,"./_to-primitive":212}],188:[function(require,module,exports){
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

},{"./_object-gopn":189,"./_to-iobject":209}],189:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":158,"./_object-keys-internal":192}],190:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],191:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"./_has":164,"./_shared-key":202,"./_to-object":211,"dup":83}],192:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"./_array-includes":150,"./_has":164,"./_shared-key":202,"./_to-iobject":209,"dup":84}],193:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"./_enum-bug-keys":158,"./_object-keys-internal":192,"dup":85}],194:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],195:[function(require,module,exports){
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
},{"./_core":153,"./_export":160,"./_fails":161}],196:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"dup":86}],197:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":165}],198:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"./_hide":165,"dup":87}],199:[function(require,module,exports){
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
},{"./_an-object":149,"./_ctx":154,"./_is-object":172,"./_object-gopd":187}],200:[function(require,module,exports){
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
},{"./_core":153,"./_descriptors":156,"./_global":163,"./_object-dp":185,"./_wks":216}],201:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"./_has":164,"./_object-dp":185,"./_wks":216,"dup":88}],202:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"./_shared":203,"./_uid":213,"dup":89}],203:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"./_global":163,"dup":90}],204:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":146,"./_an-object":149,"./_wks":216}],205:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"./_defined":155,"./_to-integer":208,"dup":91}],206:[function(require,module,exports){
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
},{"./_cof":152,"./_ctx":154,"./_dom-create":157,"./_global":163,"./_html":166,"./_invoke":168}],207:[function(require,module,exports){
arguments[4][92][0].apply(exports,arguments)
},{"./_to-integer":208,"dup":92}],208:[function(require,module,exports){
arguments[4][93][0].apply(exports,arguments)
},{"dup":93}],209:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"./_defined":155,"./_iobject":169,"dup":94}],210:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"./_to-integer":208,"dup":95}],211:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"./_defined":155,"dup":96}],212:[function(require,module,exports){
arguments[4][97][0].apply(exports,arguments)
},{"./_is-object":172,"dup":97}],213:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"dup":98}],214:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":153,"./_global":163,"./_library":180,"./_object-dp":185,"./_wks-ext":215}],215:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":216}],216:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"./_global":163,"./_shared":203,"./_uid":213,"dup":99}],217:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"./_classof":151,"./_core":153,"./_iterators":178,"./_wks":216,"dup":100}],218:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"./_add-to-unscopables":147,"./_iter-define":175,"./_iter-step":177,"./_iterators":178,"./_to-iobject":209,"dup":103}],219:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":160}],220:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":160,"./_global":163}],221:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":160,"./_object-assign":183}],222:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":160,"./_object-create":184}],223:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":156,"./_export":160,"./_object-dp":185}],224:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":187,"./_object-sap":195,"./_to-iobject":209}],225:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":191,"./_object-sap":195,"./_to-object":211}],226:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":160,"./_set-proto":199}],227:[function(require,module,exports){

},{}],228:[function(require,module,exports){
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
},{"./_a-function":146,"./_an-instance":148,"./_classof":151,"./_core":153,"./_ctx":154,"./_export":160,"./_for-of":162,"./_global":163,"./_is-object":172,"./_iter-detect":176,"./_library":180,"./_microtask":182,"./_redefine-all":197,"./_set-species":200,"./_set-to-string-tag":201,"./_species-constructor":204,"./_task":206,"./_wks":216}],229:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"./_iter-define":175,"./_string-at":205,"dup":104}],230:[function(require,module,exports){
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
},{"./_an-object":149,"./_descriptors":156,"./_enum-keys":159,"./_export":160,"./_fails":161,"./_global":163,"./_has":164,"./_hide":165,"./_is-array":171,"./_keyof":179,"./_library":180,"./_meta":181,"./_object-create":184,"./_object-dp":185,"./_object-gopd":187,"./_object-gopn":189,"./_object-gopn-ext":188,"./_object-gops":190,"./_object-keys":193,"./_object-pie":194,"./_property-desc":196,"./_redefine":198,"./_set-to-string-tag":201,"./_shared":203,"./_to-iobject":209,"./_to-primitive":212,"./_uid":213,"./_wks":216,"./_wks-define":214,"./_wks-ext":215}],231:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":214}],232:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":214}],233:[function(require,module,exports){
arguments[4][105][0].apply(exports,arguments)
},{"./_global":163,"./_hide":165,"./_iterators":178,"./_wks":216,"./es6.array.iterator":218,"dup":105}]},{},[48])