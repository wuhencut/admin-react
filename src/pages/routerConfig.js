import Index from "./Index/Index";
import Login from "./Login/Login";
let routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];
export default routes;
