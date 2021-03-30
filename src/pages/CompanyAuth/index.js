import { Form, Input, Button, Select, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import BdSelect from "../../Component/BbSelect/index";
import api from "../../api/index";
import initReq from "../../api/initReq";

const { Option } = Select;
const { Column } = Table;
export default function CompanyAuth() {
  // const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const allAdmin = useSelector((state) => state.adminList.allAdmin);
  const state = {
    search: {
      page_id: 1,
      page_size: 10,
      company_verify_status: "",
      bd_admin_id: "",
      company_name: "",
    },
  };
  // 搜索按钮提交
  const onFinish = (val) => {
    console.log(val);
  };
  // BD变化触发搜索
  const handleBdChange = (val) => {
    state.search.bd_admin_id = val;
    searchBtnClick();
  };
  const handleStatusChange = (val) => {
    state.company_verify_status = val;
    searchBtnClick();
  };
  // 查看按钮
  const checkClick = (val) => {
    console.log(val);
  };
  async function queryList() {
    let res = await api.getBusinessLicenseList(initReq(state.search));
    if (res.error_code === 0) {
      setList(res.data.sponsor_user);
      setTotal(res.data.count);
    }
  }
  const searchBtnClick = () => {
    state.search.page_id = 1;
    queryList();
  };
  useEffect(() => {
    queryList();
  }, []);
  return (
    <div className="page">
      <Form layout="inline" onFinish={onFinish} initialValues={{ company_verify_status: "waiting", company_name: "" }}>
        <Form.Item name="company_name">
          <Input placeholder="企业名称" onPressEnter={searchBtnClick}></Input>
        </Form.Item>
        <Form.Item name="company_verify_status">
          <Select style={{ width: "120px" }} onChange={handleStatusChange}>
            <Option value="waiting">待审核</Option>
            <Option value="refuse">已拒绝</Option>
            <Option value="approve">已通过</Option>
          </Select>
        </Form.Item>
        <BdSelect onChange={handleBdChange} value=""></BdSelect>
      </Form>

      <Table style={{ marginTop: "20px" }} dataSource={list} rowKey="sponsor_id">
        <Column title="企业名称" dataIndex="company_name" key="company_name"></Column>
        <Column
          title="申请时间"
          dataIndex="apply_time"
          key="apply_time"
          render={(time) => moment(time * 1000).format("YYYY.MM.DD HH:mm")}
        ></Column>
        <Column title="联系人" dataIndex="contact_name" key="contact_name"></Column>
        <Column
          title="邀请码/邀请人"
          dataIndex="inviter_code"
          key="inviter_code"
          render={(inviter_code, data) => {
            if (inviter_code) {
              return (
                <div>
                  <p>{inviter_code}</p>
                  <p>{data.inviter || "-"}</p>
                </div>
              );
            } else {
              return "-";
            }
          }}
        ></Column>
        <Column title="BD负责人" dataIndex="bd_admin_id" render={(id) => allAdmin[id]}></Column>
        <Column
          title="审核状态"
          dataIndex="company_verify_status"
          key="company_verify_status"
          render={(status) => {
            switch (status) {
              case "waiting":
                return <Tag color="#2db7f5">待审核</Tag>;
              case "refuse":
                return <Tag color="#f50">已拒绝</Tag>;
              case "approve":
                return <Tag color="#87d068">已通过</Tag>;
              default:
                return "-";
            }
          }}
        ></Column>
        <Column
          title="操作"
          key="operate"
          fixed="right"
          render={(data) => (
            <Button size="small" type="primary" onClick={() => checkClick(data)}>
              查看
            </Button>
          )}
        ></Column>
      </Table>
    </div>
  );
}
