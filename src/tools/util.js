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