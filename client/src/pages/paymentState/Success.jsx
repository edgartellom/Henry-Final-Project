import React, { useEffect } from 'react';
import './Success.css'
import VerifiedIcon from '@mui/icons-material/Verified';
const Success = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'http://127.0.0.1:5173/';
    }, 7000); // tiempo en milisegundos (5 segundos)

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