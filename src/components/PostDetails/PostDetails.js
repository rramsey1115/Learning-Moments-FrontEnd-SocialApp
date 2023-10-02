import { useEffect, useState } from "react";
import {
  getLikeByPostId,
  likePost,
} from "../../services/LikesService.js/getAllLikes";
import { useParams } from "react-router-dom";
import "./PostDetails.css";
import { getPostsById } from "../../services/postService.js/getAllPosts";

export const PostDetails = ({ currentUser }) => {
  const [post, setPost] = useState([]);
  const [likes, setLikes] = useState([]);
  const { postId, getAndSetPosts } = useParams();

  useEffect(() => {
    getPostsById(postId).then((data) => {
      const postObj = data[0];
      setPost(postObj);
    });
  }, [postId]);

  useEffect(() => {
    getLikeByPostId(postId).then((data) => {
      const likesArray = JSON.stringify(data);
      setLikes(likesArray);
    });
  }, [postId, likes]);

  const handleFavoriteBtn = (postId) => {
    console.log("favorite button clicked");
    const newLikeObj = {
      postId: parseInt(postId),
      userId: currentUser.id,
    };

    likePost(newLikeObj).then(() => {
    });
  };

  const handleEditBtn = () => {
    console.log("edit button clicked");
  };

  return (
    <section className="post-details">
      <h3>User Details</h3>
      <header className="post-details-header">
        <div className="details-header-top">
          <img
            className="details-header-image"
            src={post.user?.picture}
            alt="headshot of user"
          />
          <div className="details-header-info">
            <div className="header-info-name">
              <h4>{post?.user?.fullname}</h4>
            </div>
            <div className="header-info-email">{post.user?.email}</div>
            <div className="header-info-cohort">Cohort {post.user?.cohort}</div>
          </div>
        </div>
        <div className="details-header-bottom">
          <div className="details-header-about">
            <h4>About</h4>
            <h5>{post.user?.about}</h5>
          </div>
        </div>
      </header>
      <h3>Learning Moment</h3>
      <section className="post-details-body">
        <div className="details-body-title">
          <h4>{post?.title}</h4>
        </div>
        <div className="details-body-post">
          <h5>{post?.body}</h5>
        </div>
        <div className="details-body-likes">
          <h5>Favorited by {likes?.length} users</h5>
        </div>
        <div className="button-container">
          {post.userId === currentUser.id ? (
            <button
              value={post.id}
              className="details-button"
              id="details-button-edit"
              onClick={(event) => handleEditBtn(event.target.value)}
            >
              Edit Post
            </button>
          ) : (
            <button
              value={post.id}
              className="details-button"
              id="details-button-favorite"
              onClick={(event) => handleFavoriteBtn(event.target.value)}
            >
              Add to Favorites
            </button>
          )}
        </div>
      </section>
    </section>
  );
};
