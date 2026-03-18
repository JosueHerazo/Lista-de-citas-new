import { Router } from "express"
import { body, param } from "express-validator"
import {
    archivarSemana,
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateAvailability,
    UpdateProduct,
    markAsPaid          // ← AÑADIR IMPORT
} from "./handlers/service"
import { handlerInputErrors } from "./middleware"

const router = Router()

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

export default router