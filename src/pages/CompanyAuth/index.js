import { Form, Input, Button, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AdminList } from "../../store/adminList/index";
import api from "../../api/index";

const { Option } = Select;
export default function CompanyAuth() {
  const dispatch = useDispatch();
  const onFinish = (val) => {
    console(val);
  };

  const handleChange = (val) => {
    console.log(val);
  };
  useEffect(() => {
    getAdmin();
  });
  const getAdmin = async () => {
    let res = await api.listAdmin({});
    if (res.error_code === 0) {
      dispatch(AdminList(res.data));
    }
  };
  return (
    <div className="page">
      <Form layout="inline" onFinish={onFinish} initialValues={{ company_verify_status: "waiting", company_name: "" }}>
        <Form.Item name="company_name">
          <Input placeholder="企业名称"></Input>
        </Form.Item>
        <Form.Item name="company_verify_status">
          <Select style={{ width: "120px" }} onChange={handleChange}>
            <Option value="waiting">待审核</Option>
            <Option value="refuse">已拒绝</Option>
            <Option value="approve">已通过</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}
