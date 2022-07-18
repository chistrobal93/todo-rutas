import passport from 'passport';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { listarParques, buscarParques } from '../models/parqueModel.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Controlador que renderiza la vista principal
 * @param {Object} req Requerimiento de cargar vista principal
 * @param {Object} res Respuesta de renderizar vista 'index'
 */
export const index = async (req, res) => {
    res.render('index', {title:'Todo Rutas'});
}

/**
 * Controlador que renderiza la vista sobre nosotros
 * @param {Object} req Requerimiento de cargar vista sobre nosotros
 * @param {Object} res Respuesta de renderizar vista 'about'
 */
export const about = async (req, res) => {
    res.render('about', {title: 'About'});
}

/**
 * Controlador que obtiene el listado de parques y renderiza la vista de Lista de parques
 * @param {Object} req Requerimiento de cargar vista Listar parques
 * @param {Object} res Respuesta de listar parques. Si pudo obtener los datos de los parques, renderiza vista listar,
 * si no, redirige a vista index con mensaje alert de respuesta
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
 * Controlador que renderiza la vista login para empleados
 * @param {Object} req Requerimiento de cargar vista login de empleados
 * @param {Object} res Respuesta de renderizar vista 'loginEmpleados'
 */
export const loginEmpleados = async (req, res) => {
    res.render('loginEmpleados', {title: 'Login'});
}

/**
 * Controlador que autentica a usuario usando local.signin desde /passport/local-auth.js
 * @param {Object} req Requerimiento de autenticación
 * @param {Object} res Respuesta de autenticación
 * @param {NextFunction} next Función que permite avanzar a siguiente middleware
 */
export const authEmpleado = async (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/empleado/',
        failureRedirect: '/loginEmpleados',
        failureFlash: true
    })(req, res, next);
}

/**
 * Controlador que renderiza la vista login para afiliados
 * @param {Object} req Requerimiento de cargar vista login de afiliados
 * @param {Object} res Respuesta de renderizar vista 'loginAfiliados'
 */
export const loginAfiliados = async (req, res) => {
    res.render('loginAfiliados', {title: 'Login'});
}

/**
 * Controlador para descargar el mapa de un parque
 * @param {Object} req Requerimiento de descargar mapa. El nombre del archivo que desea descargar viene en params, ya que vienen por GET
 * @param {Object} res Respuesta de descargar mapa. Ejecuta la función download para descargar el archivo
 */
export const downloadMap =  (req, res) => {
    const imgMapa = req.params.mapa;
    const directory = path.join(__dirname, '../public/images', imgMapa);
    res.download(directory);
}