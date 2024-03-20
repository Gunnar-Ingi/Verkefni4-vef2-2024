import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Game } from "../types";

const apiUrl = process.env.REACT_APP_API_URL;

async function sleep(n: number) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {resolve(null)}, n)
  })
}

export function Games() {
  const [games, setGames] = useState<Array<Game>>([{date: new Date(8.64e15), id: 1}])

  useEffect(() => {
    async function fetchData() {
      const url = new URL(`/games`, apiUrl);
        
      const result = await fetch(url.href);
    
      const response = await fetch(result.url);

      // await sleep(4000)
      
      const gamesJson = await response.json();

      setGames(gamesJson)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Games</h2>
      <p>Here are the games:</p>
      <ul>
        {games.map((game) => {
          return (
            <li key={game.id}><Link to={`/games/${game.id}`}>{game.date.toString()}</Link></li>
          )
        })}
      </ul>
    </div>
  );
}