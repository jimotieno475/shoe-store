import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Searchbar";
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
    <div className="bg-sky-100 flex justify-center ">
      <div className="container font-montserrat">
        <h1 className="text-center underline text-2xl font-bold"> Welcome to Olucoch Shoe Store</h1>
        <div className="flex justify-center items-center">
          <div>
            <SearchBar onSearch={handleSearch} shoes={shoes} />
          </div>
          <div className="text-3xl">
            <Link to={`/cart`}>
              <FaShoppingCart />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-10">
          {(searchTerm.trim() === "" ? shoes : filteredShoes).map((shoe) => (
            <div key={shoe.id} className="shoe-item bg-white border border-gray-300 m-4 p-4 w-52 relative overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-md rounded-lg">
              <Link to={`/shoes/${shoe.id}`}>
                <div className="image-container relative overflow-hidden rounded-lg">
                  <img src={shoe.image} alt={shoe.name} className="w-full h-auto transition duration-300 ease-in-out transform hover:scale-125" />
                </div>
              </Link>
              <p className="text-center">Brand: {shoe.brand}</p>
              <strong className="text-center block mb-2">Name: {shoe.name}</strong>
              <p className="text-center">Price: Ksh.{shoe.price} </p>
              <p className="text-center">Sizes: {shoe.sizes}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button className="bg-sky-400 rounded text-2xl">
            <Link to="/add" className="add">Add</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shoes;

