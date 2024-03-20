import React from "react";

import "./pagination.scss";

const Pagination = ({ page, setPage, length }) => {
  return (
    <div className="pagination">
      <button
        className="prev"
        onClick={() => {
          if (page - 5 > 0) {
            setPage(page - 5);
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
          if (page + 5 < length) {
            setPage(page + 5);
          } else {
            setPage(length - 5);
          }
        }}
      >
        <i className="fa-solid fa-arrow-right-long"></i>
      </button>
    </div>
  );
};

export default Pagination;
