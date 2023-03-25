export const getFilteredByBrand = (listProducts, brandFilter) => {
  //const { listProducts, brandFilter } = get();
  if (brandFilter !== "") {
    const filteredByBand = listProducts.filter(
      (product) => product.brand.toLowerCase() == brandFilter.toLowerCase()
    );
    //set({ listProducts: filteredByBand });
    return filteredByBand;
  } else {
    console.log("errorrr");
    return listProducts;
  }
};
