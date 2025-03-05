import React from 'react'
import Lottie from "lottie-react"
import animationData from "../../assets/Animation - newloader.json";
const Loaderfrount = () => {
    return (
        <div>
        <Lottie animationData={animationData} loop={true}  style={{ textAlign:"center", width: 30, height: 30, transform: 'scale(3)' }} />
    </div>
      )
}

export default Loaderfrount