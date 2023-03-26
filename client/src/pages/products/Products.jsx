import { Footer, List, Navbar } from "../../components";
import useStore from "../../store/products";
import { useState, useEffect } from "react";
import { Pagination, Stack, Typography } from "@mui/material";

const Products = () => {
  const fetchProducts = useStore((state) => state.fetchProducts);
  const products = useStore((state) => state.products);

  const [page, setPage] = useState(1);

  const productsPerPage = 12;
  const indexOfLastProduct = page * productsPerPage; //12
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; //0
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination
          count={parseInt(products.length / productsPerPage)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
      </div>
      <List products={currentProducts} />
      <Footer />
    </>
  );
};

export default Products;
