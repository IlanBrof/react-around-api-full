import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn, ...props }) => {
  return (
      <Route {...props}>
          {isLoggedIn ? children : <Redirect to="/login" />}
      </Route>
  );
};

export default ProtectedRoute;
