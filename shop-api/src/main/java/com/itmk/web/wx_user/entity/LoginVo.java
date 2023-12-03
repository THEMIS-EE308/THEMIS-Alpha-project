package com.itmk.web.wx_user.entity;

import lombok.Data;


@Data
public class LoginVo {
    private Long userId;
    private String phone;
    private String nickName;
    private String token;
}
