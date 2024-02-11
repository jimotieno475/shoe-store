import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sighnup.css"; // Make sure to import your CSS file

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const checkPassword = (password) => {
    return password.length >= 6;
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!validEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (!checkPassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

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
    <div className="signup-page">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="p-4 border rounded">
              <h2 className="mb-4 text-center">Sign Up</h2>
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="text-center">
                <button type="submit" className="btn-primary">
                  Register
                </button>
              </div>
              {error && <p className="text-danger mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
