import React from "react";

import "./pagination.scss";

const Pagination = ({ page, setPage, length }) => {
  return (
    <div className="pagination">
      <button
        className="prev"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        <i className="fa-solid fa-arrow-left-long"></i>
      </button>
      <button
        className="next"
        onClick={() => {
          if (page < Math.ceil(length / 10)) {
            setPage(page + 1);
          }
        }}
      >
        <i className="fa-solid fa-arrow-right-long"></i>
      </button>
    </div>
  );
};

export default Pagination;