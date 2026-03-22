import {Sequelize} from "sequelize-typescript"
import dotenv from "dotenv"
<<<<<<< HEAD



dotenv.config()
 

=======
// import Client from "../models/Clients.models"
// import Service from "../models/Date.models"

dotenv.config()
 
// console.log(process.env.DATABASE_URL);
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
const db = new Sequelize(process.env.DATABASE_URL!, {
    // EL ERROR ESTABA AQUÍ: Los corchetes después de la coma estaban mal puestos
    models: [__dirname + "/../models/**/*.{ts,js}"], 
    logging: false,
<<<<<<< HEAD
    dialect: 'postgres', 
=======
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    }
});
<<<<<<< HEAD
console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY);


=======

// const db = new Sequelize(process.env.
// DATABASE_URL!, {
//     models: [ Date, Client] [__dirname + "/../models/**/*"],
//     logging: false
// })
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45

export default db