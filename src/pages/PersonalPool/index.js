import React, { useState, useEffect } from "react";
import moment from "moment";
import { Input, Space, Modal, DatePicker } from "antd";
import "./index.less";

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
