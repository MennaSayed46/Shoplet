import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import HandleHeartContext from './Context/handleHeartContext'
import { Toaster } from 'react-hot-toast'
import Reviews from './Components/Reviews/Reviews'
import ProductsByCategory from './Components/ProductsByCategory/ProductsByCategory'
import SearchProvider from './Context/SearchProvider'
import Loadin from './Components/Loadin/Loadin'
import Notfound from './Components/Notfound/Notfound'
import SignUp from './Components/SignUp/SignUp'
import AboutUs from './Components/AboutUs/AboutUs'

function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: 'productDetails/:id', element: <ProductDetails /> },
        { path: 'reviews/:id', element: <Reviews /> },
        { path: 'productByCategory/:category', element: <ProductsByCategory /> },
        //temprary
        {path:'signUp',element:<SignUp/>},
        {path:'about',element:<AboutUs/>},
        {path:'*',element:<Notfound/>}
      ]
    }
  ])
  return (
    <>
      <SearchProvider>
        <HandleHeartContext>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </HandleHeartContext>
      </SearchProvider>
    </>
  )
}

export default App
