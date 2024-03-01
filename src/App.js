import { useState } from 'react';
import { RecentGames } from './Components/RecentGames';
import { Routes, Route } from 'react-router-dom';
import { Search } from './Components/Search';
import { Navbar } from './Components/Navbar';

function App() {
  const [searchItem, setSearchItem] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [profile, setProfile] = useState(false);
  const [player, setPlayer] = useState('');

  //Display search results

  const displayResults = searchResults ? searchResults.map(t =>
    <div className='flex w-full mb-1 justify-center' key={t.name}>
      <h2 className=' w-1/3 text-xl text-center text-green-300 hover:cursor-pointer underline hover:text-green-500 rounded-md hover:bg-slate-200' onClick={() => {
        setPlayer(t.name);
        setProfile(true);
      }}>{t.name}</h2>
      <a href={`https://lichess.org/@/${t.name}`} className='w-2/3 text-xl text-blue-300 underline hover:text-blue-500 rounded-md hover:bg-slate-200 overflow-hidden'>
        {`https://lichess.org/@/${t.name}`}
      </a>
    </div>) : '';

  return (
    <div>
      <div className='flex flex-col items-center h-full px-5 mb-20'>
        <Navbar />

        {/* Search results */}

        <Search
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          setProfile={setProfile}
          setSearchResults={setSearchResults}
        />
        {(profile === false&&displayResults.length>0) ?
          <div className='w-full flex justify-center mt-20 absolute z-10 transition'>
            <div className='w-1/2 max-sm:w-full max-sm:mx-5 flex flex-col items-center rounded-lg border-black border overflow-hidden bg-white'>
              <div className='flex w-full justify-center'>
                <h1 className='w-1/3 text-2xl text-center overflow-hidden'>Username</h1>
                <h1 className='w-2/3 text-2xl text-center overflow-hidden'>Lichess Handle</h1>
              </div>
              {displayResults}
            </div>
          </div> : ''}
      </div>
      <Routes>
        <Route path='/contact' element={<div></div>} />
        <Route path='/' element={
          <div className='flex flex-col w-full sm:mt-48'>
            <h1 className='text-4xl mb-4 inline max-sm:text-lg'>
              Recent games
              <span className='text-red-600 inline'>(This API is taking almost a minute to load)</span>
            </h1>
            <div className='flex w-full'>
              <h1 className='w-1/6 text-xl font-bold max-sm:text-sm'>Color ({player})</h1>
              <h1 className='w-1/6 text-xl font-bold max-sm:text-sm'>Color (Opponent)</h1>
              <h1 className='w-1/6 text-xl font-bold max-sm:text-sm'>Winner</h1>
              <h1 className='w-1/6 text-xl font-bold max-sm:text-sm'>Format</h1>
              <h1 className='w-1/6 text-xl font-bold max-sm:text-sm'>Mode</h1>
              <h1 className='w-1/6 text-xl font-bold max-sm:text-sm'>Game Link</h1>
            </div>
            <RecentGames player={player} />
          </div>
        }
        />
      </Routes>
    </div>
  );
}

export default App;
