import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

   fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((r) => {
        if (r.ok) {
          navigate("/login");
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
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div style={inputStyle} className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={inputStyle} className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button style={buttonStyle} type="submit">
              Register
            </button>
            {error && <p style={errorStyle}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
