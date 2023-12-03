"use strict";
const common_vendor = require("../../common/vendor.js");
const api_goods = require("../../api/goods.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_u_button2 + _easycom_u_popup2 + _easycom_u_loadmore2)();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_popup + _easycom_u_loadmore)();
}
const _sfc_main = {
  __name: "my_collect",
  setup(__props) {
    const show = common_vendor.ref(false);
    const list = common_vendor.ref([]);
    const parm = common_vendor.reactive({
      userId: common_vendor.index.getStorageSync("userId"),
      currentPage: 1,
      pageSize: 10
    });
    const pages = common_vendor.ref(0);
    const getMyCollect = async () => {
      let res = await api_goods.getMyCollectApi(parm);
      if (res && res.code == 200) {
        console.log(res);
        pages.value = res.data.pages;
        list.value = list.value.concat(res.data.records);
      }
    };
    const status = common_vendor.ref("loadmore");
    const loadmore = () => {
      console.log("点击加载更多");
      if (parm.currentPage >= pages.value) {
        status.value = "nomore";
        return;
      }
      status.value = "loading";
      parm.currentPage = ++parm.currentPage;
      getMyCollect();
    };
    common_vendor.onReachBottom(() => {
      console.log("触底加载");
      if (parm.currentPage >= pages.value) {
        status.value = "nomore";
        return;
      }
      status.value = "loading";
      parm.currentPage = ++parm.currentPage;
      getMyCollect();
    });
    const toLook = (item) => {
      if (item.type == "0") {
        common_vendor.index.navigateTo({
          url: "../look_unused/look_unused?goods=" + JSON.stringify(item)
        });
      } else {
        common_vendor.index.navigateTo({
          url: "../look_buy/look_buy?goods=" + JSON.stringify(item)
        });
      }
    };
    const collectId = common_vendor.ref("");
    const cancelBtn = (item) => {
      console.log(item);
      collectId.value = item.collectId;
      show.value = true;
    };
    const confirm = async () => {
      console.log(collectId.value);
      let res = await api_goods.cancelCollectApi({
        collectId: collectId.value
      });
      if (res && res.code == 200) {
        parm.currentPage = 1;
        list.value = [];
        getMyCollect();
        show.value = false;
      }
    };
    const cancel = () => {
      show.value = false;
    };
    common_vendor.onReady(() => {
      getMyCollect();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.goodsName),
            b: item.type == "0"
          }, item.type == "0" ? {} : {}, {
            c: item.type == "1"
          }, item.type == "1" ? {} : {}, {
            d: item.image.split(",")[0],
            e: common_vendor.t(item.goodsDesc),
            f: common_vendor.t(item.createTime),
            g: common_vendor.t(item.goodsPrice),
            h: common_vendor.o(($event) => toLook(item), item.goodsId),
            i: common_vendor.o(($event) => cancelBtn(item), item.goodsId),
            j: item.goodsId
          });
        }),
        b: common_vendor.o(cancel),
        c: common_vendor.p({
          type: "info"
        }),
        d: common_vendor.o(confirm),
        e: common_vendor.p({
          ["custom-style"]: _ctx.customStyle,
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
        }),
        h: common_vendor.o(loadmore),
        i: common_vendor.p({
          status: status.value,
          bgColor: "#f2f2f2"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/my_collect/my_collect.vue"]]);
wx.createPage(MiniProgramPage);
