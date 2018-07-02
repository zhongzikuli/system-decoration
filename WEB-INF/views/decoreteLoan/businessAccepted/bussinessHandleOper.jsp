<%@ taglib prefix="slt" uri="/slt" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>申请贷款信息</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/js/third/cityselect/cityLayout.css">
</head>
<body>
<div class="mod_header">

</div>
<div class="mod_basic no-border animated" id="applyLoanDiv">
    <input value="${applyLoan.id}" id="applyLoanId" type="hidden">
    <input id="loan-maxMoney" type="hidden">
    <input id="cardNo" type="hidden" value="${applyLoan.cardNo}">
    <input id="realName" type="hidden" value="${applyLoan.realName}" >
    <div class="item-row">
        <fieldset>
            <legend>基本信息</legend>
            <div id="customerInfo">
                <form id="customerInfoForm">
                    <div class="form-horizontal">
                        <div class="row">
                            <label for="loan-realName" class="col-sm-1 control-label"><span
                                    class="red">*</span>客户姓名:</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="loan-realName"
                                       value="${applyLoan.realName}"
                                       obj="china_english" maxlength="100">
                            </div>
                            <label for="loan-cardNo" class="col-sm-1 control-label"><span
                                    class="red">*</span>身份证号:</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="loan-cardNo" value="${applyLoan.cardNo}"
                                       obj="idCard"  maxlength="100">
                            </div>
                            <label for="loan-tel" class="col-sm-1 control-label"><span
                                    class="red">*</span>手机号:</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="loan-tel" value="${applyLoan.tel}"
                                       obj="phone11" maxlength="100">
                            </div>
                        </div>
                        <div class="row">
                            <label for="loan-houseSpace" class="col-sm-1 control-label"><span class="red">*</span>房产面积(m²):</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control loanInfoClean" id="loan-houseSpace"
                                       value="${applyLoan.houseSpace}"  obj="p_float" maxlength="10">
                            </div>
                            <label for="loan-province" class="col-sm-1 control-label"><span
                                    class="red">*</span>房产地址:</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="loan-province" obj="not_null"
                                       value="${applyLoan.province}"
                                       name="province" tip="地区不能为空" obj="not_null" maxlength="10">
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="loan-houseAddress"
                                       value="${applyLoan.houseAddress}" obj="not_null" maxlength="100">
                            </div>
                        </div>
                        <div class="row">
                            <label for="loan-currentPrice" class="col-sm-1 control-label"><span class="red">*</span>房产价值(元):</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control loanInfoClean" id="loan-currentPrice"
                                       value='<sl:format type="number" show="${applyLoan.currentPrice}" pattern="#,##0.00"/>'
                                       obj="p_float" maxlength="10">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>贷款信息</legend>
            <div id="loanInfo">
                <form id="loanInfoForm">
                    <div class="form-horizontal">
                        <div class="row">
                            <label for="loan-bank" class="col-sm-1 control-label"><span
                                    class="red">*</span>贷款银行:</label>
                            <div class="col-sm-2">
                                <div>
                                    <select name="bankId" id="loan-bank" class="form-control type chosen-select">
                                        <option value="">请选择</option>
                                        <c:forEach items="${banks}" var="bank">
                                            <option value="${bank.id}"
                                                    <c:if test="${bank.id eq applyLoan.loanBankId}">selected</c:if>
                                            >${bank.bankName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <label for="loan-years" class="col-sm-1 control-label"><span
                                    class="red">*</span>贷款年限(年):</label>
                            <div class="col-sm-2">
                                <div>
                                    <select name="years" id="loan-years" class="form-control type chosen-select">
                                        <option value="">请选择</option>
                                        <c:forEach items="${yearsList}" var="yearsItem">
                                            <option value="${yearsItem.years}"
                                                    <c:if test="${yearsItem.years eq applyLoan.loanPeriodYear}">selected</c:if>
                                            >${yearsItem.years}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <label for="loan-loanMoney" class="col-sm-1 control-label"><span class="red">*</span>贷款额(元):</label>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" id="loan-loanMoney"
                                       value='<sl:format type="number" show="${applyLoan.loanMoney}" pattern="#,##0.00"/>'
                                       obj="p_float" maxlength="10">
                            </div>
                            <div class="col-sm-2">
                                <label class="control-label" id="loan-maxLoanMoney-label" >(说明：最高可贷${maxLoanMoney}元)</label>

                                <input value="${maxLoanMoney}" id="loan-maxLoanMoney" type="hidden">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>银行利率(%):</label>
                            <div class="col-sm-2">
                                <label class="control-label" id="loan-bankRate">${applyLoan.bankRate}</label>
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>总利息(元):</label>
                            <div class="col-sm-2">
                                <label class="control-label" id="loan-repayTotalInterestAmountMonth"><sl:format
                                        type="number" show="${applyLoan.repayTotalInterestAmountMonth}"
                                        pattern="#,##0.00"/></label>
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>月还款(元):</label>
                            <div class="col-sm-2">
                                <label class="control-label"
                                       id="loan-repayAmountMonth">${applyLoan.repayPrincipleAmountMonth + applyLoan.repayInterestAmountMonth}</label>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>月还本金(元):</label>
                            <div class="col-sm-2">
                                <label class="control-label"
                                       id="loan-repayPrincipleAmountMonth">${applyLoan.repayPrincipleAmountMonth}</label>
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>月还利息(元):</label>
                            <div class="col-sm-2">
                                <label class="control-label"
                                       id="loan-repayInterestAmountMonth">${applyLoan.repayInterestAmountMonth}</label>
                            </div>
                            <div class="col-sm-4">
                                <button type="button" class="btn btn-primary byFormula">按公式计算</button>
                            </div>
                        </div>
                        <div class="row">
                            <label for="loan-remark" class="col-sm-1 control-label">备注:</label>
                            <div class="col-sm-10">
                                <textarea maxlength="500" name="remark" class="form-control"
                                          style="height:120px" id="loan-remark" value="${applyLoan.remark}">${applyLoan.remark}</textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </fieldset>
    </div>
    <div class="item-row" >

            <fieldset class="permission-box">
                <legend>大数据征信</legend>
                <div class="col-sm-12 text-left padding-r-30">
                <div class="form-group ">
                        <c:if test="${applyLoan.creditQueryTongdun ne 1}">
                            <shiro:hasPermission name="business:queryTDData">
                                <button class="btn btn-primary btn-xs query-credit-btn" type="button">征信查询</button>
                            </shiro:hasPermission>
                        </c:if>
                        <shiro:hasPermission name="business:tdDataDetail">
                             <button type="button" class="btn btn-xs btn-info detail-credit-btn">查看详情</button>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="business:tdDataExport">
                             <button type="button" class="btn btn-w-m btn-info">导出报告</button>
                        </shiro:hasPermission>
                </div>
                </div>
                <div id="risk_data_list" class="form-horizontal">
                    <div class="row">
                            <label class="col-sm-1 control-label">风险分:</label>
                            <div class="col-sm-2">
                                <input type="text" name="score" readonly="readonly" class="form-control">
                            </div>
                            <label class="col-sm-1 control-label">风险结果:</label>
                            <div class="col-sm-2">
                                <input type="text" name="decision" readonly="readonly"class="form-control">
                            </div>
                            <label class="col-sm-1 control-label">手机在网时长:</label>
                            <div class="col-sm-2">
                                    <input type="hidden" name="mobileOnlineTime">
                                    <div id="mobile_online_time" readonly="readonly" class="form-control form-control-static"></div>
                            </div>
                    </div>
                    <div class="row">
                            <label class="col-sm-1 control-label">手机实名:</label>
                            <div class="col-sm-2">
                                <input type="text" name="mobileCertification" readonly="readonly"class="form-control">
                            </div>
                            <label class="col-sm-1 control-label">黑名单:</label>
                            <div class="col-sm-2">
                                <input type="text" name="isBlack" readonly="readonly"class="form-control">
                            </div>
                            <label class="col-sm-1 control-label">查询时间:</label>
                            <div class="col-sm-2">
                                <input type="text" name="ctimeStr" readonly="readonly"class="col-sm-8 form-control">
                            </div>
                    </div>
                </div>
            </fieldset>
    </div>
    <div class="item-row">
        <fieldset class="permission-box">
            <legend>客户历史订单</legend>
            <div id="detail_history_order" class="form-group"></div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>业务受理</legend>
            <div id="businessInfo">
                <form id="businessInfoForm">
                    <div class="form-horizontal">
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>电联情况:</label>
                            <div class="col-sm-3">
                                <div>
                                    <slt:select id="businessHandleTelContactSituationCode" obj="not_null"
                                                name="businessHandleTelContactSituationCode" classType="100000"
                                                defaultValue="true"
                                                keyWorld="${applyLoan.businessHandleTelContactSituationCode}"/>
                                </div>
                            </div>
                            <div class="col-sm-2"></div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>预约时间:</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="businessHandleAppiontmentTime"  obj="not_null"
                                       value="<fmt:formatDate value="${applyLoan.businessHandleAppiontmentTime}" pattern="yyyy-MM-dd HH:mm"/>">
                            </div>
                            <div class="col-sm-2"></div>
                        </div>
                        <div class="row">
                            <label for="businessHandleSuggest" class="col-sm-1 control-label"><span class="red">*</span>受理意见:</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="businessHandleSuggest" obj="not_null" maxlength="500"
                                          rows="8" value="${applyLoan.businessHandleSuggest}">${applyLoan.businessHandleSuggest}</textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 text-right padding-r-30">
                                <c:if test="${applyLoan.orderStatus ==1 }">
                                    <shiro:hasPermission name="business:changeAudit">
                                        <a href="javascript:void(0);" type="button" class="btn btn-primary change">换审核</a>
                                    </shiro:hasPermission>
                                    <shiro:hasPermission name="business:handle">
                                        <a href="javascript:void(0);" type="button" class="btn btn-danger business" data-status="-4">拒单</a>
                                    </shiro:hasPermission>
                                    <shiro:hasPermission name="business:handle">
                                        <a href="javascript:void(0);" type="button" class="btn btn-info business" data-status="-2">退回</a>
                                    </shiro:hasPermission>
                                    <shiro:hasPermission name="business:handle">
                                        <a href="javascript:void(0);" type="button" class="btn btn-primary business" data-status="2">保存</a>
                                    </shiro:hasPermission>
                                    <shiro:hasPermission name="business:handle">
                                        <a href="javascript:void(0);" type="button" class="btn btn-success business" data-status="1">同意</a>
                                    </shiro:hasPermission>
                                </c:if>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </fieldset>
    </div>

</div>
</body>

<%-- 引入js --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/radialIndicator/radialIndicator.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/hq.data.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/hq.risk.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/hq.credit.query.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/businessAccepted/businessHandleOper.js"></script>
<script type="text/javascript" src="${ctx}/js/third/cityselect/cityselect.js"></script>
</html>

