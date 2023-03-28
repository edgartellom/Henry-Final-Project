import { Footer, List, Navbar } from "../../components";
import useStore from "../../store/products";
import { useState, useEffect } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import "./products.css";

const Products = () => {
  const fetchProducts = useStore((state) => state.fetchProducts);

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

  const names = listProducts.map((pe) => pe.brand);
  const nNames = new Set(names);
  let rNames = [...nNames];

  // var cat = [
  //   {
  //     id: 0,
  //     brand: "",
  //     name: "",
  //     model: "",
  //     feature: "",
  //     detail: "",
  //     price: 0,
  //     image: [""],
  //     categories: [
  //       {
  //         name: "",
  //         type: 0,
  //       },
  //     ],
  //   },
  // ];
  // const cargarFiltros = () => {
  //   if (listProducts.length > 1)
  //     listProducts.map((c) => c.categories.find((e) => e.type === 1));
  //   console.log(cat);
  //   const catArray = new Set(cat);
  //   const catRep = [...catArray];
  //   console.log(catRep);
  // };

  const cats = listProducts.map((pe) => pe.categories);
  var catR = cats[0];
  console.log(cats);
  console.log(catR);
  const ctsName = catR.filter((e) => e.type == 1);

  // console.log(ctsName);
  // const catt = new Set(ctsName);
  let catRep = [...ctsName];

  const [page, setPage] = useState(1);

  const productsPerPage = 12;
  const indexOfLastProduct = page * productsPerPage; //12
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; //0
  const currentProducts = listProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    fetchProducts();
    //cargarFiltros();
  }, []);

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

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          {/* <Typography>Page: {page}</Typography> */}
          <Pagination
            count={parseInt(listProducts.length / productsPerPage)}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ margin: "0 10px" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small" style={{ color: "#2196f3" }}>
              Filter
            </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={state.categoryFilter}
              label="Age"
              onChange={handleCategoryChange}
            >
              {catRep ? (
                catRep.map((e) => (
                  <MenuItem
                    key={e.id}
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
              {/* <MenuItem value="Perifericos" style={{ color: "#2196f3" }}>
                Perifericos
              </MenuItem>
              <MenuItem value="Hardware" style={{ color: "#2196f3" }}>
                Hardware
              </MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div style={{ margin: "0 10px" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small" style={{ color: "#2196f3" }}>
              Filter
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
              Filter
            </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={state.categoryFilter2}
              label="Age"
              onChange={handleTypeChange}
            >
              <MenuItem value="Gamer" style={{ color: "#2196f3" }}>
                Gamer
              </MenuItem>
              <MenuItem value="Oficina" style={{ color: "#2196f3" }}>
                Oficina
              </MenuItem>
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
    </>
  );
};

export default Products;
