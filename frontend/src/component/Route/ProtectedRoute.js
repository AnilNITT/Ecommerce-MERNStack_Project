import React from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import Loader from "../layout/Loader/Loader";


const ProtectedRoute = ({isAdmin, children }) => {

    const state=window.location;
  
    const {loading,isAuthenticated,user} = useSelector((state) => state.user);
    
    // On refresh WIll not change page location
    if (isAdmin===true && loading === true ) {
      return <Navigate to={state} />;
    }

      if (isAuthenticated === false) {
        return  <Navigate to="/login" />;
      }

      if (isAdmin===true && user.role !== "admin") {
        return <Navigate to="/login" />;
      }
     
    return (
      <>
      {loading ? (
        Loader
        ):(
          <>{children}</>
        )}
      </>
    )          
};

export default ProtectedRoute;