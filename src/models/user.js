const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid!");
    },
  },
  age: {
    type: Number,
    default: 1,
    validate(value) {
      if (value < 0) throw new Error("Age must greater than 0!");
    },
  },
  password: {
    type: String,
    trim: true,
    minLength: 7,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error("Password is invalid!");
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisissecretkey");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error({ error: "Invalid user!" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error({ error: "Email or pasword is invalid!" });
  return user;
};

/**Thuc hien middleware */
userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
