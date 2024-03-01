import React, { useEffect } from 'react';
import axios from 'axios';

const search_api = process.env.REACT_APP_AUTOCOMPLETE;

export const Search = ({ searchItem, setSearchItem, setProfile,setSearchResults }) => {
    
    //Requesting autocomplete suggestions
    useEffect(() => {
        const func = async () => {
            if (searchItem.length < 3)
            {
                setSearchResults([]);
                return;
            }
            const data = await axios.get(search_api + `?term=${searchItem}&object=1`);
            setSearchResults(data.data.result);
            console.log(data);
        }
        func();
    }, [searchItem,setSearchResults]);

    return (
        <input
            style={{ border: '1px solid black' }}
            className='rounded-lg mt-24 h-16 text-4xl max-sm:text-lg max-sm:h-8 w-1/2 fixed border-black border-1 p-2 max-sm:w-full'
            placeholder='Search'
            type='text'
            value={searchItem}
            onChange={(e) => {
                setSearchItem(e.target.value);
                setProfile(false);
            }}
        />
    )
}