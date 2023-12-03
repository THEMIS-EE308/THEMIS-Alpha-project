package com.itmk.web.goods_order.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.goods_order.entity.GoodsOrder;
import com.itmk.web.goods_order.entity.OrderParm;
import com.itmk.web.goods_order.entity.OrderVo;


public interface GoodsOrderService extends IService<GoodsOrder> {
    void replaceOrder(GoodsOrder goodsOrder);
    //闲置订单列表
    IPage<OrderVo> getList(OrderParm parm);
}
