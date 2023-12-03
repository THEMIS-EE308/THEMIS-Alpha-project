package com.itmk.web.wx_user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.wx_user.entity.*;
import com.itmk.web.wx_user.service.WxUserService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/wxUser")
public class WxUserController {
    @Autowired
    private WxUserService wxUserService;

    //注册
    @PostMapping("/register")
    public ResultVo register(@RequestBody WxUser user){
        //判断账户是否被占用
        QueryWrapper<WxUser> query = new QueryWrapper<>();
        query.lambda().eq(WxUser::getUsername,user.getUsername());
        //查询用户
        WxUser one = wxUserService.getOne(query);
        if(one != null){
            return ResultUtils.error("用户名被占用!");
        }
        //密码加密
        user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        //存到数据库
        if(wxUserService.saveOrUpdate(user)){
            return ResultUtils.success("注册成功！");
        }
        return ResultUtils.error("注册失败!");
    }

    //登录
    @PostMapping("/login")
    public ResultVo login(@RequestBody WxUser user){
        //构造查询条件
        QueryWrapper<WxUser> query = new QueryWrapper<>();
        query.lambda().eq(WxUser::getUsername,user.getUsername()).eq(WxUser::getPassword,
                DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        WxUser wxUser = wxUserService.getOne(query);
        if(wxUser != null){
            if(wxUser.getStatus().equals("1")){
                return ResultUtils.error("您的账户被停用，请联系管理员!");
            }
            //返回成功的数据
            LoginVo vo = new LoginVo();
            vo.setNickName(wxUser.getNickName());
            vo.setPhone(wxUser.getPhone());
            vo.setUserId(wxUser.getUserId());
            return ResultUtils.success("登录成功",vo);
        }
        return ResultUtils.error("用户密码或密码错误!");
    }

    //列表
    @GetMapping("/list")
    public ResultVo getList(WxUserParm parm){
        //构造分页对象
        IPage<WxUser> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        //构造查询条件
        QueryWrapper<WxUser> query = new QueryWrapper<>();
        query.lambda().like(StringUtils.isNotEmpty(parm.getPhone()),WxUser::getPhone,parm.getPhone())
        .orderByDesc(WxUser::getUsername);
        IPage<WxUser> list = wxUserService.page(page, query);
        return ResultUtils.success("查询成功",list);
    }

    @PostMapping("/stopUser")
    public ResultVo stopUser(@RequestBody WxUser user){
        UpdateWrapper<WxUser> query = new UpdateWrapper<>();
        query.lambda().set(WxUser::getStatus,user.getStatus())
                .eq(WxUser::getUserId,user.getUserId());
        if(wxUserService.update(query)){
            return ResultUtils.success("设置成功!");
        }
        return ResultUtils.error("设置失败!");
    }

    //重置密码
    @PostMapping("/updatePassword")
    public ResultVo updatePassword(@RequestBody WxUser user){
        //默认重置密码为666666
        String pas = "666666";
        UpdateWrapper<WxUser> query = new UpdateWrapper<>();
        query.lambda().set(WxUser::getPassword,DigestUtils.md5DigestAsHex(pas.getBytes()))
                .eq(WxUser::getUserId,user.getUserId());
        if(wxUserService.update(query)){
            return ResultUtils.success("重置成功!");
        }
        return ResultUtils.error("重置失败!");
    }

    //删除用户
    @DeleteMapping("/{userId}")
    public ResultVo delete(@PathVariable("userId") Long userId){
        if(wxUserService.removeById(userId)){
            return ResultUtils.success("删除成功!");
        }
        return ResultUtils.error("删除失败!");
    }

    //小程序更新密码
    @PostMapping("/wxupdatePassword")
    public ResultVo wxupdatePassword(@RequestBody UpadateParm parm){
        //判断原密码是否正确
        QueryWrapper<WxUser> query = new QueryWrapper<>();
        query.lambda().eq(WxUser::getUserId,parm.getUserId())
                .eq(WxUser::getPassword,DigestUtils.md5DigestAsHex(parm.getOldPassword().getBytes()));
        WxUser one = wxUserService.getOne(query);
        if(one == null){
            return ResultUtils.error("原密码不正确!");
        }
        UpdateWrapper<WxUser> update = new UpdateWrapper<>();
        update.lambda().set(WxUser::getPassword,DigestUtils.md5DigestAsHex(parm.getPassword().getBytes()))
                .eq(WxUser::getUserId,parm.getUserId());
        if(wxUserService.update(update)){
            return ResultUtils.success("密码修改成功!");
        }
        return ResultUtils.error("密码修改失败！");
    }

    //小程序修改信息
    @PostMapping("/editInfo")
    public ResultVo editInfo(@RequestBody WxUser wxUser){
        if(wxUserService.updateById(wxUser)){
            return ResultUtils.success("修改成功!");
        }
        return ResultUtils.error("修改失败!");
    }

    //小程序查询个人信息
    @GetMapping("/getInfo")
    public ResultVo getInfo(Long userId){
        WxUser user = wxUserService.getById(userId);
        return ResultUtils.success("查询成功!",user);
    }

    //忘记密码
    @PostMapping("/forget")
    public ResultVo forget(@RequestBody ForgetParm parm){
        //查询用户是否存在
        QueryWrapper<WxUser> query = new QueryWrapper<>();
        query.lambda().eq(WxUser::getUsername,parm.getUsername())
                .eq(WxUser::getPhone,parm.getPhone());
        WxUser one = wxUserService.getOne(query);
        if(one == null){
            return ResultUtils.error("账户或电话号码不正确!");
        }
        //更新条件
        UpdateWrapper<WxUser> update = new UpdateWrapper<>();
        update.lambda().set(WxUser::getPassword,DigestUtils.md5DigestAsHex(parm.getPassword().getBytes()))
                .eq(WxUser::getUsername,parm.getUsername())
                .eq(WxUser::getPhone,parm.getPhone());
        if(wxUserService.update(update)){
            return ResultUtils.success("重置成功!");
        }
        return ResultUtils.error("修改失败!");
    }

}
