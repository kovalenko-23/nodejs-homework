const { User } = require("../../models/user");
const { NotFound } = require("http-errors");
require("dotenv").config();
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path } = req.file;
  const [fileName, extention] = req.file.originalname.split(".");
  const id = uuidv4();
  const avatarURL = `avatars/${id}.${extention}`;

  const user = await User.findByIdAndUpdate(_id, {
    avatarURL,
  });
  if (!user) {
    throw new NotFound();
  }

  Jimp.read(path)
    .then((image) => {
      image.resize(250, 250).write(`./public/avatars/${id}.${extention}`);
    })
    .catch((err) => {
      console.log(err.message);
    });

  fs.unlink(path);

  res.json({
    status: 200,
    message: "Updated",
    avatarURL,
  });
};

module.exports = updateAvatar;
