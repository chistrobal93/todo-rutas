import { guardarEmpleado, cambiarEstadoEmpleado, listarEmpleados } from '../models/empleadoModel.js';
import { validaRut } from '../tools/util.js';

/**
 * Controlador que renderiza la vista de portal para empleados
 * @param {Object} req Requerimiento de cargar vista de portal para empleados
 * @param {Object} res Respuesta de renderizar vista 'index'
 */
export const index = async (req, res) => {
    res.render('empleado/index', {title: 'Portal Empleados'});
}

/**
 * Controlador que renderiza la vista signup (agregar) empleado
 * @param {Object} req Requerimiento de cargar vista signup de empleados
 * @param {Object} res Respuesta de renderizar vista 'agregar' de empleados
 */
export const agregar = async (req, res) => {
    res.render('empleado/agregar', {title: 'Agregar Empleado', urlForm: '/empleado/agregar'});
}

/**
 * Controlador para guardar nuevo empleado
 * @param {Object} req Requerimiento de guardar. Los elementos vienen en body, ya que vienen por POST
 * @param {Object} res Respuesta de guardar. Redirige a vista listar parques o devuelta (si hay error) con mensaje alert de respuesta
 * @returns La respuesta
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
        req.flash('messageError', `Error al guardar empleado: ${error.message}`);
        return res.redirect('back');
    }
    return res.redirect('/empleado/listar');
}

/**
 * Controlador que obtiene el listado de empleados y renderiza la vista de Lista de empleados
 * @param {Object} req Requerimiento de cargar vista Listar empleados
 * @param {Object} res Respuesta de listar empleados. Si pudo obtener los datos, renderiza vista listar empleados,
 * si no, redirige a vista 'index' con mensaje alert de respuesta
 * @returns Vista lista de empleados
 */
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

/**
 * Controlador para cambiar estado de un empleado (activo o inactivo). No permite cambiar estado a admin
 * @param {Object} req Requerimiento de cambiar estado. El id del empleado y el estado al que quiere cambiar vienen en params, ya que vienen por GET
 * @param {Object} res Respuesta de cambiar estado. Siempre redirige a vista listar empleado con mensaje alert de respuesta
 * @returns La respuesta de redirigir hacia lista de empleado
 */
export const cambiarEstado = async (req, res) => {
    try {
        let codEmpleado = req.params.codEmpleado;
        let codEstado = req.params.codEstado;
        if (codEmpleado == 1) { throw Error('Admin no puede ser modificado'); }
        await cambiarEstadoEmpleado(codEmpleado,codEstado);
        req.flash('messageWarning', 'Empleado cambió su estado correctamente');
    } catch (error) {
        req.flash('messageError', `Error al cambiar el estado del empleado: ${error.message}`);
    }
    return res.redirect("/empleado/listar");
}

/**
 * Controlador para cerrar sesión de empleado
 * @param {Object} req Requerimiento de cerrar sesión
 * @param {Object} res Respuesta de cerrar sesión
 * @returns La respuesta de redirigir a página principal del sitio
 */
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