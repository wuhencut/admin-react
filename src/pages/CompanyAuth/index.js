import { Form, Input, Button, Select } from "antd";
import React from "react";
const { Option } = Select;
class CompanyAuth extends React.Component {
  onFinish = (val) => {
    console(val);
  };
  handleChange = (val) => {
    console.log(val);
  };
  render() {
    return (
      <div className="page">
        <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item name="company_name">
            <Input placeholder="企业名称"></Input>
          </Form.Item>
          <Form.Item name="company_verify_status">
            <Select style={{ width: "120px" }} defaultValue="waiting" onChange="handleChange">
              <Option value="waiting">待审核</Option>
              <Option value="refuse">已拒绝</Option>
              <Option value="approve">已通过</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default CompanyAuth;
