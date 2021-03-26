// import { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import React from "react";
import getUserInfo from "../../api/getUserInfo";
import routerConfig from "./routerConfig";
class AuthRoute extends React.Component {
  render() {
    //  路由参数          路由地址
    const { location } = this.props;
    const { pathname } = location; // 获取要去的路由地址
    const authed = getUserInfo().sid > 0 ? true : false;
    const targetRouterConfig = routerConfig.find((item) => {
      return item.path === pathname;
    });
    if (!authed) {
      // 当index删除userInfo信息后自动调用了login组件，但是路由没有更换，所以需要加这么一行
      return <Redirect to="/login" />;
    } else {
      if (targetRouterConfig) {
        return <Route path={pathname} component={targetRouterConfig.component} />;
      } else {
        return <Redirect to="/index" />;
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
