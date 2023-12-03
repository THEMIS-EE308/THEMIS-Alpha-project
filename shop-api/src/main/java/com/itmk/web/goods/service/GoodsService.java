package com.itmk.web.goods.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.goods.entity.Goods;
import com.itmk.web.goods.entity.MyGoodsParm;
import com.itmk.web.goods_order.entity.GoodsOrder;



public interface GoodsService extends IService<Goods> {
    //查询我的订单
    IPage<GoodsOrder> getMyOrder(MyGoodsParm parm);
    //查询出售订单
    IPage<Goods> getSellOrder(MyGoodsParm parm);
}
