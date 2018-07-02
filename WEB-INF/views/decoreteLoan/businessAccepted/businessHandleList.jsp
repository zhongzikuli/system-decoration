<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <div id="hiddenForm">
            <input type="hidden" name="orderStatus" value="${orderStatus}"/>
            <input type="hidden" name="startDate" value="${startDate}"/>
            <input type="hidden" name="endDate" value="${endDate}"/>
            <input type="hidden" name="businessHandleStartDate" value="${businessHandleStartDate}"/>
            <input type="hidden" name="businessHandleEndDate" value="${businessHandleEndDate}"/>
            <input type="hidden" name="keyword" value="${keyword}"/>
        </div>
        <form id="pagerForm" action="${ctx}/dlBusinessHandle/query.action" method="post" style="margin:0;">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-2">
                    <shiro:hasPermission name="business:changeAudit">
                        <a data-toggle="modal" class="btn btn-primary btn-sm add-btn" id="bankHandleChangeAudit">换审核</a>
                    </shiro:hasPermission>
                    <a data-toggle="modal" class="btn btn-success btn-sm add-btn" id="bankHandleChangeresult">刷新</a>
                </div>
                <div class="col-sm-10 text-right">
                    <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                    <div class="btn-box animated fadeInRight">
                        <div class="row">
                            <div class="col-sm-7">
                                <div class="form-group">
                                    <label class="control-label col-xs-4">申请贷款时间:</label>
                                    <div class="col-xs-8">
                                        <div class="input-group">
                                            <input type="text" class="form-control w-120" name="startDate"
                                                   id="startDate" value="${startDate}"/>
                                            <span class="input-group-addon">到</span>
                                            <input type="text" class="form-control w-120" name="endDate"
                                                   id="endDate" value="${endDate}"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label col-xs-4">业务受理时间:</label>
                                    <div class="col-xs-8">
                                        <div class="input-group">
                                            <input type="text" class="form-control w-120" name="businessHandleStartDate"
                                                   id="businessHandleStartDate" value="${businessHandleStartDate}"/>
                                            <span class="input-group-addon">到</span>
                                            <input type="text" class="form-control w-120" name="businessHandleEndDate"
                                                   id="businessHandleEndDate" value="${businessHandleEndDate}"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-5">

                                <div class="form-group">
                                    <label class="control-label col-xs-3">业务受理:</label>
                                    <div class="col-xs-8">
                                        <select id="orderStatus" name="orderStatus"
                                                                  class="form-control chosen-select">
                                            <option value="">未受理</option>
                                            <c:choose>
                                                <c:when test="${orderStatus == '1'}">
                                                    <option value="0">全部</option>
                                                    <option value="1" selected>已受理</option>
                                                </c:when>
                                                <c:when test="${orderStatus == '0'}">
                                                    <option value="0" selected>全部</option>
                                                    <option value="1">已受理</option>
                                                </c:when>
                                                <c:otherwise>
                                                    <option value="0">全部</option>
                                                    <option value="1">已受理</option>
                                                </c:otherwise>
                                            </c:choose>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-xs-3">快捷搜索:</label>
                                    <div class="col-xs-8">
                                        <input type="text" name="keyword" class="form-control"
                                           id="keyword" value="${keyword}" placeholder="客户名、客户身份证号、订单编号"/>
                                    </div>
                                </div>
                                <div class="form-group group-btn">
                                    <button type="button" class="btn btn-primary btn-sm search-btn"
                                            onclick="searchSubmit()">
                                        搜索
                                    </button>
                                    <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
                                </div>
                            </div>
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
                        <th style="width: 2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:3%;">序号</th>
                        <th style="width:5%;">占位</th>
                        <th style="width:10%;">订单编号</th>
                        <th style="width:10%;">客户名称</th>
                        <th style="width:10%;">客户身份证号</th>
                        <th style="width:10%;">部门</th>
                        <th style="width:10%;">贷款银行</th>
                        <th style="width:5%;">订单状态</th>
                        <th style="width:10%;">业务受理时间</th>
                        <th style="width:10%;">申请贷款时间</th>
                        <th style="width:15%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="12">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="bankHandleInput" value="${item.id}"
                                       data-handle-status="${item.orderStatus}"></td>
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td class="cel used">
                                <c:if test="${not empty item.operationingLoginName}"><code>${item.operationingLoginName}</code></c:if>
                            </td>
                            <td>${item.orderNo}</td>
                            <td>${item.realName}</td>
                            <td>${item.cardNo}</td>
                            <td>${item.departmentName}</td>
                            <td>${item.bankName}</td>
                            <td class="cel"><sl:OrderStatus showValue="${item.orderStatus}"/></td>
                            <td>
                                <fmt:formatDate value="${item.businessHandleTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td>
                                <fmt:formatDate value="${item.applyLoanTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="btn-cel">
                                <shiro:hasPermission name="business:handle">
                                    <c:if test="${item.orderStatus == 1 }">
                                        <a href="#" class="btn btn-primary btn-xs businessHandleBtn"
                                           data-id="${item.id}" data-realName="${item.realName}">
                                            <i class="fa fa-edit"></i>业务受理</a>
                                    </c:if>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="business:detail">
                                    <a href="#" class="btn btn-info btn-xs detail"
                                       data-id="${item.id}" data-title="${item.realName}"
                                       data-href="${ctx}/dlBusinessHandle/detail.action?id=${item.id}">
                                        <i class="fa fa-search-plus"></i>查看</a>
                                </shiro:hasPermission>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    <%@include file="/WEB-INF/views/include/page-bar.jsp" %>
</div>
<!-- 分页条 -->

</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/businessAccepted/businessHandleList.js"></script>
</html>
