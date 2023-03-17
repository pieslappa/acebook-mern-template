import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostContent from "../postContent/PostContent";
import CommentList from "../commentList/CommentList";

const SinglePost = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(post);

  const getPost = async () => {
    const response = await fetch(`/posts/${postId}`);

    if (response.status !== 200) {
      // error
    } else {
      const data = await response.json();
      setPost(data.post);
      setComments(data.comments);
    }
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <div>
      <PostContent post={post} />
      <CommentList comments={comments} showComments />
    </div>
  );
};

SinglePost.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default SinglePost;
