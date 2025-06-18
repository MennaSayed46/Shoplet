import React, { useEffect, useState } from 'react'
import style from './Reviews.module.css'
import { useParams } from 'react-router-dom'
import Ratings from '../Ratings/Ratings'

export default function Reviews () {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getReviews(id)
  }, [id])

  async function getReviews (id) {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`)
      const data = await res.json()
      setReviews(data.reviews || [])
      console.log('reviews', data.reviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  return (
    <>
      <h1>Reviews</h1>
      <div className={`w-full`}>
        {reviews.length > 0 &&
          reviews.map((review, index) => (
            <div
              key={index}
              className={` flex flex-row justify-between items-center w-full bg-gray-200 my-2 px-6 py-2 `}
            >
              <div className='left w-full'>
                  <p>{review.reviewerName}</p>
                  <p>{review.date}</p>
                  <p className='my-2 text-[#818181]'>{review.comment}</p>
              </div>

              <div className='right w-full'>
               <Ratings rating={review.rating} />
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
