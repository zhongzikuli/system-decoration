jQuery(function ($) {
    $(".bankStatus").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "280px"
    });
    $(".status").chosen({
        disable_search_threshold	: 8,
        no_results_text				: "没有找到",
        allow_single_deselect		: true,
        width: "160px"
    });
    $(".reset-btn").on("click", function(){
        $(".bankStatus").val("");
        $(".bankStatus").trigger("chosen:updated");
        $(".status").val("");
        $(".status").trigger("chosen:updated");
    });
})
//刪除
function deleteBankRate() {
    var ck = $("input[name='bankRate_input']:checked");
    if (ck.length == 0) {
        HQdecorate.alertDialog("请选择要删除的记录");
        return
    } else {
        var idArr = new Array();
        $(ck).each(function () {
            idArr.push($(this).val());
            if ($(this).attr("isvalid") == "0") {
                HQdecorate.alertDialog("所选信息包含无效账户，不允许删除");
                return false;
            }
        });
        HQdecorate.confirmDialog("确认删除选中的银行信息吗？", true, {}, function () {
            var param = {}
            param.idArr = idArr.toString();

            HQdecorate.post(
                ctx + "/bankRate/delete.action",
                param,
                function (res) {
                    flag = false;
                    if (res.error == 1) {
                        HQdecorate.successMsg("操作成功", 1000, function () {
                            window.location.href = ctx + "/bankRate/query.action";
                        })
                    } else if (res.error == -100) {
                        flag = true;
                        HQdecorate.faildMsg("请求超时", 1000)
                    }
                },
                function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                }
            );
        });
    }
}

var config1 = {
    disable_search_threshold:10,
    no_results_text: '无数据',
    width:"150px"
};

var config = {
    disable_search_threshold:10,
    no_results_text: '无数据',
    width:"100%"
};

//新增
function createBankRate() {
    var options = {
        width: 400,
        top: 200,
        height: 450,
        overlay: true,
        dispose: true,
        move: true,
        title: '银行利率管理',
        onAfterShow:function () {
        },
        callback: function () {
            if ($("#bankRateForm").valid("bankRateForm")) {
                var param = {};
                param.bankId = $("#bankId").val();
                param.years = $("#years").val();
                param.rate = $("#rate").val();
                HQdecorate.post(
                    ctx + "/bankRate/add.action",
                    param,
                    function (res) {
                        flag = false;
                        if (res.error == 1) {
                            HQdecorate.successMsg("操作成功", 1000, function () {
                                window.location.href = ctx + "/bankRate/query.action";
                            })
                        } else if (res.error == -100) {
                            flag = true;
                            HQdecorate.faildMsg("请求超时", 1000)
                        } else {
                            HQdecorate.alertDialog(res.message);
                        }
                    },
                    function (res) {
                        HQdecorate.faildMsg(res.responseText, 1000)
                    }
                );
            }else {
                return false;
            }
        }
    };
    creatDlg = new Dialog("#bankRate-dialog", options);
    creatDlg.show();
}

//刷新
function refresh() {
    window.location.href = ctx + "/bankRate/query.action";
}

//编辑
function editInfo(id) {
    var options = {
        width: 400,
        top: 200,
        height: 450,
        overlay: true,
        dispose: true,
        move: true,
        title: '编辑',
        onAfterShow: function () {

            HQdecorate.post(
                ctx + "/bankRate/toEdit.action",
                {
                    id: id
                },
                function (res) {
                    flag = false;
                    if (res.error == 1) {
                        var bankRate = res.rows;
                        $("#id").val(id);
                        $("#bankId_edit").val(bankRate.bankId);
                        $("#years_edit").val(bankRate.years);
                        $("#rate_edit").val(bankRate.rate);
                    } else if (res.error == -100) {
                        flag = true;
                        HQdecorate.faildMsg("请求超时", 1000)
                    }
                    //显示下拉框
                    $("#bankId_edit").chosen(config).on('change', function (e, selected) {
                        if ("" != selected) {
                            change_error_style($("#bankId_edit").parent(), "remove");
                        } else {
                            change_error_style($("#bankId_edit").parent(), "add");
                        }
                    });
                    $("#years_edit").chosen(config).on('change', function (e, selected) {
                        if ("" != selected) {
                            change_error_style($("#years_edit").parent(), "remove");
                        } else {
                            change_error_style($("#years_edit").parent(), "add");
                        }
                    });
                },
                function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                }
            );
        },
        callback: function () {
            var param = {};
            param.id = id;
            param.bankId = $("#bankId_edit").val();
            param.years = $("#years_edit").val();
            param.rate = $("#rate_edit").val();

            if ($("#bankRateForm_edit").valid("bankRateForm_edit")) {
                HQdecorate.post(
                    ctx + "/bankRate/update.action",
                    param,
                    function (res) {
                        flag = false;
                        if (res.error == 1) {
                            HQdecorate.successMsg("操作成功", 1000, function () {
                                window.location.href = ctx + "/bankRate/query.action";
                            })
                        } else if (res.error == -100) {
                            flag = true;
                            HQdecorate.faildMsg("请求超时", 1000)
                        } else {
                            HQdecorate.alertDialog(res.message);
                        }
                    },
                    function () {
                        HQdecorate.faildMsg("请求超时", 1000)
                    }
                );
            }else {
                return false;
            }
        }
    };
    var editAdvDlg = new Dialog("#bankRateEdit-dialog", options);
    editAdvDlg.show();
}

//表单校验
function bankForm(lableId){
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "bankId" || $(lableId).attr("id") == "bankId_edit") {
                $(lableId).attr('tip', '银行为空，请选择。').addClass("validation-error");
                return "faild";
            }else if  ($(lableId).attr("id") == "years" || $(lableId).attr("id") == "years_edit") {
                $(lableId).attr('tip', '年限为空，请选择。').addClass("validation-error");
                return "faild";
            }else if ($(lableId).attr("id") == "rate" || $(lableId).attr("id") == "rate_edit") {
                $(lableId).attr('tip', '银行利率为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}