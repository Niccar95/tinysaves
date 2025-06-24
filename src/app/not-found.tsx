import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="notFoundLayout">
      <h1 className="notFoundTitle">404</h1>
      <h2 className="notFoundSubtitle">Oops! Page not found.</h2>
      <p className="notFoundMessage">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/">
        <i className="bi bi-arrow-left-short"></i>
        Back to login page
      </Link>
    </div>
  );
};

export default NotFound;
