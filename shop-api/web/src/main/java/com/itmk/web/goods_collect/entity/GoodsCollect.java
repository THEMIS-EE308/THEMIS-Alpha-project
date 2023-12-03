package com.itmk.web.goods_collect.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;


@Data
@TableName("goods_collect")
public class GoodsCollect {
    @TableId(type = IdType.AUTO)
    private Long collectId;
    private Long userId;
    private Long goodsId;
    private Date collectTime;
}