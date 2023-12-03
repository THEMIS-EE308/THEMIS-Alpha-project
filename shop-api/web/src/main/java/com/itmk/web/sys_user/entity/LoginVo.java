package com.itmk.web.sys_user.entity;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class LoginVo {
    private Long userId;
    private String nickName;
    private String token;
    private List<MenuVo> menuList = new ArrayList<>();
    private List<String> codeList = new ArrayList<>();
}