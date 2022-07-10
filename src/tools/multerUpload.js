import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import logger from '../logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

const uploadImgMap = multer({
    storage,
    limits: { fileSize: 4000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        }
        cb("Error: Archivo debe ser una imagen jpg, jpeg o png");
    }
}).fields([{name:'img'},{name:'mapa'}]);

export const uploadFiles = (req, res, next) => {
    uploadImgMap(req, res, (err) => {
        if (err) {
            logger.error('Error al subir archivos: '+err.message);
            req.flash('messageError', `Error al subir archivo parque: ${err.message}`);
            return res.redirect('back');
        }
        next();
    })
}