jQuery(function ($) {
    var sTime = {
        elem: '#startDate',
        format: 'YYYY-MM-DD',
        min: '1970-01-01 ', //设定最小日期为当前日期
        //max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(),
        choose: function (datas) {
            eTime.min = datas; //开始日选好后，重置结束日的最小日期
        },
        clear: function () {
            eTime.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
        }
    };

    var eTime = {
        elem: '#endDate',
        format: 'YYYY-MM-DD',
        min: '1970-01-01', //设定最小日期为当前日期
        //max: laydate.now(), //最大日期
        istoday: false, //显示今天
        issure: true, //确定框
        istime: false,
        start: laydate.now(0, 'YYYY年MM月DD日'),
        choose: function (datas) {
            sTime.max = datas;			//结束日选好后，重置开始日的最大日期
        },
        clear: function () {
            sTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
            sTime.max = laydate.now();	//将开始日的最大值设定为今天
        }
    };
    laydate(sTime);
    laydate(eTime);
    $(".status").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "160px"
    });
    $(".reset-btn").on("click", function () {
        $(".status").val("").trigger("chosen:updated");
        $("#keyword").val("");
        $("#startDate").val("");
        $("#endDate").val("");

    });

   /* //订单轨迹
    $(".orderTrack-btn").on("click", function () {
        var acceptId = $(this).attr("data-id");
        var orderNo = $(this).attr("data-no");
        var url = ctx + "/orderTrack/query.action?acceptId=" + acceptId;
        HQdecorate.openTabForParent(url, "-order-track-" + acceptId, "订单轨迹-" + orderNo);
    });*/

    //--------------------------------------------订单详情查看------------------------------------------------------------
    $(".detail").on("click", function(){
        var _this = this;
        var acceptId = $(_this).attr("data-id");
        var dataTitle = $(_this).attr("data-title");
        var dataHref = $(_this).attr("data-href");
        HQdecorate.openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
    });

    $(".exportApplyLoanDetailListExcel").on("click",function(){
        exportApplyLoanDetailListExcel();
    });

    function exportApplyLoanDetailListExcel(){
        var startDate = $('#hiddenForm').find("input[name='startDate']").val();
        var endDate = $('#hiddenForm').find("input[name='endDate']").val();
        var bankId = $('#hiddenForm').find("input[name='bankId']").val();
        var keyword = $('#hiddenForm').find("input[name='keyword']").val();
        var depId = $('#hiddenForm').find("input[name='depId']").val();
        var orderStatus = $('#hiddenForm').find("input[name='orderStatus']").val();
        window.location.href = ctx + "/loanDetail/exportApplyLoanDetailList.action" + "?startDate=" + startDate + "&endDate=" + endDate + "&bankId=" + bankId + "&keyword=" + keyword + "&depId=" + depId + "&orderStatus=" + orderStatus;

    }
})
