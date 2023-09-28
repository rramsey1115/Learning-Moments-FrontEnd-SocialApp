import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService.js/getAllPosts";
import "./AllPosts.css"
import { Likes } from "./Likes";

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((allPostsArray) => {
      setAllPosts(allPostsArray);
    });
  }, []);

  return (
    <div className="posts">
      {allPosts.map((postObj) => {
        return (
          <div key={postObj.id} className="post-body">
            <div className="post-body-left">
                <img className="post-image" alt="" src={postObj.user.picture}></img>
                <div className="post-title"><h3>{postObj.title}</h3></div>
            </div>
            <div className="post-body-right">
                <div className="post-topic">Topic: {postObj.topic.name}</div>
                <div className="post-likes"><Likes key={postObj.id} post={postObj} /></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
