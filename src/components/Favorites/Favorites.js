import { useEffect, useState } from "react";
// import { FavPost } from "./FavPost";
import { getFavPosts } from "../../services/postService.js/getFavoritePosts";
import { getAllPosts } from "../../services/postService.js/getAllPosts";
import "./Favorites.css";
import {
  deleteFavPost,
  getAllLikes,
} from "../../services/LikesService.js/getAllLikes";
import { Link } from "react-router-dom";
import { AllPosts } from "../PostList/AllPosts";

export const Favorites = ({ currentUser }) => {
  const [myLikesExpanded, setMyFavPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  // const [allLikes, setAllLikes] = useState([]);

  const getAndSetMyFavorites = () => {
    getFavPosts(currentUser).then((favesArray) => {
      setMyFavPosts(favesArray);
      console.log("getAndSetMyFavorites executed");
    });
  };

  const handleDeleteFavorite = async (ObjId) => {
    console.log("delete favorite with userLikes.id of --" + ObjId);
    await deleteFavPost(ObjId);
    getAndSetMyFavorites();
  };

  useEffect(() => {
    getAllPosts().then((data) => {
      setAllPosts(data);
    });
  }, []);

  useEffect(() => {
    getFavPosts(currentUser).then((favesArray) => {
      setMyFavPosts(favesArray);
    });
  }, [currentUser]);

  // useEffect(() => {
  //   getAndSetAllLikes();
  // }, []);

  // useEffect(() => {
  //   const getUpdatedFavorites = () => {
  //     getFavPosts(currentUser).then((updatedFavesArray) => {
  //       setMyFavPosts(updatedFavesArray);
  //     });
  //   };
  //   getUpdatedFavorites();
  // }, [currentUser]);

  return (
    <>
      <div className="feed-header">
        <div className="favorites-header-title">
          <div>
            <h3>My Favorites</h3>
          </div>
        </div>
      </div>
      <div className="favorites-posts-list">
        {myLikesExpanded.map((likeObj) => {
          // console.log(likeObj)
          const likedPost = allPosts.filter(
            (post) => likeObj.postId === post.id
          );
          return (
            <div key={likeObj.id} className="favorites-posts">
              <div key={likeObj.id} className="post-body">
                <div className="post-body-left">
                  <img
                    className="post-image"
                    alt=""
                    src={likedPost[0]?.user?.picture}
                  ></img>
                  <div>
                    <Link
                      props={[likedPost[0].id]}
                      key={likedPost[0]?.id}
                      to={`/postDetails/${likedPost[0]?.id}`}
                    >
                      <h5 className="post-title">{likeObj.post.title}</h5>
                    </Link>
                  </div>
                </div>
                <button
                  value={likeObj.id}
                  className="delete-fav-button button"
                  onClick={(event) => handleDeleteFavorite(event.target.value)}
                >
                  {" "}
                  X{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
