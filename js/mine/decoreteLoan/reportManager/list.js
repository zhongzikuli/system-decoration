//导出所有用户
function exportUserInfoList() {
    window.location.href = ctx + "/user/exportUserInfoList.action";
}


//申请贷款明细
function exportApplyLoanDetailList() {
    window.location.href = ctx + "/loanDetail/exportApplyLoanDetailList.action";
}
function exportApplyLoanDetailListExcel(url) {

    var ck = $("input[name='businessOrderId']:checked");
    if (ck.length == 0) {
        alert("请选择要导出的信息...");
        return
    } else {
        var ids = new Array();
        $(ck).each(function () {
            ids.push($(this).val());
        });
        //alert(ids)
        var startDate = $('#hiddenForm').find("input[name='startDate']").val();
        var endDate = $('#hiddenForm').find("input[name='endDate']").val();
        var bankId = $('#hiddenForm').find("input[name='bankId']").val();
        var keyword = $('#hiddenForm').find("input[name='keyword']").val();
        var depId = $('#hiddenForm').find("input[name='depId']").val();
        var orderStatus = $('#hiddenForm').find("input[name='orderStatus']").val();
        window.location.href = ctx + url + "?ids=" + ids.toString() + "&startDate=" + startDate + "&endDate=" + endDate + "&bankId=" + bankId + "&keyword=" + keyword + "&depId=" + depId + "&orderStatus=" + orderStatus;
    }

    /* var startDate = $('#hiddenForm').find("input[name='startDate']").val();
     var endDate = $('#hiddenForm').find("input[name='endDate']").val();
     var bankId = $('#hiddenForm').find("input[name='bankId']").val();
     var keyword = $('#hiddenForm').find("input[name='keyword']").val();
     var depId = $('#hiddenForm').find("input[name='depId']").val();
     var orderStatus = $('#hiddenForm').find("input[name='orderStatus']").val();
     window.location.href = ctx + url + "?startDate=" + startDate + "&endDate=" + endDate + "&bankId=" + bankId + "&keyword=" + keyword + "&depId=" + depId + "&orderStatus=" + orderStatus;
     */
}
