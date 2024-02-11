import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ShoeForm() {
  const [image_url, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formStyle = {
    maxWidth: "400px",
    margin: "0 auto",
  };

  const inputStyle = {
    width: "100%",
    marginBottom: "15px",
    padding: "10px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "red",
  };

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/shoe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_url, brand, name, price, sizes }),
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
    <div style={formStyle} className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div style={inputStyle} className="mb-3">
              <label htmlFor="image_url" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="image_url"
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <div style={inputStyle} className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div style={inputStyle} className="mb-3">
              <label htmlFor="brand" className="form-label">
                Brand
              </label>
              <input
                type="text"
                className="form-control"
                id="brand"
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
            <div style={inputStyle} className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div style={inputStyle} className="mb-3">
              <label htmlFor="sizes" className="form-label">
                Sizes
              </label>
              <input
                type="text"
                className="form-control"
                id="sizes"
                onChange={(e) => setSizes(e.target.value)}
                required
              />
            </div>
            <button style={buttonStyle} type="submit">
              Add
            </button>
            {error && <p style={errorStyle}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShoeForm;
