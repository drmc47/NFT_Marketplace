const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(new GoogleStrategy(
    {
      clientID:"671064352860-adadpmpcaud01hstsib9jmva8h9l6sfb.apps.googleusercontent.com",
      clientSecret: "2lvvcGGu3d7m1WWXBBF-pc6s",
      callbackURL: "http://localhost:8001/auth/google/callback"
    },
    async (_accessToken, _refreshToken, profile, done) => {
        try {
            const user = await User.findOne({googleID : profile.id}); // si el usuario no existe 
            if (!user) {
              let newUser = new User();
                  newUser.googleID = profile.id
                  newUser.firstName = profile.displayName //SISI YA SE QUE TRAE FIRST Y LAST NAME PERO ES LO QUE HAY
                  newUser.profilePic = profile.photos[0].value
                  await newUser.save() //guardamos en la base de datos
                  return done(null, newUser)
            }
                 return done(null, user);
            

        } catch (error) {
            done(error);
        
      }
    }
  )
);