const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")

const app = express()

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@omnistack-b22jm.mongodb.net/omnistack10geoLoc?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)

// This will make Express understand JSON data.
app.use(express.json())

// This will load all routes on "routes.js" file
app.use(routes)

// Port that express will be listening to
app.listen(3333)
