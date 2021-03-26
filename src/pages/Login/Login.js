import React from "react";
import { Form, Input, Button, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.less";
import img1 from "../../assets/imgs/logo.png";
import api from "../../api/index";
// ";
import md5 from "md5";
const { Header, Content } = Layout;
class Login extends React.Component {
  async onFinish(val) {
    val.password = md5(val.password);
    let res = await api.login(val);
  }

  render() {
    return (
      <div className="page">
        <Layout>
          <Header className="header">
            <img className="img" src={img1} alt="" />
          </Header>
          <Content className="content">
            <Form
              name="normal_login"
              onFinish={this.onFinish}
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "请输入您的邮箱!",
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
