import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import logger from '../logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Constante que asigna ruta donde subir archivos y método para asignar el nombre
 */
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

/**
 * Función que utiliza 'storage', y define límites de tamaño y formato del archivo.
 * Indica que son dos archivos que debe subir, uno rescatado de algún campo llamado
 * 'img' y otro campo llamado 'mapa'
 */
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

/**
 * Función que sube los archivos definidos en 'uploadImgMap' al servidor
 * @param {Object} req Requerimiento de subir archivos
 * @param {Object} res Respuesta de subir archivos
 * @param {NextFunction} next Función que permite avanzar a siguiente middleware
 */
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