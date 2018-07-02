$(document).ready(function () {
    var banks;//贷款银行下拉数组
    var city;//房产城市
    var bankRates;//银行利率数组
    var bankRate;//银行利率
    var maxLoanMoney = 0;//最高贷款金额

    var applyLoanId = $("#applyLoanId").val();
    //编辑状态 给贷款银行下拉数组、银行利率数组 赋值
    if (applyLoanId) {
        var address = $('#loan-province').val();
        if (address && address != "--") {
            var p = address.split("-");
            var nowCity = p[1];
            if (nowCity != city || !banks || banks.lenth == 0) {
                city = nowCity;
                HQdecorate.post(
                    ctx + "/bank/getBankListByCity.action",
                    {city: city},
                    function (res) {
                        if (res.error == 1) {
                            banks = res.rows;
                            $.each(banks, function (k, p) {
                                if (p.id == $("#loan-bank").val()) {
                                    bankRates = p.bankRateList;
                                }
                            });
                        } else if (res.error == -100) {
                            HQdecorate.faildMsg("请求超时", 1000)
                        }
                    },
                    function (res) {
                        HQdecorate.faildMsg(res.responseText, 1000)
                    }
                );
            }
        }
    }

    //城市组件
    init_city_select(
        $("#loan-province"),
        3,
        "left",
        function () {
            var address = $('#loan-province').val();
            if (address && address != "--") {
                var p = address.split("-");
                var nowCity = p[1];
                if (nowCity != city || !banks || banks.lenth == 0) {
                    city = nowCity;
                    HQdecorate.post(
                        ctx + "/bank/getBankListByCity.action",
                        {city: city},
                        function (res) {
                            if (res.error == 1) {
                                var options = "<option value=''>请选择</option>";
                                if (res.rows && res.rows.length > 0) {
                                    banks = res.rows;
                                    $.each(banks, function (k, p) {
                                        options += "<option value='" + p.id + "'>" + p.bankName + "</option>";
                                    });
                                }
                                $('#loan-bank').empty().append(options).trigger("chosen:updated");
                            } else if (res.error == -100) {
                                HQdecorate.faildMsg("请求超时", 1000)
                            }
                        },
                        function (res) {
                            HQdecorate.faildMsg(res.responseText, 1000)
                        }
                    );
                }
            }
        }
    );

    $(".chosen-select").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });

    var validater = new ValidateWin("#applyLoanDiv");

    //取消
    $("#applyLoanCancel").on("click", function () {
        window.location.href = ctx + "/applyLoan/query.action";
    });

    //保存
    $("#applyLoanSave").on("click", function () {
        var param = getParam();
        //参数校验
        if (!validater.mySubmit(validater)) {
            if (param.loanBankId == null || param.loanBankId == '') {
                $("#loan-bank").parent().addClass("validation-error");
            }
            if (param.loanPeriodYear == null || param.loanPeriodYear == '') {
                $("#loan-years").parent().addClass("validation-error");
            }
            if (param.loanMoney == null || param.loanMoney == '') {
                $("#loan-loanMoney").addClass("validation-error");
            }
            if (parseFloat(param.loanMoney) > parseFloat($("#loan-maxLoanMoney").text())) {
                $("#loan-loanMoney").addClass("validation-error");
            }
            if (parseFloat(param.currentPrice) > 99999999) {
                $("#loan-currentPrice").addClass("validation-error");
            }
            return;
        }
        if (parseFloat(param.currentPrice) > 99999999) {
            HQdecorate.faildMsg("房产价值控制在八位以内");
            $("#loan-currentPrice").addClass("validation-error");
            return;
        }
        if (parseFloat(param.loanMoney) > parseFloat($("#loan-maxLoanMoney").text())) {
            HQdecorate.faildMsg("贷款额超过最高可贷额度");
            $("#loan-loanMoney").addClass("validation-error");
            return;
        }
        if (param.repayTotalInterestAmountMonth == null || param.repayTotalInterestAmountMonth == '' || param.repayPrincipleAmountMonth == null || param.repayPrincipleAmountMonth == ''
            || param.repayInterestAmountMonth == null || param.repayInterestAmountMonth == '') {
            HQdecorate.faildMsg("请点击按公式计算");
            return;
        }
        param.orderStatus = 0;//保存
        $("#applyLoanSave").prop("disabled", true);
        $("#applyLoanSubmit").prop("disabled", true);
        HQdecorate.post(
            ctx + "/applyLoan/add.action",
            param,
            function (res) {
                flag = false;
                if (res.error == 1) {
                    HQdecorate.successMsg("操作成功", 1000, function () {
                        window.location.href = ctx + "/applyLoan/query.action";
                    })
                } else if (res.error == -100) {
                    flag = true;
                    HQdecorate.faildMsg("请求超时", 1000)
                    $("#applyLoanSave").prop("disabled", false);
                    $("#applyLoanSubmit").prop("disabled", false);
                } else {
                    HQdecorate.faildMsg(res.message);
                    $("#applyLoanSave").prop("disabled", false);
                    $("#applyLoanSubmit").prop("disabled", false);
                }
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }
        );
    });
    //提交
    $("#applyLoanSubmit").on("click", function () {
        var param = getParam();
        param.orderStatus = 1;//提交申请
        //参数校验
        if (!validater.mySubmit(validater)) {
            if (param.loanBankId == null || param.loanBankId == '') {
                $("#loan-bank").parent().addClass("validation-error");
            }
            if (param.loanPeriodYear == null || param.loanPeriodYear == '') {
                $("#loan-years").parent().addClass("validation-error");
            }
            if (param.loanMoney == null || param.loanMoney == '') {
                $("#loan-loanMoney").addClass("validation-error");
            }
            if (parseFloat(param.loanMoney) > parseFloat($("#loan-maxLoanMoney").text())) {
                $("#loan-loanMoney").addClass("validation-error");
            }
            if (parseFloat(param.currentPrice) > 99999999) {
                $("#loan-currentPrice").addClass("validation-error");
            }
            return;
        }
        if (parseFloat(param.currentPrice) > 99999999) {
            HQdecorate.faildMsg("房产价值控制在八位以内");
            $("#loan-currentPrice").addClass("validation-error");
            return;
        }
        if (parseFloat(param.loanMoney) > parseFloat($("#loan-maxLoanMoney").text())) {
            HQdecorate.faildMsg("贷款额超过最高可贷额度");
            $("#loan-loanMoney").addClass("validation-error");
            return;
        }
        if (param.repayTotalInterestAmountMonth == null || param.repayTotalInterestAmountMonth == '' || param.repayPrincipleAmountMonth == null || param.repayPrincipleAmountMonth == ''
            || param.repayInterestAmountMonth == null || param.repayInterestAmountMonth == '') {
            HQdecorate.faildMsg("请点击按公式计算");
            return;
        }
        $("#applyLoanSave").prop("disabled", true);
        $("#applyLoanSubmit").prop("disabled", true);
        HQdecorate.post(
            ctx + "/applyLoan/add.action",
            param,
            function (res) {
                flag = false;
                if (res.error == 1) {
                    HQdecorate.successMsg("操作成功", 1000, function () {
                        window.location.href = ctx + "/applyLoan/query.action";
                    })
                } else if (res.error == -100) {
                    flag = true;
                    HQdecorate.faildMsg("请求超时", 1000)
                    $("#applyLoanSave").prop("disabled", false);
                    $("#applyLoanSubmit").prop("disabled", false);
                } else {
                    HQdecorate.faildMsg(res.message);
                    $("#applyLoanSave").prop("disabled", false);
                    $("#applyLoanSubmit").prop("disabled", false);
                }
            },
            function (res) {
                HQdecorate.faildMsg(res.responseText, 1000)
            }
        );
    });

    //贷款银行选择事件
    $("#loan-bank").on('change', function (e, selected) {
        if (selected.selected == null || selected.selected == '') {
            $(this).parent().addClass("validation-error");
            return
        } else {
            $(this).parent().removeClass("validation-error");
        }
        $.each(banks, function (k, p) {
            if (p.id == selected.selected) {
                bankRates = p.bankRateList;
                if (bankRates.length > 0) {
                    var options = "<option value=''>请选择</option>";
                    $.each(bankRates, function (k, item) {
                        options += "<option value='" + item.years + "'>" + item.years + "</option>";
                    });
                    $('#loan-years').empty();
                    $('#loan-years').append(options).trigger("chosen:updated");
                    $('#loan-bankRate').html('');
                    clearLoanInfo();
                    getTheMaxLoanMoney();
                } else {
                    $('#loan-years').empty().trigger("chosen:updated");
                }
            }
        });
    });

    //贷款年限选择事件
    $("#loan-years").on('change', function (e, selected) {
        if (selected.selected == null || selected.selected == '') {
            $(this).parent().addClass("validation-error");
            return
        } else {
            $(this).parent().removeClass("validation-error");
        }
        $.each(bankRates, function (k, p) {
            if (p.years == selected.selected) {
                bankRate = p;
                clearLoanInfo();
                $('#loan-bankRate').html(bankRate.rate);
            }
        });
    });


    //房屋面积、房产价值改变时
    $("#loan-houseSpace,#loan-currentPrice").on("input propertychange", function () {
        getTheMaxLoanMoney();
    });

    /**
     * 获取最大可贷款金额
     * @param bankId 银行id
     * @param houseSpace 房产面积
     * @param currentPrice 房产价值
     */
    function getTheMaxLoanMoney() {
        var param = getParam();
        if (isNotNull(param.houseSpace) && isNotNull(param.currentPrice) && isNotNull(param.loanBankId)) {
            HQdecorate.post(
                ctx + "/applyLoan/getTheMaxLoanMoney.action",
                param,
                function (res) {
                    flag = false;
                    if (res.error == 1) {
                        maxLoanMoney = res.rows;
                        $('#loan-maxLoanMoney').html(res.rows);
                    } else if (res.error == -100) {
                        flag = true;
                        HQdecorate.faildMsg("请求超时", 1000);
                    } else {
                        HQdecorate.faildMsg(res.message);
                    }
                },
                function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                }
            );
        } else {
            $('#loan-maxLoanMoney').html(0);
        }
    }

    function isNotNull(s) {
        if (s != null && typeof s !== "undefined" && s !== "") {
            return true;
        } else {
            return false;
        }
    }

    //按公式计算
    $(".byFormula").on("click", function () {
        var param = getParam();
        if (param.loanBankId == null || param.loanBankId == '' || param.loanPeriodYear == null || param.loanPeriodYear == '' || param.loanMoney == null || param.loanMoney == '') {
            HQdecorate.faildMsg("请填写完成的贷款信息")
            return;
        }

        //总利息
        param.repayTotalInterestAmountMonth = param.loanMoney * param.bankRate / 100;
        //月还本金
        param.repayPrincipleAmountMonth = param.loanMoney / param.loanPeriodYear / 12;
        //月还利息
        param.repayInterestAmountMonth = param.repayTotalInterestAmountMonth / param.loanPeriodYear / 12;
        //月还款
        param.repayAmountMonth = param.repayPrincipleAmountMonth + param.repayInterestAmountMonth;
        $('#loan-repayTotalInterestAmountMonth').html(HQdecorate.save2Point(param.repayTotalInterestAmountMonth));
        $('#loan-repayAmountMonth').html(HQdecorate.save2Point(param.repayAmountMonth));
        $('#loan-repayPrincipleAmountMonth').html(HQdecorate.save2Point(param.repayPrincipleAmountMonth));
        $('#loan-repayInterestAmountMonth').html(HQdecorate.save2Point(param.repayInterestAmountMonth));
    });

    //贷款信息改变
    $(".loanInfoClean").on("change", function () {
        clearLoanInfo();
    });

    //贷款金额变化
    $("#loan-loanMoney").on("change", function () {
        if (maxLoanMoney && $("#loan-loanMoney").val() > maxLoanMoney) {
            $("#loan-loanMoney").addClass("validation-error");
        } else {
            $("#loan-loanMoney").removeClass("validation-error");
        }
        $('#loan-repayTotalInterestAmountMonth').html('');
        $('#loan-repayAmountMonth').html('');
        $('#loan-repayPrincipleAmountMonth').html('');
        $('#loan-repayInterestAmountMonth').html('');
    });

    //基本信息改变清贷款相关信息
    function clearLoanInfo() {
        $("#loan-loanMoney").val('');
        $('#loan-repayTotalInterestAmountMonth').html('');
        $('#loan-repayAmountMonth').html('');
        $('#loan-repayPrincipleAmountMonth').html('');
        $('#loan-repayInterestAmountMonth').html('');
    }

    //获取页面参数
    function getParam() {
        var param = {};
        param.id = applyLoanId;
        if (!applyLoanId) {
            param.orderSource = 0;//初审单录入来源(2:安卓，1:IOS,0:PC)
        }
        param.realName = $("#loan-realName").val();
        param.cardNo = $("#loan-cardNo").val();
        param.tel = $("#loan-tel").val();
        param.houseSpace = $("#loan-houseSpace").val() || 0;
        param.province = $("#loan-province").val();
        param.houseAddress = $("#loan-houseAddress").val();
        param.currentPrice = HQdecorate.rmoney($("#loan-currentPrice").val()) || 0;
        param.loanBankId = $("#loan-bank").val();
        param.loanPeriodYear = $("#loan-years").val();
        param.loanMoney = HQdecorate.rmoney($("#loan-loanMoney").val());
        param.bankRate = $("#loan-bankRate").text();
        param.repayTotalInterestAmountMonth = HQdecorate.rmoney($("#loan-repayTotalInterestAmountMonth").text());//总利息
        param.repayPrincipleAmountMonth = HQdecorate.rmoney($("#loan-repayPrincipleAmountMonth").text());//月还本金
        param.repayInterestAmountMonth = HQdecorate.rmoney($("#loan-repayInterestAmountMonth").text());//月还利息
        param.remark = $("#loan-remark").val();
        return param;
    }
});
