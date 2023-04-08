import React from "react";
import { useState, useEffect } from "react";
import useStoreUser from "../../store/userGenerals";
import useUserStore from "../../store/users";
import axios from "axios";
import { Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";

function CreateUser() {
  //const fetch = useStore((state) => state.fetchData)

  const{postUser,getUser,usuarioSesion}=useStoreUser()
  const{currentUser}=useUserStore()

  useEffect(() => {
  getUser(currentUser["Provider-specific UID"]);
  }, []);

console.log(usuarioSesion)


  const [input, setInput] = useState({
    id: currentUser["Provider-specific UID"],
    username: "",
    name:"",
    tnumber:"",
    email: "",
    admin:"",
  });

 
  function handleChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
}




var idUser=currentUser["Provider-specific UID"]
function handleSubmit(e){
  postUser(input)
  console.log(error)
}





return(

  <div className="contenedor">

<form onSubmit={(e)=>handleSubmit(e)}>
<div>
       <label className="formulario">ID </label>
              <input
              className="form"
                  type="text"
                  value={input.id}
                  name="id"
                  onChange={handleChange}
              />
          
</div>
<br></br>
<div>
       <label className="formulario">Email </label>
              <input
              className="form"
                  type="text"
                  value={input.email}
                  name="email"
                  onChange={handleChange}

              />
</div>
<br></br>
<div>
       <div className="formulario">Username </div>
              <input className="describe"
                  text="text"
                  value={input.username}
                  name="username"
                  onChange={handleChange}
                 maxLength={100}
              
              />
          
</div>
<div>
       <div className="formulario">Name </div>
              <input className="describe"
                  text="text"
                  value={input.name}
                  name="name"
                  onChange={handleChange}
                 maxLength={100}
              
              />
          
</div>
<div>
       <div className="formulario">Telephone </div>
              <input className="describe"
                  text="text"
                  value={input.tnumber}
                  name="tnumber"
                  onChange={handleChange}
                 maxLength={100}
              
              />
          
</div>



<br></br>
<div>
       <label className="formulario">Admin: </label>
              <input
                  text="text"
                  value={input.admin}
                  name="admin"
                  onChange={handleChange}
              />
</div>

<button className="crear" typeof="submit" >Confirmar</button>

</form>
</div>

)

}  

export default CreateUser
