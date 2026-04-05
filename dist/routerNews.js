"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinaryWorks_1 = require("./config/cloudinaryWorks"); // Asegúrate de que esta ruta sea correcta
// Intenta importar sin la extensión .js si tu configuración de TS lo permite, 
// o verifica que el archivo realmente esté en src/handlers/news.ts
const news_1 = require("./handlers/news");
const router = (0, express_1.Router)();
router.post('/', cloudinaryWorks_1.uploadWork.single('file'), news_1.createNews);
router.get('/', news_1.getNews);
router.post('/:newsId/comments', news_1.addComment);
router.post('/:newsId/like', news_1.toggleLike);
exports.default = router;
//# sourceMappingURL=routerNews.js.map