"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = exports.updateAvailability = exports.getProductById = exports.deleteProduct = exports.getBarberAvailability = exports.createProduct = exports.getProducts = void 0;
const Datelist_models_1 = __importDefault(require("../models/Datelist.models"));
const lib_1 = require("express-validator/lib");
const getProducts = async (req, res) => {
    try {
        const dateslist = await Datelist_models_1.default.findAll();
        res.json({ data: dateslist });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    try {
        console.log("Body recibido en POST /api/date:", req.body);
        // Esto te dirá EXACTAMENTE qué campo está fallando
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
const getBarberAvailability = async (req, res) => {
    try {
        const { barber } = req.params;
        console.log("📩 Petición recibida para barbero:", req.params.barber);
        const appointment = await Datelist_models_1.default.findAll({
            where: { barber },
            attributes: ['dateList']
        });
        const busySlots = appointment.map(app => app.dateList);
        // Respondemos con el array de fechas
        res.json({ data: busySlots });
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};
exports.getBarberAvailability = getBarberAvailability;
// Agrega los demás (deleteProduct, getProductById, etc.) aunque estén vacíos por ahora
const deleteProduct = async (req, res) => { };
exports.deleteProduct = deleteProduct;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Usar id, no barber
        const appointment = await Datelist_models_1.default.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }
        res.json({ data: appointment });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error del servidor" });
    }
};
exports.getProductById = getProductById;
const updateAvailability = async (req, res) => { };
exports.updateAvailability = updateAvailability;
const UpdateProduct = async (req, res) => { };
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=date.js.map