"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const New_model_1 = __importDefault(require("./New.model"));
let Like = class Like extends sequelize_typescript_1.Model {
    userId;
    newsId;
    news;
};
exports.Like = Like;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Like.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => New_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Like.prototype, "newsId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => New_model_1.default),
    __metadata("design:type", New_model_1.default)
], Like.prototype, "news", void 0);
exports.Like = Like = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'likes',
        timestamps: true // Útil para saber cuándo se dio el like 🕒
    })
], Like);
exports.default = Like;
//# sourceMappingURL=Likes.model.js.map