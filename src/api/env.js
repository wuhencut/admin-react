let env = "test";

if (window.location.href.split("#")[0].indexOf("/master/") > -1) {
  env = "master";
} else {
  env = localStorage.getItem("in2env") || "test";
}

export default env;
