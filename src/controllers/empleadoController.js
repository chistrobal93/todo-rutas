import passport from 'passport';
import { guardarEmpleado, cambiarEstadoEmpleado, listarEmpleados } from '../models/empleadoModel.js';
import { validaRut } from '../tools/util.js';

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
        let {codEmpleado, nombres, apellidos, rut, tel, dir, email, psw, tipo} = req.body;
        rut = validaRut(rut);
        if (!rut) { throw Error("Dígito verificador de RUT no es válido"); }
        if ( email == null || email == '') { throw Error("Debe ingresar un email"); }
        await guardarEmpleado(codEmpleado,tipo,1,rut,nombres,apellidos,dir,tel,email,psw);
        req.flash('messageSuccess', 'Empleado guardado correctamente');
    } catch (error) {
        req.flash('messageError', `Error al guardar parque: ${error.message}`);
        return res.redirect('back');
    }
    return res.redirect('/empleado/listar');
}

export const listar = async (req, res) => {
    let listado;
    try {
        listado = await listarEmpleados();

        res.render('empleado/listar', {title:'Lista Empleados', listado});
    } catch (error) {
        req.flash('messageError', `Error al listar empleados: ${error.message}`);
        listado = [];
        return res.redirect('/empleado');
    }
}

export const cambiarEstado = async (req, res) => {
    try {
        let codEmpleado = req.params.codEmpleado;
        let codEstado = req.params.codEstado;
        if (codEmpleado == 1) { throw Error('Admin no puede ser modificado'); }
        await cambiarEstadoEmpleado(codEmpleado,codEstado);
        req.flash('messageWarning', 'Empleado cambió su estado correctamente');
        res.redirect('/empleado/listar');
    } catch (error) {
        req.flash('messageError', `Error al cambiar el estado del empleado: ${error.message}`);
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
        req.flash('messageError', `Error al cerrar sesión: ${error.message}`);
        return res.redirect('/');
    }
}