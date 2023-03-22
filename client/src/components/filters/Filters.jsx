import React from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import useStore from "../../store/products";
import { useEffect } from "react";

const Filters = () => {
  const products = useStore((state) => state.products);
  const fetchProducts = useStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  const [filter, setFilter] = useState("");
  console.log(products);

  const handleChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return product.category.some((category) => {
      return category.name == filter;
    });
  });
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="Perifericos">Perifericos</MenuItem>
          <MenuItem value="Gamer">Gamer</MenuItem>
          <MenuItem value="Oficina">Oficina</MenuItem>
          <MenuItem value="Hardware">Hardware</MenuItem>
        </Select>
      </FormControl>
      <ul>
        {filteredProducts &&
          filteredProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default Filters;
