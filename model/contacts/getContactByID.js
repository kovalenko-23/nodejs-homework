const fs = require("fs/promises");
const listContacts = require("./listContacts");

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id == contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

module.exports = getContactById;
