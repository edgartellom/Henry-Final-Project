import { React, useState, useEffect } from "react";
import useStoreUser from "../../store/userGenerals";
import useUserStore from "../../store/users";
//import axios from "axios";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import "./CreateUser.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../../components/contexts/userContexts";
import { getAuth } from "firebase/auth";
import ClipLoader from "react-spinners/ClipLoader";


const CreateUser=()=> {
  //const fetch = useStore((state) => state.fetchData)

 const user = getAuth().currentUser;

  //const { user, setUser } = useUserContext();
  const{postUser,getUser,usuarioSesion}=useStoreUser()
  const{currentUser}=useUserStore()
  const [loadingInProgress, setLoading] = useState(false);
  //console.log(user);
  //var validacion=currentUser.uid?currentUser.uid:currentUser["Provider-specific UID"]
if (user) {
  console.log(user.email);
  var validacion = user.uid ? user.uid : user["Provider-specific UID"];
}


  useEffect(() => {
  getUser(validacion);
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);
  }, []);

console.log(usuarioSesion)


  const [input, setInput] = useState({
    id: validacion,
    username: usuarioSesion.username,
    name: '',
    tnumber: '',
    email: usuarioSesion.email,
    admin: usuarioSesion.admin,
  });

 
  function handleChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
}




//var idUser=currentUser["Provider-specific UID"]

 function handleSubmit(e){
  postUser(input)
  console.log(error)
} 





return (
  <>
     <Navbar></Navbar> 
     <main className='container'></main>
     <div className='contenedor'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className='formulario'>ID </label>
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
          <label className='formulario'>Email </label>
          <input
            className='form'
            type='text'
            value={input.email}
            name='email'
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <div className='formulario'>Username </div>
          <input
            className='describe'
            text='text'
            value={input.username}
            name='username'
            onChange={handleChange}
            maxLength={100}
          />
        </div>
        <div>
          <div className='formulario'>Name </div>
          <input
            className='describe'
            text='text'
            value={input.name}
            name='name'
            onChange={handleChange}
            maxLength={100}
          />
        </div>
        <div>
          <div className='formulario'>Telephone </div>
          <input
            className='describe'
            text='text'
            value={input.tnumber}
            name='tnumber'
            onChange={handleChange}
            maxLength={100}
          />
        </div>

        <br></br>
        <div>
          <label className='formulario'>Admin: </label>
          <input
            text='text'
            value={input.admin}
            name='admin'
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

} ;

export default CreateUser;
