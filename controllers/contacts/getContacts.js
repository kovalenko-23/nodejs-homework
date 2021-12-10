const { listContacts } = require("../../model/contacts");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
