import { Router } from "express"
import { body, param } from "express-validator"
import {
<<<<<<< HEAD
    createProduct, deleteProduct, getBarberAvailability,
    getProductById, getProducts, updateAvailability, UpdateProduct,
    getBarberos, saveBarberos, getTrabajos, createTrabajo, deleteTrabajo
} from "./handlers/date.Handler"
import { uploadTrabajo } from "./config/cloudinaryTrabajos"
=======
    archivarSemana,
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateAvailability,
    UpdateProduct,
    markAsPaid          // ← AÑADIR IMPORT
} from "./handlers/service"
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
import { handlerInputErrors } from "./middleware"

const router = Router()

<<<<<<< HEAD
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
=======
router.get("/", getProducts)

router.post("/",
    body("service").notEmpty().withMessage("El nombre del servicio no puede ir vacio"),
    body("price")
        .notEmpty().withMessage("El valor del producto no puede ir vacio")
        .isNumeric().withMessage("El precio debe ser un número")
        .custom(value => parseFloat(value) >= 0).withMessage("Precio no valido"),
    body("barber").isString().notEmpty().withMessage("El nombre del barbero no puede ir vacio").trim(),
    body("client").notEmpty().withMessage("el nombre no puede ir vacio"),
    body("phone").notEmpty().withMessage("El telefono no puede ir vacio"),
    handlerInputErrors,
    createProduct
)

// ✅ FIX: era '/api/cierres' — como este router se monta en /api/service,
//    la ruta real sería /api/service/api/cierres (incorrecto).
//    Se corrige a '/cierres' → queda /api/service/cierres
//    O mejor aún, muévela a server.ts directamente (ver nota abajo)
router.post('/cierres', archivarSemana)

// ✅ NUEVA RUTA: marcar servicio como pagado
router.patch("/:id/pay",
    param("id").isInt().withMessage("ID no valido"),
    handlerInputErrors,
    markAsPaid
)

router.get("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handlerInputErrors,
    getProductById
)

router.put("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handlerInputErrors,
    UpdateProduct
)

router.patch("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handlerInputErrors,
    updateAvailability
)

router.delete("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handlerInputErrors,
    deleteProduct
)
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45

export default router