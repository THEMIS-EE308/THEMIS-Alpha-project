package com.itmk.web.goods_order.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.itmk.web.goods_order.entity.GoodsOrder;
import com.itmk.web.goods_order.entity.OrderVo;
import org.apache.ibatis.annotations.Param;


public interface GoodsOrderMapper extends BaseMapper<GoodsOrder> {
    IPage<OrderVo> getList(IPage<OrderVo> page, @Param("goodsName") String goodsName);
}
