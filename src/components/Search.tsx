import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'

const Search = () => {
    const [ searchWord, setSearchWord] = useState<string>('')
    const navigate = useNavigate()

    const searchBrewery = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            navigate(`/search/${searchWord}`)
            setSearchWord('')
        }
    }

    return (
        <TextField id="outlined-search" label="Search" type="search"
        size='small'
        onKeyDown={searchBrewery}
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)} />
    )
}

export default Search