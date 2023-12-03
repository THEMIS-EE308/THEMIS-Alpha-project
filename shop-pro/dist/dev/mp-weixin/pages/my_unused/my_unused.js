"use strict";
const common_vendor = require("../../common/vendor.js");
const api_goods = require("../../api/goods.js");
require("../../common/http.js");
if (!Array) {
  const _component_spna = common_vendor.resolveComponent("spna");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_component_spna + _easycom_u_button2 + _easycom_u_popup2)();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "my_unused",
  setup(__props) {
    const list = common_vendor.ref([]);
    const customStyle = common_vendor.reactive({
      background: "#FF7670"
    });
    const parm = common_vendor.reactive({
      userId: common_vendor.index.getStorageSync("userId"),
      type: "0",
      currentPage: 1,
      pageSize: 1e4
    });
    const pages = common_vendor.ref(0);
    const getMyUnusedList = async () => {
      let res = await api_goods.getMyUnusedListApi(parm);
      if (res && res.code == 200) {
        console.log(res);
        pages.value = res.data.pages;
        list.value = res.data.records;
      }
    };
    const loadstatus = common_vendor.ref("loadmore");
    common_vendor.onReachBottom(() => {
      console.log("触底加载更多了");
      if (parm.currentPage >= pages.value) {
        loadstatus.value = "nomore";
        return;
      }
      loadstatus.value = "loading";
      parm.currentPage = ++parm.currentPage;
      getMyUnusedList();
    });
    const editBtn = (item) => {
      common_vendor.index.navigateTo({
        url: "../unused/unused_edit?goods=" + JSON.stringify(item)
      });
    };
    const lookBtn = (item) => {
      common_vendor.index.navigateTo({
        url: "../look_unused/look_unused?goods=" + JSON.stringify(item)
      });
    };
    const upanddownBtn = async (item) => {
      console.log(item);
      let res = await api_goods.upanddownpi({
        goodsId: item.goodsId,
        status: item.status == "1" ? "0" : "1"
      });
      if (res && res.code == 200) {
        list.value = [];
        parm.currentPage = 1;
        getMyUnusedList();
      }
    };
    const deleteId = common_vendor.ref("");
    const show = common_vendor.ref(false);
    const deleteBtn = (item) => {
      console.log(item);
      deleteId.value = item.goodsId;
      show.value = true;
      console.log(deleteId.value);
    };
    const cancel = () => {
      show.value = false;
    };
    const confirm = async () => {
      let res = await api_goods.deleteApi({
        goodsId: deleteId.value
      });
      if (res && res.code == 200) {
        list.value = [];
        parm.currentPage = 1;
        getMyUnusedList();
        show.value = false;
      }
    };
    common_vendor.onReady(() => {
      getMyUnusedList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.goodsName),
            b: item.status == "0" && item.sellStatus == "0"
          }, item.status == "0" && item.sellStatus == "0" ? {} : {}, {
            c: item.status == "1" && item.sellStatus == "0"
          }, item.status == "1" && item.sellStatus == "0" ? {} : {}, {
            d: item.image.split(",")[0],
            e: common_vendor.t(item.goodsDesc),
            f: common_vendor.t(item.address),
            g: common_vendor.t(item.createTime),
            h: common_vendor.t(item.goodsPrice),
            i: common_vendor.o(($event) => lookBtn(item), item.goodsId),
            j: item.sellStatus === "0"
          }, item.sellStatus === "0" ? common_vendor.e({
            k: item.status == "0"
          }, item.status == "0" ? {
            l: "6546e74a-0-" + i0
          } : {}, {
            m: item.status == "1"
          }, item.status == "1" ? {
            n: "6546e74a-1-" + i0
          } : {}, {
            o: common_vendor.o(($event) => upanddownBtn(item), item.goodsId)
          }) : {}, {
            p: item.sellStatus === "0"
          }, item.sellStatus === "0" ? {
            q: common_vendor.o(($event) => editBtn(item), item.goodsId)
          } : {}, {
            r: item.sellStatus === "0"
          }, item.sellStatus === "0" ? {
            s: common_vendor.o(($event) => deleteBtn(item), item.goodsId)
          } : {}, {
            t: item.goodsId
          });
        }),
        b: common_vendor.o(cancel),
        c: common_vendor.p({
          type: "info"
        }),
        d: common_vendor.o(confirm),
        e: common_vendor.p({
          ["custom-style"]: customStyle,
          type: "error"
        }),
        f: common_vendor.o(($event) => show.value = $event),
        g: common_vendor.p({
          ["mask-close-able"]: false,
          ["border-radius"]: "15",
          width: "70%",
          height: "120px",
          mode: "center",
          modelValue: show.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/my_unused/my_unused.vue"]]);
wx.createPage(MiniProgramPage);
