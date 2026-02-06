"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = exports.updateAppointmentStatus = exports.getProductById = exports.deleteProduct = exports.createProduct = exports.getProducts = void 0;
const DateList_models_1 = __importDefault(require("../models/DateList.models"));
const getProducts = async (req, res) => {
    try {
        const dateslist = await DateList_models_1.default.findAll({
            order: [
                ["createdAt", "DESC"]
            ],
            attributes: { exclude: ["updatedAt",] },
        });
        res.json({ data: dateslist });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    try {
        const dateslist = await DateList_models_1.default.create(req.body);
        res.status(201).json({ data: dateslist });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createProduct = createProduct;
// Agrega los demás (deleteProduct, getProductById, etc.) aunque estén vacíos por ahora
const deleteProduct = async (req, res) => { };
exports.deleteProduct = deleteProduct;
const getProductById = async (req, res) => { };
exports.getProductById = getProductById;
// En tu controlador de Express (Sugerencia)
const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const appointment = await DateList_models_1.default.findByPk(id);
    if (appointment) {
        // IMPORTANTE: Cambia el booleano que uses para filtrar
        appointment.isPaid = true;
        await appointment.save();
        res.json({ data: appointment });
    }
};
exports.updateAppointmentStatus = updateAppointmentStatus;
const UpdateProduct = async (req, res) => { };
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=date.js.map