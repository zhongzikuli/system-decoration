<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>部门管理</title>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/cityselect/cityLayout.css">
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css"/>
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <form id="pagerForm">
            <div class="row">
                <div class="col-sm-2">
                    <a data-toggle="modal" class="btn btn-success btn-sm">刷新</a>
                </div>
            </div>
        </form>
    </div>
    <div class="mod_basic">
        <div class="ibox-content">
            <div class="col-sm-6">
                <div class="sub_content">
                    <ul id="organ-manage-tree" class="ztree"></ul>
                </div>
            </div>
            <input type="hidden" id="orgType" value="${orgType}"/>

        </div>
        <div class="clear"></div>
    </div>
</div>

<div id="dic-rMenu" class="dic-rMenu">
    <ul>
        <shiro:hasPermission name="department:create">
            <li id="dic-add">添加</li>
        </shiro:hasPermission>
        <shiro:hasPermission name="department:update">
            <li id="dic-update">修改</li>
        </shiro:hasPermission>
        <shiro:hasPermission name="department:delete">
            <li id="dic-delete">删除</li>
        </shiro:hasPermission>
    </ul>
</div>
</body>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>

<script type="text/template" title="新增" id="department-add">
    <div class="ibox-content">
        <form id="department-add-form" class="form-horizontal" autocomplete="off">
            <div class="form-content">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>部门名称:</label>
                    <div class="col-xs-8">
                        <input id="department-add-name" tip="部门名称不能为空" obj="not_null"
                               type="text" name="departmentName" autocomplete="off"
                               class="valid-item valid-input required form-control" check="validForm(this)"
                               url="${ctx}/department/checkDepartment.action"/>
                    </div>
                </div>
                <c:if test="${orgType !=2}">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>部门类型:</label>
                        <div class="col-xs-8">
                            <div><select name="departmentType" class="form-control chosen-select"
                                         check="validForm(this)">
                                <option value="">请选择部门类型</option>
                                <option value="1">渠道</option>
                                <option value="2">直营</option>
                                <option value="3">业务</option>
                                <option value="4">管理</option>
                            </select></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>部门地址:</label>
                        <div class="col-xs-8">
                            <input type="text" name="province" obj="not_null" id="create-department-province"
                                   tip="请选择部门地址"
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">大区:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="请输入正确的区域">
                                <select data-placeholder="区域选择..." id="department-area-code"
                                        class="chosen-select form-control" name="areaCode">
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
                </c:if>
                <div class="form-group">
                    <label class="col-xs-3 control-label">部门状态:</label>
                    <div class="col-xs-8">
                        <select name="forbidden" class="form-control chosen-select">
                            <option value="0">启用</option>
                            <option value="1">禁用</option>
                        </select>
                    </div>
                </div>
                <c:if test="${orgType !=2}">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">成立日期:</label>
                        <div class="col-xs-8">
                            <input type="text" id="establishDate" name="establishDate" class="form-control"/>
                        </div>
                    </div>
                </c:if>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>排序:</label>
                    <div class="col-xs-8">
                        <input id="department-add-sortNo" tip="序号必须为正整数" obj="int" autocomplete="off"
                               type="text" class="valid-item valid-input required form-control"
                               check="validForm(this)"/>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" class="btn dialog-ok btn-primary">确定</a>
                <a href="javascript:void(0);" class="btn dialog-close btn-default">取消</a>
            </div>
        </form>
    </div>
</script>

<script type="text/template" title="修改" id="department-update">
    <div class="ibox-content">
        <form id="department-update-form" class="form-horizontal" autocomplete="off">
            <div class="form-content">
                <div class="form-group">
                    <label class="col-xs-3 control-label">上级部门:</label>
                    <div class="col-xs-8">
                        <input id="parent-department" type="text" name="parentId" class="form-control" readonly
                               onclick="showDepartmentMenu(240)"/>
                        <div id="menuContent" class="menuContent"
                             style="box-shadow:0px 0px 10px rgba(0, 0, 0, 0.2);display: none; border:1px solid #3c9adc; border-radius: 2px;position: absolute;width: 229px;padding: 10px;height:300px;">
                            <ul id="departmentTree" class="ztree"></ul>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>部门名称:</label>
                    <div class="col-xs-8">
                        <input id="department-update-name" tip="部门名称不能为空" obj="not_null"
                               type="text" name="departmentName" class="valid-item valid-input form-control"
                               check="validForm(this)"
                               url="${ctx}/department/checkDepartment.action" param=""/>
                    </div>
                </div>
                <c:if test="${orgType !=2}">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>部门类型:</label>
                        <div class="col-xs-8">
                            <div><select name="departmentType" class="form-control chosen-select"
                                         check="validForm(this)">
                                <option value="">请选择部门类型</option>
                                <option value="1">渠道</option>
                                <option value="2">直营</option>
                                <option value="3">业务</option>
                                <option value="4">管理</option>
                            </select></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>部门地址:</label>
                        <div class="col-xs-8">
                            <input type="text" name="province" obj="not_null" id="department-update-province"
                                   tip="请选择部门地址"
                                   class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">大区:</label>
                        <div class="col-xs-8">
                            <div obj="" tip="请输入正确的区域">
                                <select data-placeholder="区域选择..." id="department-update-area-code"
                                        class="chosen-select form-control" name="areaCode">
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
                </c:if>
                <div class="form-group">
                    <label class="col-xs-3 control-label">部门状态:</label>
                    <div class="col-xs-8">
                        <select name="forbidden" class="form-control chosen-select">
                            <option value="0">启用</option>
                            <option value="1">禁用</option>
                        </select>
                    </div>
                </div>
                <c:if test="${orgType !=2}">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">成立日期:</label>
                        <div class="col-xs-8">
                            <input type="text" id="establishDate" name="establishDate" class="form-control"/>
                        </div>
                    </div>
                </c:if>
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>排序:</label>
                    <div class="col-xs-8">
                        <input id="department-update-sortNo" tip="序号必须为正整数" obj="int"
                               type="text" class="valid-item valid-input required form-control"
                               check="validForm(this)"/>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn dialog-ok btn-primary">确定</a>
                <a href="javascript:void(0);" type="button" class="btn dialog-close btn-default">取消</a>
            </div>
        </form>
    </div>
</script>

<script type="text/javascript" src="${ctx}/js/third/cityselect/cityselect.js"></script>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/third/other/html5media.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/department/departmentTree.js"></script>
</html>




