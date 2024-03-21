import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game as GameType } from "../types";

// TODO þetta þarf að sækja úr vefþjónustu
const GAME: GameType = { id: 1, date: 'manythings', home: {name: 'thing', score: 1}, away: {name: 'thing-away', score: 2}}

const apiUrl = process.env.REACT_APP_API_URL;

export function Game() {
  const params = useParams();
  const id = params.id;

  // TODO gera að state
  const description = 'foo';
  const [name, setName] = useState<string>(GAME.date.toString())
  const [errors, setErrors] = useState(null)

  const [game, setGame] = useState<Array<GameType>>([{date: 'thigns', id: 1, home: {name: 'thing', score: 1}, away: {name: 'thing-away', score: 2}}])

  useEffect(() => {
    async function fetchData() {
      const url = new URL(`/games/${id}`, apiUrl);
        
      const result = await fetch(url.href);
    
      const response = await fetch(result.url);

      // await sleep(4000)
      
      const gameJson = await response.json();

      console.log('gameJson :>> ', gameJson);
      //console.log('gameJson[id] :>> ', gameJson[Number(id)]);
      //setName(gameJson[Number(id)].name)
      

      setGame(gameJson)
    }
    fetchData()
  }, [id])
  
  const onGameNameChange = (e: any) => {
    console.log(e.target.value);
    setName(e.target.value)
  }

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submitta', name);


    const url = new URL(`/games/${id}`, apiUrl);
        
    const result = await fetch(url.href);

    // Uppfæra game í gegnum API með því að senda gegnum fetch

    const response = await fetch(result.url, {
      body: JSON.stringify({
        name,
        description
      }),
      method: 'PATCH'
    })

    if (response.status === 400) {
      // Upp kom villa! birta villuskilaboð
      setErrors(await response.json())
    }
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div>
          <label>Heiti:</label>
          <input type="text" onChange={onGameNameChange} value={name} />
        </div>
        <button>Uppfæra!</button>
      </form>
      {errors && (<p>Villur við að uppfæra leik: {JSON.stringify(errors)}</p>)}
      <p>Nýtt heiti á leik verður: {name}</p>
      <p>Nýtt heiti á leik verður: {GAME.id}</p>
    </>
  )
}