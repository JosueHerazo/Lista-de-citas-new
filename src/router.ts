import { Router } from "express"
import { body, param } from "express-validator"
import {
    createProduct, deleteProduct, getBarberAvailability,
    getProductById, getProducts, updateAvailability, UpdateProduct,
    getBarberos, saveBarberos, getTrabajos, createTrabajo, deleteTrabajo
} from "./handlers/date.Handler"
import { uploadTrabajo } from "./config/cloudinaryTrabajos"
import { handlerInputErrors } from "./middleware"

const router = Router()

router.get("/barberos", getBarberos)
router.post("/barberos", body("barberos").isArray(), handlerInputErrors, saveBarberos)

router.get("/availability/:barber",
    param("barber").notEmpty().trim(), handlerInputErrors, getBarberAvailability)

router.get("/trabajos", getTrabajos)
router.post("/trabajos", uploadTrabajo.single("archivo"), createTrabajo)
router.delete("/trabajos/:id", param("id").isInt(), handlerInputErrors, deleteTrabajo)

router.post("/",
    body("service").notEmpty(),
    body("price").notEmpty().isNumeric().custom(v => parseFloat(v) >= 0),
    body("barber").isString().notEmpty().trim(),
    body("dateList").notEmpty(),
    body("client").notEmpty(),
    body("phone").notEmpty(),
    body("duration").isNumeric().notEmpty(),
    handlerInputErrors, createProduct)

router.get("/:id", param("id").isInt(), handlerInputErrors, getProductById)
router.put("/:id", param("id").isInt(), handlerInputErrors, UpdateProduct)
router.patch("/:id", param("id").isInt(), handlerInputErrors, updateAvailability)
router.delete("/:id", param("id").isInt(), handlerInputErrors, deleteProduct)

export default router