"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
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
        folder: 'latinos_vip_noticias',
        resource_type: 'auto',
        // @ts-ignore --- Esto silencia el error de TypeScript si persiste
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
