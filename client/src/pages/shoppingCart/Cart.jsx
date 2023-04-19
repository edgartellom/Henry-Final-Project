import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addToCart, clearCart, decreaseCart, getTotals,removeFromCart} from "../../store/ShoppingCartRedux";  
import { Link } from "react-router-dom";
import axios from 'axios'
import { fetchById } from "../../store/ShoppingCartRedux";

import { useUserContext } from "../../components/contexts/userContexts";
import useUserStore from "../../store/users";
import useCartStore from "../../store/shoppingCartZustand";

const Cart = () => {
  
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartList = useSelector((state) => state.cart.dataList)
  const [cart3, setCart3] = useState([])
  const getUserById = useUserStore((state) => state.getUserById);
  const current = useUserStore((state) => state.currentUser)
  const clearData = useCartStore((state) => state.clearCart)
  const cartZustand = useCartStore((state) => state.cart)

  const zustand = cartZustand.map((e) => {
    const { quantity, ...rest } = e;
    return { ...rest,  cartQuantity: quantity };
  })

  console.log(cartZustand)
  console.log(zustand)
  console.log(cart.cartItems)

  const finalCart =[...cart.cartItems,...zustand]

  const uniqueArray = [...new Set(cart.cartItems.concat(zustand))];
  console.log(uniqueArray)

  const carritoID = '0034cadd-0efe-4511-be19-9b680649f35d'

 

  const [userId, setUserId] = useState('')
  const [cartId, setCartId] = useState('')


  const { user } = useUserContext();
  
  useEffect(() => {
    if (user) {
      const obtenerUsuario = (async () => {
        const userDb = await getUserById(user.uid);
        if (userDb) {
          setUserId(userDb.id)
        }
      })();
      console.log(userId)
      console.log(current)
      console.log(finalCart)
    }
  }, [user]);

console.log(userId)
  useEffect(() => {
    getCartId()
  })

  const getCartId = async() => {
    console.log(userId)

  //este post es para crear id a los carritos con el id del usuario

  // const cartUid = await axios.post(`http://localhost:3001/carts`, {userId}, {
  //   headers: {"content-type": "application/json"}
  //})




//setCartId(cartUid.data.cartCreated.id)

  // console.log(cartUid)
  // console.log(cartUid.data.cartCreated.id)

  const aux = cart.cartItems.map((i) => {
    const carritoId = carritoID
    return {...i, carritoId}
  })

  console.log(aux)
  const aux2 = aux.map((e) => {
    const { cartQuantity, id, carritoId, ...rest } = e;
    return { ...rest, quantity: cartQuantity, productId:id, cartId:carritoId };
  })

  console.log(userId)

  console.log(aux2)
  // codigo sirve pero mal ubicado
  // var res =  await axios.post(`http://localhost:3001/cartDetails`, aux2, {
  //        headers: {"content-type": "application/json"}
  //   })
  //   console.log(res.data) 
  }
    
   
     
  //console.log(userDb)
  
//  const aux = cart.cartItems.map((i) => {
//     const carritoId = cartId
//     return {...i, carritoId}
//   })

//   const aux2 = aux.map((e) => {
//     const { cartQuantity, id, ...rest } = e;
//     return { ...rest, quantity: cartQuantity, productId:id };
//   })
  

  



  const userName = 'kelvin'
  const userId2 = 123
  const jsonId = 1;
  const cartId2 = 'dfe38ca0-0ea1-4218-a509-d4c52ecdcc93'
  const cartDetailsId = '1060f91e-1f41-4417-a037-07162a205e9b'

  //"content-type": "application/x-www-form-urlencoded" // application/json

  const cartDB = async() => {
    //const axus = await axios.get(`http://localhost:3001/cartDetails/${cartId}`)
    //setCart3([...axus.data, ...cart.cartItems])
    console.log(cart3)
   
    if(userName == 'kevin'){
    var res =  await axios.post(`http://localhost:3001/cartDetails`, aux2, {
         headers: {"content-type": "application/json"}
    })
  
    console.log(cart3)   
  }
}

  useEffect(()=> {
  //cartDB()
  //dispatch(fetchById(jsonId))
    //console.log(cartList)
    
  },[])
  console.log(cartList)

  
 

  useEffect(() => {
   
    dispatch(getTotals());
    console.log(cart.cartItems)
    
  }, [cart, dispatch]);

  console.log(cart3)

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
    clearData()
    dispatch(clearCart());
  };

  
  const handleCheckout = () => {
    const data = {
      quantity: cart.cartTotalAmount,
      name: 'Compra Bestify-PC' // cambiar el nombre aquí
    };

    axios.post('/mercadopago/create-payment', data)
      .then(response => {
        // console.log(response.data.init_point)
        window.location.replace(response.data.init_point);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {/* {cart.cartItems.length === 0 ? ( */}
      {uniqueArray.length === 0 ? (
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
                viewBox="0 0 16 16">
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
            {uniqueArray &&
              uniqueArray.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={cartItem.image[0]} alt={cartItem.name} />
                    <div>
                      <h4>{cartItem.name}</h4>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${parseFloat(cartItem.price)}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${parseFloat(cartItem.price )* cartItem.cartQuantity}
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
              <button onClick={handleCheckout} >Check out</button>
              <div className="continue-shopping">
                <Link to="/products">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16">
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


// Solo funciona asi
  // var res =  await axios.post(`http://localhost:3001/cartDetails`, myObject, {
  //        headers: {"content-type": "application/json"}
  //        })