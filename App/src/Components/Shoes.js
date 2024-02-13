import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Searchbar";
import "./shoes.css";
import { FaShoppingCart } from "react-icons/fa";

function Shoes() {
  const [shoes, setShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/displayshoes")
      .then((response) => response.json())
      .then((data) => setShoes(data))
      .catch((error) => console.error("Error fetching shoes:", error));
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() !== "") {
      // If there's an active search term, filter the shoes
      const filteredShoes = shoes.filter((shoe) =>
        shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredShoes(filteredShoes);
    } else {
      // If no active search term, display all shoes
      setFilteredShoes([]);
    }
  };

  return (
    <div
      className="container"
      style={{ backgroundImage: "linear-gradient(225deg, #15cfe8, #031a34)" }}
    >
      <h1>Shoe Store</h1>
      <SearchBar onSearch={handleSearch} shoes={shoes}/>
       <Link to={`/cart`}> <FaShoppingCart /></Link>
      <div className="shoe-list">
        {(searchTerm.trim() === "" ? shoes : filteredShoes).map((shoe) => (
          <div key={shoe.id} className="shoe-item">
              <Link to={`/shoes/${shoe.id}`}>
            <div className="image-container">
              <img src={shoe.image} alt={shoe.name} />
            {/* <div className="image-text">Click for shoe info</div> */}
            </div>
            </Link>
            <p>Brand: {shoe.brand}</p>
            <strong>Name: {shoe.name}</strong>
            <p>Price: Ksh.{shoe.price} </p>
            <p>Sizes: {shoe.sizes}</p>
          </div>
        ))}
      </div>
      <div className="center">
        <button className="btn-9">
          <Link to="/add" className="add">Add</Link>
        </button>
      </div>
    </div>
  );
}

export default Shoes;
