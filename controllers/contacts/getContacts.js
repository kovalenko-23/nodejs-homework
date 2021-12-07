const { listContacts } = require("../../model");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
