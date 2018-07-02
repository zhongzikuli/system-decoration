<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript">
    function jumpPage(pageNo) {
        var reg = /^[1-9][0-9]{0,9}$/;
        if (reg.test(pageNo)) {
            $("#pageNum").val(pageNo);
            $("#pagerForm").submit();
        } else {
            $("#PageNo").val("");
        }
    }
</script>


<div class="panelBar">
    <div class="pages">
		<span>查到&nbsp;${pageBean.totalCount}&nbsp;条记录，每页2条，共&nbsp;${pageBean.currentPage}/${pageBean.pageCount}&nbsp;页
		<a href="javascript:jumpPage(1)">首页</a>
		<s:if test="pageBean.hasPre"><a href="javascript:jumpPage(${pageBean.prePage})">上一页</a></s:if>
		<s:if test="pageBean.hasNext"><a href="javascript:jumpPage(${pageBean.nextPage})">下一页</a></s:if>
		<a href="javascript:jumpPage(${pageBean.pageCount})">末页</a>
		&nbsp;&nbsp;到第 <input id='PageNo' size='4' tip="只能输入大于0的正整数！" obj="/[1-9][0-9]{0,9}/"> 页 <input type='button'
                                                                                                          onclick='return jumpPage($("#PageNo").val());'
                                                                                                          value='跳转'>
		</span>
    </div>
    <table align="center">
        <tr>
            <c:if test="${ pageBean.beginPageIndex > 1 }">
                <c:choose>
                    <c:when test="${ pageBean.currentPage - 11 < 0 }">
                        <td><a href=?pageNum=5>上一页</a></td>
                    </c:when>
                    <c:otherwise>
                        <td><a href=?pageNum=${ pageBean.currentPage-11}>上一页</a></td>
                    </c:otherwise>
                </c:choose>
            </c:if>
            <c:forEach var="i" begin="${ pageBean.beginPageIndex }" end="${ pageBean.endPageIndex }" step="1">
                <c:choose>
                    <c:when test="${ i!= pageBean.currentPage }">
                        <td><a href=?pageNum=${ i }>${ i }</a></td>
                    </c:when>
                    <c:otherwise>
                        <td>${ i }</td>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
            <c:if test="${ pageBean.endPageIndex < pageBean.pageCount }">
                <c:choose>
                    <c:when test="${ pageBean.currentPage +11 > pageBean.pageCount }">
                        <td><a href=?pageNum=${ pageBean.pageCount-5 }>下一页</a></td>
                    </c:when>
                    <c:otherwise>
                        <td><a href=?pageNum=${ pageBean.currentPage +11 }>下一页</a></td>
                    </c:otherwise>
                </c:choose>

            </c:if>
        </tr>
    </table>
</div>