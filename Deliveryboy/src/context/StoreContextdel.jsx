import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ( props ) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [itemId, setItemId] = useState(null); 

  const getToken = async () => {
    if (token && itemId) {  
      try {
        await axios.post(url + "/api/cart/add", { headers: { token } });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  useEffect(() => {
    getToken(); 
  }, [token, itemId]);

  const contextValues = {
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValues}>
       {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
