
import React, { useState, useEffect, useContext } from "react";
import style from './Forget.module.css'
import { useFormik } from 'formik';
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import * as Yup from 'yup'



export default function Forget() {
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    let validationSchema = Yup.object().shape({
        email: Yup.string().email('email is invalid').required('email is required'),
    })

    let navigate = useNavigate();


    async function handleForget(values) {
        try {
            setIsLoading(true)
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
            console.log(data);
            
            if(data.statusMsg === 'success'){
                navigate('/reset')
            }
            setIsLoading(false)
        } 
        catch (error) {
            setIsLoading(false)
            setApiError(error?.data?.message)
        }
            

    }






    let formik = useFormik({
        initialValues: {

            email: '',
        

        },
        validationSchema: validationSchema,
        onSubmit: handleForget


    });



    useEffect(() => { }, [])

    return (
        <>
            <div className={`py-6 mx-auto mt-9 lg:w-5/6 ${style.centerY}`}>

                {apiError ? <div class="bg-red-50 mb-4 p-4 border-rose-800 rounded-lg text-red-600 text-sm" role="alert">
                    {apiError}
                </div> : null}
                <h2 className="mb-5 pt-6 font-bold text-[#9c27b0] text-3xl">Forget Password</h2>


                <form onSubmit={formik.handleSubmit} className="">


                    <div className="group z-0 relative mb-5 w-full">
                        <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" className="peer block bg-transparent px-0 py-2.5 border-0 border-gray-300 dark:border-gray-600 border-b-2 focus:outline-none focus:ring-0 w-full text-gray-900 text-sm appearance-none" placeholder=" " />
                        <label htmlFor="email" className="top-3 rtl:peer-focus:left-auto -z-10 absolute peer-focus:font-medium text-gray-500 dark:text-[#9c27b0] text-sm scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-6 rtl:peer-focus:translate-x-1/4 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 duration-300 transform peer-focus:start-0">Email :</label>
                    </div>
                    {formik.errors.email && formik.touched.email ? <div class="bg-red-50 mb-4 p-4 border-rose-800 rounded-lg text-red-600 text-sm" role="alert">
                        {formik.errors.email}
                    </div> : null}



                    <button type="submit" className="bg-[#9c27b0] hover:bg-[#9b27b0e3] ml-auto px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 sm:w-auto font-medium text-white text-sm text-center">
                        {isLoading ? <i className="fas fa-spinner fa-spin"></i> : `submit`}

                    </button>
                </form>
            </div>

        </>
    )
}
