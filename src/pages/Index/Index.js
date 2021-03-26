import React from "react";
import style from "./Index.module.less";
import api from "../../api/index";
import logo from "../../assets/imgs/logo.png";
import getUserInfo from "../../api/getUserInfo";
import { message, Layout, Popover, Menu } from "antd";
// import AuthRoute from "../AuthRoute/AuthRoute";
import authList from "../../authList.json";
import { Link, Switch } from "react-router-dom";
import AuthRoute from "../AuthRoute/AuthRoute";
const { Header, Content } = Layout;
const { SubMenu } = Menu;
let user = getUserInfo();
const MenuItems = (children) => {
  return children.map((item) => (
    <Menu.Item key={item.id}>
      <Link to={item.path}>{item.label}</Link>
    </Menu.Item>
  ));
};
const SubMenuItem = authList.map((item) => (
  <SubMenu key={item.id} title={item.label}>
    {MenuItems(item.children)}
  </SubMenu>
));
// const SubMenuItem = function deep(list) {
//   return list.map((item) => {
//     if (item.children) {
//       console.log(item);
//       return (
//         <SubMenu key={item.id} title={item.label}>
//           {deep(item.children)}
//         </SubMenu>
//       );
//     }
//     return <Menu.Item key={item.id}>{item.label}</Menu.Item>;
//   });
// };

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { roleList: [], authed: false };
  }
  componentDidMount() {
    this.getRoleInfo();
  }
  async getRoleInfo() {
    if (user && user.role_id) {
      this.setState({ authed: true });
      let res = await api.queryRoleInfo({
        status: -1,
        id: user.role_id,
      });
      if (res.error_code === 0) {
        this.setState({ roleList: JSON.parse(res.data.list[0].page_level_permission) });
      }
    } else {
      message.error("您还没有被分配权限");
      return false;
    }
  }
  render() {
    return (
      <div className={style.page}>
        <Layout>
          <Header className={style.header}>
            <div className={style.img}>
              <img src={logo} alt="" />
            </div>
            <div className={style.right}>
              <Popover
                trigger="click"
                content={
                  <div>
                    <Link to="/login">退出登录</Link> <br />
                    <Link to="/login">修改密码</Link>
                  </div>
                }
              >
                <div className={style["user-info"]}>{user.email}</div>
              </Popover>
            </div>
          </Header>
          <Content className={style.content}>
            <div className={style.main}>
              <div className={style.left}>
                <Menu className={style.menu} mode="inline" theme="dark">
                  {SubMenuItem}
                </Menu>
              </div>
              <div className={style.right}>
                <Switch>
                  <AuthRoute></AuthRoute>
                </Switch>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}
export default Index;
