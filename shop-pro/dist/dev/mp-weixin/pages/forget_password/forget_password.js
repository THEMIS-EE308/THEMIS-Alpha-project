"use strict";
const common_vendor = require("../../common/vendor.js");
const common_mcaptcha = require("../../common/mcaptcha.js");
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
  __name: "forget_password",
  setup(__props) {
    const form1 = common_vendor.ref("");
    const addModel = common_vendor.reactive({
      password: "",
      username: "",
      confirm: "",
      phone: "",
      code: ""
    });
    let mcaptcha = null;
    const customStyle = common_vendor.reactive({
      background: "#FF7670",
      color: "#FFF",
      marginTop: "50px",
      width: "100%"
    });
    const rules = common_vendor.reactive({
      username: [{
        required: true,
        message: "请输入登录账户",
        trigger: ["change"]
      }],
      phone: [{
        required: true,
        message: "请输入电话号码",
        trigger: ["change"]
      }],
      password: [{
        required: true,
        message: "请输入新密码",
        trigger: ["change"]
      }],
      confirm: [
        {
          required: true,
          message: "请输入确定密码",
          trigger: ["change"]
        },
        {
          validator: (rule, value, callback) => {
            let validate = value == addModel.password;
            return validate;
          },
          message: "新密码和确定密码不一致！！"
        }
      ],
      code: [
        {
          required: true,
          message: "请输入验证码",
          trigger: ["change"]
        },
        {
          validator: (rule, value, callback) => {
            let validate = mcaptcha.validate(addModel.code);
            return validate;
          },
          message: "验证码不正确！"
        }
      ]
    });
    const commit = () => {
      form1.value.validate(async (valid) => {
        console.log("验证通过");
        if (valid) {
          let res = await api_user.forgetApi(addModel);
          if (res && res.code == 200) {
            common_vendor.index.navigateBack({
              delta: 1
            });
          }
        }
      });
    };
    const updateImageCode = () => {
      mcaptcha.refresh();
    };
    common_vendor.onReady(() => {
      mcaptcha = new common_mcaptcha.Mcaptcha({
        el: "canvas",
        width: 80,
        height: 35,
        createCodeImg: ""
      });
      form1.value.setRules(rules);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => addModel.username = $event),
        b: common_vendor.p({
          modelValue: addModel.username
        }),
        c: common_vendor.p({
          label: "登录账户",
          prop: "username"
        }),
        d: common_vendor.o(($event) => addModel.phone = $event),
        e: common_vendor.p({
          modelValue: addModel.phone
        }),
        f: common_vendor.p({
          label: "电话号码",
          prop: "phone"
        }),
        g: common_vendor.o(($event) => addModel.password = $event),
        h: common_vendor.p({
          type: "password",
          modelValue: addModel.password
        }),
        i: common_vendor.p({
          label: "新密码",
          prop: "password"
        }),
        j: common_vendor.o(($event) => addModel.confirm = $event),
        k: common_vendor.p({
          type: "password",
          modelValue: addModel.confirm
        }),
        l: common_vendor.p({
          label: "确定密码",
          prop: "confirm"
        }),
        m: common_vendor.o(($event) => addModel.code = $event),
        n: common_vendor.p({
          modelValue: addModel.code
        }),
        o: common_vendor.o(updateImageCode),
        p: common_vendor.p({
          label: "验证码",
          prop: "code"
        }),
        q: common_vendor.sr(form1, "ab4f29dc-0", {
          "k": "form1"
        }),
        r: common_vendor.p({
          ["label-width"]: "auto",
          model: addModel
        }),
        s: common_vendor.o(commit),
        t: common_vendor.p({
          ["custom-style"]: customStyle
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/forget_password/forget_password.vue"]]);
wx.createPage(MiniProgramPage);
