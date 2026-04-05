"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// router.ts  ← Este es el archivo correcto
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middleware_1 = require("./middleware");
const date_1 = require("./handlers/date");
// import { uploadWork } from "./config/cloudinaryWorks";
const router = (0, express_1.Router)();
// Barberos
router.get("/barberos", date_1.getBarberos);
router.post("/barberos", date_1.saveBarberos); // ← Usa saveBarberos que ya tienes
router.post("/barberos/add", (0, express_validator_1.body)("nombre").notEmpty().trim(), middleware_1.handlerInputErrors, date_1.addBarberoSentinel);
// Availability
router.get("/availability/:barber", (0, express_validator_1.param)("barber").notEmpty().trim(), middleware_1.handlerInputErrors, date_1.getBarberAvailability);
// Trabajos (Cloudinary)
router.get("/trabajos", date_1.getWorks);
router.post("/trabajos", date_1.createWorks); // ✅ BIEN
router.delete("/trabajos/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no válido"), middleware_1.handlerInputErrors, date_1.deleteWorks);
// CRUD Citas
router.post("/", (0, express_validator_1.body)("service").notEmpty(), (0, express_validator_1.body)("price").notEmpty().isNumeric().custom(v => parseFloat(v) >= 0), (0, express_validator_1.body)("barber").isString().notEmpty().trim(), (0, express_validator_1.body)("dateList").notEmpty(), (0, express_validator_1.body)("client").notEmpty(), (0, express_validator_1.body)("phone").notEmpty(), (0, express_validator_1.body)("duration").isNumeric().notEmpty(), middleware_1.handlerInputErrors, date_1.createDate);
// Rutas con ID (siempre al final)
router.get("/:id", (0, express_validator_1.param)("id").isInt(), middleware_1.handlerInputErrors, date_1.getDateById);
router.put("/:id", (0, express_validator_1.param)("id").isInt(), middleware_1.handlerInputErrors, date_1.UpdateDate);
router.patch("/:id", (0, express_validator_1.param)("id").isInt(), middleware_1.handlerInputErrors, date_1.UpdateDate);
router.delete("/:id", (0, express_validator_1.param)("id").isInt(), middleware_1.handlerInputErrors, date_1.deleteDate);
exports.default = router;
//# sourceMappingURL=routerDates.js.map