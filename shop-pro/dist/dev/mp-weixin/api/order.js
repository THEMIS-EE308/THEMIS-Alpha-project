"use strict";
const common_vendor = require("../common/vendor.js");
const common_http = require("../common/http.js");
const getMyOrderApi = () => {
  let userId = common_vendor.index.getStorageSync("userId");
  return common_http.http.get(`/api/goodsOrder/getMyOrder/${userId}`, null);
};
const getSellOrderApi = () => {
  let userId = common_vendor.index.getStorageSync("userId");
  return common_http.http.get(`/api/goodsOrder/getSellOrder/${userId}`, null);
};
const postOrder = (goodsId, sendNo) => {
  let param = {
    orderId: goodsId,
    sendNo
  };
  return common_http.http.post(`/api/goodsOrder/postOrder`, param);
};
const evaluateOrder = (orderId, comment) => {
  let param = {
    orderId,
    evaluate: comment
  };
  return common_http.http.post(`/api/goodsOrder/evaluate`, param);
};
const receiveOrder = (goodsId, backNo) => {
  let param = {
    orderId: goodsId,
    backNo
  };
  return common_http.http.post(`/api/goodsOrder/receiveOrder`, param);
};
const deleteOrderApi = (orderId) => {
  let parm = {
    orderId
  };
  return common_http.http.post("/api/goodsOrder/deleteOrder", parm);
};
exports.deleteOrderApi = deleteOrderApi;
exports.evaluateOrder = evaluateOrder;
exports.getMyOrderApi = getMyOrderApi;
exports.getSellOrderApi = getSellOrderApi;
exports.postOrder = postOrder;
exports.receiveOrder = receiveOrder;
