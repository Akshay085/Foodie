import React from 'react'
import Lottie from "lottie-react"
import animationData from "../../assets/loader.json";
const Loader = () => {
  return (
    <Lottie animationData={animationData} loop={true}   />
  )
}

export default Loader