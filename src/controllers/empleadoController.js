import passport from 'passport';
import logger from '../logger.js';
import { cambiarEstadoEmpleado, listarEmpleados } from '../models/empleadoModel.js';

export const index = async (req, res) => {
    res.render('empleado/index', {title: 'Portal Empleados'});
}

/**
 * Renderiza vista signup
 */
 export const ingresarEmpleado = async (req, res) => {
    res.render('empleado/agregar', {title: 'Agregar Empleado'});
}

/**
 * Renderiza vista signup
 */
 export const agregarEmpleado = passport.authenticate('local.signup', {
        successRedirect: '/empleado/listar',
        failureRedirect: '/empleado/agregar',
        failureFlash: true
    });

export const listar = async (req, res) => {
    let listado;
    try {
        listado = await listarEmpleados();

        res.render('empleado/listar', {title:'Lista Empleados', listado});
    } catch (error) {
        logger.error(`No se pudo listar empleados: ${error}`);
        listado = [];
        return res.redirect('/empleado');
    }
}

export const cambiarEstado = async (req,res) => {
    try {
        let codEmpleado = req.params.codEmpleado;
        let codEstado = req.params.codEstado;
        await cambiarEstadoEmpleado(codEmpleado,codEstado);
        req.flash('messageWarning', 'Empleado cambió su estado correctamente');
        res.redirect('/empleado/listar');
    } catch (error) {
        req.flash('messageError', `Error al cambiar el estado del empleado: ${error}`);
        return res.redirect("/empleado/listar");
    }
}