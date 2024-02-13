import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./shoe.css"; // Import the CSS file
import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon

function Shoe({userId}) {
  const { id } = useParams();
  const [shoe, setShoe] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/displayshoes/${id}`)
        .then((res) => res.json())
        .then((data) => setShoe(data))
        .catch((error) => console.log("Error fetching shoe:", error));
    }
  }, [id]);

  const handleAddToCart = () => {
    const data = {
      user_id: userId, // Replace with the actual user ID
      shoe_id: shoe.id,
    };

    // Adjust the URL and parameters based on your backend
    fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAddedToCart(true);
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    <div className="wrapper" key={shoe.id}>
      <figure>
        <img src={shoe.image} alt={shoe.name} />
      </figure>
      <div className="title">{shoe.brand}</div>
      <div className="desc">{shoe.name}</div>
      <div className="price">{shoe.price}</div>
      <div className="cta">
        <button className="btn" onClick={handleAddToCart}>
          Add to Cart <FaShoppingCart />
        </button>
      </div>
      {addedToCart && (
        <div className="added-to-cart-message">
          <FaShoppingCart /> Added to Cart!
        </div>
      )}
    </div>
  );
}

export default Shoe;
