"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const date_Handler_1 = require("./handlers/date.Handler");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
// ── Barberos ──────────────────────────────────────────────────
router.get("/barberos", date_Handler_1.getBarberos);
router.post("/barberos", (0, express_validator_1.body)("nombre").notEmpty().withMessage("El nombre es obligatorio").trim(), (0, express_validator_1.body)("foto").optional().isString().trim(), middleware_1.handlerInputErrors, date_Handler_1.addBarbero);
router.put("/barberos/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no válido"), (0, express_validator_1.body)("nombre").optional().isString().trim(), (0, express_validator_1.body)("foto").optional().isString().trim(), middleware_1.handlerInputErrors, date_Handler_1.updateBarbero);
router.delete("/barberos/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no válido"), middleware_1.handlerInputErrors, date_Handler_1.deleteBarbero);
// ── Availability ──────────────────────────────────────────────
router.get("/availability/:barber", (0, express_validator_1.param)("barber").notEmpty().trim(), middleware_1.handlerInputErrors, date_Handler_1.getBarberAvailability);
// ── Trabajos ──────────────────────────────────────────────────
router.get("/trabajos", date_Handler_1.getTrabajos);
router.post("/trabajos", date_Handler_1.createTrabajo);
router.delete("/trabajos/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no válido"), middleware_1.handlerInputErrors, date_Handler_1.deleteTrabajo);
// ── CRUD citas ────────────────────────────────────────────────
router.post("/", (0, express_validator_1.body)("service").notEmpty(), (0, express_validator_1.body)("price").notEmpty().isNumeric().custom(v => parseFloat(v) >= 0), (0, express_validator_1.body)("barber").isString().notEmpty().trim(), (0, express_validator_1.body)("dateList").notEmpty(), (0, express_validator_1.body)("client").notEmpty(), (0, express_validator_1.body)("phone").notEmpty(), (0, express_validator_1.body)("duration").isNumeric().notEmpty(), middleware_1.handlerInputErrors, date_Handler_1.createProduct);
// ── :id SIEMPRE AL FINAL ──────────────────────────────────────
router.get("/:id", (0, express_validator_1.param)("id").isInt(), middleware_1.handlerInputErrors, date_Handler_1.getProductById);
router.put("/:id", (0, express_validator_1.param)("id").isInt(), middleware_1.handlerInputErrors, date_Handler_1.UpdateProduct);
router.patch("/:id", (0, express_validator_1.param)("id").isInt(), middleware_1.handlerInputErrors, date_Handler_1.updateAvailability);
router.delete("/:id", (0, express_validator_1.param)("id").isInt(), middleware_1.handlerInputErrors, date_Handler_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map