<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css"/>
</head>

<body>
<div class="permission-box">
    <div class="permission-tree">
        <div class="form-row">
            <label>菜单权限树:</label>
        </div>
        <div class="sub_content clearfix" style="width:548px;height:400px;overflow-y:scroll;margin-bottom: 20px;">
            <ul id="permission-manage-gridDialog-menu" class="ztree"
                style="margin-left:15px;width:370px;height:410px;"></ul>
        </div>
    </div>
    <div id="rMenu" class="tree-menu">
        <ul>
            <shiro:hasPermission name="permission:create">
            <li id="m_add_permission" onclick="createPermission();">添加权限
            <li>
                </shiro:hasPermission>
                <shiro:hasPermission name="permission:create">
            <li id="m_add_menu" onclick="createMenu();">添加菜单
            <li>
                </shiro:hasPermission>
                <shiro:hasPermission name="permission:update">
            <li id="m_update" onclick="updateOne();">修改节点
            <li>
                </shiro:hasPermission>
                <shiro:hasPermission name="permission:delete">
            <li id="m_delete" onclick="deleteOne();">删除节点
            <li>
                </shiro:hasPermission>
                <shiro:hasPermission name="permission:move">
            <li id="m_move_up" onclick="moveUp();">上移
            <li>
                </shiro:hasPermission>
                <shiro:hasPermission name="permission:move">
            <li id="m_move_down" onclick="moveDown();">下移
            <li>
                </shiro:hasPermission>
                <shiro:hasPermission name="permission:refresh">
            <li id="m_refresh" onclick="refreshTree(null);">刷新
            <li>
                </shiro:hasPermission>
        </ul>
    </div>
</div>
</body>

<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/permission/permissionTree.js"></script>
<script type="text/template" id="permission-edit-gridDialog">
    <div class="ibox-content">
        <form id="permission-edit-form" class="form-horizontal">
            <div id="permissionEdit" class="form-content">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>类型:</label>
                    <div class="col-xs-8">
                        <div obj="" tip="请输入正确的类型">
                            <select id="permission-edit-gridDialog-type" class="form-control type-chosen-select"
                                    name="type" onchange="changeType();">
                                <option value="permission">权限</option>
                                <option value="menu">菜单</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>名称:</label>
                    <div class="col-xs-8">
                        <input id="permission-edit-gridDialog-name" class="form-control" type="text" name="name"
                               check="checkName(this)" url="${ctx}/permission/checkName.action" param=""/>
                    </div>
                </div>
                <div id="permission-edit-gridDialog-perCode-div" class="form-group" style="display:none;">
                    <label class="col-xs-3 control-label"><span class="red">*</span>权限代码:</label>
                    <div class="col-xs-8">
                        <input id="permission-edit-gridDialog-perCode" class="form-control" type="text" name="perCode"
                               check="checkPerCode(this)" url="${ctx}/permission/checkCode.action" param=""/>
                    </div>
                </div>
                <div id="permission-edit-gridDialog-url-div" class="form-group" style="display:none;">
                    <label class="col-xs-3 control-label">URL:</label>
                    <div class="col-xs-8">
                        <input id="permission-edit-gridDialog-url" class="form-control" type="text" name="url"
                               check="checkUrl(this)"/>
                    </div>
                </div>
                <div id="permission-edit-gridDialog-style-div" class="form-group" style="display:none;">
                    <label class="col-xs-3 control-label">图标名称:</label>
                    <div class="col-xs-8">
                        <input id="permission-edit-gridDialog-style" class="form-control" type="text" name="style"
                               check="checkStyle(this)"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">上级菜单:</label>
                    <div class="col-xs-8">
                        <input id="permission-edit-gridDialog-parentName" class="form-control" readonly="readonly"
                               type="text" name="parentName"/>
                    </div>
                </div>
                <div class="form-group" id="permission-edit-gridDialog-visible-div" style="display:none;">
                    <label class="col-xs-3 control-label">是否可见:</label>
                    <div class="col-xs-8">
                        <select id="permission-edit-gridDialog-visible" class="form-control type-chosen-select"
                                name="visible">
                            <option value="1">可见</option>
                            <option value="0">不可见</option>
                        </select>
                    </div>
                </div>
                <div class="form-group" id="permission-edit-gridDialog-orderNo-div" style="display:none;">
                    <label class="col-xs-3 control-label"><span class="red">*</span>排序:</label>
                    <div class="col-xs-8">
                        <input id="permission-edit-gridDialog-orderNo" class="form-control"
                               type="text" name="sortNo" check="checkSortNo(this)"/>
                    </div>
                </div>
            </div>
            <div class="dialog-managet">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
                <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
            </div>
        </form>
    </div>
</script>
<script type="text/template" title="" id="alert-dialog">
    <div data-id="title" class="dialog-item">
        <div class="dialog-tips">
            <p id="alert-dialog-tips" class="tips">提示信息</p>
        </div>
    </div>
    <div class="dialog-manage">
        <a href="javascript:void(0);" class="btn dialog-ok btn-primary">确定</a>
    </div>
</script>
<script type="text/template" title="" id="confirm-dialog">
    <div data-id="title" class="dialog-item">
        <div class="dialog-tips">
            <p id="confirm-dialog-tips" class="tips">确定重置？</p>
        </div>
    </div>
    <div class="dialog-manage">
        <a href="javascript:void(0);" class="btn dialog-ok btn-primary">确定</a>
        <a href="javascript:void(0);" class="btn dialog-close btn-default">取消</a>
    </div>
</script>
</html>
