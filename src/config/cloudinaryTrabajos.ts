import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder:        'latinos_vip_trabajos',
        resource_type: 'auto',   // acepta imagen Y video
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'webm']
    } as any
})

export const uploadTrabajo = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }  // 100MB máx para videos
})