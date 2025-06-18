import React from 'react'
import style from './Footer.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import pay1 from '../../../public/PaymentImgs/visa.png'
import pay2 from '../../../public/PaymentImgs/paypal.png'
import pay3 from '../../../public/PaymentImgs/master_card.png'
import pay4 from '../../../public/PaymentImgs/carte_bleue.png'
import pay5 from '../../../public/PaymentImgs/american_express.png'
import { Link } from 'react-router-dom'
export default function Footer () {
  return (
    <>
      <footer
        className={`bg-[#FAFAFA] my-4 px-6 py-8 footer ${style.footer} hover:cursor-pointer`}
      >
        <div className='top flex md:flex-row flex-col justify-between items-center mx-auto px-8 py-2 border-gray-300 border-b-[1px] border-solid w-4/5'>
          {/* shipping */}
          <div className='group flex flex-col items-center font-semibold shipping'>
            <i className='my-1 group-hover:text-[#9c27b0] text-5xl group-hover:translate-y-[-5px] duration-100 fa-solid fa-truck-fast'></i>
            <p className={`${style.iconName} my-1`}>Free Shipping</p>
            <p className={`${style.desc} my-1`}>For all Orders Over $100</p>
          </div>
          {/*  Days Returns */}
          <div className='group flex flex-col items-center font-semibold shipping'>
            <i className='my-1 group-hover:text-[#9c27b0] text-5xl fa-rotate-left group-hover:translate-y-[-5px] duration-100 fa-solid'></i>
            <p className={`${style.iconName} my-1`}>30 Days Returns</p>
            <p className={`${style.desc} my-1`}>For an Exchange Product</p>
          </div>
          {/*  Secured Payment
           */}
          <div className='group flex flex-col items-center font-semibold shipping'>
            <i className='my-1 group-hover:text-[#9c27b0] text-5xl group-hover:translate-y-[-5px] duration-100 fa-credit-card fa-solid'></i>
            <p className={`${style.iconName} my-1`}>Secured Payment</p>
            <p className={`${style.desc} my-1`}>Payment Cards Accepted</p>
          </div>
          {/*  Support 24/7 */}
          <div className='group flex flex-col items-center font-semibold shipping'>
            <i className='my-1 group-hover:text-[#9c27b0] text-5xl group-hover:translate-y-[-5px] duration-100 fa-headphones fa-solid'></i>
            <p className={`${style.iconName} my-1`}>Support 24/7</p>
            <p className={`${style.desc} my-1`}>Contact us Anytime</p>
          </div>
        </div>

        <div className='flex md:flex-row flex-col justify-between items-center my-4 px-8 py-4 border-gray-300 border-b-[1px] border-solid center'>
          <div className='first'>
            <p className={`my-4 font-bold ${style.contact}`}>Contact us</p>
            <p className={`my-1 font-medium ${style.desc} `}>
              Shoplet – Everything You Need, All in One Place
            </p>

            {/* gmail */}
            <div className='my-2 gmail'>
              <p
                className={`gmail hover:text-[#9c27b0] ${style.gmail} font-medium text-[#616161]`}
              >
                Shoplet@gmail.com
              </p>
            </div>

            {/* phoneNum */}
            <div className='my-4 phone'>
              <p className={`font-semibold text-[#9c27b0]  ${style.phoneNum}`}>
                (+20) 01119121377
              </p>
            </div>
            {/* online chat */}
            <div
              className={`flex md:flex-row flex-col items-center gap-2 online ${style.online} `}
            >
              <i className='text-[#9c27b0] text-4xl fa-solid fa-message'></i>
              <div className='flex flex-col justify-center gap-1'>
                <p className='font-medium'>Online Chat</p>
                <p className='font-medium'>Get Expert Help</p>
              </div>
            </div>
          </div>

          {/* sec */}
          <div className='px-2 border-gray-300 border-l-2 sec'>
            <p className={`my-4 font-bold ${style.contact}`}>Products</p>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              Prices drop
            </p>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              New products
            </p>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              Best sales
            </p>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              Contact us
            </p>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              Sitemap
            </p>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              Stores
            </p>
          </div>

          {/* third */}
          <div className='px-2 third'>
            <p className={`my-4 font-bold ${style.contact}`}>Our company</p>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              Delivery
            </p>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              Legal Notice
            </p>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              Terms and conditions of use
            </p>
            <Link to='/about'>
              <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
                About us
              </p>
            </Link>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              Secure payment
            </p>
            <p className='p-1 font-medium hover:text-[#9c27b0] duration-200'>
              Login
            </p>
          </div>
          {/* fourth */}
          <div className='px-2 fourth'>
            <p className={`my-4 font-bold ${style.contact}`}>
              Subscribe to newsletter
            </p>
            <p className={`mt-1 mb-3 font-medium ${style.desc} text-gray-800 `}>
              Subscribe to our latest newsletter to get news about special
              discounts.
            </p>
            <TextField
              id='outlined-basic'
              label='gmail'
              variant='outlined'
              className='w-full'
              sx={{
                '& label.Mui-focused': {
                  color: '#9c27b0'
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#9c27b0'
                  }
                }
              }}
            />

            <Button
              sx={{
                backgroundColor: '#9c27b0',
                color: '#fff',
                margin: '16px 0'
              }}
              color='secondary'
              className='px-4 py-2 rounded'
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* bottom */}
        <div className='bottom flex md:flex-row flex-col justify-between items-center gap-2 py-2'>
          <div className='flex flex-row gap-3 text-2xl icons'>
            <i className='hover:bg-[#9c27b0] p-2 border border-gray-300 rounded-[50%] w-10 h-10 hover:text-white text-center duration-300 fa-brands fa-facebook-f'></i>
            <i className='hover:bg-[#9c27b0] p-2 border border-gray-300 rounded-[50%] w-10 h-10 hover:text-white text-center duration-300 fa-brands fa-youtube'></i>
            <i className='hover:bg-[#9c27b0] p-2 border border-gray-300 rounded-[50%] w-10 h-10 hover:text-white text-center duration-300 fa-brands fa-pinterest-p'></i>
            <i className='hover:bg-[#9c27b0] p-2 border border-gray-300 rounded-[50%] w-10 h-10 hover:text-white text-center duration-300 fa-brands fa-instagram'></i>
          </div>
          <p className={`${style.ecommerce} font-medium`}>
            © 2025 - Ecommerce Shoplet
          </p>
          {/* payments */}
          <div className='flex flex-row items-center payments'>
            <img src={pay1} alt='' />
            <img src={pay2} alt='' />
            <img src={pay3} alt='' />
            <img src={pay4} alt='' />
            <img src={pay5} alt='' />
          </div>
        </div>
      </footer>
    </>
  )
}
