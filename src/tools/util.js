import logger from '../logger.js';
   
/**
 * Valida si un email tiene el formato correcto
 * @param {String} cadena Email ingresado para validacion
 * @returns {Boolean} Es valido o no el email ingresado
 */
export function validaFormatoCorreo(cadena) {
    if(null != cadena){
        cadena = cadena.toLowerCase();
    }
    
    if (!(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(cadena))) {
        logger.error("Valida formato correo: " + cadena);
        return false;
    }
    return true;
}

/**
 * Función que devuelve IP del dispositivo
 * @param {Object} req Request de alguna vista
 * @returns IP del dispositivo
 */
export function obtenerIp(req) {
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


/**
 * Función que valida dígito verificador de un rut
 * @param {String} rut Rut con digito verificador
 * @returns Si DV es válido, devuelve String con solo el cuerpo, de lo contrario retorna 'false'
 */
export function validaRut(rut) {
    try{
        let valor = rut.toString().replace(".", "").replace(".", "").replace(".", "").replace("-", "").replace("-", "");

        let cuerpo = valor.slice(0, -1);
        let dv = valor.slice(-1).toUpperCase();
        rut = cuerpo + '-'+ dv;
        if(cuerpo.length < 7) { 
            return false;
        }
        
        let suma = 0;
        let multiplo = 2;
        for(let i=1; i<=cuerpo.length; i++) {
            let index = multiplo * valor.charAt(cuerpo.length - i);
            suma = suma + index;
            if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
        }

        let dvEsperado = 11 - (suma % 11);
        dv = (dv == 'K')?10:dv;
        dv = (dv == 0)?11:dv;

        if(dvEsperado != dv) { 
            return false; 
        }
        return cuerpo;
    } catch(error){
        logger.error(`Ha ocurrido un error al validar RUT: ${error}`);
        return false;
    }
}