<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
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
        <input type="hidden" name="startTime" value="${paramMap.startTime}"/>
        <input type="hidden" name="endTime" value="${paramMap.endTime}"/>
        <input type="hidden" name="acceptId" value="${paramMap.acceptId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/orderTrack/query.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <input type="hidden" name="acceptId" value="${paramMap.acceptId}"/>
        <div class="row">
            <div class="col-sm-1">
                <a data-toggle="modal" class="btn btn-success btn-sm refresh-btn">刷新</a>
            </div>
            <div class="col-sm-11 text-right">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">更新时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="startTime"
                                   id="orderTrack-start-time" value="${paramMap.startTime}"/>
                            <span class="input-group-addon">-</span>
                            <input type="text" class="form-control" name="endTime"
                                   id="orderTrack-end-time" value="${paramMap.endTime}"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary btn-sm search-btn" onclick="searchSubmit()">
                            搜索
                        </button>
                        <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
                    </div>
                </div>
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
                    <th style="width:3%;">序号</th>
                    <th style="width:25%;">操作类型</th>
                    <th style="width:10%;">更新时间</th>
                    <th style="width:10%;">操作人</th>
                    <th style="width:35%;">操作意见</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="5">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td>${item.operatorType}</td>
                        <td>
                            <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm"/>
                        </td>
                        <td>${item.operatorPerson}</td>
                        <td>${item.remark}</td>
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
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/orderTrack/orderTrackList.js"></script>
</html>
