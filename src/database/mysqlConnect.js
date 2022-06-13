'use strict';
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user:process.env.TR_USER,
    password: process.env.TR_PWD,
    database: process.env.TR_DATABASE,
    poolAlias: 'default',
    debug: false
});

module.exports = pool;