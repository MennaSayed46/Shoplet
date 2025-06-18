import React from 'react'
import style from './Notfound.module.css'
import NotFoundImg from '../../../public/NotFound(Figma).png'

export default function Notfound () {
  return (
    <>
      <div className='flex flex-row justify-center items-center bg-[#F2EFFC] notFound'>
        <img
          src={NotFoundImg}
          alt='NotFoundImg'
          className='w-[600px] h-1/5 object-fit-cover'
        />
      </div>
    </>
  )
}
