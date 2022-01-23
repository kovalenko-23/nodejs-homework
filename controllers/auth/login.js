const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { BadRequest } = require("http-errors");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePasswords(password)) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  const subscription = user.subscription;
  res.status(200).json({
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;
