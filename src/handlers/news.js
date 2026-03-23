"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleLike = exports.addComment = exports.createNews = exports.getNews = void 0;
var Comment_model_1 = require("../models/Comment.model");
var New_model_1 = require("../models/New.model");
var Likes_model_1 = require("../models/Likes.model");
var getNews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var news, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, New_model_1.default.findAll()];
            case 1:
                news = _a.sent();
                res.json(news); // <--- Asegúrate de que esto se ejecute
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: "Error al cargar" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getNews = getNews;
var createNews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, description, type, barberId, clientName, news, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                if (!req.file) {
                    return [2 /*return*/, res.status(400).json({ success: false, error: "No se seleccionó archivo" })];
                }
                _a = req.body, description = _a.description, type = _a.type, barberId = _a.barberId, clientName = _a.clientName;
                return [4 /*yield*/, New_model_1.default.create({
                        description: description,
                        url: req.file.path,
                        type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
                        clientName: clientName || barberId || 'Anónimo'
                    })];
            case 1:
                news = _b.sent();
                res.status(201).json({ success: true, data: news });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).json({ success: false, error: "Error interno al publicar" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createNews = createNews;
// ... (getNews y createNews que ya tienes) ...
var addComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newsId, _a, text, userName, newComment, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                newsId = req.params.newsId;
                _a = req.body, text = _a.text, userName = _a.userName;
                if (!text || !userName) {
                    return [2 /*return*/, res.status(400).json({ success: false, error: "Faltan campos obligatorios" })];
                }
                return [4 /*yield*/, Comment_model_1.default.create({
                        text: text,
                        userName: userName,
                        newsId: Number(newsId)
                    })];
            case 1:
                newComment = _b.sent();
                res.status(201).json({ success: true, data: newComment });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error(error_3);
                res.status(500).json({ success: false, error: 'Error al comentar' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addComment = addComment;
var toggleLike = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newsId, userId, existingLike, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                newsId = req.params.newsId;
                userId = req.body.userId;
                if (!userId) {
                    return [2 /*return*/, res.status(400).json({ success: false, error: "Se requiere ID de usuario" })];
                }
                return [4 /*yield*/, Likes_model_1.default.findOne({
                        where: { newsId: Number(newsId), userId: String(userId) }
                    })];
            case 1:
                existingLike = _a.sent();
                if (!existingLike) return [3 /*break*/, 3];
                return [4 /*yield*/, existingLike.destroy()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ success: true, message: "Like eliminado", action: "removed" })];
            case 3: return [4 /*yield*/, Likes_model_1.default.create({
                    newsId: Number(newsId),
                    userId: String(userId)
                })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.json({ success: true, message: "Like añadido", action: "added" })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ success: false, error: "Error en la acción de like" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.toggleLike = toggleLike;
