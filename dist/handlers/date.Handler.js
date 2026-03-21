"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrabajo = exports.createTrabajo = exports.getTrabajos = exports.saveBarberos = exports.getBarberos = exports.getBarberAvailability = exports.deleteProduct = exports.updateAvailability = exports.UpdateProduct = exports.getProductById = exports.createProduct = exports.getProducts = void 0;
const Clients_models_1 = __importDefault(require("../models/Clients.models"));
const Datelist_models_1 = __importDefault(require("../models/Datelist.models"));
const Trabajo_models_1 = __importDefault(require("../models/Trabajo.models"));
const lib_1 = require("express-validator/lib");
const sequelize_1 = require("sequelize");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const getProducts = async (req, res) => {
    try {
        const ListDate = await Datelist_models_1.default.findAll({
            order: [["createdAt", "DESC"]],
            attributes: { exclude: ["updatedAt"] },
            include: [Clients_models_1.default]
        });
        res.json({ data: ListDate });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    try {
        console.log("Body recibido en POST /api/date:", req.body);
        const errors = (0, lib_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log("❌ Errores de validación:", errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        const dateslist = await Datelist_models_1.default.create(req.body);
        res.status(201).json({ message: "Cita creada correctamente", data: dateslist });
    }
    catch (error) {
        console.log("🔥 Error en el servidor:", error);
        res.status(500).json({ error: "Error interno" });
    }
};
exports.createProduct = createProduct;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const ListDate = await Datelist_models_1.default.findByPk(id);
        if (!ListDate)
            return res.status(404).json({ error: "Producto No Encontrado" });
        res.json({ data: ListDate });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProductById = getProductById;
const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const ListDate = await Datelist_models_1.default.findByPk(id);
        if (!ListDate)
            return res.status(404).json({ error: "Producto No Encontrado" });
        await ListDate.update(req.body);
        await ListDate.save();
        res.json({ data: ListDate });
    }
    catch (error) {
        console.log(error);
    }
};
exports.UpdateProduct = UpdateProduct;
const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const ListDate = await Datelist_models_1.default.findByPk(id);
        if (!ListDate)
            return res.status(404).json({ error: "Producto No Encontrado" });
        await ListDate.update({ isPaid: !ListDate.dataValues.isPaid });
        res.json({ data: ListDate });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const ListDate = await Datelist_models_1.default.findByPk(id);
        if (!ListDate)
            return res.status(404).json({ error: "Producto No Encontrado" });
        await ListDate.destroy();
        res.json({ data: "Product Eliminado" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteProduct = deleteProduct;
const getBarberAvailability = async (req, res) => {
    try {
        const { barber } = req.params;
        const appointments = await Datelist_models_1.default.findAll({
            where: { barber: { [sequelize_1.Op.iLike]: barber.trim() } },
            attributes: ['dateList', 'duration']
        });
        const busySlots = appointments.map(app => ({
            dateList: app.dataValues.dateList,
            duration: app.dataValues.duration || 30
        }));
        res.json({ data: busySlots });
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};
exports.getBarberAvailability = getBarberAvailability;
const getBarberos = async (req, res) => {
    try {
        const config = await Datelist_models_1.default.findOne({ where: { service: '__barberos__' } });
        if (!config) {
            return res.json({ data: [
                    { id: "1", nombre: "Josue", foto: "" },
                    { id: "2", nombre: "Vato", foto: "" }
                ] });
        }
        const barberos = JSON.parse(config.dataValues.client);
        res.json({ data: barberos });
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener barberos" });
    }
};
exports.getBarberos = getBarberos;
const saveBarberos = async (req, res) => {
    try {
        const { barberos } = req.body;
        if (!Array.isArray(barberos))
            return res.status(400).json({ error: "barberos debe ser un array" });
        const json = JSON.stringify(barberos);
        const existing = await Datelist_models_1.default.findOne({ where: { service: '__barberos__' } });
        if (existing) {
            await existing.update({ client: json });
        }
        else {
            await Datelist_models_1.default.create({
                service: '__barberos__', price: 0, barber: '__config__',
                dateList: new Date().toISOString(), client: json,
                phone: '__config__', duration: 0
            });
        }
        res.json({ data: barberos });
    }
    catch (error) {
        res.status(500).json({ error: "Error al guardar barberos" });
    }
};
exports.saveBarberos = saveBarberos;
// ── Trabajos ──────────────────────────────────────────────────
const getTrabajos = async (req, res) => {
    try {
        const trabajos = await Trabajo_models_1.default.findAll({ order: [['createdAt', 'DESC']] });
        res.json({ data: trabajos });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener trabajos' });
    }
};
exports.getTrabajos = getTrabajos;
const createTrabajo = async (req, res) => {
    try {
        const { titulo, descripcion, categoria, barbero } = req.body;
        const file = req.file;
        if (!file)
            return res.status(400).json({ error: 'No se recibió archivo' });
        if (!titulo || !categoria)
            return res.status(400).json({ error: 'titulo y categoria son obligatorios' });
        const trabajo = await Trabajo_models_1.default.create({
            titulo,
            descripcion: descripcion || '',
            categoria,
            tipo: file.mimetype?.startsWith('video') ? 'video' : 'image',
            url: file.path,
            publicId: file.filename,
            barbero: barbero || ''
        });
        res.status(201).json({ data: trabajo });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear trabajo' });
    }
};
exports.createTrabajo = createTrabajo;
const deleteTrabajo = async (req, res) => {
    try {
        const trabajo = await Trabajo_models_1.default.findByPk(req.params.id);
        if (!trabajo)
            return res.status(404).json({ error: 'No encontrado' });
        if (trabajo.publicId) {
            await cloudinary_1.v2.uploader.destroy(trabajo.publicId, {
                resource_type: trabajo.tipo === 'video' ? 'video' : 'image'
            });
        }
        await trabajo.destroy();
        res.json({ data: 'Eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
};
exports.deleteTrabajo = deleteTrabajo;
//# sourceMappingURL=date.Handler.js.map