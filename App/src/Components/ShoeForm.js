import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./shoeform.css";

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
    <div id="shoe-form-container" className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="shoe-form">
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                className="form-control transparent-input"
                id="image"
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control transparent-input"
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                className="form-control transparent-input"
                id="brand"
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Brand"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control transparent-input"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="sizes">Sizes</label>
              <input
                type="text"
                className="form-control transparent-input"
                id="sizes"
                onChange={(e) => setSizes(e.target.value)}
                placeholder="Sizes"
                required
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Add
            </button>
            {error && <p className="text-danger">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShoeForm;
