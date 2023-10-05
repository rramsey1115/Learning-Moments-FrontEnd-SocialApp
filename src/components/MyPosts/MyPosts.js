import { useEffect, useState } from "react";
import { getMyPosts, getPostsByUserId } from "../../services/postService.js/getMyPosts";
import { Link, useNavigate } from "react-router-dom";
import { Likes } from "../PostList/Likes";
import { DeletePost } from "../../services/postService.js/deletePost";
import "./MyPosts.css";

export const MyPosts = ({ currentUser, getAndSetPosts }) => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {getPostsByUserId(currentUser?.id).then((data) => {
    setMyPosts(data);
  });},[currentUser])
  

  const handleDeletePost = (postId) => {
    DeletePost(postId);
  };

  // const Navigate = useNavigate();

  return (
    <>
      <div className="feed-header">
        <div className="feed-header-title">
          <h3>My Learning Moments</h3>
        </div>
      </div>
      <div className="myposts">
        {myPosts.map((post) => {
          return (
            <div key={post.id} className="post-body">
              <div className="post-body-left">
                <img
                  className="post-image"
                  alt=""
                  src={post.user.picture}
                ></img>
                <div>
                  <Link
                    props={[post.id, getAndSetPosts]}
                    key={post.id}
                    to={`/postDetails/${post.id}`}
                  >
                    <h5 className="post-title">{post.title}</h5>
                  </Link>
                </div>
              </div>
              <div className="post-body-right">
                <div className="post-likes">
                  <Likes key={post.id} post={post} />
                </div>
                <div>
                  <button
                    value={post.id}
                    className="delete-button"
                    onClick={(event) => {
                      handleDeletePost(event.target.value)
                    }}
                  >
                    {" "}
                    X{" "}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
