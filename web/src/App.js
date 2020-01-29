import React, { useEffect, useState } from "react"
import api from "./services/api"

import "./global.scss"
import "./App.scss"
import "./Sidebar.scss"
import "./Main.scss"
import DevItem from "./components/DevItem"

export default function App() {
  const [devs, setDevs] = useState([])

  const [githubUsername, setGithubUsername] = useState("")
  const [techs, setTechs] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  /**
   * Gets the user geolocation
   */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
      },
      err => {
        console.log(err)
      },
      {
        timeout: 30000
      }
    )
  }, [])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs")
      setDevs(response.data)
    }
    loadDevs()
  }, [])

  /**
   * Handles the Dev registry form
   */
  async function handleAddDev(e) {
    e.preventDefault()
    const response = await api.post("/devs", {
      githubUsername,
      techs,
      latitude,
      longitude
    })
    setGithubUsername("")
    setTechs("")

    setDevs([...devs, response.data])
  }

  return (
    <div id="App">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="githubUsername">Github ID</label>
            <input
              name="githubUsername"
              id="githubUsername"
              required
              value={githubUsername}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button>Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  )
}
