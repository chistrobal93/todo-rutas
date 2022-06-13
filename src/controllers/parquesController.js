const logger = require('../logger');
const parquesModel = require('../models/parquesModel');

class controller {

    async mantenedorIndex(req, res) {
        res.render('mantenedor/index', {title:'Mantenedor'});
    }

    async agregar(req, res) {
        res.render('mantenedor/agregar', {title: 'Agregar Parque'});
    }

    async guardar(req, res) {
        let {cod_parque,cod_tipo,nombre,direccion,telefono,email,aforo,estado,horario,pagina_web,url_reserva} = req.body;
        try {
            await parquesModel.guardarParque(cod_parque, cod_tipo, nombre, direccion, telefono, email, aforo, estado, horario, pagina_web,url_reserva);
        } catch (error) {
            logger.error(`Ha ocurrido un error al crear parque: ${error}`);
        }
    }

    async listar(req, res) {
        
    }
}

module.exports = new controller();