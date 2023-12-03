"use strict";
const common_vendor = require("../common/vendor.js");
const common_http = require("../common/http.js");
const addOrder = (goodsId) => {
  let param = {
    userId: common_vendor.index.getStorageSync("userId"),
    goodsId: goodsId.value
  };
  return common_http.http.post("/api/cart/add", param);
};
const listCart = () => {
  let userId = common_vendor.index.getStorageSync("userId");
  return common_http.http.get(`/api/cart/getList/${userId}`);
};
const removeCart = (goodsId) => {
  let userId = common_vendor.index.getStorageSync("userId");
  return common_http.http.post(`/api/cart/remove/${userId}/${goodsId}`, null);
};
const payCart = (param) => {
  return common_http.http.post(`/api/cart/pay`, param);
};
exports.addOrder = addOrder;
exports.listCart = listCart;
exports.payCart = payCart;
exports.removeCart = removeCart;
