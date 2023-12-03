"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_goods = require("../../api/goods.js");
if (!Array) {
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  (_easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_form_item2 + _easycom_u_input2 + _easycom_u_upload2 + _easycom_u_form2)();
}
const _easycom_u_radio = () => "../../uni_modules/vk-uview-ui/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../uni_modules/vk-uview-ui/components/u-radio-group/u-radio-group.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_upload = () => "../../uni_modules/vk-uview-ui/components/u-upload/u-upload.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
if (!Math) {
  (_easycom_u_radio + _easycom_u_radio_group + _easycom_u_form_item + _easycom_u_input + _easycom_u_upload + _easycom_u_form)();
}
const _sfc_main = {
  __name: "look_buy",
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
    common_vendor.ref("");
    const fileList = common_vendor.ref([]);
    common_vendor.reactive({
      background: "#FF7670",
      color: "#FFF",
      marginTop: "50px",
      width: "100%"
    });
    common_vendor.ref(common_http.http.baseUrl + "/api/upload/uploadImage");
    const imgUrl = common_vendor.ref([]);
    common_vendor.ref(false);
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
    const radioChange = (e) => {
      console.log(e);
      for (let i = 0; i < list.length; i++) {
        if (list[i].name == e) {
          addModel.type = list[i].value;
        }
      }
    };
    common_vendor.onReady(() => {
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
        a: common_vendor.f(list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o(radioChange, index),
            c: index,
            d: "40703ff6-3-" + i0 + ",40703ff6-2",
            e: common_vendor.p({
              disabled: true,
              activeColor: "#FF7670",
              name: item.name
            })
          };
        }),
        b: common_vendor.o(($event) => addModel.name = $event),
        c: common_vendor.p({
          modelValue: addModel.name
        }),
        d: common_vendor.p({
          prop: "name",
          label: "类型:"
        }),
        e: common_vendor.o(($event) => addModel.goodsName = $event),
        f: common_vendor.p({
          disabled: true,
          placeholder: "请输入名称",
          modelValue: addModel.goodsName
        }),
        g: common_vendor.p({
          prop: "goodsName",
          label: "名称:"
        }),
        h: common_vendor.o(($event) => addModel.categoryName = $event),
        i: common_vendor.p({
          disabled: true,
          placeholder: "请选择分类",
          modelValue: addModel.categoryName
        }),
        j: common_vendor.p({
          prop: "categoryName",
          label: "分类:"
        }),
        k: common_vendor.o(($event) => addModel.goodsDesc = $event),
        l: common_vendor.p({
          disabled: true,
          placeholder: "请输入简介",
          modelValue: addModel.goodsDesc
        }),
        m: common_vendor.p({
          prop: "goodsDesc",
          label: "简介:"
        }),
        n: common_vendor.o(($event) => addModel.goodsPrice = $event),
        o: common_vendor.p({
          disabled: true,
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
          disabled: true,
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
          disabled: true,
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
          disabled: true,
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
          disabled: true,
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
        H: common_vendor.sr(imgRef, "40703ff6-23,40703ff6-0", {
          "k": "imgRef"
        }),
        I: common_vendor.p({
          ["file-list"]: fileList.value,
          deletable: false
        }),
        J: common_vendor.sr(form1, "40703ff6-0", {
          "k": "form1"
        }),
        K: common_vendor.p({
          model: addModel
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/look_buy/look_buy.vue"]]);
wx.createPage(MiniProgramPage);
