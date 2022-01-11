const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const getByID = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound(`contact with contactId: ${contactId} not found`);
  }
  res.json(result);
};

module.exports = getByID;
