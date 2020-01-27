const express = require("express")

const app = express()

// Routes
app.get("/", (request, response) => {
  return response.json({ message: "ハンスです！宜しくお願い致します！" })
})

// Port that express will be listening to
app.listen(3333)
