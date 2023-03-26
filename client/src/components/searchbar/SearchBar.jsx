import { useEffect } from "react";
import useStore from "../../store/products";

const SearchBar = () => {

     const {ListProducts} = useStore()
     const {searchProducts} = useStore()
     
    searchProducts("eso")
     useEffect(() => {
        console.log(ListProducts)      
     })

    return (<>
        <input
              type="search"
              className="search"
              id="search"
              name="search"
              placeholder="Search"
            />
    </>);
};

export default SearchBar;