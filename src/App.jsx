import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import HandleHeartContext from './Context/HandleHeartContext'
import { Toaster } from 'react-hot-toast'
import Reviews from './Components/Reviews/Reviews'
import ProductsByCategory from './Components/ProductsByCategory/ProductsByCategory'
import SearchProvider from './Context/SearchProvider'
import Loadin from './Components/Loadin/Loadin'
import Notfound from './Components/Notfound/Notfound'
import SignUp from './Components/SignUp/SignUp'
import AboutUs from './Components/AboutUs/AboutUs'
import LogIn from './Components/Login/Login'
import Forget from './Components/Forget/Forget'
import Reset from './Components/Reset/Reset'
import UserContextProvider from './Context/UserContext '
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element:<ProtectedRoute><Home/></ProtectedRoute> },
        { path: '/home', element:<ProtectedRoute><Home/></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'reviews/:id', element: <ProtectedRoute><Reviews /></ProtectedRoute> },
        {
          path: 'productByCategory/:category',
          element: <ProtectedRoute><ProductsByCategory /></ProtectedRoute>
        },
        //temprary
        { path: 'signUp', element: <SignUp /> },
        { path: 'login', element: <LogIn /> },
        { path: '/forget', element: <Forget /> },
        { path: '/reset', element: <Reset /> },
        { path: 'about', element: <AboutUs /> },
        { path: '*', element: <Notfound /> }
      ]
    }
  ])
  return (
    <>
      <UserContextProvider>
        <SearchProvider>
          <HandleHeartContext>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </HandleHeartContext>
        </SearchProvider>
      </UserContextProvider>
    </>
  )
}

export default App
