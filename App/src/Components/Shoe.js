import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Shoe({ userId }) {
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
        // Automatically hide the message after a few seconds
        setTimeout(() => setAddedToCart(false), 3000);
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    
    <div className="">
      <div className="flex items-center content-center justify-center ">
        <div className="container flex flex-col items-center justify-center content-center  my-25 shoe-item bg-gray-100 border border-gray-300 m-6 p-4 w-60 relative overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-md rounded-lg">
          <figure className="w-500px overflow-hidden">
            <img src={shoe.image} alt={shoe.name} className="w-full rounded-lg" />
          </figure>
          <div className="title font-bold text-3xl text-center uppercase my-4">
            {shoe.brand}
          </div>
          <div className="desc text-center text-2xl opacity-80">{shoe.name}</div>
          <div className="price text-red-500 font-bold text-2xl py-2">{shoe.price}</div>
          <div className="cta">
            <button
              className=" bg-sky-100 btn relative z-10 inline-block text-xl font-bold uppercase text--900 px-8 py-4 transition duration-100 ease-in-out hover:text-white hover:shadow-md hover:scale-105 rounded"
              onClick={handleAddToCart}
            >
              Add to Cart <FaShoppingCart className="inline-block mb-1 ml-2" />
            </button>
            {addedToCart && (
              <div className="added-to-cart-message absolute inset-0 flex items-center justify-center text-center text-blue-900 bg-white bg-opacity-90 z-20 rounded-lg">
                <FaShoppingCart className="inline-block mb-1 mr-1" /> Added to Cart!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shoe;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./shoe.css"; // Import the CSS file
// import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon

// function Shoe({userId}) {
//   const { id } = useParams();
//   const [shoe, setShoe] = useState({});
//   const [addedToCart, setAddedToCart] = useState(false);

//   useEffect(() => {
//     if (id) {
//       fetch(`/displayshoes/${id}`)
//         .then((res) => res.json())
//         .then((data) => setShoe(data))
//         .catch((error) => console.log("Error fetching shoe:", error));
//     }
//   }, [id]);

//   const handleAddToCart = () => {
//     const data = {
//       user_id: userId, // Replace with the actual user ID
//       shoe_id: shoe.id,
//     };

//     // Adjust the URL and parameters based on your backend
//     fetch("/cart", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         setAddedToCart(true);
//       })
//       .catch((error) => console.error("Error adding to cart:", error));
//   };

//   return (
//     <div className="wrapper" key={shoe.id}>
//       <figure>
//         <img src={shoe.image} alt={shoe.name} />
//       </figure>
//       <div className="title">{shoe.brand}</div>
//       <div className="desc">{shoe.name}</div>
//       <div className="price">{shoe.price}</div>
//       <div className="cta">
//         <button className="btn" onClick={handleAddToCart}>
//           Add to Cart <FaShoppingCart />
//         </button>
//       </div>
//       {addedToCart && (
//         <div className="added-to-cart-message">
//           <FaShoppingCart /> Added to Cart!
//         </div>
//       )}
//     </div>
//   );
// }

// export default Shoe;
