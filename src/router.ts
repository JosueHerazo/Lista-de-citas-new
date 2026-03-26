import { Router } from "express"
import { body, param } from "express-validator"
import {
    createProduct, deleteProduct, getBarberAvailability,
    getProductById, updateAvailability, UpdateProduct,
    getBarberos, addBarbero, updateBarbero, deleteBarbero,
    getTrabajos, createTrabajo, deleteTrabajo
} from "./handlers/date.Handler"
import { handlerInputErrors } from "./middleware"


const router = Router()

// ── Barberos ──────────────────────────────────────────────────
router.get("/barberos", getBarberos)

router.post("/barberos",
    body("nombre").notEmpty().withMessage("El nombre es obligatorio").trim(),
    body("foto").optional().isString().trim(),
    handlerInputErrors,
    addBarbero
)

router.put("/barberos/:id",
    param("id").isInt().withMessage("ID no válido"),
    body("nombre").optional().isString().trim(),
    body("foto").optional().isString().trim(),
    handlerInputErrors,
    updateBarbero
)

router.delete("/barberos/:id",
    param("id").isInt().withMessage("ID no válido"),
    handlerInputErrors,
    deleteBarbero
)

// ── Availability ──────────────────────────────────────────────
router.get("/availability/:barber",
    param("barber").notEmpty().trim(),
    handlerInputErrors,
    getBarberAvailability
)

// ── Trabajos ──────────────────────────────────────────────────
router.get("/trabajos", getTrabajos)
router.post("/trabajos", createTrabajo)
router.delete("/trabajos/:id",
    param("id").isInt().withMessage("ID no válido"),
    handlerInputErrors,
    deleteTrabajo
)

// ── CRUD citas ────────────────────────────────────────────────
router.post("/",
    body("service").notEmpty(),
    body("price").notEmpty().isNumeric().custom(v => parseFloat(v) >= 0),
    body("barber").isString().notEmpty().trim(),
    body("dateList").notEmpty(),
    body("client").notEmpty(),
    body("phone").notEmpty(),
    body("duration").isNumeric().notEmpty(),
    handlerInputErrors,
    createProduct
)

// ── :id SIEMPRE AL FINAL ──────────────────────────────────────
router.get("/:id",    param("id").isInt(), handlerInputErrors, getProductById)
router.put("/:id",    param("id").isInt(), handlerInputErrors, UpdateProduct)
router.patch("/:id",  param("id").isInt(), handlerInputErrors, updateAvailability)
router.delete("/:id", param("id").isInt(), handlerInputErrors, deleteProduct)

export default router