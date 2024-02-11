import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Searchbar";

function Shoes() {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    fetch('/displayshoes')
      .then((response) => response.json())
      .then((data) => setShoes(data));
  }, []);

  return (
    <div className="container">
      <h1>Shue Store</h1>
      <SearchBar shoes={shoes}/>
      <ul>
        {shoes.map((shoe) => (
          <li key={shoe.id}>
            <Link to={`/shoes/${shoe.id}`}>
              <div className='image-container'>
                <img src={shoe.image_url} alt={shoe.name} />
                <div className="image-text">
                  Click for shoe info
                </div>
              </div>
              </Link>
              <p>Brand:{shoe.brand}</p>
              <strong> Name:{shoe.name}</strong>
              <p> Price:{shoe.price}</p>
              <p>Sizes:{shoe.sizes}</p>
            
          </li>
        ))}
      </ul>

      <button><Link to="/add">Add</Link></button>
    </div>
  );
}

export default Shoes;
// import { Button } from "bootstrap";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import SearchBar from "./Searchbar";

// function Shoes() {
//   const [shoes, setShoes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetch('/displayshoes')
//       .then((response) => response.json())
//       .then((data) => setShoes(data));
//   }, []);

//   const filteredShoes = shoes.filter((shoe) =>
//     shoe.description && shoe.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   filteredShoes.sort((a, b) => a.description.localeCompare(b.description));

//   return (
//     <div className="container">
//       <h1>Shoe Store</h1>
//       {/* <SearchBar shoes={shoes} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> */}
//       <ul>
//         {filteredShoes.map((shoe) => (
//           <li key={shoe.id}>
//             <Link to={`/shoes/${shoe.id}`}>
//               <div className='image-container'>
//                 <img src={shoe.image_url} alt={shoe.name} />
//                 <div className="image-text">
//                   Click for shoe info
//                 </div>
//               </div>
//             </Link>
//             <p>Brand: {shoe.brand}</p>
//             <strong>Name: {shoe.name}</strong>
//             <p>Price: {shoe.price}</p>
//             <p>Sizes: {shoe.sizes}</p>
//           </li>
//         ))}
//       </ul>

//       <button><Link to="/add">Add</Link></button>
//     </div>
//   );
// }

// export default Shoes;

