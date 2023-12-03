package com.itmk.web.sys_user.entity;

import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class UpdatePasswordParm {
    private Long userId;
    private String password;
    private String oldPassword;
}
