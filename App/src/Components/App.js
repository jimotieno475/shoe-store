import React, {  useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Shoe from './Shoe';
import Shoes from './Shoes';
// import Navbar from './Navbar';
import Login from './Login';
import LandingPage from './LandingPage';
import SignUp from './Signup';
import ShoeForm from './ShoeForm';


export default function App() {

  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/shoes/:id" element={<Shoe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add" element={<ShoeForm />} />
        </Routes>
      </Router>
    </div>
  );
}


