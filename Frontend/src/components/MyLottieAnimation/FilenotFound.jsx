import React from 'react'
import Lottie from "lottie-react"
import animationData from "../../assets/Animation - filenotfound.json";

const FilenotFound = () => {
  return (
    <div>
         <Lottie animationData={animationData} loop={true}  />
    </div>
  )
}

export default FilenotFound