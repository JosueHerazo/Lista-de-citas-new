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
exports.getActiveServices = exports.archivarSemana = exports.markAsPaid = exports.deleteProduct = exports.updateAvailability = exports.UpdateProduct = exports.getProductById = exports.createProduct = exports.getProducts = void 0;
var service_model_1 = require("../models/service.model");
var Clients_models_1 = require("../models/Clients.models");
var WeeklyClosing_1 = require("../models/models/WeeklyClosing");
var getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var service, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, service_model_1.default.findAll({
                        order: [["createdAt", "DESC"]],
                        attributes: { exclude: ["updatedAt"] },
                        include: [Clients_models_1.default]
                    })];
            case 1:
                service = _a.sent();
                res.json({ data: service });
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
    var service, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, service_model_1.default.build(req.body)
                    // ✅ Asignar isPaid explícitamente antes de guardar
                ];
            case 1:
                service = _a.sent();
                // ✅ Asignar isPaid explícitamente antes de guardar
                service.isPaid = req.body.isPaid === true ||
                    req.body.isPaid === 'true' ||
                    req.body.isPaid === 1;
                return [4 /*yield*/, service.save()];
            case 2:
                _a.sent();
                res.json({ data: service });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
var getProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, service, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, service_model_1.default.findByPk(id)];
            case 1:
                service = _a.sent();
                if (!service) {
                    return [2 /*return*/, res.status(404).json({ error: "Producto No Encontrado" })];
                }
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
exports.getProductById = getProductById;
var UpdateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, date, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, service_model_1.default.findByPk(id)];
            case 1:
                date = _a.sent();
                if (!date) {
                    return [2 /*return*/, res.status(404).json({ error: "Producto No Encontrado" })];
                }
                return [4 /*yield*/, date.update(req.body)];
            case 2:
                _a.sent();
                return [4 /*yield*/, date.save()];
            case 3:
                _a.sent();
                res.json({ data: date });
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
// ✅ FIX: ahora sí lee isPaid del body y lo aplica
var updateAvailability = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, date, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, service_model_1.default.findByPk(id)];
            case 1:
                date = _a.sent();
                if (!date) {
                    return [2 /*return*/, res.status(404).json({ error: "Producto No Encontrado" })];
                }
                // ✅ Si viene isPaid en el body lo usa, si no, hace toggle
                if (typeof req.body.isPaid === 'boolean') {
                    date.isPaid = req.body.isPaid;
                }
                else {
                    date.isPaid = !date.dataValues.isPaid;
                }
                return [4 /*yield*/, date.save()];
            case 2:
                _a.sent();
                res.json({ data: date });
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
    var id, date, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, service_model_1.default.findByPk(id)];
            case 1:
                date = _a.sent();
                if (!date) {
                    return [2 /*return*/, res.status(404).json({ error: "Producto No Encontrado" })];
                }
                return [4 /*yield*/, date.destroy()];
            case 2:
                _a.sent();
                res.json({ data: "Producto Eliminado" });
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
// ✅ markAsPaid — ruta dedicada /:id/pay
var markAsPaid = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, service, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, service_model_1.default.findByPk(id)];
            case 1:
                service = _a.sent();
                if (!service) {
                    return [2 /*return*/, res.status(404).json({ error: "Servicio no encontrado" })];
                }
                service.isPaid = true;
                return [4 /*yield*/, service.save()];
            case 2:
                _a.sent();
                res.json({ data: service });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(500).json({ error: "Error al procesar el pago" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.markAsPaid = markAsPaid;
// ✅ FIX: ruta corregida a /cierres (sin /api)
var archivarSemana = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, barbero, totalBruto, comision50, serviciosArchivados, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, barbero = _a.barbero, totalBruto = _a.totalBruto, comision50 = _a.comision50, serviciosArchivados = _a.serviciosArchivados;
                return [4 /*yield*/, WeeklyClosing_1.default.create({
                        barber: barbero,
                        totalGross: totalBruto,
                        commission: comision50,
                        servicesCount: serviciosArchivados.length,
                        archivedServiceIds: serviciosArchivados.join(',')
                    })];
            case 1:
                _b.sent();
                return [4 /*yield*/, service_model_1.default.update({ isArchived: true }, {
                        where: { id: serviciosArchivados }
                    })];
            case 2:
                _b.sent();
                res.json({ msg: "Cierre completado con éxito" });
                return [3 /*break*/, 4];
            case 3:
                error_8 = _b.sent();
                res.status(500).json({ error: "Error al archivar la semana" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.archivarSemana = archivarSemana;
var getActiveServices = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var services;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, service_model_1.default.findAll({
                    where: { isPaid: false },
                    order: [['createdAt', 'DESC']]
                })];
            case 1:
                services = _a.sent();
                res.json(services);
                return [2 /*return*/];
        }
    });
}); };
exports.getActiveServices = getActiveServices;
