package com.itmk.web.goods_cart.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.itmk.config.Constant;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.goods.entity.Goods;
import com.itmk.web.goods.mapper.GoodsMapper;
import com.itmk.web.goods_cart.entity.GoodsCart;
import com.itmk.web.goods_cart.entity.ListParm;
import com.itmk.web.goods_cart.mapper.GoodsCartMapper;
import com.itmk.web.goods_cart.service.GoodsCartService;
import com.itmk.web.goods_order.entity.GoodsOrder;
import com.itmk.web.goods_order.entity.PayBean;
import com.itmk.web.goods_order.mapper.GoodsOrderMapper;
import com.itmk.web.sys_user.mapper.SysUserMapper;
import com.itmk.web.wx_user.mapper.WxUserMapper;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.swing.plaf.TextUI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/cart")
public class GoodsCartController {

    @Resource
    private GoodsCartService goodsCartService;

    @Resource
    private GoodsCartMapper goodsCartMapper;

    @Resource
    private GoodsMapper goodsMapper;

    @Resource
    private SysUserMapper sysUserMapper;

    @Resource
    private WxUserMapper wxUserMapper;

    @Resource
    private GoodsOrderMapper goodsOrderMapper;

    //新增
    @PostMapping("/add")
    public ResultVo add(@RequestBody GoodsCart goodsCart) {
        List<GoodsCart> goodsCarts = goodsCartMapper.selectList(new QueryWrapper<GoodsCart>()
                .eq("user_id", goodsCart.getUserId())
                .eq("goods_id", goodsCart.getGoodsId()));
        if (goodsCarts != null && !goodsCarts.isEmpty()) {
            return ResultUtils.error("请勿重复加购");
        }
        Goods goods = goodsMapper.selectById(goodsCart.getGoodsId());
        if (goods == null) {
            return ResultUtils.error("商品不存在");
        }
        if (Constant.SellStatus.SELL.equals(goods.getSellStatus())) {
            return ResultUtils.error("该商品已租赁，无法加入购物车");
        }
        goodsCart.setCreateTime(new Date());
        if (goodsCartService.save(goodsCart)) {
            return ResultUtils.success("新增成功!");
        }
        return ResultUtils.error("新增失败!");
    }

    //编辑
    @PutMapping("edit")
    public ResultVo edit(@RequestBody GoodsCart goodsCart) {
        if (goodsCartService.updateById(goodsCart)) {
            return ResultUtils.success("编辑成功!");
        }
        return ResultUtils.error("编辑失败!");
    }

    //删除
    @PostMapping("remove/{userId}/{goodsId}")
    public ResultVo delete(@PathVariable("userId") Long userId, @PathVariable("goodsId") Long goodsId) {
        goodsCartMapper.remove(userId, goodsId);
        return ResultUtils.success("移除成功!");
    }

    // 支付
    @PostMapping("pay")
    public ResultVo pay(@RequestBody PayBean payBean) {
        if (payBean == null || payBean.goodsId == null || payBean.userId == null) {
            return ResultUtils.error("处理失败");
        }
        int count = goodsOrderMapper.selectCount(new QueryWrapper<GoodsOrder>()
                .eq("order_user", payBean.userId)
                .eq("goods_id", payBean.goodsId));
        if (count > 0) {
            return ResultUtils.error("您已租赁此商品！");
        }
        // 设置商品为已出售
        Goods goods = goodsMapper.selectOne(new QueryWrapper<Goods>().eq("goods_id", payBean.goodsId).last("limit 1"));
        if (goods == null) {
            return ResultUtils.error("未查询到该商品");
        }
        if (Constant.SellStatus.SELL.equals(goods.getSellStatus())) {
            return ResultUtils.error("该商品已租赁");
        }
        goods.setSellStatus(Constant.SellStatus.SELL);
        goodsMapper.updateById(goods);

        // 从购物车移除
        goodsCartMapper.remove(payBean.userId, payBean.goodsId);

        // 生成订单
        GoodsOrder goodsOrder = new GoodsOrder();
        goodsOrder.setGoodsId(payBean.goodsId);
        goodsOrder.setOrderUser(payBean.userId);
        goodsOrder.setSellUserId(goods.getUserId());
        try {
            goodsOrder.setOrderUserName(wxUserMapper.selectById(payBean.userId).getUsername());
            goodsOrder.setOrderUserMobie(wxUserMapper.selectById(payBean.userId).getPhone());
        } catch (Exception e) {
            e.printStackTrace();
        }
        goodsOrder.setOrderAddress(payBean.address);
        goodsOrder.setOrderStatus(Constant.OrderStatus.PAYED);
        goodsOrder.setPrice(goods.getGoodsPrice());
        goodsOrder.setCreateTime(new Date());
        goodsOrder.setPayTime(new Date());
        goodsOrder.setPayType(payBean.payType);
        goodsOrderMapper.insert(goodsOrder);

        return ResultUtils.success("支付成功!");
    }

    // 查询购物车列表
    @GetMapping("/getList/{userId}")
    public ResultVo getCateList(@PathVariable("userId") Long userId) {
        if (userId == null) {
            return ResultUtils.error("用户未登录");
        }
        final List<GoodsCart> list = goodsCartMapper
                .selectList(new QueryWrapper<GoodsCart>()
                        .eq("user_id", userId));
        if (list == null || list.isEmpty()) {
            return ResultUtils.success("查询成功", new ArrayList<>());
        }
        List<Goods> goodsList = goodsMapper
                .selectList(new QueryWrapper<Goods>()
                        .in("goods_id",
                                list.stream().map(GoodsCart::getGoodsId).collect(Collectors.toList())));
        goodsList.forEach(goods -> {
            for (GoodsCart goodsCart : list) {
                if (userId.equals(goodsCart.getUserId())
                        && goodsCart.getGoodsId().equals(goods.getGoodsId())) {
                    goods.setCartTime(goodsCart.getCreateTime());
                }
            }
        });
        return ResultUtils.success("查询成功", goodsList);
    }
}
