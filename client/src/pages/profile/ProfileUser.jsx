import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/products";
import ClipLoader from "react-spinners/ClipLoader";
import "./ProfileUser.css";
import { useUserContext } from "../../components/contexts/userContexts";

const ProfileUser = () => {
  const { user, setUser } = useUserContext();

  if (!user) {
    ("");
  } else {
    var email = user.email;
    var name = user.displayName;
    var foto = user.reloadUserInfo.photoUrl
      ? user.reloadUserInfo.photoUrl
      : "https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png?20170128013930";
    var creado = user.metadata.creationTime;
    var ultimo = user.metadata.lastSignInTime;
  }

  return (
    <>
      <Navbar></Navbar>
      <main className="container">
        <section className="section-styles">
          <div>
            <div>
              <div>
                <div className="mb-3 border-radio card2">
                  <div className="row g-0">
                    <div className="col-md-4 gradient-custom text-center border-radio-full">
                      <img
                        src={foto}
                        alt="Avatar"
                        className="img-fluid my-5 img-size"
                      />
                      <h5>{name}</h5>
                      <p>Usuario</p>
                      <i className="bi bi-pencil-square"></i>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h6>Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted">{email}</p>
                          </div>
                        </div>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>User since</h6>
                            <p className="text-muted">{creado}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Last Conexion</h6>
                            <p className="text-muted">{ultimo}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-start">
                          <a href="#!">
                            <i className="fab fa-facebook-f fa-lg me-3"></i>
                          </a>
                          <a href="#!">
                            <i className="fab fa-twitter fa-lg me-3"></i>
                          </a>
                          <a href="#!">
                            <i className="fab fa-instagram fa-lg"></i>
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
