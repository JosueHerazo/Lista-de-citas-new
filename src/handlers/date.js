"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBarberos = exports.getBarberos = exports.getBarberAvailability = exports.deleteDate = exports.updateAppointmentStatus = exports.UpdateDate = exports.getDateById = exports.createDate = exports.getDates = void 0;
var sequelize_1 = require("sequelize");
var DateList_models_1 = require("../models/DateList.models");
var Clients_models_1 = require("../models/Clients.models");
var getDates = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var service, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, DateList_models_1.default.findAll({
                        where: {
                            service: (_a = {}, _a[sequelize_1.Op.notIn] = ['__barberos__'], _a) // ✅ excluir config
                        },
                        order: [["createdAt", "DESC"]],
                        attributes: { exclude: ["updatedAt"] },
                        include: [Clients_models_1.default]
                    })];
            case 1:
                service = _b.sent();
                res.json({ data: service });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDates = getDates;
var createDate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, barber, dateList, existing, service, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, barber = _a.barber, dateList = _a.dateList;
                return [4 /*yield*/, DateList_models_1.default.findOne({
                        where: { barber: barber, dateList: dateList }
                    })];
            case 1:
                existing = _b.sent();
                if (existing) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Ese horario ya está ocupado para este barbero"
                        })];
                }
                return [4 /*yield*/, DateList_models_1.default.create(req.body)];
            case 2:
                service = _b.sent();
                res.json({ data: service });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createDate = createDate;
var getDateById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, service, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, DateList_models_1.default.findByPk(id)];
            case 1:
                service = _a.sent();
                if (!service)
                    return [2 /*return*/, res.status(404).json({ error: "Cita no encontrada" })];
                res.json({ data: service });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDateById = getDateById;
var UpdateDate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, service, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, DateList_models_1.default.findByPk(id)];
            case 1:
                service = _a.sent();
                if (!service)
                    return [2 /*return*/, res.status(404).json({ error: "Cita no encontrada" })];
                return [4 /*yield*/, service.update(req.body)];
            case 2:
                _a.sent();
                return [4 /*yield*/, service.save()];
            case 3:
                _a.sent();
                res.json({ data: service });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.UpdateDate = UpdateDate;
var updateAppointmentStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, service, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, DateList_models_1.default.findByPk(id)];
            case 1:
                service = _a.sent();
                if (!service)
                    return [2 /*return*/, res.status(404).json({ error: "Cita no encontrada" })];
                return [4 /*yield*/, service.update({ isPaid: !service.dataValues.isPaid })];
            case 2:
                _a.sent();
                res.json({ data: service });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateAppointmentStatus = updateAppointmentStatus;
var deleteDate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, service, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, DateList_models_1.default.findByPk(id)];
            case 1:
                service = _a.sent();
                if (!service)
                    return [2 /*return*/, res.status(404).json({ error: "Cita no encontrada" })];
                return [4 /*yield*/, service.destroy()];
            case 2:
                _a.sent();
                res.json({ data: "Cita eliminada" });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteDate = deleteDate;
var getBarberAvailability = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var barber, appointments, busySlots, error_7;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                barber = req.params.barber;
                return [4 /*yield*/, DateList_models_1.default.findAll({
                        where: { barber: (_a = {}, _a[sequelize_1.Op.iLike] = barber.trim(), _a) },
                        attributes: ['dateList']
                    })];
            case 1:
                appointments = _b.sent();
                busySlots = appointments.map(function (app) { return ({
                    dateList: app.dataValues.dateList,
                    duration: 30
                }); });
                res.json({ data: busySlots });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _b.sent();
                console.error("Error getBarberAvailability:", error_7);
                res.status(500).json({ error: "Error en el servidor" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBarberAvailability = getBarberAvailability;
// ── Barberos guardados como JSON en tabla dates ───────────────
var getBarberos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var config, barberos, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, DateList_models_1.default.findOne({
                        where: { service: '__barberos__' }
                    })];
            case 1:
                config = _a.sent();
                if (!config) {
                    return [2 /*return*/, res.json({ data: [
                                { id: "josue", nombre: "Josue", foto: "" },
                                { id: "vato", nombre: "Vato", foto: "" }
                            ] })];
                }
                barberos = JSON.parse(config.dataValues.client);
                res.json({ data: barberos });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error("Error getBarberos:", error_8);
                res.status(500).json({ error: "Error al obtener barberos" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBarberos = getBarberos;
var saveBarberos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var barberos, json, existing, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                barberos = req.body.barberos;
                if (!Array.isArray(barberos)) {
                    return [2 /*return*/, res.status(400).json({ error: "barberos debe ser un array" })];
                }
                json = JSON.stringify(barberos);
                return [4 /*yield*/, DateList_models_1.default.findOne({
                        where: { service: '__barberos__' }
                    })];
            case 1:
                existing = _a.sent();
                if (!existing) return [3 /*break*/, 3];
                return [4 /*yield*/, existing.update({ client: json })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, DateList_models_1.default.create({
                    service: '__barberos__',
                    price: 0,
                    barber: '__config__',
                    dateList: new Date().toISOString(),
                    client: json,
                    phone: '__config__',
                    duration: 0
                })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                res.json({ data: barberos });
                return [3 /*break*/, 7];
            case 6:
                error_9 = _a.sent();
                console.error("Error saveBarberos:", error_9);
                res.status(500).json({ error: "Error al guardar barberos" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.saveBarberos = saveBarberos;
