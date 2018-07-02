<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" href="${ctx}/js/third/bootstrap/bootstrap-switch.min.css">
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <form id="pagerForm" action="${ctx}/CreditConfig/query.action" method="post" style="margin:0;">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        </form>
    </div>

    <div class="mod_basic">
        <div class="ibox-content full-height no-padding">
            <div class="table-responsive full-height">
                <table class="table table-hover table-height table-striped">
                    <thead>
                    <tr>
                        <th style="width:50%;">名称</th>
                        <th style="width:50%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <shiro:hasPermission name="CreditConfig:setTime">
                        <tr>
                            <td>
                                <input type="hidden" value="1" id="toSetCrditTime">
                                <span class="label label-success">
                            <i class="fa fa-user-secret"></i>征信验证时长</span>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs setTime">
                                    <i class="fa fa-gear"></i>设置</a>
                            </td>
                        </tr>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="CreditConfig:jumpCheck">
                        <tr>
                            <td>
                                <input type="hidden" value="2" id="toJumpCrditCheck">
                                <span class="label label-success"><i
                                        class="fa fa-user-secret"></i>跳过征信验证</span>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs jumpCheck">
                                    <i class="fa fa-gear"></i>设置</a>
                            </td>
                        </tr>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="CreditConfig:configYearRemaind">
                        <tr>
                            <td>
                                <input type="hidden" value="3" id="toRemindSecondCar">
                                <span class="label label-success"><i
                                        class="fa fa-user-secret"></i>二手车年限提醒</span>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs setYearRemind">
                                    <i class="fa fa-gear"></i>设置</a>
                            </td>
                        </tr>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="CreditConfig:setSalesmanTurnsOnRule">
                        <tr>
                            <td>
                                <input type="hidden" value="4" id="salesmanTurnsOnRule">
                                <span class="label label-success"><i
                                        class="fa fa-user-secret"></i>业务员转正规则</span>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs setSalesmanTurnsOnRule">
                                    <i class="fa fa-gear"></i>设置</a>
                            </td>
                        </tr>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="CreditConfig:salesmanTurnsOutRule">
                        <tr>
                            <td>
                                <input type="hidden" value="5" id="salesmanTurnsOutRule">
                                <span class="label label-success"><i
                                        class="fa fa-user-secret"></i>业务员淘汰规则</span>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs salesmanTurnsOutRule">
                                    <i class="fa fa-gear"></i>设置</a>
                            </td>
                        </tr>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="CreditConfig:managerTurnsOutRule">
                        <tr>
                            <td>
                                <input type="hidden" value="6" id="managerTurnsOutRule">
                                <span class="label label-success"><i
                                        class="fa fa-user-secret"></i>部门经理淘汰规则</span>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs managerTurnsOutRule">
                                    <i class="fa fa-gear"></i>设置</a>
                            </td>
                        </tr>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="CreditConfig:saleTurnsOnRemain">
                        <tr>
                            <td>
                                <input type="hidden" value="7" id="saleTurnsOnRemain">
                                <span class="label label-success"><i
                                        class="fa fa-user-secret"></i>业务员转正提醒天数</span>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs saleTurnsOnRemain">
                                    <i class="fa fa-gear"></i>设置</a>
                            </td>
                        </tr>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="CreditConfig:turnOutRemainDays">
                        <tr>
                            <td>
                                <input type="hidden" value="8" id="turnOutRemainDays">
                                <span class="label label-success"><i
                                        class="fa fa-user-secret"></i>淘汰提前提醒天数</span>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs turnOutRemainDays">
                                    <i class="fa fa-gear"></i>设置</a>
                            </td>
                        </tr>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="CreditConfig:autoApprovalContractPrice">
                        <tr>
                            <td>
                                <input type="hidden" value="11" id="autoApprovalContractPrice">
                                <span class="label label-success"><i
                                        class="fa fa-user-secret"></i>自动审批合同价</span>
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-xs autoApprovalContractPrice">
                                    <i class="fa fa-gear"></i>设置</a>
                            </td>
                        </tr>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="CreditConfig:appRegistered">
                        <tr>
                            <td>
                            <span class="label label-success"><i
                                    class="fa fa-user-secret"></i>App用户注册开关</span>
                            </td>
                            <td>
                                <c:if test="${config == null}">
                                    <div class="switch switch-mini">
                                        <input type="checkbox" id="setAutoAppConfig"/>
                                    </div>
                                </c:if>
                                <c:if test="${config != null}">
                                    <c:if test="${config.globalValue eq '0'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setAutoAppConfig"/>
                                        </div>
                                    </c:if>
                                    <c:if test="${config.globalValue eq '1'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setAutoAppConfig" checked/>
                                        </div>
                                    </c:if>
                                </c:if>
                            </td>
                        </tr>
                    </shiro:hasPermission>

                    <shiro:hasPermission name="CreditConfig:isAutoApprovalContractPrice">
                        <tr>
                            <td>
                            <span class="label label-success"><i
                                    class="fa fa-user-secret"></i>是否支持自动审批</span>
                            </td>
                            <td>
                                <c:if test="${empty autoApprovalContractPriceEntity}">
                                    <div class="switch switch-mini">
                                        <input type="checkbox" id="setAutoApprovalContractPriceEntity"/>
                                    </div>
                                </c:if>
                                <c:if test="${ not empty autoApprovalContractPriceEntity}">
                                    <c:if test="${autoApprovalContractPriceEntity.globalValue eq '0'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setAutoApprovalContractPriceEntity"/>
                                        </div>
                                    </c:if>
                                    <c:if test="${autoApprovalContractPriceEntity.globalValue eq '1'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setAutoApprovalContractPriceEntity" checked/>
                                        </div>
                                    </c:if>
                                </c:if>
                            </td>
                        </tr>
                    </shiro:hasPermission>

                    <shiro:hasPermission name="CreditConfig:tongdunBigDataSearch">
                        <tr>
                            <td>
                            <span class="label label-success"><i
                                    class="fa fa-user-secret"></i>同盾大数据查询添加</span>
                            </td>
                            <td>
                                <c:if test="${empty tongdunBigDataSearchEntity}">
                                    <div class="switch switch-mini">
                                        <input type="checkbox" id="setTongdunBigDataSearchEntity"/>
                                    </div>
                                </c:if>
                                <c:if test="${ not empty tongdunBigDataSearchEntity}">
                                    <c:if test="${tongdunBigDataSearchEntity.globalValue eq '0'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setTongdunBigDataSearchEntity"/>
                                        </div>
                                    </c:if>
                                    <c:if test="${tongdunBigDataSearchEntity.globalValue eq '1'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setTongdunBigDataSearchEntity" checked/>
                                        </div>
                                    </c:if>
                                </c:if>
                            </td>
                        </tr>
                    </shiro:hasPermission>


                    <shiro:hasPermission name="CreditConfig:firstAuditVideoInteriew">
                        <tr>
                            <td>
                            <span class="label label-success"><i
                                    class="fa fa-user-secret"></i>初审前置条件实时视频面签</span>
                            </td>
                            <td>
                                <c:if test="${empty firstAuditVideoInteriew}">
                                    <div class="switch switch-mini">
                                        <input type="checkbox" id="setFirstAuditVideoInteriew"/>
                                    </div>
                                </c:if>
                                <c:if test="${ not empty firstAuditVideoInteriew}">
                                    <c:if test="${firstAuditVideoInteriew.globalValue eq '0'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setFirstAuditVideoInteriew"/>
                                        </div>
                                    </c:if>
                                    <c:if test="${firstAuditVideoInteriew.globalValue eq '1'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setFirstAuditVideoInteriew" checked/>
                                        </div>
                                    </c:if>
                                </c:if>
                            </td>
                        </tr>
                    </shiro:hasPermission>

                    <shiro:hasPermission name="CreditConfig:repmentRemainWechatMessage">
                        <tr>
                            <td>
                            <span class="label label-success"><i
                                    class="fa fa-user-secret"></i>还款提醒微信消息</span>
                            </td>
                            <td>
                                <c:if test="${empty repmentRemainWechatMessage}">
                                    <div class="switch switch-mini">
                                        <input type="checkbox" id="setWechatMessage"/>
                                    </div>
                                </c:if>
                                <c:if test="${ not empty repmentRemainWechatMessage}">
                                    <c:if test="${repmentRemainWechatMessage.globalValue eq '0'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setWechatMessage"/>
                                        </div>
                                    </c:if>
                                    <c:if test="${repmentRemainWechatMessage.globalValue eq '1'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setWechatMessage" checked/>
                                        </div>
                                    </c:if>
                                </c:if>
                            </td>
                        </tr>
                    </shiro:hasPermission>

                    <shiro:hasPermission name="CreditConfig:repmentRemainPhoneMessage">
                        <tr>
                            <td>
                            <span class="label label-success"><i
                                    class="fa fa-user-secret"></i>还款提醒短信消息</span>
                            </td>
                            <td>
                                <c:if test="${empty repmentRemainPhoneMessage}">
                                    <div class="switch switch-mini">
                                        <input type="checkbox" id="setRepmentRemainPhoneMessage"/>
                                    </div>
                                </c:if>
                                <c:if test="${ not empty repmentRemainPhoneMessage}">
                                    <c:if test="${repmentRemainPhoneMessage.globalValue eq '0'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setRepmentRemainPhoneMessage"/>
                                        </div>
                                    </c:if>
                                    <c:if test="${repmentRemainPhoneMessage.globalValue eq '1'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setRepmentRemainPhoneMessage" checked/>
                                        </div>
                                    </c:if>
                                </c:if>
                            </td>
                        </tr>
                    </shiro:hasPermission>

                    <shiro:hasPermission name="CreditConfig:videoInteviewCreateUser">
                        <tr>
                            <td>
                            <span class="label label-success"><i
                                    class="fa fa-user-secret"></i>视频面签新建客户</span>
                            </td>
                            <td>
                                <c:if test="${empty videoInteviewCreateUser}">
                                    <div class="switch switch-mini">
                                        <input type="checkbox" id="setting"/>
                                    </div>
                                </c:if>
                                <c:if test="${ not empty videoInteviewCreateUser}">
                                    <c:if test="${videoInteviewCreateUser.globalValue eq '0'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setting"/>
                                        </div>
                                    </c:if>
                                    <c:if test="${videoInteviewCreateUser.globalValue eq '1'}">
                                        <div class="switch switch-mini">
                                            <input type="checkbox" id="setting" checked/>
                                        </div>
                                    </c:if>
                                </c:if>

                            </td>
                        </tr>
                    </shiro:hasPermission>

                    <shiro:hasPermission name="CreditConfig:isTongDunBigDataSearch">
                    </shiro:hasPermission>
                    <tr>
                        <td>
                            <span class="label label-success"><i
                                    class="fa fa-user-secret"></i>是否支持大数据征信(同盾)</span>
                        </td>
                        <td>
                            <c:if test="${empty isTongDunBigDataSearch}">
                                <div class="switch switch-mini">
                                    <input type="checkbox" id="isTongDunBigDataSearch"/>
                                </div>
                            </c:if>
                            <c:if test="${ not empty isTongDunBigDataSearch}">
                                <c:if test="${isTongDunBigDataSearch.globalValue eq '0'}">
                                    <div class="switch switch-mini">
                                        <input type="checkbox" id="isTongDunBigDataSearch"/>
                                    </div>
                                </c:if>
                                <c:if test="${isTongDunBigDataSearch.globalValue eq '1'}">
                                    <div class="switch switch-mini">
                                        <input type="checkbox" id="isTongDunBigDataSearch" checked/>
                                    </div>
                                </c:if>
                            </c:if>

                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/bootstrap/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/config/config.js"></script>
<script type="text/template" title="设置" id="config-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="configForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>时长:</label>
                <div class="col-xs-6">
                    <input type="hidden" value="1" id="setId">
                    <input type="text" class="form-control" name="globalValue" id="globalValue"
                           check="validYearSet(this)" tip="时长不能为空">
                    <span>(单位:月)</span>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="设置二手车年限提醒" id="yearRemaindConfig-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="setYearRemindForm" class="form-horizontal">
            <div class="form-group">
                <input type="hidden" value="3" id="setYearRemaindId">
                <label class="col-xs-3 control-label"><span class="red">*</span>年:</label>
                <div class="col-xs-8">
                    <div obj="" tip="年限不能为空">
                        <select id="yearSet" name="yearSet" class="form-control" check="validYearSet(this)">
                            <option value="">请选择年限</option>
                            <c:forEach items="${yearSet}" var="years">
                                <option>${years.valueDesc}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>月:</label>
                <div class="col-xs-8">
                    <div obj="" tip="月限不能为空">
                        <select name="monthSet" id="monthSet" class="form-control" check="validYearSet(this)">
                            <option value="">请选择月限</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                        </select>
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
<script type="text/template" title="设置二手车年限提醒" id="insertInfo-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="insertInfoForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>类型:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="type" id="type"
                           check="validYearSet(this)" tip="类型不能为空">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>系统设置值:</label>
                <div class="col-xs-8">
                    <div obj="" tip="系统设置值不能为空">
                        <input type="text" class="form-control" name="globalValueInfo" id="globalValueInfo"
                               check="validYearSet(this)">
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
<script type="text/template" title="业务员转正规则" id="salesmanTurnsOnRule-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="salesmanTurnsOnRuleForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>订单数(笔):</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="orderNumber" id="orderNumber"
                           check="validYearSet(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>贷款额(万):</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="loanMoney" id="loanMoney"
                           check="validYearSet(this)">
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="业务员淘汰规则" id="salesmanTurnsOutRule-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="salesmanTurnsOutRuleForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>连续月数:</label>
                <div class="col-xs-8">
                    <div obj="" tip="连续月数不能为空">
                        <select name="workTimeTurnsOut" id="workTimeTurnsOut" class="form-control"
                                check="validYearSet(this)">
                            <option value="">请选择连续月数</option>
                            <option value="1">1月</option>
                            <option value="2">2月</option>
                            <option value="3">3月</option>
                            <option value="4">4月</option>
                            <option value="5">5月</option>
                            <option value="6">6月</option>
                            <option value="7">7月</option>
                            <option value="8">8月</option>
                            <option value="9">9月</option>
                            <option value="10">10月</option>
                            <option value="11">11月</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>订单数(笔):</label>
                <div class="col-xs-8">
                    <div obj="" tip="订单数不能为空">
                        <input type="text" class="form-control" name="orderNumber" id="orderNumberTurnsOut"
                               check="validYearSet(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>贷款额(万):</label>
                <div class="col-xs-8">
                    <div obj="" tip="贷款额不能为空">
                        <input type="text" class="form-control" name="loanMoney" id="loanMoneyTurnsOut"
                               check="validYearSet(this)">
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
<script type="text/template" title="部门经理淘汰规则" id="departmentManTurnsOutRule-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="departmentManTurnsOutRuleForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-4 control-label"><span class="red">*</span>连续月数:</label>
                <div class="col-xs-7">
                    <div obj="">
                        <select name="depWorkTimeTurnsOut" id="depWorkTimeTurnsOut" class="form-control"
                                check="validYearSet(this)">
                            <option value="">请选择连续月数</option>
                            <option value="1">1月</option>
                            <option value="2">2月</option>
                            <option value="3">3月</option>
                            <option value="4">4月</option>
                            <option value="5">5月</option>
                            <option value="6">6月</option>
                            <option value="7">7月</option>
                            <option value="8">8月</option>
                            <option value="9">9月</option>
                            <option value="10">10月</option>
                            <option value="11">11月</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-4 control-label"><span class="red">*</span>部门人均贷款额(万):</label>
                <div class="col-xs-7">
                    <input type="text" class="form-control" name="workTime" id="depAvgLoanMoney"
                           check="validYearSet(this)" tip="部门人均贷款额不能为空">
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="业务员转正提醒天数" id="saleTurnsOnRemain-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="saleTurnsOnRemainForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-4 control-label"><span class="red">*</span>转正提醒天数:</label>
                <div class="col-xs-6">
                    <input type="text" class="form-control" name="saleTurnsOnRemain" id="salesTurnsOnRemain"
                           check="validYearSet(this)" tip="转正提醒天数不能为空">
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="淘汰提前提醒天数" id="turnOutRemainDays-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="turnOutRemainDaysForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-4 control-label"><span class="red">*</span>淘汰提前提醒天数:</label>
                <div class="col-xs-6">
                    <input type="text" class="form-control" name="turnOutRemain" id="turnOutRemain"
                           check="validYearSet(this)" tip="淘汰提醒天数不能为空">
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="自动审批合同价" id="autoApprovalContractPrice-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="autoApprovalContractPriceForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-4 control-label"><span class="red">*</span>合同价(元):</label>
                <div class="col-xs-6">
                    <input type="text" class="form-control" name="autoApprovalContractPriceInput"
                           id="autoApprovalContractPriceInput"
                           tip="合同价不能为空" check="validYearSet(this)">
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
