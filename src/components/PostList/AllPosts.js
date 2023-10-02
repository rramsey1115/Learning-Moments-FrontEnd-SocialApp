import "./AllPosts.css";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService.js/getAllPosts";
import { getAllTopics } from "../../services/SearchService/getTopics";
import { Post } from "./Post";
import { SearchBar } from "../Search/SearchBar";
import { TopicFilter } from "../Search/TopicFilter";

export const AllPosts = ({ currentUser }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [showFilteredByTopicId, setFilteredByTopic] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState("");
  const [userInput, setUserInput] = useState("");

  const getAndSetPosts = () => {
    getAllPosts().then((allPostsArray) => {
      setAllPosts(allPostsArray);
    });
  };

  useEffect(() => {
    getAndSetPosts();
  }, []);

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
    getAllTopics().then((topicsArray) => {
      setAllTopics(topicsArray);
    });
  }, []);

  useEffect(() => {
    if (showFilteredByTopicId > 0) {
      const filteredByTopicArray = allPosts.filter(
        (post) => post.topic.id === parseInt(showFilteredByTopicId)
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
          <div>
            <h3>My Feed</h3>
          </div>
        </div>
        <div className="search-container">
          <div className="filter-dropdown">
            <TopicFilter
              allTopics={allTopics}
              setFilteredByTopic={setFilteredByTopic}
            />
          </div>
          <div className="search-input">
            <SearchBar userInput={userInput} setUserInput={setUserInput} />
          </div>
        </div>
      </div>
      <div className="posts">
        <Post
          getAndSetPosts={getAndSetPosts}
          filteredPosts={filteredPosts}
          allPosts={allPosts}
        />
      </div>
    </>
  );
};
