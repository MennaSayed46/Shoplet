import React, { useContext, useEffect, useState } from 'react'
import style from './Search.module.css'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import DirectionsIcon from '@mui/icons-material/Directions'
import { SearchContext } from '../../Context/SearchProvider'
export default function Search () {
  const [SearchedProducts, setSearchedProducts] = useState([])
  let { searchTerm, setSearchTerm, handleSearch } = useContext(SearchContext)

  useEffect(() => {
    getProductsBySearchQuery(searchTerm)
  }, [searchTerm])

  //search function (get products through search)
  async function getProductsBySearchQuery (searchTerm) {
    try {
      if (!searchTerm.trim()) return;

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchTerm}`
      )
      const data = await response.json()
      console.log('searched', data.products)
      setSearchedProducts(data.products)
      localStorage.setItem('searchedProducts', JSON.stringify(data.products))
    } catch {
      console.log('error')
    }
  }

  return (
    <>
      <div className={`serach`}>
        <Paper
          component='form'
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400
          }}
        >
        
          <InputBase
            value={searchTerm}
            onChange={e => handleSearch(e)}
            sx={{ ml: 1, flex: 1 }}
            placeholder='Search For Products'
            inputProps={{ 'aria-label': 'Search For Products' }}
          />
          <IconButton
            type='button'
            sx={{ p: '10px' }}
            aria-label='search'
            color='secondary'
          >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
          <IconButton
            color='secondary'
            sx={{ p: '10px' }}
            aria-label='directions'
          >
            <DirectionsIcon />
          </IconButton>
        </Paper>
      </div>
    </>
  )
}
