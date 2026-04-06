// router.ts  ← Este es el archivo correcto
import { Router } from "express";
import { body, param } from "express-validator";
import { handlerInputErrors } from "./middleware";

import {
    createDate,
    deleteDate,
    getBarberAvailability,
    getDateById,
    UpdateDate,
    getBarberos,
    saveBarberos,
    getWorks,
    createWorks,
    deleteWorks,
    addBarberoSentinel
} from "./handlers/date";

const router = Router();

// Barberos
router.get("/barberos", getBarberos);
router.post("/barberos", saveBarberos);   // ← Usa saveBarberos que ya tienes
router.post("/barberos/add", 
    body("nombre").notEmpty().trim(),
    handlerInputErrors,
    addBarberoSentinel
)
// Availability
router.get("/availability/:barber", 
    param("barber").notEmpty().trim(),
    handlerInputErrors,
    getBarberAvailability
);

// Trabajos (Cloudinary)
router.get("/trabajos", getWorks);
router.post("/trabajos", createWorks); // ✅ BIEN

router.delete("/trabajos/:id", 
    param("id").isInt().withMessage("ID no válido"),
    handlerInputErrors,
    deleteWorks
);

// CRUD Citas
router.post("/", 
    body("service").notEmpty(),
    body("price").notEmpty().isNumeric().custom(v => parseFloat(v) >= 0),
    body("barber").isString().notEmpty().trim(),
    body("dateList").notEmpty(),
    body("client").notEmpty(),
    body("phone").notEmpty(),
    body("duration").isNumeric().notEmpty(),
    handlerInputErrors,
    createDate
);

// Rutas con ID (siempre al final)
router.get("/:id",    param("id").isInt(), handlerInputErrors, getDateById);
router.put("/:id",    param("id").isInt(), handlerInputErrors, UpdateDate);
router.patch("/:id",  param("id").isInt(), handlerInputErrors, UpdateDate);
router.delete("/:id", param("id").isInt(), handlerInputErrors, deleteDate);

export default router;