const axios = require("axios")
const Dev = require("../models/Dev")

module.exports = {
  async store(request, response) {
    const { githubUsername, techs, latitude, longitude } = request.body

    const apiResponse = await axios.get(
      `https://api.github.com/users/${githubUsername}`
    )

    /**
     * Destructure some data returned from Github's API
     * If there's no name from the data received since they're optional, the default will be the login
     */
    const { name = login, bio, avatar_url } = apiResponse.data

    const techsArray = techs.split(",").map(tech => tech.trim())

    // Longitude must always come before Latitude to be properly saved in mongoDb
    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    }

    const dev = await Dev.create({
      githubUsername,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    })

    return response.json(dev)
  }
}
