import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import { Link } from 'react-router-dom'
export default function Categories ({ direction = 'row', limit = null }) {
  const [categories, setCategories] = useState([])
  const [displayLimit, setDisplayLimit] = useState(limit)

  useEffect(() => {
    getCategories()
    if (limit === null) {
      const width = window.innerWidth
      if (width < 640) {
        setDisplayLimit(1)
      } else if (width < 1024) {
        setDisplayLimit(3)
      } else {
        setDisplayLimit(10)
      }
    } else {
      setDisplayLimit(limit)
    }
  }, [limit])

  async function getCategories () {
    const response = await fetch('https://dummyjson.com/products/categories')
    const data = await response.json()
    setCategories(data)
    console.log('categoreis', data)
  }

  const visibleCategories = displayLimit
    ? categories.slice(0, displayLimit)
    : categories

  return (
    <>
      {visibleCategories.length > 0 && (
        <div
          className={`flex gap-2 pb-2 ${direction === 'column' && 'flex-col'}`}
        >
          <div>
            <button className='p-1 font-semibold hover:text-[#9c27b0] text-center whitespace-nowrap'>
              <Link to='/'>Home</Link>
            </button>
          </div>

          {visibleCategories.map(category => (
            <div key={category} className=''>
              <button className='p-1 font-semibold hover:text-[#9c27b0] text-center whitespace-nowrap'>
                <Link to={`productByCategory/${category.slug}`}>
                  {' '}
                  {category.name}
                </Link>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
