
import { Link, useNavigate } from 'react-router-dom'
import style from './LogIn.module.css'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { Formik, useFormik } from 'formik'
import { UserContext } from '../../Context/UserContext '

export default function LogIn () {
  let navigate = useNavigate()
  let [APIERR, setAPIERR] = useState(null)
  let [loadingSpinner, setloadingSpinner] = useState(false)
  let { setUserData } = useContext(UserContext)

  async function loginForm (values) {
    console.log('the values of login ', values)
    try {
      setloadingSpinner(true)
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      )
      console.log('the data of register', data)
      localStorage.setItem('userToken', data.token)
      localStorage.setItem('userEmail',data.user.email)
      localStorage.setItem('userName',data.user.name)
      setUserData(data.token) 
      navigate('/')
      setloadingSpinner(false)
      console.log('succcess log')
    } catch (err) {
      setAPIERR(err.response.data.message)
      setloadingSpinner(false)
    }
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email('email is invalid').required('email is required'),
    password: yup
      .string()
      .matches(/^[A-Z]\w{5,15}$/, 'password is invalid')
      .required('password is required')
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: loginForm
  })

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col justify-center items-center mx-auto max-w-md h-screen'
      >
        <p className='pb-14 font-semibold text-2xl'> Log in your account</p>
        {APIERR && (
          <div className='font-semibold text-red-600 text-center'>{APIERR}</div>
        )}

        <div className='group z-0 relative mb-5 w-full'>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type='email'
            name='email'
            id='email'
            className='peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 focus:border-[#9c27b0] dark:border-gray-600 border-b-2 focus:outline-none focus:ring-0 w-full text-gray-900 text-sm appearance-none dark:'
            placeholder=' '
            required
          />
          <label
            htmlFor='email'
            className='top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-gray-400 peer-focus:text-[#9c27b0] text-sm scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0'
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
            className='peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 focus:border-[#9c27b0] dark:border-gray-600 border-b-2 focus:outline-none focus:ring-0 w-full text-gray-900 text-sm appearance-none dark:'
            placeholder=' '
            required
          />
          <label
            htmlFor='password'
            className='top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-gray-400 peer-focus:text-[#9c27b0] text-sm scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0'
          >
            Password
          </label>
          {formik.touched.password && formik.errors.password ? (
            <div className='text-red-500'>{formik.errors.password}</div>
          ) : null}
        </div>

        <div className='mb-4'>
          <p className='text-center'>
            Don't have account?{' '}
            <Link
              className='font-medium text-[#9c27b0] underline'
              to='/signUp'
            >
              Register
            </Link>
          </p>
          <p className='text-center'>
            Forget Password ?{' '}
            <Link className='font-medium text-[#9c27b0] underline' to='/forget'>
              Tap here
            </Link>
          </p>
        </div>

        {loadingSpinner ? (
          <button
            type='submit'
            className='bg-[#9c27b0] hover:bg-[#9b27b0e3] dark:bg-[#9c27b0] px-6 py-3 rounded-lg focus:outline-none focus:ring-4 sm:w-auto text-sm text-center'
          >
            <i className='fa-solid fa-spinner fa-pulse'></i>
          </button>
        ) : (
          <button
            type='submit'
            className='bg-[#9c27b0] hover:bg-[#9b27b0e3] dark:bg-[#9c27b0] px-6 py-3 rounded-lg focus:outline-none focus:ring-4 sm:w-auto text-xl text-center'
          >
            Submit
          </button>
        )}
      </form>
    </>
  )
}