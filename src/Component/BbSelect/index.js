/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import { Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const { Option } = Select;

export default function BdSelect(props) {
  //   props: {
  //   value: String,
  //   isAll: Boolean,
  //   isNew: Boolean, // 兼容新老版本
  //   disabled: Boolean
  // },
  const adminList = useSelector((state) => state.adminList.value);
  let list;

  const salesmanList = () => {
    let salesmanList = [];
    adminList.map((item) => {
      if (
        (item.admin_role == "销售" || item.admin_role == "销售主管" || item.admin_role == "销售组长") &&
        item.status == 1
      ) {
        salesmanList.push({
          id: item.user_id,
          label: item.nickname,
        });
      }
    });
    return salesmanList;
  };
  if (salesmanList().length > 0) {
    list = salesmanList().map((item) => (
      <Option key={item.id} value={item.id}>
        {item.label}
      </Option>
    ));
  }

  const handleChange = (val) => {
    props.onChange(val);
  };
  return (
    <div className="page">
      <Select placeholder="请选择BD" style={{ width: "120px" }} defaultValue={props.value} onChange={handleChange}>
        {props.isAll == false ? null : <Option value="">BD负责人</Option>}
        {list}
      </Select>
    </div>
  );
}
