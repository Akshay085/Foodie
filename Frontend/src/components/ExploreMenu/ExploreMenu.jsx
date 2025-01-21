import React from 'react'
import './ExploreMenu.css'
import menu_list from '../../assets/Menu.js'
const ExploreMenu = ({category,setCategory}) => {
    if(!category){
        setCategory((category)=>category="All");
      }
  return (
    <div className='explore-menu' id='exploremenu'>
        <h1>Explore Menu</h1>
        <p className='explore-menu-text'>Choose From This Menu.</p>
        <div className="explore-menu-list">
            {
                menu_list.map(({menu_image,menu_name},i)=>{
                    
                    return (
                        <div onClick={()=>{setCategory(prev => prev===menu_name ? "All" : menu_name)}}  key={i} className='explore-menu-list-item'>
                            <img  className={category===menu_name ? "active" : " "} src={menu_image} alt="items" />
                            <p>{menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
        <hr></hr>
    </div>
  )
}

export default ExploreMenu