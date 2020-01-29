import React from "react"
import "./styles.scss"

export default function DevItem({ dev }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatarUrl} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar página no Github
      </a>
    </li>
  )
}
