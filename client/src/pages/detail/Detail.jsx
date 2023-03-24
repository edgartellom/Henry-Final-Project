import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/products"

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

    

const Detail=()=> {
  const{filterId,detailProduct}=useStore()



const{id}=useParams()

  useEffect(() => {
    filterId(id)
  }, []);








console.log(detailProduct)



//var dataRecibe=id?products.filter((el)=>el.id===id):""


  return (
    <>
      <Navbar></Navbar>
       <main className="container"> 
       <div className="row">
        <div className="col">
          <div className="images">
         <img className="img-fluid" src={detailProduct.image}/>
      </div>
      </div>
      <div className="col">
        <hgroup>
          <h3>{detailProduct.brand}</h3>
          <h4>{detailProduct.model}</h4>
        </hgroup>
        <div>
        <i className='bi bi-star'></i>
        <i className='bi bi-star'></i>
        <i className='bi bi-star'></i>
        <i className='bi bi-star'></i> 
        </div>
        <p>{detailProduct.feature}</p>
        <details>
              <summary>Details</summary>
              <ul>
                <li>{detailProduct.detail}</li>
              </ul>
        </details>
        <hgroup>
              <h5>Categories</h5>
              <li>{detailProduct.categories}</li>
        </hgroup>
        <p>
            Price: <strong>{formatter.format(detailProduct.price)}</strong>
        </p>
        <div className='actions'>
              <div className='btn-inline'>
                <NavLink
                  to='/detail'
                  role='button'
                  className='primary'
                  data-tooltip='Add to Cart'
                >
                  <i className='bi bi-cart-plus'></i>
                </NavLink>
                <NavLink
                  to='/detail'
                  role='button'
                  className='secondary'
                  data-tooltip='Add to favorites'
                >
                  <i className='bi bi-heart'></i>
                </NavLink>
              </div>
            </div>
      </div>
      </div>
      </main>
  <Footer></Footer>
  </>
  );
};

export default Detail;
