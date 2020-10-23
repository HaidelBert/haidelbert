import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SessionProvider } from "./store/SessionContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginScreen } from "./features/LoginScreen";

function App() {
  return (
    <SessionProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <ProtectedRoute path="/">Protected</ProtectedRoute>
        </Switch>
      </Router>
    </SessionProvider>
  );
}

export default App;
