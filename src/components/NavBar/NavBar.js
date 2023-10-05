import { Link, useNavigate } from "react-router-dom";
import logo from "./NoTextLogo.png";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">
          <img
            className="navbar-link"
            id="navbar-logo"
            src={logo}
            alt="logo of lightbulb with brain inside emitting light"
          />
        </Link>
      </li>
      <li className="navbar-item">
        <div className="navbar-link">
          <Link to="/">All Posts</Link>
        </div>
      </li>
      <li className="navbar-item">
        <div className="navbar-link">
          <Link to="/favorites">Favorites</Link>
        </div>
      </li>
      <li className="navbar-item">
        <div className="navbar-link">
          <Link to="/newPost">New Post</Link>
        </div>
      </li>
      <li className="navbar-item">
        <div className="navbar-link">
          <Link to="/myPosts">My Posts</Link>
        </div>
      </li>
      <li className="navbar-item">
        <div className="navbar-link">
          <Link to="currentUserProfile">My Profile</Link>
        </div>
      </li>
      {localStorage.getItem("learning_user") ? (
        <li className="navbar-item">
          <div className="navbar-link">
            <Link
              to=""
              onClick={() => {
                localStorage.removeItem("learning_user");
                navigate("/login", { replace: true });
              }}
            >
              Logout
            </Link>
          </div>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
