import React, { useState, useEffect } from "react";
import moment from "moment";
import { Tree } from "antd";
import treeData from "./tree.json";
import "./index.less";

const mapObj = (item) => {
  if (!item.documentDOList) {
    return { key: item.directoryShowName, title: item.directoryShowName, children: [mapObj(item.documentResultVO)] };
  } else {
    return {
      key: item.directoryShowName,
      title: item.directoryShowName,
      children: item.documentDOList.map((i) => {
        return {
          ...i,
          key: i.id,
          title: i.showName,
        };
      }),
    };
  }
};
// 把tree 类型的转传承 mapObj类型的格式
const genTree = (data) => {
  const list = data.map((item) => {
    return mapObj(item);
  });
  return list;
};

export default function PersonalPool() {
  const [documentData, setdocumentData] = useState({});

  const treeSelect = (keys, event) => {
    if (keys.length && event.node && event.node.viewJson) {
      setdocumentData(JSON.parse(event.node.viewJson));
    }
  };

  useEffect(() => {
    console.log(documentData);
  }, [documentData]);

  return (
    <div className="page">
      <Tree defaultExpandAll onSelect={treeSelect} treeData={genTree(treeData)}></Tree>
    </div>
  );
}
