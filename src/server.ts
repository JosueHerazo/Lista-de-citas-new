import express from "express"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import db from "./config/db"
import routerDates from "./routerDates"
import routerNews from "./routerNews"

async function connectDB() {
    try {
        await db.authenticate()
        await db.sync()
        console.log("Conexion exitosa a la DB")
    } catch (error) {
        console.log("Hubo un error al conectar a la DB")
    }
}
connectDB()

const server = express()

const whitelist = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_DATE,
    
]

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Error de CORS: Origen no permitido"))
        }
    },
    credentials: true,   // si usas cookies o localStorage con auth
}
server.use(cors(corsOptions))
server.use(express.json({ limit: '50mb' }))
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(morgan("dev"))

server.use("/api/news", routerNews)
server.use("/api/date", routerDates)

export default server