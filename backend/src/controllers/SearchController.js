const Dev = require("../models/Dev")

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query
    const parseStringAsArray = require("../utils/parseStringAsArray")

    const techsArray = parseStringAsArray(techs)

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          // Max distance is returned in meters
          $maxDistance: 10000
        }
      }
    })

    return response.json({ devs })
  }
}
