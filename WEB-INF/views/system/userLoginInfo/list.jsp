<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <div id="hiddenForm">
            <input type="hidden" name="ipAddress" value="${paramMap.ipAddress}"/>
            <input type="hidden" name="userName" value="${paramMap.userName}"/>
        </div>

        <form id="pagerForm" action="${ctx}/loginInfo/query.action" method="post" style="margin:0;">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-inline">
                        <div class="form-group" id="userLoginInfo_ipAddress">
                            <label class="control-label label">IP:</label>
                            <input type="text" class="form-control" name="ipAddress" id="ipAddress"
                                   value="${paramMap.ipAddress}">
                        </div>
                        <div class="form-group" id="userLoginInfo_userName">
                            <label class="control-label label">用户姓名:</label>
                            <input type="text" class="form-control" name="userName" id="userName"
                                   value="${paramMap.userName}">
                            <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div class="mod_basic">
        <div class="row">
            <div class="col-sm-12">
                <div class="table-responsive">
                    <table class="table table-hover table-striped">
                        <thead>
                        <tr>
                            <th style="width:10%;">用户姓名</th>
                            <th style="width:8%;">登录时间</th>
                            <th style="width:15%;">IP</th>
                            <th style="width:12%;">设备类型</th>
                            <th style="width:17%;">设备ID</th>
                            <th style="width:7%;">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                            <tr>
                                <td class="col-td" colspan="8">暂无数据</td>
                            </tr>
                        </c:if>
                        <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                            <tr>
                                <td>${item.userName}</td>
                                <td>
                                        <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm "/>
                                <td>${item.ip}</td>
                                <c:if test="${item.type ==1}">
                                    <td id="type_value">pc</td>
                                </c:if>
                                <c:if test="${item.type ==2}">
                                    <td id="type_value">mobile</td>
                                </c:if>
                                <td>${item.devid}</td>
                                <td><a href="#" onclick="detailInfo('${item.userName}',
                                        '${item.ctime}','${item.ip}','${item.type}','${item.devid}')"
                                       class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a></td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
    <!-- 分页条 -->
    <%@include file="/WEB-INF/views/include/page-bar.jsp" %>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/system/userLoginInfo/list.js"></script>
<script type="text/template" title="查看" id="loginInfo-dialog_detail">
    <div class="ibox-content">
        <form id="loginInfo-dialog_detail" class="form-horizontal">
            <div id="loginInfo-dialog" style="margin:10px;">
                <div class="form-group">
                    <label class="col-xs-3 control-label">用户姓名:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="loginInfo_name" id="loginInfo_name"
                               readonly="readonly">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">IP:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="loginInfo_IP" id="loginInfo_IP"
                               readonly="readonly">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">设备类型:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="loginInfo_type" id="loginInfo_type"
                               readonly="readonly">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">设备ID:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="loginInfo_devide" id="loginInfo_devide"
                               readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>
</html>
