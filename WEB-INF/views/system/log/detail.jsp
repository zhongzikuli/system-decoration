<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>系统日志</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="main-wrapper flex">
<div class="mod_header"></div>
<div class="mod_basic">
    <div class="ibox-content">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-xs-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">登录账号:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" value="${sysOperatorLog.loginName}" readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">操作按钮名称:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" value="${sysOperatorLog.sysPermissionName}"
                                   readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">操作按钮父名称:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" value="${sysOperatorLog.parentSysPermissonName}"
                                   readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">IP:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" value="${sysOperatorLog.ip}" readonly/>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">用户姓名:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control"
                                   value="${sysOperatorLog.realName}"
                                   readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">操作按钮代码:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" value="${sysOperatorLog.sysPermissionPercode}"
                                   readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">操作按钮父URL:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" value="${sysOperatorLog.parentSysPermissonUrl}"
                                   readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">操作类型:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" value="${sysOperatorLog.type}" readonly/>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="col-xs-2 control-label" style="margin-left: -35px;">参数内容:</label>
                        <div class="col-xs-10">
                            <textarea class="form-control" readonly rows="5">${sysOperatorLog.businessObject}</textarea>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="col-xs-2 control-label" style="margin-left: -35px;">URL:</label>
                        <div class="col-xs-10">
                            <textarea class="form-control" readonly rows="3">${sysOperatorLog.url}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</div>
</body>
</html>
