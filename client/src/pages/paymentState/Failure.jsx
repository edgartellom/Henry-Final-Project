import React, { useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import './Failure.css'
import { useNavigate } from "react-router-dom";


const Failure = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 7000); // tiempo en milisegundos (7 segundos)

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