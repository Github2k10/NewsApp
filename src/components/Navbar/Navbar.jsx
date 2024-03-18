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
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            class="line"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <g stroke="#48525C" fill="none">
              <circle
                cx="11.36167"
                cy="11.36167"
                r="9.36167"
                stroke="#48525C"
                fill="none"
              ></circle>
              <line
                class="svgC"
                x1="22"
                x2="19.9332"
                y1="22"
                y2="19.9332"
                stroke="#482DFF"
                fill="none"
              ></line>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Navbar;
