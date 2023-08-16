import { Footer, List, Navbar } from "../../components";
import useStore from "../../store/products";
import { useState, useEffect } from "react";
import { useUserContext } from "../../components/contexts/userContexts";
import useUserStore from "../../store/users";
import { Pagination, Stack, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/ShoppingCartRedux";
import axios from 'axios'
import { getTotals } from "../../store/ShoppingCartRedux";

const Products = () => {
  const fetchProducts = useStore((state) => state.fetchProducts);
  const dispatch = useDispatch()
  const state = useStore();
  const setCategoryFilter = useStore((state) => state.setCategoryFilter);
  const setCategoryFilter2 = useStore((state) => state.setCategoryFilter2);
  const setBrandFilter = useStore((state) => state.setBrandFilter);
  const setListProducts = useStore((state) => state.setListProducts);
  const listProducts = useStore((state) => state.listProducts);
  const products = useStore((state) => state.products);
  const categoryFilter = useStore((state) => state.categoryFilter);
  const brandFilter = useStore((state) => state.brandFilter);
  const categoryFilter2 = useStore((state) => state.categoryFilter2);
  const [res, setRes] = useState([]);
  const [res2, setRes2] = useState([]);
  const page = useStore((state) => state.page);
  const setPage = useStore((state) =>state.setPage);
  const { user } = useUserContext();
  const getUserById = useUserStore((state) => state.getUserById);


  const [ data, setData] = useState([])
  const userId = 'kevin'
  const cartId = '9c4aceae-2788-4c09-8a02-32729c8490c3'
  const {cartTotalQuantity} = useSelector((state) => state.cart)
  


  //////////favorites//////
  const [favorito, setFavorito] = useState(false);
  const [favoritosUsuario, setFavoritosUsuario] = useState([]);
  /////

  const names = listProducts.map((pe) => pe.brand);
  const nNames = new Set(names);
  let rNames = [...nNames];

  var response = [];

  const filtarCategories = async () => {
    try {
      const cats = await listProducts.map((pe) => pe.categories);
      //const lCats = cats.flat();
      //console.log(lCats);
      const uniqueArray = cats
        .flat()
        .map((obj) => JSON.stringify(obj))
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((str) => JSON.parse(str));
      //return uniqueArray;
      setRes(uniqueArray.filter((el) => el.type === 1));
      setRes2(uniqueArray.filter((el) => el.type === 2));
    } catch (error) {
      console.log(error);
    }
  };

  // const [page, setPage] = useState(1);

  const productsPerPage = 12;
  const indexOfLastProduct = page * productsPerPage; //12
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; //0
  const currentProducts = listProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    filtarCategories();
  }, [listProducts]);

  useEffect(() => {
    fetchProducts();
    setRes(filtarCategories());
    //cargarFiltros();
    
    
  }, []);


  // console.log(listProducts)
  //   console.log(products)

    useEffect(()=> {
      dispatch(getTotals());
    },[ cartTotalQuantity])

  useEffect(()=>{
    // getCart()
    // dispatch(addItem(data))
    //console.log(data)
    
  },[])

  const getCart = async () => {
    if(userId){
      const cartData = await axios.get(`http://localhost:3001/cartDetails/${cartId}`)
     console.log(cartData.data)
      setData(cartData.data)
      dispatch(addItem(cartData.data))
      //console.log(data)
    }
  }

  useEffect(() => {
    if (user) {
      const obtenerUsuario = (async () => {
        const userDb = await getUserById(user.uid);
        if (userDb) {
          setFavoritosUsuario(userDb.favorites);
          //checkOrder(user.uid, detailProduct.id);
        }
      })();
    }
  }, [user]);


  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setCategoryFilter(category);
    if (categoryFilter === "" && categoryFilter2 === "" && brandFilter === "") {
      setListProducts(
        products.filter((product) =>
          product.categories.some(
            (cat) => cat.name.toLowerCase() === category.toLowerCase()
          )
        )
      );
    } else {
      setListProducts(
        listProducts.filter((product) =>
          product.categories.some(
            (cat) => cat.name.toLowerCase() === category.toLowerCase()
          )
        )
      );
    }

    setPage(1); // Resetear la página a la 1 cuando se filtra por marca
    //setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
  };

  const handleTypeChange = (event) => {
    const category = event.target.value;
    setCategoryFilter2(category);
    if (categoryFilter === "" && categoryFilter2 === "" && brandFilter === "") {
      setListProducts(
        products.filter((product) =>
          product.categories.some(
            (cat) => cat.name.toLowerCase() === category.toLowerCase()
          )
        )
      );
    } else {
      setListProducts(
        listProducts.filter((product) =>
          product.categories.some(
            (cat) => cat.name.toLowerCase() === category.toLowerCase()
          )
        )
      );
    }
    setPage(1);
  };

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setBrandFilter(brand);
    const products = state.products;
    const filteredProducts = listProducts.filter(
      (product) => product.brand.toLowerCase() === brand.toLowerCase()
    );
    setListProducts(filteredProducts);
    setPage(1); // Resetear la página a la 1 cuando se filtra por marca
    //setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
  };

  const handleRefresh = () => {
    setCategoryFilter("");
    setCategoryFilter2("");
    setBrandFilter("");
    // Volver a mostrar la lista completa de productos
    setListProducts(state.products);
  };

  const addFavoriteHandle = async (e) => {
    e.preventDefault();

    if (favorito) {
      // Si el producto ya está marcado como favorito, eliminarlo de la lista de favoritos
      const userDb = await getUserById(user.uid);
      console.log(userDb);
      if (userDb && userDb.favorites) {
        const newFavoritesList = userDb.favorites.filter((fav) => fav !== id);
        updateUser({
          ...userDb,
          favorites: newFavoritesList,
        });
        setFavorito(false);
        setFavoritosUsuario(newFavoritesList);
      }
      console.log(newFavoritesList);
      console.log(userDb.favorites);
      return;
    }

    // Si el producto no está marcado como favorito, agregarlo a la lista de favoritos
    setFavorito(true);
    const userDb = await getUserById(user.uid);
    if (!userDb) {
      console.log(`No se encontró ningún usuario con el id ${user.uid}`);
      return;
    }
    if (userDb && userDb.favorites) {
      updateUser({
        ...userDb,
        favorites: [...userDb.favorites, id],
      });
      setFavoritosUsuario([...userDb.favorites, id]);
    } else {
      console.log("Error al actualizar el usuario: objeto de usuario inválido");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          {/* <Typography>Page: {page}</Typography> */}
          <Pagination
            count={parseInt(listProducts.length / productsPerPage)}
            page={page}
            onChange={handleChange}
            color="primary"
            style={{ "& .MuiButtonLabel": { color: "red" } }}
          />
        </Stack>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ margin: "0 10px" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small" style={{ color: "#2196f3" }}>
              Category
            </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={state.categoryFilter}
              label="Age"
              onChange={handleCategoryChange}
            >
              {res.length > 0 ? (
                res.map((e) => (
                  <MenuItem
                    key={e.name}
                    value={e.name}
                    className="option2"
                    style={{ color: "#2196f3" }}
                  >
                    {e.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem></MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div style={{ margin: "0 10px" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small" style={{ color: "#2196f3" }}>
              Brand
            </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={state.brandFilter}
              label="Age"
              onChange={handleBrandChange}
            >
              {rNames &&
                rNames.map((product) => (
                  <MenuItem
                    key={product}
                    value={product}
                    className="option"
                    style={{ color: "#2196f3" }}
                  >
                    {product}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        <div style={{ margin: "0 10px" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small" style={{ color: "#2196f3" }}>
              Type
            </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={state.categoryFilter2}
              label="Age"
              onChange={handleTypeChange}
            >
              {res2.length > 0 ? (
                res2.map((e) => (
                  <MenuItem
                    key={e.name}
                    value={e.name}
                    className="option2"
                    style={{ color: "#2196f3" }}
                  >
                    {e.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem></MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      </div>
      <IconButton
        onClick={handleRefresh}
        size="small"
        style={{ color: "#2196f3" }}
      >
        <RefreshIcon fontSize="small" />
        <Box mr={3}>Refresh</Box>
      </IconButton>
      <List products={currentProducts} />
      <Footer />
    </div>
  );
};

export default Products;
