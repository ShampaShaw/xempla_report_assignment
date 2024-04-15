import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.scss';
import Reports from './pages/Reports';
import { FcGoogle } from 'react-icons/fc';

function App() {

  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  console.log("User:",user);

  return (
    <Router>
      <Routes>
        {
      isAuthenticated && <Route path="/Login" element={<button onClick={() => loginWithRedirect()} className='googleButton'>Sign in With<FcGoogle/></button>} />
          
        }
        <Route path="/" element={< Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
