import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { AddToCart } from '../../Context/AddToCartProvider'
import { handleHeartContext } from '../../Context/HandleHeartContext'

export default function Cart () {
  let { wishlist, handleHeart } = useContext(handleHeartContext)

  const { cartItems, setCartItems, AddToCartFunc } = useContext(AddToCart)
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    if (cartItems) {
      console.log(cartItems)
      console.log('cartItems.length', cartItems.length)
      setIsLoading(false)
    }
  }, [cartItems])

  const calculateTotal = () => {
    return (
      cartItems
        ?.reduce(
          (total, item) =>
            total +
            getDiscountedPrice(item.price, item.discountPercentage) *
              item.quantity,
          0
        )
        .toFixed(2) || 0
    )
  }

  const getTotalItems = () => {
    return cartItems?.reduce((total, item) => total + item.quantity, 0) || 0
  }

  const increaseQuantity = id => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQuantity = id => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }


  const removeItem = id => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const getDiscountedPrice = (price, discountPercentage) => {
    if (discountPercentage) {
      return (price * (1 - discountPercentage / 100)).toFixed(2)
    }
    return price.toFixed(2)
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='border-b-2 border-blue-500 rounded-full w-12 h-12 animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-br from-gray-50 to-gray-100 mx-auto p-6 max-w-6xl min-h-screen'>
      {/* Header */}
      <div className='mb-8 text-center'>
        <div className='flex justify-center items-center gap-3 mb-2'>
          <h1 className='group font-bold text-gray-800 text-3xl'>
            <i class='group-hover:text-[#9c27b0] text-2xl duration-300 group-hover:fa-beat fa-solid fa-cart-shopping'></i>
            Shopping Cart
          </h1>
        </div>
        <p className='text-gray-600'>
          {cartItems && cartItems.length > 0
            ? `You have ${getTotalItems()} items in your cart`
            : 'Your cart is empty'}
        </p>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className='gap-8 grid grid-cols-1 lg:grid-cols-3'>
          {/* Products List */}
          <div className='space-y-4 lg:col-span-2'>
            {cartItems.map(item => {
              const isInWishlist = wishlist.includes(item.id)
              return (
                <div
                  key={item.id}
                  className='bg-white shadow-lg hover:shadow-xl p-6 border border-gray-100 rounded-2xl transition-all duration-300'
                >
                  <div className='flex md:flex-row flex-col gap-6'>
                    {/* Product Image */}
                    <div className='group relative'>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className='shadow-md rounded-xl w-32 h-32 object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      {item.discountPercentage && (
                        <div className='-top-2 -right-2 absolute flex items-center gap-1 bg-[#9c27b0] px-2 py-1 rounded-full font-bold text-white text-sm'>
                          {item.discountPercentage}%
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className='flex flex-col flex-1 justify-between'>
                      <div>
                        <h3 className='mb-2 font-semibold text-gray-800 hover:text-[#9c27b0] text-xl transition-colors'>
                          {item.title}
                        </h3>
                        <div className='flex items-center gap-2 mb-3'>
                          {item.discountPercentage ? (
                            <>
                              <span className='font-bold text-green-600 text-2xl'>
                                $
                                {getDiscountedPrice(
                                  item.price,
                                  item.discountPercentage
                                )}
                              </span>
                              <span className='text-gray-500 text-lg line-through'>
                                ${item.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className='font-bold text-gray-800 text-2xl'>
                              ${item.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full'>
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className='hover:bg-gray-200 p-1 rounded-full transition-colors'
                            disabled={item.quantity <= 1}
                          >
                            <span
                              className={`text-sm font-bold ${
                                item.quantity <= 1
                                  ? 'text-gray-400'
                                  : 'text-gray-600'
                              }`}
                            >
                              −
                            </span>
                          </button>
                          <span className='min-w-[2rem] font-semibold text-lg text-center'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className='hover:bg-gray-200 p-1 rounded-full transition-colors'
                          >
                            <span className='font-bold text-gray-600 text-sm'>
                              +
                            </span>
                          </button>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex items-center gap-2'>
                          <button
                            className='hover:bg-pink-50 p-2 rounded-full text-pink-500 transition-colors'
                            onClick={() => handleHeart(item.id)}
                          >
                            <i
                              className={`text-xl ${
                                isInWishlist
                                  ? 'fa-solid fa-heart text-red-600 '
                                  : 'fa-regular fa-heart'
                              } px-1`}
                              onClick={() => handleHeart(item.id)}
                            ></i>
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className='hover:bg-red-50 p-2 rounded-full text-red-500 transition-colors'
                          >
                            <span className='text-lg'>🗑️</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className='text-right'>
                      <p className='mb-1 text-gray-500 text-sm'>Total</p>
                      <p className='font-bold text-green-600 text-2xl'>
                        $
                        {(
                          item.quantity *
                          (item.discountPercentage
                            ? parseFloat(
                                getDiscountedPrice(
                                  item.price,
                                  item.discountPercentage
                                )
                              )
                            : item.price)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='top-6 sticky bg-white shadow-lg p-6 border border-gray-100 rounded-2xl'>
              <h2 className='mb-6 font-bold text-gray-800 text-2xl text-center'>
                Order Summary
              </h2>

              <div className='space-y-4 mb-6'>
                <div className='flex justify-between text-gray-600'>
                  <span>Items Count:</span>
                  <span className='font-semibold'>{getTotalItems()}</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal:</span>
                  <span className='font-semibold'>${calculateTotal()}</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Shipping:</span>
                  <span className='font-semibold text-[#9c27b0]'>Free</span>
                </div>
                <hr className='border-gray-200' />
                <div className='flex justify-between font-bold text-gray-800 text-xl'>
                  <span>Total:</span>
                  <span className='text-green-600'>${calculateTotal()}</span>
                </div>
              </div>

              <button className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 shadow-lg py-4 rounded-xl w-full font-semibold text-white text-lg hover:scale-105 transition-all duration-300 transform'>
                Proceed to Checkout
              </button>

              <button className='bg-gray-100 hover:bg-gray-200 mt-3 py-3 rounded-xl w-full font-semibold text-gray-700 transition-colors'>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='py-16 text-center'>
          <div className='bg-white shadow-lg mx-auto p-12 rounded-2xl max-w-md'>
            <div className='flex justify-center items-center bg-gray-100 mx-auto mb-6 rounded-full w-16 h-16'>
              <span className='text-2xl'>🛒</span>
            </div>
            <h2 className='mb-4 font-bold text-gray-800 text-2xl'>
              Your cart is empty
            </h2>
            <p className='mb-8 text-gray-600'>
              You haven't added any products to your cart yet
            </p>
            <button className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 px-8 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 transform'>
              Start Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
