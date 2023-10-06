import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService.js/getAllUsers";
import logo from "./NoTextLogo.png";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="header">
            <div className="header-heading">
              <h1 id="header-title">Learning Moments</h1>
            </div>
            <img
              alt="logo of lightbulb with brain inside and the text learning moments"
              id="login-logo"
              src={logo}
            />
            <div className="header-subheading">
              <h3>Code Together.</h3>
              <h3>Learn Together.</h3>
              <h3>One Moment at a Time.</h3>
            </div>
          </div>
          <div className="auth-div">
            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
              <div>
                <button id="sign-in-button" type="submit">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">
          <div id="register-link"> Not a member yet?</div>
        </Link>
      </section>
    </main>
  );
};
