package com.itmk.web.goods.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.goods.entity.Goods;
import com.itmk.web.goods.entity.MyGoodsParm;
import com.itmk.web.goods.mapper.GoodsMapper;
import com.itmk.web.goods.service.GoodsService;
import com.itmk.web.goods_order.entity.GoodsOrder;
import org.springframework.stereotype.Service;


@Service
public class GoodsServiceImpl extends ServiceImpl<GoodsMapper, Goods> implements GoodsService {
    @Override
    public IPage<GoodsOrder> getMyOrder(MyGoodsParm parm) {
        //构造分页对象
        IPage<Goods> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        return this.baseMapper.getMyOrder(page,parm.getUserId());
    }

    @Override
    public IPage<Goods> getSellOrder(MyGoodsParm parm) {
        //构造分页对象
        IPage<Goods> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        return this.baseMapper.getSellOrder(page,parm.getUserId());
    }
}
