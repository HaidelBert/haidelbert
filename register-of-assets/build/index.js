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

/***/ "./src/controllers/assetsController.ts":
/*!*********************************************!*\
  !*** ./src/controllers/assetsController.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nexports.AssetsController = void 0;\nvar AssetsController = /** @class */ (function () {\n    function AssetsController(assetRepository) {\n        var _this = this;\n        this.addAsset = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {\n            var tmp, newAsset, e_1;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        tmp = req.body;\n                        tmp.userId = res.locals.userId;\n                        tmp.netRemainingBlockValue = tmp.netAmount;\n                        return [4 /*yield*/, this.assetRepository.save(tmp)];\n                    case 1:\n                        newAsset = _a.sent();\n                        res.json(newAsset);\n                        return [3 /*break*/, 3];\n                    case 2:\n                        e_1 = _a.sent();\n                        next(e_1);\n                        return [3 /*break*/, 3];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        }); };\n        this.listAssets = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {\n            var assets, e_2;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        return [4 /*yield*/, this.assetRepository.find()];\n                    case 1:\n                        assets = _a.sent();\n                        res.json(assets);\n                        return [3 /*break*/, 3];\n                    case 2:\n                        e_2 = _a.sent();\n                        next(e_2);\n                        return [3 /*break*/, 3];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        }); };\n        this.assetRepository = assetRepository;\n    }\n    return AssetsController;\n}());\nexports.AssetsController = AssetsController;\n\n\n//# sourceURL=webpack:///./src/controllers/assetsController.ts?");

/***/ }),

/***/ "./src/entity/asset.ts":
/*!*****************************!*\
  !*** ./src/entity/asset.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nexports.__esModule = true;\nexports.Asset = void 0;\nvar typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nvar assetDepreciation_1 = __webpack_require__(/*! ./assetDepreciation */ \"./src/entity/assetDepreciation.ts\");\nvar Asset = /** @class */ (function (_super) {\n    __extends(Asset, _super);\n    function Asset() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.name = \"\";\n        _this.purchaseDate = new Date();\n        _this.grossAmount = 0;\n        _this.netAmount = 0;\n        _this.depreciationDuration = 3;\n        _this.netRemainingBlockValue = 0;\n        _this.userId = \"\";\n        return _this;\n    }\n    __decorate([\n        typeorm_1.PrimaryGeneratedColumn(),\n        __metadata(\"design:type\", Number)\n    ], Asset.prototype, \"id\");\n    __decorate([\n        typeorm_1.Column(),\n        __metadata(\"design:type\", String)\n    ], Asset.prototype, \"name\");\n    __decorate([\n        typeorm_1.Column({ name: \"purchase_date\" }),\n        __metadata(\"design:type\", Date)\n    ], Asset.prototype, \"purchaseDate\");\n    __decorate([\n        typeorm_1.Column({ name: \"gross_amount\" }),\n        __metadata(\"design:type\", Number)\n    ], Asset.prototype, \"grossAmount\");\n    __decorate([\n        typeorm_1.Column({ name: \"net_amount\" }),\n        __metadata(\"design:type\", Number)\n    ], Asset.prototype, \"netAmount\");\n    __decorate([\n        typeorm_1.Column({ name: \"depreciation_duration\" }),\n        __metadata(\"design:type\", Number)\n    ], Asset.prototype, \"depreciationDuration\");\n    __decorate([\n        typeorm_1.Column({ name: \"net_remaining_block_value\" }),\n        __metadata(\"design:type\", Number)\n    ], Asset.prototype, \"netRemainingBlockValue\");\n    __decorate([\n        typeorm_1.Column({ name: \"user_id\" }),\n        __metadata(\"design:type\", String)\n    ], Asset.prototype, \"userId\");\n    __decorate([\n        typeorm_1.OneToMany(function () { return assetDepreciation_1.AssetDepreciation; }, function (assetDepreciation) { return assetDepreciation.asset; }),\n        __metadata(\"design:type\", Array)\n    ], Asset.prototype, \"depreciations\");\n    Asset = __decorate([\n        typeorm_1.Entity({ name: \"assets\" })\n    ], Asset);\n    return Asset;\n}(typeorm_1.BaseEntity));\nexports.Asset = Asset;\n\n\n//# sourceURL=webpack:///./src/entity/asset.ts?");

/***/ }),

/***/ "./src/entity/assetDepreciation.ts":
/*!*****************************************!*\
  !*** ./src/entity/assetDepreciation.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nexports.__esModule = true;\nexports.AssetDepreciation = void 0;\nvar typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nvar asset_1 = __webpack_require__(/*! ./asset */ \"./src/entity/asset.ts\");\nvar yearDepreciation_1 = __webpack_require__(/*! ./yearDepreciation */ \"./src/entity/yearDepreciation.ts\");\nvar AssetDepreciation = /** @class */ (function (_super) {\n    __extends(AssetDepreciation, _super);\n    function AssetDepreciation() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.year = new Date().getFullYear();\n        _this.netDepreciationAmount = 0;\n        _this.netRemainingBlockValue = 0;\n        return _this;\n    }\n    __decorate([\n        typeorm_1.PrimaryGeneratedColumn(),\n        __metadata(\"design:type\", Number)\n    ], AssetDepreciation.prototype, \"id\");\n    __decorate([\n        typeorm_1.Column(),\n        __metadata(\"design:type\", Number)\n    ], AssetDepreciation.prototype, \"year\");\n    __decorate([\n        typeorm_1.Column({ name: \"net_depreciation_amount\" }),\n        __metadata(\"design:type\", Number)\n    ], AssetDepreciation.prototype, \"netDepreciationAmount\");\n    __decorate([\n        typeorm_1.Column({ name: \"net_remaining_block_value\" }),\n        __metadata(\"design:type\", Number)\n    ], AssetDepreciation.prototype, \"netRemainingBlockValue\");\n    __decorate([\n        typeorm_1.ManyToOne(function () { return asset_1.Asset; }, function (asset) { return asset.depreciations; }),\n        __metadata(\"design:type\", Promise)\n    ], AssetDepreciation.prototype, \"asset\");\n    __decorate([\n        typeorm_1.ManyToOne(function () { return yearDepreciation_1.YearDepreciation; }, function (yearDepreciation) { return yearDepreciation.depreciations; }),\n        __metadata(\"design:type\", Promise)\n    ], AssetDepreciation.prototype, \"yearDepreciation\");\n    AssetDepreciation = __decorate([\n        typeorm_1.Entity({ name: \"asset_depreciations\" })\n    ], AssetDepreciation);\n    return AssetDepreciation;\n}(typeorm_1.BaseEntity));\nexports.AssetDepreciation = AssetDepreciation;\n\n\n//# sourceURL=webpack:///./src/entity/assetDepreciation.ts?");

/***/ }),

/***/ "./src/entity/yearDepreciation.ts":
/*!****************************************!*\
  !*** ./src/entity/yearDepreciation.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nexports.__esModule = true;\nexports.YearDepreciation = void 0;\nvar typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nvar assetDepreciation_1 = __webpack_require__(/*! ./assetDepreciation */ \"./src/entity/assetDepreciation.ts\");\nvar YearDepreciation = /** @class */ (function (_super) {\n    __extends(YearDepreciation, _super);\n    function YearDepreciation() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.year = new Date().getFullYear();\n        return _this;\n    }\n    __decorate([\n        typeorm_1.PrimaryGeneratedColumn(),\n        __metadata(\"design:type\", Number)\n    ], YearDepreciation.prototype, \"id\");\n    __decorate([\n        typeorm_1.Column(),\n        __metadata(\"design:type\", Number)\n    ], YearDepreciation.prototype, \"year\");\n    __decorate([\n        typeorm_1.OneToMany(function () { return assetDepreciation_1.AssetDepreciation; }, function (assetDepreciation) { return assetDepreciation.yearDepreciation; }),\n        __metadata(\"design:type\", Promise)\n    ], YearDepreciation.prototype, \"depreciations\");\n    YearDepreciation = __decorate([\n        typeorm_1.Entity({ name: \"year_depreciation\" })\n    ], YearDepreciation);\n    return YearDepreciation;\n}(typeorm_1.BaseEntity));\nexports.YearDepreciation = YearDepreciation;\n\n\n//# sourceURL=webpack:///./src/entity/yearDepreciation.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\nexports.__esModule = true;\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nvar express = __webpack_require__(/*! express */ \"express\");\nvar dotenv_1 = __webpack_require__(/*! dotenv */ \"dotenv\");\nvar connection_1 = __webpack_require__(/*! ./connection */ \"./src/connection.ts\");\nvar asset_1 = __webpack_require__(/*! ./entity/asset */ \"./src/entity/asset.ts\");\nvar assetsRouter_1 = __webpack_require__(/*! ./routers/assetsRouter */ \"./src/routers/assetsRouter.ts\");\nvar assetsController_1 = __webpack_require__(/*! ./controllers/assetsController */ \"./src/controllers/assetsController.ts\");\nvar accessLog_1 = __webpack_require__(/*! ./middlewares/accessLog */ \"./src/middlewares/accessLog.ts\");\nvar cors = __webpack_require__(/*! cors */ \"cors\");\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\ndotenv_1.config();\nconnection_1.connect().then(function (connection) {\n    var assetRepository = connection.getRepository(asset_1.Asset);\n    var assetController = new assetsController_1.AssetsController(assetRepository);\n    var app = express();\n    var _a = process.env.PORT, PORT = _a === void 0 ? 3000 : _a;\n    app.use(bodyParser.json());\n    app.use(cors());\n    app.use(accessLog_1.log);\n    app.use(\"/register-of-assets/api\", assetsRouter_1.withRouter(assetController));\n    if (__webpack_require__.c[__webpack_require__.s] === module) { // true if file is executed\n        app.listen(PORT, function () {\n            console.log('server started at http://localhost:' + PORT);\n        });\n    }\n});\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/index.ts?");

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

/***/ "./src/routers/assetsRouter.ts":
/*!*************************************!*\
  !*** ./src/routers/assetsRouter.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nexports.withRouter = void 0;\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar jwtMiddleware_1 = __webpack_require__(/*! ../middlewares/jwtMiddleware */ \"./src/middlewares/jwtMiddleware.ts\");\nfunction withRouter(controller) {\n    var router = express_1.Router();\n    router.get(\"/protected/assets\", jwtMiddleware_1.checkJwt, controller.listAssets);\n    router.post(\"/protected/assets\", jwtMiddleware_1.checkJwt, controller.addAsset);\n    return router;\n}\nexports.withRouter = withRouter;\n\n\n//# sourceURL=webpack:///./src/routers/assetsRouter.ts?");

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