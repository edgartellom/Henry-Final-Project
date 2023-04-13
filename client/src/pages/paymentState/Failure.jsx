import React, { useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import './Failure.css'

const Failure = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'http://127.0.0.1:5173/';
    }, 7000); // tiempo en milisegundos (5 segundos)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container-principal">
      <h1>Error en el pago <CancelIcon/></h1>
      <p>
        Hubo un problema en el pago, serás redirigido a otra página en unos segundos...
      </p>
    </div>
  );
};

export default Failure;