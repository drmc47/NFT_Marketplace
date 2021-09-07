const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/User')


const localStrategy = new LocalStrategy({ passReqToCallback: true }, async(_req, username, password, done) => {
      const found = await User.findOne({username, password});
      if(found) {
        return done(null, {success : "HOLA USUARIO", username})
        }; 
      return done(null, false, {error: 'VALIDATION FAILED'}); 

  },
);

module.exports = localStrategy;