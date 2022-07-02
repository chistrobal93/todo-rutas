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
            const [rows] = await pool.query(`SELECT * FROM personal_app WHERE email = '${username}'`);
            if (rows.length <= 0) {
                return done(null, false, req.flash('messageWarning','Email no existe'));
            }
            const user = rows[0];
            if (password != user.password) {
                return done(null, false, req.flash('messageError','Contraseña incorrecta'));
            }
            if (user.cod_estado != 1) {
                return done(null, false, req.flash('messageWarning','Usuario no está habilitado'));
            } else {
                return done(null, user, req.flash('messageSuccess','Bienvenido' + user.nombres));
            }
        } catch (error) {
            done(error, null);
        }
    }));


    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    passport.deserializeUser(async (email, done) => {
        const rows = await obtenerEmpleadoAuth(email);
        const user = rows[0];
        done(null, user);
    });
}