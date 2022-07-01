import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';

import { guardarEmpleado } from '../models/empleadoModel.js'

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'psw',
    passReqToCallback: true
}, async (req, email, psw, done) => {
    const {nombres, apellidos, rut, tel, dir, tipo} = req.body;
    const newUser = {
        nombres,
        apellidos,
        rut,
        tel,
        dir,
        email,
        psw,
        tipo
    }
    await guardarEmpleado(1,tipo,1,rut,nombres,apellidos,dir,tel,email,psw);
}));

// passport.serializeUser((usr, done) => {

// });