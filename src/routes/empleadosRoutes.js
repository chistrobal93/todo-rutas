import { Router } from 'express';
import { empleadosIndex, login, agregar, guardar, listar, editar, eliminar } from '../controllers/empleadosController.js';

const router = Router();

// Todas las rutas del Mantenedor de parques para empleados( /empleados/... )
router.get('/', empleadosIndex);
router.get('/login', login);
router.get('/agregar', agregar);
router.post('/agregar', guardar);
router.get('/listar', listar);
router.get('/editar/:codParque', editar);
router.get('/eliminar/:codParque', eliminar);

export default router;