"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
// models/New.model.ts  (o News.model.ts – elige uno y manténlo)
const sequelize_typescript_1 = require("sequelize-typescript");
const Comment_model_1 = __importDefault(require("./Comment.model"));
const Likes_model_1 = require("./Likes.model");
let News = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({ tableName: 'News' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _url_decorators;
    let _url_initializers = [];
    let _url_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _likes_decorators;
    let _likes_initializers = [];
    let _likes_extraInitializers = [];
    let _clientName_decorators;
    let _clientName_initializers = [];
    let _clientName_extraInitializers = [];
    let _comments_decorators;
    let _comments_initializers = [];
    let _comments_extraInitializers = [];
    let _likes_list_decorators;
    let _likes_list_initializers = [];
    let _likes_list_extraInitializers = [];
    var News = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.description = __runInitializers(this, _description_initializers, void 0);
            this.url = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _url_initializers, void 0));
            this.type = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.likes = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _likes_initializers, void 0));
            this.clientName = (__runInitializers(this, _likes_extraInitializers), __runInitializers(this, _clientName_initializers, void 0));
            this.comments = (__runInitializers(this, _clientName_extraInitializers), __runInitializers(this, _comments_initializers, void 0));
            this.likes_list = (__runInitializers(this, _comments_extraInitializers), __runInitializers(this, _likes_list_initializers, void 0));
            __runInitializers(this, _likes_list_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "News");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _description_decorators = [(0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false })];
        _url_decorators = [(0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false })];
        _type_decorators = [(0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('image', 'video'), defaultValue: 'image' })];
        _likes_decorators = [(0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 })];
        _clientName_decorators = [(0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false })];
        _comments_decorators = [(0, sequelize_typescript_1.HasMany)(() => Comment_model_1.default)];
        _likes_list_decorators = [(0, sequelize_typescript_1.HasMany)(() => Likes_model_1.Like)];
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url, set: (obj, value) => { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _likes_decorators, { kind: "field", name: "likes", static: false, private: false, access: { has: obj => "likes" in obj, get: obj => obj.likes, set: (obj, value) => { obj.likes = value; } }, metadata: _metadata }, _likes_initializers, _likes_extraInitializers);
        __esDecorate(null, null, _clientName_decorators, { kind: "field", name: "clientName", static: false, private: false, access: { has: obj => "clientName" in obj, get: obj => obj.clientName, set: (obj, value) => { obj.clientName = value; } }, metadata: _metadata }, _clientName_initializers, _clientName_extraInitializers);
        __esDecorate(null, null, _comments_decorators, { kind: "field", name: "comments", static: false, private: false, access: { has: obj => "comments" in obj, get: obj => obj.comments, set: (obj, value) => { obj.comments = value; } }, metadata: _metadata }, _comments_initializers, _comments_extraInitializers);
        __esDecorate(null, null, _likes_list_decorators, { kind: "field", name: "likes_list", static: false, private: false, access: { has: obj => "likes_list" in obj, get: obj => obj.likes_list, set: (obj, value) => { obj.likes_list = value; } }, metadata: _metadata }, _likes_list_initializers, _likes_list_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        News = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return News = _classThis;
})();
exports.News = News;
exports.default = News;
//# sourceMappingURL=New.model.js.map