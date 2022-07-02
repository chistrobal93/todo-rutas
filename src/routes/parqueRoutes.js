import { Router } from 'express';
import { agregar, guardar, listar, editar, cambiarEstado } from '../controllers/parqueController.js';

const router = Router();

// Todas las rutas del Mantenedor de parques( /parque/... )
router.get('/', listar);

router.get('/agregar', agregar);
router.post('/agregar', guardar);
router.get('/listar', listar);
router.get('/editar/:codParque', editar);
router.get('/cambiarEstado/:codParque/:codEstado', cambiarEstado);

export default router;