import React from 'react'
import Lottie from 'lottie-react'
import  animationData from '../../assets/delBoyAnimation.json'
const DelBoy = () => {
  return (
    <div>
         <Lottie  animationData={animationData}  loop ={true} style={{width:60 , height:60}}/>
    </div>
  )
}

export default DelBoy