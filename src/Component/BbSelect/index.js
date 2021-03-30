import { Select } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const { Option } = Select;

export default function BdSelect(props) {
  // console.log(props);
  const adminList = useSelector((state) => state.adminList);
  useEffect(() => {
    console.log(adminList);
  });
  function handleChange(val) {
    console.log(val);
    props.onChange(val);
  }
  return (
    <div className="page">
      <Select onChange={handleChange}>
        <Option value="">BD负责人</Option>
      </Select>
    </div>
  );
}
