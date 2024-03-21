import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Team as TeamType } from "../types";
import { Container } from "../components/Container/Container";

const TEAM: TeamType = { id: 1, name: 'ThingwS', description: 'test description' }


const apiUrl = process.env.REACT_APP_API_URL;

export function AddTeam() {
  const params = useParams();
  const id = 1;

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
      setName('team')
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

    const response = await fetch(result.url, {
      body: JSON.stringify({
        name,
      }),
      method: 'POST',
      headers: {
        "Content-Type":"application/json" 
      },
      
    })

    if (response.status === 400) {
      // Upp kom villa! birta villuskilaboð
      setErrors(await response.json())
    }
  }

  return (
    <>
    <Container>
      <form onSubmit={onFormSubmit}>
        <div>
        <p>Insert new team</p>
          <label>Heiti:</label>
          <input type="text" onChange={onTeamNameChange} value={name} />
        </div>
        <button>Bæta við!</button>
      </form>
      {errors && (<p>Villur við að bæta við lið: {JSON.stringify(errors)}</p>)}
      <p>Nýtt liði verður: {name}</p>
    </Container>
    </>
  )
}