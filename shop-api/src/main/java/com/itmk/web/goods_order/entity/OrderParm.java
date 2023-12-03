package com.itmk.web.goods_order.entity;

import lombok.Data;


@Data
public class OrderParm {
    private Long currentPage;
    private Long pageSize;
    private String goodsName;
}
