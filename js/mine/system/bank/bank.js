$(document).ready(function () {
    var config = {
        disable_search_threshold: 10,
        no_results_text: '无数据',
        width: "100%"
    };
    $(".btn-add").on("click", function () {
        createBank(config)
    });
    $(".btn-delete").on("click", function () {
        deleteBank()
    });
    $(".btn-edit").on("click", function () {
        var id = $(this).attr("data-id");
        editInfo(id, config)
    });


    //新增
    function createBank(config) {
        var options = {
            width: 505,
            top: 200,
            height: 350,
            overlay: true,
            dispose: true,
            move: true,
            title: '银行管理',
            onAfterShow: function () {
                $(".loan_type_1,.loan_type_2").hide();
                //城市组件
                init_city_select($("#province"), 2);
                $("#loan_type").chosen(config).on('change', function (e, params) {
                    if ("" != params.selected) {
                        change_error_style($("#loan_type").parent(), "remove");
                        if (params.selected == "1") {
                            //房屋面积比列
                            $(".dialog-container").height(570);
                            $(".loan_type_1").show();
                            $(".loan_type_2").hide()
                        } else if (params.selected == "2") {
                            //房屋实际面积
                            $(".dialog-container").height(450);
                            $(".loan_type_1").hide();
                            $(".loan_type_2").show()
                        }
                    } else {
                        $(".dialog-container").height(350);
                        $(".loan_type_1, .loan_type_2").hide();
                        change_error_style($("#loan_type").parent(), "add");
                    }
                });
            },
            callback: function () {
                if ($("#bankForm").valid("bankForm")) {
                    //表单验证
                    var bankForm = true;
                    if ($("#loan_type").val() == 1) {
                        bankForm = bankFormInner($("#lt90")) ? bankForm : false;
                        bankForm = bankFormInner($("#gt90Lt140")) ? bankForm : false;
                        bankForm = bankFormInner($("#gt140")) ? bankForm : false;
                        bankForm = bankFormInner($("#ratioOfHouseMoney")) ? bankForm : false;
                    } else if ($("#loan_type").val() == 2) {
                        bankForm = bankFormInner($("#perSquareMeter")) ? bankForm : false;
                        bankForm = bankFormInner($("#maxLoanMoney")) ? bankForm : false;
                    }
                    bankForm = bankFormInner($("#province")) ? bankForm : false;
                    if (!bankForm) return false;

                    var param = {};
                    param.bankName = $("#bankName").val();
                    param.bankShortName = $("#bankShortName").val();
                    param.bankCode = $("#bankCode").val();
                    param.bankProvince = $("#province").val();
                    param.loanType = $("#loan_type").val();
                    if (param.loanType == 1) {
                        param.lt90 = $("#lt90").val();
                        param.gt90Lt140 = $("#gt90Lt140").val();
                        param.gt140 = $("#gt140").val();
                        param.ratioOfHouseMoney = $("#ratioOfHouseMoney").val();
                    } else if (param.loanType == 2) {
                        param.perSquareMeter = $("#perSquareMeter").val();
                        param.maxLoanMoney = $("#maxLoanMoney").val();
                    }
                    HQdecorate.post(
                        ctx + "/bank/add.action",
                        param,
                        function (res) {
                            if (res.error == 1) {
                                HQdecorate.successMsg("操作成功", 1000, function () {
                                    window.location.href = ctx + "/bank/query.action";
                                })
                            } else if (res.error == -100) {
                                HQdecorate.faildMsg("请求超时", 1000)
                            } else {
                                HQdecorate.alertDialog(res.message);
                            }
                        },
                        function (res) {
                            HQdecorate.faildMsg(res.responseText, 1000)
                        }
                    );
                } else {
                    return false;
                }
            }
        };
        var creatDlg = new Dialog("#bank-dialog", options);

        //转拼音
        $("#bankShortName").blur(function () {
            var bankShortName = $("#bankShortName").val();
            if (null != bankShortName) {
                $.ajax({
                    url: ctx + "/bank/changeToPinyin.action",
                    type: "post",
                    data: {
                        bankShortName: bankShortName
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            $("#bankCode").val(data.rows);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            }
        });

        creatDlg.show();
    }

    //刪除
    function deleteBank() {
        var ck = $("input[name='bank_input']:checked");
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
                var param = {};
                param.idArr = idArr.toString();

                HQdecorate.post(
                    ctx + "/bank/delete.action",
                    param,
                    function (res) {
                        if (res.error == 1) {
                            HQdecorate.successMsg("操作成功", 1000, function () {
                                window.location.href = ctx + "/bank/query.action";
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
        }
    }

    //编辑
    function editInfo(id, config) {
        var options = {
            width: 505,
            top: 200,
            height: 570,
            overlay: true,
            dispose: true,
            move: true,
            title: '编辑',
            onAfterShow: function () {
                $(".loan_type_1_edit,.loan_type_2_edit").hide();
                //城市组件
                init_city_select($("#province_edit"), 2);
                $("#loan_type_edit").chosen(config).on('change', function (e, params) {
                    if ("" != params.selected) {
                        change_error_style($("#loan_type_edit").parent(), "remove");
                        if (params.selected == "1") {
                            //房屋面积比列
                            $(".dialog-container").height(570);
                            $(".loan_type_1_edit").show();
                            $(".loan_type_2_edit").hide();
                        } else if (params.selected == "2") {
                            //房屋实际面积
                            $(".dialog-container").height(450);
                            $(".loan_type_1_edit").hide();
                            $(".loan_type_2_edit").show();
                        }
                    } else {
                        $(".dialog-container").height(350);
                        $(".loan_type_1_edit, .loan_type_2_edit").hide();
                        change_error_style($("#loan_type_edit").parent(), "add");
                    }
                });
                HQdecorate.post(
                    ctx + "/bank/toEdit.action",
                    {id: id},
                    function (res) {
                        var flag = false;
                        if (res.error == 1) {
                            var bank = res.rows;
                            $("#id").val(id);
                            $("#bankName_edit").val(bank.bankName);
                            $("#bankShortName_edit").val(bank.bankShortName);
                            $("#bankCode_edit").val(bank.bankCode);
                            $("#province_edit").val(bank.bankProvince + "-" + bank.bankCity);
                            $("#loan_type_edit").val(bank.loanType).trigger("chosen:updated");
                            $("#lt90_edit").val(bank.lt90);
                            $("#gt90Lt140_edit").val(bank.gt90Lt140);
                            $("#gt140_edit").val(bank.gt140);
                            $("#ratioOfHouseMoney_edit").val(bank.ratioOfHouseMoney);
                            $("#perSquareMeter_edit").val(bank.perSquareMeter);
                            $("#maxLoanMoney_edit").val(bank.maxLoanMoney);
                            if (bank.loanType == 1) {
                                //房屋面积比列
                                $(".loan_type_1_edit").show();
                                $(".loan_type_2_edit").hide();
                            } else if (bank.loanType == 2) {
                                //房屋实际面积
                                $(".loan_type_1_edit").hide();
                                $(".loan_type_2_edit").show();
                            }
                        } else if (res.error == -100) {
                            flag = true;
                            HQdecorate.faildMsg("请求超时", 1000)
                        }
                    },
                    function (res) {
                        HQdecorate.faildMsg(res.responseText, 1000)
                    }
                );
                $("#loan_type_edit").chosen(config);
                $("#loan_type_edit").on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($("#loan_type_edit").parent(), "remove");
                    } else {
                        change_error_style($("#loan_type_edit").parent(), "add");
                    }
                });
            },
            callback: function () {
                //表单验证
                var bankForm = true;
                if ($("#loan_type_edit").val() == 1) {
                    bankForm = bankFormInner($("#lt90_edit")) ? bankForm : false;
                    bankForm = bankFormInner($("#gt90Lt140_edit")) ? bankForm : false;
                    bankForm = bankFormInner($("#gt140_edit")) ? bankForm : false;
                    bankForm = bankFormInner($("#ratioOfHouseMoney_edit")) ? bankForm : false;
                } else if ($("#loan_type_edit").val() == 2) {
                    bankForm = bankFormInner($("#perSquareMeter_edit")) ? bankForm : false;
                    bankForm = bankFormInner($("#maxLoanMoney_edit")) ? bankForm : false;
                }
                bankForm = bankFormInner($("#province_edit")) ? bankForm : false;
                if (!bankForm) return false;

                var param = {};
                param.id = id;
                param.bankName = $("#bankName_edit").val();
                param.bankShortName = $("#bankShortName_edit").val();
                param.bankCode = $("#bankCode_edit").val();
                param.bankProvince = $("#province_edit").val();
                param.loanType = $("#loan_type_edit").val();
                param.lt90 = $("#lt90_edit").val();
                param.gt90Lt140 = $("#gt90Lt140_edit").val();
                param.gt140 = $("#gt140_edit").val();
                param.ratioOfHouseMoney = $("#ratioOfHouseMoney_edit").val();
                param.perSquareMeter = $("#perSquareMeter_edit").val();
                param.maxLoanMoney = $("#maxLoanMoney_edit").val();

                if ($("#bankForm_edit").valid("bankForm_edit")) {
                    HQdecorate.post(
                        ctx + "/bank/update.action",
                        param,
                        function (res) {
                            flag = false;
                            if (res.error == 1) {
                                HQdecorate.successMsg("操作成功", 1000, function () {
                                    window.location.href = ctx + "/bank/query.action";
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
                } else {
                    return false;
                }
            }
        };
        var editAdvDlg = new Dialog("#bankEdit-dialog", options);


        $("#bankShortName_edit").blur(function () {
            var bankShortName_edit = $("#bankShortName_edit").val();
            if (null != bankShortName_edit) {
                $.ajax({
                    url: ctx + "/bank/changeToPinyin.action",
                    type: "post",
                    data: {
                        bankShortName: bankShortName_edit
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.error == 1) {
                            $("#bankCode_edit").val(data.rows);
                        } else if (data.error == -100) {
                            faildMsg("会话超时，请重新登陆！");
                        } else {
                            faildMsg(data.message);
                        }
                    }
                });
            }
        });
        editAdvDlg.show();
    }
});


//表单验证（提交前验证）
function bankFormInner(lableId) {
    var id = $(lableId).attr("id");
    var val = $(lableId).val();
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "lt90" || $(lableId).attr("id") == "lt90_edit") {
                $(lableId).attr('tip', '面积㎡ < 90 可贷额度为空，请重新输入。').addClass("validation-error");
                return false;
            } else if ($(lableId).attr("id") == "gt90Lt140" || $(lableId).attr("id") == "gt90Lt140_edit") {
                $(lableId).attr('tip', '90 ≤ 面积㎡ ≤ 140可贷额为空，请重新输入。').addClass("validation-error");
                return false;
            } else if ($(lableId).attr("id") == "gt140" || $(lableId).attr("id") == "gt140_edit") {
                $(lableId).attr('tip', '面积㎡ > 140可贷额度为空，请重新输入。').addClass("validation-error");
                return false;
            } else if ($(lableId).attr("id") == "ratioOfHouseMoney" || $(lableId).attr("id") == "ratioOfHouseMoney_edit") {
                $(lableId).attr('tip', '占房产价值比例为空，请重新输入。').addClass("validation-error");
                return false;
            } else if ($(lableId).attr("id") == "perSquareMeter" || $(lableId).attr("id") == "perSquareMeter_edit") {
                $(lableId).attr('tip', '每平面积可贷额度为空，请重新输入。').addClass("validation-error");
                return false;
            } else if ($(lableId).attr("id") == "maxLoanMoney" || $(lableId).attr("id") == "maxLoanMoney_edit") {
                $(lableId).attr('tip', '最高可贷额度为空，请重新输入。').addClass("validation-error");
                return false;
            }
            return true;
        }
        if (($(lableId).attr("id") == "province" || $(lableId).attr("id") == "province_edit") && $(lableId).val() == "-") {
            $(lableId).attr('tip', '城市区域为空，请重新输入。').addClass("validation-error");
            return false;
        }
        return true;
    }
}

//表单校验
function bankForm(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "bankName") {
                $(lableId).attr('tip', '银行名称为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "bankCode") {
                $(lableId).attr('tip', '银行标识为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "bankName_edit") {
                $(lableId).attr('tip', '银行名称为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "bankCode_edit") {
                $(lableId).attr('tip', '银行标识为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "bankShortName") {
                $(lableId).attr('tip', '银行简称为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "bankShortName_edit") {
                $(lableId).attr('tip', '银行简称为空，请重新输入。');
                return "faild";
            } else if ($(lableId).attr("id") == "loan_type" ||
                $(lableId).attr("id") == "loan_type_edit") {
                $(lableId).parent().attr('tip', '请选择最高可贷额度方式。').addClass("validation-error");
                return "faild";
            }
            return "success";
        }
        return "success";
    }
}




