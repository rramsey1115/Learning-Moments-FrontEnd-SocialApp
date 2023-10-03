import { Link } from "react-router-dom";
import { deleteFavoritedPost } from "../../services/LikesService.js/getAllLikes";
import { getFavPosts } from "../../services/postService.js/getFavoritePosts";
import { useEffect } from "react";

export const FavPost = ({ favPostObj, allPosts, currentUser, setFavPosts }) => {
  const likedPost = allPosts.filter((post) => favPostObj.postId === post.id);

  useEffect(() => {
    const getUpdatedFavorites = () => {
      getFavPosts(currentUser).then((updatedFavesArray) => {
        setFavPosts(updatedFavesArray);
      });
    };
  }, [currentUser, setFavPosts]);

  const handleDeleteFavorite = (ObjId) => {
    console.log("delete favorite with userLikes.id of --" + ObjId);
    deleteFavoritedPost(ObjId);
  };

  return (
    <div key={favPostObj.id} className="post-body">
      <div className="post-body-left">
        <img
          className="post-image"
          alt=""
          src={likedPost[0]?.user.picture}
        ></img>
        <div>
          <Link
            props={[likedPost[0].id]}
            key={likedPost[0].id}
            to={`/postDetails/${likedPost[0].id}`}
          >
            <h5 className="post-title">{favPostObj.post.title}</h5>
          </Link>
        </div>
      </div>
      <button
        value={favPostObj.id}
        className="delete-fav-button button"
        onClick={(event) => handleDeleteFavorite(event.target.value)}
      >
        {" "}
        X{" "}
      </button>
    </div>
  );
};
