'use strict';
import { createPool } from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from '../config.js';

/**
 * Crea pool de conexiones basado en valores definidos por variables de entorno
 * connectionLimit: limite de conexiones del pool
 * host: ubicacion del host
 * user: usuario de conexion a base de datos
 * password: contraseña de conexion a base de datos
 * database: nombre de la base de datos
 * poolAlias: nombre del pool
 */
export const pool = createPool({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    debug: false
});