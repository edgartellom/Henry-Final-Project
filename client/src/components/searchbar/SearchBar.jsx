import React, { useState } from "react";
import useStore from "../../store/products";


const SearchBar = ()=>{

  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);
  const inputRef = React.createRef();
  const {searchProducts} = useStore();

  const onChange = (e)=>{
    let {value} = e.target;
    let term = value.toLowerCase().trim();

    if(!value){
      //r the search
    }

    setInputValue(value)

    if(term){
      setSearchTerm(term)
      searchProducts(term)
    }

  }

    return (<>
    <input
              type="search"
              className="search"
              id="search"
              name="search"
              ref={inputRef}
              value={inputValue}
              placeholder="Search"
              onChange={onChange}
            />
    </>);
}

export default SearchBar;