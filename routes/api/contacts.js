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

router.get("/", cntrlWrapper(getContacts));

router.get("/:contactId", cntrlWrapper(getContactByID));

router.post("/", validation(contactsSchema), cntrlWrapper(addContact));

router.delete("/:contactId", cntrlWrapper(deleteContact));

router.put("/:id", validation(contactsSchema), cntrlWrapper(updateContact));

module.exports = router;
