package com.itmk.web.sys_banner.entity;

import lombok.Data;



@Data
public class BannerParm {
    private Long currentPage;
    private Long pageSize;
    private String title;
}
