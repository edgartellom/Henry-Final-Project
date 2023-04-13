import { NavLink, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStoreUser from "../../store/userGenerals";
import ClipLoader from "react-spinners/ClipLoader";
import useUserStore from "../../store/users";
import "./EditUser.css";
import { useUserContext } from "../../components/contexts/userContexts";
import { Link } from "react-router-dom";
import { getAuth} from "firebase/auth";


const EditUser=()=> {
  //const auth = getAuth();
  //const user = auth.currentUser;
const user = getAuth().currentUser;
const [loadingInProgress, setLoading] = useState(false);
//const{user,setUser}=useUserContext()
const { updateUser,getUser, usuarioSesion } = useStoreUser();
const{currentUser}=useUserStore() 
const navigate = useNavigate();
 

//var validacion=currentUser.uid?currentUser.uid:currentUser["Provider-specific UID"]
/* if(user){
   console.log(user.email);
var validacion = user.uid
  ? user.uid
  : user["Provider-specific UID"];
} */

  const { iduser } = useParams();
var validacion = iduser;

useEffect(() => {

  getUser(validacion);
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);
  }, []);

//console.log(usuarioSesion);

  const [input, setInput] = useState({
    id: validacion,
    username: usuarioSesion.username,
    name: usuarioSesion.name,
    tnumber: usuarioSesion.tnumber,
    email: usuarioSesion.email,
    admin: usuarioSesion.admin,
  });

  console.log(input);
    function handleChange(e){
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

  function handleSubmit(e){
    e.preventDefault();
  updateUser(input);
  
  navigate(`/profile/${validacion}`);
  //console.log(error)
}

    return (
      <>
        <Navbar></Navbar>
        <main className='container'>
          <form onSubmit={(e) => handleSubmit(e)}>
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
            <br></br>
            <div>
              <label className='formulario'>Email</label>
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
            

            <button className='crear' typeof='submit'>
              Confirmar
            </button>
          </form>
        </main>
        <Footer></Footer>
      </>
    );

};

export default EditUser;