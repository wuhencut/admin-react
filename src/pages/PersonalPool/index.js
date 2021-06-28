import React, { useState, useEffect } from "react";
import moment from "moment";
import { Input, Space, Modal, DatePicker, Select } from "antd";
import "./index.less";

const { Option } = Select;
const { RangePicker } = DatePicker;
const PersonalPool = () => {
  const [showMd, setShowMd] = useState(false);
  const [score, setScore] = useState("");
  const focus = () => {
    setShowMd(true);
  };
  useEffect(() => {
    console.log(moment().endOf("day"));
  }, []);
  return (
    <div className="page">
      <Select mode="multiple" style={{ width: 200 }} placeholder="Select 1 person">
        <Option value="jack">jack</Option>
        <Option value="aack">aack</Option>
        <Option value="back">back</Option>
      </Select>
      <RangePicker
        onChange={(v) => {
          console.log(v);
        }}
      ></RangePicker>
      <Input.Search
        value={score}
        enterButton={<div>评分</div>}
        onClick={focus}
        placeholder="placeholder"
      ></Input.Search>
      <Modal
        visible={showMd}
        onCancel={() => {
          setShowMd(false);
        }}
        title="test"
      ></Modal>
    </div>
  );
};
export default PersonalPool;
