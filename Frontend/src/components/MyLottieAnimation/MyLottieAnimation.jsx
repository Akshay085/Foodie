import React from 'react'
 import Lottie from "lottie-react"
 import animationData from "../../assets/Animation.json";

const MyLottieAnimation = () => {
  return (
    <Lottie animationData={animationData} loop={true}  style={{ width: 120, height: 60 }} />
  )
}

export default MyLottieAnimation