import { Router } from "express"
import { body, param } from "express-validator"
import {
    createProduct,
    deleteProduct,
    getBarberAvailability,
    getProductById,
    getProducts,
    updateAvailability,
    UpdateProduct,
    getBarberos,
    saveBarberos
} from "./handlers/date.Handler"
import { handlerInputErrors } from "./middleware"

const router = Router()

// ── Barberos (ANTES de /:id) ──────────────────────────────────
router.get("/barberos", getBarberos)

router.post(
    "/barberos",
    body("barberos").isArray().withMessage("barberos debe ser un array"),
    handlerInputErrors,
    saveBarberos
)

// ── Availability (ANTES de /:id) ──────────────────────────────
router.get(
    "/availability/:barber",
    param("barber").notEmpty().withMessage("Nombre de barbero requerido").trim(),
    handlerInputErrors,
    getBarberAvailability
)

// ── Crear cita ────────────────────────────────────────────────
router.post(
    "/",
    body("service").notEmpty().withMessage("El servicio no puede ir vacío"),
    body("price")
        .notEmpty().withMessage("El precio no puede ir vacío")
        .isNumeric().withMessage("El precio debe ser un número")
        .custom(value => parseFloat(value) >= 0).withMessage("Precio no válido"),
    body("barber").isString().notEmpty().withMessage("El barbero no puede ir vacío").trim(),
    body("dateList").notEmpty().withMessage("La fecha no puede ir vacía"),
    body("client").notEmpty().withMessage("El nombre no puede ir vacío"),
    body("phone").notEmpty().withMessage("El teléfono no puede ir vacío"),
    body("duration").isNumeric().notEmpty().withMessage("La duración es requerida"),
    handlerInputErrors,
    createProduct
)

// ── CRUD por ID (SIEMPRE al final) ────────────────────────────
router.get(
    "/:id",
    param("id").isInt().withMessage("ID no válido"),
    handlerInputErrors,
    getProductById
)

router.put(
    "/:id",
    param("id").isInt().withMessage("ID no válido"),
    handlerInputErrors,
    UpdateProduct
)

router.patch(
    "/:id",
    param("id").isInt().withMessage("ID no válido"),
    handlerInputErrors,
    updateAvailability
)

router.delete(
    "/:id",
    param("id").isInt().withMessage("ID no válido"),
    handlerInputErrors,
    deleteProduct
)

export default router