import { Footer, List, Navbar } from "../../components";
import useStore from "../../store/products";
import { useState, useEffect } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { getFilteredByBrand } from "../../tools/filters";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";

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
    setPage(1); // Resetear la página a la 1 cuando se filtra por marca
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
  }

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setBrandFilter(brand);
    const products = state.products;
    const filteredProducts = products.filter(
      (product) => product.brand.toLowerCase() === brand.toLowerCase()
    );
    setListProducts(filteredProducts);
    setPage(1); // Resetear la página a la 1 cuando se filtra por marca
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
  };

  const handleRefresh = () => {
    setCategoryFilter("");
    setBrandFilter("");
    // Volver a mostrar la lista completa de productos
    setListProducts(state.products);
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
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
              <MenuItem value="Perifericos" style={{ color: "#2196f3" }}>
                Perifericos
              </MenuItem>
              <MenuItem value="Gamer" style={{ color: "#2196f3" }}>
                Gamer
              </MenuItem>
              <MenuItem value="Oficina" style={{ color: "#2196f3" }}>
                Oficina
              </MenuItem>
              <MenuItem value="Hardware" style={{ color: "#2196f3" }}>
                Hardware
              </MenuItem>
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
              <MenuItem value="Genius" style={{ color: "#2196f3" }}>
                Genius
              </MenuItem>
              <MenuItem value="Corsair" style={{ color: "#2196f3" }}>
                Corsair
              </MenuItem>
              <MenuItem value="Logitech" style={{ color: "#2196f3" }}>
                Logitech
              </MenuItem>
              <MenuItem value="XFX" style={{ color: "#2196f3" }}>
                XFX
              </MenuItem>
              <MenuItem value="Trust" style={{ color: "#2196f3" }}>
                Trust
              </MenuItem>
              <MenuItem value="Aureox" style={{ color: "#2196f3" }}>
                Aureox
              </MenuItem>
              <MenuItem value="Talon" style={{ color: "#2196f3" }}>
                Talon
              </MenuItem>
              <MenuItem value="Master" style={{ color: "#2196f3" }}>
                Master
              </MenuItem>
              <MenuItem value="Hyperx" style={{ color: "#2196f3" }}>
                Hyperx
              </MenuItem>
              <MenuItem value="Mars" style={{ color: "#2196f3" }}>
                Mars
              </MenuItem>
              <MenuItem value="Thermaltake" style={{ color: "#2196f3" }}>
                Thermaltake
              </MenuItem>
              <MenuItem value="Belkin" style={{ color: "#2196f3" }}>
                Belkin
              </MenuItem>
              <MenuItem value="Lenovo" style={{ color: "#2196f3" }}>
                Lenovo
              </MenuItem>
              <MenuItem value="Primus" style={{ color: "#2196f3" }}>
                Primus
              </MenuItem>
              <MenuItem value="Xiaomi" style={{ color: "#2196f3" }}>
                Xiaomi
              </MenuItem>
              <MenuItem value="JBL" style={{ color: "#2196f3" }}>
                JBL
              </MenuItem>
              <MenuItem value="Kelyx" style={{ color: "#2196f3" }}>
                Kelyx
              </MenuItem>
              <MenuItem value="Vidlok" style={{ color: "#2196f3" }}>
                Vidlok
              </MenuItem>
              <MenuItem value="SYX" style={{ color: "#2196f3" }}>
                SYX
              </MenuItem>
              <MenuItem value="Razer" style={{ color: "#2196f3" }}>
                Razer
              </MenuItem>
              <MenuItem value="Radeon" style={{ color: "#2196f3" }}>
                Radeon
              </MenuItem>
              <MenuItem value="Geforce" style={{ color: "#2196f3" }}>
                Geforce
              </MenuItem>
              <MenuItem value="Western Digital" style={{ color: "#2196f3" }}>
                Western Digital
              </MenuItem>
              <MenuItem value="Intel" style={{ color: "#2196f3" }}>
                Intel
              </MenuItem>
              <MenuItem value="Western Digital" style={{ color: "#2196f3" }}>
                Western Digital
              </MenuItem>
              <MenuItem value="Ryzen" style={{ color: "#2196f3" }}>
                Ryzen
              </MenuItem>
              <MenuItem value="Asus" style={{ color: "#2196f3" }}>
                Asus
              </MenuItem>
              <MenuItem value="Asrock" style={{ color: "#2196f3" }}>
                Asrock
              </MenuItem>
              <MenuItem value="MSI" style={{ color: "#2196f3" }}>
                MSI
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
