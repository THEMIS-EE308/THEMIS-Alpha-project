"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_form2 + _easycom_u_button2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_form + _easycom_u_button)();
}
const _sfc_main = {
  __name: "update_password",
  setup(__props) {
    const form1 = common_vendor.ref("");
    const addModel = common_vendor.reactive({
      userId: common_vendor.index.getStorageSync("userId"),
      password: "",
      oldPassword: "",
      confirm: ""
    });
    const customStyle = common_vendor.reactive({
      background: "#FF7670",
      color: "#FFF",
      marginTop: "50px",
      width: "100%"
    });
    const rules = common_vendor.reactive({
      oldPassword: [{
        required: true,
        message: "请输入原密码",
        trigger: ["change"]
      }],
      password: [{
        required: true,
        message: "请输入新密码",
        trigger: ["change"]
      }],
      confirm: [{
        required: true,
        message: "请输入确定密码",
        trigger: ["change"]
      }]
    });
    const commit = () => {
      form1.value.validate(async (valid) => {
        if (addModel.confirm != addModel.password) {
          common_vendor.index.showToast({
            title: "新密码和确定密码不一致!",
            icon: "none",
            mask: true,
            duration: 3e3
          });
          return;
        }
        if (valid) {
          console.log("验证通过");
          let res = await api_user.wxupdatePasswordApi(addModel);
          if (res && res.code == 200) {
            common_vendor.index.clearStorageSync();
            common_vendor.index.reLaunch({
              url: "../login/login"
            });
          }
        }
      });
    };
    common_vendor.onReady(() => {
      form1.value.setRules(rules);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => addModel.oldPassword = $event),
        b: common_vendor.p({
          modelValue: addModel.oldPassword
        }),
        c: common_vendor.p({
          label: "原密码",
          prop: "oldPassword"
        }),
        d: common_vendor.o(($event) => addModel.password = $event),
        e: common_vendor.p({
          modelValue: addModel.password
        }),
        f: common_vendor.p({
          label: "新密码",
          prop: "password"
        }),
        g: common_vendor.o(($event) => addModel.confirm = $event),
        h: common_vendor.p({
          modelValue: addModel.confirm
        }),
        i: common_vendor.p({
          label: "确定密码",
          prop: "confirm"
        }),
        j: common_vendor.sr(form1, "3178005a-0", {
          "k": "form1"
        }),
        k: common_vendor.p({
          ["label-width"]: "auto",
          model: addModel
        }),
        l: common_vendor.o(commit),
        m: common_vendor.p({
          ["custom-style"]: customStyle
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/update_password/update_password.vue"]]);
wx.createPage(MiniProgramPage);
