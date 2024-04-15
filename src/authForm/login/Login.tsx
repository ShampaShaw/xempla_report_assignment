import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./LoginButton.scss"; // Import the SCSS file

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="googleButtonContainer"> {/* Container to center the button */}
        <Route
          path="/Login"
          element={
            <button onClick={() => loginWithRedirect()} className="googleButton">
              Sign In with <FcGoogle />
            </button>
          }
        />
      </div>
    )
  );
};

export default Login;
