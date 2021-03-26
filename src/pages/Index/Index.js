import React from "react";
import "./Index.less";
import api from "../../api/index";
import getUserInfo from "../../api/getUserInfo";
import { message } from "antd";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { roleList: [], authed: false };
  }
  componentDidMount() {
    this.getRoleInfo();
  }
  async getRoleInfo() {
    let user = getUserInfo();
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
    return <div>Index</div>;
  }
}
export default Index;
