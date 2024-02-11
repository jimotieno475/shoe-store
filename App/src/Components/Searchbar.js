import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./search.css"; 

const SearchBar = ({ shoes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Convert shoe.brand to a string before using includes
    const filteredShoes = shoes.filter((shoe) =>
      shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredShoes);
  };

  return (
    <div className="wrap">
      <div className="container">
        <div className="search-container">
          <input
            id="searchInput"
            type="text"
            placeholder="Search by brand"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button id="searchBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <ul>
        {searchResults.map((shoe, index) => (
          <li key={index}>
            <Link to={`/shoes/${shoe.id}`}>
              {shoe.brand} - {shoe.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
