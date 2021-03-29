/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
import { HashRouter, Redirect, Route } from "react-router-dom";
import store from "./store/index";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route path="/login" component={Login}></Route>
      <Route path="/" component={Index}></Route>
      {/* <Redirect ro="/" /> */}
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
