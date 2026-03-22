"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const date_1 = require("./handlers/date");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
//  Routing
<<<<<<< HEAD
// Obtener todas las citas (para el admin)
router.get("/", date_1.getProducts);
// router.get("/availability/:barber",
//     param("barber").isString().trim().notEmpty().withMessage("Nombre de barbero requerido"),
//     handlerInputErrors,
//     getBarberAvailability
// )
// Crear una cita nueva
router.post("/", 
// validacion
(0, express_validator_1.body)("service").notEmpty().withMessage("El nombre del servicio no puede ir vacio"), (0, express_validator_1.body)("price")
    .notEmpty().withMessage("El valor del producto no puede ir vacio")
    .isNumeric().withMessage("El precio debe ser un número")
    .custom(value => parseFloat(value) >= 0).withMessage("Precio no valido"), middleware_1.handlerInputErrors, (0, express_validator_1.body)("barber").isString().notEmpty().withMessage("El nombre del barbero no puede ir vacio").trim(), (0, express_validator_1.body)("dateList").notEmpty().withMessage("La fecha no puede ir vacio"), (0, express_validator_1.body)("client").notEmpty().withMessage("el nombre no puede ir vacio"), (0, express_validator_1.body)("phone").notEmpty().withMessage("El telefono no puede ir vacio"), (0, express_validator_1.body)("duration").isNumeric().notEmpty().withMessage("tiempo de service"), middleware_1.handlerInputErrors, date_1.createProduct);
=======
router.get("/", date_1.getProducts);
router.post("/", 
//validacion
(0, express_validator_1.body)("service").notEmpty().withMessage("El nombre del servicio no puede ir vacio"), (0, express_validator_1.body)("price").isNumeric().withMessage("Valor no valido").notEmpty().withMessage("El valor del producto no ir vacio").custom(value => value > 0).withMessage("Precio no valido"), middleware_1.handlerInputErrors, (0, express_validator_1.body)("barber").notEmpty().withMessage("El nombre del barbero no puede ir vacio"), (0, express_validator_1.body)("date").notEmpty().withMessage("La fecha no puede ir vacio"), (0, express_validator_1.body)("client").notEmpty().withMessage("el nombre no puede ir vacio"), (0, express_validator_1.body)("phone").notEmpty().withMessage("El telefono no puede ir vacio"), date_1.createProduct);
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
router.get("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handlerInputErrors, date_1.getProductById);
// PUT SI ENVIAS UNA PARTE LAS DEMAS PARTES DEL OBJETO SE ENVIAN VACIAS 
router.put("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handlerInputErrors, date_1.UpdateProduct);
// CON PATCH SE PUEDE MODIFICAR PARTES DEL OBJETO SIN QUE MODIFIQUE LAS DEMAS PARTES DEL OBJETO
// con patch se envie la disponibilidad del product solo se toma del dataValue pel producto para motificar el boolean de true a false
<<<<<<< HEAD
router.patch("/:id/availability", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handlerInputErrors, date_1.updateAvailability);
=======
router.patch("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handlerInputErrors, date_1.updateAppointmentStatus);
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
router.delete("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handlerInputErrors, date_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=routerDates.js.map