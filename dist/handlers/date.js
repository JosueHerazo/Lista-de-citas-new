"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBarberos = exports.getBarberos = exports.getBarberAvailability = exports.deleteDate = exports.updateAppointmentStatus = exports.UpdateDate = exports.getDateById = exports.createDate = exports.getDates = void 0;
const sequelize_1 = require("sequelize");
const Clients_models_1 = __importDefault(require("../models/Clients.models"));
const List_models_1 = __importDefault(require("models/List.models"));
const getDates = async (req, res) => {
    try {
        const service = await List_models_1.default.findAll({
            where: {
                service: { [sequelize_1.Op.notIn]: ['__barberos__'] } // ✅ excluir config
            },
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
exports.getDates = getDates;
const createDate = async (req, res) => {
    try {
        const { barber, dateList } = req.body;
        const existing = await List_models_1.default.findOne({
            where: { barber, dateList }
        });
        if (existing) {
            return res.status(400).json({
                error: "Ese horario ya está ocupado para este barbero"
            });
        }
        const service = await List_models_1.default.create(req.body);
        res.json({ data: service });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createDate = createDate;
const getDateById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await List_models_1.default.findByPk(id);
        if (!service)
            return res.status(404).json({ error: "Cita no encontrada" });
        res.json({ data: service });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getDateById = getDateById;
const UpdateDate = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await List_models_1.default.findByPk(id);
        if (!service)
            return res.status(404).json({ error: "Cita no encontrada" });
        await service.update(req.body);
        await service.save();
        res.json({ data: service });
    }
    catch (error) {
        console.log(error);
    }
};
exports.UpdateDate = UpdateDate;
const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await List_models_1.default.findByPk(id);
        if (!service)
            return res.status(404).json({ error: "Cita no encontrada" });
        await service.update({ isPaid: !service.dataValues.isPaid });
        res.json({ data: service });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateAppointmentStatus = updateAppointmentStatus;
const deleteDate = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await List_models_1.default.findByPk(id);
        if (!service)
            return res.status(404).json({ error: "Cita no encontrada" });
        await service.destroy();
        res.json({ data: "Cita eliminada" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteDate = deleteDate;
const getBarberAvailability = async (req, res) => {
    try {
        const { barber } = req.params;
        const appointments = await List_models_1.default.findAll({
            where: { barber: { [sequelize_1.Op.iLike]: barber.trim() } },
            attributes: ['dateList']
        });
        const busySlots = appointments.map(app => ({
            dateList: app.dataValues.dateList,
            duration: 30
        }));
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
        const config = await List_models_1.default.findOne({
            where: { service: '__barberos__' }
        });
        if (!config) {
            return res.json({ data: [
                    { id: "josue", nombre: "Josue", foto: "" },
                    { id: "vato", nombre: "Vato", foto: "" }
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
        const existing = await List_models_1.default.findOne({
            where: { service: '__barberos__' }
        });
        if (existing) {
            await existing.update({ client: json });
        }
        else {
            await List_models_1.default.create({
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
//# sourceMappingURL=date.js.map