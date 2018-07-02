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

    //消息设置已读-------------------------------------
    $(".updateRead").on("click", function(){
        var _this = this;
        var dataHref = $(_this).attr("data-href");
        HQdecorate.openTabForParent(dataHref);
    });

    $(".updateRead").on("click", function () {

        var id = $(this).data("id");
        HQdecorate.post(

            function (res) {
                if (res.error == 1) {
                    HQdecorate.successMsg("用户启用成功", 1000, function () {
                        refresh();
                    })
                } else if (res.error == -100) {
                    HQdecorate.faildMsg("请求超时", 1000)
                }
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }
        );
    });




})

function updateRead(id) {
    //{ctx}/message/updateRead.action?id=${item.id}
    HQdecorate.post(ctx + "/message/updateRead.action", {id: id}, function (data) {
        if (data.error == 1) {
            HQdecorate.successMsg("操作成功！", 1000, function () {
                window.location.href = ctx + "/message/queryList.action";
            });
        } else if (data.error == -1) {
            HQdecorate.faildMsg("操作失败！");
        } else {
            HQdecorate.faildMsg(data.message);
        }
    }, function (res) {
        HQdecorate.faildMsg(res.responseText, 1000)
    })
}
function updateBatchRead(url) {
    var ck = $("input[name='message_id']:checked");
    if (ck.length == 0) {
        return
    } else {
        var ids = new Array();
        $(ck).each(function () {
            ids.push($(this).val());
        });
        HQdecorate.post(ctx + url, {ids: ids.toString()}, function (data) {
            if (data.error == 1) {
                HQdecorate.successMsg("操作成功！", 1000, function () {
                    window.location.href = ctx + "/message/queryList.action";
                });
            } else if (data.error == -1) {
                HQdecorate.faildMsg("操作失败！");
            } else {
                HQdecorate.faildMsg(data.message);
            }
        }, function (res) {
            HQdecorate.faildMsg(res.responseText, 1000)
        })

    }
}
