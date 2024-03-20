import { useState } from "react";
import { useParams } from "react-router-dom";
import { Game as GameType } from "../types";

// TODO þetta þarf að sækja úr vefþjónustu
const GAME: GameType = { id: 1, date: new Date(8.64e15)}

const apiUrl = process.env.REACT_APP_API_URL;

export function Game() {
  const params = useParams();
  const id = params.id;

  // TODO gera að state
  const description = 'foo';
  const [name, setName] = useState<string>(GAME.date.toString)
  const [errors, setErrors] = useState(null)
  
  const onTeamNameChange = (e: any) => {
    console.log(e.target.value);
    setName(e.target.value)
  }

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submitta', name);


    const url = new URL(`/teams/${id}`, apiUrl);
        
    const result = await fetch(url.href);

    // Uppfæra team í gegnum API með því að senda gegnum fetch

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
          <input type="text" onChange={onTeamNameChange} value={name} />
        </div>
        <button>Uppfæra!</button>
      </form>
      {errors && (<p>Villur við að uppfæra lið: {JSON.stringify(errors)}</p>)}
      <p>Nýtt heiti á liði verður: {name}</p>
    </>
  )
}