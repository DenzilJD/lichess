import React, { useEffect, useState } from 'react';
import axios from 'axios';

const recentGames_api = process.env.REACT_APP_RECENT;

export const RecentGames = ({ player }) => {

    const [games, setGames] = useState([]);

    //Requesting recent games
    useEffect(() => {
        const recentGames = async () => {
            if (!player)
                return;
            const data = await axios.get(recentGames_api + `?player=${player}&color=white&recentGames=5`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setGames(data.data.recentGames);
        }
        recentGames();
    }, [player]);

    const displayGames = games ? games.map(t =>
        <div className='flex w-screen hover:bg-slate-300' key={t.name}>
            <h1 className='w-1/6'>white</h1>
            <h1 className='w-1/6'>black</h1>
            <h1 className='w-1/6'>{t.winner}</h1>
            <h1 className='w-1/6'>{t.speed}</h1>
            <h1 className='w-1/6'>{t.mode}</h1>
            <a href={`https://lichess.org/${t.id}`} className='w-1/6 text-blue-600'>Game Link</a>
        </div>) : '';

    return (
        <div>{displayGames}</div>
    )
}