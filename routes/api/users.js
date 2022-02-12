const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  cntrlWrapper,
  auth,
  validation,
  uploadMiddleware,
} = require("../../middlewares");
const {
  getCurrent,
  updateSuscrpition,
  updateAvatar,
} = require("../../controllers/users");
const { updateUserSubsription } = require("../../models/user");

router.get("/current", auth, cntrlWrapper(getCurrent));
router.patch(
  "/",
  auth,
  validation(updateUserSubsription),
  cntrlWrapper(updateSuscrpition)
);
router.patch(
  "/avatars",
  auth,
  uploadMiddleware.single("avatar"),
  cntrlWrapper(updateAvatar)
);

module.exports = router;
