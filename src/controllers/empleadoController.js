import passport from 'passport';
import { guardarEmpleado, cambiarEstadoEmpleado, listarEmpleados } from '../models/empleadoModel.js';

export const index = async (req, res) => {
    res.render('empleado/index', {title: 'Portal Empleados'});
}

/**
 * Renderiza vista signup
 */
export const agregar = async (req, res) => {
    res.render('empleado/agregar', {title: 'Agregar Empleado', urlForm: '/empleado/agregar'});
}

/**
 * Renderiza vista signup
 */
export const guardar = async (req, res) => {
    try {
        const {codEmpleado, nombres, apellidos, rut, tel, dir, email, psw, tipo} = req.body;
        await guardarEmpleado(codEmpleado,tipo,1,rut,nombres,apellidos,dir,tel,email,psw);
        req.flash('messageSuccess', 'Empleado guardado correctamente');
    } catch (error) {
        req.flash('messageError', `Error al guardar parque: ${error}`);
    }
    return res.redirect('/empleado/listar');
}

export const listar = async (req, res) => {
    let listado;
    try {
        listado = await listarEmpleados();

        res.render('empleado/listar', {title:'Lista Empleados', listado});
    } catch (error) {
        req.flash('messageError', `Error al listar empleados: ${error}`);
        listado = [];
        return res.redirect('/empleado');
    }
}

export const cambiarEstado = async (req, res) => {
    try {
        let codEmpleado = req.params.codEmpleado;
        let codEstado = req.params.codEstado;
        if (codEmpleado == 1) { throw ('Admin no puede ser modificado'); }
        await cambiarEstadoEmpleado(codEmpleado,codEstado);
        req.flash('messageWarning', 'Empleado cambió su estado correctamente');
        res.redirect('/empleado/listar');
    } catch (error) {
        req.flash('messageError', `Error al cambiar el estado del empleado: ${error}`);
        return res.redirect("/empleado/listar");
    }
}

export const logout = async (req, res) => {
    try {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          });
    } catch (error) {
        req.flash('messageError', `Error al cerrar sesión: ${error}`);
        return res.redirect('/');
    }
}