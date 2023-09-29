import { Likes } from "./Likes";

export const Post = ({ filteredPosts, allPosts }) => {
    let postsArray = []
    if(filteredPosts.length > 0) {
        postsArray = filteredPosts
    } else {
        postsArray = allPosts
    }
  return postsArray.map((postObj) => {
    return ( <div key={postObj.id} className="post-body">
        <div className="post-body-left">
          <img className="post-image" alt="" src={postObj.user.picture}></img>
          <div>
            <h5 className="post-title">{postObj.title}</h5>
          </div>
        </div>
        <div className="post-body-right">
          <div className="post-topic"><h5>Topic: {postObj.topic.name}</h5></div>
          <div className="post-likes">
            <Likes key={postObj.id} post={postObj} />
          </div>
        </div>
      </div>
    );
  });
};