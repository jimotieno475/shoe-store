import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ShoeForm() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/shoe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image, brand, name, price, sizes }),
    })
      .then((r) => {
        if (r.ok) {
          navigate("/shoes");
        } else {
          throw new Error("Failed to register");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setError("Failed to register. Please try again.");
      });
  }

  return (
    <div id="shoe-form-container" className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/?city,night')" }}>
      <div className=" max-w-md bg-gray-900 bg-opacity-75 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="image" className="block text-white">Image URL</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="transparent-input"
              placeholder="Image URL"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="transparent-input"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="brand" className="block text-white">Brand</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="transparent-input"
              placeholder="Brand"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-white">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="transparent-input"
              placeholder="Price"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sizes" className="block text-white">Sizes</label>
            <input
              type="text"
              id="sizes"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              className="transparent-input"
              placeholder="Sizes"
              required
            />
          </div>
          <button type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">Add</button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ShoeForm;
