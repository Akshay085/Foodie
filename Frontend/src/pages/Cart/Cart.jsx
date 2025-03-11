import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import DeliveryComponent from "../../components/DeliveryComponent/DeliveryComponent";
import { toast } from "react-hot-toast";
import EmptyCart from "../../components/MyLottieAnimation/EmptyCart";
import HouseIcon from '@mui/icons-material/House';
import Loaderfrount from "../../components/MyLottieAnimation/Loaderfrount";

const Cart = () => {
    const { cartItems, foodlist, addtoCart, removefromCart, getTotalCartAmount } = useContext(StoreContext);
    const [cartEmpty, setCartEmpty] = useState(false);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
        }
        setLoading(false); 
    }, [navigate]);

    useEffect(() => {
        if (!loading) { 
            const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);
            setCartEmpty(isCartEmpty);
            if (isCartEmpty) {
                toast("Please Add some items in to Cart");
            }
        }
    }, [cartItems, loading]);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    if (loading) {
        return <div><Loaderfrount /></div>;
    }

    return (
        <div className="cart">
            {cartEmpty ? (
                <div className="empty-cart">
                    <EmptyCart />
                    <br />
                    <h1>Cart Is Empty...</h1>
                    <button onClick={() => { navigate("/"); }}><HouseIcon /></button>
                    <br />
                </div>
            ) : (
                <>
                   
                    <div className="cartItems">
                        <div className="cart-item-titles">
                            <p>Items</p>
                            <p>Title</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                            <p>Add</p>
                            <p>Remove</p>
                        </div>
                        <br />
                        <hr />

                        {foodlist.map((item, index) => {
                            if (cartItems[item._id] > 0) {
                                return (
                                    <div className="main" key={index}>
                                        <div className="cart-item-titles cart-items-item">
                                            <img src={item.image} alt="" />
                                            <p>{item.name}</p>
                                            <p>{item.price}</p>
                                            <p>{cartItems[item._id]}</p>
                                            <p>₹{item.price * cartItems[item._id]}</p>
                                            <img onClick={() => addtoCart(item._id)} src="\Images\add_icon_green.png" />
                                            <img onClick={() => removefromCart(item._id)} src="\Images\remove_icon_red.png" />
                                        </div>
                                        <hr />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <DeliveryComponent />
                </>
            )}
        </div>
    );
};

export default Cart;