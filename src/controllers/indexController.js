import logger from '../logger.js';
import { listarParques } from '../models/parquesModel.js';


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
        
        res.render('parques', {title: 'Parques', listado});
    } catch (error) {
        logger.error(`No se pudo listar parques: ${error}`);
        listado = [];
        return res.redirect('/');
    }
}

