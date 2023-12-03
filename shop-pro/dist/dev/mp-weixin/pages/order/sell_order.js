"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_button2 + _easycom_u_divider2 + _easycom_u_input2 + _easycom_u_popup2)();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_divider = () => "../../uni_modules/vk-uview-ui/components/u-divider/u-divider.js";
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_divider + _easycom_u_input + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "sell_order",
  setup(__props) {
    const list = common_vendor.ref([]);
    const post_dialog_show = common_vendor.ref(false);
    const pageData = {
      selectOrderId: void 0,
      sendNo: void 0,
      pay_dialog_show: false,
      evaluateContent: "",
      evaluateContent_dialog_show: false
    };
    const getPageList = () => {
      common_vendor.index.showLoading({ title: "加载中" });
      api_order.getSellOrderApi().then((res) => {
        if (res && res.code === 200) {
          list.value = res.data;
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
    const toLook = (item) => {
      common_vendor.index.navigateTo({
        url: "../order/order_detail?goods=" + JSON.stringify(item)
      });
    };
    const post = (item) => {
      post_dialog_show.value = true;
      pageData.selectOrderId = item.orderId;
    };
    const cancelOrder = (item) => {
      common_vendor.index.showLoading({ title: "取消中" });
      api_order.deleteOrderApi(item.orderId).then((res) => {
        if (res && res.code == 200) {
          getPageList();
          common_vendor.index.showToast({ title: res.msg, icon: "success", duration: 1e3 });
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
    const doPostOrder = () => {
      if (!pageData.sendNo) {
        common_vendor.index.showToast({ title: "请输入发货单号", icon: "error", duration: 1e3 });
        return;
      }
      common_vendor.index.showLoading({ title: "发货中" });
      api_order.postOrder(pageData.selectOrderId, pageData.sendNo).then((res) => {
        if (res && res.code == 200) {
          pageData.list = res.data;
          post_dialog_show.value = false;
          common_vendor.index.showToast({ title: res.msg, icon: "success", duration: 1e3 });
          getPageList();
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
    common_vendor.onReady(() => {
      getPageList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.goods.goodsName),
            b: item.goods.image.split(",")[0],
            c: common_vendor.t(item.goods.goodsDesc),
            d: common_vendor.t(item.price),
            e: common_vendor.t(item.createTime),
            f: item.orderStatus === "1"
          }, item.orderStatus === "1" ? {
            g: common_vendor.o(($event) => post(item), item.orderId),
            h: "25b2f04b-0-" + i0,
            i: common_vendor.p({
              type: "info"
            })
          } : {}, {
            j: common_vendor.o(($event) => toLook(item), item.orderId),
            k: "25b2f04b-1-" + i0,
            l: item.orderStatus !== "2" && item.orderStatus !== "3" && item.orderStatus !== "4"
          }, item.orderStatus !== "2" && item.orderStatus !== "3" && item.orderStatus !== "4" ? {
            m: common_vendor.o(($event) => cancelOrder(item), item.orderId),
            n: "25b2f04b-2-" + i0,
            o: common_vendor.p({
              type: "error"
            })
          } : {}, {
            p: "25b2f04b-3-" + i0,
            q: item.orderId
          });
        }),
        b: common_vendor.p({
          type: "info"
        }),
        c: common_vendor.p({
          text: "分割线"
        }),
        d: common_vendor.o(($event) => pageData.sendNo = $event),
        e: common_vendor.p({
          placeholder: "快递单号",
          modelValue: pageData.sendNo
        }),
        f: common_vendor.o(($event) => post_dialog_show.value = false),
        g: common_vendor.p({
          type: "info"
        }),
        h: common_vendor.o(doPostOrder),
        i: common_vendor.p({
          type: "error"
        }),
        j: common_vendor.o(($event) => post_dialog_show.value = $event),
        k: common_vendor.p({
          ["mask-close-able"]: false,
          ["border-radius"]: "15",
          width: "70%",
          height: "120px",
          mode: "center",
          modelValue: post_dialog_show.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/order/sell_order.vue"]]);
wx.createPage(MiniProgramPage);
