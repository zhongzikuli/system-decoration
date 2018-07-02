<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>申请贷款明细表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="main-wrapper flex">
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${paramMap.bankId}"/>
        <input type="hidden" name="orderNumber" value="${paramMap.orderNumber}"/>
        <input type="hidden" name="depName" value="${paramMap.departmentName}"/>
        <input type="hidden" name="startDate" value="${paramMap.startDate}">
        <input type="hidden" name="endDate" value="${paramMap.endDate}">
        <input type="hidden" name="orderStatus" value="${paramMap.orderStatus}">
    </div>
    <form id="pagerForm" action="${ctx}/financialLoansDetailsReport/queryForLoansDetails.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-11  text-left">
                <div class="form-inline">
                    <shiro:hasPermission name="financeStatements:exporLoansDetailsList">
                        <a type="button" class="btn btn-success btn-sm refresh-btn" onclick="exporLoansDetailsExcel()">导出</a>
                    </shiro:hasPermission>
                </div>
            </div>
            <div class="col-sm-1 text-right">
                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                <div class="btn-box animated fadeInRight">
                    <div class="row">
                        <div class="form-group">
                            <label class="col-xs-3 control-label">订单状态:</label>
                            <div class="col-xs-8">
                                <select class="form-control" id="search-isArrival" name="isArrival">
                                    <option value="">请选择</option>
                                    <option value="1" <c:if test="${paramMap.orderStatus == 1}"> selected="selected"</c:if> >是</option>
                                    <option value="0" <c:if test="${paramMap.orderStatus == 0}"> selected="selected"</c:if> >否</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-7">
                            <div class="form-group" id="date-time">
                                <label class="col-xs-3 control-label">垫款日期:</label>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="startDate" id="search-start-date" value="${paramMap.startDate}" />
                                        <span class="input-group-addon">-</span>
                                        <input type="text" class="form-control" name="endDate" id="search-end-date" value="${paramMap.endDate}" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">快捷搜索:</label>
                                <div class="col-xs-8">
                                    <input id="search-keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号或订单编号" name="keyword" value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">部门:</label>
                                <div class="col-xs-8">
                                    <c:if test="${level<=3}">
                                        <select class="form-control" id="search-deparment-name" name="depName">
                                            <option value="">请选择</option>
                                            <c:forEach var="department" items="${departments}" varStatus="dp">
                                                <c:choose>
                                                    <c:when test="${null == paramMap.departmentName}">
                                                        <option value="${department.name}">${department.name}</option>
                                                    </c:when>
                                                    <c:when test="${paramMap.departmentName == department.name}">
                                                        <option selected="selected" value="${department.name}">${department.name}</option>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <option value="${department.name}">${department.name}</option>
                                                    </c:otherwise>
                                                </c:choose>
                                            </c:forEach>
                                        </select>
                                    </c:if>
                                    <c:if test="${level>3}">
                                        <select class="form-control" id="search-deparment-name" name="depName">
                                            <option value="">请选择</option>
                                            <c:forEach var="department" items="${departments}" varStatus="dp">
                                                <c:choose>
                                                    <c:when test="${null == paramMap.departmentName}">
                                                        <option value="${department.departName}">${department.departName}</option>
                                                    </c:when>
                                                    <c:when test="${paramMap.departmentName == department.departName}">
                                                        <option selected="selected" value="${department.departName}">${department.departName}</option>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <option value="${department.departName}">${department.departName}</option>
                                                    </c:otherwise>
                                                </c:choose>
                                            </c:forEach>
                                        </select>
                                    </c:if>
                                </div>
                            </div>
                            <%-- <div class="form-group">
                                    <label class="col-xs-3 control-label">订单编号:</label>
                                        <div class="col-xs-8">
                                            <input id="search-orderNumber" type="text" class="form-control" placeholder="请输入订单号" name="orderNumber" value="${paramMap.orderNumber}" onkeyup="value=value.replace(/\s/g,'')">
                                        </div>
                                 </div>  --%>
                            <div class="form-group group-btn">
                                <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
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
                    <th style="width:2%;">序号</th>
                    <th style="width:8%;">客户名</th>
                    <th style="width:8%;">垫款日期</th>
                    <th style="width:5%;">部门</th>
                    <th style="width:8%;">贷款额(元)</th>
                    <th style="width:8%;">按揭服务费(元)</th>
                    <th style="width:8%;">渠道保证金(元)</th>
                    <th style="width:8%;">上牌押金(元)</th>
                    <th style="width:8%;">履约保证金(元)</th>
                    <th style="width:8%;">按揭手续费(元)</th>
                    <th style="width:8%;">费用合计(元)</th>
                    <th style="width:8%;">入账日期</th>
                    <th style="width:8%;">车型构成</th>
                    <th style="width:5%;">贷款年限(月)</th>
                    <th style="width:5%;">审核员</th>
                    <th style="width:5%;">信贷专员</th>
                    <th style="width:8%;">客户身份证号</th>
                    <th style="width:8%;">订单号</th>
                    <th style="width:8%;">银行</th>
                    <th style="width:8%;">放贷日期</th>
                    <th style="width:8%;">合同价(元)</th>
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
                    <td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.orderId}"></td>
                    <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                    <td>${item.realName}</td>
                    <td><fmt:formatDate value="${item.companyAdvanceMoneyDate}" pattern="yyyy-MM-dd"/></td>
                    <td>${item.departmentName}</td>
                    <td><sl:format type="number" show="${item.actualLoadMoney}" pattern="#,##0.00"/></td>
                    <td><sl:format type="number" show="${item.serviceFee}" pattern="#,##0.00"/></td>
                    <td><sl:format type="number" show="${item.channelEnsureMoney}" pattern="#,##0.00"/></td>
                    <td><sl:format type="number" show="${item.licensePlateEnsureMoney}" pattern="#,##0.00"/></td>
                    <td><sl:format type="number" show="${item.agreeEnsureMoney}" pattern="#,##0.00"/></td>
                    <td><sl:format type="number" show="${item.poundage}" pattern="#,##0.00"/></td>
                    <td><sl:format type="number" show="${item.serviceFee+item.channelEnsureMoney+item.licensePlateEnsureMoney+item.poundage+item.agreeEnsureMoney}"  pattern="#,##0.00"/></td>
                    <td><fmt:formatDate value="${item.moneyArriveTime}" pattern="yyyy-MM-dd"/></td>
                    <td>
                        <c:if test="${item.newOrOld == 1 }"> <code class="alert-success">新车</code> </c:if>
                        <c:if test="${item.newOrOld == 0 }"> <code class="alert-warning">二手车</code></c:if>
                    </td>
                    <td>${item.loanPeriodMonth}</td>
                    <td>${item.auditRealName}</td>
                    <td>${item.creditPerson}</td>
                    <td>${item.cardNo}</td>
                    <td>${item.orderNo}</td>
                    <td>${item.bankName}</td>
                    <td><fmt:formatDate value="${item.bankPaymentDate}" pattern="yyyy-MM-dd"/></td>
                    <td><sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                </tr>
                </c:forEach>
            </table>
            <%-- 分页表单参数 --%>
            <%@include file="/WEB-INF/views/include/page-bar.jsp" %>
        </div>
        <%-- end table-responsive --%>
    </div>
</div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/financialStatement/loanStatisticsList.js"></script>
</html>
