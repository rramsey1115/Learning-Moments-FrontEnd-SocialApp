import { useState } from "react";
import { getMyPosts } from "../../services/postService.js/getMyPosts";
import { Link } from "react-router-dom";
import { Likes } from "../PostList/Likes";

export const MyPosts = ({ currentUser, getAndSetPosts }) => {
  const [myPosts, setMyPosts] = useState([]);

  getMyPosts(currentUser.id).then((data) => {
    setMyPosts(data);
  });

  return (
    <>
      <div className="feed-header">
        <div className="feed-header-title">
          <h3>My Feed</h3>
        </div>
      </div>
      <div className="posts">
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
                <div className="post-topic">
                  <h5>{post.topic.name}</h5>
                </div>
                <div className="post-likes">
                  <Likes key={post.id} post={post} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
