const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Todas las rutas en la raiz de pagina
router.get('/', indexController.index);
router.get('/login', indexController.login);
router.get('/parques', indexController.parques);
router.get('/about', indexController.about);

module.exports = router;