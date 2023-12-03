package com.itmk.web.goods_report.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.goods_report.entity.GoodsReport;
import com.itmk.web.goods_report.entity.ReportParm;
import com.itmk.web.goods_report.entity.ReportVo;
import com.itmk.web.goods_report.mapper.GoodsReportMapper;
import com.itmk.web.goods_report.service.GoodsReportService;
import org.springframework.stereotype.Service;


@Service
public class GoodsReportServiceImpl extends ServiceImpl<GoodsReportMapper, GoodsReport> implements GoodsReportService {
    @Override
    public IPage<ReportVo> getList(ReportParm parm) {
        //构造分页对象
        IPage<ReportVo> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        return this.baseMapper.getList(page);
    }
}
