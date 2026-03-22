"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const db = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
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
exports.default = db;
//# sourceMappingURL=db.js.map