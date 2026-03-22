import {Sequelize} from "sequelize-typescript"
import dotenv from "dotenv"



dotenv.config()
 

const db = new Sequelize(process.env.DATABASE_URL!, {
    // EL ERROR ESTABA AQUÍ: Los corchetes después de la coma estaban mal puestos
    models: [__dirname + "/../models/**/*.{ts,js}"], 
    logging: false,
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    }
});
console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY);



export default db