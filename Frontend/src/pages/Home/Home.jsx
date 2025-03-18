import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'

// import Appdownload from '../../components/AppDownload/Appdownload'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Advertisement from '../../components/Advertisement/Advertisement'
const Home = () => {
  const[category,setCategory]=useState("All");
 
  return (
    <div id="home">
      
      <Header />
      <Advertisement />
      <ExploreMenu  category={category} setCategory={setCategory} />
      <FoodDisplay  category={category} />
    </div>
  )
}

export default Home