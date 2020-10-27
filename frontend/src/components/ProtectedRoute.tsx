import React, { FunctionComponent, useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

export const ProtectedRoute: FunctionComponent<RouteProps> = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();
  useEffect(() => {
    if (keycloak && initialized && !keycloak.authenticated) {
      keycloak.login();
    }
    console.log(JSON.stringify(keycloak));
  }, [keycloak?.authenticated]);
  return <Route>{children}</Route>;
};
