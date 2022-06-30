import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'psw',
    passReqToCallback: true
}, async (req, email, psw, done) => {
    console.log(req.body);
    
    const newUser;
}));

// passport.serializeUser((usr, done) => {

// });