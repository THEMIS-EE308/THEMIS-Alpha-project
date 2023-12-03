package com.itmk.web.sys_menu.congtroller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.itmk.annotation.Auth;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.sys_menu.entity.MakeMenuTree;
import com.itmk.web.sys_menu.entity.SysMenu;
import com.itmk.web.sys_menu.service.SysMenuService;
import com.itmk.web.sys_user.entity.AssignParm;
import com.itmk.web.sys_user.entity.PermissonVo;
import com.itmk.web.sys_user.entity.SysUser;
import com.itmk.web.sys_user.service.SysUserService;
import com.itmk.web.user_menu.service.UserMenuService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/menu")
public class SysMenuController {
    @Autowired
    private SysMenuService sysMenuService;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private UserMenuService userMenuService;

    //新增
    @Auth
    @PostMapping
    public ResultVo add(@RequestBody SysMenu sysMenu){
        sysMenu.setCreateTime(new Date());
        if(sysMenuService.save(sysMenu)){
            return ResultUtils.success("新增成功!");
        }
        return ResultUtils.error("新增失败!");
    }

     //编辑
    @Auth
    @PutMapping
    public ResultVo edit(@RequestBody SysMenu sysMenu){
        if(sysMenuService.updateById(sysMenu)){
            return ResultUtils.success("编辑成功!");
        }
        return ResultUtils.error("编辑失败!");
    }

      //删除
    @Auth
    @DeleteMapping("/{menuId}")
    public ResultVo edit(@PathVariable("menuId") Long menuId){
        if(sysMenuService.removeById(menuId)){
            return ResultUtils.success("删除成功!");
        }
        return ResultUtils.error("删除失败!");
    }

    //列表
    @GetMapping("/list")
    @Auth
    public ResultVo list(){
        QueryWrapper<SysMenu> query = new QueryWrapper<>();
        query.lambda().orderByAsc(SysMenu::getOrderNum);
        List<SysMenu> menuList = sysMenuService.list(query);
        //组装树数据
        List<SysMenu> list = MakeMenuTree.makeTree(menuList, 0L);
        return ResultUtils.success("查询成功!",list);
    }

     //查询上级菜单
    @GetMapping("/getParent")
    @Auth
    public ResultVo getParent(){
        List<SysMenu> list = sysMenuService.getParnet();
        return ResultUtils.success("查询成功!",list);
    }

    //分配菜单树数据查询和回显
    @GetMapping("/getAssignTree")
    @Auth
    public ResultVo getAssignTree(Long userId,Long assId){
        //查询当前用户的信息
        SysUser user = sysUserService.getById(userId);
        //查询菜单信息
        List<SysMenu> menuList = null;
        //判断用户是否是超级管理员，超级管理员拥有所有的权限
        if(StringUtils.isNotEmpty(user.getIsAdmin()) && "1".equals(user.getIsAdmin())){
             menuList = sysMenuService.list();
        }else{
            //根据用户id查询
            menuList = sysMenuService.getMenuByUserId(userId);
        }
        //组装树数据
        List<SysMenu> menus = MakeMenuTree.makeTree(menuList, 0L);
        //设置菜单数据
        PermissonVo vo = new PermissonVo();
        vo.setMenuList(menus);
        //查询回显的数据
        List<SysMenu> menuByUserId = sysMenuService.getMenuByUserId(assId);
        List<Long> ids = new ArrayList<>();
        Optional.ofNullable(menuByUserId).orElse(new ArrayList<>())
                .stream()
                .filter(item -> item != null)
                .forEach(item ->{
                    ids.add(item.getMenuId());
                });
        vo.setCheckList(ids.toArray());
        return ResultUtils.success("查询成功！",vo);
    }

    //保存菜单
    @Auth
    @PostMapping("/assignSave")
    public ResultVo assignSave(@RequestBody AssignParm parm){
        //判断如果是超级管理员，不用分配
        SysUser user = sysUserService.getById(parm.getAssId());
        if(StringUtils.isNotEmpty(user.getIsAdmin()) && "1".equals(user.getIsAdmin())){
            return ResultUtils.error("不能为超级管理员分配菜单!");
        }
        userMenuService.saveMenu(parm);
        return ResultUtils.success("分配成功!");
    }

}
