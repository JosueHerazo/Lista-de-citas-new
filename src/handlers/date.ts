
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
        const dateslist = await Datelist.create(req.body)
        res.status(201).json({ data: dateslist })
    } catch (error) {
        console.log(error)
    }
}

// Agrega los demás (deleteProduct, getProductById, etc.) aunque estén vacíos por ahora
export const deleteProduct = async (req: Request, res: Response) => {}
export const getProductById = async (req: Request, res: Response) => {}
export const updateAvailability = async (req: Request, res: Response) => {}
export const UpdateProduct = async (req: Request, res: Response) => {}

// En tu controlador de fechas (Backend)
export const getOccupiedSlots = async (req: Request, res: Response) => {
    try {
        const { barber } = req.query; // Recibimos el nombre del barbero
        
        const dates = await Datelist.findAll({
            where: { barber },
            attributes: ['dateList', 'duration', 'service'] // Solo lo necesario
        });
        
        res.json({ data: dates });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener horarios' });
    }
}