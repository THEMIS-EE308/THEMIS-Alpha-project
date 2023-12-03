package com.itmk.exception;

import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 自定义异常处理器
     * @return
     */
    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    public ResultVo bussinessexception(BusinessException e){
        return ResultUtils.error(e.getMessage(),e.getCode(),e.getMessage());
    }

    /**
     * 运行时未知异常处理器
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResultVo notFount(RuntimeException e){
        return ResultUtils.error(e.getMessage(),BusinessExceptionEnum.SERVER_ERROR.getCode()
        ,BusinessExceptionEnum.SERVER_ERROR.getMessage());
    }

}
