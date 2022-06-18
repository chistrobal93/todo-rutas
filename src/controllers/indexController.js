const logger = require('../logger');
const parquesModel = require('../models/parquesModel');

class controller {

    /**
     * Renderiza vista index
     */
    async index(req, res) {
        res.render('index', {title:'Todo Rutas'});
    }

    /**
     * Renderiza vista 'sobre nosotros'
     */
    async about(req, res) {
        res.render('about', {title: 'About'});
    }

    /**
     * Obtiene el listado de parques y renderiza la vista de Lista de parques
     * @returns Vista lista de parques
     */
    async parques(req, res) {
        let listado;
        try {
            listado = await parquesModel.listarParques();
            
            res.render('parques', {title: 'Parques', listado});
        } catch (error) {
            logger.error(`No se pudo listar parques: ${error}`);
            listado = [];
            return res.redirect('/');
        }
    }

    /**
     * Renderiza vista login
     */
    async login(req, res) {
        res.render('login', {title: 'Login'});
    }

}

module.exports = new controller();