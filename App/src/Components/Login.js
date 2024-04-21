
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = ({ setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Adding class to body
    document.body.classList.add("login-body");

    // Cleanup function to remove the class when component unmounts
    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

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

      if (data.error) {
        return "";
      }
      setUserId(data.id)
      sessionStorage.setItem("userId", data.user_id);
      localStorage.setItem("userId", data.user_id);
      console.log(setUserId)
      navigate("/shoes");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="user-box">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username:</label>
          </div>

          <div className="user-box">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
          </div>

          <button type="submit">Login</button>
        </form>
        <div className="dont-have-account">Don't have an account?</div>
        <div>
          <Link to="/signup">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const Login = ({ setUserId }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Adding class to body
//     document.body.classList.add("login-body");

//     // Cleanup function to remove the class when component unmounts
//     return () => {
//       document.body.classList.remove("login-body");
//     };
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (data.error) {
//         return "";
//       }
//       setUserId(data.id)
//       console.log(setUserId)
//       navigate("/shoes");
//     } catch (error) {
//       console.log("Login error:", error);
//     }
//   };

//   return (
//     <div className="login-page bg-cover bg-center fixed top-0 left-0 w-full h-full" style={{ backgroundImage: "url('https://source.unsplash.com/random')" }}>
//       <div className="login-box absolute top-1/2 left-1/2 w-400 transform -translate-x-1/2 -translate-y-1/2 px-10 py-16 bg-black bg-opacity-50 box-border shadow-lg rounded-2xl">
//         <h2 className="text-white text-center">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="user-box relative">
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="w-full py-3 pl-0 text-white border-b-2 border-white bg-transparent outline-none"
//             />
//             <label htmlFor="username" className="absolute top-0 left-0 px-0 text-white text-opacity-60 transition-all duration-500">
//               Username:
//             </label>
//           </div>

//           <div className="user-box relative">
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full py-3 pl-0 text-white border-b-2 border-white bg-transparent outline-none"
//             />
//             <label htmlFor="password" className="absolute top-0 left-0 px-0 text-white text-opacity-60 transition-all duration-500">
//               Password:
//             </label>
//           </div>

//           <button type="submit" className="relative inline-block px-6 py-3 mt-8 text-green-500 text-lg font-bold uppercase bg-transparent border border-green-500 rounded hover:bg-green-600 hover:text-white transition duration-300">Login</button>
//         </form>
//         <div className="text-white text-lg mt-8">Don't have an account?</div>
//         <div>
//           <Link to="/signup" className="relative inline-block px-6 py-3 text-blue-500 text-lg font-bold uppercase bg-transparent border border-blue-500 rounded hover:bg-blue-600 hover:text-white transition duration-300">
//             <span className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-pink-500 animate-gradient-x"></span>
//             <span className="absolute top-0 right-0 w-2 h-full bg-gradient-to-t from-red-500 to-yellow-400 animate-gradient-y"></span>
//             <span className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-cyan-400 to-blue-500 animate-gradient-x"></span>
//             <span className="absolute bottom-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-400 to-green-500 animate-gradient-y"></span>
//             Sign Up here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
