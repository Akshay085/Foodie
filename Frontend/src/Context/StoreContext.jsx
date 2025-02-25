import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [foodlist, setFoodList] = useState([]);
  const [categorylist, setcategoryList] = useState([]);
  const [userData,setUserData]=useState([]);
   const [email,setEmail]=useState("");

  const addtoCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
       await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const removefromCart =async(itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
    }
  };
  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = foodlist.find((product) => product._id == item);
  //       totalAmount += itemInfo.price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // };
  const getTotalCartAmount = () => {
    if (foodlist.length === 0) {
      console.warn("Food list is empty, cannot calculate total price.");
      return 0;
    }
  
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodlist.find((product) => String(product._id) === item);
        if (!itemInfo) {
          console.warn(`Product with ID ${item} not found in foodlist`);
          continue;
        }
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  

  useEffect(() => {
    // const interval = setInterval(() => {
      fetchFoodlist();
      fetchCategorylist();  
    // }, 5000); 
  
    async function LoadData() {
        
        await fetchFoodlist();
        await fetchCategorylist();       
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            await loadCartdata(localStorage.getItem("token"));
          }    
          if (localStorage.getItem("user")) {
            setUserData(JSON.parse(localStorage.getItem("user")));
          }  
    }
    if (!foodlist.length) {
      LoadData();
    }
    // return () => clearInterval(interval); 
  }, [token]);
    

  const fetchFoodlist = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  };
  const fetchCategorylist = async () => {
    const response = await axios.get(url+"/api/category/list");
    setcategoryList(response.data.data)
  };
 
  const loadCartdata= async(token)=>{
    const  response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItem(response.data.cartData);
  }

  const contextValue = {
    foodlist,
    categorylist,
    cartItems,
    userData,
    url,
    token,
    email,
    setEmail,
    setCartItem,
    setUserData,
    addtoCart,
    removefromCart,
    getTotalCartAmount,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
