package com.itmk.config;

public class Constant {

    public interface SellStatus {

        String SELL = "1";

        String NOT_SELL = "0";
    }

    public interface OrderStatus {
        // 已下单
        String ORDERING = "0";
        // 已支付
        String PAYED = "1";
        // 已发货
        String ON_WAY = "2";
        // 确认收货
        String CONFIRM = "3";
        // 已归还
        String COMMENT = "4";
        // 已退款
        String RETURN_BACK = "5";
    }

}
