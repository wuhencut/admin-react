// import { Component } from "react";
import { Route } from "react-router-dom";
import React from "react";
import getUserInfo from "../../api/getUserInfo";
import Index from "../Index/Index";
import Login from "../Login/Login";

class AuthRoute extends React.Component {
  render() {
    //  路由参数          路由地址
    const { routerConfig, location } = this.props;
    const { pathname } = location; // 获取要去的路由地址
    const authed = getUserInfo().sid > 0 ? true : false;
    const targetRouterConfig = routerConfig.find((item) => {
      return item.path === pathname;
    });
    if (!authed) {
      return <Route to="/login" component={Login} />;
    } else {
      if (targetRouterConfig) {
        return <Route path={pathname} component={targetRouterConfig.component} />;
      } else {
        return <Route to="/" component={Index} />;
      }
    }
  }
}

// const AuthRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       authed ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location },
//           }}
//         />
//       )
//     }
//   />
// );

export default AuthRoute;
