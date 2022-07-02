import { Router } from 'express';
import { index, agregar, guardar, listar, cambiarEstado, logout } from '../controllers/empleadoController.js';

const router = Router();

// Todas las rutas del Mantenedor de empleados ( /empleado/... )
router.get('/', index);
router.get('/agregar', agregar);
router.post('/agregar', guardar);
router.get('/listar', listar);
//router.get('/editar/:codEmpleado', editar);
router.get('/cambiarEstado/:codEmpleado/:codEstado', cambiarEstado);
router.get('/logout', logout);

export default router;