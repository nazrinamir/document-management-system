const documentsService = require("../services/documentsService");

const parseId = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

const listDocuments = async (req, res) => {
  try {
    const parentId = parseId(req.query.parentId);
    const documents = await documentsService.listDocuments({ parentId });
    res.json({ data: documents });
  } catch (err) {
    res.status(500).json({ error: "Failed to list documents" });
  }
};

const createDocument = async (req, res) => {
  try {
    const {
      name,
      parentId,
      description,
      mimeType,
      sizeBytes,
      storageKey,
      tags,
      path,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }

    const created = await documentsService.createDocument({
      name,
      parentId: parseId(parentId),
      description,
      mimeType,
      sizeBytes,
      storageKey,
      tags,
      path,
      type: "file",
    });

    res.status(201).json({ data: created });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createFolder = async (req, res) => {
  try {
    const { name, parentId, description, tags, path } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }

    const created = await documentsService.createDocument({
      name,
      parentId: parseId(parentId),
      description,
      tags,
      path,
      type: "folder",
    });

    res.status(201).json({ data: created });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const searchDocuments = async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return res.status(400).json({ error: "q is required" });
    }

    const results = await documentsService.searchDocuments(q);
    res.json({ data: results });
  } catch (err) {
    res.status(500).json({ error: "Failed to search documents" });
  }
};

const softDeleteDocument = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "invalid id" });
    }

    const deleted = await documentsService.softDeleteDocument(id);
    if (!deleted) {
      return res.status(404).json({ error: "document not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete document" });
  }
};

module.exports = {
  listDocuments,
  createDocument,
  createFolder,
  searchDocuments,
  softDeleteDocument,
};
