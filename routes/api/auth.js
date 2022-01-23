const express = require("express");
const router = express.Router();

const { cntrlWrapper, validation, auth } = require("../../middlewares");
const { register, login, logout } = require("../../controllers/auth");
const { userRegistrationSchema: registrationSchema } = require("../../models");

router.post("/signup", validation(registrationSchema), cntrlWrapper(register));

router.post("/login", validation(registrationSchema), cntrlWrapper(login));

router.get("/logout", auth, cntrlWrapper(logout));

module.exports = router;
