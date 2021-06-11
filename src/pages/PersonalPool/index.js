import React, { useState } from "react";
import { Input, Space, Modal } from "antd";
import "./index.less";
const PersonalPool = () => {
  const [showMd, setShowMd] = useState(false);
  const focus = () => {
    setShowMd(true);
  };
  return (
    <div className="page">
      <Input.Search onClick={focus} placeholder="placeholder"></Input.Search>
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
