import { pool } from '../database/mysqlConnect.js'
import logger from '../logger.js'

/**
 * Realiza insercion de parque en tabla 'parque' de la base de datos
 * @param {Number} codParque Codigo unico del parque
 * @param {Number} codTipo Codigo de tipo (1:Nacional || 2:Independiente)
 * @param {String} nom Nombre del parque
 * @param {String} dir Direccion del parque
 * @param {String} tel Numero de telefono del parque
 * @param {String} email Correo de contacto del parque
 * @param {Number} aforo Aforo permitido dentro del parque
 * @param {Number} estado Estado del parque (1:Habilitado | 2:Deshabilitado)
 * @param {String} horario Horario de atencion del parque
 * @param {String} [pagWeb] Sitio web del parque
 * @param {String} [pagReserva] Sitio web de reserva del parque
 * @param {String} [desc] Texto descriptivo del parque
 * @returns Retorna Error si hubo un error, o un objeto con los resultados de la consulta
 */
export const guardarParque = async (codParque,codTipo,nom,dir,tel,email,aforo,estado,horario,pagWeb,pagReserva,desc) => {
    try {
        let sql = `INSERT INTO parque(cod_parque,cod_tipo,nombre,direccion,telefono,email,aforo,estado,horario,pagina_web,url_reserva,descripcion) VALUES (${codParque},${codTipo},'${nom}','${dir}','${tel}','${email}',${aforo},${estado},'${horario}','${pagWeb}','${pagReserva}','${desc}')`;
        const [result] = await pool.query(sql);
        return result;
    } catch (error) {
        logger.error(`CREAR PARQUE - BD: ${error}`);
        throw Error(error);
    }
}

/**
 * Realiza consulta por todos los elementos de la tabla 'parque' de la base de datos
 * @returns Retorna Error si hubo un error, o un objeto con los resultados de la consulta
 */
export const listarParques = async () => {
    try {
        let sql = `SELECT * FROM parque`;
        let [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        logger.error(`LISTAR PARQUES - BD: ${error}`);
        throw Error(error);
    }
}

/**
 * Realiza consulta por toda la informacion de un unico parque por id
 * @param {Number} codParque Codigo unico del parque
 * @returns Retorna Error si hubo un error, o un objeto con los resultados de la consulta
 */
export const obtenerParque = async (codParque) => {
    try {
        let sql = `SELECT * FROM parque WHERE cod_parque=${codParque}`;
        let [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        logger.error(`OBTENER PARQUE - BD: ${error}`);
        throw Error(error);
    }
}

/**
 * Realiza query para eliminar un parque de la tabla 'parque' de la base de datos por id
 * @param {Number} codParque Codigo unico del parque
 * @returns Retorna Error si hubo un error, o un objeto con los resultados de la consulta
 */
export const eliminarParque = async (codParque) => {
    try {
        let sql = `DELETE FROM parque WHERE cod_parque=${codParque}`;
        let [result] = await pool.query(sql);
        return result;
    } catch (error) {
        logger.error(`ELIMINAR PARQUE - BD: ${error}`);
        throw Error(error);
    }
}