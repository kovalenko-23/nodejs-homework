const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  res.json({
    status: 200,
    message: `Contact with name ${req.body.name} added to contacts`,
    data: {
      newContact,
    },
  });
};

module.exports = addContact;
