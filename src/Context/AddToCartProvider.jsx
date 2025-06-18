// import axios from 'axios'
// import React, { createContext, useState } from 'react'
// export let AddToCart = createContext()

// export default function AddToCartProvider ({ children }) {
//   const [cartItems, setCartItems] = useState([])
//   //function add to cart
//   async function AddToCart (userId, products) {
//     try {
//       const response = await axios.post('https://dummyjson.com/carts/add', {
//         userId,
//         products
//       })
//       console.log(response.data);
//       setCartItems(response.data)
//       return response.data
//     } catch {
//       console.log('Error in the function of add to cart')
//     }
//   }
//   return (
//     <>
//       <AddToCart.Provider value={{}}>{children}</AddToCart.Provider>
//     </>
//   )
// }
