package com.itmk.web.goods_collect.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.goods.entity.Goods;
import com.itmk.web.goods_collect.entity.CollectParm;
import com.itmk.web.goods_collect.entity.GoodsCollect;
import com.itmk.web.goods_collect.mapper.GoodsCollectMapper;
import com.itmk.web.goods_collect.service.GoodsCollectService;
import org.springframework.stereotype.Service;


@Service
public class GoodsCollectServiceImpl extends ServiceImpl<GoodsCollectMapper, GoodsCollect> implements GoodsCollectService {
    @Override
    public IPage<Goods> getMyCollect(CollectParm parm) {
        //构造分页对象
        IPage<Goods> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        return this.baseMapper.getMyCollect(page,parm.getUserId());
    }
}
