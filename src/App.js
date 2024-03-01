import { useEffect, useState } from 'react';
import axios from 'axios';

const search_api = process.env.REACT_APP_AUTOCOMPLETE;
const recentGames_api = process.env.REACT_APP_RECENT;

function App() {
  const [searchItem, setSearchItem] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [profile, setProfile] = useState(false);
  const [player, setPlayer] = useState('');
  const [games, setGames] = useState([]);

  useEffect(() => {
    const func = async () => {
      if (searchItem.length < 3)
        return;
      const data = await axios.get(search_api + `?term=${searchItem}&object=1`);
      setSearchResults(data.data.result);
      console.log(data);
    }
    func();
  }, [searchItem]);

  useEffect(() => {
    const recentGames = async () => {
      if (!player)
        return;
      const data = await axios.get(recentGames_api + `?player=${player}&color=white&recentGames=5`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(data.data.recentGames);
      setGames(data.data.recentGames);
    }
    recentGames();
  }, [player]);

  //Display search results

  const displayResults = searchResults ? searchResults.map(t =>
    <div className='flex w-screen' key={t.name}>
      <h2 className='text-xl w-1/3'>{t.name}</h2>
      <a href={`https://lichess.org/@/${t.name}`} className='w-1/3 text-xl text-blue-300'>{`https://lichess.org/@/${t.name}`}</a>
      <h2 className=' w-1/3 text-xl text-green-300 hover:cursor-pointer' onClick={() => {
        setPlayer(t.name);
        setProfile(true);
      }}>{t.name}</h2>
    </div>) : '';
  
  //Display Recent Games

  const displayGames = games ? games.map(t =>
    <div key={t.name}>
      {(t.white.name === player) ? <h1>White</h1> : <h1>Black</h1>}
      {(t.white.name !== player) ? <h1>Black</h1> : <h1>White</h1>}
      <h1>{t.winner}</h1>
      <h1>{t.speed}</h1>
      <h1>{t.mode}</h1>
    </div>) : '';

  return (
    <div className='flex flex-col items-center h-screen px-5'>
      <input
        style={{ border: '1px solid black' }}
        className='rounded-lg h-16 my-12 max-sm:mt-5 text-4xl w-1/2 border-black border-1 p-2 max-sm:w-full'
        placeholder='Username'
        type='text'
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      {(profile === false) ?
        <>
          <div className='flex w-full'>
            <h1 className='w-1/2 text-2xl'>Username</h1>
            <h1 className='w-1/2 text-2xl'>Lichess URL</h1>
            <h1 className='w-1/2 text-2xl'>Additional Info</h1>
          </div>
          <div>
            {displayResults}
          </div>
        </> :
        <div className='flex flex-col w-full'>
          <h1 className='text-4xl mb-4'>Recent Games</h1>
          <div className='flex w-full justify-between'>
            <h1>Color ({player})</h1>
            <h1>Color (Opponent)</h1>
            <h1>Winner</h1>
            <h1>Format</h1>
            <h1>Mode</h1>
          </div>
          {displayGames}
        </div>
      }
    </div>
  );
}

export default App;
