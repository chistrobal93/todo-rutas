const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Todo Rutas'});
});

router.get('/login', (req,res) => {
    res.render('login', { title: 'Login'});
});

router.get('/mantenedor', (req,res) => {
    res.render('mantenedor', { title: 'Mantenedor'});
})

router.get('/parques', (req,res) => {
    res.render('parques', { title: 'Parques'});
})

router.get('/about', (req,res) => {
    res.render('about', { title: 'About'});
})

module.exports = router;