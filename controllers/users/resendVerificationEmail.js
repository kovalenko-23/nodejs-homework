const { User } = require("../../models");
const { sendMail } = require("../../helpers");
const createError = require("http-errors");

const resendVerifiactionEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404);
    }
    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }

    const newMail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a target='_blank'href='http://localhost:3001/users/verify/${user.verificationToken}'>Кликните для подтверджения пароля</a>`,
    };
    sendMail(newMail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifiactionEmail;
