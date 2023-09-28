import { AllPosts } from "./components/PostList.js/AllPosts";

export const App = () => {
  return (
    <div className="main-container">
      <nav className="navbar">
        HEADER WILL RENDER HERE
      </nav>
      <h2 className="page-heading">My Feed</h2>
      <AllPosts />
    </div>
  );
};
