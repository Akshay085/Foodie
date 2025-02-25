import React from 'react'
 import Lottie from "lottie-react"
 import animationData from "../../assets/Animation.json";
 import './MyLottieAnimation.css'

const MyLottieAnimation = () => {
  return (
    <Lottie animationData={animationData} loop={true}  className="lottie-animation" />
  )
}

export default MyLottieAnimation