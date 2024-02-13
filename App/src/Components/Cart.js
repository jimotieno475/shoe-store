import React, { useEffect, useState } from "react";
import "./cart.css";

function Cart({userId}) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching data...");
    setLoading(true);

    fetch(`/cartitems/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data.cart_items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch cart items. Please try again later.");
        setLoading(false);
      });
  }, [userId]);


  const handleDeleteCartItem = (cartItem) => {
    // Send DELETE request to the server
    console.log(cartItem.id);
    fetch(`/cartitems/${cartItem.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        // If successful, update the state to remove the deleted item
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== cartItem.id)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="container" style={{ backgroundImage: "linear-gradient(225deg, #15cfe8, #031a34)" }}>
      <h1>Shop Cart</h1>
      <div className="shoe-list">
        {cartItems.map((cartItem) => (
          <div key={cartItem.id} className="shoe-item">
            <div className="image-container">
              <img src={cartItem.shoe_image} alt={cartItem.shoe_name} />
            </div>
            <p>Brand: {cartItem.shoe_brand}</p>
            <strong>Name: {cartItem.shoe_name}</strong>
            <p>Price: {cartItem.shoe_price}</p>
            <p>Sizes: {cartItem.shoe_sizes}</p>
            <button onClick={() => handleDeleteCartItem(cartItem)} className="btn-8">
              Remove 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;


