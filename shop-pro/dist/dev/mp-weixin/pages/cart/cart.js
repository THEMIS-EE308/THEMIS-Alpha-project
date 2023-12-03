"use strict";
const common_vendor = require("../../common/vendor.js");
const api_cart = require("../../api/cart.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_input2 + _easycom_u_button2 + _easycom_u_popup2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_button + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    const pageData = common_vendor.reactive({
      userId: common_vendor.index.getStorageSync("userId"),
      currentPage: 1,
      pageSize: 10,
      list: [],
      pay_dialog_show: false,
      receiveAddress: "",
      radioChange: void 0,
      currentSelectGood: void 0,
      selectPay: void 0
    });
    common_vendor.ref(0);
    const getMyCollect = () => {
      common_vendor.index.showLoading({ title: "加载中" });
      api_cart.listCart().then((res) => {
        if (res && res.code === 200) {
          pageData.list = res.data;
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
    const radioChange = (value) => {
      pageData.selectPay = value;
    };
    const toPay = (goodId) => {
      pageData.pay_dialog_show = true;
      pageData.currentSelectGood = goodId;
    };
    const remove = (goodId) => {
      common_vendor.index.showLoading({ title: "移除中" });
      api_cart.removeCart(goodId).then((res) => {
        if (res && res.code == 200) {
          getMyCollect();
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
    const confirmPay = () => {
      if (pageData.currentSelectGood === void 0) {
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
        goodsId: pageData.currentSelectGood,
        address: pageData.receiveAddress,
        payType: pageData.selectPay.detail.value
      };
      api_cart.payCart(param).then((res) => {
        if (res && res.code == 200) {
          pageData.pay_dialog_show = false;
          getMyCollect();
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
    common_vendor.onLoad(() => {
      getMyCollect();
    });
    common_vendor.onPullDownRefresh(() => {
      getMyCollect();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(pageData.list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.goodsName),
            b: item.image.split(",")[0],
            c: common_vendor.t(item.goodsDesc),
            d: common_vendor.t(item.createTime),
            e: common_vendor.t(item.goodsPrice),
            f: common_vendor.o(($event) => toPay(item.goodsId), item.goodsId),
            g: common_vendor.o(($event) => remove(item.goodsId), item.goodsId),
            h: item.goodsId
          };
        }),
        b: common_vendor.o(($event) => pageData.receiveAddress = $event),
        c: common_vendor.p({
          placeholder: "地址",
          modelValue: pageData.receiveAddress
        }),
        d: common_vendor.o(radioChange),
        e: common_vendor.o(($event) => pageData.pay_dialog_show = false),
        f: common_vendor.p({
          type: "info"
        }),
        g: common_vendor.o(confirmPay),
        h: common_vendor.p({
          type: "error"
        }),
        i: common_vendor.o(($event) => pageData.pay_dialog_show = $event),
        j: common_vendor.p({
          ["mask-close-able"]: false,
          ["border-radius"]: "15",
          width: "85%",
          height: "200px",
          mode: "center",
          modelValue: pageData.pay_dialog_show
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
