const express = require("express");
const cors = require("cors");
const documentsRoutes = require("./routes/documents");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "DMS Backend running" });
});

app.use("/documents", documentsRoutes);

module.exports = app;
