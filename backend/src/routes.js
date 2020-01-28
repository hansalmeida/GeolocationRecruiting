const { Router } = require("express")
const DevController = require("./controllers/DevController")

const route = Router()

/**
 * Routes
 *
 * Can receive different kinds of requests
 * request.query (localhost/route?query=value)
 * request.params (localhost/:id/ == localhost/1/)
 * request.body usually info sent from a <form>
 */
route.post("/devs", DevController.store)

module.exports = route
