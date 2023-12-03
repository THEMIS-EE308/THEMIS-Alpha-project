"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  (_easycom_u_button2 + _easycom_u_divider2 + _easycom_u_popup2 + _easycom_u_input2)();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_divider = () => "../../uni_modules/vk-uview-ui/components/u-divider/u-divider.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_divider + _easycom_u_popup + _easycom_u_input)();
}
const _sfc_main = {
  __name: "my_order",
  setup(__props) {
    const list = common_vendor.ref([]);
    const delete_dialog_show = common_vendor.ref(false);
    const receive_dialog_show = common_vendor.ref(false);
    const evaluateContent_dialog_show = common_vendor.ref(false);
    const pageData = {
      selectOrderId: void 0,
      pay_dialog_show: false,
      evaluateContent: "",
      evaluateContent_dialog_show: false,
      backNo: ""
    };
    const getPageList = () => {
      common_vendor.index.showLoading({ title: "加载中" });
      api_order.getMyOrderApi().then((res) => {
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
    const evaluate = (item) => {
      evaluateContent_dialog_show.value = true;
      pageData.selectOrderId = item.orderId;
    };
    const doEvaluate = () => {
      common_vendor.index.showLoading({ title: "评价中" });
      api_order.evaluateOrder(pageData.selectOrderId, pageData.evaluateContent).then((res) => {
        if (res && res.code === 200) {
          common_vendor.index.showToast({ title: "评价成功", icon: "success", duration: 1e3 });
          getPageList();
          evaluateContent_dialog_show.value = false;
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
    const receive = (item) => {
      receive_dialog_show.value = true;
      pageData.selectOrderId = item.orderId;
    };
    const receiveGoods = () => {
      if (!pageData.backNo) {
        common_vendor.index.showToast({ title: "请输入归还单号", icon: "error", duration: 1e3 });
        return;
      }
      common_vendor.index.showLoading({ title: "收货中" });
      api_order.receiveOrder(pageData.selectOrderId, pageData.backNo).then((res) => {
        if (res && res.code === 200) {
          common_vendor.index.showToast({ title: res.msg, icon: "success", duration: 1e3 });
          getPageList();
          receive_dialog_show.value = false;
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
    const cancelBtn = (order) => {
      console.log("cancelBtn");
      pageData.selectOrderId = order.orderId;
      delete_dialog_show.value = true;
    };
    const confirm = async () => {
      let res = await api_order.deleteOrderApi(pageData.selectOrderId);
      if (res && res.code == 200) {
        getPageList();
        delete_dialog_show.value = false;
      }
    };
    const cancel = () => {
      pageData.show = false;
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
            f: item.orderStatus === "3"
          }, item.orderStatus === "3" ? {
            g: common_vendor.o(($event) => evaluate(item), item.orderId),
            h: "69fbe2a5-0-" + i0,
            i: common_vendor.p({
              type: "info"
            })
          } : {}, {
            j: item.orderStatus === "2"
          }, item.orderStatus === "2" ? {
            k: common_vendor.o(($event) => receive(item), item.orderId),
            l: "69fbe2a5-1-" + i0,
            m: common_vendor.p({
              type: "info"
            })
          } : {}, {
            n: common_vendor.o(($event) => toLook(item), item.orderId),
            o: "69fbe2a5-2-" + i0,
            p: item.orderStatus !== "2" && item.orderStatus !== "3" && item.orderStatus !== "4"
          }, item.orderStatus !== "2" && item.orderStatus !== "3" && item.orderStatus !== "4" ? {
            q: common_vendor.o(($event) => cancelBtn(item), item.orderId),
            r: "69fbe2a5-3-" + i0,
            s: common_vendor.p({
              type: "error"
            })
          } : {}, {
            t: "69fbe2a5-4-" + i0,
            v: item.orderId
          });
        }),
        b: common_vendor.p({
          type: "info"
        }),
        c: common_vendor.p({
          text: "分割线"
        }),
        d: common_vendor.o(cancel),
        e: common_vendor.p({
          type: "info"
        }),
        f: common_vendor.o(confirm),
        g: common_vendor.p({
          type: "error"
        }),
        h: common_vendor.o(($event) => delete_dialog_show.value = $event),
        i: common_vendor.p({
          ["mask-close-able"]: false,
          ["border-radius"]: "15",
          width: "70%",
          height: "120px",
          mode: "center",
          modelValue: delete_dialog_show.value
        }),
        j: common_vendor.o(($event) => pageData.evaluateContent = $event),
        k: common_vendor.p({
          placeholder: "请输入评价",
          modelValue: pageData.evaluateContent
        }),
        l: common_vendor.o(($event) => evaluateContent_dialog_show.value = false),
        m: common_vendor.p({
          type: "info"
        }),
        n: common_vendor.o(doEvaluate),
        o: common_vendor.p({
          type: "error"
        }),
        p: common_vendor.o(($event) => evaluateContent_dialog_show.value = $event),
        q: common_vendor.p({
          ["mask-close-able"]: false,
          ["border-radius"]: "15",
          width: "85%",
          height: "100px",
          mode: "center",
          modelValue: evaluateContent_dialog_show.value
        }),
        r: common_vendor.o(($event) => pageData.backNo = $event),
        s: common_vendor.p({
          placeholder: "快递单号",
          modelValue: pageData.backNo
        }),
        t: common_vendor.o(($event) => receive_dialog_show.value = false),
        v: common_vendor.p({
          type: "info"
        }),
        w: common_vendor.o(receiveGoods),
        x: common_vendor.p({
          type: "error"
        }),
        y: common_vendor.o(($event) => receive_dialog_show.value = $event),
        z: common_vendor.p({
          ["mask-close-able"]: false,
          ["border-radius"]: "15",
          width: "85%",
          height: "100px",
          mode: "center",
          modelValue: receive_dialog_show.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/order/my_order.vue"]]);
wx.createPage(MiniProgramPage);
