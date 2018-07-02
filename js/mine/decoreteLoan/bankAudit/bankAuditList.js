$(function(){

    //下拉框初始化
    $("#search-style").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "100%"
    });

    //刷新按钮
    $(".refresh-btn").on("click", function(){
        $(".search-btn").trigger("click");
    });

    //重置按钮
    $(".reset-btn").on("click", function(){
        $("#search-style").val("8").trigger('chosen:updated');
        $("#keyword").val("");
        $("#search-start-date").val("");
        $("#search-end-date").val("");
        $("#search-common-start-date").val("");
        $("#search-common-end-date").val("");
    });
    //订单详情查看
    $(".detail").on("click", function(){
        var _this = this;
        var acceptId = $(_this).attr("data-id");
        var dataTitle = $(_this).attr("data-title");
        var dataHref = $(_this).attr("data-href");
        HQdecorate.openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
    });

    bankAuditInitLaydate("search-start-date","search-end-date");
    bankAuditInitLaydate("search-common-start-date","search-common-end-date");
    function bankAuditInitLaydate(start,end) {
        var sTime = {
            elem: '#' + start,
            format: 'YYYY-MM-DD hh:mm:ss',
            min: '1970-01-01 ', //设定最小日期为当前日期
            istoday: false, //显示今天
            issure: true, //确定框
            istime: false,
            start: laydate.now() + ' 00:00:00',
            choose: function (datas) {
                eTime.min = datas; //开始日选好后，重置结束日的最小日期
            },
            clear: function () {
                eTime.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
            }
        };

        var eTime = {
            elem: '#' + end,
            format: 'YYYY-MM-DD hh:mm:ss',
            min: '1970-01-01', //设定最小日期为当前日期
            istoday: false, //显示今天
            issure: true, //确定框
            istime: false,
            start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
            choose	: function (datas) {
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
    //审核按钮
    $(".audit-detail").on("click", function(){
        var _this = this;
        var acceptId = $(_this).attr("data-id");
        var orderTitle = $(this).attr("data-title");
        HQdecorate.post(
            ctx + "/bankHandle/takePosition.action",
            {acceptId: acceptId},
            function (res) {
                if (res.error == 1) {
                   var url=ctx + "/bankAudit/goBankAudit.action?acceptId=" + acceptId;
                    HQdecorate.openTabForParent(url, "-order-bank-handle" + acceptId, "银行审批-" + orderTitle);
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
    //刷新
    function refresh(){
        window.location.href = ctx + "/bankAudit/query.action";
    }
    //添加占位
    function addSeat(acceptId){
        HQdecorate.post(
            ctx + "/bankHandle/takePosition.action",
            {
                acceptId:acceptId
            },
            function (res) {
                flag = false;
                if (res.error == 1) {
                } else if (res.error == -100) {
                    flag = true;
                    HQdecorate.faildMsg("请求超时", 1000)
                }
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }

        );
    }
    //换审核
    $(".change-audit-btn").on("click", function(){
        var ck = $("input[name='auditCheckbox']:checked");
        if (ck.length == 0) {
            HQdecorate.alertDialog("请选择要换审核的订单。");
            return
        } else {
            var idArr = new Array();
            var flag = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("data-handle-status") != "8") {
                    flag = false;
                    return;
                }
            });
            if (!flag) {
                HQdecorate.alertDialog("银行已审批的数据不能进行更换审核");
                return false;
            }
            HQdecorate.confirmDialog("确认对选中的数据更换审核吗？", true, {}, function () {
                var idArr = new Array();
                $(ck).each(function (i, n) {
                    idArr.push($(n).val());
                });
                var params = {
                    idArr : idArr.toString()
                };
                HQdecorate.post(
                    ctx + "/bankHandle/changeAudit.action",
                    params,
                    function (res) {
                        if (res.error == 1) {
                            HQdecorate.successMsg("操作成功", 1000, function () {
                                refresh();
                            })
                        } else if (res.error == -100) {
                            HQdecorate.faildMsg("请求超时", 1000)
                        }
                    },
                    function () {
                        HQdecorate.faildMsg("请求超时", 1000)
                    }
                );
            });
        }
    });

});

