import React, { useEffect, useState } from "react"
import api from "./services/api"

import "./global.scss"
import "./App.scss"
import "./Sidebar.scss"
import "./Main.scss"
import DevItem from "./components/DevItem"
import DevForm from "./components/DevForm"

export default function App() {
  const [devs, setDevs] = useState([])

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
  async function handleAddDev(data) {
    const response = await api.post("/devs", data)

    setDevs([...devs, response.data])
  }

  return (
    <div id="App">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
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
