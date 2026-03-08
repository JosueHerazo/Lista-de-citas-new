import { Request, Response } from 'express'
import Client from '../models/Clients.models'
import Datelist from '../models/Datelist.models'
import { validationResult } from 'express-validator/lib'

export const getProducts = async (req: Request, res: Response) => {

    try {
        const ListDate = await Datelist.findAll({
            order: [
                ["createdAt", "DESC"]
            ],
            attributes: {exclude: ["updatedAt", ]}, 
            include: [Client]
        })
        
        res.json({data:ListDate})
    } catch (error) {
        console.log(error);
        
    }

}

export const createProduct = async  (req: Request, res: Response) =>{
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


export const getProductById = async (req:Request, res: Response) => {
    try {
        const {id} = req.params
        const ListDate = await Datelist.findByPk(id)
       
        if(!ListDate) {
            return res.status(404).json({
                error: "Producto No Encontrado"
            })
        }
        // siempre hay que responder la data 
        res.json({data: ListDate})
    } catch (error) {
        console.log(error);
        
    }
    
}


export const UpdateProduct = async (req:Request, res:Response) => {
       try {
        // primero se busca el ID del producto o el mismo producto
        const {id} = req.params
        const ListDate = await Datelist.findByPk(id)
    if(!ListDate) {
        return res.status(404).json({
            error: "Producto No Encontrado"
        })
        //Actulizar
    }
    await ListDate.update(req.body)
    await ListDate.save()
        res.json({data: ListDate})


    } catch (error) {
        console.log(error);
        
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const ListDate = await Datelist.findByPk(id)
        if (!ListDate) {
            return res.status(404).json({ error: "Producto No Encontrado" })
        }
        // ✅ FIX: invertir isPaid
        await ListDate.update({ isPaid: !ListDate.dataValues.isPaid })
        res.json({ data: ListDate })
    } catch (error) {
        console.log(error)
    }
}


export const deleteProduct = async (req: Request, res: Response) => {

     try {
        const {id} = req.params
        const ListDate = await Datelist.findByPk(id)
        
        if(!ListDate) {
            return res.status(404).json({
                error: "Producto No Encontrado"
            })
        }
        await ListDate.destroy()
        // siempre hay que responder la data 
        res.json({data: "Product Eliminado"})
    } catch (error) {
        console.log(error);
        
    }

}
export const getBarberAvailability = async (req: Request, res: Response) => {
    try {
        const { barber } = req.params;
        console.log("📩 Barbero:", barber);

        const appointments = await Datelist.findAll({
            where: { barber },  // ✅ Sin filtro isPaid por ahora
            attributes: ['dateList']
        });

        const busySlots = appointments.map(app => app.dateList);
        console.log("🔴 Slots ocupados:", busySlots);
        res.json({ data: busySlots });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}




// // // export const getProduct = async (req: Request, res:Response) =>{
// // //     const products = Product.findAll(req.body)
// // //     res.json(products)
    

// // //     res.json("Desde GET products")
// // // 

// src/handlers/date.ts