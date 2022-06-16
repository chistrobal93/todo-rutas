const logger = require('../logger');
const parquesModel = require('../models/parquesModel');

class controller {

    async mantenedorIndex(req, res) {
        res.render('mantenedor/index', {title:'Mantenedor'});
    }

    async agregar(req, res) {
        res.render('mantenedor/agregar', {title: 'Agregar Parque', urlForm: '/mantenedor/agregar'});
    }

    async guardar(req, res) {
        let {idParque,idTipo,nombre,direccion,telefono,email,aforo,estado,horario,paginaWeb,urlReserva, desc} = req.body;
        try {
            await parquesModel.guardarParque(idParque, idTipo, nombre, direccion, telefono, email, aforo, estado, horario, paginaWeb, urlReserva, desc);
        } catch (error) {
            logger.error(`Ha ocurrido un error al crear parque: ${error}`);
        }
        return res.redirect('/mantenedor/listar');
    }

    async listar(req, res) {
        try {
            let listado = await parquesModel.listarParques();

            res.render('mantenedor/listar', {title:'Lista Parques', listado});
        } catch (error) {
            logger.error(`No se pudo listar parques: ${error}`);
            listado = [];
            return res.redirect('/mantenedor');
        }
    }

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