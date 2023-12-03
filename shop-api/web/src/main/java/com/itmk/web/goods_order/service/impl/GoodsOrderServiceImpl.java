package com.itmk.web.goods_order.service.impl;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.goods.entity.Goods;
import com.itmk.web.goods.service.GoodsService;
import com.itmk.web.goods_order.entity.GoodsOrder;
import com.itmk.web.goods_order.entity.OrderParm;
import com.itmk.web.goods_order.entity.OrderVo;
import com.itmk.web.goods_order.mapper.GoodsOrderMapper;
import com.itmk.web.goods_order.service.GoodsOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;


@Service
public class GoodsOrderServiceImpl extends ServiceImpl<GoodsOrderMapper, GoodsOrder> implements GoodsOrderService {

    @Autowired
    private GoodsService goodsService;

    @Override
    @Transactional
    public void replaceOrder(GoodsOrder goodsOrder) {
        //1、插入订单数据
        goodsOrder.setCreateTime(new Date());
        int insert = this.baseMapper.insert(goodsOrder);
        //2、更新商品状态
        if(insert > 0){
            UpdateWrapper<Goods> query = new UpdateWrapper<>();
            query.lambda().set(Goods::getSellStatus,"1")
                    .set(Goods::getStatus,"1")
                    .eq(Goods::getGoodsId,goodsOrder.getGoodsId());
            goodsService.update(query);
        }
    }

    @Override
    public IPage<OrderVo> getList(OrderParm parm) {
        //构造分页对象
        IPage<OrderVo> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        return this.baseMapper.getList(page,parm.getGoodsName());
    }
}
