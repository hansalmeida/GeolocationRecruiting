import React, { useEffect, useState } from "react"

import "./global.scss"
import "./App.scss"
import "./Sidebar.scss"
import "./Main.scss"

export default function App() {
  const [githubUsername, setGithubUsername] = useState("")
  const [techs, setTechs] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

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

  async function handleAddDev(e) {
    e.preventDefault()
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
          <li className="dev-item">
            <header>
              <img
                src="https://avatars3.githubusercontent.com/u/42522040?s=460&v=4"
                alt="Hans Almeida"
              />
              <div className="user-info">
                <strong>Hans Almeida</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>A nice guy.</p>
            <a href="https://github.com/Snahier">Acessar página no Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars3.githubusercontent.com/u/42522040?s=460&v=4"
                alt="Hans Almeida"
              />
              <div className="user-info">
                <strong>Hans Almeida</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>A nice guy.</p>
            <a href="https://github.com/Snahier">Acessar página no Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars3.githubusercontent.com/u/42522040?s=460&v=4"
                alt="Hans Almeida"
              />
              <div className="user-info">
                <strong>Hans Almeida</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>A nice guy.</p>
            <a href="https://github.com/Snahier">Acessar página no Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars3.githubusercontent.com/u/42522040?s=460&v=4"
                alt="Hans Almeida"
              />
              <div className="user-info">
                <strong>Hans Almeida</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>A nice guy.</p>
            <a href="https://github.com/Snahier">Acessar página no Github</a>
          </li>
        </ul>
      </main>
    </div>
  )
}
