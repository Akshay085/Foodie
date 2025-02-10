import React from 'react'
import Lottie from "lottie-react"
import animationData from "../../assets/Animation - bag.json";

const Bag = () => {
  return (
    <div>
         <Lottie animationData={animationData} loop={true}  style={{ width: 100, height: 100 }} />
    </div>
  )
}

export default Bag