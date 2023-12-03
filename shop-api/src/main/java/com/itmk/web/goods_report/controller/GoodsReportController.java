package com.itmk.web.goods_report.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.goods_report.entity.GoodsReport;
import com.itmk.web.goods_report.entity.ReportParm;
import com.itmk.web.goods_report.entity.ReportVo;
import com.itmk.web.goods_report.service.GoodsReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;


@RequestMapping("/api/report")
@RestController
public class GoodsReportController {
    @Autowired
    private GoodsReportService goodsReportService;

    //举报
    @PostMapping("/report")
    public ResultVo report(@RequestBody GoodsReport report){
        //判断是否已经举报
        QueryWrapper<GoodsReport> query = new QueryWrapper<>();
        query.lambda().eq(GoodsReport::getGoodsId,report.getGoodsId())
                .eq(GoodsReport::getReportUser,report.getReportUser());
        GoodsReport one = goodsReportService.getOne(query);
        if(one != null){
            return ResultUtils.error("您已经举报，不用重复举报!");
        }
        report.setReportTime(new Date());
        if(goodsReportService.save(report)){
            return ResultUtils.success("举报成功!");
        }
        return ResultUtils.error("举报失败!");
    }

    //查询是否已经举报
    @GetMapping("/hasReport")
    public ResultVo hasReport(Long userId,Long goodsId){
        QueryWrapper<GoodsReport> query = new QueryWrapper<>();
        query.lambda().eq(GoodsReport::getGoodsId,goodsId)
                .eq(GoodsReport::getReportUser,userId);
        GoodsReport one = goodsReportService.getOne(query);
        if(one != null){ //已经举报
            return ResultUtils.success("查询成功","1");
        }else{
            return ResultUtils.success("查询成功","0");
        }
    }

    //查询列表
    @GetMapping("/getList")
    public ResultVo getList(ReportParm parm){
        IPage<ReportVo> list = goodsReportService.getList(parm);
        return ResultUtils.success("查询成功",list);
    }

    //处理举报内容
    @PostMapping("/doReport")
    public ResultVo doReport(@RequestBody GoodsReport report){
        UpdateWrapper<GoodsReport> update = new UpdateWrapper<>();
        update.lambda().set(GoodsReport::getStatus,"1")
                .eq(GoodsReport::getReportId,report.getReportId());
        if(goodsReportService.update(update)){
            return ResultUtils.success("处理成功!");
        }
        return ResultUtils.error("处理失败!");
    }

}
