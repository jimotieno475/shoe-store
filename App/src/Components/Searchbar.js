import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({ shoes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Convert shoe.brand to a string before using includes
    const filteredShoes = shoes.filter(shoe =>
      shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredShoes);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by brand"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((shoe, index) => (
          <li key={index}>
            <Link to={`/shoes/${shoe.id}`}>{shoe.brand} - {shoe.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;

// import React from 'react';

// const SearchBar = ({ searchTerm, setSearchTerm }) => {
//   return (
//     <input
//       type="text"
//       placeholder="Search by Description"
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//   );
// };

// export default SearchBar;