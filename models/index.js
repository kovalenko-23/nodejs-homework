const { joiSchema, Contact, favoriteJoiSchema } = require("./contact");
const { userRegistrationSchema, User } = require("./user");
module.exports = {
  Contact,
  User,
  joiSchema,
  favoriteJoiSchema,
  userRegistrationSchema,
};
