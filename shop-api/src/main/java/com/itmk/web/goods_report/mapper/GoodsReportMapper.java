package com.itmk.web.goods_report.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.itmk.web.goods_report.entity.GoodsReport;
import com.itmk.web.goods_report.entity.ReportVo;


public interface GoodsReportMapper extends BaseMapper<GoodsReport> {
    IPage<ReportVo> getList(IPage<ReportVo> page);
}
