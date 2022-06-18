const express = require('express');
const router = express.Router();
const parquesController = require('../controllers/parquesController');

// Todas las rutas del Mantenedor de parques ( /mantenedor/... )
router.get('/', parquesController.mantenedorIndex);
router.get('/agregar', parquesController.agregar);
router.post('/agregar', parquesController.guardar);
router.get('/listar', parquesController.listar);
router.get('/editar/:codParque', parquesController.editar);
router.get('/eliminar/:codParque', parquesController.eliminar);

module.exports = router;