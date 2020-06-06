import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
} from "./types";

// Get current user profile
export const getCurrentProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:7777/api/profile/me");
      console.log("res at profileme: ", res);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:7777/api/profile",
        formData,
        config
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Add experience
export const addExperience = (formData, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        "http://localhost:7777/api/profile/experience",
        formData,
        config
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience Added", "success"));

      history.push("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Add education
export const addEducation = (formData, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        "http://localhost:7777/api/profile/education",
        formData,
        config
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Added", "success"));

      history.push("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Delete Experience
export const deleteExperience = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `http://localhost:7777/api/profile/experience/${id}`
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience deleted", "success"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Delete Education
export const deleteEducation = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `http://localhost:7777/api/profile/education/${id}`
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education deleted", "success"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Delete account and profile
export const deleteAccount = () => {
  return async (dispatch) => {
    if (window.confirm("Are you sure? This cannot be undone!")) {
      try {
        const res = await axios.delete(`http://localhost:7777/api/profile`);
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
        dispatch(
          setAlert("Your accound has been permanently deleted", "success")
        );
      } catch (error) {
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: error.response.statusText,
            status: error.response.status,
          },
        });
      }
    }
  };
};