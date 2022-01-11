const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.json({
    status: 200,
    message: `Contact with name ${req.body.name} added to contacts`,
    data: {
      newContact,
    },
  });
};

module.exports = addContact;
