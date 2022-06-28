import { Router } from 'express';
import { parqueIndex, agregar, guardar, listar, editar, eliminar } from '../controllers/parqueController.js';

const router = Router();

// Todas las rutas del Mantenedor de parques( /parque/... )
router.get('/', parqueIndex);

router.get('/agregar', agregar);
router.post('/agregar', guardar);
router.get('/listar', listar);
router.get('/editar/:codParque', editar);
router.get('/eliminar/:codParque', eliminar);

export default router;