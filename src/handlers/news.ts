
import { Request, Response} from 'express';
import Comment from '../models/Comment.model';
import News from '../models/New.model';
import  Like  from '../models/Likes.model';


export const getNews = async (_req: Request, res: Response) => {
    try {
        const posts = await News.findAll({ 
        order: [['createdAt', 'DESC']], 
        include: [Comment, Like] });
        // res.json({ data: posts });
        res.json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener posts" });
        res.status(500).json({ success: false, error: 'Error al obtener noticias' });
    }
};
  
export const createNews = async (req: Request, res: Response) => { // Cambiado Request por any para aceptar req.file
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se seleccionó ningún archivo" });
        }

        const { description, type, barberId } = req.body;

        const news = await News.create({
            description,
            url: req.file.path, 
            type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
            user: barberId || 'Anónimo'
        });

        res.status(201).json({ success: true, data: news });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error interno al publicar" });
    }
};
export const createPost = async (req: Request, res: Response ) => {
    try {
        // req.file viene de multer tras subir a la nube
        const { description, type } = req.body;
        
        const newPost = await News.create({
            description,
            type,
            url: req.file.path, // URL de la imagen en Cloudinary
            clientName: req.body.clientName || "Usuario VIP" 
        });

        res.status(201).json({ data: newPost });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la publicación' });
    }
};

export const getPosts = async (req: Request, res: Response ) => {
    const posts = await News.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ data: posts });
};


export const addComment = async (req : Request, res: Response) => {
    try {
        const { newsId } = req.params;
        const { text, userName } = req.body;

        const newComment = await Comment.create({
            text,
            userName,
            newsId // Sequelize asocia esto automáticamente
        });
        res.status(201).json({ success: true, data: newComment });
    } catch (error) {
        res.status(500).json({ error: 'Error al comentar' });
    }
};


export const toggleLike = async (req: Request, res: Response) => {
    try {
        const { newsId } = req.params;
        const { userId } = req.body;

        // 1. Buscamos si el like ya existe
        const existingLike = await Like.findOne({ 
            where: { newsId, userId } 
        });

        if (existingLike) {
            // Si ya existe, el usuario quiere "quitar" su like
            await existingLike.destroy(); // Usamos destroy() para eliminar el like existente
            res.json({ success: true, message: "Like eliminado" });
        } else {
            // Si no existe, creamos uno nuevo
            await Like.create({ newsId, userId });
            res.json({ message: "Like añadido" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la acción de like" });
    }
};