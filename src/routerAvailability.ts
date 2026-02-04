// routerAvailability.ts
import { Router } from "express"
import { param } from "express-validator"
import { getBarberAvailability } from "./handlers/date"
import { handlerInputErrors } from "./middleware"

const router = Router()

router.get("/:barber",
    param("barber").isString().trim().notEmpty().withMessage("Nombre de barbero requerido"),
    handlerInputErrors,
    getBarberAvailability
)


export default router