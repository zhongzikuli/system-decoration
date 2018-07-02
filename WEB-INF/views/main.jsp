<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>浩琦装修贷后台系统</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <%@include file="/WEB-INF/views/include/outer_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/images/favicon.ico">
</head>
<body class="fixed-sidebar full-height gray-bg" style="overflow:hidden">
<div id="wrapper">
    <input type="hidden" value="${sessionScope.userInfo.userid}" id="userId">
    <input type="hidden" value="${sessionScope.userInfo}" id="userInfo">
    <div class="flex">
        <!--左侧导航开始-->
        <div class="sidebar">
            <nav class="navbar-default navbar-static-side" role="navigation">
                <div class="navbar-minimalize-tip"></div>
                <div class="sidebar-collapse">
                    <ul class="nav" id="side-menu">
                        <li class="nav-header">
                            <img src="${ctx}/images/logo-large.png" alt="logo"/>
                        </li>
                        <li class="nav-head">
                            <div class="navbar-header navbar-minimalize">
                                <a class="minimalize-styl-2" href="#">
                                    <i class="fa fa-bars"></i>
                                </a>
                            </div>
                        </li>
                        <slt:menu menus="${activeUser.menus}"/>
                    </ul>
                </div>
            </nav>
        </div><!--左侧导航结束-->

        <!--右侧部分开始-->
        <div id="page-wrapper" class="gray-bg flex">

            <nav class="navbar navbar-static-top flex" role="navigation">
                <img alt="" src="${ctx}/images/icon_mini.png" class="mini-program">
                <div class="animated fadeInRight program-box hidden">
                    <img alt="" src="${ctx}/images/nav_mini.jpg">
                </div>
                <ul class="nav navbar-right navbar-top-links">
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
							<span class="clear">
								<span class="fa nav_icon nav_user"></span>
								<span class="text-muted text-xs">${sessionScope.userInfo.loginName}
                                    <b class="caret" style="margin-left: 10px;"></b></span>
							</span>
                        </a>
                        <ul class="dropdown-menu animated fadeInRight">
                            <li><a class="changePsd-btn"><i class="fa nav_icon nav_changePsd"></i><span
                                    class="nav-label">修改密码</span></a></li>
                            <li class="divider"></li>
                            <li><a class="logOut-btn"><i class="fa nav_icon nav_logout"></i><span
                                    class="nav-label">退出</span></a></li>
                            <li class="divider"></li>
                            <li><a class="help" target="_blank" href="${ctx}/static/help.html"><i
                                    class="fa nav_icon nav_help"></i><span class="nav-label">帮助中心</span></a>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle change-olor" data-toggle="dropdown" href="#">
                            <span class="clear">
								<span class="text-muted text-xs">换肤
								<b class="caret margin-l-10"></b></span>
							</span>
                        </a>
                        <ul class="dropdown-menu animated fadeInRight">
                            <li><a data-color="blue" class="change-color-btn"><span class="skin-text">黑色</span><span
                                    class="blue-skin">&nbsp;</span></a></li>
                            <li class="divider"></li>
                            <li><a data-color="white" class="change-color-btn"><span
                                    class="skin-text">白色</span><span
                                    class="white-skin">&nbsp;</span></a></li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <div class="content-tabs">
                <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i></button>
                <nav class="page-tabs J_menuTabs">
                    <div class="page-tabs-content"></div>
                </nav>
                <button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i></button>
                <div class="btn-group roll-nav roll-right">
                    <button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span></button>
                    <ul role="menu" class="dropdown-menu dropdown-menu-right animated fadeInRight">
                        <li class="J_tabShowActive"><a>定位当前选项卡</a></li>
                        <li class="divider"></li>
                        <li class="J_tabCloseAll"><a>关闭全部选项卡</a></li>
                        <li class="J_tabCloseOther"><a>关闭其他选项卡</a></li>
                    </ul>
                </div>
            </div>
            <div class="J_mainContent" id="content-main">

            </div>
        </div>
        <!--右侧部分结束-->
    </div>
</div>
</body>
<%@include file="/WEB-INF/views/include/outer_js.jsp" %>
<script type="text/template" title="修改密码" id="change-password-dialog">
    <div id="change-password-dialog" class="ibox-content">
        <form id="changePwdForm" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>登陆密码:</label>
                    <div class="col-xs-8">
                        <input type="password" class="form-control" id="login-password" name="login-password"
                               tip="登陆密码不能为空" check="validSealForm(this)">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-xs-3 control-label"><span class="red">*</span>密码确认:</label>
                    <div class="col-xs-8 ">
                        <input type="password" class="form-control" id="login-password-again"
                               name="login-password-again" tip="确认密码不能为空" check="validSealForm(this)">
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
</html>