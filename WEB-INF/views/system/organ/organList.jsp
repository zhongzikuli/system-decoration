<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>单位管理</title>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/cityselect/cityLayout.css">
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>

<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <form id="pagerForm" action="${ctx}/organ/query.action" method="post">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <input type="hidden" value="${currentOrgType}" name="currentOrgType" id="currentOrgType">

            <div class="row">
                <div class="col-sm-2">
                    <shiro:hasPermission name="organ:create">
                        <a class="btn btn-primary btn-sm" onclick="createOrgan()">新增</a>
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
                        <%--<th><input type="checkbox" class="organListCheckAll" name="checkedAll"></th>--%>
                        <th width="2%">序号</th>
                        <th width="10%">单位名</th>
                        <th width="10%">单位类型</th>
                        <th width="12%">单位所在区域</th>
                        <th width="8%">管理员</th>
                        <th width="8%">单位电话</th>
                        <th width="10%">创建日期</th>
                        <th width="5%">状态</th>
                        <th width="12%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="9">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                                <%--<td style="width:2%;"><input type="checkbox" class="organListCheckOne cel" name="organList_input" value="${item.id}"></td>--%>
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td title="${item.orgName}">${item.orgName}</td>
                            <td title="${item.orgTypeName}">${item.orgTypeName}</td>
                            <td
                                title="${item.province}${item.city}${item.town}">${item.province}-${item.city}-${item.town}</td>
                            <td title="${item.userName}">${item.userName}</td>
                            <td title="${item.orgTel}">${item.orgTel}</td>
                            <td><fmt:formatDate value="${item.ctime}"
                                                            pattern="yyyy-MM-dd HH:mm"/></td>
                            <td>
                                <c:if test="${item.isvalid == 1}"><code
                                        class="text-success">${item.statusName}</code></c:if>
                                <c:if test="${item.isvalid == 0}"><code
                                        class="text-danger">${item.statusName}</code></c:if>
                            </td>
                            <td class="btn-cel">
                                <shiro:hasPermission name="organ:update">
                                    <a id="organ-update-btn${st.index+1}" onclick="editOrgan(${item.id})"
                                       class="btn btn-primary btn-xs">
                                        <i class="fa fa-edit"></i>编辑</a>
                                    <a id="organ-start-up-btn" onclick="startUpOrgan(${item.id})"
                                       class="btn btn-<c:if test="${item.isvalid == 1}">danger</c:if><c:if test="${item.isvalid != 1}">success</c:if> btn-xs">
                                        <i class="fa fa-edit"></i><c:if test="${item.isvalid == 1}">停用</c:if><c:if
                                            test="${item.isvalid != 1}">启用</c:if></a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="organ:view">
                                    <a id="organ-view-btn${st.index+1}" onclick="viewOrgan(${item.id})"
                                       class="btn btn-info btn-xs detail">
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
    <%@include file="/WEB-INF/views/include/page-bar.jsp" %>
</div>
</body>

<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/cityselect/cityselect.js"></script>

<script type="text/template" title="新增" id="createOrgan-dialog">
    <div class="ibox-content">
        <form id="createOrganForm" class="form-horizontal">
            <div id="createOrgan" class="form-content">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>单位名称:</label>
                        <div class="col-xs-8">
                            <input type="text" name="orgName" id="create-organ-name" class="form-control"
                                   autocomplete="off" check="validOrgForm(this)"
                                   tip="请输入单位名称" value=""
                                   url="<%=request.getContextPath() %>/organ/checkOrgName.action"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位简称:</label>
                        <div class="col-xs-8">
                            <input type="text" name="shortName" id="create-short-name" tip="请输入单位简称"
                                   class="form-control" autocomplete="off"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">法人代表:</label>
                        <div class="col-xs-8">
                            <input type="text" name="contacts" id="create-contacts" tip="请输入法人代表" autocomplete="off"
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>单位电话:</label>
                        <div class="col-xs-8">
                            <input type="text" name="orgTel" id="create-organ-tel" tip="请输入单位电话"
                                   class="form-control" check="validOrgForm(this)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位网址:</label>
                        <div class="col-xs-8">
                            <input type="text" name="url" id="create-organ-url" tip="请输入单位网址" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位类型:</label>
                        <div class="col-xs-8">
                            <select data-placeholder="组织类型" id="create-organ-type"
                                    class="org-type-chosen-select form-control" name="orgType">
                                <option value="1" selected>单位</option>
                                <option value="2">银行</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>管理员:</label>
                        <div class="col-xs-8">
                            <input type="text" name="userName" id="create-user-name" tip="请输入管理员" autocomplete="new-userName"
                                   class="form-control" url="<%=request.getContextPath()%>/organ/checkAdmin.action"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>密码:</label>
                        <div class="col-xs-8">
                            <input type="password" style="display:none">
                            <input type="password" name="userPassword" id="create-pass" tip="请输入密码" autocomplete="new-password"
                                   class="form-control" check="validOrgForm(this)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>手机号码:</label>
                        <div class="col-xs-8">
                            <input type="text" name="tel" id="create-tel" tip="请输入正确的管理员手机号码" obj="phone11"
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>真实姓名:</label>
                        <div class="col-xs-8">
                            <input type="text" name="userRealName" id="create-user-real-name" tip="请输入管理员真实姓名"
                                   obj="not_null"
                                   autocomplete="off" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位人数:</label>
                        <div class="col-xs-8">
                            <input type="text" name="employees" id="create-user-employees" tip="请输入员工人数"
                                   class="form-control"/>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="form-group">
                        <label class="pull-left control-label" style="width: 60px;margin-left: 26px;margin-right: 4px;"><font
                                color="red">*</font>单位地址:</label>
                        <div class="col-xs-10" style="padding: 0px; width:83%;">
                            <div class="col-sm-7" style="padding: 0px;">
                                <input type="text" name="province" obj="not_null"
                                       style="border-radius: 4px 0px 0px 4px;" id="create-organ-province" tip="请选择单位地址"
                                       class="form-control">
                            </div>
                            <div class="col-sm-5" style="padding: 0px;">
                                <input type="text" name="address" id="create-organ-address"
                                       style="border-radius: 0px 4px 4px 0px;" tip="请输入详细地址"
                                       class="col-xs-5 form-control" check="validOrgForm(this)">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label class="col-xs-2 control-label" style="padding-right: 30px;">单位简介:</label>
                        <div class="col-xs-10" style="padding-left: 0; margin-left: -27px;width:87%;">
                          	<textarea name="remark" id="create-organ-remark" tip="长度不能超过250个字符"
                                      style="width: 96%;" class="form-control"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage" style="position: absolute;top: 450px;left: 47%;">
            <input type="reset" class="reset hide"/>
            <a type="button" class="btn dialog-ok btn-primary">确定</a>
            <a type="button" class="btn dialog-close btn-default">取消</a>
        </div>
    </div>
</script>

<script type="text/template" title="编辑" id="editOrgan-dialog">
    <div class="ibox-content">
        <form id="editOrganForm" class="form-horizontal" autocomplete="off">
            <div id="editOrgan" class="form-content">
                <div class="col-sm-6">
                    <input type="hidden" name="id" id="edit-organ-id">
                    <input type="hidden" name="userId" id="edit-organ-userId">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>单位名称:</label>
                        <div class="col-xs-8">
                            <input type="text" name="orgName" id="edit-organ-name" tip="请输入单位名称" class="form-control"
                                   check="validOrgForm(this)"
                                   url="<%=request.getContextPath() %>/organ/checkOrgName.action" param=""/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位简称:</label>
                        <div class="col-xs-8">
                            <input type="text" name="shortName" id="edit-organ-short-name" tip="请输入单位简称"
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">法人代表:</label>
                        <div class="col-xs-8">
                            <input type="text" name="contacts" id="edit-organ-contacts" tip="请输入法人代表"
                                   class="form-control" ／>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>单位电话:</label>
                        <div class="col-xs-8">
                            <input type="text" name="orgTel" id="edit-organ-tel" tip="请输入单位电话" value=""
                                   class="form-control" check="validOrgForm(this)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位网址:</label>
                        <div class="col-xs-8">
                            <input type="text" name="url" id="edit-organ-url" tip="请输入单位网址" class="form-control"/>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位类型:</label>
                        <div class="col-xs-8">
                            <input type="hidden" id="edit-organ-type" class="form-control"/>
                            <input type="text" id="edit-organ-type-name" class="form-control" readonly="readonly"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>管理员:</label>
                        <div class="col-xs-8">
                            <input type="text" name="userName" id="edit-organ-username" tip="请输入管理员"
                                   class="form-control" check="validOrgForm(this)"
                                   url="<%=request.getContextPath() %>/organ/checkAdmin.action" param=""/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>密码:</label>
                        <div class="col-xs-8">
                            <input type="hidden" name="oldPassword" id="edit-organ-pass-old"/>
                            <input type="password" name="userPassword" id="edit-organ-pass" tip="请输入密码"
                                   autocomplete="off"
                                   class="form-control" check="validOrgForm(this)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>手机号码:</label>
                        <div class="col-xs-8">
                            <input type="text" name="tel" id="edit-tel" tip="请输入正确的管理员手机号码" obj="phone11"
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>真实姓名:</label>
                        <div class="col-xs-8">
                            <input type="text" name="userRealName" id="edit-user-real-name" tip="请输入管理员真实姓名"
                                   obj="not_null" autocomplete="off"
                                   class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位人数:</label>
                        <div class="col-xs-8">
                            <input type="text" name="employees" id="edit-user-employees" tip="请输入员工人数"
                                   class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label class="pull-left control-label" style="width: 60px;margin-left: 26px;margin-right: 4px;"><font
                                color="red">*</font>单位地址:</label>
                        <div class="col-xs-10" style=" padding: 0px; width:83%;">
                            <div class="col-sm-7" style=" padding: 0px;">
                                <input type="text" name="province" readonly="readonly"
                                       style="border-radius: 4px 0px 0px 4px;" id="edit-organ-province" tip="请选择单位地址"
                                       class="form-control" check="validOrgForm(this)">
                            </div>
                            <div class="col-sm-5" style=" padding: 0px;">
                                <input type="text" name="address" id="edit-organ-address"
                                       style="border-radius: 0px 4px 4px 0px;" tip="请输入详细地址"
                                       class="col-xs-5 form-control" check="validOrgForm(this)">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label class="col-xs-2 control-label" style="padding-right: 30px;">单位简介:</label>
                        <div class="col-xs-10" style="padding-left: 0; margin-left: -27px;width:87%;">
                           <textarea name="remark" id="edit-organ-remark" tip="长度不能超过250个字符"
                                     style="width:96%;" class="form-control" value=""></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage" style="position: absolute;top: 450px;left: 47%;">
            <input type="reset" class="reset hide"/>
            <a class="btn dialog-ok btn-primary" type="button">确定</a>
            <a class="btn dialog-close btn-default" type="button">取消</a>
        </div>
    </div>
</script>

<script type="text/template" title="查看" id="viewOrgan-dialog">
    <div class="ibox-content">
        <form id="viewOrganForm" class="form-horizontal" autocomplete="off">
            <div id="viewOrgan" class="form-content">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位名称:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-organ-name" readonly class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位简称:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-short-name" readonly class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">法人代表:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-organ-contacts" readonly class="form-control" ／>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位电话:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-organ-tel" class="form-control" readonly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位网址:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-organ-url" class="form-control" readonly/>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位类型:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-organ-type" readonly class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">管理员:</label>
                        <div class="col-xs-8">
                            <input type="text" id="view-username" readonly class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">密码:</label>
                        <div class="col-xs-8">
                            <input type="password" id="view-pass" readonly class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">手机号码:</label>
                        <div class="col-xs-8">
                            <input type="text" name="tel" id="view-tel" readonly="readonly" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">真实姓名:</label>
                        <div class="col-xs-8">
                            <input type="text" name="contacts" id="view-user-real-name" readonly="readonly"
                                   autocomplete="off" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">单位人数:</label>
                        <div class="col-xs-8">
                            <input type="text" name="employees" id="view-user-employees" readonly="readonly"
                                   class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label class="pull-left control-label" style="width: 60px;margin-left: 26px;margin-right: 4px;">单位地址:</label>
                        <div class="col-xs-10" style="padding: 0px; width:83%;">
                            <div class="col-xs-12 mg-none" style="padding: 0px;">
                                <input type="text" id="view-organ-address" readonly class="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label class="col-xs-2 control-label" style="padding-right: 30px;">单位简介:</label>
                        <div class="col-xs-10" style="padding-left: 0; margin-left: -27px;width:87%;">
                          	 <textarea id="view-organ-remark" style="width:96%;" readonly
                                       class="form-control"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog-manage" id="ViewBtn" style="position: absolute;top: 450px;left: 47%;">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>
<script type="text/javascript" src="${ctx}/js/mine/system/organ/organ.js"></script>
</html>
