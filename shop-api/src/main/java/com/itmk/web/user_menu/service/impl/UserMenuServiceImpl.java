package com.itmk.web.user_menu.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.sys_user.entity.AssignParm;
import com.itmk.web.user_menu.entity.UserMenu;
import com.itmk.web.user_menu.mapper.UserMenuMapper;
import com.itmk.web.user_menu.service.UserMenuService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserMenuServiceImpl extends ServiceImpl<UserMenuMapper, UserMenu> implements UserMenuService {

    @Override
    @Transactional
    public void saveMenu(AssignParm parm) {
        //先删除，再插入
        //1、删除
        QueryWrapper<UserMenu> query = new QueryWrapper<>();
        query.lambda().eq(UserMenu::getUserId,parm.getAssId());
        this.baseMapper.delete(query);
        //2、删除成功，再插入
        this.baseMapper.saveMenu(parm.getAssId(),parm.getList());
    }
}
