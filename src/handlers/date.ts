
import {Request, Response} from "express"
import Datelist from "../models/Datelist.models"
import { validationResult } from "express-validator/lib"


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
        // Esto te dirá EXACTAMENTE qué campo está fallando
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("❌ Errores de validación:", errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("✅ Body recibido correctamente:", req.body);
        const dateslist = await Datelist.create(req.body)
        res.status(201).json({ 
            message: "Cita creada correctamente",
            data: dateslist })
    } catch (error) {
        console.log("🔥 Error en el servidor:", error);
        res.status(500).json({ error: "Error interno" });    }
}

export const getBarberAvailability = async (req: Request, res: Response) => {
    
    try {
        const { barber} = req.params;  
        console.log("📩 Petición recibida para barbero:", req.params.barber);
        const appointment = await Datelist.findAll({
            where: { barber },     
            attributes: ['dateList']
        });   
        const busySlots = appointment.map(app => app.dateList);
        // Respondemos con el array de fechas
        res.json({ data: busySlots })
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Agrega los demás (deleteProduct, getProductById, etc.) aunque estén vacíos por ahora
export const deleteProduct = async (req: Request, res: Response) => {}
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  // Usar id, no barber
        const appointment = await Datelist.findByPk(id);
        
        if (!appointment) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }
        
        res.json({ data: appointment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error del servidor" });
    }
}
export const updateAvailability = async (req: Request, res: Response) => {}
export const UpdateProduct = async (req: Request, res: Response) => {}
