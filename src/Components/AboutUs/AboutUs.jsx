import React, { useEffect } from 'react'
import style from './AboutUs.module.css'
import img from '../../../public/AboutUs/Desktop - 1 (1).png'
import { Link } from 'react-router-dom'
export default function AboutUs() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <>
   <div className="flex md:flex-row flex-col justify-between items-center p-6 w-full parent">
     <div className="space-y-5 w-full text-gray-800">
        <h2 className={`font-bold text-[#9c27b0] text-4xl ${style.AboutUs}`}>About Us</h2>

        <p className="text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-[#9c27b0]">Shoplet</span> — a next-generation e-commerce platform built to redefine the way you shop online. Our mission is to bring you a seamless, enjoyable, and efficient shopping experience that combines innovation with convenience.
        </p>

        <p className="text-lg leading-relaxed">
          Shoplet is more than just a product catalog. It’s a modern shopping destination designed with care and built using cutting-edge web technologies. From intuitive navigation and smart search to curated product collections and interactive features, everything is crafted to make your journey smooth and satisfying.
        </p>

        <p className="text-lg leading-relaxed">
          While payment and checkout features are currently in development, our vision is to evolve Shoplet into a full-fledged online marketplace. We're committed to continuous improvement and innovation — this is just the beginning.
        </p>

        <p className="text-lg leading-relaxed">
          Thank you for visiting Shoplet. Stay tuned — the future of shopping is just a click away.
        </p>

        <p className="mt-6 font-medium text-gray-900 text-sm italic">
          Designed and developed with passion by <Link to={'https://github.com/MennaSayed46'}><span className={`font-bold ${style.name}`}>Menna Sayed</span></Link> , Front-End Developer.
        </p>
      </div>
    {/* img */}
    <div className="right w-full">
      <img src={img} alt="" />

    </div>
   </div>
      
    </>
  )
}
