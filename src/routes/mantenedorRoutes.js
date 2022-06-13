const express = require('express');
const router = express.Router();
const parquesController = require('../controllers/parquesController');

// Mantenedor parques ( /mantenedor/... )
router.get('/', parquesController.mantenedorIndex);
router.get('/agregar', parquesController.agregar);

module.exports = router;