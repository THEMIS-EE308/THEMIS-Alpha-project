package com.itmk.web.goods_cart.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.itmk.web.goods_cart.entity.GoodsCart;


public interface GoodsCartMapper extends BaseMapper<GoodsCart> {

    void remove(Long userId, Long goodsId);

}
