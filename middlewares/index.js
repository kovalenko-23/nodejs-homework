const validation = require("./validation");
const cntrlWrapper = require("./ctrlWrapper");
const auth = require("./auth");
const uploadMiddleware = require("./multerDiscStorage");

module.exports = {
  validation,
  cntrlWrapper,
  auth,
  uploadMiddleware,
};
