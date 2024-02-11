import React from 'react'
import { Link } from "react-router-dom"
function LandingPage() {
  return (
    <div>
        <Link to="/signup">SignUp</Link>
        <Link to="/login">Login</Link>
    </div>
  )
}


export default LandingPage
