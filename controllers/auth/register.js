const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
var gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({
      message: "Email in use",
    });
  }
  const avatarURL = gravatar.url(email);
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  try {
    const result = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });
    const subscription = result.subscription;
    res.status(201).json({
      user: {
        email,
        subscription,
        avatarURL,
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = register;
