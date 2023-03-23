import { Footer, List, Navbar } from "../../components";
import useStore from "../../store/products";
import { useState, useEffect } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Products = () => {
  // const fetchProducts = useStore((state) => state.fetchProducts);
  // const products = useStore((state) => state.products);

  const fetchProducts = useStore((state) => state.fetchProducts);
  const filteredProducts = useStore((state) => state.getFilteredProducts());
  const setCategoryFilter = useStore((state) => state.setCategoryFilter);
  const setBrandFilter = useStore((state) => state.setBrandFilter);
  const productByBrands = useStore((state) => state.getFilteredByBrand());

  const [filter, setFilter] = useState("");
  const [filterBrand, setFilterBrand] = useState("");

  const [page, setPage] = useState(1);

  // const combinedArray = filteredProducts.concat(productByBrands);
  // const uniqueArray = combinedArray.filter((value, index) => {
  //   return combinedArray.indexOf(value) === index;
  // });

  const productsPerPage = 12;
  const indexOfLastProduct = page * productsPerPage; //12
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; //0
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (event) => {
    const category = event.target.value;
    setFilter(category);
    setCategoryFilter(category);
  };

  const handleFilterChangeBrand = (event) => {
    const brand = event.target.value;
    setFilterBrand(brand);
    setBrandFilter(brand);
  };

  return (
    <>
      <Navbar />
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination
          count={parseInt(productByBrands.length / productsPerPage)}
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
            value={filter}
            label="Age"
            onChange={handleFilterChange}
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
            value={filterBrand}
            label="Age"
            onChange={handleFilterChangeBrand}
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
            <MenuItem value="Thermaltake.">Thermaltake</MenuItem>
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