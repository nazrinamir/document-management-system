require('dotenv').config()
const app = require('./app')
const { initDb } = require("./config/db")

const PORT = process.env.PORT || 5000

initDb()
  .then(() => {
    console.log("Database connected")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message)
    process.exit(1)
  })
