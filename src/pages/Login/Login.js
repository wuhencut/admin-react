import React from "react";
import { Form, Input, Button, Layout, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "./Login.module.less";
import img1 from "../../assets/imgs/logo.png";
import api from "../../api/index";
import env from "../../api/env";
// ";
import md5 from "md5";
const { Header, Content } = Layout;
class Login extends React.Component {
  componentDidMount() {
    localStorage.clear();
  }
  onFinish = async (val) => {
    val.password = md5(val.password);
    let res = await api.login(val);
    if (res.error_code === 0) {
      message.success("登录成功");
      let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
      if (env === "master") {
        userInfo["master"] = {
          user_id: res.data.user_id,
          sid: res.data.ticket,
          email: res.data.email,
          role_id: res.data.admin_role + "",
        };
      } else {
        userInfo["test"] = {
          user_id: res.data.user_id,
          sid: res.data.ticket,
          email: res.data.email,
          role_id: res.data.admin_role + "",
        };
      }
      // 保存用户信息
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      sessionStorage.setItem("auth", 1);
      // window.location.href = "#/index";
      this.props.history.push("/index");
    }
  };

  render() {
    return (
      <div className={style.page}>
        <Layout>
          <Header className={style.header}>
            <img className={style.img} src={img1} alt="" />
          </Header>
          <Content className={style.content}>
            <Form
              name="normal_login"
              onFinish={this.onFinish}
              className={style["login-form"]}
              initialValues={{ email: "stone_locker@ingtube.com", password: "stone123" }}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "请输入您的映兔邮箱!",
                    pattern: /@ingtube.com$/,
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="映兔邮箱"></Input>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入密码!",
                  },
                ]}
              >
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </div>
    );
  }
}
export default Login;
