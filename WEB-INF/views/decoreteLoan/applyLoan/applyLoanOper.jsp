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
    <div class="row">
        <div class="col-sm-12">
            <button type="button" class="btn btn-success discard-order-btn">刷新</button>
        </div>
    </div>
</div>
<div class="mod_basic animated" id="applyLoanDiv">
    <input value="${applyLoan.id}" id="applyLoanId" type="hidden">
    <div class="ibox-content">
        <div class="form-horizontal">
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
                                        <input type="text" class="form-control" id="loan-cardNo"
                                               value="${applyLoan.cardNo}"
                                               obj="idCard" maxlength="18">
                                    </div>
                                    <label for="loan-tel" class="col-sm-1 control-label"><span
                                            class="red">*</span>手机号:</label>
                                    <div class="col-sm-2">
                                        <input type="text" class="form-control" id="loan-tel" value="${applyLoan.tel}"
                                               obj="phone11" maxlength="11">
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="loan-houseSpace" class="col-sm-1 control-label"><span
                                            class="red">*</span>房产面积(m²):</label>
                                    <div class="col-sm-2">
                                        <input type="text" class="form-control loanInfoClean" id="loan-houseSpace"
                                               value="${applyLoan.houseSpace}" obj="p_float" maxlength="13"
                                               onkeyup="value=value.replace(/[^0123456789.]/g,'')">
                                    </div>
                                    <label for="loan-province" class="col-sm-1 control-label"><span
                                            class="red">*</span>房产地址:</label>
                                    <div class="col-sm-2">
                                        <input type="text" class="form-control" id="loan-province" obj="not_null"
                                               value="${applyLoan.province}"
                                               name="province" tip="地区不能为空" obj="not_null" maxlength="100">
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="loan-houseAddress"
                                               value="${applyLoan.houseAddress}" obj="not_null" maxlength="100">
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="loan-currentPrice" class="col-sm-1 control-label"><span
                                            class="red">*</span>房产价值(元):</label>
                                    <div class="col-sm-2">
                                        <input type="text" class="form-control loanInfoClean" id="loan-currentPrice"
                                               value='<sl:format type="number" show="${applyLoan.currentPrice}" pattern="#,##0.00"/>'
                                               obj="p_float" maxlength="13"
                                               onkeyup="value=value.replace(/[^0123456789.]/g,'')">
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
                                            <select name="bankId" id="loan-bank"
                                                    class="form-control type chosen-select">
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
                                            <select name="years" id="loan-years"
                                                    class="form-control type chosen-select">
                                                <option value="">请选择</option>
                                                <c:forEach items="${yearsList}" var="yearsItem">
                                                    <option value="${yearsItem.years}"
                                                            <c:if test="${yearsItem.years eq applyLoan.loanPeriodYear}">selected</c:if>
                                                    >${yearsItem.years}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                    <label for="loan-loanMoney" class="col-sm-1 control-label"><span
                                            class="red">*</span>贷款额(元):</label>
                                    <div class="col-sm-1">
                                        <input type="text" class="form-control" id="loan-loanMoney"
                                               value='<sl:format type="number" show="${applyLoan.loanMoney}" pattern="#,##0.00"/>'
                                               obj="p_float" maxlength="13"
                                               onkeyup="value=value.replace(/[^0123456789.]/g,'')">
                                    </div>
                                    <div class="col-sm-2">
                                        <label class="control-label">(说明：最高可贷<label
                                                id="loan-maxLoanMoney">${maxLoanMoney}</label>元)</label>
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
                                          style="height:120px" id="loan-remark"
                                          value="${applyLoan.remark}">${applyLoan.remark}</textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </fieldset>
            </div>
            <div class="item-row">
                <div class="dialog-manage text-center">
                    <button href="javascript:void(0);" type="button" class="btn btn-primary submit-btn"
                            id="applyLoanSubmit">提交
                    </button>
                    <button href="javascript:void(0);" type="button" class="btn btn-primary submit-btn"
                            id="applyLoanSave">
                        保存
                    </button>
                    <button href="javascript:void(0);" type="button" class="btn btn-default" id="applyLoanCancel">取消
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</body>

<%-- 引入js --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/cityselect/cityselect.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/applyLoan/applyLoanOper.js"></script>
</html>

