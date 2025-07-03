import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export let AddToCart = createContext()

export default function AddToCartProvider ({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [cartItemsLength, setCartItemsLength] = useState(0)

  useEffect(() => {
    if (cartItems) {
      setCartItemsLength(cartItems.length)
    }
  }, [cartItems])

  async function AddToCartFunc (productID) {
    try {
      const response = await axios.post('https://dummyjson.com/carts/add', {
        userId: 1,
        products: [
          {
            id: productID,
            quantity: 1
          }
        ]
      })

      console.log('response.data in cart', response.data)
      setCartItems(prev => [...prev, ...response.data.products])
      toast.success('Added to cart successfully!')
      return response.data
    } catch (error) {
      console.log(
        'Error in the function of add to cart:',
        error.response?.data || error.message || error
      )
    }
  }

  return (
    <AddToCart.Provider value={{ cartItems, setCartItems, AddToCartFunc ,cartItemsLength}}>
      {children}
    </AddToCart.Provider>
  )
}
