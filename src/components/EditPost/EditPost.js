import { getPostsById } from "../../services/postService.js/getAllPosts";
import "./EditPost.css";
import { getAllTopics } from "../../services/SearchService/getTopics";
import { useEffect, useState } from "react";
import logo from "../NewPost/NoTextLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { editPostById } from "../../services/postService.js/editPostById";

export const EditPost = ({ currentUser }) => {
  const [topicsArray, setTopicsArray] = useState([]);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [postObj, setPostObj] = useState({});
  const [userChoices, updatePost] = useState({
    title: postObj?.title,
    body: postObj?.body,
    topicId: postObj?.topicId,
  });

  useEffect(() => {
    getPostsById(postId).then((data) => setPostObj(data[0]));
  }, [postId]);

  useEffect(() => {
    getAllTopics().then((result) => {
      setTopicsArray(result);
    });
  }, []);

  useEffect(() => {
    updatePost(postObj);
  }, [postObj]);

  const handleUpdatePost = () => {
    editPostById(postId, userChoices).then(navigate(`/myPosts`));
  };

  return (
    <>
      <section className="edit-post">
        <div className="edit-post-header">
          <h2>Edit Your</h2>
          <h2>Learning Moment</h2>
          <img
            id="form-logo"
            src={logo}
            alt="logo of lightbult with brain inside"
          />
        </div>
        <form className="edit-post-form">
          <div className="edit-post-label">
            <h4>Topic: </h4>
          </div>
          <div className="edit-post-radios">
            {topicsArray.map((topic) => {
              return (
                <label className="radio-label" key={topic.id}>
                  <input className="radio-item"
                    required
                    type="radio"
                    name="radio"
                    value={topic.id}
                    checked={userChoices.topicId === topic.id}
                    onChange={(event) => {
                      const copy = { ...userChoices };
                      copy.topicId = parseInt(event.target.value);
                      updatePost(copy);
                    }}
                  />
                  {topic.name}
                </label>
              );
            })}
          </div>
          <label className="edit-post-label">
            <h4>Title: </h4>
          </label>
          <input
            type="text"
            value={userChoices.title}
            placeholder={userChoices.title}
            className="new-post-input form-item"
            required
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.title = event.target.value;
              updatePost(copy);
            }}
          />
          <label className="edit-post-label">
            <h4>Body: </h4>
          </label>
          <textarea
            type="text"
            value={userChoices.body}
            placeholder={userChoices.body}
            className="new-post-body form-item"
            required
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.body = event.target.value;
              updatePost(copy);
            }}
          />
          {userChoices.topicId &&
          userChoices.body &&
          userChoices.title &&
          userChoices.date ? (
            <button
              type="submit"
              className="edit-post-button"
              id="edit-post-button-enabled"
              onClick={(event) => {
                event.preventDefault();
                handleUpdatePost();
              }}
            >
              Save
            </button>
          ) : (
            <button
              type="submit"
              disabled
              className="edit-post-button"
              id="edit-post-button-disabled"
            >
              Save
            </button>
          )}
        </form>
      </section>
    </>
  );
};
