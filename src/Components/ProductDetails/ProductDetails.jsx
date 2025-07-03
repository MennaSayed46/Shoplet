
import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import Ratings from '../Ratings/Ratings'
import Button from '@mui/material/Button'
import { handleHeartContext } from '../../Context/HandleHeartContext'
import Reviews from '../Reviews/Reviews'
import Loadin from '../Loadin/Loadin'
import { AddToCart } from '../../Context/AddToCartProvider'

export default function ProductDetails () {
  const { id } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImg, setCurrentImg] = useState(null)
  const [count, setCount] = useState(1)
  const { wishlist, handleHeart } = useContext(handleHeartContext)
  const { AddToCartFunc } = useContext(AddToCart)
  const isInWishlist = productDetails && wishlist.includes(productDetails.id)
  const [descActive, setDescActive] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)

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

  function handleAddToCart () {
    if (productDetails) {
      AddToCartFunc({
        id: productDetails.id,
        title: productDetails.title,
        price: productDetails.price,
        thumbnail: productDetails.thumbnail,
        quantity: count,
        discountPercentage: productDetails.discountPercentage
      })
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getProductDetails(id)
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
    }, 3000)

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

  const discountedPrice = productDetails
    ? (
        productDetails.price /
        (1 - productDetails.discountPercentage / 100)
      ).toFixed(2)
    : 0

  return (
    <>
      {productDetails ? (
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
          {/* Main Product Section */}
          <div className='mx-auto px-4 py-8 max-w-7xl'>
            <div className='items-start gap-12 grid grid-cols-1 lg:grid-cols-2'>
              {/* Product Images */}
              <div className='space-y-6'>
                {/* Main Image */}
                <div className='group relative'>
                  <div className='bg-white shadow-2xl rounded-3xl aspect-square overflow-hidden'>
                    {imageLoading && (
                      <div className='absolute inset-0 bg-gray-200 rounded-3xl animate-pulse' />
                    )}
                    <img
                      src={currentImg}
                      alt={productDetails.title}
                      loading='lazy'
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                      onLoad={() => setImageLoading(false)}
                    />

                    {/* Discount Badge */}
                    {productDetails.discountPercentage > 0 && (
                      <div className='top-4 right-4 absolute bg-gradient-to-r from-red-500 to-pink-500 shadow-lg px-4 py-2 rounded-full font-bold text-white text-sm'>
                        -{productDetails.discountPercentage}% OFF
                      </div>
                    )}
                  </div>

                  {/* Image Navigation Dots */}
                  {productDetails.images && productDetails.images.length > 1 && (
                    <div className='flex justify-center gap-2 mt-4'>
                      {productDetails.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentIndex(index)
                            setCurrentImg(productDetails.images[index])
                          }}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex
                              ? 'bg-purple-600 w-8'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {productDetails.images && productDetails.images.length > 1 && (
                  <div className='gap-3 grid grid-cols-4'>
                    {productDetails.images.slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentIndex(index)
                          setCurrentImg(image)
                        }}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          index === currentIndex
                            ? 'border-purple-600 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${productDetails.title} ${index + 1}`}
                          className='w-full h-full object-cover'
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Information */}
              <div className='space-y-8'>
                {/* Title and Brand */}
                <div className='space-y-4'>
                  <h1 className='font-bold text-gray-800 text-4xl leading-tight'>
                    {productDetails.title}
                  </h1>
                  <div className='flex items-center gap-4'>
                    <span className='text-gray-600 text-lg'>Brand:</span>
                    <span className='bg-purple-50 px-4 py-2 rounded-full font-semibold text-purple-600 text-lg'>
                      {productDetails.brand}
                    </span>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className='flex items-center gap-8 bg-white shadow-lg p-4 rounded-2xl'>
                  <div className='flex items-center gap-3'>
                    <Ratings rating={productDetails.rating} />
                    <span className='text-gray-600 text-sm'>
                      {productDetails.rating}/5
                    </span>
                  </div>
                  <div className='text-sm'>
                    <span className='text-gray-600'>Reviews: </span>
                    <span className='font-semibold text-green-600'>
                      {productDetails.reviews.length}
                    </span>
                  </div>
                </div>

                {/* Price Section */}
                <div className='bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl'>
                  <div className='flex items-center gap-4 mb-2'>
                    {productDetails.discountPercentage > 0 && (
                      <span className='text-gray-500 text-2xl line-through'>
                        ${discountedPrice}
                      </span>
                    )}
                    <span className='font-bold text-purple-600 text-4xl'>
                      ${productDetails.price}
                    </span>
                  </div>
                  <div className='flex items-center gap-6 mt-4'>
                    <div className='flex items-center gap-2'>
                      <span className='text-gray-600 text-sm'>Stock:</span>
                      <span
                        className={`font-semibold px-3 py-1 rounded-full text-sm ${
                          productDetails.stock > 10
                            ? 'bg-green-100 text-green-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        {productDetails.stock} available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className='bg-white shadow-lg p-6 rounded-2xl'>
                  <h3 className='mb-3 font-semibold text-gray-800 text-xl'>
                    Description
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {productDetails.description}
                  </p>
                </div>

                {/* Return Policy */}
                <div className='bg-blue-50 p-4 border-blue-500 border-l-4 rounded-xl'>
                  <div className='flex items-center gap-2'>
                    <span className='text-blue-600'>🔄</span>
                    <span className='font-semibold text-blue-800'>
                      Return Policy:
                    </span>
                    <span className='text-blue-700'>
                      {productDetails.returnPolicy}
                    </span>
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className='space-y-6'>
                  {/* Quantity Selector */}
                  <div className='flex items-center gap-4'>
                    <span className='font-semibold text-gray-700 text-lg'>
                      Quantity:
                    </span>
                    <div className='flex items-center bg-white shadow-lg border-2 border-gray-200 rounded-xl overflow-hidden'>
                      <button
                        onClick={decrement}
                        disabled={count <= 1}
                        className='hover:bg-gray-100 disabled:opacity-50 p-3 transition-colors disabled:cursor-not-allowed'
                      >
                        <span className='font-bold text-gray-600 text-lg'>
                          −
                        </span>
                      </button>
                      <span className='bg-gray-50 px-6 py-3 font-bold text-gray-800 text-xl'>
                        {count}
                      </span>
                      <button
                        onClick={increment}
                        className='hover:bg-gray-100 p-3 transition-colors'
                      >
                        <span className='font-bold text-gray-600 text-lg'>
                          +
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex gap-4'>
                    <button
                      onClick={handleAddToCart}
                      className='flex flex-1 justify-center items-center gap-3 bg-gradient-to-r from-[#9c27b0] hover:from-purple-700 to-pink-600 hover:to-pink-800 shadow-lg px-8 py-4 rounded-2xl font-semibold text-white text-lg hover:scale-105 transition-all duration-300 transform'
                    >
                      <span className='text-xl'>🛒</span>
                      Add to Cart
                    </button>

                    <button
                      onClick={() => handleHeart(productDetails.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 ${
                        isInWishlist
                          ? 'bg-red-50 border-red-300 text-red-600'
                          : 'bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600'
                      }`}
                    >
                      <i
                        className={`text-xl ${
                          isInWishlist
                            ? 'fa-solid fa-heart text-red-600 '
                            : 'fa-regular fa-heart'
                        } px-1`}
                        onClick={() => handleHeart(product.id)}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description and Reviews Section */}
          <div className='mx-auto px-4 py-8 max-w-7xl'>
            <div className='bg-white shadow-2xl rounded-3xl overflow-hidden'>
              {/* Tab Navigation */}
              <div className='flex border-gray-200 border-b'>
                <button
                  onClick={() => setDescActive(true)}
                  className={`flex-1 py-6 px-8 font-semibold text-lg transition-all duration-300 ${
                    descActive
                      ? 'text-purple-600 border-b-3 border-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  📄 Description
                </button>
                <button
                  onClick={() => setDescActive(false)}
                  className={`flex-1 py-6 px-8 font-semibold text-lg transition-all duration-300 ${
                    !descActive
                      ? 'text-purple-600 border-b-3 border-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  ⭐ Reviews ({productDetails.reviews.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className='p-8'>
                {descActive ? (
                  <div className='max-w-none prose prose-lg'>
                    <p className='text-gray-700 text-lg leading-relaxed'>
                      {productDetails.description}
                    </p>
                  </div>
                ) : (
                  <Reviews />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loadin />
      )}
    </>
  )
}
