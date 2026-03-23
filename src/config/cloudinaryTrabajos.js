"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTrabajo = void 0;
var cloudinary_1 = require("cloudinary");
var multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
var multer_1 = require("multer");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
var storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'latinos_vip_trabajos',
        resource_type: 'auto', // acepta imagen Y video
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'webm']
    }
});
exports.uploadTrabajo = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB máx para videos
});
