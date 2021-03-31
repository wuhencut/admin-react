/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../api/index";
import initReq from "../../api/initReq";
import { Input, Form, Table, Tag, Button, Select } from "antd";
import BdSelect from "../../Component/BbSelect/index";
import AdminSelect from "../../Component/AdminSelect/index";

import moment from "moment";

const { Column } = Table;
const { Item } = Form;
const { Option } = Select;

export default function BrandAuth() {
  const allAdmin = useSelector((state) => state.adminList.allAdmin);
  // 搜索
  const [search, setSearch] = useState({
    company_name: "",
    brand_name: "",
    brand_level: "",
    brand_auth_status: "waiting",
    operation_admin_id: "",
    page_id: 1,
    page_size: 10,
    bd_admin_id: "",
  });
  // 列表
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(100);
  const bdChange = (val) => {
    search.bd_admin_id = val;
    searchBtnClick();
  };
  const adminChange = (val) => {
    search.operation_admin_id = val;
    searchBtnClick();
  };
  // 查询列表
  const queryList = async () => {
    let res = await api.brandAuthList(initReq(search));
    if (res.error_code === 0) {
      setList(res.data.brand_auth);
      setTotal(res.data.count);
    }
  };
  // 页码切换
  const tableChange = (val) => {
    search.page_id = val.current;
    queryList();
  };
  const searchBtnClick = () => {
    search.page_id = 1;
    queryList();
  };
  const btnClick = (data) => {
    console.log(data);
  };
  const companyNameChange = (val) => {
    search.company_name = val.target.value;
  };
  const levelChange = (type, val) => {
    search.brand_level = val;
    searchBtnClick();
  };
  // 等级选择
  const levelList = [
    {
      // 品牌等级列表
      value: "B",
      label: "B",
    },
    {
      value: "A",
      label: "A",
    },
    {
      value: "KA",
      label: "KA",
    },
    {
      value: "无等级",
      label: "无等级",
    },
  ].map((item) => (
    <Option value={item.value} key={item.value}>
      {item.label}
    </Option>
  ));
  const statusChange = (val) => {
    search.company_verify_status = val;
    searchBtnClick();
  };
  const brandChange = (val) => {
    search.brand_name = val.target.value;
  };
  useEffect(() => {
    queryList();
  }, []);
  return (
    <div className="page">
      <Form layout="inline">
        <Item name="company_name">
          <Input placeholder="企业名称" onPressEnter={searchBtnClick} onChange={companyNameChange}></Input>
        </Item>
        <Item>
          <Input placeholder="申请品牌" onChange={brandChange} onPressEnter={searchBtnClick}></Input>
        </Item>
        <Item>
          <BdSelect value={search.bd_admin_id} onChange={bdChange}></BdSelect>
        </Item>
        <Item>
          <AdminSelect value={search.operation_admin_id} onChange={adminChange}></AdminSelect>
        </Item>
        <Item>
          <Select
            defaultValue={search.brand_level}
            style={{ width: "120px" }}
            onChange={(e) => levelChange("level", e)}
          >
            <Option value="">品牌等级</Option>
            {levelList}
          </Select>
        </Item>
        <Item>
          <Select onChange={statusChange} defaultValue={search.brand_auth_status}>
            <Option value="">认证状态</Option>
            <Option value="waiting">待审核</Option>
            <Option value="refuse">已拒绝</Option>
            <Option value="approve">已通过</Option>
          </Select>
        </Item>
      </Form>

      <Table
        onChange={tableChange}
        pagination={{ current: search.page_id, total: total, showQuickJumper: true }}
        style={{ marginTop: "20px" }}
        dataSource={list}
        rowKey="brand_auth_id"
      >
        <Column key="index" render={(data) => list.indexOf(data) + 1}></Column>
        <Column title="企业名称" dataIndex="company_name"></Column>
        <Column
          title="申请时间"
          dataIndex="apply_time"
          render={(time) => moment(time * 1000).format("YYYY.MM.DD HH:mm")}
        ></Column>
        <Column title="申请品牌" width="100px" dataIndex="brand_name"></Column>
        <Column title="品牌等级" dataIndex="brand_level"></Column>
        <Column
          title="运营负责人"
          dataIndex="operation_admin_id"
          render={(name) => (name !== "" ? allAdmin[name] : "-")}
        ></Column>
        <Column title="BD负责人" dataIndex="bd_admin_id" render={(id) => allAdmin[id]}></Column>
        <Column
          title="审核状态"
          dataIndex="brand_auth_status"
          render={(status) => {
            switch (status) {
              case "approve":
                return <Tag color="#87d068">已通过</Tag>;
              case "refuse":
                return <Tag color="#f50">已拒绝</Tag>;
              case "waiting":
                return <Tag color="#108ee9">待审核</Tag>;
              case "expire":
                return <Tag color="#f50">已过期</Tag>;
              default:
                return "-";
            }
          }}
        ></Column>
        <Column
          title="操作"
          fixed="right"
          key="action"
          render={(data) => (
            <Button
              size="small"
              type="primary"
              onClick={() => {
                btnClick(data);
              }}
            >
              查看
            </Button>
          )}
        ></Column>
      </Table>
    </div>
  );
}
