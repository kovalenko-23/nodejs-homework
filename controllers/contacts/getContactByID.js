const { NotFound } = require("http-errors");
const { getContactByID } = require("../../model/contacts");

const getByID = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await getContactByID(contactId);
  if (!result) {
    throw new NotFound(`contact with contactId: ${contactId} not found`);
  }
  res.json(result);
};

module.exports = getByID;
