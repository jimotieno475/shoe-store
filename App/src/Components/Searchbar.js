import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm(""); // Reset the search term after search
  };

  return (
    <div className="mb-2 mt-2">
      <div className="relative flex">
        <div className="sticky top-0 z-50 flex justify-around items-center p-4 rounded-full bg-gray-100 shadow-lg">
          <input
            id="searchInput"
            type="text"
            placeholder="Search by brand"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="box-border px-4 py-2 bg-transparent border border-gray-300 rounded-full text-gray-800 text-lg focus:outline-none focus:border-blue-500 flex-grow"
          />
          <button
            id="searchBtn"
            onClick={handleSearch}
            className="relative px-6 py-2 rounded-full text-white text-lg font-semibold bg-gradient-to-r from-sky-200 to-sky-400 shadow-md hover:shadow-lg"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;




