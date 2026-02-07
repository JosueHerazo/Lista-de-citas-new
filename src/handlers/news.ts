
import { Request, Response} from 'express';
import Comment from '../models/Comment.model';
import News from '../models/New.model';
import  Like  from '../models/Likes.model';

export const getNews = async (_req: Request, res: Response) => {
    try {
        const posts = await News.findAll({ 
            order: [['createdAt', 'DESC']], 
            include: [Comment, Like] 
        });
        res.json({ success: true, data: posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error al obtener noticias" });
    }
};

export const createNews = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "No se seleccionó archivo" });
        }

        const { description, type, barberId, clientName } = req.body;

        const news = await News.create({
            description,
            url: req.file.path, 
            type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
            clientName: clientName || barberId || 'Anónimo'
        });

        res.status(201).json({ success: true, data: news });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error interno al publicar" });
    }
};


// ... (getNews y createNews que ya tienes) ...

export const addComment = async (req: Request, res: Response) => {
    try {
        const { newsId } = req.params;
        const { text, userName } = req.body;

        if (!text || !userName) {
            return res.status(400).json({ success: false, error: "Faltan campos obligatorios" });
        }

        const newComment = await Comment.create({
            text,
            userName,
            newsId: Number(newsId)
        });

        res.status(201).json({ success: true, data: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error al comentar' });
    }
};

export const toggleLike = async (req: Request, res: Response) => {
    try {
        const { newsId } = req.params;
        const { userId } = req.body; // Asegúrate de enviar userId desde el Front

        if (!userId) {
            return res.status(400).json({ success: false, error: "Se requiere ID de usuario" });
        }

        const existingLike = await Like.findOne({ 
            where: { newsId: Number(newsId), userId: String(userId) } 
        });

        if (existingLike) {
            await existingLike.destroy();
            return res.json({ success: true, message: "Like eliminado", action: "removed" });
        } else {
            await Like.create({ 
                newsId: Number(newsId), 
                userId: String(userId) 
            });
            return res.json({ success: true, message: "Like añadido", action: "added" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error en la acción de like" });
    }
};