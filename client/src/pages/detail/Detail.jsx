import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import {useEffect} from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/products"

const Detail = () => {
  const fetchProducts = useStore((state) => state.fetchProducts);
  const products = useStore((state) => state.products);

  useEffect(() => {
    fetchProducts();
  }, []);


  const{id}=useParams()
  console.log(id)



var dataRecibe=id?products.filter((el)=>el.id===id):""
var data=dataRecibe[0]
console.log(data)



  return (
    <>
      <Navbar></Navbar>
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="images">
              <img
                className="img-fluid"
                src={data.image[0]}
              />
            </div>
          </div>
          <div className="col">
            <hgroup>
              <h3>{data.brand}</h3>
              <h4>{data.model}</h4>
            </hgroup>
            <div className="rate">
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
            </div>
            <p>
              {data.feature}
            </p>
            <details>
              <summary>Details</summary>
              <ul>
                <li>
                 {data.detail}
                </li>
              </ul>
            </details>
            <hgroup>
              <h5>Categories</h5>
              <h6></h6>
            </hgroup>
            <p>
              Price: <strong>{data.price}</strong>
            </p>
            <div className="actions">
              <div className="btn-inline">
                <NavLink
                  to="/detail"
                  role="button"
                  className="primary"
                  data-tooltip="Add to Cart">
                  <i className="bi bi-cart-plus"></i>
                </NavLink>
                <NavLink
                  to="/detail"
                  role="button"
                  className="secondary"
                  data-tooltip="Add to favorites">
                  <i className="bi bi-heart"></i>
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
