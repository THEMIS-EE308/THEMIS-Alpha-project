package com.itmk.web.sys_user.entity;

import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class PageParm {
    private Long currentPage;
    private Long pageSize;
    private String nickName;
}
