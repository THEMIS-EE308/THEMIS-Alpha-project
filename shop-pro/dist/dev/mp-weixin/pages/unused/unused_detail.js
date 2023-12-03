"use strict";
const common_vendor = require("../../common/vendor.js");
const api_unused = require("../../api/unused.js");
const api_cart = require("../../api/cart.js");
const api_goods = require("../../api/goods.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  (_easycom_u_swiper2 + _easycom_u_divider2 + _easycom_u_icon2 + _easycom_u_input2 + _easycom_u_popup2 + _easycom_u_form_item2 + _easycom_u_form2)();
}
const _easycom_u_swiper = () => "../../uni_modules/vk-uview-ui/components/u-swiper/u-swiper.js";
const _easycom_u_divider = () => "../../uni_modules/vk-uview-ui/components/u-divider/u-divider.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
if (!Math) {
  (_easycom_u_swiper + _easycom_u_divider + _easycom_u_icon + _easycom_u_input + UButton + _easycom_u_popup + _easycom_u_form_item + _easycom_u_form)();
}
const UButton = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _sfc_main = {
  __name: "unused_detail",
  setup(__props) {
    const evaluate_list = common_vendor.ref([]);
    const customStyle = common_vendor.reactive({
      background: "#FF7670"
    });
    const height = common_vendor.ref("350");
    common_vendor.ref(true);
    common_vendor.ref(true);
    const interval = common_vendor.ref(2e3);
    const duration = common_vendor.ref(500);
    const swipperList = common_vendor.ref([]);
    common_vendor.ref([{
      name: "发布信息"
    }, {
      name: "电话/微信沟通"
    }, {
      name: "当面交易"
    }, {
      name: "交易完成"
    }]);
    const goodsId = common_vendor.ref("");
    const goodsName = common_vendor.ref("");
    const goodsPrice = common_vendor.ref("");
    const goodsDesc = common_vendor.ref("");
    const address = common_vendor.ref("");
    const rentTime = common_vendor.ref("");
    const wxNum = common_vendor.ref("");
    const phone = common_vendor.ref("");
    const createTime = common_vendor.ref("");
    const goods_owner_id = common_vendor.ref("");
    const show_evaluate_dialog = common_vendor.ref(false);
    const pageData = common_vendor.reactive({
      userId: common_vendor.index.getStorageSync("userId"),
      currentPage: 1,
      pageSize: 10,
      list: [],
      pay_dialog_show: false,
      receiveAddress: "",
      radioChange: void 0,
      currentSelectGood: void 0,
      selectPay: void 0,
      evaluateDialogContent: ""
    });
    const radioChange = (value) => {
      pageData.selectPay = value;
    };
    const removeEvaluate = (id) => {
      common_vendor.index.showLoading({ title: "删除中" });
      api_goods.deleteEvaluate(id).then((res) => {
        if (res && res.code == 200) {
          common_vendor.index.showToast({ title: "删除成功", icon: "success", duration: 1e3 });
          queryEvaluate();
        } else {
          common_vendor.index.showToast({ title: "删除失败", icon: "error", duration: 1e3 });
        }
      }).catch((error) => {
        console.log(error);
        common_vendor.index.showToast({ title: "网络出错", icon: "error", duration: 1e3 });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    const confirmPay = () => {
      if (goods_owner_id.value === pageData.userId) {
        common_vendor.index.showToast({ title: "不能购买自己发布的商品", icon: "none", mask: true, duration: 1e3 });
        return;
      }
      if (goodsId.value === void 0) {
        return;
      }
      if (!pageData.receiveAddress) {
        common_vendor.index.showToast({ title: "请输入收货地址", icon: "none", mask: true, duration: 1e3 });
        return;
      }
      if (pageData.selectPay == null) {
        common_vendor.index.showToast({ title: "请选择支付方式", icon: "none", mask: true, duration: 1e3 });
        return;
      }
      common_vendor.index.showLoading({ title: "支付中" });
      let userId = common_vendor.index.getStorageSync("userId");
      let param = {
        userId,
        goodsId: goodsId.value,
        address: pageData.receiveAddress,
        payType: pageData.selectPay.detail.value
      };
      api_cart.payCart(param).then((res) => {
        if (res && res.code == 200) {
          pageData.pay_dialog_show = false;
          common_vendor.index.showToast({ title: "支付成功", icon: "success", duration: 1e3 });
        } else {
          common_vendor.index.showToast({ title: res.msg, icon: "error", duration: 1e3 });
        }
      }).catch((error) => {
        console.log(error);
        common_vendor.index.showToast({ title: "网络出错", icon: "error", duration: 1e3 });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    const doEvaluate = () => {
      if (!pageData.evaluateDialogContent) {
        common_vendor.index.showToast({ title: "请输入评论内容", icon: "error", duration: 1e3 });
        return;
      }
      common_vendor.index.showLoading({ title: "评论中" });
      api_goods.evaluateGoods(goodsId.value, pageData.evaluateDialogContent).then((res) => {
        if (res && res.code === 200) {
          queryEvaluate();
        } else {
          common_vendor.index.showToast({ title: res.msg, icon: "error", duration: 1e3 });
        }
      }).catch((error) => {
        console.log(error);
        common_vendor.index.showToast({ title: "网络出错", icon: "error", duration: 1e3 });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    const addCart = () => {
      if (creatUser.value == addModel.orderUser) {
        common_vendor.index.showToast({ title: "不能加购自己发布的商品！", icon: "none", mask: true, duration: 1e3 });
        return;
      }
      common_vendor.index.showLoading({ title: "加载中" });
      api_cart.addOrder(goodsId).then((res) => {
        if (res && res.code == 200) {
          common_vendor.index.showToast({ title: "加购成功", icon: "success", duration: 1e3 });
        } else {
          common_vendor.index.showToast({ title: res.msg, icon: "error", duration: 1e3 });
        }
      }).catch((error) => {
        common_vendor.index.showToast({
          title: "网络出错",
          icon: "error",
          duration: 1e3
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    const creatUser = common_vendor.ref("");
    const currentUser = common_vendor.index.getStorageSync("userId");
    const show = common_vendor.ref(false);
    const toBuy = () => {
      show.value = true;
      pageData.pay_dialog_show = true;
    };
    const addModel = common_vendor.reactive({
      price: "",
      goodsId: "",
      orderUser: common_vendor.index.getStorageSync("userId"),
      orderAddress: ""
    });
    const reportShow = common_vendor.ref(false);
    const toRepory = () => {
      reportShow.value = true;
    };
    const reportModel = common_vendor.reactive({
      reason: "",
      goodsId: "",
      reportUser: common_vendor.index.getStorageSync("userId")
    });
    const reportCancel = () => {
      reportShow.value = false;
    };
    const reportConfirm = async () => {
      if (!reportModel.reason) {
        common_vendor.index.showToast({
          title: "请填写举报原因",
          icon: "none",
          mask: true,
          duration: 3e3
        });
        return;
      }
      reportModel.goodsId = goodsId.value;
      let res = await api_unused.reportApi(reportModel);
      if (res && res.code == 200) {
        console.log(res);
        hasReport();
        reportShow.value = false;
      }
    };
    const hasReportStatus = common_vendor.ref("0");
    const hasReport = async () => {
      let res = await api_unused.hasReportApi({
        goodsId: goodsId.value,
        userId: common_vendor.index.getStorageSync("userId")
      });
      if (res && res.code == 200) {
        hasReportStatus.value = res.data;
      }
    };
    const collectBtn = async () => {
      let res = await api_unused.collectApi({
        userId: common_vendor.index.getStorageSync("userId"),
        goodsId: goodsId.value
      });
      if (res && res.code == 200) {
        console.log(res);
        hasCollect();
      }
    };
    const evaluateClicked = () => {
      show_evaluate_dialog.value = true;
    };
    const hasStatus = common_vendor.ref("0");
    const hasCollect = async () => {
      let res = await api_unused.hasCollectApi({
        userId: common_vendor.index.getStorageSync("userId"),
        goodsId: goodsId.value
      });
      if (res && res.code == 200) {
        console.log(res);
        hasStatus.value = res.data;
      }
    };
    const queryEvaluate = () => {
      console.log("queryEvaluate");
      api_goods.evaluateList(goodsId.value).then((res) => {
        if (res && res.code === 200) {
          evaluate_list.value = res.data;
          console.log(evaluate_list.value.length);
        }
      }).catch((error) => {
        console.log(error);
      });
    };
    common_vendor.onLoad((options) => {
      const goods = JSON.parse(options.goods);
      console.log(goods);
      goodsId.value = goods.goodsId;
      addModel.goodsId = goods.goodsId;
      creatUser.value = goods.userId;
      if (goods.image) {
        swipperList.value = goods.image.split(",");
      }
      goods_owner_id.value = goods.userId;
      goodsName.value = goods.goodsName;
      goodsDesc.value = goods.goodsDesc;
      address.value = goods.address;
      rentTime.value = goods.rentTime;
      goodsPrice.value = goods.goodsPrice;
      createTime.value = goods.createTime;
      phone.value = goods.phone;
      wxNum.value = goods.wxNum;
      hasCollect();
      hasReport();
      queryEvaluate();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: "image",
          ["border-radius"]: "1",
          duration: duration.value,
          interval: interval.value,
          height: height.value,
          list: swipperList.value
        }),
        b: common_vendor.t(goodsName.value),
        c: common_vendor.t(goodsPrice.value),
        d: common_vendor.t(goodsDesc.value),
        e: common_vendor.t(address.value),
        f: common_vendor.t(rentTime.value),
        g: common_vendor.t(createTime.value),
        h: common_vendor.t(phone.value),
        i: common_vendor.t(wxNum.value),
        j: evaluate_list.value.length > 0
      }, evaluate_list.value.length > 0 ? {} : {}, {
        k: common_vendor.f(evaluate_list.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.userName),
            b: common_vendor.t(item.createTime),
            c: common_vendor.t(item.content),
            d: item.userId === common_vendor.unref(currentUser)
          }, item.userId === common_vendor.unref(currentUser) ? {
            e: common_vendor.o(($event) => removeEvaluate(item.id), item.id)
          } : {}, {
            f: "b1d295ac-1-" + i0,
            g: item.id
          });
        }),
        l: common_vendor.p({
          size: 40,
          name: "chat"
        }),
        m: common_vendor.o(evaluateClicked),
        n: hasStatus.value == "0"
      }, hasStatus.value == "0" ? {
        o: common_vendor.p({
          size: 40,
          name: "star"
        })
      } : {}, {
        p: hasStatus.value == "1"
      }, hasStatus.value == "1" ? {
        q: common_vendor.p({
          color: "#FF7670",
          size: 40,
          name: "star"
        })
      } : {}, {
        r: hasStatus.value == "0"
      }, hasStatus.value == "0" ? {} : {}, {
        s: hasStatus.value == "1"
      }, hasStatus.value == "1" ? {} : {}, {
        t: common_vendor.o(collectBtn),
        v: hasReportStatus.value == "0"
      }, hasReportStatus.value == "0" ? {
        w: common_vendor.p({
          name: "info-circle",
          size: 40
        })
      } : {}, {
        x: hasReportStatus.value == "1"
      }, hasReportStatus.value == "1" ? {
        y: common_vendor.p({
          name: "info-circle",
          size: 40
        })
      } : {}, {
        z: hasReportStatus.value == "0"
      }, hasReportStatus.value == "0" ? {} : {}, {
        A: hasReportStatus.value == "1"
      }, hasReportStatus.value == "1" ? {} : {}, {
        B: common_vendor.o(toRepory),
        C: common_vendor.o(addCart),
        D: common_vendor.o(toBuy),
        E: common_vendor.o(($event) => pageData.receiveAddress = $event),
        F: common_vendor.p({
          placeholder: "地址",
          modelValue: pageData.receiveAddress
        }),
        G: common_vendor.o(radioChange),
        H: common_vendor.o(($event) => pageData.pay_dialog_show = false),
        I: common_vendor.p({
          type: "info"
        }),
        J: common_vendor.o(confirmPay),
        K: common_vendor.p({
          type: "error"
        }),
        L: common_vendor.o(($event) => pageData.pay_dialog_show = $event),
        M: common_vendor.p({
          ["mask-close-able"]: false,
          ["border-radius"]: "15",
          width: "85%",
          height: "200px",
          mode: "center",
          modelValue: pageData.pay_dialog_show
        }),
        N: common_vendor.o(($event) => reportModel.reason = $event),
        O: common_vendor.p({
          modelValue: reportModel.reason
        }),
        P: common_vendor.p({
          label: "请输入举报原因",
          prop: "reason"
        }),
        Q: common_vendor.sr("form1", "b1d295ac-12,b1d295ac-11"),
        R: common_vendor.p({
          ["label-width"]: "auto",
          model: reportModel
        }),
        S: common_vendor.o(reportCancel),
        T: common_vendor.p({
          type: "info"
        }),
        U: common_vendor.o(reportConfirm),
        V: common_vendor.p({
          ["custom-style"]: customStyle,
          type: "error"
        }),
        W: common_vendor.o(($event) => reportShow.value = $event),
        X: common_vendor.p({
          ["mask-close-able"]: false,
          ["border-radius"]: "15",
          width: "85%",
          height: "200px",
          mode: "center",
          modelValue: reportShow.value
        }),
        Y: common_vendor.o(($event) => pageData.evaluateDialogContent = $event),
        Z: common_vendor.p({
          modelValue: pageData.evaluateDialogContent
        }),
        aa: common_vendor.p({
          label: "评论",
          prop: "reason"
        }),
        ab: common_vendor.o(($event) => show_evaluate_dialog.value = false),
        ac: common_vendor.p({
          type: "info"
        }),
        ad: common_vendor.o(doEvaluate),
        ae: common_vendor.p({
          ["custom-style"]: customStyle,
          type: "error"
        }),
        af: common_vendor.o(($event) => show_evaluate_dialog.value = $event),
        ag: common_vendor.p({
          ["mask-close-able"]: false,
          ["border-radius"]: "15",
          width: "85%",
          height: "120px",
          mode: "center",
          modelValue: show_evaluate_dialog.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/unused/unused_detail.vue"]]);
wx.createPage(MiniProgramPage);
