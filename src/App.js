import React from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Index}></Route>
      </Switch>
    );
  }
}
export default App;
