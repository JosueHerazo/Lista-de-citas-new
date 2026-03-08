import { Request, Response } from "express"
import Datelist from "../models/DateList.models"
import Client from "../models/Clients.models"

export const getDates = async (req: Request, res: Response) => {
    try {
        const service = await Datelist.findAll({
            order: [["createdAt", "DESC"]],
            attributes: { exclude: ["updatedAt"] },
            include: [Client]
        })
        res.json({ data: service })
    } catch (error) {
        console.log(error)
    }
}

export const createDate = async (req: Request, res: Response) => {
    try {
        const service = await Datelist.create(req.body)
        res.json({ data: service })
    } catch (error) {
        console.log(error)
    }
}

export const getDateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const appointment = await Datelist.findByPk(id)
        if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' })
        res.json({ data: appointment })
    } catch (error) {
        console.log(error)
    }
}

export const UpdateDate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const appointment = await Datelist.findByPk(id)
        if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' })
        await appointment.update(req.body)
        res.json({ data: appointment })
    } catch (error) {
        console.log(error)
    }
}

// ✅ FIX: update() en vez de asignación directa
export const updateAppointmentStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const appointment = await Datelist.findByPk(id)
        if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' })
        await appointment.update({ isPaid: !appointment.dataValues.isPaid })
        res.json({ data: appointment })
    } catch (error) {
        console.log(error)
    }
}

// ✅ FIX: destroy() funcionaba pero revisado y limpio
export const deleteDate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const appointment = await Datelist.findByPk(id)
        if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' })
        await appointment.destroy()
        res.json({ data: 'Cita eliminada' })
    } catch (error) {
        console.log(error)
    }
}
