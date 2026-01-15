const express = require("express");
const {
  listDocuments,
  createDocument,
  createFolder,
  searchDocuments,
  softDeleteDocument,
} = require("../controllers/documentsController");

const router = express.Router();

router.get("/", listDocuments);
router.get("/search", searchDocuments);
router.post("/", createDocument);
router.post("/folders", createFolder);
router.delete("/:id", softDeleteDocument);

module.exports = router;
