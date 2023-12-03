"use strict";
const common_http = require("../common/http.js");
const registerApi = (parm) => {
  return common_http.http.post("/api/wxUser/register", parm);
};
const loginApi = (parm) => {
  return common_http.http.post("/api/wxUser/login", parm);
};
const wxupdatePasswordApi = (parm) => {
  return common_http.http.post("/api/wxUser/wxupdatePassword", parm);
};
const editInfoApi = (parm) => {
  return common_http.http.post("/api/wxUser/editInfo", parm);
};
const getInfoApi = (parm) => {
  return common_http.http.get("/api/wxUser/getInfo", parm);
};
const forgetApi = (parm) => {
  return common_http.http.post("/api/wxUser/forget", parm);
};
exports.editInfoApi = editInfoApi;
exports.forgetApi = forgetApi;
exports.getInfoApi = getInfoApi;
exports.loginApi = loginApi;
exports.registerApi = registerApi;
exports.wxupdatePasswordApi = wxupdatePasswordApi;
