import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService.js/getAllUsers";
import { getPostsByUserId } from "../../services/postService.js/getMyPosts";
import { MyPosts } from "../MyPosts/MyPosts";
import "./Profiles.css";
import { useNavigate } from "react-router-dom";

export const CurrentUserProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUserById(currentUser.id).then((data) => setUser(data[0]));
  }, [currentUser]);

  useEffect(() => {
    getPostsByUserId(currentUser.id).then((data) => setUserPosts(data));
  }, [currentUser]);

  const handleEditProfile = (userId) => {
    console.log("edit profile button clicked userId= " + userId);
    navigate("/editProfile");
  };

  return (
    <section className="post-details">
      <h3 id="my-profile-title">My Profile</h3>
      <header className="user-details-header">
        <div className="details-header-top">
          <img
            id="myProfile-image"
            src={user?.picture}
            alt="headshot of user"
          />
          <div className="details-header-info">
            <div className="header-info-name">
              <h3>{user?.fullname}</h3>
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
            <h3>About</h3>
            <h5>{user?.about}</h5>
          </div>
          <div className="details-header-edit">
            <button
              className="edit-profile-button"
              value={user?.id}
              onClick={(event) => handleEditProfile(event.target.value)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </header>
    </section>
  );
};

// <section className="post-details-body">
//   <div className="details-body-title">
//     <h4>{post?.title}</h4>
//   </div>
//   <div className="details-body-post">
//     <h5>{post?.body}</h5>
//   </div>
//   <div className="details-body-likes">
//     <h5>Favorited by {likes?.length} users</h5>
//   </div>
//   <div className="button-container">
//     {post.userId === currentUser.id ? (
//       <button
//         value={post.id}
//         className="details-button"
//         id="details-button-edit"
//         onClick={(event) => handleEditBtn(event.target.value)}
//       >
//         Edit Post
//       </button>
//     ) : (
//       <button
//         value={post.id}
//         className="details-button"
//         id="details-button-favorite"
//         onClick={(event) => handleFavoriteBtn(event.target.value)}
//       >
//         Add to Favorites
//       </button>
//     )}
//   </div>
// </section>
