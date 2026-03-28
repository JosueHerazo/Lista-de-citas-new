"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTrabajo = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'latinos_vip_trabajos',
        resource_type: 'auto', // acepta imagen Y video
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'webm']
    }
});
exports.uploadTrabajo = (0, multer_1.default)({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB máx para videos
});
//# sourceMappingURL=cloudinaryTrabajos.js.map