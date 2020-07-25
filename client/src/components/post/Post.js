import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "./../layout/Spinner";
import { getOnePost } from "./../../actions/post";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getOnePost, post: { post, loading }, match }) => {
  useEffect(() => {
    getOnePost(match.params.id);
  }, getOnePost);
  return loading || null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/post" className="btn btn-primary">
        Go Back
      </Link>
      <PostItem post={post} showActions={false}></PostItem>
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

export default connect(mapStateToProps, { getOnePost })(Post);
