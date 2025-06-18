import React, { useEffect } from 'react'
import style from './Ratings.module.css'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
export default function Ratings ({ rating }) {
  useEffect(() => {
    // console.log(rating)
  }, [rating])

  const numericRating =
    typeof rating === 'number' ? Number(rating.toFixed(1)) : 0
  return (
    <>
      <Box sx={{ '& > legend': { mt: 2 } }}>
        <Rating
          name='read-only'
          value={numericRating}
          precision={0.1}
          readOnly
        />
      </Box>
    </>
  )
}

// import React from 'react'
// import Box from '@mui/material/Box'
// import Rating from '@mui/material/Rating'

// export default function Ratings({ rating }) {
//   const numericRating = typeof rating === 'number' ? Number(rating.toFixed(1)) : 0;

//   return (
//     <Box sx={{ '& > legend': { mt: 2 } }}>
//       <Rating name="read-only" value={numericRating} precision={0.1} readOnly />
//     </Box>
//   );
// }
