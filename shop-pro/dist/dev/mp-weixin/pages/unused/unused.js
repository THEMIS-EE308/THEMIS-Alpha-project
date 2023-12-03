"use strict";
const common_vendor = require("../../common/vendor.js");
const api_goods = require("../../api/goods.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_lazy_load2 = common_vendor.resolveComponent("u-lazy-load");
  const _easycom_u_waterfall2 = common_vendor.resolveComponent("u-waterfall");
  (_easycom_u_search2 + _easycom_u_tabs2 + _easycom_u_lazy_load2 + _easycom_u_waterfall2)();
}
const _easycom_u_search = () => "../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_u_lazy_load = () => "../../uni_modules/vk-uview-ui/components/u-lazy-load/u-lazy-load.js";
const _easycom_u_waterfall = () => "../../uni_modules/vk-uview-ui/components/u-waterfall/u-waterfall.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_tabs + _easycom_u_lazy_load + _easycom_u_waterfall)();
}
const _sfc_main = {
  __name: "unused",
  setup(__props) {
    const tabList = common_vendor.ref([]);
    const current = common_vendor.ref(0);
    const uWaterfall1 = common_vendor.ref();
    common_vendor.ref("loadmore");
    const flowList = common_vendor.ref([]);
    const isFirst = common_vendor.ref(true);
    const show_wf = common_vendor.ref(true);
    const getCateList = async () => {
      let res = await api_goods.getCateListApi();
      if (res && res.code == 200) {
        console.log(res);
        tabList.value = res.data;
        tabList.value.unshift({
          categoryId: "",
          categoryName: "全部",
          orderNum: 0
        });
      }
    };
    const categoryId = common_vendor.ref("");
    const change = (e) => {
      categoryId.value = tabList.value[e].categoryId;
      console.log(categoryId.value);
      currentPage.value = 1;
      uWaterfall1.value.clear();
      getUsedList();
    };
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(1e3);
    const keywords = common_vendor.ref("");
    const pages = common_vendor.ref(0);
    const getUsedList = () => {
      api_goods.getUsedListApi({
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        categoryId: categoryId.value,
        keywords: keywords.value
      }).then((res) => {
        if (res && res.code == 200) {
          console.log(res);
          uWaterfall1.value.clear();
          setTimeout(() => {
            flowList.value = res.data.records;
            pages.value = res.data.pages;
          }, 500);
        }
      }).catch((e) => {
        console.log(e);
      });
    };
    const searchBtn = () => {
      currentPage.value = 1;
      uWaterfall1.value.clear();
      getUsedList();
    };
    const toDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "../unused/unused_detail?goods=" + JSON.stringify(item)
      });
    };
    common_vendor.onShow(() => {
      console.log("onSHow called");
      getCateList();
      getUsedList();
      isFirst.value = false;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(searchBtn),
        b: common_vendor.o(($event) => keywords.value = $event),
        c: common_vendor.p({
          margin: "20rpx 0rpx",
          ["show-action"]: true,
          ["action-text"]: "搜索",
          animation: true,
          modelValue: keywords.value
        }),
        d: common_vendor.o(change),
        e: common_vendor.o(($event) => current.value = $event),
        f: common_vendor.p({
          ["active-color"]: "#FF7670",
          name: "categoryName",
          count: "cate_count",
          list: tabList.value,
          ["is-scroll"]: true,
          modelValue: current.value
        }),
        g: show_wf.value
      }, show_wf.value ? {
        h: common_vendor.w(({
          leftList
        }, s0, i0) => {
          return {
            a: common_vendor.f(leftList, (item, index, i1) => {
              return common_vendor.e({
                a: common_vendor.o(($event) => toDetail(item), index),
                b: "71952fb6-3-" + i0 + "-" + i1 + ",71952fb6-2",
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
          path: "h",
          vueId: "71952fb6-2"
        }),
        i: common_vendor.w(({
          rightList
        }, s0, i0) => {
          return {
            a: common_vendor.f(rightList, (item, index, i1) => {
              return common_vendor.e({
                a: common_vendor.o(($event) => toDetail(item), index),
                b: "71952fb6-4-" + i0 + "-" + i1 + ",71952fb6-2",
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
          path: "i",
          vueId: "71952fb6-2"
        }),
        j: common_vendor.sr(uWaterfall1, "71952fb6-2", {
          "k": "uWaterfall1"
        }),
        k: common_vendor.o(($event) => flowList.value = $event),
        l: common_vendor.p({
          modelValue: flowList.value
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/unused/unused.vue"]]);
wx.createPage(MiniProgramPage);
