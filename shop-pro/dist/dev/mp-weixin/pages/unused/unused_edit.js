"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_goods = require("../../api/goods.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_select2 = common_vendor.resolveComponent("u-select");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_select2 + _easycom_u_upload2 + _easycom_u_form2 + _easycom_u_button2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_select = () => "../../uni_modules/vk-uview-ui/components/u-select/u-select.js";
const _easycom_u_upload = () => "../../uni_modules/vk-uview-ui/components/u-upload/u-upload.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_select + _easycom_u_upload + _easycom_u_form + _easycom_u_button)();
}
const _sfc_main = {
  __name: "unused_edit",
  setup(__props) {
    const form1 = common_vendor.ref();
    const imgRef = common_vendor.ref();
    const addModel = common_vendor.reactive({
      userId: common_vendor.index.getStorageSync("userId"),
      name: "",
      type: "",
      goodsName: "",
      categoryId: "",
      categoryName: "",
      goodsDesc: "",
      goodsPrice: "",
      userName: "",
      rentTime: "",
      phone: "",
      wxNum: "",
      image: "",
      address: ""
    });
    const list = [
      {
        value: "0",
        name: "闲置",
        disabled: false
      },
      {
        value: "1",
        name: "求购",
        disabled: false
      }
    ];
    const rules = common_vendor.reactive({
      name: [{
        required: true,
        message: "请选择类型",
        trigger: ["change", "blur"]
      }],
      goodsName: [{
        required: true,
        message: "请填写名称",
        trigger: ["change", "blur"]
      }],
      goodsDesc: [{
        required: true,
        message: "请填写描述",
        trigger: ["change", "blur"]
      }],
      goodsPrice: [{
        required: true,
        message: "请填写价格",
        trigger: ["change", "blur"],
        transform(value) {
          return String(value);
        }
      }],
      rentTime: [{
        required: true,
        message: "请填写价格",
        trigger: ["change", "blur"],
        transform(value) {
          return String(value);
        }
      }],
      userName: [{
        required: true,
        message: "请填写姓名",
        trigger: ["change", "blur"]
      }],
      phone: [{
        required: true,
        message: "请填写电话",
        trigger: ["change", "blur"]
      }],
      wxNum: [{
        required: true,
        message: "请填写微信号",
        trigger: ["change", "blur"]
      }],
      address: [{
        required: true,
        message: "请填写发布/求购地址",
        trigger: ["change", "blur"]
      }]
    });
    common_vendor.ref("");
    const fileList = common_vendor.ref([]);
    const customStyle = common_vendor.reactive({
      background: "#FF7670",
      color: "#FFF",
      marginTop: "50px",
      width: "100%"
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
      addModel.image = url.substring(0, url.lastIndexOf(","));
      console.log(addModel);
    };
    const onRemove = (index) => {
      imgUrl.value.splice(index, 1);
      let url = "";
      for (let k = 0; k < imgUrl.value.length; k++) {
        url = url + imgUrl.value[k] + ",";
      }
      addModel.image = url.substring(0, url.lastIndexOf(","));
      console.log(addModel);
    };
    const show = common_vendor.ref(false);
    const cageId = common_vendor.ref("");
    const selectList = common_vendor.ref([]);
    const getSelectList = async () => {
      let res = await api_goods.categoryApi();
      if (res && res.code == 200) {
        console.log(res);
        selectList.value = res.data;
        if (cageId.value) {
          for (let k = 0; k < selectList.value.length; k++) {
            if (selectList.value[k].value == cageId.value) {
              addModel.categoryName = selectList.value[k].label;
            }
          }
        }
      }
    };
    const openSelect = () => {
      show.value = true;
    };
    const selectConfirm = (e) => {
      console.log(e);
      addModel.categoryName = e[0].label;
      addModel.categoryId = e[0].value;
    };
    const commit = () => {
      form1.value.validate(async (valid) => {
        console.log(addModel);
        if (valid) {
          let res = await api_goods.editApi(addModel);
          if (res && res.code == 200) {
            console.log(res);
            common_vendor.index.navigateTo({
              url: "../my_unused/my_unused"
            });
            form1.value.resetFields();
            imgUrl.value = [];
            addModel.image = "";
            fileList.value = [];
            imgRef.value.clear();
          }
        }
      });
      console.log(addModel);
    };
    common_vendor.onReady(() => {
      form1.value.setRules(rules);
      imgRef.value.lists = fileList.value;
      getSelectList();
    });
    common_vendor.onLoad((options) => {
      imgUrl.value = [];
      fileList.value = [];
      const goods = JSON.parse(options.goods);
      cageId.value = goods.categoryId;
      console.log(goods);
      addModel.goodsId = goods.goodsId;
      addModel.categoryId = goods.categoryId;
      addModel.image = goods.image;
      if (goods.image) {
        let imgs = goods.image.split(",");
        for (let g = 0; g < imgs.length; g++) {
          imgUrl.value.push(imgs[g]);
          let obj = { url: "" };
          obj.url = imgs[g];
          fileList.value.push(obj);
        }
      }
      addModel.goodsName = goods.goodsName;
      addModel.goodsDesc = goods.goodsDesc;
      addModel.address = goods.address;
      addModel.goodsPrice = goods.goodsPrice;
      addModel.userName = goods.userName;
      addModel.phone = goods.phone;
      addModel.type = goods.type;
      addModel.wxNum = goods.wxNum;
      for (let i = 0; i < list.length; i++) {
        if (list[i].value == goods.type) {
          addModel.name = list[i].name;
        }
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => addModel.goodsName = $event),
        b: common_vendor.p({
          placeholder: "请输入名称",
          modelValue: addModel.goodsName
        }),
        c: common_vendor.p({
          prop: "goodsName",
          label: "名称:"
        }),
        d: common_vendor.o(openSelect),
        e: common_vendor.o(($event) => addModel.categoryName = $event),
        f: common_vendor.p({
          placeholder: "请选择分类",
          modelValue: addModel.categoryName
        }),
        g: common_vendor.o(selectConfirm),
        h: common_vendor.o(($event) => show.value = $event),
        i: common_vendor.p({
          list: selectList.value,
          modelValue: show.value
        }),
        j: common_vendor.p({
          prop: "categoryName",
          label: "分类:"
        }),
        k: common_vendor.o(($event) => addModel.goodsDesc = $event),
        l: common_vendor.p({
          placeholder: "请输入简介",
          modelValue: addModel.goodsDesc
        }),
        m: common_vendor.p({
          prop: "goodsDesc",
          label: "简介:"
        }),
        n: common_vendor.o(($event) => addModel.goodsPrice = $event),
        o: common_vendor.p({
          placeholder: "请输入价格",
          modelValue: addModel.goodsPrice
        }),
        p: common_vendor.p({
          prop: "goodsPrice",
          label: "价格:"
        }),
        q: common_vendor.o(($event) => addModel.rentTime = $event),
        r: common_vendor.p({
          placeholder: "天",
          modelValue: addModel.rentTime
        }),
        s: common_vendor.p({
          prop: "rentTime",
          label: "租赁时间:",
          ["label-width"]: "auto"
        }),
        t: common_vendor.o(($event) => addModel.userName = $event),
        v: common_vendor.p({
          placeholder: "请输入联系人",
          modelValue: addModel.userName
        }),
        w: common_vendor.p({
          prop: "userName",
          ["label-width"]: "auto",
          label: "联系人:"
        }),
        x: common_vendor.o(($event) => addModel.phone = $event),
        y: common_vendor.p({
          placeholder: "请输入联系电话",
          modelValue: addModel.phone
        }),
        z: common_vendor.p({
          prop: "phone",
          ["label-width"]: "auto",
          label: "联系电话:"
        }),
        A: common_vendor.o(($event) => addModel.wxNum = $event),
        B: common_vendor.p({
          placeholder: "请输入微信号",
          modelValue: addModel.wxNum
        }),
        C: common_vendor.p({
          prop: "wxNum",
          ["label-width"]: "auto",
          label: "微信号:"
        }),
        D: common_vendor.o(($event) => addModel.address = $event),
        E: common_vendor.p({
          modelValue: addModel.address
        }),
        F: common_vendor.p({
          prop: "address",
          ["label-width"]: "auto",
          label: "联系地址:"
        }),
        G: common_vendor.p({
          prop: "image",
          label: "图片:"
        }),
        H: common_vendor.sr(imgRef, "99eb7aba-21,99eb7aba-0", {
          "k": "imgRef"
        }),
        I: common_vendor.o(onRemove),
        J: common_vendor.o(onChange),
        K: common_vendor.p({
          ["file-list"]: fileList.value,
          action: action.value
        }),
        L: common_vendor.sr(form1, "99eb7aba-0", {
          "k": "form1"
        }),
        M: common_vendor.p({
          model: addModel
        }),
        N: common_vendor.o(commit),
        O: common_vendor.p({
          ["custom-style"]: customStyle
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/unused/unused_edit.vue"]]);
wx.createPage(MiniProgramPage);
