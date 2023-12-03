package com.itmk.web.goods_collect.entity;

import lombok.Data;


@Data
public class CollectParm {
    private Long userId;
    private Long currentPage;
    private Long pageSize;
}
