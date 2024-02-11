import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./shoe.css"; // Import the CSS file

function Shoe() {
  const { id } = useParams();
  const [shoe, setShoe] = useState({});

  useEffect(() => {
    if (id) {
      fetch(`/displayshoes/${id}`)
        .then((res) => res.json())
        .then((data) => setShoe(data))
        .catch((error) => console.log("Error fetching shoe:", error));
    }
  }, [id]);

  return (
    <div className="wrapper" key={shoe.id}>
      <figure>
        <img src={shoe.image} alt={shoe.name} />
      </figure>
      <div className="title">{shoe.brand}</div>
      <div className="desc">{shoe.name}</div>
      <div className="price">{shoe.price}</div>
      <div className="cta">
        <button className="btn">Buy Now</button>
      </div>
    </div>
  );
}

export default Shoe;
