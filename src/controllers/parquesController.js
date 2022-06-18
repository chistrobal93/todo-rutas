const logger = require('../logger');
const parquesModel = require('../models/parquesModel');

class controller {

    /**
     * Renderiza vista index del mantenedor de parques
     */
    async mantenedorIndex(req, res) {
        res.render('mantenedor/index', {title:'Mantenedor'});
    }

    /**
     * Renderiza vista agregar indicando el action del formulario
     */
    async agregar(req, res) {
        res.render('mantenedor/agregar', {title: 'Agregar Parque', urlForm: '/mantenedor/agregar'});
    }

    /**
     * Recibe formulario POST mediante body, para luego guardar parque en la base de datos 
     * @returns Vista de Lista de parques
     */
    async guardar(req, res) {
        let {idParque,idTipo,nombre,direccion,telefono,email,aforo,estado,horario,paginaWeb,urlReserva, desc} = req.body;
        try {
            await parquesModel.guardarParque(idParque, idTipo, nombre, direccion, telefono, email, aforo, estado, horario, paginaWeb, urlReserva, desc);
        } catch (error) {
            logger.error(`Ha ocurrido un error al crear parque: ${error}`);
        }
        return res.redirect('/mantenedor/listar');
    }

    /**
     * Obtiene el listado de parques y renderiza la vista de Lista de parques
     * @returns Vista lista de parques
     */
    async listar(req, res) {
        let listado;
        try {
            listado = await parquesModel.listarParques();

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
    async editar(req, res) {
        try {
            let codParque = req.params.codParque;
            const result = await parquesModel.obtenerParque(codParque);
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
    async eliminar(req,res) {
        try {
            let codParque = req.params.codParque;
            await parquesModel.eliminarParque(codParque);
            res.redirect('/mantenedor/listar');
        } catch (error) {
            logger.error(`Ha ocurrido un error al eliminar parque: ${error}`);
            return res.redirect("/mantenedor/listar");
        }
    }
}

module.exports = new controller();