import React,{useContext, useEffect}  from 'react'
import './ExploreMenu.css'

import { StoreContext } from '../../Context/StoreContext.jsx'
import Loaderfrount from '../MyLottieAnimation/Loaderfrount.jsx';
const ExploreMenu = ({category,setCategory}) => {
   const {categorylist} =useContext(StoreContext);
   
//   useEffect(()=>{
//     if (!categorylist || categorylist.length === 0) {
//         return <Loaderfrount/>;
//       }
//   },[]);
    if(!category){
        setCategory((category)=>category="All");
      }
      console.log(categorylist);

  return (
    <section className='explore-menu' id='exploremenu'>
        
        <h1>Explore Menu</h1>
        <p className='explore-menu-text'>Choose From This Menu.</p>
        <div className="explore-menu-list">
            <div className="explore-menu-list-all">
            <img  onClick={()=>setCategory("All")}  className={category=="All"? "active" :null} src="\Images\allfoods.jpg" alt="all image"  />
            <p>All</p>
            </div>
            {     
           
                categorylist.map((item,i)=>{   
                    return (
                        <div onClick={()=>{setCategory(prev => prev===item.name ? "All" : item.name)}}  key={i} className='explore-menu-list-item'>
                            {categorylist==0? <div className='loader-frount-for-explore-menu'><Loaderfrount /></div>:null} 
                            <img  className={category===item.name ? "active" : " "} src={item.image} alt="items" />
                            <p>{item.name}</p>
                        </div>
                    )
                })
            }
        </div>
        <hr></hr>
    </section>
  )
}

export default ExploreMenu