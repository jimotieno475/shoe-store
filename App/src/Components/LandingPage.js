import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

function LandingPage() {
  return (
    <div>
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
              Perfect for your daily runs, our running shoes provide exceptional
              comfort and support.
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
  );
}

export default LandingPage;
