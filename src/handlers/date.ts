
import {Request, Response} from "express"
import Datelist from "../models/Datelist.models"


export const getProducts = async (req: Request, res: Response) => {
    try {
        const dateslist = await Datelist.findAll()
        res.json({ data: dateslist })
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        console.log("Body recibido en POST /api/date:", req.body);
  console.log("Campos faltantes o inválidos según validator:", req.validationErrors?.() || "sin errores de validación");
        const dateslist = await Datelist.create(req.body)
        res.status(201).json({ data: dateslist })
    } catch (error) {
        console.log(error)
    }
}

export const getBarberAvailability = async (req: Request, res: Response) => {
    try {
        // el handeler es el que hace la magia con el param de barber y busca todas las citas donde el barber y toma la lista de citas
        const { barber } = req.params;  
        // Buscamos todas las citas de ese barbero
        const appointment = await Datelist.findAll({
            where: { barber },
            attributes: ['dateList'] // Solo nos interesa la fecha
        });   
        // Respondemos con el array de fechas
        res.json({ data: appointment })
           if (!barber) {
            return res.status(400).json({ error: "Debe especificar un barbero" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}; 
export const createAppointment= async (req: Request, res: Response) => {
    try {
        const appointment = await Datelist.create(req.body);
        res.status(201).json({ data: appointment });
    } catch (error) {
        res.status(400).json({ error: "Error al crear la cita" });
    }
}
// Agrega los demás (deleteProduct, getProductById, etc.) aunque estén vacíos por ahora
export const deleteProduct = async (req: Request, res: Response) => {}
export const getProductById = async (req: Request, res: Response) => {}
export const updateAvailability = async (req: Request, res: Response) => {}
export const UpdateProduct = async (req: Request, res: Response) => {}
