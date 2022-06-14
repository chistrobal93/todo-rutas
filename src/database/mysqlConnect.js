'use strict';
const mysql = require('mysql');
const { promisify } = require('util');
const logger = require('../logger');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user:process.env.TR_USER,
    password: process.env.TR_PWD,
    database: process.env.TR_DATABASE,
    poolAlias: 'default',
    debug: false
});

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