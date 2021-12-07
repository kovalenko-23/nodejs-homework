const fs = require("fs/promises");
const listContacts = require("./listContacts");
const filePath = require("./getPath")(__dirname);

async function updateContact(id, data) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id == id);

  if (!idx) {
    return null;
  }
  contacts[idx] = { id, ...data };
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = updateContact;
