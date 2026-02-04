import express from "express"
import  cors, { CorsOptions  } from "cors"
import morgan from "morgan"
import db from "./config/db"
import routerDates from "./routerDates"
import routerNews from "./routerNews"

async function connectDB() {
    try {
        await db.authenticate()
        await db.sync({force: true})
        console.log("Conexion exitosa a la DB")
    } catch (error) {
        console.log("Hubo un error al conectar a la DB");
    }
}
connectDB()

const server = express()

// Configuración de CORS Robusta
const whitelist = [
    process.env.FRONTEND_URL,   
    process.env.FRONTEND_URL_DATE,
];

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Error de CORS: Origen no permitido"))
        }
    }
}
server.use(cors(corsOptions))
server.use(express.json())
server.use(morgan("dev"))

server.use("/api/date", routerDates)
server.use("/api/news", routerNews)
export default server