import passport from 'passport';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import logger from '../logger.js';
import { listarParques, buscarParques, listarParquesUbicacion } from '../models/parqueModel.js';
import { ubicacionActual } from '../coords.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    // Si no se ha obtenido la ubicacion
    if (Object.keys(ubicacionActual).length === 0) {
        try {
            listado = await listarParques();
            
            res.render('parques', {title: 'Parques', listado, urlForm: '/parquesFiltrados'});
        } catch (error) {
            logger.error(`No se pudo listar parques: ${error.message}`);
            listado = [];
            return res.redirect('/');
        }
    } else {
        try {
            listado = await listarParquesUbicacion(ubicacionActual);
            
            res.render('parques', {title: 'Parques', listado, urlForm: '/parquesFiltrados'});
        } catch (error) {
            logger.error(`No se pudo listar parques: ${error.message}`);
            listado = [];
            return res.redirect('/');
        }
    }
}

export const parquesFiltrados = async(req, res) => {
    let listado;
    let {nombre, nacional, independiente, orden, long, lat} = req.body;
    nombre = nombre.trim();
    let criterios = { nombre, nacional, independiente, orden}

    if (long == 'error' || lat == 'error') {
        // No ordena por cercania
        try {
            listado = await buscarParques(criterios);
            res.render('parques', {title: 'Parques', listado, urlForm: '/parquesFiltrados'});
        } catch (error) {
            logger.error(`No se pudo listar parques: ${error.message}`);
            listado = [];
            return res.redirect('/');
        }
    } else { // Ordena por distancia
        try {
            criterios.long;
            criterios.lat;
            listado = await buscarParques(criterios);
            res.render('parques', {title: 'Parques', listado, urlForm: '/parquesFiltrados'});
        } catch (error) {
            logger.error(`No se pudo listar parques: ${error.message}`);
            listado = [];
            return res.redirect('/');
        }
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

export const downloadMap =  (req, res) => {
    const imgMapa = req.params.mapa;
    const directory = path.join(__dirname, '../public/images', imgMapa);
    res.download(directory);
}