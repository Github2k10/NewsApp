import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./components";
import "./App.scss";

const route = createBrowserRouter([{
  path: "/",
  element: <Home />
}]);

function App() {
  return <></>;
}

export default App;
