"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_goods = require("../../api/goods.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_upload2 + _easycom_u_form2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_upload = () => "../../uni_modules/vk-uview-ui/components/u-upload/u-upload.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_upload + _easycom_u_form)();
}
const _sfc_main = {
  __name: "order_detail",
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
      address: "",
      orderUserName: "",
      orderUserMobie: "",
      orderStatus: "",
      orderStatusNumber: "",
      orderAddress: "",
      evaluate: "",
      backNo: "",
      sendNo: ""
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
    common_vendor.onReady(() => {
      imgRef.value.lists = fileList.value;
      getSelectList();
    });
    common_vendor.onLoad((options) => {
      imgUrl.value = [];
      fileList.value = [];
      const goodsOrder = JSON.parse(options.goods);
      cageId.value = goodsOrder.goods.categoryId;
      addModel.goodsId = goodsOrder.goods.goodsId;
      addModel.evaluate = goodsOrder.evaluate;
      addModel.sendNo = goodsOrder.sendNo;
      addModel.backNo = goodsOrder.backNo;
      addModel.categoryId = goodsOrder.goods.categoryId;
      addModel.image = goodsOrder.goods.image;
      addModel.rentTime = goodsOrder.goods.rentTime;
      if (goodsOrder.goods.image) {
        let imgs = goodsOrder.goods.image.split(",");
        for (let g = 0; g < imgs.length; g++) {
          imgUrl.value.push(imgs[g]);
          let obj = { url: "" };
          obj.url = imgs[g];
          fileList.value.push(obj);
        }
      }
      addModel.goodsName = goodsOrder.goods.goodsName;
      addModel.goodsDesc = goodsOrder.goods.goodsDesc;
      addModel.address = goodsOrder.goods.address;
      addModel.goodsPrice = goodsOrder.goods.goodsPrice;
      addModel.userName = goodsOrder.goods.userName;
      addModel.phone = goodsOrder.goods.phone;
      addModel.type = goodsOrder.goods.type;
      addModel.wxNum = goodsOrder.goods.wxNum;
      switch (goodsOrder.orderStatus) {
        case "1":
          addModel.orderStatus = "待发货";
          break;
        case "2":
          addModel.orderStatus = "待收货";
          break;
        case "3":
          addModel.orderStatus = "待评价";
          break;
        case "4":
          addModel.orderStatus = "已评价";
          break;
      }
      addModel.orderStatusNumber = goodsOrder.orderStatus;
      addModel.orderUserName = goodsOrder.orderUserName;
      addModel.orderUserMobie = goodsOrder.orderUserMobie;
      addModel.orderAddress = goodsOrder.orderAddress;
      for (let i = 0; i < list.length; i++) {
        if (list[i].value == goodsOrder.goods.type) {
          addModel.name = list[i].name;
        }
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => addModel.orderStatus = $event),
        b: common_vendor.p({
          disabled: true,
          placeholder: "请输入名称",
          modelValue: addModel.orderStatus
        }),
        c: common_vendor.p({
          prop: "goodsName",
          label: "状态:"
        }),
        d: common_vendor.o(($event) => addModel.goodsName = $event),
        e: common_vendor.p({
          disabled: true,
          placeholder: "请输入名称",
          modelValue: addModel.goodsName
        }),
        f: common_vendor.p({
          prop: "goodsName",
          label: "名称:"
        }),
        g: common_vendor.o(($event) => addModel.categoryName = $event),
        h: common_vendor.p({
          disabled: true,
          placeholder: "请选择分类",
          modelValue: addModel.categoryName
        }),
        i: common_vendor.p({
          prop: "categoryName",
          label: "分类:"
        }),
        j: common_vendor.o(($event) => addModel.goodsDesc = $event),
        k: common_vendor.p({
          disabled: true,
          placeholder: "请输入简介",
          modelValue: addModel.goodsDesc
        }),
        l: common_vendor.p({
          prop: "goodsDesc",
          label: "简介:"
        }),
        m: common_vendor.o(($event) => addModel.goodsPrice = $event),
        n: common_vendor.p({
          disabled: true,
          placeholder: "请输入价格",
          modelValue: addModel.goodsPrice
        }),
        o: common_vendor.p({
          prop: "goodsPrice",
          label: "价格:"
        }),
        p: common_vendor.o(($event) => addModel.rentTime = $event),
        q: common_vendor.p({
          placeholder: "天",
          modelValue: addModel.rentTime
        }),
        r: common_vendor.p({
          prop: "rentTime",
          label: "租赁时间:",
          ["label-width"]: "auto"
        }),
        s: common_vendor.o(($event) => addModel.userName = $event),
        t: common_vendor.p({
          disabled: true,
          placeholder: "请输入联系人",
          modelValue: addModel.userName
        }),
        v: common_vendor.p({
          prop: "userName",
          ["label-width"]: "auto",
          label: "联系人:"
        }),
        w: common_vendor.o(($event) => addModel.phone = $event),
        x: common_vendor.p({
          disabled: true,
          placeholder: "请输入联系电话",
          modelValue: addModel.phone
        }),
        y: common_vendor.p({
          prop: "phone",
          ["label-width"]: "auto",
          label: "联系电话:"
        }),
        z: common_vendor.o(($event) => addModel.wxNum = $event),
        A: common_vendor.p({
          disabled: true,
          placeholder: "请输入微信号",
          modelValue: addModel.wxNum
        }),
        B: common_vendor.p({
          prop: "wxNum",
          ["label-width"]: "auto",
          label: "微信号:"
        }),
        C: common_vendor.o(($event) => addModel.address = $event),
        D: common_vendor.p({
          disabled: true,
          modelValue: addModel.address
        }),
        E: common_vendor.p({
          prop: "address",
          ["label-width"]: "auto",
          label: "联系地址:"
        }),
        F: common_vendor.p({
          prop: "image",
          label: "图片:"
        }),
        G: common_vendor.sr(imgRef, "6d1e918c-22,6d1e918c-2", {
          "k": "imgRef"
        }),
        H: common_vendor.p({
          ["file-list"]: fileList.value,
          deletable: false
        }),
        I: common_vendor.o(($event) => addModel.orderUserName = $event),
        J: common_vendor.p({
          disabled: true,
          placeholder: "请输入微信号",
          modelValue: addModel.orderUserName
        }),
        K: common_vendor.p({
          prop: "wxNum",
          ["label-width"]: "auto",
          label: "收货人:"
        }),
        L: common_vendor.o(($event) => addModel.orderAddress = $event),
        M: common_vendor.p({
          disabled: true,
          placeholder: "请输入微信号",
          modelValue: addModel.orderAddress
        }),
        N: common_vendor.p({
          prop: "wxNum",
          ["label-width"]: "auto",
          label: "收货地址:"
        }),
        O: common_vendor.o(($event) => addModel.orderUserMobie = $event),
        P: common_vendor.p({
          disabled: true,
          placeholder: "请输入微信号",
          modelValue: addModel.orderUserMobie
        }),
        Q: common_vendor.p({
          prop: "wxNum",
          ["label-width"]: "auto",
          label: "收货人手机号:"
        }),
        R: addModel.orderStatusNumber === "4"
      }, addModel.orderStatusNumber === "4" ? {
        S: common_vendor.o(($event) => addModel.evaluate = $event),
        T: common_vendor.p({
          disabled: true,
          placeholder: "评价内容",
          modelValue: addModel.evaluate
        }),
        U: common_vendor.p({
          prop: "wxNum",
          ["label-width"]: "auto",
          label: "评价:"
        })
      } : {}, {
        V: addModel.sendNo
      }, addModel.sendNo ? {
        W: common_vendor.o(($event) => addModel.sendNo = $event),
        X: common_vendor.p({
          disabled: true,
          placeholder: "发货单号",
          modelValue: addModel.sendNo
        }),
        Y: common_vendor.p({
          prop: "wxNum",
          ["label-width"]: "auto",
          label: "发货单号:"
        })
      } : {}, {
        Z: addModel.backNo
      }, addModel.backNo ? {
        aa: common_vendor.o(($event) => addModel.backNo = $event),
        ab: common_vendor.p({
          disabled: true,
          placeholder: "归还单号",
          modelValue: addModel.backNo
        }),
        ac: common_vendor.p({
          prop: "wxNum",
          ["label-width"]: "auto",
          label: "归还单号:"
        })
      } : {}, {
        ad: common_vendor.sr(form1, "6d1e918c-2", {
          "k": "form1"
        }),
        ae: common_vendor.p({
          model: addModel
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/order/order_detail.vue"]]);
wx.createPage(MiniProgramPage);
