import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin + '/login' }}); // Redirect to the login page after logout
  };

  // Check if the user is logged in before rendering the logout button
  const user = null; // You can replace null with the actual user object
  return (
    user && (
      <button onClick={handleLogout}>Logout</button>
    )
  );
};

export default LogoutButton;
