"use strict";
const common_vendor = require("./vendor.js");
const baseUrl = "http://192.168.43.64:8089";
const http = (options = {}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + options.url || "",
      method: options.type || "GET",
      data: options.data || {},
      header: options.header || {}
    }).then((response) => {
      if (response.data && response.data.code == 200) {
        resolve(response.data);
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: response.data.msg,
          duration: 2e3
        });
      }
    }).catch((error) => {
      reject(error);
    });
  });
};
const get = (url, data, options = {}) => {
  options.type = "get";
  options.data = data;
  options.url = url;
  return http(options);
};
const post = (url, data, options = {}) => {
  options.type = "post";
  options.data = data;
  options.url = url;
  return http(options);
};
const put = (url, data, options = {}) => {
  options.type = "put";
  options.data = data;
  options.url = url;
  return http(options);
};
const upload = (parm) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.uploadFile({
      url: baseUrl + parm.url,
      filePath: parm.filePath,
      name: "file",
      formData: {
        openid: common_vendor.index.getStorageSync("openid")
      },
      header: {
        // Authorization: uni.getStorageSync("token")
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
};
const http$1 = {
  get,
  post,
  put,
  upload,
  baseUrl
};
exports.http = http$1;
