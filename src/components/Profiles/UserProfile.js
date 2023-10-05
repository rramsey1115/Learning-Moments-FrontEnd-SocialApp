import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../../services/userService.js/getAllUsers";
import { getPostsByUserId } from "../../services/postService.js/getMyPosts";
import { Likes } from "../PostList/Likes";

export const UserProfile = () => {
  const userId = useParams();
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserById(userId.userId).then((data) => setUser(data[0]));
  }, [userId.userId]);

  useEffect(() => {
    getPostsByUserId(userId.userId).then((data) => setUserPosts(data));
  }, [userId]);

  return (
    <section className="post-details">
      <h3 id="my-profile-title">User Profile</h3>
      <header className="user-details-header">
        <div className="details-header-top">
          <img
            className="details-header-image"
            src={user?.picture}
            alt="headshot of user"
          />
          <div className="details-header-info">
            <div className="header-info-name">
              <h4>{user?.fullname}</h4>
            </div>
            <div className="header-info-details">{user?.email}</div>
            <div className="header-info-details">Cohort {user?.cohort}</div>
            <div className="header-info-details">
              Current Posts: {userPosts?.length}
            </div>
          </div>
        </div>
        <div className="details-header-bottom">
          <div className="details-header-about">
            <h4>About</h4>
            <h5>{user?.about}</h5>
          </div>
        </div>
      </header>
      <section className="user-posts">
        <h3>User Learning Moments</h3>
        {userPosts.map((post) => {
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
                    props={[post.id]}
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
      </section>
    </section>
  );
};
