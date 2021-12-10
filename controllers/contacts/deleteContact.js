const { removeContact } = require("../../model/contacts");

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json({
    status: 200,
    message: "contact deleted",
  });
};

module.exports = remove;
