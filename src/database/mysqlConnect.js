'use strict';
const mysql = require('mysql');
const { promisify } = require('util');
const logger = require('../logger');

/**
 * Crea pool de conexiones basado en valores definidos por variables de entorno
 * connectionLimit: limite de conexiones del pool
 * host: ubicacion del host
 * user: usuario de conexion a base de datos
 * password: contraseña de conexion a base de datos
 * database: nombre de la base de datos
 * poolAlias: nombre del pool
 */
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user:process.env.TR_USER,
    password: process.env.TR_PWD,
    database: process.env.TR_DATABASE,
    poolAlias: 'default',
    debug: false
});

/**
 * Crea el pool de conexion
 */
pool.getConnection((err, connection) => {
    if (err) { logger.error(err); }

    if (connection) {
        connection.release();
        logger.info('Conectado a BD');
    }
    return;
});

// Se pueden usar promesas en las querys
pool.query = promisify(pool.query);

module.exports = pool;