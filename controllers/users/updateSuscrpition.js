const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const updateSuscrpition = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(_id, { subscription });
  if (!user) {
    throw new NotFound();
  }
  res.json({
    status: 200,
    message: "Updated",
    data: {
      _id,
      email,
      subscription,
    },
  });
};

module.exports = updateSuscrpition;
