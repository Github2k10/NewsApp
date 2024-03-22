import React, { useContext } from "react";

import images from "../../assets/images";
import "./Navbar.scss";

const Navbar = ({ Context }) => {
  const context = useContext(Context);

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img
            onClick={() => {
              context.setKeyword("");
              context.setFlag(true);
            }}
            src={images.logo}
            alt="logo"
          />
        </div>

        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();

            const search = e.target[0].value;

            e.target[0].value = "";
            e.target[0].blur();
            if (search) {
              context.setKeyword(search);
              context.setFlag(false);
            }
          }}
        >
          <input type="text" placeholder="Search" />
          <svg className="line" viewBox="0 0 24 24" width="24" height="24">
            <g stroke="#48525C" fill="none">
              <circle
                cx="11.36167"
                cy="11.36167"
                r="9.36167"
                stroke="#48525C"
                fill="none"
              ></circle>
              <line
                className="svgC"
                x1="22"
                x2="19.9332"
                y1="22"
                y2="19.9332"
                stroke="#482DFF"
                fill="none"
              ></line>
            </g>
          </svg>
        </form>
      </div>
    </>
  );
};

export default Navbar;
