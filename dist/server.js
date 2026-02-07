"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./config/db"));
const routerDates_1 = __importDefault(require("./routerDates"));
const routerNews_1 = __importDefault(require("./routerNews"));
const routerAvailability_1 = __importDefault(require("./routerAvailability"));
async function connectDB() {
    try {
        await db_1.default.authenticate();
        await db_1.default.sync();
        console.log("Conexion exitosa a la DB");
    }
    catch (error) {
        console.log("Hubo un error al conectar a la DB");
    }
}
connectDB();
const server = (0, express_1.default)();
// Configuración de CORS Robusta
const whitelist = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_DATE,
    "https://cita-corte.netlify.app"
    // "http://localhost:5173",
    //  "http://localhost:4000"
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Error de CORS: Origen no permitido"));
        }
    },
    credentials: true // <-- Agrega esto si necesitas cookies/sesiones
};
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
server.use((0, cors_1.default)(corsOptions));
server.use(express_1.default.json());
server.use((0, morgan_1.default)("dev"));
server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
server.use("/api/date", routerDates_1.default);
server.use("/api/availability", routerAvailability_1.default); // Nueva ruta
server.use("/api/news", routerNews_1.default);
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
exports.default = server;
//# sourceMappingURL=server.js.map