import { Form, Input, Button, Select } from "antd";
import React, { useState, useEffect } from "react";
import BdSelect from "../../Component/BbSelect/index";
import api from "../../api/index";

const { Option } = Select;
export default function CompanyAuth() {
  // const dispatch = useDispatch();
  const state = {
    search: {
      page_id: 1,
      page_size: 20,
    },
    list: [],
    total: 100,
  };
  const onFinish = (val) => {
    console(val);
  };

  const handleChange = (val) => {
    console.log(val);
  };
  async function queryList() {
    let res = await api.getBusinessLicenseList(state.search);
    if (res.error_code === 0) {
      state.list = res.data.sponsor_user || [];
      state.total = res.data.count || 0;
    }
  }
  useEffect(() => {
    queryList();
  }, []);
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
        <BdSelect onChange={handleChange} value=""></BdSelect>
      </Form>
    </div>
  );
}
