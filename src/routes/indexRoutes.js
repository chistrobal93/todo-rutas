import { Router } from 'express';
import { index, parques, parquesFiltrados, about, loginEmpleados, authEmpleado, downloadMap } from '../controllers/indexController.js';
import { isntLoggedIn } from '../tools/auth.js';
import { ubicacionActual } from '../coords.js';

const router = Router();

// Todas las rutas en la raiz de pagina
router.get('/', index);
router.get('/parques', parques);
//router.post('/parques', parques);
router.post('/parquesFiltrados', parquesFiltrados);
router.get('/about', about);
router.get('/loginEmpleados', isntLoggedIn, loginEmpleados);
router.post('/loginEmpleados', isntLoggedIn, authEmpleado);
router.get('/download/:mapa', downloadMap);

// fetch post guarda coordenadas en archivo coords
router.post('/guardarCoords', (req,res) => {
    var coordenadas = req.body;
    ubicacionActual.long = coordenadas.long;
    ubicacionActual.lat = coordenadas.lat;
    //res.json(coordenadas);
});

export default router;