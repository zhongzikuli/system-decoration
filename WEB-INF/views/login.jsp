<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>浩琦装修贷后台管理系统登陆</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <%@include file="/WEB-INF/views/include/login_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/images/favicon.ico">
</head>
<body class="gray-bg body-bg" onload="checkForm()">
<div class="login-bg">
    <img src="${ctx}/images/login-bg.png" alt="">
</div>

<div class="container">
    <div class="row">
        <div class="col-sm-6 col-xs-12">
            <img src="${ctx}/images/hq-logo.png" alt="" class="hq-logo">
        </div>
        <div class="col-sm-6 text-right hidden-xs">
            <button class="btn btn-sm go-website">官网</button>
        </div>
    </div>
    <div class="row login-warapper">
        <div class="col-sm-6 hidden-xs">
            <img src="${ctx}/images/login-icon.png" alt="">
        </div>
        <div class="col-sm-6 col-xs-12">
            <input type="hidden" id="hiddenMessage" name="message" value="${ message }">
            <div class="login-box">
                <form class="login-form" id="loginform" role="form" name="loginform" method="post"
                      action="${ctx}/login.action">
                    <h3 class="text-center">欢迎登陆</h3>
                    <div class="logining-tips flex" id="tips">
                        <i><img src="${ctx}/images/icon-alert.png"></i>
                        <p class="error"></p>
                    </div>
                    <div class="col-xs-12">
                        <input type="text" autocomplete="off" name="username" id="usercode"
                               placeholder="请输入账号" required="" class="form-control"
                               value="<%= request.getParameter(" username") == null ? "" : new
                                String(request.getParameter("username").getBytes("ISO-8859-1"),"Utf-8")%>">
                    </div>
                    <div class="col-xs-12">
                        <input type="password" autocomplete="off" name="password" id="pwd"
                               placeholder="请输入密码" required="" class="form-control"
                               value="<%= request.getParameter(" password") == null ? "" :
                                request.getParameter("password")%>">
                    </div>
                    <div class="col-xs-8">
                        <input type="text" id="randomcode" class="form-control" name="randomcode" size="8"
                               placeholder="验证码">
                    </div>
                    <div class="col-xs-4">
                        <a href="javascript:randomcodeRefresh()">
                            <img id="randomcode_img" src="${ctx}/validatecode.jsp"/>
                        </a>
                    </div>
                    <div class="col-xs-12">
                        <button class="btn btn-block" onclick="userLogin()">登 录</button>
                    </div>
                    <div class="col-xs-12">
                        后台系统目前仅支持谷歌浏览器，请先下载最新版本的谷歌浏览器!
                        <span><a href="" class="down-btn">下载</a></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</body>
<%@include file="/WEB-INF/views/include/outer_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/mine/login/login.js"></script>
</html>
