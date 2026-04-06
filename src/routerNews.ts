import { Router } from 'express';
// Intenta importar sin la extensión .js si tu configuración de TS lo permite, 
// o verifica que el archivo realmente esté en src/handlers/news.ts
import { addComment, createNews, getNews, toggleLike } from './handlers/news';

const router = Router();

router.post('/', createNews);
router.get('/', getNews); 
router.post('/:newsId/comments', addComment);
router.post('/:newsId/like', toggleLike);  

export default router;