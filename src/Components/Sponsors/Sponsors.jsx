import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import style from './Sponsors.module.css'


const sponsors = [
  'Google', 'Microsoft', 'Facebook', 'Amazon',
  'Apple', 'IBM', 'Oracle', 'Samsung', 'HP', 'Dell',
]

export default function Sponsors() {
  const [activeIndex, setActiveIndex] = useState(0)

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    beforeChange: (current, next) => setActiveIndex(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  return (
    <div className="bg-gray-100 py-6">
      <h2 className={`mb-6 font-bold text-3xl text-center ${style.sponsors}`}>Our Sponsors</h2>
      <Slider {...settings}>
        {sponsors.map((sponsor, index) => (
          <div key={index} className="text-center">
            <span
              className={` transition-all duration-500 font-medium  ${
                index === activeIndex ? 'text-[#9c27b0] text-2xl font-extrabold' : 'text-black text-xl'
              }`}
            >
              {sponsor}
            </span>
          </div>
        ))}
      </Slider>
    </div>
  )
}
