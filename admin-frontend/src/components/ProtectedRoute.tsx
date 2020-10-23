import { Redirect } from "react-router-dom";
import React from "react";
import { useSessionState } from "../store/SessionContext";

export const ProtectedRoute = (props: any) => {
  const sessionState = useSessionState();
  if (!sessionState.loggedIn) {
    return <Redirect to="/login" />;
  }
  return <props.component {...props} />;
};
