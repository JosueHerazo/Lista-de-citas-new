"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const date_Handler_1 = require("./handlers/date.Handler");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
// ── Barberos (ANTES de /:id) ──────────────────────────────────
router.get("/barberos", date_Handler_1.getBarberos);
router.post("/barberos", (0, express_validator_1.body)("barberos").isArray().withMessage("barberos debe ser un array"), middleware_1.handlerInputErrors, date_Handler_1.saveBarberos);
// ── Availability (ANTES de /:id) ──────────────────────────────
router.get("/availability/:barber", (0, express_validator_1.param)("barber").notEmpty().withMessage("Nombre de barbero requerido").trim(), middleware_1.handlerInputErrors, date_Handler_1.getBarberAvailability);
// ── Crear cita ────────────────────────────────────────────────
router.post("/", (0, express_validator_1.body)("service").notEmpty().withMessage("El servicio no puede ir vacío"), (0, express_validator_1.body)("price")
    .notEmpty().withMessage("El precio no puede ir vacío")
    .isNumeric().withMessage("El precio debe ser un número")
    .custom(value => parseFloat(value) >= 0).withMessage("Precio no válido"), (0, express_validator_1.body)("barber").isString().notEmpty().withMessage("El barbero no puede ir vacío").trim(), (0, express_validator_1.body)("dateList").notEmpty().withMessage("La fecha no puede ir vacía"), (0, express_validator_1.body)("client").notEmpty().withMessage("El nombre no puede ir vacío"), (0, express_validator_1.body)("phone").notEmpty().withMessage("El teléfono no puede ir vacío"), (0, express_validator_1.body)("duration").isNumeric().notEmpty().withMessage("La duración es requerida"), middleware_1.handlerInputErrors, date_Handler_1.createProduct);
// ── CRUD por ID (SIEMPRE al final) ────────────────────────────
router.get("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no válido"), middleware_1.handlerInputErrors, date_Handler_1.getProductById);
router.put("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no válido"), middleware_1.handlerInputErrors, date_Handler_1.UpdateProduct);
router.patch("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no válido"), middleware_1.handlerInputErrors, date_Handler_1.updateAvailability);
router.delete("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no válido"), middleware_1.handlerInputErrors, date_Handler_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map