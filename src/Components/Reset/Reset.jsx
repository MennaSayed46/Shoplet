import React, { useState, useEffect, useContext } from 'react'
import style from './Reset.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Reset () {
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate()

  async function handleResetCode (formValues) {
    try {
      setIsLoading(true)
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        formValues
      )
      console.log(data)

      if (data.status === 'Success') {
        navigate('/NewPass')
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setApiError(error?.data?.message)
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: ''
    },
    onSubmit: handleResetCode
  })

  useEffect(() => {}, [])

  return (
    <>
      <div className={`py-6 mx-auto mt-9 lg:w-5/6 ${style.centerY}`}>
        {apiError ? (
          <div
            class='bg-red-50 mb-4 p-4 border-rose-800 rounded-lg text-red-600 text-sm'
            role='alert'
          >
            {apiError}
          </div>
        ) : null}
        <h2 className='mb-5 pt-6 font-bold text-green-600 text-3xl'>
          Reset code
        </h2>

        <form onSubmit={formik.handleSubmit} className=''>
          <div className='group z-0 relative mb-5 w-full'>
            <input
              id='resetCode'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              type='text'
              name='resetCode'
              className='peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 focus:border-green-600 dark:border-gray-600 dark:focus:border-green-500 border-b-2 focus:outline-none focus:ring-0 w-full text-gray-900 text-sm appearance-none'
              placeholder=' '
            />
            <label
              htmlFor='resetCode'
              className='top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-gray-400 peer-focus:dark:text-green-500 peer-focus:text-green-600 text-sm scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0'
            >
              Reset Code :
            </label>
          </div>

          <button
            type='submit'
            className='bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 ml-auto px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 sm:w-auto font-medium text-white text-sm text-center'
          >
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : `submit`}
          </button>
        </form>
      </div>
    </>
  )
}
