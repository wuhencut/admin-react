/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import { Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const { Option } = Select;

export default function AdminSelect(props) {
  // props: {
  //   value: String,
  //   isAll: Boolean,
  //   isNew: Boolean, // 兼容新老版本
  //   isSponsorOperator: Boolean // 是否商家运营  运营权限细分
  // },
  const adminList = useSelector((state) => state.adminList.value);
  let list;

  const adminmanList = () => {
    let adminmanList = [];
    adminList.map((item) => {
      if (item.status === 1) {
        if (
          props.isSponsorOperator &&
          (item.admin_role == "运营主管" || item.admin_role == "商家运营" || item.admin_role == "星选主管")
        ) {
          adminList.push({
            id: item.user_id,
            label: item.nickname,
          });
        }

        if (
          !props.isSponsorOperator &&
          (item.admin_role == "运营" ||
            item.admin_role == "运营主管" ||
            item.admin_role == "商家运营" ||
            item.admin_role == "星选主管")
        ) {
          adminmanList.push({
            id: item.user_id,
            label: item.nickname,
          });
        }
      }
    });
    // console.log(adminmanList);
    return adminmanList;
  };
  if (adminmanList().length > 0) {
    list = adminmanList().map((item) => (
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
      <Select style={{ width: "120px" }} defaultValue={props.value} onChange={handleChange}>
        props.isAll ? <Option value={props.value}>运营负责人</Option> : null
        {list}
      </Select>
    </div>
  );
}
