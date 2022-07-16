import { pool } from '../database/mysqlConnect.js';
import logger from '../logger.js';

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
 * @returns Objeto con los resultados de la consulta
 */
export const guardarParque = async (codParque,codTipo,nom,dir,tel,email,aforo,estado,horario,pagWeb,pagReserva,desc,img,mapa,coords) => {
    try {
        let sql = `INSERT INTO parque(cod_parque,cod_tipo,nombre,direccion,telefono,email,aforo,estado,horario,pagina_web,url_reserva,descripcion,img,mapa,ubicacion) VALUES (${codParque},${codTipo},'${nom}','${dir}','${tel}','${email}',${aforo},${estado},'${horario}','${pagWeb}','${pagReserva}','${desc}','${img}','${mapa}',ST_GeomFromText('POINT(${coords.long} ${coords.lat})'))`;
        const [result] = await pool.query(sql);
        return result;
    } catch (error) {
        logger.error(`CREAR PARQUE - BD: ${error}`);
        throw (error);
    }
}

/**
 * Función que obtiene todos los parques de la tabla 'parque' de la base de datos
 * @returns Objeto con los resultados de la consulta
 */
export const listarParques = async () => {
    try {
        let sql = `SELECT * FROM parque ORDER BY estado ASC`;
        let [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        logger.error(`LISTAR PARQUES - BD: ${error}`);
        throw (error);
    }
}

/**
 * Función que obtiene todos los parques de la base de datos ordenados por cercanía a las coordenadas indicadas
 * @param {Object} ubicacion Coordenadas de ubicación
 * @param {Number} ubicacion.long Longitud
 * @param {Number} ubicacion.lat Latitud
 * @returns Objeto con los resultados de la consulta
 */
// export const listarParquesUbicacion = async (ubicacion) => {
//     try {
//         console.log(typeof(ubicacion.long));
//         let sql = `SELECT cod_parque,cod_tipo,nombre,direccion,telefono,email,aforo,estado,horario,pagina_web,url_reserva,descripcion,img,mapa, ubicacion, ST_Distance_Sphere(POINT(${ubicacion.long}, ${ubicacion.lat}), ubicacion)/1000 AS 'km' FROM parque ORDER BY -km DESC`;
//         let [rows] = await pool.query(sql);
//         return rows;
//     } catch (error) {
//         logger.error(`LISTAR PARQUES CON UBICACION - BD: ${error}`);
//         throw (error);
//     }
// }

/**
 * Función que obtiene los parques filtrados y ordenados por cercanía a las coordenadas indicadas
 * @param {Object} criterios Información de filtrado
 * @param {String} criterios.nombre Nombre del parque a buscar
 * @param {String|undefined} criterios.nacional Filtro por parques nacionales
 * @param {String|undefined} criterios.independiente Filtro por parques independientes
 * @param {String} criterios.orden Orden de resultados por distancia o relevancia
 * @param {Object|undefined} criterios.ubicacion Coordenadas de ubicación
 * @param {String|undefined} criterios.ubicacion.long Longitud
 * @param {String|undefined} criterios.ubicacion.lat Latitud
 * @returns Objeto con los resultados de la consulta
 */
export const buscarParques = async (criterios) => {
    try {
        let elementosSelect = '*';
        let sqlNombre = '';
        let sqlTipo = 'AND cod_tipo IN (1,2)';
        // Si ubicación está definida
        if (criterios.ubicacion != undefined) {
            const ubicacion = criterios.ubicacion;
            elementosSelect = `cod_parque,cod_tipo,nombre,direccion,telefono,email,aforo,estado,horario,pagina_web,url_reserva,descripcion,img,mapa, ubicacion, ST_Distance_Sphere(POINT(${ubicacion.long}, ${ubicacion.lat}), ubicacion)/1000 AS 'km'`;
            if (criterios.orden == '1') {
                var orderBy = '-km DESC';
            }
        }
        if (criterios.nombre != '') { sqlNombre = `nombre LIKE '%${criterios.nombre}%' AND `; }
        if (criterios.nacional == undefined && criterios.independiente == undefined) {
            sqlTipo = '';
        } else if(criterios.nacional == 'on' && criterios.independiente == undefined) {
            sqlTipo = 'AND cod_tipo=1';
        } else if(criterios.nacional == undefined && criterios.independiente == 'on') {
            sqlTipo = 'AND cod_tipo=2';
        }
        // Orden por relevancia
        //if (criterios.orden == '2') {
        //    orderBy = '-rel DESC';
        //}
        if (typeof orderBy == 'undefined') {
            var orderBy = 'cod_parque ASC';
        } else { orderBy += ', cod_parque ASC'; }

        let sql = `SELECT ${elementosSelect} FROM parque WHERE ${sqlNombre}estado=1 ${sqlTipo} ORDER BY ${orderBy}`;
        let [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        logger.error(`BUSCAR PARQUE - BD: ${error}`);
        throw (error);
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
        throw (error);
    }
}

export const actualizarParque = async (codParque,codTipo,nom,dir,tel,email,aforo,horario,pagWeb,pagReserva,desc) => {
    try {
        let sql = `UPDATE parque SET cod_tipo=${codTipo},nombre='${nom}',direccion='${dir}',telefono='${tel}',email='${email}',aforo=${aforo},horario='${horario}',pagina_web='${pagWeb}',url_reserva='${pagReserva}',descripcion='${desc}' WHERE cod_parque=${codParque}`;
        const [result] = await pool.query(sql);
        return result;
    } catch (error) {
        logger.error(`ACTUALIZAR PARQUE - BD: ${error.message}`);
        throw (error);
    }
}

/**
 * Realiza query para eliminar un parque de la tabla 'parque' de la base de datos por id
 * @param {Number} codParque Codigo unico del parque
 * @returns Retorna Error si hubo un error, o un objeto con los resultados de la consulta
 */
export const cambiarEstadoParque = async (codParque,codEstado) => {
    try {
        let sql = `UPDATE parque SET estado=${codEstado} WHERE cod_parque=${codParque}`;
        let [result] = await pool.query(sql);
        return result;
    } catch (error) {
        logger.error(`CAMBIAR ESTADO PARQUE - BD: ${error}`);
        throw (error);
    }
}