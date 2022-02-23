const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePasswords(password)) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  if (!user.verify) {
    throw new createError(404, "User is not verified");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10000h" });
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
