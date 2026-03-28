"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.uploadWork = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Storage para trabajos
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        const isVideo = file.mimetype.startsWith('video/');
        return {
            folder: 'trabajos',
            resource_type: isVideo ? 'video' : 'image',
            allowed_formats: isVideo ? ['mp4', 'mov', 'avi'] : ['jpg', 'jpeg', 'png', 'webp']
        };
    }
});
exports.uploadWork = (0, multer_1.default)({ storage: storage });
//# sourceMappingURL=cloudinary.js.map