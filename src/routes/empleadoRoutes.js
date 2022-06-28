import { Router } from 'express';
import { ingresarEmpleado, agregarEmpleado } from '../controllers/empleadoController.js';

const router = Router();

// Todas las rutas del Mantenedor de empleados ( /empleado/... )
router.get('/', ingresarEmpleado);
router.get('/agregar', ingresarEmpleado);
router.post('/agregar', agregarEmpleado);
//router.get('/listar', listar);
//router.get('/editar/:codEmpleado', editar);
//router.get('/eliminar/:codEmpleado', eliminar);

export default router;