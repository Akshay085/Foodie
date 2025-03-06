import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../Food-Item/FoodItem';
import Loaderfrount from '../MyLottieAnimation/Loaderfrount';
const FoodDisplay = ({category}) => {
    const {foodlist} =useContext(StoreContext);
    // if (!foodlist || foodlist.length === 0) {
    //     return <Loaderfrount />;
    // }
    const filteredFoodList = foodlist.filter(item => 
      category === undefined || category === 'All' || category === item.category
  );
  return (
    <div className='food-display' id="fooddisplay">
    <h2>Top Dishes Are Here.</h2>
    <div className="food-display-list">
        {/* {foodlist===0?<Loaderfrount />:null} */}
        {filteredFoodList.length > 0 ? (
            filteredFoodList.map((item, i) => (
                <FoodItem 
                    key={i} 
                    id={item._id} 
                    name={item.name} 
                    description={item.description} 
                    price={item.price} 
                    image={item.image} 
                />
            ))
        ) : (
            <p className="no-food-message">No food items available in this category.</p>
        )}
    </div>
</div>
);

}

export default FoodDisplay