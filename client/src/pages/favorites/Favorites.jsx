import React, { useEffect, useState } from "react";
import useUserStore from "../../store/users";
import useStore from "../../store/products";
import { List } from "../../components";
import { Link } from "react-router-dom";

const Favorites = () => {
  const users = useUserStore((state) => state.users);
  const current = useUserStore((state) => state.currentUser);
  const products = useStore((state) => state.listProducts);
  const getUserById = useUserStore((state) => state.getUserById);
  const fetchProducts = useStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
    try {
      const response = async () => {
        const userId = await getUserById(current.uid);
      };
    } catch (error) {
      console.log("error");
    }
  }, []);

  const idProducts = products.map((el) => el.id);
  let usersFavorites = users.favorites;
  const miArrayUnico = usersFavorites.filter((valor, indice) => {
    return usersFavorites.indexOf(valor) === indice;
  });
  console.log(usersFavorites);

  let arrayRepetidos = [];

  for (let i = 0; i < idProducts.length; i++) {
    for (let j = 0; j < miArrayUnico.length; j++) {
      if (idProducts[i] === miArrayUnico[j]) {
        arrayRepetidos.push(idProducts[i]);
      }
    }
  }

  const filteredData = products.filter((item) =>
    arrayRepetidos.includes(item.id)
  );

  return (
    <div className="center">
      <di>
        <Link to="/products" className="homeButton">
          Go back
        </Link>
      </di>
      <h2>Favorites</h2>
      {filteredData && filteredData.length ? (
        <List products={filteredData} />
      ) : (
        <h3>YOU DON´T HAVE FAVORITE</h3>
      )}
    </div>
  );
};

export default Favorites;
