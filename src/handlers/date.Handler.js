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
exports.deleteTrabajo = exports.createTrabajo = exports.getTrabajos = exports.saveBarberos = exports.getBarberos = exports.getBarberAvailability = exports.deleteProduct = exports.updateAvailability = exports.UpdateProduct = exports.getProductById = exports.createProduct = exports.getProducts = void 0;
var Clients_models_1 = require("../models/Clients.models");
var DateList_models_1 = require("../models/DateList.models");
var Trabajo_models_1 = require("../models/Trabajo.models");
var lib_1 = require("express-validator/lib");
var sequelize_1 = require("sequelize");
var cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
var getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ListDate, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, DateList_models_1.default.findAll({
                        order: [["createdAt", "DESC"]],
                        attributes: { exclude: ["updatedAt"] },
                        include: [Clients_models_1.default]
                    })];
            case 1:
                ListDate = _a.sent();
                res.json({ data: ListDate });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProducts = getProducts;
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, dateslist, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Body recibido en POST /api/date:", req.body);
                errors = (0, lib_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    console.log("❌ Errores de validación:", errors.array());
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                return [4 /*yield*/, DateList_models_1.default.create(req.body)];
            case 1:
                dateslist = _a.sent();
                res.status(201).json({ message: "Cita creada correctamente", data: dateslist });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log("🔥 Error en el servidor:", error_2);
                res.status(500).json({ error: "Error interno" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
var getProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, ListDate, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, DateList_models_1.default.findByPk(id)];
            case 1:
                ListDate = _a.sent();
                if (!ListDate)
                    return [2 /*return*/, res.status(404).json({ error: "Producto No Encontrado" })];
                res.json({ data: ListDate });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProductById = getProductById;
var UpdateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, ListDate, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, DateList_models_1.default.findByPk(id)];
            case 1:
                ListDate = _a.sent();
                if (!ListDate)
                    return [2 /*return*/, res.status(404).json({ error: "Producto No Encontrado" })];
                return [4 /*yield*/, ListDate.update(req.body)];
            case 2:
                _a.sent();
                return [4 /*yield*/, ListDate.save()];
            case 3:
                _a.sent();
                res.json({ data: ListDate });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.UpdateProduct = UpdateProduct;
var updateAvailability = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, ListDate, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, DateList_models_1.default.findByPk(id)];
            case 1:
                ListDate = _a.sent();
                if (!ListDate)
                    return [2 /*return*/, res.status(404).json({ error: "Producto No Encontrado" })];
                return [4 /*yield*/, ListDate.update({ isPaid: !ListDate.dataValues.isPaid })];
            case 2:
                _a.sent();
                res.json({ data: ListDate });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateAvailability = updateAvailability;
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, ListDate, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, DateList_models_1.default.findByPk(id)];
            case 1:
                ListDate = _a.sent();
                if (!ListDate)
                    return [2 /*return*/, res.status(404).json({ error: "Producto No Encontrado" })];
                return [4 /*yield*/, ListDate.destroy()];
            case 2:
                _a.sent();
                res.json({ data: "Product Eliminado" });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
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
                        attributes: ['dateList', 'duration']
                    })];
            case 1:
                appointments = _b.sent();
                busySlots = appointments.map(function (app) { return ({
                    dateList: app.dataValues.dateList,
                    duration: app.dataValues.duration || 30
                }); });
                res.json({ data: busySlots });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _b.sent();
                res.status(500).json({ error: "Error en el servidor" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBarberAvailability = getBarberAvailability;
var getBarberos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var config, barberos, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, DateList_models_1.default.findOne({ where: { service: '__barberos__' } })];
            case 1:
                config = _a.sent();
                if (!config) {
                    return [2 /*return*/, res.json({ data: [
                                { id: "1", nombre: "Josue", foto: "" },
                                { id: "2", nombre: "Vato", foto: "" }
                            ] })];
                }
                barberos = JSON.parse(config.dataValues.client);
                res.json({ data: barberos });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
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
                if (!Array.isArray(barberos))
                    return [2 /*return*/, res.status(400).json({ error: "barberos debe ser un array" })];
                json = JSON.stringify(barberos);
                return [4 /*yield*/, DateList_models_1.default.findOne({ where: { service: '__barberos__' } })];
            case 1:
                existing = _a.sent();
                if (!existing) return [3 /*break*/, 3];
                return [4 /*yield*/, existing.update({ client: json })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, DateList_models_1.default.create({
                    service: '__barberos__', price: 0, barber: '__config__',
                    dateList: new Date().toISOString(), client: json,
                    phone: '__config__', duration: 0
                })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                res.json({ data: barberos });
                return [3 /*break*/, 7];
            case 6:
                error_9 = _a.sent();
                res.status(500).json({ error: "Error al guardar barberos" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.saveBarberos = saveBarberos;
// ── Trabajos ──────────────────────────────────────────────────
var getTrabajos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trabajos, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Trabajo_models_1.default.findAll({ order: [['createdAt', 'DESC']] })];
            case 1:
                trabajos = _a.sent();
                res.json({ data: trabajos });
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                res.status(500).json({ error: 'Error al obtener trabajos' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTrabajos = getTrabajos;
var createTrabajo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, titulo, descripcion, categoria, barbero, file, trabajo, error_11;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, titulo = _a.titulo, descripcion = _a.descripcion, categoria = _a.categoria, barbero = _a.barbero;
                file = req.file;
                console.log("📁 File recibido:", file);
                console.log("📝 Body recibido:", req.body);
                if (!file)
                    return [2 /*return*/, res.status(400).json({ error: 'No se recibió archivo' })];
                if (!titulo || !categoria)
                    return [2 /*return*/, res.status(400).json({ error: 'titulo y categoria son obligatorios' })];
                return [4 /*yield*/, Trabajo_models_1.default.create({
                        titulo: titulo,
                        descripcion: descripcion || '',
                        categoria: categoria,
                        tipo: ((_b = file.mimetype) === null || _b === void 0 ? void 0 : _b.startsWith('video')) ? 'video' : 'image',
                        url: file.path,
                        publicId: file.filename,
                        barbero: barbero || ''
                    })];
            case 1:
                trabajo = _c.sent();
                res.status(201).json({ data: trabajo });
                return [3 /*break*/, 3];
            case 2:
                error_11 = _c.sent();
                console.error('🔥 Error createTrabajo:', JSON.stringify(error_11));
                res.status(500).json({ error: 'Error al crear trabajo' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createTrabajo = createTrabajo;
var deleteTrabajo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trabajo, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, Trabajo_models_1.default.findByPk(req.params.id)];
            case 1:
                trabajo = _a.sent();
                if (!trabajo)
                    return [2 /*return*/, res.status(404).json({ error: 'No encontrado' })];
                if (!trabajo.publicId) return [3 /*break*/, 3];
                return [4 /*yield*/, cloudinary_1.v2.uploader.destroy(trabajo.publicId, {
                        resource_type: trabajo.tipo === 'video' ? 'video' : 'image'
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, trabajo.destroy()];
            case 4:
                _a.sent();
                res.json({ data: 'Eliminado' });
                return [3 /*break*/, 6];
            case 5:
                error_12 = _a.sent();
                res.status(500).json({ error: 'Error al eliminar' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteTrabajo = deleteTrabajo;
