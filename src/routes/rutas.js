const express = require('express');
const router = express.Router();
const parquesController = require('../controllers/parquesController');

router.get('/', (req, res) => {
    res.render('index', { title: 'Todo Rutas'});
});

router.get('/login', (req,res) => {
    res.render('login', { title: 'Login'});
});

router.get('/parques', (req,res) => {
    res.render('parques', { title: 'Parques'});
});

router.get('/about', (req,res) => {
    res.render('about', { title: 'About'});
});

module.exports = router;