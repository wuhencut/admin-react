import React, { useState, useEffect } from "react";
import { Button, Radio, DatePicker, Space, Table } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import moment from "moment";

import "./index.less";

const { RangePicker } = DatePicker;

export default function PublicPool(props) {
  // radio 时间快捷选项
  const [quickTimeRange, setquickTimeRange] = useState("today");
  // 设置时间范围，对应RangePicker 组件值
  const [timeRange, settimeRange] = useState(undefined);
  // 标签栏是否在韩凯
  const [isOpen, setisOpen] = useState(false);
  // 模拟的tab
  const mockTabs = Array.from(new Array(100));
  const dateChange = (val) => {};
  // 列表数据元
  const dataSource = [
    {
      time: "2021-09-20",
      cate: "痛苦评分",
      score: 3,
      sign: "白菜",
    },
    {
      time: "2021-09-21",
      cate: "痛苦面具1",
      score: 7,
      sign: "阿冻",
    },
    {
      time: "2021-09-22",
      cate: "痛苦面具2",
      score: 5,
      sign: "奕夫",
    },
    {
      time: "2021-09-23",
      cate: "痛苦面具3",
      score: 6,
      sign: "沛麟",
    },
  ];
  // 列表
  const columns = [
    {
      title: "评估时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "评估类别",
      dataIndex: "cate",
      key: "cate",
    },
    {
      title: "总分",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "签名",
      dataIndex: "sign",
      key: "sign",
    },
  ];
  // 选择器配置
  const rowSelection = {
    onChange: (a, b) => {
      console.log(a, b);
    },
    onSelect: (a, b) => {
      console.log(a, b);
    },
  };
  useEffect(() => {
    if (quickTimeRange === "all") {
      settimeRange(undefined);
    } else if (quickTimeRange === "today") {
      settimeRange([moment(), moment().endOf("day")]);
    } else if (quickTimeRange === "three") {
      settimeRange([moment().subtract(3, "day"), moment()]);
    } else if (quickTimeRange === "week") {
      settimeRange([moment().subtract(1, "week"), moment()]);
    }
  }, [quickTimeRange]);

  return (
    <div className="public-pool-page">
      <div className="header">
        <div className="left">跟病历文书保持一致</div>
        <div className="right">
          <Button>写回文书</Button>
        </div>
      </div>
      <div className="main">
        <Space direction="vertical">
          <Radio.Group defaultValue="all" onChange={(e) => setquickTimeRange(e.target.value)}>
            <Radio value="all">全部</Radio>
            <Radio value="today">今日</Radio>
            <Radio value="three">三天</Radio>
            <Radio value="week">一周</Radio>
          </Radio.Group>

          <div className="time-picker">
            <div className="left">
              <RangePicker onChange={(v) => settimeRange(v)} format="YYYY-MM-DD"></RangePicker>
              <Button type="primary">查询</Button>
            </div>
            <div className="right">
              <Button>新增</Button>
            </div>
          </div>

          <div className="tabs-container">
            {mockTabs.map((item, index) => {
              return (
                <Radio.Button key={index} style={{ margin: "4px" }}>
                  {index}
                </Radio.Button>
              );
            })}
          </div>

          <Table
            rowKey="time"
            rowSelection={rowSelection}
            pagination={false}
            dataSource={dataSource}
            columns={columns}
          ></Table>
        </Space>
      </div>
    </div>
  );
}
