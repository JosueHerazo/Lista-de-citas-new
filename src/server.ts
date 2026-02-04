import express from "express"
import  cors, { CorsOptions  } from "cors"
import morgan from "morgan"
import db from "./config/db"
import routerDates from "./routerDates"
import routerNews from "./routerNews"
import routerAvailability from "./routerAvailability"

async function connectDB() {
    try {
        await db.authenticate()
        await db.sync()
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
    "https://cita-corte.netlify.app"
    // "http://localhost:5173",
    //  "http://localhost:4000"
];

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Error de CORS: Origen no permitido"))
        }
    },
        credentials: true // <-- Agrega esto si necesitas cookies/sesiones
}
server.get('/api/test', (req, res) => {
    res.json({ 
        message: 'API funcionando',
        timestamp: new Date().toISOString(),
        routes: ['/api/date', '/api/availability', '/api/news']
    });
});
// server.get('/api/debug-routes', (req, res) => {
//     const routes = server._router.stack
//         .filter(r => r.route)
//         .map(r => {
//             return {
//                 path: r.route.path,
//                 method: Object.keys(r.route.methods)[0]
//             };
//         });
//     res.json({ routes });
// });
server.use(cors(corsOptions))
server.use(express.json())
server.use(morgan("dev"))
server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

server.use("/api/date", routerDates)
server.use("/api/availability", routerAvailability) // Nueva ruta
server.use("/api/news", routerNews)
server.get('/api/availability/:barber', (req, res) => {
    const { barber } = req.params;
    console.log(`📡 Ruta de disponibilidad llamada para: ${barber}`);
    res.json({ 
        success: true, 
        message: `Disponibilidad para ${barber}`,
        test: true,
        data: []
    });
});
export default server