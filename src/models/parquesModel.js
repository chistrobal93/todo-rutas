const pool = require('../database/mysqlConnect');
const logger = require('../logger');

class parquesModel {
    async guardarParque(codParque,codTipo,nom,dir,tel,email,aforo,estado,horario,pagWeb,pagReserva,desc) {
        try {
            let sql = `INSERT INTO parque(cod_parque,cod_tipo,nombre,direccion,telefono,email,aforo,estado,horario,pagina_web,url_reserva,descripcion) VALUES (${codParque},${codTipo},'${nom}','${dir}','${tel}','${email}',${aforo},${estado},'${horario}','${pagWeb}','${pagReserva}','${desc}')`;
            let result = await pool.query(sql);
            return result;
        } catch (error) {
            logger.error(`CREAR PARQUE - BD: ${error}`);
            throw Error(error);
        }
    }

    async listarParques() {
        try {
            let sql = `SELECT * FROM parque`;
            let result = await pool.query(sql);
            return result;
        } catch (error) {
            logger.error(`LISTAR PARQUES - BD: ${error}`);
            throw Error(error);
        }
    }

    async obtenerParque(codParque) {
        try {
            let sql = `SELECT * FROM parque WHERE cod_parque=${codParque}`;
            let result = await pool.query(sql);
            return result;
        } catch (error) {
            logger.error(`OBTENER PARQUE - BD: ${error}`);
            throw Error(error);
        }
    }

    async eliminarParque(codParque) {
        try {
            let sql = `DELETE FROM parque WHERE cod_parque=${codParque}`;
            let result = await pool.query(sql);
            return result;
        } catch (error) {
            logger.error(`ELIMINAR PARQUE - BD: ${error}`);
            throw Error(error);
        }
    }
}

module.exports = new parquesModel();