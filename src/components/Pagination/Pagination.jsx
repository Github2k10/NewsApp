import React from "react";

import "./pagination.scss";

const Pagination = ({ page, setPage, length, noOfPage }) => {
  return (
    <div className="pagination">
      <button
        className="prev"
        onClick={() => {
          if (page - noOfPage > 0) {
            setPage(page - noOfPage);
          } else {
            setPage(0);
          }
        }}
      >
        <i className="fa-solid fa-arrow-left-long"></i>
      </button>
      <button
        className="next"
        onClick={() => {
          if (page + noOfPage < length) {
            setPage(page + noOfPage);
          } else {
            setPage(length - noOfPage);
          }
        }}
      >
        <i className="fa-solid fa-arrow-right-long"></i>
      </button>
    </div>
  );
};

export default Pagination;
