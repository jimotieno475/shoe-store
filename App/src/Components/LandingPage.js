import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

function LandingPage() {
  return (
    <div>
      <div className="landing-page">
        <h1>Welcome to our Shoe Store!</h1>
        <p>
          Explore our wide range of stylish and comfortable shoes for all
          occasions.
        </p>
        <div className="card-container">
          <div className="card">
            <img
              className="card-image"
              src="https://i.pinimg.com/originals/33/9b/54/339b54e6f5a96dab3251d5e596c46b99.gif"
              alt="Shoe 1"
            />
            <div className="card-description">
              <h2>Running Shoes</h2>
              <p>
                Perfect for your daily runs, our running shoes provide
                exceptional comfort and support.
              </p>
            </div>
          </div>
          <div className="card">
            <img
              className="card-image"
              src="https://i.pinimg.com/originals/87/77/e6/8777e625d160d33516d8b4d5e536ec62.gif"
              alt="Shoe 2"
            />
            <div className="card-description">
              <h2>Dress Shoes</h2>
              <p>
                Elevate your style with our collection of elegant dress shoes,
                perfect for formal occasions.
              </p>
            </div>
          </div>
          <div className="card">
            <img
              className="card-image"
              src="https://i.pinimg.com/originals/2a/8c/4b/2a8c4b0e7764e5222189be4f4c01cc4d.gif"
              alt="Shoe 3"
            />
            <div className="card-description">
              <h2>Sneakers</h2>
              <p>
                Stay trendy with our fashionable sneakers, designed for both
                comfort and style.
              </p>
            </div>
          </div>
        </div>
        <div>
          <Link className="signup" to="/signup">
            <button className="landing-button signup">Sign Up</button>
          </Link>
          <Link className="demo" to="/login">
            <button className="landing-button demo">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;


// import React from "react";
// import { Link } from "react-router-dom";

// function LandingPage() {
//   return (
//     <div className="landing-page text-center py-12 bg-cover bg-center bg-opacity-75" style={{ backgroundImage: "url('https://i.pinimg.com/564x/46/ca/65/46ca655a579aaf6395316fc18ac59e12.jpg')" }}>
//       <h1 className="text-4xl font-bold text-white mb-8">Welcome to our Shoe Store!</h1>
//       <p className="text-lg text-white mb-12">Explore our wide range of stylish and comfortable shoes for all occasions.</p>
//       <div className="flex justify-center items-center mb-12">
//         <div className="card bg-white shadow-md rounded-lg w-80 mx-4">
//           <img className="card-image w-full h-60 object-cover rounded-t-lg" src="https://i.pinimg.com/originals/33/9b/54/339b54e6f5a96dab3251d5e596c46b99.gif" alt="Shoe 1" />
//           <div className="card-description p-6 text-left">
//             <h2 className="text-xl font-bold mb-2">Running Shoes</h2>
//             <p className="text-gray-700">Perfect for your daily runs, our running shoes provide exceptional comfort and support.</p>
//           </div>
//         </div>
//         <div className="card bg-white shadow-md rounded-lg w-80 mx-4">
//           <img className="card-image w-full h-60 object-cover rounded-t-lg" src="https://i.pinimg.com/originals/87/77/e6/8777e625d160d33516d8b4d5e536ec62.gif" alt="Shoe 2" />
//           <div className="card-description p-6 text-left">
//             <h2 className="text-xl font-bold mb-2">Dress Shoes</h2>
//             <p className="text-gray-700">Elevate your style with our collection of elegant dress shoes, perfect for formal occasions.</p>
//           </div>
//         </div>
//         <div className="card bg-white shadow-md rounded-lg w-80 mx-4">
//           <img className="card-image w-full h-60 object-cover rounded-t-lg" src="https://i.pinimg.com/originals/2a/8c/4b/2a8c4b0e7764e5222189be4f4c01cc4d.gif" alt="Shoe 3" />
//           <div className="card-description p-6 text-left">
//             <h2 className="text-xl font-bold mb-2">Sneakers</h2>
//             <p className="text-gray-700">Stay trendy with our fashionable sneakers, designed for both comfort and style.</p>
//           </div>
//         </div>
//       </div>
//       <div>
//         <Link className="signup" to="/signup">
//           <button className="landing-button signup">Sign Up</button>
//         </Link>
//         <Link className="demo" to="/login">
//           <button className="landing-button demo">Login</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
