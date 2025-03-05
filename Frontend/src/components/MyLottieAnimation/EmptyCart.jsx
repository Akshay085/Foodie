import React from 'react'
import Lottie from "lottie-react"
import animationData from "../../assets/Animation-cartempty.json";

const EmptyCart = () => {
  return (
    <div>
    <Lottie  className="empty-cart" animationData={animationData} loop={true}   />
     </div>
  )
}

export default EmptyCart