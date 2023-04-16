import React from "react";
import { useState, useEffect } from "react";
import useStoreAddress from "../../store/address"
import useUserStore from "../../store/users";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import "./EditAddress.css";
import ClipLoader from "react-spinners/ClipLoader";
import { getAuth } from "firebase/auth";
//import "bootstrap/dist/css/bootstrap.min.css";



const EditAddress=()=> {
  //const fetch = useStore((state) => state.fetchData)

  useEffect(() => {
    getAddress();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

const{currentUser}=useUserStore()
const user = getAuth().currentUser;
const{updateAddress}=useStoreAddress()
//var validacion=currentUser.uid?currentUser.uid:currentUser["Provider-specific UID"]
const [loadingInProgress, setLoading] = useState(false);
const navigate = useNavigate();
const { idaddress } = useParams();

//var validacion = iduser;
const { getAddress, dataAddress, filterAddress, filterAdd } = useStoreAddress();

//console.log(currentUser)
var direcciones = dataAddress.map((e) => {
  return {
    idAddress: e.idAddress,
    tipo: e.tipo,
    calle: e.calle,
    numero: e.numero,
    colonia: e.colonia,
    codigoPostal: e.codigoPostal,
    municipio: e.municipio,
    estado: e.estado,
    pais: e.pais,
    cruzamiento: e.cruzamiento,
    referencia: e.referencia,
    userId: e.userId,
    
  };
  
});



const filtrado = direcciones.filter((e) => e.idAddress == idaddress);



const idAddress = filtrado.map(function(filtrado) {
  return filtrado.idAddress
});

const tipo = filtrado.map(function (filtrado) {
  return filtrado.tipo;
});

const calle = filtrado.map(function (filtrado) {
  return filtrado.calle;
});


const numero = filtrado.map(function (filtrado) {
  return filtrado.numero;
});

const cruzamiento = filtrado.map(function (filtrado) {
  return filtrado.cruzamiento;
});

const colonia = filtrado.map(function (filtrado) {
  return filtrado.colonia;
});

const municipio = filtrado.map(function (filtrado) {
  return filtrado.municipio;
});

const estado = filtrado.map(function (filtrado) {
  return filtrado.estado;
});

const pais = filtrado.map(function (filtrado) {
  return filtrado.pais;
});

const codigoPostal = filtrado.map(function (filtrado) {
  return filtrado.codigoPostal;
});

const referencia = filtrado.map(function (filtrado) {
  return filtrado.referencia;
});

const userId = filtrado.map(function (filtrado) {
  return filtrado.userId;
});

var validacion = userId.toString();

console.log(validacion)

   const [input, setInput] = useState({
     idAddress: idAddress.toString(),
     tipo: tipo.toString(),
     calle: calle.toString(),
     numero: numero.toString(),
     cruzamiento: cruzamiento.toString(),
     colonia: colonia.toString(),
     municipio: municipio.toString(),
     estado: estado.toString(),
     pais: pais.toString(),
     codigoPostal: codigoPostal.toString(),
     referencia: referencia.toString(),
     userId: validacion,
   });


 
  function handleChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
}




//var idUser=currentUser["Provider-specific UID"]



function handleSubmit(e){
 e.preventDefault();
 updateAddress(input);
/*console.log(input);
console.log(error);*/
 navigate(`/profile/${validacion}`);
}





return (
  <>
    <Navbar></Navbar>

    <div className='contenedor'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          EDIT ADDRESS
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

}  

export default EditAddress
