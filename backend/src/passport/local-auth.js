const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const Roles = require("../models/Role");
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = User.findById(id);
  done(null, user);
});

passport.use("local-signup", new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const found = await User.findOne({ username });
        if (found) {
          return done(null, false, { message: "YA TE REGISTRASTE ANTES " });
        }
        const user = new User({
          username,
          password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          profilePic: req.body.profilePic ? req.body.profilePic : "",
        });
        console.log(user, "llegaaaa");
        if (req.body.roles) {
          const rol = await Roles.find({ name: { $in: req.body.roles } });
          user.roles = rol.map((role) => role._id);
        } else {
          const foundRoles = await Roles.findOne({ name: "user" });
          user.roles = [foundRoles._id];
        }
        const savedUser = await user.save();
        console.log(savedUser, "acaaaaaaaaa");
        console.log(user, "SOY USER");
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use("local-login", new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    // //const userFound = await User.findOne({ email: req.body.email }).populate(
    //     "roles"
    //     );
    async (_req, username, password, done) => {
      try {
        const user = await User.findOne({ username }).populate("roles");
        if (!user) {
          done(null, false, {
            message: "MIRA LA VERDAD QUE ESE USUARIO NO SE ONDA",
          });
        }
        const validate = await user.validatePassword(password);
        if (!validate) {
          done(null, false, { message: "FIJATE LA PASSWORD SALAME" });
        }
        done(null, user, { message: "LOGUIN SACSESFOLY CAPO" });
      } catch (error) {
        done(error);
      }
    }
  )
);
