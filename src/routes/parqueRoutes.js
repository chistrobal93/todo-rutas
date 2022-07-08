import { Router } from 'express';
import { agregar, guardar, listar, editar, actualizar, cambiarEstado } from '../controllers/parqueController.js';
import { uploadFiles } from '../tools/multerUpload.js';

const router = Router();

// Todas las rutas del Mantenedor de parques( /parque/... )
router.get('/', listar);

router.get('/agregar', agregar);
router.post('/agregar', uploadFiles, guardar);
router.get('/listar', listar);
router.get('/editar/:codParque', editar);
router.post('/editar/:codParque', actualizar);
router.get('/cambiarEstado/:codParque/:codEstado', cambiarEstado);

export default router;