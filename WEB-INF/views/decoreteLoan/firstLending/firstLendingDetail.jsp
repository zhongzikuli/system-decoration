<%@ taglib prefix="slt" uri="/slt" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>一次放款详情</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="main-wrapper flex">
<div class="mod_header">
    <!--其他部分页面引入-->
    <div class="row">
        <input value="${acceptId}" id="acceptId" type="hidden">
        <div class="col-sm-12 text-right">
           <%-- <div class="form-inline">
                <a class="btn btn-sm btn-info" id="firstLendingBackList">返回列表</a>
            </div>--%>
        </div>
    </div>
</div>
<div class="mod_basic no-border animated">
    <div class="item-row">
        <fieldset>
            <legend>基本信息</legend>
            <div id="customerInfo">
                <form id="customerInfoForm">
                    <div class="form-horizontal">
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>客户姓名:</label>
                            <div class="col-sm-2">
                                <input type="text" id="real_name" class="form-control" value="${order.realName}"
                                       disabled>
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>身份证号:</label>
                            <div class="col-sm-2">
                                <input type="text" id="card_no" class="form-control" disabled value="${order.cardNo}">
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>手机号:</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" disabled value="${order.tel}">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>房产面积(m²):</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" disabled value="${order.houseSpace}">
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>房产地址:</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" disabled
                                       value="${order.province}-${order.city}-${order.town}" name="province">
                            </div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" disabled value="${order.houseAddress}">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>房产价值(元):</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" disabled value="${order.currentPrice}">
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
                            <label class="col-sm-1 control-label"><span class="red">*</span>贷款银行:</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" disabled value="${order.bankName}">
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>贷款年限:</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" disabled value="${order.loanPeriodYear}">
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>贷款额(元):</label>
                            <div class="col-sm-1">
                                <input type="text" class="form-control" disabled value="${order.loanMoney}">
                            </div>
                            <%--<div class="col-sm-1">--%>
                            <%--（说明：最高可贷30000）--%>
                            <%--</div>--%>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>银行利率(%):</label>
                            <div class="col-sm-2">
                                <label class="control-label" disabled>${order.bankRate}</label>
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>总利息(元):</label>
                            <div class="col-sm-2">
                                <label class="control-label" disabled>${order.repayTotalInterestAmountMonth}</label>
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>月还款(元):</label>
                            <div class="col-sm-2">
                                <label class="control-label"
                                       disabled>${order.repayPrincipleAmountMonth + order.repayInterestAmountMonth}</label>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>月还本金(元):</label>
                            <div class="col-sm-2">
                                <label class="control-label" disabled>${order.repayPrincipleAmountMonth}</label>
                            </div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>月还利息(元):</label>
                            <div class="col-sm-2">
                                <label class="control-label" disabled>${order.repayInterestAmountMonth}</label>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>备注:</label>
                            <div class="col-sm-10">
                                <textarea maxlength="1000" name="remark" class="form-control"
                                          style="height:120px" disabled >${order.remark}</textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </fieldset>
    </div>

    <div class="item-row">
        <fieldset>
            <legend>大数据征信</legend>
            <div class="form-horizontal">
                <div class="col-sm-12 text-left padding-r-30">
                    <div class="form-group">
                            <c:if test="${order.creditQueryTongdun ne 1}">
                                <shiro:hasPermission name="firstLending:queryTDData">
                                    <button class="btn btn-primary btn-xs query-credit-btn" type="button">征信查询</button>
                                </shiro:hasPermission>
                            </c:if>
                            <shiro:hasPermission name="firstLending:tdDataDetail">
                                <button type="button" class="btn btn-info btn-xs detail-credit-btn">查看详情
                                </button>
                            </shiro:hasPermission>
                            <shiro:hasPermission name="bankHandle:tdDataExport">
                              <%--  <button type="button" class="btn btn-w-m btn-info">导出报告</button>--%>
                            </shiro:hasPermission>
                    </div>
                </div>
            </div>
            <div id="risk_data_list" class="form-horizontal">
                <div class="row">
                    <label class="col-sm-1 control-label">风险分:</label>
                    <div class="col-sm-2">
                        <input type="text" name="score" disabled class="form-control">
                    </div>
                    <label class="col-sm-1 control-label">风险结果:</label>
                    <div class="col-sm-2">
                        <input type="text" name="decision" disabled class="form-control">
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
                        <input type="text" name="mobileCertification" disabled class="form-control">
                    </div>
                    <label class="col-sm-1 control-label">黑名单:</label>
                    <div class="col-sm-2">
                        <input type="text" name="isBlack" disabled class="form-control">
                    </div>
                    <label class="col-sm-1 control-label">查询时间:</label>
                    <div class="col-sm-2">
                        <input type="text" name="ctimeStr" disabled class="form-control">
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <input type="hidden" id="order_id" value="${order.id}">
        <fieldset class="permission-box">
            <legend>客户历史订单</legend>
            <div id="detail_history_order" class="form-horizontal"></div>
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
                                <div class="form-control" disabled>
                                    <slt:dict classType="100000"
                                              keyWorld="${order.businessHandleTelContactSituationCode}"/>
                                </div>
                            </div>
                            <div class="col-sm-2"></div>
                            <label class="col-sm-1 control-label"><span class="red">*</span>预约时间:</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" disabled
                                       value="<fmt:formatDate value="${order.businessHandleAppiontmentTime}" pattern="yyyy-MM-dd HH:mm"/>">
                            </div>
                            <div class="col-sm-2"></div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>受理意见:</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" disabled maxlength="1000"
                                          rows="8">${order.businessHandleSuggest}</textarea>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label">操作人:</label>
                            <div class="col-sm-3">
                                <label class="control-label" disabled>${order.businessHandleUsername}</label>
                            </div>
                            <div class="col-sm-2"></div>
                            <label class="col-sm-1 control-label">操作时间:</label>
                            <div class="col-sm-3">
                                <label class="control-label" disabled>
                                    <fmt:formatDate value="${order.businessHandleTime}" pattern="yyyy-MM-dd HH:mm"/>
                                </label>
                            </div>
                            <div class="col-sm-2"></div>
                        </div>
                    </div>
                </form>
            </div>
        </fieldset>
    </div>

    <div class="item-row">
        <fieldset>
            <%--<form id="bankHandleCommonForm">--%>
            <legend>银行受理</legend>
            <div id="bankHandleDiv">
                <form id="bankHandleForm">
                    <div class="form-horizontal">
                        <div class="row">
                            <label class="col-sm-1 control-label">
                                <span class="red">*</span>资料提交情况:
                            </label>
                            <div class="col-sm-2">
                                <div>
                                    <select id="bankHandleFileStatus" name="bankHandleFileStatus"
                                            disabled class="form-control chosen-select">
                                        <option value="">请选择</option>

                                        <c:if test="${bankHandle != null}">
                                            <c:choose>
                                                <c:when test="${bankHandle.bankHandleFileStatus == 1}">
                                                    <option value="0">未齐全</option>
                                                    <option value="1" selected>已齐全</option>
                                                    <c:set var="bankHandleFileStatus" value="disabled = disabled"/>
                                                </c:when>
                                                <c:when test="${bankHandle.bankHandleFileStatus == 0}">
                                                    <option value="0" selected>未齐全</option>
                                                    <option value="1">已齐全</option>
                                                </c:when>
                                                <c:otherwise>
                                                    <option value="0">未齐全</option>
                                                    <option value="1">已齐全</option>
                                                </c:otherwise>
                                            </c:choose>
                                        </c:if>
                                        <c:if test="${bankHandle == null}">
                                            <option value="0">未齐全</option>
                                            <option value="1">已齐全</option>
                                        </c:if>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label">未齐全证件:</label>
                            <c:if test="${bankHandelTypeOne != null && bankHandelTypeOne.size() > 0}">
                                <c:forEach var="item" items="${bankHandelTypeOne}" varStatus="st">
                                    <c:choose>
                                        <c:when test="${item =='身份证'}">
                                            <c:set var="TypeOneOne" value="checked"/>
                                        </c:when>
                                        <c:when test="${item =='配偶身份证'}">
                                            <c:set var="TypeOneTwo" value="checked"/>
                                        </c:when>
                                        <c:when test="${item =='户口本'}">
                                            <c:set var="TypeOneThree" value="checked"/>
                                        </c:when>
                                        <c:when test="${item =='军官证'}">
                                            <c:set var="TypeOneFour" value="checked"/>
                                        </c:when>
                                        <c:when test="${item =='护照'}">
                                            <c:set var="TypeOneFive" value="checked"/>
                                        </c:when>
                                        <c:otherwise>
                                            <c:set var="TypeOneSix" value="checked"/>
                                        </c:otherwise>
                                    </c:choose>
                                </c:forEach>
                            </c:if>
                            <label class="label-item"><input type="checkbox" value="身份证" class="i-checks" disabled
                                                             name="bankHandelTypeOne" ${TypeOneOne} ${bankHandleFileStatus}>身份证</label>
                            <label class="label-item"><input type="checkbox" value="配偶身份证" class="i-checks" disabled
                                                             name="bankHandelTypeOne" ${TypeOneTwo} ${bankHandleFileStatus}>配偶身份证</label>
                            <label class="label-item"><input type="checkbox" value="户口本" class="i-checks" disabled
                                                             name="bankHandelTypeOne" ${TypeOneThree} ${bankHandleFileStatus}>户口本</label>
                            <label class="label-item"><input type="checkbox" value="军官证" class="i-checks" disabled
                                                             name="bankHandelTypeOne" ${TypeOneFour} ${bankHandleFileStatus}>军官证</label>
                            <label class="label-item"><input type="checkbox" value="护照" name="bankHandelTypeOne"
                                                             class="i-checks" ${TypeOneFive} ${bankHandleFileStatus}>护照</label>
                            <label class="label-item"><input type="checkbox" value="港澳台居民通行证" class="i-checks" disabled
                                                             name="bankHandelTypeOne" ${TypeOneSix} ${bankHandleFileStatus}>港澳台居民通行证</label>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label">未齐全资信类:</label>
                            <c:if test="${bankHandelTypeTwo != null && bankHandelTypeTwo.size() > 0}">
                                <c:forEach var="item" items="${bankHandelTypeTwo}" varStatus="st">
                                    <c:choose>
                                        <c:when test="${item =='工作证明'}">
                                            <c:set var="TypeTwoOne" value="checked"/>
                                        </c:when>
                                        <c:when test="${item =='流水证明'}">
                                            <c:set var="TypeTwoTwo" value="checked"/>
                                        </c:when>
                                        <c:otherwise>
                                            <c:set var="TypeTwoThree" value="checked"/>
                                        </c:otherwise>
                                    </c:choose>
                                </c:forEach>
                            </c:if>
                            <label class="label-item"><input type="checkbox" value="工作证明" class="i-checks" disabled
                                                             name="bankHandelTypeTwo" ${TypeTwoOne} ${bankHandleFileStatus}>工作证明</label>
                            <label class="label-item"><input type="checkbox" value="流水证明" class="i-checks" disabled
                                                             name="bankHandelTypeTwo" ${TypeTwoTwo} ${bankHandleFileStatus}>流水证明</label>
                            <label class="label-item"><input type="checkbox" value="社保证明" class="i-checks" disabled
                                                             name="bankHandelTypeTwo" ${TypeTwoThree} ${bankHandleFileStatus}>社保证明</label>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label">未齐全资产类:</label>
                            <c:if test="${bankHandelTypeThree != null && bankHandelTypeThree.size() > 0}">
                                <c:forEach var="item" items="${bankHandelTypeThree}" varStatus="st">
                                    <c:choose>
                                        <c:when test="${item =='房产证'}">
                                            <c:set var="TypeThreeOne" value="checked"/>
                                        </c:when>
                                        <c:when test="${item =='购房合同'}">
                                            <c:set var="TypeThreeTwo" value="checked"/>
                                        </c:when>
                                        <c:otherwise>
                                            <c:set var="TypeThreeThree" value="checked"/>
                                        </c:otherwise>
                                    </c:choose>
                                </c:forEach>
                            </c:if>
                            <label class="label-item"><input type="checkbox" value="房产证" class="i-checks" disabled
                                                             name="bankHandelTypeThree" ${TypeThreeOne} ${bankHandleFileStatus}>房产证</label>
                            <label class="label-item"><input type="checkbox" value="购房合同" class="i-checks" disabled
                                                             name="bankHandelTypeThree" ${TypeThreeTwo} ${bankHandleFileStatus}>购房合同</label>
                            <label class="label-item"><input type="checkbox" value="行驶证" class="i-checks" disabled
                                                             name="bankHandelTypeThree" ${TypeThreeThree} ${bankHandleFileStatus}>行驶证</label>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label">未齐全装修证明类:</label>
                            <c:if test="${bankHandelTypeFour != null && bankHandelTypeFour.size() > 0}">
                                <c:forEach var="item" items="${bankHandelTypeFour}" varStatus="st">
                                    <c:choose>
                                        <c:when test="${item =='装修合同'}">
                                            <c:set var="TypeFourOne" value="checked"/>
                                        </c:when>
                                        <c:when test="${item =='商品清单'}">
                                            <c:set var="TypeFourTwo" value="checked"/>
                                        </c:when>
                                        <c:otherwise>
                                            <c:set var="TypeFourThree" value="checked"/>
                                        </c:otherwise>
                                    </c:choose>
                                </c:forEach>
                            </c:if>
                            <label class="label-item"><input type="checkbox" value="装修合同" class="i-checks" disabled
                                                             name="bankHandelTypeFour" ${TypeFourOne} ${bankHandleFileStatus}>装修合同</label>
                            <label class="label-item"><input type="checkbox" value="商品清单" class="i-checks" disabled
                                                             name="bankHandelTypeFour" ${TypeFourTwo} ${bankHandleFileStatus}>商品清单</label>
                            <label class="label-item"><input type="checkbox" value="收据/发票" class="i-checks" disabled
                                                             name="bankHandelTypeFour" ${TypeFourThree} ${bankHandleFileStatus}>收据/发票</label>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>受理意见:</label>
                            <div class="col-sm-10">
                                <div>
                                    <textarea class="form-control" id="bankHandleSuggest" disabled
                                              maxlength="1000" rows="8"><c:if
                                            test="${bankHandle != null}">${bankHandle.bankHandleSuggest}</c:if></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label">操作人:</label>
                            <div class="col-sm-3">
                                <label class="control-label" disabled>${order.bankHandleUsername}</label>
                            </div>
                            <div class="col-sm-2"></div>
                            <label class="col-sm-1 control-label">操作时间:</label>
                            <div class="col-sm-3">
                                <label class="control-label" disabled>
                                    <fmt:formatDate value="${order.bankHandleTime}" pattern="yyyy-MM-dd HH:mm"/>
                                </label>
                            </div>
                            <div class="col-sm-2"></div>
                        </div>
                    </div>
                </form>
            </div>
        </fieldset>
    </div>
    <div class="item-row">
        <fieldset>
            <legend>银行审批</legend>
            <div id="bankAuditDiv">
                <form id="bankAuditForm">
                    <div class="form-horizontal">
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>审批意见:</label>
                            <div class="col-sm-10">
                                <div>
                                    <textarea class="form-control" id="bankAuditSuggest" disabled
                                              rows="8"><c:if
                                            test="${bankAudit != null}">${bankAudit.suggest}</c:if></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label">操作人:</label>
                            <div class="col-sm-3">
                                <label class="control-label" disabled>${order.bankAuditUsername}</label>
                            </div>
                            <div class="col-sm-2"></div>
                            <label class="col-sm-1 control-label">操作时间:</label>
                            <div class="col-sm-3">
                                <label class="control-label" disabled>
                                    <fmt:formatDate value="${order.bankAuditTime}" pattern="yyyy-MM-dd HH:mm"/>
                                </label>
                            </div>
                            <div class="col-sm-2"></div>
                        </div>
                    </div>
                </form>
            </div>
        </fieldset>
        <fieldset>
            <legend>一次上门</legend>
            <div id="firstVisitDiv">
                <form id="firstVisitForm">
                    <div class="form-horizontal">
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>审批意见:</label>
                            <div class="col-sm-10">
                                <div>
                                    <textarea class="form-control" id="firstVisitSuggest"  disabled rows="8"><c:if
                                            test="${firstVisit != null}">${firstVisit.suggest}</c:if></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label">操作人:</label>
                            <div class="col-sm-3">
                                <label class="control-label" disabled>${order.firstVisitHandleUsername}</label>
                            </div>
                            <div class="col-sm-2"></div>
                            <label class="col-sm-1 control-label">操作时间:</label>
                            <div class="col-sm-3">
                                <label class="control-label" disabled>
                                    <fmt:formatDate value="${order.firstVisitHandleTime}" pattern="yyyy-MM-dd HH:mm"/>
                                </label>
                            </div>
                            <div class="col-sm-2"></div>
                        </div>
                    </div>
                </form>
            </div>
        </fieldset>
        <fieldset>
            <legend>一次放款</legend>
            <div id="firstLendingDiv">
                <form id="firstLendingForm">
                    <div class="form-horizontal">

                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>放款金额(元):</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control"   onkeyup="value=value.replace(/[^0123456789.]/g,'')" tip="放款金额不能为空，请重新输入" reg="not_null" name="money" id="search-money" value="${firstLending.money}">

                            </div>
                            <label class="col-sm-1 control-label">贷款额(元):</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control"   disabled name="loanMoney"
                                       value='<sl:format type="number" show="${firstLending.loanMoney}" pattern="#,##0.00"/>'>
                                <input  type="hidden" class="form-control"  id="search-loan-money" value="${firstLending.loanMoney}">

                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-1 control-label"><span class="red">*</span>放款备注:</label>
                            <div class="col-sm-10">
                                <div>
                                    <textarea class="form-control" id="firstLendingSuggest" tip="不能为空，请重新输入"
                                              reg="not_null"  rows="8"><c:if
                                            test="${firstLending != null}">${firstLending.suggest}</c:if></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 text-right padding-r-30">
                                <shiro:hasPermission name="firstLending:changeAudit">
                                    <a class="btn btn-primary btn-sm" id="firstLendingChangeAuditBtn">换审核</a>
                                </shiro:hasPermission>

                                <shiro:hasPermission name="firstLending:audit">
                                    <a class="btn btn-danger btn-sm" id="firstLendingRefuseOrderBtn"
                                       data-status="-4">拒单</a>
                                </shiro:hasPermission>

                                <shiro:hasPermission name="firstLending:audit">
                                    <a class="btn btn-info btn-sm" id="firstLendingBackApplyBtn"
                                       data-status="-2">退回申请</a>
                                </shiro:hasPermission>

                                <shiro:hasPermission name="firstLending:audit">
                                    <a class="btn btn-info btn-sm" id="firstLendingOrderApplyBtn"
                                       data-status="12">退回到一次上门</a>
                                </shiro:hasPermission>

                                <shiro:hasPermission name="firstLending:audit">
                                    <a class="btn btn-primary btn-sm" id="firstLendingSaveBtn"
                                       data-status="16">保存</a>
                                </shiro:hasPermission>

                                <shiro:hasPermission name="firstLending:audit">
                                    <a class="btn btn-success btn-sm" id="firstLendingAgreeBtn"
                                       data-status="20">同意</a>
                                </shiro:hasPermission>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </fieldset>
    </div>
</div>
</div>
</body>

<%-- 引入js --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/validate.win.js"></script>
<script type="text/javascript" src="${ctx}/js/third/radialIndicator/radialIndicator.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/hq.data.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/hq.risk.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/hq.credit.query.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/firstLending/firstLendingDetail.js"></script>
</html>

