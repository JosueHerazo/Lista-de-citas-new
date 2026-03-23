"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var New_model_1 = require("./New.model"); // Importamos el default
var Comment = function () {
    var _classDecorators = [(0, sequelize_typescript_1.Table)({ tableName: "comments" })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = sequelize_typescript_1.Model;
    var _text_decorators;
    var _text_initializers = [];
    var _text_extraInitializers = [];
    var _userName_decorators;
    var _userName_initializers = [];
    var _userName_extraInitializers = [];
    var _newsId_decorators;
    var _newsId_initializers = [];
    var _newsId_extraInitializers = [];
    var _news_decorators;
    var _news_initializers = [];
    var _news_extraInitializers = [];
    var Comment = _classThis = /** @class */ (function (_super) {
        __extends(Comment_1, _super);
        function Comment_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.text = __runInitializers(_this, _text_initializers, void 0);
            _this.userName = (__runInitializers(_this, _text_extraInitializers), __runInitializers(_this, _userName_initializers, void 0));
            _this.newsId = (__runInitializers(_this, _userName_extraInitializers), __runInitializers(_this, _newsId_initializers, void 0));
            _this.news = (__runInitializers(_this, _newsId_extraInitializers), __runInitializers(_this, _news_initializers, void 0));
            __runInitializers(_this, _news_extraInitializers);
            return _this;
        }
        return Comment_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Comment");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _text_decorators = [(0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false })];
        _userName_decorators = [(0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false })];
        _newsId_decorators = [(0, sequelize_typescript_1.ForeignKey)(function () { return New_model_1.default; }), (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false })];
        _news_decorators = [(0, sequelize_typescript_1.BelongsTo)(function () { return New_model_1.default; })];
        __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: function (obj) { return "text" in obj; }, get: function (obj) { return obj.text; }, set: function (obj, value) { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
        __esDecorate(null, null, _userName_decorators, { kind: "field", name: "userName", static: false, private: false, access: { has: function (obj) { return "userName" in obj; }, get: function (obj) { return obj.userName; }, set: function (obj, value) { obj.userName = value; } }, metadata: _metadata }, _userName_initializers, _userName_extraInitializers);
        __esDecorate(null, null, _newsId_decorators, { kind: "field", name: "newsId", static: false, private: false, access: { has: function (obj) { return "newsId" in obj; }, get: function (obj) { return obj.newsId; }, set: function (obj, value) { obj.newsId = value; } }, metadata: _metadata }, _newsId_initializers, _newsId_extraInitializers);
        __esDecorate(null, null, _news_decorators, { kind: "field", name: "news", static: false, private: false, access: { has: function (obj) { return "news" in obj; }, get: function (obj) { return obj.news; }, set: function (obj, value) { obj.news = value; } }, metadata: _metadata }, _news_initializers, _news_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Comment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Comment = _classThis;
}();
exports.Comment = Comment;
exports.default = Comment; // <--- ¡Indispensable para sequelize-typescript!
