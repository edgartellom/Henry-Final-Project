import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addToCart, clearCart, decreaseCart, getTotals,removeFromCart} from "../../store/ShoppingCartRedux";  
import { Link } from "react-router-dom";
import axios from 'axios'

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  

  const cart2 = [...cart.cartItems, 1]
  const dispatch = useDispatch();

  const aux = cart.cartItems.map((i) => {
    const cartId = 'dfe38ca0-0ea1-4218-a509-d4c52ecdcc93'
    return {...i, cartId}
  })

  const aux2 = aux.map((e) => {
    const { cartQuantity, id, ...rest } = e;
    return { ...rest, quantity: cartQuantity, productId:id };
  })

  //console.log(aux)
  console.log(aux2)
  const userName = 'kevin'
  const userId = 123;
  const cartId = 'dfe38ca0-0ea1-4218-a509-d4c52ecdcc93'
  const cartDetailsId = '1060f91e-1f41-4417-a037-07162a205e9b'

  //"content-type": "application/x-www-form-urlencoded" // application/json

  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };

  // var res =  await axios.post(`http://localhost:3001/cartDetails`, {aux2}, {
  //     headers: {"content-type": "application/x-www-form-urlencoded"}
  //     })

  // const myObject = [{ 
  //   price: 10,
  //   quantity:5 , 
  //   cartId: "dfe38ca0-0ea1-4218-a509-d4c52ecdcc93", 
  //   productId: "6b2f9ed7-9539-4132-96c4-53b549c545ba"
  // }]

  const cartDB = async() => {
    const axus = await axios.get(`http://localhost:3001/cartDetails/${cartId}`)
    console.log(aux2)
    
   var res =  await axios.post(`http://localhost:3001/cartDetails`, aux2,  {
         headers: {"content-type": "application/x-www-form-urlencoded"}
         })

    console.log(res.data)
    console.log(axus.data)
  }

  useEffect(()=> {
  cartDB()
  },[])
 

  useEffect(() => {
   
    dispatch(getTotals());
    console.log(cart.cartItems)
    
  }, [cart, dispatch]);

  // useEffect(()=>{
  //   getCart()
  //   dispatch(addItem(data))
  //   //console.log(data)
  //   console.log(cart.cartItems)
  // },[])

  // const getCart = async () => {
  //   if(userId){
  //     const cartData = await axios.get(`http://localhost:3001/cartDetails/${cartId}`)
  //    //console.log(cartData.data)
  //     setData(cartData.data)
  //     //console.log(data)
  //   }
  // }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {/* {cart.cartItems.length === 0 ? ( */}
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/products">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    {/* <img src={cartItem.image[0]} alt={cartItem.name} /> */}
                    <div>
                      <h4>{cartItem.name}</h4>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${cartItem.price * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
                <Link to="/products">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;