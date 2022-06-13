const bd = require('../database/mysqlConnect');
const logger = require('../logger');

class parquesModel {
    async guardarParque(codParque,codTipo,nom,dir,tel,email,aforo,estado,horario,pagWeb,pagReserva,desc) {
        let sql = `INSERT INTO parque(cod_parque,cod_tipo,nombre,direccion,telefono,email,aforo,estado,horario,pagina_web,url_reserva,descripcion) VALUES (${codParque},${codTipo},'${nom}','${dir}','${tel}','${email}',${aforo},${estado},'${horario}','${pagWeb}','${pagReserva}','${desc}')`;
        let result;
        bd.getConnection(function(err, connection) {
            if (err) {logger.error(`CONEXION BD - ${err}`);}
            result = connection.query(sql, function(error, results, fields) {
                connection.release();
                if (error) {logger.error(`GUARDAR PARQUE - BD ${error}`);}
            });
        });
        return result;
    }
}

module.exports = new parquesModel();