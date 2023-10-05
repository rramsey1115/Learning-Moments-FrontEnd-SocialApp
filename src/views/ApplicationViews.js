import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AllPosts } from "../components/PostList/AllPosts";
import { NavBar } from "../components/NavBar/NavBar";
import { PostDetails } from "../components/PostDetails/PostDetails";
import { Favorites } from "../components/Favorites/Favorites";
import { NewPost } from "../components/NewPost/NewPost";
import { MyPosts } from "../components/MyPosts/MyPosts";
import { EditPost } from "../components/EditPost/EditPost";
import { CurrentUserProfile } from "../components/Profiles/CurrentUserProfile";
import { UserProfile } from "../components/Profiles/UserProfile";
import { EditProfile } from "../components/Profiles/EditProfile";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<AllPosts currentUser={currentUser} />} />
        <Route path="postDetails">
          <Route
            path=":postId"
            element={<PostDetails currentUser={currentUser} />}
          />
        </Route>
        <Route path="newPost" element={<NewPost currentUser={currentUser} />} />
        <Route
          path="favorites"
          element={<Favorites currentUser={currentUser} />}
        />
        <Route path="myPosts" element={<MyPosts currentUser={currentUser} />} />
        <Route path="editPost">
          <Route
            path=":postId"
            element={<EditPost currentUser={currentUser} />}
          />
        </Route>
        <Route path="userProfile">
          <Route
            path=":userId"
            element={<UserProfile currentUser={currentUser} />}
          />
        </Route>
        <Route
          path="currentUserProfile"
          element={<CurrentUserProfile currentUser={currentUser} />}
        />
          <Route
            path="editProfile"
            element={<EditProfile currentUser={currentUser} />}
          />
      </Route>
    </Routes>
  );
};
