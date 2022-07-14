import fs from 'fs';
import { API_KEY_GOOGLE } from '../config.js';
import { guardarParque, listarParques, obtenerParque, actualizarParque, cambiarEstadoParque} from '../models/parqueModel.js';
import { coordenadasValidas } from '../tools/util.js';


/**
 * Controlador para renderizar vista agregar indicando el action del formulario y api key de Google
 * @param {Object} req Requerimiento de cargar vista agregar parque.
 * @param {Object} res Respuesta de cargar vista agregar parque.
 */
export const agregar = async (req, res) => {
    res.render('parque/agregar', {title: 'Agregar Parque', urlForm: '/parque/agregar', apiKeyGoogle: API_KEY_GOOGLE});
}

/**
 * Controlador para guardar parque
 * @param {Object} req Requerimiento de guardar. Los elementos vienen en body, ya que vienen por POST
 * @param {Object} res Respuesta de guardar. Siempre redirige a vista listar parques con mensaje alert de respuesta
 * @returns La respuesta de redirigir hacia lista de parques
 */
export const guardar = async (req, res) => {
    let {idParque,idTipo,nombre,direccion,telefono,email,aforo,estado,horario,paginaWeb,urlReserva,desc,long,lat} = req.body;
    let img = req.files.img[0];
    let mapa = req.files.mapa[0];
    try {
        if(!coordenadasValidas(long, lat)) {
            throw Error('Coordenas inválidas');
        }
        let coords = { long, lat }
        await guardarParque(idParque, idTipo, nombre, direccion, telefono, email, aforo, estado, horario, paginaWeb, urlReserva, desc, img.filename, mapa.filename, coords);
        req.flash('messageSuccess', 'Parque guardado correctamente');
    } catch (error) {
        if(img != undefined) {
            fs.unlink(img.path, (err) => {
                if (err) {
                    logger.error("Ha ocurrido un error al eliminar imagen: " + err);
                }
            });
        }
        if(mapa != undefined) {
            fs.unlink(mapa.path, (err) => {
                if (err) {
                    logger.error("Ha ocurrido un error al eliminar mapa: " + err);
                }
            });
        }
        req.flash('messageError', `Error al guardar parque: ${error.message}`);
    }
    return res.redirect('/parque/listar');
}

/**
 * Controlador que obtiene el listado de parques y renderiza la vista de Lista de parques
 * @param {Object} req Requerimiento de cargar vista Listar parques.
 * @param {Object} res Respuesta de listar parques. Si pudo obtener los datos de los parques, renderiza vista listar,
 * si no, redirige a vista index con mensaje alert de respuesta
 * @returns Vista lista de parques
 */
export const listar = async(req, res) => {
    let listado;
    try {
        listado = await listarParques();

        res.render('parque/listar', {title:'Lista Parques', listado});
    } catch (error) {
        req.flash('messageError', `Error al listar parques: ${error.message}`);
        listado = [];
        return res.redirect('/');
    }
}

/**
 * Controlador para cargar datos en vista editar parque
 * @param {Object} req Requerimiento de cargar vista editar. El id del parque viene en params, ya que viene por GET
 * @param {Object} res Respuesta de cargar vista editar. Si pudo obtener los datos del parque a editar, renderiza vista editar,
 * si no, redirige a vista listar parques con mensaje alert de respuesta
 */
export const editar = async (req, res) => {
    try {
        let codParque = req.params.codParque;
        const result = await obtenerParque(codParque);
        let parque = result[0];
        res.render(`parque/editar`, {title: 'Editar Parque', urlForm: `/parque/editar/${codParque}`, parque});
    } catch (error) {
        req.flash('messageError', `Error al listar parque: ${error.message}`);
        return res.redirect("/parque");
    }
}

/**
 * Controlador para actualizar parque
 * @param {Object} req Requerimiento de actualizar. Los elementos vienen en body, ya que vienen por POST
 * @param {Object} res Respuesta de actualizar. Siempre redirige a vista listar parques con mensaje alert de respuesta
 * @returns La respuesta de redirigir hacia lista de parques
 */
export const actualizar = async (req, res) => {
    let {idParque,idTipo,nombre,direccion,telefono,email,aforo,horario,paginaWeb,urlReserva,desc} = req.body;
    try {
        await actualizarParque(idParque, idTipo, nombre, direccion, telefono, email, aforo, horario, paginaWeb, urlReserva, desc);
        req.flash('messageSuccess', 'Parque actualizado correctamente');
    } catch (error) {
        req.flash('messageError', `Error al actualizar parque: ${error.message}`);
        return res.redirect('back');
    }
    return res.redirect('/parque/listar');
}

/**
 * Controlador para cambiar estado de un parque (activo o inactivo)
 * @param {Object} req Requerimiento de cambiar estado. El id del parque y el estado al que quiere cambiar vienen en params, ya que vienen por GET
 * @param {Object} res Respuesta de cambiar estado. Siempre redirige a vista listar parques con mensaje alert de respuesta
 * @returns La respuesta de redirigir hacia lista de parques
 */
export const cambiarEstado = async (req,res) => {
    try {
        let codParque = req.params.codParque;
        let codEstado = req.params.codEstado;
        await cambiarEstadoParque(codParque,codEstado);
        req.flash('messageWarning', 'Parque cambió su estado correctamente');
    } catch (error) {
        req.flash('messageError', `Error al cambiar el estado del parque: ${error.message}`);
    }
    return res.redirect("/parque/listar");
}