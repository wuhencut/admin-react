const list = [
  {
    id: "1",
    name: "微博",
  },
  {
    id: "2",
    name: "小红书",
  },
  {
    id: "3",
    name: "美拍",
  },
  {
    id: "4",
    name: "B站",
  },
  {
    id: "5",
    name: "微淘",
  },
  {
    id: "6",
    name: "微信公众号",
  },
  {
    id: "7",
    name: "抖音",
  },
  {
    id: "8",
    name: "快手",
  },
  {
    id: "9",
    name: "洋淘",
  },
];
export const platformList = list;
export const getPlatformName = (id) => {
  if (id !== "0") {
    return list.find((item) => {
      return item.id === id;
    }).name;
  }
};
