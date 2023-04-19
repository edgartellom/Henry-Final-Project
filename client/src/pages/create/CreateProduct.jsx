import React from "react";
import { useState, useEffect } from "react";
import useStore from "../../store/category";
import axios from "axios";
import { Link } from "react-router-dom";
import UploadFile from "../../store/cloudinary" 
//import "bootstrap/dist/css/bootstrap.min.css";

function CreateProduct() {
  //const fetch = useStore((state) => state.fetchData)
  const { fetchData } = useStore();
  const categories = useStore((state) => state.category);

  const [input, setInput] = useState({
    name: "",
    brand: "",
    price: null,
    model: null,
    image: null,
    feature: null,
    category: [],
  });

  const [errors, setErrors] = useState([]);

  const verify = (input) => {
    ///[^A-Z a-z0-9]/
    let error = {};
    if (!input.name || input.name.match(/\W/))
      error.name = "please fill out with no special character";
    if (!input.brand || input.brand.length < 3)
      error.brand = "enter at least 3 words";

    if (input.price) {
      const parsed = parseInt(input.price);
      if (!Number.isInteger(parsed)) {
        error.price = "enter numbers only";
      } else if (parsed < 1) {
        error.price = "enter a positive number";
      }
    }
    // else{
    //   error.price = "please fill out this field"
    // }
    return error;
  };

  useEffect(() => {
    //  fetch()
    fetchData();
    console.log(fetchData);
    console.log(categories);
    // if(params.id && recipeDb){  //UPDATE
    //   setInput(recipeDb.find((i) => i.id === params.id))
    // }
  }, []);

  const submitHandle = async (e) => {
    console.log(input);
    // if(params.id && recipeDb){
    //    axios.put(`http://localhost:3001/recipeDb:${params.id}`, input.name)
    //   console.log("editing")
    // }else{
    //   dispatch(createRecipes(input))
    //   alert("Recipe Created")
    // //   history.push('/home')
    // }
    e.preventDefault();
    // await axios.post(`http://localhost:3001/products`, input, {
    //   headers: { "content-type": "application/x-www-form-urlencoded" },
    // });


    await axios.post('http://localhost:3001/products', input, {
    headers: { 'content-type': 'application/json' }
    });


    alert("Product created successfully");
    setInput({
      name: "",
      brand: "",
      price: null,
      model: null,
      image: null,
      feature: null,
    });
  };

  const reset = () => {
    console.log("reseting");

    setInput({
      name: "",
      brand: "",
      price: null,
      model: null,
      image: null,
      feature: null,
      category: [],
    }); // category should be empty but its not working properly yet
  };

  const changeHandle = (e) => {
    //const nameFixed = e.target.value.replace(/[^a-zA-Z]/, '') //(line58).replace(/[^a-zA-Z]/, '')
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    

    setErrors(
      verify({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    const preset_key = "Perifericos";
    const cloud_name = "de2wihnob";
    const[image, setImage] = useState();
         


    // if(input.find(r => r.name.toLowerCase() === e.target.value.toLowerCase()))
    //   setErrors({
    //     ...input,
    //     [e.target.name]: 'this product is already on the API or created'
    //   })
  };

  const selectHandle = (e) => {
    if (!input.category.includes(e.target.value)) {
      alert(e.target.value);
      setInput({
        ...input,
        category: [...input.category, e.target.value],
      });
    }
    console.log(e.target.value);
  };

  //console.log(errors)
  return (
    <div className="container">
      <di>
        <Link to="/products" className="homeButton">
          Go back
        </Link>
      </di>

      <Link to="/products" className="homeButton">
        Go back
      </Link>

      <form className="formContainer" onSubmit={submitHandle}>
        <h1 style={{ textAlign: "center" }}>Create a Product</h1>
       
       

        <input
          className="inputValidate"
          type="text"
          autoComplete="off"
          value={input.name}
          name="name"
          placeholder="enter a name"
          onChange={changeHandle}
        />

        {/* {!input.name?<h6>please fill out this field</h6>:<></>} */}
        {errors.name && <h6>{errors.name}</h6>}

        <input
          className="inputValidate"
          type="text"
          autoComplete="off"
          value={input.brand}
          name="brand"
          placeholder="enter a brand"
          onChange={changeHandle}
        />

        {errors.brand && <h6>{errors.brand}</h6>}

        <input
          className="inputValidate"
          type="textArea"
          autoComplete="off"
          value={input.model}
          name="model"
          placeholder="enter a model (optional)"
          onChange={changeHandle}
        />
        





        {errors.model && <h6>{errors.model}</h6>}

        <input
          className="inputValidate"
          type="text"
          autoComplete="off"
          value={input.price}
          name="price"
          placeholder="enter the price for the product (optional)"
          onChange={changeHandle}
        />
        <UploadFile/>
        {errors.price && <h6>{errors.price}</h6>}
 
        <input
          type="text"
          autoComplete="off"
          value={input.image}
          name="image"
          id="image"
          placeholder="enter a url (optional)"
          onChange={changeHandle}
        />

            <select className="fw-bold" defaultValue="Categories" onChange={(e) => selectHandle(e)}>
            <option className="fw-bold" disabled>Categories</option>
            {categories.map((t, index) => (
              <option key={index} value={t.name}>
                {t.name}
              </option>
            ))}

            </select>

        <br />
        <br />
        <button
          disabled={!input.name || errors.name || !input.brand || errors.brand}
          type="submit"
          className="createButton">
          Create a product
        </button>
      </form>
      <button className="btn btn-danger" onClick={() => reset()}>
        Cancel
      </button>
    </div>
  );
}

export default CreateProduct;
