"use strict";
const common_vendor = require("../../common/vendor.js");
const api_unused = require("../../api/unused.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_swiper2 + _easycom_u_icon2 + _easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_form2 + _easycom_u_button2 + _easycom_u_popup2)();
}
const _easycom_u_swiper = () => "../../uni_modules/vk-uview-ui/components/u-swiper/u-swiper.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_swiper + _easycom_u_icon + _easycom_u_input + _easycom_u_form_item + _easycom_u_form + _easycom_u_button + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "buy_detail",
  setup(__props) {
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
    const wxNum = common_vendor.ref("");
    const phone = common_vendor.ref("");
    const customStyle = common_vendor.reactive({
      background: "#FF7670"
    });
    const createTime = common_vendor.ref("");
    const toHome = () => {
      common_vendor.index.switchTab({
        url: "../index/index"
      });
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
    common_vendor.onLoad((options) => {
      const goods = JSON.parse(options.goods);
      console.log(goods);
      goodsId.value = goods.goodsId;
      if (goods.image) {
        swipperList.value = goods.image.split(",");
      }
      goodsName.value = goods.goodsName;
      goodsDesc.value = goods.goodsDesc;
      address.value = goods.address;
      goodsPrice.value = goods.goodsPrice;
      createTime.value = goods.createTime;
      phone.value = goods.phone;
      wxNum.value = goods.wxNum;
      hasCollect();
      hasReport();
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
        f: common_vendor.t(createTime.value),
        g: common_vendor.t(phone.value),
        h: common_vendor.t(wxNum.value),
        i: common_vendor.p({
          name: "home",
          size: 40
        }),
        j: common_vendor.o(toHome),
        k: hasStatus.value == "0"
      }, hasStatus.value == "0" ? {
        l: common_vendor.p({
          size: 40,
          name: "star"
        })
      } : {}, {
        m: hasStatus.value == "1"
      }, hasStatus.value == "1" ? {
        n: common_vendor.p({
          color: "#FF7670",
          size: 40,
          name: "star"
        })
      } : {}, {
        o: hasStatus.value == "0"
      }, hasStatus.value == "0" ? {} : {}, {
        p: hasStatus.value == "1"
      }, hasStatus.value == "1" ? {} : {}, {
        q: common_vendor.o(collectBtn),
        r: hasReportStatus.value == "0"
      }, hasReportStatus.value == "0" ? {
        s: common_vendor.p({
          name: "info-circle",
          size: 40
        })
      } : {}, {
        t: hasReportStatus.value == "1"
      }, hasReportStatus.value == "1" ? {
        v: common_vendor.p({
          name: "info-circle",
          size: 40
        })
      } : {}, {
        w: hasReportStatus.value == "0"
      }, hasReportStatus.value == "0" ? {} : {}, {
        x: hasReportStatus.value == "1"
      }, hasReportStatus.value == "1" ? {} : {}, {
        y: common_vendor.o(toRepory),
        z: common_vendor.o(($event) => reportModel.reason = $event),
        A: common_vendor.p({
          modelValue: reportModel.reason
        }),
        B: common_vendor.p({
          label: "请输入举报原因",
          prop: "reason"
        }),
        C: common_vendor.sr("form1", "03230094-7,03230094-6"),
        D: common_vendor.p({
          ["label-width"]: "auto",
          model: reportModel
        }),
        E: common_vendor.o(reportCancel),
        F: common_vendor.p({
          type: "info"
        }),
        G: common_vendor.o(reportConfirm),
        H: common_vendor.p({
          ["custom-style"]: customStyle,
          type: "error"
        }),
        I: common_vendor.o(($event) => reportShow.value = $event),
        J: common_vendor.p({
          ["mask-close-able"]: false,
          ["border-radius"]: "15",
          width: "85%",
          height: "200px",
          mode: "center",
          modelValue: reportShow.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/buy_detail/buy_detail.vue"]]);
wx.createPage(MiniProgramPage);
