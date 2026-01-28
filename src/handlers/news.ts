import News from '../models/New.model.js';
// backend/src/controllers/NewsController.ts
import { Request, Response } from 'express';


export const createNews = async (req: any, res: Response) => { // Cambiado Request por any para aceptar req.file
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se seleccionó ningún archivo" });
        }

        const { description, type, barberId } = req.body;

        const news = await News.create({
            description,
            url: req.file.path, 
            type: type || 'image',
            user: barberId || 'Anónimo'
        });

        res.status(201).json({ data: news });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno al publicar" });
    }
};
export const getNews = async (_req: Request, res: Response) => {
    try {
        const posts = await News.findAll({ order: [['createdAt', 'DESC']] });
        res.json({ data: posts });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener posts" });
    }
};
export const createPost = async (req, res) => {
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

export const getPosts = async (req, res) => {
    const posts = await News.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ data: posts });
};

