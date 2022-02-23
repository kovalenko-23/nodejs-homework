const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendMail } = require("../../helpers");

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
  const verificationToken = v4();
  try {
    const result = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    const newMail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a target='_blank' href='http://localhost:3001/users/verify/${verificationToken}'>Кликните для подтверджения пароля</a>`,
    };

    sendMail(newMail);

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
