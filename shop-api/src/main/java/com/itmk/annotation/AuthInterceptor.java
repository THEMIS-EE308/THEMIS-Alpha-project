package com.itmk.annotation;

import com.itmk.exception.BusinessException;
import com.itmk.jwt.JwtUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Auth annotation = null;
        if(handler instanceof HandlerMethod){
            //获取被Auth注解标识的方法
            annotation = ((HandlerMethod) handler).getMethodAnnotation(Auth.class);
        }
        //说明没有被@Auth注解标识：不需要做token验证
        if(annotation == null){
            return true;
        }
        //获取token
        String token = request.getHeader("token");
        if(StringUtils.isEmpty(token)){
            token = request.getParameter("token");
        }
        if(StringUtils.isEmpty(token)){
            throw new BusinessException(600,"token不能为空!");
        }
        //验证token
        jwtUtils.jwtDecode(token);
        return true;
    }
}
