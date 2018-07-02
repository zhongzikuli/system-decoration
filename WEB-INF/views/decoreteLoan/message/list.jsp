<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>消息列表</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <div id="hiddenForm">
            <input type="hidden" name="startDate" value="${startDate}"/>
            <input type="hidden" name="endDate" value="${endDate}"/>
            <input type="hidden" name="orderStatus" value="${orderStatus}"/>
            <input type="hidden" name="isRead" value="${isRead}"/>
        </div>
        <form id="pagerForm" action="${ctx}/message/queryList.action" method="post" style="margin:0;">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-1">
                    <a data-toggle="modal" type="button" class="btn btn-info btn-sm" onclick="updateBatchRead('/message/updateBatchRead.action')">设置已读</a>
                </div>
                <div class="col-sm-13 text-right">
                    <div class="form-inline">

                        <%--<div class="form-group">
                            <label class="control-label label"></label>
                            <input id="keyword" type="text" class="form-control" placeholder="请输入客户姓名或身份证号或订单编号"
                                   name="keyword" value="${keyword}" onkeyup="value=value.replace(/\s/g,'')">
                        </div>--%>
                        <div class="form-group" id="date-time">
                            <label class="control-label label">开始时间:</label>
                            <div class="input-group">
                                <input type="text" class="form-control w-120" name="startDate" id="startDate"
                                       value="${startDate}"/>
                                <span class="input-group-addon">到</span> <input type="text" class="form-control w-120"
                                                                                name="endDate" id="endDate"
                                                                                value="${endDate}"/>
                            </div>
                        </div>
                         <div class="form-group">
                           <label class="control-label label">消息状态:</label>
                           <select name="isRead" id="isRead" class="form-control type status">
                               <option value="">请选择</option>
                               <option value="1" <c:if test="${isRead eq '1'}">selected</c:if>>已读</option>
                               <option value="0" <c:if test="${isRead eq '0'}">selected</c:if>>未读</option>
                           </select>
                       </div>
                        <div class="form-group">
                            <label class="control-label label">消息类型:</label>
                            <select name="orderStatus" id="orderStatus" class="form-control type status">
                                <option value="">请选择</option>
                           <%--     <option value="0" <c:if test="${orderStatus eq '0'}">selected</c:if>>保存</option>
                                <option value="1" <c:if test="${orderStatus eq '1'}">selected</c:if>>申请贷款</option>--%>
                                <option value="4" <c:if test="${orderStatus eq '4'}">selected</c:if>>业务受理</option>
                                <option value="8" <c:if test="${orderStatus eq '8'}">selected</c:if>>银行受理</option>
                                <option value="12" <c:if test="${orderStatus eq '12'}">selected</c:if>>银行审批</option>
                                <option value="16" <c:if test="${orderStatus eq '16'}">selected</c:if>>一次上门</option>
                                <option value="20" <c:if test="${orderStatus eq '20'}">selected</c:if>>一次放款</option>
                                <option value="24" <c:if test="${orderStatus eq '24'}">selected</c:if>>二次上门</option>
                                <option value="28" <c:if test="${orderStatus eq '28'}">selected</c:if>>二次放款</option>
                                <%--<option value="-1" <c:if test="${orderStatus eq '-1'}">selected</c:if>>申请退回</option>--%>
                                <option value="-2" <c:if test="${orderStatus eq '-2'}">selected</c:if>>退单</option>
                                <%--<option value="-3" <c:if test="${orderStatus eq '-3'}">selected</c:if>>作废</option>--%>
                                <option value="-4" <c:if test="${orderStatus eq '-4'}">selected</c:if>>拒单</option>
                            </select>
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
                        <th style="width:8%;">客户姓名</th>
                        <th style="width:8%;">身份证号</th>
                        <th style="width:8%;">审核人员</th>
                        <th style="width:8%;">审核结果</th>
                        <th style="width:8%;">消息内容</th>
                        <th style="width:8%;">是否已读</th>
                        <th style="width:8%;">消息类型</th>
                        <th style="width:10%;">更新时间</th>
                        <th style="width:2%;">操作</th>
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
                            <td><input type="checkbox" class="checkOne" name="message_id" value="${item.id}"></td>
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td>${item.orderNo}</td>
                            <td>${item.realName}</td>
                            <td>${item.cardNo}</td>
                            <td>${item.auditor}</td>
                            <td>${item.remark}</td>
                            <td>${item.content}</td>
                            <td>
                                <c:if test="${item.isRead == 0}">未读</c:if>
                                <c:if test="${item.isRead == 1}">已读</c:if>
                            </td>
                            <td><sl:OrderStatus showValue="${item.type}"/></td>

                            <td class="cel">
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>

                            <td class="btn-cel">
                                <%--<c:if test="${item.isRead == 0}">
                                    &lt;%&ndash;  <a href="#" class="btn btn-info btn-xs updateRead" data-id="${item.id}" data-href="${ctx}/message/updateRead.action?id=${item.id}">
                                      <i class="fa fa-search-plus"></i>设置已读</a>&ndash;%&gt;
                                    <a id="organ-start-up-btn" onclick="updateRead(${item.id})"
                                       class="btn btn-<c:if test="${item.isRead == 0}">danger</c:if> btn-xs">
                                        <i class="fa fa-edit"></i><c:if test="${item.isRead == 0}">设置已读</c:if></a>
                                </c:if>--%>
                                <shiro:hasPermission name="OrderDetail:view">
                                    <a href="#" class="btn btn-info btn-xs detail"
                                       data-id="${item.acceptId}" data-title="${item.realName}"
                                       data-href="${ctx}/dlBusinessHandle/detail.action?id=${item.acceptId}">
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
    <%-- 分页表单参数 --%>
    <%@include file="/WEB-INF/views/include/page-bar.jsp" %>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/message/message.js"></script>
</html>
