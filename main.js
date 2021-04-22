(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../../../libs/web/core/src/index.ts":
/*!**************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/index.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_versions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/versions */ "../../../../libs/web/core/src/utils/versions.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "versions", function() { return _utils_versions__WEBPACK_IMPORTED_MODULE_0__["versions"]; });

/* harmony import */ var _lib_web_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/web-core */ "../../../../libs/web/core/src/lib/web-core.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _lib_web_core__WEBPACK_IMPORTED_MODULE_1__) if(["versions","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _lib_web_core__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),

/***/ "../../../../libs/web/core/src/lib/decorators/attr.ts":
/*!****************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/decorators/attr.ts ***!
  \****************************************************************************/
/*! exports provided: Attr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attr", function() { return Attr; });
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ "../../../../node_modules/reflect-metadata/Reflect.js");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);

function Attr(entity) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target, property) => {
    if (entity !== undefined) {
      target[property] = new entity();
    }

    target.attributeChangedCallback = function (name, prev, next) {
      if (prev !== next) {
        this[name] = next;
      }

      if (target.onChanges) {
        this.onChanges({
          name,
          prev,
          next
        });
      }
    };
  };
}

/***/ }),

/***/ "../../../../libs/web/core/src/lib/decorators/element.ts":
/*!*******************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/decorators/element.ts ***!
  \*******************************************************************************/
/*! exports provided: Element */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return Element; });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities */ "../../../../libs/web/core/src/lib/utilities/index.ts");

const Element = config => target => {
  var _target$prototype$con, _target$prototype$dis;

  Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["validateSelector"])(config);
  Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["validateTemplate"])(config);
  const connectedCallback = (_target$prototype$con = target.prototype.connectedCallback) !== null && _target$prototype$con !== void 0 ? _target$prototype$con : _utilities__WEBPACK_IMPORTED_MODULE_0__["noop"];
  const disconnectedCallback = (_target$prototype$dis = target.prototype.disconnectedCallback) !== null && _target$prototype$dis !== void 0 ? _target$prototype$dis : _utilities__WEBPACK_IMPORTED_MODULE_0__["noop"];
  const template = document.createElement('template');

  if (config.style) {
    config.template = `${config.style} ${config.template}`;
  }

  template.innerHTML = config.template;

  target.prototype.connectedCallback = function () {
    const clone = document.importNode(template.content, true);

    if (config.useShadow) {
      this.attachShadow({
        mode: 'open'
      }).appendChild(clone);
    } else {
      this.appendChild(clone);
    }

    connectedCallback.call(this);
    /** Coleta dependências para injeção */

    if (config.providers && this.onInject) {
      this.onInject(Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["applyInjectors"])(config));
    }

    if (this.onConnect) {
      this.onConnect();
    }
  };

  target.prototype.disconnectedCallback = function () {
    if (this.beforeDestroy) {
      this.beforeDestroy();
    }

    disconnectedCallback.call(this);

    if (this.onDestroy) {
      this.onDestroy();
    }
  };

  customElements.define(config.selector, target);
};

/***/ }),

/***/ "../../../../libs/web/core/src/lib/decorators/extend-element.ts":
/*!**************************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/decorators/extend-element.ts ***!
  \**************************************************************************************/
/*! exports provided: ExtendElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtendElement", function() { return ExtendElement; });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utilities */ "../../../../libs/web/core/src/lib/utilities/index.ts");

const ExtendElement = config => target => {
  var _target$prototype$con, _target$prototype$dis;

  Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["validateSelector"])(config);
  Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["validateExtend"])(config);
  const connectedCallback = (_target$prototype$con = target.prototype.connectedCallback) !== null && _target$prototype$con !== void 0 ? _target$prototype$con : _utilities__WEBPACK_IMPORTED_MODULE_0__["noop"];
  const disconnectedCallback = (_target$prototype$dis = target.prototype.disconnectedCallback) !== null && _target$prototype$dis !== void 0 ? _target$prototype$dis : _utilities__WEBPACK_IMPORTED_MODULE_0__["noop"];

  target.prototype.connectedCallback = function () {
    if (this.onInit) {
      this.onInit();
    }

    connectedCallback.call(this);
    /** Coleta dependências para injeção */

    if (config.providers && this.onInject) {
      this.onInject(Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["applyInjectors"])(config));
    }

    if (this.onConnect) {
      this.onConnect();
    }
  };

  target.prototype.attributeChangedCallback = function (name, prev, next) {
    if (prev !== next) {
      this[name] = next;
    }
    /**
     * Caso tenha um método onChanges
     * executa encaminhando os valores
     */


    if (this.onChanges) {
      this.onChanges({
        name,
        prev,
        next
      });
    }
  };

  target.prototype.disconnectedCallback = function () {
    if (this.beforeDestroy) {
      this.beforeDestroy();
    }

    disconnectedCallback.call(this);

    if (this.onDestroy) {
      this.onDestroy();
    }
  };

  customElements.define(config.selector, target, {
    extends: config.extend
  });
};

/***/ }),

/***/ "../../../../libs/web/core/src/lib/decorators/index.ts":
/*!*****************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/decorators/index.ts ***!
  \*****************************************************************************/
/*! exports provided: ExtendElement, RenderElement, Element, Attr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _extend_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extend-element */ "../../../../libs/web/core/src/lib/decorators/extend-element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExtendElement", function() { return _extend_element__WEBPACK_IMPORTED_MODULE_0__["ExtendElement"]; });

/* harmony import */ var _render_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render-element */ "../../../../libs/web/core/src/lib/decorators/render-element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderElement", function() { return _render_element__WEBPACK_IMPORTED_MODULE_1__["RenderElement"]; });

/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./element */ "../../../../libs/web/core/src/lib/decorators/element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return _element__WEBPACK_IMPORTED_MODULE_2__["Element"]; });

/* harmony import */ var _attr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attr */ "../../../../libs/web/core/src/lib/decorators/attr.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attr", function() { return _attr__WEBPACK_IMPORTED_MODULE_3__["Attr"]; });






/***/ }),

/***/ "../../../../libs/web/core/src/lib/decorators/render-element.ts":
/*!**************************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/decorators/render-element.ts ***!
  \**************************************************************************************/
/*! exports provided: RenderElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderElement", function() { return RenderElement; });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities */ "../../../../libs/web/core/src/lib/utilities/index.ts");

const RenderElement = config => target => {
  var _target$prototype$con, _target$prototype$dis;

  Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["validateSelector"])(config);
  const connectedCallback = (_target$prototype$con = target.prototype.connectedCallback) !== null && _target$prototype$con !== void 0 ? _target$prototype$con : _utilities__WEBPACK_IMPORTED_MODULE_0__["noop"];
  const disconnectedCallback = (_target$prototype$dis = target.prototype.disconnectedCallback) !== null && _target$prototype$dis !== void 0 ? _target$prototype$dis : _utilities__WEBPACK_IMPORTED_MODULE_0__["noop"];
  const template = document.createElement('template');

  target.prototype.connectedCallback = function () {
    if (this.render) {
      template.innerHTML = this.render.call(this);
    }

    const clone = document.importNode(template.content, true);

    if (config.useShadow) {
      this.attachShadow({
        mode: 'open'
      }).appendChild(clone);
    } else {
      this.appendChild(clone);
    }

    connectedCallback.call(this);
    /** Coleta dependências para injeção */

    if (config.providers && this.onInject) {
      this.onInject(Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["applyInjectors"])(config));
    }

    if (this.onConnect) {
      this.onConnect();
    }
  };

  target.prototype.attributeChangedCallback = function (name, prev, next) {
    this[name] = next;
  };

  target.prototype.disconnectedCallback = function () {
    if (this.beforeDestroy) {
      this.beforeDestroy();
    }

    disconnectedCallback.call(this);

    if (this.onDestroy) {
      this.onDestroy();
    }
  };

  customElements.define(config.selector, target);
};

/***/ }),

/***/ "../../../../libs/web/core/src/lib/injectors/index.ts":
/*!****************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/injectors/index.ts ***!
  \****************************************************************************/
/*! exports provided: injector, Inject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _injector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./injector */ "../../../../libs/web/core/src/lib/injectors/injector.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "injector", function() { return _injector__WEBPACK_IMPORTED_MODULE_0__["injector"]; });

/* harmony import */ var _inject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inject */ "../../../../libs/web/core/src/lib/injectors/inject.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Inject", function() { return _inject__WEBPACK_IMPORTED_MODULE_1__["Inject"]; });




/***/ }),

/***/ "../../../../libs/web/core/src/lib/injectors/inject.ts":
/*!*****************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/injectors/inject.ts ***!
  \*****************************************************************************/
/*! exports provided: Inject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Inject", function() { return Inject; });
/* harmony import */ var _injector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./injector */ "../../../../libs/web/core/src/lib/injectors/injector.ts");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reflect-metadata */ "../../../../node_modules/reflect-metadata/Reflect.js");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_1__);


function Inject(entity) {
  return (target, property) => {
    if (!(target[property] instanceof entity)) {
      target[property] = _injector__WEBPACK_IMPORTED_MODULE_0__["injector"].get(entity);
      console.log(target[property]);
    }

    target.attributeChangedCallback = function (name, prev, next) {
      this[name] = next;

      if (target.onChanges) {
        target.onChanges();
      }
    };
  };
}

/***/ }),

/***/ "../../../../libs/web/core/src/lib/injectors/injector.ts":
/*!*******************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/injectors/injector.ts ***!
  \*******************************************************************************/
/*! exports provided: injector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injector", function() { return injector; });
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "../../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services */ "../../../../libs/web/core/src/lib/services/index.ts");




class Injector {
  constructor(providers = []) {
    this.providers = providers;
    this._container = new Map();
    providers.forEach(service => this._container.set(service, new service()));
  }

  set(service) {
    this._container.set(service, new service());
  }

  get(service) {
    const serviceInstance = this._container.get(service);

    if (!serviceInstance) {
      throw Error('Provider not found');
    }

    return serviceInstance;
  }

}

const injector = new Injector([_services__WEBPACK_IMPORTED_MODULE_2__["Http"]]);

/***/ }),

/***/ "../../../../libs/web/core/src/lib/interfaces/index.ts":
/*!*****************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/interfaces/index.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _on_changes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./on-changes */ "../../../../libs/web/core/src/lib/interfaces/on-changes.ts");
/* harmony import */ var _on_changes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_on_changes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _on_changes__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _on_changes__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _on_destroy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./on-destroy */ "../../../../libs/web/core/src/lib/interfaces/on-destroy.ts");
/* harmony import */ var _on_destroy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_on_destroy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _on_destroy__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _on_destroy__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _on_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./on-connect */ "../../../../libs/web/core/src/lib/interfaces/on-connect.ts");
/* harmony import */ var _on_connect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_on_connect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _on_connect__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _on_connect__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _on_inject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./on-inject */ "../../../../libs/web/core/src/lib/interfaces/on-inject.ts");
/* harmony import */ var _on_inject__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_on_inject__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _on_inject__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _on_inject__WEBPACK_IMPORTED_MODULE_3__[key]; }) }(__WEBPACK_IMPORT_KEY__));





/***/ }),

/***/ "../../../../libs/web/core/src/lib/interfaces/on-changes.ts":
/*!**********************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/interfaces/on-changes.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../../libs/web/core/src/lib/interfaces/on-connect.ts":
/*!**********************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/interfaces/on-connect.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../../libs/web/core/src/lib/interfaces/on-destroy.ts":
/*!**********************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/interfaces/on-destroy.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../../libs/web/core/src/lib/interfaces/on-inject.ts":
/*!*********************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/interfaces/on-inject.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../../libs/web/core/src/lib/services/http.ts":
/*!**************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/services/http.ts ***!
  \**************************************************************************/
/*! exports provided: Http */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Http", function() { return Http; });
/* harmony import */ var _home_runner_work_seek_seek_node_modules_nrwl_web_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/@babel/runtime/helpers/esm/defineProperty */ "../../../../node_modules/@nrwl/web/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "../../../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs_ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/ajax */ "../../../../node_modules/rxjs/_esm5/ajax/index.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_home_runner_work_seek_seek_node_modules_nrwl_web_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



class Http {
  get(input) {
    return Object(rxjs_ajax__WEBPACK_IMPORTED_MODULE_2__["ajax"])(this._getConfig(input, 'GET')).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(response => response.response));
  }

  post(input) {
    return Object(rxjs_ajax__WEBPACK_IMPORTED_MODULE_2__["ajax"])(this._getConfig(input, 'POST')).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(response => response.response));
  }

  pur(input) {
    return Object(rxjs_ajax__WEBPACK_IMPORTED_MODULE_2__["ajax"])(this._getConfig(input, 'PUT')).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(response => response.response));
  }

  patch(input) {
    return Object(rxjs_ajax__WEBPACK_IMPORTED_MODULE_2__["ajax"])(this._getConfig(input, 'PATCH')).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(response => response.response));
  }

  delete(input) {
    return Object(rxjs_ajax__WEBPACK_IMPORTED_MODULE_2__["ajax"])(this._getConfig(input, 'DELETE')).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(response => response.response));
  }

  _getConfig(input, method) {
    return typeof input === 'string' ? {
      url: input,
      method
    } : _objectSpread(_objectSpread({}, input), {}, {
      method
    });
  }

}

/***/ }),

/***/ "../../../../libs/web/core/src/lib/services/index.ts":
/*!***************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/services/index.ts ***!
  \***************************************************************************/
/*! exports provided: Http */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http */ "../../../../libs/web/core/src/lib/services/http.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Http", function() { return _http__WEBPACK_IMPORTED_MODULE_0__["Http"]; });



/***/ }),

/***/ "../../../../libs/web/core/src/lib/template/html.ts":
/*!**************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/template/html.ts ***!
  \**************************************************************************/
/*! exports provided: htmlify, html */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "htmlify", function() { return htmlify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "../../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.reduce.js */ "../../../../node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__);





/**
 * ### Template literals &nbsp; 🚧  &nbsp; Experimental &nbsp; 🚧
 *
 * Experiências pra melhorar solução de data binding e consequentemente e também
 * a solução do arquivo de template, mais informações dos links abaixo:
 *
 * - Escopo de data binding: https://github.com/guiseek/swap/issues/13
 * - Solução de template: https://github.com/guiseek/swap/issues/12
 *
 */
let counter = 0;

function generateId() {
  counter++;
  return `p-${counter}-${Date.now()}`;
}
/**
 * Generate Nodes
 *
 * @param {Node} doc
 * @param {...any[]} partials
 */


function generateNodes(doc, ...partials) {
  const placeholders = [];

  function reducer(carry, partial) {
    if (partial && partial.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
      partial = partial.childNodes;
    }

    if (Array.isArray(partial)) {
      carry.concat(partial);
    } else if (typeof partial === 'object' && partial instanceof Node) {
      const id = generateId();
      placeholders.push({
        id,
        node: partial
      });
      return carry.concat(`<${partial.nodeName} id="${id}"></${partial.nodeName}>`);
    } else if (partial && typeof partial.item == 'function' && typeof partial.length == 'number') {
      return carry.concat(Array.prototype.reduce.call(partial, reducer, []));
    } else {
      return carry.concat(partial);
    }
  }

  const html = partials.reduce(reducer, []).join('').replace(/^\s*</, '<').replace(/>\s*$/, '>');
  const template = doc.createElement('template');
  template.innerHTML = html;
  const container = template.content; //

  placeholders.forEach(({
    id,
    node
  }) => {
    const placeholder = container.querySelector(`${node.nodeName}#${id}`);
    placeholder.parentNode.replaceChild(node, placeholder);
  });
  let shouldBeFragment = false;

  for (let i = 0; i < partials.length; i++) {
    if (partials[i] == '') {
      continue;
    } else if (partials[i] instanceof Node) {
      shouldBeFragment = true;
      break;
    } else {
      break;
    }
  }

  if (container.childNodes.length == 1 && !shouldBeFragment) {
    const child = container.firstChild;
    container.removeChild(child);
    return child;
  } else {
    return container;
  }

  return container;
}
/**
 * Tagged Template Handler
 *
 * @param {Node} doc
 * @param {TemplateStringsArray} strings
 * @param {...string[]} values
 * @returns
 */


function taggedTemplateHandler(doc, strings, ...values) {
  // Create an array that puts the values back in their place
  const arr = strings.reduce((carry, current, index) => {
    return carry.concat(current, index + 1 === strings.length ? [] : values[index]);
  }, []);
  return generateNodes(doc, ...arr);
}

function htmlify(strings, ...values) {
  let doc = document;

  if (this) {
    if (this.nodeType == Node.DOCUMENT_NODE) {
      doc = this;
    } else if (this.ownerDocument) {
      doc = this.ownerDocument;
    }
  }

  return taggedTemplateHandler(doc, strings, ...values); // return strings.map((str, i) => str + (values[i] ?? '')).join('');
}
/**
 * ### Template literals &nbsp; 🚧  &nbsp; Experimental &nbsp; 🚧
 *
 * Experiências pra melhorar solução de data binding e consequentemente e também
 * a solução do arquivo de template, mais informações dos links abaixo:
 *
 * - Escopo de data binding: https://github.com/guiseek/swap/issues/13
 * - Solução de template: https://github.com/guiseek/swap/issues/12
 *
 */

function html(strings, ...values) {
  return strings.map((str, i) => {
    var _values$i;

    return str + ((_values$i = values[i]) !== null && _values$i !== void 0 ? _values$i : '');
  }).join('');
}

/***/ }),

/***/ "../../../../libs/web/core/src/lib/template/i18n.ts":
/*!**************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/template/i18n.ts ***!
  \**************************************************************************/
/*! exports provided: Parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parse", function() { return Parse; });
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "../../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_reduce_right_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.reduce-right.js */ "../../../../node_modules/core-js/modules/es.array.reduce-right.js");
/* harmony import */ var core_js_modules_es_array_reduce_right_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_right_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__);




const typeInfoRegex = /^:([a-z])(\((.+)\))?/;
class Parse {
  static use({
    locale,
    defaultCurrency,
    messageBundle
  }) {
    Parse.locale = locale;
    Parse.defaultCurrency = defaultCurrency;
    Parse.messageBundle = messageBundle;
    return Parse.translate;
  }

  static translate(strings, ...values) {
    const translationKey = Parse._buildKey(strings);

    const translationString = Parse.messageBundle[translationKey];

    if (translationString) {
      const typeInfoForValues = strings.slice(1).map(Parse._extractTypeInfo);
      const localizedValues = values.map((v, i) => Parse._localize(v, typeInfoForValues[i]));
      return Parse._buildMessage(translationString, ...localizedValues);
    }

    return 'Error: translation missing!';
  }

  static _buildMessage(str, ...values) {
    return str.replace(/{(\d)}/g, (_, index) => values[Number(index)]);
  }

  static _buildKey(strings) {
    const stripType = s => s.replace(typeInfoRegex, '');

    const lastPartialKey = stripType(strings[strings.length - 1]);

    const prependPartialKey = (memo, curr, i) => {
      return `${stripType(curr)}{${i}}${memo}`;
    };

    return strings.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey);
  }

  static _localize(value, {
    type,
    options
  }) {
    return Parse._localizers[type](value, options);
  }

  static _extractTypeInfo(str) {
    const match = typeInfoRegex.exec(str);

    if (match) {
      return {
        type: match[1],
        options: match[3]
      };
    } else {
      return {
        type: 's',
        options: ''
      };
    }
  }

}
Parse.locale = void 0;
Parse.defaultCurrency = void 0;
Parse.messageBundle = void 0;
Parse._localizers = {
  s
  /*string*/
  : v => v.toLocaleString(Parse.locale),
  c
  /*currency*/
  : (v, currency) => v.toLocaleString(Parse.locale, {
    style: 'currency',
    currency: currency || Parse.defaultCurrency
  }),
  n
  /*number*/
  : (v, fractionalDigits) => v.toLocaleString(Parse.locale, {
    minimumFractionDigits: fractionalDigits,
    maximumFractionDigits: fractionalDigits
  })
};

/***/ }),

/***/ "../../../../libs/web/core/src/lib/template/index.ts":
/*!***************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/template/index.ts ***!
  \***************************************************************************/
/*! exports provided: htmlify, html, Parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html */ "../../../../libs/web/core/src/lib/template/html.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "htmlify", function() { return _html__WEBPACK_IMPORTED_MODULE_0__["htmlify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return _html__WEBPACK_IMPORTED_MODULE_0__["html"]; });

/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "../../../../libs/web/core/src/lib/template/i18n.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Parse", function() { return _i18n__WEBPACK_IMPORTED_MODULE_1__["Parse"]; });




/***/ }),

/***/ "../../../../libs/web/core/src/lib/types/attr-change.ts":
/*!******************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/types/attr-change.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../../libs/web/core/src/lib/types/element-config.ts":
/*!*********************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/types/element-config.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../../libs/web/core/src/lib/types/extend-element-config.ts":
/*!****************************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/types/extend-element-config.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../../libs/web/core/src/lib/types/http.ts":
/*!***********************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/types/http.ts ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../../libs/web/core/src/lib/types/index.ts":
/*!************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/types/index.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _extend_element_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extend-element-config */ "../../../../libs/web/core/src/lib/types/extend-element-config.ts");
/* harmony import */ var _extend_element_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_extend_element_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _extend_element_config__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _extend_element_config__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _render_element_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render-element-config */ "../../../../libs/web/core/src/lib/types/render-element-config.ts");
/* harmony import */ var _render_element_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_render_element_config__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _render_element_config__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _render_element_config__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _element_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./element-config */ "../../../../libs/web/core/src/lib/types/element-config.ts");
/* harmony import */ var _element_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_element_config__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _element_config__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _element_config__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _attr_change__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attr-change */ "../../../../libs/web/core/src/lib/types/attr-change.ts");
/* harmony import */ var _attr_change__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_attr_change__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _attr_change__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _attr_change__WEBPACK_IMPORTED_MODULE_3__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _style_mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style-mode */ "../../../../libs/web/core/src/lib/types/style-mode.ts");
/* harmony import */ var _style_mode__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_mode__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _style_mode__WEBPACK_IMPORTED_MODULE_4__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _style_mode__WEBPACK_IMPORTED_MODULE_4__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./platform */ "../../../../libs/web/core/src/lib/types/platform.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "$global", function() { return _platform__WEBPACK_IMPORTED_MODULE_5__["$global"]; });

/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./http */ "../../../../libs/web/core/src/lib/types/http.ts");
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_http__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _http__WEBPACK_IMPORTED_MODULE_6__) if(["$global","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _http__WEBPACK_IMPORTED_MODULE_6__[key]; }) }(__WEBPACK_IMPORT_KEY__));








/***/ }),

/***/ "../../../../libs/web/core/src/lib/types/platform.ts":
/*!***************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/types/platform.ts ***!
  \***************************************************************************/
/*! exports provided: $global */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$global", function() { return $global; });
/**
 * A policy for use with the standard trustedTypes platform API.
 * @public
 */

/**
 * Enables working with trusted types.
 * @public
 */

/**
 * The platform global type.
 * @public
 */

/**
 * A reference to globalThis, with support
 * for browsers that don't yet support the spec.
 * @public
 */
const $global = function () {
  if (typeof globalThis !== 'undefined') {
    // We're running in a modern environment.
    return globalThis;
  }

  if (typeof global !== 'undefined') {
    // We're running in NodeJS
    return global;
  }

  if (typeof self !== 'undefined') {
    // We're running in a worker.
    return self;
  }

  if (typeof window !== 'undefined') {
    // We're running in the browser's main thread.
    return window;
  }

  try {
    // Hopefully we never get here...
    // Not all environments allow eval and Function. Use only as a last resort:
    // eslint-disable-next-line no-new-func
    return new Function('return this')();
  } catch (_unused) {
    // If all fails, give up and create an object.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {};
  }
}();
/**
 * Represents a callable type such as a function or an object with a "call" method.
 * @public
 */

/***/ }),

/***/ "../../../../libs/web/core/src/lib/types/render-element-config.ts":
/*!****************************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/types/render-element-config.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../../libs/web/core/src/lib/types/style-mode.ts":
/*!*****************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/types/style-mode.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../../libs/web/core/src/lib/utilities/apply-injectors.ts":
/*!**************************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/utilities/apply-injectors.ts ***!
  \**************************************************************************************/
/*! exports provided: applyInjectors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyInjectors", function() { return applyInjectors; });
/* harmony import */ var _injectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../injectors */ "../../../../libs/web/core/src/lib/injectors/index.ts");

/**
 * Verifica se foram declaradas
 * dependências, coleta pelo injector
 * as instâncias pré criadas e então
 * envia como argumentos no `onInject`
 */

function applyInjectors(config) {
  const providers = [];
  config.providers.map(service => {
    let dep;

    try {
      dep = _injectors__WEBPACK_IMPORTED_MODULE_0__["injector"].get(service);
    } catch (err) {
      _injectors__WEBPACK_IMPORTED_MODULE_0__["injector"].set(service);
      dep = _injectors__WEBPACK_IMPORTED_MODULE_0__["injector"].get(service);
    }

    providers.push(dep);
  });
  return providers;
}

/***/ }),

/***/ "../../../../libs/web/core/src/lib/utilities/index.ts":
/*!****************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/utilities/index.ts ***!
  \****************************************************************************/
/*! exports provided: validateExtend, validateSelector, validateTemplate, applyInjectors, noop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validade_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validade-extend */ "../../../../libs/web/core/src/lib/utilities/validade-extend.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateExtend", function() { return _validade_extend__WEBPACK_IMPORTED_MODULE_0__["validateExtend"]; });

/* harmony import */ var _validate_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validate-selector */ "../../../../libs/web/core/src/lib/utilities/validate-selector.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateSelector", function() { return _validate_selector__WEBPACK_IMPORTED_MODULE_1__["validateSelector"]; });

/* harmony import */ var _validate_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validate-template */ "../../../../libs/web/core/src/lib/utilities/validate-template.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateTemplate", function() { return _validate_template__WEBPACK_IMPORTED_MODULE_2__["validateTemplate"]; });

/* harmony import */ var _apply_injectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./apply-injectors */ "../../../../libs/web/core/src/lib/utilities/apply-injectors.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyInjectors", function() { return _apply_injectors__WEBPACK_IMPORTED_MODULE_3__["applyInjectors"]; });

/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./noop */ "../../../../libs/web/core/src/lib/utilities/noop.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return _noop__WEBPACK_IMPORTED_MODULE_4__["noop"]; });







/***/ }),

/***/ "../../../../libs/web/core/src/lib/utilities/noop.ts":
/*!***************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/utilities/noop.ts ***!
  \***************************************************************************/
/*! exports provided: noop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/**
 * Função utilitária, não faz nada
 */
const noop = () => null;

/***/ }),

/***/ "../../../../libs/web/core/src/lib/utilities/validade-extend.ts":
/*!**************************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/utilities/validade-extend.ts ***!
  \**************************************************************************************/
/*! exports provided: validateExtend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateExtend", function() { return validateExtend; });
/**
 * Função respnsável pela validação do atributo extend obrigatório
 *
 * @param {Pick<ElementConfigExtend, 'extend'} config
 */
function validateExtend(config) {
  if (!config.extend) {
    throw new Error('Construções em outros elementos devem ter um extend');
  }
}

/***/ }),

/***/ "../../../../libs/web/core/src/lib/utilities/validate-selector.ts":
/*!****************************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/utilities/validate-selector.ts ***!
  \****************************************************************************************/
/*! exports provided: validateSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateSelector", function() { return validateSelector; });
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "../../../../node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Função respnsável pela validação do seletor
 * do elemento, é obrigatório ter no mínimo 1 hífen
 *
 * @param {Pick<ElementConfig, 'selector'} config
 */
const validateSelector = config => {
  if (!config.selector.includes('-')) {
    throw new Error('Seletores devem ter no mínimo 1 hífen');
  }
};

/***/ }),

/***/ "../../../../libs/web/core/src/lib/utilities/validate-template.ts":
/*!****************************************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/utilities/validate-template.ts ***!
  \****************************************************************************************/
/*! exports provided: validateTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateTemplate", function() { return validateTemplate; });
/**
 * Função respnsável pela validação do seletor obrigatório
 *
 * @param {Pick<ElementConfig, 'selector'} config
 */
function validateTemplate(config) {
  if (!config.template) {
    throw new Error('Elementos devem ter um template');
  }
}

/***/ }),

/***/ "../../../../libs/web/core/src/lib/web-core.ts":
/*!*********************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/lib/web-core.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "webCore", function() { return webCore; });
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorators */ "../../../../libs/web/core/src/lib/decorators/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExtendElement", function() { return _decorators__WEBPACK_IMPORTED_MODULE_0__["ExtendElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderElement", function() { return _decorators__WEBPACK_IMPORTED_MODULE_0__["RenderElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return _decorators__WEBPACK_IMPORTED_MODULE_0__["Element"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attr", function() { return _decorators__WEBPACK_IMPORTED_MODULE_0__["Attr"]; });

/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interfaces */ "../../../../libs/web/core/src/lib/interfaces/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _interfaces__WEBPACK_IMPORTED_MODULE_1__) if(["webCore","ExtendElement","RenderElement","Element","Attr","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _interfaces__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template */ "../../../../libs/web/core/src/lib/template/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "htmlify", function() { return _template__WEBPACK_IMPORTED_MODULE_2__["htmlify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return _template__WEBPACK_IMPORTED_MODULE_2__["html"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Parse", function() { return _template__WEBPACK_IMPORTED_MODULE_2__["Parse"]; });

/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services */ "../../../../libs/web/core/src/lib/services/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Http", function() { return _services__WEBPACK_IMPORTED_MODULE_3__["Http"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "../../../../libs/web/core/src/lib/types/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_4__) if(["webCore","ExtendElement","RenderElement","Element","Attr","htmlify","html","Parse","Http","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_4__[key]; }) }(__WEBPACK_IMPORT_KEY__));
function webCore() {
  return 'web-core';
}






/***/ }),

/***/ "../../../../libs/web/core/src/utils/versions.ts":
/*!***********************************************************************!*\
  !*** /home/runner/work/seek/seek/libs/web/core/src/utils/versions.ts ***!
  \***********************************************************************/
/*! exports provided: versions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "versions", function() { return versions; });
const versions = {
  '@seek-peer/web-core': '*'
};

/***/ }),

/***/ "../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./app/app.element.scss":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!/home/runner/work/seek/seek/node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!/home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./app/app.element.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "body > *:first-child {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\nmain {\n  height: 100vh;\n}\nmain > header {\n  height: 200px;\n}", '', {"version":3,"sources":["/home/runner/work/seek/seek/apps/web/profile/src/app/app.element.scss"],"names":[],"mappings":"AAAA;EACE,OAAA;EACA,aAAA;EACA,sBAAA;AACF;;AAEA;EACE,aAAA;AACF;AAAE;EACE,aAAA;AAEJ","sourcesContent":["body > *:first-child {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\nmain {\n  height: 100vh;\n  > header {\n    height: 200px;\n  }\n}\n"],"sourceRoot":""}]]

/***/ }),

/***/ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./section/gallery/gallery.element.scss":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!/home/runner/work/seek/seek/node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!/home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./section/gallery/gallery.element.scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "seek-gallery {\n  display: none;\n  padding: 1rem;\n}\n\n@supports (display: grid) {\n  seek-gallery {\n    display: block;\n  }\n}\n.grid {\n  display: grid;\n  grid-gap: 20px;\n  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));\n  grid-auto-rows: 280px;\n  grid-auto-flow: row dense;\n}\n.grid figure {\n  display: flex;\n  position: relative;\n  flex-direction: column;\n  justify-content: flex-end;\n  box-sizing: border-box;\n  background: rgba(2, 2, 2, 0.01);\n  grid-column-start: auto;\n  grid-row-start: auto;\n  border-radius: 6px;\n  overflow: hidden;\n  color: #fff;\n  background-size: cover;\n  background-position: 65% 65%;\n  transition: transform 0.3s ease-in-out;\n}\n.grid figure img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.grid figure:nth-of-type(3n) {\n  grid-column-end: auto;\n}\n@media screen and (min-width: 768px) {\n  .grid figure:nth-of-type(3n) {\n    grid-column: 1/-1;\n    grid-row-end: span 2;\n  }\n}\n.grid figure:nth-of-type(3n) {\n  grid-row-end: span 3;\n}\n.grid figure:nth-of-type(2n) {\n  grid-row-end: span 2;\n}\n.grid figure:after {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0.3;\n  transition: opacity 0.3s ease-in-out, box-shadow 0.9s ease-in-out;\n}\n.grid figure:hover {\n  transform: scale(1.05);\n  box-shadow: -2px 2px 10px 0 rgba(68, 68, 68, 0.4);\n}\n.grid figure:hover:after {\n  opacity: 0;\n}\n.grid figure.medium {\n  grid-row-end: span 2;\n}\n.grid figure.large {\n  grid-row-end: span 3;\n}\n.grid figure.full {\n  grid-column-end: auto;\n}\n.grid figure.top img {\n  object-position: top;\n}\n.grid figure.bottom img {\n  object-position: bottom;\n}\n.grid figure.left img {\n  object-position: left;\n}\n.grid figure.right img {\n  object-position: right;\n}\n@media screen and (min-width: 768px) {\n  .grid figure.full {\n    grid-column: 1/-1;\n    grid-row-end: span 2;\n  }\n}\n.grid figcaption {\n  z-index: 1;\n  padding: 15px;\n  font-size: medium;\n  position: relative;\n  letter-spacing: 1px;\n  color: rgba(0, 0, 0, 0);\n  transition: background-color 0.3s ease-in-out, color 0.2s ease-in-out;\n  text-align: center;\n}\n.grid figure:hover figcaption {\n  color: rgba(0, 0, 0, 0.8);\n}", '', {"version":3,"sources":["/home/runner/work/seek/seek/apps/web/profile/src/section/gallery/gallery.element.scss"],"names":[],"mappings":"AAAA;EACE,aAAA;EACA,aAAA;AACF;;AAEA;EACE;IACE,cAAA;EACF;AACF;AAEA;EACE,aAAA;EACA,cAAA;EACA,2DAAA;EACA,qBAAA;EACA,yBAAA;AAAF;AAEE;EACE,aAAA;EACA,kBAAA;EACA,sBAAA;EACA,yBAAA;EACA,sBAAA;EACA,+BAAA;EACA,uBAAA;EACA,oBAAA;EACA,kBAAA;EACA,gBAAA;EACA,WAAA;EACA,sBAAA;EACA,4BAAA;EAEA,sCAAA;AADJ;AAGI;EACE,WAAA;EACA,YAAA;EACA,iBAAA;AADN;AAKE;EACE,qBAAA;AAHJ;AAME;EACE;IACE,iBAAA;IACA,oBAAA;EAJJ;AACF;AAOE;EACE,oBAAA;AALJ;AAQE;EACE,oBAAA;AANJ;AASE;EACE,WAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,iEAAA;AAPJ;AAUE;EACE,sBAAA;EACA,iDAAA;AARJ;AAWE;EACE,UAAA;AATJ;AAYE;EACE,oBAAA;AAVJ;AAaE;EACE,oBAAA;AAXJ;AAcE;EACE,qBAAA;AAZJ;AAeE;EACE,oBAAA;AAbJ;AAeE;EACE,uBAAA;AAbJ;AAgBE;EACE,qBAAA;AAdJ;AAiBE;EACE,sBAAA;AAfJ;AAkBE;EACE;IACE,iBAAA;IACA,oBAAA;EAhBJ;AACF;AAmBE;EACE,UAAA;EACA,aAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;EACA,uBAAA;EAEA,qEAAA;EACA,kBAAA;AAlBJ;AAqBE;EACE,yBAAA;AAnBJ","sourcesContent":["seek-gallery {\n  display: none;\n  padding: 1rem;\n}\n\n@supports (display: grid) {\n  seek-gallery {\n    display: block;\n  }\n}\n\n.grid {\n  display: grid;\n  grid-gap: 20px;\n  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));\n  grid-auto-rows: 280px;\n  grid-auto-flow: row dense;\n\n  figure {\n    display: flex;\n    position: relative;\n    flex-direction: column;\n    justify-content: flex-end;\n    box-sizing: border-box;\n    background: rgba(2, 2, 2, 0.01);\n    grid-column-start: auto;\n    grid-row-start: auto;\n    border-radius: 6px;\n    overflow: hidden;\n    color: #fff;\n    background-size: cover;\n    background-position: 65% 65%;\n    // box-shadow: -2px 2px 10px 0 rgba(68, 68, 68, 0.4);\n    transition: transform 0.3s ease-in-out;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }\n  }\n\n  figure:nth-of-type(3n) {\n    grid-column-end: auto;\n  }\n\n  @media screen and (min-width: 768px) {\n    figure:nth-of-type(3n) {\n      grid-column: 1 / -1;\n      grid-row-end: span 2;\n    }\n  }\n\n  figure:nth-of-type(3n) {\n    grid-row-end: span 3;\n  }\n\n  figure:nth-of-type(2n) {\n    grid-row-end: span 2;\n  }\n\n  figure:after {\n    content: '';\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    opacity: 0.3;\n    transition: opacity 0.3s ease-in-out, box-shadow 0.9s ease-in-out;\n  }\n\n  figure:hover {\n    transform: scale(1.05);\n    box-shadow: -2px 2px 10px 0 rgba(68, 68, 68, 0.4);\n  }\n\n  figure:hover:after {\n    opacity: 0;\n  }\n\n  figure.medium {\n    grid-row-end: span 2;\n  }\n\n  figure.large {\n    grid-row-end: span 3;\n  }\n\n  figure.full {\n    grid-column-end: auto;\n  }\n\n  figure.top img {\n    object-position: top;\n  }\n  figure.bottom img {\n    object-position: bottom;\n  }\n\n  figure.left img {\n    object-position: left;\n  }\n\n  figure.right img {\n    object-position: right;\n  }\n\n  @media screen and (min-width: 768px) {\n    figure.full {\n      grid-column: 1 / -1;\n      grid-row-end: span 2;\n    }\n  }\n\n  figcaption {\n    z-index: 1;\n    padding: 15px;\n    font-size: medium;\n    position: relative;\n    letter-spacing: 1px;\n    color: rgba(0, 0, 0, 0);\n    // background: hsla(0, 0%, 100%, 0.1);\n    transition: background-color 0.3s ease-in-out, color 0.2s ease-in-out;\n    text-align: center;\n  }\n\n  figure:hover figcaption {\n    color: rgba(0, 0, 0, 0.8);\n  }\n}\n"],"sourceRoot":""}]]

/***/ }),

/***/ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./section/hero-banner/hero-banner.element.scss":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!/home/runner/work/seek/seek/node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!/home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./section/hero-banner/hero-banner.element.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "seek-hero-banner {\n  flex: 1;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n  position: relative;\n  background-image: url(\"assets/images/relational.svg\");\n  background-position: calc(var(--x, 0) * -1px) calc(var(--y, 0) * -1px);\n  background-size: contain;\n}\nseek-hero-banner .seek-front-end,\nseek-hero-banner .seek-code-editor {\n  width: 100vw;\n  height: calc(100vh - 140px);\n}\nseek-hero-banner > header {\n  width: 100vw;\n  height: 220px;\n  display: flex;\n  position: absolute;\n  bottom: 0px;\n  flex-direction: column;\n  align-items: center;\n  background: white;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, white 100%);\n}\n\n@media screen and (max-width: 768px) {\n  seek-hero-banner {\n    position: relative;\n  }\n  seek-hero-banner > header {\n    margin-top: calc(100vh - 130px);\n  }\n  seek-hero-banner::before {\n    content: \" \";\n    position: absolute;\n    width: 210px;\n    top: 10px;\n    right: 10px;\n    height: 300px;\n    background-image: url(assets/layers/code-editor.svg);\n    background-size: contain;\n    background-repeat: no-repeat;\n  }\n  seek-hero-banner::after {\n    content: \" \";\n    position: absolute;\n    width: 220px;\n    height: 212.26px;\n    left: 10px;\n    top: 214px;\n    background-image: url(assets/layers/front-end.svg);\n    background-size: contain;\n    background-repeat: no-repeat;\n  }\n  seek-hero-banner .seek-front-end,\nseek-hero-banner .seek-code-editor {\n    height: calc(100vh - 80px);\n    visibility: hidden;\n  }\n}", '', {"version":3,"sources":["/home/runner/work/seek/seek/apps/web/profile/src/section/hero-banner/hero-banner.element.scss"],"names":[],"mappings":"AAAA;EACE,OAAA;EACA,YAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,6BAAA;EACA,mBAAA;EACA,kBAAA;EAEA,qDAAA;EACA,sEAAA;EACA,wBAAA;AAAF;AAEE;;EAEE,YAAA;EACA,2BAAA;AAAJ;AAEE;EACE,YAAA;EACA,aAAA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;EACA,sBAAA;EACA,mBAAA;EACA,iBAAA;EACA,2EAAA;AAAJ;;AAQA;EACE;IACE,kBAAA;EALF;EAME;IACE,+BAAA;EAJJ;EAME;IACE,YAAA;IACA,kBAAA;IACA,YAAA;IACA,SAAA;IACA,WAAA;IACA,aAAA;IACA,oDAAA;IACA,wBAAA;IACA,4BAAA;EAJJ;EAME;IACE,YAAA;IACA,kBAAA;IACA,YAAA;IACA,gBAAA;IACA,UAAA;IACA,UAAA;IACA,kDAAA;IACA,wBAAA;IACA,4BAAA;EAJJ;EAME;;IAEE,0BAAA;IACA,kBAAA;EAJJ;AACF","sourcesContent":["seek-hero-banner {\n  flex: 1;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n  position: relative;\n\n  background-image: url('assets/images/relational.svg');\n  background-position: calc(var(--x, 0) * -1px) calc(var(--y, 0) * -1px);\n  background-size: contain;\n\n  .seek-front-end,\n  .seek-code-editor {\n    width: 100vw;\n    height: calc(100vh - 140px);\n  }\n  > header {\n    width: 100vw;\n    height: 220px;\n    display: flex;\n    position: absolute;\n    bottom: 0px;\n    flex-direction: column;\n    align-items: center;\n    background: rgb(255, 255, 255);\n    background: linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0) 50%,\n      rgba(255, 255, 255, 1) 100%\n    );\n  }\n}\n\n@media screen and (max-width: 768px) {\n  seek-hero-banner {\n    position: relative;\n    > header {\n      margin-top: calc(100vh - 130px);\n    }\n    &::before {\n      content: ' ';\n      position: absolute;\n      width: 210px;\n      top: 10px;\n      right: 10px;\n      height: 300px;\n      background-image: url(assets/layers/code-editor.svg);\n      background-size: contain;\n      background-repeat: no-repeat;\n    }\n    &::after {\n      content: ' ';\n      position: absolute;\n      width: 220px;\n      height: 212.26px;\n      left: 10px;\n      top: 214px;\n      background-image: url(assets/layers/front-end.svg);\n      background-size: contain;\n      background-repeat: no-repeat;\n    }\n    .seek-front-end,\n    .seek-code-editor {\n      height: calc(100vh - 80px);\n      visibility: hidden;\n    }\n  }\n}\n"],"sourceRoot":""}]]

/***/ }),

/***/ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./shared/code-editor/code-editor.element.scss":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!/home/runner/work/seek/seek/node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!/home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./shared/code-editor/code-editor.element.scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, ".seek-code-editor {\n  height: calc(100vh - 300px);\n  display: block;\n  position: relative;\n}\n.seek-code-editor #browser,\n.seek-code-editor #editor,\n.seek-code-editor #file,\n.seek-code-editor #code,\n.seek-code-editor #lib,\n.seek-code-editor #lang {\n  content: \" \";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  background-size: 100%;\n  background-repeat: no-repeat;\n  transition: opacity 250ms ease-in-out;\n}\n.seek-code-editor #browser {\n  background-image: url(\"assets/layers/code-editor/browser.svg\");\n  background-position: calc(var(--x, 0) * 1.5px) calc(var(--y, 0) * 1.5px);\n}\n.seek-code-editor #editor {\n  background-image: url(\"assets/layers/code-editor/editor.svg\");\n  background-position: calc(var(--x, 0) * 1.4px) calc(var(--y, 0) * 1.4px);\n}\n.seek-code-editor #file {\n  background-image: url(\"assets/layers/code-editor/file.svg\");\n  background-position: calc(var(--x, 0) * 1.3px) calc(var(--y, 0) * 1.3px);\n}\n.seek-code-editor #code {\n  background-image: url(\"assets/layers/code-editor/code.svg\");\n  background-position: calc(var(--x, 0) * 1.2px) calc(var(--y, 0) * 1.2px);\n}\n.seek-code-editor #lib {\n  background-image: url(\"assets/layers/code-editor/lib.svg\");\n  background-position: calc(var(--x, 0) * 1.1px) calc(var(--y, 0) * 1.1px);\n}\n.seek-code-editor #lang {\n  background-image: url(\"assets/layers/code-editor/lang.svg\");\n  background-position: calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px);\n}", '', {"version":3,"sources":["/home/runner/work/seek/seek/apps/web/profile/src/shared/code-editor/code-editor.element.scss"],"names":[],"mappings":"AAAA;EACE,2BAAA;EACA,cAAA;EACA,kBAAA;AACF;AAAE;;;;;;EAME,YAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,qBAAA;EACA,4BAAA;EACA,qCAAA;AAEJ;AAAE;EACE,8DAAA;EACA,wEAAA;AAEJ;AAAE;EACE,6DAAA;EACA,wEAAA;AAEJ;AAAE;EACE,2DAAA;EACA,wEAAA;AAEJ;AAAE;EACE,2DAAA;EACA,wEAAA;AAEJ;AAAE;EACE,0DAAA;EACA,wEAAA;AAEJ;AAAE;EACE,2DAAA;EACA,oEAAA;AAEJ","sourcesContent":[".seek-code-editor {\n  height: calc(100vh - 300px);\n  display: block;\n  position: relative;\n  #browser,\n  #editor,\n  #file,\n  #code,\n  #lib,\n  #lang {\n    content: ' ';\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    background-size: 100%;\n    background-repeat: no-repeat;\n    transition: opacity 250ms ease-in-out;\n  }\n  #browser {\n    background-image: url('assets/layers/code-editor/browser.svg');\n    background-position: calc(var(--x, 0) * 1.5px) calc(var(--y, 0) * 1.5px);\n  }\n  #editor {\n    background-image: url('assets/layers/code-editor/editor.svg');\n    background-position: calc(var(--x, 0) * 1.4px) calc(var(--y, 0) * 1.4px);\n  }\n  #file {\n    background-image: url('assets/layers/code-editor/file.svg');\n    background-position: calc(var(--x, 0) * 1.3px) calc(var(--y, 0) * 1.3px);\n  }\n  #code {\n    background-image: url('assets/layers/code-editor/code.svg');\n    background-position: calc(var(--x, 0) * 1.2px) calc(var(--y, 0) * 1.2px);\n  }\n  #lib {\n    background-image: url('assets/layers/code-editor/lib.svg');\n    background-position: calc(var(--x, 0) * 1.1px) calc(var(--y, 0) * 1.1px);\n  }\n  #lang {\n    background-image: url('assets/layers/code-editor/lang.svg');\n    background-position: calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px);\n  }\n}\n"],"sourceRoot":""}]]

/***/ }),

/***/ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./shared/front-end/front-end.element.scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!/home/runner/work/seek/seek/node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!/home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./shared/front-end/front-end.element.scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, ".seek-front-end {\n  width: 80%;\n  height: auto;\n  display: block;\n  object-fit: cover;\n  position: relative;\n}\n.seek-front-end #browser,\n.seek-front-end #pages,\n.seek-front-end #templates,\n.seek-front-end #organisms,\n.seek-front-end #molecules,\n.seek-front-end #atoms {\n  content: \" \";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  background-size: 100%;\n  background-repeat: no-repeat;\n  transition: opacity 250ms ease-in-out;\n}\n.seek-front-end #browser {\n  background-image: url(\"assets/layers/front-end/browser.svg\");\n  background-position: calc(var(--x, 0) * 1.5px) calc(var(--y, 0) * 1.5px);\n}\n.seek-front-end #pages {\n  background-image: url(\"assets/layers/front-end/pages.svg\");\n  background-position: calc(var(--x, 0) * 1.4px) calc(var(--y, 0) * 1.4px);\n}\n.seek-front-end #templates {\n  background-image: url(\"assets/layers/front-end/templates.svg\");\n  background-position: calc(var(--x, 0) * 1.3px) calc(var(--y, 0) * 1.3px);\n}\n.seek-front-end #organisms {\n  background-image: url(\"assets/layers/front-end/organisms.svg\");\n  background-position: calc(var(--x, 0) * 1.2px) calc(var(--y, 0) * 1.2px);\n}\n.seek-front-end #molecules {\n  background-image: url(\"assets/layers/front-end/molecules.svg\");\n  background-position: calc(var(--x, 0) * 1.1px) calc(var(--y, 0) * 1.1px);\n}\n.seek-front-end #atoms {\n  background-image: url(\"assets/layers/front-end/atoms.svg\");\n  background-position: calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px);\n}", '', {"version":3,"sources":["/home/runner/work/seek/seek/apps/web/profile/src/shared/front-end/front-end.element.scss"],"names":[],"mappings":"AAAA;EACE,UAAA;EACA,YAAA;EACA,cAAA;EACA,iBAAA;EACA,kBAAA;AACF;AAAE;;;;;;EAME,YAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,qBAAA;EACA,4BAAA;EACA,qCAAA;AAEJ;AAAE;EACE,4DAAA;EACA,wEAAA;AAEJ;AAAE;EACE,0DAAA;EACA,wEAAA;AAEJ;AAAE;EACE,8DAAA;EACA,wEAAA;AAEJ;AAAE;EACE,8DAAA;EACA,wEAAA;AAEJ;AAAE;EACE,8DAAA;EACA,wEAAA;AAEJ;AAAE;EACE,0DAAA;EACA,oEAAA;AAEJ","sourcesContent":[".seek-front-end {\n  width: 80%;\n  height: auto;\n  display: block;\n  object-fit: cover;\n  position: relative;\n  #browser,\n  #pages,\n  #templates,\n  #organisms,\n  #molecules,\n  #atoms {\n    content: ' ';\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    background-size: 100%;\n    background-repeat: no-repeat;\n    transition: opacity 250ms ease-in-out;\n  }\n  #browser {\n    background-image: url('assets/layers/front-end/browser.svg');\n    background-position: calc(var(--x, 0) * 1.5px) calc(var(--y, 0) * 1.5px);\n  }\n  #pages {\n    background-image: url('assets/layers/front-end/pages.svg');\n    background-position: calc(var(--x, 0) * 1.4px) calc(var(--y, 0) * 1.4px);\n  }\n  #templates {\n    background-image: url('assets/layers/front-end/templates.svg');\n    background-position: calc(var(--x, 0) * 1.3px) calc(var(--y, 0) * 1.3px);\n  }\n  #organisms {\n    background-image: url('assets/layers/front-end/organisms.svg');\n    background-position: calc(var(--x, 0) * 1.2px) calc(var(--y, 0) * 1.2px);\n  }\n  #molecules {\n    background-image: url('assets/layers/front-end/molecules.svg');\n    background-position: calc(var(--x, 0) * 1.1px) calc(var(--y, 0) * 1.1px);\n  }\n  #atoms {\n    background-image: url('assets/layers/front-end/atoms.svg');\n    background-position: calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px);\n  }\n}\n"],"sourceRoot":""}]]

/***/ }),

/***/ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./shared/txt-rotate/txt-rotate.element.scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!/home/runner/work/seek/seek/node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!/home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./shared/txt-rotate/txt-rotate.element.scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "span[is=txt-rotate] > .wrap {\n  border-right: 0.08em solid #666;\n}", '', {"version":3,"sources":["/home/runner/work/seek/seek/apps/web/profile/src/shared/txt-rotate/txt-rotate.element.scss"],"names":[],"mappings":"AAAA;EACE,+BAAA;AACF","sourcesContent":["span[is='txt-rotate'] > .wrap {\n  border-right: 0.08em solid #666;\n}\n"],"sourceRoot":""}]]

/***/ }),

/***/ "../../../../node_modules/core-js/internals/a-function.js":
/*!********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/a-function.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/a-possible-prototype.js":
/*!******************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/a-possible-prototype.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/add-to-unscopables.js":
/*!****************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/add-to-unscopables.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../../../node_modules/core-js/internals/object-create.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../../../node_modules/core-js/internals/object-define-property.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/advance-string-index.js":
/*!******************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/advance-string-index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "../../../../node_modules/core-js/internals/string-multibyte.js").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/an-object.js":
/*!*******************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/an-object.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/array-includes.js":
/*!************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/array-includes.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../../../node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../../../node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/array-method-is-strict.js":
/*!********************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/array-method-is-strict.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/array-method-uses-to-length.js":
/*!*************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/array-method-uses-to-length.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../node_modules/core-js/internals/fails.js");
var has = __webpack_require__(/*! ../internals/has */ "../../../../node_modules/core-js/internals/has.js");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/array-reduce.js":
/*!**********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/array-reduce.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../../../../node_modules/core-js/internals/a-function.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../../../node_modules/core-js/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../../../node_modules/core-js/internals/indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../../../node_modules/core-js/internals/to-length.js");

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/classof-raw.js":
/*!*********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/classof-raw.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/copy-constructor-properties.js":
/*!*************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/copy-constructor-properties.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "../../../../node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "../../../../node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../../../node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../../../node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/correct-is-regexp-logic.js":
/*!*********************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/correct-is-regexp-logic.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/correct-prototype-getter.js":
/*!**********************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/correct-prototype-getter.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "../../../../node_modules/core-js/internals/create-iterator-constructor.js":
/*!*************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/create-iterator-constructor.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "../../../../node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
var create = __webpack_require__(/*! ../internals/object-create */ "../../../../node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../../node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../../../node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../../../node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/create-non-enumerable-property.js":
/*!****************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../../../node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../../node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/create-property-descriptor.js":
/*!************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/create-property-descriptor.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/define-iterator.js":
/*!*************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/define-iterator.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../../node_modules/core-js/internals/export.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "../../../../node_modules/core-js/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../../../node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../../../node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../../../node_modules/core-js/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../../../node_modules/core-js/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../../../node_modules/core-js/internals/is-pure.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../../../node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "../../../../node_modules/core-js/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/descriptors.js":
/*!*********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/descriptors.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "../../../../node_modules/core-js/internals/document-create-element.js":
/*!*********************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/document-create-element.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/dom-iterables.js":
/*!***********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/dom-iterables.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/engine-is-node.js":
/*!************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/engine-is-node.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../../../node_modules/core-js/internals/classof-raw.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "../../../../node_modules/core-js/internals/engine-user-agent.js":
/*!***************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/engine-user-agent.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../../node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "../../../../node_modules/core-js/internals/engine-v8-version.js":
/*!***************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/engine-v8-version.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "../../../../node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "../../../../node_modules/core-js/internals/enum-bug-keys.js":
/*!***********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/enum-bug-keys.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "../../../../node_modules/core-js/internals/export.js":
/*!****************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/export.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../../../node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../../../../node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "../../../../node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../../../node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/fails.js":
/*!***************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/fails.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!********************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(/*! ../modules/es.regexp.exec */ "../../../../node_modules/core-js/modules/es.regexp.exec.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../../../../node_modules/core-js/internals/redefine.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../node_modules/core-js/internals/well-known-symbol.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "../../../../node_modules/core-js/internals/regexp-exec.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../node_modules/core-js/internals/create-non-enumerable-property.js");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/get-built-in.js":
/*!**********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/get-built-in.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "../../../../node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/get-substitution.js":
/*!**************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/get-substitution.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__(/*! ../internals/to-object */ "../../../../node_modules/core-js/internals/to-object.js");

var floor = Math.floor;
var replace = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/global.js":
/*!****************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/global.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "../../../../node_modules/core-js/internals/has.js":
/*!*************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/has.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/hidden-keys.js":
/*!*********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/hidden-keys.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/html.js":
/*!**************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/html.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../../node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "../../../../node_modules/core-js/internals/ie8-dom-define.js":
/*!************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/ie8-dom-define.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../../node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../../../../node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "../../../../node_modules/core-js/internals/indexed-object.js":
/*!************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/indexed-object.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../../../node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "../../../../node_modules/core-js/internals/inspect-source.js":
/*!************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/inspect-source.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ../internals/shared-store */ "../../../../node_modules/core-js/internals/shared-store.js");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "../../../../node_modules/core-js/internals/internal-state.js":
/*!************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/internal-state.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "../../../../node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../node_modules/core-js/internals/create-non-enumerable-property.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "../../../../node_modules/core-js/internals/has.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "../../../../node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../../../node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../../../node_modules/core-js/internals/hidden-keys.js");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/is-forced.js":
/*!*******************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/is-forced.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "../../../../node_modules/core-js/internals/is-object.js":
/*!*******************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/is-object.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/is-pure.js":
/*!*****************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/is-pure.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "../../../../node_modules/core-js/internals/is-regexp.js":
/*!*******************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/is-regexp.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../node_modules/core-js/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../../../node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/iterators-core.js":
/*!************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/iterators-core.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../node_modules/core-js/internals/fails.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../../../node_modules/core-js/internals/object-get-prototype-of.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "../../../../node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../../../node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/iterators.js":
/*!*******************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/iterators.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/native-symbol.js":
/*!***********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/native-symbol.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../../../../node_modules/core-js/internals/fails.js");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "../../../../node_modules/core-js/internals/native-weak-map.js":
/*!*************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/native-weak-map.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "../../../../node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "../../../../node_modules/core-js/internals/not-a-regexp.js":
/*!**********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/not-a-regexp.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "../../../../node_modules/core-js/internals/is-regexp.js");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-create.js":
/*!***********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-create.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "../../../../node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../../../node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../../../node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "../../../../node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "../../../../node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../../../node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-define-properties.js":
/*!**********************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-define-properties.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../../../node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../../../../node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-define-property.js":
/*!********************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-define-property.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../../../node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../../../node_modules/core-js/internals/to-primitive.js");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!********************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../../../node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../../../node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../../../node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../../../node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "../../../../node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../../../node_modules/core-js/internals/ie8-dom-define.js");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-get-own-property-names.js":
/*!***************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-get-own-property-names.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../../../node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../../../node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!*****************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-get-prototype-of.js":
/*!*********************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "../../../../node_modules/core-js/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../../../node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../../../node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "../../../../node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-keys-internal.js":
/*!******************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-keys-internal.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "../../../../node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../node_modules/core-js/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "../../../../node_modules/core-js/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../../../node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-keys.js":
/*!*********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-keys.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../../../node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../../../node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-property-is-enumerable.js":
/*!***************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "../../../../node_modules/core-js/internals/object-set-prototype-of.js":
/*!*********************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../node_modules/core-js/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "../../../../node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "../../../../node_modules/core-js/internals/own-keys.js":
/*!******************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/own-keys.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../../../node_modules/core-js/internals/get-built-in.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../../../node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "../../../../node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../node_modules/core-js/internals/an-object.js");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/path.js":
/*!**************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/path.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");

module.exports = global;


/***/ }),

/***/ "../../../../node_modules/core-js/internals/redefine.js":
/*!******************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/redefine.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "../../../../node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../../../../node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "../../../../node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../../../node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "../../../../node_modules/core-js/internals/regexp-exec-abstract.js":
/*!******************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./classof-raw */ "../../../../node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ./regexp-exec */ "../../../../node_modules/core-js/internals/regexp-exec.js");

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "../../../../node_modules/core-js/internals/regexp-exec.js":
/*!*********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/regexp-exec.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(/*! ./regexp-flags */ "../../../../node_modules/core-js/internals/regexp-flags.js");
var stickyHelpers = __webpack_require__(/*! ./regexp-sticky-helpers */ "../../../../node_modules/core-js/internals/regexp-sticky-helpers.js");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "../../../../node_modules/core-js/internals/regexp-flags.js":
/*!**********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/regexp-flags.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/regexp-sticky-helpers.js":
/*!*******************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ./fails */ "../../../../node_modules/core-js/internals/fails.js");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "../../../../node_modules/core-js/internals/require-object-coercible.js":
/*!**********************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/require-object-coercible.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/set-global.js":
/*!********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/set-global.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../node_modules/core-js/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/set-to-string-tag.js":
/*!***************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/set-to-string-tag.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../../../node_modules/core-js/internals/object-define-property.js").f;
var has = __webpack_require__(/*! ../internals/has */ "../../../../node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/shared-key.js":
/*!********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/shared-key.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "../../../../node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../../../node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/shared-store.js":
/*!**********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/shared-store.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../../../../node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "../../../../node_modules/core-js/internals/shared.js":
/*!****************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/shared.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../../../node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "../../../../node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.8.3',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "../../../../node_modules/core-js/internals/string-multibyte.js":
/*!**************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/string-multibyte.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../../../node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../../node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/to-absolute-index.js":
/*!***************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/to-absolute-index.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../../../node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/to-indexed-object.js":
/*!***************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/to-indexed-object.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../../../node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../../node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/to-integer.js":
/*!********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/to-integer.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/to-length.js":
/*!*******************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/to-length.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../../../node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/to-object.js":
/*!*******************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/to-object.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../../node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/to-primitive.js":
/*!**********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/to-primitive.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../../node_modules/core-js/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/uid.js":
/*!*************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/uid.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "../../../../node_modules/core-js/internals/use-symbol-as-uid.js":
/*!***************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "../../../../node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "../../../../node_modules/core-js/internals/well-known-symbol.js":
/*!***************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/internals/well-known-symbol.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "../../../../node_modules/core-js/internals/shared.js");
var has = __webpack_require__(/*! ../internals/has */ "../../../../node_modules/core-js/internals/has.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../../../node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "../../../../node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../../../../node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "../../../../node_modules/core-js/modules/es.array.iterator.js":
/*!*************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/modules/es.array.iterator.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../../../node_modules/core-js/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../../../node_modules/core-js/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../../../node_modules/core-js/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../../../node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "../../../../node_modules/core-js/internals/define-iterator.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "../../../../node_modules/core-js/modules/es.array.reduce-right.js":
/*!*****************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/modules/es.array.reduce-right.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../../node_modules/core-js/internals/export.js");
var $reduceRight = __webpack_require__(/*! ../internals/array-reduce */ "../../../../node_modules/core-js/internals/array-reduce.js").right;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "../../../../node_modules/core-js/internals/array-method-is-strict.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "../../../../node_modules/core-js/internals/array-method-uses-to-length.js");
var CHROME_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../../../node_modules/core-js/internals/engine-v8-version.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "../../../../node_modules/core-js/internals/engine-is-node.js");

var STRICT_METHOD = arrayMethodIsStrict('reduceRight');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduceRight` method
// https://tc39.es/ecma262/#sec-array.prototype.reduceright
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH || CHROME_BUG }, {
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "../../../../node_modules/core-js/modules/es.array.reduce.js":
/*!***********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/modules/es.array.reduce.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../../node_modules/core-js/internals/export.js");
var $reduce = __webpack_require__(/*! ../internals/array-reduce */ "../../../../node_modules/core-js/internals/array-reduce.js").left;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "../../../../node_modules/core-js/internals/array-method-is-strict.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "../../../../node_modules/core-js/internals/array-method-uses-to-length.js");
var CHROME_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../../../node_modules/core-js/internals/engine-v8-version.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "../../../../node_modules/core-js/internals/engine-is-node.js");

var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "../../../../node_modules/core-js/modules/es.regexp.exec.js":
/*!**********************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/modules/es.regexp.exec.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../../node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "../../../../node_modules/core-js/internals/regexp-exec.js");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "../../../../node_modules/core-js/modules/es.string.includes.js":
/*!**************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/modules/es.string.includes.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../../node_modules/core-js/internals/export.js");
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "../../../../node_modules/core-js/internals/not-a-regexp.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../../node_modules/core-js/internals/require-object-coercible.js");
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "../../../../node_modules/core-js/internals/correct-is-regexp-logic.js");

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "../../../../node_modules/core-js/modules/es.string.replace.js":
/*!*************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/modules/es.string.replace.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../../../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../../../node_modules/core-js/internals/an-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../../../node_modules/core-js/internals/to-length.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../../../node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../../node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../../../../node_modules/core-js/internals/advance-string-index.js");
var getSubstitution = __webpack_require__(/*! ../internals/get-substitution */ "../../../../node_modules/core-js/internals/get-substitution.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../../../../node_modules/core-js/internals/regexp-exec-abstract.js");

var max = Math.max;
var min = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
});


/***/ }),

/***/ "../../../../node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!************************************************************************************************!*\
  !*** /home/runner/work/seek/seek/node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../../../../node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "../../../../node_modules/core-js/internals/dom-iterables.js");
var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ "../../../../node_modules/core-js/modules/es.array.iterator.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../../../node_modules/core-js/internals/create-non-enumerable-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "./app/app.element.scss":
/*!******************************!*\
  !*** ./app/app.element.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!../../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./app.element.scss */ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./app/app.element.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./app/app.element.ts":
/*!****************************!*\
  !*** ./app/app.element.ts ***!
  \****************************/
/*! exports provided: AppElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppElement", function() { return AppElement; });
/* harmony import */ var _guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @guiseek/web-core */ "../../../../libs/web/core/src/index.ts");
/* harmony import */ var _app_element_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.element.scss */ "./app/app.element.scss");
/* harmony import */ var _app_element_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_element_scss__WEBPACK_IMPORTED_MODULE_1__);
let _dec,
    _class,
    _class2,
    _temp,
    _ = t => t,
    _t;



/**
 * Não está em uso! todos os elementos
 * apresentados na tela estão no index
 * @internal
 * @todo usar quando tiver page router
 */

let AppElement = (_dec = Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__["RenderElement"])({
  selector: 'web-profile-root'
}), _dec(_class = (_temp = _class2 = class AppElement extends HTMLElement {
  constructor(...args) {
    super(...args);
    this.title = 'web-profile';
  }

  render() {
    return Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__["html"])(_t || (_t = _`<h1>${0}</h1>`), this.title);
  }

}, _class2.observedAttributes = [], _temp)) || _class);

/***/ }),

/***/ "./app/index.ts":
/*!**********************!*\
  !*** ./app/index.ts ***!
  \**********************/
/*! exports provided: AppElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.element */ "./app/app.element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppElement", function() { return _app_element__WEBPACK_IMPORTED_MODULE_0__["AppElement"]; });



/***/ }),

/***/ "./config/analytics.element.ts":
/*!*************************************!*\
  !*** ./config/analytics.element.ts ***!
  \*************************************/
/*! exports provided: AnalyticsElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsElement", function() { return AnalyticsElement; });
/* harmony import */ var _guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @guiseek/web-core */ "../../../../libs/web/core/src/index.ts");
/* harmony import */ var _envs_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../envs/env */ "./envs/env.ts");
var _dec, _dec2, _dec3, _class;



let AnalyticsElement = (_dec = Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__["ExtendElement"])({
  selector: 'seek-analytics',
  extend: 'script'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class AnalyticsElement extends HTMLScriptElement {
  constructor() {
    super();
    this._url = 'https://www.googletagmanager.com/gtag/js?id=';
    this._id = _envs_env__WEBPACK_IMPORTED_MODULE_1__["environment"].gTag;

    if (_envs_env__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
      const URL = this._url + this._id;
      this.setAttribute('async', '');
      this.setAttribute('src', URL);
    }
  }

  onConnect() {
    if (_envs_env__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
      this.onload = () => {
        const winSeek = window;
        winSeek.dataLayer = winSeek.dataLayer || [];

        function gtag(...args) {
          winSeek.dataLayer.push(args);
        }

        gtag('js', new Date());
        gtag('config', this._id);
      };
    }
  }

}) || _class) || _class) || _class);

/***/ }),

/***/ "./config/index.ts":
/*!*************************!*\
  !*** ./config/index.ts ***!
  \*************************/
/*! exports provided: AnalyticsElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _analytics_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analytics.element */ "./config/analytics.element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnalyticsElement", function() { return _analytics_element__WEBPACK_IMPORTED_MODULE_0__["AnalyticsElement"]; });



/***/ }),

/***/ "./envs/env.ts":
/*!*********************!*\
  !*** ./envs/env.ts ***!
  \*********************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.
const environment = {
  production: false,
  gTag: 'G-49VFMJPFG7'
};

/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./app/index.ts");
/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./section */ "./section/index.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared */ "./shared/index.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./config/index.ts");



 // document.addEventListener('DOMContentLoaded', () => {
//   let alReadyScrolling = false
//   const video = document.querySelector('video')
//   document.addEventListener('scroll', (ev) => {
//     if (!alReadyScrolling) {
//       alReadyScrolling = true
//       setTimeout(() => {
//         location.href = '#family'
//       }, 3000)
//     }
//   })
// })

/***/ }),

/***/ "./section/gallery/animated/animated.element.ts":
/*!******************************************************!*\
  !*** ./section/gallery/animated/animated.element.ts ***!
  \******************************************************/
/*! exports provided: AnimatedGalleryElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimatedGalleryElement", function() { return AnimatedGalleryElement; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared */ "./shared/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "../../../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @guiseek/web-core */ "../../../../libs/web/core/src/index.ts");
let _dec,
    _ = t => t,
    _t,
    _class;






const log = type => message => console.log(type, message);

let AnimatedGalleryElement = (_dec = Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__["Element"])({
  selector: 'seek-animated-gallery',
  providers: [_guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__["Http"]],
  template: Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__["html"])(_t || (_t = _`
    <div class="grid"></div>

    <template id="template">
      <figure>
        <img src="" alt="" />
        <figcaption></figcaption>
      </figure>
    </template>
  `))
}), _dec(_class = class AnimatedGalleryElement extends HTMLElement {
  constructor(...args) {
    super(...args);
    this.destroy = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    this.grid = void 0;
    this.tmpl = void 0;

    this.processPhotos = photos => {
      const total = photos.length - 1;
      let count = 0;
      photos.forEach(photo => {
        this.appendPhoto(photo);

        if (total === count++) {
          const images = this.querySelectorAll('img');
          this.observeImagesToLoadWhenVisible(images);
        }
      });
    };

    this.appendPhoto = ({
      src,
      title
    }) => {
      const clone = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["cloneAs"])(this.tmpl);
      const img = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["select"])(clone, 'img');
      const caption = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["select"])(clone, 'figcaption');
      img.onload = log('lazy image');
      img.setAttribute('data-src', src);
      img.setAttribute('alt', title);
      caption.textContent = title;
      this.grid.appendChild(clone);
    };
  }

  onConnect() {
    this.grid = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["select"])(this, '.grid');
    this.tmpl = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["select"])(this, '#template');
  }

  onInject([http]) {
    console.log(http);
    http.get('/assets/data/gifs.json').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.destroy)).subscribe(this.processPhotos);
  }

  observeImagesToLoadWhenVisible(images) {
    if ('IntersectionObserverEntry' in window) {
      const imageObserver = new IntersectionObserver(entries => {
        entries.map(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            imageObserver.unobserve(image);
          }
        });
      });
      images.forEach(image => imageObserver.observe(image));
    }
  }

  onDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}) || _class);

/***/ }),

/***/ "./section/gallery/gallery.element.scss":
/*!**********************************************!*\
  !*** ./section/gallery/gallery.element.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!../../../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./gallery.element.scss */ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./section/gallery/gallery.element.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./section/gallery/gallery.element.ts":
/*!********************************************!*\
  !*** ./section/gallery/gallery.element.ts ***!
  \********************************************/
/*! exports provided: GalleryElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryElement", function() { return GalleryElement; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared */ "./shared/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "../../../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @guiseek/web-core */ "../../../../libs/web/core/src/index.ts");
/* harmony import */ var _gallery_element_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gallery.element.scss */ "./section/gallery/gallery.element.scss");
/* harmony import */ var _gallery_element_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_gallery_element_scss__WEBPACK_IMPORTED_MODULE_4__);
let _dec,
    _ = t => t,
    _t,
    _class;







const log = type => message => console.log(type, message);

let GalleryElement = (_dec = Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__["Element"])({
  selector: 'seek-gallery',
  providers: [_guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__["Http"]],
  template: Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__["html"])(_t || (_t = _`
    <div class="grid"></div>

    <template id="template">
      <figure>
        <img src="" alt="" />
        <figcaption></figcaption>
      </figure>
    </template>
  `))
}), _dec(_class = class GalleryElement extends HTMLElement {
  constructor(...args) {
    super(...args);
    this.destroy = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    this.http = void 0;
    this.grid = void 0;
    this.tmpl = void 0;

    this.processPhotos = photos => {
      const total = photos.length - 1;
      let count = 0;
      photos.forEach(photo => {
        this.appendPhoto(photo);

        if (total === count++) {
          const images = this.querySelectorAll('img');
          this.observeImagesToLoadWhenVisible(images);
        }
      });
    };

    this.appendPhoto = photo => {
      const clone = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["cloneAs"])(this.tmpl);
      const figure = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["select"])(clone, 'figure');
      const caption = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["select"])(clone, 'figcaption');
      const img = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["select"])(clone, 'img');
      img.onload = log('lazy image');
      img.setAttribute('data-src', photo.src);
      img.setAttribute('alt', photo.title);
      caption.textContent = photo.title;
      figure.classList.add(photo.position);
      figure.classList.add(photo.size);
      this.grid.appendChild(clone);
    };
  }

  onConnect() {
    this.grid = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["select"])(this, '.grid');
    this.tmpl = Object(_shared__WEBPACK_IMPORTED_MODULE_0__["select"])(this, '#template');
  }

  onInject([http]) {
    this.http = http;
    http.get('/assets/data/photos.json').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.destroy)).subscribe(this.processPhotos);
  }

  observeImagesToLoadWhenVisible(images) {
    if ('IntersectionObserverEntry' in window) {
      const imageObserver = new IntersectionObserver(entries => {
        entries.map(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            imageObserver.unobserve(image);
          }
        });
      });
      images.forEach(image => imageObserver.observe(image));
    }
  }

  onDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}) || _class);

/***/ }),

/***/ "./section/hero-banner/hero-banner.element.scss":
/*!******************************************************!*\
  !*** ./section/hero-banner/hero-banner.element.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!../../../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./hero-banner.element.scss */ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./section/hero-banner/hero-banner.element.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./section/hero-banner/hero-banner.element.ts":
/*!****************************************************!*\
  !*** ./section/hero-banner/hero-banner.element.ts ***!
  \****************************************************/
/*! exports provided: HeroBannerElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeroBannerElement", function() { return HeroBannerElement; });
/* harmony import */ var _guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @guiseek/web-core */ "../../../../libs/web/core/src/index.ts");
/* harmony import */ var _shared_parallax_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/parallax-effect */ "./shared/parallax-effect.ts");
/* harmony import */ var _hero_banner_element_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hero-banner.element.scss */ "./section/hero-banner/hero-banner.element.scss");
/* harmony import */ var _hero_banner_element_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_hero_banner_element_scss__WEBPACK_IMPORTED_MODULE_2__);
let _dec,
    _ = t => t,
    _t,
    _class;




let HeroBannerElement = (_dec = Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__["Element"])({
  selector: 'seek-hero-banner',
  template: Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__["html"])(_t || (_t = _`
    <seek-front-end></seek-front-end>
    <seek-code-editor></seek-code-editor>
    <header>
      <h1>Guilherme Siquinelli</h1>
      <h2>
        This website is
        <span
          is="txt-rotate"
          period="1000"
          rotate='[  "my profile.", "web components.", "custom elements.", "pure native tecnology.", "pretty.", "fun!" ]'
        ></span>
      </h2>
    </header>
  `))
}), _dec(_class = class HeroBannerElement extends HTMLElement {
  constructor(...args) {
    super(...args);
    this.swapPositions = void 0;
  }

  onConnect() {
    this.swapPositions = ({
      x,
      y
    }) => {
      this.style.setProperty('--x', String(Object(_shared_parallax_effect__WEBPACK_IMPORTED_MODULE_1__["getX"])(x)));
      this.style.setProperty('--y', String(Object(_shared_parallax_effect__WEBPACK_IMPORTED_MODULE_1__["getY"])(y)));
    };

    this.addEventListener('pointermove', this.swapPositions);
  }

  onDestroy() {
    this.removeEventListener('pointermove', this.swapPositions);
  }

}) || _class);

/***/ }),

/***/ "./section/index.ts":
/*!**************************!*\
  !*** ./section/index.ts ***!
  \**************************/
/*! exports provided: AnimatedGalleryElement, HeroBannerElement, GalleryElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gallery_animated_animated_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gallery/animated/animated.element */ "./section/gallery/animated/animated.element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatedGalleryElement", function() { return _gallery_animated_animated_element__WEBPACK_IMPORTED_MODULE_0__["AnimatedGalleryElement"]; });

/* harmony import */ var _hero_banner_hero_banner_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hero-banner/hero-banner.element */ "./section/hero-banner/hero-banner.element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeroBannerElement", function() { return _hero_banner_hero_banner_element__WEBPACK_IMPORTED_MODULE_1__["HeroBannerElement"]; });

/* harmony import */ var _gallery_gallery_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gallery/gallery.element */ "./section/gallery/gallery.element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GalleryElement", function() { return _gallery_gallery_element__WEBPACK_IMPORTED_MODULE_2__["GalleryElement"]; });





/***/ }),

/***/ "./shared/code-editor/code-editor.element.scss":
/*!*****************************************************!*\
  !*** ./shared/code-editor/code-editor.element.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!../../../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./code-editor.element.scss */ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./shared/code-editor/code-editor.element.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./shared/code-editor/code-editor.element.ts":
/*!***************************************************!*\
  !*** ./shared/code-editor/code-editor.element.ts ***!
  \***************************************************/
/*! exports provided: CodeEditorElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeEditorElement", function() { return CodeEditorElement; });
/* harmony import */ var _guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @guiseek/web-core */ "../../../../libs/web/core/src/index.ts");
/* harmony import */ var _code_editor_element_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./code-editor.element.scss */ "./shared/code-editor/code-editor.element.scss");
/* harmony import */ var _code_editor_element_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_code_editor_element_scss__WEBPACK_IMPORTED_MODULE_1__);
let _dec,
    _dec2,
    _dec3,
    _ = t => t,
    _t,
    _class;



let CodeEditorElement = (_dec = Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__["Element"])({
  selector: 'seek-code-editor',
  template: Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__["html"])(_t || (_t = _`
    <div id="browser"></div>
    <div id="editor"></div>
    <div id="file"></div>
    <div id="code"></div>
    <div id="lib"></div>
    <div id="lang"></div>
  `))
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class CodeEditorElement extends HTMLElement {
  constructor() {
    super();
    this.classList.add('seek-code-editor');
  }

}) || _class) || _class) || _class);

/***/ }),

/***/ "./shared/dom-helpers.ts":
/*!*******************************!*\
  !*** ./shared/dom-helpers.ts ***!
  \*******************************/
/*! exports provided: cloneAs, select */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneAs", function() { return cloneAs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return select; });
const cloneAs = ({
  content
}) => {
  return content.cloneNode(true);
};
const select = (element, selector) => {
  return element.querySelector(selector);
};

/***/ }),

/***/ "./shared/front-end/front-end.element.scss":
/*!*************************************************!*\
  !*** ./shared/front-end/front-end.element.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!../../../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./front-end.element.scss */ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./shared/front-end/front-end.element.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./shared/front-end/front-end.element.ts":
/*!***********************************************!*\
  !*** ./shared/front-end/front-end.element.ts ***!
  \***********************************************/
/*! exports provided: FrontEndElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrontEndElement", function() { return FrontEndElement; });
/* harmony import */ var _guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @guiseek/web-core */ "../../../../libs/web/core/src/index.ts");
/* harmony import */ var _front_end_element_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./front-end.element.scss */ "./shared/front-end/front-end.element.scss");
/* harmony import */ var _front_end_element_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_front_end_element_scss__WEBPACK_IMPORTED_MODULE_1__);
let _dec,
    _dec2,
    _dec3,
    _ = t => t,
    _t,
    _class;



let FrontEndElement = (_dec = Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__["Element"])({
  selector: 'seek-front-end',
  template: Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_0__["html"])(_t || (_t = _`
    <div id="browser"></div>
    <div id="pages"></div>
    <div id="templates"></div>
    <div id="organisms"></div>
    <div id="molecules"></div>
    <div id="atoms"></div>
  `))
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class FrontEndElement extends HTMLElement {
  constructor() {
    super();
    this.classList.add('seek-front-end');
  }

}) || _class) || _class) || _class);

/***/ }),

/***/ "./shared/index.ts":
/*!*************************!*\
  !*** ./shared/index.ts ***!
  \*************************/
/*! exports provided: CodeEditorElement, FrontEndElement, TxtRotateElement, genMapper, getX, getY, cloneAs, select */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _code_editor_code_editor_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./code-editor/code-editor.element */ "./shared/code-editor/code-editor.element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CodeEditorElement", function() { return _code_editor_code_editor_element__WEBPACK_IMPORTED_MODULE_0__["CodeEditorElement"]; });

/* harmony import */ var _front_end_front_end_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./front-end/front-end.element */ "./shared/front-end/front-end.element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FrontEndElement", function() { return _front_end_front_end_element__WEBPACK_IMPORTED_MODULE_1__["FrontEndElement"]; });

/* harmony import */ var _txt_rotate_txt_rotate_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./txt-rotate/txt-rotate.element */ "./shared/txt-rotate/txt-rotate.element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TxtRotateElement", function() { return _txt_rotate_txt_rotate_element__WEBPACK_IMPORTED_MODULE_2__["TxtRotateElement"]; });

/* harmony import */ var _parallax_effect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parallax-effect */ "./shared/parallax-effect.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "genMapper", function() { return _parallax_effect__WEBPACK_IMPORTED_MODULE_3__["genMapper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getX", function() { return _parallax_effect__WEBPACK_IMPORTED_MODULE_3__["getX"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getY", function() { return _parallax_effect__WEBPACK_IMPORTED_MODULE_3__["getY"]; });

/* harmony import */ var _dom_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom-helpers */ "./shared/dom-helpers.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneAs", function() { return _dom_helpers__WEBPACK_IMPORTED_MODULE_4__["cloneAs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _dom_helpers__WEBPACK_IMPORTED_MODULE_4__["select"]; });







/***/ }),

/***/ "./shared/parallax-effect.ts":
/*!***********************************!*\
  !*** ./shared/parallax-effect.ts ***!
  \***********************************/
/*! exports provided: genMapper, getX, getY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genMapper", function() { return genMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getX", function() { return getX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getY", function() { return getY; });
const LIMIT = 100; // pixel movement

const genMapper = (inLower, inUpper, outLower, outUpper) => {
  const range = inUpper - inLower;
  const output = outUpper - outLower;

  const mapper = input => {
    return outLower + ((input - inLower) / range * output || 0);
  };

  return mapper;
};
const getX = genMapper(0, window.innerWidth, -LIMIT, LIMIT);
const getY = genMapper(0, window.innerHeight, -LIMIT, LIMIT);

/***/ }),

/***/ "./shared/txt-rotate/txt-rotate.element.scss":
/*!***************************************************!*\
  !*** ./shared/txt-rotate/txt-rotate.element.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??ref--5-oneOf-5-2!../../../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-5-3!./txt-rotate.element.scss */ "../../../../node_modules/@nrwl/web/src/utils/third-party/cli-files/plugins/raw-css-loader.js!../../../../node_modules/postcss-loader/dist/cjs.js?!../../../../node_modules/@nrwl/web/node_modules/sass-loader/dist/cjs.js?!./shared/txt-rotate/txt-rotate.element.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../../node_modules/@nrwl/web/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./shared/txt-rotate/txt-rotate.element.ts":
/*!*************************************************!*\
  !*** ./shared/txt-rotate/txt-rotate.element.ts ***!
  \*************************************************/
/*! exports provided: TxtRotateElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TxtRotateElement", function() { return TxtRotateElement; });
/* harmony import */ var _home_runner_work_seek_seek_node_modules_nrwl_web_node_modules_babel_runtime_helpers_esm_initializerDefineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/@babel/runtime/helpers/esm/initializerDefineProperty */ "../../../../node_modules/@nrwl/web/node_modules/@babel/runtime/helpers/esm/initializerDefineProperty.js");
/* harmony import */ var _home_runner_work_seek_seek_node_modules_nrwl_web_node_modules_babel_runtime_helpers_esm_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! /home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/@babel/runtime/helpers/esm/applyDecoratedDescriptor */ "../../../../node_modules/@nrwl/web/node_modules/@babel/runtime/helpers/esm/applyDecoratedDescriptor.js");
/* harmony import */ var _home_runner_work_seek_seek_node_modules_nrwl_web_node_modules_babel_runtime_helpers_esm_initializerWarningHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! /home/runner/work/seek/seek/node_modules/@nrwl/web/node_modules/@babel/runtime/helpers/esm/initializerWarningHelper */ "../../../../node_modules/@nrwl/web/node_modules/@babel/runtime/helpers/esm/initializerWarningHelper.js");
/* harmony import */ var _guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @guiseek/web-core */ "../../../../libs/web/core/src/index.ts");
/* harmony import */ var json5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! json5 */ "../../../../node_modules/json5/dist/index.js");
/* harmony import */ var json5__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(json5__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _txt_rotate_element_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./txt-rotate.element.scss */ "./shared/txt-rotate/txt-rotate.element.scss");
/* harmony import */ var _txt_rotate_element_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_txt_rotate_element_scss__WEBPACK_IMPORTED_MODULE_5__);




var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _class3, _temp;




/**
 * @example
 *
 * ```html
 * <span is="txt-rotate" period="2000" rotate='[ "web.", "custom.", "pure TS.", "pretty.", "fun!" ]' ></span>
 * ```
 *
 * @export
 * @class TxtRotateElement
 * @extends {HTMLSpanElement}
 */

let TxtRotateElement = (_dec = Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__["ExtendElement"])({
  selector: 'txt-rotate',
  extend: 'span'
}), _dec2 = Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__["Attr"])(), _dec3 = Reflect.metadata("design:type", Array), _dec4 = Object(_guiseek_web_core__WEBPACK_IMPORTED_MODULE_3__["Attr"])(), _dec5 = Reflect.metadata("design:type", Number), _dec(_class = (_class2 = (_temp = _class3 = class TxtRotateElement extends HTMLSpanElement {
  constructor(...args) {
    super(...args);

    Object(_home_runner_work_seek_seek_node_modules_nrwl_web_node_modules_babel_runtime_helpers_esm_initializerDefineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "rotate", _descriptor, this);

    Object(_home_runner_work_seek_seek_node_modules_nrwl_web_node_modules_babel_runtime_helpers_esm_initializerDefineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "period", _descriptor2, this);

    this.timeout = void 0;
    this.isDeleting = false;
    this.loopNum = 0;
    this.txt = '';
  }

  onConnect() {
    var _this$period;

    this.period = (_this$period = this.period) !== null && _this$period !== void 0 ? _this$period : 2000;
    this.tick();
  }

  onChanges({
    name,
    next
  }) {
    if (name === 'period' && typeof next === 'string') {
      this.period = +next;
    }

    if (name === 'rotate' && typeof next === 'string') {
      this.rotate = Object(json5__WEBPACK_IMPORTED_MODULE_4__["parse"])(next);
    }
  }

  tick() {
    const i = this.loopNum % this.rotate.length;
    const fullTxt = this.rotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    this.timeout = window.setTimeout(() => this.tick(), delta);
  }

  onDestroy() {
    window.clearTimeout(this.timeout);
  }

}, _class3.observedAttributes = ['rotate', 'period'], _temp), (_descriptor = Object(_home_runner_work_seek_seek_node_modules_nrwl_web_node_modules_babel_runtime_helpers_esm_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_1__["default"])(_class2.prototype, "rotate", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = Object(_home_runner_work_seek_seek_node_modules_nrwl_web_node_modules_babel_runtime_helpers_esm_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_1__["default"])(_class2.prototype, "period", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/seek/seek/apps/web/profile/src/main.ts */"./main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map