const fs = require("fs/promises");
const filePath = process.env.CONTACTS_PATH;

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const result = JSON.parse(data);
  return result;
};

module.exports = listContacts;
