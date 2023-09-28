import "./AllPosts.css";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService.js/getAllPosts";
import { getAllTopics } from "../../services/SearchService/getTopics";
import { Post } from "./Post";
import { SearchBar } from "../Search.js/SearchBar";

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [showFilteredByTopicId, setFilteredByTopic] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState("");
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const foundPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(userInput.toLowerCase())
    );
    if (userInput.length >= 1 && foundPosts.length > 0) {
      setFilteredPosts(foundPosts);
    } else if (userInput.length >= 1 && foundPosts.length < 1) {
      document.getElementById("search-input-text").value = "";
      window.alert("No Results Found");
      setFilteredPosts(allPosts);
    }
  }, [userInput, allPosts]);

  useEffect(() => {
    getAllPosts().then((allPostsArray) => {
      setAllPosts(allPostsArray);
    });
  }, []);

  useEffect(() => {
    getAllTopics().then((topicsArray) => {
      setAllTopics(topicsArray);
    });
  }, []);

  useEffect(() => {
    if (showFilteredByTopicId > 0) {
      const filteredByTopicArray = allPosts.filter(
        (post) => post.topic.id == showFilteredByTopicId
      );
      setFilteredPosts(filteredByTopicArray);
    } else {
      setFilteredPosts(allPosts);
    }
  }, [showFilteredByTopicId, allPosts]);

  return (
    <>
      <div className="feed-header">
        <div className="feed-header-title">
          <h2>My Feed</h2>
        </div>
        <div className="search-container">
          <div className="filter-dropdown">
            <select
              onChange={(changeEvent) =>
                setFilteredByTopic(changeEvent.target.value)
              }
            >
              <option value="0">Filter by Topic: </option>
              {allTopics.map((topic) => {
                return (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="search-input">
            <input
              type="text"
              id="search-input-text"
              defaultValue={userInput}
              className="posts-search"
              placeholder="Search Posts"
              onChange={(event) => {
                console.log("userInput changed to: " + userInput);
                setUserInput(event.target.value);
              }}
            ></input>
          </div>
        </div>
      </div>
      <div className="posts">
        <Post filteredPosts={filteredPosts} allPosts={allPosts} />
      </div>
    </>
  );
};
