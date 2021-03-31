import Login from "../Login/Login";
import CompanyAuth from "../CompanyAuth/index";
import PersonalPool from "../PersonalPool/index";
import BrandAuth from "../BrandAuth/index";
import CpApply from "../CpApply/index";
let routes = [
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
  {
    path: "/brandAuth",
    component: BrandAuth,
  },
  {
    path: "/cpApply",
    component: CpApply,
  },
];
export default routes;
