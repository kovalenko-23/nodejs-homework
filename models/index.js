const { joiSchema, Contact, favoriteJoiSchema } = require("./contact");
const { userRegistrationSchema, User, verifyEmailSchema } = require("./user");
module.exports = {
  Contact,
  User,
  joiSchema,
  favoriteJoiSchema,
  userRegistrationSchema,
  verifyEmailSchema,
};
