package com.itmk.web.goods_collect.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.itmk.web.goods.entity.Goods;
import com.itmk.web.goods_collect.entity.GoodsCollect;
import org.apache.ibatis.annotations.Param;


public interface GoodsCollectMapper extends BaseMapper<GoodsCollect> {
    //小程序我的收藏列表
    IPage<Goods> getMyCollect(IPage<Goods> page, @Param("userId") Long userId);
}
