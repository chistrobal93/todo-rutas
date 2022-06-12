const mysql = require('mysql');

const ConnectDB = {
    init: async() => {
        try{
            const con = mysql.createConnection({
                host: process.env.HOST,
                user:process.env.TR_USER,
                password: process.env.TR_PWD,
                database: process.env.TR_DATABASE
            });

            con.connect(function(err) {
                if (err) throw err;
                console.log("Conexion a BD mysql");
            });
        } catch (err) {
            console.log("BD mysql conexion: " + err.message);
        }
        
    }
}

module.exports = ConnectDB;