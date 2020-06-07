import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const AuthLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          {" "}
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
        <Link to="/post">
          {" "}
          <i className="fas fa-post"></i> <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="/login">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const GuestLinks = (
    <ul>
      <li>
        <Link to="/profile">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? AuthLinks : GuestLinks}</Fragment>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
