$(function () {
    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "260px"
    });
    //----------------------客户历史订单----------------------------------------------------------------------------------
    var orderId = $("#order_id").val();
    var cardNo = $("#card_no").val();
    var realName = $("#real_name").val();


    //大数据征信
    HQdecorate.post(ctx + "/risk/getBigDataCredit.action", {
        "acceptId"	: orderId
    }, function(data){
        for(var i=0; i<data["rows"].length; i++){
            $("#risk_data_list").find("input").each(function(index, n){
                var name = $(n).attr("name");
                if(name == "isBlack"){
                    $(n).val(data["rows"][i][name] == 1 ? "是" : "否");
                }else if(name == "mobileOnlineTime"){
                    $("#mobile_online_time").html(data["rows"][i][name]);
                }else{
                    $(n).val(data["rows"][i][name]);
                }
            });
        }
    }, function(){
        console.log("error");
    }, "#risk_data_list");

    // 查询征信、征信详情查看按钮
    var isQueryed = false;
    $(".query-credit-btn").on("click", function () {
        if(isQueryed){
            return;
        }else{
            isQueryed = true;
        }
        HQdecorate.loadingShow();
        var _this = $(this);
        _this.addClass("disabled").attr("disabled", "disabled");
        $.ajax({
            url		: ctx + '/risk/queryForLoan.action?acceptId=' + orderId,
            type	: "post",
            dataType: "json",
            async	: false,
            success	: function (data) {
                HQdecorate.loadingHide();
                isQueryed = false;
                _this.removeClass("disabled").removeAttr("disabled");
                if (data.error == 1) {
                    for(var i=0; i<data["rows"].length; i++){
                        $("#risk_data_list").find("input").each(function(index, n){
                            var name = $(n).attr("name");
                            if(name == "isBlack"){
                                $(n).val(data["rows"][i][name] == 1 ? "是" : "否");
                            }else if(name == "mobileOnlineTime"){
                                $("#mobile_online_time").html(data["rows"][i][name]);
                            }else{
                                $(n).val(data["rows"][i][name]);
                            }
                        });
                        _this.attr("disabled","disabled");
                    }
                } else if (data.error == -100) {
                    HQdecorate.faildMsg("会话超时，请重新登陆！");
                } else {
                    HQdecorate.faildMsg(data.message);
                }
            }
        });
    });

    // 详情查看
    new LoanCreditQuery(".detail-credit-btn", orderId);

    //获取历史订单
    HQdecorate.post(ctx + "/dlBusinessHandle/getOrderHistory.action", {
        id			: orderId,
        realName	: realName,
        cardNo		: cardNo
    }, function(data){
        var html = createHistoryTable(data["rows"]);
        $("#detail_history_order").empty().html(html);

        //初始化详情按钮
        $(".detail").on("click", function(){
            var _this = this;
            var acceptId = $(_this).attr("data-id");
            var dataTitle = $(_this).attr("data-title");
            var dataHref = $(_this).attr("data-href");
            HQdecorate.openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
        });

    }, function(){
        console.log("error");
    }, "#detail_history_order");

    //创建历史订单表格
    function createHistoryTable(rows){
        var html = '<table class="table table-bordered">';
        html += '<thead>';
        html += '<th style="width:15%;">客户姓名</th>';
        html += '<th style="width:15%;">身份证号码</th>';
        html += '<th style="width:10%;">订单状态</th>';
        html += '<th style="width:10%;">贷款申请时间</th>' ;
        html += '<th style="width:15%;">操作</th></tr></thead>';
        html += '<tbody>';
        if (null == rows || rows.length <= 0) {
            html += '<td class="col-td text-center" colspan="7">暂无历史订单</td>';
        } else {
            for (var i = 0; i < rows.length; i++) {
                html += '<tr>';
                html += '<td class="cel">' + rows[i]["realName"] + '</td>';
                html += '<td class="cel" title="' + rows[i]["cardNo"] + '">' + rows[i]["cardNo"] + '</td>';
                html += '<td class="cel" title="' + rows[i]["orderStatusName"] + '">' + rows[i]["orderStatusName"] + '</td>';
                html += '<td class="cel">' + rows[i]["applyLoanTimeStr"] + '</td>';
                html += '<td><a data-id="' + rows[i]["id"] + '" data-title="'+rows[i]["realName"]+'" data-href="'+ ctx +'/dlBusinessHandle/detail.action?id=' + rows[i]["id"] +'" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>订单(' + rows[i]["orderNo"] + ')</a></td></tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }
    //------------------------------------------------------------------------------------------------------------------
    var validater = new ValidateWin("#secondLendingDiv");
    //返回列表
    $("#secondLendingBackList").on("click", function () {
        window.location.href = ctx + "/secondLending/secondLendingQuery.action";
    });

    //更换审核
    $("#secondLendingChangeAuditBtn").on("click", function () {
        var idArr = $("#acceptId").val();
        HQdecorate.confirmDialog("确认更换审核吗？", true, {}, function () {
            var params = {
                idArr: idArr.toString()
            };

            HQdecorate.post(
                ctx + "/bankHandle/changeAudit.action",
                params,
                function (res) {
                    if (res.error == 1) {
                        HQdecorate.successMsg("操作成功", 1000, function () {
                            window.location.href = ctx + "/secondLending/secondLendingQuery.action";
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
    });
    //其他按钮
    $("#secondLendingRefuseOrderBtn,#secondLendingBackApplyBtn,#secondLendingOrderApplyBtn,#secondLendingSaveBtn,#secondLendingAgreeBtn").on("click", function () {
        // 初始化审核表单校验
        if (!validater.mySubmit(validater)) {
            return;
        }
        var _this = $(this);
        var text = _this.text();
        HQdecorate.confirmDialog("确认" + text + "吗？", true, {}, function () {
        var entity = {};
        var acceptId = $("#acceptId").val();
        if (null == acceptId || "" == acceptId) {
            HQdecorate.faildMsg("订单编号不存在");
            return;
        }
        var orderStatus=_this.attr("data-status");
        entity.acceptId = acceptId;
        entity.orderStatus = orderStatus;
        if(orderStatus == 24||orderStatus == 28){
            entity.money = $("#search-money").val();
        }
        entity.suggest = $("#secondLendingSuggest").val();
        if (orderStatus == -4) {//拒单
            entity.operatorTypeStr = "二次打款：拒单";
        } else if (orderStatus == -2) {
            entity.operatorTypeStr = "二次打款：退回申请";
        } else if (orderStatus == 20) {
            entity.operatorTypeStr = "二次打款：退回到一次放款";
        } else if (orderStatus == 24) {
            entity.operatorTypeStr = "二次打款：保存";
        } else if (orderStatus == 28) {
            entity.operatorTypeStr = "二次打款：同意";
        }
        var dataUrl = ctx + "/secondLending/goSecondLending.action?acceptId=" + acceptId;
        HQdecorate.jsonPost(
            ctx + "/secondLending/updateSecondLending.action",
            JSON.stringify(entity),
            function (res) {
                if (res.error == 1) {
                    HQdecorate.successMsg("操作成功", 1000, function () {
                        HQdecorate.closeTabForParent(dataUrl);
                    })
                } else if (res.error == -100) {
                    HQdecorate.faildMsg("请求超时", 1000)
                } else if (res.error == -1) {
                    HQdecorate.faildMsg(res.message, 1000)
                }
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }
        );
    });
  });

})
