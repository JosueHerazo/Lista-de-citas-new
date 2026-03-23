"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var date_1 = require("./handlers/date");
var middleware_1 = require("./middleware");
var router = (0, express_1.Router)();
router.get("/", date_1.getDates);
// ── Barberos (SIN validadores, ANTES de /:id) ─────────────────
router.get("/barberos", date_1.getBarberos);
router.post("/barberos", date_1.saveBarberos);
// ── Availability (ANTES de /:id) ──────────────────────────────
router.get("/availability/:barber", (0, express_validator_1.param)("barber").notEmpty().withMessage("Barbero requerido").trim(), middleware_1.handlerInputErrors, date_1.getBarberAvailability);
// ── Crear cita ────────────────────────────────────────────────
router.post("/", (0, express_validator_1.body)("service").notEmpty().withMessage("El nombre del servicio no puede ir vacio"), (0, express_validator_1.body)("price")
    .notEmpty().withMessage("El valor del producto no puede ir vacio")
    .isNumeric().withMessage("El precio debe ser un número")
    .custom(function (value) { return parseFloat(value) >= 0; }).withMessage("Precio no valido"), (0, express_validator_1.body)("barber").isString().notEmpty().withMessage("El nombre del barbero no puede ir vacio").trim(), (0, express_validator_1.body)("dateList").notEmpty().withMessage("La fecha no puede ir vacio"), (0, express_validator_1.body)("client").notEmpty().withMessage("el nombre no puede ir vacio"), (0, express_validator_1.body)("phone").notEmpty().withMessage("El telefono no puede ir vacio"), (0, express_validator_1.body)("duration").isNumeric().notEmpty().withMessage("tiempo de service"), middleware_1.handlerInputErrors, date_1.createDate);
// ── CRUD por ID (SIEMPRE al final) ────────────────────────────
router.get("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handlerInputErrors, date_1.getDateById);
router.put("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handlerInputErrors, date_1.UpdateDate);
router.patch("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handlerInputErrors, date_1.updateAppointmentStatus);
router.delete("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handlerInputErrors, date_1.deleteDate);
exports.default = router;
