"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinary_1 = require("./config/cloudinary");
// Intenta importar sin la extensión .js si tu configuración de TS lo permite, 
// o verifica que el archivo realmente esté en src/handlers/news.ts
const news_1 = require("./handlers/news");
const router = (0, express_1.Router)();
router.post('/', cloudinary_1.upload.single('file'), news_1.createNews);
router.get('/', news_1.getNews);
router.post('/:newsId/comments', news_1.addComment);
router.post('/:newsId/like', news_1.toggleLike);
exports.default = router;
// Error trayendo disponibilidad: 
// Object { message: "Request failed with status code 400", name: "AxiosError", code: "ERR_BAD_REQUEST", config: {…}, request: XMLHttpRequest, response: {…}, status: 400, stack: "", … }
// index-DnziEMEM.js:843:5934
// Error al obtener noticias: 
// Object { message: "Request failed with status code 404", name: "AxiosError", code: "ERR_BAD_REQUEST", config: {…}, request: XMLHttpRequest, response: {…}, status: 404, stack: "", … }
// index-DnziEMEM.js:907:1217
// XHR
// POST
// https://ventas-latinosvip-1.onrender.com/api/news
// [HTTP/3 404  2537ms]
// Error al añadir noticia: 
// Object { message: "Request failed with status code 404", name: "AxiosError", code: "ERR_BAD_REQUEST", config: {…}, request: XMLHttpRequest, response: {…}, status: 404, stack: "", … }
// index-DnziEMEM.js:907:1453
//     w8 https://cita-corte.netlify.app/assets/index-DnziEMEM.js:907
//     k8 https://cita-corte.netlify.app/assets/index-DnziEMEM.js:907
//     p https://cita-corte.netlify.app/assets/index-DnziEMEM.js:50
//     h https://cita-corte.netlify.app/assets/index-DnziEMEM.js:50
//     u https://cita-corte.netlify.app/assets/index-DnziEMEM.js:50
//     pT https://cita-corte.netlify.app/assets/index-DnziEMEM.js:50
//     resolve https://cita-corte.netlify.app/assets/index-DnziEMEM.js:50
//     dT https://cita-corte.netlify.app/assets/index-DnziEMEM.js:50
//     dT https://cita-corte.netlify.app/assets/index-DnziEMEM.js:50
//     fT https://cita-corte.netlify.app/assets/index-DnziEMEM.js:50
//     Mo https://cita-corte.netlify.app/assets/index-DnziEMEM.js:49
//     Y2 https://cita-corte.netlify.app/assets/index-DnziEMEM.js:49
//     ba https://cita-corte.netlify.app/assets/index-DnziEMEM.js:49
//     qv https://cita-corte.netlify.app/assets/index-DnziEMEM.js:49
//     uS https://cita-corte.netlify.app/assets/index-DnziEMEM.js:68
//     g https://cita-corte.netlify.app/assets/index-DnziEMEM.js:68
//     IE https://cita-corte.netlify.app/assets/index-DnziEMEM.js:37
//     jE https://cita-corte.netlify.app/assets/index-DnziEMEM.js:37
//     zE https://cita-corte.netlify.app/assets/index-DnziEMEM.js:37
//     Lg https://cita-corte.netlify.app/assets/index-DnziEMEM.js:37
//     zb https://cita-corte.netlify.app/assets/index-DnziEMEM.js:37
//     Hd https://cita-corte.netlify.app/assets/index-DnziEMEM.js:37
//     bm https://cita-corte.netlify.app/assets/index-DnziEMEM.js:40
//     ub https://cita-corte.netlify.app/assets/index-DnziEMEM.js:37
//     Hd https://cita-corte.netlify.app/assets/index-DnziEMEM.js:37
//     Qh https://cita-corte.netlify.app/assets/index-DnziEMEM.js:37
//     tC https://cita-corte.netlify.app/assets/index-DnziEMEM.js:37
// XHR
// GET
// https://ventas-latinosvip-1.onrender.com/api/news
// [HTTP/3 404  503ms]
// Error al obtener noticias: 
// Object { message: "Request failed with status code 404", name: "AxiosError", code: "ERR_BAD_REQUEST", config: {…}, request: XMLHttpRequest, response: {…}, status: 404, stack: "", … }
// index-DnziEMEM.js:907:1217
// XHR
// GET
// https://ventas-latinosvip-1.onrender.com/api/news
// [HTTP/3 404  111ms]
// Error al obtener noticias: 
// Object { message: "Request failed with status code 404", name: "AxiosError", code: "ERR_BAD_REQUEST", config: {…}, request: XMLHttpRequest, response: {…}, status: 404, stack: "", … }
//# sourceMappingURL=routerNews.js.map