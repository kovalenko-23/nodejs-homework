const { User } = require("../../models");
const createError = require("http-errors");

const verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw createError(404);
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });
    res.json({
      message: "Verification succesful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
