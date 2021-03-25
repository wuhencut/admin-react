import env from "./env";
let getUserInfo = () => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  if (env === "master") {
    return userInfo["master"] || {};
  } else {
    return userInfo["test"] || {};
  }
};
export default getUserInfo;
