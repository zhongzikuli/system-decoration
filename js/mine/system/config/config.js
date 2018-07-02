$(function () {

    var config = {
        disable_search_threshold: 10,
        no_results_text: '无数据',
        width: "150px"
    };

    $("#search-select").chosen(config);

    $(".setTime").on("click", function () {
        set();
    })

    $(".jumpCheck").on("click", function () {
        jumpCheck();
    })

    $(".setYearRemind").on("click", function () {
        setYearRemind();
    });

    $(".setSalesmanTurnsOnRule").on("click", function () {
        setSalesmanTurnsOnRule();
    });

    $(".salesmanTurnsOutRule").on("click", function () {
        salesmanTurnsOutRule();
    });

    $(".managerTurnsOutRule").on("click", function () {
        managerTurnsOutRule();
    });

    $(".saleTurnsOnRemain").on("click", function () {
        saleTurnsOnRemain();
    });

    $(".turnOutRemainDays").on("click", function () {
        turnOutRemainDays();
    });
    //自动审批合同价
    $(".autoApprovalContractPrice").on("click", function () {
        autoApprovalContractPrice();
    });



    $("#setting").bootstrapSwitch({
        onColor: "success",
        offColor: "danger",
        size:	"mini",
        onSwitchChange: function (e, state) {
            var url= ctx + "/CreditConfig/autoApprovalContractPrice.action";
            if (state == true) {
                setting(1,16,url);
            } else {
                setting(0,16,url);
            }

        }
    });
    $("#isTongDunBigDataSearch").bootstrapSwitch({
        onColor: "success",
        offColor: "danger",
        size:	"mini",
        onSwitchChange: function (e, state) {
            var url= ctx + "/CreditConfig/autoApprovalContractPrice.action";
            if (state == true) {
                setting(1,17,url);
            } else {
                setting(0,17,url);
            }
        }
    });
    $("#setRepmentRemainPhoneMessage").bootstrapSwitch({
        onColor: "success",
        offColor: "danger",
        size:	"mini",
        onSwitchChange: function (e, state) {
            var url= ctx + "/CreditConfig/autoApprovalContractPrice.action";
            if (state == true) {
                setting(1,15,url);
            } else {
                setting(0,15,url);
            }

        }
    });
    $("#setWechatMessage").bootstrapSwitch({
        onColor: "success",
        offColor: "danger",
        size:	"mini",
        onSwitchChange: function (e, state) {
            var url= ctx + "/CreditConfig/autoApprovalContractPrice.action";
            if (state == true) {
                setting(1,14,url);
            } else {
                setting(0,14,url);
            }

        }
    });
    $("#setFirstAuditVideoInteriew").bootstrapSwitch({
        onColor: "success",
        offColor: "danger",
        size:	"mini",
        onSwitchChange: function (e, state) {
            var url= ctx + "/CreditConfig/autoApprovalContractPrice.action";
            if (state == true) {
                setting(1,13,url);
            } else {
                setting(0,13,url);
            }

        }
    });
    $("#setTongdunBigDataSearchEntity").bootstrapSwitch({
        onColor: "success",
        offColor: "danger",
        size:	"mini",
        onSwitchChange: function (e, state) {
            var url= ctx + "/CreditConfig/autoApprovalContractPrice.action";
            if (state == true) {
                setting(1,12,url);
            } else {
                setting(0,12,url);
            }

        }
    });
    $("#setAutoApprovalContractPriceEntity").bootstrapSwitch({
        onColor: "success",
        offColor: "danger",
        size:	"mini",
        onSwitchChange: function (e, state) {
            var url= ctx + "/CreditConfig/autoApprovalContractPrice.action";
            if (state == true) {
                setting(1,10,url);
            } else {
                setting(0,10,url);
            }

        }
    });
    $("#setAutoAppConfig").bootstrapSwitch({
        onColor: "success",
        offColor: "danger",
        size:	"mini",
        onSwitchChange: function (e, state) {
            var url= ctx + "/CreditConfig/autoApprovalContractPrice.action";
            if (state == true) {
                setting(1,9,url);
            } else {
                setting(0,9,url);
            }

        }
    });

    function setting(value,type,url){
        HQdecorate.post(
            url,
            {type: type, value: value},
            function (res) {
                flag = false;
                if (res.error == 1) {
                    HQdecorate.successMsg("操作成功", 1000, function () {
                        window.location.href = ctx + "/CreditConfig/query.action";
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
    };


    function autoApprovalContractPrice(){
        var options = {
            width: 440,
            top: 150,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            title: '设置',
            onAfterShow: function () {
                $.ajax({
                    url: ctx + "/CreditConfig/getAutoApprovalContractPrice.action",
                    type: "post",
                    data: {type: $("#autoApprovalContractPrice").val()},
                    dataType: "json",
                    success: function (data) {
                        $("#autoApprovalContractPriceInput").val(data.rows.globalValue)
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#autoApprovalContractPriceForm").valid("autoApprovalContractPriceForm")) {
                    $.ajax({
                        url: ctx + "/CreditConfig/autoApprovalContractPrice.action",
                        type: "post",
                        data: {
                            value: $("#autoApprovalContractPriceInput").val(),
                            type: $("#autoApprovalContractPrice").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("操作成功！", 1000, function () {
                                    window.location.href = ctx + "/CreditConfig/query.action";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#autoApprovalContractPrice-dialog", options);
        creatDlg.show();
    }


    //业务员淘汰提醒天数
    function turnOutRemainDays() {
        var options = {
            width: 440,
            top: 150,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            title: '设置',
            onAfterShow: function () {
                $.ajax({
                    url: ctx + "/CreditConfig/turnOutRemainDays.action",
                    type: "post",
                    data: {type: $("#turnOutRemainDays").val()},
                    dataType: "json",
                    success: function (data) {
                        $("#turnOutRemain").val(data.rows.globalValue)
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#turnOutRemainDaysForm").valid("turnOutRemainDaysForm")) {
                    $.ajax({
                        url: ctx + "/CreditConfig/setDepManTurnsOutRule.action",
                        type: "post",
                        data: {
                            globalValue: $("#turnOutRemain").val(),
                            type: $("#turnOutRemainDays").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("设置业务员淘汰提前提醒天数成功！", 1000, function () {
                                    window.location.href = ctx + "/CreditConfig/query.action";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#turnOutRemainDays-dialog", options);
        creatDlg.show();
    }

    //业务员转正提醒天数
    function saleTurnsOnRemain() {
        var options = {
            width: 400,
            top: 150,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            title: '设置',
            onAfterShow: function () {
                $.ajax({
                    url: ctx + "/CreditConfig/saleTurnsOnRemain.action",
                    type: "post",
                    data: {type: $("#saleTurnsOnRemain").val()},
                    dataType: "json",
                    success: function (data) {
                        $("#salesTurnsOnRemain").val(data.rows.globalValue)
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#saleTurnsOnRemainForm").valid("saleTurnsOnRemainForm")) {
                    $.ajax({
                        url: ctx + "/CreditConfig/setDepManTurnsOutRule.action",
                        type: "post",
                        data: {
                            globalValue: $("#salesTurnsOnRemain").val(),
                            type: $("#saleTurnsOnRemain").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("设置部门经理淘汰规则成功！", 1000, function () {
                                    window.location.href = ctx + "/CreditConfig/query.action";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#saleTurnsOnRemain-dialog", options);
        creatDlg.show();
    }

    //部门经理淘汰规则
    function managerTurnsOutRule() {
        var options = {
            width: 400,
            top: 150,
            height: 220,
            overlay: true,
            dispose: true,
            move: true,
            title: '设置',
            onBeforeShow: function () {
                $.ajax({
                    url: ctx + "/CreditConfig/managerTurnsOutRule.action",
                    type: "post",
                    data: {type: $("#managerTurnsOutRule").val()},
                    dataType: "json",
                    success: function (data) {
                        $("#depAvgLoanMoney").val(data.rows.depAvgLoanMoney)
                        $("#depWorkTimeTurnsOut").val(data.rows.workTime).trigger('chosen:updated');
                    }
                });
            },
            onAfterShow: function () {
                var config = {
                    disable_search_threshold: 10,
                    no_results_text: '无数据',
                    width: "100%"
                };
                $("#depWorkTimeTurnsOut").chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($("#depWorkTimeTurnsOut").parent(), "remove");
                    } else {
                        change_error_style($("#depWorkTimeTurnsOut").parent(), "add");
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#departmentManTurnsOutRuleForm").valid("departmentManTurnsOutRuleForm")) {
                    $.ajax({
                        url: ctx + "/CreditConfig/setalesmanTurnsOnRule.action",
                        type: "post",
                        data: {
                            workTime: $("#depWorkTimeTurnsOut").val(),
                            depAvgLoanMoney: $("#depAvgLoanMoney").val(),
                            type: $("#managerTurnsOutRule").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("设置部门经理淘汰规则成功！", 1000, function () {
                                    window.location.href = ctx + "/CreditConfig/query.action";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#departmentManTurnsOutRule-dialog", options);
        creatDlg.show();
    }

    //业务员淘汰规则
    function salesmanTurnsOutRule() {
        var options = {
            width: 370,
            top: 150,
            height: 250,
            overlay: true,
            dispose: true,
            move: true,
            title: '设置',
            onBeforeShow: function () {
                $.ajax({
                    url: ctx + "/CreditConfig/salesmanTurnsOutRule.action",
                    type: "post",
                    data: {type: $("#salesmanTurnsOutRule").val()},
                    dataType: "json",
                    success: function (data) {
                        $("#workTimeTurnsOut").val(data.rows.workTime).trigger('chosen:updated');
                        $("#orderNumberTurnsOut").val(data.rows.orderNumber)
                        $("#loanMoneyTurnsOut").val(data.rows.loanMoney)
                    }
                });
            },
            onAfterShow: function () {
                var config = {
                    disable_search_threshold: 10,
                    no_results_text: '无数据',
                    width: "100%"
                };
                $("#workTimeTurnsOut").chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($("#workTimeTurnsOut").parent(), "remove");
                    } else {
                        change_error_style($("#workTimeTurnsOut").parent(), "add");
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#salesmanTurnsOutRuleForm").valid("salesmanTurnsOutRuleForm")) {
                    $.ajax({
                        url: ctx + "/CreditConfig/setalesmanTurnsOnRule.action",
                        type: "post",
                        data: {
                            workTime: $("#workTimeTurnsOut").val(),
                            orderNumber: $("#orderNumberTurnsOut").val(),
                            loanMoney: $("#loanMoneyTurnsOut").val(),
                            type: $("#salesmanTurnsOutRule").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("设置业务员淘汰规则成功！", 1000, function () {
                                    window.location.href = ctx + "/CreditConfig/query.action";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#salesmanTurnsOutRule-dialog", options);
        creatDlg.show();
    }

    //业务员转正规则
    function setSalesmanTurnsOnRule() {
        var options = {
            width: 370,
            top: 150,
            height: 200,
            overlay: true,
            dispose: true,
            move: true,
            title: '设置',
            onBeforeShow: function () {
                $.ajax({
                    url: ctx + "/CreditConfig/salesmanTurnsOnRule.action",
                    type: "post",
                    data: {type: $("#salesmanTurnsOnRule").val()},
                    dataType: "json",
                    success: function (data) {
                        $("#orderNumber").val(data.rows.orderNumber)
                        $("#loanMoney").val(data.rows.loanMoney)
                    }
                });
            },
            onAfterShow: function () {
                var config = {
                    disable_search_threshold: 10,
                    no_results_text: '无数据',
                    width: "100%"
                };
                $("#workTime").chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($("#workTime").parent(), "remove");
                    } else {
                        change_error_style($("#workTime").parent(), "add");
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#salesmanTurnsOnRuleForm").valid("salesmanTurnsOnRuleForm")) {
                    $.ajax({
                        url: ctx + "/CreditConfig/setalesmanTurnsOnRule.action",
                        type: "post",
                        data: {
                            orderNumber: $("#orderNumber").val(),
                            loanMoney: $("#loanMoney").val(),
                            type: $("#salesmanTurnsOnRule").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("设置业务员转正规则成功！", 1000, function () {
                                    window.location.href = ctx + "/CreditConfig/query.action";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#salesmanTurnsOnRule-dialog", options);
        creatDlg.show();
    }

    //设置二手车年限提醒
    function setYearRemind() {
        var options = {
            width: 350,
            top: 150,
            height: 200,
            overlay: true,
            dispose: true,
            move: true,
            title: '设置',
            onBeforeShow: function () {
                $.ajax({
                    url: ctx + "/CreditConfig/acquireDate.action",
                    type: "post",
                    data: {},
                    dataType: "json",
                    success: function (data) {
                        $("#yearSet").val(data.rows.monthSet);
                        $("#monthSet").val(data.rows.daySet);
                    }
                });
            },
            onAfterShow: function () {
                var config = {
                    disable_search_threshold: 10,
                    no_results_text: '无数据',
                    width: "100%"
                };
                $("#yearSet").chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($("#yearSet").parent(), "remove");
                    } else {
                        change_error_style($("#yearSet").parent(), "add");
                    }
                });
                $("#monthSet").chosen(config).on('change', function (e, selected) {
                    if ("" != selected) {
                        change_error_style($("#monthSet").parent(), "remove");
                    } else {
                        change_error_style($("#monthSet").parent(), "add");
                    }
                });
            },
            callback: function () {
                if ($("#setYearRemindForm").valid("setYearRemindForm")) {
                    $.ajax({
                        url: ctx + "/CreditConfig/configYearRemaind.action",
                        type: "post",
                        data: {
                            type: $("#toRemindSecondCar").val(),
                            yearSet: $("#yearSet").val(),
                            monthSet: $("#monthSet").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                successMsg("设置二手车年限提醒成功！", 1000, function () {
                                    window.location.href = ctx + "/CreditConfig/query.action";
                                });
                            } else if (data.error == -100) {
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                faildMsg(data.message);
                            }
                        }
                    });
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#yearRemaindConfig-dialog", options);

        creatDlg.show();
    }

    //征信验证时长
    function set() {
        var options = {
            width: 350,
            top: 150,
            height: 150,
            overlay: true,
            dispose: true,
            move: true,
            title: '设置',
            onAfterShow: function () {
                $.ajax({
                    url: ctx + "/CreditConfig/getMonth.action",
                    type: "post",
                    data: {},
                    dataType: "json",
                    success: function (data) {
                        $("#globalValue").val(data.rows)
                    }
                });
            },
            callback: function () {
                var flag = false;
                if ($("#configForm").valid("configForm")) {
                    $.ajax({
                        url: ctx + "/CreditConfig/setTime.action",
                        type: "post",
                        data: {
                            globalValue: $("#globalValue").val(),
                            type: $("#toSetCrditTime").val()
                        },
                        dataType: "json",
                        success: function (data) {
                            loadingHide();
                            if (data.error == 1) {
                                flag = false;
                                successMsg("设置验证时长成功！", 1000, function () {
                                    window.location.href = ctx + "/CreditConfig/query.action";
                                });
                            } else if (data.error == -100) {
                                flag = true;
                                faildMsg("会话超时，请重新登陆！");
                            } else {
                                flag = true;
                                faildMsg(data.message);
                            }
                        }
                    });
                    if (flag) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
        creatDlg = new Dialog("#config-dialog", options);
        creatDlg.show();
    }

    //跳过征信验证
    function jumpCheck() {
        window.location.href = ctx + "/CreditConfig/jumpCheck.action";
    }
})

//校验
function validYearSet(lableId) {
    if (undefined != lableId && null != lableId && lableId != "") {
        if ($(lableId).val() == null || $(lableId).val() == "") {
            if ($(lableId).attr("id") == "globalValue") {
                $(lableId).attr('tip', '时长不能为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "yearSet") {
                $(lableId).parent().attr('tip', '年限不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            if ($(lableId).attr("id") == "monthSet") {
                $(lableId).parent().attr('tip', '月限不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            if ($(lableId).attr("id") == "workTime") {
                $(lableId).parent().attr('tip', '连续月数不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            if ($(lableId).attr("id") == "orderNumber") {
                $(lableId).attr('tip', '订单数不能为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "loanMoney") {
                $(lableId).attr('tip', '贷款额不能为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "workTimeTurnsOut") {
                $(lableId).parent().attr('tip', '连续月数不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            if ($(lableId).attr("id") == "orderNumberTurnsOut") {
                $(lableId).attr('tip', '订单数不能为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "loanMoneyTurnsOut") {
                $(lableId).attr('tip', '贷款额不能为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "depWorkTimeTurnsOut") {
                $(lableId).parent().attr('tip', '连续月数不能为空，请重新输入。').addClass("input_validation-failed");
                return "faild";
            }
            if ($(lableId).attr("id") == "depAvgLoanMoney") {
                $(lableId).attr('tip', '部门人均贷款额不能为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "salesTurnsOnRemain") {
                $(lableId).attr('tip', '转正提醒天数不能为空，请重新输入。');
                return "faild";
            }
            if ($(lableId).attr("id") == "turnOutRemain") {
                $(lableId).attr('tip', '淘汰提前提醒天数不能为空，请重新输入。');
                return "faild";
            }
            return "success";
        }
        if ($(lableId).val() != null && $(lableId).val() != "") {
            var _this = $(lableId);
            if ($(lableId).attr("id") == "autoApprovalContractPriceInput") {
                if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/).exec(_this.val())) {
                    $(lableId).attr('tip', '金额只能为正数并且只能精确到分');
                    return "faild";
                } else {
                    return "success";
                }
            }
            return "success";
        }
        return "success";
    }
}



