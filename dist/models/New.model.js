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
exports.News = void 0;
// models/New.model.ts  (o News.model.ts – elige uno y manténlo)
const sequelize_typescript_1 = require("sequelize-typescript");
const Comment_model_1 = __importDefault(require("./Comment.model"));
const Likes_model_1 = require("./Likes.model");
let News = class News extends sequelize_typescript_1.Model {
    description;
    url;
    type;
    likes;
    clientName;
    comments;
    likes_list;
};
exports.News = News;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], News.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], News.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('image', 'video'), defaultValue: 'image' }),
    __metadata("design:type", String)
], News.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], News.prototype, "likes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], News.prototype, "clientName", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Comment_model_1.default),
    __metadata("design:type", Array)
], News.prototype, "comments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Likes_model_1.Like),
    __metadata("design:type", Array)
], News.prototype, "likes_list", void 0);
exports.News = News = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'News' })
], News);
exports.default = News;
//# sourceMappingURL=New.model.js.map