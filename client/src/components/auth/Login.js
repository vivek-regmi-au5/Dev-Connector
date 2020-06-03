import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, loadUser } from "./../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Log into Your Account
      </p>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="form"
        action="create-profile.html"
      >
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => onChange(e)}
            placeholder="Email Address"
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
            name="password"
            minLength="6"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">SignUp</Link>
      </p>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStateToProps, { loadUser, login })(Login);
