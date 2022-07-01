import { Strategy as LocalStrategy} from 'passport-local';

import { pool } from '../database/mysqlConnect.js';
import { guardarEmpleado, obtenerEmpleadoAuth } from '../models/empleadoModel.js';

export default (passport) => {

    passport.use('local.signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'psw',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            console.log(username);
            const [rows] = await pool.query(`SELECT * FROM personal_app WHERE email = '${username}'`);
            if (rows.length > 0) { 
                const user = rows[0];
                if (password == user.password) { 
                    done(null, user, req.flash('messageSuccess','Bienvenido' + user.nombres));
                } else {
                    done(null, false, req.flash('messageError','Contraseña incorrecta'));
                }
            } else {
                return done(null, false, req.flash('messageWarning','Email no existe'));
            }
        } catch (error) {
            done(error, null);
        }
    }));

    passport.use('local.signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'psw',
        passReqToCallback: true
    }, async (req, email, psw, done) => {
        const {codEmpleado, nombres, apellidos, rut, tel, dir, tipo} = req.body;
        const newUser = {
            codEmpleado,
            nombres,
            apellidos,
            rut,
            tel,
            dir,
            email,
            psw,
            tipo
        }
        try {
            const result = await guardarEmpleado(codEmpleado,tipo,1,rut,nombres,apellidos,dir,tel,email,psw);
            return done(null, newUser);
        } catch (error) {
            done(error, null);
        }
    }));


    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    passport.deserializeUser(async (email, done) => {
        const rows = await obtenerEmpleadoAuth(email);
        done(null, rows[0]);
    });
}