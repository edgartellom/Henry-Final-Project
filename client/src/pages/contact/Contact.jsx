import React from "react";
import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";

const Contact = () => {
  return (
    <>
      <Navbar></Navbar>
      <hr/>
      <section aria-label="contact us" className="container">
        <div className="row center" >
          <div className="row">
            <article >
                <hgroup>
                  <h2>Contact Us</h2>
                  <h3>Litora torquent per conubia nostra</h3>
                </hgroup>
                
                <aside>
                  <summary>Meet us</summary>
                  <ol>
                    <li><i className="bi bi-geo-alt-fill"></i> Address : Jr. anda la osa 786 Lima - Peru </li>
                    <li><i className="bi bi-whatsapp"></i> Phones : 5192328522 12354666 316521 </li>
                    <li><i className="bi bi-envelope-at"></i> Emails: pkito@mail.com</li>

                  </ol>
                  

                </aside>
                <aside>
                  <summary>Follow us</summary>
                  <ol>
                    <li> <NavLink><i className="bi bi-facebook"></i></NavLink></li>
                    <li> <NavLink><i className="bi bi-twitter"></i></NavLink></li>
                    <li> <NavLink><i className="bi bi-instagram"></i></NavLink></li>
                    <li> <NavLink><i className="bi bi-linkedin"></i></NavLink></li>
                  </ol>
                  

                </aside>
              <form className="grid">
                <input type="input" id="firstname" name="firstname" placeholder="First name" aria-label="First name" required />
                <input type="email" id="email" name="email" placeholder="Email address" aria-label="Email address" required />
                <button type="submit" >Subscribe</button>
              </form>
            </article>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
};

export default Contact;
