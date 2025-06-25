import React, { useContext, useState } from 'react'
import style from './SignUp.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext '
export default function SignUp () {
  let [loadingSpinner, setloadingSpinner] = useState(false)
  let navigate = useNavigate()
  let [APIERR, setAPIERR] = useState(null)
  let { UserData, setUserData } = useContext(UserContext)

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'min length is 3')
      .max(10, 'max length is 10')
      .required('the name is required'),
    email: yup.string().email('email is invalid').required('email is required'),
    password: yup
      .string()
      .matches(
        /^[A-Za-z][A-Za-z0-9@#$%!?]{5,15}$/,
        'Password must start with a letter, be 6–16 characters, and can include @ # $ % ! ?'
      )
      .required('Password is required'),

    rePassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('repassword is required'),
    phone: yup
      .string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, 'Invalid phone number')
      .required('phone is required')
  })

  async function handleSubmit (values) {
    try {
      setloadingSpinner(true)
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      )
      console.log('the data of register', data)
      localStorage.setItem('userToken', data.token)
      localStorage.setItem('userEmail', data.user.email)
      localStorage.setItem('userName', data.user.name)
      navigate('/')
      setloadingSpinner(false)
      setUserData(data.token)
    } catch (err) {
      setAPIERR(err.response.data.message)
      setloadingSpinner(false)
    }
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema
  })
  return (
    <>
      <div className='flex md:flex-row flex-col bg-red-600 mb-4 w-full h-auto md:h-[90vh] parent'>
        {/* left */}
        <div className='left relative flex flex-row gap-6 bg-[#9c27b0] p-6 w-full'>
          <div className='top-0 bottom-0 absolute inset-x-0 bg-[#000000] opacity-50'></div>

          <div className='z-20 relative inset-0 flex flex-col text-white'>
            <p className={`m-4 ${style.shoplet} font-semibold`}>Shoplet</p>
            <div className='flex flex-col gap-1 mt-9 py-12'>
              <p className={`mx-12   ${style.sentence}`}>Browse, wishlist</p>
              <p className={`mx-12   ${style.sentence}`}>
                {' '}
                and enjoy a seamless{' '}
              </p>
              <p className={`mx-12   ${style.sentence}`}>
                {' '}
                shopping experience
              </p>
            </div>

            <p className={`${style.inf} mx-12 text-[#e1e1e1] font-semibold`}>
              Shoplet is your ultimate destination for discovering high-quality,
              affordable products across all categories — from fashion and
              beauty to electronics and home essentials. Whether you're browsing
              for inspiration or shopping with purpose, we've made it easy,
              fast, and fun.
            </p>
          </div>
        </div>

        {/* right */}
        <div className='right bg-[#efefec] p-6 w-full'>
          {/* form */}
          <p className={`p-6 font-semibold ${style.signUp}`}>Sign Up</p>

          <form
            onSubmit={formik.handleSubmit}
            className='flex flex-col justify-center items-center mx-auto max-w-md'
          >
            <div className='group z-0 relative mb-5 w-full'>
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='text'
                name='name'
                id='name'
                className='peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 focus:border-[#9c27b0] dark:border-gray-600 dark:focus:border-[#9c27b0] border-b-2 focus:outline-none focus:ring-0 w-full text-gray-900 text-sm appearance-none dark:'
                placeholder=' '
                required
              />
              <label
                htmlFor='name'
                className='top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-gray-400 peer-focus:dark:text-[#9c27b0] peer-focus:text-[#9c27b0] text-sm scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0'
              >
                Name
              </label>
              {formik.touched.name && formik.errors.name ? (
                <div className='text-red-500'>{formik.errors.name}</div>
              ) : null}
            </div>

            <div className='group z-0 relative mb-5 w-full'>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='email'
                name='email'
                id='email'
                className='peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 focus:border-[#9c27b0] dark:border-gray-600 dark:focus:border-[#9c27b0] border-b-2 focus:outline-none focus:ring-0 w-full text-gray-900 text-sm appearance-none dark:'
                placeholder=' '
                required
              />
              <label
                htmlFor='email'
                className='top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-gray-400 peer-focus:dark:text-[#9c27b0] peer-focus:text-[#9c27b0] text-sm scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0'
              >
                Email address
              </label>
              {formik.touched.email && formik.errors.email ? (
                <div className='text-red-500'>{formik.errors.email}</div>
              ) : null}
            </div>

            <div className='group z-0 relative mb-5 w-full'>
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='password'
                name='password'
                id='password'
                className='peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 focus:border-[#9c27b0] dark:border-gray-600 dark:focus:border-[#9c27b0] border-b-2 focus:outline-none focus:ring-0 w-full text-gray-900 text-sm appearance-none dark:'
                placeholder=' '
                required
              />
              <label
                htmlFor='password'
                className='top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-gray-400 peer-focus:dark:text-[#9c27b0] peer-focus:text-[#9c27b0] text-sm scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0'
              >
                Password
              </label>
              {formik.touched.password && formik.errors.password ? (
                <div className='text-red-500'>{formik.errors.password}</div>
              ) : null}
            </div>

            <div className='group z-0 relative mb-5 w-full'>
              <input
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='password'
                name='rePassword'
                id='rePassword'
                className='peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 focus:border-[#9c27b0] dark:border-gray-600 dark:focus:border-[#9c27b0] border-b-2 focus:outline-none focus:ring-0 w-full text-gray-900 text-sm appearance-none dark:'
                placeholder=' '
                required
              />
              <label
                htmlFor='rePassword'
                className='top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-gray-400 peer-focus:dark:text-[#9c27b0] peer-focus:text-[#9c27b0] text-sm scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0'
              >
                RePassword
              </label>
              {formik.touched.rePassword && formik.errors.rePassword ? (
                <div className='text-red-500'>{formik.errors.rePassword}</div>
              ) : null}
            </div>

            <div className='group z-0 relative mb-5 w-full'>
              <input
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='text'
                name='phone'
                id='phone'
                className='peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 focus:border-[#9c27b0] dark:border-gray-600 dark:focus:border-[#9c27b0] border-b-2 focus:outline-none focus:ring-0 w-full text-gray-900 text-sm appearance-none dark:'
                placeholder=' '
                required
              />
              <label
                htmlFor='phone'
                className='top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-gray-400 peer-focus:dark:text-[#9c27b0] peer-focus:text-[#9c27b0] text-sm scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0'
              >
                Phone
              </label>
              {formik.touched.phone && formik.errors.phone ? (
                <div className='text-red-500'>{formik.errors.phone}</div>
              ) : null}
            </div>

            {loadingSpinner ? (
              <button
                type='submit'
                className='dark:bg-[#9c27b0] px-6 py-3 rounded-lg focus:outline-none focus:ring-4 sm:w-auto text-xl text-center'
              >
                <i className='fa-solid fa-spinner fa-pulse'></i>
              </button>
            ) : (
              <button
                type='submit'
                className='bg-[#9b27b0f5] hover:bg-[#9b27b0e3] dark:bg-[#9c27b0] px-6 py-3 rounded-lg focus:outline-none focus:ring-4 sm:w-auto text-white text-white text-xl text-center'
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
