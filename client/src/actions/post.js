import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./../actions/types";

//Get posts
export const getPost = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:7777/api/post");
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

//Update likes
export const addLikes = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://localhost:7777/api/post/like/${id}`);
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data },
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

//Remove likes
export const removeLikes = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `http://localhost:7777/api/post/unlike/${id}`
      );
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data },
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

//Delete post
export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:7777/api/post/${id}`);
      dispatch({
        type: DELETE_POST,
        payload: id,
      });

      dispatch(setAlert("Post removed", "success"));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

//Add post
export const addPost = (formData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:7777/api/post/`,
        formData,
        config
      );
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });

      dispatch(setAlert("Post created", "success"));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

//Get post
export const getOnePost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:7777/api/post/${id}`);
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

//Add comment
export const addComment = (postId, formData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:7777/api/post/comment/${postId}`,
        formData,
        config
      );
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });

      dispatch(setAlert("Comment Added", "success"));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

//Delete comment
export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `http://localhost:7777/api/post/comment/${postId}/${commentId}`
      );
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId,
      });

      dispatch(setAlert("Comment removed", "success"));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};
