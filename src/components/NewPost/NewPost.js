import "./NewPost.css";
import { getAllTopics } from "../../services/SearchService/getTopics";
import { useEffect, useState } from "react";
import logo from "./NoTextLogo.png";
import { PostNewPost } from "../../services/postService.js/postNewPost";
import { useNavigate } from "react-router-dom";

export const NewPost = ({ currentUser }) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = mm + "/" + dd + "/" + yyyy;

  const [topicsArray, setTopicsArray] = useState([]);
  // const [user, setUser] = useState({})
  const [newPostObj, setNewPostObj] = useState({
    title: "",
    body: "",
    date: formattedToday,
    userId: currentUser.id,
    topicId: 0,
  });

  const Navigate = useNavigate();

  useEffect(()=> {
    setNewPostObj(newPostObj)
  }, [])

  useEffect(() => {
    getAllTopics().then((result) => {
      setTopicsArray(result);
    });
  }, []);

  // useEffect(() => {
  //   setUser(currentUser)
  // },[currentUser])

  const handleNewPost = async () => {
    await PostNewPost(newPostObj);
    Navigate("/myPosts");
  }


  return (
    <section className="new-post">
      <div className="new-post-header">
        <h1>Share Your</h1>
        <h1>Learning Moment</h1>
        <img
          id="form-logo"
          src={logo}
          alt="logo of lightbult with brain inside"
        />
      </div>
      <form className="new-post-form">
        <select
          className="new-post-dropdown new-post-form-item"
          required
          onChange={(event) => {
            const copy = { ...newPostObj };
            copy.topicId = parseInt(event.target.value);
            setNewPostObj(copy);
          }}
        >
          <option value="0">Select Topic</option>
          {topicsArray.map((topic) => {
            return (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          value={newPostObj.title}
          placeholder="Post Title"
          className="new-post-input new-post-form-item"
          required
          onChange={(event) => {
            const copy = { ...newPostObj };
            copy.title = event.target.value;
            setNewPostObj(copy);
          }}
        />
        <textarea
          type="text"
          value={newPostObj.body}
          placeholder="Your Learning Moment"
          className="new-post-body new-post-form-item"
          required
          onChange={(event) => {
            const copy = { ...newPostObj };
            copy.body = event.target.value;
            setNewPostObj(copy);
          }}
        />
        {newPostObj.topicId &&
        newPostObj.body &&
        newPostObj.title &&
        newPostObj.date ? (
          <button
            type="submit"
            className="new-post-button"
            id="new-post-button-enabled"
            onClick={(event) => {
              event.preventDefault();
              handleNewPost();
            }}
          >
            Post
          </button>
        ) : (
          <button
            type="submit"
            disabled
            className="new-post-button"
            id="new-post-button-disabled"
          >
            Post
          </button>
        )}
      </form>
    </section>
  );
};
