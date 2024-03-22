import React, { useState, createContext, useEffect } from "react";

import { Navbar, Home, Search } from "./components";
import "./App.scss";

const Context = createContext();

function App() {
  const [flag, setFlag] = useState(true);
  const [keyword, setKeyword] = useState("");

  return (
    <Context.Provider value={{ flag, setFlag, keyword, setKeyword }}>
      <Navbar Context={Context} />
      {flag ? <Home /> : <Search Context={Context} />}
    </Context.Provider>
  );
}

export default App;
