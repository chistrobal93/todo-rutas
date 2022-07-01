import { pool } from '../database/mysqlConnect.js';
import logger from '../logger.js';


/**
 * Realiza insercion de empleado en tabla 'personal_app' de la base de datos
 * @param {Number} codEmpleado Codigo unico de empleado
 * @param {Number} codTipo Codigo de tipo (1:Admin)
 * @param {Number} codEstado Codigo de estado (1:Habilitado || 2:Deshabilitado)
 * @param {Number} rut Rut del empleado
 * @param {String} nombres Nombres del empleado
 * @param {String} apellidos Apellidos del empleado
 * @param {String} dir Direccion del domicilio del empleado
 * @param {String} telefono Telefono del empleado
 * @param {String} email Email del empleado
 * @param {String} password Contrasena del empleado
 * @returns Retorna Error si hubo un error, o un objeto con los resultados de la consulta
 */
export const guardarEmpleado = async (codEmpleado,codTipo,codEstado,rut,nombres,apellidos,dir,telefono,email,password) => {
    try{
        let sql = `INSERT INTO personal_app(cod_personal_app,cod_personal_app_tipo,cod_estado,rut,nombres,apellidos,direccion,telefono,email,password,fech_crea) VALUES ('${codEmpleado}','${codTipo}','${codEstado}','${rut}','${nombres}','${apellidos}','${dir}','${telefono}','${email}','${password}',CURDATE())`;
        const [result] = await pool.query(sql);
        return result;
    } catch (error) {
        logger.error(`CREAR EMPLEADO - BD: ${error}`);
        throw (error);
    }
}

export const listarEmpleados = async () => {
    try {
        let sql = `SELECT cod_personal_app,cod_personal_app_tipo,cod_estado,rut,nombres,apellidos,telefono,email FROM personal_app ORDER BY cod_estado ASC`;
        let [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        logger.error(`LISTAR EMPLEADOS - BD: ${error}`);
        throw (error);
    }
}

export const obtenerEmpleado = async (codEmpleado) => {
    try {
        let sql = `SELECT * FROM personal_app WHERE cod_personal_app=${codEmpleado}`;
        let [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        logger.error(`OBTENER EMPLEADO - BD: ${error}`);
        throw (error);
    }
}

export const obtenerEmpleadoAuth = async (email) => {
    try {
        let sql = `SELECT * FROM personal_app WHERE email = ?`;
        let [rows] = await pool.query(sql, [email]);
        return rows;
    } catch (error) {
        logger.error(`OBTENER EMPLEADO AUTH - BD: ${error}`);
        throw (error);
    }
}

export const cambiarEstadoEmpleado = async(codEmpleado,codEstado) => {
    try {
        let sql = `UPDATE personal_app SET cod_estado=${codEstado} WHERE cod_personal_app=${codEmpleado}`;
        let [result] = await pool.query(sql);
        return result;
    } catch (error) {
        logger.error(`CAMBIAR ESTADO EMPLEADO - BD: ${error}`);
        throw (error);
    }
}