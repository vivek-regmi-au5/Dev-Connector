import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { addLikes, removeLikes, deletePost } from "./../../actions/post";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, comments, likes, date },
  addLikes,
  removeLikes,
  deletePost,
}) => (
  <div class="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img class="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p class="my-1">{text}</p>
      <p class="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      <button
        onClick={(e) => addLikes(_id)}
        type="button"
        class="btn btn-light"
      >
        <i class="fas fa-thumbs-up"></i>
        {likes.length > 0 && <span>{likes.length}</span>}
      </button>
      <button
        onClick={(e) => removeLikes(_id)}
        type="button"
        class="btn btn-light"
      >
        <i class="fas fa-thumbs-down"></i>
      </button>
      <Link to={`/post/${_id}`} class="btn btn-primary">
        Discussion{" "}
        {comments.length > 0 && (
          <span class="comment-count">{comments.length}</span>
        )}
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={(e) => deletePost(_id)}
          type="button"
          class="btn btn-danger"
        >
          <i class="fas fa-times"></i>
        </button>
      )}
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { addLikes, removeLikes, deletePost })(
  PostItem
);
