import React from "react";
import { Switch } from "react-router-dom";
import AuthRoute from "./pages/AuthRoute/AuthRoute";
import routes from "./pages/routerConfig";
import "./App.css";
class App extends React.Component {
  render() {
    return (
      <Switch>
        <AuthRoute routerConfig={routes}></AuthRoute>
      </Switch>
    );
  }
}
export default App;
