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
import { getTrabajos, createTrabajo, deleteTrabajo } from "./handlers/trabajos.handler"
import { uploadTrabajo } from "./config/cloudinaryTrabajos"
import { handlerInputErrors } from "./middleware"

const router = Router()

router.get("/barberos", getBarberos)
router.post(
    "/barberos",
    body("barberos").isArray().withMessage("barberos debe ser un array"),
    handlerInputErrors,
    saveBarberos
)

router.get(
    "/availability/:barber",
    param("barber").notEmpty().withMessage("Nombre de barbero requerido").trim(),
    handlerInputErrors,
    getBarberAvailability
)

router.get("/trabajos", getTrabajos)
router.post("/trabajos", uploadTrabajo.single("archivo"), createTrabajo)
router.delete(
    "/trabajos/:id",
    param("id").isInt().withMessage("ID no válido"),
    handlerInputErrors,
    deleteTrabajo
)

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