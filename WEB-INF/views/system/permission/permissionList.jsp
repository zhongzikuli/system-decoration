<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>权限管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css"/>
</head>

<body>

<div class="main-wrapper flex">
    <div class="mod_header">
        <input id="permissionChangeFlag" type="hidden" value="false"/>
        <form id="pagerForm" action="${ctx}/permission/query.action" method="post">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <input type="hidden" value="${currentOrgType}" name="currentOrgType" id="currentOrgType">
        </form>
        <div class="row">
            <div class="col-sm-2">
                <button id="permission-manage-btn" class="btn btn-primary btn-sm" onClick="doManage();">权限管理</button>
            </div>
        </div>
    </div>
    <div class="mod_basic">
        <div class="ibox-content full-height no-padding">
            <div class="table-responsive full-height">
                <table class="table table-hover table-height table-striped">
                    <thead>
                    <tr>
                        <th style="width:2%;">序号</th>
                        <th style="width:8%;">名称</th>
                        <th style="width:4%;">类型</th>
                        <th style="width:12%;">菜单地址</th>
                        <th style="width:8%;">权限代码</th>
                        <th style="width:8%;">上级菜单</th>
                        <th style="width:12%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="7">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                        <tr rel="${item.id}">
                            <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                            <td>${item.name}</td>
                            <td>${item.typeStr}</td>
                            <td>${item.url}</td>
                            <td>${item.perCode}</td>
                            <td>${item.parentName}</td>
                            <td>
                                <shiro:hasPermission name="permission:view">
                                    <a id="permission-view-btn${st.index+1}" class="btn btn-info btn-xs detail"
                                       onClick="viewOne('${item.name}', '${item.type}', '${item.url}', '${item.perCode}', '${item.parentName}', ${item.id},'${visible}','${sortNo}');">
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

<script type="text/template" title="查看" id="permission-view-gridDialog">
    <div class="ibox-content">
        <div id="permission-view" class="form-content">
            <div class="form-content col-xs-6">
                <form id="permission-view-form" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>类型:</label>
                        <div class="col-xs-8">
                            <input id="permission-view-gridDialog-type" class="form-control"
                                   readonly="readonly" type="text" name="type"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label"><span class="red">*</span>名称:</label>
                        <div class="col-xs-8">
                            <input id="permission-view-gridDialog-name" class="form-control"
                                   readonly="readonly" type="text" name="name"/>
                        </div>
                    </div>
                    <div class="form-group" id="permission-view-gridDialog-perCode-div">
                        <label class="col-xs-3 control-label"><span class="red">*</span>权限代码:</label>
                        <div class="col-xs-8">
                            <input id="permission-view-gridDialog-perCode" class="form-control"
                                   readonly="readonly" type="text" name="perCode"/>
                        </div>
                    </div>
                    <div class="form-group" id="permission-view-gridDialog-url-div">
                        <label class="col-xs-3 control-label">URL:</label>
                        <div class="col-xs-8">
                            <input id="permission-view-gridDialog-url" class="form-control"
                                   readonly="readonly" type="text" name="url"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">上级菜单:</label>
                        <div class="col-xs-8">
                            <input id="permission-view-gridDialog-parentName" class="form-control"
                                   readonly="readonly" type="text" name="parentName"/>
                        </div>
                    </div>
                    <div class="form-group" id="permission-view-gridDialog-visible-div">
                        <label class="col-xs-3 control-label">是否可见:</label>
                        <div class="col-xs-8">
                            <input id="permission-view-gridDialog-visible" class="form-control"
                                   readonly="readonly" type="text" name="visible"/>
                        </div>
                    </div>
                    <div class="form-group" id="permission-view-gridDialog-orderNo-div">
                        <label class="col-xs-3 control-label">排序:</label>
                        <div class="col-xs-8">
                            <input id="permission-view-gridDialog-orderNo" class="form-control"
                                   readonly="readonly" type="text"/>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-xs-6" style="overflow-y: scroll;max-height: 260px;">
                <label>菜单权限树:</label>
                <ul id="permission-view-gridDialog-menu" class="ztree" style="margin-left: 16%;"></ul>
            </div>
        </div>

        <div class="dialog-manage" style="left: 50%; position: absolute; bottom: -350px;">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
        </div>
    </div>
</script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/permission/permission.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/permission/permissionTree.js"></script>
</html>
