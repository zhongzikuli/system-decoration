<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>控制台</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <div id="hiddenForm">
            <input type="hidden" name="bankId" value="${bankId}"/>
            <input type="hidden" name="startDate" value="${startDate}"/>
            <input type="hidden" name="endDate" value="${endDate}"/>
            <input type="hidden" name="depId" value="${depId}"/>
            <input type="hidden" name="keyword" value="${keyword}"/>
            <input type="hidden" name="orderStatus" value="${orderStatus}"/>
        </div>
        <form id="pagerForm" action="${ctx}/dlConsole/query.action" method="post" style="margin:0;">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-12 text-right">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label label">银行:</label>
                            <select name="bankId" id="bankId" class="form-control type status">
                                <option value="">请选择</option>
                                <c:forEach items="${banks}" var="bank">
                                    <option value="${bank.id}"
                                            <c:if test="${bank.id eq bankId}">selected</c:if>
                                    >${bank.bankName}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <c:if test="${userLevel  <=  3 }">
                            <div class="form-group">
                                <label class="control-label label">部门:</label>
                                <select name="depId" id="depId" class="form-control type status">
                                    <option value="">请选择</option>
                                    <c:forEach items="${departments}" var="department">
                                        <option value="${department.id}"
                                                <c:if test="${department.id eq depId}">selected</c:if>
                                        >${department.name}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </c:if>

                        <div class="form-group" id="date-time">
                            <label class="control-label label">申请时间:</label>
                            <div class="input-group">
                                <input type="text" class="form-control w-120" name="startDate" id="startDate"
                                       value="${startDate}"/>
                                <span class="input-group-addon">到</span> <input type="text" class="form-control w-120"
                                                                                name="endDate" id="endDate"
                                                                                value="${endDate}"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label label">订单状态:</label>
                            <select name="orderStatus" id="orderStatus" class="form-control type status">
                                <option value="">请选择</option>
                                <option value="0" <c:if test="${orderStatus eq '0'}">selected</c:if>>申请贷款保存</option>
                                <option value="1" <c:if test="${orderStatus eq '1'}">selected</c:if>>申请贷款</option>
                                <option value="4" <c:if test="${orderStatus eq '4'}">selected</c:if>>业务受理</option>
                                <option value="8" <c:if test="${orderStatus eq '8'}">selected</c:if>>银行受理</option>
                                <option value="12" <c:if test="${orderStatus eq '12'}">selected</c:if>>银行审批</option>
                                <option value="16" <c:if test="${orderStatus eq '16'}">selected</c:if>>一次上门</option>
                                <option value="20" <c:if test="${orderStatus eq '20'}">selected</c:if>>一次放款</option>
                                <option value="24" <c:if test="${orderStatus eq '24'}">selected</c:if>>二次上门</option>
                                <option value="28" <c:if test="${orderStatus eq '28'}">selected</c:if>>二次放款</option>
                                <option value="-1" <c:if test="${orderStatus eq '-1'}">selected</c:if>>申请退回</option>
                                <option value="-2" <c:if test="${orderStatus eq '-2'}">selected</c:if>>退单</option>
                                <option value="-3" <c:if test="${orderStatus eq '-3'}">selected</c:if>>作废</option>
                                <option value="-4" <c:if test="${orderStatus eq '-4'}">selected</c:if>>拒单</option>
                            </select>
                        </div>
                                <div class="form-group">
                                    <label class="control-label label">搜索:</label>
                                    <input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号或订单编号"
                                           name="keyword" value="${keyword}" onkeyup="value=value.replace(/\s/g,'')">

                            <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
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
                        <th style="width:2%;"><input type="checkbox" class="checkAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:8%;">订单编号</th>
                        <th style="width:8%;">客户名称</th>
                        <th style="width:8%;">客户身份证号</th>
                        <th style="width:8%;">客户手机号</th>
                        <th style="width:3%;">贷款额(元)</th>
                        <th style="width:8%;">订单状态</th>
                        <th style="width:8%;">贷款银行</th>
                        <th style="width:8%;">部门</th>
                        <th style="width:8%;">业务经理</th>
                        <th style="width:8%;">申请时间</th>
                        <th style="width:5%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="13">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="bankRate_input" value="${item.id}"></td>
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td>${item.orderNo}</td>
                            <td>${item.realName}</td>
                            <td>${item.cardNo}</td>
                            <td>${item.tel}</td>
                            <td>
                                <fmt:formatNumber type="number" value="${item.loanMoney}"
                                                  pattern="#,##0.00"/></td>
                            </td>
                            <td><sl:OrderStatus showValue="${item.orderStatus}"/></td>
                            <td>${item.bankName}</td>
                            <td>${item.depName}</td>
                            <td>${item.salerName}</td>
                            <td>
                                <fmt:formatDate value="${item.applyLoanTime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td class="btn-cel" style="margin: 0 auto;">
                                <shiro:hasPermission name="orderTrack:query">
                                    <a href="#" class="btn btn-primary btn-xs orderTrack-btn"
                                       data-id="${item.id}" data-no="${item.realName}">
                                        <i class="fa fa-edit"></i>订单轨迹</a>
                                </shiro:hasPermission>
                                <a href="#" class="btn btn-info btn-xs detail"
                                   data-id="${item.id}" data-title="${item.realName}"
                                   data-href="${ctx}/dlBusinessHandle/detail.action?id=${item.id}">
                                    <i class="fa fa-search-plus"></i>查看</a>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <%-- 分页表单参数 --%>
    <%@include file="/WEB-INF/views/include/page-bar.jsp" %>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/console/console.js"></script>
</html>
