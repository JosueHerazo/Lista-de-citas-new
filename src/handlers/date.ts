
import {Request, Response} from "express"
import Datelist from "../models/DateList.models"


export const getProducts = async (req: Request, res: Response) => {
    try {
        const dateslist = await Datelist.findAll({
            order: [
                ["createdAt", "DESC"]
            ],
            attributes: {exclude: ["updatedAt", ]}, 
            
        })
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
// En tu controlador de Express (Sugerencia)
export const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const appointment = await Datelist.findByPk(id);
    if (appointment) {
        // IMPORTANTE: Cambia el booleano que uses para filtrar
        appointment.isPaid = true; 
        await appointment.save();
        res.json({ data: appointment });
    }
}
export const UpdateProduct = async (req: Request, res: Response) => {}