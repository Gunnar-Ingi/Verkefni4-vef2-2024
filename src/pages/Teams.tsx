import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Team } from "../types";

const apiUrl = process.env.REACT_APP_API_URL;

async function sleep(n: number) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {resolve(null)}, n)
  })
}

export function Teams() {
  const [teams, setTeams] = useState<Array<Team>>([{name: 'test', id: 1}])

  useEffect(() => {
    async function fetchData() {
      const url = new URL(`/teams`, apiUrl);

      const result = await fetch(url.href);
    
      const response = await fetch(result.url);

      // await sleep(4000)
      
      const teamsJson = await response.json();

      setTeams(teamsJson)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Teams</h2>
      <p>Here are the teams:</p>
      <ul>
        {teams.map((team) => {
          return (
            <li key={team.id}><Link to={`/teams/${team.id}`}>{team.name}</Link></li>
          )
        })}
      </ul>
    </div>
  );
}