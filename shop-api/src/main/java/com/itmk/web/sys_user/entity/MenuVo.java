package com.itmk.web.sys_user.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
@AllArgsConstructor
public class MenuVo {
    private Long menuId;
    private String title;
    private String path;
    private String icon;
}