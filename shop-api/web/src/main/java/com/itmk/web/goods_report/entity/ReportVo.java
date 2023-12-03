package com.itmk.web.goods_report.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;


@Data
public class ReportVo {
    private Long reportId;
    private String reason;
    private String goodsName;
    private String image;
    private String status;
    private String nickName;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone="GMT+8")
    private Date reportTime;
}
