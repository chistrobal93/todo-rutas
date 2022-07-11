import { Router } from 'express';
import { index, parques, parquesFiltrados, about, loginEmpleados, authEmpleado, downloadMap, loginAfiliados } from '../controllers/indexController.js';
import { isntLoggedIn } from '../tools/auth.js';

const router = Router();

// Todas las rutas en la raiz de pagina
router.get('/', index);
router.get('/parques', parques);
router.post('/parques', parquesFiltrados);
router.get('/about', about);
router.get('/loginEmpleados', isntLoggedIn, loginEmpleados);
router.post('/loginEmpleados', isntLoggedIn, authEmpleado);
router.get('/loginAfiliados', isntLoggedIn, loginAfiliados);
router.get('/download/:mapa', downloadMap);

export default router;