import { Router } from 'express';
import { upload } from './config/Cloudinary.js'; 
// Intenta importar sin la extensión .js si tu configuración de TS lo permite, 
// o verifica que el archivo realmente esté en src/handlers/news.ts
import { addComment, createNews, getNews, toggleLike } from './handlers/news.js'; 

const router = Router();

router.post('/', upload.single('file'), createNews);
router.get('/', getNews);
router.post('/', createNews);
router.get('/', getNews); 
router.post('/:newsId/comments', addComment);
router.post('/:newsId/like', toggleLike);  

export default router;