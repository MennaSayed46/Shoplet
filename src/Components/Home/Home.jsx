import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import Ratings from '../Ratings/Ratings'
import { Link } from 'react-router-dom'
import { handleHeartContext } from '../../Context/HandleHeartContext'
import { SearchContext } from '../../Context/SearchProvider'
import Loadin from '../Loadin/Loadin'
// import { handleHeartContext } from '../../Context/handleHeartContext'

export default function Home () {
  const [data, setData] = useState({ products: [] })
  let { searchTerm, setSearchTerm, handleSearch } = useContext(SearchContext)
  let { wishlist, handleHeart } = useContext(handleHeartContext)
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    getProducts()
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setData({ products: allProducts })
    } else {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setData({ products: filtered })
    }
  }, [searchTerm, allProducts])

  async function getProducts () {
    const response = await fetch('https://dummyjson.com/products?limit=200')
    const data = await response.json()
    setAllProducts(data.products)
    setData({ products: data.products })

    // setData(data)
    localStorage.setItem('products', JSON.stringify(data.products))
    console.log(data.products)
  }

  return (
    <>
      {data.products.length > 0 ? (
        <div className={`${style.productsContainer} hover:cursor-pointer `}>
          {data.products.map(product => {
            const isInWishlist = wishlist.includes(product.id)
            return (
              <div
                key={product.id}
                className={`${style.productCard} group relative  overflow-x-hidden  `}
              >
                {/* availabilityStatus */}
                <div className='top-0 right-0 z-[10] absolute bg-gray-200 p-1 roundedavailabilityStatus'>
                  {product.availabilityStatus}
                </div>
                {/* discount */}
                <div className='top-0 left-0 z-[10] absolute bg-[#9c27b0] p-1 roundedavailabilityStatus text-white'>
                  {product.discountPercentage} %
                </div>

                {/* wishlist */}
                <div className='top-24 right-0 z-[10] absolute bg-gray-200 hover:bg-purple-100 p-2 rounded translate-x-[100%] group-hover:translate-x-[-10%] duration-300 wishlist'>
                  <i
                    className={`text-xl ${
                      isInWishlist
                        ? 'fa-solid fa-heart text-red-600 '
                        : 'fa-regular fa-heart'
                    } px-1`}
                    onClick={() => handleHeart(product.id)}
                  ></i>
                </div>

                <Link
                  to={`/productDetails/${product.id}`}
                  onClick={() => console.log('Link clicked')}
                >
                  {/* image */}
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className='z-1 group-hover:brightness-75 w-full h-auto object-cover group-hover:scale-105 transition duration-500 ease-in-out *: transform'
                  />

                  {/* title */}
                  <p className={`${style.producTitle} text-[#1e1e1e]`}>
                    {product.title}
                  </p>
                  {/* desc */}
                  <p
                    className={`${style.desc} overflow-hidden whitespace-nowrap text-ellipsis font-medium group-hover:text-[#9c27b0]`}
                  >
                    {product.description}
                  </p>
                  {/* ratings */}
                  <div className='my-1 rating'>
                    <Ratings rating={product.rating} />
                  </div>

                  {/* pre and post price */}
                  <div className='flex flex-row justify-between cost'>
                    <p className='font-normal text-[#717171] line-through'>
                      (
                      {(
                        product.price /
                        (1 - product.discountPercentage / 100)
                      ).toFixed(1)}
                      ) $
                    </p>
                    <p className='font-bold text-[#9c27b0]'>
                      {product.price} $
                    </p>
                  </div>
                </Link>

                {/* add to cart */}
                <button
                  className={`border-2 mt-3 border-solid border-[#9c27b0] w-full text-center text-[#9c27b0]  hover:bg-black hover:text-white hover:border-none`}
                >
                  {' '}
                  <i className='px-1 fa-solid fa-cart-shopping'></i>Add to cart
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <Loadin />
      )}
    </>
  )
}
