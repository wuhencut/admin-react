import React, { useState, useEffect } from "react";
import { Form, Select, Button, Input, Table } from "antd";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import moment from "moment";
import api from "../../api/index";
import initReq from "../../api/initReq";

import { platformList } from "../../utils/platform";

const { Option } = Select;
const { Item } = Form;
const { Column } = Table;

export default function UserList() {
  const [search, setSearch] = useState({
    page_id: 1,
    page_size: 10,
    cp_nickname: "",
    source: "",
    source_id: "",
    cp_id: "",
  });
  const [list, setlist] = useState([]);
  const [total, settotal] = useState(0);
  useEffect(() => {
    queryList();
  }, []);
  const queryList = async () => {
    let res = await api.registeCpSearch(initReq(search));
    if (res.error_code === 0) {
      setlist(res.data.list || []);
      settotal(res.data.count || 0);
    }
  };
  return (
    <div className="page-user-list">
      <Form layout="inline">
        <Item>
          <Input placeholder="映兔账号id"></Input>
        </Item>
        <Item>
          <Input placeholder="用户昵称"></Input>
        </Item>
        <Item>
          <Select defaultValue={search.source} placeholder="请选择渠道">
            <Option value="">全部渠道</Option>
            {platformList.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item>
          <Input placeholder="渠道id"></Input>
        </Item>
        <Item>
          <Button size="middle" type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
        </Item>
        <Item>
          <Button size="middle" icon={<UndoOutlined />}>
            重置
          </Button>
        </Item>
      </Form>
      <Table
        pagination={{ total: total, pageSize: 10, current: search.page_id, showQuickJumper: true }}
        rowKey="user_id"
        dataSource={list}
      >
        <Column title="映兔ID" dataIndex="user_id"></Column>
        <Column title="用户昵称" dataIndex="nickname"></Column>
        <Column title="绑定手机号" dataIndex="bind_phone"></Column>
        <Column title="绑定渠道/粉丝数" dataIndex="register_time"></Column>
        <Column title="注册时间" dataIndex="register_time"></Column>
        <Column title="用户状态" dataIndex="status"></Column>
        <Column
          title="操作"
          key="operate"
          render={(data) => (
            <Button type="primary" size="small">
              操作
            </Button>
          )}
        ></Column>
      </Table>
    </div>
  );
}
