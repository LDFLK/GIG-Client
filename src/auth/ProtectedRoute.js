import React from "react";
import {Navigate, useLocation} from 'react-router-dom';
import {getAuthUser} from "./User";
import {AppRoutes} from "../routes";

export function ProtectedRoute({children}) {
  const user=getAuthUser();
  let location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={AppRoutes.login} state={{from: location}} replace/>;
  }

  return children;
}
