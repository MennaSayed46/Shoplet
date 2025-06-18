import { createContext, useState } from 'react'
import toast from 'react-hot-toast'

export let handleHeartContext = createContext()
export default function HandleHeartContext ({ children }) {
  const [wishlist, setWishlist] = useState([])

  function handleHeart (productID) {
    const isInWishlist = wishlist.includes(productID)

    if (isInWishlist) {
      //removing
      setWishlist(wishlist.filter(id => id !== productID))
    } else {
      //adding
      setWishlist([...wishlist, productID])
      toast.success('Added to Wishlist!')
    }
  }

  return (
    <handleHeartContext.Provider
      value={{wishlist , handleHeart }}
    >
      {children}
    </handleHeartContext.Provider>
  )
}
