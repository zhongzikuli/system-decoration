<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>银行管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/js/third/cityselect/cityLayout.css">
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <form id="pagerForm" action="${ctx}/bank/query.action" method="post">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-2">
                    <shiro:hasPermission name="bank:add">
                        <a data-toggle="modal" class="btn btn-primary btn-sm btn-add">新增</a>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="bank:delete">
                        <a data-toggle="modal" class="btn btn-danger btn-sm btn-delete">删除</a>
                    </shiro:hasPermission>
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
                        <th style="width:10%;">银行名称</th>
                        <th style="width:5%;">银行简称</th>
                        <th style="width:5%;">银行标识</th>
                        <th style="width:8%;">城市区域</th>
                        <th style="width:5%;">最高可贷<br>额度方式</th>
                        <th style="width:5%;">面积m²<90可<br>贷额度（元）</th>
                        <th style="width:5%;">90≤面积m²≤140<br>可贷额度（元）</th>
                        <th style="width:5%;">面积m²>140<br>可贷额度（元）</th>
                        <th style="width:4%;">占房产价值<br>比例（%）</th>
                        <th style="width:4%;">每平面积<br>可贷额度（元）</th>
                        <th style="width:4%;">最高可贷<br>额度（元）</th>
                        <th style="width:8%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="14">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="bank_input" value="${item.id}"></td>
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td>${item.bankName}</td>
                            <td>${item.bankShortName}</td>
                            <td>${item.bankCode}</td>
                            <td>${item.bankProvince}${item.bankCity}</td>
                            <td>
                                <c:if test="${item.loanType == 1}">
                                    房屋面积比例
                                </c:if>
                                <c:if test="${item.loanType == 2}">
                                    房屋实际面积
                                </c:if>
                            </td>
                            <td>${item.lt90}</td>
                            <td>${item.gt90Lt140}</td>
                            <td>${item.gt140}</td>
                            <td>${item.ratioOfHouseMoney}</td>
                            <td>${item.perSquareMeter}</td>
                            <td>${item.maxLoanMoney}</td>
                            <td>
                                <shiro:hasPermission name="bank:update">
                                    <a href="#" data-id="${item.id}" class="btn btn-primary btn-xs btn-edit">
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
<script type="text/javascript" src="${ctx}/js/mine/system/bank/bank.js?version=2018228323"></script>
<script type="text/template" title="新增" id="bank-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="bankForm" class="form-horizontal">
            <div class="col-sm-12">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>银行:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="bankName" id="bankName"
                               check="bankForm(this)">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>银行简称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="bankShortName" id="bankShortName"
                               check="bankForm(this)">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>银行标识:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="bankCode" id="bankCode"
                               check="bankForm(this)" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>城市区域:</label>
                    <div class="col-xs-8">
                        <input id="province" obj="not_null" value="${vo.province}-${vo.city}"
                               name="province"
                               tip="地区不能为空" class="form-control" type="text">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>最高可贷额度方式:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select id="loan_type" check="bankForm(this)" class="form-control ">
                                <option value="">请选择</option>
                                <option value="1">房屋面积比列</option>
                                <option value="2">房屋实际面积</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="loan_type_1">
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>面积㎡ < 90
                            可贷额度(元):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="lt90" id="lt90">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>90 ≤ 面积㎡ ≤
                            140可贷额度(元):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="gt90Lt140" id="gt90Lt140">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>面积㎡ >
                            140可贷额度(元):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="gt140" id="gt140">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>占房产价值比例(%):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="ratioOfHouseMoney" id="ratioOfHouseMoney">
                        </div>
                    </div>
                </div>
                <div class="loan_type_2">
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>每平面积可贷额度(元):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="perSquareMeter" id="perSquareMeter">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>最高可贷额度(元):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="maxLoanMoney" id="maxLoanMoney">
                        </div>
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
<script type="text/template" title="编辑" id="bankEdit-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="bankForm_edit" class="form-horizontal">
            <div class="col-sm-12">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>银行:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="bankName_edit" id="bankName_edit"
                               check="bankForm(this)">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>银行简称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="bankShortName_edit" id="bankShortName_edit"
                               check="bankForm(this)">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span style="color:#ff2528;">*</span>银行标识:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" name="bankCode_edit" id="bankCode_edit"
                               check="bankForm(this)" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>城市区域:</label>
                    <div class="col-xs-8">
                        <input id="province_edit" obj="not_null" value="${vo.province}-${vo.city}"
                               name="province_edit"
                               tip="地区不能为空" class="form-control" type="text">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>最高可贷额度方式:</label>
                    <div class="col-xs-8">
                        <div obj="">
                            <select id="loan_type_edit" check="bankForm(this)" class="form-control ">
                                <option value="">请选择</option>
                                <option value="1">房屋面积比列</option>
                                <option value="2">房屋实际面积</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="loan_type_1_edit">
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>面积㎡ < 90
                            可贷额度(元):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="lt90_edit" id="lt90_edit">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>90 ≤ 面积㎡ ≤
                            140可贷额度(元):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="gt90Lt140_edit" id="gt90Lt140_edit">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>面积㎡ >
                            140可贷额度(元):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="gt140_edit" id="gt140_edit">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>占房产价值比例(%):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="ratioOfHouseMoney_edit"
                                   id="ratioOfHouseMoney_edit">
                        </div>
                    </div>
                </div>
                <div class="loan_type_2_edit">
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>每平面积可贷额度(元):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="perSquareMeter_edit" id="perSquareMeter_edit">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label padding-t-0"><span class="red">*</span>最高可贷额度(元):</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="maxLoanMoney_edit" id="maxLoanMoney_edit">
                        </div>
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
<script type="text/javascript" src="${ctx}/js/third/cityselect/cityselect.js"></script>

</html>
