"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_cell_item2 = common_vendor.resolveComponent("u-cell-item");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  (_easycom_u_avatar2 + _easycom_u_icon2 + _easycom_u_cell_item2 + _easycom_u_cell_group2)();
}
const _easycom_u_avatar = () => "../../uni_modules/vk-uview-ui/components/u-avatar/u-avatar.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_cell_item = () => "../../uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.js";
const _easycom_u_cell_group = () => "../../uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_icon + _easycom_u_cell_item + _easycom_u_cell_group)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    common_vendor.ref("https://uviewui.com/common/logo.png");
    common_vendor.ref(true);
    const toMyUnused = () => {
      common_vendor.index.navigateTo({
        url: "../my_unused/my_unused"
      });
    };
    const toCollect = () => {
      common_vendor.index.navigateTo({
        url: "../my_collect/my_collect"
      });
    };
    const toOrder = () => {
      common_vendor.index.navigateTo({
        url: "../order/my_order"
      });
    };
    const toSellOrder = () => {
      common_vendor.index.navigateTo({
        url: "../order/sell_order"
      });
    };
    const toUpdate = () => {
      common_vendor.index.navigateTo({
        url: "../update_password/update_password"
      });
    };
    const loginOut = () => {
      common_vendor.index.clearStorageSync();
      common_vendor.index.reLaunch({
        url: "../login/login"
      });
    };
    const nickName = common_vendor.ref("大幕孤烟直");
    const picture = common_vendor.ref("");
    let userInfo = null;
    const getInfo = async () => {
      let res = await api_user.getInfoApi({
        userId: common_vendor.index.getStorageSync("userId")
      });
      if (res && res.code == 200) {
        console.log(res);
        nickName.value = res.data.nickName;
        picture.value = res.data.picture;
        userInfo = res.data;
      }
    };
    const toUserInfo = () => {
      common_vendor.index.navigateTo({
        url: "../user_info/user_info?userInfo=" + JSON.stringify(userInfo)
      });
    };
    common_vendor.onShow(() => {
      getInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: picture.value
      }, picture.value ? {
        b: common_vendor.p({
          src: picture.value,
          size: "100"
        })
      } : {
        c: common_vendor.p({
          src: "/static/user.jpg",
          size: "100"
        })
      }, {
        d: common_vendor.t(nickName.value),
        e: common_vendor.p({
          name: "arrow-right",
          color: "#969799",
          size: "28"
        }),
        f: common_vendor.o(toUserInfo),
        g: common_vendor.o(toMyUnused),
        h: common_vendor.p({
          icon: "star",
          title: "我的闲置"
        }),
        i: common_vendor.o(toCollect),
        j: common_vendor.p({
          icon: "heart",
          title: "我的收藏"
        }),
        k: common_vendor.o(toOrder),
        l: common_vendor.p({
          icon: "red-packet",
          title: "租赁订单"
        }),
        m: common_vendor.o(toSellOrder),
        n: common_vendor.p({
          icon: "order",
          title: "出租订单"
        }),
        o: common_vendor.o(toUpdate),
        p: common_vendor.p({
          icon: "edit-pen",
          title: "修改密码"
        }),
        q: common_vendor.o(loginOut),
        r: common_vendor.p({
          icon: "setting",
          title: "退出账号"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/文件/软工/ershouFinal/ershouFinal/shop-pro/src/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
