import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setUserId}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      console.log(data)

      if (data.error) {
        return "";
      }
    //   console.log('User ID:',data.id);
    //   setUserId(data.id);
    //   console.log(data)
      navigate("/shoes")
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <div  style={formStyle}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
      <div style={inputStyle} className="mb-3">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        </div>
         
        <div style={inputStyle} className="mb-3">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>

        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
