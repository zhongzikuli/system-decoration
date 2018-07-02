$(function () {
    var banks;//贷款银行下拉数组
    var city;//房产城市
    var bankRates;//银行利率数组
    var bankRate;//银行利率
    var maxLoanMoney = 0;//最高贷款金额

    var cardNo = $("#cardNo").val();
    var realName = $("#realName").val();
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
    var businessHandleAppiontmentTime = {
        elem: '#businessHandleAppiontmentTime',
        format: 'YYYY-MM-DD hh:mm',
        min: '1970-01-01 ', //设定最小日期为当前日期
        istoday: true, //显示今天
        issure: true, //确定框
        istime: true,
        start: laydate.now(0, 'YYYY年MM月DD日 hh:mm'),
        choose: function (datas) {
            if (datas != null || datas != '') {
                change_error_style($("#businessHandleAppiontmentTime"), "remove");
                /*$(this).removeClass("validation-error");*/
            } else {
                change_error_style($("#businessHandleAppiontmentTime"), "add");
            }
        },
        clear: function () {

        }
    };
    laydate(businessHandleAppiontmentTime);
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
    $("#businessHandleTelContactSituationCode").chosen({
        disable_search_threshold: 8,
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "100%"
    });
    //电联情况选择事件
    $("#businessHandleTelContactSituationCode").on('change', function (e, selected) {
        if (selected.selected == null || selected.selected == '') {
            $(this).parent().addClass("validation-error");
            return
        } else {
            $(this).parent().removeClass("validation-error");
        }
    })
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
                getTheMaxLoanMoney();
            }
        });
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
                        $('#loan-maxMoney').val(maxLoanMoney);
                        $('#loan-maxLoanMoney').val(maxLoanMoney);
                        $('#loan-maxLoanMoney-label').html('（说明：最高可贷' + maxLoanMoney + '元）');
                    } else if (res.error == -100) {
                        flag = true;
                        HQdecorate.faildMsg("请求超时", 1000)
                    }
                },
                function (res) {
                    HQdecorate.faildMsg(res.responseText, 1000)
                }
            );
        }else {
            maxLoanMoney = 0;
            $('#loan-maxMoney').val(maxLoanMoney);
            $('#loan-maxLoanMoney').val(maxLoanMoney);
            $('#loan-maxLoanMoney-label').html('（说明：最高可贷' + maxLoanMoney + '元）');
        }
    }

    function isNotNull(s){
        if (s != null && typeof s !== "undefined" && s !== ""){
            return true;
        } else {
            return false;
        }
    }
    //大数据征信----------------------------------------------------------------------------------------------------------

    //大数据征信
    HQdecorate.post(ctx + "/risk/getBigDataCredit.action", {
        "acceptId"	: applyLoanId
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
            url		: ctx + '/risk/queryForLoan.action?acceptId=' + applyLoanId,
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

    //房屋面积、房产价值改变时
    $("#loan-houseSpace,#loan-currentPrice").on("input propertychange",function () {
        getTheMaxLoanMoney();
    });

    // 详情查看
    new LoanCreditQuery(".detail-credit-btn", applyLoanId);
    //--------------------------------------------------------------------------------------

    //----------------------客户历史订单----------------------------------------------------------------------------------

    //获取历史订单
    HQdecorate.post(ctx + "/dlBusinessHandle/getOrderHistory.action", {
        id: applyLoanId,
        realName: realName,
        cardNo: cardNo
    }, function (data) {
        var html = createHistoryTable(data["rows"]);
        $("#detail_history_order").empty().html(html);

        //初始化详情按钮
        $(".detail").on("click", function () {
            var _this = this;
            var acceptId = $(_this).attr("data-id");
            var dataTitle = $(_this).attr("data-title");
            var dataHref = $(_this).attr("data-href");
            HQdecorate.openTabForParent(dataHref, "-order-detail-" + acceptId, "订单详情-" + dataTitle);
        });

    }, function () {
        console.log("error");
    }, "#detail_history_order");


    //创建历史订单表格--------------------------------------------------------------------------------------------
    function createHistoryTable(rows) {
        var html = '<table class="table table-bordered">';
        html += '<thead>';
        html += '<th style="width:15%;">客户姓名</th>';
        html += '<th style="width:15%;">身份证号码</th>';
        html += '<th style="width:10%;">订单状态</th>';
        html += '<th style="width:10%;">贷款申请时间</th>';
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
                html += '<td><a data-id="' + rows[i]["id"] + '" data-title="' + rows[i]["realName"] + '" data-href="' + ctx + '/dlBusinessHandle/detail.action?id=' + rows[i]["id"] + '" class="btn btn-info btn-xs detail"><i class="fa fa-search-plus"></i>订单(' + rows[i]["orderNo"] + ')</a></td></tr>';
            }
        }
        html += '</tbody></table>';
        return html;
    }

    //------------------------------------------------------------------------------------------------------------------
    //按公式计算
    $(".byFormula").on("click", function () {
        var param = getParam();
        if (param.loanBankId == null || param.loanBankId == '' || param.loanPeriodYear == null || param.loanPeriodYear == '' || param.loanMoney == null || param.loanMoney == ''
            || param.houseSpace == null || param.houseSpace == '' || param.currentPrice == null || param.currentPrice == ' ') {
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
        getTheMaxLoanMoney();
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
        param.remark = $("#loan-remark").val();

        param.repayTotalInterestAmountMonth = HQdecorate.rmoney($("#loan-repayTotalInterestAmountMonth").text());//总利息
        param.repayPrincipleAmountMonth = HQdecorate.rmoney($("#loan-repayPrincipleAmountMonth").text());//月还本金
        param.repayInterestAmountMonth = HQdecorate.rmoney($("#loan-repayInterestAmountMonth").text());//月还利息

        param.businessHandleSuggest = $("#businessHandleSuggest").val();//业务受理意见
        param.businessHandleTelContactSituationCode = $("#businessHandleTelContactSituationCode").val();//电联情况
        param.businessHandleAppiontmentTimeStr = $("#businessHandleAppiontmentTime").val();//月还利息
        return param;
    }

    var validater = new ValidateWin("#applyLoanDiv");

    //返回列表
    $("#businessBackList").on("click", function () {
        window.location.href = ctx + "/dlBusinessHandle/query.action";
    });

    //更换审核
    $(".change").on("click", function () {
        var idArr = $("#applyLoanId").val();
        HQdecorate.confirmDialog("确认更换审核吗？", true, {}, function () {
            var params = {
                idArr: idArr.toString()
            };
            var dataUrl = ctx + "/dlBusinessHandle/toBusiness.action?acceptId=" + applyLoanId;
            HQdecorate.post(
                ctx + "/bankHandle/changeAudit.action",
                params,
                function (res) {

                    if (res.error == 1) {
                        HQdecorate.successMsg("操作成功", 1000, function () {
                            //关闭当前页卡
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
    //提交 保存 退回 通过
    $(".business").on("click", function () {
        var param = getParam();
        //参数校验
        if (!validater.mySubmit(validater)) {

            if(param.businessHandleTelContactSituationCode == null || param.businessHandleTelContactSituationCode=='' ){
                $("#businessHandleTelContactSituationCode").parent().addClass("validation-error");
            }
            if(param.loanBankId == null || param.loanBankId=='' ){
                $("#loan-bank").parent().addClass("validation-error");
            }
            if(param.loanPeriodYear==null || param.loanPeriodYear==''){
                $("#loan-years").parent().addClass("validation-error");
            }
            if(param.businessHandleAppiontmentTimeStr == null || param.businessHandleAppiontmentTimeStr=='' ){
                $("#businessHandleAppiontmentTime").addClass("validation-error");
            }
            if(param.businessHandleSuggest == null || param.businessHandleSuggest=='' ){
                $("#businessHandleSuggest").addClass("validation-error");
            }
            if(parseFloat(param.currentPrice) > 99999999){
                $("#loan-currentPrice").addClass("validation-error");
            }
            return;
        }
        if (validater.mySubmit(validater)) {
            var flag = true
        if(param.businessHandleTelContactSituationCode == null || param.businessHandleTelContactSituationCode=='' ){
            $("#businessHandleTelContactSituationCode").parent().addClass("validation-error");
            flag = false
        }
        if(param.loanBankId == null || param.loanBankId=='' ){
            $("#loan-bank").parent().addClass("validation-error");
            flag = false
        }
        if(param.loanPeriodYear==null || param.loanPeriodYear==''){
            $("#loan-years").parent().addClass("validation-error");
            flag = false
        }
        if(param.businessHandleAppiontmentTimeStr == null || param.businessHandleAppiontmentTimeStr=='' ){
            $("#businessHandleAppiontmentTime").addClass("validation-error");
            flag = false
          }
            if(param.businessHandleSuggest == null || param.businessHandleSuggest=='' ){
                $("#businessHandleSuggest").addClass("validation-error");
                flag = false
            }
            if(parseFloat(param.currentPrice) > 99999999){
                $("#loan-currentPrice").addClass("validation-error");
                flag = false
            }
            if(flag == false){
                return
            }
        }
        if(parseFloat(param.currentPrice) > 99999999){
            HQdecorate.faildMsg("房产价值控制在八位以内");
            $("#loan-currentPrice").addClass("validation-error");
            return;
        }
        if(parseFloat(param.loanMoney) > parseFloat($("#loan-maxMoney").text())){
            HQdecorate.faildMsg("贷款额超过最高可贷额度");
            $("#loan-loanMoney").addClass("validation-error");
            return;
        }

        if(param.repayTotalInterestAmountMonth==null || param.repayTotalInterestAmountMonth==''|| param.repayPrincipleAmountMonth==null || param.repayPrincipleAmountMonth==''
            || param.repayInterestAmountMonth==null || param.repayInterestAmountMonth==''){
            HQdecorate.faildMsg("请点击按公式计算")
            return;
        }
        var dataUrl = ctx + "/dlBusinessHandle/toBusiness.action?acceptId=" + param.id;
        var status = $(this).attr("data-status");
        param.businessHandleResult=status;
       var str = $(this).text();
        HQdecorate.confirmDialog("确认要进行"+str+"操作吗？", true, {}, function () {
            HQdecorate.jsonPost(
                ctx + "/dlBusinessHandle/businessHandle.action",
                JSON.stringify(param),
                function (res) {
                    if (res.error == 1) {
                        //关闭当前页卡
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
});
