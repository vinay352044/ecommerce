import React from 'react'
import { useState } from 'react'
import useDebounceHook from './useDebounceHook'
const SearchBar = () => {
    const [searchTerm,setSearchTerm] = useState('')
  return (
    <input 
    type='text'
    placeholder='Search...'
    value={searchTerm}
    onChange={(e)=>setSearchTerm(e.target.value)}
    />
  )
}

export default SearchBar
