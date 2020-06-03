import {
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "./../utils/setAuthToken";

export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("http://localhost:7777/api/auth");
      console.log("data at loaduser: ", res);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
};

export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(
        "http://localhost:7777/api/user",
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      console.log("register error email alreadyb exists: ", error);

      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAILURE,
      });
      dispatch(loadUser());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(
        "http://localhost:7777/api/auth",
        body,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("register error email alreadyb exists: ", error);

      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};
