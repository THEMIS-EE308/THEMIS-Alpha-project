"use strict";
const common_http = require("../common/http.js");
const getIndexBannerApi = () => {
  return common_http.http.get("/api/banner/getIndexBanner");
};
const getIndexListApi = (parm) => {
  return common_http.http.get("/api/goods/getIndexList", parm);
};
exports.getIndexBannerApi = getIndexBannerApi;
exports.getIndexListApi = getIndexListApi;
