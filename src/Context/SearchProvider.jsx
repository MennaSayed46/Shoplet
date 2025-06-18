import React, { createContext, useState } from 'react'
export let SearchContext  = createContext()

export default function SearchProvider ({ children }) {
  const [searchTerm, setSearchTerm] = useState('')

  function handleSearch (e) {
    setSearchTerm(e.target.value)
    console.log('typed', e.target.value)
  }

  return <SearchContext.Provider value={{searchTerm,setSearchTerm,handleSearch}}>{children}</SearchContext.Provider>
}
