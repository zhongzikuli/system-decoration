<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>申请贷款</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="main-wrapper flex">
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${paramMap.bankId}"/>
        <input type="hidden" name="orderNumber" value="${paramMap.orderNumber}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="orderStatus" value="${paramMap.orderStatus}">
    </div>
    <form id="pagerForm" action="${ctx}/applyLoan/query.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <div class="form-inline">
                    <shiro:hasPermission name="applyLoan:add">
                        <a data-toggle="modal" class="btn btn-primary btn-sm createApplyLoan">新增</a>
                    </shiro:hasPermission>
                    <a data-toggle="modal" class="btn btn-success btn-sm refresh">刷新</a>
                </div>
            </div>

            <div class="col-sm-10 text-right">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="control-label label">订单状态:</label>
                        <select class="form-control chosen-select" id="search-orderStatus" name="orderStatus">
                            <option value="">请选择</option>
                            <option value="0" <c:if test="${paramMap.orderStatus == 0}"> selected="selected"</c:if> >未申请</option>
                            <option value="1" <c:if test="${paramMap.orderStatus == 1}"> selected="selected"</c:if> >已申请</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">贷款银行:</label>
                        <select name="bankId" id="search-bank"  class="form-control type chosen-select">
                            <option value="">请选择</option>
                            <c:forEach items="${banks}" var="bank" >
                                <option value="${bank.id}"
                                        <c:if test="${bank.id eq paramMap.bankId}">selected</c:if>
                                >${bank.bankName}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group" id="date-time">
                        <label class="control-label">申请贷款时间:</label>
                        <div class="input-group">
                            <input type="text" class="form-control w-120" name="startDate" id="search-start-date" value="${paramMap.startDate}" />
                            <span class="input-group-addon">到</span>
                            <input type="text" class="form-control w-120" name="endDate" id="search-end-date" value="${paramMap.endDate}" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label label">快捷搜索:</label>
                        <input id="search-keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号或订单编号" name="keyword" value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
                    </div>
                    <div class="form-group">
                        <div class="form-group group-btn">
                            <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
                            <a type="button" class="btn btn-info  btn-sm reset-btn">重置</a>
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
                    <th style="width:2%;">序号</th>
                    <th style="width:8%;">订单编号</th>
                    <th style="width:5%;">客户名称</th>
                    <th style="width:8%;">客户身份证号</th>
                    <th style="width:8%;">客户手机号</th>
                    <th style="width:5%;">订单状态</th>
                    <th style="width:5%;">房产面积(m²)</th>
                    <th style="width:8%;">房产地址</th>
                    <th style="width:8%;">房屋价值(元)</th>
                    <th style="width:8%;">业务经理</th>
                    <th style="width:8%;">部门</th>
                    <th style="width:8%;">申请贷款时间</th>
                    <th style="width:8%;">退回时间</th>
                    <th style="width:8%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                <tr>
                    <td class="col-td" colspan="21">暂无数据</td>
                </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                <tr>
                    <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                    <td>${item.orderNo}</td>
                    <td>${item.realName}</td>
                    <td>${item.cardNo}</td>
                    <td>${item.tel}</td>
                    <td><sl:OrderStatus showValue="${item.orderStatus}"/></td>
                    <td>${item.houseSpace}</td>
                    <td>${item.province}-${item.city}-${item.town}-${item.houseAddress}</td>
                    <td>
                        <fmt:formatNumber type="number" value="${item.currentPrice}" pattern="#,##0.00"/></td>
                    </td>
                    <td>${item.salerName}</td>
                    <td>${item.salerDepartmentName}</td>
                    <td><fmt:formatDate value="${item.applyLoanTime}" pattern="yyyy-MM-dd HH:mm"/></td>
                    <td><fmt:formatDate value="${item.backApplyHandleTime}" pattern="yyyy-MM-dd HH:mm"/></td>
                    <td class="btn-cel">
                        <shiro:hasPermission name="applyLoan:add">
                            <c:if test="${item.orderStatus == 0 || item.orderStatus == -2}">
                                <a href="#" class="btn btn-primary btn-xs applyLoanBtn" data-id="${item.id}" data-no="${item.realName}">
                                    <i class="fa fa-edit"></i>申请贷款</a>
                            </c:if>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="applyLoan:track">
                            <a href="#" class="btn btn-primary btn-xs orderTrack" data-id="${item.id}" data-no="${item.realName}">
                                <i class="fa fa-edit"></i>订单轨迹</a>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="applyLoan:detail">
                            <a href="#" class="btn btn-info btn-xs detail" data-id="${item.id}" data-title="${item.realName}"  data-href="${ctx}/dlBusinessHandle/detail.action?id=${item.id}" ><i class="fa fa-search-plus"></i>查看</a>
                        </shiro:hasPermission>
                    </td>
                </tr>
                </c:forEach>
            </table>
        </div>
        <%-- end table-responsive --%>
    </div>
</div>
<%-- 分页表单参数 --%>
<%@include file="/WEB-INF/views/include/page-bar.jsp" %>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/applyLoan/applyLoanList.js"></script>
</html>
