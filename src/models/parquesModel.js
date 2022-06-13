const bd = require('../database/mysqlConnect');

class parquesModel {
    async guardarParque(codParque,codTipo,nom,dir,tel,email,aforo,estado,horario,pagWeb,pagReserva,desc) {
        try {
            let sql = `INSERT INTO parque(cod_parque,cod_tipo,nombre,direccion,telefono,email,aforo,estado,horario,pagina_web,url_reserva,descripcion) VALUES (${codParque},${codTipo},'${nom}','${dir}','${tel}','${email}',${aforo},${estado},'${horario}','${pagWeb}','${pagReserva}','${desc}')`;
            let result;
            bd.getConnection(function(err, connection) {
                if (err) throw err;
                result = connection.query(sql, function(error, results, fields) {
                    connection.release();
                    if (error) throw error;
                });
            });
            return result;
        } catch (err) {
            console.log(`GUARDAR PARQUE - BD ${err}`);
            throw err;
        }
    }
}

module.exports = new parquesModel();