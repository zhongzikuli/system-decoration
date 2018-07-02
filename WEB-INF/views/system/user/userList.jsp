<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>用户管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/js/third/webuploader/css/webuploader.css">
</head>

<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <div id="hiddenForm">
            <input type="hidden" name="roleId" value="${paramMap.roleId}"/>
            <input type="hidden" name="departmentId" value="${paramMap.departmentId}"/>
            <input type="hidden" name="searchUserTel" value="${paramMap.tel}"/>
            <input type="hidden" name="searchLoginName" value="${paramMap.userName}"/>
        </div>
        <form id="pagerForm" action="${ctx}/user/query.action" method="post">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <input type="hidden" value="${currentOrgType}" name="currentOrgType" id="currentOrgType">
            <div class="row">
                <div class="col-sm-4">
                    <shiro:hasPermission name="user:create">
                        <a data-toggle="modal" class="btn btn-primary btn-sm add-btn">新增</a>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="user:resetPwd">
                        <a data-toggle="modal" class="btn btn-info btn-sm reset-btn">重置密码</a>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="user:delete">
                        <a data-toggle="modal" class="btn btn-danger btn-sm delete-btn">删除</a>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="user:exportExcel">
                        <a data-toggle="modal" class="btn btn-info btn-sm" onclick="exportExcel()">下载模版</a>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="user:importExcel">
                        <a data-toggle="modal" class="btn btn-success btn-sm" onclick="importExcel()">导入</a>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="user:exportUserInfoList">
                        <a data-toggle="modal" class="btn btn-info btn-sm" onclick="exportUserInfoList()">导出人事用户</a>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="user:importUserInfoList">
                        <a data-toggle="modal" class="btn btn-success btn-sm" onclick="importAllUserExcel()">导入人事用户</a>
                    </shiro:hasPermission>
                </div>
                <div class="col-sm-8 text-right">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label label">部门:</label>
                            <select class="form-control chosen-select" id="departmentId" name="departmentId">
                                <option value="">请选择</option>
                                <c:forEach items="${departments}" var="department">
                                    <option value="${department.id}"
                                            <c:if test="${department.id eq departmentId}">selected</c:if>>
                                            ${department.name}
                                    </option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="control-label label">角色:</label>
                            <select class="form-control chosen-select" id="roleId" name="roleId">
                                <option value="">请选择</option>
                                <c:forEach items="${roles}" var="role">
                                    <option value="${role.id}" <c:if test="${role.id eq roleId}">selected</c:if>>
                                            ${role.name}
                                    </option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="control-label label">真实姓名:</label>
                            <input type="text" class="form-control" name="searchLoginName" id="search-login-name"
                                   value="${paramMap.userName}"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label label">手机号:</label>
                            <input type="text" class="form-control" name="searchUserTel" id="search-user-tel"
                                   value="${paramMap.tel}"/>
                            <a class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="mod_basic">
        <div class="ibox-content full-height no-padding">
            <div class="table-responsive full-height" id="result">
                <table class="table table-hover table-height table-striped">
                    <thead>
                    <tr>
                        <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:10%;">真实姓名</th>
                        <th style="width:10%;">登录账号</th>
                        <th style="width:10%;">手机号</th>
                        <c:if test="${paramMap.isAdmin == 1}">
                            <th style="width:11%;">所属单位</th>
                        </c:if>
                        <c:if test="${paramMap.isAdmin != 1}">
                            <th style="width:11%;">所属部门</th>
                        </c:if>
                        <th style="width:13%;">角色</th>
                        <th style="width:7%;">用户等级</th>
                        <th style="width:20%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="10">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td>
                                <c:if test="${item.isCheck == '1'}">
                                    <input type="checkbox" class="checkOne" name="userList_input" value="${item.id}">
                                </c:if>
                            </td>
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                            <td>${item.userName}</td>
                            <td>${item.loginName}</td>
                            <td>${item.tel}</td>
                            <td class="cel max-120">${item.orgName}</td>
                            <td title="${item.roleNames}">${item.roleNames}</td>
                            <td>${item.userLevelName}</td>
                            <td class="btn-cel">
                                <c:if test="${item.isvalid != 0}">
                                    <c:if test="${item.id != 1 && item.isCheck == 1}">
                                        <shiro:hasPermission name="user:update">
                                            <a data-toggle="modal" class="btn btn-primary btn-xs edit-btn"
                                               data-id="${item.id}">
                                                <i class="fa fa-edit"></i>编辑</a>
                                        </shiro:hasPermission>
                                    </c:if>
                                    <c:if test="${item.isCheck == 1}">
                                        <shiro:hasPermission name="user:role">
                                            <a href="#" class="btn btn-info btn-xs role-btn" data-id="${item.id}">
                                                <i class="fa fa-user-plus"></i>角色分配</a>
                                        </shiro:hasPermission>
                                        <shiro:hasPermission name="user:bank">
                                            <a href="#" class="btn btn-warning btn-xs bank-btn" data-id="${item.id}"
                                               data-bankid="${item.bankId}">
                                                <i class="fa fa-user-plus"></i>银行分配</a>
                                        </shiro:hasPermission>
                                        <shiro:hasPermission name="user:fund">
                                            <a href="#" class="btn btn-info btn-xs fund-btn" data-id="${item.id}">
                                                <i class="fa fa-user-plus"></i>资产方分配</a>
                                        </shiro:hasPermission>
                                        <a class="btn <c:if test="${item.forbidden == 0}">btn-danger</c:if><c:if test="${item.forbidden == 1}">btn-success</c:if> btn-xs enable-btn"
                                           data-id="${item.id}"><c:if test="${item.forbidden == 1}">启用</c:if><c:if
                                                test="${item.forbidden == 0}">禁用</c:if></a>
                                    </c:if>
                                    <shiro:hasPermission name="user:view">
                                        <a data-toggle="modal" class="btn btn-info btn-xs detail" data-id="${item.id}">
                                            <i class="fa fa-search-plus"></i>查看</a>
                                    </shiro:hasPermission>
                                </c:if>
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

<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/iCheck/icheck.min.js"></script>
<script type="text/template" title="新增" id="userCreate-dialog">
    <div class="ibox-content">
        <form id="userCreateForm" class="form-horizontal" autocomplete="off">
            <input type="reset" id="reset" class="hide"/>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>登录账号:</label>
                    <div class="col-xs-8">
                        <input type="text" name="loginName" autocomplete="new-loginName" class="form-control"
                               id="user-loginName"
                               tip="登录账号不能为空" url="<%=request.getContextPath() %>/user/checkLoginName.action"
                               onkeyup="value=value.replace(/\s/g,'')"/>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>权限等级:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="权限等级不能为空">
                            <select data-placeholder="权限级别..." id="user-add-level" class="form-control user-add-level"
                                    name="userLevel" check="validUserForm(this)">
                                <option value="">请选择</option>
                                <c:if test="${paramMap.isAdmin == 1}">
                                    <option value="2">公司管理员</option>
                                </c:if>
                                <c:if test="${paramMap.isAdmin != 1}">
                                    <option value="3">公司级</option>
                                    <option value="4">部门级</option>
                                    <option value="5">用户级</option>
                                </c:if>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>密码:</label>
                    <div class="col-xs-8">
                        <input type="password" autocomplete="new-password" class="form-control" id="user-password"
                               tip="密码不能为空"
                               check="validUserForm(this)" onkeyup="value=value.replace(/\s/g,'')"/>
                    </div>
                </div>
                <div class="col-sm-6">
                    <c:if test="${paramMap.isAdmin != 1}">
                        <label class="col-xs-3 control-label"><span class="red">*</span>所属部门:</label>
                        <div class="col-xs-8">
                            <input type="hidden" id="department_ids" class="department_ids"/>
                            <input type="text" class="form-control" id="user-department" tip="所属部门不能为空"
                                   check="validUserForm(this)" readonly="readonly" onclick="showDepartmentMenu(229,'userCreateForm')">
                            <div id="menuContent" class="menuContent"
                                 style="box-shadow:0px 0px 10px rgba(0, 0, 0, 0.2);display: none; border:1px solid #3c9adc; border-radius: 2px;position: absolute;width: 229px;padding: 10px;height:300px;">
                                <ul id="departmentTree" class="ztree" style="margin-top:0;"></ul>
                            </div>
                        </div>
                    </c:if>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>真实姓名:</label>
                    <div class="col-xs-8">
                        <input type="text" autocomplete="off" class="form-control" id="user-realName" tip="真实姓名不能为空"
                               check="validUserForm(this)">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>手机号码:</label>
                    <div class="col-xs-8">
                        <input type="text" autocomplete="off" class="form-control" id="user-tel" tip="手机号码不能为空"
                               maxlength="11" obj="phone11">
                    </div>
                </div>
            </div>
            <c:if test="${currentOrgType != 2}">
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">大区:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="请输入正确的区域">
                                <select data-placeholder="区域选择..." id="user-areaId"
                                        class="area-chosen-select form-control" name="areaId">
                                    <option value="">请选择</option>
                                    <c:forEach var="area" items="${areaData}" varStatus="st">
                                        <c:if test="${area.parentId != 0}">
                                            <option value="${area.keyWorld}">${area.valueDesc}</option>
                                        </c:if>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </c:if>
        </form>
        <div class="dialog-manage">
            <a href="#" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

<script type="text/template" title="重置密码" id="resetPassword-dialog">
    <div class="ibox-content">
        <form id="resetUserPwdForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>密码:</label>
                    <div class="col-xs-8">
                        <input type="password" class="form-control" id="rest-user-password" tip="密码不能为空"
                               check="validUserForm(this)">
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="#" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

<script type="text/template" title="查看" id="userView-dialog">
    <div class="ibox-content">
        <form id="userViewForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">登录账号:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control user-view-loginName" readonly>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">密码:</label>
                    <div class="col-xs-8">
                        <input type="password" class="form-control user-view-password" readonly>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">真实姓名:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control user-view-realName" readonly>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label">手机号码:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control user-view-tel" readonly>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-6">
                    <c:if test="${currentOrgType != 2 && paramMap.isAdmin != 1}">
                        <label class="col-xs-3 control-label">区域:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control user-view-areaId" readonly>
                        </div>
                    </c:if>
                    <c:if test="${paramMap.isAdmin == 1}">
                        <label class="col-xs-3 control-label">区域:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control user-view-areaId" readonly>
                        </div>
                    </c:if>
                </div>
                <div class="col-sm-6">
                    <%-- 根据当前用户是不是超级管理员显示部门还是区域--%>
                    <c:if test="${paramMap.isAdmin != 1}">
                        <label class="col-xs-3 control-label">部门:</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control user-view-department" readonly>
                        </div>
                    </c:if>
                </div>
            </div>
        </form>
        <div class="dialog-manage" style="margin-left: 40px;">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
        </div>
    </div>
</script>

<script type="text/template" title="编辑" id="userEdit-dialog">
    <div class="ibox-content">
        <form id="userEditForm" class="form-horizontal">
            <input type="hidden" name="userId" id="user-edit-id"/>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>登录账号:</label>
                    <div class="col-xs-8">
                        <input type="text" name="loginName" id="user-edit-loginName" class="form-control"
                               autocomplete="off" url="<%=request.getContextPath() %>/user/checkLoginName.action"
                               param=""/>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>权限等级:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="权限等级不能为空">
                            <select data-placeholder="权限级别..." id="user-edit-level"
                                    class="user-edit-level form-control" name="userLevel" check="validUserForm(this)">
                                <option value="">请选择</option>
                                <c:if test="${paramMap.isAdmin == 1}">
                                    <option value="2">公司管理员</option>
                                </c:if>
                                <c:if test="${paramMap.isAdmin != 1}">
                                    <option value="3">公司级</option>
                                    <option value="4">部门级</option>
                                    <option value="5">用户级</option>
                                </c:if>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>密码:</label>
                    <div class="col-xs-8">
                        <input type="password" style="display:none">
                        <input type="password" autocomplete="off" class="form-control" id="user-edit-password"
                               tip="密码不能为空" check="validUserForm(this)" readonly="readonly">
                    </div>
                </div>
                <div class="col-sm-6">
                    <c:if test="${paramMap.isAdmin != 1}">
                        <label class="col-xs-3 control-label">
                            <c:if test="${paramMap.isAdmin != 1}"><span class="red">*</span></c:if>所属部门:
                        </label>
                        <div class="col-xs-8">
                            <input type="hidden" id="department_ids" class="department_ids"
                                   check="validUserForm(this)"/>
                            <input type="text" class="form-control" id="user-department" tip="所属部门不能为空"
                                   check="validUserForm(this)" readonly="readonly" onclick="showDepartmentMenu(229,'userEditForm')">
                            <div id="menuContent" class="menuContent"
                                 style="box-shadow:0px 0px 10px rgba(0, 0, 0, 0.2);display: none; border:1px solid #3c9adc; border-radius: 2px;position: absolute;width: 229px;padding: 10px;height:300px;">
                                <ul id="departmentTree" class="ztree" style="margin-top:0;"></ul>
                            </div>
                        </div>
                    </c:if>
                    <c:if test="${paramMap.isAdmin == 1}">
                        <label class="col-xs-3 control-label">大区:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="请输入正确的区域">
                                <select data-placeholder="区域选择..." id="user-edit-areaId"
                                        class="area-chosen-select form-control" name="areaId">
                                    <option value="">请选择</option>
                                    <c:forEach var="area" items="${areaData}" varStatus="st">
                                        <c:if test="${area.parentId != 0}">
                                            <option value="${area.keyWorld}">${area.valueDesc}</option>
                                        </c:if>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                    </c:if>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>真实姓名</label>
                    <div class="col-xs-8">
                        <input type="text" autocomplete="off" class="form-control" id="user-edit-realName"
                               tip="真实姓名不能为空" check="validUserForm(this)">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-xs-3 control-label"><span class="red">*</span>手机号码:</label>
                    <div class="col-xs-8">
                        <c:if test="${paramMap.isAdmin != 1}">
                            <input type="text" autocomplete="off" class="form-control" id="user-edit-tel" tip="手机号码不能为空"
                                   obj="phone11">
                        </c:if>
                        <c:if test="${paramMap.isAdmin == 1}">
                            <input type="text" autocomplete="off" class="form-control" id="user-edit-tel" tip="手机号码不能为空"
                                   obj="phone11">
                        </c:if>
                    </div>
                </div>
            </div>
            <%-- 根据是否为超级管理显示部门还是大区 --%>
            <c:if test="${currentOrgType != 2 && paramMap.isAdmin != 1}">
                <div class="form-group">
                    <div class="col-sm-6">
                        <label class="col-xs-3 control-label">大区:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="请输入正确的区域">
                                <select data-placeholder="区域选择..." id="user-edit-areaId"
                                        class="area-chosen-select form-control" name="areaId">
                                    <option value="">请选择</option>
                                    <c:forEach var="area" items="${areaData}" varStatus="st">
                                        <c:if test="${area.parentId != 0}">
                                            <option value="${area.keyWorld}">${area.valueDesc}</option>
                                        </c:if>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </c:if>
        </form>
        <div class="dialog-manage">
            <a href="#" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

<script type="text/template" title="" id="fp-dialog">
    <div class="role-allocation">
        <div class="role-left">
            <p class="title">未分配</p>
            <div class="role-content">
                <select multiple="multiple" size="12" id="leftValue"></select>
            </div>
        </div>
        <div class="role-center">
            <div class="add-all">
                >>
            </div>
            <div class="add-one">
                >
            </div>
            <div class="remove-one">
                <
            </div>
            <div class="remove-all">
                <<
            </div>
        </div>
        <div class="role-right">
            <p class="title">已分配</p>
            <div class="role-content">
                <select multiple="multiple" size="12" id="rightValue"></select>
            </div>
        </div>
    </div>
    <div class="dialog-manage">
        <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
    </div>
</script>
<script type="text/javascript" src="${ctx}/js/third/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/common/fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/user/list.js"></script>
<script type="text/template" title="导入用户" id="excel-dialog">
    <div class="ibox-content ibox-excel">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h col-sm-12">
                            <span class="red">*</span>上传Excel文件:
                        </div>
                        <div class="page-container col-sm-12">
                            <div id="addUploader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        </div>
    </div>
</script>
<script type="text/template" title="导入人事用户" id="excelAllUser-dialog">
    <div class="ibox-content ibox-excel">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="pn-flabel pn-flabel-h col-sm-12">
                            <span class="red">*</span>上传Excel文件:
                        </div>
                        <div class="page-container col-sm-12">
                            <div id="addAllUserUploader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
        </div>
    </div>
</script>
</html>