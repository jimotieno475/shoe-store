import React, { useEffect, useState } from "react";


function Cart({ userId: initialUserId }) {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId]=useState(initialUserId)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    } else {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
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
    <div className="bg-sky-100">
    <div className="container ">
      <h1 className="text-center text-black font-bold text-3xl mb-8">
        Shop Cart
      </h1>
      <div className="flex flex-wrap justify-center">
        {cartItems.map((cartItem) => (
          <div key={cartItem.id} className="shoe-item bg-white border border-gray-300 m-4 p-4 w-72 relative overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-md rounded-lg">
            <div className="image-container relative overflow-hidden">
              <img
                src={cartItem.shoe_image}
                alt={cartItem.shoe_name}
                className="w-full h-auto transition duration-300 ease-in-out transform hover:scale-125"
              />
            </div>
            <p className="text-center">Brand: {cartItem.shoe_brand}</p>
            <strong className="text-center block mb-2">
              Name: {cartItem.shoe_name}
            </strong>
            <p className="text-center">Price: {cartItem.shoe_price}</p>
            <p className="text-center">Sizes: {cartItem.shoe_sizes}</p>
            <button
              onClick={() => handleDeleteCartItem(cartItem)}
              className="bg-gradient-to-br from-teal-400 to-blue-900 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
    </div> 
  );
}

export default Cart;




