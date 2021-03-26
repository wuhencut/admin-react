import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
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
