import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import Ratings from '../Ratings/Ratings'
import Button from '@mui/material/Button'
import { handleHeartContext } from '../../Context/handleHeartContext'
import Reviews from '../Reviews/Reviews'
import Loadin from '../Loadin/Loadin'

export default function ProductDetails () {
  const { id } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImg, setCurrentImg] = useState(null)
  const [count, setCount] = useState(1)
  const { wishlist, handleHeart } = useContext(handleHeartContext)
  const isInWishlist = productDetails && wishlist.includes(productDetails.id)
  const [descActive, setDescActive] = useState(true)

  function handleReviews () {
    setDescActive(!descActive)
  }

  function increment () {
    if (count >= 1) {
      setCount(count + 1)
    }
  }

  function decrement () {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  useEffect(() => {
    getProductDetails(id);
  }, [id])

  useEffect(() => {
    if (!productDetails) return

    const images = productDetails.images || []

    if (images.length <= 1) {
      setCurrentIndex(0)
      setCurrentImg(productDetails.thumbnail)
      return
    }

    setCurrentImg(images[0])
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const newIndex = (prev + 1) % images.length
        setCurrentImg(images[newIndex])
        return newIndex
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [productDetails])

  async function getProductDetails (id) {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`)
      const data = await response.json()
      console.log('Fetched product:', data)
      setProductDetails(data)
    } catch (error) {
      console.error('Error fetching product details:', error)
    }
  }


  return (
    <>
      {productDetails?
      
      <>
      <div className='flex md:flex-row flex-col justify-between items-center md:items-start gap-6 parent'>
        {/* img */}
        <div className='left w-full md:w-[600px] object-fit-cover'>
          <img src={currentImg} alt={productDetails.title} className='w-full' />
        </div>

        {/* information of the product */}
        <div
          className={`right bg-gray bg-gray-200 min-h-[80vh] w-full  p-4 ${style.inforamtion} `}
        >
          <p className={`my-2  ${style.title} font-extrabold text-[#9c27b0]`}>
            {productDetails.title}
          </p>

          {/* brand && ratings && reviews */}
          <div className={`flex flex-row justify-between items-center w-1/2`}>
            {/* brand */}
            <div className='left'>
              <p className={`font-semibold ${style.brand} text-[#262626]`}>
                <span className='font-semibold text-[#7c7c7c]'>Brand :</span>
                {productDetails.brand}
              </p>
            </div>
            {/* ratings */}
            <div className='cenetr'>
              <Ratings rating={productDetails.rating} />
            </div>
            {/* reviews */}
            <div className='right'>
              <p className='font-bold text-[#16a34a]'>
                <span className='font-semibold text-[#2a2a2a]'>Reviews :</span>
                {productDetails.reviews.length}
              </p>
            </div>
          </div>

          <div
            className={`flex flex-row justify-between items-center my-1 w-1/2 ${style.inforamtion}`}
          >
            {/* price */}
            <div className='flex flex-row justify-between gap-12 cost'>
              <p className='font-normal text-[#717171] line-through'>
                (
                {(
                  productDetails.price /
                  (1 - productDetails.discountPercentage / 100)
                ).toFixed(1)}
                ) $
              </p>
              <p className='font-bold text-[#9c27b0]'>
                {productDetails.price} $
              </p>
            </div>

            {/* number of items available  in stock */}
            <div className={`numberOfItems`}>
              <p className='font-bold text-[#16a34a]'>
                <span className='font-semibold text-[#2a2a2a]'>
                  Available In Stock :
                </span>
                {productDetails.stock}
              </p>
            </div>
          </div>
          {/* desc */}
          <div className='my-3 w-5/6 font-medium text-[#3e3e3e] desc'>
            <p>{productDetails.description}</p>
          </div>

          <p className={`py-1 `}>
            <span className='font-semibold'>Return Policy :</span>{' '}
            {productDetails.returnPolicy}
          </p>

          {/* count && add to cart */}
          <div className={`flex flex-row items-center gap-6  w-3/4`}>
            {/* count */}
            <div className='relative flex items-center my-4 p-0 border-2 border-gray-300 border-solid rounded count'>
              {/* Displayed value */}
              <button className='px-4 py-1 rounded font-semibold text-black'>
                {count}
              </button>

              {/* Increment/Decrement buttons */}
              <div className='relative flex flex-col ml-2 h-full'>
                <button
                  className='bg-gray-100 hover:bg-purple-100 p-1 rounded-t'
                  onClick={() => increment()}
                >
                  ▲
                </button>
                <button
                  className='bg-gray-100 hover:bg-purple-100 p-1 rounded-b'
                  onClick={() => decrement()}
                >
                  ▼
                </button>
              </div>
            </div>

            {/* add to cart */}

            <button
              className={`border-2 mt-3 px-8 py-2 rounded border-solid  text-center bg-[#9c27b0] text-white  hover:bg-black hover:text-white hover:border-none`}
            >
              {' '}
              <i className='px-1 fa-solid fa-cart-shopping'></i>Add to cart
            </button>
          </div>

          {/* add to wishlist */}
          <div
            className='my-4 hover:cursor-pointer'
            onClick={() => handleHeart(productDetails.id)}
          >
            <p className='font-semibold'>
              <i
                className={`text-xl ${
                  isInWishlist
                    ? 'fa-solid fa-heart text-red-600'
                    : 'fa-regular fa-heart'
                } px-1`}
              ></i>
              Add to wishlist
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-row gap-12 mx-6 p-6'>
        <div
          className='border-[#9c27b0] border-b-2 border-solid cursor-pointer description'
          onClick={() => handleReviews()}
        >
          <p className={`${style.desc} text-[#9c27b0] font-semibold`}>
            Description
          </p>
        </div>

        <div
          className='border-[#9c27b0] border-b-2 border-solid cursor-pointer reviews'
          onClick={() => handleReviews()}
        >
          <p className={`${style.reviews} text-[#9c27b0] font-semibold`}>
            Reviews
          </p>
        </div>
      </div>

      <div
        className={`description w-full p-6 bg-white shadow-lg font-medium text-[#3e3e3e] `}
      >
        {descActive ? (
          <>{productDetails.description}</>
        ) : (
          <>
            <Reviews />
          </>
        )}
      </div>
      </>
      :<Loadin/>}
    </>
  )
}
