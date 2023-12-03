package com.itmk.web.goods_order.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.itmk.config.Constant;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.goods.entity.Goods;
import com.itmk.web.goods.entity.MyGoodsParm;
import com.itmk.web.goods.mapper.GoodsMapper;
import com.itmk.web.goods.service.GoodsService;
import com.itmk.web.goods_order.entity.GoodsOrder;
import com.itmk.web.goods_order.entity.OrderParm;
import com.itmk.web.goods_order.entity.OrderVo;
import com.itmk.web.goods_order.mapper.GoodsOrderMapper;
import com.itmk.web.goods_order.service.GoodsOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@RestController
@RequestMapping("/api/goodsOrder")
public class GoodsOrderController {

    @Resource
    private GoodsOrderService goodsOrderService;

    @Resource
    private GoodsOrderMapper goodsOrderMapper;

    @Resource
    private GoodsService goodsService;

    @Resource
    private GoodsMapper goodsMapper;

    //交易订单
    @PostMapping("/replaceOrder")
    public ResultVo replaceOrder(@RequestBody GoodsOrder order) {
        goodsOrderService.replaceOrder(order);
        return ResultUtils.success("交易成功!");
    }

    //小程序我的订单
    @GetMapping("/getMyOrder/{userId}")
    public ResultVo getMyOrder(@PathVariable("userId") Long userId) {
        if (userId == null) {
            return ResultUtils.error("获取失败！");
        }
        List<GoodsOrder> goodsOrderList = goodsOrderMapper.selectList(new QueryWrapper<GoodsOrder>()
                .eq("order_user", userId));
        if (goodsOrderList == null || goodsOrderList.isEmpty()){
            return ResultUtils.success("查询成功！", new ArrayList<>());
        }
        goodsOrderList.forEach(item -> {
            Goods goods = goodsMapper.selectById(item.getGoodsId());
            item.setGoods(goods);
        });
        return ResultUtils.success("查询成功！", goodsOrderList);
    }

    //我的出售订单
    @GetMapping("/getSellOrder/{userId}")
    public ResultVo getSellOrder(@PathVariable("userId") Long userId) {
        if (userId == null) {
            return ResultUtils.error("获取失败！");
        }
        List<GoodsOrder> goodsOrderList = goodsOrderMapper.selectList(new QueryWrapper<GoodsOrder>()
                .eq("sell_user_id", userId));
        if (goodsOrderList == null || goodsOrderList.isEmpty()){
            return ResultUtils.success("查询成功！", new ArrayList<>());
        }
        goodsOrderList.forEach(item -> {
            Goods goods = goodsMapper.selectById(item.getGoodsId());
            item.setGoods(goods);
        });
        return ResultUtils.success("查询成功！", goodsOrderList);
    }

    // 发货
    @PostMapping("/postOrder")
    public ResultVo postOrder(@RequestBody GoodsOrder goodsOrder) {
        if (goodsOrder == null || goodsOrder.getOrderId() == null || goodsOrder.getSendNo() == null) {
            return ResultUtils.error("获取失败！");
        }
        GoodsOrder order = goodsOrderMapper.selectById(goodsOrder.getOrderId());
        if (order == null){
            return ResultUtils.error("商品不存在！");
        }
        order.setSendNo(goodsOrder.getSendNo());
        order.setOrderStatus(Constant.OrderStatus.ON_WAY);
        goodsOrderMapper.updateById(order);
        return ResultUtils.success("发货成功！");
    }

    // 收货
    @PostMapping("/receiveOrder")
    public ResultVo receiveOrder(@RequestBody GoodsOrder goodsOrder) {
        if (goodsOrder == null || goodsOrder.getOrderId() == null || goodsOrder.getBackNo() == null) {
            return ResultUtils.error("获取失败！");
        }
        GoodsOrder order = goodsOrderMapper.selectById(goodsOrder.getOrderId());
        if (order == null){
            return ResultUtils.error("商品不存在！");
        }
        order.setBackNo(goodsOrder.getBackNo());
        order.setOrderStatus(Constant.OrderStatus.CONFIRM);
        goodsOrderMapper.updateById(order);
        return ResultUtils.success("发货成功！");
    }

    // 订单评价
    @PostMapping("/evaluate")
    public ResultVo evaluateOrder(@RequestBody GoodsOrder goodsOrder) {
        if (goodsOrder == null || goodsOrder.getOrderId() == null) {
            return ResultUtils.error("获取失败！");
        }
        GoodsOrder order = goodsOrderMapper.selectById(goodsOrder.getOrderId());
        if (order == null){
            return ResultUtils.error("商品不存在！");
        }
        order.setEvaluate(goodsOrder.getEvaluate());
        order.setOrderStatus(Constant.OrderStatus.COMMENT);
        goodsOrderMapper.updateById(order);
        return ResultUtils.success("评价成功！");
    }

    //删除订单
    @PostMapping("/deleteOrder")
    public ResultVo deleteOrder(@RequestBody GoodsOrder parm) {
        GoodsOrder goodsOrder = goodsOrderMapper.selectById(parm.getOrderId());
        if (goodsOrder == null){
            return ResultUtils.error("取消失败!");
        }
        // 已发货、确认收货、已评价的订单无法取消
        if (Constant.OrderStatus.ON_WAY.equals(goodsOrder.getOrderStatus())
            || Constant.OrderStatus.CONFIRM.equals(goodsOrder.getOrderStatus())
            || Constant.OrderStatus.COMMENT.equals(goodsOrder.getOrderStatus())){
            return ResultUtils.error("订单已完成，无法取消!");
        }
        Goods goods = goodsMapper.selectById(goodsOrder.getGoodsId());
        if (goods == null){
            return ResultUtils.error("取消失败!");
        }
        goods.setSellStatus(Constant.SellStatus.NOT_SELL);
        goodsMapper.updateById(goods);
        if (goodsOrderService.removeById(parm.getOrderId())) {
            return ResultUtils.success("删除成功!");
        }
        return ResultUtils.error("删除失败!");
    }

    //订单列表
    @GetMapping("/getList")
    public ResultVo getList(OrderParm parm) {
        IPage<OrderVo> list = goodsOrderService.getList(parm);
        return ResultUtils.success("查询成功", list);
    }
}
