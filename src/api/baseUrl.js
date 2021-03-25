/* eslint-disable no-unused-vars */
import env from "./env";
// 测试环境
let baseUrl = [
  "http://dev.admin.test.collectivedynamic.com:30000",
  "http://dev.passport.test.collectivedynamic.com:30000",
];
if (env === "master") {
  baseUrl = ["https://admin-api.yingtu.co", "https://passport.ingtube.com"];
} else {
  switch (env) {
    case "test2":
      baseUrl = [
        "http://dev2.admin.test.collectivedynamic.com:30000",
        "http://dev2.passport.test.collectivedynamic.com:30000",
      ];
      break;

    case "test3":
      baseUrl = [
        "http://dev3.admin.test.collectivedynamic.com:30000",
        "http://dev3.passport.test.collectivedynamic.com:30000",
      ];
      break;

    case "test-master":
      baseUrl = [
        "http://master.admin.test.collectivedynamic.com:30000",
        "http://master.passport.test.collectivedynamic.com:30000",
      ];
      break;

    default:
      baseUrl = [
        "http://dev.admin.test.collectivedynamic.com:30000",
        "http://dev.passport.test.collectivedynamic.com:30000",
      ];
      break;
  }
}

export default baseUrl;
