import fs from 'fs';
import { guardarParque, listarParques, obtenerParque, actualizarParque, cambiarEstadoParque} from '../models/parqueModel.js';


/**
 * Renderiza vista agregar indicando el action del formulario
 */
export const agregar = async (req, res) => {
    res.render('parque/agregar', {title: 'Agregar Parque', urlForm: '/parque/agregar'});
}

/**
 * Recibe formulario POST mediante body, para luego guardar parque en la base de datos 
 * @returns Vista de Lista de parques
 */
export const guardar = async (req, res) => {
    let {idParque,idTipo,nombre,direccion,telefono,email,aforo,estado,horario,paginaWeb,urlReserva,desc} = req.body;
    let img = req.files.img[0];
    let mapa = req.files.mapa[0];
    try {
        await guardarParque(idParque, idTipo, nombre, direccion, telefono, email, aforo, estado, horario, paginaWeb, urlReserva, desc, img.filename, mapa.filename);
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
 * Obtiene el listado de parques y renderiza la vista de Lista de parques
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
        return res.redirect('/parque');
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
        res.render(`parque/editar`, {title: 'Editar Parque', urlForm: `/parque/editar/${codParque}`, parque});
    } catch (error) {
        req.flash('messageError', `Error al listar parque: ${error.message}`);
        return res.redirect("/parque");
    }
}

export const actualizar = async (req, res) => {
    let {idParque,idTipo,nombre,direccion,telefono,email,aforo,horario,paginaWeb,urlReserva,desc} = req.body;
    try {
        await actualizarParque(idParque, idTipo, nombre, direccion, telefono, email, aforo, horario, paginaWeb, urlReserva, desc);
        req.flash('messageSuccess', 'Parque actualizado correctamente');
    } catch (error) {
        req.flash('messageError', `Error al actualizar parque: ${error.message}`);
    }
    return res.redirect('/parque/listar');
}

/**
 * Recibe id parque por metodo GET para cambiar estado de parque de base de datos
 * @returns Vista lista de parque
 */
export const cambiarEstado = async (req,res) => {
    try {
        let codParque = req.params.codParque;
        let codEstado = req.params.codEstado;
        await cambiarEstadoParque(codParque,codEstado);
        req.flash('messageWarning', 'Parque cambió su estado correctamente');
        res.redirect('/parque/listar');
    } catch (error) {
        req.flash('messageError', `Error al cambiar el estado del parque: ${error.message}`);
        return res.redirect("/parque/listar");
    }
}