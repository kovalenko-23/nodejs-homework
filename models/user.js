const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs/dist/bcrypt");

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    default: "starter",
    enum: ["starter", "pro", "business"],
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const userRegistrationSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
  avatarURL: Joi.string(),
  verify: Joi.boolean(),
  verificationToken: Joi.string(),
});

const updateUserSubsription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  userRegistrationSchema,
  updateUserSubsription,
  userSchema,
  verifyEmailSchema,
};
