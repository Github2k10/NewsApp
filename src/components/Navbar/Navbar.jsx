import React, { useEffect, useState } from "react";

import images from "../../assets/images";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={images.logo} alt="logo" />
        </div>

        <div className="search">
          <input type="text" placeholder="Search" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
