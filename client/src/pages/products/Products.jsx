import { Footer, List, Navbar } from "../../components";
import useStore from "../../store/products";
import { useState, useEffect } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getFilteredByBrand } from "../../tools/filters";

const Products = () => {
  const fetchProducts = useStore((state) => state.fetchProducts);

  const state = useStore();
  const setCategoryFilter = useStore((state) => state.setCategoryFilter);
  const setBrandFilter = useStore((state) => state.setBrandFilter);
  const setListProducts = useStore((state) => state.setListProducts);
  const listProducts = useStore((state) => state.listProducts);
  const categoryFilter = useStore((state) => state.categoryFilter);
  const brandFilter = useStore((state) => state.brandFilter);

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
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  function handleCategoryChange(event) {
    const category = event.target.value;
    setCategoryFilter(category);
    const filteredProducts = state.products.filter((product) =>
      product.categories.some((cat) => cat.name === category)
    );
    setListProducts(filteredProducts);
  }

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setBrandFilter(brand);
    const products = state.products;
    const filteredProducts = products.filter(
      (product) => product.brand.toLowerCase() === brand.toLowerCase()
    );
    setListProducts(filteredProducts);
  };

  return (
    <>
      <Navbar />
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination
          count={parseInt(listProducts.length / productsPerPage)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Filter</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={state.categoryFilter}
            label="Age"
            onChange={handleCategoryChange}
          >
            <MenuItem value="Perifericos">Perifericos</MenuItem>
            <MenuItem value="Gamer">Gamer</MenuItem>
            <MenuItem value="Oficina">Oficina</MenuItem>
            <MenuItem value="Hardware">Hardware</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Filter</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={state.brandFilter}
            label="Age"
            onChange={handleBrandChange}
          >
            <MenuItem value="Genius">Genius</MenuItem>
            <MenuItem value="Corsair">Corsair</MenuItem>
            <MenuItem value="Logitech">Logitech</MenuItem>
            <MenuItem value="XFX">XFX</MenuItem>
            <MenuItem value="Trust">Trust</MenuItem>
            <MenuItem value="Aureox">Aureox</MenuItem>
            <MenuItem value="Talon">Talon</MenuItem>
            <MenuItem value="Master">Master</MenuItem>
            <MenuItem value="Hyperx">Hyperx</MenuItem>
            <MenuItem value="Mars">Mars</MenuItem>
            <MenuItem value="Thermaltake">Thermaltake</MenuItem>
            <MenuItem value="Belkin">Belkin</MenuItem>
            <MenuItem value="Lenovo">Lenovo</MenuItem>
            <MenuItem value="Primus">Primus</MenuItem>
            <MenuItem value="Xiaomi">Xiaomi</MenuItem>
            <MenuItem value="JBL">JBL</MenuItem>
            <MenuItem value="Kelyx">Kelyx</MenuItem>
            <MenuItem value="Vidlok">Vidlok</MenuItem>
            <MenuItem value="SYX">SYX</MenuItem>
            <MenuItem value="Razer">Razer</MenuItem>
            <MenuItem value="Radeon">Radeon</MenuItem>
            <MenuItem value="Geforce">Geforce</MenuItem>
            <MenuItem value="Western Digital">Western Digital</MenuItem>
            <MenuItem value="Intel">Intel</MenuItem>
            <MenuItem value="Western Digital">Western Digital</MenuItem>
            <MenuItem value="Ryzen">Ryzen</MenuItem>
            <MenuItem value="Asus">Asus</MenuItem>
            <MenuItem value="Asrock">Asrock</MenuItem>
            <MenuItem value="MSI">MSI</MenuItem>
          </Select>
        </FormControl>
      </div>
      <List products={currentProducts} />
      <Footer />
    </>
  );
};

export default Products;
