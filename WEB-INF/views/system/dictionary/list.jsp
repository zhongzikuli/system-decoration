<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>字典管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link href="${ctx}/js/third/chosen/chosen.css" rel="stylesheet">
    <link href="${ctx}/js/third/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <form>
            <div class="row">
                <div class="col-sm-12">
                    <span class="red">*配置全局的值集，由管理员进行配置</span>
                </div>
            </div>
        </form>

    </div>
    <div class="mod_basic">
        <div class="content">
            <div class="sub_content clearfix" style="width:300px;margin-left:15px;overflow-y:auto;">
                <ul id="dictionary-manage-tree" class="ztree" style="width:270px;"></ul>
            </div>
        </div>
    </div>
</div>
<div id="dic-rMenu" class="dic-rMenu">
    <ul>
        <shiro:hasPermission name="dictionary:insert">
        <li id="data_dic_add" onclick="insertDataDic(this);" parent-id="">添加
        <li>
            </shiro:hasPermission>
            <shiro:hasPermission name="dictionary:update">
        <li id="data_dic_update" onclick="updateDataDic(this);" parent-id="">修改
        <li>
            </shiro:hasPermission>
            <shiro:hasPermission name="dictionary:delete">
        <li id="data_dic_delete" onclick="deleteDataDic(this);" parent-id="">删除
        <li>
            </shiro:hasPermission>
            <shiro:hasPermission name="dictionary:getTree">
        <li id="data_dic_refresh" onclick="refreshTree(this);" parent-id="">刷新
        <li>
            </shiro:hasPermission>
    </ul>
</div>
</body>
<%-- js文件引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<%--新增--%>
<script type="text/template" title="" id="dictionary-add-gridDialog">
    <div class="ibox-content">
        <form id="dictionary-add-form" class="form-horizontal">
            <div class="form-content">
                <div class="form-group">
                    <label class="col-xs-3 control-label">关键字:</label>
                    <div class="col-xs-8">
                        <input id="dictionary-add-keyWorld" tip="该值不能为空" autocomplete="off"

                               check="validDictForm(this)" class="form-control valid-item valid-input" type="text"
                               name="name"
                               url="<%=request.getContextPath() %>/dictionary/checkKeyWorld.action"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">名称:</label>
                    <div class="col-xs-8">
                        <input id="dictionary-add-valueDesc" tip="该值不能为空" autocomplete="off"
                               check="validDictForm(this)" type="text" name="name"
                               class="form-control valid-item valid-input"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">排序:</label>
                    <div class="col-xs-8">
                        <input id="dictionary-add-classOrder" tip="序号必须为正整数" autocomplete="off"
                               check="validDictForm(this)" type="text" name="name"
                               class="form-control valid-item valid-input"/>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
                <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
            </div>
        </form>
    </div>
</script>
<%--修改--%>
<script type="text/template" title="" id="dictionary-update-gridDialog">
    <div class="ibox-content">
        <form id="dictionary-update-form" class="form-horizontal">
            <div class="form-content">
                <div class="form-group">
                    <input type="hidden" name="id" id="dict-edit-id"/>
                    <label class="col-xs-3 control-label">关键字:</label>
                    <div class="col-xs-8">
                        <input id="dictionary-update-keyWorld" tip="该值不能为空"
                               check="validDictEditForm(this)" class="form-control valid-item valid-input" type="text"
                               name="name"
                               url="<%=request.getContextPath() %>/dictionary/checkKeyWorld.action" param=""/>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-3 control-label">名称:</label>
                    <div class="col-xs-8">
                        <input id="dictionary-update-valueDesc" tip="该值不能为空" type="text" name="name"
                               check="validDictEditForm(this)" class="form-control valid-item valid-input"/>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-3 control-label">排序:</label>
                    <div class="col-xs-8">
                        <input id="dictionary-update-classOrder" tip="序号必须为正整数" type="text" name="name"
                               check="validDictEditForm(this)" class="form-control valid-item valid-input"/>
                    </div>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="#" type="button" class="btn btn-primary dialog-ok">确定</a>
                <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
            </div>
        </form>
    </div>
</script>
<script type="text/javascript" src="${ctx}/js/third/ztree/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/system/dict/list.js"></script>
</html>