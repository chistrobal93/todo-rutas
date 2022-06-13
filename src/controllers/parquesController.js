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
        return res.redirect('/mantenedor');
    }

    async listar(req, res) {
        
    }
}

module.exports = new controller();