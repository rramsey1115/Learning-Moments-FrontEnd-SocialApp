import { useEffect, useState } from "react";
import "./EditProfile.css";
import logo from "./NoTextLogo.png";
import { getUserById } from "../../services/userService.js/getAllUsers";
import { useNavigate } from "react-router-dom";
import { UpdateProfile } from "../../services/ProfileService.js/updateProfile";

export const EditProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [userChoices, updatePost] = useState({
    fullname: user?.fullname,
    email: user?.email,
    password: user?.password,
    picture: user?.picture,
    about: user?.about,
    cohort: user?.cohort,
  });

  const handleUpdateProfile = async () => {
    await UpdateProfile(user.id, userChoices);
    navigate(`/currentUserProfile`);
  };

  useEffect(() => {
    getUserById(currentUser?.id).then((userObj) => {
      setUser(userObj[0]);
    });
  }, [currentUser]);

  useEffect(() => {
    updatePost(user);
  }, [user]);

  return (
    <section className="edit-profile">
      <div className="edit-profile-header">
        <h2>Edit Your</h2>
        <h2>Profile</h2>
        <img
          id="form-logo"
          src={logo}
          alt="logo of lightbult with brain inside"
        />
      </div>
      <form className="edit-profile-form">
        <div className="edit-profile-label">
          <h4>Full Name: </h4>
        </div>
        <input
          className="edit-profile-input"
          type="text"
          value={userChoices?.fullname}
          required
          placeholder={userChoices?.fullname}
          onChange={(event) => {
            const copy = { ...userChoices };
            copy.fullname = event.target.value;
            updatePost(copy);
          }}
        />
        <div className="edit-profile-label">
          <h4>Email: </h4>
        </div>
        <input
          className="edit-profile-input"
          type="text"
          value={userChoices?.email}
          required
          placeholder={userChoices?.email}
          onChange={(event) => {
            const copy = { ...userChoices };
            copy.email = event.target.value;
            updatePost(copy);
          }}
        />
        <div className="edit-profile-label">
          <h4>Password: </h4>
        </div>
        <input
          className="edit-profile-input"
          type="text"
          value={userChoices?.password}
          required
          placeholder={userChoices?.password}
          onChange={(event) => {
            const copy = { ...userChoices };
            copy.password = event.target.value;
            updatePost(copy);
          }}
        />
        <div className="edit-profile-label">
          <h4>Profile Picture: </h4>
        </div>
        <input
          className="edit-profile-input"
          type="text"
          value={userChoices?.picture}
          required
          placeholder={userChoices?.picture}
          onChange={(event) => {
            const copy = { ...userChoices };
            copy.picture = event.target.value;
            updatePost(copy);
          }}
        />
        <div className="edit-profile-label">
          <h4>NSS Cohort: </h4>
        </div>
        <input
          className="edit-profile-input"
          type="text"
          value={userChoices?.cohort}
          required
          placeholder={userChoices?.cohort}
          onChange={(event) => {
            const copy = { ...userChoices };
            copy.cohort = event.target.value;
            updatePost(copy);
          }}
        />
        <div className="edit-profile-label">
          <h4>About: </h4>
        </div>
        <textarea
          className="edit-profile-input"
          type="text"
          value={userChoices?.about}
          required
          placeholder={userChoices?.about}
          onChange={(event) => {
            const copy = { ...userChoices };
            copy.about = event.target.value;
            updatePost(copy);
          }}
        />
        <div>
          <button
            className="subit-button"
            id="edit-profile-submit"
            onClick={(event) => {
              event.preventDefault();
              handleUpdateProfile();
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};
