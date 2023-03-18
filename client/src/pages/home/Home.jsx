import "./home.css"
import { Footer, Navbar } from "../../components";
import useCommonStore from "../../store/commons";
import { useEffect } from "react";

const Home = () => {
  const {changeTitle} = useCommonStore()

  useEffect(()=>{
    changeTitle("Marca | Home")
  },[])

  return (
    <>
    <Navbar></Navbar>
      <div className="hero" data-theme="dark">
        
        
        <header className="container">
          <hgroup>
            <h1>Company</h1>
            <h2>A classic company or blog layout with a sidebar</h2>
          </hgroup>
          <p><a href="#" role="button" >Call to action</a></p>
        </header>
      </div>
      <main className="container">
        <div className="grid">

          <section>
            <hgroup>
              <h2>Ut sit amet sem ut velit</h2>
              <h3>Quisque mi est</h3>
            </hgroup>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis est vel velit bibendum ultrices. Sed aliquam tortor vel odio fermentum ullamcorper eu vitae neque. Sed non diam at tellus venenatis viverra. Vestibulum et leo laoreet arcu tempor eleifend venenatis ac leo. Pellentesque euismod justo sed nisl sollicitudin varius. Duis venenatis nisl sit amet ante rutrum posuere. Etiam nec ullamcorper leo, sed placerat mauris.</p>

            
          </section>

          <aside>
            <a href="/" aria-label="Example" ><img src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Architecture"/></a>
            <p>
              <a href="/" >Donec sit amet</a><br/>
                <small>Class aptent taciti sociosqu ad litora torquent per conubia nostra</small>
            </p>
           <a href="/" aria-label="Example"><img src="https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Architecture"/></a>
            <p>
              <a href="/">Nullam lobortis placerat aliquam</a><br/>
                <small>Maecenas vitae nibh blandit dolor commodo egestas vel eget neque. Praesent semper justo orci, vel imperdiet mi auctor in.</small>
            </p>
          </aside> 

        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Home;
