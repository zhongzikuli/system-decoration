<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script type="text/javascript">

    function changePerPage() {
        $('#numPerPage').val($('#pageSelect').val());
        jumpPage(1);
    }

    function jumpPage(pageNo) {
        var reg = /^[1-9][0-9]{0,9}$/;
        if (reg.test(pageNo)) {
            $("#pageNum").val(pageNo - 1);//pageNo-1为了兼容ajax分页，第一页传的值为0，第2页传的值为1。BaseController类里private int getPageNum(HttpServletRequest request) 方法将其转为正常
            mformSubmit();
        } else {
            $("#PageNo").val("");
        }
    };

    function mformSubmit() {
        var actionUrl = $("#pagerForm").attr('action');
        var f = $('<form></form>', {'id': "_mform", 'action': actionUrl, 'method': 'POST'});
        var hiddenForm = $('#hiddenForm').clone();
        var pageFormHidden = $('#pageFormHidden').clone();
        f.append(hiddenForm).append(pageFormHidden);
        f.appendTo('body');
        $('#_mform').submit();
    }

    function searchSubmit() {
        $("#pageNum").val(0);
        $('#pagerForm').submit();
    };

    function changePageValue(_this) {
        var pageCount = "${pageBean.pageCount}";
        var value = parseInt($(_this).val());
        if (!isNaN(value)) {
            if (typeof(pageCount) != "undefined" && value > pageCount) {
                /* if(0 == pageCount){
                    $(_this).val(1);
                }else{
                    $(_this).val(pageCount);
                } */
                $(_this).val(1);
            } else {
                $(_this).val(value);
            }
        }
    }

</script>
<body>
<div class="paging-container">
    <div class="o-ui-paging-container">
        <ul>
            <c:if test="${ pageBean.beginPageIndex > 1 }">
                <li class="o-ui-pager"><a href="javascript:void(0);" onclick="jumpPage(1)">首页</a></li>
                <c:choose>
                    <c:when test="${ pageBean.currentPage - 11 < 0 }">
                        <li class="o-ui-pager"><a href="javascript:void(0);" onclick="jumpPage(5)">上一页</a></li>
                    </c:when>
                    <c:otherwise>
                        <li class="o-ui-pager"><a href="javascript:void(0);"
                                                  onclick="jumpPage(${ pageBean.currentPage-11})">上一页</a></li>
                    </c:otherwise>
                </c:choose>
            </c:if>
            <c:choose>
                <c:when test="${ empty pageBean || pageBean.totalCount == 0 }">
                    <li class="o-ui-pager focus"><a href="javascript:void(0);">1</a></li>
                </c:when>
                <c:otherwise>
                    <c:forEach var="i" begin="${ pageBean.beginPageIndex }" end="${ pageBean.endPageIndex }"
                               step="1">
                        <c:choose>
                            <c:when test="${ i!= pageBean.currentPage }">
                                <li class="o-ui-pager"><a href="javascript:void(0);"
                                                          onclick="jumpPage(${ i })">${ i }</a></li>
                            </c:when>
                            <c:otherwise>
                                <li class="o-ui-pager focus"><span>${ i }</span></li>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                </c:otherwise>
            </c:choose>

            <c:if test="${ pageBean.endPageIndex < pageBean.pageCount }">
                <c:choose>
                    <c:when test="${ pageBean.currentPage +11 > pageBean.pageCount }">
                        <li class="o-ui-pager"><a href="javascript:void(0);"
                                                  onclick="jumpPage(${ pageBean.pageCount-5})">下一页</a></li>
                    </c:when>
                    <c:otherwise>
                        <li class="o-ui-pager"><a href="javascript:void(0);"
                                                  onclick="jumpPage(${ pageBean.currentPage+11 })">下一页</a></li>
                    </c:otherwise>
                </c:choose>
                <li class="o-ui-pager"><a href="javascript:void(0);"
                                          onclick="jumpPage(${ pageBean.pageCount})">末页</a></li>
            </c:if>
            <select id="pageSelect" onchange="changePerPage()">
                <option value="10" <c:if test="${pageBean.numPerPage==10}">selected</c:if>>10</option>
                <option value="20" <c:if test="${pageBean.numPerPage==20}">selected</c:if>>20</option>
                <option value="50" <c:if test="${pageBean.numPerPage==50}">selected</c:if>>50</option>
                <option value="100" <c:if test="${pageBean.numPerPage==100}">selected</c:if>>100</option>
                <option value="200" <c:if test="${pageBean.numPerPage==200}">selected</c:if>>200</option>
                <option value="500" <c:if test="${pageBean.numPerPage==500}">selected</c:if>>500</option>
                <option value="3000" <c:if test="${pageBean.numPerPage==3000}">selected</c:if>>3000(请慎用)</option>
            </select>
            <li class="o-ui-paging-toolbar">
                到第<input type="text" class="o-ui-paging-count" onblur="changePageValue(this)" id="PageNo" size="4">页
                <input type='button' onclick='jumpPage($("#PageNo").val())' value='跳转' id="jumpBtn">
            </li>
        </ul>
    </div>
</div>
</body>



