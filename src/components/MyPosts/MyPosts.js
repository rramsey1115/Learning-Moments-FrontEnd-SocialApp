import { useEffect, useState } from "react";
import {
  getMyPosts,
  getPostsByUserId,
} from "../../services/postService.js/getMyPosts";
import { Link, useNavigate } from "react-router-dom";
import { Likes } from "../PostList/Likes";
import { DeletePost } from "../../services/postService.js/deletePost";
import "./MyPosts.css";

export const MyPosts = ({ currentUser, getAndSetPosts }) => {
  const [myPosts, setMyPosts] = useState([]);

  const getandSetMyPosts = () => {
    getPostsByUserId(currentUser?.id).then((data) => {
      setMyPosts(data);
    });
  };

  useEffect(() => {
    getandSetMyPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    await DeletePost(postId);
    getandSetMyPosts();
  };

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
                <Link to={`/userProfile/${post?.user?.id}`}>
                  <img
                    className="post-image"
                    alt=""
                    src={post.user.picture}
                  ></img>
                </Link>
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
                  <i
                    className="fa-solid fa-circle-xmark fa-xl"
                    id="post-delete-button"
                    value={post.id}
                    onClick={(event) => {
                      handleDeletePost(post.id);
                    }}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
