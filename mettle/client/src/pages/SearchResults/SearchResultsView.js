import React from "react";

const SearchResultsView = ({ results }) => {
  if (!results.length) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      <h2>Search Results</h2>
      <ul>

        {/* results display */}
        {results.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsView;
