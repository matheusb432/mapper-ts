/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MapperTsLib", [], factory);
	else if(typeof exports === 'object')
		exports["MapperTsLib"] = factory();
	else
		root["MapperTsLib"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/decorators/add-map.ts":
/*!***********************************!*\
  !*** ./src/decorators/add-map.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AddMap\": () => (/* binding */ AddMap)\n/* harmony export */ });\n/**\r\n * @param sourceData data that should contain one of or both of the property name and entity type to map\r\n *\r\n * @returns an object with a new constructor property to allow for it's mapping with the Mapper class\r\n */\r\nfunction AddMap() {\r\n    var sourceData = [];\r\n    for (var _i = 0; _i < arguments.length; _i++) {\r\n        sourceData[_i] = arguments[_i];\r\n    }\r\n    return function (destination, key) {\r\n        for (var _i = 0, sourceData_1 = sourceData; _i < sourceData_1.length; _i++) {\r\n            var data = sourceData_1[_i];\r\n            if (typeof data === 'string') {\r\n                addPropertyMap(destination, key, data);\r\n            }\r\n            else if (typeof data === 'function') {\r\n                addEntityMap(destination, key, data);\r\n            }\r\n        }\r\n    };\r\n}\r\n/**\r\n * @param sourceType property type of the object to be mapped\r\n */\r\nfunction addEntityMap(destination, key, sourceType) {\r\n    if (!destination.constructor.entityMap) {\r\n        destination.constructor.entityMap = {};\r\n    }\r\n    destination.constructor.entityMap[key] = sourceType;\r\n}\r\n/**\r\n * @param sourceName property name of the object to be mapped\r\n */\r\nfunction addPropertyMap(destination, key, sourceName) {\r\n    if (!destination.constructor.propertyMap) {\r\n        destination.constructor.propertyMap = {};\r\n    }\r\n    destination.constructor.propertyMap[key] = sourceName;\r\n}\r\n\n\n//# sourceURL=webpack://MapperTsLib/./src/decorators/add-map.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Mapper\": () => (/* reexport safe */ _mapper__WEBPACK_IMPORTED_MODULE_0__.Mapper),\n/* harmony export */   \"AddMap\": () => (/* reexport safe */ _decorators_add_map__WEBPACK_IMPORTED_MODULE_1__.AddMap)\n/* harmony export */ });\n/* harmony import */ var _mapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapper */ \"./src/mapper.ts\");\n/* harmony import */ var _decorators_add_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decorators/add-map */ \"./src/decorators/add-map.ts\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://MapperTsLib/./src/index.ts?");

/***/ }),

/***/ "./src/mapper.ts":
/*!***********************!*\
  !*** ./src/mapper.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Mapper\": () => (/* binding */ Mapper)\n/* harmony export */ });\n/**\r\n * @class Mapper class that can be instantiated and return a mapped object using map() as long as it's properly decorated\r\n * @property {propertyMapping} -- data with all properties that need name mapping from source to destination\r\n * @property {entityMapping} -- data with all properties that need type mapping from source to destination\r\n * @property {destination} -- property that will have the source data mapped to it\r\n */\r\nvar Mapper = /** @class */ (function () {\r\n    function Mapper(type) {\r\n        this.mappedKeys = [];\r\n        this.destination = new type();\r\n        this.propertyMapping = this.destination.constructor.propertyMap;\r\n        this.entityMapping = this.destination.constructor.entityMap;\r\n    }\r\n    /**\r\n     * map() function to map the source object to the destination object\r\n     * @param source The object to map\r\n     * @returns A mapped object of the given type\r\n     */\r\n    Mapper.prototype.map = function (source) {\r\n        if (!this.isMappable())\r\n            return source;\r\n        if (this.isEmptySource(source))\r\n            return null;\r\n        this.mapKeys(source);\r\n        this.mapNestedObjects();\r\n        return this.destination;\r\n    };\r\n    Mapper.prototype.mapKeys = function (source) {\r\n        if (this.propertyMapping != null) {\r\n            this.setMappedKeys(source);\r\n        }\r\n        this.setUnmappedKeys(source);\r\n    };\r\n    Mapper.prototype.setMappedKeys = function (source) {\r\n        var _this = this;\r\n        Object.keys(this.destination).forEach(function (key) {\r\n            var mappedKey = _this.propertyMapping[key];\r\n            if (mappedKey) {\r\n                _this.mappedKeys.push(mappedKey);\r\n                _this.destination[key] = source[mappedKey];\r\n            }\r\n            else if (source[key] != null) {\r\n                _this.destination[key] = source[key];\r\n            }\r\n        });\r\n    };\r\n    Mapper.prototype.setUnmappedKeys = function (source) {\r\n        var _this = this;\r\n        if (this.propertyMapping != null) {\r\n            Object.keys(source).forEach(function (key) {\r\n                if (_this.shouldSkipMappedKey(key)) {\r\n                    return;\r\n                }\r\n                var destinationKeys = Object.keys(_this.destination);\r\n                if (!destinationKeys.includes(key)) {\r\n                    _this.destination[key] = source[key];\r\n                }\r\n            });\r\n        }\r\n        else {\r\n            Object.keys(source).forEach(function (key) {\r\n                _this.destination[key] = source[key];\r\n            });\r\n        }\r\n    };\r\n    Mapper.prototype.mapNestedObjects = function () {\r\n        var _this = this;\r\n        if (this.entityMapping != null) {\r\n            Object.keys(this.entityMapping).forEach(function (key) {\r\n                var mappedKey = _this.entityMapping[key];\r\n                if (mappedKey) {\r\n                    if (Array.isArray(_this.destination[key])) {\r\n                        _this.destination[key] = _this.destination[key].map(function (x) {\r\n                            return new Mapper(mappedKey).map(x);\r\n                        });\r\n                    }\r\n                    else {\r\n                        _this.destination[key] = new Mapper(mappedKey).map(_this.destination[key]);\r\n                    }\r\n                }\r\n            });\r\n        }\r\n    };\r\n    Mapper.prototype.shouldSkipMappedKey = function (key) {\r\n        return this.mappedKeys.includes(key);\r\n    };\r\n    Mapper.prototype.isMappable = function () {\r\n        return this.propertyMapping != null || this.entityMapping != null;\r\n    };\r\n    Mapper.prototype.isEmptySource = function (source) {\r\n        return source == null || source.length === 0;\r\n    };\r\n    return Mapper;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://MapperTsLib/./src/mapper.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});