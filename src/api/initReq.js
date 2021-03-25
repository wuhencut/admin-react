// 初始化 请求数据，字段为空 则不塞入请求中
let initReq = (search) => {
  let req = JSON.parse(JSON.stringify(search));
  for (let item in req) {
    if (!req[item] || (Array.isArray(req[item]) && req[item].length === 0)) {
      // 采用delete方式而不采用空对象按key赋值，是因为更换成无值的key后req仍然存在上次的值，导致请求异常
      delete req[item]; // 不删除 页面绑定对象，防止出现 空值key被删除后页面上变量不存在导致报错或者显示异常
    }
  }
  return req;
};
export default initReq;
