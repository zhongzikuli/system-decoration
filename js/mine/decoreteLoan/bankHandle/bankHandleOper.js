$(function () {
    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });
    $(".i-checks").iCheck({checkboxClass: "icheckbox_square-green"});

    var validater = new ValidateWin("#bankHandleDiv");


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

    $("#bankHandleFileStatus").on("change", function (e, parmas) {
        if (parmas.selected == "1") {
            $(this).parent().removeClass("validation-error");
            $("#bankHandleForm").find("[type='checkbox']").attr("disabled", true).iCheck('uncheck');

        } else if (parmas.selected == "") {
            $(this).parent().addClass("validation-error");
        } else {
            $(this).parent().removeClass("validation-error");
            $("#bankHandleForm").find("[type='checkbox']").attr("disabled", false);
        }

    });

    //返回列表
    $("#bankHandleBackList").on("click", function () {
        window.location.href = ctx + "/bankHandle/query.action";
    });

    //更换审核
    $("#bankHandleChangeAuditBtn").on("click", function () {
        var idArr = $("#acceptId").val();
        HQdecorate.confirmDialog("确认更换审核吗？", true, {}, function () {
            var params = {
                idArr: idArr.toString()
            };
            var dataUrl = ctx + "/bankHandle/gotoHandle.action?acceptId=" + idArr;
            HQdecorate.post(
                ctx + "/bankHandle/changeAudit.action",
                params,
                function (res) {
                    if (res.error == 1) {
                        HQdecorate.successMsg("操作成功", 1000, function () {
                            // window.location.href = ctx + "/bankHandle/query.action";
                            HQdecorate.closeTabForParent(dataUrl);
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

    //-----------------------------------------------主要操作按钮---------------------------------------------------------
    //其他按钮
    $("#bankHandleRefuseOrderBtn,#bankHandleBackApplyBtn,#bankHandleOrderApplyBtn,#bankHandleSaveBtn,#bankHandleAgreeBtn").on("click", function () {

        //参数校验
        if (!validater.mySubmit(validater)) {
            return;
        }

        if ($("#bankHandleFileStatus").val() == "0") {
            var checked = $("input[type='checkbox']:checked");
            if (null == checked || checked == 'undefined' || checked.length <= 0) {
                HQdecorate.alertDialog("请勾选未齐全材料");
                return false;
            }
        }
        var _this = $(this);
        var text = _this.text();
        HQdecorate.confirmDialog("确认" + text + "吗？", true, {}, function () {
            var vo = {};
            var bankHandleEntity = {};
            bankHandleEntity.acceptId = $("#acceptId").val();
            bankHandleEntity.orderStatus = _this.attr("data-status");
            bankHandleEntity.bankHandleFileStatus = $("#bankHandleFileStatus").val();
            bankHandleEntity.bankHandleSuggest = $("#bankHandleSuggest").val();
            var dlFileNotCompleteEntities = new Array();
            $("input[name='bankHandelTypeOne']:checked").each(function () {
                var one = {};
                one.fileName = $(this).val();
                one.fileType = 1;
                one.fileCompleteStatus = bankHandleEntity.bankHandleFileStatus;
                one.businessOrderAcceptId = bankHandleEntity.acceptId;
                dlFileNotCompleteEntities.push(one);
            })

            $("input[name='bankHandelTypeTwo']:checked").each(function () {
                var one = {};
                one.fileName = $(this).val();
                one.fileType = 2;
                one.fileCompleteStatus = bankHandleEntity.bankHandleFileStatus;
                one.businessOrderAcceptId = bankHandleEntity.acceptId;
                dlFileNotCompleteEntities.push(one);
            })

            $("input[name='bankHandelTypeThree']:checked").each(function () {
                var one = {};
                one.fileName = $(this).val();
                one.fileType = 3;
                one.fileCompleteStatus = bankHandleEntity.bankHandleFileStatus;
                one.businessOrderAcceptId = bankHandleEntity.acceptId;
                dlFileNotCompleteEntities.push(one);
            })

            $("input[name='bankHandelTypeFour']:checked").each(function () {
                var one = {};
                one.fileName = $(this).val();
                one.fileType = 4;
                one.fileCompleteStatus = bankHandleEntity.bankHandleFileStatus;
                one.businessOrderAcceptId = bankHandleEntity.acceptId;
                dlFileNotCompleteEntities.push(one);
            })

            vo.dlBankHandleEntity = bankHandleEntity;
            vo.dlFileNotCompleteEntities = dlFileNotCompleteEntities;
            var operatorTypeNum = _this.attr("data-status");

            if (operatorTypeNum == -4) {//拒单
                vo.operatorType = "银行受理：拒单";
            } else if (operatorTypeNum == -2) {
                vo.operatorType = "银行受理：退回申请";
            } else if (operatorTypeNum == 1) {
                vo.operatorType = "银行受理：退回到业务受理";
            } else if (operatorTypeNum == 4) {
                vo.operatorType = "银行受理：保存";
            } else if (operatorTypeNum == 8) {
                vo.operatorType = "银行受理：同意";
            }
            var dataUrl = ctx + "/bankHandle/gotoHandle.action?acceptId=" + orderId;
            HQdecorate.jsonPost(
                ctx + "/bankHandle/updateBankHandle.action",
                JSON.stringify(vo),
                function (res) {
                    if (res.error == 1) {
                        HQdecorate.successMsg("操作成功", 1000, function () {
                            // window.location.href = ctx + "/bankHandle/query.action";
                            HQdecorate.closeTabForParent(dataUrl);
                        })
                    } else if (res.error == -100) {
                        HQdecorate.faildMsg("请求超时", 1000)
                    } else {
                        HQdecorate.faildMsg(res.message, 1000)
                    }
                },
                function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                }
            );
        });
    });
    //------------------------------------------------------------------------------------------------------------------
})

/**
 * 按时校验
 * @param _this
 * @returns {string}
 */
function bankHandleFileStatus(_this) {
    if (undefined !== _this && null != _this && "" !== _this) {
        if ($(_this).val() == null || $(_this).val() == "" || $.trim($(_this).val()) == "") {
            if ($(_this).attr("id") == "bankHandleFileStatus") {
                $(_this).parent().attr('tip', '资料提交情况为空，请选择。').addClass("validation-error");
                return "fail";
            } else if ($(_this).attr("id") == "bankHandleSuggest") {
                $(_this).parent().attr('tip', '受理意见为空，请重新输入。').addClass("validation-error");
                return "fail";
            }
            return "success";
        } else {
            if ($(_this).attr("id") == "bankHandleSuggest") {
                if ($(_this).val().length > 1000) {
                    $(_this).parent().attr('tip', '受理意见超出1000，请重新输入。').addClass("validation-error");
                    return "fail";
                }
            }
            return "success";
        }
        return "success";
    }
}