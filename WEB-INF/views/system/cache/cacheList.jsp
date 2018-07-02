<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>缓存管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp"%>
</head>
<body>
<div class="mod_header">
    <form id="pagerForm" action="##" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <a title="刷新所有缓存" class="btn btn-success btn-sm" onclick="refreshCache('')">刷新所有缓存</a>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic">
   <div class="ibox-content full-height no-padding">
            <div class="table-responsive full-height">
                <table class="table table-hover table-height table-striped">
                    <thead>
                    <tr>
                        <th width="130px">缓存名称</th>
                        <th style="width: 130px !important;">操作</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>用户</td>
                        <td><a href="#" onclick="refreshCache('user')"><span class="label label-primary"><i
                                class="fa fa-street-view"></i>刷新用户缓存</span></a></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>角色</td>
                        <td><a href="#" onclick="refreshCache('role')"><span class="label label-info"><i
                                class="fa fa-user-secret"></i>刷新角色缓存</span></a></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>数据字典</td>
                        <td><a href="#" onclick="refreshCache('dict')"><span class="label label-success"><i
                                class="fa fa-share-alt"></i>刷新字典缓存</span></a></td>
                        <td>&nbsp;</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/system/cache/list.js"></script>
</html>
