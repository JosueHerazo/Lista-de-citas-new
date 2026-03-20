"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBarberos = exports.getBarberos = exports.getBarberAvailability = exports.deleteProduct = exports.updateAvailability = exports.UpdateProduct = exports.getProductById = exports.createProduct = exports.getProducts = void 0;
const Clients_models_1 = __importDefault(require("../models/Clients.models"));
const Datelist_models_1 = __importDefault(require("../models/Datelist.models"));
const lib_1 = require("express-validator/lib");
const sequelize_1 = require("sequelize");
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
        console.log("✅ Body recibido correctamente:", req.body);
        const dateslist = await Datelist_models_1.default.create(req.body);
        res.status(201).json({
            message: "Cita creada correctamente",
            data: dateslist
        });
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
        if (!ListDate) {
            return res.status(404).json({ error: "Producto No Encontrado" });
        }
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
        if (!ListDate) {
            return res.status(404).json({ error: "Producto No Encontrado" });
        }
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
        if (!ListDate) {
            return res.status(404).json({ error: "Producto No Encontrado" });
        }
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
        if (!ListDate) {
            return res.status(404).json({ error: "Producto No Encontrado" });
        }
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
        console.log("📩 Barbero recibido:", barber);
        const appointments = await Datelist_models_1.default.findAll({
            where: {
                barber: { [sequelize_1.Op.iLike]: barber.trim() }
            },
            attributes: ['dateList', 'duration']
        });
        const busySlots = appointments.map(app => ({
            dateList: app.dataValues.dateList,
            duration: app.dataValues.duration || 30
        }));
        console.log("🔴 Slots ocupados:", busySlots);
        res.json({ data: busySlots });
    }
    catch (error) {
        console.error("Error getBarberAvailability:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};
exports.getBarberAvailability = getBarberAvailability;
// ── Barberos guardados como JSON en tabla dates ───────────────
const getBarberos = async (req, res) => {
    try {
        const config = await Datelist_models_1.default.findOne({
            where: { service: '__barberos__' }
        });
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
        console.error("Error getBarberos:", error);
        res.status(500).json({ error: "Error al obtener barberos" });
    }
};
exports.getBarberos = getBarberos;
const saveBarberos = async (req, res) => {
    try {
        const { barberos } = req.body;
        if (!Array.isArray(barberos)) {
            return res.status(400).json({ error: "barberos debe ser un array" });
        }
        const json = JSON.stringify(barberos);
        const existing = await Datelist_models_1.default.findOne({
            where: { service: '__barberos__' }
        });
        if (existing) {
            await existing.update({ client: json });
        }
        else {
            await Datelist_models_1.default.create({
                service: '__barberos__',
                price: 0,
                barber: '__config__',
                dateList: new Date().toISOString(),
                client: json,
                phone: '__config__',
                duration: 0
            });
        }
        res.json({ data: barberos });
    }
    catch (error) {
        console.error("Error saveBarberos:", error);
        res.status(500).json({ error: "Error al guardar barberos" });
    }
};
exports.saveBarberos = saveBarberos;
//# sourceMappingURL=date.Handler.js.map