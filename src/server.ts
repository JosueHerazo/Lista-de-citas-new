import express from "express"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
<<<<<<< HEAD
import db from "./config/db"
import router from "./router"
import routerNews from "./routerNews"
=======
import router from "./router"
import db from "./config/db"
import routerDates from "./routerDates"
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45

async function connectDB() {
    try {
        await db.authenticate()
<<<<<<< HEAD
        await db.sync({alter: true})
        console.log("Conexion exitosa a la DB")
    } catch (error) {
        console.log("Hubo un error al conectar a la DB")
=======
        db.sync()
        console.log("Conexion exitosa a la DB")
    } catch (error) {
        console.log("Hubo un error al conectar a la DB");
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
    }
}
connectDB()

const server = express()

<<<<<<< HEAD
const whitelist = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_DATE,
    "http://localhost:5173"
]
=======
server.set('etag', false)

const whitelist = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_DATE,
];
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Error de CORS: Origen no permitido"))
        }
    }
}
<<<<<<< HEAD
=======

>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
server.use(cors(corsOptions))
server.use(express.json())
server.use(morgan("dev"))

<<<<<<< HEAD
server.use("/api/news", routerNews)
server.use("/api/date", router)
=======

server.use('/api', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    next()
})
server.use("/api/service", router)
server.use("/api/date",    routerDates)
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45

export default server