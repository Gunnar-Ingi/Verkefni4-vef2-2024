import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Team as TeamType } from "../types";

const TEAM: TeamType = { id: 1, name: 'ThingwS', description: 'test description' }


const apiUrl = process.env.REACT_APP_API_URL;

export function Team() {
  const params = useParams();
  const id = params.id;

  //const [id, setId] = useState<number>(TEAM.id)
  const [name, setName] = useState<string>(TEAM.name)
  const [description, setDesc] = useState<string>(TEAM.description  || '')
  const [errors, setErrors] = useState(null)

  const [teams, setTeams] = useState<Array<TeamType>>([{name: 'test', id: 1}])

  useEffect(() => {
    async function fetchData() {
      const url = new URL(`/teams`, apiUrl);

      const result = await fetch(url.href);
    
      const response = await fetch(result.url);

      // await sleep(4000)
      
      const teamsJson = await response.json();
      //setName(teams[3].name)
      console.log('teamsJson[id] :>> ', teamsJson[Number(id)-1]);
      setName(teamsJson[Number(id)-1].name)
      setTeams(teamsJson)
    }
    fetchData()
  }, [])

  const onTeamNameChange = (e: any) => {
    console.log(e.target.value);
    setName(e.target.value)
  }

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submitta', name);


    const url = new URL(`/teams/`, apiUrl);
    
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
        <p>{name}</p>
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