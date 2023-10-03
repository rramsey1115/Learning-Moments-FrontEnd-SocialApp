import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AllPosts } from "../components/PostList/AllPosts";
import { NavBar } from "../components/NavBar/NavBar";
import { PostDetails } from "../components/PostDetails/PostDetails";
import { Favorites } from "../components/Favorites/Favorites";
import { NewPost } from "../components/NewPost/NewPost";
import { MyPosts } from "../components/MyPosts/MyPosts";

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
        <Route path="myPosts" element={<MyPosts currentUser={currentUser}/>} />
      </Route>
    </Routes>
  );
};
