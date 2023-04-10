import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStoreUser from "../../store/userGenerals";
import ClipLoader from "react-spinners/ClipLoader";
import useUserStore from "../../store/users";
import useStoreAddress from "../../store/address";
import "./ProfileUser.css";
import { useUserContext } from "../../components/contexts/userContexts";
import { Link } from "react-router-dom";

const ProfileUser=()=> {
const [loadingInProgress, setLoading] = useState(false);
const{user,setUser}=useUserContext()
const{getUser,usuarioSesion}=useStoreUser()
const{currentUser}=useUserStore() 
const{getAddress,dataAddress,filterAddress,filterAdd}=useStoreAddress()


var validacion=currentUser.uid?currentUser.uid:currentUser["Provider-specific UID"]
//var validacion = "A9wLAlfIdhQ5gc9kC0TVTZJ9qrB3";

useEffect(() => {
  getAddress();
  getUser(validacion);
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);
  }, []);


var direccion=dataAddress.map((e)=>{
  return({
    idAddress:e.idAddress,
    tipo:e.tipo,
    numero:e.numero,
    cruzamiento:e.cruzamiento,
    id:e.userId
  })
})

var filtrado=direccion.filter(e=>e.id==validacion)



console.log(filtrado)


if(!user){
  ""
}else{
  var email=user.email
  var name=user.displayName
  var foto=user.reloadUserInfo.photoUrl?user.reloadUserInfo.photoUrl:"https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png?20170128013930"
  var creado=user.metadata.creationTime
  var ultimo=user.metadata.lastSignInTime
}


    return (
      <>
        <Navbar></Navbar>
        <main className='container'>
          {loadingInProgress ? (
            <div className='loader-container'>
              <ClipLoader
                color={"#fff"}
                loading={loadingInProgress}
                size={150}
              />
            </div>
          ) : (
            <section class='section-styles'>
              <div>
                <div>
                  <div>
                    <div class='mb-3 border-radio card2'>
                      <div class='row g-0'>
                        <div class='col-md-4 gradient-custom text-center border-radio-full'>
                          <img
                            src={foto}
                            alt='Avatar'
                            class='img-fluid my-5 img-size'
                          />
                          {usuarioSesion.name ? (
                            <div>
                              <h5>{usuarioSesion.name}</h5>
                              <p>Usuario</p>
                            </div>
                          ) : (
                            <p class='alert-data'>¡COMPLETA TUS DATOS!</p>
                          )}
                          <Link to={`/createuser`}>
                            <i className='bi bi-pencil-square'></i>
                          </Link>
                        </div>
                        <div class='col-md-8'>
                          <div class='card-body'>
                            <h6>Information</h6>
                            <hr class='mt-0 mb-4' />
                            <div class='row pt-1'>
                              <div class='col-6 mb-3'>
                                <h6>Email</h6>
                                <p class='text-muted'>{email}</p>
                              </div>
                            </div>
                            <hr class='mt-0 mb-4' />
                            <div class='row pt-1'>
                              <div class='col-6 mb-3'>
                                <h6>Telephone</h6>
                                <p class='text-muted'>
                                  {usuarioSesion.tnumber}
                                </p>
                              </div>
                              <div class='col-6 mb-3'>
                                <h6>Username</h6>
                                <p class='text-muted'>
                                  {usuarioSesion.username}
                                </p>
                              </div>
                            </div>
                            <hr class='mt-0 mb-4' />
                            <div class='row pt-1'>
                              <div class='col-6 mb-3'>
                                <h6>Addresses</h6>
                                <p class='text-muted'>{email}</p>
                                <Link to={`/createaddress`}>
                                  <p>Add address</p>
                                </Link>
                              </div>
                            </div>
                            <hr class='mt-0 mb-4' />
                            <div class='row pt-1'>
                              <div class='col-6 mb-3'>
                                <h6>User since</h6>
                                <p class='text-muted'>{creado}</p>
                              </div>
                              <div class='col-6 mb-3'>
                                <h6>Last Conexion</h6>
                                <p class='text-muted'>{ultimo}</p>
                              </div>
                            </div>
                            <div class='d-flex justify-content-start'>
                              <a href='#!'>
                                <i class='fab fa-facebook-f fa-lg me-3'></i>
                              </a>
                              <a href='#!'>
                                <i class='fab fa-twitter fa-lg me-3'></i>
                              </a>
                              <a href='#!'>
                                <i class='fab fa-instagram fa-lg'></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

  {/*       {usuarioSesion.name ? (
          <div>
            <h1>{usuarioSesion.name}</h1>
            <h1>{usuarioSesion.tnumber}</h1>
            <h1>{usuarioSesion.username}</h1>
            <h1>{usuarioSesion.email}</h1>
          </div>
        ) : (
          <h1>COMPLETA TUS DATOS!!</h1>
        )}
        <Link to={`/createuser`}>
          <h1>COMPLETAR DATOS</h1>
        </Link>
        <Link to={`/createaddress`}>
          <h1>Ingresar direccion</h1>
        </Link> */}

        <div className='card_div'>
          {filtrado.map((ad) => (
            <div className='card'>
              <div>{ad.idAddress}</div>
              <div>{ad.tipo} </div>
              <div>{ad.calle}</div>
              <div>{ad.numero}</div>
              <div>{ad.cruzamiento}</div>
              <div>{ad.colonia}</div>
              <div>{ad.municipio}</div>
              <div>{ad.estado}</div>
              <div>{ad.pais}</div>
              <div>{ad.codigoPostal}</div>
              <div>{ad.referencia}</div>
            </div>
          ))}
        </div>

        <Footer></Footer>
      </>
    );

};

export default ProfileUser;