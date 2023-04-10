import React from "react";
import { useState, useEffect } from "react";
import useStoreAddress from "../../store/address"
import useUserStore from "../../store/users";
import axios from "axios";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import "./CreateAddress.css";
//import "bootstrap/dist/css/bootstrap.min.css";

function CreateAddress() {
  //const fetch = useStore((state) => state.fetchData)

const{currentUser}=useUserStore()
const{postAddress}=useStoreAddress()
var validacion=currentUser.uid?currentUser.uid:currentUser["Provider-specific UID"]



console.log(currentUser)


  const [input, setInput] = useState({
    tipo:"",
    calle:"",
    numero:"",
    cruzamiento:"",
    colonia:"",
    municipio:"",
    estado:"",
    pais:"",
    codigoPostal:"",
    referencia:"",
    id: validacion,
  });

 
  function handleChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
}




var idUser=currentUser["Provider-specific UID"]

function handleSubmit(e){
  postAddress(input)
  console.log(error)
}





return (
  <>
    <Navbar></Navbar>

    <div className='contenedor'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className='formulario'>DIRECCION </label>
          <input
            className='form'
            type='text'
            value={input.id}
            name='id'
            onChange={handleChange}
          />
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

export default CreateAddress
