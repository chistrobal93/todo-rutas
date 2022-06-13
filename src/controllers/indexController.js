const logger = require('../logger');

class controller {

    async index(req, res) {
        res.render('index', {title:'Todo Rutas'});
    }

    async about(req, res) {
        res.render('about', {title: 'About'});
    }

    async parques(req, res) {
        res.render('parques', {title: 'Parques'});
    }

    async login(req, res) {
        res.render('login', {title: 'Login'});
    }
}

module.exports = new controller();