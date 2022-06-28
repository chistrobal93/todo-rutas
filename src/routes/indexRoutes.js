import { Router } from 'express';
import { index, parques, about } from '../controllers/indexController.js';

const router = Router();

// Todas las rutas en la raiz de pagina
router.get('/', index);
router.get('/parques', parques);
router.get('/about', about);

export default router;