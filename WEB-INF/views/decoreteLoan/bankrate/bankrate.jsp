<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>银行利率管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <div id="hiddenForm">
            <input type="hidden" name="bankId" value="${bankId}"/>
            <input type="hidden" name="years" value="${years}"/>
        </div>
        <form id="pagerForm" action="${ctx}/bankRate/query.action" method="post" style="margin:0;">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-2">
                    <shiro:hasPermission name="bankRate:add">
                        <a data-toggle="modal" class="btn btn-primary btn-sm" onclick="createBankRate()">新增</a>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="bankRate:delete">
                        <a data-toggle="modal" class="btn btn-danger btn-sm" onclick="deleteBankRate()">删除</a>
                    </shiro:hasPermission>
                    <a data-toggle="modal" class="btn btn-success btn-sm" onclick="refresh()">刷新</a>
                </div>
                <div class="col-sm-10 text-right">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label label">银行:</label>
                            <select name="bankId" id="bank-type" class="form-control type bankStatus">
                                <option value="">请选择</option>
                                <c:forEach items="${banks}" var="bank">
                                    <option value="${bank.id}"
                                            <c:if test="${bank.id eq bankId}">selected</c:if>
                                    >${bank.bankName}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="control-label label">年限:</label>
                            <select name="years" id="years-type" class="form-control type status">
                                <option value="">请选择</option>
                                <c:forEach items="${yearsList}" var="yearsItem">
                                    <option value="${yearsItem}"
                                            <c:if test="${yearsItem eq years}">selected</c:if>
                                    >${yearsItem}</option>
                                </c:forEach>
                            </select>
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
                        <th style="width:8%;">银行名称</th>
                        <th style="width:8%;">年限</th>
                        <th style="width:8%;">利率（%）</th>
                        <th style="width:8%;">更新时间</th>
                        <th style="width:2%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="20">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="bankRate_input" value="${item.id}"></td>
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td>
                                <c:forEach items="${banks}" var="bank">
                                    <c:if test="${bank.id eq item.bankId}">
                                        ${bank.bankName}
                                    </c:if>
                                </c:forEach>
                            </td>
                            <td>${item.years}</td>
                            <td>${item.rate}</td>
                            <td><fmt:formatDate value="${item.mtime}" pattern="yyyy-MM-dd HH:mm"/></td>
                                <%--<td >${item.mtimeStr}</td>--%>
                            <td class="btn-cel" style="margin: 0 auto;">
                                <shiro:hasPermission name="bankRate:update">
                                    <a href="#" onclick="editInfo('${item.id}')" class="btn btn-primary btn-xs">
                                        <i class="fa fa-edit"></i>编辑</a>
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
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/bankRate/bankRate.js?version=2018228323"></script>
<script type="text/template" title="新增" id="bankRate-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="bankRateForm" class="form-horizontal">
            <div class="col-sm-12">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>银行:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select name="bankId" id="bankId" class="form-control" check="bankForm(this)">
                                <option value="">请选择</option>
                                <c:forEach items="${banks}" var="bank">
                                    <option value="${bank.id}">${bank.bankName}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>年限:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select name="years" id="years" class="form-control" check="bankForm(this)">
                                <option value="">请选择</option>
                                <c:forEach items="${yearsList}" var="yearsItem">
                                    <option value="${yearsItem}">${yearsItem}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>利率(%):</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="rate" id="rate"
                               check="bankForm(this)">
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="编辑" id="bankRateEdit-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="bankRateForm_edit" class="form-horizontal">
            <div class="col-sm-12">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>银行:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select name="bankId_edit" id="bankId_edit" class="form-control" check="bankForm(this)">
                                <option value="">请选择</option>
                                <c:forEach items="${banks}" var="bank">
                                    <option value="${bank.id}">${bank.bankName}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>年限:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select name="years_edit" id="years_edit" class="form-control" check="bankForm(this)">
                                <option value="">请选择</option>
                                <c:forEach items="${yearsList}" var="yearsItem">
                                    <option value="${yearsItem}">${yearsItem}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>利率(%):</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="rate_edit" id="rate_edit"
                               check="bankForm(this)">
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
</html>
