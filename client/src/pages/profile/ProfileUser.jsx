import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/products";
import ClipLoader from "react-spinners/ClipLoader";
import "./ProfileUser.css";


const ProfileUser=()=> {

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
                          src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
                          alt='Avatar'
                          class='img-fluid my-5 img-size'
                        />
                        <h5>Marie Horwitz</h5>
                        <p>Web Designer</p>
                        <i className='bi bi-pencil-square'></i>
                      </div>
                      <div class='col-md-8'>
                        <div class='card-body'>
                          <h6>Information</h6>
                          <hr class='mt-0 mb-4' />
                          <div class='row pt-1'>
                            <div class='col-6 mb-3'>
                              <h6>Email</h6>
                              <p class='text-muted'>info@example.com</p>
                            </div>
                            <div class='col-6 mb-3'>
                              <h6>Phone</h6>
                              <p class='text-muted'>123 456 789</p>
                            </div>
                          </div>
                          <h6>Projects</h6>
                          <hr class='mt-0 mb-4' />
                          <div class='row pt-1'>
                            <div class='col-6 mb-3'>
                              <h6>Recent</h6>
                              <p class='text-muted'>Lorem ipsum</p>
                            </div>
                            <div class='col-6 mb-3'>
                              <h6>Most Viewed</h6>
                              <p class='text-muted'>Dolor sit amet</p>
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