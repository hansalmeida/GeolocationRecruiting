const { Router } = require("express")

const route = Router()

/**
 * Routes
 *
 * Can receive different kinds of requests
 * request.query (localhost/route?query=value)
 * request.params (localhost/:id/ == localhost/1/)
 * request.body usually info sent from a <form>
 */
route.get("/", (request, response) => {
  return response.json({ message: "ハンスです！宜しくお願い致します！" })
})

module.exports = route
