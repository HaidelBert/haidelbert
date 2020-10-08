/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/connection.ts":
/*!***************************!*\
  !*** ./src/connection.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nexports.connect = void 0;\nvar typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nvar asset_1 = __webpack_require__(/*! ./entity/asset */ \"./src/entity/asset.ts\");\nvar assetDepreciation_1 = __webpack_require__(/*! ./entity/assetDepreciation */ \"./src/entity/assetDepreciation.ts\");\nvar yearDepreciation_1 = __webpack_require__(/*! ./entity/yearDepreciation */ \"./src/entity/yearDepreciation.ts\");\nexports.connect = function () { return __awaiter(void 0, void 0, void 0, function () {\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, typeorm_1.createConnection({\n                    type: \"postgres\",\n                    host: process.env.POSTGRES_HOST,\n                    port: parseInt(process.env.POSTGRES_PORT, 10),\n                    username: process.env.POSTGRES_USERNAME,\n                    password: process.env.POSTGRES_PASSWORD,\n                    database: process.env.POSTGRES_DB,\n                    entities: [asset_1.Asset, assetDepreciation_1.AssetDepreciation, yearDepreciation_1.YearDepreciation]\n                })];\n            case 1: return [2 /*return*/, _a.sent()];\n        }\n    });\n}); };\n\n\n//# sourceURL=webpack:///./src/connection.ts?");

/***/ }),

/***/ "./src/controllers/assetDepreciationsController.ts":
/*!*********************************************************!*\
  !*** ./src/controllers/assetDepreciationsController.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nexports.AssetDepreciationsController = void 0;\nvar depreciation_1 = __webpack_require__(/*! ../domain/depreciation */ \"./src/domain/depreciation.ts\");\nvar AssetDepreciationsController = /** @class */ (function () {\n    function AssetDepreciationsController(assetsRepository, assetDepreciationsRepository, yearDepreciationsRepository) {\n        var _this = this;\n        this.preview = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {\n            var userId, year, existing, assets, depreciations, previews, e_1;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 3, , 4]);\n                        userId = res.locals.userId;\n                        year = parseInt(req.query[\"year\"], 10);\n                        return [4 /*yield*/, this.yearDepreciationsRepository\n                                .createQueryBuilder(\"yd\")\n                                .where(\"yd.user_id=:userId and yd.year=:year\", { userId: userId, year: year })\n                                .getOne()];\n                    case 1:\n                        existing = _a.sent();\n                        if (existing) {\n                            res.status(409);\n                            res.send(\"forbidden\");\n                            return [2 /*return*/];\n                        }\n                        return [4 /*yield*/, this.assetsRepository\n                                .createQueryBuilder(\"asset\")\n                                .where(\"user_id=:userId and asset.active=:active and EXTRACT(year FROM asset.purchase_date)<=:year\", { active: true, year: year, userId: userId })\n                                .getMany()];\n                    case 2:\n                        assets = _a.sent();\n                        depreciations = depreciation_1.calculateDepreciations(assets);\n                        previews = depreciations.map(function (depreciation) {\n                            return __assign({ name: depreciation.asset.name }, depreciation);\n                        });\n                        res.json(previews);\n                        return [3 /*break*/, 4];\n                    case 3:\n                        e_1 = _a.sent();\n                        next(e_1);\n                        return [3 /*break*/, 4];\n                    case 4: return [2 /*return*/];\n                }\n            });\n        }); };\n        this.assetsRepository = assetsRepository;\n        this.assetDepreciationsRepository = assetDepreciationsRepository;\n        this.yearDepreciationsRepository = yearDepreciationsRepository;\n    }\n    return AssetDepreciationsController;\n}());\nexports.AssetDepreciationsController = AssetDepreciationsController;\n\n\n//# sourceURL=webpack:///./src/controllers/assetDepreciationsController.ts?");

/***/ }),

/***/ "./src/controllers/assetsController.ts":
/*!*********************************************!*\
  !*** ./src/controllers/assetsController.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nexports.AssetsController = void 0;\nvar AssetsController = /** @class */ (function () {\n    function AssetsController(assetRepository) {\n        var _this = this;\n        this.addAsset = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {\n            var tmp, newAsset, e_1;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        tmp = req.body;\n                        tmp.userId = res.locals.userId;\n                        tmp.netRemainingBlockValue = tmp.netAmount;\n                        return [4 /*yield*/, this.assetRepository.save(tmp)];\n                    case 1:\n                        newAsset = _a.sent();\n                        res.json(newAsset);\n                        return [3 /*break*/, 3];\n                    case 2:\n                        e_1 = _a.sent();\n                        next(e_1);\n                        return [3 /*break*/, 3];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        }); };\n        this.listAssets = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {\n            var assets, e_2;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        return [4 /*yield*/, this.assetRepository.find()];\n                    case 1:\n                        assets = _a.sent();\n                        assets.forEach(function (value) { return value.depreciations; });\n                        res.json(assets);\n                        return [3 /*break*/, 3];\n                    case 2:\n                        e_2 = _a.sent();\n                        next(e_2);\n                        return [3 /*break*/, 3];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        }); };\n        this.assetRepository = assetRepository;\n    }\n    return AssetsController;\n}());\nexports.AssetsController = AssetsController;\n\n\n//# sourceURL=webpack:///./src/controllers/assetsController.ts?");

/***/ }),

/***/ "./src/controllers/yearDepreciationsController.ts":
/*!********************************************************!*\
  !*** ./src/controllers/yearDepreciationsController.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nexports.YearDepreciationsController = void 0;\nvar yearDepreciation_1 = __webpack_require__(/*! ../entity/yearDepreciation */ \"./src/entity/yearDepreciation.ts\");\nvar assetDepreciation_1 = __webpack_require__(/*! ../entity/assetDepreciation */ \"./src/entity/assetDepreciation.ts\");\nvar depreciation_1 = __webpack_require__(/*! ../domain/depreciation */ \"./src/domain/depreciation.ts\");\nvar YearDepreciationsController = /** @class */ (function () {\n    function YearDepreciationsController(assetsRepository, yearDepreciationsRepository, assetDepreciationsRepository) {\n        var _this = this;\n        this.add = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {\n            var year_1, userId_1, existing, assets, depreciations_1, e_1;\n            var _this = this;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 4, , 5]);\n                        year_1 = parseInt(req.query[\"year\"], 10);\n                        userId_1 = res.locals.userId;\n                        return [4 /*yield*/, this.yearDepreciationsRepository\n                                .createQueryBuilder(\"yd\")\n                                .where(\"yd.user_id=:userId and yd.year=:year\", { userId: userId_1, year: year_1 })\n                                .getOne()];\n                    case 1:\n                        existing = _a.sent();\n                        if (existing) {\n                            res.status(409);\n                            res.send(\"forbidden\");\n                            return [2 /*return*/];\n                        }\n                        return [4 /*yield*/, this.assetsRepository\n                                .createQueryBuilder(\"asset\")\n                                .where(\"user_id=:userId and asset.active=:active and EXTRACT(year FROM asset.purchase_date)<=:year\", { active: true, year: year_1, userId: userId_1 })\n                                .getMany()];\n                    case 2:\n                        assets = _a.sent();\n                        depreciations_1 = depreciation_1.calculateDepreciations(assets);\n                        return [4 /*yield*/, this.assetsRepository.manager.transaction(function (entityManager) { return __awaiter(_this, void 0, void 0, function () {\n                                var promises, resolvedPromises, totalDepreciations, yearDepreciation;\n                                var _this = this;\n                                return __generator(this, function (_a) {\n                                    switch (_a.label) {\n                                        case 0:\n                                            promises = depreciations_1.map(function (depreciation) { return __awaiter(_this, void 0, void 0, function () {\n                                                var assetDepreciation;\n                                                return __generator(this, function (_a) {\n                                                    switch (_a.label) {\n                                                        case 0:\n                                                            depreciation.asset.netRemainingBlockValue = depreciation.netRemainingBlockValue;\n                                                            return [4 /*yield*/, entityManager.save(depreciation.asset)];\n                                                        case 1:\n                                                            _a.sent();\n                                                            assetDepreciation = new assetDepreciation_1.AssetDepreciation();\n                                                            assetDepreciation.asset = Promise.resolve(depreciation.asset);\n                                                            assetDepreciation.year = year_1;\n                                                            assetDepreciation.netRemainingBlockValue = depreciation.netRemainingBlockValue;\n                                                            assetDepreciation.netDepreciationAmount = depreciation.netDepreciationAmount;\n                                                            return [4 /*yield*/, entityManager.save(assetDepreciation)];\n                                                        case 2: return [2 /*return*/, _a.sent()];\n                                                    }\n                                                });\n                                            }); });\n                                            return [4 /*yield*/, Promise.all(promises)];\n                                        case 1:\n                                            resolvedPromises = _a.sent();\n                                            totalDepreciations = resolvedPromises\n                                                .map(function (assetDepreciation) { return assetDepreciation.netDepreciationAmount; })\n                                                .reduce(function (accumulator, currentValue) { return accumulator + currentValue; });\n                                            yearDepreciation = new yearDepreciation_1.YearDepreciation();\n                                            yearDepreciation.sumDepreciations = totalDepreciations;\n                                            yearDepreciation.year = year_1;\n                                            yearDepreciation.depreciations = Promise.resolve(resolvedPromises);\n                                            yearDepreciation.userId = userId_1;\n                                            return [4 /*yield*/, entityManager.save(yearDepreciation)];\n                                        case 2:\n                                            _a.sent();\n                                            promises = resolvedPromises.map(function (depreciation) { return __awaiter(_this, void 0, void 0, function () {\n                                                return __generator(this, function (_a) {\n                                                    depreciation.yearDepreciation = Promise.resolve(yearDepreciation);\n                                                    return [2 /*return*/, entityManager.save(depreciation)];\n                                                });\n                                            }); });\n                                            return [4 /*yield*/, Promise.all(promises)];\n                                        case 3:\n                                            _a.sent();\n                                            res.status(201);\n                                            return [2 /*return*/];\n                                    }\n                                });\n                            }); })];\n                    case 3:\n                        _a.sent();\n                        return [3 /*break*/, 5];\n                    case 4:\n                        e_1 = _a.sent();\n                        next(e_1);\n                        return [3 /*break*/, 5];\n                    case 5: return [2 /*return*/];\n                }\n            });\n        }); };\n        this.assetsRepository = assetsRepository;\n        this.yearDepreciationsRepository = yearDepreciationsRepository;\n        this.assetDepreciationsRepository = assetDepreciationsRepository;\n    }\n    return YearDepreciationsController;\n}());\nexports.YearDepreciationsController = YearDepreciationsController;\n\n\n//# sourceURL=webpack:///./src/controllers/yearDepreciationsController.ts?");

/***/ }),

/***/ "./src/domain/depreciation.ts":
/*!************************************!*\
  !*** ./src/domain/depreciation.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nexports.calculateDepreciations = void 0;\nfunction calculateDepreciations(assets) {\n    return assets.map(function (asset) {\n        var isHalfDepreciation = asset.purchaseDate.getMonth() > 5;\n        var isFirstDepreciation = !asset.depreciations || asset.depreciations.length === 0;\n        var netDepreciationAmount;\n        if (isFirstDepreciation && isHalfDepreciation) {\n            netDepreciationAmount = Math.round(asset.netAmount / asset.depreciationDuration / 2);\n        }\n        else {\n            netDepreciationAmount = Math.round(asset.netAmount / asset.depreciationDuration);\n        }\n        var netRemainingBlockValue = asset.netRemainingBlockValue - netDepreciationAmount;\n        var isLastDepreciation = netRemainingBlockValue <= 1;\n        if (isLastDepreciation) {\n            netRemainingBlockValue = 0;\n            netDepreciationAmount = asset.netRemainingBlockValue;\n        }\n        return {\n            asset: asset,\n            netDepreciationAmount: netDepreciationAmount,\n            netRemainingBlockValue: netRemainingBlockValue,\n            active: !isLastDepreciation\n        };\n    });\n}\nexports.calculateDepreciations = calculateDepreciations;\n\n\n//# sourceURL=webpack:///./src/domain/depreciation.ts?");

/***/ }),

/***/ "./src/entity/asset.ts":
/*!*****************************!*\
  !*** ./src/entity/asset.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nexports.__esModule = true;\nexports.Asset = void 0;\nvar typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nvar assetDepreciation_1 = __webpack_require__(/*! ./assetDepreciation */ \"./src/entity/assetDepreciation.ts\");\nvar dbHelpers_1 = __webpack_require__(/*! ../helpers/dbHelpers */ \"./src/helpers/dbHelpers.ts\");\nvar Asset = /** @class */ (function () {\n    function Asset() {\n        this.name = \"\";\n        this.purchaseDate = new Date();\n        this.grossAmount = 0;\n        this.netAmount = 0;\n        this.depreciationDuration = 3;\n        this.netRemainingBlockValue = 0;\n        this.userId = \"\";\n        this.active = false;\n    }\n    __decorate([\n        typeorm_1.PrimaryColumn(\"bigint\", { transformer: [dbHelpers_1.bigint] }),\n        typeorm_1.PrimaryGeneratedColumn(),\n        __metadata(\"design:type\", Number)\n    ], Asset.prototype, \"id\");\n    __decorate([\n        typeorm_1.Column(),\n        __metadata(\"design:type\", String)\n    ], Asset.prototype, \"name\");\n    __decorate([\n        typeorm_1.Column(\"date\", { name: \"purchase_date\", transformer: [dbHelpers_1.date] }),\n        __metadata(\"design:type\", Date)\n    ], Asset.prototype, \"purchaseDate\");\n    __decorate([\n        typeorm_1.Column(\"bigint\", { name: \"gross_amount\", transformer: [dbHelpers_1.bigint] }),\n        __metadata(\"design:type\", Number)\n    ], Asset.prototype, \"grossAmount\");\n    __decorate([\n        typeorm_1.Column(\"bigint\", { name: \"net_amount\", transformer: [dbHelpers_1.bigint] }),\n        __metadata(\"design:type\", Number)\n    ], Asset.prototype, \"netAmount\");\n    __decorate([\n        typeorm_1.Column({ name: \"depreciation_duration\" }),\n        __metadata(\"design:type\", Number)\n    ], Asset.prototype, \"depreciationDuration\");\n    __decorate([\n        typeorm_1.Column(\"bigint\", { name: \"net_remaining_block_value\", transformer: [dbHelpers_1.bigint] }),\n        __metadata(\"design:type\", Number)\n    ], Asset.prototype, \"netRemainingBlockValue\");\n    __decorate([\n        typeorm_1.Column({ name: \"user_id\" }),\n        __metadata(\"design:type\", String)\n    ], Asset.prototype, \"userId\");\n    __decorate([\n        typeorm_1.Column({ name: \"active\" }),\n        __metadata(\"design:type\", Boolean)\n    ], Asset.prototype, \"active\");\n    __decorate([\n        typeorm_1.OneToMany(function () { return assetDepreciation_1.AssetDepreciation; }, function (assetDepreciation) { return assetDepreciation.asset; }, {\n            eager: true\n        }),\n        __metadata(\"design:type\", Array)\n    ], Asset.prototype, \"depreciations\");\n    Asset = __decorate([\n        typeorm_1.Entity({ name: \"assets\" })\n    ], Asset);\n    return Asset;\n}());\nexports.Asset = Asset;\n\n\n//# sourceURL=webpack:///./src/entity/asset.ts?");

/***/ }),

/***/ "./src/entity/assetDepreciation.ts":
/*!*****************************************!*\
  !*** ./src/entity/assetDepreciation.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nexports.__esModule = true;\nexports.AssetDepreciation = void 0;\nvar typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nvar asset_1 = __webpack_require__(/*! ./asset */ \"./src/entity/asset.ts\");\nvar yearDepreciation_1 = __webpack_require__(/*! ./yearDepreciation */ \"./src/entity/yearDepreciation.ts\");\nvar dbHelpers_1 = __webpack_require__(/*! ../helpers/dbHelpers */ \"./src/helpers/dbHelpers.ts\");\nvar AssetDepreciation = /** @class */ (function () {\n    function AssetDepreciation() {\n        this.year = new Date().getFullYear();\n        this.netDepreciationAmount = 0;\n        this.netRemainingBlockValue = 0;\n    }\n    __decorate([\n        typeorm_1.PrimaryColumn(\"bigint\", { transformer: [dbHelpers_1.bigint] }),\n        typeorm_1.PrimaryGeneratedColumn(),\n        __metadata(\"design:type\", Number)\n    ], AssetDepreciation.prototype, \"id\");\n    __decorate([\n        typeorm_1.Column(),\n        __metadata(\"design:type\", Number)\n    ], AssetDepreciation.prototype, \"year\");\n    __decorate([\n        typeorm_1.Column(\"bigint\", { name: \"net_depreciation_amount\", transformer: [dbHelpers_1.bigint] }),\n        __metadata(\"design:type\", Number)\n    ], AssetDepreciation.prototype, \"netDepreciationAmount\");\n    __decorate([\n        typeorm_1.Column(\"bigint\", { name: \"net_remaining_block_value\", transformer: [dbHelpers_1.bigint] }),\n        __metadata(\"design:type\", Number)\n    ], AssetDepreciation.prototype, \"netRemainingBlockValue\");\n    __decorate([\n        typeorm_1.ManyToOne(function () { return asset_1.Asset; }, function (asset) { return asset.depreciations; }),\n        typeorm_1.JoinColumn({ name: \"asset_id\" }),\n        __metadata(\"design:type\", Promise)\n    ], AssetDepreciation.prototype, \"asset\");\n    __decorate([\n        typeorm_1.ManyToOne(function () { return yearDepreciation_1.YearDepreciation; }, function (yearDepreciation) { return yearDepreciation.depreciations; }),\n        typeorm_1.JoinColumn({ name: \"year_depreciation_id\" }),\n        __metadata(\"design:type\", Promise)\n    ], AssetDepreciation.prototype, \"yearDepreciation\");\n    AssetDepreciation = __decorate([\n        typeorm_1.Entity({ name: \"asset_depreciations\" })\n    ], AssetDepreciation);\n    return AssetDepreciation;\n}());\nexports.AssetDepreciation = AssetDepreciation;\n\n\n//# sourceURL=webpack:///./src/entity/assetDepreciation.ts?");

/***/ }),

/***/ "./src/entity/yearDepreciation.ts":
/*!****************************************!*\
  !*** ./src/entity/yearDepreciation.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nexports.__esModule = true;\nexports.YearDepreciation = void 0;\nvar typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nvar assetDepreciation_1 = __webpack_require__(/*! ./assetDepreciation */ \"./src/entity/assetDepreciation.ts\");\nvar dbHelpers_1 = __webpack_require__(/*! ../helpers/dbHelpers */ \"./src/helpers/dbHelpers.ts\");\nvar YearDepreciation = /** @class */ (function () {\n    function YearDepreciation() {\n        this.year = new Date().getFullYear();\n        this.sumDepreciations = 0;\n        this.userId = \"\";\n    }\n    __decorate([\n        typeorm_1.PrimaryColumn(\"bigint\", { transformer: [dbHelpers_1.bigint] }),\n        typeorm_1.PrimaryGeneratedColumn(),\n        __metadata(\"design:type\", Number)\n    ], YearDepreciation.prototype, \"id\");\n    __decorate([\n        typeorm_1.Column(),\n        __metadata(\"design:type\", Number)\n    ], YearDepreciation.prototype, \"year\");\n    __decorate([\n        typeorm_1.Column({ name: \"sum_depreciations\" }),\n        __metadata(\"design:type\", Number)\n    ], YearDepreciation.prototype, \"sumDepreciations\");\n    __decorate([\n        typeorm_1.Column({ name: \"user_id\" }),\n        __metadata(\"design:type\", String)\n    ], YearDepreciation.prototype, \"userId\");\n    __decorate([\n        typeorm_1.OneToMany(function () { return assetDepreciation_1.AssetDepreciation; }, function (assetDepreciation) { return assetDepreciation.yearDepreciation; }),\n        __metadata(\"design:type\", Promise)\n    ], YearDepreciation.prototype, \"depreciations\");\n    YearDepreciation = __decorate([\n        typeorm_1.Entity({ name: \"year_depreciations\" })\n    ], YearDepreciation);\n    return YearDepreciation;\n}());\nexports.YearDepreciation = YearDepreciation;\n\n\n//# sourceURL=webpack:///./src/entity/yearDepreciation.ts?");

/***/ }),

/***/ "./src/helpers/dbHelpers.ts":
/*!**********************************!*\
  !*** ./src/helpers/dbHelpers.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nexports.date = exports.bigint = void 0;\nvar moment = __webpack_require__(/*! moment */ \"moment\");\nexports.bigint = {\n    to: function (entityValue) { return entityValue; },\n    from: function (databaseValue) { return parseInt(databaseValue, 10); }\n};\nexports.date = {\n    to: function (entityValue) { return entityValue; },\n    from: function (databaseValue) {\n        return moment(databaseValue).toDate();\n    }\n};\n\n\n//# sourceURL=webpack:///./src/helpers/dbHelpers.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\nexports.__esModule = true;\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nvar express = __webpack_require__(/*! express */ \"express\");\nvar dotenv_1 = __webpack_require__(/*! dotenv */ \"dotenv\");\nvar connection_1 = __webpack_require__(/*! ./connection */ \"./src/connection.ts\");\nvar asset_1 = __webpack_require__(/*! ./entity/asset */ \"./src/entity/asset.ts\");\nvar assetsRouter_1 = __webpack_require__(/*! ./routers/assetsRouter */ \"./src/routers/assetsRouter.ts\");\nvar assetsController_1 = __webpack_require__(/*! ./controllers/assetsController */ \"./src/controllers/assetsController.ts\");\nvar accessLog_1 = __webpack_require__(/*! ./middlewares/accessLog */ \"./src/middlewares/accessLog.ts\");\nvar cors = __webpack_require__(/*! cors */ \"cors\");\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nvar assetDepreciationsController_1 = __webpack_require__(/*! ./controllers/assetDepreciationsController */ \"./src/controllers/assetDepreciationsController.ts\");\nvar assetDepreciation_1 = __webpack_require__(/*! ./entity/assetDepreciation */ \"./src/entity/assetDepreciation.ts\");\nvar yearDepreciation_1 = __webpack_require__(/*! ./entity/yearDepreciation */ \"./src/entity/yearDepreciation.ts\");\nvar assetDepreciationsRouter_1 = __webpack_require__(/*! ./routers/assetDepreciationsRouter */ \"./src/routers/assetDepreciationsRouter.ts\");\nvar yearDepreciationsRouter_1 = __webpack_require__(/*! ./routers/yearDepreciationsRouter */ \"./src/routers/yearDepreciationsRouter.ts\");\nvar yearDepreciationsController_1 = __webpack_require__(/*! ./controllers/yearDepreciationsController */ \"./src/controllers/yearDepreciationsController.ts\");\ndotenv_1.config();\nconnection_1.connect().then(function (connection) {\n    var assetRepository = connection.getRepository(asset_1.Asset);\n    var assetDepreciationRepository = connection.getRepository(assetDepreciation_1.AssetDepreciation);\n    var yearDepreciationRepository = connection.getRepository(yearDepreciation_1.YearDepreciation);\n    var assetController = new assetsController_1.AssetsController(assetRepository);\n    var assetDepreciationsController = new assetDepreciationsController_1.AssetDepreciationsController(assetRepository, assetDepreciationRepository, yearDepreciationRepository);\n    var yearDepreciationsController = new yearDepreciationsController_1.YearDepreciationsController(assetRepository, yearDepreciationRepository, assetDepreciationRepository);\n    var app = express();\n    var _a = process.env.PORT, PORT = _a === void 0 ? 3000 : _a;\n    app.use(bodyParser.json());\n    app.use(cors());\n    app.use(accessLog_1.log);\n    app.use(\"/register-of-assets/api\", assetsRouter_1.withAssetsRouter(assetController));\n    app.use(\"/register-of-assets/api\", assetDepreciationsRouter_1.withAssetDepreciationsRouter(assetDepreciationsController));\n    app.use(\"/register-of-assets/api\", yearDepreciationsRouter_1.withYearDepreciationsRouter(yearDepreciationsController));\n    if (__webpack_require__.c[__webpack_require__.s] === module) { // true if file is executed\n        app.listen(PORT, function () {\n            console.log('server started at http://localhost:' + PORT);\n        });\n    }\n});\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/middlewares/accessLog.ts":
/*!**************************************!*\
  !*** ./src/middlewares/accessLog.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nexports.log = void 0;\nfunction log(req, res, next) {\n    next();\n    console.log(req.method + \" \" + req.path + \" \" + res.statusCode);\n}\nexports.log = log;\n\n\n//# sourceURL=webpack:///./src/middlewares/accessLog.ts?");

/***/ }),

/***/ "./src/middlewares/jwtMiddleware.ts":
/*!******************************************!*\
  !*** ./src/middlewares/jwtMiddleware.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nexports.checkJwt = void 0;\nvar jsonwebtoken_1 = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nfunction checkJwt(req, res, next) {\n    console.log(\"checkJwt\");\n    if (!req.get(\"Authorization\")) {\n        res.status(401);\n        res.send(\"UNAUTHORIZED\");\n        return;\n    }\n    var buf = Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64');\n    var token = req.get(\"Authorization\").replace(\"Bearer \", \"\");\n    jsonwebtoken_1.verify(token, buf, function (err, decoded) {\n        if (!err) {\n            res.locals.userId = decoded.userId;\n            next();\n        }\n        else {\n            res.status(401);\n            res.send(\"UNAUTHORIZED\");\n        }\n    });\n}\nexports.checkJwt = checkJwt;\n\n\n//# sourceURL=webpack:///./src/middlewares/jwtMiddleware.ts?");

/***/ }),

/***/ "./src/routers/assetDepreciationsRouter.ts":
/*!*************************************************!*\
  !*** ./src/routers/assetDepreciationsRouter.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nexports.withAssetDepreciationsRouter = void 0;\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar jwtMiddleware_1 = __webpack_require__(/*! ../middlewares/jwtMiddleware */ \"./src/middlewares/jwtMiddleware.ts\");\nfunction withAssetDepreciationsRouter(controller) {\n    var router = express_1.Router();\n    router.post(\"/protected/asset-depreciations/preview\", jwtMiddleware_1.checkJwt, controller.preview);\n    return router;\n}\nexports.withAssetDepreciationsRouter = withAssetDepreciationsRouter;\n\n\n//# sourceURL=webpack:///./src/routers/assetDepreciationsRouter.ts?");

/***/ }),

/***/ "./src/routers/assetsRouter.ts":
/*!*************************************!*\
  !*** ./src/routers/assetsRouter.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nexports.withAssetsRouter = void 0;\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar jwtMiddleware_1 = __webpack_require__(/*! ../middlewares/jwtMiddleware */ \"./src/middlewares/jwtMiddleware.ts\");\nfunction withAssetsRouter(controller) {\n    var router = express_1.Router();\n    router.get(\"/protected/assets\", jwtMiddleware_1.checkJwt, controller.listAssets);\n    router.post(\"/protected/assets\", jwtMiddleware_1.checkJwt, controller.addAsset);\n    return router;\n}\nexports.withAssetsRouter = withAssetsRouter;\n\n\n//# sourceURL=webpack:///./src/routers/assetsRouter.ts?");

/***/ }),

/***/ "./src/routers/yearDepreciationsRouter.ts":
/*!************************************************!*\
  !*** ./src/routers/yearDepreciationsRouter.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nexports.withYearDepreciationsRouter = void 0;\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar jwtMiddleware_1 = __webpack_require__(/*! ../middlewares/jwtMiddleware */ \"./src/middlewares/jwtMiddleware.ts\");\nfunction withYearDepreciationsRouter(controller) {\n    var router = express_1.Router();\n    router.post(\"/protected/year-depreciations\", jwtMiddleware_1.checkJwt, controller.add);\n    return router;\n}\nexports.withYearDepreciationsRouter = withYearDepreciationsRouter;\n\n\n//# sourceURL=webpack:///./src/routers/yearDepreciationsRouter.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"reflect-metadata\");\n\n//# sourceURL=webpack:///external_%22reflect-metadata%22?");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"typeorm\");\n\n//# sourceURL=webpack:///external_%22typeorm%22?");

/***/ })

/******/ });