import { Router } from 'express';
import { index, ingresarEmpleado, agregarEmpleado, listar, cambiarEstado } from '../controllers/empleadoController.js';

const router = Router();

// Todas las rutas del Mantenedor de empleados ( /empleado/... )
router.get('/', index);
router.get('/agregar', ingresarEmpleado);
router.post('/agregar', agregarEmpleado);
router.get('/listar', listar);
//router.get('/editar/:codEmpleado', editar);
router.get('/cambiarEstado/:codEmpleado/:codEstado', cambiarEstado);

export default router;