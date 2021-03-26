import Index from "./Index/Index";
import Login from "./Login/Login";
import CompanyAuth from "./CompanyAuth/index";
import PersonalPool from "./PersonalPool/index";
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
  {
    path: "/companyAuth",
    name: "companyAuth",
    component: CompanyAuth,
  },
  {
    path: "/personalPool",
    name: "personalPool",
    component: PersonalPool,
  },
];
export default routes;
