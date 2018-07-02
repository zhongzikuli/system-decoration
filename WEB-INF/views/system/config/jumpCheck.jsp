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
            <input type="hidden" name="keyword" value="${paramMap.keyword}">
        </div>
        <form id="pagerForm" action="${ctx}/CreditConfig/jumpCheck.action" method="post" style="margin:0;">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label label">快捷搜索:</label>
                            <input type="text" class="form-control w-200" id="keyword" name="keyword"
                                   onkeyup="value=value.replace(/\s/g,'')" placeholder="请输入订单编号或姓名或身份证号"
                                   value="${paramMap.keyword}">
                            <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
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
                        <th style="width:8%;">客户类型</th>
                        <th style="width:10%;">订单号</th>
                        <th style="width:5%;">姓名</th>
                        <th style="width:12%;">身份证号</th>
                        <th style="width:5%;">跳过征信验证</th>
                        <th style="width:5%;">订单状态</th>
                        <th style="width:10%;">备注</th>
                        <th style="width:8%;">更新时间</th>
                        <th style="width:8%;">订单时间</th>
                        <th style="width:10%;">操作</th>
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
                            <td><input type="checkbox" class="checkOne" name="bank_input" value="${item.id}"></td>
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td>
                                <c:if test="${item.userType == 'BUYER'}">
                                    购车人
                                </c:if>
                                <c:if test="${item.userType == 'SPONSOR'}">
                                    担保人
                                </c:if>
                                <c:if test="${item.userType == 'SHARED'}">
                                    共同购车人
                                </c:if>
                            </td>
                            <td>${item.orderNo}</td>
                            <td>${item.realName}</td>
                            <td>${item.cardNo}</td>
                            <td>
                                <c:if test="${item.skipCreditValidation == '1'}">
                                    跳过
                                </c:if>
                                <c:if test="${item.skipCreditValidation == '0'}">
                                    不跳过
                                </c:if>
                            </td>
                            <td>${item.orderStatusName}</td>
                            <td>${item.skipCreditValidationReason}</td>
                            <td>
                                <fmt:formatDate value="${item.mtime}" pattern="yyyy-MM-dd "/>
                            </td>
                            <td>
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd "/>
                            </td>
                            <td class="btn-cel">
                                <a href="#" class="btn btn-primary btn-xs " onclick="jumpCredit(${item.id})"
                                        <c:if test="${item.skipCreditValidation =='1'}">
                                            style="display:none;"
                                        </c:if>
                                ><i class="fa fa-edit"></i>跳过征信验证</a>

                                <a href="#" class="btn btn-danger btn-xs  " onclick="creditSet(${item.id})"
                                        <c:if test="${item.skipCreditValidation =='0'}">
                                            style="display:none;"
                                        </c:if>
                                ><i class="fa fa-gear"></i>设置征信验证</a>
                                <a title="查看" class="btn btn-info btn-xs detail"
                                   href="${ctx}/cfBusinessOrderAccept/detail.action?id=${item.businessOrderAcceptId}&active=carInfo&goBackUrl=${ctx}/CreditConfig/jumpCheck.action">
                                    <i class="fa fa-search-plus"></i>查看</a>

                            </td>
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
<script type="text/javascript" src="${ctx}/js/mine/system/config/jumpCheck.js"></script>
<script type="text/template" title="设置" id="config-dialog_jump">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="configForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                <div class="col-xs-8">
                    <textarea type="text" class="form-control" id="remarkJump" name="remarkJump"
                              check="jumpForm(this)"></textarea>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="设置" id="config-dialog_set">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="configSetForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                <div class="col-xs-8">
                    <textarea type="text" class="form-control" id="remarkSet" name="remarkSet"
                              check="jumpForm(this)"></textarea>
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
