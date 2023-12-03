package com.itmk.web.home.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.itmk.annotation.Auth;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.goods.entity.Goods;
import com.itmk.web.goods.service.GoodsService;
import com.itmk.web.goods_report.entity.GoodsReport;
import com.itmk.web.goods_report.service.GoodsReportService;
import com.itmk.web.home.entity.TotalVo;
import com.itmk.web.wx_user.service.WxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequestMapping("/api/home")
@RestController
public class HomeController {
    @Autowired
    private GoodsReportService goodsReportService;
    @Autowired
    private WxUserService wxUserService;
    @Autowired
    private GoodsService goodsService;

    @Auth
    @GetMapping("/getTotal")
    public ResultVo getTotal() {
        TotalVo vo = new TotalVo();
        //查询待处理数量
        QueryWrapper<GoodsReport> query = new QueryWrapper<>();
        query.lambda().eq(GoodsReport::getStatus, "0");
        int doTotal = goodsReportService.count(query);
        vo.setDoTotal(doTotal);
        //会员总数
        int userCount = wxUserService.count();
        vo.setUserTotal(userCount);
        //闲置总数
        QueryWrapper<Goods> uquery = new QueryWrapper<>();
        uquery.lambda().eq(Goods::getImage, "0");
        int uncount = goodsService.count(uquery);
        vo.setUnusedTotal(uncount);
        //求购总数
        QueryWrapper<Goods> buyquery = new QueryWrapper<>();
        uquery.lambda().eq(Goods::getImage, "1");
        int buycount = goodsService.count(buyquery);
        vo.setBuyTotal(buycount);
        return ResultUtils.success("查询成功", vo);
    }

    //查询投诉列表
    @Auth
    @GetMapping("/getDoReport")
    public ResultVo getDoReport() {
        QueryWrapper<GoodsReport> query = new QueryWrapper<>();
        query.lambda().eq(GoodsReport::getStatus, "0")
                .orderByDesc(GoodsReport::getReportTime)
                .last(" limit 8");
        List<GoodsReport> list = goodsReportService.list(query);
        if(list.size() >0){
            for (int i=0;i<list.size();i++){
                Goods goods = goodsService.getById(list.get(i).getGoodsId());
                list.get(i).setGoodsName(goods.getGoodsName());
            }
        }
        return ResultUtils.success("查询成功", list);
    }
}
