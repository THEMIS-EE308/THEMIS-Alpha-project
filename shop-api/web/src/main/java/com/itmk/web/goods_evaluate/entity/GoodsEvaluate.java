package com.itmk.web.goods_evaluate.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;


@Data
@TableName("goods_evaluate")
public class GoodsEvaluate {

    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private Long goodsId;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone="GMT+8")
    private Date createTime;

    @TableField(exist = false)
    private String userName;
}
