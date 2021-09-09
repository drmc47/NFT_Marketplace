require('dotenv').config();
const passport = require('passport');
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
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
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8001/auth/google/callback"
    },
    async (_accessToken, _refreshToken, profile, done) => {
      console.log(profile)
        try {
            const user = await User.findOne({googleID : profile.id}); // si el usuario no existe 
            if (!user) {
              let newUser = new User();
                  newUser.username = profile.displayName.replace(' ', '').toLowerCase() + '@nftmarketplace.com'
                  newUser.googleID = profile.id
                  newUser.firstName = profile.name.givenName
                  newUser.lastName = profile.name.familyName
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