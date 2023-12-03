"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_lazy_load2 = common_vendor.resolveComponent("u-lazy-load");
  const _easycom_u_waterfall2 = common_vendor.resolveComponent("u-waterfall");
  (_easycom_u_search2 + _easycom_u_lazy_load2 + _easycom_u_waterfall2)();
}
const _easycom_u_search = () => "../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
const _easycom_u_lazy_load = () => "../../uni_modules/vk-uview-ui/components/u-lazy-load/u-lazy-load.js";
const _easycom_u_waterfall = () => "../../uni_modules/vk-uview-ui/components/u-waterfall/u-waterfall.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_lazy_load + _easycom_u_waterfall)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const indicatorDots = common_vendor.ref(true);
    const indicatorColor = common_vendor.ref("#FFF");
    const autoplay = common_vendor.ref(true);
    const interval = common_vendor.ref(2e3);
    const duration = common_vendor.ref(500);
    const uWaterfall1 = common_vendor.ref();
    const swipperList = common_vendor.ref([]);
    const flowList = common_vendor.ref([]);
    const getBannerList = async () => {
      let res = await api_index.getIndexBannerApi();
      if (res && res.code == 200) {
        console.log(res);
        swipperList.value = res.data;
      }
    };
    const loadStatus = common_vendor.ref("loadmore");
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(1e4);
    const keywords = common_vendor.ref("");
    const pages = common_vendor.ref(0);
    const getIndexList = async () => {
      let res = await api_index.getIndexListApi({
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        keywords: keywords.value
      });
      if (res && res.code == 200) {
        flowList.value = res.data.records;
      }
    };
    const searchBtn = () => {
      currentPage.value = 1;
      uWaterfall1.value.clear();
      getIndexList();
    };
    common_vendor.onReachBottom(() => {
      console.log("触底加载");
      if (currentPage.value >= pages.value) {
        loadStatus.value = "nomore";
        return;
      }
      loadStatus.value = "loading";
      currentPage.value = ++currentPage.value;
      getIndexList();
    });
    const toDetail = (item) => {
      if (item.type == "0") {
        common_vendor.index.navigateTo({
          url: "../unused/unused_detail?goods=" + JSON.stringify(item)
        });
      } else {
        common_vendor.index.navigateTo({
          url: "../buy_detail/buy_detail?goods=" + JSON.stringify(item)
        });
      }
    };
    common_vendor.onReady(() => {
      getBannerList();
      getIndexList();
    });
    common_vendor.onPullDownRefresh(() => {
      getBannerList();
      getIndexList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swipperList.value, (item, index, i0) => {
          return {
            a: item.images.split(",")[0],
            b: common_vendor.o(($event) => toDetail(item.goods), index),
            c: index
          };
        }),
        b: indicatorColor.value,
        c: indicatorDots.value,
        d: autoplay.value,
        e: interval.value,
        f: duration.value,
        g: common_vendor.o(searchBtn),
        h: common_vendor.o(($event) => keywords.value = $event),
        i: common_vendor.p({
          ["bg-color"]: "#FFF",
          margin: "8px",
          ["show-action"]: true,
          ["action-text"]: "搜索",
          animation: true,
          modelValue: keywords.value
        }),
        j: common_vendor.w(({
          leftList
        }, s0, i0) => {
          return {
            a: common_vendor.f(leftList, (item, index, i1) => {
              return common_vendor.e({
                a: common_vendor.o(($event) => toDetail(item), index),
                b: "4fe3699c-2-" + i0 + "-" + i1 + ",4fe3699c-1",
                c: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "10",
                  image: item.image,
                  index
                }),
                d: common_vendor.t(item.goodsName),
                e: common_vendor.t(item.goodsPrice),
                f: item.type == "0"
              }, item.type == "0" ? {} : {}, {
                g: index
              });
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "left",
          path: "j",
          vueId: "4fe3699c-1"
        }),
        k: common_vendor.w(({
          rightList
        }, s0, i0) => {
          return {
            a: common_vendor.f(rightList, (item, index, i1) => {
              return common_vendor.e({
                a: common_vendor.o(($event) => toDetail(item), index),
                b: "4fe3699c-3-" + i0 + "-" + i1 + ",4fe3699c-1",
                c: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "10",
                  image: item.image,
                  index
                }),
                d: common_vendor.t(item.goodsName),
                e: common_vendor.t(item.goodsPrice),
                f: item.type == "0"
              }, item.type == "0" ? {} : {}, {
                g: index
              });
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "right",
          path: "k",
          vueId: "4fe3699c-1"
        }),
        l: common_vendor.sr(uWaterfall1, "4fe3699c-1", {
          "k": "uWaterfall1"
        }),
        m: common_vendor.o(($event) => flowList.value = $event),
        n: common_vendor.p({
          modelValue: flowList.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
