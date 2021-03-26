import React from "react";
import style from "./Index.module.less";
import api from "../../api/index";
import logo from "../../assets/imgs/logo.png";
import getUserInfo from "../../api/getUserInfo";
import { message, Layout, Popover, Button } from "antd";
import AuthRoute from "../AuthRoute/AuthRoute";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;
let user = getUserInfo();
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
        console.log(this.state.roleList);
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
            <div className={style.img}>
              <Popover trigger="click" content={<Link to="/login">退出登录</Link>}>
                <Button>ClickMe</Button>
              </Popover>
            </div>
          </Header>
        </Layout>
      </div>
    );
  }
}
export default Index;
