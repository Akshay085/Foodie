import React from 'react'
import Lottie from 'lottie-react'
import  animationData from '../../assets/Animation - profileicon.json'
const Profileicon = () => {
  return (
    <div>
        <Lottie  animationData={animationData} loop={true} style={{height:50 , width:50 }}/>
    </div>
  )
}

export default Profileicon