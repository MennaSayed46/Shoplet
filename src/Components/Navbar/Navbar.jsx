import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../../public/ShopletLogo.svg'
import Search from '../Search/Search'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { motion, AnimatePresence } from 'framer-motion'
import Categories from '../Categories/Categories'
import { UserContext } from '../../Context/UserContext '
import { useNavigate } from 'react-router-dom'

export default function Navbar () {
  const [openSideBar, setOpenSideBar] = useState(false)
  const userToken = localStorage.getItem('userToken')
  let { UserData, setUserData } = useContext(UserContext)
  const navigate = useNavigate()

  function LogOut () {
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')
  }

  const toggleSidebar = open => () => {
    setOpenSideBar(open)
  }

  useEffect(() => {
    console.log('user data', UserData)
  }, [UserData])

  return (
    <>
      <div className='top-0 z-50 fixed inset-x-0 flex flex-col'>
        {/* top */}
        <nav className='flex flex-row justify-between items-center bg-gray-100 px-4 md:px-20 py-2 w-full'>
          {UserData && (
            <IconButton
              onClick={toggleSidebar(true)}
              color='secondary'
              sx={{
                borderRadius: '50%',
                display: 'flex',
                left: 0,
                padding: '8px',
                '&:hover': {
                  backgroundColor: '#e0e0e0'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* left */}
          <div className='left flex flex-row items-center gap-2'>
            {/* logo */}
            <img src={logo} alt='shoplet_logo_image' className='w-[50px]' />
            <p className={`${style.shoplet} font-extrabold text-[20px]`}>
              Shoplet
            </p>
          </div>

          {UserData && (
            <>
              {/* center */}
              <div className='flex flex-row items-center gap-2 center'>
                <div className='hidden md:block'>
                  <Search />
                </div>
              </div>
            </>
          )}

          {/* right */}
          <div className='right flex flex-row items-center gap-2'>
            {UserData ? (
              <>
                {/* gmail */}
                <div className='group hidden md:flex flex-row justify-center items-center gap-2 hover:bg-gray-200 p-1 hover:cursor-pointer gmail'>
                  <Button
                    color='secondary'
                    sx={{
                      borderRadius: '50%',
                      minWidth: 0,
                      padding: '10px',
                      '&:hover': {
                        borderRadius: '50%'
                      }
                    }}
                  >
                    <i className='p-2 rounded-[50%] text-xl fa-solid fa-user'></i>
                  </Button>
                  <div className='details'>
                    <p className={`name font-semibold text-sm`}>
                      {localStorage.getItem('userName')}
                    </p>
                    <p className={`gmail text-[#8d8d8d]`}>
                      {localStorage.getItem('userEmail')}
                    </p>
                  </div>
                </div>

                {/* loved cart */}
                <Button
                  color='secondary'
                  sx={{
                    borderRadius: '50%',
                    minWidth: 0,
                    '&:hover': {
                      borderRadius: '50%'
                    }
                  }}
                >
                  <i className='p-2 text-xl fa-regular fa-heart'></i>
                </Button>

                {/* cart */}
                <Button
                  color='secondary'
                  sx={{
                    borderRadius: '50%',
                    minWidth: 0,
                    '&:hover': {
                      borderRadius: '50%'
                    }
                  }}
                >
                  <i className='p-2 text-xl fa-solid fa-cart-shopping'></i>
                </Button>

                {/* logout button */}
                <Button
                  onClick={LogOut}
                  color='secondary'
                  sx={{
                    borderRadius: '8px',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: '#e0e0e0'
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className='flex gap-2'>
                <Button
                  onClick={() => navigate('/login')}
                  color='secondary'
                  sx={{
                    borderRadius: '8px',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: '#e0e0e0'
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/signUp')}
                  color='secondary'
                  sx={{
                    borderRadius: '8px',
                    padding: '8px 16px',
                    backgroundColor: '#9c27b0',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#7b1fa2'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </nav>

        {UserData && (
          <nav
            className={`flex flex-row justify-between items-center bg-gray-100 px-20 py-2 border-gray-300 border-y-2 border-solid ${style.sortedNav}`}
          >
            <div
              className='left'
              onClick={toggleSidebar(true)}
              onClose={toggleSidebar(false)}
            >
              <Button
                className='flex justify-between items-center gap-4'
                color='secondary'
              >
                <div className='left flex flex-row justify-between items-center gap-1'>
                  <i className='fa-solid fa-bars-staggered'></i>
                  <p className={`${style.shopBy} font-bold`}>
                    Shop by categories
                  </p>
                </div>

                <div className='right'>
                  <i className='fa-caret-down fa-solid'></i>
                </div>
              </Button>
            </div>

            <div className='right flex-row'>
              <Categories />
            </div>
          </nav>
        )}
      </div>

      {UserData && (
        <Drawer anchor='left' open={openSideBar} onClose={toggleSidebar(false)}>
          <div className='relative p-4 w-[250px] h-full'>
            {/* closed btn */}
            <motion.button
              onClick={toggleSidebar(false)}
              initial={{ rotate: 0, scale: 1 }}
              animate={{ rotate: 90, scale: 1.1 }}
              exit={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className='top-4 right-4 absolute text-gray-600 hover:text-black text-2xl'
            >
              ✕
            </motion.button>

            <h2 className={`mt-10 mb-4 font-bold text-lg ${style.sorting}`}>
              Sort Products
            </h2>
            <Categories direction='column' limit={-1} />
          </div>
        </Drawer>
      )}
    </>
  )
}
