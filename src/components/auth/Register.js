import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import logo from "./NoTextLogo.png"
import { createUser, getUserByEmail } from "../../services/userService.js/getAllUsers"

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    cohort: 0,
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
      cohort: parseInt(user.cohort),
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: createdUser.id,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
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
        <h2 id="reg-title">Create Account</h2>
        <div className="auth-div">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="fullName"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </div>
        <div className="auth-div">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </div>
        <div className="auth-div">
          <div>
            <input
              onChange={updateUser}
              type="number"
              id="cohort"
              className="auth-form-input"
              placeholder="Cohort #"
              required
            />
          </div>
        </div>
        <div className="auth-div">
          <div>
            <button id="register-button" type="submit">Register</button>
          </div>
        </div>
      </form>
    </main>
  )
}
