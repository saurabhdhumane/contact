const express = require("express");
const router = express.Router();
const { getContact, getContacts, updateContact, deleteContact, createContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");


router.use(validateToken)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
module.exports = router;