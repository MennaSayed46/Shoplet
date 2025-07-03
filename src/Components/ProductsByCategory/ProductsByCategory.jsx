import React, { useContext, useEffect, useState } from 'react'
import style from './ProductsByCategory.module.css'
import { Link, useParams } from 'react-router-dom'
import { handleHeartContext } from '../../Context/HandleHeartContext'
import Ratings from '../Ratings/Ratings'
import Loadin from '../Loadin/Loadin'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { AddToCart } from './../../Context/AddToCartProvider';
import { motion } from 'framer-motion'
export default function ProductsByCategory () {
  let { category } = useParams()
  const [productsByCategoryName, setProductsByCategoryName] = useState([])
    let { AddToCartFunc } = useContext(AddToCart)


  useEffect(() => {
    // console.log(category)
    window.scrollTo(0, 0)
    getProductsByCategoryName()
  }, [category])
  let { wishlist, handleHeart } = useContext(handleHeartContext)

  //function get products by categoryName
  async function getProductsByCategoryName () {
    try {
      let response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      )
      let data = await response.json()
      console.log(data.products)
      setProductsByCategoryName(data.products)
      console.log('productsByCategoryName', productsByCategoryName)
    } catch {
      console.log('error in get products by category name')
    }
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
  }, [])
  return (
    <>
      {productsByCategoryName?.length > 0 ? (
        <div className={`${style.productsContainer} hover:cursor-pointer`}>
          {productsByCategoryName.map(product => {
            const isInWishlist = wishlist.includes(product.id)
            return (
              <div
                key={product.id}
                className={`${style.productCard} group relative  overflow-x-hidden`}
              >
                {/* availabilityStatus */}
                <div className='top-0 right-0 absolute bg-gray-200 p-1 roundedavailabilityStatus'>
                  {product.availabilityStatus}
                </div>
                {/* discount */}
                <div className='top-0 left-0 absolute bg-[#9c27b0] p-1 roundedavailabilityStatus text-white'>
                  {product.discountPercentage} %
                </div>

                {/* wishlist */}
                <div className='top-24 right-0 absolute bg-gray-200 hover:bg-purple-100 p-2 rounded translate-x-[100%] group-hover:translate-x-[-10%] duration-300 wishlist'>
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
                    className={`w-full`}
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
                {/* add to cart */}
                <motion.button
                  className='relative mt-3 p-2 border-[#9c27b0] border-2 border-solid rounded w-full overflow-hidden text-[#9c27b0] text-center-md'
                  onClick={() => AddToCartFunc(product.id)}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: '#000',
                    color: '#fff',
                    borderColor: '#000'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                  }}
                >
                  <motion.i
                    className='px-1 fa-solid fa-cart-shopping'
                    whileHover={{
                      x: [0, -3, 0],
                      rotate: [0, -10, 0]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: 'loop'
                    }}
                  />
                  Add to cart
                </motion.button>
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
