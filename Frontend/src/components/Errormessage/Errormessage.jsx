import React from 'react'
import './Errormessage.css'
const Errormessage = ({message}) => {
    return (
        <div className='error'><h2>{message}</h2> </div>
  )
}

export default Errormessage