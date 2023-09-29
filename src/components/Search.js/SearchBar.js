import "./Search.css"

export const SearchBar = ({userInput, setUserInput}) => {
  return (
    <input
      type="text"
      id="search-input-text"
      defaultValue={userInput}
      className="posts-search"
      placeholder="Keyword Search"
      onChange={(event) => {
        setUserInput(event.target.value);
      }}
    ></input>
  );
};
