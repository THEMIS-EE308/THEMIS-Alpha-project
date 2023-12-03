package com.itmk.web.sys_menu.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.sys_menu.entity.SysMenu;
import java.util.List;


public interface SysMenuService extends IService<SysMenu> {
    List<SysMenu> getParnet();
    //根据用户id查询菜单
    List<SysMenu> getMenuByUserId(Long userId);
}
