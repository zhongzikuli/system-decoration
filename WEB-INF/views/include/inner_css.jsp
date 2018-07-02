<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="sl" uri="/WEB-INF/tld/sl.tld" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="staticUrl" value="${staticUrl}"></c:set>
<script type="text/javascript">
    var ctx = "${ctx}";
    var staticUrl = "${staticUrl}";
</script>
<!--引入CSS-->
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/bootstrap/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/third/fontAwesome/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/third/animate/animate.min.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/third/chosen/chosen.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/mine/base.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/mine/dialog.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/mine/main.css">