import { Router } from 'express';
import { mantenedorIndex, agregar, guardar, listar, editar, eliminar } from '../controllers/parquesController.js';

const router = Router();

// Todas las rutas del Mantenedor de parques ( /mantenedor/... )
router.get('/', mantenedorIndex);
router.get('/agregar', agregar);
router.post('/agregar', guardar);
router.get('/listar', listar);
router.get('/editar/:codParque', editar);
router.get('/eliminar/:codParque', eliminar);

export default router;