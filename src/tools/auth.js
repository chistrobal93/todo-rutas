/**
 * Función que permite verificar si el usuario está autenticado antes de acceder a alguna ruta
 * @param {Object} req Cualquier requerimiento
 * @param {Object} res Respuesta de la función
 * @param {NextFunction} next Función que permite avanzar a siguiente middleware
 * @returns Autorizar o devolver a página de inicio
 */
export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('messageWarning','No tiene permiso para visualizar esta página');
    return res.redirect('/');
}

/**
 * Función que permite verificar si el usuario no está autenticado antes de acceder a alguna ruta.
 * Por ejemplo, si quiere volver a iniciar sesión.
 * @param {Object} req Cualquier requerimiento
 * @param {Object} res Respuesta de la función
 * @param {NextFunction} next Función que permite avanzar a siguiente middleware
 * @returns Autorizar o devolver a página en la que estaba
 */
export function isntLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    req.flash('messageWarning','Ya ha iniciado sesión');
    return res.redirect('back');
}