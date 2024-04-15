import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.scss';
import Reports from './pages/Reports';

function App() {

  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  console.log("User:",user);

  return (
    <Router>
      <Routes>
        {
          isAuthenticated && <Route path="/login" element={<button onClick={() => loginWithRedirect()}>Log In</button>} />
          
        }
        <Route path="/" element={< Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
