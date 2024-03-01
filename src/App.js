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
    <div className='flex w-screen' key={t.name}>
      {(t.white.name === player) ? <h1 className='w-1/5'>White</h1> : <h1 className='w-1/5'>Black</h1>}
      {(t.white.name === player) ? <h1 className='w-1/5'>Black</h1> : <h1 className='w-1/5'>White</h1>}
      <h1 className='w-1/5'>{t.winner}</h1>
      <h1 className='w-1/5'>{t.speed}</h1>
      <h1 className='w-1/5'>{t.mode}</h1>
    </div>) : '';

  return (
    <div className='flex flex-col items-center h-screen px-5'>
      <header className="bg-white w-full flex items-center justify-center fixed top-0 max-sm:static -z-0 py-4 shadow-lg">
                <h1 className='text-5xl ml-4'>Lichess</h1>
                <nav className="ml-auto w-96 max-sm:hidden">
                    <ul className="flex justify-between mr-8">
                        <li>Home</li>
                        <li>Features</li>
                        <li>Contact Us</li>
                        <li className='text-red-600 hover:cursor-pointer'>Log Out</li>
                    </ul>
                </nav>
            </header>
      <input
        style={{ border: '1px solid black' }}
        className='rounded-lg h-16 mt-24 mb-12 max-sm:mt-5 text-4xl w-1/2 border-black border-1 p-2 max-sm:w-full'
        placeholder='Username'
        type='text'
        value={searchItem}
        onChange={(e) => {
          setSearchItem(e.target.value);
          setProfile(false);
        }}
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
          <h1 className='text-4xl mb-4 inline'>
            Recent games
            <span className='text-red-600 inline'>(This API is taking almost a minute to load)</span>
          </h1>
          <div className='flex w-full'>
            <h1 className='w-1/5'>Color ({player})</h1>
            <h1 className='w-1/5'>Color (Opponent)</h1>
            <h1 className='w-1/5'>Winner</h1>
            <h1 className='w-1/5'>Format</h1>
            <h1 className='w-1/5'>Mode</h1>
          </div>
          {displayGames}
        </div>
      }
    </div>
  );
}

export default App;
