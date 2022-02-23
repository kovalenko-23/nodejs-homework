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
  resendVerificationEmail,
  verifyUser,
  getCurrent,
  updateSuscrpition,
  updateAvatar,
} = require("../../controllers/users");
const {
  updateUserSubsription,
  verifyEmailSchema,
} = require("../../models/user");

router.post(
  "/verify",
  validation(verifyEmailSchema),
  cntrlWrapper(resendVerificationEmail)
);

router.get("/verify/:verificationToken", cntrlWrapper(verifyUser));
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
