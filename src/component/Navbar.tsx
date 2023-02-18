import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/config';
import './css/Navbar.css'

function Navbar() {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Successfully logged out');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/add">Add Data</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;

