$(function () {

    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "160px"
    });

    //银行受理时间
    bankHandleInitLaydate("search-start-date", "search-end-date");

    //搜索时间控件
    function bankHandleInitLaydate(start, end) {
        var sTime = {
            elem: '#' + start,
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
            elem: '#' + end,
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
    }

    //重置
    $(".reset-btn").on("click", function () {
        $("#search-orderStatus").val('').trigger('chosen:updated');
        $("#search-keyword").val('');
        $("#search-bank").val('').trigger('chosen:updated');
        $("#search-start-date").val('');
        $("#search-end-date").val('');
    });

    //新增
    $(".createApplyLoan").on("click", function () {
        window.location.href = ctx + "/applyLoan/gotoApplyLoanInfo.action";
    });

    //刷新
    $(".refresh").on("click", function () {
        window.location.href = ctx + "/applyLoan/query.action";
    });

    //申请贷款
    $(".applyLoanBtn").on("click", function () {
        var id = $(this).attr("data-id");
        var orderNo = $(this).attr("data-no");
        var url = ctx + "/applyLoan/gotoApplyLoanInfo.action?id=" + id;
        HQdecorate.openTabForParent(url, "-order-track-" + id, "贷款申请-" + orderNo);
    });

    //订单轨迹
    $(".orderTrack").on("click", function () {
        var acceptId = $(this).attr("data-id");
        var orderNo = $(this).attr("data-no");
        var url = ctx + "/orderTrack/query.action?acceptId=" + acceptId;
        HQdecorate.openTabForParent(url, "-order-track-" + acceptId, "订单轨迹-" + orderNo);
    });

    //订单详情查看
    $(".detail").on("click", function () {
        var acceptId = $(this).attr("data-id");
        var dataTitle = $(this).attr("data-title");
        var dataHref = $(this).attr("data-href");
        HQdecorate.openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
    });

});