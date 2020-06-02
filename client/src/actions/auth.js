import { REGISTER_FAILURE, REGISTER_SUCCESS } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

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
    } catch (error) {
      console.log("register error email alreadyb exists: ", error);

      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAILURE,
      });
    }
  };
};
