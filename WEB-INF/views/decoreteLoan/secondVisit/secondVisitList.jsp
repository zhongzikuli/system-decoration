<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>二次上门</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <div id="hiddenForm">
            <input type="hidden" name="secondVisitOrderStatus" value="${paramMap.secondVisitOrderStatus}"/>
            <input type="hidden" name="keyword" value="${paramMap.keyword}"/>
            <input type="hidden" name="startDate" value="${paramMap.startDate}"/>
            <input type="hidden" name="endDate" value="${paramMap.endDate}"/>
            <input type="hidden" name="commonStartDate" value="${paramMap.commonStartDate}"/>
            <input type="hidden" name="commonEndDate" value="${paramMap.commonEndDate}"/>
        </div>
        <form id="pagerForm" action="${ctx}/secondVisit/secondVisitQuery.action" method="post">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-2">
                    <%--<c:if test="${paramMap.secondVisitOrderStatus == 20}">--%>
                        <shiro:hasPermission name="secondVisit:changeAudit">
                            <a class="btn btn-primary btn-sm change-audit-btn">换审核</a>
                        </shiro:hasPermission>
                   <%-- </c:if>--%>
                    <a class="btn btn-success btn-sm refresh-btn">刷新</a>
                </div>

                <div class="col-sm-10 text-right">
                    <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
                    <div class="btn-box animated fadeInRight">
                        <div class="row">
                            <div class="col-sm-7">
                                <div class="form-group" id="date-time">
                                    <label class="col-xs-4 control-label">银行审批时间:</label>
                                    <div class="col-xs-8">
                                        <div class="input-group">
                                            <input type="text" class="form-control w-120" name="startDate"
                                                   id="search-start-date" value="${paramMap.startDate}"/>
                                            <span class="input-group-addon">到</span> <input type="text"
                                                                                            class="form-control w-120"
                                                                                            name="endDate"
                                                                                            id="search-end-date"
                                                                                            value="${paramMap.endDate}"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" id="common-date-time">
                                    <label class="col-xs-4 control-label">一次上门时间:</label>
                                    <div class="col-xs-8">
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="commonStartDate"
                                                   id="search-common-start-date" value="${paramMap.commonStartDate}"/>
                                            <span class="input-group-addon">到</span> <input type="text"
                                                                                            class="form-control"
                                                                                            name="commonEndDate"
                                                                                            id="search-common-end-date"
                                                                                            value="${paramMap.commonEndDate}"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-5">
                                <div class="form-group">
                                    <label class="col-xs-4 control-label">银行审批:</label>
                                    <div class="col-xs-8">
                                        <select class="form-control" id="search-style" name="secondVisitOrderStatus">
                                            <option value="0">全部</option>
                                            <option value="20"
                                                    <c:if test="${paramMap.secondVisitOrderStatus == 20}">selected</c:if>>
                                                未上门
                                            </option>
                                            <option value="24"
                                                    <c:if test="${paramMap.secondVisitOrderStatus == 24}">selected</c:if>>
                                                已上门
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-4 control-label">快捷搜索:</label>
                                    <div class="col-xs-8">
                                        <input id="keyword" type="text" class="form-control"
                                               placeholder="请输入客户姓名或身份证号或订单编号" name="keyword"
                                               value="${paramMap.keyword}" onkeyup="value=value.replace(/\s/g,'')">
                                    </div>
                                </div>
                                <div class="form-group group-btn">
                                    <button type="button" class="btn btn-primary  btn-sm search-btn"
                                            onclick="searchSubmit()">搜索
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
                        <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <%--<c:if test="${paramMap.secondVisitOrderStatus == 20}">--%>
                            <th style="width:3%;">占位</th>
                        <%--</c:if>--%>
                        <th style="width:12%;">订单编号</th>
                        <th style="width:8%;">客户名称</th>
                        <th style="width:8%;">客户身份证号</th>
                        <th style="width:10%;">部门</th>
                        <th style="width:13%;">贷款银行</th>
                        <th style="width:7%;">订单状态</th>
                        <th style="width:7%;">一次放款时间</th>
                        <th style="width:7%;">二次上门时间</th>
                        <th style="width:8%;">操作</th>
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
                        <td><input type="checkbox" name="auditCheckbox" data-handle-status="${item.orderStatus}" class="checkOne" value="${item.id}"></td>
                        <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <%--<c:if test="${paramMap.secondVisitOrderStatus == 20}">--%>
                            <td class="cel used">
                                <c:if test="${not empty item.operationingLoginName}">
                                    <code>${item.operationingLoginName}</code>
                                </c:if>
                            </td>
                        <%--</c:if>--%>
                        <td>${item.orderNo}</td>
                        <td class="cel max-120">${item.realName}</td>
                        <td>${item.cardNo}</td>
                        <td>${item.departmentName}</td>
                        <td>${item.bankName}</td>
                        <td><sl:OrderStatus showValue="${item.orderStatus}"/></td>
                        <td>
                            <fmt:formatDate value="${item.firstLendingHandleTime}" pattern="yyyy-MM-dd HH:mm"/>
                        </td>
                        <td>
                            <fmt:formatDate value="${item.secondVisitHandleTime}" pattern="yyyy-MM-dd HH:mm"/>
                        </td>

                        <td class="btn-cel">
                            <shiro:hasPermission name="secondVisit:audit">
                                <c:if test="${item.orderStatus == 20}">
                                    <a data-id="${item.id}" data-title="${item.realName}"
                                       data-url="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.id}&active=playMoney"
                                       class="btn btn-primary btn-xs audit-detail"><i class="fa fa-edit"></i>上门</a>
                                </c:if>
                            </shiro:hasPermission>
                            <shiro:hasPermission name="secondVisit:view">
                                <a data-id="${item.id}" data-title="${item.realName}"
                                   data-href="${ctx}/dlBusinessHandle/detail.action?id=${item.id}&active=playMoney"
                                   class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>查看</a>
                            </shiro:hasPermission>
                        </td>
                    </tr>
                    </c:forEach>
                </table>
            </div>
        </div>
    </div>
    <%@include file="/WEB-INF/views/include/page-bar.jsp" %>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/secondVisit/secondVisitList.js"></script>
</html>
