package com.itmk.web.goods.entity;

import lombok.Data;


@Data
public class MyGoodsParm {
    //用户id
    private Long userId;
    //类型 0：闲置 1：求购
    private String type;
    private Long currentPage;
    private Long pageSize;
}