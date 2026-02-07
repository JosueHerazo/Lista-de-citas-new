import { Request, Response } from "express"
import Datelist from "../models/DateList.models"

// Obtener una cita por ID (Para el loader de edición)
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const appointment = await Datelist.findByPk(id)
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' })
        }
        res.json({ data: appointment })
    } catch (error) {
        console.log(error)
    }
}

// Editar la cita completa (Para el componente EditDate)
export const UpdateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const appointment = await Datelist.findByPk(id)
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' })
        }
        
        // Actualiza con los datos del body
        await appointment.update(req.body)
        res.json({ data: appointment })
    } catch (error) {
        console.log(error)
    }
}

// Cambiar solo el estado (Para cuando registras el cobro)
export const updateAppointmentStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const appointment = await Datelist.findByPk(id)
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' })
        }
        
        appointment.isPaid = !appointment.dataValues.isPaid // Invierte el estado
        await appointment.save()
        res.json({ data: appointment })
    } catch (error) {
        console.log(error)
    }
}

// Eliminar cita
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const appointment = await Datelist.findByPk(id)
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' })
        }
        await appointment.destroy()
        res.json({ data: 'Cita eliminada' })
    } catch (error) {
        console.log(error)
    }
}