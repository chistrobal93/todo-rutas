import passport from 'passport';
import logger from '../logger.js';
import { listarParques, buscarParques } from '../models/parqueModel.js';


/**
 * Renderiza vista index
 */
export const index = async (req, res) => {
    res.render('index', {title:'Todo Rutas'});
}

/**
 * Renderiza vista 'sobre nosotros'
 */
export const about = async (req, res) => {
    res.render('about', {title: 'About'});
}

/**
 * Obtiene el listado de parques y renderiza la vista de Lista de parques
 * @returns Vista lista de parques
 */
export const parques = async(req, res) => {
    let listado;
    try {
        listado = await listarParques();
        
        res.render('parques', {title: 'Parques', listado, urlForm: '/parquesFiltrados'});
    } catch (error) {
        logger.error(`No se pudo listar parques: ${error}`);
        listado = [];
        return res.redirect('/');
    }
}

export const parquesFiltrados = async(req, res) => {
    let listado;
    let {nombre, nacional, independiente, orden, lat, long} = req.body;
    nombre = nombre.trim();

    if (lat == 'error' || long == 'error') {
        //Error al obtener ubicacion, no ordenar por cercanía
    }
    
    try {
        let criterios = { nombre, nacional, independiente, orden}
        listado = await buscarParques(criterios);
        res.render('parques', {title: 'Parques', listado, urlForm: '/parquesFiltrados'});
    } catch (error) {
        logger.error(`No se pudo listar parques: ${error}`);
        listado = [];
        return res.redirect('/');
    }
}

/**
 * Renderiza vista login
 */
export const loginEmpleados = async (req, res) => {
    res.render('loginEmpleados', {title: 'Login'});
}

export const authEmpleado = async (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/empleado/',
        failureRedirect: '/loginEmpleados',
        failureFlash: true
    })(req, res, next);
}