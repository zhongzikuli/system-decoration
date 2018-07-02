<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>角色管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
</head>
<div class="main-wrapper flex">
    <div class="mod_header">
        <input type="hidden" name="name" value="${name}">
        <form id="pagerForm" action="${ctx}/role/query.action" method="post">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-2">
                    <shiro:hasPermission name="role:create">
                        <a class="btn btn-primary btn-sm" onclick="createRole()">新增</a>
                    </shiro:hasPermission>
                    <shiro:hasPermission name="role:delete">
                        <a class="btn btn-danger btn-sm" onclick="deleteRole()">删除</a>
                    </shiro:hasPermission>
                </div>
                <div class="col-sm-10 text-right">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label label">角色名称:</label>
                            <input type="text" class="form-control" name="name" id="search-role-name" value="${name}">
                            <a class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</a>
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
                        <th style="width:2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width:2%;">序号</th>
                        <th style="width:10%;">角色名称</th>
                        <th style="width:15%;">角色说明</th>
                        <th style="width:12%;">添加时间</th>
                        <th style="width:20%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="6">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="roleList_input"
                                       value="${item.id}"></td>
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}
                            </td>
                            <td>${item.name}</td>
                            <td>${item.bak}</td>
                            <td><sl:format type="date" pattern="yyyy-MM-dd HH:mm" show="${item.ctime}"/>
                            </td>
                            <td>
                                <shiro:hasPermission name="role:update">
                                    <a data-bak="${item.bak}"
                                       onclick="updateRole(this,${item.id},'${item.name}','${item.level}')"
                                       class="btn btn-primary btn-xs"><i class="fa fa-edit"></i>编辑</a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="role:permission">
                                    <a onclick="assignRolePermission(${item.id})" class="btn btn-danger btn-xs"><i
                                            class="fa fa-flag"></i>绑定PC权限</a>
                                </shiro:hasPermission>

                                <shiro:hasPermission name="role:AppPermission">
                                    <a onclick="assignRoleAppPermission(${item.id})" class="btn btn-warning btn-xs"><i
                                            class="fa fa-flag"></i>绑定APP权限</a>
                                </shiro:hasPermission>

                                <shiro:hasPermission name="role:query">
                                    <a onclick="viewRole(${item.id})" class="btn btn-info btn-xs detail">
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
    <%-- 分页表单参数 --%>
    <%@include file="/WEB-INF/views/include/page-bar.jsp" %>
</div>
</body>

<%-- 引入js --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/template" title="提示" id="deleteRole-dialog">
    <div class="ibox-content" id="deleteRole-dialog">
        <div data-id="title" class="dialog-item">
            <div class="dialog-tips">
                <p class="tips">确定删除所选角色及关联数据？</p>
            </div>
        </div>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

<script type="text/template" title="新增" id="createRole-dialog">
    <div id="createRole-dialog" class="ibox-content">
        <form id="createRoleForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>角色名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="create-role-name" tip="请输入角色名称" name="name"
                               autocomplete="off"
                               url="<%=request.getContextPath() %>/role/checkName.action" value="">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">角色说明:</label>
                    <div class="col-xs-8">
						<textarea class="form-control" id="create-role-bak" tip="长度不能超过50个字符"
                                  check="validateRoleBak(this)" value=""></textarea>
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
<script type="text/template" title="绑定权限" id="assignPermission-dialog">
    <div id="assignPermission-dialog" class="ibox-content">
        <form id="assignPermissionForm" class="form-horizontal">
            <div id="permissionAssign" class="form-content">
                <div class="ibox-container">
                    <label class="col-xs-3 control-label">绑定权限:</label>
                    <div class="col-xs-8" style="height: 300px; overflow: auto;">
                        <ul id="assign-role-permission-tree" class="ztree"></ul>
                    </div>
                </div>
            </div>
            <div class="dialog-manage" id="ViewBtn">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
                <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
            </div>
        </form>
    </div>
</script>

<script type="text/template" title="查看" id="viewRole-dialog">
    <div id="viewRole-dialog" class="ibox-content">
        <form id="viewRoleForm" class="form-horizontal">
            <div id="viewRole" class="form-content">
                <div class="ibox-container">
                    <label class="col-xs-3 control-label">绑定权限:</label>
                    <div class="col-xs-8" style="height: 280px; overflow-y: scroll;">
                        <ul id="view-role-permission-tree" class="ztree"></ul>
                    </div>
                </div>
            </div>
            <div class="dialog-manage" id="ViewBtn">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>

<script type="text/template" title="编辑" id="updateRole-dialog">
    <div id="updateRole-dialog" class="ibox-content">
        <form id="updateRoleForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>角色名称:</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" id="update-role-name" tip="请输入角色名称" name="name"
                               url="<%=request.getContextPath() %>/role/checkName.action" value="" param="">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label">角色说明:</label>
                    <div class="col-xs-8">
						<textarea class="form-control" id="update-role-bak" tip="长度不能超过50个字符"
                                  check="validateRoleBak(this)" value=""></textarea>
                    </div>
                </div>
            </div>
        </form>
        <div class="dialog-manage" id="UpdateBtn">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/role/roleList.js"></script>
</html>

