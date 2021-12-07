const express = require("express");
const router = express.Router();
const {
  addContact,
  deleteContact,
  getContactByID,
  getContacts,
  updateContact,
} = require("../../controllers/contacts");
const { contactsSchema } = require("../../schemas");
const { cntrlWrapper, validation } = require("../../middlewares");

router.get("/", getContacts);

router.get("/:contactId", getContactByID);

router.post("/", validation(contactsSchema), cntrlWrapper(addContact));

router.delete("/:contactId", deleteContact);

router.put("/:id", validation(contactsSchema), updateContact);

module.exports = router;
