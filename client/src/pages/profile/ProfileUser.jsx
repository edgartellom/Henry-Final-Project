import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/products";
import ClipLoader from "react-spinners/ClipLoader";
import "./ProfileUser.css";
import { useUserContext } from "../../components/contexts/userContexts";



const ProfileUser=()=> {

const{user,setUser}=useUserContext()



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
                        <h5>{name}</h5>
                        <p>Usuario</p>
                        <i className='bi bi-pencil-square'></i>
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
        </main>

        <Footer></Footer>
      </>
    );

};

export default ProfileUser;