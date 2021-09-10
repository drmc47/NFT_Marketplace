const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy ({
    
    usernameField : 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    try {
        console.log("entre en el back, ME LLEGO ",username)
        const found = await User.findOne({username});
        if (found) {
            //este mensaje donde llega??
            return done(null, false, {message : 'YA TE REGISTRASTE ANTES '})
        }
        const user = await User.create({
            username,
            password, 
            firstName : req.body.firstName,
            lastName : req.body.lastName
        })       
        return done(null, user)
    } catch (error) {
        done(error)
    }

}));

passport.use('local-login', new LocalStrategy ({
    usernameField : 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(_req, username, password, done) => {
    try {
        const user = await User.findOne({username})
            if(!user) {
                 done(null, false, {message : 'MIRA LA VERDAD QUE ESE USUARIO NO SE ONDA'})
            }
        const validate = await user.validatePassword(password);
            if(!validate) {
                 done(null, false, {message : 'FIJATE LA PASSWORD SALAME'})
            }
             done(null, user, {message : 'LOGUIN SACSESFOLY CAPO'})
    } catch (error) {
         done(error)
    }

}));

