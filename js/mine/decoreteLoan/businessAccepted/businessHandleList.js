$(function () {
    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });


    //时间空间初始化
    //业务受理时间
    bankHandleInitLaydate("businessHandleStartDate", "businessHandleEndDate");

    //银行受理时间
    bankHandleInitLaydate("startDate", "endDate");

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
        $("#orderStatus").find("option[value='']").attr("selected", true).trigger('chosen:updated');
        $("#keyword").val('');
        $("#businessHandleStartDate").val('');
        $("#businessHandleEndDate").val('');
        $("#startDate").val('');
        $("#endDate").val('');
    });

    $("#bankHandleChangeresult").on("click", function () {
        $(".search-btn").trigger("click");
    })
    //换审核
    $("#bankHandleChangeAudit").on("click", function () {
        var ck = $("input[name='bankHandleInput']:checked");
        if (ck.length == 0) {
            HQdecorate.alertDialog("请选择需要更换审核的数据");
            return
        } else {
            var idArr = new Array();
            var flag = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("data-handle-status") != "1") {
                    flag = false;
                    return;
                }
            });
            if (!flag) {
                HQdecorate.alertDialog("业务已受理的数据不能进行更换审核");
                return false;
            }
            HQdecorate.confirmDialog("确认对选中的数据更换审核吗？", true, {}, function () {
                var params = {
                    idArr: idArr.toString()
                };

                HQdecorate.post(
                    ctx + "/bankHandle/changeAudit.action",
                    params,
                    function (res) {
                        if (res.error == 1) {
                            HQdecorate.successMsg("操作成功", 1000, function () {
                                searchSubmit();
                            })
                        } else if (res.error == -100) {
                            HQdecorate.faildMsg("请求超时", 1000)
                        }else if (res.error == -1) {
                            HQdecorate.faildMsg(res.message, 1000, function () {
                                searchSubmit();
                            })
                        }
                    },
                    function (res) {
                        HQdecorate.faildMsg(res.responseText, 1000)
                    }
                );
            });
        }
    });

    $(".detail").on("click", function(){
        var _this = this;
        var acceptId = $(_this).attr("data-id");
        var dataTitle = $(_this).attr("data-title");
        var dataHref = $(_this).attr("data-href");
        HQdecorate.openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
    });


   //业务受理
    $(".businessHandleBtn").on("click", function () {
        var acceptId = $(this).attr("data-id");
        var realName = $(this).attr("data-realName");
        HQdecorate.post(
            ctx + "/bankHandle/takePosition.action",
            {acceptId: acceptId},
            function (res) {
                if (res.error == 1) {
                    var url = ctx  + "/dlBusinessHandle/toBusiness.action?acceptId=" + acceptId;
                    HQdecorate.openTabForParent(url, "-order-business-" + acceptId, "业务受理-" + realName);
                } else if (res.error == -100) {
                    HQdecorate.faildMsg("请求超时", 1000)
                } else if (res.error == -1){
                    HQdecorate.faildMsg(res.message, 1000, function () {
                        searchSubmit();

                    })
                }
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }, false
        );
    });
});