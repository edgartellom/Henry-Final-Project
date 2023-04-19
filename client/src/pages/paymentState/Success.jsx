import React, { useEffect } from 'react';
import './Success.css'
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 7000); // tiempo en milisegundos (7 segundos)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container-principal">
      <h1 >Pago exitoso <VerifiedIcon/></h1>
      <p >
      Tu pago se ha procesado con éxito. ¡Gracias por tu compra! 
      </p>
    </div>
  );
};

export default Success;