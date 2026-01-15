CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM('file', 'folder') NOT NULL,
  parent_id INT NULL,
  path VARCHAR(1024) NULL,
  mime_type VARCHAR(100) NULL,
  size_bytes BIGINT NULL,
  storage_key VARCHAR(512) NULL,
  description TEXT NULL,
  tags JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  CONSTRAINT fk_documents_parent FOREIGN KEY (parent_id) REFERENCES documents(id)
);

CREATE INDEX idx_documents_parent ON documents(parent_id);
CREATE INDEX idx_documents_type ON documents(type);
CREATE INDEX idx_documents_name ON documents(name);
CREATE INDEX idx_documents_deleted ON documents(deleted_at);
