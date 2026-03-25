import { Router } from "express"
import { body, param } from "express-validator"
import { handlerInputErrors } from "./middleware"
import {
    getDates, createDate, getDateById, UpdateDate,
    updateAppointmentStatus, deleteDate,
    getBarberos, saveBarberos,
    getBarberAvailability,
} from "./handlers/date"
import { getWorks, createWorks, deleteWorks } from "./handlers/works.Handlers"
import { uploadWork } from "./config/cloudinaryWorks"

const router = Router()

// ── Barberos ──────────────────────────────────────────────────
router.get("/barberos", getBarberos)
router.post("/barberos",
    body("barberos").isArray().withMessage("Debe ser un array"),
    handlerInputErrors,
    saveBarberos
)

// ── Availability ──────────────────────────────────────────────
router.get("/availability/:barber",
    param("barber").notEmpty().withMessage("Barbero requerido").trim(),
    handlerInputErrors,
    getBarberAvailability
)

// ── Trabajos ──────────────────────────────────────────────────
router.get("/works", getWorks)
router.post("/works", uploadWork.single("archivo"), createWorks)
router.delete("/works/:id",
    param("id").isInt().withMessage("ID no válido"),
    handlerInputErrors,
    deleteWorks
)

// ── CRUD citas ────────────────────────────────────────────────
router.get("/", getDates)

router.post("/",
    body("service").notEmpty().withMessage("El servicio es requerido"),
    body("price").notEmpty().isNumeric().custom(v => parseFloat(v) >= 0),
    body("barber").isString().notEmpty().trim(),
    body("dateList").notEmpty(),
    body("client").notEmpty(),
    body("phone").notEmpty(),
    body("duration").isNumeric().notEmpty(),
    handlerInputErrors,
    createDate
)

// ── :id SIEMPRE AL FINAL ──────────────────────────────────────
router.get("/:id",    param("id").isInt().withMessage("ID no válido"), handlerInputErrors, getDateById)
router.put("/:id",    param("id").isInt().withMessage("ID no válido"), handlerInputErrors, UpdateDate)
router.patch("/:id",  param("id").isInt().withMessage("ID no válido"), handlerInputErrors, updateAppointmentStatus)
router.delete("/:id", param("id").isInt().withMessage("ID no válido"), handlerInputErrors, deleteDate)

export default router