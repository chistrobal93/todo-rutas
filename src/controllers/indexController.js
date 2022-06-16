const logger = require('../logger');
const parquesModel = require('../models/parquesModel');

class controller {

    async index(req, res) {
        res.render('index', {title:'Todo Rutas'});
    }

    async about(req, res) {
        res.render('about', {title: 'About'});
    }

    async parques(req, res) {
        try {
            let listado = await parquesModel.listarParques();
            
            res.render('parques', {title: 'Parques', listado});
        } catch (error) {
            logger.error(`No se pudo listar parques: ${error}`);
            listado = [];
            return res.redirect('/');
        }
    }

    async login(req, res) {
        res.render('login', {title: 'Login'});
    }
}

module.exports = new controller();