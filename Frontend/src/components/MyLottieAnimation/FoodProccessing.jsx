import React from 'react'
import Lottie from "lottie-react"
import animationData from "../../assets/Animationfoodproceesing.json";

const FoodProccessing = () => {
    return (
        <div>
             <Lottie animationData={animationData} loop={true}  style={{ width: 100, height: 100 }} />
        </div>
    )
}

export default FoodProccessing