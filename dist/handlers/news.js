"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleLike = exports.addComment = exports.createNews = exports.getNews = void 0;
const Comment_model_1 = __importDefault(require("../models/Comment.model"));
const New_model_1 = __importDefault(require("../models/New.model"));
const Likes_model_1 = __importDefault(require("../models/Likes.model"));
const getNews = async (_req, res) => {
    try {
        const posts = await New_model_1.default.findAll({
            order: [['createdAt', 'DESC']],
            include: [Comment_model_1.default, Likes_model_1.default]
        });
        res.json({ success: true, data: posts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error al obtener noticias" });
    }
};
exports.getNews = getNews;
const createNews = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "No se seleccionó archivo" });
        }
        const { description, type, barberId, clientName } = req.body;
        const news = await New_model_1.default.create({
            description,
            url: req.file.path,
            type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
            clientName: clientName || barberId || 'Anónimo'
        });
        res.status(201).json({ success: true, data: news });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error interno al publicar" });
    }
};
exports.createNews = createNews;
// ... (getNews y createNews que ya tienes) ...
const addComment = async (req, res) => {
    try {
        const { newsId } = req.params;
        const { text, userName } = req.body;
        if (!text || !userName) {
            return res.status(400).json({ success: false, error: "Faltan campos obligatorios" });
        }
        const newComment = await Comment_model_1.default.create({
            text,
            userName,
            newsId: Number(newsId)
        });
        res.status(201).json({ success: true, data: newComment });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error al comentar' });
    }
};
exports.addComment = addComment;
const toggleLike = async (req, res) => {
    try {
        const { newsId } = req.params;
        const { userId } = req.body; // Asegúrate de enviar userId desde el Front
        if (!userId) {
            return res.status(400).json({ success: false, error: "Se requiere ID de usuario" });
        }
        const existingLike = await Likes_model_1.default.findOne({
            where: { newsId: Number(newsId), userId: String(userId) }
        });
        if (existingLike) {
            await existingLike.destroy();
            return res.json({ success: true, message: "Like eliminado", action: "removed" });
        }
        else {
            await Likes_model_1.default.create({
                newsId: Number(newsId),
                userId: String(userId)
            });
            return res.json({ success: true, message: "Like añadido", action: "added" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error en la acción de like" });
    }
};
exports.toggleLike = toggleLike;
//# sourceMappingURL=news.js.map