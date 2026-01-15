const { getPool } = require("../config/db");

const normalizeTags = (tags) => {
  if (tags === undefined) return null;
  if (tags === null) return null;
  return typeof tags === "string" ? tags : JSON.stringify(tags);
};

const ensureParentFolder = async (parentId) => {
  if (!parentId) return;
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT id FROM documents WHERE id = ? AND type = 'folder' AND deleted_at IS NULL",
    [parentId]
  );
  if (rows.length === 0) {
    throw new Error("parent folder not found");
  }
};

const listDocuments = async ({ parentId }) => {
  const pool = getPool();
  if (parentId === null) {
    const [rows] = await pool.query(
      "SELECT * FROM documents WHERE parent_id IS NULL AND deleted_at IS NULL ORDER BY (type = 'folder') DESC, name ASC"
    );
    return rows;
  }

  const [rows] = await pool.query(
    "SELECT * FROM documents WHERE parent_id = ? AND deleted_at IS NULL ORDER BY (type = 'folder') DESC, name ASC",
    [parentId]
  );
  return rows;
};

const createDocument = async ({
  name,
  parentId,
  description,
  mimeType,
  sizeBytes,
  storageKey,
  tags,
  path,
  type,
}) => {
  if (!name) {
    throw new Error("name is required");
  }
  if (type !== "file" && type !== "folder") {
    throw new Error("invalid type");
  }

  await ensureParentFolder(parentId);

  const pool = getPool();
  const [result] = await pool.query(
    `INSERT INTO documents
      (name, type, parent_id, path, mime_type, size_bytes, storage_key, description, tags)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      type,
      parentId,
      path || null,
      mimeType || null,
      sizeBytes || null,
      storageKey || null,
      description || null,
      normalizeTags(tags),
    ]
  );

  const [rows] = await pool.query("SELECT * FROM documents WHERE id = ?", [
    result.insertId,
  ]);
  return rows[0];
};

const searchDocuments = async (q) => {
  const pool = getPool();
  const like = `%${q}%`;
  const [rows] = await pool.query(
    `SELECT * FROM documents
     WHERE deleted_at IS NULL
       AND (name LIKE ? OR description LIKE ? OR CAST(tags AS CHAR) LIKE ?)
     ORDER BY (type = 'folder') DESC, name ASC`,
    [like, like, like]
  );
  return rows;
};

const softDeleteDocument = async (id) => {
  const pool = getPool();
  const [result] = await pool.query(
    "UPDATE documents SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  listDocuments,
  createDocument,
  searchDocuments,
  softDeleteDocument,
};
