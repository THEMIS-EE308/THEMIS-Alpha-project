package com.itmk.web.goods.entity;

import lombok.Data;

@Data
public class WxIndexParm {
    private Long currentPage;
    private Long pageSize;
    private String categoryId;
    private String keywords;
}
