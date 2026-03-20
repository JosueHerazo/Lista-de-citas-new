import { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import Trabajo from '../models/Trabajo.models'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// GET /api/trabajos — todos los trabajos
export const getTrabajos = async (req: Request, res: Response) => {
    try {
        const trabajos = await Trabajo.findAll({
            order: [['createdAt', 'DESC']]
        })
        res.json({ data: trabajos })
    } catch (error) {
        console.error('Error getTrabajos:', error)
        res.status(500).json({ error: 'Error al obtener trabajos' })
    }
}

// POST /api/trabajos — crear trabajo (con archivo ya subido por multer/cloudinary)
export const createTrabajo = async (req: Request, res: Response) => {
    try {
        const { titulo, descripcion, categoria, barbero } = req.body
        const file = req.file as any

        if (!file) return res.status(400).json({ error: 'No se recibió archivo' })
        if (!titulo || !categoria) return res.status(400).json({ error: 'titulo y categoria son obligatorios' })

        const tipo = file.mimetype?.startsWith('video') ? 'video' : 'image'

        const trabajo = await Trabajo.create({
            titulo,
            descripcion: descripcion || '',
            categoria,
            tipo,
            url:      file.path,       // URL de Cloudinary
            publicId: file.filename,   // public_id de Cloudinary
            barbero:  barbero || ''
        })

        res.status(201).json({ data: trabajo })
    } catch (error) {
        console.error('Error createTrabajo:', error)
        res.status(500).json({ error: 'Error al crear trabajo' })
    }
}

// DELETE /api/trabajos/:id — borrar trabajo y su archivo en Cloudinary
export const deleteTrabajo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const trabajo = await Trabajo.findByPk(id)

        if (!trabajo) return res.status(404).json({ error: 'Trabajo no encontrado' })

        // Borrar de Cloudinary si tiene publicId
        if (trabajo.publicId) {
            const resourceType = trabajo.tipo === 'video' ? 'video' : 'image'
            await cloudinary.uploader.destroy(trabajo.publicId, { resource_type: resourceType })
        }

        await trabajo.destroy()
        res.json({ data: 'Trabajo eliminado' })
    } catch (error) {
        console.error('Error deleteTrabajo:', error)
        res.status(500).json({ error: 'Error al eliminar trabajo' })
    }
}