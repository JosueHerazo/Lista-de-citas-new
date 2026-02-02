
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

export const getOccupiedSlots = async (req: Request, res: Response) => {
    try {
        const { barber } = req.params;     
           if (!barber) {
            return res.status(400).json({ error: "Debe especificar un barbero" });
        }

        const appointments = await Datelist.findAll({
            where: { barber: barber },
            attributes: ['dateList'] 
        });

        // Enviamos un array simple de strings/fechas: ["2026-02-01T10:00...", ...]
       res.json({ data: appointments });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};