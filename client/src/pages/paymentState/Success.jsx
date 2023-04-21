import React, { useEffect } from "react";
import "./Success.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/users";
import { useSelector } from "react-redux";
import useOrderStatus from "../../store/userOrderStatus";

const Success = () => {
  const current = useUserStore((state) => state.currentUser.id);
  const cart = useSelector((state) => state.cart);
  const createOrder = useOrderStatus((state) => state.createOrder);

  let totalPrice = cart.cartTotalAmount;
  // const fechaActual = new Date().toISOString().slice(0, 19).replace("T", " ");

  const dataOrder = {
    current,
    totalPrice,
    state: "succeeded",
    //fechaActual,
  };
  console.log(dataOrder);
  const navigate = useNavigate();
  useEffect(() => {
    // const crearOrden = async () => {
    //   const orderDb = await createOrder(dataOrder);
    //   console.log("ser que anda?");
    // };
    const timer = setTimeout(() => {
      navigate("/");
    }, 7000); // tiempo en milisegundos (7 segundos)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container-principal">
      <h1>
        Pago exitoso <VerifiedIcon />
      </h1>
      <p>Tu pago se ha procesado con éxito. ¡Gracias por tu compra!</p>
    </div>
  );
};

export default Success;
