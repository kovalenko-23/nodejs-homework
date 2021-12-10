const { NotFound } = require("http-errors");

const { updateContact } = require("../../model/contacts");

const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await updateContact(id, req.body);
  if (!updatedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      updatedContact,
    },
  });
};

module.exports = updateById;
