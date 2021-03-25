import React from "react";
import { Form, Input, Button, Checkbox, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.less";
import img1 from "../../assets/imgs/logo.png";
const { Header, Content } = Layout;
class Login extends React.Component {
  onFinish(val) {
    console.log(val);
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
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入您的账号!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号"></Input>
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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
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
