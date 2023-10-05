import { useEffect, useState } from "react";
import {
  getAllLikes,
  getLikeByPostId,
  likePost,
} from "../../services/LikesService.js/getAllLikes";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PostDetails.css";
import { getPostsById } from "../../services/postService.js/getAllPosts";

export const PostDetails = ({ currentUser }) => {
  const [post, setPost] = useState([]);
  const [likes, setLikes] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostsById(postId).then((data) => {
      const postObj = data[0];
      setPost(postObj);
    });
  }, [postId]);

  useEffect(() => {
    getLikeByPostId(postId).then((data) => {
      const likesArray = data;
      setLikes(likesArray);
    });
  }, [postId, likes.length]);

  const handleFavoriteBtn = (postId) => {
    getLikeByPostId(postId).then((data) => {
      const allPostLikes = data;
      const likedThisPost = allPostLikes.filter(
        (postLike) => postLike.userId === currentUser.id
      );
      if (likedThisPost.length === 0) {
        const newLikeObj = {
          postId: parseInt(postId),
          userId: currentUser.id,
        };
        likePost(newLikeObj).then(navigate("/favorites"));
      } else {
        window.alert("you already liked this post");
      }
    });
  };

  const handleEditBtn = (postId) => {
    console.log("edit button clicked");
    navigate(`/editPost/${postId}`);
  };

  return (
    <section className="post-details">
      <h3>User Details</h3>
      <header className="post-details-header">
        <div className="details-header-top">
          <Link to={`/userProfile/${post?.user?.id}`}>
            <img
              className="details-header-image"
              src={post.user?.picture}
              alt="headshot of user"
            />
          </Link>
          <div className="details-header-info">
            <div className="header-info-name">
            <Link to={`/userProfile/${post?.user?.id}`}><h4 id="name-link">{post?.user?.fullname}</h4></Link>
            </div>
            <div className="header-info-details">{post.user?.email}</div>
            <div className="header-info-details">Cohort {post.user?.cohort}</div>
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
