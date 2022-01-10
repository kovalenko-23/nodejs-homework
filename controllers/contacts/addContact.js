const { addContact: add } = require("../../model/contacts");

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await add(name, email, phone);
  res.json({
    status: 200,
    message: `Contact with name ${name} added to contacts`,
    data: {
      newContact,
    },
  });
};

module.exports = addContact;
