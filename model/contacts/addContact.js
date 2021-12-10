const fs = require("fs/promises");
const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const filePath = process.env.CONTACTS_PATH;

async function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
}

module.exports = addContact;
