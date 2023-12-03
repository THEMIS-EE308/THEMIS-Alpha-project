package com.itmk.web.goods_order.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.itmk.web.goods.entity.Goods;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
@TableName("goods_order")
public class GoodsOrder {
    @TableId(type = IdType.AUTO)
    private Long orderId;
    private Long goodsId;
    private Long sellUserId;

    private Long orderUser;
    private BigDecimal price;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone="GMT+8")
    private Date createTime;
    private String orderUserName;
    private String orderAddress;
    private String orderUserMobie;
    private String orderStatus;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone="GMT+8")
    private Date payTime;
    private String payType;
    private String evaluate;

    @TableField(exist = false)
    private Goods goods;
    private String sendNo;
    private String backNo;
}
