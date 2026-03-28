"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveServices = exports.archivarSemana = exports.markAsPaid = exports.deleteProduct = exports.updateAvailability = exports.UpdateProduct = exports.getProductById = exports.createProduct = exports.getProducts = void 0;
const service_model_1 = __importDefault(require("../models/service.model"));
const Clients_models_1 = __importDefault(require("../models/Clients.models"));
const WeeklyClosing_1 = __importDefault(require("../models/models/WeeklyClosing"));
const getProducts = async (req, res) => {
    try {
        const service = await service_model_1.default.findAll({
            order: [["createdAt", "DESC"]],
            attributes: { exclude: ["updatedAt"] },
            include: [Clients_models_1.default]
        });
        res.json({ data: service });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    try {
        const service = await service_model_1.default.build(req.body);
        // ✅ Asignar isPaid explícitamente antes de guardar
        service.isPaid = req.body.isPaid === true ||
            req.body.isPaid === 'true' ||
            req.body.isPaid === 1;
        await service.save();
        res.json({ data: service });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createProduct = createProduct;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await service_model_1.default.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: "Producto No Encontrado" });
        }
        res.json({ data: service });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProductById = getProductById;
const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const date = await service_model_1.default.findByPk(id);
        if (!date) {
            return res.status(404).json({ error: "Producto No Encontrado" });
        }
        await date.update(req.body);
        await date.save();
        res.json({ data: date });
    }
    catch (error) {
        console.log(error);
    }
};
exports.UpdateProduct = UpdateProduct;
// ✅ FIX: ahora sí lee isPaid del body y lo aplica
const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const date = await service_model_1.default.findByPk(id);
        if (!date) {
            return res.status(404).json({ error: "Producto No Encontrado" });
        }
        // ✅ Si viene isPaid en el body lo usa, si no, hace toggle
        if (typeof req.body.isPaid === 'boolean') {
            date.isPaid = req.body.isPaid;
        }
        else {
            date.isPaid = !date.dataValues.isPaid;
        }
        await date.save();
        res.json({ data: date });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const date = await service_model_1.default.findByPk(id);
        if (!date) {
            return res.status(404).json({ error: "Producto No Encontrado" });
        }
        await date.destroy();
        res.json({ data: "Producto Eliminado" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteProduct = deleteProduct;
// ✅ markAsPaid — ruta dedicada /:id/pay
const markAsPaid = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await service_model_1.default.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }
        service.isPaid = true;
        await service.save();
        res.json({ data: service });
    }
    catch (error) {
        res.status(500).json({ error: "Error al procesar el pago" });
    }
};
exports.markAsPaid = markAsPaid;
// ✅ FIX: ruta corregida a /cierres (sin /api)
const archivarSemana = async (req, res) => {
    try {
        const { barbero, totalBruto, comision50, serviciosArchivados } = req.body;
        await WeeklyClosing_1.default.create({
            barber: barbero,
            totalGross: totalBruto,
            commission: comision50,
            servicesCount: serviciosArchivados.length,
            archivedServiceIds: serviciosArchivados.join(',')
        });
        await service_model_1.default.update({ isArchived: true }, {
            where: { id: serviciosArchivados }
        });
        res.json({ msg: "Cierre completado con éxito" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al archivar la semana" });
    }
};
exports.archivarSemana = archivarSemana;
const getActiveServices = async (req, res) => {
    const services = await service_model_1.default.findAll({
        where: { isPaid: false },
        order: [['createdAt', 'DESC']]
    });
    res.json(services);
};
exports.getActiveServices = getActiveServices;
//# sourceMappingURL=service.js.map