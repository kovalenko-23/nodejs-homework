const express = require("express");
const router = express.Router();

const { cntrlWrapper, auth, validation } = require("../../middlewares");
const { getCurrent, updateSuscrpition } = require("../../controllers/users");
const { updateUserSubsription } = require("../../models/user");

router.patch(
  "/",
  auth,
  validation(updateUserSubsription),
  cntrlWrapper(updateSuscrpition)
);
router.get("/current", auth, cntrlWrapper(getCurrent));

module.exports = router;
