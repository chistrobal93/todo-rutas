class controller {

    async agregar(req, res) {
        res.render('parques/agregar', {titulo: 'Agregar'})
    };

    async guardar(req, res) {
        let {cod_parque,cod_tipo,nombre,direccion,telefono,email,aforo,estado,horario,pagina_web,url_reserva} = req.body;
    }

    async listar(req, res) {
        
    }
}