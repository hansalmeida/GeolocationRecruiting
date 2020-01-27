const express = require("express")

const app = express()

// This will make Express understand JSON data.
app.use(express.json())

/**
 * Routes
 *
 * Can receive different kinds of requests
 * request.query (localhost/route?query=value)
 * request.params (localhost/:id/ == localhost/1/)
 * request.body usually info sent from a <form>
 */
app.get("/", (request, response) => {
  return response.json({ message: "ハンスです！宜しくお願い致します！" })
})

// Port that express will be listening to
app.listen(3333)
