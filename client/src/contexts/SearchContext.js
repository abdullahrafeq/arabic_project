import { createContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState("");
    
    const setSearch = (query) => {
        setQuery(query);
    };
    
    return (
      <SearchContext.Provider value={{ query, setSearch }}>
        {children}
      </SearchContext.Provider>
  )
}

export { SearchContext, SearchProvider }