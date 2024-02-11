import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

function Shoe() {
  const { id } = useParams();
  const [shoe, setShoe] = useState({});

  useEffect(() => {
    if (id) {
      fetch(`/displayshoes/${id}`)
        .then((res) => res.json())
        .then((data) => setShoe(data));
    }
  }, [id]); 

  return (
    <div key={shoe.id}>
      <img src={shoe.image_url} alt={shoe.name} />
      <p>Brand:{shoe.brand}</p><br/>
      <strong> Name:{shoe.name}</strong><br/>
      <p> Price:{shoe.price}</p><br/>
      <p>Sizes:{shoe.sizes}</p>
    </div>
  );
}

export default Shoe;


// import { useEffect, useState } from "react"

// function SingleShoe({ shoeId }) {
//     const [shoe, setShoe] = useState(null);

//     useEffect(() => {
//         fetch(`/getshoes/${shoeId}`) // Replace with the actual route for getting a single shoe by ID
//             .then((response) => response.json())
//             .then((data) => setShoe(data));
//     }, [shoeId]);

//     return (
//         <div className="container">
//             <h1>Shoe Details</h1>
//             {shoe && (
//                 <div>
//                     <img src={shoe.image_url} alt={shoe.name} />
//                     <strong>{shoe.brand}</strong>
//                     <strong>{shoe.title}</strong>
//                     <span>{shoe.price}</span>
//                     <p>{shoe.sizes}</p>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default SingleShoe;


