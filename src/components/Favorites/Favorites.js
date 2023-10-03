import { useEffect, useState } from "react";
import { FavPost } from "./FavPost";
import { getFavPosts } from "../../services/postService.js/getFavoritePosts";
import { getAllPosts } from "../../services/postService.js/getAllPosts";
import "./Favorites.css"

export const Favorites = ({ currentUser }) => {
  const [favPosts, setFavPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((allPostsArray) => {
      setAllPosts(allPostsArray);
    });
  }, []);

  useEffect(() => {
    getFavPosts(currentUser).then((favesArray) => {
      setFavPosts(favesArray);
    });
  }, [currentUser, favPosts]);

  return (
    <>
      <div className="favorites-header">
        <div className="favorites-header-title">
          <div>
            <h3>My Favorites</h3>
          </div>
        </div>
      </div>
      <div className="favorites-posts-list">
        {favPosts.map((favPostObj) => {
          return (
            <div key={favPostObj.id} className="favorites-posts">
              <FavPost
                currentUser={currentUser}
                setFavPosts={setFavPosts}
                favPostObj={favPostObj}
                allPosts={allPosts}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
