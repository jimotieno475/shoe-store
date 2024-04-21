import React, {  useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Shoe from './Shoe';
import Shoes from './Shoes';
// import Navbar from './Navbar';
import Login from './Login';
import LandingPage from './LandingPage';
import SignUp from './Signup';
import ShoeForm from './ShoeForm';
import Cart from "./Cart";


export default function App() {
  const[userId,setUserId]=useState(null);
  const id = localStorage.getItem("userId");
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/shoes/:id" element={<Shoe userId={userId}/>} />
          <Route path="/login" element={<Login setUserId={setUserId}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add" element={<ShoeForm />} />
          <Route path="/cart" element={<Cart userId={userId}/> }/>
        </Routes>
      </Router>
    </div>
  );
}


