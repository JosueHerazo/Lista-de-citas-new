"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrabajo = exports.createTrabajo = exports.getTrabajos = void 0;
const cloudinary_1 = require("cloudinary");
const Trabajo_models_1 = __importDefault(require("../models/Trabajo.models"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// GET /api/trabajos — todos los trabajos
const getTrabajos = async (req, res) => {
    try {
        const trabajos = await Trabajo_models_1.default.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json({ data: trabajos });
    }
    catch (error) {
        console.error('Error getTrabajos:', error);
        res.status(500).json({ error: 'Error al obtener trabajos' });
    }
};
exports.getTrabajos = getTrabajos;
// POST /api/trabajos — crear trabajo (con archivo ya subido por multer/cloudinary)
const createTrabajo = async (req, res) => {
    try {
        const { titulo, descripcion, categoria, barbero } = req.body;
        const file = req.file;
        if (!file)
            return res.status(400).json({ error: 'No se recibió archivo' });
        if (!titulo || !categoria)
            return res.status(400).json({ error: 'titulo y categoria son obligatorios' });
        const tipo = file.mimetype?.startsWith('video') ? 'video' : 'image';
        const trabajo = await Trabajo_models_1.default.create({
            titulo,
            descripcion: descripcion || '',
            categoria,
            tipo,
            url: file.path, // URL de Cloudinary
            publicId: file.filename, // public_id de Cloudinary
            barbero: barbero || ''
        });
        res.status(201).json({ data: trabajo });
    }
    catch (error) {
        console.error('Error createTrabajo:', error);
        res.status(500).json({ error: 'Error al crear trabajo' });
    }
};
exports.createTrabajo = createTrabajo;
// DELETE /api/trabajos/:id — borrar trabajo y su archivo en Cloudinary
const deleteTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const trabajo = await Trabajo_models_1.default.findByPk(id);
        if (!trabajo)
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        // Borrar de Cloudinary si tiene publicId
        if (trabajo.publicId) {
            const resourceType = trabajo.tipo === 'video' ? 'video' : 'image';
            await cloudinary_1.v2.uploader.destroy(trabajo.publicId, { resource_type: resourceType });
        }
        await trabajo.destroy();
        res.json({ data: 'Trabajo eliminado' });
    }
    catch (error) {
        console.error('Error deleteTrabajo:', error);
        res.status(500).json({ error: 'Error al eliminar trabajo' });
    }
};
exports.deleteTrabajo = deleteTrabajo;
//# sourceMappingURL=trabajos.handler.js.map