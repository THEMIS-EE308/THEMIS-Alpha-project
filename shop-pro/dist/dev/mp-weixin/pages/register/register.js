"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_button2 + _easycom_u_form2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_button + _easycom_u_form)();
}
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const form1 = common_vendor.ref();
    const loginModel = common_vendor.reactive({
      phone: "",
      username: "",
      password: "",
      confirm: ""
    });
    const customStyle1 = common_vendor.reactive({
      marginTop: "40px",
      background: "#FF7670",
      color: "#FFF",
      width: "100%"
    });
    common_vendor.reactive({
      marginTop: "35px",
      // background:'#FF7670',
      color: "#FFF",
      width: "100%"
    });
    const avatarUrl = common_vendor.ref("/static/user1.png");
    const toLogin = () => {
      common_vendor.index.navigateTo({
        url: "../login/login"
      });
    };
    const rules = common_vendor.reactive({
      phone: [{
        required: true,
        message: "请输入电话",
        // 可以单个或者同时写两个触发验证方式 
        trigger: ["change", "blur"]
      }],
      username: [{
        required: true,
        message: "请输入账号",
        // 可以单个或者同时写两个触发验证方式 
        trigger: ["change", "blur"]
      }],
      password: [{
        required: true,
        message: "请输入密码",
        // 可以单个或者同时写两个触发验证方式 
        trigger: ["change", "blur"]
      }],
      confirm: [{
        required: true,
        message: "请输入确定密码",
        // 可以单个或者同时写两个触发验证方式 
        trigger: ["change", "blur"]
      }]
    });
    const commit = () => {
      form1.value.validate(async (valid) => {
        if (valid) {
          if (loginModel.confirm != loginModel.password) {
            common_vendor.index.showToast({
              title: "密码和确定密码不一致",
              icon: "none",
              duration: 2e3
            });
            return;
          }
          let res = await api_user.registerApi(loginModel);
          if (res && res.code == 200) {
            common_vendor.index.navigateTo({
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
        a: avatarUrl.value,
        b: common_vendor.o(($event) => loginModel.phone = $event),
        c: common_vendor.p({
          placeholder: "请输入电话",
          modelValue: loginModel.phone
        }),
        d: common_vendor.p({
          prop: "phone",
          ["left-icon"]: "phone",
          ["left-icon-style"]: "font-size:24px;color:#FF7670;"
        }),
        e: common_vendor.o(($event) => loginModel.username = $event),
        f: common_vendor.p({
          placeholder: "请输入账户",
          modelValue: loginModel.username
        }),
        g: common_vendor.p({
          prop: "username",
          ["left-icon"]: "account-fill",
          ["left-icon-style"]: "font-size:24px;color:#FF7670;"
        }),
        h: common_vendor.o(($event) => loginModel.password = $event),
        i: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: loginModel.password
        }),
        j: common_vendor.p({
          prop: "password",
          ["left-icon"]: "lock",
          ["left-icon-style"]: "font-size:24px;color:#FF7670;"
        }),
        k: common_vendor.o(($event) => loginModel.confirm = $event),
        l: common_vendor.p({
          type: "password",
          placeholder: "请输入确定密码",
          modelValue: loginModel.confirm
        }),
        m: common_vendor.p({
          prop: "confirm",
          ["left-icon"]: "lock",
          ["left-icon-style"]: "font-size:24px;color:#FF7670;"
        }),
        n: common_vendor.o(toLogin),
        o: common_vendor.o(commit),
        p: common_vendor.p({
          ["custom-style"]: customStyle1
        }),
        q: common_vendor.sr(form1, "347a9496-0", {
          "k": "form1"
        }),
        r: common_vendor.p({
          model: loginModel
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
