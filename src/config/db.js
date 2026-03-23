"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var db = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
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
exports.default = db;
