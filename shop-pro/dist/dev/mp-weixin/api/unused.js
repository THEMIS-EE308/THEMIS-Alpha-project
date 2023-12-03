"use strict";
const common_http = require("../common/http.js");
const collectApi = (parm) => {
  return common_http.http.post("/api/collect/collect", parm);
};
const hasCollectApi = (parm) => {
  return common_http.http.get("/api/collect/hasCollect", parm);
};
const reportApi = (parm) => {
  return common_http.http.post("/api/report/report", parm);
};
const hasReportApi = (parm) => {
  return common_http.http.get("/api/report/hasReport", parm);
};
exports.collectApi = collectApi;
exports.hasCollectApi = hasCollectApi;
exports.hasReportApi = hasReportApi;
exports.reportApi = reportApi;
