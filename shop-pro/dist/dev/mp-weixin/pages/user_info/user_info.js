"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_user = require("../../api/user.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_upload2 + _easycom_u_form2 + _easycom_u_button2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_upload = () => "../../uni_modules/vk-uview-ui/components/u-upload/u-upload.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_upload + _easycom_u_form + _easycom_u_button)();
}
const _sfc_main = {
  __name: "user_info",
  setup(__props) {
    const imgRef = common_vendor.ref();
    const form1 = common_vendor.ref("");
    const fileList = common_vendor.ref([]);
    const addModel = common_vendor.reactive({
      userId: common_vendor.index.getStorageSync("userId"),
      nickName: "",
      name: "",
      phone: "",
      picture: ""
    });
    const customStyle = common_vendor.reactive({
      background: "#FF7670",
      color: "#FFF",
      marginTop: "50px",
      width: "100%"
    });
    const rules = common_vendor.reactive({
      nickName: [{
        required: true,
        message: "请输入昵称",
        trigger: ["change"]
      }],
      name: [{
        required: true,
        message: "请输入姓名",
        trigger: ["change"]
      }],
      phone: [{
        required: true,
        message: "请输入电话",
        trigger: ["change"]
      }],
      picture: [{
        required: true,
        message: "请上传头像",
        trigger: ["change"]
      }]
    });
    const action = common_vendor.ref(common_http.http.baseUrl + "/api/upload/uploadImage");
    const imgUrl = common_vendor.ref([]);
    const onChange = (res, index, lists, name) => {
      let result = JSON.parse(res.data);
      imgUrl.value.push(common_http.http.baseUrl + result.data);
      let url = "";
      for (let k = 0; k < imgUrl.value.length; k++) {
        url = url + imgUrl.value[k] + ",";
      }
      addModel.picture = url.substring(0, url.lastIndexOf(","));
      console.log(addModel);
    };
    const onRemove = (index) => {
      imgUrl.value.splice(index, 1);
      let url = "";
      for (let k = 0; k < imgUrl.value.length; k++) {
        url = url + imgUrl.value[k] + ",";
      }
      addModel.picture = url.substring(0, url.lastIndexOf(","));
      console.log(addModel);
    };
    const commit = () => {
      form1.value.validate(async (valid) => {
        if (valid) {
          console.log("验证通过");
          let res = await api_user.editInfoApi(addModel);
          if (res && res.code == 200) {
            common_vendor.index.navigateBack({
              delta: 1
            });
          }
        }
      });
    };
    common_vendor.onReady(() => {
      form1.value.setRules(rules);
      imgRef.value.lists = fileList.value;
    });
    common_vendor.onLoad((options) => {
      console.log(options);
      const userInfo = JSON.parse(options.userInfo);
      addModel.name = userInfo.name;
      addModel.nickName = userInfo.nickName;
      addModel.phone = userInfo.phone;
      addModel.picture = userInfo.picture;
      if (userInfo.picture) {
        let imgs = userInfo.picture.split(",");
        for (let g = 0; g < imgs.length; g++) {
          imgUrl.value.push(imgs[g]);
          let obj = { url: "" };
          obj.url = imgs[g];
          fileList.value.push(obj);
        }
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => addModel.nickName = $event),
        b: common_vendor.p({
          modelValue: addModel.nickName
        }),
        c: common_vendor.p({
          label: "昵称",
          prop: "nickName"
        }),
        d: common_vendor.o(($event) => addModel.name = $event),
        e: common_vendor.p({
          modelValue: addModel.name
        }),
        f: common_vendor.p({
          label: "姓名",
          prop: "name"
        }),
        g: common_vendor.o(($event) => addModel.phone = $event),
        h: common_vendor.p({
          modelValue: addModel.phone
        }),
        i: common_vendor.p({
          label: "电话",
          prop: "phone"
        }),
        j: common_vendor.p({
          prop: "picture",
          label: "图片:"
        }),
        k: common_vendor.sr(imgRef, "5ceb9cbc-8,5ceb9cbc-0", {
          "k": "imgRef"
        }),
        l: common_vendor.o(onRemove),
        m: common_vendor.o(onChange),
        n: common_vendor.p({
          ["max-count"]: "1",
          ["file-list"]: fileList.value,
          action: action.value
        }),
        o: common_vendor.sr(form1, "5ceb9cbc-0", {
          "k": "form1"
        }),
        p: common_vendor.p({
          ["label-width"]: "auto",
          model: addModel
        }),
        q: common_vendor.o(commit),
        r: common_vendor.p({
          ["custom-style"]: customStyle
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/user_info/user_info.vue"]]);
wx.createPage(MiniProgramPage);
