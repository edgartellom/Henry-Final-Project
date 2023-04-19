import React, { useEffect, useState } from "react";
import useUserStore from "../../store/users";
import useStore from "../../store/products";
import { useUserContext } from "../../components/contexts/userContexts";

const Favorites = () => {
  const getUserById = useUserStore((state) => state.getUserById);
  const { user } = useUserContext();
  const [favoritosUsuario, setFavoritosUsuario] = useState([]);

  useEffect(() => {
    if (user) {
      const obtenerUsuario = (async () => {
        const userDb = await getUserById(user.uid);
        if (userDb) {
          setFavoritosUsuario(userDb.favorites);
        }
      })();
    }
  }, [user]);

  console.log(favoritosUsuario);

  return (
    <div className="center">
      <h2>Favorites</h2>
    </div>
  );
};

export default Favorites;
