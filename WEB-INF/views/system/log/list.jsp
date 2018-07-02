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
    <div class="mod_header">
        <div id="hiddenForm">
            <input type="hidden" name="keyword" value="${keyword}"/>
            <input type="hidden" name="startDate" value="${startDate}"/>
            <input type="hidden" name="endDate" value="${endDate}"/>
        </div>
        <form id="pagerForm" action="${ctx}/sysOperatorLog.action" method="post">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-1">
                    <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                </div>
                <div class="col-sm-11 text-right">
                    <div class="form-inline">
                        <div class="form-group" id="date-time">
                            <label class="control-label label">更新时间:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="startDate"
                                       readonly="readonly" id="sTime" value="${startDate}"/>
                                <span class="input-group-addon">到</span>
                                <input type="text" class="form-control" name="endDate" readonly="readonly"
                                       id="eTime" value="${endDate}"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label label">搜索:</label>
                            <input type="text" class="form-control" name="keyword" id="search-keyword"
                                   placeholder="请输入操作类型或者按钮名" value="${keyword}" style="width:200px;">
                            <button type="button" class="btn btn-sm btn-primary search-btn" onclick="searchSubmit()">搜索
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div class="mod_basic">
        <div class="ibox-content full-height no-padding">
            <div class="table-responsive full-height">
                <table class="table table-hover table-height table-striped table-daily">
                    <thead>
                    <tr>
                        <th style="width: 5%">登录账号</th>
                        <th style="width: 5%">用户姓名</th>
                        <th style="width: 8%">操作按钮名称</th>
                        <th style="width: 8%">操作按钮代码</th>
                        <th style="width: 5%">操作按钮父名称</th>
                        <th style="width: 12%">操作按钮父URL</th>
                        <th style="width: 8%">IP</th>
                        <th style="width: 8%">操作类型</th>
                        <th style="width: 8%">更新时间</th>
                        <th style="width: 1%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="10">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td style="max-width:100px;">${item.loginName}</td>
                            <td style="max-width:100px;"><sl:user userId="${item.creater}"/></td>
                            <td style="max-width:100px;">${item.sysPermissionName}</td>
                            <td style="max-width:150px;">${item.sysPermissionPercode}</td>
                            <td style="max-width:150px;">${item.parentSysPermissonName}</td>
                            <td style="max-width:200px;">${item.parentSysPermissonUrl}</td>
                            <td style="max-width:80px;">${item.ip}</td>
                            <td style="max-width:100px;">${item.type}</td>
                            <td style="max-width:140px;"><sl:format show="${item.ctime}" type="date"
                                                                                pattern="yyyy-MM-dd HH:mm "/></td>
                            <td class="btn-cel">
                                <a title="查看" class="btn btn-info btn-xs detail"
                                   onclick="detail('${item.id}')"><i class="fa fa-search-plus"></i>查看</a>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
    <!-- 分页条 -->
    <%@include file="/WEB-INF/views/include/page-bar.jsp" %>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/log/log.js"></script>
</html>
