import React, { useState, useEffect } from "react";
import useStore from "../../store/category";
import axios from "axios";
import { Link } from "react-router-dom";

//import "bootstrap/dist/css/bootstrap.min.css";

function CreateProduct() {
  //const fetch = useStore((state) => state.fetchData)
  const { fetchData } = useStore();
  const categories = useStore((state) => state.category);
  const [cat, setCat] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  console.log(cat);
  console.log(type);

  const [input, setInput] = useState({
    name: "",
    brand: "",
    price: null,
    model: null,
    image: [],
    feature: null,
    category: [],
  });
  console.log(input);

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
    //console.log(fetchData);
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

    await axios.post(`http://localhost:3001/products`, input, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
    alert("Product created successfully");
    setInput({
      name: "",
      brand: "",
      price: null,
      model: null,
      image: [],
      feature: null,
      category: [],
    });
  };

  const reset = () => {
    console.log("reseting");

    setInput({
      name: "",
      brand: "",
      price: null,
      model: null,
      image: [],
      feature: null,
      category: [],
    }); // category should be empty but its not working properly yet
  };

  const handleImage = (e) => {
    setInput({
      ...input,
      [e.target.name]: [...input[e.target.name], e.target.value],
    });

    setErrors(
      verify({
        ...input,
        [e.target.name]: [...input[e.target.name], e.target.value],
      })
    );
  };

  const changeHandleCategory = (e) => {
    // Verificar si la nueva opción es diferente a la que ya está seleccionada
    if (e.target.value !== selectedOption) {
      const newCategory = [{ name: e.target.value }];
      if (input.type && input.type[0]) {
        newCategory.push(input.type[0]);
      }
      setInput({
        ...input,
        category: newCategory,
      });
      setSelectedOption(e.target.value);

      setErrors(
        verify({
          ...input,
          category: newCategory,
        })
      );
    }
  };

  const changeHandleType = (e) => {
    // Verificar si la nueva opción es diferente a la que ya está seleccionada
    if (e.target.value !== selectedOption2) {
      const newCategory = [{ name: e.target.value }];
      if (input.category[0]) {
        newCategory.push(input.category[0]);
      }
      setInput({
        ...input,
        category: newCategory,
      });
      setSelectedOption2(e.target.value);

      setErrors(
        verify({
          ...input,
          category: newCategory,
        })
      );
    }
  };

  // const changeHandleCategory = (e) => {
  //   // Verificar si la nueva opción es diferente a la que ya está seleccionada
  //   if (e.target.value !== selectedOption) {
  //     setInput({
  //       ...input,
  //       [e.target.name]: [{ name: e.target.value }],
  //     });
  //     setSelectedOption(e.target.value);

  //     setErrors(
  //       verify({
  //         ...input,
  //         [e.target.name]: [{ name: e.target.value }],
  //       })
  //     );
  //   }
  // };

  // const changeHandleType = (e) => {
  //   // Verificar si la nueva opción es diferente a la que ya está seleccionada
  //   if (e.target.value !== selectedOption2) {
  //     setInput({
  //       ...input,
  //       [e.target.name]: [{ name: e.target.value }],
  //     });
  //     setSelectedOption2(e.target.value);

  //     setErrors(
  //       verify({
  //         ...input,
  //         [e.target.name]: [{ name: e.target.value }],
  //       })
  //     );
  //   }
  // };

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

    // if(input.find(r => r.name.toLowerCase() === e.target.value.toLowerCase()))
    //   setErrors({
    //     ...input,
    //     [e.target.name]: 'this product is already on the API or created'
    //   })
  };

  // const selectHandle = (e) => {
  //   if (!input.category.includes(e.target.value)) {
  //     alert(e.target.value);
  //     setInput({
  //       ...input,
  //       category: [...input.category, e.target.value],
  //     });
  //   }
  //   console.log(e.target.value);
  // };

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

        {errors.price && <h6>{errors.price}</h6>}

        <input
          type="text"
          autoComplete="off"
          value={input.image}
          name="image"
          id="image"
          placeholder="enter a url (optional)"
          onChange={handleImage}
        />
        <h3>Categories</h3>
        <div class="form-group">
          <label for="exampleSelect1"></label>
          <select
            class="form-control"
            id="exampleSelect1"
            name="category"
            value={selectedOption}
            onChange={changeHandleCategory}
          >
            <option value="">Category</option>
            <option value="Hardware">Harware</option>
            <option value="Perifericos">Perifericos</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleSelect1"></label>
          <select
            class="form-control"
            id="exampleSelect1"
            name="category"
            value={selectedOption2}
            onChange={changeHandleType}
          >
            <option value="">Type</option>
            <option value="Gamer">Gamer</option>
            <option value="Oficina">Oficina</option>
          </select>
        </div>
        {/* <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="category"
            id="Harware"
            value={input.category}
            checked={cat === "Harware"}
            onChange={changeHandleArray}
          /> */}
        {/* <input
            class="form-check-input"
            type="radio"
            name="category"
            id="Harware"
            value={cat}
            checked={cat === "Harware"}
            onChange={() => setCat("Harware")}
          /> */}
        {/* <label class="form-check-label" for="Harware">
            Harware
          </label>
        </div> */}
        {/* <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="Perifericos"
            id="Perifericos"
            value={type}
            checked={cat === "Perifericos"}
            onChange={() => setCat("Perifericos")}
          />
          <label class="form-check-label" for="Perifericos">
            Perifericos
          </label>
        </div>
        <br />
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="Gamer"
            id="Gamer"
            value="Gamer"
            checked={type === "Gamer"}
            onChange={() => setType("Gamer")}
          />
          <label class="form-check-label" for="Gamer">
            Gamer
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="Oficina"
            id="Oficina"
            value="Oficina"
            checked={type === "Oficina"}
            onChange={() => setType("Oficina")}
          />
          <label class="form-check-label" for="Oficina">
            Oficina
          </label>
        </div> */}

        <br />
        <br />
        <button
          disabled={!input.name || errors.name || !input.brand || errors.brand}
          type="submit"
          className="createButton"
        >
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
