<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<title>战报</title>
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
</head>
<body class="grey-bg">
<div class="wrapper-content" data-userlevel="${userLevel}">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5><span class="nav-icon"></span>实时战报</h5>
                </div>
                <div class="ibox-content ibox-content-4" id="record">
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
    <c:if test="${userLevel != 5}">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5><span class="nav-icon"></span>
                            <c:if test="${userLevel == 4}">团队成员战报</c:if>
                            <c:if test="${userLevel != 4 && userLevel != 5}">部门战报</c:if>
                        </h5>
                    </div>

                    <div class="ibox-content">
                        <div class="text-right ibox-search">
                            <form id="pagerForm">
                                <div class="form-inline">
                                    <div class="form-group">
                                        <label>部门：</label>
                                        <input type="text" class="form-control" id="rank-departmentId"
                                               readonly="readonly"
                                               <c:if test="${userLevel != 5}">data-id="${department.id}"
                                               data-value="${department.name}" value="${department.name}"</c:if> />&nbsp;&nbsp;<button
                                            type="button" class="btn btn-sm btn-primary search"> 搜索
                                    </button>
                                        <div id="rank-menuContent" class="menuContent"
                                             style="display: none;position: absolute;right: 78px;padding: 10px;height:300px;">
                                            <ul id="rank-departmentTree" class="ztree"></ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="no-padding min-h-250">
                            <div class="table-responsive" id="result">
                                <table class="table table-hover table-striped table-order table-more">
                                    <thead>
                                    <th style="width: 2%">排名</th>
                                    <c:if test="${userLevel == 4}">
                                        <th style="width: 8%">姓名</th>
                                        <th style="width: 10%">今日贷款额(万元)</th>
                                        <th style="width: 10%">今日业务量(笔)</th>
                                        <th style="width: 10%">本月贷款额(万元)</th>
                                        <th style="width: 10%">本月业务量(笔)</th>
                                    </c:if>
                                    <c:if test="${userLevel != 4 && userLevel != 5}">
                                        <th style="width: 16%">部门名称</th>
                                        <th style="width: 10%">本月贷款额(万元)</th>
                                        <th style="width: 10%">本月业务量(笔)</th>
                                        <th style="width: 10%">今日贷款额(万元)</th>
                                        <th style="width: 10%">今日业务量(笔)</th>
                                    </c:if>
                                    </thead>
                                    <tbody>
                                    <tr class='no-border'>
                                        <td class='text-center' colspan='6'>暂无数据</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div id="pagination" class="pagination"></div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
        </div>
    </c:if>
</div>
</body>

<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/pagination/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/third/other/html5media.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/report/report.js?v=2018061316231"></script>
</html>