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
exports.Like = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const New_model_1 = __importDefault(require("./New.model"));
let Like = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({
            tableName: 'likes',
            timestamps: true // Útil para saber cuándo se dio el like 🕒
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _newsId_decorators;
    let _newsId_initializers = [];
    let _newsId_extraInitializers = [];
    let _news_decorators;
    let _news_initializers = [];
    let _news_extraInitializers = [];
    var Like = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.userId = __runInitializers(this, _userId_initializers, void 0);
            this.newsId = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _newsId_initializers, void 0));
            this.news = (__runInitializers(this, _newsId_extraInitializers), __runInitializers(this, _news_initializers, void 0));
            __runInitializers(this, _news_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Like");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _userId_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false
            })];
        _newsId_decorators = [(0, sequelize_typescript_1.ForeignKey)(() => New_model_1.default), (0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false
            })];
        _news_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => New_model_1.default)];
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _newsId_decorators, { kind: "field", name: "newsId", static: false, private: false, access: { has: obj => "newsId" in obj, get: obj => obj.newsId, set: (obj, value) => { obj.newsId = value; } }, metadata: _metadata }, _newsId_initializers, _newsId_extraInitializers);
        __esDecorate(null, null, _news_decorators, { kind: "field", name: "news", static: false, private: false, access: { has: obj => "news" in obj, get: obj => obj.news, set: (obj, value) => { obj.news = value; } }, metadata: _metadata }, _news_initializers, _news_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Like = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Like = _classThis;
})();
exports.Like = Like;
exports.default = Like;
//# sourceMappingURL=Likes.model.js.map