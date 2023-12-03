package com.itmk.web.goods.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.itmk.config.Constant;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.goods.entity.*;
import com.itmk.web.goods.mapper.GoodsMapper;
import com.itmk.web.goods.service.GoodsService;
import com.itmk.web.goods_evaluate.entity.GoodsEvaluate;
import com.itmk.web.goods_evaluate.mapper.GoodsEvaluateMapper;
import com.itmk.web.wx_user.mapper.WxUserMapper;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api/goods")
public class GoodsController {

    @Resource
    private GoodsService goodsService;

    @Resource
    private GoodsMapper goodsMapper;

    @Resource
    private GoodsEvaluateMapper goodsEvaluateMapper;

    @Resource
    private WxUserMapper wxUserMapper;

    //发布
    @PostMapping("/release")
    public ResultVo release(@RequestBody Goods goods) {
        //设置时间
        goods.setCreateTime(new Date());
        if (goodsService.save(goods)) {
            return ResultUtils.success("发布成功!");
        }
        return ResultUtils.error("发布失败!");
    }

    //列表
    @GetMapping("/list")
    public ResultVo getList(GoodsListParm parm) {
        //构造分页对象
        IPage<Goods> page = new Page<>(parm.getCurrentPage(), parm.getPageSize());
        //构造查询条件
        QueryWrapper<Goods> query = new QueryWrapper<>();
        query.lambda().like(StringUtils.isNotEmpty(parm.getGoodsName()), Goods::getGoodsName, parm.getGoodsName())
                .eq(Goods::getDeleteStatus, "0")
                .eq(Goods::getSellStatus, Constant.SellStatus.NOT_SELL)
                .orderByDesc(Goods::getCreateTime);
        IPage<Goods> list = goodsService.page(page, query);
        return ResultUtils.success("查询成功", list);
    }

    // 上架下架
    @PostMapping("/upanddown")
    public ResultVo upanddown(@RequestBody UpandDownParm param) {
        if (param == null || param.getGoodsId() == null) {
            return ResultUtils.error("上下架失败!");
        }
        Goods goods = goodsMapper.selectById(param.getGoodsId());
        if (goods == null) {
            return ResultUtils.error("上下架失败!");
        }
        if (Constant.SellStatus.SELL.equals(goods.getSellStatus())) {
            return ResultUtils.error("物品处于交易中，无法上下架!");
        }
        UpdateWrapper<Goods> query = new UpdateWrapper<>();
        query.lambda().set(Goods::getStatus, param.getStatus())
                .eq(Goods::getGoodsId, param.getGoodsId());
        if (goodsService.update(query)) {
            return ResultUtils.success("设置成功!");
        }
        return ResultUtils.error("设置失败!");
    }

    // 推荐首页
    @PostMapping("/setIndex")
    public ResultVo setIndex(@RequestBody UpandDownParm parm) {
        UpdateWrapper<Goods> query = new UpdateWrapper<>();
        query.lambda().set(Goods::getSetIndex, parm.getSetIndex())
                .eq(Goods::getGoodsId, parm.getGoodsId());
        if (goodsService.update(query)) {
            return ResultUtils.success("设置成功!");
        }
        return ResultUtils.error("设置失败!");
    }

    //删除
    @PostMapping("/delete")
    public ResultVo delete(@RequestBody UpandDownParm parm) {
        if (parm == null || parm.getGoodsId() == null) {
            return ResultUtils.error("删除失败!");
        }
        Goods goods = goodsMapper.selectById(parm.getGoodsId());
        if (goods == null) {
            return ResultUtils.error("删除失败!");
        }
        if (Constant.SellStatus.SELL.equals(goods.getSellStatus())) {
            return ResultUtils.error("物品处于交易中，无法删除!");
        }
        UpdateWrapper<Goods> query = new UpdateWrapper<>();
        query.lambda().set(Goods::getDeleteStatus, "1")
                .eq(Goods::getGoodsId, parm.getGoodsId());
        if (goodsService.update(query)) {
            return ResultUtils.success("删除成功!");
        }
        return ResultUtils.error("删除失败!");
    }

    //小程序首页列表查询
    @GetMapping("/getIndexList")
    public ResultVo getIndexList(WxIndexParm parm) {
        //构造查询条件
        QueryWrapper<Goods> query = new QueryWrapper<>();
        query.lambda().like(StringUtils.isNotEmpty(parm.getKeywords()), Goods::getGoodsName, parm.getKeywords())
                .eq(Goods::getStatus, "0")
                .eq(Goods::getDeleteStatus, "0")
                .eq(Goods::getSetIndex, "1")
                .eq(Goods::getSellStatus, "0")
                .orderByDesc(Goods::getCreateTime);
        //构造分页对象
        IPage<Goods> page = new Page<>(parm.getCurrentPage(), parm.getPageSize());
        IPage<Goods> list = goodsService.page(page, query);
        return ResultUtils.success("查询成功", list);
    }

    //小程序闲置列表查询
    @GetMapping("/getUsedList")
    public ResultVo getUsedList(WxIndexParm parm) {
        //构造查询条件
        QueryWrapper<Goods> query = new QueryWrapper<>();
        query.lambda().like(StringUtils.isNotEmpty(parm.getKeywords()), Goods::getGoodsName, parm.getKeywords())
                .eq(Goods::getStatus, "0")
                .eq(Goods::getDeleteStatus, "0")
                .eq(Goods::getType, "0")
                .eq(Goods::getSellStatus, Constant.SellStatus.NOT_SELL)
                .eq(StringUtils.isNotEmpty(parm.getCategoryId()), Goods::getCategoryId, parm.getCategoryId())
                .orderByDesc(Goods::getCreateTime);
        //构造分页对象
        IPage<Goods> page = new Page<>(parm.getCurrentPage(), parm.getPageSize());
        IPage<Goods> list = goodsService.page(page, query);
        return ResultUtils.success("查询成功", list);
    }

    //小程序求购列表查询
    @GetMapping("/getBuyList")
    public ResultVo getBuyList(WxIndexParm parm) {
        //构造查询条件
        QueryWrapper<Goods> query = new QueryWrapper<>();
        query.lambda().like(StringUtils.isNotEmpty(parm.getKeywords()), Goods::getGoodsName, parm.getKeywords())
                .eq(Goods::getStatus, "0")
                .eq(Goods::getDeleteStatus, "0")
                .eq(Goods::getType, "1")
                .eq(Goods::getSellStatus, "0")
                .eq(StringUtils.isNotEmpty(parm.getCategoryId()), Goods::getCategoryId, parm.getCategoryId())
                .orderByDesc(Goods::getCreateTime);
        //构造分页对象
        IPage<Goods> page = new Page<>(parm.getCurrentPage(), parm.getPageSize());
        IPage<Goods> list = goodsService.page(page, query);
        return ResultUtils.success("查询成功", list);
    }

    //小程序我发布的闲置
    @GetMapping("/getMyUnusedList")
    public ResultVo getMyUnusedList(MyGoodsParm parm) {
        //构造查询条件
        QueryWrapper<Goods> query = new QueryWrapper<>();
        query.lambda().eq(Goods::getUserId, parm.getUserId())
                .eq(Goods::getType, parm.getType())
                .eq(Goods::getDeleteStatus, "0");
        //构造分页对象
        IPage<Goods> page = new Page<>(parm.getCurrentPage(), parm.getPageSize());
        IPage<Goods> list = goodsService.page(page, query);
        return ResultUtils.success("查询成", list);
    }

    //编辑
    @PostMapping("/edit")
    public ResultVo edit(@RequestBody Goods goods) {
        if (goods == null || goods.getGoodsId() == null) {
            return ResultUtils.error("删除失败!");
        }
        goods = goodsMapper.selectById(goods.getGoodsId());
        if (goods == null) {
            return ResultUtils.error("删除失败!");
        }
        if (Constant.SellStatus.SELL.equals(goods.getSellStatus())) {
            return ResultUtils.error("物品处于交易中，无法编辑!");
        }
        if (goodsService.updateById(goods)) {
            return ResultUtils.success("编辑成功！");
        }
        return ResultUtils.error("编辑失败!");
    }

    /**
     * 获取所有评论
     */
    @GetMapping("/evaluateList/{goodsId}")
    public ResultVo evaluateList(@PathVariable("goodsId") Long goodsId) {
        if (goodsId == null) {
            return ResultUtils.error("获取评论失败!");
        }
        Goods goods = goodsMapper.selectById(goodsId);
        if (goods == null) {
            return ResultUtils.error("获取评论失败!");
        }
        List<GoodsEvaluate> goodsEvaluates
                = goodsEvaluateMapper.selectList(new QueryWrapper<GoodsEvaluate>().eq("goods_id", goodsId));
        for (GoodsEvaluate goodsEvaluate : goodsEvaluates) {
            try {
                goodsEvaluate.setUserName(wxUserMapper.selectById(goodsEvaluate.getUserId()).getName());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return ResultUtils.success("查询成功", goodsEvaluates);
    }

    /**
     * 评论
     */
    @PostMapping("/evaluate")
    public ResultVo evaluate(@RequestBody EvaluateParam param) {
        if (param == null
                || param.userId == null
                || param.goodsId == null
                || StringUtils.isEmpty(param.content)) {
            return ResultUtils.error("评论失败!");
        }

        GoodsEvaluate goodsEvaluate = new GoodsEvaluate();
        goodsEvaluate.setUserId(param.userId);
        goodsEvaluate.setGoodsId(param.goodsId);
        goodsEvaluate.setContent(param.content);
        goodsEvaluate.setCreateTime(new Date());
        goodsEvaluateMapper.insert(goodsEvaluate);
        return ResultUtils.success("评论成功");
    }

    /**
     * 评论
     */
    @PostMapping("/deleteEvaluate/{evaluateId}")
    public ResultVo deleteEvaluate(@PathVariable("evaluateId") Long evaluateId) {
        if (evaluateId == null) {
            return ResultUtils.error("删除失败!");
        }
        goodsEvaluateMapper.deleteById(evaluateId);
        return ResultUtils.success("删除成功！");
    }

}
