import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginScreen } from "./features/LoginScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useKeycloak } from "@react-keycloak/web";
import { AuthLoading } from "./components/AuthLoading";

function App() {
  const keycloak = useKeycloak();
  if (!keycloak.initialized) {
    return <AuthLoading />;
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <ProtectedRoute path="/">Test</ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
