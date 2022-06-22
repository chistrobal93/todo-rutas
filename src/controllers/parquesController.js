import logger from '../logger.js';
import { guardarParque, listarParques, obtenerParque, eliminarParque} from '../models/parquesModel.js';


/**
 * Renderiza vista index del mantenedor de parques
 */
export const mantenedorIndex = async (req, res) => {
    res.render('mantenedor/index', {title:'Mantenedor'});
}

/**
 * Renderiza vista agregar indicando el action del formulario
 */
export const agregar = async (req, res) => {
    res.render('mantenedor/agregar', {title: 'Agregar Parque', urlForm: '/mantenedor/agregar'});
}

/**
 * Recibe formulario POST mediante body, para luego guardar parque en la base de datos 
 * @returns Vista de Lista de parques
 */
export const guardar = async (req, res) => {
    let {idParque,idTipo,nombre,direccion,telefono,email,aforo,estado,horario,paginaWeb,urlReserva, desc} = req.body;
    try {
        await guardarParque(idParque, idTipo, nombre, direccion, telefono, email, aforo, estado, horario, paginaWeb, urlReserva, desc);
    } catch (error) {
        logger.error(`Ha ocurrido un error al crear parque: ${error}`);
    }
    return res.redirect('/mantenedor/listar');
}

/**
 * Obtiene el listado de parques y renderiza la vista de Lista de parques
 * @returns Vista lista de parques
 */
export const listar = async(req, res) => {
    let listado;
    try {
        listado = await listarParques();

        res.render('mantenedor/listar', {title:'Lista Parques', listado});
    } catch (error) {
        logger.error(`No se pudo listar parques: ${error}`);
        listado = [];
        return res.redirect('/mantenedor');
    }
}

/**
 * Recibe id parque por metodo GET para renderizar vista de edicion para el parque
 * @returns Vista editar de parque
 */
export const editar = async (req, res) => {
    try {
        let codParque = req.params.codParque;
        const result = await obtenerParque(codParque);
        let parque = result[0];
        res.render(`mantenedor/editar`, {title: 'Editar Parque', urlForm: `/mantenedor/editar/${codParque}`, parque});
    } catch (error) {
        logger.error(`Ha ocurrido un error al editar parque: ${error}`);
        return res.redirect("/mantenedor");
    }
}

/**
 * Recibe id parque por metodo GET para eliminar parque de base de datos
 * @returns Vista lista de parque
 */
export const eliminar = async (req,res) => {
    try {
        let codParque = req.params.codParque;
        await eliminarParque(codParque);
        res.redirect('/mantenedor/listar');
    } catch (error) {
        logger.error(`Ha ocurrido un error al eliminar parque: ${error}`);
        return res.redirect("/mantenedor/listar");
    }
}