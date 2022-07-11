import passport from 'passport';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { listarParques, buscarParques } from '../models/parqueModel.js';

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
    try {
        listado = await listarParques();
        
        res.render('parques', {title: 'Parques', listado, urlForm: '/parques'});
    } catch (error) {
        req.flash('messageError', `Error al listar parques: ${error.message}`);
        listado = [];
        return res.redirect('/');
    }
}

/**
 * Obtiene listado de parques con filtro de búsqueda aplicado.
 * @param {Object} req Requerimiento POST de listar parques con criterios de búsqueda, los elementos vienen en body.
  * @param {Object} res Respuesta de listar parques filtrados. Si pudo obtener los datos de los parques, renderiza vista listar,
 * si no, redirige a vista index con mensaje alert de respuesta
 * @returns Vista lista de parques filtrados
 */
export const parquesFiltrados = async(req, res) => {
    let listado;
    let {nombre, nacional, independiente, orden, long, lat} = req.body;
    nombre = nombre.trim();
    let criterios = { nombre, nacional, independiente, orden };
    // Si llegaron las coordenadas
    if ((typeof long != 'undefined') && (long != '') && (typeof lat != 'undefined') && (lat != '')) {
        criterios.ubicacion = { long, lat };
    }
    try {
        listado = await buscarParques(criterios);
        if(criterios.orden=='1' && (typeof criterios.ubicacion == 'undefined')) {
            req.flash('messageWarning', `Debe activar ubicacion en su dispositivo`);
            return res.redirect('back');
        }
        res.render('parques', {title: 'Parques', listado, urlForm: '/parques'});
    } catch (error) {
        req.flash('messageError', `Error al listar parques: ${error.message}`);
        listado = [];
        return res.redirect('/');
    }
}

/**
 * Renderiza vista login Empleados
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

/**
 * Renderiza vista login Afiliados
 */
 export const loginAfiliados = async (req, res) => {
    res.render('loginAfiliados', {title: 'Login'});
}

export const downloadMap =  (req, res) => {
    const imgMapa = req.params.mapa;
    const directory = path.join(__dirname, '../public/images', imgMapa);
    res.download(directory);
}