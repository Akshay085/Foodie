import React from 'react'

import Lottie from 'lottie-react'
import  animationData from '../../assets/Animationfoodproceesing.json'

const Foodprocessing = () => {
  return (
    <div>
        <Lottie  animationData={animationData}  loop ={true} style={{width:60 , height:60}}/>
    </div>
  )
}

export default Foodprocessing