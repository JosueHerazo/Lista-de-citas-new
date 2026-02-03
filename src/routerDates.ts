import { Router } from "express"
import { body, param} from "express-validator"
import { createProduct, deleteProduct, getBarberAvailability, getProductById, getProducts, updateAvailability, UpdateProduct } from "./handlers/date"
import { handlerInputErrors } from "./middleware"

const router = Router()

//  Routing
// Obtener todas las citas (para el admin)
router.get("/",
    getProducts
)
// Crear una cita nueva
router.post("/",
    //validacion
    //  body("service").notEmpty().withMessage("El nombre del servicio no puede ir vacio"),
    //  body("price").isNumeric().withMessage("Valor no valido").notEmpty().withMessage("El valor del producto no ir vacio").custom(value => value > 0).withMessage("Precio no valido"),
    //  handlerInputErrors,
    //  body("barber").notEmpty().withMessage("El nombre del barbero no puede ir vacio"),
    //  body("dateList").notEmpty().withMessage("La fecha no puede ir vacio"),
    //  body("client").notEmpty().withMessage("el nombre no puede ir vacio"),
    //  body("phone").notEmpty().withMessage("El telefono no puede ir vacio"),
    createProduct
)
router.get("/:barber",
    param("barber").trim().notEmpty().withMessage("Nombre de barbero requerido"),
    handlerInputErrors,
    getBarberAvailability
)
router.get("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handlerInputErrors,
    getProductById)
// PUT SI ENVIAS UNA PARTE LAS DEMAS PARTES DEL OBJETO SE ENVIAN VACIAS 
router.put("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    handlerInputErrors,
    UpdateProduct)
// CON PATCH SE PUEDE MODIFICAR PARTES DEL OBJETO SIN QUE MODIFIQUE LAS DEMAS PARTES DEL OBJETO

// con patch se envie la disponibilidad del product solo se toma del dataValue pel producto para motificar el boolean de true a false
router.patch("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handlerInputErrors,
    updateAvailability)

router.delete("/:id",  
    param("id").isInt().withMessage("ID no valido"),
    handlerInputErrors, 
    deleteProduct
    
)
// routerDates.ts
router.get("/:id", getProductById);



 export default router