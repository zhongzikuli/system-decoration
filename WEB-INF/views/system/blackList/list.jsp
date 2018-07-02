<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="slt" uri="/WEB-INF/tld/sl.tld" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>黑名单管理</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="main-wrapper flex">
    <div class="mod_header">
        <div id="hiddenForm">
            <input type="hidden" name="type" value="${paramMap.type}"/>
        </div>
        <form id="pagerForm" action="${ctx}/blackList/query.action" method="post">
            <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
            <div class="row">
                <div class="col-sm-2">
                    <shiro:hasPermission name="blackList:updateStatus">
                        <a data-toggle="modal" class="btn btn-primary btn-sm white-btn-all">拉白</a>
                        <a data-toggle="modal" class="btn btn-danger btn-sm black-btn-all">拉黑</a>
                    </shiro:hasPermission>
                </div>
                <div class="col-sm-10 text-right">
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="control-label label">快捷搜索:</label>
                            <input type="text" class="form-control" name="keyword" id="search-keyword"
                                   onkeyup="value=value.replace(/\s/g,'')"
                                   placeholder="客户姓名、身份证号" value="${paramMap.keyword}">
                            <button type="button" class="btn btn-primary btn-sm" onclick="searchSubmit()">搜索</button>
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
                        <th style="width: 2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                        <th style="width: 2%;">序号</th>
                        <th style="width: 8%;">姓名</th>
                        <th style="width: 12%;">身份证号</th>
                        <th style="width: 12%;">订单时间</th>
                        <th style="width: 12%;">操作时间</th>
                        <th style="width: 5%;">黑白名单</th>
                        <th style="width: 20%;">备注</th>
                        <th style="width: 10%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:if
                            test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                        <tr>
                            <td class="col-td" colspan="9">暂无数据</td>
                        </tr>
                    </c:if>
                    <c:forEach var="item" items="${pageBean.recordList}"
                               varStatus="st">
                        <tr>
                            <td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.id}"></td>
                            <td >${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage }</td>
                            <td >${item.userName}</td>
                            <td >${item.cardNo}</td>
                            <td >
                                <fmt:formatDate value="${item.ctime}" pattern="yyyy-MM-dd hh:mm"/>
                            </td>
                            <td >
                                <fmt:formatDate value="${item.mtime}" pattern="yyyy-MM-dd hh:mm"/>
                            </td>
                            <c:if test="${item.blackStatus =='1'}">
                                <td >黑</td>
                            </c:if>
                            <td style="display:none" name="black2">${item.blackStatus}</td>
                            <c:if test="${item.blackStatus =='2'}">
                                <td >白</td>
                            </c:if>
                            <td >${item.remark}</td>
                            <td class="btn-cel">
                                <shiro:hasPermission name="blackList:updateStatus">
                                    <a href="#" data-id=${item.id} data-state=${item.blackStatus}
                                       class="btn btn-primary btn-xs white-btn" id="start${item.id}"
                                            <c:if test="${item.blackStatus==2}">
                                                style="display:none;"
                                            </c:if>
                                    ><i class="fa fa-user-plus"></i>拉白</a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="blackList:updateStatus">
                                    <a href="#" data-id2=${item.id} data-state2=${item.blackStatus}
                                       class="btn btn-danger btn-xs black-btn" id="stop${item.id}"
                                            <c:if test="${item.blackStatus==1}">
                                                style="display:none;"
                                            </c:if>
                                    ><i class="fa fa-user-times"></i>拉黑</a>
                                </shiro:hasPermission>
                                <a data-toggle="modal"  data-id="${item.businessOrderAcceptId}" data-title="${item.userName}"
                                   data-href="${ctx}/dlBusinessHandle/detail.action?id=${item.businessOrderAcceptId}"
                                   class="btn btn-info btn-xs detail">  <i class="fa fa-search-plus"></i>查看</a>
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
<script type="text/javascript" src="${ctx}/js/mine/system/blackList/list.js"></script>
<script type="text/template" title="备注" id="addBlackRemark-dialog">
    <div class="ibox-content">
        <form id="addBlackRemarkForm" class="form-horizontal">
            <div id="addBlackRemark-dialog" style="margin:10px;">
                <div class="form-group">
                    <label class="col-xs-3 control-label"><span class="red">*</span>备注:</label>
                    <div class="col-xs-8">
		             	<textarea rows="5" cols="150" type="text" class="form-control" id="remark-add-content"
                                  name="remark" tip="备注内容不能为空" check="validFileForm (this)" value=""></textarea>
                    </div>
                </div>
                <div class="dialog-manage">
                    <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
                    <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
                </div>
            </div>
        </form>
    </div>
</script>
</html>