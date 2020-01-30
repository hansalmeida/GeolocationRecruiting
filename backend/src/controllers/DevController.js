const axios = require("axios")
const Dev = require("../models/Dev")
const parseStringAsArray = require("../utils/parseStringAsArray")
const { findConnections, sendMessage } = require("../websocket")

/**
 * Rest has up to 5 methods:
 * Index (list all Devs)
 * Show (list one Dev)
 * Store (stores a new Dev)
 * Update (update an existing Dev's information)
 * Destroy (deletes that Dev from the database)
 */

module.exports = {
  async index(request, response) {
    const devs = await Dev.find()

    return response.json(devs)
  },
  async store(request, response) {
    const { githubUsername, techs, latitude, longitude } = request.body

    let dev = await Dev.findOne({ githubUsername })

    if (!dev) {
      // Gets user data from Github
      const apiResponse = await axios.get(
        `https://api.github.com/users/${githubUsername}`
      )

      /**
       * Destructure some data returned from Github's API
       * If there's no name from the data received since they're optional, the default will be the login
       */
      const { name = login, bio, avatar_url } = apiResponse.data

      const techsArray = parseStringAsArray(techs)

      // Longitude must always come before Latitude to be properly saved in mongoDb
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        githubUsername,
        name,
        avatarUrl: avatar_url,
        bio,
        techs: techsArray,
        location
      })

      /**
       * Filter Websocket
       * Looks for connections that are at 10km max distance
       * Looks for at least one tech filtered
       */
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      )
      sendMessage(sendSocketMessageTo, "newDev", dev)
    }

    return response.json(dev)
  }
}
