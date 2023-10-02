import "./Search.css";

export const TopicFilter = ({ allTopics, setFilteredByTopic }) => {
  return (
    <select
      className="topic-dropdown"
      onChange={(changeEvent) => setFilteredByTopic(changeEvent.target.value)}
      placeholder="Filter by Topic"
    >
      <option className="dropdown-option" key="0" value="0">Filter by Topic</option>
      {allTopics.map((topic) => {
        return (
          <option className="dropdown-option" key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        );
      })}
    </select>
  );
};
