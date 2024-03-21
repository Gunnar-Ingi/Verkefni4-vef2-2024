import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game as GameType } from "../types";
import { Container } from "../components/Container/Container";

// TODO þetta þarf að sækja úr vefþjónustu
const GAME: GameType = { id: 1, date: 'manythings', home: {name: 'thing', score: 1}, away: {name: 'thing-away', score: 2}}

const apiUrl = process.env.REACT_APP_API_URL;

export function Game() {
  const params = useParams();
  const id = params.id;

  // TODO gera að state
  const description = 'foo';
  const [errors, setErrors] = useState(null)
  const [game, setGame] = useState<Array<GameType>>([{date: 'thigns', id: 1, home: {name: 'thing', score: 1}, away: {name: 'thing-away', score: 2}}])
  const [nameHome, setNameHome] = useState<string>(GAME.home.name  || '')
  const [scoreHome, setScoreHome] = useState<number>(GAME.home.score)
  const [nameAway, setNameAway] = useState<string>(GAME.away.name  || '')
  const [scoreAway, setScoreAway] = useState<number>(GAME.away.score)
  const [name, setName] = useState<string>('WELL THEN')

  useEffect(() => {
    async function fetchData() {
      const url = new URL(`/games/${id}`, apiUrl);
        
      const result = await fetch(url.href);
    
      const response = await fetch(result.url);

      // await sleep(4000)
      
      const gameJson = await response.json();

      console.log('gameJson :>> ', gameJson.home.name);
      //console.log('gameJson[id] :>> ', gameJson[Number(id)]);
      //setName(gameJson[Number(id)].name)
    

      setNameHome(gameJson.home.name)
      setNameAway(gameJson.away.name)
      setScoreHome(gameJson.home.score)
      setScoreAway(gameJson.away.score)
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

    console.log('submitta', nameHome);


    const url = new URL(`/games/${id}`, apiUrl);
        
    const result = await fetch(url.href);

    // Uppfæra game í gegnum API með því að senda gegnum fetch

    const response = await fetch(result.url, {
      body: JSON.stringify({
        nameHome,
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
    <Container>
        <div>
        <p>{nameHome}, score: {scoreHome}</p>
        <p>{nameAway}, score: {scoreAway}</p>
        </div>
    </Container>
    </>
  )
}