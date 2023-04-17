import React from "react";
import { useState, useEffect } from "react";
import useStoreAddress from "../../store/address";
import useUserStore from "../../store/users";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import "./UpdateAddress.css";
import ClipLoader from "react-spinners/ClipLoader";
//import "bootstrap/dist/css/bootstrap.min.css";

const UpdateAddress = () => {
  //const fetch = useStore((state) => state.fetchData)
  //var validacion=currentUser.uid?currentUser.uid:currentUser["Provider-specific UID"]
  const [loadingInProgress, setLoading] = useState(false);
  const navigate = useNavigate();
  const { idaddress } = useParams();

  const { updateAddress, getAddressId, addSesion } = useStoreAddress();

  useEffect(() => {
    getAddressId(idaddress);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const [input, setInput] = useState({
    idAddress: addSesion.idAddress,
    tipo: addSesion.tipo,
    calle: addSesion.calle,
    numero: addSesion.numero,
    cruzamiento: addSesion.cruzamiento,
    colonia: addSesion.colonia,
    municipio: addSesion.municipio,
    estado: addSesion.estado,
    pais: addSesion.pais,
    codigoPostal: addSesion.codigoPostal,
    referencia: addSesion.referencia,
    userId: addSesion.userId,
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateAddress(input);
    /*console.log(input);
console.log(error);*/
    navigate(`/profile/${addSesion.userId}`);
  }

  return (
    <>
      <Navbar></Navbar>

      <div className='contenedor'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            EDIT Address
            <div hidden={true}>
              <label className='formulario'>ID </label>
              <input
                className='form'
                type='text'
                value={input.id}
                name='id'
                onChange={handleChange}
              />
            </div>
          </div>
          <br></br>
          <div>
            <label className='formulario'>Tipo </label>
            <input
              className='form'
              type='text'
              value={input.tipo}
              name='tipo'
              onChange={handleChange}
            />
          </div>
          <br></br>
          <div>
            <div className='formulario'>Calle </div>
            <input
              className='describe'
              text='text'
              value={input.calle}
              name='calle'
              onChange={handleChange}
              maxLength={100}
            />
          </div>
          <div>
            <div className='formulario'>Numero </div>
            <input
              className='describe'
              text='text'
              value={input.numero}
              name='numero'
              onChange={handleChange}
              maxLength={100}
            />
          </div>
          <div>
            <div className='formulario'>Cruzamiento </div>
            <input
              className='describe'
              text='text'
              value={input.cruzamiento}
              name='cruzamiento'
              onChange={handleChange}
              maxLength={100}
            />
          </div>

          <br></br>
          <div>
            <label className='formulario'>colonia </label>
            <input
              text='text'
              value={input.colonia}
              name='colonia'
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='formulario'>municipio </label>
            <input
              text='text'
              value={input.municipio}
              name='municipio'
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='formulario'>estado </label>
            <input
              text='text'
              value={input.estado}
              name='estado'
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='formulario'>pais </label>
            <input
              text='text'
              value={input.pais}
              name='pais'
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='formulario'>codigo postal </label>
            <input
              text='text'
              value={input.codigoPostal}
              name='codigoPostal'
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='formulario'>referencia </label>
            <input
              text='text'
              value={input.referencia}
              name='referencia'
              onChange={handleChange}
            />
          </div>

          <button className='crear' typeof='submit'>
            Confirmar
          </button>
        </form>
      </div>

      <Footer></Footer>
    </>
  );
};

export default UpdateAddress;
