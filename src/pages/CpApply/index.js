/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, message, Table } from "antd";
import api from "../../api/index";
import initReq from "../../api/initReq";
import { platformList, getPlatformName } from "../../utils/platform";
import moment from "moment";

const { Item } = Form;
const { Option } = Select;
const { Column } = Table;

export default function CpAlly() {
  const [search, setSearch] = useState({
    sort_type: 1, // 1： 粉丝量从高到低 2： 申请时间从新到旧
    apply_status: 0, //-1全部
    liabler_email: "",
    weibo_id: "",
    nickname: "",
    page_id: 1,
    page_size: 10,
    tel: "", // 手机号
    source: "", // 渠道
  });
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(100);
  const [liablerList, setLiablerList] = useState([]);
  const statucChange = (val) => {
    search.apply_status = val;
    searchBtnClick();
  };
  const queryList = async () => {
    let res = await api.queryBloggerInfo(initReq(search));
    if (res.error_code === 0) {
      setList(res.data.list);
      setTotal(res.data.total);
    }
  };
  const getLiablerList = async () => {
    let res = await api.getSchema({ name: "xiaoer.json" });
    if (res.error_code === 0) {
      setLiablerList(JSON.parse(res.data.content).formData.list || []);
    } else {
      message.error("获取文件失败");
    }
  };
  const searchBtnClick = () => {
    search.page_id = 1;
    queryList();
  };
  const phoneChange = (val) => {
    search.tel = val.target.value;
  };
  const channelChange = (val) => {
    search.source = val;
    searchBtnClick();
  };
  const sortTypeChange = (val) => {
    search.sort_type = val;
    searchBtnClick();
  };
  const nicknameChange = (val) => {
    search.nickname = val.target.value;
  };
  const idChange = (val) => {
    search.weibo_id = val.target.value;
  };
  useEffect(() => {
    queryList();
    getLiablerList();
  }, []);
  return (
    <div className="page">
      <Form layout="inline">
        <Item>
          <Select style={{ width: "120px" }} onChange={statucChange} defaultValue={search.apply_status}>
            <Option value={-1}>全部</Option>
            <Option value={0}>待审核</Option>
            <Option value={1}>已通过</Option>
            <Option value={2}>已拒绝</Option>
          </Select>
        </Item>
        <Item>
          <Input onChange={phoneChange} onPressEnter={searchBtnClick} placeholder="请输入手机号"></Input>
        </Item>
        <Item>
          <Select onChange={channelChange} style={{ width: "120px" }} defaultValue={search.source}>
            <Option value="">所有渠道</Option>
            {platformList.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item>
          <Select onChange={sortTypeChange} defaultValue={search.sort_type}>
            <Option value={1}>粉丝量从高到低</Option>
            <Option value={2}>申请时间从新到旧</Option>
          </Select>
        </Item>
        <Item>
          <Input placeholder="博主昵称" onChange={nicknameChange} onPressEnter={searchBtnClick}></Input>
        </Item>
        <Item>
          <Input placeholder="微博id" onChange={idChange} onPressEnter={searchBtnClick}></Input>
        </Item>
      </Form>

      <Table
        width="100%"
        rowKey="id"
        style={{ paddingTop: "20px" }}
        dataSource={list}
        pagination={{ total: total, current: search.pagination, showQuickJumper: true }}
      >
        <Column
          title="联系方式"
          dataIndex="tel"
          render={(tel, data) => (
            <div>
              <p>手机: {tel}</p>
              <p>微信: {data.wx}</p>
            </div>
          )}
        ></Column>
        <Column title="昵称" dataIndex="nickname"></Column>

        <Column
          width="130px"
          title="申请渠道"
          dataIndex="source"
          render={(source) => source.map((item) => <span>{getPlatformName(item)} </span>)}
        ></Column>
        <Column title="粉丝量" dataIndex="fans_count"></Column>
        <Column title="邀请人/邀请人ID" width="200px" dataIndex="inviter"></Column>
        <Column title="责任人" width="120px" dataIndex="liabler_name"></Column>
        <Column width="100px" title="状态" dataIndex="apply_status"></Column>
        <Column
          width="200px"
          title="申请时间"
          dataIndex="create_at"
          render={(time) => moment(time * 1000).format("YYYY.MM.DD HH:mm")}
        ></Column>
        <Column
          fixed="right"
          title="操作"
          key="action"
          render={(data) => (
            <Button size="small" type="primary">
              查看
            </Button>
          )}
        ></Column>
      </Table>
    </div>
  );
}
