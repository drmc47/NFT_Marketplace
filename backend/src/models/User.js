const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
  },
  firstName: String,
  lastName: String,
  // email: String,
  password: {
    type: String,
  },
  googleID: String,
  profilePic: String,

  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Roles",
    },
    { timestamps: true, versionKey: false },
  ],

  // roles: {
  //     type: String,
  //     enum: {
  //         values: ['admin', 'user']
  //     },
  //     default: 'user'
  // }
});

userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

module.exports = mongoose.model("users", userSchema);
