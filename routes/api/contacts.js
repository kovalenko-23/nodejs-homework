const express = require("express");
const router = express.Router();
const {
  addContact,
  deleteContact,
  getContactByID,
  getContacts,
  updateContact,
  updateFavorite,
} = require("../../controllers/contacts");
const { joiSchema, favoriteJoiSchema } = require("../../models");
const { cntrlWrapper, validation, auth } = require("../../middlewares");

router.get("/", auth, cntrlWrapper(getContacts));

router.get("/:contactId", cntrlWrapper(getContactByID));

router.post("/", auth, validation(joiSchema), cntrlWrapper(addContact));

router.delete("/:contactId", cntrlWrapper(deleteContact));

router.put("/:id", validation(joiSchema), cntrlWrapper(updateContact));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  cntrlWrapper(updateFavorite)
);

module.exports = router;
