const logger = require('../logger');

class util {
    obtenerIp(req) {
        let ip = "127.0.0.1";
        try {
            ip = req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
            let separaIp = ip.split(',');
            ip = separaIp[0];            
            ip = ip.slice(0,15);
        } catch(error) {
            logger.error("Ha ocurrido un error al recuperar la IP: " + error);
        }
    
        return ip;
    }

    validaFormatoCorreo(cadena){
        if(null != cadena){
            cadena = cadena.toLowerCase();
        }
        
        if (!(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(cadena))){
            logger.error("Valida formato correo: " + cadena);
            return false;
        }
        return true;
    }
}

module.exports = new util();