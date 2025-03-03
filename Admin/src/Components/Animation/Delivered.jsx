import React from 'react'

import Lottie from 'lottie-react'
import  animationData from '../../assets/Animationfooddelivery.json'

const Delivered = () => {
  return (
    <div>
        <Lottie  animationData={animationData}  loop ={true} style={{width:60 , height:60}}/>
    </div>
  )
}

export default Delivered