import React from "react";
import { Link, useRouteError } from "react-router-dom";

import "./ErrorPage.scss";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Something Went Wrong.
          </p>
          <p className="lead">
            {error.status == 404
              ? "The page you’re looking for doesn’t exist."
              : error.statusText || error.message}
          </p>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
