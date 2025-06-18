import React, { useState, CSSProperties } from 'react'
import style from './Loadin.module.css'
import { GridLoader, HashLoader } from 'react-spinners'

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
}

export default function Loadin () {
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState('#9c27b0')

  return (
     <div className="flex flex-row justify-center items-center w-full h-screen sweet-loading">
      

      <GridLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
