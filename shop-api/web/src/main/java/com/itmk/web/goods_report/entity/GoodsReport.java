package com.itmk.web.goods_report.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;


@Data
@TableName("goods_report")
public class GoodsReport {
    @TableId(type = IdType.AUTO)
    private Long reportId;
    private Long goodsId;
    private Long reportUser;
    private String reason;
    @TableField(exist = false)
    private String goodsName;
    private String status;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone="GMT+8")
    private Date reportTime;
}
