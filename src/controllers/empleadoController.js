import * as passport from '../passport/local-auth.js';
/**
 * Renderiza vista signup
 */
 export const ingresarEmpleado = async (req, res) => {
    res.render('empleado/agregar', {title: 'Agregar'});
}

/**
 * Renderiza vista signup
 */
 export const agregarEmpleado = async (req, res) => {
    passport.authenticate('local-signup', {
        successRedirect: '/parque',
        failureRedirect: '/empleado/agregar',
        failureFlash: true
    });

    res.send('recibido');
}