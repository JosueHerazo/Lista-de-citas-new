import {Sequelize} from "sequelize-typescript"
import dotenv from "dotenv"


import Datelist from "../models/Datelist.models"
import Client from "../models/Clients.models";
dotenv.config()
 

const db = new Sequelize(process.env.DATABASE_URL!, {
    // EL ERROR ESTABA AQUÍ: Los corchetes después de la coma estaban mal puestos
    models: [Datelist, Client], 
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    }
});



export default db