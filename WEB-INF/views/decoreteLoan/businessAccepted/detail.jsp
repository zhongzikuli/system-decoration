<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>业务受理详情</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div class="row">
        <input type="hidden" id="order_id" value="${order.id}">
        <div class="col-sm-3">
            <h5><strong>订单详情</strong>
                --当前状态:<code><slt:OrderStatus showValue="${order.orderStatus}"/></code>
            </h5>
        </div>
        <div class="col-sm-9 text-right">
            <c:if test="${order.orderStatus ge 0 }">
                <shiro:hasPermission name="OrderDetail:backOrder">
                	<button type="button" class="btn btn-w-m btn-success back-order-btn">退回申请</button>
                </shiro:hasPermission>
            </c:if>
            <c:if test="${order.orderStatus gt 0}">
                <shiro:hasPermission name="OrderDetail:discardOrder">
                	<button type="button" class="btn btn-w-m btn-danger discard-order-btn">作废订单</button>
                </shiro:hasPermission>
            </c:if>
        </div>
    </div>
</div>

<div class="mod_basic">
    <div class="ibox-content">
        <div class="form-horizontal">
            <div class="form-group"></div>
            <div class="form-group">
                <div class="col-sm-3">
                    <label class="col-sm-4 col-x-label control-label">订单编号:</label>
                    <div class="col-x-label col-sm-8">
                        <input type="text" value="${order.orderNo}" readonly="readonly" class="form-control">
                    </div>
                </div>
                <div class="col-sm-3">
                    <label class="col-sm-4 col-x-label control-label">客户姓名:</label>
                    <div class="col-x-label col-sm-8">
                        <input id="real_name" type="text" value="${order.realName}" readonly="readonly"
                               class="form-control">
                    </div>
                </div>
                <div class="col-sm-3">
                    <label class="col-sm-4  col-x-label control-label">身份证号:</label>
                    <div class="col-sm-8  col-x-label">
                        <input id="card_no" type="text" value="${order.cardNo}" readonly="readonly"
                               class="col-sm-8 form-control">
                    </div>
                </div>
                <div class="col-sm-3">
                    <label class="col-sm-4  col-x-label control-label">手机号:</label>
                    <div class="col-sm-8  col-x-label">
                        <input type="text" value="${order.tel}" readonly="readonly" class="col-sm-8 form-control">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-3">
                    <label class="col-sm-4  col-x-label control-label">业务经理:</label>
                    <div class="col-sm-8  col-x-label">
                        <input type="text" value="${order.salerName}" readonly="readonly" class="form-control">
                    </div>
                </div>
                <div class="col-sm-3">
                    <label class="col-sm-4  col-x-label control-label">部门:</label>
                    <div class="col-sm-8  col-x-label">
                        <input type="text" value="${order.departmentName}" readonly="readonly" class="form-control">
                    </div>
                </div>
                <div class="col-sm-3">
                    <label class="col-sm-4  col-x-label control-label">贷款银行:</label>
                    <div class="col-sm-8  col-x-label">
                        <input type="text" value="${order.bankName}" readonly="readonly" class="form-control">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <table class="table table-bordered">
                    <thead>
                    <tr class="tr">
                        <th>申请贷款</th>
                        <th>业务受理</th>
                        <th>银行受理</th>
                        <th>银行审批</th>
                        <th>一次上门</th>
                        <th>一次放款</th>
                        <th>二次上门</th>
                        <th>二次放款</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <c:if test="${order.orderStatus ge 1 }"><code class="alert-success">是</code> </c:if>
                            <c:if test="${order.orderStatus le 0}">否</c:if>
                        </td>
                        <td>
                            <c:if test="${order.orderStatus ge 4 }"><code class="alert-success">是</code></c:if>
                            <c:if test="${order.orderStatus le 1}">否</c:if>
                        </td>
                        <td>
                            <c:if test="${order.orderStatus ge 8 }"><code class="alert-success">是</code></c:if>
                            <c:if test="${order.orderStatus le 4}">否</c:if>
                        </td>
                        <td>
                            <c:if test="${order.orderStatus ge 12 }"><code class="alert-success">是</code></c:if>
                            <c:if test="${order.orderStatus le 8}">否</c:if>
                        </td>
                        <td>
                            <c:if test="${order.orderStatus ge 16 }"><code class="alert-success">是</code></c:if>
                            <c:if test="${order.orderStatus le 12}">否</c:if>
                        </td>
                        <td>
                            <c:if test="${order.orderStatus ge 20 }"><code class="alert-success">是</code></c:if>
                            <c:if test="${order.orderStatus le 16}">否</c:if>
                        </td>
                        <td>
                            <c:if test="${order.orderStatus ge 24 }"><code class="alert-success">是</code></c:if>
                            <c:if test="${order.orderStatus le 20}">否</c:if>
                        </td>
                        <td>
                            <c:if test="${order.orderStatus ge 28 }"><code class="alert-success">是</code></c:if>
                            <c:if test="${order.orderStatus le 24}">否</c:if>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>


            <div class="form-group">
                <div class="tabs-container">
                    <ul class="nav nav-tabs">
                        <li class="active">
                            <a data-toggle="tab" href="#tab-1" aria-expanded="true">贷款信息</a>
                        </li>
                        <li class="">
                            <a data-toggle="tab" href="#tab-2" aria-expanded="false">审核信息</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="tab-1" class="tab-pane active">
                            <div class="panel-body">
                                <div class="form-group">
                                    <div class="col-sm-3">
                                        <label class="col-sm-4  col-x-label control-label">房产面积(㎡):</label>
                                        <div class="col-sm-8  col-x-label">
                                            <input type="text" value="${order.houseSpace}" readonly="readonly"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <label class="col-sm-4 col-x-label control-label">房产价值(元):</label>
                                        <div class="col-sm-8  col-x-label">
                                            <input type="text"
                                                   value='<sl:format type="number" show="${order.currentPrice}" pattern="#,##0.00"/>'
                                                   readonly="readonly" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <label class="col-sm-4  col-x-label control-label">房产地址:</label>
                                        <div class="col-sm-8  col-x-label">
                                            <input type="text"
                                                   value="${order.province}${order.city}${order.houseAddress}${order.town}"
                                                   readonly="readonly" class="col-sm-8 form-control">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <label class="col-sm-4  col-x-label control-label">贷款年限(年):</label>
                                        <div class="col-sm-8  col-x-label">
                                            <input type="text" value="${order.loanPeriodYear}" readonly="readonly"
                                                   class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-3">
                                        <label class="col-sm-4  col-x-label control-label">贷款额(元):</label>
                                        <div class="col-sm-8  col-x-label">
                                            <input type="text"
                                                   value='<sl:format type="number" show="${order.loanMoney}" pattern="#,##0.00"/>'
                                                   readonly="readonly" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <label class="col-sm-4  col-x-label control-label">银行费率(%):</label>
                                        <div class="col-sm-8  col-x-label">
                                            <input type="text" value="${order.bankRate}" readonly="readonly"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <label class="col-sm-4 col-x-label control-label">月还款(元):</label>
                                        <div class="col-sm-8 col-x-label">
                                            <input type="text"
                                                   value="${order.repayPrincipleAmountMonth + order.repayInterestAmountMonth}"
                                                   readonly="readonly" class="col-sm-8 form-control">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <label class="col-sm-4 col-x-label control-label">总利息(元):</label>
                                        <div class="col-sm-8 col-x-label">
                                            <input type="text"
                                                   value='<sl:format type="number" show="${order.repayTotalInterestAmountMonth}" pattern="#,##0.00"/>'
                                                   readonly="readonly" class="col-sm-8 form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-3">
                                        <label class="col-sm-4 col-x-label control-label">月还本金(元):</label>
                                        <div class="col-sm-8 col-x-label">
                                            <input type="text"
                                                   value='<sl:format type="number" show="${order.repayPrincipleAmountMonth}" pattern="#,##0.00"/>'
                                                   readonly="readonly" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <label class="col-sm-4 col-x-label control-label">月还利息(元):</label>
                                        <div class="col-sm-8 col-x-label">
                                            <input type="text"
                                                   value='<sl:format type="number" show="${order.repayInterestAmountMonth}" pattern="#,##0.00"/>'
                                                   readonly="readonly" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-1 col-x-label control-label">备注:</label>
                                    <div class="col-sm-11 col-x-label">
                                        <textarea rows="4" readonly="readonly"
                                                  class="form-control">${order.remark}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tab-2" class="tab-pane">
                            <div class="panel-body">
                                <fieldset class="permission-box">
                                    <legend>大数据征信</legend>
                                    <div class="form-group">
                                    	<div class="col-sm-3">
	                                        <c:if test="${order.creditQueryTongdun ne 1}">
	                                            <shiro:hasPermission name="OrderDetail:queryTDData">
	                                                <button class="btn btn-primary btn-xs query-credit-btn" type="button">征信查询</button>
	                                            </shiro:hasPermission>
	                                        </c:if>
	
	                                        <shiro:hasPermission name="OrderDetail:tdDataDetail">
	                                            <button type="button" class="btn btn-info btn-xs detail-credit-btn">查看详情</button>
	                                        </shiro:hasPermission>
	                                        <shiro:hasPermission name="OrderDetail:tdDataExport">
	                                            <button type="button" class="btn btn-info btn-xs">导出报告</button>
	                                        </shiro:hasPermission>
                                        </div>

                                    </div>
                                    <div id="risk_data_list" class="form-group">
                                        <div class="form-group">
                                        	<div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">风险结果:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" name="decision" readonly="readonly"
                                                           class="form-control">
                                                </div>
                                            </div>
                                           <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">查询时间:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" name="ctimeStr" readonly="readonly"
                                                           class="col-sm-8 form-control">
                                                </div>
                                            </div>
                                            <%--
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">手机在网时长:</label>
                                                <div class="col-sm-8 col-x-label">
                                                	<input type="hidden" name="mobileOnlineTime">
                                                    <div id="mobile_online_time" readonly="readonly" class="form-control form-control-static"></div>
                                                </div>
                                            </div>
                                             --%>
                                        </div>
                                        <%--
                                        <div class="form-group">
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">手机实名:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" name="mobileCertification" readonly="readonly"
                                                           class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">黑名单:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" name="isBlack" readonly="readonly"
                                                           class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">风险分:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" name="score" readonly="readonly"
                                                           class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                         --%>
                                    </div>
                                </fieldset>

                                <fieldset class="permission-box">
                                    <legend>客户历史订单</legend>
                                    <div id="detail_history_order" class="form-group"></div>
                                </fieldset>

                                <fieldset class="permission-box">
                                    <legend>审核信息</legend>
                                    <div id="detail_audit_list" class="form-group"></div>
                                </fieldset>

                                <c:if test="${order.orderStatus ge 4 }">
                                    <fieldset class="permission-box">
                                        <legend>业务受理</legend>
                                        <div class="form-group">
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">电联情况:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <div class="form-control" readonly="readonly">
                                                        <slt:dict classType="100000"
                                                                  keyWorld="${order.businessHandleTelContactSituationCode}"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">预约时间:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text"
                                                           value='<fmt:formatDate value="${order.businessHandleAppiontmentTime}" pattern="yyyy-MM-dd HH:mm"/>'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">处理人:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" value='${order.businessHandleUsername}'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">处理时间:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text"
                                                           value='<fmt:formatDate value="${order.businessHandleTime}" pattern="yyyy-MM-dd HH:mm"/>'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">处理结果:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <div class="form-control col-x-label none-border">
                                                        <c:if test="${order.businessHandleResult eq 1 }"><code
                                                                class="alert-success">同意</code></c:if>
                                                        <c:if test="${order.businessHandleResult eq -4 }"><code
                                                                class="alert-danger">拒绝</code></c:if>
                                                        <c:if test="${order.businessHandleResult eq -2 }"><code
                                                                class="alert-warning">退单</code></c:if>
                                                        <c:if test="${order.businessHandleResult eq 2 }"><code
                                                                class="alert-info">保存</code></c:if>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 col-x-label control-label">受理意见:</label>
                                            <div class="col-sm-11 col-x-label">
                                                <textarea rows="4" readonly="readonly"
                                                          class="form-control">${order.businessHandleSuggest}</textarea>
                                            </div>
                                        </div>
                                    </fieldset>
                                </c:if>

                                <c:if test="${order.orderStatus ge 8 }">
                                    <fieldset class="permission-box">
                                        <legend>银行受理</legend>
                                        <div class="form-group">
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">资料提交:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <div class="form-control" readonly="readonly">
                                                        <slt:dict classType="100000"
                                                                  keyWorld="${order.businessHandleTelContactSituationCode}"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">处理人:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" value='${order.bankHandleUsername}'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">处理时间:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text"
                                                           value='<fmt:formatDate value="${order.bankHandleTime}" pattern="yyyy-MM-dd HH:mm"/>'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">处理结果:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <div class="form-control col-x-label none-border">
                                                        <c:if test="${order.bankHandleResult eq 1 }"><code
                                                                class="alert-success">同意</code></c:if>
                                                        <c:if test="${order.bankHandleResult eq -4 }"><code
                                                                class="alert-danger">拒绝</code></c:if>
                                                        <c:if test="${order.bankHandleResult eq -2 }"><code
                                                                class="alert-warning">退单</code></c:if>
                                                        <c:if test="${order.bankHandleResult eq 2 }"><code
                                                                class="alert-info">保存</code></c:if>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 col-x-label control-label">受理意见:</label>
                                            <div class="col-sm-11 col-x-label">
                                                <textarea rows="4" readonly="readonly"
                                                          class="form-control">${order.bankHandleSuggest}</textarea>
                                            </div>
                                        </div>
                                    </fieldset>
                                </c:if>


                                <c:if test="${order.orderStatus ge 12 }">
                                    <fieldset class="permission-box">
                                        <legend>银行审批</legend>
                                        <div class="form-group">

                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批人:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" value='${order.bankAuditUsername}'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批时间:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text"
                                                           value='<fmt:formatDate value="${order.bankAuditTime}" pattern="yyyy-MM-dd HH:mm"/>'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批结果:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <div class="form-control col-x-label none-border">
                                                        <c:if test="${order.bankAuditResult eq 1 }"><code
                                                                class="alert-success">同意</code></c:if>
                                                        <c:if test="${order.bankAuditResult eq -4 }"><code
                                                                class="alert-danger">拒绝</code></c:if>
                                                        <c:if test="${order.bankAuditResult eq -2 }"><code
                                                                class="alert-warning">退单</code></c:if>
                                                        <c:if test="${order.bankAuditResult eq 2 }"><code
                                                                class="alert-info">保存</code></c:if>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 col-x-label control-label">审批意见:</label>
                                            <div class="col-sm-11 col-x-label">
                                                <textarea rows="4" readonly="readonly"
                                                          class="form-control">${order.bankAuditSuggest}</textarea>
                                            </div>
                                        </div>
                                    </fieldset>
                                </c:if>


                                <c:if test="${order.orderStatus ge 16 }">
                                    <fieldset class="permission-box">
                                        <legend>一次上门</legend>
                                        <div class="form-group">

                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批人:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" value='${order.firstVisitHandleUsername}'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批时间:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text"
                                                           value='<fmt:formatDate value="${order.firstVisitHandleTime}" pattern="yyyy-MM-dd HH:mm"/>'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批结果:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <div class="form-control col-x-label none-border">
                                                        <c:if test="${order.firstVisitHandleResult eq 1 }"><code
                                                                class="alert-success">同意</code></c:if>
                                                        <c:if test="${order.firstVisitHandleResult eq -4 }"><code
                                                                class="alert-danger">拒绝</code></c:if>
                                                        <c:if test="${order.firstVisitHandleResult eq -2 }"><code
                                                                class="alert-warning">退单</code></c:if>
                                                        <c:if test="${order.firstVisitHandleResult eq 2 }"><code
                                                                class="alert-info">保存</code></c:if>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 col-x-label control-label">审批意见:</label>
                                            <div class="col-sm-11 col-x-label">
                                                <textarea rows="4" readonly="readonly"
                                                          class="form-control">${order.firstVisitHandleSuggest}</textarea>
                                            </div>
                                        </div>
                                    </fieldset>
                                </c:if>


                                <c:if test="${order.orderStatus ge 20 }">
                                    <fieldset class="permission-box">
                                        <legend>一次放款</legend>
                                        <div class="form-group">
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">放款金额(元):</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text"
                                                           value='<sl:format type="number" show="${order.firstLendingMoney}" pattern="#,##0.00"/>'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批人:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" value='${order.firstLendingHandleUsername}'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批时间:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text"
                                                           value='<fmt:formatDate value="${order.firstLendingHandleTime}" pattern="yyyy-MM-dd HH:mm"/>'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批结果:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <div class="form-control col-x-label none-border">
                                                        <c:if test="${order.firstLendingHandleResult eq 1 }"><code
                                                                class="alert-success">同意</code></c:if>
                                                        <c:if test="${order.firstLendingHandleResult eq -4 }"><code
                                                                class="alert-danger">拒绝</code></c:if>
                                                        <c:if test="${order.firstLendingHandleResult eq -2 }"><code
                                                                class="alert-warning">退单</code></c:if>
                                                        <c:if test="${order.firstLendingHandleResult eq 2 }"><code
                                                                class="alert-info">保存</code></c:if>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 col-x-label control-label">审批意见:</label>
                                            <div class="col-sm-11 col-x-label">
                                                <textarea rows="4" readonly="readonly"
                                                          class="form-control">${order.firstLendingSuggest}</textarea>
                                            </div>
                                        </div>
                                    </fieldset>
                                </c:if>


                                <c:if test="${order.orderStatus ge 24 }">
                                    <fieldset class="permission-box">
                                        <legend>二次上门</legend>
                                        <div class="form-group">

                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批人:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" value='${order.secondVisitHandleUsername}'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批时间:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text"
                                                           value='<fmt:formatDate value="${order.secondVisitHandleTime}" pattern="yyyy-MM-dd HH:mm"/>'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批结果:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <div class="form-control col-x-label none-border">
                                                        <c:if test="${order.secondVisitHandleResult eq 1 }"><code
                                                                class="alert-success">同意</code></c:if>
                                                        <c:if test="${order.secondVisitHandleResult eq -4 }"><code
                                                                class="alert-danger">拒绝</code></c:if>
                                                        <c:if test="${order.secondVisitHandleResult eq -2 }"><code
                                                                class="alert-warning">退单</code></c:if>
                                                        <c:if test="${order.secondVisitHandleResult eq 2 }"><code
                                                                class="alert-info">保存</code></c:if>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 col-x-label control-label">审批意见:</label>
                                            <div class="col-sm-11 col-x-label">
                                                <textarea rows="4" readonly="readonly"
                                                          class="form-control">${order.secondVisitSuggest}</textarea>
                                            </div>
                                        </div>
                                    </fieldset>
                                </c:if>


                                <c:if test="${order.orderStatus ge 28 }">
                                    <fieldset class="permission-box">
                                        <legend>二次放款</legend>
                                        <div class="form-group">
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">放款金额(元):</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text"
                                                           value='<sl:format type="number" show="${order.secondLendingMoney}" pattern="#,##0.00"/>'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批人:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text" value='${order.secondLendingHandleUsername}'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批时间:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <input type="text"
                                                           value='<fmt:formatDate value="${order.secondLendingHandleTime}" pattern="yyyy-MM-dd HH:mm"/>'
                                                           readonly="readonly" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <label class="col-sm-4 col-x-label control-label">审批结果:</label>
                                                <div class="col-sm-8 col-x-label">
                                                    <div class="form-control col-x-label none-border">
                                                        <c:if test="${order.secondLendingHandleResult eq 1 }"><code
                                                                class="alert-success">同意</code></c:if>
                                                        <c:if test="${order.secondLendingHandleResult eq -4 }"><code
                                                                class="alert-danger">拒绝</code></c:if>
                                                        <c:if test="${order.secondLendingHandleResult eq -2 }"><code
                                                                class="alert-warning">退单</code></c:if>
                                                        <c:if test="${order.secondLendingHandleResult eq 2 }"><code
                                                                class="alert-info">保存</code></c:if>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-1 col-x-label control-label">审批意见:</label>
                                            <div class="col-sm-11 col-x-label">
                                                <textarea rows="4" readonly="readonly"
                                                          class="form-control">${order.secondLendingSuggest}</textarea>
                                            </div>
                                        </div>
                                    </fieldset>
                                </c:if>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
<%-- end basic --%>
</body>
<script type="text/template" title="退回订单" id="back-order-dialog">
    <div class="ibox-content">
        <form id="backOrderForm" class="form-horizontal">
            <div class="form-group mr-none">
                <div class="col-sm-12">
                    <label class="col-sm-2 control-label"><span class="red">*</span>备注:</label>
                    <div class="col-sm-10">
                        <textarea id="auditDescription" rowspan="4" class="form-control"
                                  check="validateLength100Bak(this)" tip="长度不能超过100个字符" obj="not_null"
                                  value=""></textarea>
                        <span class="help-block m-b-none text-left"><i class="fa fa-info-circle"></i>您已经填写<code><font
                                class="input">0</font></code>个字，还可添加<code><font
                                class="can-input">100</font></code>个</span>
                    </div>
                </div>
            </div>
            <div class="form-group mr-none">
                <div class="col-sm-12">
                    <label class="col-sm-2 control-label">审核人:</label>
                    <div class="col-sm-4">
                        <p class="form-control-static text-left">${auditUser}</p>
                    </div>
                    <label class="col-sm-2 control-label">审核日期:</label>
                    <div class="col-sm-4">
                        <p class="form-control-static text-left">${auditDate}</p>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage" id="CreateBtn">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="作废订单" id="discard-order-dialog">
    <div class="ibox-content">
        <form id="discardOrderForm" class="form-horizontal">
            <div class="form-group mr-none">
                <div class="col-sm-12">
                    <label class="col-sm-2 control-label"><span class="red">*</span>备注:</label>
                    <div class="col-sm-10">
                        <textarea id="discardDescription" rowspan="4" class="form-control"
                                  check="validateLength100Bak(this)" tip="长度不能超过100个字符" obj="not_null"
                                  value=""></textarea>
                        <span class="help-block m-b-none text-left"><i class="fa fa-info-circle"></i>您已经填写<code><font
                                class="input">0</font></code>个字，还可添加<code><font
                                class="can-input">100</font></code>个</span>
                    </div>
                </div>
            </div>
            <div class="form-group mr-none">
                <div class="col-sm-12">
                    <label class="col-sm-2 control-label">审核人:</label>
                    <div class="col-sm-4">
                        <p class="form-control-static text-left">${auditUser}</p>
                    </div>
                    <label class="col-sm-3 control-label">审核日期:</label>
                    <div class="col-sm-3">
                        <p class="form-control-static text-left">${auditDate}</p>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage" id="CreateBtn">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

<script type="text/template" title="审核详情查看" id="audit-detail-dialog">
    <div class="ibox-content form-horizontal">
        <div class="form-group none-margin">
            <div class="row none-margin">
                <label class="col-sm-3 control-label">审核类型:</label>
                <div class="col-sm-3">
                    <p id="audit_type" class="form-control-static text-left"></p>
                </div>
                <label class="col-sm-2 control-label">审核结果:</label>
                <div class="col-sm-4">
                    <p id="audit_result" class="form-control-static text-left"></p>
                </div>
            </div>
        </div>
        <div class="form-group none-margin">
            <div class="row none-margin">
                <label class="col-sm-3 control-label">审核人:</label>
                <div class="col-sm-3">
                    <p id="auditor_name" class="form-control-static text-left"></p>
                </div>
                <label class="col-sm-2 control-label">审核时间:</label>
                <div class="col-sm-4">
                    <p id="audit_time" class="form-control-static text-left"></p>
                </div>
            </div>
        </div>

        <div class="form-group none-margin none file-detail">
            <div class="row none-margin">
                <label class="col-sm-3 control-label">资料提交情况:</label>
                <div class="col-sm-9">
                    <p id="file_all_status" class="form-control-static text-left"></p>
                </div>
            </div>
        </div>
        <div class="form-group none-margin none file-detail">
            <div class="row none-margin">
                <label class="col-sm-3 control-label">未齐全证件:</label>
                <div class="col-sm-9">
                    <p id="file_not_1" class="form-control-static text-left"></p>
                </div>
            </div>
        </div>
        <div class="form-group none-margin none file-detail">
            <div class="row none-margin">
                <label class="col-sm-3 control-label">未齐全资信类:</label>
                <div class="col-sm-9">
                    <p id="file_not_2" class="form-control-static text-left"></p>
                </div>
            </div>
        </div>
        <div class="form-group none-margin none file-detail">
            <div class="row none-margin">
                <label class="col-sm-3 control-label">未齐全资产类:</label>
                <div class="col-sm-9">
                    <p id="file_not_3" class="form-control-static text-left"></p>
                </div>
            </div>
        </div>
        <div class="form-group none-margin none file-detail">
            <div class="row none-margin">
                <label class="col-sm-3 control-label">未齐全装修证明类:</label>
                <div class="col-sm-9">
                    <p id="file_not_4" class="form-control-static text-left"></p>
                </div>
            </div>
        </div>

        <div class="form-group none-margin none business-handle">
            <div class="row none-margin">
                <label class="col-sm-3 control-label">电联情况:</label>
                <div class="col-sm-3">
                    <p id="audit_tel_detail" class="form-control-static text-left"></p>
                </div>
                <label class="col-sm-2 control-label">预约时间:</label>
                <div class="col-sm-4">
                    <p id="audit_previou_time" class="form-control-static text-left"></p>
                </div>
            </div>
        </div>

        <div class="form-group none-margin none amount">
            <div class="row none-margin">
                <label class="col-sm-3 control-label">放款金额(元):</label>
                <div class="col-sm-9">
                    <p id="audit_amount" class="form-control-static text-left"></p>
                </div>
            </div>
        </div>

        <div class="form-group none-margin">
            <div class="row none-margin">
                <label class="col-sm-3 control-label">审核意见:</label>
                <div class="col-sm-9">
                    <p id="audit_suggest" class="form-control-static text-left suggest"></p>
                </div>
            </div>
        </div>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

<%-- 引入js --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/radialIndicator/radialIndicator.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/hq.data.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/hq.risk.config.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/hq.credit.query.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/decoreteLoan/businessAccepted/detail.js"></script>
</html>

