import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Searchbar";
import "./shoes.css";

function Shoes() {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    fetch("/displayshoes")
      .then((response) => response.json())
      .then((data) => setShoes(data));
  }, []);

  return (
    <div className="container">
      <h1>Shoe Store</h1>
      <SearchBar shoes={shoes} />
      <div className="shoe-list">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="shoe-item">
            <Link to={`/shoes/${shoe.id}`}>
              <div className="image-container">
                <img src={shoe.image} alt={shoe.name} />
                <div className="image-text">Click for shoe info</div>
              </div>
            </Link>
            <p>Brand: {shoe.brand}</p>
            <strong>Name: {shoe.name}</strong>
            <p>Price: {shoe.price}</p>
            <p>Sizes: {shoe.sizes}</p>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add</Link>
      </button>
    </div>
  );
}

export default Shoes;
