import React from 'react'
import Lottie from 'lottie-react'
 import  animationData from '../../assets/Animation.json'
const Logo = () => {
  return (
    <div>
        <Lottie  animationData={animationData}  loop ={true} style={{width:120, height:120}}/>
    </div>
  )
}

export default Logo