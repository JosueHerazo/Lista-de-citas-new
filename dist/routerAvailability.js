"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routerAvailability.ts
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const date_1 = require("./handlers/date");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
router.get("/:barber", (0, express_validator_1.param)("barber").isString().trim().notEmpty().withMessage("Nombre de barbero requerido"), middleware_1.handlerInputErrors, date_1.getBarberAvailability);
exports.default = router;
//# sourceMappingURL=routerAvailability.js.map