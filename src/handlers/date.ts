// src/handlers/date.ts
import { Request, Response } from "express";
import { Op } from "sequelize";
import Client from "../models/Clients.models";
import DateList from "../models/DateList.models";
import Trabajo from "../models/Trabajo.models";
import { cloudinary } from "../config/cloudinaryWorks";   // ← Ruta corregida

// ====================== CITAS ======================
export const getDates = async (req: Request, res: Response) => {
    try {
        const service = await DateList.findAll({
            where: {
                service: { [Op.notIn]: ['__barberos__'] }
            },
            order: [["createdAt", "DESC"]],
            attributes: { exclude: ["updatedAt"] },
            include: [Client]
        });
        res.json({ data: service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las citas" });
    }
};

export const createDate = async (req: Request, res: Response) => {
    try {
        const service = await DateList.create(req.body);
        res.json({ data: service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la cita" });
    }
};

export const getDateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await DateList.findByPk(id);
        if (!service) return res.status(404).json({ error: "Cita no encontrada" });
        res.json({ data: service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno" });
    }
};

export const UpdateDate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await DateList.findByPk(id);
        if (!service) return res.status(404).json({ error: "Cita no encontrada" });
        await service.update(req.body);
        res.json({ data: service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar" });
    }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await DateList.findByPk(id);
        if (!service) return res.status(404).json({ error: "Cita no encontrada" });
        service.isPaid = !service.isPaid;
        await service.save();
        res.json({ data: service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar estado" });
    }
};

export const deleteDate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await DateList.findByPk(id);
        if (!service) return res.status(404).json({ error: "Cita no encontrada" });
        await service.destroy();
        res.json({ data: "Cita eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar" });
    }
};

// ====================== BARBEROS (Sistema antiguo - JSON) ======================
export const getBarberos = async (req: Request, res: Response) => {
    try {
        const config = await DateList.findOne({
            where: { service: '__barberos__' }
        });

        if (!config) {
            return res.json({ 
                data: [
                    { id: "josue", nombre: "Josue", foto: "" },
                    { id: "vato",  nombre: "Vato",  foto: "" },
                    { id: "stiven", nombre: "Stiven", foto: "" },
                    { id: "will",  nombre: "Will",  foto: "" }
                ] 
            });
        }

        const barberos = JSON.parse(config.dataValues.client || "[]");
        res.json({ data: barberos });
    } catch (error) {
        console.error("Error getBarberos:", error);
        res.status(500).json({ error: "Error al obtener barberos" });
    }
};

export const addBarberoSentinel = async (req: Request, res: Response) => {
    try {
        const { nombre, foto } = req.body
        const config = await DateList.findOne({ where: { service: '__barberos__' } })
        
        let barberos = []
        if (config) {
            barberos = JSON.parse(config.dataValues.client || "[]")
        }
        
        const id = Date.now().toString()
        barberos.push({ id, nombre: nombre.trim(), foto: foto || "" })
        const json = JSON.stringify(barberos)
        
        if (config) {
            await config.update({ client: json })
        } else {
            await DateList.create({
                service: '__barberos__', price: 0, barber: '__config__',
                dateList: new Date().toISOString(), client: json,
                phone: '__config__', duration: 0
            })
        }
        
        res.status(201).json({ data: { id, nombre: nombre.trim(), foto: foto || "" } })
    } catch (error) {
        res.status(500).json({ error: "Error al agregar barbero" })
    }
}

export const getBarberAvailability = async (req: Request, res: Response) => {
    try {
        const { barber } = req.params

        const appointments = await DateList.findAll({
            where: {
                barber: { [Op.iLike]: `%${barber.trim()}%` }
            },
            attributes: ['dateList']
        })

        const busySlots = appointments.map(app => ({
            dateList: app.dataValues.dateList,
            duration: 30
        }))

        res.json({ data: busySlots })
    } catch (error) {
        console.error("❌ Error en getBarberAvailability:", error)
        res.status(500).json({ error: "Error en el servidor" })
    }
}

export const saveBarberos = async (req: Request, res: Response) => {
    try {
        const { barberos } = req.body;
        if (!Array.isArray(barberos)) {
            return res.status(400).json({ error: "barberos debe ser un array" });
        }

        const json = JSON.stringify(barberos);

        const existing = await DateList.findOne({
            where: { service: '__barberos__' }
        });

        if (existing) {
            await existing.update({ client: json });
        } else {
            await DateList.create({
                service: '__barberos__',
                price: 0,
                barber: '__config__',
                dateList: new Date().toISOString(),
                client: json,
                phone: '__config__',
                duration: 0
            });
        }
        res.json({ data: barberos });
    } catch (error) {
        console.error("Error saveBarberos:", error);
        res.status(500).json({ error: "Error al guardar barberos" });
    }
};

// ====================== TRABAJOS (Cloudinary) =

export const createWorks = async (req: Request, res: Response) => {
    try {
        const { titulo, descripcion, categoria, barbero, imagen } = req.body
        
        if (!imagen) return res.status(400).json({ error: "No se recibió imagen" })
        if (!titulo)  return res.status(400).json({ error: "Título obligatorio" })

        const trabajo = await Trabajo.create({
            titulo,
            descripcion: descripcion || "",
            categoria:   categoria   || "Cortes",
            tipo:        "image",
            url:         imagen,   // base64 directo
            publicId:    null,
            barbero:     barbero   || ""
        })

        res.json({ data: trabajo })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error al crear trabajo" })
    }
}

export const getWorks = async (req: Request, res: Response) => {
    try {
        const trabajos = await Trabajo.findAll({
            order: [["createdAt", "DESC"]]
        });
        res.json({ data: trabajos });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener trabajos" });
    }
};

export const deleteWorks = async (req: Request, res: Response) => {
    try {
        const trabajo = await Trabajo.findByPk(req.params.id);
        if (!trabajo) return res.status(404).json({ error: "No encontrado" });

        if (trabajo.publicId) {
            await cloudinary.uploader.destroy(trabajo.publicId, {
                resource_type: trabajo.tipo === "video" ? "video" : "image"
            });
        }

        await trabajo.destroy();
        res.json({ data: "Eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};